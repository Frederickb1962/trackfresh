import Anthropic from '@anthropic-ai/sdk';

export async function POST(request) {
  try {
    const { images } = await request.json();
    if (!images || images.length === 0) {
      return Response.json({ error: 'No images' }, { status: 400 });
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || ''
    });

    const content = [{
      type: "text",
      text: "Look at these food label photos. Extract: name, expiration date (YYYY-MM-DD), category. Reply ONLY with JSON: {\"name\":\"...\",\"date\":\"YYYY-MM-DD\",\"category\":\"...\"}"
    }];

    images.forEach(img => {
      content.push({
        type: "image",
        source: { type: "base64", media_type: img.mediaType, data: img.data }
      });
    });

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [{ role: "user", content: content }]
    });

    const text = message.content[0].text;
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    return Response.json(parsed);
    
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
