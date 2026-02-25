import Anthropic from '@anthropic-ai/sdk';

export async function POST(request) {
  try {
    const body = await request.json();
    
    let imageContent = [];
    
    if (body.images && body.images.length > 0) {
      body.images.forEach(img => {
        imageContent.push({ type: "image", source: { type: "base64", media_type: img.mediaType, data: img.data } });
      });
    } else if (body.imageData && body.mediaType) {
      imageContent.push({ type: "image", source: { type: "base64", media_type: body.mediaType, data: body.imageData } });
    } else {
      return Response.json({ error: 'No images' }, { status: 400 });
    }

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || '' });

    const content = [
      { type: "text", text: "Find the food product name and expiration date. Reply ONLY with JSON: {\"name\":\"...\",\"date\":\"YYYY-MM-DD\",\"dateFound\":true} If no date visible, set date to \"\" and dateFound to false." },
      ...imageContent
    ];

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1024,
      messages: [{ role: "user", content: content }]
    });

    const text = message.content[0].text;
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    return Response.json({ item: parsed });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
