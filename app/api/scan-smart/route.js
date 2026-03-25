import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  try {
    const { imageData, mediaType } = await req.json();
    if (!imageData) return NextResponse.json({ error: "No image" }, { status: 400 });

    // Step 1: Claude analyzes the photo — detects barcode number AND reads label
    const resp = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [{
        role: "user",
        content: [
          {
            type: "image",
            source: { type: "base64", media_type: mediaType || "image/jpeg", data: imageData }
          },
          {
            type: "text",
            text: `Analyze this food product photo carefully.

1. If a barcode (UPC/EAN/QR) is visible, extract the full numeric barcode value exactly as printed.
2. Read the product name and brand from any visible label or packaging.
3. Find any expiration, use-by, best-by, or sell-by date visible on the package.
4. Determine appropriate storage category, location, and tips.

Always provide a name — never leave it empty, make your best guess even if blurry.

Reply ONLY with valid JSON, no markdown:
{
  "barcode": "012345678901",
  "name": "Brand Product Name",
  "date": "YYYY-MM-DD",
  "dateFound": true,
  "category": "Produce|Dairy|Meat|Pantry|Frozen|Beverages|Snacks|Bread|Condiments|Other",
  "location": "Fridge|Freezer|Pantry",
  "daysSealed": 30,
  "daysAfterOpening": 14,
  "storageTip": "brief storage tip",
  "openedTip": "brief tip after opening or null"
}

Use null for barcode if none visible, empty string for date if not found, null for daysAfterOpening if not applicable.`
          }
        ]
      }]
    });

    let text = resp.content[0].text.trim();
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const aiData = JSON.parse(text);

    // Step 2: If Claude detected a barcode, look it up on Open Food Facts for better product info
    if (aiData.barcode) {
      try {
        const offRes = await fetch(`https://world.openfoodfacts.org/api/v0/product/${aiData.barcode}.json`);
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
          if (name) aiData.name = name;

          const cats = (p.categories_tags || []).join(" ").toLowerCase();
          if (cats) {
            if (cats.includes("meat") || cats.includes("poultry") || cats.includes("seafood")) aiData.category = "Meat";
            else if (cats.includes("dairy") || cats.includes("milk") || cats.includes("cheese") || cats.includes("yogurt")) aiData.category = "Dairy";
            else if (cats.includes("produce") || cats.includes("fruit") || cats.includes("vegetable")) aiData.category = "Produce";
            else if (cats.includes("frozen")) aiData.category = "Frozen";
            else if (cats.includes("beverage") || cats.includes("drink") || cats.includes("juice") || cats.includes("coffee") || cats.includes("tea")) aiData.category = "Beverages";
            else if (cats.includes("bread")) aiData.category = "Bread";
            else if (cats.includes("snack")) aiData.category = "Snacks";
            else if (cats.includes("condiment") || cats.includes("sauce")) aiData.category = "Condiments";
            if (cats.includes("frozen")) aiData.location = "Freezer";
            else if (["Dairy", "Meat", "Produce"].includes(aiData.category)) aiData.location = "Fridge";
          }
          aiData.source = "barcode";
        } else {
          aiData.source = "label";
        }
      } catch (e) {
        aiData.source = "label";
      }
    } else {
      aiData.source = "label";
    }

    return NextResponse.json({ item: aiData });
  } catch (e) {
    console.error("Smart scan error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
