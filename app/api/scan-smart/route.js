import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function enrichWithBarcode(item) {
  if (!item.barcode) { item.source = "label"; return item; }
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
  return item;
}

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
            text: `Analyze this photo carefully. It could be:
A) A single food product (label, barcode, or package)
B) Multiple food products together
C) A grocery store receipt

First, determine what type of image this is, then:

FOR SINGLE PRODUCT OR MULTIPLE PRODUCTS:
- If a barcode (UPC/EAN/QR) is visible, extract the full numeric barcode value.
- Read product name and brand from any visible label or packaging.
- Find any expiration, use-by, best-by, or sell-by date.
- Always provide a name — never leave it empty, make your best guess even if blurry.

FOR RECEIPTS:
- Extract ONLY food and beverage items. SKIP non-food items (shampoo, soap, cleaning supplies, etc.)
- Clean up receipt abbreviations into readable product names.
- Estimate shelf life for each item.

Reply ONLY with valid JSON, no markdown:
{
  "type": "single|multi|receipt",
  "items": [
    {
      "barcode": "012345678901 or null",
      "name": "Brand Product Name",
      "date": "YYYY-MM-DD or empty string",
      "dateFound": true,
      "category": "Produce|Dairy|Meat|Pantry|Frozen|Beverages|Snacks|Bread|Condiments|Other",
      "location": "Fridge|Freezer|Pantry",
      "daysSealed": 30,
      "daysAfterOpening": 14,
      "storageTip": "brief storage tip",
      "openedTip": "brief tip after opening or null"
    }
  ]
}

For single product photos, items array will have 1 entry.
For multiple products or receipts, include every item found.
Use null for barcode if none visible, empty string for date if not found.`
          }
        ]
      }]
    });

    let text = resp.content[0].text.trim();
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const aiData = JSON.parse(text);

    const items = await Promise.all((aiData.items || []).map(enrichWithBarcode));

    // If single item, return in original format for backward compatibility
    if (aiData.type === "single" && items.length === 1) {
      return NextResponse.json({ item: items[0] });
    }

    // For multi/receipt, return items array
    return NextResponse.json({ item: items[0] || null, items, type: aiData.type });
  } catch (e) {
    console.error("Smart scan error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
