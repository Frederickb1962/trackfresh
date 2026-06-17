import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { finalizeProduceScannerItems } from "../../lib/aiProduceNormalize";
import { ANTHROPIC_SCAN_MODEL, aiErrorPayload } from "../../lib/apiAiError";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function createReceiptScanMessage(image, mimeType) {
  const params = {
    model: ANTHROPIC_SCAN_MODEL,
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: { type: "base64", media_type: mimeType || "image/jpeg", data: image },
          },
          {
            type: "text",
            text: `You are an expert grocery receipt scanner and food safety advisor.

Look at this receipt and extract ONLY food and beverage items. SKIP non-food items like shampoo, deodorant, soap, cleaning supplies, paper towels, trash bags, toiletries, pet supplies, medicine, vitamins, and any other non-edible products.

Only include actual food and beverage items. Do not include non-food items such as household products, cleaning supplies, personal care items, paper products, vitamins, supplements, medications, or any other non-edible items. If an item is not something you would eat or drink, exclude it entirely.

For EACH item, provide:
1. "name" - the product name (clean up receipt abbreviations into readable names)
2. "brand" - the brand name if visible on the receipt (e.g. "Wegmans", "Del Monte", "Heinz"). If no brand is visible, use null.
3. "unitPrice" - the line price in US dollars as a number (e.g. 4.99). Use the amount printed on the receipt for that line. If price is not visible, use null.
4. "category" - one of: Produce, Dairy, Meat, Pantry, Frozen, Beverages, Snacks, Bread, Condiments, Other
5. "location" - recommended storage: "Fridge", "Freezer", or "Pantry"
6. "daysSealed" - estimated days the product lasts while SEALED/UNOPENED from purchase date
7. "daysAfterOpening" - estimated days AFTER OPENING for packaged goods (null for fresh Produce — fruits/vegetables/herbs)
8. "storageTip" - brief tip on storing sealed for max freshness
9. "openedTip" - brief tip after opening for packaged goods (null for Produce)
10. "inGeneralDaysMin" and "inGeneralDaysMax" - for category Produce ONLY: whole-day fresh shelf-life window (e.g. 3 and 5 for about 3–5 days). For all other categories use null.

Produce rules: If category is Produce, daysAfterOpening and openedTip MUST be null. inGeneralDaysMin/Max MUST be positive integers with min <= max. daysSealed MUST equal inGeneralDaysMin (conservative default).

Use your food safety knowledge. Examples:
- Ketchup: daysSealed=365, daysAfterOpening=180, openedTip="Refrigerate after opening"
- Mustard: daysSealed=730, daysAfterOpening=365, openedTip="Refrigerate after opening"
- Mayo: daysSealed=365, daysAfterOpening=60, openedTip="Always refrigerate, never leave out over 2 hours"
- Fresh chicken: daysSealed=2, daysAfterOpening=null, storageTip="Keep in coldest part of fridge or freeze within 2 days"
- Milk: daysSealed=7, daysAfterOpening=7, openedTip="Keep refrigerated, use within a week"
- Bread: daysSealed=7, daysAfterOpening=5, openedTip="Store at room temp or freeze for longer life"

Reply ONLY with valid JSON, no markdown, no backticks:
{"items":[{"name":"...","brand":"...","unitPrice":4.99,"category":"...","location":"...","daysSealed":7,"daysAfterOpening":null,"storageTip":"...","openedTip":null,"inGeneralDaysMin":null,"inGeneralDaysMax":null}]}

If you cannot read the receipt clearly, return: {"items":[],"error":"Could not read receipt clearly"}`,
          },
        ],
      },
    ],
  };

  let lastErr;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await client.messages.create(params);
    } catch (e) {
      lastErr = e;
      const retryable = e?.status === 500 || e?.status === 529 || e?.status === 503;
      if (!retryable || attempt === 2) throw e;
      await new Promise((r) => setTimeout(r, 600 * (attempt + 1)));
    }
  }
  throw lastErr;
}

export async function POST(req) {
  try {
    if (!process.env.ANTHROPIC_API_KEY?.trim()) {
      return NextResponse.json({ items: [], error: "API authentication failed — check ANTHROPIC_API_KEY" }, { status: 401 });
    }
    const body = await req.json();
    const image = body.image || body.imageData;
    const mimeType = body.mimeType || body.mediaType;
    if (!image) return NextResponse.json({ error: "No image" }, { status: 400 });

    const resp = await createReceiptScanMessage(image, mimeType);

    const stopReason = resp?.stop_reason;
    console.log("Receipt scan stop_reason:", stopReason);
    if (stopReason === "max_tokens") {
      console.warn("Receipt scan hit max_tokens — response may be truncated");
    }

    const textBlock = Array.isArray(resp?.content) ? resp.content.find((c) => c.type === "text") : null;
    const rawText = (textBlock?.text || "").trim();
    console.log("Receipt scan raw response:", rawText.slice(0, 500));

    if (!rawText) {
      return NextResponse.json({ items: [], error: "Empty response from scanner", stopReason });
    }

    let text = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();
    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      text = text.slice(firstBrace, lastBrace + 1);
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (parseErr) {
      console.error("Receipt scan JSON parse error:", parseErr, "raw:", rawText);
      const snippet = rawText.length > 300 ? rawText.slice(0, 300) + "..." : rawText;
      const truncNote = stopReason === "max_tokens" ? " (response was truncated — try a shorter receipt)" : "";
      return NextResponse.json({
        items: [],
        error: `Could not parse scanner response${truncNote}: ${parseErr.message}`,
        rawResponse: snippet,
        stopReason,
      });
    }

    if (!data || typeof data !== "object") {
      return NextResponse.json({ items: [], error: "Invalid scanner response", rawResponse: rawText.slice(0, 300), stopReason });
    }
    if (!Array.isArray(data.items)) data.items = [];
    data.items = finalizeProduceScannerItems(data.items);
    return NextResponse.json(data);
  } catch (e) {
    console.error("Receipt scan error:", e);
    const { error, status } = aiErrorPayload(e, "Receipt scan failed");
    return NextResponse.json({
      items: [],
      error,
      errorType: e?.name || "Error",
      status,
    }, { status });
  }
}
