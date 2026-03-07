import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  try {
    const { expiring, available, dietaryNeeds } = await req.json();

    // Build dietary requirements section for the prompt
    const hasDietary = dietaryNeeds && dietaryNeeds.combinedTags && dietaryNeeds.combinedTags.length > 0;
    const dietarySection = hasDietary ? `
DIETARY REQUIREMENTS (ALL meals must comply):
- Combined household requirements: ${dietaryNeeds.combinedTags.join(", ")}${dietaryNeeds.household.length > 0 ? `\n- Whole household: ${dietaryNeeds.household.join(", ")}` : ""}${dietaryNeeds.members.length > 0 ? "\n- Individual members:\n" + dietaryNeeds.members.map(m => `  • ${m.name}: ${m.tags.join(", ")}`).join("\n") : ""}
Every single meal must be suitable for ALL listed dietary requirements. Do not suggest any meal that violates these restrictions.` : "- No dietary restrictions set.";

    const resp = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: `You are a meal planning expert. Create a weekly meal plan (Monday-Sunday, Breakfast/Lunch/Dinner) using the ingredients the user has.

PRIORITY: Use items expiring soon FIRST in earlier days of the week.

EXPIRING SOON (use these first!): ${expiring || "none listed"}
ALL AVAILABLE ITEMS: ${available || "none listed"}
${dietarySection}

Rules:
- Prioritize expiring items in Monday-Wednesday meals
- Make realistic, appetizing meals a home cook can make
- Vary cuisines and cooking styles across the week
- Breakfasts should be quick (10-15 min)
- Include at least 2 meals that can use leftovers
- If few items available, suggest simple meals and note what to buy
- Strictly follow all dietary requirements listed above

Reply ONLY with valid JSON, no markdown, no backticks. The format must be exactly:
{"plan":{"Monday-Breakfast":"Meal name","Monday-Lunch":"Meal name","Monday-Dinner":"Meal name","Tuesday-Breakfast":"...","Tuesday-Lunch":"...","Tuesday-Dinner":"...","Wednesday-Breakfast":"...","Wednesday-Lunch":"...","Wednesday-Dinner":"...","Thursday-Breakfast":"...","Thursday-Lunch":"...","Thursday-Dinner":"...","Friday-Breakfast":"...","Friday-Lunch":"...","Friday-Dinner":"...","Saturday-Breakfast":"...","Saturday-Lunch":"...","Saturday-Dinner":"...","Sunday-Breakfast":"...","Sunday-Lunch":"...","Sunday-Dinner":"..."}}`
        }
      ]
    });

    let text = resp.content[0].text.trim();
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch (e) {
    console.error("Meal plan error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
