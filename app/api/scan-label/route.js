import Anthropic from "@anthropic-ai/sdk";

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
      return Response.json({ error: "No images" }, { status: 400 });
    }

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || "" });

    const parts = [
      "Look at this food product image carefully.",
      "Your TOP PRIORITY is identifying the PRODUCT NAME and BRAND.",
      "Look for large text logos and brand names.",
      "Even if blurry always give your best guess.",
      "Also look for any expiration use-by sell-by or best-by date.",
      "Reply ONLY with valid JSON with these fields:",
      "name (NEVER empty - always guess the product),",
      "date (YYYY-MM-DD or empty string if not found),",
      "dateFound (true or false),",
      "daysSealed (number),",
      "daysAfterOpening (number or null),",
      "storageTip (string),",
      "openedTip (string or null),",
      "category (Produce Dairy Meat Pantry Frozen Beverages Snacks Bread Condiments or Other),",
      "location (Fridge Freezer or Pantry).",
      "Example: {name: Hellmanns Real Mayonnaise, date: 2026-05-15, dateFound: true, category: Condiments, location: Fridge}"
    ];
    const prompt = parts.join(" ");

    const content = [{ type: "text", text: prompt }, ...imageContent];

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
