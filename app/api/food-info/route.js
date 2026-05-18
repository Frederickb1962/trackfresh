import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { finalizeProduceScannerItem } from "../../lib/aiProduceNormalize";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  try {
    const { name } = await req.json();
    if (!name) return NextResponse.json({ error: "No item name" }, { status: 400 });

    const resp = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 512,
      messages: [
        {
          role: "user",
          content: `You are a food safety expert. For this food item, provide shelf life and storage info.

Item: "${name}"

Reply ONLY with valid JSON, no markdown, no backticks:
{"daysSealed":7,"daysAfterOpening":null,"storageTip":"...","openedTip":null,"inGeneralDaysMin":null,"inGeneralDaysMax":null,"category":"...","location":"..."}

Rules:
- daysSealed = estimated days product lasts SEALED from purchase (for Produce use the conservative lower bound only)
- daysAfterOpening = days after OPENING for packaged goods (MUST be null if category is Produce)
- storageTip = brief storage tip for sealed product
- openedTip = brief tip after opening (MUST be null if category is Produce)
- inGeneralDaysMin / inGeneralDaysMax = for Produce ONLY: whole-day fresh shelf-life window (e.g. 3 and 5). For non-Produce use null.
- category = one of: Produce, Dairy, Meat, Pantry, Frozen, Beverages, Snacks, Bread, Condiments, Other
- location = recommended: "Fridge", "Freezer", or "Pantry"
- If category is Produce: daysAfterOpening and openedTip null; set inGeneralDaysMin/Max; daysSealed must equal inGeneralDaysMin.`,
        },
      ],
    });

    let text = resp.content[0].text.trim();
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(text);
    return NextResponse.json(finalizeProduceScannerItem(data));
  } catch (e) {
    console.error("Food info error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
