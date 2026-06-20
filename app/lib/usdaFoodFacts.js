/** USDA FSIS food-safety facts — sourced from public FSIS guidance on establishment numbers. */

export const USDA_EST_SOURCE_URL =
  "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/how-find-usda-establishment";

export const USDA_FSIS_RECALLS_URL =
  "https://www.fsis.usda.gov/recalls-public-health-alerts";

export const USDA_EST_FACTS = {
  en: [
    "Look for the circular USDA inspection mark on meat, poultry, and egg product labels — the establishment number is printed inside the seal.",
    "Meat plants use an \"M\" prefix (e.g., M-45678); poultry plants use a \"P\" prefix (e.g., P-12345).",
    "Products with the USDA mark of inspection have passed FSIS inspection for wholesomeness.",
    "You can look up any establishment number at FSIS.usda.gov to see which facility processed the food.",
    "USDA FSIS regulates meat, poultry, and processed egg products. FDA regulates most other foods — produce, seafood, dairy, and packaged goods.",
    "No USDA mark? The item may be FDA-regulated (like fresh fish or vegetables) or exempt from federal inspection.",
  ],
  es: [
    "Busca el sello circular de inspecci\u00f3n USDA en carnes, aves y huevos procesados \u2014 el n\u00famero del establecimiento est\u00e1 dentro del sello.",
    "Las plantas de carne usan prefijo \"M\" (ej. M-45678); las de aves usan \"P\" (ej. P-12345).",
    "Los productos con el sello USDA pasaron inspecci\u00f3n FSIS de inocuidad.",
    "Puedes buscar cualquier n\u00famero de establecimiento en FSIS.usda.gov para ver qu\u00e9 planta proces\u00f3 el alimento.",
    "USDA FSIS regula carnes, aves y huevos procesados. FDA regula la mayor\u00eda de otros alimentos \u2014 produce, mariscos, l\u00e1cteos y envasados.",
    "\u00bfSin sello USDA? Puede ser regulado por FDA (pescado fresco o vegetales) o exento de inspecci\u00f3n federal.",
  ],
  fr: [
    "Cherchez le sceau circulaire d'inspection USDA sur la viande, la volaille et les \u0153ufs \u2014 le num\u00e9ro d'\u00e9tablissement est dans le sceau.",
    "Les usines de viande utilisent le pr\u00e9fixe \"M\" ; la volaille utilise \"P\".",
    "Les produits portant la marque USDA ont pass\u00e9 l'inspection FSIS.",
    "Vous pouvez rechercher tout num\u00e9ro d'\u00e9tablissement sur FSIS.usda.gov.",
    "L'USDA FSIS r\u00e9glemente viande, volaille et \u0153ufs transform\u00e9s. La FDA r\u00e9glemente la plupart des autres aliments.",
    "Pas de marque USDA\u00a0? Le produit peut relever de la FDA ou \u00eatre exempt\u00e9 d'inspection f\u00e9d\u00e9rale.",
  ],
  it: [
    "Cerca il timbro circolare USDA su carne, pollame e uova \u2014 il numero dello stabilimento \u00e8 dentro il sigillo.",
    "Gli stabilimenti di carne usano il prefisso \"M\"; il pollame usa \"P\".",
    "I prodotti con il marchio USDA hanno superato l'ispezione FSIS.",
    "Puoi cercare qualsiasi numero di stabilimento su FSIS.usda.gov.",
    "USDA FSIS regola carne, pollame e uova lavorate. La FDA regola la maggior parte degli altri alimenti.",
    "Nessun marchio USDA? Il prodotto pu\u00f2 essere regolato dalla FDA o esente da ispezione federale.",
  ],
};

export const USDA_ALERT_NOTE = {
  en: "USDA FSIS posts recalls and public health alerts for meat, poultry, and egg products. Live USDA feeds are not available in-app — tap below for the latest from FSIS.",
  es: "USDA FSIS publica retiros y alertas de salud para carnes, aves y huevos. Los feeds en vivo de USDA no est\u00e1n disponibles en la app \u2014 toca abajo para lo m\u00e1s reciente de FSIS.",
  fr: "L'USDA FSIS publie des rappels pour viande, volaille et \u0153ufs. Consultez FSIS ci-dessous pour les alertes en direct.",
  it: "USDA FSIS pubblica richiami per carne, pollame e uova. Tocca sotto per gli avvisi FSIS pi\u00f9 recenti.",
};

export function usdaFactsForLang(lang) {
  return USDA_EST_FACTS[lang] || USDA_EST_FACTS.en;
}

export function usdaAlertNoteForLang(lang) {
  return USDA_ALERT_NOTE[lang] || USDA_ALERT_NOTE.en;
}
