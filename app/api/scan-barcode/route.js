export async function POST(request) {
  try {
    const { barcode } = await request.json();
    if (!barcode) return Response.json({ error: 'No barcode' }, { status: 400 });

    const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    const data = await res.json();

    if (data.status !== 1 || !data.product) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    const p = data.product;
    const brand = p.brands?.split(',')[0]?.trim() || '';
    const productName = p.product_name || p.generic_name || '';
    // Build name: "Starbucks Espresso & Cream" not just "Espresso"
    let name = productName;
    if (brand && productName && !productName.toLowerCase().includes(brand.toLowerCase())) {
      name = brand + ' ' + productName;
    } else if (brand && !productName) {
      name = brand + ' Product';
    }
    name = name || 'Unknown Food Product';

    const cats = (p.categories_tags || []).join(' ').toLowerCase();
    let category = 'Other';
    if (cats.includes('meat') || cats.includes('poultry') || cats.includes('seafood')) category = 'Meat';
    else if (cats.includes('dairy') || cats.includes('milk') || cats.includes('cheese') || cats.includes('yogurt')) category = 'Dairy';
    else if (cats.includes('produce') || cats.includes('fruit') || cats.includes('vegetable')) category = 'Produce';
    else if (cats.includes('frozen')) category = 'Meat';
    else if (cats.includes('beverage') || cats.includes('drink') || cats.includes('juice') || cats.includes('coffee') || cats.includes('tea')) category = 'Other';
    else if (cats.includes('bread') || cats.includes('cereal') || cats.includes('snack') || cats.includes('condiment') || cats.includes('sauce')) category = 'Pantry';

    const location = cats.includes('frozen') ? 'Freezer' : 
                     ['Dairy','Meat','Produce'].includes(category) ? 'Fridge' : 'Pantry';

    return Response.json({ item: { name, category, location, brand } });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}