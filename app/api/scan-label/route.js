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
      text: "Analyze these food label photos. Extract: 1) Food name 2) Expiration date (YYYY-MM-DD format) 3) Category (Produce/Meat/Dairy/Bread/Condiments/Frozen/Pantry). Reply with ONLY valid JSON: {\"name\": \"...\", \"date\": \"YYYY-MM-DD\", \"category\": \"...\"}"
    }];

    images.forEach(img => {
      content.push({
        type: "image",
        source: {
          type: "base64",
          media_type: img.mediaType,
          data: img.data
        }
      });
    });

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [{ role: "user", content: content }]
    });

    const responseText = message.content[0].text;
    const jsonMatch = responseText.match(/\{[^}]+\}/);
    
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      return Response.json(result);
    }

    return Response.json({ error: 'Could not read label' }, { status: 500 });
    
  } catch (error) {
    console.error('Scan error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
