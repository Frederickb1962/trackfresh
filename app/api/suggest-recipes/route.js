import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  try {
    const { items } = await req.json();
    if (!items || items.length === 0) return NextResponse.json({ recipes: [] });

    const itemList = items.map(it => {
      const days = it.daysLeft !== null ? ` (${it.daysLeft} days left)` : "";
      return `- ${it.name}${days} [${it.category}, ${it.location}]`;
    }).join("\n");

    const resp = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: `You are a creative home chef assistant. Based on the user's tracked food items below, suggest 5 recipes for the week that prioritize items expiring soonest.

TRACKED ITEMS:
${itemList}

For each recipe provide:
1. "name" - creative recipe name
2. "description" - 1-2 sentence appetizing description
3. "ingredients" - list of ingredients needed (mark which ones the user already has)
4. "instructions" - step-by-step cooking instructions (numbered, clear, concise)
5. "time" - estimated cook time (e.g. "25 min")
6. "difficulty" - Easy, Medium, or Hard
7. "usesExpiring" - list of tracked items this recipe uses that are expiring soon

Prioritize recipes that use the most items expiring soonest. Include a mix of quick weeknight meals and one more involved dish.

Reply ONLY with valid JSON, no markdown, no backticks:
{"recipes":[{"name":"...","description":"...","ingredients":["..."],"instructions":"1. ...\\n2. ...","time":"25 min","difficulty":"Easy","usesExpiring":["..."]}]}`
        }
      ]
    });

    let text = resp.content[0].text.trim();
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch (e) {
    console.error("Recipe suggestion error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
