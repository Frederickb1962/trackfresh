import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  try {
    const { imageData, mediaType } = await req.json();
    if (!imageData) return NextResponse.json({ error: "No image" }, { status: 400 });

    const resp = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 3000,
      messages: [{
        role: "user",
        content: [
          {
            type: "image",
            source: { type: "base64", media_type: mediaType || "image/jpeg", data: imageData }
          },
          {
            type: "text",
            text: `Look at this photo and identify ALL distinct food and beverage products visible.

For EACH product you can see, provide:
- barcode: numeric barcode string if clearly visible, otherwise null
- name: product name and brand — never empty, always make your best guess
- date: expiration/use-by/best-by date in YYYY-MM-DD format, or empty string if not found
- dateFound: true if date was found
- category: Produce | Dairy | Meat | Pantry | Frozen | Beverages | Snacks | Bread | Condiments | Other
- location: Fridge | Freezer | Pantry
- daysAfterOpening: number or null
- storageTip: brief storage tip
- openedTip: brief tip after opening, or null

Include every distinct product you can identify. Skip non-food items. Do not duplicate.

Reply ONLY with valid JSON, no markdown:
{"items":[{"barcode":null,"name":"...","date":"","dateFound":false,"category":"Other","location":"Fridge","daysAfterOpening":null,"storageTip":"...","openedTip":null}]}`
          }
        ]
      }]
    });

    let text = resp.content[0].text.trim();
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const aiData = JSON.parse(text);

    // For items with barcodes, enrich from Open Food Facts
    const items = await Promise.all((aiData.items || []).map(async (item) => {
      if (item.barcode) {
        try {
          const offRes = await fetch(`https://world.openfoodfacts.org/api/v0/product/${item.barcode}.json`);
          const offData = await offRes.json();
          if (offData.status === 1 && offData.product) {
            const p = offData.product;
            const brand = p.brands?.split(",")[0]?.trim() || "";
            const productName = p.product_name || p.generic_name || "";
            let name = productName;
            if (brand && productName && !productName.toLowerCase().includes(brand.toLowerCase())) {
              name = brand + " " + productName;
            } else if (brand && !productName) {
              name = brand + " Product";
            }
            if (name) item.name = name;
            const cats = (p.categories_tags || []).join(" ").toLowerCase();
            if (cats) {
              if (cats.includes("meat") || cats.includes("poultry") || cats.includes("seafood")) item.category = "Meat";
              else if (cats.includes("dairy") || cats.includes("milk") || cats.includes("cheese") || cats.includes("yogurt")) item.category = "Dairy";
              else if (cats.includes("produce") || cats.includes("fruit") || cats.includes("vegetable")) item.category = "Produce";
              else if (cats.includes("frozen")) item.category = "Frozen";
              else if (cats.includes("beverage") || cats.includes("drink") || cats.includes("juice") || cats.includes("coffee") || cats.includes("tea")) item.category = "Beverages";
              else if (cats.includes("bread")) item.category = "Bread";
              else if (cats.includes("snack")) item.category = "Snacks";
              else if (cats.includes("condiment") || cats.includes("sauce")) item.category = "Condiments";
              if (cats.includes("frozen")) item.location = "Freezer";
              else if (["Dairy", "Meat", "Produce"].includes(item.category)) item.location = "Fridge";
            }
            item.source = "barcode";
          } else {
            item.source = "label";
          }
        } catch (e) {
          item.source = "label";
        }
      } else {
        item.source = "label";
      }
      return item;
    }));

    return NextResponse.json({ items });
  } catch (e) {
    console.error("Multi scan error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
