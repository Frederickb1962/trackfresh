export async function POST(request) {
  try {
    const { barcode } = await request.json();
    if (!barcode) {
      return Response.json({ error: 'No barcode' }, { status: 400 });
    }

    const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    const data = await res.json();

    if (data.status !== 1 || !data.product) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    const p = data.product;
    const name = p.product_name || p.generic_name || 'Unknown Product';
    const category = p.categories_tags?.[0]?.replace('en:', '') || 'Other';
    const location = category.toLowerCase().includes('frozen') ? 'Freezer' : 'Fridge';

    return Response.json({
      item: { name, category, location }
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
