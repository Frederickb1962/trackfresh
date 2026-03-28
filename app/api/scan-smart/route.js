import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function lookupBarcode(barcode, item) {
  try {
    const offRes = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
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
  return item;
}

export async function POST(req) {
  try {
    const { imageData, mediaType } = await req.json();
    if (!imageData) return NextResponse.json({ error: "No image" }, { status: 400 });

    const resp = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      messages: [{
        role: "user",
        content: [
          {
            type: "image",
            source: { type: "base64", media_type: mediaType || "image/jpeg", data: imageData }
          },
          {
            type: "text",
            text: `Analyze this image. If you see barcodes, extract the barcode numbers. If you see package labels, read the product names and expiration dates. Return all items found as a JSON array with fields: name, barcode (if visible), date, dateType, category, location.

Always provide a name — never leave it empty, make your best guess even if blurry.

Reply ONLY with valid JSON, no markdown:
{"items":[{"name":"Brand Product Name","barcode":"012345678901","date":"YYYY-MM-DD","dateType":"use-by","dateFound":true,"category":"Produce|Dairy|Meat|Pantry|Frozen|Beverages|Snacks|Bread|Condiments|Other","location":"Fridge|Freezer|Pantry","daysSealed":30,"daysAfterOpening":14,"storageTip":"brief storage tip","openedTip":"brief tip after opening or null"}]}

Rules:
- Maximum 6 items
- Use null for barcode if not visible
- Use empty string for date if not found, false for dateFound
- dateType is one of: use-by, best-by, sell-by, expiration, or null
- Use null for daysAfterOpening if not applicable
- Each item must have a non-empty name`
          }
        ]
      }]
    });

    let text = resp.content[0].text.trim().replace(/```json/g, "").replace(/```/g, "").trim();
    const aiData = JSON.parse(text);
    let items = (aiData.items || []).slice(0, 6);

    // Look up Open Food Facts for any items where AI detected a barcode
    items = await Promise.all(items.map(async (item) => {
      if (item.barcode) {
        return await lookupBarcode(item.barcode, item);
      }
      item.source = "label";
      return item;
    }));

    return NextResponse.json({ items });
  } catch (e) {
    console.error("Smart scan error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
