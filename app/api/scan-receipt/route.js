import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  try {
    const { image, mimeType } = await req.json();
    if (!image) return NextResponse.json({ error: "No image" }, { status: 400 });

    const resp = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 2048,
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

Look at this receipt and extract every food/grocery item you can find.

For EACH item, provide:
1. "name" - the product name (clean up receipt abbreviations into readable names)
2. "category" - one of: Produce, Dairy, Meat, Pantry, Frozen, Beverages, Snacks, Bread, Condiments, Other
3. "location" - recommended storage: "Fridge", "Freezer", or "Pantry"
4. "daysSealed" - estimated days the product lasts while SEALED/UNOPENED from purchase date
5. "daysAfterOpening" - estimated days the product lasts AFTER OPENING (null if not applicable, e.g. fresh produce)
6. "storageTip" - brief tip on storing sealed for max freshness
7. "openedTip" - brief tip on storing after opening (null if not applicable)

Use your food safety knowledge. Examples:
- Ketchup: daysSealed=365, daysAfterOpening=180, openedTip="Refrigerate after opening"
- Mustard: daysSealed=730, daysAfterOpening=365, openedTip="Refrigerate after opening"
- Mayo: daysSealed=365, daysAfterOpening=60, openedTip="Always refrigerate, never leave out over 2 hours"
- Fresh chicken: daysSealed=2, daysAfterOpening=null, storageTip="Keep in coldest part of fridge or freeze within 2 days"
- Milk: daysSealed=7, daysAfterOpening=7, openedTip="Keep refrigerated, use within a week"
- Bread: daysSealed=7, daysAfterOpening=5, openedTip="Store at room temp or freeze for longer life"

Reply ONLY with valid JSON, no markdown, no backticks:
{"items":[{"name":"...","category":"...","location":"...","daysSealed":7,"daysAfterOpening":null,"storageTip":"...","openedTip":null}]}

If you cannot read the receipt clearly, return: {"items":[],"error":"Could not read receipt clearly"}`,
            },
          ],
        },
      ],
    });

    let text = resp.content[0].text.trim();
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch (e) {
    console.error("Receipt scan error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
