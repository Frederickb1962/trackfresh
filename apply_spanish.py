#!/usr/bin/env python3
"""
Applies Spanish language support to TrackFresh page.js
"""

import re

# Read the original file
import os
import sys
import shutil

# Determine the file path
file_path = None
# Try current directory first
if os.path.exists('app/page.js'):
    file_path = 'app/page.js'
# Try Mac path
elif os.path.exists(os.path.expanduser('~/Documents/Projects/trackfresh-v3/app/page.js')):
    file_path = os.path.expanduser('~/Documents/Projects/trackfresh-v3/app/page.js')
# Try command line argument
elif len(sys.argv) > 1 and os.path.exists(sys.argv[1]):
    file_path = sys.argv[1]

if not file_path:
    print("ERROR: Could not find page.js")
    print("Run this script from your trackfresh-v3 directory:")
    print("  cd ~/Documents/Projects/trackfresh-v3")
    print("  python3 apply_spanish.py")
    sys.exit(1)

# Create backup
backup_path = file_path + '.before-spanish'
shutil.copy2(file_path, backup_path)
print(f"✅ Backup created: {backup_path}")

with open(file_path, 'r') as f:
    content = f.read()
print(f"✅ Read {len(content)} characters from page.js")

# ============================================================
# 1. ADD TRANSLATIONS OBJECT + FOOD_NAMES_ES + LANG_KEY after GLOBAL_STYLES
# ============================================================

translations_block = '''
const LANG_KEY = "trackfresh.lang";

const T = {
  // APP HEADER
  appName: { en: "TrackFresh", es: "TrackFresh" },
  appTagline: { en: "\\u2728 Your AI-powered kitchen assistant", es: "\\u2728 Tu asistente de cocina con IA" },
  howToUse: { en: "How to use", es: "Cómo usar" },
  signOut: { en: "Sign Out", es: "Cerrar Sesión" },
  signOutConfirm: { en: "Sign out of TrackFresh?", es: "¿Cerrar sesión de TrackFresh?" },
  // PASSWORD
  betaTesting: { en: "Beta Testing", es: "Prueba Beta" },
  enterAccessCode: { en: "Enter your access code to continue", es: "Ingresa tu código de acceso" },
  accessCode: { en: "Access Code", es: "Código de Acceso" },
  enterBeta: { en: "Enter Beta", es: "Entrar a Beta" },
  invalidCode: { en: "Invalid code. Try again.", es: "Código inválido. Intenta de nuevo." },
  contactFreddie: { en: "Contact Freddie for access", es: "Contacta a Freddie para acceso" },
  // WELCOME
  welcomeTitle: { en: "Welcome to FreshTrack.ai!", es: "¡Bienvenido a FreshTrack.ai!" },
  welcomeDesc: { en: "The smart way to track your groceries, reduce food waste, and save money.", es: "La forma inteligente de rastrear tus alimentos, reducir el desperdicio y ahorrar dinero." },
  welcomeF1: { en: "AI-powered label & barcode scanning", es: "Escaneo de etiquetas y códigos de barras con IA" },
  welcomeF2: { en: "Smart AI expiry predictions & alerts", es: "Predicciones inteligentes de vencimiento con IA" },
  welcomeF3: { en: "Voice-powered hands-free entry", es: "Entrada manos libres por voz" },
  welcomeF4: { en: "AI-built smart shopping lists", es: "Listas de compras inteligentes con IA" },
  welcomeF5: { en: "AI freeze alerts save your food", es: "Alertas de congelación con IA salvan tu comida" },
  welcomeLocal: { en: "Your data is stored locally on your device. No account required.", es: "Tus datos se guardan en tu dispositivo. No necesitas cuenta." },
  getStarted: { en: "\\ud83d\\ude80 Get Started", es: "\\ud83d\\ude80 Comenzar" },
  chooseLang: { en: "Choose your language:", es: "Elige tu idioma:" },
  // HOME BUBBLES
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
  communityDesc: { en: "Connect & share with others", es: "Conéctate y comparte con otros" },
  // TRACKER MENU
  aiScanTitle: { en: "\\u2728 AI Food Scanner", es: "\\u2728 Escáner de Alimentos con IA" },
  aiScanDesc: { en: "Choose how AI should add your items", es: "Elige cómo la IA debe agregar tus productos" },
  receipt: { en: "Receipt", es: "Recibo" },
  receiptDesc: { en: "AI reads your receipt instantly", es: "La IA lee tu recibo al instante" },
  barcodeWord: { en: "Barcode", es: "Código" },
  barcodeDesc: { en: "AI identifies any product", es: "La IA identifica cualquier producto" },
  label: { en: "Label", es: "Etiqueta" },
  labelDesc: { en: "AI extracts label details", es: "La IA extrae detalles de la etiqueta" },
  quickAdd: { en: "Quick Add", es: "Agregar" },
  quickAddDesc: { en: "Quick add with AI autocomplete", es: "Agrega rápido con autocompletado IA" },
  myItems: { en: "My Items", es: "Mis Productos" },
  myItemsDesc: { en: "Your AI-monitored inventory", es: "Tu inventario monitoreado por IA" },
  back: { en: "Back", es: "Atrás" },
  home: { en: "Home", es: "Inicio" },
  // CATEGORIES
  Produce: { en: "Produce", es: "Frutas/Verduras" },
  Dairy: { en: "Dairy", es: "Lácteos" },
  Meat: { en: "Meat", es: "Carnes" },
  Pantry: { en: "Pantry", es: "Despensa" },
  Leftovers: { en: "Leftovers", es: "Sobras" },
  Other: { en: "Other", es: "Otro" },
  All: { en: "All", es: "Todo" },
  // LOCATIONS
  Fridge: { en: "Fridge", es: "Refrigerador" },
  Freezer: { en: "Freezer", es: "Congelador" },
  PantryLoc: { en: "Pantry", es: "Despensa" },
  Counter: { en: "Counter", es: "Mostrador" },
  // FORM
  itemWord: { en: "Item", es: "Producto" },
  quantity: { en: "Quantity", es: "Cantidad" },
  qtyPlaceholder: { en: "e.g. 2 lbs, 1 carton", es: "ej. 2 lbs, 1 cartón" },
  category: { en: "Category", es: "Categoría" },
  locationWord: { en: "Location", es: "Ubicación" },
  useByWord: { en: "Use By", es: "Consumir Antes De" },
  openedOpt: { en: "Opened (optional)", es: "Abierto (opcional)" },
  addWord: { en: "Add", es: "Agregar" },
  // TRACKED ITEMS
  trackedItemsTitle: { en: "Tracked Items", es: "Productos Rastreados" },
  clearAll: { en: "Clear All", es: "Borrar Todo" },
  clearAllConfirm: { en: "Clear all tracked items and start fresh?", es: "¿Borrar todos los productos y empezar de nuevo?" },
  noFilter: { en: "No items match this filter.", es: "Ningún producto coincide con este filtro." },
  days: { en: "days", es: "días" },
  used: { en: "Used", es: "Usado" },
  edit: { en: "Edit", es: "Editar" },
  remove: { en: "Remove", es: "Quitar" },
  freezeIt: { en: "\\u2744\\ufe0f Freeze!", es: "\\u2744\\ufe0f ¡Congelar!" },
  afterOpen: { en: "After opening: use within", es: "Después de abrir: usar en" },
  daysW: { en: "days", es: "días" },
  useByColon: { en: "Use by:", es: "Consumir antes de:" },
  openedColon: { en: "Opened:", es: "Abierto:" },
  // EDIT MODAL
  editItemTitle: { en: "\\u270f\\ufe0f Edit Item", es: "\\u270f\\ufe0f Editar Producto" },
  nameWord: { en: "Name", es: "Nombre" },
  useByDate: { en: "Use By Date", es: "Fecha de Vencimiento" },
  save: { en: "Save", es: "Guardar" },
  cancel: { en: "Cancel", es: "Cancelar" },
  // ALERTS
  expiringSoon: { en: "Expiring Soon!", es: "¡Vence Pronto!" },
  expired: { en: "EXPIRED", es: "VENCIDO" },
  dayLeft: { en: "day left", es: "día restante" },
  daysLeft: { en: "days left", es: "días restantes" },
  useItemsSoon: { en: "Use these items soon, freeze them, or check for recipes!", es: "¡Usa estos productos pronto, congélalos o busca recetas!" },
  gotIt: { en: "Got it", es: "Entendido" },
  findRecipes: { en: "Find Recipes", es: "Buscar Recetas" },
  pleaseEnterDate: { en: "Please enter a Use By date.", es: "Por favor ingresa una fecha de vencimiento." },
  // RECEIPT
  scanReceiptTitle: { en: "\\ud83d\\udcf7 Scan Receipt", es: "\\ud83d\\udcf7 Escanear Recibo" },
  scanReceiptDesc: { en: "Upload a receipt photo and our AI will instantly identify every food item, category, and shelf life.", es: "Sube una foto del recibo y nuestra IA identificará cada producto, categoría y vida útil al instante." },
  takePhoto: { en: "Take Photo", es: "Tomar Foto" },
  openCamera: { en: "Open camera", es: "Abrir cámara" },
  uploadPhoto: { en: "Upload Photo", es: "Subir Foto" },
  fromGallery: { en: "From gallery", es: "Desde galería" },
  readingReceipt: { en: "Claude is reading your receipt...", es: "Claude está leyendo tu recibo..." },
  foundWord: { en: "Found", es: "Se encontraron" },
  selectWhich: { en: "items \\u2014 select which to add:", es: "productos \\u2014 selecciona cuáles agregar:" },
  addItemsTracker: { en: "Items to Tracker", es: "Productos al Rastreador" },
  // BARCODE
  scanBarcodeTitle: { en: "\\ud83d\\udce6 Scan Barcode", es: "\\ud83d\\udce6 Escanear Código de Barras" },
  scanBarcodeDesc: { en: "Point your camera at the barcode on any food package.", es: "Apunta tu cámara al código de barras de cualquier paquete de alimentos." },
  pointAtBarcode: { en: "Point at barcode", es: "Apunta al código de barras" },
  lookingUp: { en: "Looking up product...", es: "Buscando producto..." },
  productFound: { en: "\\u2705 Product found!", es: "\\u2705 ¡Producto encontrado!" },
  whereStoring: { en: "Where are you storing this?", es: "¿Dónde vas a guardar esto?" },
  useFresh: { en: "Use fresh", es: "Usar fresco" },
  longTerm: { en: "Long term storage", es: "Almacenamiento a largo plazo" },
  freezeByDate: { en: "Freeze By Date", es: "Congelar Antes De" },
  addToTracker: { en: "Add to Tracker", es: "Agregar al Rastreador" },
  scanAnother: { en: "Scan Another", es: "Escanear Otro" },
  tryAgain: { en: "Try again", es: "Intentar de nuevo" },
  scanFailed: { en: "Scan failed. Please try again.", es: "Escaneo fallido. Intenta de nuevo." },
  cameraDenied: { en: "Camera access denied or not available. Please allow camera access.", es: "Acceso a cámara denegado. Por favor permite el acceso." },
  // LABEL
  scanLabelTitle: { en: "\\ud83c\\udff7\\ufe0f Scan Package Label", es: "\\ud83c\\udff7\\ufe0f Escanear Etiqueta" },
  scanLabelDesc: { en: "Take a photo of the package label and Claude will read the item name and date automatically.", es: "Toma una foto de la etiqueta y Claude leerá el nombre y la fecha automáticamente." },
  tapUpload: { en: "Tap to upload package photo", es: "Toca para subir foto del paquete" },
  jpgPng: { en: "JPG, PNG supported", es: "Se aceptan JPG, PNG" },
  readingLabel: { en: "Claude is reading the label...", es: "Claude está leyendo la etiqueta..." },
  noDateFound: { en: "\\ud83d\\udcc5 No expiration date visible. Flip package over and scan the other side!", es: "\\ud83d\\udcc5 No se ve fecha de vencimiento. ¡Voltea el paquete y escanea el otro lado!" },
  notFoundWord: { en: "Not found", es: "No encontrado" },
  // QUICK ADD
  quickAddTitle: { en: "\\u270f\\ufe0f Quick Add", es: "\\u270f\\ufe0f Agregar Rápido" },
  quickAddTitleDesc: { en: "Select a food from the list or type your own.", es: "Selecciona un alimento de la lista o escribe el tuyo." },
  foodItem: { en: "Food Item", es: "Alimento" },
  qtyPH: { en: "e.g. 2 lbs", es: "ej. 2 lbs" },
  sayDate: { en: "Say the date e.g. February 20 2026", es: "Di la fecha ej. 20 de febrero 2026" },
  sayQty: { en: "Say quantity e.g. two pounds", es: "Di la cantidad ej. dos libras" },
  listening: { en: "\\ud83c\\udfa4 Listening...", es: "\\ud83c\\udfa4 Escuchando..." },
  voiceNotSupp: { en: "Voice not supported on this browser. Please type the date.", es: "Voz no disponible en este navegador. Por favor escribe." },
  cantUnderstand: { en: "Could not understand date. Try saying: February 20 2026", es: "No se pudo entender. Intenta: 20 de febrero 2026" },
  cantHear: { en: "Could not hear you. Please try again.", es: "No te pude escuchar. Intenta de nuevo." },
  // RECIPES
  recipeSugg: { en: "Recipe Suggestions", es: "Sugerencias de Recetas" },
  recipeIntro: { en: "Recipes matched to your ingredients, prioritizing what expires soonest. Tap a recipe to see full instructions.", es: "Recetas que coinciden con tus ingredientes, priorizando lo que vence primero. Toca una receta para ver instrucciones." },
  getAIRecipes: { en: "Get AI Recipe Ideas", es: "Obtener Recetas con IA" },
  aiCooking: { en: "AI is cooking...", es: "La IA está cocinando..." },
  noMatches: { en: "No matches found. Try adding more items like eggs, carrots, or onions.", es: "Sin coincidencias. Agrega más productos como huevos, zanahorias o cebollas." },
  ingredientsWord: { en: "Ingredients", es: "Ingredientes" },
  instructionsWord: { en: "Instructions", es: "Instrucciones" },
  savedComm: { en: "Saved to Community", es: "Guardado en Comunidad" },
  saveComm: { en: "Save to Community", es: "Guardar en Comunidad" },
  addFoodFirst: { en: "Add some food items first!", es: "¡Agrega algunos alimentos primero!" },
  failedRecipes: { en: "Failed to get recipes. Try again.", es: "Error al obtener recetas. Intenta de nuevo." },
  trackedCount: { en: "tracked item", es: "producto rastreado" },
  clickForRecipes: { en: "Click the button to see recipe matches.", es: "Haz clic para ver recetas." },
  addInTracker: { en: " Add items in the Tracker tab first.", es: " Agrega productos en el Rastreador primero." },
  // SHOPPING
  shoppingList: { en: "Shopping List", es: "Lista de Compras" },
  clearChecked: { en: "Clear Checked", es: "Borrar Marcados" },
  addItemDots: { en: "Add item\\u2026", es: "Agregar producto\\u2026" },
  qtyWord: { en: "Qty", es: "Cant." },
  emptyList: { en: "Your shopping list is empty.", es: "Tu lista de compras está vacía." },
  expSoonAdd: { en: "\\ud83d\\udd14 Expiring Soon \\u2014 Add to List?", es: "\\ud83d\\udd14 Vence Pronto \\u2014 ¿Agregar a la Lista?" },
  expire7: { en: "These items expire within 7 days. Tap to add a replacement to your shopping list.", es: "Estos productos vencen en 7 días. Toca para agregar un reemplazo a tu lista." },
  addedWord: { en: "Added", es: "Agregado" },
  // MEALS
  mealPlanner: { en: "Meal Planner", es: "Planificador de Comidas" },
  aiPlanWeek: { en: "\\u2728 AI Plan My Week", es: "\\u2728 IA Planifica Mi Semana" },
  aiPlanning: { en: "AI is planning...", es: "La IA está planificando..." },
  mealDesc: { en: "Tap any slot to add a meal. \\u26a1 means it uses ingredients expiring soon.", es: "Toca cualquier espacio para agregar comida. \\u26a1 = usa ingredientes que vencen pronto." },
  addMeal: { en: "+ Add meal", es: "+ Agregar comida" },
  changeWord: { en: "Change", es: "Cambiar" },
  listPlus: { en: "+ List", es: "+ Lista" },
  pickMeal: { en: "Pick a Meal", es: "Elegir Comida" },
  searchRecipes: { en: "Search recipes or type your own...", es: "Busca recetas o escribe la tuya..." },
  customMeal: { en: "as custom meal", es: "como comida personalizada" },
  usesExp: { en: "uses expiring", es: "usa lo que vence" },
  Monday: { en: "Monday", es: "Lunes" },
  Tuesday: { en: "Tuesday", es: "Martes" },
  Wednesday: { en: "Wednesday", es: "Miércoles" },
  Thursday: { en: "Thursday", es: "Jueves" },
  Friday: { en: "Friday", es: "Viernes" },
  Saturday: { en: "Saturday", es: "Sábado" },
  Sunday: { en: "Sunday", es: "Domingo" },
  Breakfast: { en: "Breakfast", es: "Desayuno" },
  Lunch: { en: "Lunch", es: "Almuerzo" },
  Dinner: { en: "Dinner", es: "Cena" },
  // COMMUNITY
  joinComm: { en: "Join the Community", es: "Únete a la Comunidad" },
  chooseName: { en: "Choose a display name to get started.", es: "Elige un nombre para comenzar." },
  displayName: { en: "Your display name", es: "Tu nombre" },
  joinWord: { en: "Join", es: "Unirse" },
  signedAs: { en: "Signed in as", es: "Conectado como" },
  changeName: { en: "Change name", es: "Cambiar nombre" },
  chatTab: { en: "\\ud83d\\udcac Chat", es: "\\ud83d\\udcac Chat" },
  recipesTab: { en: "\\ud83d\\udcd6 Recipes", es: "\\ud83d\\udcd6 Recetas" },
  tipsTab: { en: "\\ud83d\\udca1 Tips", es: "\\ud83d\\udca1 Consejos" },
  commChat: { en: "Community Chat", es: "Chat de la Comunidad" },
  noMsg: { en: "No messages yet \\u2014 say hello!", es: "No hay mensajes \\u2014 ¡di hola!" },
  typeMsg: { en: "Type a message\\u2026", es: "Escribe un mensaje\\u2026" },
  sendWord: { en: "Send", es: "Enviar" },
  recipeExch: { en: "Recipe Exchange", es: "Intercambio de Recetas" },
  recipeTitlePH: { en: "Recipe title", es: "Título de la receta" },
  ingInst: { en: "Ingredients and instructions\\u2026", es: "Ingredientes e instrucciones\\u2026" },
  shareRecipe: { en: "Share Recipe", es: "Compartir Receta" },
  noRecipes: { en: "No recipes shared yet \\u2014 be the first!", es: "No hay recetas \\u2014 ¡sé el primero!" },
  tipsIdeas: { en: "Tips & Ideas", es: "Consejos e Ideas" },
  shareTip: { en: "Share a food storage tip\\u2026", es: "Comparte un consejo\\u2026" },
  postWord: { en: "Post", es: "Publicar" },
  noTips: { en: "No tips yet \\u2014 share one!", es: "No hay consejos \\u2014 ¡comparte uno!" },
  // STORES
  shopOnline: { en: "Shop Online", es: "Comprar en Línea" },
  shopOnlineDesc: { en: "Tap any store to shop for groceries online.", es: "Toca cualquier tienda para comprar alimentos en línea." },
  shopNow: { en: "Shop Now \\u2192", es: "Comprar Ahora \\u2192" },
  // HELP
  help1: { en: "Tracker: AI searches 100+ items. Category and location auto-fill intelligently.", es: "Rastreador: La IA busca más de 100 productos. Categoría y ubicación se llenan automáticamente." },
  help2: { en: "Filter by \\ud83e\\uddca Fridge, \\u2744\\ufe0f Freezer, or \\ud83d\\uddc4\\ufe0f Pantry to see items by location.", es: "Filtra por \\ud83e\\uddca Refrigerador, \\u2744\\ufe0f Congelador o \\ud83d\\uddc4\\ufe0f Despensa para ver por ubicación." },
  help3: { en: "Recipes: AI suggests recipes based on what's in your kitchen.", es: "Recetas: La IA sugiere recetas basadas en lo que hay en tu cocina." },
  help4: { en: "Shopping: Build your shopping list, check off items as you shop.", es: "Compras: Crea tu lista, marca los productos mientras compras." },
  help5: { en: "Community: Share recipes, tips, and chat.", es: "Comunidad: Comparte recetas, consejos y chatea." },
  help6: { en: "Red = expires within 3 days. Yellow = within 7 days.", es: "Rojo = vence en 3 días. Amarillo = en 7 días." },
  close: { en: "Close", es: "Cerrar" },
  itemWord2: { en: "item", es: "producto" },
  itemsWord: { en: "items", es: "productos" },
  alreadyOnList: { en: "is already on your shopping list!", es: "ya está en tu lista de compras!" },
  ingredientsFor: { en: "Ingredients for: ", es: "Ingredientes para: " },
};

const FOOD_NAMES_ES = {
  "Apples": "Manzanas", "Asparagus": "Espárragos", "Avocado": "Aguacate", "Bananas": "Plátanos",
  "Basil": "Albahaca", "Beets": "Betabel", "Bell Peppers": "Pimientos", "Berries": "Bayas",
  "Blackberries": "Moras", "Blueberries": "Arándanos", "Bok Choy": "Bok Choy",
  "Broccoli": "Brócoli", "Brussels Sprouts": "Coles de Bruselas", "Butternut Squash": "Calabaza",
  "Cabbage": "Repollo", "Cantaloupe": "Melón", "Carrots": "Zanahorias",
  "Cauliflower": "Coliflor", "Celery": "Apio", "Cherries": "Cerezas",
  "Cilantro": "Cilantro", "Corn": "Maíz", "Cranberries": "Arándanos Rojos",
  "Cucumber": "Pepino", "Eggplant": "Berenjena", "Garlic": "Ajo",
  "Ginger": "Jengibre", "Grapes": "Uvas", "Green Beans": "Ejotes",
  "Green Onions": "Cebollín", "Honeydew": "Melón Verde", "Jalapenos": "Jalapeños",
  "Kale": "Col Rizada", "Leeks": "Puerros", "Lemons": "Limones",
  "Lettuce": "Lechuga", "Limes": "Limas", "Mangoes": "Mangos",
  "Mushrooms": "Champiñones", "Nectarines": "Nectarinas", "Onions": "Cebollas",
  "Oranges": "Naranjas", "Parsley": "Perejil", "Peaches": "Duraznos",
  "Pears": "Peras", "Peas": "Chícharos", "Pineapple": "Piña",
  "Plums": "Ciruelas", "Pomegranate": "Granada", "Potatoes": "Papas",
  "Radishes": "Rábanos", "Raspberries": "Frambuesas", "Romaine Lettuce": "Lechuga Romana",
  "Rosemary": "Romero", "Shallots": "Chalotes", "Snow Peas": "Chícharos Chinos",
  "Spinach": "Espinacas", "Strawberries": "Fresas", "Sweet Potatoes": "Camotes",
  "Swiss Chard": "Acelga", "Thyme": "Tomillo", "Tomatoes": "Tomates",
  "Turnips": "Nabos", "Watermelon": "Sandía", "Zucchini": "Calabacín",
  "Butter": "Mantequilla", "Buttermilk": "Suero de Leche", "Cheddar Cheese": "Queso Cheddar",
  "Colby Jack": "Queso Colby Jack", "Cottage Cheese": "Requesón", "Cream": "Crema",
  "Cream Cheese": "Queso Crema", "Eggs": "Huevos", "Feta Cheese": "Queso Feta",
  "Goat Cheese": "Queso de Cabra", "Greek Yogurt": "Yogur Griego", "Gruyere": "Queso Gruyere",
  "Half and Half": "Media Crema", "Heavy Cream": "Crema Espesa", "Mascarpone": "Mascarpone",
  "Milk": "Leche", "Mozzarella": "Mozzarella", "Oat Milk": "Leche de Avena",
  "Parmesan": "Parmesano", "Pepper Jack": "Queso Pepper Jack", "Provolone": "Provolone",
  "Ricotta": "Ricotta", "Sour Cream": "Crema Agria", "Swiss Cheese": "Queso Suizo",
  "Whipping Cream": "Crema para Batir", "Yogurt": "Yogur",
  "Bacon": "Tocino", "Bratwurst": "Bratwurst", "Chicken Breast": "Pechuga de Pollo",
  "Chicken Thighs": "Muslos de Pollo", "Chicken Wings": "Alitas de Pollo",
  "Chorizo": "Chorizo", "Cod": "Bacalao", "Crab Meat": "Carne de Cangrejo",
  "Deli Ham": "Jamón de Deli", "Deli Turkey": "Pavo de Deli", "Ground Beef": "Carne Molida",
  "Ground Pork": "Cerdo Molido", "Ground Turkey": "Pavo Molido", "Halibut": "Halibut",
  "Ham": "Jamón", "Hot Dogs": "Hot Dogs", "Italian Sausage": "Salchicha Italiana",
  "Lamb Chops": "Chuletas de Cordero", "Lobster": "Langosta", "Mahi Mahi": "Mahi Mahi",
  "Pepperoni": "Pepperoni", "Pork Chops": "Chuletas de Cerdo",
  "Pork Tenderloin": "Lomo de Cerdo", "Prosciutto": "Prosciutto",
  "Ribeye Steak": "Ribeye", "Rotisserie Chicken": "Pollo Rostizado",
  "Salami": "Salami", "Salmon": "Salmón", "Scallops": "Callos de Hacha",
  "Shrimp": "Camarones", "Sirloin Steak": "Sirloin", "Smoked Salmon": "Salmón Ahumado",
  "Swordfish": "Pez Espada", "Tilapia": "Tilapia", "Tuna": "Atún",
  "Tuna Steak": "Filete de Atún", "Turkey Breast": "Pechuga de Pavo",
  "BBQ Sauce": "Salsa BBQ", "Buffalo Sauce": "Salsa Buffalo",
  "Chili Garlic Sauce": "Salsa de Chile y Ajo", "Dijon Mustard": "Mostaza Dijon",
  "Fish Sauce": "Salsa de Pescado", "Hoisin Sauce": "Salsa Hoisin",
  "Honey Mustard": "Mostaza con Miel", "Horseradish": "Rábano Picante",
  "Hot Sauce": "Salsa Picante", "Hummus": "Hummus", "Ketchup": "Ketchup",
  "Marinara Sauce": "Salsa Marinara", "Mayonnaise": "Mayonesa", "Mustard": "Mostaza",
  "Oyster Sauce": "Salsa de Ostión", "Pesto": "Pesto", "Pickle Relish": "Relish",
  "Ranch Dressing": "Aderezo Ranch", "Salsa": "Salsa", "Soy Sauce": "Salsa de Soya",
  "Sriracha": "Sriracha", "Steak Sauce": "Salsa para Carne", "Tahini": "Tahini",
  "Tartar Sauce": "Salsa Tártara", "Teriyaki Sauce": "Salsa Teriyaki",
  "Vinaigrette": "Vinagreta", "Worcestershire Sauce": "Salsa Inglesa",
  "Yellow Mustard": "Mostaza Amarilla",
  "All-Purpose Flour": "Harina", "Almond Butter": "Mantequilla de Almendra",
  "Almond Flour": "Harina de Almendra", "Baking Powder": "Polvo para Hornear",
  "Baking Soda": "Bicarbonato", "Balsamic Vinegar": "Vinagre Balsámico",
  "Black Beans": "Frijoles Negros", "Bread": "Pan", "Bread Crumbs": "Pan Molido",
  "Brown Rice": "Arroz Integral", "Brown Sugar": "Azúcar Morena", "Canola Oil": "Aceite de Canola",
  "Capers": "Alcaparras", "Chicken Broth": "Caldo de Pollo", "Chickpeas": "Garbanzos",
  "Cocoa Powder": "Cocoa en Polvo", "Coconut Milk": "Leche de Coco",
  "Coconut Oil": "Aceite de Coco", "Cornstarch": "Maicena", "Couscous": "Cuscús",
  "Crackers": "Galletas Saladas", "Dried Pasta": "Pasta Seca", "Granola": "Granola",
  "Honey": "Miel", "Jam": "Mermelada", "Jelly": "Jalea",
  "Kidney Beans": "Frijoles Rojos", "Lentils": "Lentejas", "Maple Syrup": "Miel de Maple",
  "Oats": "Avena", "Olive Oil": "Aceite de Oliva", "Olives": "Aceitunas",
  "Panko": "Panko", "Pasta": "Pasta", "Peanut Butter": "Crema de Cacahuate",
  "Pickles": "Pepinillos", "Popcorn Kernels": "Maíz para Palomitas",
  "Quinoa": "Quinoa", "Raisins": "Pasas", "Rice": "Arroz",
  "Sesame Oil": "Aceite de Sésamo", "Sugar": "Azúcar",
  "Sun-Dried Tomatoes": "Tomates Deshidratados", "Tomato Paste": "Pasta de Tomate",
  "Tomato Sauce": "Salsa de Tomate", "Tortillas": "Tortillas",
  "Vegetable Broth": "Caldo de Verduras", "Walnuts": "Nueces",
  "White Rice": "Arroz Blanco", "White Wine Vinegar": "Vinagre de Vino Blanco",
  "Frozen Berries": "Bayas Congeladas", "Frozen Broccoli": "Brócoli Congelado",
  "Frozen Corn": "Maíz Congelado", "Frozen Pizza": "Pizza Congelada",
  "Frozen Spinach": "Espinacas Congeladas", "Frozen Waffles": "Waffles Congelados",
  "Ice Cream": "Helado", "Almond Milk": "Leche de Almendra",
  "Apple Juice": "Jugo de Manzana", "Coconut Water": "Agua de Coco",
  "Orange Juice": "Jugo de Naranja", "Soy Milk": "Leche de Soya",
  "Bagels": "Bagels", "Croissants": "Croissants", "English Muffins": "Muffins Ingleses",
  "Hamburger Buns": "Pan para Hamburguesa", "Hot Dog Buns": "Pan para Hot Dog",
  "Pita Bread": "Pan Pita", "Sandwich Bread": "Pan de Sándwich",
  "Sourdough": "Pan de Masa Madre", "Wraps": "Wraps",
};

'''

# Insert after the closing of GLOBAL_STYLES and imports
# Find the line with STORAGE_KEY
insert_point = 'const STORAGE_KEY = "trackfresh.items";'
content = content.replace(insert_point, translations_block + '\n' + insert_point)

# ============================================================
# 2. ADD lang STATE + t() HELPER INSIDE THE COMPONENT
# ============================================================

# Find the state declarations area - after the component function declaration
old_state = '  const [isUnlocked, setIsUnlocked] = useState(false);'
new_state = '''  const [lang, setLang] = useState("en");
  useEffect(() => { try { const saved = localStorage.getItem(LANG_KEY); if (saved) setLang(saved); } catch(e) {} }, []);
  const changeLang = (l) => { setLang(l); try { localStorage.setItem(LANG_KEY, l); } catch(e) {} };
  const t = (key) => { const entry = T[key]; if (!entry) return key; return entry[lang] || entry.en || key; };
  const fn = (name) => lang === "es" ? (FOOD_NAMES_ES[name] || name) : name;
  const tCat = (cat) => { const entry = T[cat]; return entry ? (entry[lang] || entry.en || cat) : cat; };
  const tLoc = (loc) => { if (loc === "Pantry") { const entry = T.PantryLoc; return entry ? entry[lang] : loc; } const entry = T[loc]; return entry ? (entry[lang] || entry.en || loc) : loc; };
  const tDay = (day) => { const entry = T[day]; return entry ? (entry[lang] || entry.en || day) : day; };
  const tSlot = (slot) => { const entry = T[slot]; return entry ? (entry[lang] || entry.en || slot) : slot; };

  const [isUnlocked, setIsUnlocked] = useState(false);'''
content = content.replace(old_state, new_state)

# ============================================================
# 3. ADD LANGUAGE SELECTOR TO WELCOME SCREEN
# ============================================================

# Modify the welcome screen to include language selector
old_welcome_title = '<h2 className="text-2xl font-bold text-green-700 mb-1">Welcome to FreshTrack.ai!</h2>'
new_welcome_title = '<h2 className="text-2xl font-bold text-green-700 mb-1">{t("welcomeTitle")}</h2>'
content = content.replace(old_welcome_title, new_welcome_title)

old_welcome_desc = '<p className="text-gray-500 text-sm mb-4">The smart way to track your groceries, reduce food waste, and save money.</p>'
new_welcome_desc = '''<p className="text-gray-500 text-sm mb-3">{t("welcomeDesc")}</p>
          <div className="flex justify-center gap-3 mb-4">
            <button onClick={() => changeLang("en")} className={`rounded-full px-5 py-2 text-sm font-bold border-2 transition-all ${lang === "en" ? "border-green-600 bg-green-100 text-green-800" : "border-gray-200 text-gray-500 hover:border-green-300"}`}>🇺🇸 English</button>
            <button onClick={() => changeLang("es")} className={`rounded-full px-5 py-2 text-sm font-bold border-2 transition-all ${lang === "es" ? "border-green-600 bg-green-100 text-green-800" : "border-gray-200 text-gray-500 hover:border-green-300"}`}>🇲🇽 Español</button>
          </div>'''
content = content.replace(old_welcome_desc, new_welcome_desc)

# Welcome feature list
content = content.replace('AI-powered label &amp; barcode scanning', '{t("welcomeF1")}')
content = content.replace('Smart AI expiry predictions &amp; alerts', '{t("welcomeF2")}')
content = content.replace('Voice-powered hands-free entry', '{t("welcomeF3")}')
content = content.replace('AI-built smart shopping lists', '{t("welcomeF4")}')
content = content.replace('AI freeze alerts save your food', '{t("welcomeF5")}')

old_welcome_local = '<p className="text-xs text-gray-400 mb-4">Your data is stored locally on your device. No account required.</p>'
new_welcome_local = '<p className="text-xs text-gray-400 mb-4">{t("welcomeLocal")}</p>'
content = content.replace(old_welcome_local, new_welcome_local)

old_get_started = '>🚀 Get Started</button>'
new_get_started = '>{t("getStarted")}</button>'
content = content.replace(old_get_started, new_get_started)

# ============================================================
# 4. ADD 🌐 LANGUAGE TOGGLE TO HEADER
# ============================================================

old_header = '<button onClick={() => setShowHelp(true)} className="text-sm font-semibold text-green-700 hover:text-green-600 transition-colors underline decoration-green-300">How to use</button>'
new_header = '''<button onClick={() => changeLang(lang === "en" ? "es" : "en")} className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-800 hover:bg-green-200 transition-colors">{lang === "en" ? "🌐 ES" : "🌐 EN"}</button>
            <button onClick={() => setShowHelp(true)} className="text-sm font-semibold text-green-700 hover:text-green-600 transition-colors underline decoration-green-300">{t("howToUse")}</button>'''
content = content.replace(old_header, new_header)

# Sign Out button
content = content.replace('>Sign Out</button>', '>{t("signOut")}</button>')
content = content.replace('"Sign out of TrackFresh?"', 't("signOutConfirm")')

# ============================================================
# 5. PASSWORD SCREEN TRANSLATIONS
# ============================================================
# Add language toggle to password screen
old_pw_screen = '<p className="text-xs text-gray-400 mb-6">Enter your access code to continue</p>'
new_pw_screen = '''<p className="text-xs text-gray-400 mb-4">{t("enterAccessCode")}</p>
        <div className="flex justify-center gap-2 mb-4">
          <button onClick={() => changeLang("en")} className={`rounded-full px-4 py-1.5 text-xs font-bold border-2 transition-all ${lang === "en" ? "border-green-600 bg-green-100 text-green-800" : "border-gray-200 text-gray-500"}`}>🇺🇸 English</button>
          <button onClick={() => changeLang("es")} className={`rounded-full px-4 py-1.5 text-xs font-bold border-2 transition-all ${lang === "es" ? "border-green-600 bg-green-100 text-green-800" : "border-gray-200 text-gray-500"}`}>🇲🇽 Español</button>
        </div>'''
content = content.replace(old_pw_screen, new_pw_screen)

content = content.replace('<p className="text-sm text-gray-500 mb-1">Beta Testing</p>', '<p className="text-sm text-gray-500 mb-1">{t("betaTesting")}</p>')
content = content.replace('<p className="text-xs text-gray-400 mb-6">Enter your access code to continue</p>', '<p className="text-xs text-gray-400 mb-6">{t("enterAccessCode")}</p>')
content = content.replace('>Enter Beta</button>', '>{t("enterBeta")}</button>')
content = content.replace('>Invalid code. Try again.</p>', '>{t("invalidCode")}</p>')
content = content.replace('>Contact Freddie for access</p>', '>{t("contactFreddie")}</p>')

# ============================================================
# 6. HOME SCREEN BUBBLE TRANSLATIONS
# ============================================================
old_tagline = '<p className="text-sm text-gray-600 mb-6">✨ Your AI-powered kitchen assistant</p>'
new_tagline = '<p className="text-sm text-gray-600 mb-6">{t("appTagline")}</p>'
content = content.replace(old_tagline, new_tagline)

# Home bubbles - replace text in order
# Tracker bubble
content = content.replace('<span className="text-xs font-bold mt-1">Tracker</span>', '<span className="text-xs font-bold mt-1">{t("tracker")}</span>', 1)
content = content.replace('<p className="text-sm font-bold text-gray-700 text-center w-24">AI tracks your food & freshness</p>', '<p className="text-sm font-bold text-gray-700 text-center w-24">{t("trackerDesc")}</p>')

# Recipes bubble
content = content.replace('<span className="text-xs font-bold mt-1">Recipes</span>', '<span className="text-xs font-bold mt-1">{t("recipes")}</span>', 1)
content = content.replace('<p className="text-sm font-bold text-gray-700 text-center w-24">AI recipes from your fridge</p>', '<p className="text-sm font-bold text-gray-700 text-center w-24">{t("recipesDesc")}</p>')

# Shopping bubble
content = content.replace('<span className="text-xs font-bold mt-1">Shopping</span>', '<span className="text-xs font-bold mt-1">{t("shopping")}</span>', 1)
content = content.replace('<p className="text-sm font-bold text-gray-700 text-center w-24">Smart shopping with AI alerts</p>', '<p className="text-sm font-bold text-gray-700 text-center w-24">{t("shoppingDesc")}</p>')

# Meals bubble
content = content.replace('<span className="text-xs font-bold mt-1">Meals</span>', '<span className="text-xs font-bold mt-1">{t("meals")}</span>', 1)
content = content.replace('<p className="text-sm font-bold text-gray-700 text-center w-24">AI plans meals from what you have</p>', '<p className="text-sm font-bold text-gray-700 text-center w-24">{t("mealsDesc")}</p>')

# Stores bubble
content = content.replace('<span className="text-xs font-bold mt-1">Stores</span>', '<span className="text-xs font-bold mt-1">{t("stores")}</span>', 1)
content = content.replace('<p className="text-sm font-bold text-gray-700 text-center w-24">Shop your favorite stores</p>', '<p className="text-sm font-bold text-gray-700 text-center w-24">{t("storesDesc")}</p>')

# Community bubble
content = content.replace('<span className="text-xs font-bold mt-1">Community</span>', '<span className="text-xs font-bold mt-1">{t("communityWord")}</span>', 1)
content = content.replace('<p className="text-sm font-bold text-gray-700 text-center w-24">Connect & share with others</p>', '<p className="text-sm font-bold text-gray-700 text-center w-24">{t("communityDesc")}</p>')

# ============================================================
# 7. TRACKER MENU TRANSLATIONS
# ============================================================
content = content.replace('<h2 className="text-lg font-bold text-gray-800 mb-1">✨ AI Food Scanner</h2>', '<h2 className="text-lg font-bold text-gray-800 mb-1">{t("aiScanTitle")}</h2>')
content = content.replace('<p className="text-sm text-gray-500 mb-6">Choose how AI should add your items</p>', '<p className="text-sm text-gray-500 mb-6">{t("aiScanDesc")}</p>')

# Scanner menu bubbles
content = content.replace('<span className="text-xs font-bold mt-1">Receipt</span>', '<span className="text-xs font-bold mt-1">{t("receipt")}</span>')
content = content.replace('<p className="text-xs text-gray-500 text-center w-24">AI reads your receipt instantly</p>', '<p className="text-xs text-gray-500 text-center w-24">{t("receiptDesc")}</p>')
content = content.replace('<span className="text-xs font-bold mt-1">Barcode</span>', '<span className="text-xs font-bold mt-1">{t("barcodeWord")}</span>')
content = content.replace('<p className="text-xs text-gray-500 text-center w-24">AI identifies any product</p>', '<p className="text-xs text-gray-500 text-center w-24">{t("barcodeDesc")}</p>')
content = content.replace('<span className="text-xs font-bold mt-1">Label</span>', '<span className="text-xs font-bold mt-1">{t("label")}</span>')
content = content.replace('<p className="text-xs text-gray-500 text-center w-24">AI extracts label details</p>', '<p className="text-xs text-gray-500 text-center w-24">{t("labelDesc")}</p>')
content = content.replace('<span className="text-xs font-bold mt-1">Quick Add</span>', '<span className="text-xs font-bold mt-1">{t("quickAdd")}</span>')
content = content.replace('<p className="text-xs text-gray-500 text-center w-24">Quick add with AI autocomplete</p>', '<p className="text-xs text-gray-500 text-center w-24">{t("quickAddDesc")}</p>')
content = content.replace('<span className="text-xs font-bold mt-1">My Items</span>', '<span className="text-xs font-bold mt-1">{t("myItems")}</span>')
content = content.replace('<p className="text-xs text-gray-500 text-center w-24">Your AI-monitored inventory</p>', '<p className="text-xs text-gray-500 text-center w-24">{t("myItemsDesc")}</p>')

# Back buttons
content = content.replace('><span>←</span> Back', '><span>←</span> {t("back")}')
content = content.replace('><span>←</span> Home', '><span>←</span> {t("home")}')

# ============================================================
# 8. TRACKER FORM TRANSLATIONS
# ============================================================
content = content.replace('>Item</label>', '>{t("itemWord")}</label>')
content = content.replace('>Quantity</label>', '>{t("quantity")}</label>')
content = content.replace('>Category</label>', '>{t("category")}</label>')
content = content.replace('>Location</label>', '>{t("locationWord")}</label>')
content = content.replace('>Use By</label>', '>{t("useByWord")}</label>')
content = content.replace('>Opened (optional)</label>', '>{t("openedOpt")}</label>')

# ============================================================
# 9. TRACKED ITEMS SECTION
# ============================================================
content = content.replace('<h2 className="text-lg font-bold text-gray-800">Tracked Items</h2>', '<h2 className="text-lg font-bold text-gray-800">{t("trackedItemsTitle")}</h2>')
content = content.replace('>Clear All</button>', '>{t("clearAll")}</button>')
content = content.replace('"Clear all tracked items and start fresh?"', 't("clearAllConfirm")')
content = content.replace('>No items match this filter.</p>', '>{t("noFilter")}</p>')
content = content.replace('<div className="text-xs text-gray-500">days</div>', '<div className="text-xs text-gray-500">{t("days")}</div>')
content = content.replace('>Used</button>', '>{t("used")}</button>')
content = content.replace('>Edit</button>', '>{t("edit")}</button>')
content = content.replace('>Remove</button>', '>{t("remove")}</button>')

# ============================================================
# 10. EDIT MODAL
# ============================================================
content = content.replace('<h2 className="mb-4 text-lg font-bold">✏️ Edit Item</h2>', '<h2 className="mb-4 text-lg font-bold">{t("editItemTitle")}</h2>')
content = content.replace('>Name</label>', '>{t("nameWord")}</label>')
content = content.replace('>Use By Date</label>', '>{t("useByDate")}</label>', 1)
content = content.replace('>Save</button>', '>{t("save")}</button>', 1)

# Cancel buttons (multiple)
content = content.replace('>Cancel</button>', '>{t("cancel")}</button>')
content = content.replace('>Cancel</button>', '>{t("cancel")}</button>')
content = content.replace('>Cancel</button>', '>{t("cancel")}</button>')
content = content.replace('>Cancel</button>', '>{t("cancel")}</button>')
content = content.replace('>Cancel</button>', '>{t("cancel")}</button>')
content = content.replace('>Cancel</button>', '>{t("cancel")}</button>')
content = content.replace('>Cancel</button>', '>{t("cancel")}</button>')

# ============================================================
# 11. ALERT MODAL
# ============================================================
content = content.replace('<h2 className="text-lg font-bold text-red-600">Expiring Soon!</h2>', '<h2 className="text-lg font-bold text-red-600">{t("expiringSoon")}</h2>')
content = content.replace('"EXPIRED"', 't("expired")')
content = content.replace('>Use these items soon, freeze them, or check for recipes!</p>', '>{t("useItemsSoon")}</p>')
content = content.replace('>Got it</button>', '>{t("gotIt")}</button>')
content = content.replace('>Find Recipes</button>', '>{t("findRecipes")}</button>')

# ============================================================
# 12. RECEIPT SCANNER
# ============================================================
content = content.replace('<h2 className="mb-2 text-lg font-bold">📷 Scan Receipt</h2>', '<h2 className="mb-2 text-lg font-bold">{t("scanReceiptTitle")}</h2>')
content = content.replace('>Upload a receipt photo and our AI will instantly identify every food item, category, and shelf life.</p>', '>{t("scanReceiptDesc")}</p>')
content = content.replace('>Take Photo</span>', '>{t("takePhoto")}</span>')
content = content.replace('>Open camera</span>', '>{t("openCamera")}</span>')
content = content.replace('>Upload Photo</span>', '>{t("uploadPhoto")}</span>')
content = content.replace('>From gallery</span>', '>{t("fromGallery")}</span>')
content = content.replace('>Claude is reading your receipt...</p>', '>{t("readingReceipt")}</p>')

# ============================================================
# 13. BARCODE SCANNER
# ============================================================
content = content.replace('<h2 className="mb-2 text-lg font-bold">📦 Scan Barcode</h2>', '<h2 className="mb-2 text-lg font-bold">{t("scanBarcodeTitle")}</h2>')
content = content.replace('>Point your camera at the barcode on any food package.</p>', '>{t("scanBarcodeDesc")}</p>')
content = content.replace('>Point at barcode</p>', '>{t("pointAtBarcode")}</p>')
content = content.replace('>Looking up product...</p>', '>{t("lookingUp")}</p>')
content = content.replace('>✅ Product found!</p>', '>{t("productFound")}</p>')
content = content.replace('>Where are you storing this?</p>', '>{t("whereStoring")}</p>')
content = content.replace('>Add to Tracker</button>', '>{t("addToTracker")}</button>')
content = content.replace('>Scan Another</button>', '>{t("scanAnother")}</button>')
content = content.replace('>Try again</button>', '>{t("tryAgain")}</button>')
content = content.replace('"Scan failed. Please try again."', 't("scanFailed")')

# ============================================================
# 14. LABEL SCANNER
# ============================================================
content = content.replace('<h2 className="mb-2 text-lg font-bold">🏷️ Scan Package Label</h2>', '<h2 className="mb-2 text-lg font-bold">{t("scanLabelTitle")}</h2>')
content = content.replace('>Take a photo of the package label and Claude will read the item name and date automatically.</p>', '>{t("scanLabelDesc")}</p>')
content = content.replace('>Tap to upload package photo</span>', '>{t("tapUpload")}</span>')
content = content.replace('>JPG, PNG supported</span>', '>{t("jpgPng")}</span>')
content = content.replace('>Claude is reading the label...</p>', '>{t("readingLabel")}</p>')

# ============================================================
# 15. QUICK ADD
# ============================================================
content = content.replace('<h2 className="mb-2 text-lg font-bold">✏️ Quick Add</h2>', '<h2 className="mb-2 text-lg font-bold">{t("quickAddTitle")}</h2>')
content = content.replace('>Select a food from the list or type your own.</p>', '>{t("quickAddTitleDesc")}</p>')
content = content.replace('>Food Item</label>', '>{t("foodItem")}</label>')

# ============================================================
# 16. RECIPES TAB
# ============================================================
content = content.replace('<h2 className="text-lg font-bold">Recipe Suggestions</h2>', '<h2 className="text-lg font-bold">{t("recipeSugg")}</h2>')
content = content.replace('>Recipes matched to your ingredients, prioritizing what expires soonest. Tap a recipe to see full instructions.</p>', '>{t("recipeIntro")}</p>')
content = content.replace('>No matches found. Try adding more items like eggs, carrots, or onions.</p>', '>{t("noMatches")}</p>')
content = content.replace('>Ingredients</h4>', '>{t("ingredientsWord")}</h4>')
content = content.replace('>Instructions</h4>', '>{t("instructionsWord")}</h4>')

# ============================================================
# 17. SHOPPING TAB
# ============================================================
content = content.replace('<h2 className="text-lg font-bold">Shopping List</h2>', '<h2 className="text-lg font-bold">{t("shoppingList")}</h2>')
content = content.replace('>Clear Checked</button>', '>{t("clearChecked")}</button>')
content = content.replace('>Your shopping list is empty.</p>', '>{t("emptyList")}</p>')

# ============================================================
# 18. MEAL PLANNER
# ============================================================
content = content.replace('<h2 className="text-lg font-bold">Meal Planner</h2>', '<h2 className="text-lg font-bold">{t("mealPlanner")}</h2>')
content = content.replace('>Tap any slot to add a meal. ⚡ means it uses ingredients expiring soon.</p>', '>{t("mealDesc")}</p>')

# ============================================================
# 19. COMMUNITY TAB
# ============================================================
content = content.replace('<h2 className="text-lg font-bold">Join the Community</h2>', '<h2 className="text-lg font-bold">{t("joinComm")}</h2>')
content = content.replace('>Choose a display name to get started.</p>', '>{t("chooseName")}</p>')
content = content.replace('>Join</button>', '>{t("joinWord")}</button>')
content = content.replace('>Change name</button>', '>{t("changeName")}</button>')
content = content.replace('>Community Chat</h3>', '>{t("commChat")}</h3>')
content = content.replace('>No messages yet — say hello!</p>', '>{t("noMsg")}</p>')
content = content.replace('>Send</button>', '>{t("sendWord")}</button>')
content = content.replace('>Recipe Exchange</h3>', '>{t("recipeExch")}</h3>')
content = content.replace('>Share Recipe</button>', '>{t("shareRecipe")}</button>')
content = content.replace('>No recipes shared yet — be the first!</p>', '>{t("noRecipes")}</p>')
content = content.replace('>Tips & Ideas</h3>', '>{t("tipsIdeas")}</h3>')
content = content.replace('>Post</button>', '>{t("postWord")}</button>')
content = content.replace('>No tips yet — share one!</p>', '>{t("noTips")}</p>')

# ============================================================
# 20. STORES TAB
# ============================================================
content = content.replace('<h2 className="text-lg font-bold">Shop Online</h2>', '<h2 className="text-lg font-bold">{t("shopOnline")}</h2>')
content = content.replace('>Tap any store to shop for groceries online.</p>', '>{t("shopOnlineDesc")}</p>')
content = content.replace('>Shop Now →</span>', '>{t("shopNow")}</span>')
content = content.replace('>Shop Now →</span>', '>{t("shopNow")}</span>')
content = content.replace('>Shop Now →</span>', '>{t("shopNow")}</span>')
content = content.replace('>Shop Now →</span>', '>{t("shopNow")}</span>')
content = content.replace('>Shop Now →</span>', '>{t("shopNow")}</span>')
content = content.replace('>Shop Now →</span>', '>{t("shopNow")}</span>')
content = content.replace('>Shop Now →</span>', '>{t("shopNow")}</span>')
content = content.replace('>Shop Now →</span>', '>{t("shopNow")}</span>')
content = content.replace('>Shop Now →</span>', '>{t("shopNow")}</span>')
content = content.replace('>Shop Now →</span>', '>{t("shopNow")}</span>')

# ============================================================
# 21. HELP MODAL
# ============================================================
content = content.replace('>How to Use</h2>', '>{t("howToUse")}</h2>')
content = content.replace('>Close</button>', '>{t("close")}</button>')

# ============================================================
# 22. NOTE: Food names in autocomplete stay in English for now.
# This avoids scope issues with translation functions.
# Spanish food name search can be added as a future enhancement.
# ============================================================

# ============================================================
# DONE - Write the output file
# ============================================================
with open(file_path, 'w') as f:
    f.write(content)

print(f"✅ Spanish language support added!")
print(f"✅ Modified file size: {len(content)} characters")
print(f"")
print(f"📦 Backup saved at: {backup_path}")
print(f"")
print(f"Now deploy with:")
print(f"  cd ~/Documents/Projects/trackfresh-v3")
print(f"  git add -A")
print(f'  git commit -m "Add Spanish language support"')
print(f"  vercel --prod --yes")
print(f"")
print(f"🎉 Done! Your app now supports English and Spanish!")
