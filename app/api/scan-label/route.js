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
      { type: "text", text: "Look at this food product image carefully. Your TOP PRIORITY is identifying the PRODUCT NAME and BRAND. Look for large text, logos, brand names like Hellmanns, Kraft, Heinz, Oscar Mayer etc. Even if blurry, always give your best guess. Also look for any expiration, use-by, sell-by, or best-by date anywhere on the package. Reply ONLY with valid JSON: {\\"name\\":\\"Brand Product (e.g. Hellmanns Real Mayonnaise)\\",\\"date\\":\\"YYYY-MM-DD\\",\\"dateFound\\":true,\\"daysSealed\\":90,\\"daysAfterOpening\\":60,\\"storageTip\\":\\"Keep refrigerated\\",\\"openedTip\\":\\"Use within 2 months after opening\\",\\"category\\":\\"Condiments\\",\\"location\\":\\"Fridge\\"} CRITICAL RULES: 1) name must NEVER be empty. Always guess. 2) If no date visible set date to empty string and dateFound to false. 3) category must be: Produce, Dairy, Meat, Pantry, Frozen, Beverages, Snacks, Bread, Condiments, or Other. 4) location must be: Fridge, Freezer, or Pantry." },
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
