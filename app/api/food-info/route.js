import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

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
{"daysSealed":7,"daysAfterOpening":null,"storageTip":"...","openedTip":null,"category":"...","location":"..."}

Rules:
- daysSealed = estimated days product lasts SEALED from purchase
- daysAfterOpening = days after OPENING (null if not applicable like fresh produce)
- storageTip = brief storage tip for sealed product
- openedTip = brief tip after opening (null if not applicable)
- category = one of: Produce, Dairy, Meat, Pantry, Frozen, Beverages, Snacks, Bread, Condiments, Other
- location = recommended: "Fridge", "Freezer", or "Pantry"`,
        },
      ],
    });

    let text = resp.content[0].text.trim();
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch (e) {
    console.error("Food info error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
