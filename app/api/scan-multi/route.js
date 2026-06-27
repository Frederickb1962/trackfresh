import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { finalizeProduceScannerItems } from "../../lib/aiProduceNormalize";
import {
  aiErrorPayload,
  anthropicTextFromResponse,
  ANTHROPIC_SCAN_MODEL,
  createAnthropicMessageWithRetry,
  parseAnthropicJsonText,
} from "../../lib/apiAiError";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  try {
    if (!process.env.ANTHROPIC_API_KEY?.trim()) {
      return NextResponse.json({ error: "API authentication failed — check ANTHROPIC_API_KEY" }, { status: 401 });
    }

    const { imageData, mediaType } = await req.json();
    if (!imageData) return NextResponse.json({ error: "No image" }, { status: 400 });

    const resp = await createAnthropicMessageWithRetry(client, {
      model: ANTHROPIC_SCAN_MODEL,
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
- daysSealed: estimated days while fresh/sealed (for Produce use the conservative lower bound only, same as inGeneralDaysMin)
- daysAfterOpening: number or null (null for Produce)
- storageTip: brief storage tip
- openedTip: brief tip after opening, or null (null for Produce)
- inGeneralDaysMin, inGeneralDaysMax: for Produce only — integer day range for fresh use (e.g. 3 and 5); null for other categories

Produce: category Produce → daysAfterOpening null, openedTip null, inGeneralDaysMin/Max required positive integers with min<=max, daysSealed equals inGeneralDaysMin.

Reply ONLY with valid JSON, no markdown:
{"items":[{"barcode":null,"name":"...","date":"","dateFound":false,"category":"Other","location":"Fridge","daysSealed":7,"daysAfterOpening":null,"storageTip":"...","openedTip":null,"inGeneralDaysMin":null,"inGeneralDaysMax":null}]}`
          }
        ]
      }]
    });

    const text = anthropicTextFromResponse(resp);
    if (!text) throw new Error("AI returned an empty response. Please try again.");

    const aiData = parseAnthropicJsonText(
      text,
      "Could not read items from the photo. Try again with better lighting or a clearer image."
    );
    if (!Array.isArray(aiData.items)) {
      throw new Error("AI did not return any items. Try a closer photo.");
    }

    // For items with barcodes, enrich from Open Food Facts
    let items = await Promise.all(aiData.items.map(async (item) => {
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

    items = finalizeProduceScannerItems(items).filter((it) => it && String(it.name || "").trim());
    if (!items.length) {
      throw new Error("No food items detected in the photo. Try a closer shot with better lighting.");
    }

    return NextResponse.json({ items });
  } catch (e) {
    console.error("Multi scan error:", e);
    const { error: errMsg, status } = aiErrorPayload(e, "Multi scan failed");
    return NextResponse.json({ error: errMsg }, { status });
  }
}
