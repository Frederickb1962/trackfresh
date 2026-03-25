import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  try {
    const { question, recentMessages } = await req.json();
    if (!question) return NextResponse.json({ error: "No question" }, { status: 400 });

    const context = (recentMessages || [])
      .slice(-6)
      .filter(m => !m.isBot)
      .map(m => `${m.author}: ${m.text}`)
      .join("\n");

    const resp = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 300,
      messages: [{
        role: "user",
        content: `You are TrackFresh AI, a friendly food expert in a community chat. Keep answers concise (2-4 sentences), warm, and practical. Focus on food storage, cooking tips, shelf life, and reducing food waste.

${context ? `Recent chat:\n${context}\n\n` : ""}User asks: ${question}

Reply conversationally as if chatting. No markdown formatting.`
      }]
    });

    return NextResponse.json({ reply: resp.content[0].text.trim() });
  } catch (e) {
    console.error("Community chat AI error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
