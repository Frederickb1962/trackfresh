export async function GET() {
  try {
    const url = "https://api.fda.gov/food/enforcement.json?limit=10&sort=report_date:desc";
    const res = await fetch(url);
    if (res.ok === false) throw new Error("FDA API error: " + res.status);
    const data = await res.json();
    const recalls = (data.results || []).map((r, i) => ({
      id: i + 1,
      product: (r.product_description || "Unknown Product").slice(0, 120),
      brand: r.recalling_firm || "Unknown",
      reason: (r.reason_for_recall || "See FDA for details").slice(0, 150),
      date: r.report_date || "",
      severity: r.classification === "Class I" ? "high" : r.classification === "Class II" ? "medium" : "low",
      classification: r.classification || "",
      status: r.status || "",
    }));
    return Response.json({ recalls, updated: new Date().toISOString() });
  } catch (error) {
    console.error("FDA fetch error:", error);
    return Response.json({ recalls: [], error: error.message }, { status: 200 });
  }
}
