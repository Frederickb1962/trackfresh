
"use client";

import { TUTORIALS, TOUR_SLIDES } from "./lib/tourData";

import { GLOBAL_STYLES } from "./lib/styles";


import React, { useEffect, useMemo, useRef, useState } from "react";
import { Bell, PlusCircle, ChefHat, Users, ShoppingCart } from "lucide-react";
import { AiBadge, GreenDot, TrackFreshLogo } from "./components/ui/TrackFreshLogo";
import MarketingPage from "./components/MarketingPage";
import GroceryScanModal from "./components/GroceryScanModal";
import SmartScanner from "./components/SmartScanner";
import { FOOD_ES, FOOD_DB } from "./lib/foodData";
import { CATEGORY_COLORS, LOCATION_COLORS, LOCATION_ICONS } from "./lib/uiConstants";
import { MealSearchInput, FoodAutocomplete, CommunityStewAnim } from "./components/ui/MealComponents";


const LANG_KEY = "trackfresh.lang";
const T = {
  appTagline: { en: "\u2728 Your AI-powered kitchen assistant", es: "\u2728 Tu asistente de cocina con IA" },
  howToUse: { en: "How to use", es: "C\u00f3mo usar" },
  signOut: { en: "Sign Out", es: "Cerrar Sesi\u00f3n" },
  signOutConfirm: { en: "Sign out of TrackFresh?", es: "\u00bfCerrar sesi\u00f3n de TrackFresh?" },
  betaTesting: { en: "Beta Testing", es: "Prueba Beta" },
  enterAccessCode: { en: "Enter your access code to continue", es: "Ingresa tu c\u00f3digo de acceso" },
  enterBeta: { en: "Enter Beta", es: "Entrar a Beta" },
  invalidCode: { en: "Invalid code. Try again.", es: "C\u00f3digo inv\u00e1lido. Intenta de nuevo." },
  contactFreddie: { en: "Contact Freddie for access", es: "Contacta a Freddie para acceso" },
  welcomeTitle: { en: "Welcome to TrackFresh.AI!", es: "\u00a1Bienvenido a TrackFresh.AI!" },
  welcomeDesc: { en: "The smart way to track your groceries, reduce food waste, and save money.", es: "La forma inteligente de rastrear tus alimentos, reducir el desperdicio y ahorrar dinero." },
  welcomeF1: { en: "AI-powered label, barcode & receipt scanning", es: "Escaneo de etiquetas, códigos de barras y recibos con IA" },
  welcomeF2: { en: "Smart expiry predictions, alerts & freeze reminders", es: "Predicciones de vencimiento, alertas y avisos de congelación" },
  welcomeF3: { en: "Voice-powered hands-free entry", es: "Entrada manos libres por voz" },
  welcomeF4: { en: "AI recipe suggestions from what's in your fridge", es: "Recetas con IA basadas en lo que tienes en tu refrigerador" },
  welcomeF5: { en: "Weekly meal planner & smart shopping lists", es: "Planificador semanal de comidas y listas de compras inteligentes" },
  welcomeF6: { en: "Community recipes, tips & food storage advice", es: "Recetas, consejos y almacenamiento de alimentos en comunidad" },
  welcomeF7: { en: "Full English & Spanish language support", es: "Soporte completo en inglés y español" },
  welcomeLocal: { en: "Your data is stored locally on your device. No account required.", es: "Tus datos se guardan en tu dispositivo. No necesitas cuenta." },
  getStarted: { en: "\ud83d\ude80 Get Started", es: "\ud83d\ude80 Comenzar" },
  tracker: { en: "Tracker", es: "Rastreador" },
  trackerDesc: { en: "AI tracks your food & freshness", es: "IA rastrea tu comida y frescura" },
  recipes: { en: "Recipes", es: "Recetas" },
  recipesDesc: { en: "AI recipes from your fridge", es: "Recetas con IA de tu refrigerador" },
  shopping: { en: "Shopping", es: "Compras" },
  shoppingDesc: { en: "Smart shopping with AI alerts", es: "Compras inteligentes con alertas IA" },
  meals: { en: "Meals", es: "Comidas" },
  mealsDesc: { en: "AI plans meals from what you have", es: "IA planifica comidas con lo que tienes" },
  stores: { en: "Stores", es: "Tiendas" },
  storesDesc: { en: "Shop your favorite stores", es: "Compra en tus tiendas favoritas" },
  communityWord: { en: "Community", es: "Comunidad" },
  communityDesc: { en: "Connect & share with others", es: "Con\u00e9ctate y comparte con otros" },
  aiScanTitle: { en: "\u2728 AI Food Scanner", es: "\u2728 Esc\u00e1ner de Alimentos con IA" },
  aiScanDesc: { en: "Choose how AI should add your items", es: "Elige c\u00f3mo la IA debe agregar tus productos" },
  receipt: { en: "Receipt", es: "Recibo" },
  receiptDesc: { en: "AI reads your receipt instantly", es: "La IA lee tu recibo al instante" },
  barcodeWord: { en: "Barcode", es: "C\u00f3digo" },
  barcodeDesc: { en: "AI identifies any product", es: "La IA identifica cualquier producto" },
  label: { en: "Label", es: "Etiqueta" },
  labelDesc: { en: "AI extracts label details", es: "La IA extrae detalles de la etiqueta" },
  quickAdd: { en: "Quick Add", es: "Agregar" },
  quickAddDesc: { en: "Quick add with AI autocomplete", es: "Agrega r\u00e1pido con autocompletado IA" },
  myItems: { en: "My Items", es: "Mis Productos" },
  myItemsDesc: { en: "Your AI-monitored inventory", es: "Tu inventario monitoreado por IA" },
  back: { en: "Back", es: "Atr\u00e1s" },
  home: { en: "Home", es: "Inicio" },
  itemWord: { en: "Item", es: "Producto" },
  quantity: { en: "Quantity", es: "Cantidad" },
  category: { en: "Category", es: "Categor\u00eda" },
  locationWord: { en: "Location", es: "Ubicaci\u00f3n" },
  useByWord: { en: "Use By", es: "Consumir Antes De" },
  openedOpt: { en: "Opened (optional)", es: "Abierto (opcional)" },
  trackedItemsTitle: { en: "Tracked Items", es: "Productos Rastreados" },
  clearAll: { en: "Clear All", es: "Borrar Todo" },
  clearAllConfirm: { en: "Clear all tracked items and start fresh?", es: "\u00bfBorrar todos los productos y empezar de nuevo?" },
  noFilter: { en: "No items match this filter.", es: "Ning\u00fan producto coincide con este filtro." },
  days: { en: "days", es: "d\u00edas" },
  used: { en: "Used", es: "Usado" },
  edit: { en: "Edit", es: "Editar" },
  remove: { en: "Remove", es: "Quitar" },
  editItemTitle: { en: "\u270f\ufe0f Edit Item", es: "\u270f\ufe0f Editar Producto" },
  nameWord: { en: "Name", es: "Nombre" },
  useByDate: { en: "Use By Date", es: "Fecha de Vencimiento" },
  save: { en: "Save", es: "Guardar" },
  cancel: { en: "Cancel", es: "Cancelar" },
  expiringSoon: { en: "Expiring Soon!", es: "\u00a1Vence Pronto!" },
  useItemsSoon: { en: "Use these items soon, freeze them, or check for recipes!", es: "\u00a1Usa estos productos pronto, cong\u00e9lalos o busca recetas!" },
  gotIt: { en: "Got it", es: "Entendido" },
  findRecipes: { en: "Find Recipes", es: "Buscar Recetas" },
  scanReceiptTitle: { en: "\ud83d\udcf7 Scan Receipt", es: "\ud83d\udcf7 Escanear Recibo" },
  scanReceiptDesc: { en: "Upload a receipt photo and our AI will instantly identify every food item, category, and shelf life.", es: "Sube una foto del recibo y nuestra IA identificar\u00e1 cada producto al instante." },
  takePhoto: { en: "Take Photo", es: "Tomar Foto" },
  openCamera: { en: "Open camera", es: "Abrir c\u00e1mara" },
  uploadPhoto: { en: "Upload Photo", es: "Subir Foto" },
  fromGallery: { en: "From gallery", es: "Desde galer\u00eda" },
  readingReceipt: { en: "Claude is reading your receipt...", es: "Claude est\u00e1 leyendo tu recibo..." },
  scanBarcodeTitle: { en: "\ud83d\udce6 Scan Barcode", es: "\ud83d\udce6 Escanear C\u00f3digo de Barras" },
  scanBarcodeDesc: { en: "Point your camera at the barcode on any food package.", es: "Apunta tu c\u00e1mara al c\u00f3digo de barras de cualquier paquete." },
  lookingUp: { en: "Looking up product...", es: "Buscando producto..." },
  productFound: { en: "\u2705 Product found!", es: "\u2705 \u00a1Producto encontrado!" },
  whereStoring: { en: "Where are you storing this?", es: "\u00bfD\u00f3nde vas a guardar esto?" },
  addToTracker: { en: "Add to Tracker", es: "Agregar al Rastreador" },
  scanAnother: { en: "Scan Another", es: "Escanear Otro" },
  tryAgain: { en: "Try again", es: "Intentar de nuevo" },
  scanLabelTitle: { en: "\ud83c\udff7\ufe0f Scan Package Label", es: "\ud83c\udff7\ufe0f Escanear Etiqueta" },
  scanLabelDesc: { en: "Take a photo of the package label and Claude will read the item name and date automatically.", es: "Toma una foto de la etiqueta y Claude leer\u00e1 el nombre y la fecha." },
  tapUpload: { en: "Tap to upload package photo", es: "Toca para subir foto del paquete" },
  jpgPng: { en: "JPG, PNG supported", es: "Se aceptan JPG, PNG" },
  readingLabel: { en: "Claude is reading the label...", es: "Claude est\u00e1 leyendo la etiqueta..." },
  quickAddTitle: { en: "\u270f\ufe0f Quick Add", es: "\u270f\ufe0f Agregar R\u00e1pido" },
  quickAddTitleDesc: { en: "Select a food from the list or type your own.", es: "Selecciona un alimento o escribe el tuyo." },
  foodItem: { en: "Food Item", es: "Alimento" },
  recipeSugg: { en: "Recipe Suggestions", es: "Sugerencias de Recetas" },
recipeIntro: { en: "Matched to what's in your fridge, pantry & freezer.", es: "Basado en lo que tienes en tu refrigerador, despensa y congelador." },
noMatches: { en: "No matches found. Try adding more items like eggs, carrots, or onions.", es: "Sin coincidencias. Agrega más alimentos como huevos, zanahorias o cebollas." },
  ingredientsWord: { en: "Ingredients", es: "Ingredientes" },
  instructionsWord: { en: "Instructions", es: "Instrucciones" },
  shoppingList: { en: "Shopping List", es: "Lista de Compras" },
  clearChecked: { en: "Clear Checked", es: "Borrar Marcados" },
  emptyList: { en: "Your shopping list is empty.", es: "Tu lista de compras est\u00e1 vac\u00eda." },
  mealPlanner: { en: "Meal Planner", es: "Planificador de Comidas" },
  mealDesc: { en: "Tap any slot to add a meal. \u26a1 means it uses ingredients expiring soon.", es: "Toca cualquier espacio para agregar comida." },
  joinComm: { en: "Join the Community", es: "\u00danete a la Comunidad" },
  chooseName: { en: "Choose a display name to get started.", es: "Elige un nombre para comenzar." },
  joinWord: { en: "Join", es: "Unirse" },
  changeName: { en: "Change name", es: "Cambiar nombre" },
  commChat: { en: "Community Chat", es: "Chat de la Comunidad" },
  noMsg: { en: "No messages yet \u2014 say hello!", es: "No hay mensajes \u2014 \u00a1di hola!" },
  sendWord: { en: "Send", es: "Enviar" },
  recipeExch: { en: "Recipe Exchange", es: "Intercambio de Recetas" },
  shareRecipe: { en: "Share Recipe", es: "Compartir Receta" },
  noRecipes: { en: "No recipes shared yet \u2014 be the first!", es: "No hay recetas \u2014 \u00a1s\u00e9 el primero!" },
  tipsIdeas: { en: "Tips & Ideas", es: "Consejos e Ideas" },
  postWord: { en: "Post", es: "Publicar" },
  noTips: { en: "No tips yet \u2014 share one!", es: "No hay consejos \u2014 \u00a1comparte uno!" },
  shopOnline: { en: "Shop Online", es: "Comprar en L\u00ednea" },
  shopOnlineDesc: { en: "Tap any store to shop for groceries online.", es: "Toca cualquier tienda para comprar alimentos." },
  shopNow: { en: "Shop Now \u2192", es: "Comprar Ahora \u2192" },
  close: { en: "Close", es: "Cerrar" },
  addBtn: { en: "Add", es: "Agregar" },
  fdaRecalls: { en: "FDA Recalls", es: "Retiros FDA" },
  fdaRecallsDesc: { en: "Check food safety alerts", es: "Consulta alertas de seguridad alimentaria" },
  fdaRecallsBanner: { en: "Active FDA Food Recalls", es: "Retiros Activos de la FDA" },
  fdaLoading: { en: "Checking FDA recalls...", es: "Verificando retiros FDA..." },
  fdaError: { en: "Could not load recalls", es: "No se pudieron cargar los retiros" },
  fdaViewAll: { en: "View All Recalls", es: "Ver Todos los Retiros" },
  fdaClose: { en: "Close", es: "Cerrar" },
  fdaClassI: { en: "Dangerous", es: "Peligroso" },
  fdaClassII: { en: "Moderate", es: "Moderado" },
  fdaClassIII: { en: "Low Risk", es: "Bajo Riesgo" },
  smartScanTitle: { en: "Smart Scanner", es: "Escaner Inteligente" },
  smartScanDesc: { en: "Auto-detects barcodes, labels & dates", es: "Auto-detecta codigos, etiquetas y fechas" },
  smartScanFound: { en: "Found", es: "Encontrado" },
  smartScanNoDate: { en: "No date found - enter manually", es: "Sin fecha - ingrese manualmente" },
  smartScanRetry: { en: "Scan Again", es: "Escanear Otra Vez" },
  smartScanWhere: { en: "Where are you storing it?", es: "Donde lo guardas?" },
  smartScanDateAuto: { en: "Auto-detected from label", es: "Auto-detectado de la etiqueta" },
  smartScanDate: { en: "Scan Date from Package", es: "Escanear Fecha del Paquete" },
  smartScanDateDesc: { en: "Flip package over and photograph the date", es: "Voltea el paquete y fotografa la fecha" },
  smartScanDateReading: { en: "Reading date...", es: "Leyendo fecha..." },
  howManyItems: { en: "How many items are you scanning?", es: "¿Cuántos productos vas a escanear?" },
  singleScan: { en: "Single Scan", es: "Escaneo Único" },
  multiScans: { en: "Mult. Scans", es: "Múlt. Escaneos" },
  scanReceipts: { en: "Scan Receipt(s)", es: "Escanear Recibo(s)" },
  scanLabels: { en: "Scan Label(s)", es: "Escanear Etiqueta(s)" },
  scanBarcodes: { en: "Scan Barcode(s)", es: "Escanear Código(s)" },
  pickAMeal: { en: "Pick a Meal", es: "Elegir una Comida" },
  addMeal: { en: "+ Add meal", es: "+ Agregar comida" },
  changeWord: { en: "Change", es: "Cambiar" },
  expiringSoonTitle: { en: "🔔 Expiring Soon — Add to List?", es: "🔔 ¡Vence Pronto! — ¿Agregar a la lista?" },
  expiringSoonDesc: { en: "These items expire within 7 days. Tap to add a replacement to your shopping list.", es: "Estos productos vencen en 7 días. Toca para agregar un reemplazo a tu lista." },
  addedWord: { en: "Added", es: "Agregado" },
  addWord: { en: "+ Add", es: "+ Agregar" },
  addItemPlaceholder: { en: "Add item…", es: "Agregar artículo…" },
  qtyPlaceholder: { en: "Qty", es: "Cant." },
  displayNamePlaceholder: { en: "Your display name", es: "Tu nombre de pantalla" },
  signedInAs: { en: "Signed in as", es: "Conectado como" },
  chatTabLabel: { en: "💬 Chat", es: "💬 Chat" },
  recipesTabLabel: { en: "📖 Recipes", es: "📖 Recetas" },
  tipsTabLabel: { en: "💡 Tips", es: "💡 Consejos" },
  typeMessage: { en: "Type a message…", es: "Escribe un mensaje…" },
  recipeTitlePlaceholder: { en: "Recipe title", es: "Título de receta" },
  ingredientsPlaceholder: { en: "Ingredients and instructions…", es: "Ingredientes e instrucciones…" },
  tipSharePlaceholder: { en: "Share a food storage tip…", es: "Comparte un consejo de almacenamiento…" },
  listeningDate: { en: "Listening for expiration date...", es: "Escuchando la fecha de vencimiento..." },
  saySampleDate: { en: "Say something like March 15, 2026", es: "Di algo como 15 de marzo de 2026" },
  addAndNext: { en: "➕ Add & Scan Next", es: "➕ Agregar y Escanear Siguiente" },
  tapToScanNext: { en: "Tap to scan next item", es: "Toca para escanear el siguiente" },
  tapToPhoto: { en: "Tap to photograph label", es: "Toca para fotografiar la etiqueta" },
  tapOpenCamera: { en: "Tap to open camera", es: "Toca para abrir cámara" },
  doneWord: { en: "Done", es: "Listo" },
  sayDateExample: { en: "Say date e.g. February 20, 2026", es: "Di la fecha ej. 20 de febrero de 2026" },
  freezeByLabel: { en: "Freeze By", es: "Congelar Antes De" },
  expDateLabel: { en: "Exp. Date", es: "Fecha de Venc." },
  usesExpiring: { en: "uses expiring", es: "usa los que vencen" },
  storingWhere: { en: "Where are you storing this?", es: "¿Dónde vas a guardar esto?" },
};


const STORAGE_KEY = "trackfresh.items";
const COMMUNITY_KEY = "trackfresh.community";
const USERNAME_KEY = "trackfresh.username";
const SHOPPING_KEY = "trackfresh.shopping";
const MEAL_KEY = "trackfresh.meals";
const SAVED_RECIPES_KEY = "trackfresh.savedRecipes";
const RECIPE_MODE_KEY = "trackfresh.recipeMode";

const CATEGORIES = ["Produce", "Dairy", "Meat", "Pantry", "Leftovers", "Other"];
const LOCATIONS = ["Fridge", "Freezer", "Pantry"];

const SHELF_LIFE_AFTER_OPENING = [
  { keys: ["ketchup"],                     days: 180 },
  { keys: ["mustard"],                     days: 365 },
  { keys: ["pickle"],                      days: 90  },
  { keys: ["mayo", "mayonnaise"],          days: 60  },
  { keys: ["salsa"],                       days: 14  },
  { keys: ["pasta sauce","tomato sauce","marinara","spaghetti sauce"], days: 7 },
  { keys: ["milk"],                        days: 7   },
  { keys: ["almond milk","oat milk","soy milk"], days: 10 },
  { keys: ["salad dressing","dressing","vinaigrette"], days: 60 },
  { keys: ["jam", "jelly", "preserves"],   days: 180 },
  { keys: ["peanut butter","almond butter","nut butter"], days: 90 },
  { keys: ["soy sauce"],                   days: 730 },
  { keys: ["worcestershire"],              days: 365 },
  { keys: ["hot sauce","sriracha","tabasco"], days: 180 },
  { keys: ["olive oil","vegetable oil","canola oil"], days: 60 },
  { keys: ["coconut oil"],                 days: 365 },
  { keys: ["cream cheese"],               days: 10  },
  { keys: ["sour cream"],                 days: 14  },
  { keys: ["cottage cheese"],             days: 7   },
  { keys: ["yogurt"],                     days: 14  },
  { keys: ["butter"],                     days: 30  },
  { keys: ["heavy cream","whipping cream","half and half"], days: 7 },
  { keys: ["orange juice","apple juice","grape juice","juice"], days: 7 },
  { keys: ["salami","pepperoni"],         days: 21  },
  { keys: ["deli meat","lunch meat","turkey breast","ham slices"], days: 5 },
  { keys: ["bread","bagel","buns","rolls"], days: 7 },
  { keys: ["parmesan","romano"],          days: 30  },
  { keys: ["cheddar","mozzarella","swiss","provolone","cheese"], days: 21 },
  { keys: ["hummus"],                     days: 7   },
  { keys: ["guacamole"],                  days: 3   },
  { keys: ["wine"],                       days: 5   },
  { keys: ["coffee","cold brew"],         days: 14  },
  { keys: ["maple syrup","syrup"],        days: 365 },
  { keys: ["honey"],                      days: 9999},
  { keys: ["salted caramel","bbq sauce","barbecue"], days: 120 },
  { keys: ["fish sauce","oyster sauce"],  days: 180 },
  { keys: ["chicken broth","beef broth","vegetable broth"], days: 5 },
];

function getShelfLifeDays(name) {
  const lower = (name || "").toLowerCase();
  for (const entry of SHELF_LIFE_AFTER_OPENING) {
    if (entry.keys.some(k => lower.includes(k))) return entry.days;
  }
  return null;
}

function addDaysToDate(dateStr, days) {
  const d = new Date(dateStr + "T12:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function fuzzyMatchItems(query, items) {
  const q = query.toLowerCase().trim();
  if (!q) return items;
  return items.filter(it => it.name.toLowerCase().includes(q));
}


const RECIPE_DB = [
  { name: "Classic Omelette", ingredients: ["eggs","butter","cheese","milk"], requires: ["eggs"], description: "A quick egg omelette with whatever fillings you have.", time: "10 min", instructions: "1. Crack 2-3 eggs into a bowl, add a splash of milk, and whisk well.\n2. Heat butter in a non-stick pan over medium heat until foamy.\n3. Pour in the egg mixture and let it set for 30 seconds.\n4. Using a spatula, gently push the edges toward the center.\n5. Add cheese or any fillings to one half.\n6. Fold the omelette in half and slide onto a plate.\n7. Season with salt and pepper and serve immediately." },
  { name: "Vegetable Stir Fry", ingredients: ["carrots","onions","garlic","oil"], requires: ["carrots","onions"], description: "Healthy stir fry using fresh vegetables.", time: "15 min", instructions: "1. Slice carrots into thin rounds and dice onions.\n2. Heat oil in a wok or large pan over high heat.\n3. Add onions and stir fry for 2 minutes until softened.\n4. Add carrots and any other vegetables.\n5. Add minced garlic and stir fry for another 3-4 minutes.\n6. Season with soy sauce, salt and pepper.\n7. Serve over rice or noodles." },
  { name: "French Onion Soup", ingredients: ["onions","butter","broth","bread","cheese"], requires: ["onions"], description: "Rich caramelized onion soup.", time: "45 min", instructions: "1. Slice onions thinly. Melt butter in a heavy pot over medium-low heat.\n2. Add onions and cook slowly for 25-30 minutes until deep golden brown.\n3. Pour in broth and simmer for 10 minutes.\n4. Season with salt and pepper.\n5. Ladle into oven-safe bowls, top with toasted bread.\n6. Cover with shredded cheese and broil until bubbly.\n7. Serve immediately." },
  { name: "Potato Hash", ingredients: ["potatos","onions","eggs","butter"], requires: ["potatos"], description: "Crispy pan-fried potatoes with onions.", time: "20 min", instructions: "1. Dice potatoes into small cubes.\n2. Heat butter in a large skillet over medium-high heat.\n3. Add potatoes in a single layer and press down.\n4. Cook without stirring for 5-7 minutes until golden.\n5. Flip and add diced onions.\n6. Cook another 5 minutes until crispy.\n7. Make wells and crack eggs into them.\n8. Cover and cook until eggs are set." },
  { name: "Mashed Potatoes", ingredients: ["potatos","butter","milk","salt"], requires: ["potatos"], description: "Creamy mashed potatoes.", time: "25 min", instructions: "1. Peel and cut potatoes into even chunks.\n2. Cover with cold salted water and bring to a boil.\n3. Cook for 15-18 minutes until fork-tender.\n4. Drain and return to hot pot for 1 minute to dry.\n5. Mash with a potato masher.\n6. Heat butter and milk together, then mix into potatoes.\n7. Season with salt and white pepper." },
  { name: "Berry Smoothie", ingredients: ["berries","milk","yogurt","banana","honey"], requires: ["berries"], description: "Blend up those berries before they go.", time: "5 min", instructions: "1. Add berries to blender.\n2. Add a banana for creaminess.\n3. Pour in milk.\n4. Add a spoonful of yogurt.\n5. Drizzle in honey to taste.\n6. Blend on high for 45-60 seconds until smooth.\n7. Pour into a glass and serve." },
  { name: "Glazed Carrots", ingredients: ["carrots","butter","honey","salt"], requires: ["carrots"], description: "Sweet butter-glazed carrots.", time: "15 min", instructions: "1. Peel and slice carrots into coins.\n2. Place in a pan with enough water to cover.\n3. Bring to a boil and cook for 5 minutes.\n4. Drain most water, leaving a few tablespoons.\n5. Add butter and honey.\n6. Toss carrots over medium heat for 3-4 minutes until glazed.\n7. Season with salt and serve." },
  { name: "Carrot Soup", ingredients: ["carrots","onions","butter","cream","broth"], requires: ["carrots"], description: "Smooth warming carrot soup.", time: "30 min", instructions: "1. Chop carrots and onions roughly.\n2. Melt butter in a pot, add onions and cook for 5 minutes.\n3. Add carrots and cook another 3 minutes.\n4. Pour in broth to cover.\n5. Simmer for 15-20 minutes until carrots are very soft.\n6. Blend until completely smooth.\n7. Stir in cream, season with salt, pepper, and ginger." },
  { name: "Egg Fried Rice", ingredients: ["eggs","rice","carrots","onions","soy sauce"], requires: ["eggs","rice"], description: "Satisfying fried rice with eggs and vegetables.", time: "20 min", instructions: "1. Use day-old cold rice if possible.\n2. Dice carrots small and chop onions.\n3. Heat oil in a wok over high heat.\n4. Fry onions and carrots for 3 minutes.\n5. Push to the side, crack in eggs, and scramble.\n6. Add rice and break up any clumps.\n7. Add soy sauce and toss over high heat for 3-4 minutes." },
  { name: "Deviled Eggs", ingredients: ["eggs","mayonaise","mustard","paprika"], requires: ["eggs","mayonaise"], description: "Classic deviled eggs.", time: "20 min", instructions: "1. Boil eggs for exactly 10 minutes, then transfer to ice water.\n2. Peel eggs and slice in half lengthwise.\n3. Remove yolks into a bowl.\n4. Mash yolks with mayonnaise, mustard, salt and pepper.\n5. Spoon filling back into the egg white halves.\n6. Dust with paprika and refrigerate until ready to serve." },
  { name: "Shakshuka", ingredients: ["eggs","tomatoes","onions","garlic","ketchup"], requires: ["eggs"], description: "Eggs poached in spiced tomato sauce.", time: "25 min", instructions: "1. Heat olive oil in a wide pan over medium heat.\n2. Saute diced onion for 5 minutes until soft.\n3. Add minced garlic and cook 1 minute.\n4. Add chopped tomatoes and ketchup.\n5. Season with cumin, paprika, salt and chili flakes.\n6. Simmer sauce for 10 minutes until thickened.\n7. Make wells and crack eggs into them.\n8. Cover and cook 5-8 minutes until whites are set.\n9. Serve with crusty bread." },
  { name: "Roasted Vegetables", ingredients: ["carrots","potatos","onions","garlic","oil"], requires: ["carrots","potatos"], description: "Roast everything together for an easy hearty dish.", time: "40 min", instructions: "1. Preheat oven to 425F.\n2. Cut carrots, potatoes, and onions into similar-sized chunks.\n3. Toss with olive oil, salt, pepper, and garlic.\n4. Spread in a single layer on a baking sheet.\n5. Roast for 20 minutes, then flip vegetables.\n6. Roast another 15-20 minutes until golden and caramelized.\n7. Sprinkle with fresh herbs and serve hot." },
  { name: "Ketchup Glazed Chicken", ingredients: ["ketchup","chicken","garlic","onions"], requires: ["ketchup"], description: "Simple ketchup-glazed chicken.", time: "35 min", instructions: "1. Mix ketchup with garlic, vinegar, and brown sugar.\n2. Season chicken with salt and pepper.\n3. Heat oil in an oven-safe pan over medium-high heat.\n4. Sear chicken for 3-4 minutes per side.\n5. Pour glaze over the chicken.\n6. Bake at 375F for 20-25 minutes.\n7. Rest 5 minutes before serving." },
  { name: "Onion Soup Pasta", ingredients: ["onions","pasta","butter","cheese"], requires: ["onions"], description: "Simple pasta with caramelized onions and cheese.", time: "25 min", instructions: "1. Slice onions thinly and cook in butter over low heat for 15-20 minutes until golden.\n2. Cook pasta in well-salted boiling water.\n3. Reserve 1 cup of pasta water before draining.\n4. Add pasta to the onions and toss.\n5. Add pasta water a splash at a time to create a sauce.\n6. Season well with salt and pepper.\n7. Serve topped with grated cheese." },
  { name: "Scrambled Eggs on Toast", ingredients: ["eggs","butter","bread","milk"], requires: ["eggs"], description: "Perfect creamy scrambled eggs.", time: "8 min", instructions: "1. Crack eggs into a cold pan, add butter and a splash of milk.\n2. Place over low-medium heat and stir continuously.\n3. Keep stirring, bringing the curds together slowly.\n4. Remove from heat while still slightly underdone.\n5. Season with salt and pepper.\n6. Toast and butter bread.\n7. Pile eggs onto toast and serve immediately." },
  { name: "Frittata", ingredients: ["eggs","onions","carrots","cheese","butter"], requires: ["eggs"], description: "Italian baked omelette great for using up vegetables.", time: "25 min", instructions: "1. Preheat oven to 375F.\n2. Saute any vegetables in an oven-safe pan until softened.\n3. Whisk eggs with salt, pepper, and a splash of cream.\n4. Pour egg mixture over the vegetables.\n5. Cook on stovetop for 3-4 minutes until edges are set.\n6. Transfer to oven and bake 10-12 minutes until puffed and golden.\n7. Let cool slightly, slice like a pizza and serve." },
  { name: "Mayonnaise Roasted Potatoes", ingredients: ["potatos","mayonaise","garlic"], requires: ["potatos","mayonaise"], description: "Incredibly crispy roasted potatoes using the mayo trick.", time: "45 min", instructions: "1. Preheat oven to 425F.\n2. Cut potatoes into wedges or chunks.\n3. Toss thoroughly with mayonnaise, garlic, salt, and pepper.\n4. Spread on a baking sheet in a single layer.\n5. Roast for 20 minutes until golden on the bottom.\n6. Flip and roast another 15 minutes until crispy all over.\n7. Serve with ketchup or sour cream." },
  { name: "Ribeye Steak", ingredients: ["ribeye","butter","garlic","thyme"], requires: ["ribeye"], description: "Perfect pan-seared ribeye with garlic butter.", time: "20 min", instructions: "1. Take steak out of fridge 30 minutes before cooking.\n2. Pat dry and season with salt and pepper.\n3. Heat cast iron skillet until smoking.\n4. Sear 3-4 minutes per side.\n5. Add butter, garlic, and thyme.\n6. Baste continuously for 1-2 minutes.\n7. Rest 5 minutes before slicing.", temps: [{"label":"Rare","temp":"125F","color":"bg-red-100 text-red-800"},{"label":"Medium Rare","temp":"135F","color":"bg-orange-100 text-orange-800"},{"label":"Medium","temp":"145F","color":"bg-yellow-100 text-yellow-800","safe":true},{"label":"Well Done","temp":"160F","color":"bg-green-100 text-green-800","safe":true}] },
  { name: "Roast Chicken", ingredients: ["chicken","butter","garlic","thyme"], requires: ["chicken"], description: "Classic roast chicken with crispy skin.", time: "90 min", instructions: "1. Preheat oven to 425F.\n2. Pat chicken dry inside and out.\n3. Rub all over with butter, salt, pepper, and garlic.\n4. Roast breast side up for 60-75 minutes.\n5. Baste every 20 minutes.\n6. Rest 10 minutes before carving.", temps: [{"label":"USDA Safe Minimum","temp":"165F","color":"bg-green-100 text-green-800","safe":true}] },
  { name: "Pan Seared Salmon", ingredients: ["salmon","butter","lemon","garlic"], requires: ["salmon"], description: "Crispy skin salmon with lemon butter.", time: "15 min", instructions: "1. Pat salmon dry and season with salt and pepper.\n2. Heat oil over medium-high heat.\n3. Place skin side down and press gently.\n4. Cook 4-5 minutes until skin is crispy.\n5. Flip and cook 2-3 more minutes.\n6. Add butter and lemon juice and serve.", temps: [{"label":"Safe Minimum","temp":"145F","color":"bg-green-100 text-green-800","safe":true}] },
];

function fmtDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function daysUntil(dateString) {
  if (!dateString) return null;
  const today = new Date();
  const target = new Date(dateString + "T00:00:00");
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function suggestRecipes(trackedItems) {
  if (!trackedItems || trackedItems.length === 0) return [];
  const itemNames = trackedItems.map((it) => it.name.toLowerCase().trim());
  const scored = RECIPE_DB.map((recipe) => {
    const hasRequired = recipe.requires.every((req) =>
      itemNames.some((item) => item.includes(req) || req.includes(item))
    );
    if (!hasRequired) return null;
    const usedItems = trackedItems.filter((it) =>
      recipe.ingredients.some((ing) => it.name.toLowerCase().includes(ing) || ing.includes(it.name.toLowerCase()))
    );
    const urgencyScore = usedItems.reduce((sum, it) => {
      const days = daysUntil(it.useByDate);
      return days !== null ? sum + Math.max(0, 30 - days) : sum;
    }, 0);
    return { ...recipe, urgencyScore, usedItems };
  }).filter(Boolean);
  scored.sort((a, b) => b.urgencyScore - a.urgencyScore);
  return scored.slice(0, 5);
}

// Returns a human-readable after-opening label for an item card.
function afterOpeningLabel(it) {
  if (it.openedTip) {
    const hasTimeframe = /\b(day|days|week|weeks|month|months|year|years)\b/i.test(it.openedTip);
    if (hasTimeframe || !it.daysAfterOpening) return it.openedTip;
    const d = it.daysAfterOpening;
    const duration = d <= 14 ? `${d} days` : d <= 60 ? `${Math.round(d / 7)} weeks` : `${Math.round(d / 30)} months`;
    return `${it.openedTip} · Use within ${duration}`;
  }
  const d = it.daysAfterOpening;
  if (!d) return null;
  const duration = d <= 14 ? `${d} days` : d <= 60 ? `${Math.round(d / 7)} weeks` : `${Math.round(d / 30)} months`;
  const loc = it.location ?? "Fridge";
  const cat = it.category ?? "Other";
  if (loc === "Pantry" && cat === "Condiments") return `Refrigerate, use within ${duration}`;
  if (loc === "Pantry" && cat === "Beverages") return `Refrigerate after opening, use within ${duration}`;
  if (loc === "Pantry" && ["Dairy", "Meat"].includes(cat)) return `Move to fridge, use within ${duration}`;
  if (cat === "Bread" && loc === "Pantry") return `Use within ${duration}, or freeze`;
  return `Use within ${duration}`;
}

// Returns the earliest relevant date for an item — used for sorting, daysLeft, and urgency.
function effectiveDate(it) {
  const pkg  = it.useByDate ? new Date(it.useByDate  + "T00:00:00").getTime() : null;
  const open = it.openUseBy ? new Date(it.openUseBy  + "T00:00:00").getTime() : null;
  if (pkg !== null && open !== null) return Math.min(pkg, open);
  if (pkg  !== null) return pkg;
  if (open !== null) return open;
  return null;
}

function loadItems(key = STORAGE_KEY) {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return parsed.map((it) => ({
      id:               it.id ?? crypto.randomUUID(),
      name:             (it.name ?? "").trim(),
      useByDate:        it.useByDate        ?? "",
      openDate:         it.openDate         ?? "",
      openUseBy:        it.openUseBy        ?? null,
      category:         it.category         ?? "Other",
      quantity:         it.quantity         ?? "",
      location:         it.location         ?? "Fridge",
      storageTip:       it.storageTip       ?? "",
      openedTip:        it.openedTip        ?? "",
      daysAfterOpening: it.daysAfterOpening ?? null,
      freezeBy:         it.freezeBy         ?? "",
    }));
  } catch (e) { return []; }
}

function saveItems(items, key = STORAGE_KEY) {
  const sorted = [...items].sort((a, b) => {
    const da = effectiveDate(a) ?? Infinity;
    const db = effectiveDate(b) ?? Infinity;
    return da - db;
  });
  try { localStorage.setItem(key, JSON.stringify(sorted)); } catch (e) {}
}

function loadCommunity(key = COMMUNITY_KEY) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : { recipes: [], tips: [], chat: [] };
  } catch (e) { return { recipes: [], tips: [], chat: [] }; }
}

function saveCommunity(data, key = COMMUNITY_KEY) {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch (e) {}
}

function loadShopping(key = SHOPPING_KEY) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

function saveShopping(items, key = SHOPPING_KEY) {
  try { localStorage.setItem(key, JSON.stringify(items)); } catch (e) {}
}

function loadMeals(key = MEAL_KEY) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}

function saveMeals(meals, key = MEAL_KEY) {
  try { localStorage.setItem(key, JSON.stringify(meals)); } catch (e) {}
}

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const MEAL_SLOTS = ["Breakfast","Lunch","Dinner"];



function BloomText({ text, duration = 8 }) {
  const chars = text.split("");
  const n = chars.length;
  return (
    <span style={{display:"inline",fontWeight:700}}>
      {chars.map((ch, i) => (
        <span key={i} style={{
          display:"inline-block",
          whiteSpace: ch === " " ? "pre" : "normal",
          animation:`letterPop ${duration}s ease-in-out ${(i/n*duration).toFixed(2)}s infinite`,
          color:"#f97316",
        }}>{ch === " " ? "\u00a0" : ch}</span>
      ))}
    </span>
  );
}

const PILL = {base:{display:"inline-flex",alignItems:"center",gap:"0.25rem",borderRadius:"6px",padding:"0.18rem 0.6rem",fontSize:"0.63rem",fontWeight:700,lineHeight:1.4,border:"1px solid rgba(0,0,0,0.3)"},gray:{background:"#f3f4f6",color:"#374151"},orange:{background:"#f5fad0",color:"#5a6e0a"},blue:{background:"#eff6ff",color:"#1d4ed8"},cyan:{background:"#ecfeff",color:"#0e7490"}};
function TipPill({ type, children }) { return <span style={{...PILL.base,...PILL[type]}}>{children}</span>; }

function ShoppingAutocomplete({ value, onChange, onSelect, onAddItem, lang }) {
  const fn = (name) => (lang === "es" && FOOD_ES[name]) ? FOOD_ES[name] : name;
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const ref = useRef(null);

  const matches = useMemo(() => {
    if (!value || value.length < 1) return [];
    const q = value.toLowerCase();
    return FOOD_DB.filter((f) => f.name.toLowerCase().includes(q) || (FOOD_ES[f.name] && FOOD_ES[f.name].toLowerCase().includes(q))).slice(0, 8);
  }, [value]);

  useEffect(() => { setHighlighted(0); }, [matches]);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (open && matches.length > 0) { e.preventDefault(); onSelect(matches[highlighted]); setOpen(false); }
      else { onAddItem && onAddItem(); }
      return;
    }
    if (!open || matches.length === 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setHighlighted((h) => Math.min(h + 1, matches.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHighlighted((h) => Math.max(h - 1, 0)); }
    else if (e.key === "Escape") { setOpen(false); }
  };

  return (
    <div className="relative flex-1" ref={ref}>
      <input
        value={value}
        onChange={(e) => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => { if (value) setOpen(true); }}
        onKeyDown={handleKeyDown}
        placeholder={lang === "es" ? "Agregar artículo..." : "Add item..."}
        className="w-full rounded-xl px-3 py-2 text-sm text-gray-900"
      />
      {open && matches.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border bg-white shadow-lg" style={{maxHeight:"220px",overflowY:"auto"}}>
          {matches.map((f, i) => (
            <button
              key={f.name}
              onMouseDown={() => { onSelect(f); setOpen(false); }}
              onMouseEnter={() => setHighlighted(i)}
              className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm ${highlighted === i ? "bg-green-50" : "hover:bg-green-50"}`}
            >
              <span>{fn(f.name)}</span>
              <div className="flex items-center gap-1">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${LOCATION_COLORS[f.location]}`}>{LOCATION_ICONS[f.location]} {f.location}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[f.category]}`}>{f.category}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Card({ children, className = "", style = {} }) {
  return <div className={`rounded-2xl border border-green-900/20 bg-white/95 backdrop-blur-md p-5 card-3d card-premium ${className}`} style={style}>{children}</div>;
}

function TabBar({ active, onChange }) {
  return (
    <div className="flex gap-1 rounded-2xl bg-gradient-to-r from-green-900 to-emerald-800 p-1.5 shadow-lg">
      {[["tracker","🥦 Tracker"],["recipes","🍳 Recipes"],["shopping","🛒 Shopping List"],["meals","📅 Meals"],["community","👥 Community"]].map(([id, label]) => (
        <button key={id} onClick={() => onChange(id)} className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all duration-300 ${active === id ? "bg-white text-green-800 pill-3d-active scale-[1.02]" : "text-green-100/70 hover:text-white hover:bg-white/10 pill-3d"}`}>{label}</button>
      ))}
    </div>
  );
}

function BarcodeScanner({ onDetected }) {
  const videoRef = useRef(null);
  const [error, setError] = useState("");
  const detectedRef = useRef(false);
  const readerRef = useRef(null);

  useEffect(() => {
    detectedRef.current = false;
    async function startScanner() {
if (readerRef.current) { readerRef.current.reset(); readerRef.current = null; }
      try {
        const { BrowserMultiFormatReader } = await import("@zxing/library");
        readerRef.current = new BrowserMultiFormatReader();
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } } }); if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play(); }
        
        await readerRef.current.decodeFromStream(videoRef.current.srcObject, videoRef.current, (result, err) => {
          if (result && !detectedRef.current) {
            detectedRef.current = true;
            if (readerRef.current) readerRef.current.reset();
            onDetected(result.getText());
          }
        });
      } catch (e) {
        setError("Camera access denied or not available. Please allow camera access.");
      }
    }
    startScanner();
    return () => { if (readerRef.current) { readerRef.current.reset(); readerRef.current = null; } if (videoRef.current && videoRef.current.srcObject) { videoRef.current.srcObject.getTracks().forEach(t => t.stop()); videoRef.current.srcObject = null; } };
  }, []);

  return (
    <div className="relative">
      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : (
        <div className="relative overflow-hidden rounded-lg bg-black">
          <video ref={videoRef} className="w-full rounded-lg" style={{ height: "240px", objectFit: "cover" }} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="border-2 border-red-400 rounded w-48 h-24 opacity-70" />
          </div>
          <p className="absolute bottom-2 left-0 right-0 text-center text-xs text-white bg-black/40 py-1">Point at barcode</p>
        </div>
      )}
    </div>
  );
}








export default function TrackFreshDashboard() {
  const [lang, setLang] = useState("en");
  const changeLang = (l) => { setLang(l); try { localStorage.setItem(LANG_KEY, l); } catch(e) {} };
  React.useEffect(() => { try { const saved = localStorage.getItem(LANG_KEY); if (saved) setLang(saved); } catch(e) {} }, []);
  const t = (key) => { const e = T[key]; return e ? (e[lang] || e.en || key) : key; };

  
  const [showMarketing, setShowMarketing] = useState(true);
  React.useEffect(() => { try { if (typeof window !== "undefined" && window.sessionStorage && sessionStorage.getItem("tf_mkt_seen") === "1") setShowMarketing(false); } catch(e) {} }, []);
  const handleLaunchApp = () => { setShowMarketing(false); try { if (window.sessionStorage) sessionStorage.setItem("tf_mkt_seen", "1"); } catch(e) {} };
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const handlePwSubmit = () => {
    if (pwInput === "fresh2026" || pwInput === "CarlosG2026") {
      setIsUnlocked(true); setPwError(false);
      try { if (window.sessionStorage) { sessionStorage.setItem("tf_ok", "1"); if (pwInput === "fresh2026") sessionStorage.setItem("tf_admin", "1"); } } catch(e) {}
      if (pwInput === "fresh2026") setIsAdmin(true);
      try { if (localStorage.getItem("tf_disclaimer_seen") !== "1") setShowDisclaimer(true); } catch(e) {}
    } else { setPwError(true); }
  };
  const [isAdmin, setIsAdmin] = useState(false);
  React.useEffect(() => { try { if (typeof window !== "undefined" && window.sessionStorage) { if (sessionStorage.getItem("tf_ok") === "1") { setIsUnlocked(true); try { if (localStorage.getItem("tf_disclaimer_seen") !== "1") setShowDisclaimer(true); } catch(e) {} } if (sessionStorage.getItem("tf_admin") === "1") setIsAdmin(true); } } catch(e) {} }, []);
  const [activeTab, setActiveTab] = useState("home");
  const homeTopRef = React.useRef(null);
  const [burstingBubble, setBurstingBubble] = useState(null);
  const trackerTopRef = React.useRef(null);
  const [trackerEntryFlash, setTrackerEntryFlash] = useState(false);
  const [trackerLinkOverlay, setTrackerLinkOverlay] = useState(false);
  const [trackerTileFlash, setTrackerTileFlash] = useState(false);
  useEffect(() => {
    if (trackerEntryFlash) {
      const t = setTimeout(() => setTrackerEntryFlash(false), 650);
      return () => clearTimeout(t);
    }
  }, [trackerEntryFlash]);
  const handleGoToTracker = () => {
    setTrackerTileFlash(true);
    setTrackerLinkOverlay(true);
    setTimeout(() => {
      setTrackerEntryFlash(true);
      setActiveTab("tracker");
    }, 240);
    setTimeout(() => {
      setTrackerTileFlash(false);
      setTrackerLinkOverlay(false);
    }, 900);
  };
  const handleBubbleTap = (target) => {
    setBurstingBubble(target);
    setTimeout(() => {
      setActiveTab(target);
      setBurstingBubble(null);
    }, 550);
  };
  const [trackedItems, setTrackedItems] = useState([]);
  const [justAddedFirst, setJustAddedFirst] = useState(false);
  const prevItemCount = React.useRef(0);
  const [itemName, setItemName] = useState("");
  const [useByDate, setUseByDate] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [category, setCategory] = useState("Other");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("Fridge");
  const [showAlert, setShowAlert] = useState(false);
  const [alertItem, setAlertItem] = useState({ name: "", daysLeft: 0 });
  const [editingItem, setEditingItem] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [recipeSuggestions, setRecipeSuggestions] = useState([]);
  const [recipesGenerated, setRecipesGenerated] = useState(false);
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  const [addedIngredients, setAddedIngredients] = useState({});
  const [restockAdded, setRestockAdded] = useState({});
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState(() => { try { return JSON.parse(localStorage.getItem("tf_favorite_recipes") || "[]"); } catch(e) { return []; } });
  const [recipeSubTab, setRecipeSubTab] = useState("ai");
  const [favoriteSavedMsg, setFavoriteSavedMsg] = useState({});
  const [username, setUsername] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [community, setCommunity] = useState({ recipes: [], tips: [], chat: [] });
  const [communityTab, setCommunityTab] = useState("chat");
  const [fdaRecalls, setFdaRecalls] = useState([]);
  const [fdaLoading, setFdaLoading] = useState(false);
  const [showRecallsPanel, setShowRecallsPanel] = useState(false);
  const [recipeMode, setRecipeMode] = useState("suggest");
  const [editDateListening, setEditDateListening] = useState(false);
  const [editDateError, setEditDateError] = useState("");
  const [suggCategory, setSuggCategory] = useState("feature");
  const [suggMessage, setSuggMessage] = useState("");
  const [suggName, setSuggName] = useState("");
  const [suggSubmitting, setSuggSubmitting] = useState(false);
  const [suggSubmitted, setSuggSubmitted] = useState(false);
  const [voteCounts, setVoteCounts] = useState({});

  useEffect(() => {
    if (!showRecallsPanel) return;
    let cancelled = false;
    setFdaLoading(true);
    fetch("/api/fda-recalls")
      .then(function(r) { return r.json(); })
      .then(function(d) {
        if (!cancelled && d.recalls) {
          setFdaRecalls(d.recalls);
        }
        if (!cancelled) setFdaLoading(false);
      })
      .catch(function(e) {
        console.error("FDA error:", e);
        if (!cancelled) setFdaLoading(false);
      });
    return function() { cancelled = true; };
  }, [showRecallsPanel]);
  const [newRecipeTitle, setNewRecipeTitle] = useState("");
  const [newRecipeBody, setNewRecipeBody] = useState("");
  const [newTip, setNewTip] = useState("");
  const [newChat, setNewChat] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [shoppingItems, setShoppingItems] = useState([]);
  const [newShoppingItem, setNewShoppingItem] = useState("");
  const [newShoppingQty, setNewShoppingQty] = useState("count");
  const [newShoppingQtyNum, setNewShoppingQtyNum] = useState("1");
  const [selectedReceiptItems, setSelectedReceiptItems] = useState([]);
  const [showLabelScanner, setShowLabelScanner] = useState(false);
  const [labelItem, setLabelItem] = useState(null);
  const [labelScanning, setLabelScanning] = useState(false);
  const [labelError, setLabelError] = useState("");
  const [labelScanCount, setLabelScanCount] = useState(0);
  const [labelLastItem, setLabelLastItem] = useState("");
  const [labelScanMode, setLabelScanMode] = useState(null);
  const [labelScanKey, setLabelScanKey] = useState(0);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddName, setQuickAddName] = useState("");
  const [quickAddDate, setQuickAddDate] = useState("");
  const [quickAddQty, setQuickAddQty] = useState("");
  const [pendingDateItems, setPendingDateItems] = useState([]);
  const [pendingDateIndex, setPendingDateIndex] = useState(0);
  const [pendingPickedDate, setPendingPickedDate] = useState("");
  const [pendingVoiceListening, setPendingVoiceListening] = useState(false);
  const [pendingVoiceError, setPendingVoiceError] = useState("");
  const [pendingVoiceAwaitND, setPendingVoiceAwaitND] = useState(false);
  const pendingNDRef = React.useRef(null);
  const [quickAddCategory, setQuickAddCategory] = useState("Other");
  const [quickAddLocation, setQuickAddLocation] = useState("Fridge");
  const [meals, setMeals] = useState({});
  const [showMealPicker, setShowMealPicker] = useState(false);
  const [mealPickerDay, setMealPickerDay] = useState("");
  const [mealPickerSlot, setMealPickerSlot] = useState("");
  const [mealPickerSearch, setMealPickerSearch] = useState("");
  const [aiPlanLoading, setAiPlanLoading] = useState(false);
  const [compExpanded, setCompExpanded] = useState({});
  const toggleComp = (key) => setCompExpanded(p => ({...p, [key]: !p[key]}));
  const DIETARY_KEY = "tf_dietary";
  const [dietaryRestrictions, setDietaryRestrictions] = useState(() => { try { return JSON.parse(localStorage.getItem(DIETARY_KEY) || "{}"); } catch(e) { return {}; } });
  const toggleDietary = (key) => setDietaryRestrictions(p => { const next = {...p, [key]: !p[key]}; try { localStorage.setItem(DIETARY_KEY, JSON.stringify(next)); } catch(e) {} return next; });
  const [familyMembers, setFamilyMembers] = useState(() => { try { return JSON.parse(localStorage.getItem("tf_family") || "[]"); } catch(e) { return []; } });
  const [familyInput, setFamilyInput] = useState("");
  const [expandedMember, setExpandedMember] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  const [editMemberName, setEditMemberName] = useState("");
  const DIETARY_TAGS = [["vegetarian","🥗","Vegetarian","Vegetariano"],["vegan","🌱","Vegan","Vegano"],["glutenFree","🌾","Gluten-Free","Sin Gluten"],["dairyFree","🥛","Dairy-Free","Sin Lácteos"],["nutFree","🥜","Nut-Free","Sin Nueces"],["keto","🥑","Keto","Keto"],["paleo","🍖","Paleo","Paleo"],["halal","☪️","Halal","Halal"],["kosher","✡️","Kosher","Kosher"],["pescatarian","🐟","Pescatarian","Pescetariano"],["lowSodium","🧂","Low-Sodium","Bajo en Sodio"],["lowSugar","🩺","Diabetic/Low Sugar","Diabético/Bajo Azúcar"],["lowFat","🫀","Low-Fat","Bajo en Grasa"],["eggFree","🥚","Egg-Free","Sin Huevo"],["soyFree","🫘","Soy-Free","Sin Soya"],["shellfishFree","🦐","Shellfish-Free","Sin Mariscos"],["whole30","🔄","Whole30","Whole30"],["mediterranean","🫒","Mediterranean","Mediterráneo"],["fodmap","🦠","FODMAP","FODMAP"],["intermittentFasting","⏱️","Intermittent Fasting","Ayuno Intermitente"]];
  const saveMembersToStorage = (next) => { try { localStorage.setItem("tf_family", JSON.stringify(next)); } catch(e) {} };
  const addFamilyMember = () => { if (!familyInput.trim()) return; const next = [...familyMembers, {name: familyInput.trim(), restrictions: {}}]; setFamilyMembers(next); saveMembersToStorage(next); setFamilyInput(""); };
  const removeFamilyMember = (i) => { const next = familyMembers.filter((_,idx) => idx !== i); setFamilyMembers(next); saveMembersToStorage(next); if (expandedMember === i) setExpandedMember(null); };
  const toggleMemberTag = (i, key) => { const next = familyMembers.map((m, idx) => idx === i ? {...m, restrictions: {...(m.restrictions||{}), [key]: !(m.restrictions||{})[key]}} : m); setFamilyMembers(next); saveMembersToStorage(next); };
  const saveMemberName = (i) => { if (!editMemberName.trim()) return; const next = familyMembers.map((m, idx) => idx === i ? {...m, name: editMemberName.trim()} : m); setFamilyMembers(next); saveMembersToStorage(next); setEditingMember(null); setEditMemberName(""); };
  const [quickVoiceListening, setQuickVoiceListening] = useState("");
  const [quickVoiceError, setQuickVoiceError] = useState("");
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [scanMode, setScanMode] = useState(null);
  const [multiScanCount, setMultiScanCount] = useState(0);
  const [multiScanLastItem, setMultiScanLastItem] = useState("");
  const multiScanTimer = React.useRef(null);
  const resetMultiScanTimer = () => {
    if (multiScanTimer.current) clearTimeout(multiScanTimer.current);
    multiScanTimer.current = setTimeout(() => {
      setShowBarcodeScanner(false); setBarcodeItem(null); setBarcodeError(""); setBarcodeDetected("");
      setMultiScanCount(0); setMultiScanLastItem("");
    }, 30000);
  };
  const [barcodeScanKey, setBarcodeScanKey] = useState(0);
  const [barcodeItem, setBarcodeItem] = useState(null);
  const [barcodeScanning, setBarcodeScanning] = useState(false);
  const [barcodeError, setBarcodeError] = useState("");
  const [barcodeDetected, setBarcodeDetected] = useState("");
  const [barcodeLocation, setBarcodeLocation] = useState("");
  const [barcodeUseBy, setBarcodeUseBy] = useState("");
  const [barcodeFreezeBy, setBarcodeFreezeBy] = useState("");
  const [showSmartScanner, setShowSmartScanner] = useState(false);
  const [showGroceryScan, setShowGroceryScan] = useState(false);
  const [showOpenedDropdown, setShowOpenedDropdown] = useState(false);
  const [showMultiScanner, setShowMultiScanner] = useState(false);
  const [multiScanStatus, setMultiScanStatus] = useState("camera");
  const [multiItems, setMultiItems] = useState([]);
  const [multiScanError, setMultiScanError] = useState("");
  const [selectedMultiItems, setSelectedMultiItems] = useState([]);
  const [smartMultiItems, setSmartMultiItems] = useState([]);
  const [selectedSmartMulti, setSelectedSmartMulti] = useState([]);
  const [showSmartMultiReview, setShowSmartMultiReview] = useState(false);
  const smartCaptureRef = useRef(null);
  const [smartResult, setSmartResult] = useState(null);
  const [smartError, setSmartError] = useState("");
  const [smartLocation, setSmartLocation] = useState("");
  const [smartUseBy, setSmartUseBy] = useState("");
  const [smartFreezeBy, setSmartFreezeBy] = useState("");
  const [scanningDate, setScanningDate] = useState(false);

  const handleSmartResult = (item) => {
    setSmartResult(item); setSmartError("");
    if (item.date && item.dateFound) setSmartUseBy(item.date);
    if (item.location) setSmartLocation(item.location);
    if (!item.dateFound || !item.date) {

    }
  };

  const startVoiceDatePrompt = (productName) => {
    console.log("[VOICE] startVoiceDatePrompt called for:", productName);
    setVoicePromptDone(false);
    window.speechSynthesis.cancel();
    const speak = () => {
      const msg = new SpeechSynthesisUtterance("I found " + productName + ". Say the expiration date, or enter it manually.");
      const voices = window.speechSynthesis.getVoices();
      const natural = voices.find(v => v.name === "Google US English")
        || voices.find(v => v.name === "Samantha")
        || voices.find(v => v.name.includes("Zoe") && v.lang.startsWith("en"))
        || voices.find(v => v.lang === "en-US");
      if (natural) msg.voice = natural;
      msg.pitch = 1.05;
      msg.rate = 0.9;
      msg.onend = () => { console.log("[VOICE] date prompt speech ended, starting voice listening"); startVoiceListening(); };
      msg.onerror = (e) => { console.log("[VOICE] date prompt speech ERROR:", e.error, "— still starting voice listening"); startVoiceListening(); };
      window.speechSynthesis.speak(msg);
    };
    if (window.speechSynthesis.getVoices().length > 0) { speak(); }
    else { window.speechSynthesis.addEventListener('voiceschanged', function onVoicesChanged() { window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged); speak(); }); }
  };

  const startVoiceListening = () => {
    console.log("[VOICE] DATE listener started");
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { console.log("[VOICE] no SR support, aborting"); setVoicePromptDone(true); return; }
    const recognition = new SR();
    recognition.lang = lang === "es" ? "es-MX" : "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setVoiceListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("[VOICE] heard date transcript:", transcript);
      const parsed = parseSpokenDate(transcript);
      if (parsed) {
        console.log("[VOICE] date parsed:", parsed, "— advancing to next step");
        setSmartUseBy(parsed);
        setSmartResult(prev => prev ? {...prev, dateFound: true, date: parsed} : prev);
        setVoiceListening(false);
        setVoicePromptDone(true);
        speakThen("Got it. Do you have more items? Say Next to continue or Done to finish.", () => {
          console.log("[VOICE] NEXT/DONE listener started via startVoiceCommand");
          setVoiceFlowStep("listening_next");
          startVoiceCommand((cmd2) => handleVoiceNextDone(cmd2));
        });
      } else {
        console.log("[VOICE] date not parsed from:", transcript);
        const retry = new SpeechSynthesisUtterance("Sorry, I did not catch that. Please enter the date manually.");
        retry.rate = 1.0;
        window.speechSynthesis.speak(retry);
        setVoiceListening(false);
        setVoicePromptDone(true);
      }
    };
    recognition.onerror = (e) => { console.log("[VOICE] DATE recognition error:", e.error); setVoiceListening(false); setVoicePromptDone(true); };
    recognition.onend = () => { console.log("[VOICE] DATE recognition ended"); setVoiceListening(false); };
    recognition.start();
    console.log("[VOICE] DATE recognition.start() called");
  };
  const [uniScanCount, setUniScanCount] = useState(0);
  const [uniScanLastItem, setUniScanLastItem] = useState("");
  const [voiceFlowStep, setVoiceFlowStep] = useState(null);
  const [smartScanKey, setSmartScanKey] = useState(0);
  const [voiceFlowPaused, setVoiceFlowPaused] = useState(false);
  const [showVoiceEditForm, setShowVoiceEditForm] = useState(false);
  const uniScanTimer = React.useRef(null);
  const voiceFlowRef = React.useRef(null);
  const voiceCmdRef = React.useRef(null);
  const voiceFeedbackTimer = React.useRef(null);
  const voiceNDTimeoutRef = React.useRef(null);
  const [showExpiryVoice, setShowExpiryVoice] = useState(false);
  const [expiryVoiceItems, setExpiryVoiceItems] = useState([]);
  const [expiryVoiceLog, setExpiryVoiceLog] = useState([]);
  const [expiryVoiceStatus, setExpiryVoiceStatus] = useState("speaking");
  const expiryVoiceRef = React.useRef(null);
  const [voiceCmdActive, setVoiceCmdActive] = useState(false);
  const [voiceCmdFeedback, setVoiceCmdFeedback] = useState("");
  const [showOpenedModal, setShowOpenedModal] = useState(false);
  const [openedSearch, setOpenedSearch] = useState("");
  const [openedConfirm, setOpenedConfirm] = useState(null);
  const [openedFlashId, setOpenedFlashId] = useState(null);
  const [showOpenedDateEdit, setShowOpenedDateEdit] = useState(false);
  const [openedEditDate, setOpenedEditDate] = useState("");
  const [openedModalOffset, setOpenedModalOffset] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [tourMode, setTourMode] = useState(false);
  const [tourSection, setTourSection] = useState(null);
  const [tourSlide, setTourSlide] = useState(0);
  const [tourCompleted, setTourCompleted] = useState({});

  const resetUniScanTimer = () => {
    if (uniScanTimer.current) clearTimeout(uniScanTimer.current);
    uniScanTimer.current = setTimeout(() => {
      handleDoneUniScan();
    }, 30000);
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 1.1;
      u.pitch = 1;
      window.speechSynthesis.speak(u);
      return u;
    }
    return null;
  };

  const speakThen = (text, cb) => {
    console.log("[VOICE] speakThen called:", text.substring(0, 50));
    if (!('speechSynthesis' in window)) { console.log("[VOICE] speakThen: no speechSynthesis, firing cb immediately"); setTimeout(cb || (() => {}), 300); return; }
    window.speechSynthesis.cancel();
    const doSpeak = () => {
      setTimeout(() => {
        const u = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        const natural = voices.find(v => v.name === "Google US English")
          || voices.find(v => v.name === "Samantha")
          || voices.find(v => v.name.includes("Zoe") && v.lang.startsWith("en"))
          || voices.find(v => v.lang === "en-US");
        if (natural) u.voice = natural;
        u.rate = 0.9; u.pitch = 1;
        const ms = Math.max(2500, (text.trim().split(/\s+/).length / 100) * 60000 + 1500);
        console.log("[VOICE] speakThen: speaking, fallback timeout in", ms, "ms");
        let done = false;
        const fire = () => { if (!done) { done = true; console.log("[VOICE] speakThen: cb firing (onend/onerror/timeout)"); if (cb) cb(); } };
        u.onend = () => { console.log("[VOICE] speakThen: onend fired"); fire(); };
        u.onerror = (e) => { console.log("[VOICE] speakThen: onerror fired:", e.error); fire(); };
        setTimeout(fire, ms);
        window.speechSynthesis.speak(u);
      }, 100);
    };
    if (window.speechSynthesis.getVoices().length > 0) { doSpeak(); }
    else { window.speechSynthesis.addEventListener('voiceschanged', function onVoicesChanged() { window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged); doSpeak(); }); }
  };

  const startVoiceCommand = (onResult) => {
    console.log("[VOICE] startVoiceCommand called, voiceFlowRef.current:", voiceFlowRef.current ? "active" : "null");
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { console.log("[VOICE] startVoiceCommand: no SR support"); return; }
    if (voiceFlowRef.current) { console.log("[VOICE] startVoiceCommand: aborting previous recognizer"); try { voiceFlowRef.current.abort(); } catch(e) {} }
    const recog = new SR();
    recog.lang = lang === "es" ? "es-MX" : "en-US";
    recog.interimResults = false;
    recog.maxAlternatives = 3;
    voiceFlowRef.current = recog;
    let gotResult = false;
    recog.onresult = (ev) => {
      gotResult = true;
      voiceFlowRef.current = null;
      const transcript = ev.results[0][0].transcript.toLowerCase().trim();
      console.log("[VOICE] heard command:", transcript);
      onResult(transcript);
    };
    recog.onerror = (e) => {
      console.log("[VOICE] startVoiceCommand error:", e.error);
      if (e.error === 'aborted') return;
      setTimeout(() => { if (!gotResult) { console.log("[VOICE] startVoiceCommand: retrying after error"); startVoiceCommand(onResult); } }, 300);
    };
    recog.onend = () => {
      console.log("[VOICE] startVoiceCommand: recognition ended, gotResult:", gotResult, "voiceFlowRef===recog:", voiceFlowRef.current === recog);
      setTimeout(() => { if (!gotResult && voiceFlowRef.current === recog) { console.log("[VOICE] startVoiceCommand: restarting after onend"); startVoiceCommand(onResult); } }, 300);
    };
    recog.start();
    console.log("[VOICE] startVoiceCommand: recog.start() called");
  };

  const listenForDate = () => {
    setVoiceFlowStep("listening_date");
    startVoiceCommand((transcript) => {
      const t = transcript.toLowerCase();
      if (t.includes("pause") || t.includes("pausa")) { setVoiceFlowPaused(true); speak(lang === "es" ? "Pausado." : "Paused."); return; }
      if (t.includes("edit") || t.includes("editar")) { setShowVoiceEditForm(true); speak(lang === "es" ? "Modo edición." : "Edit mode. Say Return to Scan when done."); return; }
      if (t.includes("stop") || t.includes("detener")) { handleDoneUniScan(); return; }
      if (t.includes("skip") || t.includes("omitir")) { speak(lang === "es" ? "Omitido." : "Skipped."); resetSmartScanner(); setTimeout(() => startScanCommandLoop(), 1200); return; }
      const parsed = parseSpokenDate(transcript);
      if (parsed) {
        setSmartUseBy(parsed);
        setVoiceFlowStep("say_next");
        const loc = smartLocation || 'Fridge';
        const locPrompt = lang === 'es'
          ? 'Fecha capturada. Donde lo guardas? Di Refrigerador, Congelador o Despensa.'
          : 'Date captured. Where are you storing it? Say Fridge, Freezer, or Pantry.';
        speakThen(locPrompt, () => {
          setVoiceFlowStep('listening_location');
          startVoiceCommand((cmd) => {
            const t = cmd.toLowerCase();
            if (t.includes('fridge') || t.includes('refrigerador') || t.includes('refri')) setSmartLocation('Fridge');
            else if (t.includes('freeze') || t.includes('freezer') || t.includes('congelador')) setSmartLocation('Freezer');
            else if (t.includes('pantry') || t.includes('despensa')) setSmartLocation('Pantry');
            speakThen(lang === 'es' ? 'Di Siguiente para continuar o Listo para terminar.' : 'Say Next to continue or Done to finish.', () => {
              setVoiceFlowStep('listening_next');
              startVoiceCommand((cmd2) => handleVoiceNextDone(cmd2));
            });
          });
        });
      } else {
        speak(lang === "es" ? "No entendí. Intente de nuevo." : "Could not understand. Try again.");
        setTimeout(() => listenForDate(), 1800);
      }
    });
  };

  const startScanCommandLoop = () => {
    startVoiceCommand((transcript) => {
      const t = transcript.toLowerCase();
      if (t.includes('capture') || t.includes('capturar') || t.includes('photo') || t.includes('foto')) {
        if (smartCaptureRef && smartCaptureRef.current) smartCaptureRef.current();
        else setTimeout(() => startScanCommandLoop(), 500);
      } else if (t.includes('skip') || t.includes('omitir') || t.includes('saltar')) {
        speakThen(lang === "es" ? "Omitido." : "Skipped.", () => startScanCommandLoop());
      } else if (t.includes('edit') || t.includes('editar')) {
        setShowVoiceEditForm(true);
        speak(lang === "es" ? "Modo edición. Di Volver a Escanear para continuar." : "Edit mode. Say Return to Scan when done.");
      } else if (t.includes('pause') || t.includes('pausa')) {
        setVoiceFlowPaused(true);
        speak(lang === "es" ? "Pausado. Di Continuar." : "Paused. Say Continue to resume.");
      } else if (t.includes('continue') || t.includes('continuar')) {
        setVoiceFlowPaused(false);
        speakThen(lang === "es" ? "Continuando." : "Continuing.", () => startScanCommandLoop());
      } else if (t.includes('return') || t.includes('volver')) {
        setShowVoiceEditForm(false);
        speakThen(lang === "es" ? "Volviendo al escáner." : "Returning to scanner.", () => startScanCommandLoop());
      } else if (t.includes('stop') || t.includes('detener') || t.includes('parar')) {
        handleDoneUniScan();
      } else {
        startScanCommandLoop();
      }
    });
  };

  const handleSmartResultMulti = (item) => {
    if (voiceFlowRef.current) { try { voiceFlowRef.current.abort(); } catch(e) {} }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    // If multiple items detected (receipt or multi-product photo)
    if (item._allItems && item._allItems.length > 1) {
      setSmartMultiItems(item._allItems);
      setSelectedSmartMulti(item._allItems.map((_, i) => i));
      setShowSmartMultiReview(true);
      setSmartError("");
      const count = item._allItems.length;
      speak(lang === "es" ? `Encontré ${count} productos. Revisa la lista.` : `Found ${count} items. Review the list.`);
      return;
    }
    setSmartResult(item);
    setSmartError("");
    setShowVoiceEditForm(false);
    resetUniScanTimer();
    setSmartLocation(item.location || "Fridge");
    const itemName = item.name || "item";
    speak(lang === "es" ? `Encontré ${itemName}. Revisa los detalles.` : `Found ${itemName}. Review the details.`);
    setVoiceFlowStep("say_date");

  };
  const handleVoiceNextDone = (cmd) => {
    console.log("[VOICE] handleVoiceNextDone called with:", cmd);
    const t = cmd.toLowerCase();
    if (voiceNDTimeoutRef.current) { clearTimeout(voiceNDTimeoutRef.current); voiceNDTimeoutRef.current = null; }
    if (t.includes("pause") || t.includes("pausa")) { setVoiceFlowPaused(true); speak(lang === "es" ? "Pausado." : "Paused. Say Continue."); return; }
    if (t.includes("edit") || t.includes("editar")) { setShowVoiceEditForm(true); speak(lang === "es" ? "Modo edición." : "Edit mode. Say Return to Scan when done."); return; }
    if (t.includes("stop") || t.includes("detener")) { console.log("[VOICE] DONE via stop — calling handleDoneUniScan"); handleDoneUniScan(); return; }
    if (t.includes("next") || t.includes("yes") || t.includes("more") || t.includes("siguiente") || t.includes("próxima") || t.includes("proxima")) { console.log("[VOICE] NEXT — calling handleAddSmartItemMulti"); handleAddSmartItemMulti(); return; }
    if (t.includes("done") || t.includes("listo") || t.includes("lista") || t.includes("finish") || t.includes("terminar")) { console.log("[VOICE] DONE — calling handleAddSmartItemMulti + handleDoneUniScan"); handleAddSmartItemMulti(); setTimeout(() => handleDoneUniScan(), 300); return; }
    console.log("[VOICE] handleVoiceNextDone: unrecognized command, retrying");
    setVoiceFlowStep("listening_next");
    voiceNDTimeoutRef.current = setTimeout(() => { setVoiceFlowStep(null); if (voiceFlowRef.current) { try { voiceFlowRef.current.abort(); } catch(ex) {} voiceFlowRef.current = null; } }, 10000);
    startVoiceCommand((cmd2) => handleVoiceNextDone(cmd2));
  };
  const handleAddSmartItemMulti = () => {
    if (!smartResult) return;
    if (voiceFlowRef.current) { try { voiceFlowRef.current.abort(); } catch(e) {} voiceFlowRef.current = null; }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    const itemName = smartResult.name || "Unknown Item";
    const newItem = { id: Date.now().toString(), name: itemName, useByDate: smartUseBy || "", openDate: "", category: smartResult.category || "Other", quantity: "1", location: smartLocation || smartResult.location || "Fridge", freezeByDate: smartFreezeBy || "", daysAfterOpening: smartResult.daysAfterOpening || null, storageTip: smartResult.storageTip || "", openedTip: smartResult.openedTip || "" };
    setTrackedItems(prev => [newItem, ...prev]);
    setUniScanCount(prev => prev + 1);
    setUniScanLastItem(itemName);
    resetSmartScanner();
    setVoiceFlowStep(null);
    resetUniScanTimer();
    setSmartScanKey(prev => prev + 1);
  };





  const handleDoneUniScan = () => {
    setShowSmartScanner(false);
    resetSmartScanner();
    setUniScanCount(0);
    setUniScanLastItem("");
    setVoiceFlowStep(null);
    if (uniScanTimer.current) clearTimeout(uniScanTimer.current);
    if (voiceFlowRef.current) { try { voiceFlowRef.current.abort(); } catch(e) {} }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  };

  const handleSmartError = (msg) => { if (msg === "__done__") { handleDoneUniScan(); return; } setSmartError(msg); setSmartResult(null); };

  const handleAddSmartMultiItems = () => {
    const _td = new Date(); const today = `${_td.getFullYear()}-${String(_td.getMonth()+1).padStart(2,'0')}-${String(_td.getDate()).padStart(2,'0')}`;
    const newItems = selectedSmartMulti.map(i => smartMultiItems[i]).filter(Boolean).map(item => ({
      id: crypto.randomUUID(), name: item.name || "Unknown", useByDate: item.date || "", openDate: "",
      category: item.category || "Other", quantity: "1", location: item.location || "Fridge",
      daysAfterOpening: item.daysAfterOpening || null, storageTip: item.storageTip || "", openedTip: item.openedTip || ""
    }));
    setTrackedItems(prev => [...newItems, ...prev]);
    setShowSmartScanner(false); setSmartMultiItems([]); setSelectedSmartMulti([]); setShowSmartMultiReview(false); resetSmartScanner(); setScanMode(null);
  };

  const handleMultiScan = async (file) => {
    setMultiScanStatus("scanning");
    setMultiScanError("");
    setMultiItems([]);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target.result.split(",")[1];
        const mType = file.type || "image/jpeg";
        const res = await fetch("/api/scan-multi", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ imageData: base64, mediaType: mType }) });
        const data = await res.json();
        if (data.error) { setMultiScanError(lang === "es" ? "Nuestra IA está un poco ocupada ahora. ¡Por favor intenta de nuevo en un momento! 🙏" : "Our AI is a little busy right now. Please try again in a moment! 🙏"); setMultiScanStatus("camera"); return; }
        if (!data.items || data.items.length === 0) { setMultiScanError(lang === "es" ? "No se encontraron productos." : "No food items found. Try again."); setMultiScanStatus("camera"); return; }
        setMultiItems(data.items);
        setSelectedMultiItems(data.items.map((_, i) => i));
        setMultiScanStatus("review");
      };
      reader.readAsDataURL(file);
    } catch (err) { setMultiScanError(err.message); setMultiScanStatus("camera"); }
  };

  const handleAddMultiItems = () => {
    const _td = new Date(); const today = `${_td.getFullYear()}-${String(_td.getMonth()+1).padStart(2,'0')}-${String(_td.getDate()).padStart(2,'0')}`;
    const newItems = selectedMultiItems.map(i => multiItems[i]).filter(Boolean).map(item => ({
      id: crypto.randomUUID(), name: item.name || "Unknown", useByDate: item.date || "", openDate: "",
      category: item.category || "Other", quantity: "1", location: item.location || "Fridge",
      daysAfterOpening: item.daysAfterOpening || null, storageTip: item.storageTip || "", openedTip: item.openedTip || ""
    }));
    setTrackedItems(prev => [...newItems, ...prev]);
    setShowMultiScanner(false); setMultiItems([]); setMultiScanStatus("camera"); setSelectedMultiItems([]);
  };
  const resetSmartScanner = () => { setSmartResult(null); setSmartError(""); setSmartLocation(""); setSmartUseBy(""); setSmartFreezeBy(""); setScanningDate(false); setVoiceListening(false); setVoicePromptDone(false); setShowVoiceEditForm(false); setVoiceFlowStep(null); setShowExpiryVoice(false); setSmartMultiItems([]); setSelectedSmartMulti([]); setShowSmartMultiReview(false); };
  const handleAddSmartItem = () => {
    if (!smartResult) return;
    const newItem = { id: Date.now().toString(), name: smartResult.name || "Unknown Item", useByDate: smartUseBy || "", openDate: (() => { const _d = new Date(); return `${_d.getFullYear()}-${String(_d.getMonth()+1).padStart(2,'0')}-${String(_d.getDate()).padStart(2,'0')}`; })(), category: smartResult.category || "Other", quantity: "1", location: smartLocation || smartResult.location || "Fridge", freezeByDate: smartFreezeBy || "", daysAfterOpening: smartResult.daysAfterOpening || null, storageTip: smartResult.storageTip || "", openedTip: smartResult.openedTip || "" };
    setTrackedItems(prev => [newItem, ...prev]);
    if (scanMode === "single") {
      setShowSmartScanner(false); resetSmartScanner(); setScanMode(null);
    } else {
      setUniScanCount(prev => prev + 1); setUniScanLastItem(newItem.name);
      resetSmartScanner(); setSmartScanKey(prev => prev + 1); resetUniScanTimer();
    }
  };
  const [voiceListening, setVoiceListening] = useState("");
  const [voicePromptDone, setVoicePromptDone] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const [showReceiptScanner, setShowReceiptScanner] = useState(false);
  const [receiptScanning, setReceiptScanning] = useState(false);
  const [receiptItems, setReceiptItems] = useState([]);
  const [receiptError, setReceiptError] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  useEffect(() => { try { if (!localStorage.getItem("trackfresh.welcomed")) setShowWelcome(true); } catch(e) {} }, []);
  useEffect(() => {
    if (trackedItems.length === 0) return;
    const urgent = trackedItems.filter(it => it.daysLeft !== null && it.daysLeft <= 2);
    if (urgent.length > 0) { setAlertItem({ name: urgent[0].name, daysLeft: urgent[0].daysLeft }); setShowAlert(true); }
  }, [trackedItems.length]);
  useEffect(() => {
    if (!showOpenedModal) { setOpenedModalOffset(0); return; }
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => {
      const kbHeight = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      setOpenedModalOffset(kbHeight);
    };
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    update();
    return () => { vv.removeEventListener("resize", update); vv.removeEventListener("scroll", update); };
  }, [showOpenedModal]);

  useEffect(() => {
    setTrackedItems(loadItems());
    setCommunity(loadCommunity());
    setShoppingItems(loadShopping());
    setMeals(loadMeals());
    let savedName = null; try { savedName = localStorage.getItem(USERNAME_KEY); } catch(e) {}
    if (savedName) setUsername(savedName);
  }, []);
  useEffect(() => { saveItems(trackedItems); }, [trackedItems]);
  useEffect(() => { saveCommunity(community); }, [community]);
  useEffect(() => { saveShopping(shoppingItems); }, [shoppingItems]);
  useEffect(() => { saveMeals(meals); }, [meals]);
  useEffect(() => { try { localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(savedRecipes)); } catch(e) {} }, [savedRecipes]);
  useEffect(() => { try { localStorage.setItem("tf_favorite_recipes", JSON.stringify(favoriteRecipes)); } catch(e) {} }, [favoriteRecipes]);
  useEffect(() => { try { localStorage.setItem(RECIPE_MODE_KEY, recipeMode); } catch(e) {} }, [recipeMode]);
  useEffect(() => { try { window.scrollTo(0, 0); } catch(e) {} }, [activeTab]);

  const handleSetMeal = (day, slot, meal) => {
    setMeals((prev) => ({ ...prev, [`${day}-${slot}`]: meal }));
    setShowMealPicker(false);
    setMealPickerSearch("");
  };

  const handleClearMeal = (day, slot) => {
    setMeals((prev) => { const next = { ...prev }; delete next[`${day}-${slot}`]; return next; });
  };

  const handleAiPlanWeek = async () => {
    setAiPlanLoading(true);
    try {
      const expiringNames = itemsWithCountdown.filter((it) => it.daysLeft !== null && it.daysLeft <= 7).map((it) => it.name).join(", ");
      const allItems = trackedItems.map((it) => it.name).join(", ");
      const res = await fetch("/api/plan-meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expiring: expiringNames, available: allItems, dietaryNeeds: activeDietaryProfile })
      });
      const data = await res.json();
      if (data.plan) setMeals(data.plan);
    } catch (err) { console.error(err); }
    setAiPlanLoading(false);
  };

  const handleAddMealIngredientsToShopping = (mealName) => {
    const recipe = RECIPE_DB.find((r) => r.name.toLowerCase() === mealName.toLowerCase());
    const trackedNames = trackedItems.map((it) => it.name.toLowerCase());
    if (recipe && recipe.ingredients && recipe.ingredients.length > 0) {
      const missing = recipe.ingredients.filter((ing) => !trackedNames.some((t) => t.includes(ing.toLowerCase()) || ing.toLowerCase().includes(t)));
      const newItems = missing.filter((ing) => !shoppingItems.some((s) => s.name.toLowerCase() === ing.toLowerCase()));
      if (newItems.length === 0) { window.alert("All ingredients for " + mealName + " are already tracked or on your list!"); return; }
      setShoppingItems((prev) => [...prev, ...newItems.map((ing) => ({ id: crypto.randomUUID(), name: ing, qty: "", checked: false, forMeal: mealName }))]);
      window.alert("Added " + newItems.length + " missing ingredient" + (newItems.length !== 1 ? "s" : "") + " to your list!");
    } else {
      const onList = shoppingItems.some((s) => s.name.toLowerCase() === mealName.toLowerCase());
      if (onList) { window.alert(mealName + " is already on your shopping list!"); return; }
      setShoppingItems((prev) => [...prev, { id: crypto.randomUUID(), name: "Ingredients for: " + mealName, qty: "", checked: false, forMeal: mealName }]);
    }
    setActiveTab("shopping");
  };

  // All known tag keys → human-readable labels (shared between household and per-member use)
  const ALL_TAG_LABELS = {vegetarian:"Vegetarian",vegan:"Vegan",glutenFree:"Gluten-Free",dairyFree:"Dairy-Free",nutFree:"Nut-Free",lowSodium:"Low Sodium",highProtein:"High Protein",lowSugar:"Low Sugar",halal:"Halal",kosher:"Kosher",keto:"Keto"};

  const ALLERGEN_KEYWORDS = {
    "Nut-Free":    ["nut","peanut","almond","cashew","walnut","pecan","pistachio","hazelnut","macadamia"],
    "Dairy-Free":  ["milk","cheese","butter","cream","yogurt","dairy","whey","lactose","brie","cheddar","mozzarella","parmesan"],
    "Gluten-Free": ["wheat","bread","flour","gluten","pasta","noodle","cereal","barley","rye","cracker","biscuit","bagel","pretzel"],
    "Vegan":       ["meat","chicken","beef","pork","fish","salmon","tuna","shrimp","egg","honey","gelatin","lard"],
    "Vegetarian":  ["meat","chicken","beef","pork","fish","salmon","tuna","shrimp","turkey","bacon","ham","sausage"],
    "Low Sodium":  ["salt","soy sauce","pickle","chip","pretzel","jerky","anchovy","capers"],
    "Low Sugar":   ["candy","sugar","syrup","soda","juice","cookie","cake","chocolate","jam","jelly"],
  };

  // Derived dietary profile — merges household + all family member restrictions.
  // Shape: { household: string[], members: {name, tags}[], combinedTags: string[] }
  // combinedTags = union of all active restrictions across the household.
  // This is the single object passed to the meal planner API.
  const activeDietaryProfile = useMemo(() => {
    const householdTags = Object.entries(dietaryRestrictions).filter(([,on]) => on).map(([key]) => ALL_TAG_LABELS[key] || key);
    const memberProfiles = familyMembers
      .map(m => ({ name: m.name, tags: Object.entries(m.restrictions || {}).filter(([,on]) => on).map(([key]) => ALL_TAG_LABELS[key] || key) }))
      .filter(m => m.tags.length > 0);
    const combinedTags = [...new Set([...householdTags, ...memberProfiles.flatMap(m => m.tags)])];
    return { household: householdTags, members: memberProfiles, combinedTags };
  }, [dietaryRestrictions, familyMembers]);

  const itemsWithCountdown = useMemo(() => trackedItems.map((it) => {
    const eff = effectiveDate(it);
    const daysLeft = eff !== null ? Math.ceil((eff - new Date().setHours(0,0,0,0)) / 86400000) : null;
    return { ...it, daysLeft };
  }), [trackedItems]);

  const filteredItems = useMemo(() => {
    return itemsWithCountdown.filter((it) => {
      const catOk = filterCategory === "All" || (it.category ?? "Other") === filterCategory;
      const locOk = filterLocation === "All" || (it.location ?? "Fridge") === filterLocation;
      return catOk && locOk;
    });
  }, [itemsWithCountdown, filterCategory, filterLocation]);

  const expiringSoon = useMemo(() => {
    return itemsWithCountdown.filter((it) => it.daysLeft !== null && it.daysLeft <= 7);
  }, [itemsWithCountdown]);

  const handleAddItem = () => {
    const name = itemName.trim();
    if (!name) return;
    if (name.toLowerCase().startsWith("alexa:")) {
      const spokenItem = name.replace(/alexa:/i, "").trim();
      const today = new Date();
      const useBy = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
      setTrackedItems((prev) => [...prev, { id: crypto.randomUUID(), name: spokenItem, useByDate: useBy.toISOString().split("T")[0], openDate: today.toISOString().split("T")[0], category: "Other", quantity: labelItem.weight || "", location: "Fridge" }]);
      window.alert("Alexa: Tracking " + spokenItem + " opened today, expires in 30 days.");
      setItemName(""); return;
    }
    if (!useByDate) { window.alert("Please enter a Use By date."); return; }
    const daysLeft = daysUntil(useByDate);
    if (daysLeft !== null && daysLeft <= 3) { setAlertItem({ name, daysLeft }); setShowAlert(true); }
    setTrackedItems((prev) => [...prev, { id: crypto.randomUUID(), name, useByDate, openDate, category, quantity, location }]);
    setItemName(""); setUseByDate(""); setOpenDate(""); setCategory("Other"); setQuantity(""); setLocation("Fridge");
  };

  const addToShoppingIfMissing = (item, source) => {
    setShoppingItems((prev) => {
      const exists = prev.some((s) => s.name.toLowerCase() === item.name.toLowerCase());
      if (exists) return prev;
      return [...prev, { id: crypto.randomUUID(), name: item.name, checked: false, ...(source ? { source } : {}) }];
    });
  };

  const handleRemoveItem = (id) => {
    const item = trackedItems.find((it) => it.id === id);
    if (item) addToShoppingIfMissing(item);
    setTrackedItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleEditItem = (id) => { const item = trackedItems.find(it => it.id === id); if (item) setEditingItem({ ...item }); };
  const handleSaveEdit = () => { if (!editingItem) return; setTrackedItems(prev => prev.map(it => it.id === editingItem.id ? { ...editingItem } : it)); setEditingItem(null); };

  const handleMarkOpened = (item, dateStr) => {
    const shelfDays = item.daysAfterOpening || getShelfLifeDays(item.name);
    const openUseBy = shelfDays ? addDaysToDate(dateStr, shelfDays) : null;
    setTrackedItems(prev => prev.map(it => it.id === item.id ? { ...it, openDate: dateStr, openUseBy } : it));
    setOpenedConfirm({ item: { ...item, openDate: dateStr, openUseBy }, openDate: dateStr, openUseBy, shelfDays });
    setShowOpenedDateEdit(false);
  };

  const handleUseTodayItem = (id) => {
    const item = trackedItems.find((it) => it.id === id);
    if (item) addToShoppingIfMissing(item, "used");
    setTrackedItems((prev) => prev.filter((it) => it.id !== id));
  };

  const triggerVoiceCommand = () => {
    const isEs = lang === "es";
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setVoiceCmdFeedback(isEs ? "Tu navegador no soporta voz." : "Voice input isn't supported in this browser.");
      if (voiceFeedbackTimer.current) clearTimeout(voiceFeedbackTimer.current);
      voiceFeedbackTimer.current = setTimeout(() => setVoiceCmdFeedback(""), 3500);
      return;
    }
    if (voiceCmdRef.current) {
      try { voiceCmdRef.current.abort(); } catch(e) {}
      voiceCmdRef.current = null;
      setVoiceCmdActive(false);
      return;
    }
    const recog = new SR();
    recog.lang = isEs ? "es-MX" : "en-US";
    recog.interimResults = false;
    recog.maxAlternatives = 3;
    voiceCmdRef.current = recog;
    setVoiceCmdActive(true);

    const finish = (feedback) => {
      voiceCmdRef.current = null;
      setVoiceCmdActive(false);
      if (feedback) {
        setVoiceCmdFeedback(feedback);
        if (voiceFeedbackTimer.current) clearTimeout(voiceFeedbackTimer.current);
        voiceFeedbackTimer.current = setTimeout(() => setVoiceCmdFeedback(""), 4500);
      }
    };

    recog.onresult = (ev) => {
      const t = ev.results[0][0].transcript.toLowerCase().trim();

      if (/\b(opened?|abrí|abri|abrir)\b/.test(t)) {
        const m = t.match(/(?:opened?|abrí|abri|abrir)\s+(?:el\s+|la\s+|los\s+|las\s+|the\s+)?(.+)/);
        const query = m?.[1]?.replace(/[?.!,]+$/,"").trim();
        const found = query && trackedItems.find(it => it.name.toLowerCase().includes(query));
        if (found) {
          const _td = new Date(); const today = `${_td.getFullYear()}-${String(_td.getMonth()+1).padStart(2,'0')}-${String(_td.getDate()).padStart(2,'0')}`;
          handleMarkOpened(found, today);
          setShowOpenedModal(true);
          finish(isEs ? `${found.name} marcado como abierto.` : `Marked ${found.name} as opened.`);
        } else {
          setShowOpenedModal(true); setOpenedSearch(query || ""); setOpenedConfirm(null); setShowOpenedDateEdit(false);
          finish(query
            ? (isEs ? `No encontré "${query}". Búscalo en el modal.` : `Couldn't find "${query}" — search in the panel.`)
            : (isEs ? "¿Qué abriste? Búscalo en el modal." : "What did you open? Search below."));
        }
        return;
      }

      if (/\b(add|agregar|añadir|track|log)\b/.test(t)) {
        const m = t.match(/(?:add|agregar|añadir|track|log)\s+(?:a\s+|an\s+|some\s+|un\s+|una\s+|unos\s+)?(.+)/);
        const name = m?.[1]?.replace(/[?.!,]+$/,"").trim() || "";
        setItemName(name);
        setShowQuickAdd(true);
        finish(name
          ? (isEs ? `Listo para agregar ${name}.` : `Ready to add ${name}.`)
          : (isEs ? "Abriendo agregar rápido." : "Opening quick add."));
        return;
      }

      if (/\b(expir|venc|use\s+soon|usar\s+pronto|going\s+bad|por\s+vencer)\b/.test(t)) {
        const soon = trackedItems.filter(it => { const d = daysUntil(it.useByDate); return d !== null && d >= 0 && d <= 3; });
        finish(soon.length === 0
          ? (isEs ? "Todo fresco — nada vence pronto." : "Everything looks good — nothing expiring soon.")
          : (isEs
              ? `${soon.length} artículo${soon.length>1?"s":""} vencen pronto: ${soon.slice(0,3).map(it=>it.name).join(", ")}.`
              : `${soon.length} item${soon.length>1?"s":""} expiring soon: ${soon.slice(0,3).map(it=>it.name).join(", ")}.`));
        return;
      }

      if (/\b(use\s+first|usar\s+primero|what.*(use|eat|cook)|qué\s+(usar|comer|cocinar))\b/.test(t)) {
        const urgent = trackedItems.filter(it => { const d = daysUntil(it.useByDate); return d !== null && d >= 0; }).sort((a,b) => daysUntil(a.useByDate) - daysUntil(b.useByDate));
        if (!urgent.length) { finish(isEs ? "Tu cocina está fresca." : "Your kitchen is looking fresh — nothing urgent."); return; }
        const first = urgent[0];
        const dl = daysUntil(first.useByDate);
        finish(isEs
          ? `Usa ${first.name} primero — ${dl===0?"vence hoy":`${dl} día${dl===1?"":"s"}`}.`
          : `Use ${first.name} first — ${dl===0?"expires today":`${dl} day${dl===1?"":"s"} left`}.`);
        return;
      }

      if (/\b(have|got|tengo|is\s+there|hay|do\s+i\s+have|tienes)\b/.test(t)) {
        const m = t.match(/(?:have|got|tengo|is\s+there|hay|do\s+i\s+have|tienes)\s+(?:any\s+|some\s+|a\s+|an\s+|un\s+|una\s+|unos\s+)?(.+?)(?:\?)?$/);
        const query = m?.[1]?.replace(/[?.!,]+$/,"").trim();
        const found = query && trackedItems.find(it => it.name.toLowerCase().includes(query));
        if (found) finish(isEs
          ? `Sí, tienes ${found.name}${found.useByDate?` — usar antes del ${fmtDate(found.useByDate)}`:""}.`
          : `Yes, you have ${found.name}${found.useByDate?` — use by ${fmtDate(found.useByDate)}`:""}.`);
        else if (query) finish(isEs ? `No encuentro "${query}" en tu cocina.` : `I don't see "${query}" in your kitchen.`);
        else finish(isEs ? "¿Qué artículo buscas?" : "Which item are you looking for?");
        return;
      }

      finish(isEs
        ? "No entendí. Intenta: 'Agregar leche' o '¿Qué vence pronto?'"
        : "I didn't catch that. Try: 'Add milk' or 'What expires soon?'");
    };

    recog.onerror = (e) => {
      if (e.error === "aborted") { finish(""); return; }
      finish(isEs ? "No pude escucharte. Intenta de nuevo." : "Couldn't hear you. Try again.");
    };
    recog.onend = () => { if (voiceCmdRef.current === recog) finish(""); };
    recog.start();
  };

  const parseSpokenDateNoYear = (text) => {
    const months = { january:1,february:2,march:3,april:4,may:5,june:6,july:7,august:8,september:9,october:10,november:11,december:12,jan:1,feb:2,mar:3,apr:4,jun:6,jul:7,aug:8,sep:9,oct:10,nov:11,dec:12 };
    const t = text.toLowerCase().trim();
    const match = t.match(/^([a-z]+)\s+(\d{1,2})(?:\s+(\d{2,4}))?$/);
    if (!match) return null;
    const month = months[match[1]]; if (!month) return null;
    const day = parseInt(match[2]);
    let year = match[3] ? (match[3].length === 2 ? 2000 + parseInt(match[3]) : parseInt(match[3])) : null;
    if (!year) { const now = new Date(); year = now.getFullYear(); if (new Date(year, month-1, day) < now) year++; }
    return new Date(year, month-1, day).toISOString().split("T")[0];
  };

  const parseProductAndDate = (transcript) => {
    const monthRegex = /\b(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|oct|nov|dec)\b/i;
    const monthMatch = transcript.match(monthRegex);
    if (!monthMatch) return null;
    const monthIdx = transcript.toLowerCase().indexOf(monthMatch[0].toLowerCase());
    const productName = transcript.substring(0, monthIdx).trim().replace(/[,\s]+$/, "");
    const datePart = transcript.substring(monthIdx).trim();
    if (!productName) return null;
    const date = parseSpokenDate(datePart) || parseSpokenDateNoYear(datePart);
    if (!date) return null;
    return { productName, date };
  };

  const matchItemByName = (spokenName, items) => {
    const spoken = spokenName.toLowerCase().trim();
    if (!spoken || !items.length) return null;
    let found = items.find(it => it.name.toLowerCase() === spoken);
    if (found) return found;
    found = items.find(it => it.name.toLowerCase().includes(spoken));
    if (found) return found;
    found = items.find(it => { const words = it.name.toLowerCase().split(/\s+/).filter(w => w.length > 2); return words.some(w => spoken.includes(w)); });
    if (found) return found;
    const spokenWords = spoken.split(/\s+/).filter(w => w.length > 2);
    let best = 0, bestItem = null;
    for (const it of items) {
      const nameWords = it.name.toLowerCase().split(/\s+/);
      const score = spokenWords.filter(sw => nameWords.some(nw => nw.includes(sw) || sw.includes(nw))).length;
      if (score > best) { best = score; bestItem = it; }
    }
    return best > 0 ? bestItem : null;
  };

  const expirySpeak = (text, onDone) => {
    setExpiryVoiceStatus("speaking");
    if (!("speechSynthesis" in window)) { if (onDone) setTimeout(onDone, 300); return; }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.05; u.pitch = 1.0;
    const ms = Math.max(1500, (text.split(" ").length / 2.2) * 1000 + 800);
    let fired = false;
    const fire = () => { if (!fired) { fired = true; if (onDone) onDone(); } };
    u.onend = fire; setTimeout(fire, ms);
    window.speechSynthesis.speak(u);
  };

  const listenForExpiryDates = (items, attemptsLeft) => {
    if (attemptsLeft <= 0) { setExpiryVoiceStatus("done"); setTimeout(() => setShowExpiryVoice(false), 1500); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setShowExpiryVoice(false); return; }
    setExpiryVoiceStatus("listening");
    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    expiryVoiceRef.current = recognition;
    recognition.onresult = (event) => {
      expiryVoiceRef.current = null;
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      const isDone = transcript.includes("done") || transcript.includes("that's all") || transcript.includes("stop") || transcript.includes("finish") || transcript.includes("all done") || transcript.includes("that is all") || transcript.includes("skip") || transcript.includes("not now") || transcript.includes("no thanks") || transcript.includes("cancel") || /\bno\b/.test(transcript) || /\bnope\b/.test(transcript);
      if (isDone) {
        setExpiryVoiceStatus("done");
        expirySpeak("All done! Expiry dates saved.", () => setTimeout(() => setShowExpiryVoice(false), 1200));
        return;
      }
      const parsed = parseProductAndDate(transcript);
      if (parsed) {
        const matched = matchItemByName(parsed.productName, items);
        if (matched) {
          setTrackedItems(prev => prev.map(it => it.id === matched.id ? {...it, useByDate: parsed.date} : it));
          const d = new Date(parsed.date + "T12:00:00");
          const dateStr = d.toLocaleDateString("en-US", {month:"long", day:"numeric"});
          const shortYear = d.getFullYear() !== new Date().getFullYear() ? " " + d.getFullYear() : "";
          setExpiryVoiceLog(prev => [...prev, {name: matched.name, dateStr: dateStr + shortYear}]);
          expirySpeak(`Got it, ${matched.name} expires ${dateStr + shortYear}.`, () => listenForExpiryDates(items, attemptsLeft - 1));
        } else {
          expirySpeak("I didn't find that item. Try again or say done.", () => listenForExpiryDates(items, attemptsLeft - 1));
        }
      } else {
        expirySpeak("Try saying the product name then the date, like: milk, March 20 2026.", () => listenForExpiryDates(items, attemptsLeft - 1));
      }
    };
    recognition.onerror = (e) => {
      if (e.error === "aborted") return;
      expiryVoiceRef.current = null;
      if (e.error === "no-speech" && attemptsLeft > 1) { listenForExpiryDates(items, attemptsLeft - 1); }
      else { setExpiryVoiceStatus("done"); setTimeout(() => setShowExpiryVoice(false), 1500); }
    };
    recognition.start();
  };

  const startExpiryVoiceFlow = (items) => {
    if (!items || !items.length) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR || !("speechSynthesis" in window)) return;
    const flowItems = items.map(it => ({id: it.id, name: it.name}));
    setExpiryVoiceItems(flowItems);
    setExpiryVoiceLog([]);
    setExpiryVoiceStatus("speaking");
    setShowExpiryVoice(true);
    expirySpeak("Would you like to tell me the expiration dates for your recent scan? Just speak the product name and expiration date and I will do the rest.", () => listenForExpiryDates(flowItems, 12));
  };

  const stopExpiryVoiceFlow = () => {
    if (expiryVoiceRef.current) { try { expiryVoiceRef.current.abort(); } catch(e) {} expiryVoiceRef.current = null; }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setShowExpiryVoice(false);
    setExpiryVoiceLog([]);
  };

  const [recipesLoading, setRecipesLoading] = useState(false);
  const handleSuggestRecipes = async () => {
    if (trackedItems.length === 0) { window.alert("Add some food items first!"); return; }
    setRecipesLoading(true);
    setRecipesGenerated(false);
    setRecipeSuggestions([]);
    setExpandedRecipe(null);
    try {
      const res = await fetch("/api/suggest-recipes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: trackedItems.map(it => ({ name: it.name, daysLeft: it.daysLeft, category: it.category, location: it.location })) }) });
      const data = await res.json();
      if (data.error) { window.alert(lang === "es" ? "Nuestra IA está un poco ocupada ahora. ¡Por favor intenta de nuevo en un momento! 🙏" : "Our AI is a little busy right now. Please try again in a moment! 🙏"); setRecipesLoading(false); return; }
      setRecipeSuggestions(data.recipes || []);
      setRecipesGenerated(true);
    } catch (e) { window.alert(lang === "es" ? "Nuestra IA está un poco ocupada ahora. ¡Por favor intenta de nuevo en un momento! 🙏" : "Our AI is a little busy right now. Please try again in a moment! 🙏"); }
    setRecipesLoading(false);
  };

  const handleSaveRecipeToCommunity = (recipe) => {
    if (savedRecipes.includes(recipe.name)) return;
    const entry = {
      id: crypto.randomUUID(),
      author: username || "Anonymous",
      title: recipe.name,
      body: recipe.description + "\n\nInstructions:\n" + recipe.instructions + "\n\nCook time: " + recipe.time,
      date: new Date().toLocaleDateString()
    };
    setCommunity((prev) => ({ ...prev, recipes: [entry, ...prev.recipes] }));
    setSavedRecipes((prev) => [...prev, recipe.name]);
  };

  const handleAddShoppingItem = () => {
    const name = newShoppingItem.trim();
    if (!name) return;
    setShoppingItems((prev) => [...prev, { id: crypto.randomUUID(), name, qty: `${newShoppingQtyNum} ${newShoppingQty}`, checked: false }]);
    setNewShoppingItem(""); setNewShoppingQtyNum("1"); setNewShoppingQty("count");
  };

  const handleToggleShoppingItem = (id) => setShoppingItems((prev) => prev.map((it) => it.id === id ? { ...it, checked: !it.checked } : it));
  const handleRemoveShoppingItem = (id) => setShoppingItems((prev) => prev.filter((it) => it.id !== id));
  const handleClearChecked = () => setShoppingItems((prev) => prev.filter((it) => !it.checked));
  const handleAddToShoppingFromTracker = (item) => {
    const already = shoppingItems.some((s) => s.name.toLowerCase() === item.name.toLowerCase());
    if (already) return;
    setShoppingItems((prev) => [...prev, { id: crypto.randomUUID(), name: item.name, qty: "", checked: false }]);
  };

  const handleScanReceipt = async (file) => {
    setReceiptScanning(true);
    setReceiptError("");
    setReceiptItems([]);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target.result.split(",")[1];
        const mediaType = file.type;
        const res = await fetch("/api/scan-receipt", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image: base64, mimeType: mediaType || "image/jpeg" }) });
        const data = await res.json();
        if (data.error) { setReceiptError(lang === "es" ? "Nuestra IA está un poco ocupada ahora. ¡Por favor intenta de nuevo en un momento! 🙏" : "Our AI is a little busy right now. Please try again in a moment! 🙏"); setReceiptScanning(false); return; }
        setReceiptItems(data.items);
        setSelectedReceiptItems(data.items.map((_, i) => i));
        setReceiptScanning(false);
      };
      reader.readAsDataURL(file);
    } catch (err) { setReceiptError(err.message); setReceiptScanning(false); }
  };

  const handleBarcodeDetected = async (barcode) => {
    if (barcodeDetected === barcode || barcodeScanning) return;
    const alreadyTracked = trackedItems.find((it) => it.barcode === barcode);
    if (alreadyTracked) { setBarcodeError("⚠️ " + alreadyTracked.name + " was already scanned and is in your tracker!"); return; }
    setBarcodeDetected(barcode);
    setBarcodeScanning(true);
    setBarcodeError("");
    try {
      const res = await fetch("/api/scan-barcode", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ barcode }) });
      const data = await res.json();
      if (data.error) { setBarcodeError("Barcode: " + barcode + " — not found in database. Try a different product."); setBarcodeScanning(false); setBarcodeDetected(""); return; }
      setBarcodeItem({ ...data.item, barcode });
      setBarcodeScanning(false);
} catch (err) { setBarcodeError("Scan failed. Please try again."); setBarcodeScanning(false); setBarcodeDetected(""); }
  };

  const handleAddBarcodeItem = () => {
    if (!barcodeItem) return;
    const loc = barcodeLocation || barcodeItem.location;
    const _td = new Date(); const today = `${_td.getFullYear()}-${String(_td.getMonth()+1).padStart(2,'0')}-${String(_td.getDate()).padStart(2,'0')}`;
    const itemName = barcodeItem.name;
    setTrackedItems((prev) => [...prev, { id: crypto.randomUUID(), name: barcodeItem.name, category: barcodeItem.category, location: loc, quantity: "", useByDate: barcodeUseBy, openDate: "", freezeBy: barcodeFreezeBy, barcode: barcodeItem.barcode || "", daysAfterOpening: barcodeItem.daysAfterOpening || null, storageTip: barcodeItem.storageTip || "", openedTip: barcodeItem.openedTip || "" }]);
    setMultiScanCount(prev => prev + 1);
    setMultiScanLastItem(itemName);
    setBarcodeItem(null);
    setBarcodeDetected("");
    setBarcodeLocation("");
    setBarcodeUseBy("");
    setBarcodeFreezeBy("");
    setVoiceError("");
    if (scanMode === "single") {
      setShowBarcodeScanner(false);
      setMultiScanCount(0); setMultiScanLastItem("");
      if (multiScanTimer.current) clearTimeout(multiScanTimer.current);
    } else {
      setBarcodeScanKey(prev => prev + 1);
      resetMultiScanTimer();
    }
  };
  const handleDoneScanning = () => {
    setShowBarcodeScanner(false);
    setBarcodeItem(null);
    setBarcodeError("");
    setBarcodeDetected("");
    setMultiScanCount(0);
    setMultiScanLastItem("");
    if (multiScanTimer.current) clearTimeout(multiScanTimer.current);
  };

  const parseSpokenDate = (transcript) => {
    const months = { january:1, february:2, march:3, april:4, may:5, june:6, july:7, august:8, september:9, october:10, november:11, december:12, jan:1, feb:2, mar:3, apr:4, jun:6, jul:7, aug:8, sep:9, oct:10, nov:11, dec:12 };
    const t = transcript.toLowerCase().trim();
    const curYear = new Date().getFullYear();
    // Month + day + year (e.g. "February 20 2026")
    const match = t.match(/([a-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?\s*,?\s*(\d{4})/);
    if (match) {
      const month = months[match[1]];
      if (month) {
        const d = new Date(parseInt(match[3]), month - 1, parseInt(match[2]));
        return d.toISOString().split("T")[0];
      }
    }
    // Month + day without year (e.g. "February 20" or "March 5th")
    const matchNoYear = t.match(/([a-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?/);
    if (matchNoYear) {
      const month = months[matchNoYear[1]];
      if (month) {
        const d = new Date(curYear, month - 1, parseInt(matchNoYear[2]));
        return d.toISOString().split("T")[0];
      }
    }
    const match2 = t.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
    if (match2) {
      const yr = match2[3].length === 2 ? "20" + match2[3] : match2[3];
      const d = new Date(parseInt(yr), parseInt(match2[1]) - 1, parseInt(match2[2]));
      return d.toISOString().split("T")[0];
    }
    return null;
  };

  const handleVoiceDate = (field) => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setVoiceError("Voice not supported on this browser. Please type the date.");
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setVoiceListening(field);
    setVoiceError("");
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      const parsed = parseSpokenDate(transcript);
      if (parsed) {
        if (field === "useBy") setBarcodeUseBy(parsed);
        if (field === "freezeBy") setBarcodeFreezeBy(parsed);
        if (field === "labelDate") setLabelItem(prev => prev ? {...prev, date: parsed, dateFound: true} : prev);
        setVoiceListening("");
      } else {
        setVoiceError("Could not understand date. Try saying: February 20 2026");
        setVoiceListening("");
      }
    };
    recognition.onerror = () => { setVoiceError("Could not hear you. Please try again."); setVoiceListening(""); };
    recognition.onend = () => setVoiceListening("");
    recognition.start();
  };

  const handleFreezeItem = (id) => {
    setTrackedItems((prev) => prev.map((it) => {
      if (it.id !== id) return it;
      const newUseBy = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      return { ...it, location: "Freezer", useByDate: newUseBy };
    }));
  };

  const handleQuickVoice = (field) => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setQuickVoiceError("Voice not supported on this browser.");
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setQuickVoiceListening(field);
    setQuickVoiceError("");
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      if (field === "qty") {
        setQuickAddQty(transcript);
        setQuickVoiceListening("");
      } else {
        const parsed = parseSpokenDate(transcript);
        if (parsed) {
          setQuickAddDate(parsed);
          setQuickVoiceListening("");
        } else {
          setQuickVoiceError("Could not understand date. Try: February 20 2026");
          setQuickVoiceListening("");
        }
      }
    };
    recognition.onerror = () => { setQuickVoiceError("Could not hear you. Please try again."); setQuickVoiceListening(""); };
    recognition.onend = () => setQuickVoiceListening("");
    recognition.start();
  };

  const handleQuickAdd = async () => {
    if (!quickAddName.trim()) return;
    let foodInfo = {};
    try {
      const res = await fetch("/api/food-info", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: quickAddName }) });
      if (res.ok) foodInfo = await res.json();
    } catch (e) { console.log("Food info fetch failed, using defaults"); }
    const cat = quickAddCategory !== "Other" ? quickAddCategory : (foodInfo.category || quickAddCategory);
    const loc = quickAddLocation !== "Fridge" ? quickAddLocation : (foodInfo.location || quickAddLocation);
    const item = { id: crypto.randomUUID(), name: quickAddName, category: cat, location: loc, quantity: "", useByDate: quickAddDate, openDate: "", daysAfterOpening: foodInfo.daysAfterOpening || null, storageTip: foodInfo.storageTip || "", openedTip: foodInfo.openedTip || "" };
    setTrackedItems(prev => [item, ...prev]);
    setShowQuickAdd(false);
    setQuickAddName(""); setQuickAddDate(""); setQuickAddQty(""); setQuickAddCategory("Other"); setQuickAddLocation("Fridge");
  };

  const handleScanLabel = async (file) => {
    setLabelScanning(true);
    setLabelError("");
    setLabelItem(null);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target.result.split(",")[1];
        const mediaType = file.type;
        const res = await fetch("/api/scan-label", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ imageData: base64, mediaType: mediaType || "image/jpeg" }) });
        const data = await res.json();
        if (data.error) { setLabelError(lang === "es" ? "Nuestra IA está un poco ocupada ahora. ¡Por favor intenta de nuevo en un momento! 🙏" : "Our AI is a little busy right now. Please try again in a moment! 🙏"); setLabelScanning(false); return; }
        
        const item = data.item;
        setLabelItem(item);
        
        if (!item.dateFound) {
          setLabelError("📅 No expiration date visible. Flip package over and scan the other side!");
        }
        
        setLabelScanning(false);
      };
      reader.readAsDataURL(file);
    } catch (err) { setLabelError(err.message); setLabelScanning(false); }
  };

  const handleAddLabelItem = () => {
    if (!labelItem) return;
    const quantity = labelItem.weight || "";
    const itemName = labelItem.name;
    setTrackedItems((prev) => [...prev, { 
      id: crypto.randomUUID(), 
      name: labelItem.name, 
      category: labelItem.category, 
      location: labelItem.location, 
      quantity: quantity,
      useByDate: labelItem.date || "", 
      openDate: (() => { const _d = new Date(); return `${_d.getFullYear()}-${String(_d.getMonth()+1).padStart(2,'0')}-${String(_d.getDate()).padStart(2,'0')}`; })(), 
      daysAfterOpening: labelItem.daysAfterOpening || null,
      storageTip: labelItem.storageTip || "",
      openedTip: labelItem.openedTip || ""
    }]);
    setLabelScanCount(prev => prev + 1);
    setLabelLastItem(itemName);
    if (labelScanMode === "single") {
      setShowLabelScanner(false);
      setLabelScanCount(0); setLabelLastItem("");
      setLabelScanMode(null);
    } else {
      setLabelScanKey(prev => prev + 1);
    }
    setLabelItem(null);
    setLabelError("");
    setVoiceListening("");
  };

  const handleAddReceiptItems = () => {
    const toAdd = receiptItems.filter((_, i) => selectedReceiptItems.includes(i));
    const items = toAdd.map(it => ({ id: crypto.randomUUID(), name: it.name, brand: it.brand || null, category: it.category, location: it.location, quantity: "", useByDate: "", openDate: "", daysAfterOpening: it.daysAfterOpening || null, storageTip: it.storageTip || "", openedTip: it.openedTip || "" }));
    setShowReceiptScanner(false);
    setReceiptItems([]);
    setSelectedReceiptItems([]);
    setPendingDateItems(items);
    setPendingDateIndex(0);
    setPendingPickedDate("");
  };

  const handlePendingSaveDate = () => {
    const item = pendingDateItems[pendingDateIndex];
    setTrackedItems(prev => [{ ...item, useByDate: pendingPickedDate || "" }, ...prev]);
    const next = pendingDateIndex + 1;
    if (next >= pendingDateItems.length) { setPendingDateItems([]); setPendingDateIndex(0); setPendingPickedDate(""); }
    else { setPendingDateIndex(next); setPendingPickedDate(""); }
  };

  const handlePendingSkipDate = () => {
    const item = pendingDateItems[pendingDateIndex];
    setTrackedItems(prev => [{ ...item, useByDate: "" }, ...prev]);
    const next = pendingDateIndex + 1;
    if (next >= pendingDateItems.length) { setPendingDateItems([]); setPendingDateIndex(0); setPendingPickedDate(""); }
    else { setPendingDateIndex(next); setPendingPickedDate(""); }
  };

  const startPendingVoice = () => {
    setPendingVoiceError("");
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setPendingVoiceError("Voice not supported on this device"); return; }
    const recog = new SR(); recog.lang = "en-US"; recog.interimResults = false; recog.maxAlternatives = 1;
    setPendingVoiceListening(true);
    recog.onresult = (e) => {
      const t = e.results[0][0].transcript;
      const parsed = parseSpokenDate(t);
      if (parsed) {
        setPendingPickedDate(parsed);
        setPendingVoiceError(""); setPendingVoiceListening(false); setPendingVoiceAwaitND(true);
        const ndMsg = new SpeechSynthesisUtterance("Say Next to save and continue, or Done to finish.");
        ndMsg.rate = 1.1;
        ndMsg.onend = () => {
          const SR2 = window.SpeechRecognition || window.webkitSpeechRecognition;
          if (!SR2) { setPendingVoiceAwaitND(false); return; }
          if (pendingNDRef.current) { try { pendingNDRef.current.abort(); } catch(ex) {} }
          const ndRecog = new SR2(); ndRecog.lang = "en-US"; ndRecog.interimResults = false; ndRecog.maxAlternatives = 1;
          pendingNDRef.current = ndRecog;
          let settled = false;
          const ndTimeout = setTimeout(() => { if (!settled) { settled = true; setPendingVoiceAwaitND(false); pendingNDRef.current = null; try { ndRecog.abort(); } catch(ex) {} } }, 10000);
          ndRecog.onresult = (ev) => {
            if (settled) return; settled = true; clearTimeout(ndTimeout); setPendingVoiceAwaitND(false); pendingNDRef.current = null;
            const cmd = ev.results[0][0].transcript.toLowerCase();
            const nextIdx = pendingDateIndex + 1;
            if (cmd.includes("next") || cmd.includes("yes") || cmd.includes("more")) { handlePendingSaveDate(); if (nextIdx < pendingDateItems.length) setTimeout(() => startPendingVoice(), 700); }
            else if (cmd.includes("done") || cmd.includes("stop") || cmd.includes("finish")) { handlePendingSaveDate(); setTimeout(() => { setPendingDateItems([]); setPendingDateIndex(0); setPendingPickedDate(""); }, 300); }
          };
          ndRecog.onerror = () => { if (!settled) { settled = true; clearTimeout(ndTimeout); setPendingVoiceAwaitND(false); pendingNDRef.current = null; } };
          ndRecog.onend = () => { if (!settled) { settled = true; clearTimeout(ndTimeout); setPendingVoiceAwaitND(false); pendingNDRef.current = null; } };
          ndRecog.start();
        };
        window.speechSynthesis.cancel(); window.speechSynthesis.speak(ndMsg);
      } else { setPendingVoiceError("Could not understand. Try: April 20"); setPendingVoiceListening(false); }
    };
    recog.onerror = () => { setPendingVoiceError("Could not understand. Try: April 20"); setPendingVoiceListening(false); };
    recog.onend = () => setPendingVoiceListening(false);
    recog.start();
  };

  const handleSetUsername = () => { const n = usernameInput.trim(); if (!n) return; setUsername(n); try { localStorage.setItem(USERNAME_KEY, n); } catch(e) {} setUsernameInput(""); };
  const handlePostRecipe = () => { if (!newRecipeTitle.trim() || !newRecipeBody.trim()) return; setCommunity((prev) => ({ ...prev, recipes: [{ id: crypto.randomUUID(), author: username, title: newRecipeTitle.trim(), body: newRecipeBody.trim(), date: new Date().toLocaleDateString() }, ...prev.recipes] })); setNewRecipeTitle(""); setNewRecipeBody(""); };
  const handlePostTip = () => { if (!newTip.trim()) return; setCommunity((prev) => ({ ...prev, tips: [{ id: crypto.randomUUID(), author: username, text: newTip.trim(), date: new Date().toLocaleDateString() }, ...prev.tips] })); setNewTip(""); };
  const handlePostChat = () => { if (!newChat.trim()) return; setCommunity((prev) => ({ ...prev, chat: [...prev.chat, { id: crypto.randomUUID(), author: username, text: newChat.trim(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }] })); setNewChat(""); };

      if (showMarketing) return <MarketingPage onLaunchApp={handleLaunchApp} lang={lang} onChangeLang={changeLang} />;
  if (isUnlocked === false) return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
      <div style={{background:"rgba(0,0,0,0.35)",border:"2px solid rgba(255,102,0,0.45)",backdropFilter:"blur(14px)",borderRadius:"24px"}} className="shadow-2xl p-8 max-w-sm w-full text-center">
        <div className="text-5xl mb-3">🥦</div>
        <h1 className="text-3xl font-extrabold text-white mb-0" style={{textShadow:"0 2px 8px rgba(0,0,0,0.3)"}}><TrackFreshLogo showBroc={false} /></h1>
        <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1 mt-1">{t("betaTesting")}</p>
        <p className="text-sm text-green-200 mb-5">{t("enterAccessCode")}</p>
        <div className="mb-5">
          <p className="text-xs font-bold text-green-300 mb-2 uppercase tracking-wider">🌐 Language / Idioma</p>
          <div className="flex justify-center gap-3">
            <button onClick={() => changeLang("en")} className={`rounded-xl px-5 py-2.5 text-sm font-bold border-2 transition-all ${lang === "en" ? "border-orange-500 bg-orange-500/20 text-white" : "border-white/20 bg-white/10 text-white/70"}`}>🇺🇸 English</button>
            <button onClick={() => changeLang("es")} className={`rounded-xl px-5 py-2.5 text-sm font-bold border-2 transition-all ${lang === "es" ? "border-orange-500 bg-orange-500/20 text-white" : "border-white/20 bg-white/10 text-white/70"}`}>🇲🇽 Español</button>
          </div>
        </div>
        <input type="password" value={pwInput} onChange={(e) => { setPwInput(e.target.value); setPwError(false); }} onKeyDown={(e) => e.key === "Enter" && handlePwSubmit()} placeholder="Access Code" className="w-full rounded-xl px-4 py-3 text-center text-lg mb-3 focus:outline-none" style={{background:"rgba(255,255,255,0.1)",border:"2px solid rgba(255,102,0,0.4)",color:"#fff",caretColor:"#ff6600"}} />
        {pwError && <p className="text-red-400 text-sm mb-3">{t("invalidCode")}</p>}
        <button onClick={handlePwSubmit} style={{width:"100%",padding:"0.95rem 1.5rem",borderRadius:"16px",background:"linear-gradient(to bottom,#F0C070,#E8A63C)",color:"#1a0a00",fontWeight:800,fontSize:"1.05rem",border:"none",cursor:"pointer",boxShadow:"0 5px 0px #8C5A10, 0 10px 26px rgba(0,0,0,0.32), inset 0 1.5px 0 rgba(255,255,255,0.45)",letterSpacing:"0.01em"}}>{t("enterBeta")}</button>
        <p className="text-xs text-green-300/60 mt-4">{t("contactFreddie")}</p>
      </div>
    </div>
  );

    return (
    <>{showDisclaimer && (
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 overflow-y-auto" style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
        <div className="w-full max-w-md text-center animate-[fadeIn_0.4s_ease]" style={{background:"rgba(0,0,0,0.35)",border:"2px solid rgba(255,102,0,0.45)",backdropFilter:"blur(14px)",borderRadius:"24px",padding:"2rem"}}>
          <div className="text-5xl mb-3">🥦</div>
          <h2 className="text-xl font-extrabold text-white mb-5" style={{textShadow:"0 2px 8px rgba(0,0,0,0.3)"}}><TrackFreshLogo showBroc={false} /></h2>
          <div className="space-y-4 text-left mb-6">
            <div className="rounded-xl p-4" style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)"}}>
              <p className="text-sm leading-relaxed" style={{color:"rgba(255,255,255,0.85)"}}>
                {lang === "es"
                  ? "💡 Tus datos se almacenan localmente en este dispositivo. Para mantener tus datos seguros, evita borrar el historial y los datos del sitio de Safari. Una opción de respaldo en la nube llegará en la Fase 2."
                  : "💡 Your data is stored locally on this device. To keep your data safe, avoid clearing your Safari history and website data. A cloud backup option is coming in Phase 2."}
              </p>
            </div>
            <div className="rounded-xl p-4" style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(251,191,36,0.3)"}}>
              <p className="text-sm leading-relaxed" style={{color:"rgba(255,255,255,0.85)"}}>
                {lang === "es"
                  ? "⚠️ Aviso sobre Fechas de Vencimiento: Las fechas de vencimiento pueden variar según cómo se almacenen los alimentos. Hemos utilizado la mejor información de IA para proporcionar fechas de caducidad precisas. Siempre verifique las etiquetas del producto y siga las sugerencias de almacenamiento. TrackFresh no puede ser responsable de cómo uses esta información. Al continuar, aceptas reconocer los riesgos de cualquier inexactitud."
                  : "⚠️ Food Expiration Notice: Expiration dates can fluctuate based on how food is stored. We have sourced the best AI information to provide accurate expiry dates. Please always check product labels and follow storage suggestions. TrackFresh cannot be responsible for how you use this information. By continuing you agree to acknowledge the risks of any inaccuracies."}
              </p>
            </div>
          </div>
          <button
            onClick={() => { try { localStorage.setItem("tf_disclaimer_seen", "1"); } catch(e) {} setShowDisclaimer(false); }}
            className="w-full py-3 rounded-xl font-bold text-base btn-amber-3d"
          >
            {lang === "es" ? "Entendido — ¡Vamos! 🥦" : "I Understand — Let's Go! 🥦"}
          </button>
        </div>
      </div>
    )}
    {showWelcome && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto" style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
        <div className="w-full max-w-md text-center animate-[fadeIn_0.4s_ease] py-6" style={{background:"rgba(0,0,0,0.3)",border:"2px solid rgba(255,102,0,0.45)",backdropFilter:"blur(14px)",borderRadius:"24px",padding:"2rem"}}>
          <div className="text-5xl mb-3">🥦</div>
          <h2 className="text-2xl font-extrabold text-white mb-1" style={{textShadow:"0 2px 8px rgba(0,0,0,0.3)"}}><TrackFreshLogo showBroc={false} /></h2>
          <p className="text-green-200 text-sm mb-4">{t("welcomeDesc")}</p>
          <div className="mb-4">
            <p className="text-xs font-bold text-green-300 mb-2 uppercase tracking-wider">🌐 Language / Idioma</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => changeLang("en")} className={`rounded-xl px-5 py-2.5 text-sm font-bold border-2 transition-all ${lang === "en" ? "border-orange-500 bg-orange-500/20 text-white" : "border-white/20 bg-white/10 text-white/70"}`}>🇺🇸 English</button>
              <button onClick={() => changeLang("es")} className={`rounded-xl px-5 py-2.5 text-sm font-bold border-2 transition-all ${lang === "es" ? "border-orange-500 bg-orange-500/20 text-white" : "border-white/20 bg-white/10 text-white/70"}`}>🇲🇽 Español</button>
            </div>
          </div>
          <div className="text-left rounded-xl p-4 mb-4 space-y-2" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)"}}>
            <div className="flex items-center gap-2 text-sm"><span>📸</span><span className="text-green-100">{t("welcomeF1")}</span></div>
            <div className="flex items-center gap-2 text-sm"><span>⏰</span><span className="text-green-100">{t("welcomeF2")}</span></div>
            <div className="flex items-center gap-2 text-sm"><span>🎤</span><span className="text-green-100">{t("welcomeF3")}</span></div>
            <div className="flex items-center gap-2 text-sm"><span>🍳</span><span className="text-green-100">{t("welcomeF4")}</span></div>
            <div className="flex items-center gap-2 text-sm"><span>📅</span><span className="text-green-100">{t("welcomeF5")}</span></div>
            <div className="flex items-center gap-2 text-sm"><span>💬</span><span className="text-green-100">{t("welcomeF6")}</span></div>
            <div className="flex items-center gap-2 text-sm"><span>🌎</span><span className="text-green-100">{t("welcomeF7")}</span></div>
          </div>
          <p className="text-xs text-green-300/60 mb-4">{t("welcomeLocal")}</p>
          <button onClick={() => { setShowWelcome(false); try { localStorage.setItem("trackfresh.welcomed", "true"); } catch(e) {} }} className="glass-scan-btn w-full py-3 text-base font-bold">{t("getStarted")}</button>
        </div>
      </div>
    )}

    <div className="min-h-screen app-bg"><style dangerouslySetInnerHTML={{__html: GLOBAL_STYLES}} />
      {/* Sticky header: logo + top nav */}
      <div style={{position:"sticky",top:0,zIndex:50,background:"linear-gradient(to bottom,#064e3b,#022c22)",boxShadow:"0 4px 20px rgba(0,0,0,0.3)"}}>
        <div className="mx-auto max-w-2xl px-4 pt-3 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {activeTab !== "home" && <button onClick={() => setActiveTab("home")} style={{background:"none",border:"none",cursor:"pointer",color:"#fff",fontSize:"1.2rem",fontWeight:"bold",padding:"0",lineHeight:1}}>←</button>}
            <h1 className="text-2xl font-extrabold text-white" style={{textShadow:"0 2px 8px rgba(0,0,0,0.25)"}}><TrackFreshLogo /></h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { setTourMode(true); setTourSection(null); setTourSlide(0); }} className="app-header-btn tut-pulse">✨ Tour</button>
            <button onClick={() => changeLang(lang === "en" ? "es" : "en")} className="app-header-btn">{lang === "en" ? "\ud83c\uddf2\ud83c\uddfd ES" : "\ud83c\uddfa\ud83c\uddf8 EN"}</button>
            {isAdmin && <button onClick={() => setActiveTab("admin")} className="app-header-btn" style={{color: activeTab === "admin" ? "#B7D63A" : "rgba(255,255,255,0.5)", fontSize:"1.1rem"}} title="Admin">⚙️</button>}
            <button onClick={() => { setIsUnlocked(false); setIsAdmin(false); try { sessionStorage.removeItem("tf_ok"); sessionStorage.removeItem("tf_admin"); } catch(e) {} }} className="app-header-btn">{lang === "es" ? "Salir" : "Sign Out"}</button>
          </div>
        </div>
      </div>
      <div key={activeTab} className="mx-auto max-w-2xl space-y-4 px-4 pt-4 pb-8 tab-enter">



        {showGroceryScan && (
          <GroceryScanModal
            lang={lang}
            parseSpokenDate={parseSpokenDate}
            onAddItem={(item) => setTrackedItems(prev => [item, ...prev])}
            onClose={() => setShowGroceryScan(false)}
          />
        )}

        {showReceiptScanner && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/50 p-4 overflow-y-auto" style={{paddingTop:"calc(env(safe-area-inset-top, 0px) + 3rem)"}}>
            <div className="w-full max-w-lg rounded-xl p-6 shadow-lg" style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
              <h2 className="mb-2 text-lg font-bold" style={{color:"#fff"}}>{t("scanReceiptTitle")}</h2>
              <p className="mb-4 text-sm" style={{color:"rgba(255,255,255,0.75)"}}>{t("scanReceiptDesc")}</p>
              {!receiptScanning && receiptItems.length === 0 && (
                <div className="grid grid-cols-2 gap-3">
                  <label className="glass-scan-btn" style={{cursor:"pointer"}}>
                    <span style={{fontSize:"1.75rem"}}>📸</span>
                    <span style={{fontSize:"0.875rem"}}>{t("takePhoto")}</span>
                    <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => e.target.files[0] && handleScanReceipt(e.target.files[0])} />
                  </label>
                  <label className="glass-scan-btn" style={{cursor:"pointer"}}>
                    <span style={{fontSize:"1.75rem"}}>🖼️</span>
                    <span style={{fontSize:"0.875rem"}}>{t("uploadPhoto")}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && handleScanReceipt(e.target.files[0])} />
                  </label>
                </div>
              )}
              {receiptScanning && (
                <div className="flex flex-col items-center py-8">
                  <div className="mb-3 text-3xl animate-spin">⏳</div>
                  <p className="text-sm" style={{color:"rgba(255,255,255,0.75)"}}>{t("readingReceipt")}</p>
                </div>
              )}
              {receiptError && <p className="mt-2 text-sm" style={{color:"#fca5a5"}}>Error: {receiptError}</p>}
              {receiptItems.length > 0 && (
                <div>
                  <p className="mb-2 text-sm font-semibold" style={{color:"rgba(255,255,255,0.85)"}}>{lang === "es" ? `Se encontraron ${receiptItems.length} productos — selecciona cuáles agregar:` : `Found ${receiptItems.length} items — select which to add:`}</p>
                  <div className="max-h-64 overflow-y-auto space-y-2 mb-4">
                    {receiptItems.map((it, i) => (
                      <div key={i} className="rounded-lg px-3 py-2" style={{background:"rgba(0,0,0,0.25)",border:"1px solid rgba(255,255,255,0.15)"}}>
                        <div className="flex items-center gap-3">
                          <input type="checkbox" checked={selectedReceiptItems.includes(i)} onChange={() => setSelectedReceiptItems((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i])} className="h-4 w-4 accent-green-400" />
                          <span className="flex-1 text-sm font-bold" style={{color:"#fff"}}>{it.name}</span>
                          <span className="rounded px-2 py-0.5 text-xs" style={{background:"rgba(96,165,250,0.2)",color:"#93c5fd"}}>{it.location}</span>
                          <span className="rounded px-2 py-0.5 text-xs" style={{background:"rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.65)"}}>{it.category}</span>
                        </div>
                        <div className="ml-7 mt-1 space-y-0.5">
                          <p className="text-xs" style={{color:"#86efac"}}>📦 Sealed: ~{it.daysSealed || 7} days{it.daysAfterOpening ? " · 📂 After opening: ~" + it.daysAfterOpening + " days" : ""}</p>
                          {it.storageTip && <p className="text-xs" style={{color:"rgba(255,255,255,0.5)"}}>💡 {it.storageTip}</p>}
                          {it.openedTip && <p className="text-xs" style={{color:"#fcd34d"}}>⚠️ {it.openedTip}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={handleAddReceiptItems} style={{width:"100%",padding:"0.75rem 1rem",background:"linear-gradient(to bottom,#16a34a,#15803d)",color:"#fff",fontWeight:800,fontSize:"0.95rem",border:"none",borderRadius:"14px",cursor:"pointer",boxShadow:"0 4px 0 #14532d"}}>{lang === "es" ? `Agregar ${selectedReceiptItems.length} productos al Rastreador` : `Add ${selectedReceiptItems.length} Items to Tracker`}</button>
                </div>
              )}
              <button onClick={() => { setShowReceiptScanner(false); setReceiptItems([]); setReceiptError(""); }} className="mt-3 w-full rounded-xl py-2 text-sm font-bold" style={{background:"rgba(0,0,0,0.2)",border:"1.5px solid rgba(250,204,21,0.5)",color:"#fff"}}>{t("cancel")}</button>
            </div>
          </div>
        )}

        {pendingDateItems.length > 0 && pendingDateIndex < pendingDateItems.length && (() => {
          const item = pendingDateItems[pendingDateIndex];
          const isEs = lang === "es";
          return (
            <div style={{position:"fixed",inset:0,zIndex:9999,background:"#000",display:"flex",flexDirection:"column",alignItems:"stretch",justifyContent:"center",padding:"2rem 1.25rem",gap:"1.25rem"}}>
              <div style={{textAlign:"center"}}>
                <p style={{color:"rgba(255,255,255,0.45)",fontSize:"0.75rem",fontWeight:600,margin:"0 0 0.35rem"}}>{pendingDateIndex + 1} / {pendingDateItems.length}</p>
                <p style={{color:"#facc15",fontWeight:900,fontSize:"1.1rem",margin:0}}>📅 {isEs ? "¿Fecha de vencimiento?" : "Expiration Date?"}</p>
                <p style={{color:"#86efac",fontSize:"0.95rem",fontWeight:700,margin:"0.5rem 0 0"}}>{item.name}</p>
              </div>
              {(item.storageTip || item.openedTip || item.daysAfterOpening) && (
                <div style={{display:"flex",flexDirection:"column",gap:"0.5rem"}}>
                  {item.storageTip && <div style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",background:"rgba(255,255,255,0.07)",borderRadius:"6px",border:"1px solid rgba(0,0,0,0.3)",padding:"0.6rem 0.75rem"}}><span style={{fontSize:"0.85rem",flexShrink:0}}>💡</span><span style={{color:"rgba(255,255,255,0.75)",fontSize:"0.8rem",fontWeight:500,lineHeight:1.4}}><strong style={{color:"rgba(255,255,255,0.9)"}}>{isEs ? "Cómo almacenar:" : "How to store:"}</strong> {item.storageTip}</span></div>}
                  {(item.openedTip || item.daysAfterOpening) && <div style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",background:"rgba(255,255,255,0.07)",borderRadius:"6px",border:"1px solid rgba(0,0,0,0.3)",padding:"0.6rem 0.75rem"}}><span style={{fontSize:"0.85rem",flexShrink:0}}>📂</span><span style={{color:"rgba(255,255,255,0.75)",fontSize:"0.8rem",fontWeight:500,lineHeight:1.4}}><strong style={{color:"rgba(255,255,255,0.9)"}}>{isEs ? "Después de abrir:" : "After opening:"}</strong> {item.openedTip || (item.daysAfterOpening ? `Use within ${item.daysAfterOpening} days` : "")}</span></div>}
                </div>
              )}
              <div style={{position:"relative",borderRadius:"14px",border:"2px solid #facc15",background:"#1a1a1a",overflow:"hidden"}}>
                <div style={{width:"100%",padding:"1rem",fontSize:pendingPickedDate?"1.15rem":"0.95rem",fontWeight:700,color:pendingPickedDate?"#fff":"rgba(255,255,255,0.45)",textAlign:"center",boxSizing:"border-box",lineHeight:1.4,pointerEvents:"none"}}>
                  {pendingPickedDate ? (() => { try { return new Date(pendingPickedDate + "T00:00:00").toLocaleDateString("en-US", {month:"short",day:"numeric",year:"numeric"}); } catch(e) { return pendingPickedDate; } })() : (isEs ? "📅 Toca para seleccionar fecha de vencimiento" : "📅 Tap to select expiration date")}
                </div>
                <input type="date" value={pendingPickedDate} onChange={e => setPendingPickedDate(e.target.value)} style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0,cursor:"pointer",zIndex:1}} />
              </div>
              <div>
                <button onClick={startPendingVoice} style={{width:"100%",padding:"0.85rem",background: pendingVoiceListening || pendingVoiceAwaitND ? "rgba(239,68,68,0.2)" : "rgba(249,115,22,0.15)",color: pendingVoiceListening || pendingVoiceAwaitND ? "#fca5a5" : "#fb923c",fontWeight:700,fontSize:"1rem",border:`1.5px solid ${pendingVoiceListening || pendingVoiceAwaitND ? "rgba(239,68,68,0.5)" : "rgba(249,115,22,0.4)"}`,borderRadius:"16px",cursor:"pointer"}}>
                  {pendingVoiceAwaitND ? "🎤 Say Next or Done..." : pendingVoiceListening ? "🎤 Listening..." : (isEs ? "🎤 Hablar Fecha(s)" : "🎤 Tap to Speak Date(s)")}
                </button>
                {pendingVoiceError && <p style={{color:"#f87171",fontSize:"0.75rem",textAlign:"center",margin:"0.4rem 0 0",fontWeight:600}}>{pendingVoiceError}</p>}
              </div>
              <button onClick={() => { if (pendingNDRef.current) { try { pendingNDRef.current.abort(); } catch(ex) {} pendingNDRef.current = null; } setPendingVoiceAwaitND(false); const nextIdx = pendingDateIndex + 1; handlePendingSaveDate(); if (nextIdx < pendingDateItems.length) setTimeout(() => startPendingVoice(), 600); }} style={{width:"100%",padding:"1.1rem",background:"linear-gradient(to bottom,#16a34a,#15803d)",color:"#fff",fontWeight:900,fontSize:"1.2rem",border:"none",borderRadius:"16px",cursor:"pointer",boxShadow:"0 5px 0 #14532d"}}>
                ✅ {isEs ? "Guardar con Fecha" : "Save with Date"}
              </button>
              <button onClick={handlePendingSkipDate} style={{width:"100%",padding:"1rem",background:"rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.65)",fontWeight:700,fontSize:"1rem",border:"1.5px solid rgba(255,255,255,0.2)",borderRadius:"16px",cursor:"pointer"}}>
                {isEs ? "Omitir Fecha" : "Skip Date"} →
              </button>
              <button onClick={() => {
                if (pendingNDRef.current) { try { pendingNDRef.current.abort(); } catch(ex) {} pendingNDRef.current = null; }
                setPendingVoiceAwaitND(false);
                pendingDateItems.slice(pendingDateIndex).forEach(item => {
                  setTrackedItems(prev => [{ ...item, useByDate: "" }, ...prev]);
                });
                setPendingDateItems([]); setPendingDateIndex(0); setPendingPickedDate("");
              }} style={{width:"100%",padding:"0.55rem",background:"none",color:"rgba(255,255,255,0.38)",fontWeight:500,fontSize:"0.78rem",border:"none",cursor:"pointer"}}>
                {isEs ? "Omitir Todas las Fechas →" : "Skip All Dates for Now →"}
              </button>
            </div>
          );
        })()}

        {showRecallsPanel && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:9999,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={() => setShowRecallsPanel(false)}>
          <div style={{background:"rgba(0,0,0,0.85)",backdropFilter:"blur(20px)",border:"2px solid #fbbf24",borderRadius:"24px 24px 0 0",width:"100%",maxWidth:"500px",maxHeight:"85vh",overflow:"auto",padding:"1.5rem"}} onClick={e => e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}}>
              <button onClick={() => setShowRecallsPanel(false)} style={{background:"none",border:"none",cursor:"pointer",color:"#111",fontSize:"1.1rem",fontWeight:"bold",display:"flex",alignItems:"center",gap:"4px",padding:0}}><span style={{color:"#111",fontSize:"1.1rem",fontWeight:"bold"}}>←</span> {lang === "es" ? "Atrás" : "Back"}</button>
              <h2 style={{fontWeight:800,fontSize:"1.1rem",color:"#fbbf24",margin:0}}>{lang === "es" ? "🛡️ GUARDIÁN DE COCINA: ALERTAS ACTIVAS" : "🛡️ KITCHEN GUARD: ACTIVE ALERTS"}</h2>
              <button onClick={() => setShowRecallsPanel(false)} style={{background:"#f3f4f6",border:"none",borderRadius:"50%",width:"32px",height:"32px",fontSize:"1.1rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>&#10005;</button>
            </div>
            {fdaLoading && <p style={{textAlign:"center",color:"#6b7280",padding:"2rem 0"}}>{t("fdaLoading")}</p>}
            {fdaRecalls.length === 0 && !fdaLoading && <p style={{textAlign:"center",color:"#6b7280",padding:"2rem 0"}}>{t("fdaError")}</p>}
            <div style={{display:"flex",flexDirection:"column",gap:"0.75rem"}}>
              {fdaRecalls.map(recall => (
                <div key={recall.id} style={{background:"rgba(255,255,255,0.05)",borderRadius:"12px",padding:"1rem",borderLeft:recall.severity === "high" ? "4px solid #fbbf24" : "4px solid rgba(255,255,255,0.3)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"0.5rem"}}>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:700,fontSize:"0.85rem",color:"#FFFFFF",lineHeight:1.3}}>{recall.product}</div>
                      <div style={{fontSize:"0.75rem",color:"#fbbf24",marginTop:"3px"}}>Brand: {recall.brand}</div>
                      <div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.9)",marginTop:"0.3rem"}}>{recall.reason}</div>
                      <div style={{fontSize:"0.65rem",color:"rgba(251,191,36,0.8)",marginTop:"4px"}}>{recall.date}</div>
                    </div>
                    <span style={{fontSize:"0.6rem",fontWeight:700,padding:"3px 8px",borderRadius:"999px",flexShrink:0,textTransform:"uppercase",background:recall.severity === "high" ? "#fee2e2" : recall.severity === "medium" ? "#ffedd5" : "#f3f4f6",color:recall.severity === "high" ? "#b91c1c" : recall.severity === "medium" ? "#c2410c" : "#374151"}}>{recall.severity === "high" ? t("fdaClassI") : recall.severity === "medium" ? t("fdaClassII") : t("fdaClassIII")}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{marginTop:"1rem",display:"flex",flexDirection:"column",gap:"0.5rem"}}>
              <button onClick={() => window.open("https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts","_blank")} style={{width:"100%",background:"linear-gradient(to bottom,#dc2626,#991b1b)",color:"white",border:"none",borderRadius:"10px",padding:"0.7rem",fontSize:"0.85rem",fontWeight:700,cursor:"pointer"}}>{t("fdaViewAll")} &#8594; FDA.gov</button>
              <button onClick={() => setShowRecallsPanel(false)} style={{width:"100%",background:"#f3f4f6",color:"#374151",border:"none",borderRadius:"10px",padding:"0.7rem",fontSize:"0.85rem",fontWeight:600,cursor:"pointer"}}>{t("fdaClose")}</button>
            </div>
          </div>
        </div>
      )}

      {showHelp && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-3 text-lg font-bold text-green-700">{lang === "es" ? "Cómo Usar " : "How to Use "}<TrackFreshLogo showBroc={false} style={{fontSize:"0.95em"}} /></h2>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-2"><span>\ud83e\udd66</span><span><strong>Tracker:</strong> {lang === "es" ? "La IA escanea un n\u00famero infinito de productos. Categor\u00eda y ubicaci\u00f3n se llenan autom\u00e1ticamente." : "AI scans an infinite number of items. Category and location auto-fill intelligently."}</span></li>
                <li className="flex gap-2"><span>\ud83d\udcf8</span><span><strong>{lang === "es" ? "Esc\u00e1ner" : "Scanners"}:</strong> {lang === "es" ? "Usa Recibo, Etiqueta, C\u00f3digo de Barras o Agregar R\u00e1pido para a\u00f1adir productos." : "Use Receipt, Label, Barcode, or Quick Add to add items."}</span></li>
                <li className="flex gap-2"><span>\ud83d\udd0d</span><span><strong>Filter:</strong> {lang === "es" ? "Filtra por ubicaci\u00f3n (Refrigerador, Congelador, Despensa) o categor\u00eda (L\u00e1cteos, Carne, etc.)." : "Filter by location (Fridge, Freezer, Pantry) or category (Dairy, Meat, Produce, etc.)."}</span></li>
                <li className="flex gap-2"><span>\ud83c\udf73</span><span><strong>{lang === "es" ? "Recetas" : "Recipes"}:</strong> {lang === "es" ? "La IA sugiere recetas basadas en lo que tienes en tu cocina." : "AI suggests recipes based on what\u2019s in your kitchen."}</span></li>
                <li className="flex gap-2"><span>\ud83d\uded2</span><span><strong>Shopping:</strong> {lang === "es" ? "Crea tu lista de compras y marca lo que compres." : "Build your shopping list and check off items as you shop."}</span></li>
                <li className="flex gap-2"><span>\ud83d\udcc5</span><span><strong>{lang === "es" ? "Comidas" : "Meals"}:</strong> {lang === "es" ? "La IA planifica tus comidas de la semana." : "AI plans your weekly meals based on your tracked items."}</span></li>
                <li className="flex gap-2"><span>\ud83d\udc65</span><span><strong>{lang === "es" ? "Comunidad" : "Community"}:</strong> {lang === "es" ? "Comparte recetas, consejos y chatea." : "Share recipes, tips, and chat with others."}</span></li>
                <li className="flex gap-2"><span>⚠️</span><span><strong>FDA Recalls:</strong> {lang === "es" ? "Alertas de seguridad alimentaria en tiempo real." : "Real-time food safety alerts from the FDA."}</span></li>
              </ul>
              <button onClick={() => setShowHelp(false)} className="mt-4 rounded-xl px-4 py-2 text-sm btn-green-3d">{t("close")}</button>
            </div>
          </div>
        )}

        {editingItem && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl p-6 shadow-lg" style={{background:"#0d3d2e",color:"#fff"}}>
              <h2 className="mb-4 text-lg font-bold" style={{color:"#fff"}}>✏️ Edit Item</h2>
              <div className="space-y-3">
                <div><label className="mb-1 block text-sm font-medium" style={{color:"#fff"}}>{t("nameWord")}</label><input type="text" value={editingItem.name} onChange={(e) => setEditingItem({...editingItem, name: e.target.value})} className="w-full rounded-xl px-3 py-2 text-sm" style={{background:"rgba(255,255,255,0.12)",color:"#fff",border:"1px solid rgba(183,214,58,0.5)"}} /></div>
                <div>
                  <label className="mb-1 block text-sm font-medium" style={{color:"#fff"}}>📅 {lang === "es" ? "Agregar Fecha" : "Add Date"}</label>
                  <input id="editDateInput" type="date" value={editingItem.useByDate} onChange={(e) => setEditingItem({...editingItem, useByDate: e.target.value})} className="w-full rounded-xl px-3 py-2 text-sm" style={{background:"rgba(255,255,255,0.12)",color:"#fff",border:"2px solid #B7D63A"}} />
                </div>
                <div><label className="mb-1 block text-sm font-medium" style={{color:"#fff"}}>Location</label><select value={editingItem.location || "Fridge"} onChange={(e) => setEditingItem({...editingItem, location: e.target.value})} className="w-full rounded-xl px-3 py-2 text-sm" style={{background:"rgba(255,255,255,0.12)",color:"#fff",border:"1px solid rgba(183,214,58,0.5)"}}><option style={{background:"#0d3d2e"}}>Fridge</option><option style={{background:"#0d3d2e"}}>Freezer</option><option style={{background:"#0d3d2e"}}>Pantry</option><option style={{background:"#0d3d2e"}}>Counter</option></select></div>
                <div><label className="mb-1 block text-sm font-medium" style={{color:"#fff"}}>Category</label><select value={editingItem.category || "Other"} onChange={(e) => setEditingItem({...editingItem, category: e.target.value})} className="w-full rounded-xl px-3 py-2 text-sm" style={{background:"rgba(255,255,255,0.12)",color:"#fff",border:"1px solid rgba(183,214,58,0.5)"}}><option style={{background:"#0d3d2e"}}>Dairy</option><option style={{background:"#0d3d2e"}}>Meat</option><option style={{background:"#0d3d2e"}}>Produce</option><option style={{background:"#0d3d2e"}}>Bakery</option><option style={{background:"#0d3d2e"}}>Frozen</option><option style={{background:"#0d3d2e"}}>Pantry</option><option style={{background:"#0d3d2e"}}>Beverages</option><option style={{background:"#0d3d2e"}}>Condiments</option><option style={{background:"#0d3d2e"}}>Snacks</option><option style={{background:"#0d3d2e"}}>Other</option></select></div>
                <div className="flex gap-2 pt-2"><button onClick={handleSaveEdit} className="flex-1 rounded-xl py-2 text-sm font-semibold" style={{background:"#B7D63A",color:"#0d3d2e"}}>{t("save")}</button><button onClick={() => setEditingItem(null)} className="flex-1 rounded-xl py-2 text-sm font-semibold" style={{background:"rgba(255,255,255,0.12)",color:"#fff",border:"1px solid rgba(255,255,255,0.2)"}}>{t("cancel")}</button></div>
              </div>
            </div>
          </div>
        )}
        {showAlert && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
              <div className="mb-3 flex items-center gap-2"><Bell className="h-5 w-5 text-red-500 animate-bounce" /><h2 className="text-lg font-bold text-red-600">{t("expiringSoon")}</h2></div>
              {(() => { const urgent = trackedItems.filter(it => it.daysLeft !== null && it.daysLeft <= 2); return urgent.length > 0 ? (
                <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                  {urgent.map(it => (
                    <div key={it.id} className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-3 py-2">
                      <span className="text-sm font-semibold">{it.name}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${it.daysLeft <= 0 ? "bg-red-600 text-white" : "bg-red-100 text-red-800"}`}>{it.daysLeft <= 0 ? "EXPIRED" : it.daysLeft + " day" + (it.daysLeft === 1 ? "" : "s") + " left"}</span>
                    </div>
                  ))}
                </div>
              ) : <p className="text-sm text-gray-700 mb-4"><span className="font-semibold">{alertItem.name}</span> expires in <span className="font-semibold">{alertItem.daysLeft}</span> day{alertItem.daysLeft === 1 ? "" : "s"}.</p>; })()}
              <p className="text-xs text-gray-500 mb-3">{t("useItemsSoon")}</p>
              <div className="flex gap-2">
                <button onClick={() => setShowAlert(false)} className="flex-1 rounded-lg bg-gradient-to-b from-red-500 to-red-600 py-2 text-sm font-bold text-white btn-3d">{t("gotIt")}</button>
                <button onClick={() => { setShowAlert(false); setActiveTab("recipes"); }} className="flex-1 rounded-lg border border-red-300 bg-gradient-to-b from-white to-red-50 py-2 text-sm font-bold text-red-600 pill-3d">{t("findRecipes")}</button>
              </div>
            </div>
          </div>
        )}

        {showSmartScanner && (
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:9999,display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"1rem",paddingTop:"2rem",overflowY:"auto"}}>
            <div style={{background:"white",borderRadius:"20px",width:"100%",maxWidth:"440px",maxHeight:"90vh",overflow:"auto",padding:"1.25rem"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.75rem"}}>
                <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                  <h2 className="text-lg font-bold">{t("smartScanTitle")}</h2>
                  {scanMode === "multi" && <span className="rounded-full bg-blue-600 text-white px-2 py-1 text-xs font-bold">Mult. Scans</span>}
                  {scanMode === "multi" && uniScanCount > 0 && <span className="rounded-full bg-green-600 text-white px-2 py-1 text-xs font-bold">{uniScanCount} added</span>}
                </div>
                <button onClick={() => { setShowSmartScanner(false); resetSmartScanner(); setScanMode(null); }} style={{background:"#f3f4f6",border:"none",borderRadius:"50%",width:"32px",height:"32px",fontSize:"1.1rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>&times;</button>
              </div>
              {uniScanCount > 0 && (
                <div style={{background:"#ecfdf5",borderRadius:"10px",padding:"0.5rem 0.75rem",marginBottom:"0.5rem",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span style={{fontSize:"0.8rem",fontWeight:700,color:"#059669"}}>📦 {uniScanCount} {lang === "es" ? "artículo" + (uniScanCount > 1 ? "s" : "") + " escaneado" + (uniScanCount > 1 ? "s" : "") : "item" + (uniScanCount > 1 ? "s" : "") + " scanned"}</span>
                  {uniScanLastItem && <span style={{fontSize:"0.7rem",color:"#6b7280"}}>{lang === "es" ? "Último" : "Last"}: {uniScanLastItem}</span>}
                </div>
              )}
              {scanMode === null && (
                <div style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)",borderRadius:"14px",padding:"1rem",textAlign:"center"}}>
                  <p style={{fontSize:"0.875rem",fontWeight:"600",color:"#fff",marginBottom:"0.5rem"}}>{lang === "es" ? "📸 Apunta a un recibo, etiqueta o código de barras" : "📸 Point at a receipt, label, or barcode"}</p>
                  <button onClick={() => setScanMode("multi")} className="glass-scan-btn w-full" style={{marginTop:"0.5rem",padding:"0.75rem"}}><span style={{fontSize:"1.25rem"}}>🚀</span> {lang === "es" ? "Comenzar" : "Start Scanning"}</button>
                </div>
              )}
              {scanMode !== null && <>
              <p className="text-sm text-gray-500 mb-3">{t("smartScanDesc")}</p>
              {!smartResult && !smartError && (<div>
                {(voiceFlowStep || voiceFlowPaused) && (
                  <div style={{background: voiceFlowPaused ? "#7c3aed" : "#1e3a5f", borderRadius:"10px", padding:"0.5rem 0.75rem", marginBottom:"0.5rem", display:"flex", alignItems:"center", gap:"0.5rem"}}>
                    <span>{voiceFlowPaused ? "⏸" : "🎙️"}</span>
                    <span style={{color:"white", fontSize:"0.75rem", fontWeight:"bold"}}>
                      {voiceFlowPaused && "Paused — say Continue"}
                      {!voiceFlowPaused && voiceFlowStep === "say_date" && (lang === "es" ? "Preparando..." : "Preparing...")}
                      {!voiceFlowPaused && voiceFlowStep === "listening_date" && (lang === "es" ? "🔴 Di la fecha..." : "🔴 Say the date...")}
                      {!voiceFlowPaused && voiceFlowStep === "say_next" && "✓ Date saved!"}
                      {!voiceFlowPaused && voiceFlowStep === "listening_next" && (lang === "es" ? "🔴 Di Siguiente o Listo..." : "🔴 Say Next or Done...")}
                    </span>
                  </div>
                )}
                <SmartScanner key={smartScanKey} onResult={handleSmartResultMulti} onError={handleSmartError} captureRef={smartCaptureRef} lang={lang} />

                <button onClick={async () => {
                  try {
                    const video = document.querySelector("#smartScannerVideo");
                    if (!video || !video.srcObject) { handleSmartError("Camera not ready"); return; }
                    const track = video.srcObject.getVideoTracks()[0];
                    if (typeof ImageCapture !== "undefined") {
                      const capture = new ImageCapture(track);
                      const blob = await capture.takePhoto();
                      const reader = new FileReader();
                      reader.onload = async () => {
                        const base64 = reader.result.split(",")[1];
                        try {
                          const res = await fetch("/api/scan-smart", {
                            method: "POST", headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ imageData: base64, mediaType: "image/jpeg" })
                          });
                          const data = await res.json();
                          if (data.items && data.items.length > 0) { handleSmartResultMulti({ ...data.items[0], _allItems: data.items, _scanType: data.type, source: "label" }); }
                          else if (data.item && data.item.name) { handleSmartResultMulti({ ...data.item, source: "label" }); }
                          else { handleSmartError(data.error || "Could not read. Try again."); }
                        } catch (err) { handleSmartError("Scan failed: " + err.message); }
                      };
                      reader.readAsDataURL(blob);
                    } else {
                      const canvas = document.createElement("canvas");
                      canvas.width = video.videoWidth || 1280;
                      canvas.height = video.videoHeight || 720;
                      canvas.getContext("2d").drawImage(video, 0, 0);
                      const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
                      const base64 = dataUrl.split(",")[1];
                      try {
                        const res = await fetch("/api/scan-smart", {
                          method: "POST", headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ imageData: base64, mediaType: "image/jpeg" })
                        });
                        const data = await res.json();
                        if (data.items && data.items.length > 0) { handleSmartResultMulti({ ...data.items[0], _allItems: data.items, _scanType: data.type, source: "label" }); }
                        else if (data.item && data.item.name) { handleSmartResultMulti({ ...data.item, source: "label" }); }
                        else { handleSmartError(data.error || "Could not read. Try again."); }
                      } catch (err) { handleSmartError("Scan failed: " + err.message); }
                    }
                  } catch (err) { handleSmartError("Capture failed: " + err.message); }
                }} className="w-full rounded-xl py-3 text-sm font-bold mt-3 btn-green-3d">📸 Take Photo</button>
                <label className="w-full rounded-xl py-3 text-sm font-bold mt-2 btn-green-3d text-center block cursor-pointer" style={{background:"rgba(255,255,255,0.12)",border:"1.5px solid rgba(255,255,255,0.25)",color:"#fff"}}>🖼️ {lang === "es" ? "Subir Foto de Galería" : "Upload Photo from Gallery"}
                  <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                    const file = e.target.files[0]; if (!file) return;
                    const reader = new FileReader();
                    reader.onload = async (ev) => {
                      const base64 = ev.target.result.split(",")[1];
                      const mType = file.type || "image/jpeg";
                      try {
                        const res = await fetch("/api/scan-smart", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ imageData: base64, mediaType: mType }) });
                        const data = await res.json();
                        if (data.items && data.items.length > 0) { handleSmartResultMulti({ ...data.items[0], _allItems: data.items, _scanType: data.type, source: "label" }); }
                        else if (data.item && data.item.name) { handleSmartResultMulti({ ...data.item, source: "label" }); }
                        else { handleSmartError(data.error || "Could not read. Try again."); }
                      } catch (err) { handleSmartError("Scan failed: " + err.message); }
                    };
                    reader.readAsDataURL(file);
                  }} />
                </label>
              </div>)}
              {showSmartMultiReview && smartMultiItems.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-bold text-green-700 mb-2">{lang === "es" ? `📋 Se encontraron ${smartMultiItems.length} productos` : `📋 Found ${smartMultiItems.length} items`}</p>
                  <div className="max-h-64 overflow-y-auto space-y-2 mb-3">
                    {smartMultiItems.map((item, i) => (
                      <label key={i} className="flex items-center gap-3 p-2 rounded-lg border hover:bg-green-50 cursor-pointer">
                        <input type="checkbox" checked={selectedSmartMulti.includes(i)} onChange={() => setSelectedSmartMulti(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])} className="w-4 h-4" />
                        <div className="flex-1">
                          <p className="text-sm font-bold">{item.name}</p>
                          <div className="flex gap-1 mt-0.5">
                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[item.category] || CATEGORY_COLORS.Other}`}>{item.category}</span>
                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${LOCATION_COLORS[item.location] || LOCATION_COLORS.Fridge}`}>{LOCATION_ICONS[item.location] || "🧊"} {item.location}</span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  <button onClick={handleAddSmartMultiItems} className="w-full rounded-xl py-3 text-sm font-bold btn-green-3d text-white">{lang === "es" ? `✅ Agregar ${selectedSmartMulti.length} Productos` : `✅ Add ${selectedSmartMulti.length} Items`}</button>
                  <button onClick={() => { handleAddSmartMultiItems(); setTimeout(() => { setShowSmartMultiReview(false); setSmartMultiItems([]); setSelectedSmartMulti([]); resetSmartScanner(); setSmartScanKey(prev => prev + 1); }, 100); }} className="w-full mt-2 rounded-xl py-2 text-sm font-bold bg-blue-500 text-white shadow-md" style={{boxShadow:"0 3px 0 #1d4ed8"}}>{lang === "es" ? "✅ Agregar y Escanear Otro" : "✅ Add & Scan Another"}</button>
                  <button onClick={() => { setShowSmartMultiReview(false); setSmartMultiItems([]); setSelectedSmartMulti([]); resetSmartScanner(); setSmartScanKey(prev => prev + 1); }} className="w-full mt-2 rounded-xl border py-2 text-sm font-bold text-gray-600 pill-3d">{lang === "es" ? "Escanear de Nuevo" : "Scan Again"}</button>
                </div>
              )}
              {smartError && (<div className="text-center py-6"><p className="text-sm text-red-600 mb-3">{smartError}</p><button onClick={resetSmartScanner} className="rounded-xl px-6 py-2 text-sm font-bold btn-green-3d">{t("smartScanRetry")}</button></div>)}
              {smartResult && (<div className="mt-3">
                <div style={{background:"#f0fdf4",borderRadius:"12px",padding:"1rem",border:"1px solid #bbf7d0",marginBottom:"0.75rem"}}>
                  <p className="text-xs font-bold text-green-700 mb-1">{t("smartScanFound")}</p>
                  <p className="text-lg font-bold text-gray-900">{smartResult.name}</p>
                  {smartResult.source === "barcode" && <p className="text-xs text-gray-500 mt-1">Via barcode</p>}
                  {smartResult.source === "label" && <p className="text-xs text-gray-500 mt-1">Via AI label scan</p>}
                  {smartResult.category && <p className="text-xs text-gray-500">Category: {smartResult.category}</p>}
                  {smartResult.storageTip && <p className="text-xs text-green-600 mt-1">{smartResult.storageTip}</p>}
                </div>
                <div className="mb-3">
                  <p className="text-xs font-bold text-gray-700 mb-2">{t("smartScanWhere")}</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => { setSmartLocation("Fridge"); setSmartFreezeBy(""); }} className={`rounded-lg border-2 py-3 text-sm font-semibold ${smartLocation === "Fridge" ? "border-green-500 bg-green-50 text-green-700 pill-3d-active" : "border-gray-200 text-gray-600 pill-3d"}`}>Fridge</button>
                    <button onClick={() => { setSmartLocation("Freezer"); }} className={`rounded-lg border-2 py-3 text-sm font-semibold ${smartLocation === "Freezer" ? "border-cyan-500 bg-cyan-50 text-cyan-700 pill-3d-active" : "border-gray-200 text-gray-600 pill-3d"}`}>Freezer</button>
                    <button onClick={() => { setSmartLocation("Pantry"); setSmartFreezeBy(""); }} className={`rounded-lg border-2 py-3 text-sm font-semibold ${smartLocation === "Pantry" ? "border-amber-500 bg-amber-50 text-amber-700 pill-3d-active" : "border-gray-200 text-gray-600 pill-3d"}`}>Pantry</button>
                  </div>
                </div>
                <div className="mb-3">
                  <p className="text-xs font-bold text-gray-700 mb-1">Use By Date</p>
                  {voiceListening && (<div style={{background:"#fff7ed",borderRadius:"12px",padding:"1rem",border:"2px solid #fb923c",textAlign:"center",marginBottom:"0.75rem"}}>
                    <p className="text-2xl mb-2">🎙️</p>
                    <p className="text-sm font-bold text-orange-700">{t("listeningDate")}</p>
                    <p className="text-xs text-orange-500 mt-1">{t("saySampleDate")}</p>
                  </div>)}
                  {smartResult.dateFound && smartUseBy ? (<div style={{background:"#ecfdf5",borderRadius:"8px",padding:"0.5rem 0.75rem",border:"1px solid #a7f3d0"}}><p className="text-sm font-bold text-green-800">{smartUseBy}</p><p className="text-xs text-green-600">{t("smartScanDateAuto")}</p></div>) : (<div>
                    <p className="text-xs text-orange-600 mb-2">{t("smartScanNoDate")}</p>
                    <input type="file" accept="image/*" capture="environment" id="smartDateInput" style={{display:"none"}} onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      setScanningDate(true);
                      const reader = new FileReader();
                      reader.onload = async () => {
                        const base64 = reader.result.split(",")[1];
                        try {
                          const res = await fetch("/api/scan-label", {
                            method: "POST", headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ imageData: base64, mediaType: file.type || "image/jpeg" })
                          });
                          const data = await res.json();
                          if (data.item && data.item.date && data.item.dateFound) {
                            setSmartUseBy(data.item.date);
                            setSmartResult(prev => ({...prev, dateFound: true, date: data.item.date}));
                          }
                        } catch (err) { console.error("Date scan error:", err); }
                        setScanningDate(false);
                      };
                      reader.readAsDataURL(file);
                      e.target.value = "";
                    }} />
                    {scanningDate ? (
                      <p className="text-sm text-center text-orange-600 font-bold py-2">{t("smartScanDateReading")}</p>
                    ) : (<>
                      <p className="text-sm font-bold text-gray-700 mb-2">📅 {t("expDateLabel")} {smartUseBy && <span className="text-green-600 text-xs font-normal">✓ {smartUseBy}</span>}</p>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <button onClick={() => startVoiceDatePrompt(smartResult.name)} className={`rounded-xl py-3 text-sm font-bold bg-gradient-to-b from-blue-50 to-blue-100 text-blue-700 border-2 border-blue-300 pill-3d`}>🎤 Speak Date</button>
                        <label className="rounded-xl py-3 text-sm font-bold bg-gradient-to-b from-gray-50 to-gray-100 text-gray-700 border-2 border-gray-300 pill-3d" style={{display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>📅 Enter Date<input type="date" value={smartUseBy} onChange={e => setSmartUseBy(e.target.value)} style={{position:"absolute",opacity:0,width:"1px",height:"1px"}} /></label>
                      </div>
                      <button onClick={() => document.getElementById("smartDateInput").click()} className="w-full rounded-xl py-2 text-sm font-bold bg-gradient-to-b from-orange-400 to-orange-500 text-white" style={{border:"none",cursor:"pointer"}}>{t("smartScanDate")}</button>
                    </>)}
                  </div>)}
                </div>
                {smartLocation === "Freezer" && (<div className="mb-3"><p className="text-xs font-bold text-gray-700 mb-1">{t("freezeByLabel")}</p><input type="date" value={smartFreezeBy} onChange={e => setSmartFreezeBy(e.target.value)} className="w-full rounded border px-3 py-2 text-sm" /></div>)}
                <button onClick={handleAddSmartItem} disabled={!smartLocation} className={`w-full rounded-xl py-3 text-sm font-bold mt-2 ${!smartLocation ? "bg-gray-300 text-white" : "btn-green-3d"}`}>{t("addToTracker")}</button>
                <button onClick={resetSmartScanner} className="w-full rounded-xl border bg-white py-2 text-sm font-bold text-gray-600 mt-2 pill-3d">{t("smartScanRetry")}</button>
                <button onClick={() => { handleAddSmartItemMulti(); }} disabled={!smartResult} className={`w-full rounded-xl py-3 text-sm font-bold mt-2 ${!smartResult ? "bg-gray-200 text-gray-400" : "bg-blue-500 text-white shadow-md"}`} style={smartResult ? {boxShadow:"0 3px 0 #1d4ed8"} : {}}>{lang === "es" ? "✅ Agregar y Escanear Otro" : "✅ Add & Scan Another"}</button>
              <button onClick={() => { if (smartResult) handleAddSmartItemMulti(); setTimeout(() => handleDoneUniScan(), 100); }} className="w-full rounded-xl py-2.5 text-sm font-bold mt-2" style={{background:"linear-gradient(to bottom, #059669, #047857)", color:"white", boxShadow:"0 3px 0 #065f46"}}>{uniScanCount > 0 ? (lang === "es" ? `✅ Listo (${uniScanCount + (smartResult ? 1 : 0)} artículos)` : `✅ Done (${uniScanCount + (smartResult ? 1 : 0)} items)`) : (smartResult ? (lang === "es" ? "✅ Agregar y Cerrar" : "✅ Add & Close") : t("cancel"))}</button>
              </div>)}
              </>}
            </div>
          </div>
        )}

        {showVoiceEditForm && smartResult && (
          <div style={{position:"fixed",inset:0,zIndex:10000,background:"rgba(0,0,0,0.5)"}} onClick={() => setShowVoiceEditForm(false)}>
            <div style={{position:"fixed",bottom:0,left:0,right:0,background:"white",borderRadius:"20px 20px 0 0",padding:"1.25rem",zIndex:10001,maxHeight:"75vh",overflow:"auto"}} onClick={e => e.stopPropagation()}>
              <div style={{width:"40px",height:"4px",background:"#e5e7eb",borderRadius:"2px",margin:"0 auto 1rem"}} />
              <h3 style={{fontWeight:"bold",marginBottom:"0.75rem"}}>✏️ {lang === "es" ? "Editar Item" : "Edit Item"}</h3>
              <div style={{marginBottom:"0.75rem"}}>
                <p style={{fontSize:"0.75rem",color:"#6b7280",marginBottom:"0.25rem"}}>{lang === "es" ? "Nombre" : "Name"}</p>
                <input value={smartResult.name || ""} onChange={e => setSmartResult(prev => prev ? {...prev, name: e.target.value} : prev)} style={{width:"100%",border:"1px solid #d1d5db",borderRadius:"6px",padding:"0.5rem 0.75rem",fontSize:"0.875rem",boxSizing:"border-box"}} />
              </div>
              <div style={{marginBottom:"0.75rem"}}>
                <p style={{fontSize:"0.75rem",color:"#6b7280",marginBottom:"0.25rem"}}>{lang === "es" ? "Fecha de vencimiento" : "Use By Date"}</p>
                <input type="date" value={smartUseBy} onChange={e => setSmartUseBy(e.target.value)} style={{width:"100%",border:"1px solid #d1d5db",borderRadius:"6px",padding:"0.5rem 0.75rem",fontSize:"0.875rem",boxSizing:"border-box"}} />
              </div>
              <div style={{marginBottom:"1rem"}}>
                <p style={{fontSize:"0.75rem",color:"#6b7280",marginBottom:"0.5rem"}}>{lang === "es" ? "Ubicación" : "Location"}</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"0.5rem"}}>
                  {["Fridge","Freezer","Pantry"].map(loc => (
                    <button key={loc} onClick={() => setSmartLocation(loc)} style={{border: smartLocation === loc ? "2px solid #16a34a" : "2px solid #e5e7eb",borderRadius:"8px",padding:"0.5rem",fontSize:"0.75rem",fontWeight:"600",background: smartLocation === loc ? "#f0fdf4" : "white",color: smartLocation === loc ? "#15803d" : "#4b5563",cursor:"pointer"}}>{loc}</button>
                  ))}
                </div>
              </div>
              <button onClick={() => { setShowVoiceEditForm(false); speakThen(lang === "es" ? "Volviendo al escáner." : "Returning to scanner.", () => startScanCommandLoop()); }} className="w-full rounded-xl py-2.5 text-sm font-bold btn-green-3d" style={{marginBottom:"0.5rem",display:"block"}}>
                🎙️ {lang === "es" ? "Volver a Escanear" : "Return to Scan"}
              </button>
              <button onClick={() => handleAddSmartItemMulti()} style={{width:"100%",background:"#3b82f6",color:"white",borderRadius:"10px",border:"none",cursor:"pointer",padding:"0.625rem",fontSize:"0.875rem",fontWeight:"bold"}}>
                ✅ {lang === "es" ? "Guardar y Siguiente" : "Save & Next"}
              </button>
            </div>
          </div>
        )}

        {showVoiceEditForm && smartResult && (
          <div style={{position:"fixed",inset:0,zIndex:10000,background:"rgba(0,0,0,0.5)"}} onClick={() => setShowVoiceEditForm(false)}>
            <div style={{position:"fixed",bottom:0,left:0,right:0,background:"white",borderRadius:"20px 20px 0 0",padding:"1.25rem",zIndex:10001,maxHeight:"75vh",overflow:"auto"}} onClick={e => e.stopPropagation()}>
              <div style={{width:"40px",height:"4px",background:"#e5e7eb",borderRadius:"2px",margin:"0 auto 1rem"}} />
              <h3 style={{fontWeight:"bold",marginBottom:"0.75rem"}}>✏️ {lang === "es" ? "Editar Item" : "Edit Item"}</h3>
              <div style={{marginBottom:"0.75rem"}}>
                <p style={{fontSize:"0.75rem",color:"#6b7280",marginBottom:"0.25rem"}}>{lang === "es" ? "Nombre" : "Name"}</p>
                <input value={smartResult.name || ""} onChange={e => setSmartResult(prev => prev ? {...prev, name: e.target.value} : prev)} style={{width:"100%",border:"1px solid #d1d5db",borderRadius:"6px",padding:"0.5rem 0.75rem",fontSize:"0.875rem",boxSizing:"border-box"}} />
              </div>
              <div style={{marginBottom:"0.75rem"}}>
                <p style={{fontSize:"0.75rem",color:"#6b7280",marginBottom:"0.25rem"}}>{lang === "es" ? "Fecha de vencimiento" : "Use By Date"}</p>
                <input type="date" value={smartUseBy} onChange={e => setSmartUseBy(e.target.value)} style={{width:"100%",border:"1px solid #d1d5db",borderRadius:"6px",padding:"0.5rem 0.75rem",fontSize:"0.875rem",boxSizing:"border-box"}} />
              </div>
              <div style={{marginBottom:"1rem"}}>
                <p style={{fontSize:"0.75rem",color:"#6b7280",marginBottom:"0.5rem"}}>{lang === "es" ? "Ubicación" : "Location"}</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"0.5rem"}}>
                  {["Fridge","Freezer","Pantry"].map(loc => (
                    <button key={loc} onClick={() => setSmartLocation(loc)} style={{border: smartLocation === loc ? "2px solid #16a34a" : "2px solid #e5e7eb",borderRadius:"8px",padding:"0.5rem",fontSize:"0.75rem",fontWeight:"600",background: smartLocation === loc ? "#f0fdf4" : "white",color: smartLocation === loc ? "#15803d" : "#4b5563",cursor:"pointer"}}>{loc}</button>
                  ))}
                </div>
              </div>
              <button onClick={() => { setShowVoiceEditForm(false); speakThen(lang === "es" ? "Volviendo al escáner." : "Returning to scanner.", () => startScanCommandLoop()); }} className="w-full rounded-xl py-2.5 text-sm font-bold btn-green-3d" style={{marginBottom:"0.5rem",display:"block"}}>
                🎙️ {lang === "es" ? "Volver a Escanear" : "Return to Scan"}
              </button>
              <button onClick={() => handleAddSmartItemMulti()} style={{width:"100%",background:"#3b82f6",color:"white",borderRadius:"10px",border:"none",cursor:"pointer",padding:"0.625rem",fontSize:"0.875rem",fontWeight:"bold"}}>
                ✅ {lang === "es" ? "Guardar y Siguiente" : "Save & Next"}
              </button>
            </div>
          </div>
        )}

        {showBarcodeScanner && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/50 p-4 overflow-y-auto" style={{paddingTop:"2rem"}}>
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold">{t("scanBarcodeTitle")}</h2>
                <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                  {scanMode === "multi" && <span className="rounded-full bg-blue-600 text-white px-2 py-1 text-xs font-bold">Mult. Scans</span>}
                  {scanMode === "multi" && multiScanCount > 0 && <span className="rounded-full bg-green-600 text-white px-2 py-1 text-xs font-bold">{multiScanCount} added</span>}
                  <button onClick={() => { setShowBarcodeScanner(false); setBarcodeItem(null); setBarcodeError(""); setBarcodeDetected(""); setMultiScanCount(0); setMultiScanLastItem(""); setScanMode(null); }} style={{background:"#f3f4f6",border:"none",borderRadius:"50%",width:"32px",height:"32px",fontSize:"1.1rem",cursor:"pointer"}}>&times;</button>
                </div>
              </div>
              {scanMode === null && (
                <div style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)",borderRadius:"14px",padding:"1rem"}}>
                  <p style={{textAlign:"center",fontSize:"0.875rem",fontWeight:"600",color:"#fff",marginBottom:"0.75rem"}}>{t("howManyItems")}</p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem"}}>
                    <button onClick={() => setScanMode("single")} className="glass-scan-btn" style={{padding:"1.25rem 0.5rem"}}><span style={{fontSize:"1.75rem"}}>1️⃣</span><span style={{fontSize:"0.875rem"}}>{t("singleScan")}</span></button>
                    <button onClick={() => setScanMode("multi")} className="glass-scan-btn" style={{padding:"1.25rem 0.5rem"}}><span style={{fontSize:"1.75rem"}}>📦</span><span style={{fontSize:"0.875rem"}}>{t("multiScans")}</span></button>
                  </div>
                </div>
              )}
              {scanMode !== null && <>
              {multiScanLastItem && <div className="mb-3 rounded-lg bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-700 font-semibold animate-pulse">✅ Added: {multiScanLastItem} — Ready for next scan!</div>}
              <p className="mb-4 text-sm text-gray-600">{t("scanBarcodeDesc")}</p>
              {!barcodeItem && (
                <BarcodeScanner key={barcodeScanKey} onDetected={handleBarcodeDetected} />
              )}
              {barcodeScanning && (
                <div className="flex flex-col items-center py-4">
                  <div className="mb-3 text-3xl animate-spin">⏳</div>
                  <p className="text-sm text-gray-600">{t("lookingUp")}</p>
                </div>
              )}
              {barcodeError && (
                <div className="mt-2 rounded-lg bg-red-50 p-3">
                  <p className="text-sm text-red-600">{barcodeError}</p>
<button onClick={() => { setBarcodeError(""); setBarcodeDetected(""); setBarcodeItem(null); setBarcodeScanning(false); setShowBarcodeScanner(false); setScanMode(null); setTimeout(() => { window.scrollTo(0,0); setShowBarcodeScanner(true); }, 1000); }} className="mt-2 text-xs text-green-700 underline">{t("tryAgain")}</button>
                </div>
              )}
              {barcodeItem && (
                <div className="space-y-3">
                  <div className="rounded-lg border p-3 bg-green-50">
                    <p className="text-xs text-green-600 font-semibold mb-1">✅ Product found!</p>
                    <p className="font-bold text-gray-800">{barcodeItem.name}</p>
                    <p className="text-xs text-gray-500">{barcodeItem.category}</p>
                    {barcodeItem.storageTip && <p className="text-xs text-gray-600 mt-1">💡 {barcodeItem.storageTip}</p>}
                    {barcodeItem.openedTip && <p className="text-xs text-orange-600 mt-1">⚠️ {barcodeItem.openedTip}</p>}
                    {barcodeItem.daysAfterOpening && <p className="text-xs text-blue-600 mt-1">📅 Use within {barcodeItem.daysAfterOpening} days of opening</p>}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">{t("whereStoring")}</p>
                    <div className="grid grid-cols-3 gap-2">
                      <button onClick={() => { setBarcodeLocation("Fridge"); setBarcodeFreezeBy(""); }} className={`rounded-lg border-2 py-3 text-sm font-semibold transition-colors ${barcodeLocation === "Fridge" ? "border-green-500 bg-gradient-to-b from-green-50 to-green-100 text-green-700 pill-3d-active" : "border-gray-200 text-gray-600 pill-3d"}`}>🧊 Fridge</button>
                      <button onClick={() => setBarcodeLocation("Freezer")} className={`rounded-lg border-2 py-3 text-sm font-semibold transition-colors ${barcodeLocation === "Freezer" ? "border-cyan-500 bg-gradient-to-b from-cyan-50 to-cyan-100 text-cyan-700 pill-3d-active" : "border-gray-200 text-gray-600 pill-3d"}`}>❄️ Freezer</button>
                      <button onClick={() => { setBarcodeLocation("Pantry"); setBarcodeFreezeBy(""); }} className={`rounded-lg border-2 py-3 text-sm font-semibold transition-colors ${barcodeLocation === "Pantry" ? "border-amber-500 bg-gradient-to-b from-amber-50 to-amber-100 text-amber-700 pill-3d-active" : "border-gray-200 text-gray-600 pill-3d"}`}>🗄️ Pantry</button>
                    </div>
                  </div>
                  {barcodeLocation && (
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-bold text-gray-700 mb-2">📅 {barcodeLocation === "Freezer" ? t("freezeByLabel") + " Date" : t("expDateLabel")} {barcodeUseBy && <span className="text-green-600">✓ {barcodeUseBy}</span>}</p>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <button onClick={() => handleVoiceDate("useBy")} className={`rounded-xl py-3 text-sm font-bold ${voiceListening === "useBy" ? "bg-red-500 text-white animate-pulse" : "bg-gradient-to-b from-blue-50 to-blue-100 text-blue-700 border-2 border-blue-300 pill-3d"}`}>🎤 {voiceListening === "useBy" ? "Listening..." : "Speak Date"}</button>
                          <label className="rounded-xl py-3 text-sm font-bold bg-gradient-to-b from-gray-50 to-gray-100 text-gray-700 border-2 border-gray-300 pill-3d" style={{display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>📅 Enter Date<input type="date" value={barcodeUseBy} onChange={(e) => setBarcodeUseBy(e.target.value)} style={{position:"absolute",opacity:0,width:"1px",height:"1px"}} /></label>
                        </div>
                        {(voiceListening === "useBy" || barcodeUseBy) && <p className="text-xs mt-1" style={{color: barcodeUseBy ? "#059669" : "#ef4444"}}>{voiceListening === "useBy" ? "🎤 Listening... say e.g. March 20 2026" : "✓ " + barcodeUseBy}</p>}
                        {voiceListening === "useBy" && <p className="text-xs text-green-700 mt-1">Say the date e.g. February 20 2026</p>}
                      </div>
                      {barcodeLocation === "Fridge" && barcodeItem.category === "Meat" && (
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">{t("freezeByLabel")} Date <span className="text-xs text-gray-400">(optional - we will remind you)</span></label>
                          <div className="flex gap-2">
                            <input type="date" value={barcodeFreezeBy} onChange={(e) => setBarcodeFreezeBy(e.target.value)} className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                            <button onClick={() => handleVoiceDate("freezeBy")} className={`rounded px-3 py-2 text-sm font-semibold ${voiceListening === "freezeBy" ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 text-gray-800"}`}>{voiceListening === "freezeBy" ? "🎤 Listening..." : "🎤"}</button>
                          </div>
                          {voiceListening === "freezeBy" && <p className="text-xs text-green-700 mt-1">Say the date e.g. February 25 2026</p>}
                        </div>
                      )}
                      {voiceError && <p className="text-xs text-red-500">{voiceError}</p>}
                    </div>
                  )}
                  <button onClick={handleAddBarcodeItem} disabled={!barcodeLocation} className={`w-full rounded-xl py-2.5 text-sm font-bold ${!barcodeLocation ? "bg-gray-300 text-white" : "btn-green-3d"}`}>{t("addToTracker")}</button>
                  <button onClick={() => { setBarcodeItem(null); setBarcodeDetected(""); setBarcodeLocation(""); setBarcodeUseBy(""); setBarcodeFreezeBy(""); setVoiceError(""); setBarcodeScanKey(prev => prev + 1); resetMultiScanTimer(); }} className="w-full rounded-xl border bg-gradient-to-b from-white to-gray-50 py-2 text-sm font-bold text-gray-600 pill-3d">{t("scanAnother")}</button>
                </div>
              )}
              </>}
              <button onClick={handleDoneScanning} className="mt-3 w-full rounded-xl py-2.5 text-sm font-bold" style={{background:"linear-gradient(to bottom, #059669, #047857)", color:"white", boxShadow:"0 3px 0 #065f46"}}>{multiScanCount > 0 ? (lang === "es" ? "✅ Listo (" + multiScanCount + " artículos)" : "✅ Done (" + multiScanCount + " items added)") : t("cancel")}</button>
            </div>
          </div>
        )}

        {showQuickAdd && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-lg rounded-xl p-6 shadow-lg" style={{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.15)"}}>
              <h2 className="mb-2 text-lg font-bold" style={{color:"#fff"}}>✏️ Quick Add</h2>
              <p className="mb-4 text-sm" style={{color:"rgba(255,255,255,0.6)"}}>{t("quickAddTitleDesc")}</p>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm font-medium" style={{color:"#4ade80"}}>{t("foodItem")}</label>
                  <FoodAutocomplete lang={lang}
                    value={quickAddName}
                    onChange={setQuickAddName}
                    onSelect={(f) => { setQuickAddName(f.name); setQuickAddCategory(f.category); setQuickAddLocation(f.location); }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium" style={{color:"#4ade80"}}>{t("category")}</label>
                    <select value={quickAddCategory} onChange={(e) => setQuickAddCategory(e.target.value)} className="w-full rounded-xl px-3 py-2 text-sm" style={{background:"#1a1a1a",color:"#fff",border:"1px solid rgba(255,255,255,0.2)"}}>
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium" style={{color:"#4ade80"}}>{t("locationWord")}</label>
                    <select value={quickAddLocation} onChange={(e) => setQuickAddLocation(e.target.value)} className="w-full rounded-xl px-3 py-2 text-sm" style={{background:"#1a1a1a",color:"#fff",border:"1px solid rgba(255,255,255,0.2)"}}>
                      {LOCATIONS.map((l) => <option key={l} value={l}>{LOCATION_ICONS[l]} {l}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium" style={{color:"#4ade80"}}>📅 {lang === "es" ? "Fecha de Vencimiento" : "Set Expiry Date"}</label>
                  <div className="flex gap-2">
                    <input type="date" value={quickAddDate} onChange={(e) => setQuickAddDate(e.target.value)} className="flex-1 rounded-xl px-3 py-2 text-sm" style={{background:"#1a1a1a",color:"#fff",border:"2px solid #f97316"}} />
                    <button onClick={() => handleQuickVoice("date")} className={`rounded px-3 py-2 text-sm font-semibold ${quickVoiceListening === "date" ? "bg-red-500 text-white animate-pulse" : "bg-white/20 text-white"}`}>{quickVoiceListening === "date" ? "🎤 Listening..." : "🎤"}</button>
                  </div>
                  {quickVoiceListening === "date" && <p className="text-xs text-green-300 mt-1">{lang === "es" ? "Di la fecha ej. veinte de febrero" : "Say date e.g. February 20"}</p>}
                  {quickVoiceError && <p className="text-xs text-red-400 mt-1">{quickVoiceError}</p>}
                </div>
                <button onClick={handleQuickAdd} className="w-full rounded-xl py-2.5 text-sm font-bold" style={{background:"#22c55e",color:"#0a0a0a"}}>{lang === "es" ? "Agregar Artículo" : "Add Item"}</button>
                <button onClick={() => { setShowQuickAdd(false); setQuickAddName(""); setQuickAddDate(""); setQuickAddQty(""); setQuickAddCategory("Other"); setQuickAddLocation("Fridge"); }} className="w-full rounded-xl py-2 text-sm font-semibold" style={{background:"rgba(255,255,255,0.08)",color:"#fff",border:"none"}}>{t("cancel")}</button>
              </div>
            </div>
          </div>
        )}

        {showLabelScanner && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/50 p-4 overflow-y-auto" style={{paddingTop:"2rem"}}>
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold">{t("scanLabelTitle")}</h2>
                <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                  {labelScanMode === "multi" && <span className="rounded-full bg-blue-600 text-white px-2 py-1 text-xs font-bold">Mult. Scans</span>}
                  {labelScanMode === "multi" && labelScanCount > 0 && <span className="rounded-full bg-green-600 text-white px-2 py-1 text-xs font-bold">{labelScanCount} added</span>}
                  <button onClick={() => { setShowLabelScanner(false); setLabelItem(null); setLabelError(""); setLabelScanCount(0); setLabelLastItem(""); setLabelScanMode(null); }} style={{background:"#f3f4f6",border:"none",borderRadius:"50%",width:"32px",height:"32px",fontSize:"1.1rem",cursor:"pointer"}}>&times;</button>
                </div>
              </div>
              {labelScanMode === null && (
                <div style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)",borderRadius:"14px",padding:"1rem"}}>
                  <p style={{textAlign:"center",fontSize:"0.875rem",fontWeight:"600",color:"#fff",marginBottom:"0.75rem"}}>{t("howManyItems")}</p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem"}}>
                    <label className="glass-scan-btn" style={{padding:"1.25rem 0.5rem",cursor:"pointer"}}>
                      <span style={{fontSize:"1.75rem"}}>1️⃣</span>
                      <span style={{fontSize:"0.875rem"}}>{t("singleScan")}</span>
                      <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => { setLabelError(""); setLabelScanMode("single"); if(e.target.files[0]) handleScanLabel(e.target.files[0]); e.target.value=""; }} />
                    </label>
                    <label className="glass-scan-btn" style={{padding:"1.25rem 0.5rem",cursor:"pointer"}}>
                      <span style={{fontSize:"1.75rem"}}>📦</span>
                      <span style={{fontSize:"0.875rem"}}>{t("multiScans")}</span>
                      <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => { setLabelError(""); setLabelScanMode("multi"); if(e.target.files[0]) handleScanLabel(e.target.files[0]); e.target.value=""; }} />
                    </label>
                  </div>
                </div>
              )}
              {labelScanMode !== null && <>
              {labelLastItem && <div className="mb-3 rounded-lg bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-700 font-semibold animate-pulse">✅ Added: {labelLastItem} — Ready for next scan!</div>}
              {!labelScanning && !labelItem && (
                <label key={labelScanKey} className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-green-300 bg-green-50 p-8 hover:bg-green-100">
                  <span className="text-3xl mb-2">📷</span>
                  <span className="text-sm font-semibold text-green-600">{labelScanMode === "multi" ? t("tapToScanNext") : t("tapToPhoto")}</span>
                  <span className="text-xs text-gray-500 mt-1">{t("tapOpenCamera")}</span>
                  <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => { setLabelError(""); if(e.target.files[0]) handleScanLabel(e.target.files[0]); e.target.value=""; }} />
                </label>
              )}
              {labelScanning && (
                <div className="flex flex-col items-center py-8">
                  <div className="mb-3 text-3xl animate-spin">⏳</div>
                  <p className="text-sm text-gray-600">{t("readingLabel")}</p>
                </div>
              )}
              {labelError && <p className="mt-2 text-sm text-red-600">{labelError}</p>}
              {labelItem && (
                <div className="space-y-3">
                  <div className="rounded-lg border p-3 bg-green-50">
                    <p className="text-xs text-green-600 font-semibold mb-1">✅ Label read!</p>
                    <p className="font-bold text-gray-800">{labelItem.name}</p>
                    <p className="text-xs text-gray-500">{labelItem.category} · {labelItem.location}</p>
                    <p className="text-xs text-gray-600 mt-1">{labelItem.dateType}: {labelItem.date || "Not found"}</p>
                    <p className="text-sm font-bold text-gray-700 mt-2 mb-1">📅 {t("expDateLabel")} {labelItem.date && <span className="text-green-600 text-xs font-normal">✓ auto-detected</span>}</p>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <button onClick={() => handleVoiceDate("labelDate")} className={`rounded-xl py-3 text-sm font-bold ${voiceListening === "labelDate" ? "bg-red-500 text-white animate-pulse" : "bg-gradient-to-b from-blue-50 to-blue-100 text-blue-700 border-2 border-blue-300 pill-3d"}`}>🎤 {voiceListening === "labelDate" ? "Listening..." : "Speak Date"}</button>
                      <label className="rounded-xl py-3 text-sm font-bold bg-gradient-to-b from-gray-50 to-gray-100 text-gray-700 border-2 border-gray-300 pill-3d" style={{display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>📅 Enter Date<input type="date" value={labelItem.date||""} onChange={(e) => setLabelItem(prev=>({...prev,date:e.target.value,dateFound:true}))} style={{position:"absolute",opacity:0,width:"1px",height:"1px"}} /></label>
                    </div>
                    {(voiceListening === "labelDate" || labelItem.date) && <p className="text-xs mt-1" style={{color: labelItem.date ? "#059669" : "#ef4444"}}>{voiceListening === "labelDate" ? "🎤 Listening... say e.g. March 20 2026" : "✓ " + labelItem.date}</p>}
                    {labelItem.storageTip && <p className="text-xs text-gray-600 mt-1">💡 {labelItem.storageTip}</p>}
                    {labelItem.openedTip && <p className="text-xs text-orange-600 mt-1">⚠️ {labelItem.openedTip}</p>}
                    {labelItem.daysAfterOpening && <p className="text-xs text-blue-600 mt-1">📅 Use within {labelItem.daysAfterOpening} days of opening</p>}
                  </div>
                  <button onClick={handleAddLabelItem} className="w-full rounded-xl py-2.5 text-sm btn-green-3d">{labelScanMode === "multi" ? t("addAndNext") : t("addToTracker")}</button>
                  <button onClick={() => { setLabelItem(null); setLabelError(""); }} className="w-full rounded-xl border bg-gradient-to-b from-white to-gray-50 py-2 text-sm font-bold text-gray-600 pill-3d">{t("scanAnother")}</button>
                </div>
              )}
              <button onClick={() => { setShowLabelScanner(false); setLabelItem(null); setLabelError(""); setLabelScanCount(0); setLabelLastItem(""); setLabelScanMode(null); }} className="mt-3 w-full rounded-xl py-2.5 text-sm font-bold" style={{background:"linear-gradient(to bottom, #059669, #047857)", color:"white", boxShadow:"0 3px 0 #065f46"}}>{labelScanCount > 0 ? (lang === "es" ? "✅ Listo (" + labelScanCount + " artículos)" : "✅ Done (" + labelScanCount + " items added)") : t("cancel")}</button>
              </>}
            </div>
          </div>
        )}

        {showMultiScanner && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/50 p-4 overflow-y-auto" style={{paddingTop:"2rem"}}>
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold">📦 {lang === "es" ? "Escanear Múltiples" : "Scan Multiple"}</h2>
                <button onClick={() => { setShowMultiScanner(false); setMultiItems([]); setMultiScanStatus("camera"); setMultiScanError(""); }} style={{background:"#f3f4f6",border:"none",borderRadius:"50%",width:"32px",height:"32px",fontSize:"1.1rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>&times;</button>
              </div>

              {multiScanStatus === "camera" && (
                <>
                  <p className="text-sm text-gray-600 mb-4">{lang === "es" ? "Toma una foto de varios productos juntos. La IA identificará cada uno." : "Take a photo of several products together. AI will identify each one."}</p>
                  <div style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)",borderRadius:"14px",padding:"1rem"}}>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="glass-scan-btn" style={{cursor:"pointer"}}>
                        <span style={{fontSize:"1.75rem"}}>📸</span>
                        <span style={{fontSize:"0.875rem"}}>{lang === "es" ? "Tomar Foto" : "Take Photo"}</span>
                        <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => e.target.files[0] && handleMultiScan(e.target.files[0])} />
                      </label>
                      <label className="glass-scan-btn" style={{cursor:"pointer"}}>
                        <span style={{fontSize:"1.75rem"}}>🖼️</span>
                        <span style={{fontSize:"0.875rem"}}>{lang === "es" ? "Subir Foto" : "Upload Photo"}</span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && handleMultiScan(e.target.files[0])} />
                      </label>
                    </div>
                  </div>
                  {multiScanError && <p className="text-sm text-red-600 mt-3 text-center">{multiScanError}</p>}
                </>
              )}

              {multiScanStatus === "scanning" && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3 animate-pulse">📦</div>
                  <p className="text-sm font-bold text-green-700">{lang === "es" ? "IA identificando productos..." : "AI identifying products..."}</p>
                </div>
              )}

              {multiScanStatus === "review" && (
                <>
                  <p className="text-sm text-gray-600 mb-3">{lang === "es" ? `Se encontraron ${multiItems.length} productos. Deselecciona los que no quieras.` : `Found ${multiItems.length} items. Uncheck any you don't want.`}</p>
                  <div className="max-h-64 overflow-y-auto space-y-2 mb-4">
                    {multiItems.map((item, i) => (
                      <label key={i} className="flex items-center gap-3 p-2 rounded-lg border hover:bg-green-50 cursor-pointer">
                        <input type="checkbox" checked={selectedMultiItems.includes(i)} onChange={() => setSelectedMultiItems(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])} className="w-4 h-4" />
                        <div className="flex-1">
                          <p className="text-sm font-bold">{item.name}</p>
                          <div className="flex gap-1 mt-0.5">
                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[item.category] || CATEGORY_COLORS.Other}`}>{item.category}</span>
                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${LOCATION_COLORS[item.location] || LOCATION_COLORS.Fridge}`}>{LOCATION_ICONS[item.location] || "🧊"} {item.location}</span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  <button onClick={handleAddMultiItems} className="w-full rounded-xl py-3 text-sm font-bold btn-green-3d text-white">{lang === "es" ? `✅ Agregar ${selectedMultiItems.length} Productos` : `✅ Add ${selectedMultiItems.length} Items to Tracker`}</button>
                  <button onClick={() => { setMultiScanStatus("camera"); setMultiItems([]); setMultiScanError(""); }} className="w-full mt-2 rounded-xl border py-2 text-sm font-bold text-gray-600 pill-3d">{lang === "es" ? "Escanear de Nuevo" : "Scan Again"}</button>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === "home" && (
          <div ref={homeTopRef}>
            {/* ── Your Kitchen Today panel ── always visible ── */}
            {(() => {
              const isEs = lang === "es";
              const expired       = [...itemsWithCountdown].filter(it => it.daysLeft !== null && it.daysLeft < 0).sort((a,b) => a.daysLeft - b.daysLeft);
              const expiringToday = [...itemsWithCountdown].filter(it => it.daysLeft !== null && it.daysLeft === 0);
              const useSoon       = [...itemsWithCountdown].filter(it => it.daysLeft !== null && it.daysLeft >= 1 && it.daysLeft <= 3).sort((a,b) => a.daysLeft - b.daysLeft);
              const fresh         = [...itemsWithCountdown].filter(it => it.daysLeft !== null && it.daysLeft > 3).sort((a,b) => a.daysLeft - b.daysLeft);
              const showItems     = [...expired, ...expiringToday, ...useSoon, ...fresh].slice(0, 6);
              const attentionCount = expired.length + expiringToday.length + useSoon.length;
              let subtitle;
              if (attentionCount > 0) subtitle = isEs ? `${attentionCount} artículo${attentionCount>1?"s":""} necesitan tu atención` : `${attentionCount} item${attentionCount>1?"s":""} need your attention`;
              else                    subtitle = isEs ? "Todo se ve bien hoy" : "Everything looks good today";
              const accentColor = expired.length > 0 ? "#dc2626" : expiringToday.length > 0 ? "#fbbf24" : useSoon.length > 0 ? "#a3e635" : "#4ade80";

              const KRow = ({ item }) => {
                const d = item.daysLeft;
                let dot, textColor, statusLabel;
                if (d < 0)       { dot = "🔴"; textColor = "#fca5a5"; statusLabel = isEs ? "Fecha pasada" : "Past Date"; }
                else if (d === 0){ dot = "🔴"; textColor = "#fbbf24"; statusLabel = isEs ? "Hoy" : "Today"; }
                else if (d <= 3) { dot = "🟠"; textColor = "#a3e635"; statusLabel = `${d} ${isEs?"día"+(d===1?"":"s"):"day"+(d===1?"":"s")}`; }
                else if (d <= 7) { dot = "🟡"; textColor = "#a3e635"; statusLabel = `${d} ${isEs?(d===1?"día":"días"):(d===1?"day":"days")}`; }
                else             { dot = "🟢"; textColor = "#4ade80"; statusLabel = `${d} ${isEs?(d===1?"día":"días"):(d===1?"day":"days")}`; }
                return (
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.35rem 0",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"0.5rem",minWidth:0}}>
                      <span style={{fontSize:"0.75rem",flexShrink:0}}>{dot}</span>
                      <span style={{fontSize:"0.82rem",fontWeight:600,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</span>
                      {item.openDate && <span style={{fontSize:"0.6rem",color:"#B7D63A",fontWeight:700,flexShrink:0}}>📂</span>}
                    </div>
                    <span style={{fontSize:"0.72rem",fontWeight:700,color:textColor,whiteSpace:"nowrap",marginLeft:"0.5rem"}}>{statusLabel}</span>
                  </div>
                );
              };

              if (trackedItems.length === 0) {
                return (
                  <>
                    <div style={{marginBottom:"0.75rem"}}>
                      <h2 className="app-section-h2" style={{margin:0}}>🍽️ {isEs?"Tu Cocina Hoy":"Your Kitchen Today"}</h2>
                    </div>
                    <div style={{textAlign:"center",padding:"2.25rem 1.5rem 2rem",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.13)",borderRadius:"20px",backdropFilter:"blur(8px)",marginBottom:"1.25rem"}}>
                      <div style={{fontSize:"2.5rem",marginBottom:"0.85rem",lineHeight:1}}>🥦</div>
                      <p style={{color:"rgba(255,255,255,0.92)",fontWeight:700,fontSize:"1.05rem",marginBottom:"0.55rem",lineHeight:1.4}}>
                        {isEs ? "Tu Cocina Hoy cobrará vida a medida que construyas tu inventario." : "Your Kitchen Today will come to life as you build your inventory."}
                      </p>
                      <p style={{color:"rgba(255,255,255,0.92)",fontWeight:500,fontSize:"0.88rem",lineHeight:1.55,margin:"0 0 1.5rem"}}>
                        {isEs ? "Empieza agregando artículos en Rastreador." : "Start by adding items in Tracker."}
                      </p>
                      <button onClick={handleGoToTracker} className="glass-scan-btn" style={{fontSize:"0.88rem",padding:"0.7rem 1.75rem"}}>
                        {isEs ? "Ir al Rastreador →" : "Go to Tracker →"}
                      </button>
                    </div>
                  </>
                );
              }

              return (
                <>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"0.75rem",gap:"0.75rem"}}>
                    <div style={{minWidth:0}}>
                      <h2 className="app-section-h2" style={{margin:0}}>🍽️ {isEs?"Tu Cocina Hoy":"Your Kitchen Today"}</h2>
                      <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.75)",marginTop:"0.2rem",fontWeight:500}}>{subtitle}</div>
                    </div>
                    <button onClick={() => setActiveTab("tracker")} style={{fontSize:"0.72rem",fontWeight:700,color:"#86efac",background:"rgba(134,239,172,0.12)",border:"1px solid rgba(134,239,172,0.3)",borderRadius:"999px",padding:"0.3rem 0.75rem",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,lineHeight:1.4,minHeight:"2rem",display:"flex",alignItems:"center"}}>
                      {isEs?"Ver Todo":"See All"} ›
                    </button>
                  </div>
                  <div style={{background:"rgba(0,0,0,0.25)",border:"1px solid rgba(255,255,255,0.12)",borderLeft:`4px solid ${accentColor}`,borderRadius:"18px",padding:"1rem 1.1rem",marginBottom:"1.25rem",backdropFilter:"blur(8px)"}}>
                    {(() => {
                      const soonItems = [...expiringToday, ...useSoon];
                      const names = soonItems.slice(0, 2).map(it => it.name);
                      let msg;
                      if (names.length === 0) { msg = isEs ? "Todo se ve fresco — ¡buen trabajo!" : "Everything looks fresh — great job."; }
                      else if (names.length === 1) { msg = isEs ? `Usa tu ${names[0]} pronto.` : `Use your ${names[0]} soon.`; }
                      else { msg = isEs ? `Usa tu ${names[0]} y ${names[1]} pronto.` : `Use your ${names[0]} and ${names[1]} soon.`; }
                      return (
                        <p style={{fontSize:"0.78rem",fontWeight:600,color:soonItems.length > 0 ? "rgba(163,230,53,0.9)" : "rgba(74,222,128,0.85)",marginBottom:"0.75rem",lineHeight:1.45}}>{msg}</p>
                      );
                    })()}
                    {showItems.length > 0 ? (
                      <div style={{marginBottom:"0.75rem"}}>{showItems.map(it => <KRow key={it.id} item={it} />)}</div>
                    ) : (
                      <div style={{textAlign:"center",padding:"0.75rem 0 0.875rem",color:"#86efac",fontSize:"0.82rem",fontWeight:600}}>✅ {isEs?"Todo fresco — ¡buen trabajo!":"Everything looks fresh — great job!"}</div>
                    )}
                  </div>
                  <button onClick={() => { setActiveTab("tracker"); }} className="glass-scan-btn w-full" style={{padding:"0.9rem 1rem",fontSize:"0.875rem",flexDirection:"row",justifyContent:"center",gap:"0.6rem",background:"rgba(183,214,58,0.15)",borderColor:"#B7D63A"}}>
                    <span style={{fontSize:"1.4rem"}}>📂</span>
                    <span style={{fontWeight:800}}>{isEs ? "Marcar Lo Que Abrí" : "Mark What You've Opened"}</span>
                  </button>
                </>
              );
            })()}

            <div className="grid grid-cols-3 gap-3">
              {trackedItems.length > 0 && (() => {
                const urgentCount = itemsWithCountdown.filter(it => it.daysLeft !== null && it.daysLeft <= 3).length;
                const weekCount   = itemsWithCountdown.filter(it => it.daysLeft !== null && it.daysLeft > 3 && it.daysLeft <= 7).length;
                const totalAlert  = urgentCount + weekCount;
                return (
                  <button key="use-soon" onClick={() => setActiveTab("tracker")} style={{gridColumn:"1/-1",background: urgentCount > 0 ? "linear-gradient(135deg,rgba(220,38,38,0.25),rgba(234,88,12,0.2))" : "rgba(255,255,255,0.1)",border: urgentCount > 0 ? "1.5px solid rgba(220,38,38,0.55)" : "1.5px solid rgba(183,214,58,0.45)",borderRadius:"16px",padding:"0.875rem 1.25rem",display:"flex",alignItems:"center",gap:"1rem",cursor:"pointer",transition:"all 0.15s",backdropFilter:"blur(6px)",textAlign:"left"}}>
                    <span style={{fontSize:"2.2rem",flexShrink:0}}>⚡</span>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:800,color:"#fff",fontSize:"0.95rem",lineHeight:1.2}}>{lang==="es"?"Usar Pronto":"Use Soon"}</div>
                      <div style={{fontSize:"0.7rem",color:"#86efac",fontWeight:600,marginTop:"0.2rem"}}>
                        {urgentCount > 0
                          ? (lang==="es" ? `${urgentCount} ítem${urgentCount>1?"s":""} expiran en 1–3 días` : `${urgentCount} item${urgentCount>1?"s":""} expiring in 1–3 days`)
                          : weekCount > 0
                          ? (lang==="es" ? `${weekCount} ítem${weekCount>1?"s":""} esta semana` : `${weekCount} item${weekCount>1?"s":""} to use this week`)
                          : (lang==="es" ? "Todo fresco — revisa diario" : "All fresh — check daily")}
                      </div>
                    </div>
                    {totalAlert > 0 && <span className={urgentCount > 0 ? "urgency-pulse" : ""} style={{background: urgentCount > 0 ? "#dc2626" : "#B7D63A",color:"#fff",fontWeight:800,fontSize:"0.75rem",borderRadius:"999px",padding:"0.2rem 0.6rem",flexShrink:0,display:"inline-block"}}>{totalAlert}</span>}
                    <span style={{color:"rgba(255,255,255,0.4)",fontSize:"1.1rem",flexShrink:0}}>›</span>
                  </button>
                );
              })()}
              {[
                { icon: String.fromCodePoint(0x1F966), label: lang === "es" ? "Rastreador" : "Tracker",    sub: lang === "es" ? "Rastrea tu Comida" : "Track Your Food",    action: () => setActiveTab("tracker") },
                { icon: String.fromCodePoint(0x1F373), label: lang === "es" ? "Recetas" : "Recipes",       sub: lang === "es" ? "Usa Lo Que Tienes" : "Use What You Have",  action: () => setActiveTab("recipes") },
                { icon: String.fromCodePoint(0x1F6D2), label: lang === "es" ? "Lista de Compras" : "Shopping List", sub: lang === "es" ? "Tu Lista" : "Build Your List",         action: () => setActiveTab("shopping") },
                { icon: String.fromCodePoint(0x1F4C5), label: lang === "es" ? "Comidas" : "Meals",         sub: lang === "es" ? "Tu Semana" : "Plan Your Week",              action: () => setActiveTab("meals") },
                { icon: "🏪",                           label: lang === "es" ? "Tiendas" : "Stores",        sub: lang === "es" ? "Enlaza y Compra" : "Link And Shop",          action: () => setActiveTab("stores-page") },
                { icon: "⚠️",                           label: lang === "es" ? "Alertas FDA" : "FDA Recalls", sub: lang === "es" ? "Revisa Diario" : "Check Daily",           action: () => setShowRecallsPanel(true) },
                { icon: "🤝",                           label: lang === "es" ? "Socios" : "Partners",       sub: lang === "es" ? "Beneficios y Dar" : "Benefits & Giving Back", action: () => setActiveTab("partners") },
                { icon: "🥗",                           label: lang === "es" ? "Dieta" : "Dietary",         sub: lang === "es" ? "Necesidades" : "Dietary Needs",             action: () => setActiveTab("dietary") },
                { icon: "💬",                           label: lang === "es" ? "Sugerencias" : "Suggestions", sub: lang === "es" ? "Tu Opinión" : "Share Feedback",           action: () => setActiveTab("suggestions") },
              ].map(({ icon, label, sub, action }) => {
                const isTrackerTile = label === (lang === "es" ? "Rastreador" : "Tracker");
                const isShoppingTile = label === (lang === "es" ? "Lista de Compras" : "Shopping List");
                return (
                  <button key={label} onClick={action} className={`dash-tile${isTrackerTile && trackerTileFlash ? " tracker-tile-active" : ""}`}>
                    <span style={{fontSize:"2rem",...(isShoppingTile ? {filter:"drop-shadow(0 0 4px rgba(249,115,22,0.55)) brightness(1.13)",display:"inline-block"} : {})}}>{icon}</span>
                    <span style={{fontSize:"0.7rem",fontWeight:700,color:"#fff",letterSpacing:"0.02em",textAlign:"center",lineHeight:1.2}}>{label}</span>
                    {sub && <span style={{fontSize:"0.6rem",fontWeight:600,color:"#86efac",textAlign:"center",lineHeight:1.2}}>{sub}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "tracker" && (
          <div ref={trackerTopRef} style={{display:"flex",flexDirection:"column",gap:"0.75rem"}}>

            {/* Header — always visible */}
            <div className={trackerEntryFlash ? "tracker-entry-flash" : ""} style={{marginBottom:"0.5rem",padding:trackerEntryFlash?"0.4rem 0.5rem":"0",transition:"padding 0s"}}>
              <h2 className="text-xl font-semibold" style={{margin:0,color:"#F59E0B",letterSpacing:"0.08em"}}>
                {lang === "es" ? "RASTREA TU COMIDA" : "TRACK YOUR FOOD"}
              </h2>
            </div>

            {trackedItems.length === 0 ? (
              /* ── EMPTY STATE ── */
              <>
                <div style={{textAlign:"center",padding:"1.25rem 1rem 1rem",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:"16px",backdropFilter:"blur(6px)"}}>
                  <div style={{fontSize:"2rem",marginBottom:"0.5rem",lineHeight:1}}>🥦</div>
                  <p style={{color:"rgba(255,255,255,0.9)",fontWeight:700,fontSize:"1rem",marginBottom:"0.35rem",lineHeight:1.4}}>
                    {lang === "es" ? "Empieza agregando artículos en Rastreador." : "Start by adding items below."}
                  </p>
                  <p style={{color:"rgba(255,255,255,0.75)",fontWeight:500,fontSize:"0.8rem",lineHeight:1.5,margin:0}}>
                    {lang === "es" ? "Aquí es donde llevarás un registro de todo lo que tienes." : "This is where you'll keep track of everything you have."}
                  </p>
                </div>

                <div>
                  <button onClick={() => { setShowReceiptScanner(true); }} className="glass-scan-btn w-full" style={{padding:"0.85rem 1rem",fontSize:"0.875rem",flexDirection:"column",justifyContent:"center",gap:"0.35rem",marginBottom:"0.75rem"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}><span style={{fontSize:"1.4rem"}}>📷</span>{t("scanReceipts")}</div>
                    <span style={{display:"inline-block",background:"linear-gradient(135deg,#F0C070,#E8A63C)",color:"#000",fontWeight:800,fontSize:"0.65rem",borderRadius:"999px",padding:"0.2rem 0.75rem",boxShadow:"0 2px 6px rgba(232,166,60,0.4)"}}>⭐ {lang === "es" ? "Empieza aquí para mejores resultados" : "Start here for best results"}</span>
                  </button>
                  <button onClick={() => setShowGroceryScan(true)} className="glass-scan-btn w-full" style={{padding:"0.85rem 0.35rem",fontSize:"0.875rem",flexDirection:"column",gap:"0.35rem",marginBottom:"0.5rem"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}><span style={{fontSize:"1.3rem"}}>🛒</span>{lang==="es"?"Escaneo Inteligente":"Smart Scan"}</div>
                    <span style={{display:"inline-block",background:"linear-gradient(135deg,#F0C070,#E8A63C)",color:"#000",fontWeight:800,fontSize:"0.65rem",borderRadius:"999px",padding:"0.2rem 0.75rem",boxShadow:"0 2px 6px rgba(232,166,60,0.4)"}}>{lang==="es"?"Varios artículos, códigos y etiquetas":"Mult. items barcodes and labels"}</span>
                  </button>
                  <button onClick={() => setShowQuickAdd(true)} className="glass-scan-btn w-full" style={{marginTop:"0.5rem",padding:"0.75rem 0.5rem",fontSize:"0.875rem",flexDirection:"row",justifyContent:"center",gap:"0.4rem"}}><span style={{fontSize:"1.1rem"}}>✏️</span>{lang==="es"?"Agregar":"Quick Add"}</button>
                </div>
              </>
            ) : (
              /* ── POPULATED STATE ── */
              <>
                {/* Summary bar */}
                {(() => {
                  const soonCount = itemsWithCountdown.filter(it => it.daysLeft !== null && it.daysLeft >= 0 && it.daysLeft <= 3).length;
                  const msg = soonCount > 0
                    ? (lang === "es" ? `Tienes ${soonCount} artículo${soonCount > 1 ? "s" : ""} para usar pronto.` : `You have ${soonCount} item${soonCount > 1 ? "s" : ""} to use soon.`)
                    : (lang === "es" ? "Todo fresco — ¡buen trabajo!" : "Everything looks fresh — great job!");
                  const isAlert = soonCount > 0;
                  if (justAddedFirst) {
                    return (
                      <div className="tf-first-item-msg" style={{textAlign:"center",padding:"0.65rem 1rem",background:"rgba(134,239,172,0.08)",border:"1px solid rgba(134,239,172,0.2)",borderRadius:"12px"}}>
                        <span style={{color:"rgba(255,255,255,0.92)",fontSize:"0.85rem",fontWeight:500,lineHeight:1.4}}>
                          🌱 {lang === "es" ? "Tu cocina está empezando a tomar forma." : "Your kitchen is starting to take shape."}
                        </span>
                      </div>
                    );
                  }
                  return (
                    <div style={{display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.6rem 0.9rem",background: isAlert ? "rgba(251,191,36,0.1)" : "rgba(34,197,94,0.08)",border:`1px solid ${isAlert ? "rgba(251,191,36,0.25)" : "rgba(34,197,94,0.2)"}`,borderRadius:"12px"}}>
                      <span style={{fontSize:"0.95rem",flexShrink:0}}>{isAlert ? "⚠️" : "✅"}</span>
                      <span style={{color: isAlert ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.72)",fontSize:"0.83rem",fontWeight:500,lineHeight:1.4}}>{msg}</span>
                    </div>
                  );
                })()}

                {/* Track Your Food + scan actions */}
                <div>
                  <span className="app-section-label">{String.fromCodePoint(0x1F966)} {t("tracker")}</span>
                </div>
                <div>
                  <button onClick={() => { setShowReceiptScanner(true); }} className="glass-scan-btn w-full" style={{padding:"0.85rem 1rem",fontSize:"0.875rem",flexDirection:"column",justifyContent:"center",gap:"0.35rem",marginBottom:"0.75rem"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}><span style={{fontSize:"1.4rem"}}>📷</span>{t("scanReceipts")}</div>
                    <span style={{display:"inline-block",background:"linear-gradient(135deg,#F0C070,#E8A63C)",color:"#000",fontWeight:800,fontSize:"0.65rem",borderRadius:"999px",padding:"0.2rem 0.75rem",boxShadow:"0 2px 6px rgba(232,166,60,0.4)"}}>⭐ {lang === "es" ? "Empieza aquí para mejores resultados" : "Start here for best results"}</span>
                  </button>
                  <button onClick={() => setShowGroceryScan(true)} className="glass-scan-btn w-full" style={{padding:"0.85rem 0.35rem",fontSize:"0.875rem",flexDirection:"column",gap:"0.35rem",marginBottom:"0.5rem"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}><span style={{fontSize:"1.3rem"}}>🛒</span>{lang==="es"?"Escaneo Inteligente":"Smart Scan"}</div>
                    <span style={{display:"inline-block",background:"linear-gradient(135deg,#F0C070,#E8A63C)",color:"#000",fontWeight:800,fontSize:"0.65rem",borderRadius:"999px",padding:"0.2rem 0.75rem",boxShadow:"0 2px 6px rgba(232,166,60,0.4)"}}>{lang==="es"?"Varios artículos, códigos y etiquetas":"Mult. items barcodes and labels"}</span>
                  </button>
                  <button onClick={() => setShowQuickAdd(true)} className="glass-scan-btn w-full" style={{marginTop:"0.5rem",padding:"0.75rem 0.5rem",fontSize:"0.875rem",flexDirection:"row",justifyContent:"center",gap:"0.4rem"}}><span style={{fontSize:"1.1rem"}}>✏️</span>{lang==="es"?"Agregar":"Quick Add"}</button>
                </div>


                {/* Items card */}
                <div>
                  <p style={{color:"rgba(255,255,255,0.9)",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:"0.4rem",textAlign:"center"}}>Organize Tracked Items</p>
                  <Card className="tracker-items-card">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button onClick={() => { if (window.confirm(t("clearAllConfirm"))) { setTrackedItems([]); } }} className="rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">{t("clearAll")}</button>
                      </div>
                      <span style={{color:"rgba(255,255,255,0.75)",fontSize:"0.875rem",fontWeight:600}}>{filteredItems.length} item{filteredItems.length === 1 ? "" : "s"}</span>
                    </div>
                    <p style={{fontSize:"0.7rem",color:"#F59E0B",marginBottom:"0.35rem",fontWeight:500}}>Tap to view by storage location</p>
                    <div className="mb-2 flex flex-wrap gap-1">
                      {["All", ...LOCATIONS].map((l) => {
                        const LOC_ES = {All:"Todo",Fridge:"Refrigerador",Freezer:"Congelador",Pantry:"Despensa"};
                        const label = lang === "es" ? LOC_ES[l] : l;
                        return (
                          <button key={l} onClick={() => setFilterLocation(l)} className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${filterLocation === l ? "bg-green-700 text-white" : "bg-white text-gray-600 hover:bg-green-50 border border-gray-200 pill-3d"}`}>
                            {l !== "All" ? LOCATION_ICONS[l] + " " : ""}{label}
                          </button>
                        );
                      })}
                    </div>
                    {filteredItems.length === 0 ? (
                      <p className="text-sm text-white/70">{t("noFilter")}</p>
                    ) : (
                      <div className="space-y-2">
                        {filteredItems.map((it) => {
                          const urgent = it.daysLeft !== null && it.daysLeft <= 3;
                          const soon = it.daysLeft !== null && it.daysLeft <= 7 && it.daysLeft > 3;
                          return (
                            <div key={it.id} className="rounded-lg px-3 py-2" style={{background: "linear-gradient(160deg,#064e3b,#065f46)", border: "1px solid rgba(255,255,255,0.15)", boxShadow: it.daysLeft !== null && it.daysLeft < 0 ? "0 0 20px rgba(239,68,68,0.6), 0 0 40px rgba(239,68,68,0.3)" : it.daysLeft !== null && it.daysLeft <= 2 ? "0 0 20px rgba(245,158,11,0.6), 0 0 40px rgba(245,158,11,0.3)" : it.daysLeft !== null && it.daysLeft <= 7 ? "0 0 15px rgba(251,191,36,0.5), 0 0 30px rgba(251,191,36,0.2)" : "none"}}>
                              <div>
                                <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:"0.5rem"}}>
                                  <div>
                                    <span style={{color:"#fff",fontWeight:700,fontSize:"1rem"}}>{it.brand ? `${it.brand} ${it.name}` : it.name}</span>
                                    {it.quantity && <span className="text-xs ml-2" style={{color:"rgba(255,255,255,0.5)"}}>{it.quantity}</span>}
                                  </div>
                                  <div style={{marginLeft:"0.5rem",flexShrink:0,textAlign:"center"}}>
                                    {it.daysLeft !== null && (() => {
                                      const d = it.daysLeft;
                                      const [color, border] = d < 0 || d <= 2 ? ["#ef4444","3px solid #ef4444"] : d <= 4 ? ["#f97316","3px solid #f97316"] : d <= 7 ? ["#eab308","3px solid #eab308"] : ["#4ade80","3px solid #4ade80"];
                                      return (
                                        <div>
                                          <div style={{display:"inline-block",background:"transparent",border,borderRadius:"999px",padding:"0.18rem 0.55rem",fontSize:"0.85rem",fontWeight:800,color,whiteSpace:"nowrap",lineHeight:1.2}}>{d}</div>
                                          <div className="text-xs mt-0.5" style={{color,opacity:0.8}}>{t("days")}</div>
                                        </div>
                                      );
                                    })()}
                                  </div>
                                </div>
                                <div style={{display:"flex",gap:"0.4rem",marginBottom:"0.5rem"}}>
                                  {it.daysLeft === null ? (
                                    <button onClick={() => handleEditItem(it.id)} className="animate-pulse" style={{flex:1,background:"#ef4444",borderRadius:"10px",padding:"0.3rem 0.4rem",fontSize:"0.68rem",fontWeight:800,color:"#fff",cursor:"pointer",textAlign:"center",lineHeight:1.35,border:"2px solid #ef4444"}}>EXP Date</button>
                                  ) : it.daysLeft <= 2 ? (
                                    <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(183,214,58,0.2)",borderRadius:"10px",padding:"0.3rem 0.4rem",fontSize:"0.68rem",fontWeight:800,color:"#B7D63A",border:"2px solid #B7D63A",textAlign:"center"}}>Expiring Soon</div>
                                  ) : (
                                    <div style={{flex:1}} />
                                  )}
                                  <button onClick={() => { if (!it.openDate) { const _td = new Date(); const today = `${_td.getFullYear()}-${String(_td.getMonth()+1).padStart(2,'0')}-${String(_td.getDate()).padStart(2,'0')}`; const days = it.daysAfterOpening || 5; const useBy = new Date(Date.now() + days * 86400000).toISOString().split("T")[0]; setTrackedItems(prev => prev.map(x => x.id === it.id ? {...x, openDate: today, useByDate: useBy} : x)); } }} className="rounded-lg px-2 py-1 text-xs font-bold shadow-md" style={{flex:1,background: it.openDate ? "#6b7280" : "#f97316", color: it.openDate ? "rgba(255,255,255,0.6)" : "#fff", border:"none", textShadow:"0 1px 2px rgba(0,0,0,0.4)"}}>{it.openDate ? "Opened ✓" : "Opened"}</button>
                                  <button onClick={() => handleUseTodayItem(it.id)} className="rounded-lg bg-gradient-to-r from-green-600 to-emerald-800 px-2 py-1 text-xs font-bold text-white shadow-md" style={{flex:1,textShadow:"0 1px 2px rgba(0,0,0,0.4)"}}>{t("used")}</button>
                                  {it.category === "Meat" && it.location === "Fridge" && (() => { const fd = it.freezeBy ? daysUntil(it.freezeBy) : null; const ud = it.daysLeft; return (fd !== null && fd <= 2) || (ud !== null && ud <= 3); })() && (
                                    <button onClick={() => handleFreezeItem(it.id)} className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-800 px-2 py-1 text-xs font-bold text-white shadow-md animate-pulse" style={{flex:1,textShadow:"0 1px 2px rgba(0,0,0,0.4)"}}>❄️ Freeze!</button>
                                  )}
                                  <button onClick={() => handleEditItem(it.id)} className="rounded-lg bg-emerald-700 px-2 py-1 text-xs font-bold text-white btn-3d" style={{flex:1}}>{t("edit")}</button>
                                </div>
                                <div className="flex flex-wrap gap-1 mb-1">
                                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${LOCATION_COLORS[it.location ?? "Fridge"]}`}>{LOCATION_ICONS[it.location ?? "Fridge"]} {it.location ?? "Fridge"}</span>
                                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[it.category ?? "Other"]}`}>{it.category ?? "Other"}</span>
                                </div>
                                {(it.openDate || it.useByDate) && (
                                  <div className="text-xs mb-1">
                                    {it.openDate ? (
                                      <span style={{color:"#4ade80",fontWeight:700}}>
                                        📂 Opened {fmtDate(it.openDate)}
                                        {it.openUseBy && it.daysLeft !== null
                                          ? ` · Use within ${it.daysLeft} day${it.daysLeft === 1 ? "" : "s"}`
                                          : ""}
                                      </span>
                                    ) : it.useByDate ? (
                                      <span style={{color:"rgba(255,255,255,0.8)"}}>Use by {fmtDate(it.useByDate)}</span>
                                    ) : null}
                                  </div>
                                )}
                                <div className="flex flex-col gap-1 mt-1">
                                  <TipPill type="gray">💡 {it.storageTip || (it.location === "Freezer" ? "Keep frozen" : it.location === "Pantry" ? "Store in cool, dry place" : "Keep refrigerated at all times")}</TipPill>
                                  {(() => { const label = afterOpeningLabel(it) || (it.location === "Freezer" ? null : it.category === "Dairy" ? "Keep refrigerated, use within 7 days" : it.category === "Meat" ? "Cook or freeze within 2–3 days" : it.category === "Produce" ? "Use within 3–5 days" : it.category === "Beverages" ? "Refrigerate after opening" : it.category === "Bread" ? "Use within 5 days or freeze" : "Check package for timing after opening"); return label ? <TipPill type="blue">📂 After opening: {label}</TipPill> : null; })()}
                                  {it.freezeBy && it.location === "Fridge" && <TipPill type="cyan">🧊 Freeze by: {it.freezeBy}</TipPill>}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </Card>
                </div>
              </>
            )}
          </div>
        )}
        {activeTab === "recipes" && (
          <>
          <div className="mb-3">
            <span className="app-section-label"><AiBadge />-Powered</span>
            <h2 className="app-section-h2">🍳 {t("recipeSugg")}</h2>
          </div>
          <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
            <div className="mb-3 flex justify-end">
              <button onClick={() => setRecipeSubTab(recipeSubTab === "favorites" ? "ai" : "favorites")} className="rounded-xl py-2 px-3 text-sm font-bold border-2 transition-all" style={recipeSubTab === "favorites" ? {background:"rgba(255,102,0,0.3)",borderColor:"#ff6600",color:"#fff"} : {background:"rgba(255,255,255,0.07)",borderColor:"rgba(255,255,255,0.2)",color:"rgba(255,255,255,0.6)"}}>❤️ {lang === "es" ? "Favoritos" : "Favorites"}</button>
            </div>
            {recipeSubTab === "favorites" && (
              <div>
                {favoriteRecipes.length === 0 ? (
                  <p className="text-sm py-4 text-center" style={{color:"rgba(255,255,255,0.55)"}}>{lang === "es" ? "Sin favoritos aún — ¡genera recetas y guarda las que te gusten!" : "No favorites yet — generate recipes and save ones you love!"}</p>
                ) : (
                  <div className="space-y-3">
                    {favoriteRecipes.map((r, i) => (
                      <div key={i} className="rounded-2xl overflow-hidden" style={{background:"rgba(0,0,0,0.25)",border:"1px solid rgba(255,255,255,0.13)"}}>
                        <div className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-bold text-white">{r.name}</h3>
                              <p className="text-xs mt-0.5" style={{color:"rgba(134,239,172,0.7)"}}>{lang === "es" ? "Guardado en favoritos" : "Saved to favorites"}</p>
                            </div>
                            <div className="flex items-center gap-2 ml-2 shrink-0">
                              <span className="rounded px-2 py-0.5 text-xs font-semibold" style={{background:"rgba(249,115,22,0.25)",color:"#fed7aa"}}>⏱ {r.time}</span>
                              <button onClick={() => setFavoriteRecipes((prev) => prev.filter((_, fi) => fi !== i))} className="text-xs" style={{color:"rgba(255,100,100,0.7)"}}>✕</button>
                            </div>
                          </div>
                          <p className="mt-1 text-sm" style={{color:"rgba(255,255,255,0.72)"}}>{r.description}</p>
                          {r.ingredients && r.ingredients.length > 0 && (<><h4 className="mt-3 mb-1 text-sm font-bold text-white">{t("ingredientsWord")}</h4><ul className="mb-2 space-y-1">{r.ingredients.map((ing, j) => <li key={j} className="text-sm flex items-center gap-1" style={{color: ing.includes("(need)") ? "#F97316" : "rgba(255,255,255,0.8)"}}><span style={{color:"#4ade80"}}>•</span> {ing}</li>)}</ul></>)}
                          <h4 className="mb-1 text-sm font-bold text-white">{t("instructionsWord")}</h4>
                          <p className="whitespace-pre-line text-sm leading-relaxed" style={{color:"rgba(255,255,255,0.8)"}}>{r.instructions}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {recipeSubTab === "ai" && <>
            <p className="mb-4 text-sm" style={{color:"rgba(255,255,255,0.8)",lineHeight:1.55}}>
              {lang === "es" ? "Combinado con lo que tienes en tu refrigerador, despensa y congelador. Prioriza lo que vence primero — puede sugerir 1-2 ingredientes extra para completar un platillo." : "Matched to what's in your fridge, pantry & freezer. Prioritizes what expires soonest — may suggest 1-2 extra ingredients to complete a dish."}
            </p>
            <button onClick={handleSuggestRecipes} disabled={recipesLoading} className="glass-scan-btn inline-flex items-center gap-2 px-5 py-2.5 text-sm disabled:opacity-50">{recipesLoading ? <><span className="animate-spin">🤖</span> <AiBadge style={{fontSize:"1.5em"}} /> is cooking...</> : <><ChefHat className="h-4 w-4" /> {lang === "es" ? "Ideas de Recetas" : "AI Recipe Ideas"} <AiBadge style={{fontSize:"1.5em"}} /></>}</button>
            {recipesGenerated && recipeSuggestions.length === 0 && <p className="mt-4 text-sm" style={{color:"rgba(255,255,255,0.6)"}}>{t("noMatches")}</p>}
            {recipeSuggestions.length > 0 && (
              <div className="mt-4 space-y-3">
                {recipeSuggestions.map((r, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden" style={{background:"rgba(0,0,0,0.25)",border:"1px solid rgba(255,255,255,0.13)"}}>
                    <button onClick={() => setExpandedRecipe(expandedRecipe === i ? null : i)} className="w-full p-4 text-left" style={{borderRadius:"inherit",transition:"background 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.06)"} onMouseLeave={e=>e.currentTarget.style.background=""}>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-white">{r.name}</h3>
                          <p className="text-xs mt-0.5" style={{color:"rgba(134,239,172,0.7)"}}>{lang === "es" ? "Incluye ingredientes y pasos" : "Includes ingredients & steps"}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-2 shrink-0">
                          <span className="rounded px-2 py-0.5 text-xs font-semibold" style={{background:"rgba(249,115,22,0.25)",color:"#fed7aa"}}>⏱ {r.time}</span>
                          {expandedRecipe !== i && <span style={{color:"rgba(255,255,255,0.45)",fontWeight:700,fontSize:"1rem"}}>→</span>}
                          <span className={expandedRecipe === i ? "arrow-up" : "arrow-down"}>{expandedRecipe === i ? "▲" : "▼"}</span>
                        </div>
                      </div>
                      <p className="mt-1 text-sm" style={{color:"rgba(255,255,255,0.72)"}}>{r.description}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {r.difficulty && <span className="rounded-full px-2 py-0.5 text-xs font-bold" style={{background:"rgba(168,85,247,0.25)",color:"#d8b4fe"}}>{r.difficulty}</span>}
                        {(r.usesExpiring || []).map((name, j) => (
                          <span key={j} className="text-xs font-medium text-white">⚡ {name}</span>
                        ))}
                      </div>
                    </button>
                    {expandedRecipe === i && (
                      <div className="px-4 py-3" style={{background:"rgba(0,0,0,0.3)",borderTop:"1px solid rgba(255,255,255,0.1)"}}>
                        {r.ingredients && r.ingredients.length > 0 && (<><h4 className="mb-2 text-sm font-bold text-white">{t("ingredientsWord")}</h4><ul className="mb-3 space-y-1">{r.ingredients.map((ing, j) => {
                              const isNeed = ing.includes("(need)");
                              const ingKey = `${i}-${j}`;
                              const wasAdded = addedIngredients[ingKey];
                              return (
                                <li key={j} className="text-sm flex items-center gap-1" style={{color: isNeed ? "#F97316" : "rgba(255,255,255,0.8)"}}>
                                  <span style={{color:"#4ade80"}}>•</span>
                                  {ing}
                                  {isNeed && (
                                    <button
                                      onClick={() => {
                                        const name = ing.replace(" (need)", "").trim();
                                        setShoppingItems((prev) => {
                                          const exists = prev.some((s) => s.name.toLowerCase() === name.toLowerCase());
                                          if (exists) return prev;
                                          return [...prev, { id: crypto.randomUUID(), name, checked: false }];
                                        });
                                        setAddedIngredients((prev) => ({ ...prev, [ingKey]: true }));
                                        setTimeout(() => setAddedIngredients((prev) => { const next = { ...prev }; delete next[ingKey]; return next; }), 2000);
                                      }}
                                      style={{marginLeft:"4px",width:"18px",height:"18px",borderRadius:"50%",background:"#F97316",color:"#fff",border:"none",cursor:"pointer",fontSize:"13px",fontWeight:"bold",lineHeight:"18px",textAlign:"center",flexShrink:0,padding:0}}
                                    >
                                      {wasAdded ? <span style={{fontSize:"10px"}}>✓</span> : "+"}
                                    </button>
                                  )}
                                </li>
                              );
                            })}</ul></>)}
                        <h4 className="mb-2 text-sm font-bold text-white">{t("instructionsWord")}</h4>
                        <p className="whitespace-pre-line text-sm leading-relaxed" style={{color:"rgba(255,255,255,0.8)"}}>{r.instructions}</p>
                        <div className="mt-3 flex justify-end">
                          <button onClick={() => {
                            const alreadySaved = favoriteRecipes.some((f) => f.name === r.name);
                            if (alreadySaved) {
                              setFavoriteSavedMsg((prev) => ({ ...prev, [i]: "already" }));
                              setTimeout(() => setFavoriteSavedMsg((prev) => { const n = {...prev}; delete n[i]; return n; }), 2000);
                            } else {
                              setFavoriteRecipes((prev) => [...prev, r]);
                              setFavoriteSavedMsg((prev) => ({ ...prev, [i]: "saved" }));
                              setTimeout(() => setFavoriteSavedMsg((prev) => { const n = {...prev}; delete n[i]; return n; }), 2000);
                            }
                          }} className="glass-scan-btn px-2 py-0.5 text-xs">
                            {favoriteSavedMsg[i] === "saved" ? "❤️ Saved to Favorites!" : favoriteSavedMsg[i] === "already" ? "Already in Favorites!" : (lang === "es" ? "Guardar en Favoritos" : "Save to Favorites")}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {!recipesGenerated && <div className="mt-4 rounded-xl p-4 text-sm" style={{background:"rgba(255,255,255,0.07)",color:"rgba(255,255,255,0.6)"}}>You have {trackedItems.length} tracked item{trackedItems.length === 1 ? "" : "s"}. Click the button to see recipe matches.{trackedItems.length === 0 && " Add items in the Tracker tab first."}</div>}
            </>}
          </Card>
          </>
        )}

        {activeTab === "shopping" && (
          <>
            <div className="mb-3">
              <span className="app-section-label">Grocery</span>
              <h2 className="app-section-h2"><span className="cart-icon">🛒</span> {t("shoppingList")}</h2>
            </div>
            <Card style={{background:"linear-gradient(160deg,#053d2e 0%,#064e3b 50%,#065f46 100%)",border:"2px solid rgba(183,214,58,0.75)"}}>
              <div className="mb-3 flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" style={{color:"#B7D63A"}} />
                <h2 className="text-lg font-bold text-white">{t("shoppingList")}</h2>
                {shoppingItems.some((it) => it.checked) && (
                  <button onClick={handleClearChecked} className="ml-auto rounded px-3 py-1 text-xs font-semibold text-red-200" style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,100,100,0.5)"}}>{t("clearChecked")}</button>
                )}
              </div>
              <p className="text-xs mb-3 -mt-1" style={{color:"rgba(134,239,172,0.75)"}}>{lang === "es" ? "Marca los artículos que hayas comprado." : "Check off items as you purchase them."}</p>
              <div className="flex flex-col gap-2 mb-4 w-full">
                <ShoppingAutocomplete
                  value={newShoppingItem}
                  onChange={setNewShoppingItem}
                  onSelect={(f) => {
                    const name = (lang === "es" && FOOD_ES[f.name]) ? FOOD_ES[f.name] : f.name;
                    setShoppingItems(prev => [...prev, { id: crypto.randomUUID(), name, qty: `${newShoppingQtyNum} ${newShoppingQty}`, checked: false }]);
                    setNewShoppingItem(""); setNewShoppingQtyNum("1"); setNewShoppingQty("count");
                  }}
                  onAddItem={handleAddShoppingItem}
                  lang={lang}
                />
                <div className="flex gap-2">
                  <select value={newShoppingQtyNum} onChange={(e) => setNewShoppingQtyNum(e.target.value)} className="rounded-xl px-2 py-2 text-sm font-semibold" style={{background:"rgba(4,47,38,0.9)",border:"1px solid rgba(255,255,255,0.25)",color:"#fff",flex:"0 0 auto",width:"60px"}}>
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={String(n)}>{n}</option>)}
                  </select>
                  <select value={newShoppingQty} onChange={(e) => setNewShoppingQty(e.target.value)} className="rounded-xl px-2 py-2 text-sm font-semibold" style={{background:"rgba(4,47,38,0.9)",border:"1px solid rgba(255,255,255,0.25)",color:"#fff",flex:"1"}}>
                    {["lbs","oz","kg","g","count","pack","bag","box","bottle","can","dozen"].map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                  <button onClick={handleAddShoppingItem} className="glass-scan-btn py-2 text-sm" style={{background:"rgba(255,102,0,0.22)",boxShadow:"0 2px 10px rgba(255,102,0,0.3)",flex:"1"}}>{t("addBtn")}</button>
                </div>
              </div>
              {(() => {
                const expiringEntries = expiringSoon
                  .filter(it => !shoppingItems.some(s => s.name.toLowerCase() === it.name.toLowerCase()))
                  .map(it => ({ _type: "expiring", id: "exp_" + it.id, name: it.name, qty: "", checked: false, daysLeft: it.daysLeft, store: it.store || null, forMeal: null }));
                const allEntries = [
                  ...shoppingItems.map(it => ({ ...it, _type: "shopping", daysLeft: null })),
                  ...expiringEntries,
                ];
                const unchecked = allEntries.filter(it => !it.checked).sort((a, b) => a.name.localeCompare(b.name));
                const checked = allEntries.filter(it => it.checked).sort((a, b) => a.name.localeCompare(b.name));
                const handleToggle = (it) => {
                  if (it._type === "expiring") {
                    setShoppingItems(prev => [...prev, { id: crypto.randomUUID(), name: it.name, qty: "", checked: true }]);
                  } else {
                    handleToggleShoppingItem(it.id);
                  }
                };
                const handleDelete = (it) => {
                  if (it._type === "expiring") {
                    setShoppingItems(prev => [...prev, { id: crypto.randomUUID(), name: it.name, qty: "", checked: true }]);
                  } else {
                    handleRemoveShoppingItem(it.id);
                  }
                };
                const renderItem = (it) => {
                  const nameLower = it.name.toLowerCase();
                  const flaggedAllergens = activeDietaryProfile.combinedTags.filter(tag => (ALLERGEN_KEYWORDS[tag] || []).some(kw => nameLower.includes(kw)));
                  const daysColor = it.daysLeft !== null ? (it.daysLeft <= 2 ? "#ef4444" : it.daysLeft <= 4 ? "#f97316" : "#eab308") : null;
                  const displayName = it.store ? `${it.name} — ${it.store}` : it.name;
                  return (
                    <div key={it.id} className="flex items-center gap-2 rounded-lg px-3 py-2" style={{transition:"all 0.3s ease", background: it.checked ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.22)", border: it.checked ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(255,255,255,0.35)", opacity: it.checked ? 0.5 : 1}}>
                      <input type="checkbox" checked={it.checked} onChange={() => handleToggle(it)} className="h-4 w-4 rounded accent-white flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm" style={{textDecoration: it.checked ? "line-through" : "none", color: it.checked ? "rgba(255,255,255,0.6)" : "#fff", fontWeight: it.checked ? 400 : 600}}>{displayName}{it.qty ? " — " + it.qty : ""}</span>
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {it.forMeal && <span className="rounded-full px-2 py-0.5 text-xs font-medium text-orange-200" style={{background:"rgba(183,214,58,0.3)"}}>📅 {it.forMeal}</span>}
                        </div>
                      </div>
                      {daysColor && (
                        <span style={{fontSize:"0.7rem",fontWeight:800,color:daysColor,border:`1px solid ${daysColor}`,borderRadius:"999px",padding:"0.1rem 0.4rem",whiteSpace:"nowrap",flexShrink:0}}>{it.daysLeft}d</span>
                      )}
                      <button onClick={() => handleDelete(it)} style={{fontSize:"1.1rem",color:"rgba(255,255,255,0.7)",background:"none",border:"none",cursor:"pointer",lineHeight:1,padding:"0 2px",flexShrink:0}}>🗑️</button>
                    </div>
                  );
                };
                const isEmpty = unchecked.length === 0 && checked.length === 0;
                return (
                  <div>
                    {isEmpty ? (
                      <p className="text-sm text-green-100">{t("emptyList")}</p>
                    ) : (
                      <div className="space-y-2">
                        {unchecked.map(renderItem)}
                        {checked.length > 0 && (
                          <div className="mt-3">
                            <p className="text-xs font-bold mb-2" style={{color:"rgba(255,255,255,0.45)"}}>{lang === "es" ? "✓ Recogido" : "✓ Picked Up"}</p>
                            <div className="space-y-2">{checked.map(renderItem)}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })()}
            </Card>
          </>
        )}
        {showMealPicker && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-1 text-lg font-bold">{t("pickAMeal")}</h2>
              <p className="mb-3 text-xs text-gray-500">{mealPickerDay} — {mealPickerSlot}</p>
              <div className="flex gap-2 mb-3">
                <MealSearchInput value={mealPickerSearch} onChange={(e) => setMealPickerSearch(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && mealPickerSearch.trim()) handleSetMeal(mealPickerDay, mealPickerSlot, mealPickerSearch.trim()); }} />
                {mealPickerSearch.trim() && <button onClick={() => handleSetMeal(mealPickerDay, mealPickerSlot, mealPickerSearch.trim())} className="glass-scan-btn px-3 py-2 text-sm">Add</button>}
              </div>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {mealPickerSearch && !RECIPE_DB.find((r) => r.name.toLowerCase() === mealPickerSearch.toLowerCase()) && (
                  <button onClick={() => handleSetMeal(mealPickerDay, mealPickerSlot, mealPickerSearch)} className="glass-scan-btn w-full py-2 text-sm">{lang === "es" ? `+ Agregar "${mealPickerSearch}" como comida` : `+ Add "${mealPickerSearch}" as custom meal`}</button>
                )}
                {RECIPE_DB.filter((r) => r.name.toLowerCase().includes(mealPickerSearch.toLowerCase())).map((r) => {
                  const usesExpiring = r.ingredients.some((ing) => itemsWithCountdown.some((it) => it.daysLeft !== null && it.daysLeft <= 7 && (it.name.toLowerCase().includes(ing) || ing.includes(it.name.toLowerCase()))));
                  return (
                    <button key={r.name} onClick={() => handleSetMeal(mealPickerDay, mealPickerSlot, r.name)} className="w-full rounded-lg border px-3 py-2 text-left text-sm hover:bg-orange-50">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{r.name}</span>
                        <div className="flex items-center gap-1">
                          {usesExpiring && <span className="text-xs text-orange-500">⚡ {t("usesExpiring")}</span>}
                          <span className="text-xs text-gray-400">⏱ {r.time}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <button onClick={() => { setShowMealPicker(false); setMealPickerSearch(""); }} className="mt-3 w-full rounded-xl border bg-gradient-to-b from-white to-gray-50 py-2 text-sm font-bold text-gray-600 pill-3d">{t("cancel")}</button>
            </div>
          </div>
        )}

        {activeTab === "meals" && (
          <>
            <div className="mb-3">
              <span className="app-section-label">Weekly</span>
              <h2 className="app-section-h2">📅 {t("mealPlanner")}</h2>
            </div>
            <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📅</span>
                  <h2 className="text-lg font-bold text-white">{t("mealPlanner")}</h2>
                </div>
                <button onClick={handleAiPlanWeek} disabled={aiPlanLoading} className="glass-scan-btn px-4 py-2 text-xs disabled:opacity-50">
                  {aiPlanLoading ? <><span className="animate-spin inline-block">🤖</span> <AiBadge /> {lang === "es" ? "planificando..." : "is planning..."}</> : <span>✨ <AiBadge /> {lang === "es" ? "Planificar Mi Semana" : "Plan My Week"}</span>}
                </button>
              </div>
              <p className="text-xs text-green-200 mb-4">{t("mealDesc")}</p>
              <div className="space-y-4">
                {DAYS.map((day) => (
                  <div key={day} className="rounded-lg overflow-hidden" style={{border:"1px solid rgba(255,255,255,0.15)"}}>
                    {(() => { const DAYS_ES = {Monday:"Lunes",Tuesday:"Martes",Wednesday:"Miércoles",Thursday:"Jueves",Friday:"Viernes",Saturday:"Sábado",Sunday:"Domingo"}; return (
                    <div className="px-3 py-2 font-bold text-sm text-white" style={{background:"rgba(255,255,255,0.12)"}}>{lang === "es" ? DAYS_ES[day] : day}</div>
                    ); })()}
                    <div className="divide-y divide-white/10">
                      {MEAL_SLOTS.map((slot) => {
                        const SLOTS_ES = {Breakfast:"Desayuno",Lunch:"Almuerzo",Dinner:"Cena"};
                        const meal = meals[`${day}-${slot}`];
                        const usesExpiring = meal && itemsWithCountdown.some((it) => it.daysLeft !== null && it.daysLeft <= 7 && meal.toLowerCase().includes(it.name.toLowerCase().split(" ")[0]));
                        return (
                          <div key={slot} className="flex items-center gap-2 px-3 py-2">
                            <span className="w-16 text-xs font-medium text-green-300">{lang === "es" ? SLOTS_ES[slot] : slot}</span>
                            {meal ? (
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1">
                                    {usesExpiring && <span className="text-orange-400">⚡</span>}
                                    <span className="text-sm font-medium text-white">{meal}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <button onClick={() => handleAddMealIngredientsToShopping(meal)} className="rounded-lg px-2 py-1 text-xs font-bold text-green-300" style={{background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)"}}>{lang === "es" ? "+ Lista" : "+ List"}</button>
                                    <button onClick={() => { setMealPickerDay(day); setMealPickerSlot(slot); setShowMealPicker(true); }} className="rounded-lg px-2 py-1 text-xs font-semibold text-white/60" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)"}}>{t("changeWord")}</button>
                                    <button onClick={() => handleClearMeal(day, slot)} className="text-xs text-gray-400 hover:text-red-500">✕</button>
                                  </div>
                                </div>

                              </div>
                            ) : (
                              <button onClick={() => { setMealPickerDay(day); setMealPickerSlot(slot); setShowMealPicker(true); }} className="glass-scan-btn flex-1 py-2 text-xs">{t("addMeal")}</button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {activeTab === "community" && (
          <>
            <button onClick={() => setActiveTab("more")} className="flex items-center gap-1 text-sm font-semibold mb-3 app-header-btn" style={{borderRadius:"999px",paddingLeft:"0.75rem",display:"inline-flex",alignItems:"center",gap:"4px"}}> Back</button>
            
            <div className="stew-scene mb-4" style={{position: "relative", height: "220px", width: "100%", overflow: "hidden"}}>
              <div style={{position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 160, height: 90, background: "linear-gradient(to bottom, #6b7280, #4b5563)", borderRadius: "0 0 40% 40%", borderTop: "8px solid #374151", zIndex: 10}}></div>
              <div style={{position: "absolute", bottom: 82, left: "50%", transform: "translateX(-50%)", width: 180, height: 16, background: "linear-gradient(to bottom, #9ca3af, #6b7280)", borderRadius: 8, zIndex: 11}}></div>
              <div style={{position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 148, height: 50, background: "linear-gradient(to bottom, #ea580c, #c2410c)", borderRadius: "0 0 38% 38%", zIndex: 11}}></div>
              <div style={{position: "absolute", bottom: 55, left: "calc(50% - 95px)", width: 20, height: 30, border: "4px solid #374151", borderRight: "none", borderRadius: "10px 0 0 10px", zIndex: 9}}></div>
              <div style={{position: "absolute", bottom: 55, left: "calc(50% + 75px)", width: 20, height: 30, border: "4px solid #374151", borderLeft: "none", borderRadius: "0 10px 10px 0", zIndex: 9}}></div>
              <div className="steam" style={{left: "calc(50% - 20px)", bottom: 100, animationDelay: "0s"}}>☁️</div>
              <div className="steam" style={{left: "calc(50% + 10px)", bottom: 105, animationDelay: "0.5s"}}>☁️</div>
              <div className="steam" style={{left: "calc(50% - 5px)", bottom: 95, animationDelay: "1s"}}>☁️</div>
              <div className="bubble-pot" style={{left: "calc(50% - 15px)", bottom: 30, animationDelay: "0s"}}></div>
              <div className="bubble-pot" style={{left: "calc(50% + 10px)", bottom: 25, animationDelay: "0.3s"}}></div>
              <div className="bubble-pot" style={{left: "calc(50% - 5px)", bottom: 35, animationDelay: "0.7s"}}></div>
              <CommunityStewAnim />
            </div>
            {!username ? (
              <Card>
                <div className="mb-2 flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" /><h2 className="text-lg font-bold">{t("joinComm")}</h2></div>
                <p className="mb-1 text-sm text-gray-500 italic">No getting fresh here — it's all about the freshness of food.</p>
                <p className="mb-3 text-sm text-gray-600">{t("chooseName")}</p>
                <div className="flex gap-2">
                  <input value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSetUsername()} placeholder={t("displayNamePlaceholder")} className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                  <button onClick={handleSetUsername} className="glass-scan-btn px-4 py-2 text-sm">{t("joinWord")}</button>
                </div>
              </Card>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">{t("signedInAs")} <span className="font-semibold text-green-700">{username}</span></p>
                  <button onClick={() => { setUsername(""); try { localStorage.removeItem(USERNAME_KEY); } catch(e) {} }} className="text-xs text-gray-400 underline">{t("changeName")}</button>
                </div>
                <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
                  {[["chat",t("chatTabLabel")],["recipes",t("recipesTabLabel")],["tips",t("tipsTabLabel")]].map(([id, label]) => (
                    <button key={id} onClick={() => setCommunityTab(id)} className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${communityTab === id ? "bg-white shadow text-green-700" : "text-gray-500"}`}>{label}</button>
                  ))}
                </div>
                {communityTab === "chat" && (
                  <Card>
                    <h3 className="mb-3 font-bold">{t("commChat")}</h3>
                    <div className="mb-3 max-h-64 space-y-2 overflow-y-auto">
                      {community.chat.length === 0 ? <p className="text-sm text-gray-500">{t("noMsg")}</p> : community.chat.map((msg) => (
                        <div key={msg.id} className="rounded-lg bg-gray-50 px-3 py-2">
                          <div className="flex items-center justify-between"><span className="text-xs font-semibold text-green-700">{msg.author}</span><span className="text-xs text-gray-400">{msg.time}</span></div>
                          <p className="text-sm text-gray-800">{msg.text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input value={newChat} onChange={(e) => setNewChat(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handlePostChat()} placeholder={t("typeMessage")} className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                      <button onClick={handlePostChat} className="glass-scan-btn px-4 py-2 text-sm">{t("sendWord")}</button>
                    </div>
                  </Card>
                )}
                {communityTab === "recipes" && (
                  <Card>
                    <h3 className="mb-3 font-bold">{t("recipeExch")}</h3>
                    <div className="mb-4 space-y-2">
                      <input value={newRecipeTitle} onChange={(e) => setNewRecipeTitle(e.target.value)} placeholder={t("recipeTitlePlaceholder")} className="w-full rounded border px-3 py-2 text-sm text-gray-900" />
                      <textarea value={newRecipeBody} onChange={(e) => setNewRecipeBody(e.target.value)} placeholder={t("ingredientsPlaceholder")} rows={3} className="w-full rounded border px-3 py-2 text-sm text-gray-900" />
                      <button onClick={handlePostRecipe} className="glass-scan-btn px-4 py-2 text-sm">{t("shareRecipe")}</button>
                    </div>
                    <div className="space-y-3">
                      {community.recipes.length === 0 ? <p className="text-sm text-gray-500">{t("noRecipes")}</p> : community.recipes.map((r) => (
                        <div key={r.id} className="rounded-lg border p-3">
                          <div className="flex items-center justify-between"><span className="font-semibold">{r.title}</span><span className="text-xs text-gray-400">{r.date}</span></div>
                          <p className="mt-1 text-xs text-green-700">{r.author}</p>
                          <p className="mt-1 whitespace-pre-wrap text-sm text-gray-700">{r.body}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
                {communityTab === "tips" && (
                  <Card>
                    <h3 className="mb-3 font-bold">{t("tipsIdeas")}</h3>
                    <div className="mb-4 flex gap-2">
                      <input value={newTip} onChange={(e) => setNewTip(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handlePostTip()} placeholder={t("tipSharePlaceholder")} className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                      <button onClick={handlePostTip} className="glass-scan-btn px-4 py-2 text-sm">{t("postWord")}</button>
                    </div>
                    <div className="space-y-2">
                      {community.tips.length === 0 ? <p className="text-sm text-gray-500">{t("noTips")}</p> : community.tips.map((tip) => (
                        <div key={tip.id} className="rounded-lg bg-yellow-50 border border-yellow-200 px-3 py-2">
                          <div className="flex items-center justify-between"><span className="text-xs font-semibold text-green-700">{tip.author}</span><span className="text-xs text-gray-400">{tip.date}</span></div>
                          <p className="text-sm text-gray-800">{tip.text}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </>
            )}
          </>
        )}

        {activeTab === "dietary" && (
          <div className="space-y-4">
            <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
              <div className="flex items-center gap-2 mb-3">
                <span style={{fontSize:"1.4rem"}}>🏠</span>
                <h2 className="text-base font-bold text-white">Household Restrictions</h2>
              </div>
              <p className="text-xs text-green-200 mb-3">Tap to toggle any restriction that applies to your whole household.</p>
              <div className="flex flex-wrap gap-2">
                {DIETARY_TAGS.map(([key, icon, labelEn, labelEs]) => (
                  <button key={key} onClick={() => toggleDietary(key)} style={{background: dietaryRestrictions[key] ? "rgba(255,102,0,0.25)" : "rgba(255,255,255,0.08)", border: dietaryRestrictions[key] ? "2px solid #ff6600" : "1px solid rgba(255,255,255,0.2)", borderRadius:"999px", padding:"0.3rem 0.75rem", color: dietaryRestrictions[key] ? "#fff" : "rgba(255,255,255,0.7)", fontSize:"0.75rem", fontWeight: dietaryRestrictions[key] ? 700 : 400, cursor:"pointer", transition:"all 0.15s", display:"flex", alignItems:"center", gap:"0.3rem"}}>
                    <span>{icon}</span>{lang === "es" ? labelEs : labelEn}{dietaryRestrictions[key] && <span style={{color:"#ff6600"}}>✓</span>}
                  </button>
                ))}
              </div>
            </Card>

            {/* Family members */}
            <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
              <div className="flex items-center gap-2 mb-3">
                <span style={{fontSize:"1.4rem"}}>👨‍👩‍👧‍👦</span>
                <h2 className="text-base font-bold text-white">Family Members</h2>
              </div>
              <p className="text-xs text-green-200 mb-3">Add each person and set their individual dietary tags.</p>

              {/* Add member input */}
              <div className="flex gap-2 mb-4">
                <input
                  value={familyInput}
                  onChange={(e) => setFamilyInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addFamilyMember()}
                  placeholder="Name (e.g. Emma, Dad)"
                  className="flex-1 rounded-xl px-3 py-2 text-sm text-gray-900"
                  style={{background:"rgba(255,255,255,0.92)"}}
                />
                <button onClick={addFamilyMember} className="glass-scan-btn px-4 py-2 text-sm" style={{flexDirection:"row",gap:"0.3rem",whiteSpace:"nowrap"}}>+ Add</button>
              </div>

              {familyMembers.length === 0 ? (
                <p className="text-xs text-green-300 opacity-60 text-center py-3">No family members added yet. Add one above.</p>
              ) : (
                <div className="space-y-3">
                  {familyMembers.map((member, i) => {
                    const isExpanded = expandedMember === i;
                    const isEditing = editingMember === i;
                    const activeTags = DIETARY_TAGS.filter(([key]) => (member.restrictions||{})[key]);
                    return (
                      <div key={i} className="rounded-xl overflow-hidden" style={{border:"1px solid rgba(255,255,255,0.18)"}}>
                        {/* Member row */}
                        <div className="flex items-center justify-between px-3 py-2" style={{background:"rgba(255,255,255,0.1)"}}>
                          <div className="flex items-center gap-2 flex-1">
                            <span style={{fontSize:"1.1rem"}}>👤</span>
                            {isEditing ? (
                              <div className="flex gap-2 flex-1">
                                <input
                                  value={editMemberName}
                                  onChange={(e) => setEditMemberName(e.target.value)}
                                  onKeyDown={(e) => e.key === "Enter" && saveMemberName(i)}
                                  autoFocus
                                  className="flex-1 rounded px-2 py-1 text-sm text-gray-900"
                                  style={{background:"rgba(255,255,255,0.92)",minWidth:0}}
                                />
                                <button onClick={() => saveMemberName(i)} className="text-xs font-bold text-green-300" style={{background:"none",border:"none",cursor:"pointer"}}>Save</button>
                                <button onClick={() => setEditingMember(null)} className="text-xs text-gray-400" style={{background:"none",border:"none",cursor:"pointer"}}>Cancel</button>
                              </div>
                            ) : (
                              <span className="text-sm font-semibold text-white">{member.name}</span>
                            )}
                          </div>
                          {!isEditing && (
                            <div className="flex items-center gap-3">
                              <button onClick={() => { setEditingMember(i); setEditMemberName(member.name); }} className="text-xs text-green-300" style={{background:"none",border:"none",cursor:"pointer"}}>✏️ Edit</button>
                              <button onClick={() => setExpandedMember(isExpanded ? null : i)} className="text-xs text-white font-bold" style={{background:"none",border:"none",cursor:"pointer"}}>{isExpanded ? "▲" : "▼"}</button>
                              <button onClick={() => removeFamilyMember(i)} className="text-xs text-red-400" style={{background:"none",border:"none",cursor:"pointer"}}>✕</button>
                            </div>
                          )}
                        </div>

                        {/* Active tag summary (collapsed) */}
                        {!isExpanded && activeTags.length > 0 && (
                          <div className="flex flex-wrap gap-1 px-3 py-2">
                            {activeTags.map(([,icon,labelEn,labelEs]) => (
                              <span key={labelEn} className="text-xs rounded-full px-2 py-0.5" style={{background:"rgba(255,102,0,0.2)",border:"1px solid rgba(255,102,0,0.4)",color:"#fed7aa"}}>{icon} {lang === "es" ? labelEs : labelEn}</span>
                            ))}
                          </div>
                        )}

                        {/* Expanded tag editor */}
                        {isExpanded && (
                          <div className="px-3 py-3" style={{background:"rgba(0,0,0,0.15)"}}>
                            <p className="text-xs text-green-300 mb-2 font-semibold">Tap to assign tags for {member.name}:</p>
                            <div className="flex flex-wrap gap-2">
                              {DIETARY_TAGS.map(([key, icon, labelEn, labelEs]) => {
                                const on = (member.restrictions||{})[key];
                                return (
                                  <button key={key} onClick={() => toggleMemberTag(i, key)} style={{background: on ? "rgba(255,102,0,0.25)" : "rgba(255,255,255,0.07)", border: on ? "2px solid #ff6600" : "1px solid rgba(255,255,255,0.2)", borderRadius:"999px", padding:"0.25rem 0.65rem", color: on ? "#fff" : "rgba(255,255,255,0.7)", fontSize:"0.72rem", fontWeight: on ? 700 : 400, cursor:"pointer", transition:"all 0.15s", display:"flex", alignItems:"center", gap:"0.25rem"}}>
                                    {icon} {lang === "es" ? labelEs : labelEn}{on && <span style={{color:"#ff6600"}}>✓</span>}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>

            {/* Coming soon */}
            <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
              <div className="flex items-center gap-2 mb-2">
                <span style={{fontSize:"1.4rem"}}>💡</span>
                <h2 className="text-base font-bold text-white">Coming Soon</h2>
              </div>
              <div className="space-y-2">
                {["Recipe suggestions filtered by household restrictions","Shopping list items flagged for allergens","Meal planner that respects every family member's needs"].map((item) => (
                  <div key={item} className="flex gap-2 items-start">
                    <span className="text-orange-400 font-bold text-xs mt-0.5">→</span>
                    <p className="text-xs text-green-100">{item}</p>
                  </div>
                ))}
              </div>
            </Card>

          </div>
        )}

        {activeTab === "partners" && (
          <div className="space-y-4">

            {/* Header */}
            <div className="flex items-center gap-3 mb-1">
              <button onClick={() => setActiveTab("more")} className="app-header-btn" style={{display:"inline-flex",alignItems:"center",gap:"4px"}}> Back</button>
              <div>
                <span className="app-section-label">Business</span>
                <h2 className="app-section-h2" style={{marginBottom:0}}>🤝 Partners</h2>
              </div>
            </div>

            {/* Hero tagline */}
            <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)",textAlign:"center",padding:"1.75rem 1.25rem"}}>
              <div style={{fontSize:"2.5rem",marginBottom:"0.5rem"}}>🌍</div>
              <h2 className="text-xl font-extrabold text-white mb-2">The TrackFresh.AI Ecosystem</h2>
              <p className="text-sm text-green-200 leading-relaxed">TrackFresh connects home cooks, grocery retailers, food brands, and sustainability partners — building a smarter, less wasteful food system together.</p>
              <p className="text-sm text-white font-semibold mt-3">One platform. One goal: waste less, eat better.</p>
              <div className="grid grid-cols-4 gap-2 mt-4">
                {[["🛒","Shoppers"],["🏪","Supermarkets"],["🏭","Brands"],["🌱","Composting"]].map(([icon, label]) => (
                  <div key={label} className="rounded-xl py-2 px-1 text-center" style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)"}}>
                    <div style={{fontSize:"1.4rem"}}>{icon}</div>
                    <div style={{fontSize:"0.6rem",fontWeight:700,color:"#86efac",marginTop:"0.2rem"}}>{label}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Supermarkets */}
            <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
              <div className="flex items-center gap-2 mb-2">
                <span style={{fontSize:"1.75rem"}}>🏪</span>
                <h2 className="text-lg font-bold text-white">Supermarkets</h2>
              </div>
              <p className="text-xs text-green-200 mb-3">Build lasting loyalty by meeting your customers where they already manage their food.</p>
              <div className="space-y-2 mb-4">
                {[
                  ["📍","Be listed in the TrackFresh store directory — drive traffic directly to your store"],
                  ["🔁","Loyalty program integration — deliver promotions through your existing loyalty infrastructure"],
                  ["📊","Access aggregate food waste trends from your region — no personal data shared"],
                  ["🎯","Reach eco-conscious shoppers who are actively reducing waste and buying fresh"],
                ].map(([icon, text]) => (
                  <div key={text} className="flex gap-2 items-start rounded-xl px-3 py-2" style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)"}}>
                    <span style={{fontSize:"1rem",flexShrink:0}}>{icon}</span>
                    <p className="text-xs text-green-100 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
              <a href="#" className="glass-scan-btn text-sm py-3" style={{textDecoration:"none",display:"flex",justifyContent:"center"}}>🤝 Partner with us →</a>
            </Card>

            {/* Food Manufacturers */}
            <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
              <div className="flex items-center gap-2 mb-2">
                <span style={{fontSize:"1.75rem"}}>🏭</span>
                <h2 className="text-lg font-bold text-white">Food Manufacturers</h2>
              </div>
              <p className="text-xs text-green-200 mb-3">Put your brand in front of millions of meal planners — without ever touching their personal data.</p>
              <div className="space-y-2 mb-3">
                {[
                  ["🍽️","Sponsored brand placements in the TrackFresh Meal Planner — your products appear naturally in weekly recipe suggestions"],
                  ["🔒","Privacy-first: promotions are delivered through supermarket loyalty systems — you never receive customer data"],
                  ["✅","Customers opt in to brand promotions through their supermarket loyalty account"],
                  ["📈","Measure impact through coupon redemptions and loyalty program data — tracked back to TrackFresh placements"],
                ].map(([icon, text]) => (
                  <div key={text} className="flex gap-2 items-start rounded-xl px-3 py-2" style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)"}}>
                    <span style={{fontSize:"1rem",flexShrink:0}}>{icon}</span>
                    <p className="text-xs text-green-100 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl px-3 py-2 mb-4" style={{background:"rgba(255,102,0,0.12)",border:"1px solid rgba(255,102,0,0.35)"}}>
                <p className="text-xs text-orange-200 font-semibold">Example: Kraft sponsors a "Mac & Cheese Night" meal slot. The suggestion appears in the user's weekly plan. A coupon is delivered through their supermarket loyalty app. Kraft sees redemptions — not names.</p>
              </div>
              <a href="#" className="glass-scan-btn text-sm py-3" style={{textDecoration:"none",display:"flex",justifyContent:"center"}}>📩 Learn about placements →</a>
            </Card>

            {/* Composting Partners */}
            <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
              <div className="flex items-center gap-2 mb-2">
                <span style={{fontSize:"1.75rem"}}>🌱</span>
                <h2 className="text-lg font-bold text-white">Composting Partners</h2>
              </div>
              <p className="text-xs text-green-200 mb-3">Reach the most motivated composting audience on the internet — people already reducing food waste.</p>
              <div className="space-y-2 mb-3">
                {[
                  ["🏷️","Offer a TrackFresh-exclusive coupon code — e.g. 10% off your product — trackable back to our platform"],
                  ["📖","Get featured in the TrackFresh Composting guide alongside educational content"],
                  ["📊","Every coupon redemption is tracked back to TrackFresh — you know exactly what drives your sales"],
                  ["🌿","Align your brand with a sustainability platform trusted by eco-conscious households"],
                ].map(([icon, text]) => (
                  <div key={text} className="flex gap-2 items-start rounded-xl px-3 py-2" style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)"}}>
                    <span style={{fontSize:"1rem",flexShrink:0}}>{icon}</span>
                    <p className="text-xs text-green-100 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl px-3 py-2 mb-4" style={{background:"rgba(255,102,0,0.12)",border:"1px solid rgba(255,102,0,0.35)"}}>
                <p className="text-xs text-orange-200 font-semibold">Example: A bokashi vendor offers code TRACKFRESH10 for 10% off. It appears in our Composting guide. Every redemption is reported back — you see real ROI from TrackFresh.</p>
              </div>
              <a href="#" className="glass-scan-btn text-sm py-3" style={{textDecoration:"none",display:"flex",justifyContent:"center"}}>🌱 Offer a coupon →</a>
            </Card>

            {/* Privacy Principle */}
            <Card style={{background:"linear-gradient(160deg,#1a0a00 0%,#2d1200 100%)",border:"2px solid rgba(255,102,0,0.5)"}}>
              <div className="flex items-center gap-2 mb-2">
                <span style={{fontSize:"1.5rem"}}>🔒</span>
                <h2 className="text-base font-bold text-orange-300">Customer Data Stays Private. Always.</h2>
              </div>
              <p className="text-xs text-orange-100 leading-relaxed mb-3">TrackFresh never sells or shares individual customer data with brand partners or manufacturers. All promotions flow through supermarket loyalty systems or anonymized in-app placements.</p>
              <div className="space-y-2">
                {[
                  "Manufacturers see redemption counts — not customer names or contact details",
                  "Composting partners receive coupon usage stats — not who redeemed them",
                  "Supermarkets manage their own customer relationships — TrackFresh supports but does not own that data",
                ].map((point) => (
                  <div key={point} className="flex gap-2 items-start">
                    <span className="text-orange-400 font-bold text-xs mt-0.5">✓</span>
                    <p className="text-xs text-orange-100">{point}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Contact CTA */}
            <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)",textAlign:"center",padding:"1.75rem 1.25rem"}}>
              <div style={{fontSize:"2rem",marginBottom:"0.5rem"}}>📬</div>
              <h2 className="text-lg font-bold text-white mb-2">Interested in Partnering?</h2>
              <p className="text-sm text-green-200 mb-4">Whether you're a supermarket, food brand, or composting company — we'd love to hear from you.</p>
              <a href="mailto:hello@trackfresh.ai" className="glass-scan-btn text-sm py-3 mb-2" style={{textDecoration:"none",display:"flex",justifyContent:"center"}}>✉️ hello@trackfresh.ai</a>
              <a href="#" className="glass-scan-btn text-sm py-3" style={{textDecoration:"none",display:"flex",justifyContent:"center",opacity:0.75}}>📋 Download Partner Deck →</a>
            </Card>
          </div>
        )}
                    
        {activeTab === "stores-page" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-1">
              <button onClick={() => setActiveTab("more")} className="app-header-btn" style={{display:"inline-flex",alignItems:"center",gap:"4px"}}> Back</button>
              <div>
                <span className="app-section-label">Online</span>
                <h2 className="app-section-h2" style={{marginBottom:0}}>🏪 {t("shopOnline")}</h2>
              </div>
            </div>

            <div
              className="rounded-2xl p-5 card-3d"
              style={{
                background: "linear-gradient(160deg,#064e3b 0%,#065f46 55%,#047857 100%)",
                border: "1.5px solid rgba(183,214,58,0.3)"
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🏪</span>
                <h2 className="text-lg font-bold text-white">{t("shopOnline")}</h2>
              </div>
              <p className="text-sm text-green-100 mb-4">{t("shopOnlineDesc")}</p>

              <div className="grid grid-cols-2 gap-3">
                <a href="https://www.amazon.com/alm/storefront?almBrandId=QW1hem9uIEZyZXNo" target="_blank" rel="noopener noreferrer" className="btn-green-3d rounded-2xl px-3 py-4 flex flex-col items-center justify-center gap-2 text-center">
                  <img src="https://www.google.com/s2/favicons?domain=amazon.com&sz=128" alt="Amazon Fresh" className="h-8 w-8 rounded-md bg-white p-1" />
                  <span className="text-sm font-bold text-white">Amazon Fresh</span>
                  <span className="text-xs text-white font-semibold">{t("shopNow")}</span>
                </a>

                <a href="https://www.kroger.com" target="_blank" rel="noopener noreferrer" className="btn-green-3d rounded-2xl px-3 py-4 flex flex-col items-center justify-center gap-2 text-center">
                  <img src="https://www.google.com/s2/favicons?domain=kroger.com&sz=128" alt="Kroger" className="h-8 w-8 rounded-md bg-white p-1" />
                  <span className="text-sm font-bold text-white">Kroger</span>
                  <span className="text-xs text-white font-semibold">{t("shopNow")}</span>
                </a>

                <a href="https://www.walmart.com/cp/food/976759" target="_blank" rel="noopener noreferrer" className="btn-green-3d rounded-2xl px-3 py-4 flex flex-col items-center justify-center gap-2 text-center">
                  <img src="https://www.google.com/s2/favicons?domain=walmart.com&sz=128" alt="Walmart" className="h-8 w-8 rounded-md bg-white p-1" />
                  <span className="text-sm font-bold text-white">Walmart</span>
                  <span className="text-xs text-white font-semibold">{t("shopNow")}</span>
                </a>

                <a href="https://www.wholefoodsmarket.com" target="_blank" rel="noopener noreferrer" className="btn-green-3d rounded-2xl px-3 py-4 flex flex-col items-center justify-center gap-2 text-center">
                  <img src="https://www.google.com/s2/favicons?domain=wholefoodsmarket.com&sz=128" alt="Whole Foods" className="h-8 w-8 rounded-md bg-white p-1" />
                  <span className="text-sm font-bold text-white">Whole Foods</span>
                  <span className="text-xs text-white font-semibold">{t("shopNow")}</span>
                </a>

                <a href="https://www.target.com/c/grocery/-/N-5xt1a" target="_blank" rel="noopener noreferrer" className="btn-green-3d rounded-2xl px-3 py-4 flex flex-col items-center justify-center gap-2 text-center">
                  <img src="https://www.google.com/s2/favicons?domain=target.com&sz=128" alt="Target" className="h-8 w-8 rounded-md bg-white p-1" />
                  <span className="text-sm font-bold text-white">Target</span>
                  <span className="text-xs text-white font-semibold">{t("shopNow")}</span>
                </a>

                <a href="https://www.costco.com/grocery-household.html" target="_blank" rel="noopener noreferrer" className="btn-green-3d rounded-2xl px-3 py-4 flex flex-col items-center justify-center gap-2 text-center">
                  <img src="https://www.google.com/s2/favicons?domain=costco.com&sz=128" alt="Costco" className="h-8 w-8 rounded-md bg-white p-1" />
                  <span className="text-sm font-bold text-white">Costco</span>
                  <span className="text-xs text-white font-semibold">{t("shopNow")}</span>
                </a>

                <a href="https://www.wegmans.com/sales-flyer/" target="_blank" rel="noopener noreferrer" className="btn-green-3d rounded-2xl px-3 py-4 flex flex-col items-center justify-center gap-2 text-center">
                  <img src="https://www.google.com/s2/favicons?domain=wegmans.com&sz=128" alt="Wegmans" className="h-8 w-8 rounded-md bg-white p-1" />
                  <span className="text-sm font-bold text-white">Wegmans</span>
                  <span className="text-xs text-white font-semibold">{t("shopNow")}</span>
                </a>

                <a href="https://www.traderjoes.com" target="_blank" rel="noopener noreferrer" className="btn-green-3d rounded-2xl px-3 py-4 flex flex-col items-center justify-center gap-2 text-center">
                  <img src="https://www.google.com/s2/favicons?domain=traderjoes.com&sz=128" alt="Trader Joe's" className="h-8 w-8 rounded-md bg-white p-1" />
                  <span className="text-sm font-bold text-white">Trader Joe&apos;s</span>
                  <span className="text-xs text-white font-semibold">{t("shopNow")}</span>
                </a>
              </div>
            </div>
          </div>
        )}          

        {activeTab === "composting" && (
          <>
            <div className="mb-3">
              <span className="app-section-label">{lang === "es" ? "Sostenibilidad" : "Sustainability"}</span>
              <h2 className="app-section-h2">🌱 {lang === "es" ? "Compostaje" : "Composting"}</h2>
            </div>
            <p className="text-sm text-green-200 mb-4">{lang === "es" ? "Ya sea en interior o exterior, descompone y compostea los restos de comida fácilmente." : "Whether indoors or outdoors, quickly compost or break down leftover food."}</p>

            {/* Card 1: Indoor Composting */}
            <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)",marginBottom:"1rem"}}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🏠</span>
                <h2 className="text-lg font-bold text-white">{lang === "es" ? "Compostaje Interior" : "Indoor Composting"}</h2>
              </div>
              <p className="text-xs text-green-200 mb-4">{lang === "es" ? "Opciones compactas perfectas para apartamentos y espacios pequeños." : "Compact options perfect for apartments and small spaces."}</p>
              <div className="space-y-3">
                {/* Electric Indoor Food Recycler expandable */}
                <div>
                  <button onClick={() => toggleComp("electric-recycler")} className="glass-scan-btn w-full flex-row justify-between px-4 py-3 text-sm font-bold" style={{flexDirection:"row"}}>
                    <span>⚡ {lang === "es" ? "Reciclador Eléctrico" : "Electric Food Recycler"}</span>
                    <span>{compExpanded["electric-recycler"] ? "▲" : "▼"}</span>
                  </button>
                  {compExpanded["electric-recycler"] && (
                    <div className="mt-2 rounded-xl px-4 py-3 text-sm text-green-100" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)"}}>
                      <p className="mb-2 font-semibold text-white">{lang === "es" ? "¿Qué es?" : "What is it?"}</p>
                      <p className="text-xs leading-relaxed">{lang === "es" ? "Los recicladores eléctricos de alimentos deshidratan, trituran y reducen los restos de comida hasta un 90% de su volumen original. El resultado es un polvo seco que puedes añadir al jardín o al cubo de residuos sin malos olores. Sin lombrices, sin fermentación, sin espera." : "Electric food recyclers use heat and grinding to dehydrate and break down food scraps, reducing volume by up to 90%. The result is a dry, odour-free powder you can add to your garden or bin. No worms, no fermentation, no waiting."}</p>
                      <ul className="mt-2 space-y-1 text-xs opacity-80">
                        <li>✅ {lang === "es" ? "Listo en 4–8 horas" : "Done in 4–8 hours"}</li>
                        <li>✅ {lang === "es" ? "Acepta carne, lácteos y cocidos" : "Accepts meat, dairy & cooked food"}</li>
                        <li>✅ {lang === "es" ? "Sin olores, apto para apartamentos" : "Odour-free — perfect for apartments"}</li>
                        <li>✅ {lang === "es" ? "Reduce el volumen hasta un 90%" : "Reduces volume by up to 90%"}</li>
                        <li>⚠️ {lang === "es" ? "Consume electricidad" : "Uses electricity"}</li>
                        <li>⚠️ {lang === "es" ? "Mayor inversión inicial" : "Higher upfront investment"}</li>
                      </ul>
                      <p className="mt-3 text-xs font-semibold text-green-200">{lang === "es" ? "Marcas populares:" : "Popular brands:"} <span className="font-normal opacity-80">Lomi, Mill, Reencle, Vitamix FoodCycler</span></p>
                      <div className="mt-2 rounded-lg px-3 py-2 text-center" style={{background:"rgba(251,146,60,0.12)",border:"1px dashed rgba(251,146,60,0.4)"}}>
                        <span style={{fontSize:"0.65rem",fontWeight:800,letterSpacing:"0.06em",color:"#fb923c"}}>🛒 {lang === "es" ? "Tienda — Próximamente" : "Shop — Coming Soon"}</span>
                      </div>
                    </div>
                  )}
                </div>
                {/* Bokashi expandable */}
                <div>
                  <button onClick={() => toggleComp("indoor-bokashi")} className="glass-scan-btn w-full flex-row justify-between px-4 py-3 text-sm font-bold" style={{flexDirection:"row"}}>
                    <span>🫙 {lang === "es" ? "Sistema Bokashi" : "Bokashi System"}</span>
                    <span>{compExpanded["indoor-bokashi"] ? "▲" : "▼"}</span>
                  </button>
                  {compExpanded["indoor-bokashi"] && (
                    <div className="mt-2 rounded-xl px-4 py-3 text-sm text-green-100" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)"}}>
                      <p className="mb-2 font-semibold text-white">{lang === "es" ? "¿Qué es?" : "What is it?"}</p>
                      <p className="text-xs leading-relaxed">{lang === "es" ? "El sistema Bokashi fermenta los restos de comida usando microorganismos efectivos (EM). Funciona dentro de un cubo sellado, sin malos olores. Puede compostar carne, lácteos y sobras cocidas — cosas que los compostadores tradicionales no admiten." : "Bokashi ferments food scraps using effective microorganisms (EM). Works inside a sealed bucket with no bad smells. Can handle meat, dairy, and cooked leftovers — things traditional composters can't."}</p>
                      <ul className="mt-2 space-y-1 text-xs opacity-80">
                        <li>✅ {lang === "es" ? "Acepta todos los alimentos" : "Accepts all food types"}</li>
                        <li>✅ {lang === "es" ? "Listo en 2–4 semanas" : "Ready in 2–4 weeks"}</li>
                        <li>✅ {lang === "es" ? "Sin malos olores" : "No bad smells"}</li>
                        <li>✅ {lang === "es" ? "Cabe bajo el fregadero" : "Fits under the sink"}</li>
                      </ul>
                    </div>
                  )}
                </div>
                {/* Worm bin expandable */}
                <div>
                  <button onClick={() => toggleComp("indoor-worm")} className="glass-scan-btn w-full flex-row justify-between px-4 py-3 text-sm font-bold" style={{flexDirection:"row"}}>
                    <span>🪱 {lang === "es" ? "Vermicompostaje" : "Worm Bin (Vermicomposting)"}</span>
                    <span>{compExpanded["indoor-worm"] ? "▲" : "▼"}</span>
                  </button>
                  {compExpanded["indoor-worm"] && (
                    <div className="mt-2 rounded-xl px-4 py-3 text-sm text-green-100" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)"}}>
                      <p className="mb-2 font-semibold text-white">{lang === "es" ? "¿Qué es?" : "What is it?"}</p>
                      <p className="text-xs leading-relaxed">{lang === "es" ? "Las lombrices rojas descomponen los restos de comida en un humus rico para las plantas. Solo necesita vegetales, frutas y papel. Las lombrices trabajan silenciosamente y sin malos olores." : "Red wiggler worms break down food scraps into rich castings for plants. Just needs veggies, fruits, and paper. Worms work quietly with no odor when maintained properly."}</p>
                      <ul className="mt-2 space-y-1 text-xs opacity-80">
                        <li>✅ {lang === "es" ? "Produce humus excelente" : "Produces excellent castings"}</li>
                        <li>✅ {lang === "es" ? "Sin electricidad" : "No electricity needed"}</li>
                        <li>✅ {lang === "es" ? "Los niños lo adoran" : "Kids love it"}</li>
                        <li>⚠️ {lang === "es" ? "No acepta carne ni lácteos" : "Avoid meat and dairy"}</li>
                      </ul>
                    </div>
                  )}
                </div>
                <div className="flex justify-center mt-3">
                  <button onClick={() => setActiveTab("partners")} className="glass-scan-btn text-sm py-2 px-8 text-center">🛒 {lang === "es" ? "Tienda" : "Shop"}</button>
                </div>
              </div>
            </Card>

            {/* Card 2: Outdoor Composting */}
            <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)",marginBottom:"1rem"}}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🌿</span>
                <h2 className="text-lg font-bold text-white">{lang === "es" ? "Compostaje Exterior" : "Outdoor Composting"}</h2>
              </div>
              <p className="text-xs text-green-200 mb-4">{lang === "es" ? "Métodos para patios, jardines y espacios al aire libre." : "Methods for yards, gardens, and outdoor spaces."}</p>
              <div className="space-y-3">
                {/* Traditional bin expandable */}
                <div>
                  <button onClick={() => toggleComp("outdoor-bin")} className="glass-scan-btn w-full flex-row justify-between px-4 py-3 text-sm font-bold" style={{flexDirection:"row"}}>
                    <span>🗑️ {lang === "es" ? "Cubo de Compost Tradicional" : "Traditional Compost Bin"}</span>
                    <span>{compExpanded["outdoor-bin"] ? "▲" : "▼"}</span>
                  </button>
                  {compExpanded["outdoor-bin"] && (
                    <div className="mt-2 rounded-xl px-4 py-3 text-sm text-green-100" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)"}}>
                      <p className="mb-2 font-semibold text-white">{lang === "es" ? "¿Qué es?" : "What is it?"}</p>
                      <p className="text-xs leading-relaxed">{lang === "es" ? "Alterna capas de materiales verdes (restos de comida, hierba) y marrones (hojas, cartón). El compostaje tradicional es económico y produce un abono excelente en 2–6 meses." : "Alternate layers of green materials (food scraps, grass) and brown materials (leaves, cardboard). Traditional composting is inexpensive and produces excellent compost in 2–6 months."}</p>
                      <ul className="mt-2 space-y-1 text-xs opacity-80">
                        <li>✅ {lang === "es" ? "Muy económico" : "Very low cost"}</li>
                        <li>✅ {lang === "es" ? "Gran capacidad" : "High capacity"}</li>
                        <li>⚠️ {lang === "es" ? "Requiere voltear" : "Requires turning"}</li>
                        <li>⚠️ {lang === "es" ? "2–6 meses" : "2–6 months to finish"}</li>
                      </ul>
                    </div>
                  )}
                </div>
                {/* Tumbler expandable */}
                <div>
                  <button onClick={() => toggleComp("outdoor-tumbler")} className="glass-scan-btn w-full flex-row justify-between px-4 py-3 text-sm font-bold" style={{flexDirection:"row"}}>
                    <span>⚙️ {lang === "es" ? "Compostador Rotatorio" : "Tumbler Composter"}</span>
                    <span>{compExpanded["outdoor-tumbler"] ? "▲" : "▼"}</span>
                  </button>
                  {compExpanded["outdoor-tumbler"] && (
                    <div className="mt-2 rounded-xl px-4 py-3 text-sm text-green-100" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)"}}>
                      <p className="mb-2 font-semibold text-white">{lang === "es" ? "¿Qué es?" : "What is it?"}</p>
                      <p className="text-xs leading-relaxed">{lang === "es" ? "Un tambor cerrado que giras para mezclar el compost. La descomposición es mucho más rápida — a veces en 2–4 semanas — y está protegido de animales e insectos." : "A sealed drum you rotate to mix compost. Decomposition is much faster — sometimes 2–4 weeks — and it's protected from animals and pests."}</p>
                      <ul className="mt-2 space-y-1 text-xs opacity-80">
                        <li>✅ {lang === "es" ? "Listo en 2–4 semanas" : "Ready in 2–4 weeks"}</li>
                        <li>✅ {lang === "es" ? "Protegido de animales" : "Pest and animal resistant"}</li>
                        <li>✅ {lang === "es" ? "Sin voltear manualmente" : "Easy turning"}</li>
                        <li>⚠️ {lang === "es" ? "Mayor coste inicial" : "Higher upfront cost"}</li>
                      </ul>
                    </div>
                  )}
                </div>
                <div className="flex justify-center mt-3">
                  <button onClick={() => setActiveTab("partners")} className="glass-scan-btn text-sm py-2 px-8 text-center">🛒 {lang === "es" ? "Tienda" : "Shop"}</button>
                </div>
              </div>
            </Card>

            {/* Card 3: Which is right for you? */}
            <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">❓</span>
                <h2 className="text-lg font-bold text-white">{lang === "es" ? "¿Cuál es la mejor opción para ti?" : "Which option is right for you?"}</h2>
              </div>
              <div className="space-y-3">
                <div className="rounded-xl px-4 py-3" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)"}}>
                  <p className="text-xs font-bold text-orange-300 mb-1">📐 {lang === "es" ? "Espacio" : "Space"}</p>
                  <p className="text-xs text-green-100">{lang === "es" ? "¿Tienes patio o jardín? → Rotatorio o Tradicional. ¿Solo interior? → Bokashi o Lombrices." : "Have a yard or garden? → Tumbler or Traditional. Indoors only? → Bokashi or Worm Bin."}</p>
                </div>
                <div className="rounded-xl px-4 py-3" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)"}}>
                  <p className="text-xs font-bold text-orange-300 mb-1">⚡ {lang === "es" ? "Velocidad" : "Speed"}</p>
                  <p className="text-xs text-green-100">{lang === "es" ? "¿Quieres resultados rápidos? → Reciclador Eléctrico (4–8 h) o Bokashi (2–4 sem). ¿No tienes prisa? → Cubo Tradicional o Lombrices." : "Want fast results? → Electric Recycler (4–8 hrs) or Bokashi (2–4 wks). No rush? → Traditional Bin or Worm Bin."}</p>
                </div>
                <div className="rounded-xl px-4 py-3" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)"}}>
                  <p className="text-xs font-bold text-orange-300 mb-1">💰 {lang === "es" ? "Presupuesto" : "Budget"}</p>
                  <p className="text-xs text-green-100">{lang === "es" ? "Bajo coste: Cubo Tradicional o Lombrices. Inversión media: Bokashi. Mayor inversión: Rotatorio o Reciclador Eléctrico." : "Low cost: Traditional Bin or Worm Bin. Mid-range: Bokashi Kit. Higher investment: Tumbler or Electric Recycler."}</p>
                </div>
              </div>
            </Card>
          </>
        )}

        {activeTab === "suggestions" && (
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center px-2 pt-2">
              <div className="text-4xl mb-2">💬</div>
              <h2 className="text-2xl font-bold text-white">{lang === "es" ? "Tus Ideas Importan" : "Your Ideas Matter"}</h2>
              <p className="text-sm mt-2" style={{color:"rgba(255,255,255,0.7)"}}>{lang === "es" ? "Somos un pequeño equipo con una gran misión. Tu opinión construye lo que creamos." : "We're a small team with a big mission. Your feedback directly shapes what we build next."}</p>
            </div>

            {/* Suggestion Form */}
            <div className="rounded-2xl p-4 space-y-3" style={{background:"rgba(255,255,255,0.07)"}}>
              <h3 className="font-bold text-white text-lg">{lang === "es" ? "Deja una Sugerencia" : "Leave a Suggestion"}</h3>
              <select
                value={suggCategory}
                onChange={e => setSuggCategory(e.target.value)}
                className="w-full rounded-xl px-3 py-2 text-sm font-medium"
                style={{background:"rgba(255,255,255,0.12)",color:"white",border:"1px solid rgba(255,255,255,0.2)"}}
              >
                <option value="feature">{lang === "es" ? "Nueva Función" : "New Feature"}</option>
                <option value="improvement">{lang === "es" ? "Mejora" : "Improvement"}</option>
                <option value="bug">{lang === "es" ? "Reporte de Error" : "Bug Report"}</option>
                <option value="other">{lang === "es" ? "Otro" : "Other"}</option>
              </select>
              <textarea
                value={suggMessage}
                onChange={e => setSuggMessage(e.target.value)}
                placeholder={lang === "es" ? "Escribe tu sugerencia aquí..." : "Write your suggestion here..."}
                rows={4}
                className="w-full rounded-xl px-3 py-2 text-sm"
                style={{background:"rgba(255,255,255,0.12)",color:"white",border:"1px solid rgba(255,255,255,0.2)",resize:"none"}}
              />
              <input
                value={suggName}
                onChange={e => setSuggName(e.target.value)}
                placeholder={lang === "es" ? "Tu nombre (opcional)" : "Your name (optional)"}
                className="w-full rounded-xl px-3 py-2 text-sm"
                style={{background:"rgba(255,255,255,0.12)",color:"white",border:"1px solid rgba(255,255,255,0.2)"}}
              />
              <button
                onClick={async () => {
                  if (!suggMessage.trim()) return;
                  setSuggSubmitting(true);
                  try {
                    await fetch("https://formspree.io/f/xbdpvpvn", {
                      method: "POST",
                      headers: {"Content-Type": "application/json"},
                      body: JSON.stringify({category: suggCategory, message: suggMessage, from_name: suggName || "Anonymous"})
                    });
                    setSuggSubmitted(true);
                    setSuggMessage("");
                    setSuggName("");
                  } catch(e) {}
                  setSuggSubmitting(false);
                }}
                disabled={suggSubmitting}
                className="w-full py-3 rounded-xl font-bold text-white"
                style={{background:"#B7D63A",color:"#1a3a2a"}}
              >
                {suggSubmitting ? "..." : suggSubmitted ? (lang === "es" ? "✅ ¡Enviado!" : "✅ Sent! Thank you!") : (lang === "es" ? "Enviar Sugerencia" : "Send Suggestion")}
              </button>
              {suggSubmitted && <p className="text-center text-sm" style={{color:"rgba(255,255,255,0.6)"}}>{lang === "es" ? "Leemos cada sugerencia. Las mejores ideas se construyen." : "We read every suggestion. Top ideas get built."}</p>}
            </div>

            {/* Community Votes */}
            <div className="rounded-2xl p-4 space-y-3" style={{background:"rgba(255,255,255,0.07)"}}>
              <h3 className="font-bold text-white text-lg">🗳️ {lang === "es" ? "Vota por lo Siguiente" : "Vote What We Build Next"}</h3>
              <p className="text-xs" style={{color:"rgba(255,255,255,0.5)"}}>{lang === "es" ? "Toca para votar por tu función favorita" : "Tap to vote for your favorite feature"}</p>
              {[
                {id:"family", en:"Family & Friends Mode — share your fridge, vote on dinner, send meal polls to the whole household", es:"Modo Familia y Amigos — comparte tu refrigerador, vota la cena, envía encuestas a toda la familia"},
                {id:"push", en:"Push notifications before items expire", es:"Notificaciones antes de que los alimentos venzan"},
                {id:"feedback", en:"In-app feedback on every section", es:"Comentarios dentro de cada sección"},
                {id:"household", en:"Shared household accounts", es:"Cuentas compartidas para el hogar"}
              ].map(item => {
                const voteKey = "sugg_vote_" + item.id;
                const count = parseInt(localStorage.getItem(voteKey) || "0");
                const voted = localStorage.getItem(voteKey + "_voted") === "1";
                return (
                  <div key={item.id} className="flex items-center justify-between rounded-xl px-3 py-3" style={{background:"rgba(255,255,255,0.06)"}}>
                    <span className="text-sm text-white flex-1 pr-3">{lang === "es" ? item.es : item.en}</span>
                    <button
                      onClick={() => {
                        if (voted) return;
                        localStorage.setItem(voteKey, String(count + 1));
                        localStorage.setItem(voteKey + "_voted", "1");
                        setVoteCounts(v => ({...v, [item.id]: count + 1}));
                      }}
                      className="flex items-center gap-1 rounded-full px-3 py-1 text-sm font-bold"
                      style={{background: voted ? "rgba(183,214,58,0.3)" : "rgba(183,214,58,0.15)", color:"#B7D63A", border:"1px solid rgba(183,214,58,0.4)"}}
                    >
                      👍 {voteCounts[item.id] ?? count}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Recently Added */}
            <div className="rounded-2xl p-4 space-y-3" style={{background:"rgba(255,255,255,0.07)"}}>
              <h3 className="font-bold text-white text-lg">✅ {lang === "es" ? "Agregado por Usuarios" : "Added From Your Feedback"}</h3>
              {[
                {en:"Receipt scanning — scan your grocery receipt to add items instantly", es:"Escaneo de recibos — agrega artículos escaneando tu ticket"},
                {en:"Bilingual support — full English & Spanish throughout the app", es:"Soporte bilingüe — inglés y español en toda la app"},
                {en:"FDA Recalls panel — real-time food safety alerts", es:"Panel de retiros FDA — alertas de seguridad alimentaria en tiempo real"}
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span className="text-sm" style={{color:"rgba(255,255,255,0.8)"}}>{lang === "es" ? item.es : item.en}</span>
                </div>
              ))}
            </div>

            {/* Data & Privacy */}
            <div className="rounded-2xl p-4 space-y-2" style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.12)"}}>
              <h3 className="font-bold text-white text-base">🔒 {lang === "es" ? "Datos y Privacidad" : "Data & Privacy"}</h3>
              <p className="text-sm leading-relaxed" style={{color:"rgba(255,255,255,0.72)"}}>
                {lang === "es"
                  ? "📱 Tus datos permanecen en tu dispositivo. TrackFresh almacena todos tus artículos, listas de compras, planes de comidas y preferencias localmente en este dispositivo. Borrar el historial de Safari eliminará tus datos. No se requiere cuenta y nada se envía a servidores externos excepto al usar funciones de IA. La Fase 2 introducirá respaldo en la nube opcional."
                  : "📱 Your Data stays on your device. TrackFresh stores all your food items, shopping lists, meal plans, and preferences locally on this device using browser storage. Clearing your Safari history or cache will erase your data. No account is required and nothing is sent to external servers except when using AI features (scanning, recipes, meal planning). Phase 2 will introduce optional cloud backup so your data follows you across devices."}
              </p>
            </div>

            <button onClick={() => setActiveTab("home")} className="flex items-center gap-1 text-sm font-semibold app-header-btn" style={{borderRadius:"999px",paddingLeft:"0.75rem"}}><span style={{color:"#fff",fontSize:"1.1rem",fontWeight:"bold"}}>←</span> {lang === "es" ? "Inicio" : "Home"}</button>
          </div>
        )}

      </div>
    </div>

        {showExpiryVoice && (
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:10500,display:"flex",alignItems:"flex-end",justifyContent:"center",padding:"1rem"}}>
            <div style={{background:"white",borderRadius:"20px 20px 16px 16px",width:"100%",maxWidth:"440px",boxShadow:"0 -4px 32px rgba(0,0,0,0.25)",display:"flex",flexDirection:"column",maxHeight:"62vh",overflow:"hidden"}}>
              {/* Sticky header */}
              <div style={{flexShrink:0,padding:"1rem 1.25rem 0.75rem",borderBottom:"1px solid #f3f4f6"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                    <span style={{fontSize:"1.4rem"}}>{expiryVoiceStatus === "listening" ? "🔴" : expiryVoiceStatus === "done" ? "✅" : "🎙️"}</span>
                    <div>
                      <p style={{fontWeight:900,fontSize:"0.95rem",color:"#064e3b"}}>Expiry Date Assistant</p>
                      <p style={{fontSize:"0.72rem",color:"#6b7280",marginTop:"0.1rem"}}>
                        {expiryVoiceStatus === "speaking" && "Speaking…"}
                        {expiryVoiceStatus === "listening" && "🔴 Listening — say product name + date"}
                        {expiryVoiceStatus === "done" && "All done!"}
                      </p>
                    </div>
                  </div>
                  <button onClick={stopExpiryVoiceFlow} style={{background:"#f3f4f6",border:"none",borderRadius:"50%",width:"32px",height:"32px",fontSize:"1.1rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>&times;</button>
                </div>
              </div>

              {/* Scrollable middle — instructions + item list */}
              <div style={{flex:"1 1 auto",overflowY:"auto",padding:"0.75rem 1.25rem"}}>
                {expiryVoiceStatus === "listening" && (
                  <div style={{background:"#f5fad0",border:"2px solid #D4E87A",borderRadius:"12px",padding:"0.65rem",marginBottom:"0.6rem"}}>
                    <p style={{fontSize:"0.8rem",fontWeight:700,color:"#5a6e0a",marginBottom:"0.3rem",textAlign:"center"}}>
                      Say: <span style={{background:"#064e3b",color:"white",borderRadius:"6px",padding:"0.1rem 0.45rem",fontFamily:"monospace",fontSize:"0.78rem"}}>product name</span>
                      {" + "}
                      <span style={{background:"#B7D63A",color:"#000",borderRadius:"6px",padding:"0.1rem 0.45rem",fontFamily:"monospace",fontSize:"0.78rem"}}>month day year</span>
                    </p>
                    <p style={{fontSize:"0.72rem",color:"#5a6e0a",textAlign:"center",marginBottom:"0.3rem"}}>
                      e.g. <em>"Milk, <strong>March 20 2026</strong>"</em> &nbsp;·&nbsp; <em>"Chicken <strong>Apr 5</strong>"</em>
                    </p>
                    <p style={{fontSize:"0.65rem",color:"#6b7280",textAlign:"center"}}>Say <strong>"no"</strong>, <strong>"skip"</strong>, or <strong>"done"</strong> to exit</p>
                  </div>
                )}

                {(() => {
                  const loggedNames = new Set(expiryVoiceLog.map(e => e.name));
                  const remaining = expiryVoiceItems.filter(it => !loggedNames.has(it.name));
                  return (
                    <>
                      {expiryVoiceLog.length > 0 && (
                        <div style={{marginBottom:"0.5rem"}}>
                          {expiryVoiceLog.map((entry, i) => (
                            <div key={i} style={{display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.35rem 0.6rem",borderRadius:"8px",background:"#f0fdf4",border:"1px solid #86efac",marginBottom:"0.25rem"}}>
                              <span style={{color:"#16a34a",fontWeight:900,fontSize:"0.85rem"}}>✓</span>
                              <span style={{flex:1,fontSize:"0.8rem",fontWeight:600,color:"#064e3b"}}>{entry.name}</span>
                              <span style={{fontSize:"0.75rem",color:"#6b7280"}}>{entry.dateStr}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {remaining.length > 0 && expiryVoiceStatus !== "done" && (
                        <div>
                          <p style={{fontSize:"0.68rem",fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:"0.35rem"}}>Still needed ({remaining.length}):</p>
                          <div style={{display:"flex",flexWrap:"wrap",gap:"0.3rem"}}>
                            {remaining.map((it, i) => (
                              <span key={i} style={{background:"#f3f4f6",border:"1px solid #e5e7eb",borderRadius:"999px",padding:"0.2rem 0.6rem",fontSize:"0.72rem",fontWeight:600,color:"#374151"}}>{it.name}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>

              {/* Sticky footer — always visible */}
              <div style={{flexShrink:0,padding:"0.75rem 1.25rem 1rem",borderTop:"1px solid #f3f4f6"}}>
                <button onClick={stopExpiryVoiceFlow} style={{width:"100%",background:"linear-gradient(to bottom,#059669,#047857)",color:"white",border:"none",borderRadius:"12px",padding:"0.75rem",fontSize:"0.875rem",fontWeight:800,cursor:"pointer",boxShadow:"0 3px 0 #065f46"}}>
                  ✅ Done — Skip Remaining
                </button>
              </div>
            </div>
          </div>
        )}

        {showOpenedModal && (() => {
          const _td = new Date(); const today = `${_td.getFullYear()}-${String(_td.getMonth()+1).padStart(2,'0')}-${String(_td.getDate()).padStart(2,'0')}`;
          const allItems = itemsWithCountdown;
          const recentItems = [...allItems].slice(0, 5);
          const fridgeItems = allItems.filter(it => (it.location ?? "Fridge") === "Fridge");
          const freezerItems = allItems.filter(it => it.location === "Freezer");
          const pantryItems = allItems.filter(it => it.location === "Pantry");
          const searchResults = openedSearch.trim() ? fuzzyMatchItems(openedSearch, allItems) : [];

          const ItemRow = ({ item }) => (
            <button onClick={() => handleMarkOpened(item, today)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.18)",borderRadius:"10px",padding:"0.6rem 0.75rem",marginBottom:"0.35rem",cursor:"pointer",textAlign:"left"}}>
              <div>
                <div style={{fontWeight:700,color:"#fff",fontSize:"0.875rem"}}>{item.name}</div>
                <div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.75)",marginTop:"0.1rem"}}>{item.location ?? "Fridge"}{item.useByDate ? " · " + (lang==="es"?"Vence":"Exp") + " " + item.useByDate : ""}</div>
              </div>
              {item.openDate && <span style={{fontSize:"0.65rem",background:"rgba(183,214,58,0.25)",color:"#B7D63A",border:"1px solid rgba(183,214,58,0.4)",borderRadius:"999px",padding:"0.1rem 0.45rem",fontWeight:700,whiteSpace:"nowrap"}}>📂 {lang==="es"?"Abierto":"Opened"}</span>}
            </button>
          );

          const GroupSection = ({ label, items }) => items.length === 0 ? null : (
            <div style={{marginBottom:"0.875rem"}}>
              <p style={{fontSize:"0.63rem",fontWeight:700,color:"rgba(255,255,255,0.75)",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"0.4rem"}}>{label}</p>
              {items.map(it => <ItemRow key={it.id} item={it} />)}
            </div>
          );

          return (
            <div style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,0.65)",backdropFilter:"blur(4px)",display:"flex",flexDirection:"column",justifyContent:"flex-end",paddingBottom:openedModalOffset,transition:"padding-bottom 0.2s ease"}}>
              <div style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 60%,#047857 100%)",borderRadius:"20px 20px 0 0",padding:"1.25rem 1.25rem calc(env(safe-area-inset-bottom) + 0.75rem)",maxHeight:`calc(90vh - ${openedModalOffset}px)`,display:"flex",flexDirection:"column",boxShadow:"0 -8px 40px rgba(0,0,0,0.45)",transition:"max-height 0.2s ease"}}>

                {/* Header */}
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1rem",flexShrink:0}}>
                  <h3 style={{color:"#fff",fontWeight:800,fontSize:"1.1rem",margin:0}}>📂 {lang==="es"?"Marcar Lo Que Abrí":"Mark What You've Opened"}</h3>
                  <button onClick={() => { setShowOpenedModal(false); setOpenedConfirm(null); }} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"50%",width:32,height:32,color:"#fff",fontWeight:700,cursor:"pointer",fontSize:"1.1rem",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
                </div>

                {openedConfirm ? (
                  /* Confirmation screen */
                  <div style={{textAlign:"center",padding:"0.5rem 0",flex:1,display:"flex",flexDirection:"column",justifyContent:"center"}}>
                    <div style={{fontSize:"3rem",marginBottom:"0.75rem"}}>✅</div>
                    <h3 style={{color:"#fff",fontWeight:800,fontSize:"1.1rem",marginBottom:"0.35rem"}}>{openedConfirm.item.name}</h3>
                    <p style={{color:"rgba(255,255,255,0.92)",fontSize:"0.875rem",marginBottom:"0.25rem"}}>
                      {lang==="es"?"Marcado como abierto":"Marked as opened"} — {openedConfirm.openDate}
                    </p>
                    {openedConfirm.openUseBy && (
                      <p style={{color:"#86efac",fontWeight:700,fontSize:"0.875rem",marginBottom:"0.25rem"}}>
                        {lang==="es"?"Usar antes de":"Suggested use by"}: {openedConfirm.openUseBy}
                        {openedConfirm.shelfDays && <span style={{color:"rgba(255,255,255,0.75)",fontWeight:400}}> ({openedConfirm.shelfDays} {lang==="es"?"días tras abrir":"days after opening"})</span>}
                      </p>
                    )}
                    {!openedConfirm.openUseBy && (
                      <p style={{color:"rgba(255,255,255,0.75)",fontSize:"0.8rem",marginBottom:"0.25rem"}}>{lang==="es"?"Sin referencia de duración conocida. Puedes editar la fecha de uso.":"No shelf-life reference found — you can set a use-by date manually."}</p>
                    )}

                    {showOpenedDateEdit ? (
                      <div style={{marginTop:"0.75rem",display:"flex",gap:"0.5rem",alignItems:"center",justifyContent:"center",flexWrap:"wrap"}}>
                        <input type="date" value={openedEditDate} onChange={e => setOpenedEditDate(e.target.value)} style={{borderRadius:"8px",padding:"0.5rem",border:"1.5px solid rgba(255,255,255,0.3)",background:"rgba(255,255,255,0.12)",color:"#fff",fontSize:"0.875rem"}} />
                        <button onClick={() => { if (openedEditDate) handleMarkOpened(openedConfirm.item, openedEditDate); setShowOpenedDateEdit(false); }} className="glass-scan-btn" style={{padding:"0.4rem 1rem",fontSize:"0.8rem"}}>{lang==="es"?"Guardar":"Save"}</button>
                        <button onClick={() => setShowOpenedDateEdit(false)} style={{background:"transparent",border:"none",color:"rgba(255,255,255,0.75)",cursor:"pointer",fontSize:"0.8rem"}}>{lang==="es"?"Cancelar":"Cancel"}</button>
                      </div>
                    ) : (
                      <button onClick={() => { setOpenedEditDate(openedConfirm.openDate); setShowOpenedDateEdit(true); }} style={{background:"transparent",border:"1px solid rgba(255,255,255,0.3)",borderRadius:"999px",padding:"0.3rem 1rem",color:"rgba(255,255,255,0.75)",cursor:"pointer",fontSize:"0.8rem",marginTop:"0.75rem",display:"inline-block"}}>
                        ✏️ {lang==="es"?"Editar fecha":"Edit date"}
                      </button>
                    )}

                    <button onClick={() => { setShowOpenedModal(false); setOpenedConfirm(null); }} className="glass-scan-btn w-full" style={{marginTop:"1.25rem",fontWeight:800}}>
                      {lang==="es"?"Listo":"Done"}
                    </button>
                    <button onClick={() => setOpenedConfirm(null)} style={{background:"transparent",border:"none",color:"rgba(255,255,255,0.75)",cursor:"pointer",fontSize:"0.8rem",marginTop:"0.5rem"}}>
                      <span style={{color:"#fff",fontSize:"1.1rem",fontWeight:"bold"}}>←</span> {lang==="es"?"Marcar otro":"Mark another"}
                    </button>
                  </div>
                ) : (
                  /* Search + inventory list */
                  <>
                    {/* Search row */}
                    <div style={{position:"relative",marginBottom:"0.875rem",flexShrink:0}}>
                      <input
                        value={openedSearch}
                        onChange={e => setOpenedSearch(e.target.value)}
                        placeholder={lang==="es"?"Busca o escribe un producto…":"Search or say an item name…"}
                        autoFocus
                        style={{width:"100%",padding:"0.75rem 3rem 0.75rem 0.875rem",borderRadius:"12px",border:"1.5px solid rgba(255,255,255,0.25)",background:"rgba(255,255,255,0.12)",color:"#fff",fontSize:"0.9rem",outline:"none",boxSizing:"border-box"}}
                      />
                      <button
                        onClick={() => {
                          if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) { alert(lang==="es"?"Voz no disponible en este navegador.":"Voice input not available in this browser."); return; }
                          const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
                          const sr = new SR(); sr.lang = lang === "es" ? "es-US" : "en-US"; sr.interimResults = false; sr.maxAlternatives = 1;
                          sr.onresult = e => setOpenedSearch(e.results[0][0].transcript);
                          sr.start();
                        }}
                        title={lang==="es"?"Hablar":"Speak item name"}
                        style={{position:"absolute",right:"0.5rem",top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"50%",width:34,height:34,cursor:"pointer",fontSize:"1.1rem",display:"flex",alignItems:"center",justifyContent:"center"}}
                      >🎤</button>
                    </div>

                    {/* List */}
                    <div style={{overflowY:"auto",flex:1}}>
                      {openedSearch.trim() ? (
                        searchResults.length === 0
                          ? <p style={{color:"rgba(255,255,255,0.75)",fontSize:"0.85rem",textAlign:"center",paddingTop:"1rem"}}>{lang==="es"?"Sin resultados.":"No matching items found."}</p>
                          : <GroupSection label={lang==="es"?"Resultados":"Results"} items={searchResults} />
                      ) : allItems.length === 0 ? (
                        <p style={{color:"rgba(255,255,255,0.75)",fontSize:"0.85rem",textAlign:"center",paddingTop:"1rem"}}>{lang==="es"?"Sin artículos rastreados todavía.":"No tracked items yet. Add food in the Tracker tab first."}</p>
                      ) : (
                        <>
                          <GroupSection label={lang==="es"?"⏱ Recientes":"⏱ Recent Items"} items={recentItems} />
                          <GroupSection label={lang==="es"?"🧊 Refrigerador":"🧊 Fridge"} items={fridgeItems} />
                          <GroupSection label={lang==="es"?"❄️ Congelador":"❄️ Freezer"} items={freezerItems} />
                          <GroupSection label={lang==="es"?"🏺 Despensa":"🏺 Pantry"} items={pantryItems} />
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })()}

      {showTutorial && (() => {
        const tabKey = TUTORIALS[activeTab] ? activeTab : "home";
        const steps = TUTORIALS[tabKey];
        const step = steps[Math.min(tutorialStep, steps.length - 1)];
        const isLast = tutorialStep >= steps.length - 1;
        return (
          <div className="fixed inset-0 z-[100] flex items-end justify-center" style={{background:"rgba(0,0,0,0.65)",backdropFilter:"blur(4px)"}} onClick={() => setShowTutorial(false)}>
            <div className="tut-modal w-full max-w-lg rounded-t-3xl p-6" style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 60%,#047857 100%)",border:"2px solid rgba(183,214,58,0.55)",borderBottom:"none",boxShadow:"0 -8px 40px rgba(0,0,0,0.45)"}} onClick={e => e.stopPropagation()}>
              <div className="mx-auto mb-4 h-1 w-12 rounded-full" style={{background:"rgba(255,255,255,0.3)"}} />
              <div className="flex justify-center gap-2 mb-5">
                {steps.map((_, i) => (
                  <div key={i} onClick={() => setTutorialStep(i)} style={{width: i === tutorialStep ? "1.6rem" : "0.45rem", height:"0.45rem", borderRadius:"999px", background: i === tutorialStep ? "#B7D63A" : "rgba(255,255,255,0.3)", transition:"all 0.3s", cursor:"pointer"}} />
                ))}
              </div>
              <div key={tutorialStep} className="tut-step">
                <div className="text-center mb-3">
                  <span style={{fontSize:"4rem", display:"inline-block", animation:"tutEmojiPop 0.7s ease both"}}>{step.emoji}</span>
                </div>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-extrabold text-white mb-2" style={{textShadow:"0 2px 6px rgba(0,0,0,0.3)"}}>{step.title}</h2>
                  <p className="text-green-100 text-sm leading-relaxed">{step.body}</p>
                </div>
              </div>
              <div className="flex gap-3">
                {tutorialStep > 0 && (
                  <button onClick={() => setTutorialStep(s => s - 1)} className="back-btn" style={{border:"none"}}></button>
                )}
                {!isLast ? (
                  <button onClick={() => setTutorialStep(s => s + 1)} className="flex-1 rounded-2xl py-3 text-sm font-bold glass-scan-btn" style={{border:"2px solid #B7D63A"}}>{lang === "es" ? "Siguiente →" : "Next →"}</button>
                ) : (
                  <button onClick={() => setShowTutorial(false)} className="flex-1 rounded-2xl py-3 text-base font-extrabold" style={{background:"#E8A63C",border:"2px solid #F0C070",color:"#000"}}>🎉 {lang === "es" ? "¡Listo!" : "Got it!"}</button>
                )}
              </div>
              {!isLast && <button onClick={() => setShowTutorial(false)} className="mt-3 w-full text-center text-xs" style={{color:"rgba(255,255,255,0.35)",background:"none",border:"none",cursor:"pointer"}}>{lang === "es" ? "saltar tutorial" : "skip tutorial"}</button>}
            </div>
          </div>
        );
      })()}

      {tourMode && (
        <div style={{position:"fixed",inset:0,zIndex:60,background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)",display:"flex",flexDirection:"column",overflowY:"auto"}}>
          {/* Tour header */}
          <div style={{padding:"1rem 1rem 0.5rem",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,background:"rgba(6,78,59,0.97)",backdropFilter:"blur(8px)",zIndex:1,borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
            <span style={{color:"#fff",fontWeight:800,fontSize:"1rem"}}>✨ {lang === "es" ? "Recorrido" : "App Tour"}</span>
            <button onClick={() => setTourMode(false)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.55)",fontSize:"1.6rem",cursor:"pointer",lineHeight:1,padding:"0 0.25rem"}}>×</button>
          </div>
          {(() => {
            const slide = TOUR_SLIDES[tourSlide];
            const isLast = tourSlide === TOUR_SLIDES.length - 1;
            const title = lang === "es" ? slide.titleEs : slide.titleEn;
            const body = lang === "es" ? slide.bodyEs : slide.bodyEn;
            return (
              <div style={{flex:1,display:"flex",flexDirection:"column",padding:"1.25rem 1rem 2rem",maxWidth:"480px",margin:"0 auto",width:"100%"}}>
                {/* Progress dots */}
                <div style={{display:"flex",gap:"5px",justifyContent:"center",marginBottom:"1.25rem",flexWrap:"wrap"}}>
                  {TOUR_SLIDES.map((_,i) => (
                    <div key={i} style={{width:i===tourSlide?"22px":"8px",height:"8px",borderRadius:"4px",background:i<=tourSlide?"#4ade80":"rgba(255,255,255,0.2)",transition:"all 0.3s"}} />
                  ))}
                </div>
                {/* Slide card */}
                <div style={{background:"rgba(255,255,255,0.1)",borderRadius:"1.5rem",padding:"2.25rem 1.5rem",textAlign:"center",flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",border:"1.5px solid rgba(255,255,255,0.15)"}}>
                  {slide.visual.type === "emoji"
                    ? <div style={{fontSize:"6rem",lineHeight:1,marginBottom:"1.5rem"}}>{slide.visual.value}</div>
                    : <img src={slide.visual.src} alt="" style={{maxHeight:"240px",maxWidth:"100%",borderRadius:"12px",objectFit:"contain",marginBottom:"1.5rem"}} />
                  }
                  <div style={{color:"#E8A63C",fontWeight:800,fontSize:"1.3rem",marginBottom:"0.75rem",lineHeight:1.3}}>{title}</div>
                  <div style={{color:"rgba(255,255,255,0.85)",fontSize:"0.9rem",lineHeight:1.65}}>{body}</div>
                </div>
                {/* Amber action buttons — per slide */}
                {tourSlide === 0 && <button className="btn-amber-3d w-full" style={{marginTop:"1.25rem"}} onClick={() => { setTourMode(false); setTourSlide(0); }}>{lang === "es" ? "Empezar a Usar TrackFresh" : "Start Using TrackFresh"}</button>}
                {tourSlide === 2 && <button className="btn-amber-3d w-full" style={{marginTop:"1.25rem"}} onClick={() => { setTourMode(false); setTourSlide(0); }}>{lang === "es" ? "Probar Escaneo Inteligente" : "Try Smart Scanner"}</button>}
                {tourSlide === 5 && <button className="btn-amber-3d w-full" style={{marginTop:"1.25rem"}} onClick={() => { setTourMode(false); setTourSlide(0); setActiveTab("tracker"); }}>{lang === "es" ? "Ir al Rastreador" : "Go to Tracker"}</button>}
                {tourSlide === 7 && <button className="btn-amber-3d w-full" style={{marginTop:"1.25rem"}} onClick={() => { setTourMode(false); setTourSlide(0); setActiveTab("recipes"); }}>{lang === "es" ? "Explorar Recetas" : "Explore Recipes"}</button>}
                {tourSlide === 10 && <button className="btn-amber-3d w-full" style={{marginTop:"1.25rem"}} onClick={() => { setTourMode(false); setTourSlide(0); setActiveTab("stores-page"); }}>{lang === "es" ? "Conectar Tiendas" : "Connect Stores"}</button>}
                {tourSlide === 11 && <button className="btn-amber-3d w-full" style={{marginTop:"1.25rem"}} onClick={() => { setTourMode(false); setTourSlide(0); setActiveTab("meals"); }}>{lang === "es" ? "Planificar mi Semana" : "Plan Your Week"}</button>}
                {tourSlide === 12 && <button className="btn-amber-3d w-full" style={{marginTop:"1.25rem"}} onClick={() => { setTourMode(false); setTourSlide(0); setShowRecallsPanel(true); }}>{lang === "es" ? "Ver Alertas FDA" : "Check FDA Recalls"}</button>}
                {/* Nav buttons */}
                <div style={{display:"flex",gap:"0.75rem",marginTop:"1.25rem"}}>
                  {tourSlide > 0 && (
                    <button onClick={() => setTourSlide(s => s - 1)} style={{flex:1,borderRadius:"0.75rem",padding:"0.75rem",background:"rgba(255,255,255,0.1)",border:"1.5px solid rgba(255,255,255,0.2)",color:"#fff",fontWeight:700,fontSize:"0.9rem",cursor:"pointer"}}>← {lang === "es" ? "Atrás" : "Back"}</button>
                  )}
                  {!isLast ? (
                    <button onClick={() => setTourSlide(s => s + 1)} style={{flex:2,borderRadius:"0.75rem",padding:"0.75rem",background:"rgba(255,255,255,0.12)",border:"1.5px solid #4ade80",color:"#fff",fontWeight:700,fontSize:"0.9rem",cursor:"pointer"}}>{lang === "es" ? "Siguiente →" : "Next →"}</button>
                  ) : (
                    <button onClick={() => { setTourMode(false); setTourSlide(0); }} style={{flex:2,borderRadius:"0.75rem",padding:"0.75rem",background:"#4ade80",border:"none",color:"#064e3b",fontWeight:800,fontSize:"0.9rem",cursor:"pointer"}}>🎉 {lang === "es" ? "¡A comenzar!" : "Let's go!"}</button>
                  )}
                </div>
                {!isLast && (
                  <button onClick={() => { setTourMode(false); setTourSlide(0); }} style={{marginTop:"0.75rem",background:"none",border:"none",color:"rgba(255,255,255,0.35)",fontSize:"0.8rem",cursor:"pointer"}}>{lang === "es" ? "saltar recorrido" : "skip tour"}</button>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* FAB - Smart Scanner */}
      <button
        onClick={() => { setShowSmartScanner(true); setUniScanCount(0); setUniScanLastItem(""); setVoiceFlowStep(null); setScanMode("multi"); }}
        style={{position:"fixed",bottom:"2rem",left:"50%",transform:"translateX(-50%)",width:"65px",height:"65px",backgroundColor:"#f59e0b",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px rgba(0,0,0,0.4)",animation:"emberPulse 2s infinite",zIndex:100,border:"2px solid #fbbf24",cursor:"pointer",fontSize:"1.75rem"}}
        aria-label="Open Smart Scanner"
      >📷</button>

    </>
  );
}

