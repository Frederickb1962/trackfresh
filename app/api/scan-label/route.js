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
      text: "Look at these food label photos and extract: 1) Product name 2) Expiration/Use-by/Best-by date in YYYY-MM-DD format 3) Category (Produce/Meat/Dairy/Bread/Condiments/Frozen/Pantry). Reply with ONLY this exact JSON format with no other text: {\"name\": \"product name\", \"date\": \"YYYY-MM-DD\", \"category\": \"category name\"}"
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
    
    // More flexible JSON extraction
    const jsonMatch = responseText.match(/\{[\s\S]*?\}/);
    
    if (jsonMatch) {
      try {
        const result = JSON.parse(jsonMatch[0]);
        return Response.json(result);
      } catch (parseError) {
        return Response.json({ 
          error: 'Could not parse AI response', 
          rawResponse: responseText 
        }, { status: 500 });
      }
    }

    return Response.json({ 
      error: 'No JSON found in response',
      rawResponse: responseText
    }, { status: 500 });
    
  } catch (error) {
    console.error('Scan error:', error);
    return Response.json({ 
      error: error.message,
      details: error.toString()
    }, { status: 500 });
  }
}
