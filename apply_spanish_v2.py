import os, sys, shutil
f = 'app/page.js'
if not os.path.exists(f):
    print("ERROR: Run from trackfresh-v3 directory")
    sys.exit(1)
b = f + '.before-spanish'
if not os.path.exists(b):
    shutil.copy2(f, b)
    print(f"Backup: {b}")
c = open(f).read()

T_BLOCK = '''
const LANG_KEY = "trackfresh.lang";
const T = {
  appTagline: { en: "\\u2728 Your AI-powered kitchen assistant", es: "\\u2728 Tu asistente de cocina con IA" },
  howToUse: { en: "How to use", es: "C\\u00f3mo usar" },
  signOut: { en: "Sign Out", es: "Cerrar Sesi\\u00f3n" },
  signOutConfirm: { en: "Sign out of TrackFresh?", es: "\\u00bfCerrar sesi\\u00f3n de TrackFresh?" },
  betaTesting: { en: "Beta Testing", es: "Prueba Beta" },
  enterAccessCode: { en: "Enter your access code to continue", es: "Ingresa tu c\\u00f3digo de acceso" },
  enterBeta: { en: "Enter Beta", es: "Entrar a Beta" },
  invalidCode: { en: "Invalid code. Try again.", es: "C\\u00f3digo inv\\u00e1lido. Intenta de nuevo." },
  contactFreddie: { en: "Contact Freddie for access", es: "Contacta a Freddie para acceso" },
  welcomeTitle: { en: "Welcome to FreshTrack.ai!", es: "\\u00a1Bienvenido a FreshTrack.ai!" },
  welcomeDesc: { en: "The smart way to track your groceries, reduce food waste, and save money.", es: "La forma inteligente de rastrear tus alimentos, reducir el desperdicio y ahorrar dinero." },
  welcomeF1: { en: "AI-powered label & barcode scanning", es: "Escaneo de etiquetas y c\\u00f3digos de barras con IA" },
  welcomeF2: { en: "Smart AI expiry predictions & alerts", es: "Predicciones inteligentes de vencimiento con IA" },
  welcomeF3: { en: "Voice-powered hands-free entry", es: "Entrada manos libres por voz" },
  welcomeF4: { en: "AI-built smart shopping lists", es: "Listas de compras inteligentes con IA" },
  welcomeF5: { en: "AI freeze alerts save your food", es: "Alertas de congelaci\\u00f3n con IA salvan tu comida" },
  welcomeLocal: { en: "Your data is stored locally on your device. No account required.", es: "Tus datos se guardan en tu dispositivo. No necesitas cuenta." },
  getStarted: { en: "\\ud83d\\ude80 Get Started", es: "\\ud83d\\ude80 Comenzar" },
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
  communityDesc: { en: "Connect & share with others", es: "Con\\u00e9ctate y comparte con otros" },
  aiScanTitle: { en: "\\u2728 AI Food Scanner", es: "\\u2728 Esc\\u00e1ner de Alimentos con IA" },
  aiScanDesc: { en: "Choose how AI should add your items", es: "Elige c\\u00f3mo la IA debe agregar tus productos" },
  receipt: { en: "Receipt", es: "Recibo" },
  receiptDesc: { en: "AI reads your receipt instantly", es: "La IA lee tu recibo al instante" },
  barcodeWord: { en: "Barcode", es: "C\\u00f3digo" },
  barcodeDesc: { en: "AI identifies any product", es: "La IA identifica cualquier producto" },
  label: { en: "Label", es: "Etiqueta" },
  labelDesc: { en: "AI extracts label details", es: "La IA extrae detalles de la etiqueta" },
  quickAdd: { en: "Quick Add", es: "Agregar" },
  quickAddDesc: { en: "Quick add with AI autocomplete", es: "Agrega r\\u00e1pido con autocompletado IA" },
  myItems: { en: "My Items", es: "Mis Productos" },
  myItemsDesc: { en: "Your AI-monitored inventory", es: "Tu inventario monitoreado por IA" },
  back: { en: "Back", es: "Atr\\u00e1s" },
  home: { en: "Home", es: "Inicio" },
  itemWord: { en: "Item", es: "Producto" },
  quantity: { en: "Quantity", es: "Cantidad" },
  category: { en: "Category", es: "Categor\\u00eda" },
  locationWord: { en: "Location", es: "Ubicaci\\u00f3n" },
  useByWord: { en: "Use By", es: "Consumir Antes De" },
  openedOpt: { en: "Opened (optional)", es: "Abierto (opcional)" },
  trackedItemsTitle: { en: "Tracked Items", es: "Productos Rastreados" },
  clearAll: { en: "Clear All", es: "Borrar Todo" },
  clearAllConfirm: { en: "Clear all tracked items and start fresh?", es: "\\u00bfBorrar todos los productos y empezar de nuevo?" },
  noFilter: { en: "No items match this filter.", es: "Ning\\u00fan producto coincide con este filtro." },
  days: { en: "days", es: "d\\u00edas" },
  used: { en: "Used", es: "Usado" },
  edit: { en: "Edit", es: "Editar" },
  remove: { en: "Remove", es: "Quitar" },
  editItemTitle: { en: "\\u270f\\ufe0f Edit Item", es: "\\u270f\\ufe0f Editar Producto" },
  nameWord: { en: "Name", es: "Nombre" },
  useByDate: { en: "Use By Date", es: "Fecha de Vencimiento" },
  save: { en: "Save", es: "Guardar" },
  cancel: { en: "Cancel", es: "Cancelar" },
  expiringSoon: { en: "Expiring Soon!", es: "\\u00a1Vence Pronto!" },
  useItemsSoon: { en: "Use these items soon, freeze them, or check for recipes!", es: "\\u00a1Usa estos productos pronto, cong\\u00e9lalos o busca recetas!" },
  gotIt: { en: "Got it", es: "Entendido" },
  findRecipes: { en: "Find Recipes", es: "Buscar Recetas" },
  scanReceiptTitle: { en: "\\ud83d\\udcf7 Scan Receipt", es: "\\ud83d\\udcf7 Escanear Recibo" },
  scanReceiptDesc: { en: "Upload a receipt photo and our AI will instantly identify every food item, category, and shelf life.", es: "Sube una foto del recibo y nuestra IA identificar\\u00e1 cada producto al instante." },
  takePhoto: { en: "Take Photo", es: "Tomar Foto" },
  openCamera: { en: "Open camera", es: "Abrir c\\u00e1mara" },
  uploadPhoto: { en: "Upload Photo", es: "Subir Foto" },
  fromGallery: { en: "From gallery", es: "Desde galer\\u00eda" },
  readingReceipt: { en: "Claude is reading your receipt...", es: "Claude est\\u00e1 leyendo tu recibo..." },
  scanBarcodeTitle: { en: "\\ud83d\\udce6 Scan Barcode", es: "\\ud83d\\udce6 Escanear C\\u00f3digo de Barras" },
  scanBarcodeDesc: { en: "Point your camera at the barcode on any food package.", es: "Apunta tu c\\u00e1mara al c\\u00f3digo de barras de cualquier paquete." },
  lookingUp: { en: "Looking up product...", es: "Buscando producto..." },
  productFound: { en: "\\u2705 Product found!", es: "\\u2705 \\u00a1Producto encontrado!" },
  whereStoring: { en: "Where are you storing this?", es: "\\u00bfD\\u00f3nde vas a guardar esto?" },
  addToTracker: { en: "Add to Tracker", es: "Agregar al Rastreador" },
  scanAnother: { en: "Scan Another", es: "Escanear Otro" },
  tryAgain: { en: "Try again", es: "Intentar de nuevo" },
  scanLabelTitle: { en: "\\ud83c\\udff7\\ufe0f Scan Package Label", es: "\\ud83c\\udff7\\ufe0f Escanear Etiqueta" },
  scanLabelDesc: { en: "Take a photo of the package label and Claude will read the item name and date automatically.", es: "Toma una foto de la etiqueta y Claude leer\\u00e1 el nombre y la fecha." },
  tapUpload: { en: "Tap to upload package photo", es: "Toca para subir foto del paquete" },
  jpgPng: { en: "JPG, PNG supported", es: "Se aceptan JPG, PNG" },
  readingLabel: { en: "Claude is reading the label...", es: "Claude est\\u00e1 leyendo la etiqueta..." },
  quickAddTitle: { en: "\\u270f\\ufe0f Quick Add", es: "\\u270f\\ufe0f Agregar R\\u00e1pido" },
  quickAddTitleDesc: { en: "Select a food from the list or type your own.", es: "Selecciona un alimento o escribe el tuyo." },
  foodItem: { en: "Food Item", es: "Alimento" },
  recipeSugg: { en: "Recipe Suggestions", es: "Sugerencias de Recetas" },
  recipeIntro: { en: "Recipes matched to your ingredients, prioritizing what expires soonest. Tap a recipe to see full instructions.", es: "Recetas con tus ingredientes, priorizando lo que vence primero." },
  noMatches: { en: "No matches found. Try adding more items like eggs, carrots, or onions.", es: "Sin coincidencias. Agrega m\\u00e1s productos." },
  ingredientsWord: { en: "Ingredients", es: "Ingredientes" },
  instructionsWord: { en: "Instructions", es: "Instrucciones" },
  shoppingList: { en: "Shopping List", es: "Lista de Compras" },
  clearChecked: { en: "Clear Checked", es: "Borrar Marcados" },
  emptyList: { en: "Your shopping list is empty.", es: "Tu lista de compras est\\u00e1 vac\\u00eda." },
  mealPlanner: { en: "Meal Planner", es: "Planificador de Comidas" },
  mealDesc: { en: "Tap any slot to add a meal. \\u26a1 means it uses ingredients expiring soon.", es: "Toca cualquier espacio para agregar comida." },
  joinComm: { en: "Join the Community", es: "\\u00danete a la Comunidad" },
  chooseName: { en: "Choose a display name to get started.", es: "Elige un nombre para comenzar." },
  joinWord: { en: "Join", es: "Unirse" },
  changeName: { en: "Change name", es: "Cambiar nombre" },
  commChat: { en: "Community Chat", es: "Chat de la Comunidad" },
  noMsg: { en: "No messages yet \\u2014 say hello!", es: "No hay mensajes \\u2014 \\u00a1di hola!" },
  sendWord: { en: "Send", es: "Enviar" },
  recipeExch: { en: "Recipe Exchange", es: "Intercambio de Recetas" },
  shareRecipe: { en: "Share Recipe", es: "Compartir Receta" },
  noRecipes: { en: "No recipes shared yet \\u2014 be the first!", es: "No hay recetas \\u2014 \\u00a1s\\u00e9 el primero!" },
  tipsIdeas: { en: "Tips & Ideas", es: "Consejos e Ideas" },
  postWord: { en: "Post", es: "Publicar" },
  noTips: { en: "No tips yet \\u2014 share one!", es: "No hay consejos \\u2014 \\u00a1comparte uno!" },
  shopOnline: { en: "Shop Online", es: "Comprar en L\\u00ednea" },
  shopOnlineDesc: { en: "Tap any store to shop for groceries online.", es: "Toca cualquier tienda para comprar alimentos." },
  shopNow: { en: "Shop Now \\u2192", es: "Comprar Ahora \\u2192" },
  close: { en: "Close", es: "Cerrar" },
};

'''

marker = 'const STORAGE_KEY = "trackfresh.items";'
c = c.replace(marker, T_BLOCK + marker, 1)

old_unlock = '  const [isUnlocked, setIsUnlocked] = useState(false);'
new_unlock = '  const [lang, setLang] = useState(() => { try { return localStorage.getItem(LANG_KEY) || "en"; } catch(e) { return "en"; } });\n  const changeLang = (l) => { setLang(l); try { localStorage.setItem(LANG_KEY, l); } catch(e) {} };\n  const t = (key) => { const e = T[key]; return e ? (e[lang] || e.en || key) : key; };\n\n  const [isUnlocked, setIsUnlocked] = useState(false);'
c = c.replace(old_unlock, new_unlock, 1)

# JSX replacements
R = [
  ('<p className="text-xs text-gray-400 mb-6">Enter your access code to continue</p>',
   '<p className="text-xs text-gray-400 mb-4">{t("enterAccessCode")}</p>\n        <div className="mb-5"><p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">\\ud83c\\udf10 Language / Idioma</p><div className="flex justify-center gap-3"><button onClick={() => changeLang("en")} className={`rounded-xl px-6 py-3 text-base font-bold border-2 transition-all shadow-md ${lang === "en" ? "border-green-600 bg-green-500 text-white" : "border-gray-300 bg-white text-gray-600"}`}>\\ud83c\\uddfa\\ud83c\\uddf8 English</button><button onClick={() => changeLang("es")} className={`rounded-xl px-6 py-3 text-base font-bold border-2 transition-all shadow-md ${lang === "es" ? "border-green-600 bg-green-500 text-white" : "border-gray-300 bg-white text-gray-600"}`}>\\ud83c\\uddf2\\ud83c\\uddfd Espa\\u00f1ol</button></div></div>'),
  ('<p className="text-sm text-gray-500 mb-1">Beta Testing</p>', '<p className="text-sm text-gray-500 mb-1">{t("betaTesting")}</p>'),
  ('>Enter Beta</button>', '>{t("enterBeta")}</button>'),
  ('>Invalid code. Try again.</p>', '>{t("invalidCode")}</p>'),
  ('>Contact Freddie for access</p>', '>{t("contactFreddie")}</p>'),
  ('<h2 className="text-2xl font-bold text-green-700 mb-1">Welcome to FreshTrack.ai!</h2>', '<h2 className="text-2xl font-bold text-green-700 mb-1">{t("welcomeTitle")}</h2>'),
  ('<p className="text-gray-500 text-sm mb-4">The smart way to track your groceries, reduce food waste, and save money.</p>', '<p className="text-gray-500 text-sm mb-3">{t("welcomeDesc")}</p>\n          <div className="mb-5"><p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">\\ud83c\\udf10 Language / Idioma</p><div className="flex justify-center gap-3"><button onClick={() => changeLang("en")} className={`rounded-xl px-6 py-3 text-base font-bold border-2 transition-all shadow-md ${lang === "en" ? "border-green-600 bg-green-500 text-white" : "border-gray-300 bg-white text-gray-600"}`}>\\ud83c\\uddfa\\ud83c\\uddf8 English</button><button onClick={() => changeLang("es")} className={`rounded-xl px-6 py-3 text-base font-bold border-2 transition-all shadow-md ${lang === "es" ? "border-green-600 bg-green-500 text-white" : "border-gray-300 bg-white text-gray-600"}`}>\\ud83c\\uddf2\\ud83c\\uddfd Espa\\u00f1ol</button></div></div>'),
  ('<span className="text-gray-700">AI-powered label &amp; barcode scanning</span>', '<span className="text-gray-700">{t("welcomeF1")}</span>'),
  ('<span className="text-gray-700">Smart AI expiry predictions &amp; alerts</span>', '<span className="text-gray-700">{t("welcomeF2")}</span>'),
  ('<span className="text-gray-700">Voice-powered hands-free entry</span>', '<span className="text-gray-700">{t("welcomeF3")}</span>'),
  ('<span className="text-gray-700">AI-built smart shopping lists</span>', '<span className="text-gray-700">{t("welcomeF4")}</span>'),
  ('<span className="text-gray-700">AI freeze alerts save your food</span>', '<span className="text-gray-700">{t("welcomeF5")}</span>'),
  ('<p className="text-xs text-gray-400 mb-4">Your data is stored locally on your device. No account required.</p>', '<p className="text-xs text-gray-400 mb-4">{t("welcomeLocal")}</p>'),
  ('>\\ud83d\\ude80 Get Started</button>', '>{t("getStarted")}</button>'),
  ('className="text-sm font-semibold text-green-700 hover:text-green-600 transition-colors underline decoration-green-300">How to use</button>', 'className="text-sm font-semibold text-green-700 hover:text-green-600 transition-colors underline decoration-green-300">{t("howToUse")}</button>'),
  ('>Sign Out</button>', '>{t("signOut")}</button>'),
  ('"Sign out of TrackFresh?"', 't("signOutConfirm")'),
  ('<p className="text-sm text-gray-600 mb-6">\\u2728 Your AI-powered kitchen assistant</p>', '<p className="text-sm text-gray-600 mb-6">{t("appTagline")}</p>'),
  ('<h2 className="text-lg font-bold text-gray-800 mb-1">\\u2728 AI Food Scanner</h2>', '<h2 className="text-lg font-bold text-gray-800 mb-1">{t("aiScanTitle")}</h2>'),
  ('>Choose how AI should add your items</p>', '>{t("aiScanDesc")}</p>'),
  ('<h2 className="text-lg font-bold text-gray-800">Tracked Items</h2>', '<h2 className="text-lg font-bold text-gray-800">{t("trackedItemsTitle")}</h2>'),
  ('>Clear All</button>', '>{t("clearAll")}</button>'),
  ('"Clear all tracked items and start fresh?"', 't("clearAllConfirm")'),
  ('>No items match this filter.</p>', '>{t("noFilter")}</p>'),
  ('<div className="text-xs text-gray-500">days</div>', '<div className="text-xs text-gray-500">{t("days")}</div>'),
  ('>Used</button>', '>{t("used")}</button>'),
  ('>Edit</button>', '>{t("edit")}</button>'),
  ('>Remove</button>', '>{t("remove")}</button>'),
  ('<h2 className="mb-4 text-lg font-bold">\\u270f\\ufe0f Edit Item</h2>', '<h2 className="mb-4 text-lg font-bold">{t("editItemTitle")}</h2>'),
  ('>Save</button>', '>{t("save")}</button>'),
  ('<h2 className="text-lg font-bold text-red-600">Expiring Soon!</h2>', '<h2 className="text-lg font-bold text-red-600">{t("expiringSoon")}</h2>'),
  ('>Use these items soon, freeze them, or check for recipes!</p>', '>{t("useItemsSoon")}</p>'),
  ('>Got it</button>', '>{t("gotIt")}</button>'),
  ('>Find Recipes</button>', '>{t("findRecipes")}</button>'),
  ('<h2 className="mb-2 text-lg font-bold">\\ud83d\\udcf7 Scan Receipt</h2>', '<h2 className="mb-2 text-lg font-bold">{t("scanReceiptTitle")}</h2>'),
  ('>Claude is reading your receipt...</p>', '>{t("readingReceipt")}</p>'),
  ('<h2 className="mb-2 text-lg font-bold">\\ud83d\\udce6 Scan Barcode</h2>', '<h2 className="mb-2 text-lg font-bold">{t("scanBarcodeTitle")}</h2>'),
  ('>Looking up product...</p>', '>{t("lookingUp")}</p>'),
  ('>\\u2705 Product found!</p>', '>{t("productFound")}</p>'),
  ('>Add to Tracker</button>', '>{t("addToTracker")}</button>'),
  ('>Scan Another</button>', '>{t("scanAnother")}</button>'),
  ('>Try again</button>', '>{t("tryAgain")}</button>'),
  ('<h2 className="mb-2 text-lg font-bold">\\ud83c\\udff7\\ufe0f Scan Package Label</h2>', '<h2 className="mb-2 text-lg font-bold">{t("scanLabelTitle")}</h2>'),
  ('>Claude is reading the label...</p>', '>{t("readingLabel")}</p>'),
  ('<h2 className="mb-2 text-lg font-bold">\\u270f\\ufe0f Quick Add</h2>', '<h2 className="mb-2 text-lg font-bold">{t("quickAddTitle")}</h2>'),
  ('<h2 className="text-lg font-bold">Recipe Suggestions</h2>', '<h2 className="text-lg font-bold">{t("recipeSugg")}</h2>'),
  ('>Ingredients</h4>', '>{t("ingredientsWord")}</h4>'),
  ('>Instructions</h4>', '>{t("instructionsWord")}</h4>'),
  ('<h2 className="text-lg font-bold">Shopping List</h2>', '<h2 className="text-lg font-bold">{t("shoppingList")}</h2>'),
  ('>Clear Checked</button>', '>{t("clearChecked")}</button>'),
  ('>Your shopping list is empty.</p>', '>{t("emptyList")}</p>'),
  ('<h2 className="text-lg font-bold">Meal Planner</h2>', '<h2 className="text-lg font-bold">{t("mealPlanner")}</h2>'),
  ('<h2 className="text-lg font-bold">Join the Community</h2>', '<h2 className="text-lg font-bold">{t("joinComm")}</h2>'),
  ('>Join</button>', '>{t("joinWord")}</button>'),
  ('>Change name</button>', '>{t("changeName")}</button>'),
  ('>Community Chat</h3>', '>{t("commChat")}</h3>'),
  ('>Send</button>', '>{t("sendWord")}</button>'),
  ('>Recipe Exchange</h3>', '>{t("recipeExch")}</h3>'),
  ('>Share Recipe</button>', '>{t("shareRecipe")}</button>'),
  ('>Tips & Ideas</h3>', '>{t("tipsIdeas")}</h3>'),
  ('>Post</button>', '>{t("postWord")}</button>'),
  ('<h2 className="text-lg font-bold">Shop Online</h2>', '<h2 className="text-lg font-bold">{t("shopOnline")}</h2>'),
  ('>How to Use</h2>', '>{t("howToUse")}</h2>'),
  ('>Close</button>', '>{t("close")}</button>'),
]

for old, new in R:
    if old in c:
        c = c.replace(old, new, 1)

# Shop Now (multiple)
for i in range(10):
    c = c.replace('>Shop Now \\u2192</span>', '>{t("shopNow")}</span>', 1)

# Back/Home/Cancel (multiple)
c = c.replace('><span>\\u2190</span> Back', '><span>\\u2190</span> {t("back")}')
c = c.replace('><span>\\u2190</span> Home', '><span>\\u2190</span> {t("home")}')
for i in range(7):
    c = c.replace('>Cancel</button>', '>{t("cancel")}</button>', 1)

# Header language toggle
old_h = '<button onClick={() => setShowHelp(true)}'
new_h = '<button onClick={() => changeLang(lang === "en" ? "es" : "en")} className="rounded-full bg-green-500 px-3 py-1.5 text-sm font-bold text-white hover:bg-green-600 transition-all shadow-md">{lang === "en" ? "\\ud83c\\uddf2\\ud83c\\uddfd ES" : "\\ud83c\\uddfa\\ud83c\\uddf8 EN"}</button>\n            <button onClick={() => setShowHelp(true)}'
c = c.replace(old_h, new_h, 1)

# Floating button - in main component before </>
old_end = '    </>\n  );\n}\n'
new_end = '      {/* FLOATING LANGUAGE BUTTON */}\n      <button onClick={() => changeLang(lang === "en" ? "es" : "en")} className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 text-white shadow-xl hover:bg-green-600 hover:scale-110 transition-all flex items-center justify-center text-xl font-bold border-2 border-white" style={{ boxShadow: "0 4px 20px rgba(34,197,94,0.4)" }}>{lang === "en" ? "\\ud83c\\uddf2\\ud83c\\uddfd" : "\\ud83c\\uddfa\\ud83c\\uddf8"}</button>\n    </>\n  );\n}\n'

# Only replace the LAST occurrence (main component, not sub-components)
idx = c.rfind(old_end)
if idx >= 0:
    c = c[:idx] + new_end + c[idx+len(old_end):]
    print("Added floating button to main component")
else:
    print("WARN: Could not add floating button")

open(f, 'w').write(c)
print("Done!")
