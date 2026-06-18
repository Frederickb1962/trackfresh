
"use client";

import { TUTORIALS, TOUR_SLIDES } from "./lib/tourData";

import { GLOBAL_STYLES } from "./lib/styles";


import React, { useEffect, useMemo, useRef, useState } from "react";
import { Bell, PlusCircle, ChefHat, Users, ShoppingCart } from "lucide-react";
import { AiBadge, GreenDot, TrackFreshLogo } from "./components/ui/TrackFreshLogo";
import MarketingPage from "./components/MarketingPage";
import StoreDiscountModal from "./components/StoreDiscountModal";
import { isRegisterDiscountEligible } from "./lib/storeDiscount";
import GroceryScanModal from "./components/GroceryScanModal";
import { FOOD_ES, FOOD_DB } from "./lib/foodData";
import { CATEGORY_COLORS, LOCATION_COLORS, LOCATION_ICONS } from "./lib/uiConstants";
import { conservativeProduceShelfDays, finalizeProduceScannerItem, formatInGeneralInstruction, isProduceCategory } from "./lib/aiProduceNormalize";
import { compressImageFile } from "./lib/compressImage";
import { formatAiError } from "./lib/formatAiError";
import { MealSearchInput, FoodAutocomplete, CommunityStewAnim } from "./components/ui/MealComponents";
import { LoadingFoodFact } from "./components/ui/LoadingFoodFact";
import LanguagePicker from "./components/LanguagePicker";
import GuidedFlowWizard from "./components/GuidedFlowWizard";
import CoachTipCard from "./components/CoachTipCard";
import { pick, speechLocale } from "./lib/i18n";
import { speakWithVoice, warmSpeechVoices } from "./lib/speechVoice";
import { T } from "./lib/translations";
import {
  SAVINGS_EVENTS_KEY,
  appendSavingsEvent,
  computeMonthStats,
  createSavingsEvent,
  currentMonthKey,
  formatUSD,
  itemPrice,
  loadSavingsEvents,
  parseItemPrice,
  splitPortionAmounts,
  saveSavingsEvents,
  USED_PORTION_FRACTIONS,
  usedPortionButtonLabel,
} from "./lib/savings";
import {
  FLOW_KEY,
  GUIDED_DONE_KEY,
  COACH_DONE_KEY,
  FLOWS,
  readFlowFromUrl,
  applyFlowResetIfRequested,
  getCoachTip,
  flowLabel,
  COACH_STEP_KEY,
  DISCLAIMER_KEY,
  WELCOMED_KEY,
  MKT_SEEN_KEY,
  hasCompletedFirstTimeOnboarding,
  resolveWelcomeStepAfterMarketing,
} from "./lib/onboardingFlows";


const LANG_KEY = "trackfresh.lang";
/** Main app column: phone-narrow, desktop-wide green cards / dashboard */
const TF_APP_SHELL_MAX = "w-full max-w-2xl lg:max-w-6xl xl:max-w-7xl";

const STORAGE_KEY = "trackfresh.items";
const COMMUNITY_KEY = "trackfresh.community";
const USERNAME_KEY = "trackfresh.username";
const SHOPPING_KEY = "trackfresh.shopping";
const MEAL_KEY = "trackfresh.meals";
const SAVED_RECIPES_KEY = "trackfresh.savedRecipes";
const RECIPE_MODE_KEY = "trackfresh.recipeMode";

const CATEGORIES = ["Produce", "Dairy", "Meat", "Pantry", "Leftovers", "Other"];
const LOCATIONS = ["Fridge", "Freezer", "Pantry"];

/** Tracker: Smart Scan + Scan Receipt — layout only; glass from `.tf-glass-scan` in globals.css */
const TRACKER_SCAN_BTN_LAYOUT = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.35rem",
  width: "100%",
  borderRadius: "16px",
  cursor: "pointer",
  color: "#fff",
  fontWeight: 700,
  fontSize: "0.875rem",
  WebkitTapHighlightColor: "transparent",
};

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

/** Calendar days from start of local today until useByDate (midnight). Used for item countdown only — never uses openDate or openUseBy. */
function daysLeftFromUseByDate(useByDateStr) {
  if (!useByDateStr || String(useByDateStr).trim() === "") return null;
  const targetMs = new Date(String(useByDateStr).trim() + "T00:00:00").getTime();
  if (Number.isNaN(targetMs)) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((targetMs - today.getTime()) / 86400000);
}

/** True when use-by date is before today (Past Date / expired in UI). */
function itemIsPastDate(item) {
  const d = item?.daysLeft ?? daysLeftFromUseByDate(item?.useByDate);
  return d !== null && d < 0;
}

function pastDateAlertMessage(count, lang) {
  const isEs = lang === "es";
  if (!count || count < 1) return null;
  if (isEs) {
    return count === 1
      ? "Atención: artículo con fecha pasada encontrado"
      : `Atención: ${count} artículos con fecha pasada encontrados`;
  }
  return count === 1
    ? "Attention: Past Date Item Found"
    : "Attention: Past Date Items Found";
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

// Returns a human-readable after-opening label for an item card (not used for Produce).
function afterOpeningLabel(it) {
  if (it.category === "Produce") return null;
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

// Returns the earliest relevant date for an item — used for saveItems sort order only (countdown uses useByDate).
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
      inGeneralDaysMin: it.inGeneralDaysMin ?? null,
      inGeneralDaysMax: it.inGeneralDaysMax ?? null,
      daysSealed:       it.daysSealed       ?? null,
      freezeBy:         it.freezeBy         ?? "",
      unitPrice:        parseItemPrice(it),
      purchaseDate:     it.purchaseDate     ?? "",
      wasteLogged:      !!it.wasteLogged,
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








/** Gold instruction banner — same style as recipe expand hint. */
function InstructionHint({ children, className = "", style = {} }) {
  return (
    <p className={`tf-instruction-hint${className ? ` ${className}` : ""}`} style={style}>
      {children}
    </p>
  );
}

/** Instruction between date tap / entry and mic — copy only; no voice logic. */
function VoiceDateNextHint({ lang, text }) {
  const fallback = lang === "es"
    ? "Di la fecha, luego toca Guardar abajo o di NEXT / DONE cuando termines."
    : "Speak the date, then tap Save below or say NEXT / DONE when finished.";
  return (
    <InstructionHint>{text || fallback}</InstructionHint>
  );
}

export default function TrackFreshDashboard() {
  const [lang, setLang] = useState("en");
  const changeLang = (l) => { setLang(l); try { localStorage.setItem(LANG_KEY, l); } catch(e) {} };
  React.useEffect(() => { try { const saved = localStorage.getItem(LANG_KEY); if (saved) setLang(saved); } catch(e) {} }, []);
  React.useEffect(() => { warmSpeechVoices(); }, []);
  const t = (key) => { const e = T[key]; return e ? (e[lang] || e.en || key) : key; };

  
  const [showMarketing, setShowMarketing] = useState(true);
  const [welcomeStep, setWelcomeStep] = useState(0);
  const [onboardingFlow, setOnboardingFlow] = useState(FLOWS.default);
  const [guidedStep, setGuidedStep] = useState(0);
  const [guidedComplete, setGuidedComplete] = useState(false);
  const [coachDismissed, setCoachDismissed] = useState(false);
  const [coachStep, setCoachStep] = useState(0);
  const [guidedPaused, setGuidedPaused] = useState(false);
  React.useEffect(() => {
    applyFlowResetIfRequested();
    try {
      const urlFlow = readFlowFromUrl();
      const savedFlow = localStorage.getItem(FLOW_KEY);
      const flow = urlFlow || savedFlow || FLOWS.default;
      if (urlFlow) localStorage.setItem(FLOW_KEY, urlFlow);
      setOnboardingFlow(flow);
      setGuidedComplete(localStorage.getItem(GUIDED_DONE_KEY) === "1");
      setCoachDismissed(localStorage.getItem(COACH_DONE_KEY) === "1");
      const savedCoachStep = parseInt(localStorage.getItem(COACH_STEP_KEY) || "0", 10);
      if (!Number.isNaN(savedCoachStep)) setCoachStep(savedCoachStep);

      if (hasCompletedFirstTimeOnboarding()) {
        setShowMarketing(false);
      } else if (sessionStorage.getItem(MKT_SEEN_KEY) === "1") {
        setShowMarketing(false);
        setWelcomeStep(resolveWelcomeStepAfterMarketing());
      }
    } catch (e) {}
  }, []);
  const finishWelcomeForFlow = () => {
    try { localStorage.setItem(WELCOMED_KEY, "true"); } catch (e) {}
    setWelcomeStep(0);
  };
  const queuePostMarketingOnboarding = () => {
    setWelcomeStep(resolveWelcomeStepAfterMarketing());
  };
  const completeGuidedFlow = () => {
    setGuidedComplete(true);
    setGuidedPaused(false);
    try { localStorage.setItem(GUIDED_DONE_KEY, "1"); } catch (e) {}
  };
  const dismissCoachFlow = () => {
    setCoachDismissed(true);
    try { localStorage.setItem(COACH_DONE_KEY, "1"); } catch (e) {}
  };
  const advanceCoachStep = (next) => {
    setCoachStep(next);
    try { localStorage.setItem(COACH_STEP_KEY, String(next)); } catch (e) {}
  };
  const handleLaunchApp = () => {
    setShowMarketing(false);
    try { if (window.sessionStorage) sessionStorage.setItem(MKT_SEEN_KEY, "1"); } catch (e) {}
    queuePostMarketingOnboarding();
  };
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);
  const handlePwSubmit = () => {
    if (pwInput === "fresh2026" || pwInput === "CarlosG2026") {
      setIsUnlocked(true); setPwError(false);
      try { if (window.sessionStorage) { sessionStorage.setItem("tf_ok", "1"); if (pwInput === "fresh2026") sessionStorage.setItem("tf_admin", "1"); } } catch(e) {}
      if (pwInput === "fresh2026") setIsAdmin(true);
      queuePostMarketingOnboarding();
    } else { setPwError(true); }
  };
  const [isAdmin, setIsAdmin] = useState(false);
  React.useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        if (sessionStorage.getItem("tf_ok") === "1") {
          setIsUnlocked(true);
          if (hasCompletedFirstTimeOnboarding()) queuePostMarketingOnboarding();
        }
        if (sessionStorage.getItem("tf_admin") === "1") setIsAdmin(true);
      }
    } catch (e) {}
  }, []);
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
  const [savingsEvents, setSavingsEvents] = useState([]);
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
  const [trackerExpandedId, setTrackerExpandedId] = useState(null);
  const [shoppingItems, setShoppingItems] = useState([]);
  const [newShoppingItem, setNewShoppingItem] = useState("");
  const [newShoppingQty, setNewShoppingQty] = useState("count");
  const [newShoppingQtyNum, setNewShoppingQtyNum] = useState("1");
  const [showLabelScanner, setShowLabelScanner] = useState(false);
  const [labelItem, setLabelItem] = useState(null);
  const [labelScanning, setLabelScanning] = useState(false);
  const [labelError, setLabelError] = useState("");
  const [labelScanCount, setLabelScanCount] = useState(0);
  const [labelLastItem, setLabelLastItem] = useState("");
  const [labelScanMode, setLabelScanMode] = useState(null);
  const [labelScanKey, setLabelScanKey] = useState(0);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [storeDiscountItem, setStoreDiscountItem] = useState(null);
  const [quickAddName, setQuickAddName] = useState("");
  const [quickAddDate, setQuickAddDate] = useState("");
  const [quickAddQty, setQuickAddQty] = useState("");
  const [pendingDateItems, setPendingDateItems] = useState([]);
  const [pendingDateIndex, setPendingDateIndex] = useState(0);
  const [showPendingDateIntro, setShowPendingDateIntro] = useState(false);
  const pendingDateIndexRef = React.useRef(pendingDateIndex);
  const pendingDateItemsRef = React.useRef(pendingDateItems);
  pendingDateIndexRef.current = pendingDateIndex;
  pendingDateItemsRef.current = pendingDateItems;
  const [pendingPickedDate, setPendingPickedDate] = useState("");
  const pendingPickedDateRef = React.useRef("");
  pendingPickedDateRef.current = pendingPickedDate;
  const [pendingVoiceListening, setPendingVoiceListening] = useState(false);
  const [pendingVoiceError, setPendingVoiceError] = useState("");
  const pendingVoiceRecognitionRef = React.useRef(null);
  /** Spurious empty change on <input type="date"> when value is set from voice — ignore once. */
  const suppressNextEmptyPendingDateOnChangeRef = React.useRef(false);
  /** Ignore the next date onChange when it only echoes programmatic set from voice. */
  const ignoreNextPendingDateInputOnChangeRef = React.useRef(false);
  /** Voice "Next" schedules startPendingVoice itself; useEffect skips its own timer to avoid double-start. */
  const pendingVoiceRestartFromNextRef = React.useRef(false);
  /** InvalidStateError retry from tryStart — cleared when overlay unmounts or a new session starts. */
  const pendingVoiceRetryTimeoutRef = React.useRef(null);
  /** Safari: auto-start failed — first tap on date or mic must start recognition (user gesture). */
  const pendingMicNeedsGestureRef = React.useRef(false);
  /** User saved/skipped or overlay unmounted — stop onend restart loops. */
  const pendingVoiceUserStopRef = React.useRef(false);
  /** Debounced restart after recognition session ends (Safari/Chrome often stop after a beat). */
  const pendingVoiceOnEndRestartTimeoutRef = React.useRef(null);
  const MAX_PENDING_VOICE_NETWORK_RETRIES = 3;
  const MAX_PENDING_VOICE_END_RESTARTS = 15;
  /** Pending overlay: date chosen (voice/calendar); waiting for Next/Done via voice. */
  const [pendingAwaitNextOrDone, setPendingAwaitNextOrDone] = useState(false);
  const [pendingTypedDate, setPendingTypedDate] = useState("");
  const pendingDateInputRef = React.useRef(null);
  const pendingVoiceListenUiTimeoutRef = React.useRef(null);
  /** Pending queue: item ids we already applied conservative Produce default date for (cleared when queue empties). */
  const pendingProduceDefaultedRef = React.useRef(new Set());
  const [quickAddCategory, setQuickAddCategory] = useState("Other");
  const [quickAddLocation, setQuickAddLocation] = useState("Fridge");
  const quickAddFoodOptions = useMemo(() => {
    return [...FOOD_DB].sort((a, b) => {
      const an = lang === "es" && FOOD_ES[a.name] ? FOOD_ES[a.name] : a.name;
      const bn = lang === "es" && FOOD_ES[b.name] ? FOOD_ES[b.name] : b.name;
      return an.localeCompare(bn, lang === "es" ? "es" : "en");
    });
  }, [lang]);
  const [meals, setMeals] = useState({});
  const [showMealPicker, setShowMealPicker] = useState(false);
  const [mealPickerDay, setMealPickerDay] = useState("");
  const [mealPickerSlot, setMealPickerSlot] = useState("");
  const [mealPickerSearch, setMealPickerSearch] = useState("");
  const [aiPlanLoading, setAiPlanLoading] = useState(false);
  const activeDietaryProfile = { household: [], members: [], combinedTags: [] };
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
  const [showGroceryScan, setShowGroceryScan] = useState(false);
  const [showOpenedDropdown, setShowOpenedDropdown] = useState(false);
  const voiceCmdRef = React.useRef(null);
  const voiceFeedbackTimer = React.useRef(null);
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
  const [usedPortionItem, setUsedPortionItem] = useState(null);
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

  const playBeep = (freq = 880, dur = 120, vol = 0.25) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur / 1000);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + dur / 1000);
      osc.onended = () => ctx.close();
    } catch(e) {}
  };

  const speak = (text) => speakWithVoice(text, { lang: speechLocale(lang) });

  const mapScanApiItemToPendingRow = (it) => {
    const locRaw = it.location;
    const ok = locRaw === "Fridge" || locRaw === "Freezer" || locRaw === "Pantry";
    const location = ok ? locRaw : "Fridge";
    const fin = finalizeProduceScannerItem({
      category: it.category || "Other",
      daysAfterOpening: it.daysAfterOpening,
      openedTip: it.openedTip,
      daysSealed: it.daysSealed,
      inGeneralDaysMin: it.inGeneralDaysMin,
      inGeneralDaysMax: it.inGeneralDaysMax,
      storageTip: it.storageTip,
    });
    return {
      id: crypto.randomUUID(),
      name: it.name || "Unknown",
      brand: it.brand || null,
      category: fin.category || "Other",
      quantity: "1",
      location,
      freezeByDate: location === "Freezer" ? (it.freezeBy || "") : "",
      useByDate: "",
      openDate: "",
      daysAfterOpening: fin.daysAfterOpening ?? null,
      storageTip: fin.storageTip || "",
      openedTip: fin.openedTip || "",
      daysSealed: fin.daysSealed ?? null,
      inGeneralDaysMin: fin.inGeneralDaysMin ?? null,
      inGeneralDaysMax: fin.inGeneralDaysMax ?? null,
      unitPrice: parseItemPrice(it),
      purchaseDate: (() => {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      })(),
      wasteLogged: false,
    };
  };

  const enqueuePendingRows = (newRows) => {
    if (!newRows || !newRows.length) return;
    playBeep(880, 120);
    setPendingDateItems((prev) => {
      if (prev.length === 0) {
        window.setTimeout(() => {
          setPendingDateIndex(0);
          setPendingPickedDate("");
          setPendingAwaitNextOrDone(false);
          setShowPendingDateIntro(true);
        }, 0);
      }
      return [...prev, ...newRows];
    });
  };

  const speakPendingIntro = (text, onDone) => {
    speakWithVoice(text, { lang: speechLocale(lang), onDone, rate: 0.93 });
  };

  const dismissPendingDateIntro = () => {
    setShowPendingDateIntro(false);
    try { window.speechSynthesis?.cancel(); } catch (e) {}
  };

  const itemStorageTip = (item, isEs) =>
    item.storageTip
    || (item.location === "Freezer"
      ? (isEs ? "Mantener congelado" : "Keep frozen")
      : item.location === "Pantry"
        ? (isEs ? "Lugar fresco y seco" : "Store in cool, dry place")
        : (isEs ? "Mantener refrigerado" : "Keep refrigerated at all times"));

  const itemDisplayName = (item) => (item.brand ? `${item.brand} ${item.name}` : item.name);

  const toggleTrackerExpand = (id) => {
    setTrackerExpandedId((prev) => (prev === id ? null : id));
  };

  const [voiceListening, setVoiceListening] = useState("");
  const [voiceError, setVoiceError] = useState("");
  const [showReceiptScanner, setShowReceiptScanner] = useState(false);
  const [receiptScanning, setReceiptScanning] = useState(false);
  const [receiptError, setReceiptError] = useState("");
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
    setSavingsEvents(loadSavingsEvents());
    setCommunity(loadCommunity());
    setShoppingItems(loadShopping());
    setMeals(loadMeals());
    let savedName = null; try { savedName = localStorage.getItem(USERNAME_KEY); } catch(e) {}
    if (savedName) setUsername(savedName);
  }, []);
  useEffect(() => { saveItems(trackedItems); }, [trackedItems]);
  useEffect(() => { saveSavingsEvents(savingsEvents); }, [savingsEvents]);
  useEffect(() => { saveCommunity(community); }, [community]);
  useEffect(() => { saveShopping(shoppingItems); }, [shoppingItems]);
  useEffect(() => { saveMeals(meals); }, [meals]);
  useEffect(() => { try { localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(savedRecipes)); } catch(e) {} }, [savedRecipes]);
  useEffect(() => { try { localStorage.setItem("tf_favorite_recipes", JSON.stringify(favoriteRecipes)); } catch(e) {} }, [favoriteRecipes]);
  useEffect(() => { try { localStorage.setItem(RECIPE_MODE_KEY, recipeMode); } catch(e) {} }, [recipeMode]);
  useEffect(() => { try { window.scrollTo(0, 0); } catch(e) {} }, [activeTab]);

  const openReceiptFromOnboarding = () => {
    setGuidedPaused(true);
    setActiveTab("tracker");
    setShowReceiptScanner(true);
  };
  const coachTip = onboardingFlow === FLOWS.coach && !coachDismissed
    ? getCoachTip(lang, { trackedCount: trackedItems.length, pendingDates: pendingDateItems.length, coachStep })
    : null;
  const handleCoachAction = () => {
    if (!coachTip) return;
    if (coachTip.id === "receipt") openReceiptFromOnboarding();
    else if (coachTip.id === "dates") {
      if (pendingDateItems.length === 0) openReceiptFromOnboarding();
    } else if (coachTip.id === "kitchen") {
      advanceCoachStep(3);
      setActiveTab("home");
      try { homeTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e) {}
    } else if (coachTip.id === "recipes") {
      advanceCoachStep(4);
      setActiveTab("recipes");
    } else if (coachTip.id === "done") dismissCoachFlow();
  };
  useEffect(() => {
    if (onboardingFlow !== FLOWS.coach || coachDismissed) return;
    if (pendingDateItems.length === 0 && coachStep === 1 && trackedItems.length > 0) {
      advanceCoachStep(2);
    }
  }, [pendingDateItems.length, trackedItems.length, coachStep, onboardingFlow, coachDismissed]);
  const showGuidedWizard = onboardingFlow === FLOWS.guided && !guidedComplete && !guidedPaused && isUnlocked && welcomeStep === 0;
  useEffect(() => {
    if (showReceiptScanner || !guidedPaused || onboardingFlow !== FLOWS.guided || guidedComplete) return;
    setGuidedPaused(false);
    if (pendingDateItems.length > 0 || trackedItems.length > 0) {
      setGuidedStep((s) => Math.max(s, 2));
    }
  }, [showReceiptScanner, guidedPaused, onboardingFlow, guidedComplete, pendingDateItems.length, trackedItems.length]);

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
      if (!res.ok || data.error) {
        window.alert(formatAiError(data.error, lang));
        return;
      }
      if (data.plan) setMeals(data.plan);
    } catch (err) {
      window.alert(formatAiError(err.message, lang));
    } finally {
      setAiPlanLoading(false);
    }
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
  const ALLERGEN_KEYWORDS = {
    "Nut-Free":    ["nut","peanut","almond","cashew","walnut","pecan","pistachio","hazelnut","macadamia"],
    "Dairy-Free":  ["milk","cheese","butter","cream","yogurt","dairy","whey","lactose","brie","cheddar","mozzarella","parmesan"],
    "Gluten-Free": ["wheat","bread","flour","gluten","pasta","noodle","cereal","barley","rye","cracker","biscuit","bagel","pretzel"],
    "Vegan":       ["meat","chicken","beef","pork","fish","salmon","tuna","shrimp","egg","honey","gelatin","lard"],
    "Vegetarian":  ["meat","chicken","beef","pork","fish","salmon","tuna","shrimp","turkey","bacon","ham","sausage"],
    "Low Sodium":  ["salt","soy sauce","pickle","chip","pretzel","jerky","anchovy","capers"],
    "Low Sugar":   ["candy","sugar","syrup","soda","juice","cookie","cake","chocolate","jam","jelly"],
  };

  const itemsWithCountdown = useMemo(() => trackedItems.map((it) => {
    const daysLeft = daysLeftFromUseByDate(it.useByDate);
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

  const monthSavings = useMemo(
    () => computeMonthStats(savingsEvents, currentMonthKey()),
    [savingsEvents]
  );

  useEffect(() => {
    const expiredWithPrice = trackedItems.filter((item) => {
      if (!item.useByDate || item.wasteLogged) return false;
      if (!itemIsPastDate({ ...item, daysLeft: daysLeftFromUseByDate(item.useByDate) })) return false;
      return !!itemPrice(item);
    });
    if (!expiredWithPrice.length) return;
    setSavingsEvents((prev) =>
      expiredWithPrice.reduce((acc, item) => {
        const event = createSavingsEvent({
          itemId: item.id,
          itemName: item.name,
          type: "wasted",
          amount: itemPrice(item),
        });
        return appendSavingsEvent(acc, event);
      }, prev)
    );
    setTrackedItems((prev) =>
      prev.map((it) =>
        expiredWithPrice.some((e) => e.id === it.id) ? { ...it, wasteLogged: true } : it
      )
    );
  }, [trackedItems]);

  const registerDiscountItems = useMemo(
    () => itemsWithCountdown.filter(isRegisterDiscountEligible),
    [itemsWithCountdown]
  );

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
    setTrackedItems(prev => prev.map(it => it.id === item.id ? { ...it, openDate: dateStr, openUseBy, ...(openUseBy ? { useByDate: openUseBy } : {}) } : it));
    setOpenedConfirm({ item: { ...item, openDate: dateStr, openUseBy }, openDate: dateStr, openUseBy, shelfDays });
    setShowOpenedDateEdit(false);
  };

  const finalizeUseTodayItem = (item, fraction) => {
    if (!item) return;
    const price = itemPrice(item);
    const past = itemIsPastDate({ ...item, daysLeft: daysLeftFromUseByDate(item.useByDate) });
    if (price && !past && fraction > 0) {
      const { used, wasted } = splitPortionAmounts(price, fraction);
      setSavingsEvents((prev) => {
        let next = prev;
        if (used > 0) {
          next = appendSavingsEvent(
            next,
            createSavingsEvent({
              itemId: item.id,
              itemName: item.name,
              type: "used",
              amount: used,
              portionUsed: fraction,
            })
          );
        }
        if (wasted > 0 && fraction < 1) {
          next = appendSavingsEvent(
            next,
            createSavingsEvent({
              itemId: item.id,
              itemName: item.name,
              type: "wasted",
              amount: wasted,
              portionWasted: 1 - fraction,
            })
          );
        }
        return next;
      });
    }
    addToShoppingIfMissing(item, "used");
    setTrackedItems((prev) => prev.filter((it) => it.id !== item.id));
    setUsedPortionItem(null);
  };

  const handleUseTodayItem = (id) => {
    const item = trackedItems.find((it) => it.id === id);
    if (!item) return;
    const price = itemPrice(item);
    const past = itemIsPastDate({ ...item, daysLeft: daysLeftFromUseByDate(item.useByDate) });
    if (price && !past) {
      setUsedPortionItem(item);
      return;
    }
    finalizeUseTodayItem(item, 1);
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
        setQuickAddName(name);
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

  /** Calendar date in local timezone as YYYY-MM-DD (never use toISOString() for this — it is UTC and shifts the day). */
  const formatLocalYYYYMMDD = (d) => {
    if (!d || isNaN(d.getTime())) return null;
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const isValidYYYYMMDD = (s) => {
    if (!s || typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
    const [y, mo, da] = s.split("-").map((n) => parseInt(n, 10));
    const dt = new Date(y, mo - 1, da);
    return dt.getFullYear() === y && dt.getMonth() === mo - 1 && dt.getDate() === da;
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
    const out = formatLocalYYYYMMDD(new Date(year, month-1, day));
    return isValidYYYYMMDD(out) ? out : null;
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
    speakWithVoice(text, { lang: speechLocale(lang), onDone, rate: 0.93 });
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
      if (!res.ok || data.error) { window.alert(formatAiError(data.error, lang)); setRecipesLoading(false); return; }
      setRecipeSuggestions(data.recipes || []);
      setRecipesGenerated(true);
    } catch (e) { window.alert(formatAiError(e.message, lang)); }
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
    try {
      const { base64, mimeType } = await compressImageFile(file);
      const res = await fetch("/api/scan-receipt", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image: base64, mimeType }) });
      const data = await res.json();
      if (!res.ok || data.error) {
        setReceiptError(formatAiError(data.error, lang));
        setReceiptScanning(false);
        return;
      }
      const list = data.items || [];
      if (!list.length) {
        setReceiptError(lang === "es" ? "No se encontraron productos en el recibo." : "No items found on this receipt.");
        setReceiptScanning(false);
        return;
      }
      const rows = list.map(mapScanApiItemToPendingRow);
      enqueuePendingRows(rows);
      setReceiptScanning(false);
      setReceiptError("");
      queueMicrotask(() => setShowReceiptScanner(false));
    } catch (err) {
      setReceiptError(formatAiError(err.message, lang));
      setReceiptScanning(false);
    }
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
      setBarcodeItem({ ...finalizeProduceScannerItem({ ...data.item }), barcode });
      setBarcodeScanning(false);
} catch (err) { setBarcodeError("Scan failed. Please try again."); setBarcodeScanning(false); setBarcodeDetected(""); }
  };

  const handleAddBarcodeItem = () => {
    if (!barcodeItem) return;
    const loc = barcodeLocation || barcodeItem.location;
    const _td = new Date(); const today = `${_td.getFullYear()}-${String(_td.getMonth()+1).padStart(2,'0')}-${String(_td.getDate()).padStart(2,'0')}`;
    const itemName = barcodeItem.name;
    setTrackedItems((prev) => [...prev, { id: crypto.randomUUID(), name: barcodeItem.name, category: barcodeItem.category, location: loc, quantity: "", useByDate: barcodeUseBy, openDate: "", freezeBy: barcodeFreezeBy, barcode: barcodeItem.barcode || "", daysAfterOpening: barcodeItem.daysAfterOpening || null, daysSealed: barcodeItem.daysSealed ?? null, inGeneralDaysMin: barcodeItem.inGeneralDaysMin ?? null, inGeneralDaysMax: barcodeItem.inGeneralDaysMax ?? null, storageTip: barcodeItem.storageTip || "", openedTip: barcodeItem.openedTip || "" }]);
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
    const now = new Date();
    // Month + day + year (e.g. "February 20 2026")
    const match = t.match(/([a-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?\s*,?\s*(\d{4})/);
    if (match) {
      const month = months[match[1]];
      if (month) {
        const d = new Date(parseInt(match[3], 10), month - 1, parseInt(match[2], 10));
        const out = formatLocalYYYYMMDD(d);
        if (isValidYYYYMMDD(out)) return out;
      }
    }
    // Month + day without year (e.g. "February 20" or "March 5th") — roll to next year if already past
    const matchNoYear = t.match(/([a-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?/);
    if (matchNoYear) {
      const month = months[matchNoYear[1]];
      if (month) {
        let year = curYear;
        let d = new Date(year, month - 1, parseInt(matchNoYear[2], 10));
        if (d < new Date(now.getFullYear(), now.getMonth(), now.getDate())) year++;
        d = new Date(year, month - 1, parseInt(matchNoYear[2], 10));
        const out = formatLocalYYYYMMDD(d);
        if (isValidYYYYMMDD(out)) return out;
      }
    }
    // ISO-like YYYY-MM-DD spoken or typed in transcript
    const isoInText = t.match(/\b(\d{4})-(\d{2})-(\d{2})\b/);
    if (isoInText) {
      const cand = `${isoInText[1]}-${isoInText[2]}-${isoInText[3]}`;
      if (isValidYYYYMMDD(cand)) return cand;
    }
    // Numeric: MM/DD/YYYY or MM-DD-YYYY (US-style, matches prior behavior)
    const match2 = t.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
    if (match2) {
      const yr = match2[3].length === 2 ? 2000 + parseInt(match2[3], 10) : parseInt(match2[3], 10);
      const d = new Date(yr, parseInt(match2[1], 10) - 1, parseInt(match2[2], 10));
      const out = formatLocalYYYYMMDD(d);
      if (isValidYYYYMMDD(out)) return out;
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

  const applyQuickAddFoodSelection = (f) => {
    if (!f) return;
    setQuickAddName(f.name);
    setQuickAddCategory(f.category || "Other");
    setQuickAddLocation(f.location || "Fridge");
    if (f.daysSealed) {
      const d = new Date();
      d.setDate(d.getDate() + f.daysSealed);
      setQuickAddDate(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
    }
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
    const merged = finalizeProduceScannerItem({ ...foodInfo, category: cat });
    const item = { id: crypto.randomUUID(), name: quickAddName, category: cat, location: loc, quantity: "", useByDate: quickAddDate, openDate: "", daysAfterOpening: merged.daysAfterOpening ?? null, storageTip: merged.storageTip || "", openedTip: merged.openedTip || "", daysSealed: merged.daysSealed ?? null, inGeneralDaysMin: merged.inGeneralDaysMin ?? null, inGeneralDaysMax: merged.inGeneralDaysMax ?? null };
    setTrackedItems(prev => [item, ...prev]);
    setShowQuickAdd(false);
    setQuickAddName(""); setQuickAddDate(""); setQuickAddQty(""); setQuickAddCategory("Other"); setQuickAddLocation("Fridge");
  };

  const handleScanLabel = async (file) => {
    setLabelScanning(true);
    setLabelError("");
    setLabelItem(null);
    try {
      const { base64, mimeType } = await compressImageFile(file);
      const res = await fetch("/api/scan-label", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ imageData: base64, mediaType }) });
      const data = await res.json();
      if (!res.ok || data.error) {
        setLabelError(formatAiError(data.error, lang));
        setLabelScanning(false);
        return;
      }
      const item = data.item;
      setLabelItem(item);
      if (!item.dateFound) {
        setLabelError("📅 No expiration date visible. Flip package over and scan the other side!");
      }
      setLabelScanning(false);
    } catch (err) {
      setLabelError(formatAiError(err.message, lang));
      setLabelScanning(false);
    }
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
      daysSealed: labelItem.daysSealed ?? null,
      inGeneralDaysMin: labelItem.inGeneralDaysMin ?? null,
      inGeneralDaysMax: labelItem.inGeneralDaysMax ?? null,
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

  const savePendingItemWithDate = (dateStr, atIndex) => {
    setPendingAwaitNextOrDone(false);
    const idx = atIndex !== undefined ? atIndex : pendingDateIndexRef.current;
    const items = pendingDateItemsRef.current;
    const item = items[idx];
    if (!item) return;
    setTrackedItems((prev) => [{ ...item, useByDate: dateStr || "" }, ...prev]);
    const next = idx + 1;
    if (next >= items.length) {
      setPendingDateItems([]);
      setPendingDateIndex(0);
      setPendingPickedDate("");
    } else {
      setPendingDateIndex(next);
      setPendingPickedDate("");
    }
  };

  const handlePendingSkipDate = () => {
    setPendingAwaitNextOrDone(false);
    const idx = pendingDateIndexRef.current;
    const items = pendingDateItemsRef.current;
    const item = items[idx];
    if (!item) return;
    setTrackedItems((prev) => [{ ...item, useByDate: "" }, ...prev]);
    const next = idx + 1;
    if (next >= items.length) {
      setPendingDateItems([]);
      setPendingDateIndex(0);
      setPendingPickedDate("");
    } else {
      setPendingDateIndex(next);
      setPendingPickedDate("");
    }
  };

  const abortPendingVoiceRecognition = () => {
    pendingVoiceUserStopRef.current = true;
    if (pendingVoiceOnEndRestartTimeoutRef.current) {
      clearTimeout(pendingVoiceOnEndRestartTimeoutRef.current);
      pendingVoiceOnEndRestartTimeoutRef.current = null;
    }
    if (pendingVoiceRetryTimeoutRef.current) {
      clearTimeout(pendingVoiceRetryTimeoutRef.current);
      pendingVoiceRetryTimeoutRef.current = null;
    }
    if (pendingVoiceRecognitionRef.current) {
      try {
        pendingVoiceRecognitionRef.current.onend = null;
        pendingVoiceRecognitionRef.current.abort();
      } catch (e) {}
      pendingVoiceRecognitionRef.current = null;
    }
    setPendingVoiceListening(false);
    if (pendingVoiceListenUiTimeoutRef.current) {
      clearTimeout(pendingVoiceListenUiTimeoutRef.current);
      pendingVoiceListenUiTimeoutRef.current = null;
    }
    suppressNextEmptyPendingDateOnChangeRef.current = false;
    ignoreNextPendingDateInputOnChangeRef.current = false;
  };

  const clearPendingVoiceListenUi = () => {
    if (pendingVoiceListenUiTimeoutRef.current) {
      clearTimeout(pendingVoiceListenUiTimeoutRef.current);
      pendingVoiceListenUiTimeoutRef.current = null;
    }
    setPendingVoiceListening(false);
  };

  const showPendingVoiceListeningNow = () => {
    if (pendingVoiceListenUiTimeoutRef.current) {
      clearTimeout(pendingVoiceListenUiTimeoutRef.current);
      pendingVoiceListenUiTimeoutRef.current = null;
    }
    setPendingVoiceListening(true);
  };

  /** Avoid "Listening" flash when the browser kills the session immediately (Safari / network). */
  const markPendingVoiceListening = () => {
    if (pendingVoiceListenUiTimeoutRef.current) {
      clearTimeout(pendingVoiceListenUiTimeoutRef.current);
    }
    pendingVoiceListenUiTimeoutRef.current = window.setTimeout(() => {
      pendingVoiceListenUiTimeoutRef.current = null;
      if (pendingVoiceRecognitionRef.current) setPendingVoiceListening(true);
    }, 750);
  };

  const applyPendingDateValue = (v) => {
    if (!v && suppressNextEmptyPendingDateOnChangeRef.current) {
      suppressNextEmptyPendingDateOnChangeRef.current = false;
      return;
    }
    suppressNextEmptyPendingDateOnChangeRef.current = false;
    if (v && !isValidYYYYMMDD(v)) return;
    if (ignoreNextPendingDateInputOnChangeRef.current) {
      ignoreNextPendingDateInputOnChangeRef.current = false;
      if (v === pendingPickedDateRef.current) return;
    }
    pendingPickedDateRef.current = v;
    setPendingPickedDate(v);
    if (!v) return;
    setPendingAwaitNextOrDone(true);
    setPendingVoiceError("");
  };

  const finishPendingQueueFromIndex = (dateStr, commitIdx) => {
    setPendingAwaitNextOrDone(false);
    abortPendingVoiceRecognition();
    const itemsSnap = pendingDateItemsRef.current;
    const cur = itemsSnap[commitIdx];
    if (cur) {
      setTrackedItems((prev) => [{ ...cur, useByDate: dateStr }, ...prev]);
    }
    const rest = itemsSnap.slice(commitIdx + 1);
    if (rest.length) {
      setTrackedItems((prev) => [...rest.map((it) => ({ ...it, useByDate: it.useByDate || "" })), ...prev]);
    }
    setPendingDateItems([]);
    setPendingDateIndex(0);
    setPendingPickedDate("");
  };

  const handlePendingSaveAndNext = () => {
    const dateStr = pendingPickedDateRef.current || pendingPickedDate;
    if (!isValidYYYYMMDD(dateStr)) {
      setPendingVoiceError(lang === "es" ? "Elige una fecha en el calendario." : "Pick a date on the calendar first.");
      return;
    }
    setPendingVoiceError("");
    abortPendingVoiceRecognition();
    const commitIdx = pendingDateIndexRef.current;
    savePendingItemWithDate(dateStr, commitIdx);
    playBeep(660, 120);
  };

  const handlePendingSaveAndFinish = () => {
    const dateStr = pendingPickedDateRef.current || pendingPickedDate;
    if (!isValidYYYYMMDD(dateStr)) {
      setPendingVoiceError(lang === "es" ? "Elige una fecha en el calendario." : "Pick a date on the calendar first.");
      return;
    }
    setPendingVoiceError("");
    finishPendingQueueFromIndex(dateStr, pendingDateIndexRef.current);
    playBeep(880, 120);
    setTimeout(() => playBeep(660, 150), 220);
    setTimeout(() => playBeep(660, 150), 470);
  };

  const handlePendingApplyTypedDate = () => {
    const parsed = parseSpokenDate(pendingTypedDate.trim());
    if (!parsed) {
      setPendingVoiceError(t("pendingDateTypeInvalid"));
      return;
    }
    setPendingVoiceError("");
    abortPendingVoiceRecognition();
    pendingPickedDateRef.current = parsed;
    setPendingPickedDate(parsed);
    setPendingAwaitNextOrDone(true);
    playBeep(880, 120);
  };

  /** Normalize speech transcripts so commands match despite periods, spaces, smart quotes, etc. */
  const normalizePendingVoiceCommand = (s) => {
    if (!s || typeof s !== "string") return "";
    let t = s.normalize("NFKC").trim().toLowerCase();
    t = t.replace(/[\u2018\u2019\u201C\u201D\u2032\u2035]/g, "'");
    t = t.replace(/['"]/g, "");
    t = t.replace(/\u00A0/g, " ");
    t = t.replace(/\s+/g, " ").trim();
    for (let i = 0; i < 4 && /^[^a-z0-9]+/i.test(t); i++) t = t.replace(/^[^a-z0-9]+/gi, "").trim();
    for (let i = 0; i < 4 && /[^a-z0-9]+$/i.test(t); i++) t = t.replace(/[^a-z0-9]+$/gi, "").trim();
    return t;
  };

  const pendingVoiceIsNextCommand = (norm) => {
    if (!norm) return false;
    // Common STT confusions for "Next" (plus trailing "please" / filler).
    const CORE = "(?:next|neck|text|nets|nect|nex|nextt|mext|nek|nett)";
    if (new RegExp(`^${CORE}(?:\\s+please)?$`).test(norm)) return true;
    if (new RegExp(`\\b${CORE}(?:\\s+please)?$`).test(norm)) return true;
    return false;
  };

  const pendingVoiceIsDoneCommand = (norm) => {
    if (!norm) return false;
    const compact = norm.replace(/\s+/g, " ");
    if (compact === "done" || compact === "done please") return true;
    if (/^done(\s+please)?$/.test(compact)) return true;
    if (/^(i'?m|i am)\s+done(\s+please)?$/.test(compact)) return true;
    if (/\bdone(\s+please)?$/.test(compact)) return true;
    if (/\b(all\s+)?done$/.test(compact) || /^finished(\s+please)?$/.test(compact) || /\bfinished$/.test(compact)) return true;
    return false;
  };

  /** iOS Safari WebKit: let the previous recognition fully release the mic before starting the next item (helps after "Next"). */
  const isIOSWebKitBrowser = () =>
    typeof navigator !== "undefined" &&
    /iPhone|iPad|iPod/i.test(navigator.userAgent) &&
    /WebKit/i.test(navigator.userAgent) &&
    !/(CriOS|FxiOS|EdgiOS|OPiOS)/i.test(navigator.userAgent);

  const isLocalDevHost = () => {
    if (typeof window === "undefined") return false;
    const h = window.location.hostname;
    return h === "localhost" || h === "127.0.0.1" || h === "[::1]";
  };

  const pendingVoiceNetworkErrorMsg = () =>
    isLocalDevHost() ? t("pendingVoiceLocalhost") : t("pendingVoiceNetwork");

  const pendingVoiceResumeAfterNextMs = () => (isIOSWebKitBrowser() ? 480 : 100);

  const schedulePendingVoiceOnEndRestart = (recog, session, currentIdx, tryStart) => {
    if (session.fatalError || pendingVoiceUserStopRef.current) {
      clearPendingVoiceListenUi();
      return;
    }
    session.endRestarts += 1;
    if (session.endRestarts > MAX_PENDING_VOICE_END_RESTARTS) {
      session.fatalError = true;
      setPendingVoiceError(pendingVoiceNetworkErrorMsg());
      clearPendingVoiceListenUi();
      return;
    }
    if (pendingVoiceOnEndRestartTimeoutRef.current) clearTimeout(pendingVoiceOnEndRestartTimeoutRef.current);
    pendingVoiceOnEndRestartTimeoutRef.current = window.setTimeout(() => {
      pendingVoiceOnEndRestartTimeoutRef.current = null;
      if (pendingVoiceUserStopRef.current || session.fatalError) return;
      if (pendingDateIndexRef.current !== currentIdx) return;
      if (pendingVoiceRecognitionRef.current && pendingVoiceRecognitionRef.current !== recog) return;
      tryStart(0);
    }, isIOSWebKitBrowser() ? 280 : 150);
  };

  const pendingVoiceNetworkRetry = (recog, session, tryStart) => {
    session.networkRetries += 1;
    if (session.networkRetries >= MAX_PENDING_VOICE_NETWORK_RETRIES) return false;
    if (pendingVoiceRetryTimeoutRef.current) clearTimeout(pendingVoiceRetryTimeoutRef.current);
    pendingVoiceRetryTimeoutRef.current = window.setTimeout(() => {
      pendingVoiceRetryTimeoutRef.current = null;
      if (pendingVoiceUserStopRef.current || session.fatalError) return;
      if (pendingVoiceRecognitionRef.current !== recog) return;
      tryStart(0);
    }, 350 + session.networkRetries * 450);
    return true;
  };

  /** After a date is set (voice or calendar), listen only for Next/Done without an extra tap (critical on iPhone). */
  const startPendingVoiceNextDone = (idx) => {
    const currentIdx = typeof idx === "number" ? idx : pendingDateIndexRef.current;
    if (typeof window === "undefined") return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    pendingVoiceUserStopRef.current = false;
    try { window.speechSynthesis?.cancel(); } catch (e) {}
    setPendingVoiceError("");
    setPendingAwaitNextOrDone(true);
    if (pendingVoiceOnEndRestartTimeoutRef.current) {
      clearTimeout(pendingVoiceOnEndRestartTimeoutRef.current);
      pendingVoiceOnEndRestartTimeoutRef.current = null;
    }
    if (pendingVoiceRetryTimeoutRef.current) {
      clearTimeout(pendingVoiceRetryTimeoutRef.current);
      pendingVoiceRetryTimeoutRef.current = null;
    }
    if (pendingVoiceRecognitionRef.current) {
      try {
        pendingVoiceRecognitionRef.current.onend = null;
        pendingVoiceRecognitionRef.current.abort();
      } catch (e) {}
      pendingVoiceRecognitionRef.current = null;
    }

    const recog = new SR();
    recog.lang = lang === "es" ? "es-MX" : "en-US";
    recog.interimResults = true;
    recog.continuous = !isIOSWebKitBrowser();
    recog.maxAlternatives = 1;
    pendingVoiceRecognitionRef.current = recog;
    const session = { fatalError: false, endRestarts: 0, networkRetries: 0 };
    let handled = false;

    const runNextDone = (isNextCmd, isDoneCmd) => {
      if (handled) return;
      handled = true;
      try { recog.stop(); } catch (err) {}
      clearPendingVoiceListenUi();
      suppressNextEmptyPendingDateOnChangeRef.current = false;
      ignoreNextPendingDateInputOnChangeRef.current = false;
      const commitIdx = currentIdx;
      const dateStr = pendingPickedDateRef.current || "";
      if (isNextCmd) {
        const nextIdx = commitIdx + 1;
        const queueHasMore = nextIdx < pendingDateItemsRef.current.length;
        if (queueHasMore) pendingVoiceRestartFromNextRef.current = true;
        savePendingItemWithDate(dateStr, commitIdx);
        playBeep(660, 120);
        if (queueHasMore) {
          setTimeout(() => {
            startPendingVoice(nextIdx);
          }, pendingVoiceResumeAfterNextMs());
        }
      } else {
        finishPendingQueueFromIndex(dateStr, commitIdx);
        playBeep(880, 120);
        setTimeout(() => playBeep(660, 150), 220);
        setTimeout(() => playBeep(660, 150), 470);
      }
    };

    recog.onresult = (e) => {
      if (handled) return;
      let fullRaw = "";
      for (let i = 0; i < e.results.length; i++) {
        fullRaw += e.results[i][0].transcript;
      }
      const raw = fullRaw.trim();
      if (raw) showPendingVoiceListeningNow();
      const normCmd = normalizePendingVoiceCommand(raw);
      const isN = pendingVoiceIsNextCommand(normCmd);
      const isD = pendingVoiceIsDoneCommand(normCmd);
      if (isN || isD) runNextDone(isN, isD);
    };

    recog.onerror = (ev) => {
      const code = ev && ev.error ? ev.error : "";
      if (code === "aborted") return;
      if (!handled) {
        if (code === "network") {
          if (isLocalDevHost()) {
            session.fatalError = true;
            setPendingVoiceError(pendingVoiceNetworkErrorMsg());
            clearPendingVoiceListenUi();
            return;
          }
          if (pendingVoiceNetworkRetry(recog, session, tryStart)) return;
          session.fatalError = true;
        } else if (code === "not-allowed" || code === "audio-capture") {
          pendingMicNeedsGestureRef.current = true;
          session.fatalError = true;
        } else if (code !== "no-speech") {
          session.fatalError = true;
        }
        if (session.fatalError) {
          const msg =
            code === "not-allowed"
              ? (lang === "es" ? "Permite el micrófono para este sitio (icono de candado)." : "Allow microphone access for this site (lock icon in the address bar).")
              : code === "audio-capture"
                ? (lang === "es" ? "No se detectó micrófono. Conecta uno o revisa permisos." : "No microphone found. Plug one in or check permissions.")
                : code === "network"
                  ? pendingVoiceNetworkErrorMsg()
                  : code === "no-speech"
                    ? (lang === "es" ? "Di «Next» o «Done»." : 'Say "Next" or "Done".')
                    : (lang === "es" ? "Toca el mic o la fecha para reintentar (Safari)." : "Tap the mic or date field to try again (Safari).");
          setPendingVoiceError(msg);
          clearPendingVoiceListenUi();
        }
      }
    };

    recog.onstart = () => {
      pendingMicNeedsGestureRef.current = false;
      markPendingVoiceListening();
      setPendingVoiceError("");
    };

    recog.onend = () => {
      if (pendingVoiceRecognitionRef.current === recog) pendingVoiceRecognitionRef.current = null;
      if (handled || session.fatalError || pendingVoiceUserStopRef.current) {
        if (!handled) clearPendingVoiceListenUi();
        return;
      }
      schedulePendingVoiceOnEndRestart(recog, session, currentIdx, tryStart);
    };

    const tryStart = (attempt) => {
      pendingVoiceRecognitionRef.current = recog;
      try {
        recog.start();
      } catch (err) {
        const name = err && err.name;
        if (name === "InvalidStateError" && attempt < 4) {
          if (pendingVoiceRetryTimeoutRef.current) clearTimeout(pendingVoiceRetryTimeoutRef.current);
          pendingVoiceRetryTimeoutRef.current = window.setTimeout(() => {
            pendingVoiceRetryTimeoutRef.current = null;
            if (pendingVoiceRecognitionRef.current !== recog) return;
            tryStart(attempt + 1);
          }, 40 + attempt * 50);
          return;
        }
        clearPendingVoiceListenUi();
        pendingMicNeedsGestureRef.current = true;
        setPendingVoiceError(
          lang === "es"
            ? "Toca el micrófono para continuar (Safari)."
            : "Tap the mic button to continue (Safari)."
        );
      }
    };
    tryStart(0);
  };

  const startPendingVoice = (idx) => {
    const currentIdx = typeof idx === "number" ? idx : pendingDateIndexRef.current;
    const scheduleNextDoneAfterStop = { current: false };
    pendingVoiceUserStopRef.current = false;
    try { window.speechSynthesis?.cancel(); } catch (e) {}
    setPendingVoiceError("");
    if (pendingVoiceOnEndRestartTimeoutRef.current) {
      clearTimeout(pendingVoiceOnEndRestartTimeoutRef.current);
      pendingVoiceOnEndRestartTimeoutRef.current = null;
    }
    if (pendingVoiceRetryTimeoutRef.current) {
      clearTimeout(pendingVoiceRetryTimeoutRef.current);
      pendingVoiceRetryTimeoutRef.current = null;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setPendingVoiceError(lang === "es" ? "Voz no disponible en este dispositivo." : "Voice not supported on this device."); clearPendingVoiceListenUi(); return; }
    if (pendingVoiceRecognitionRef.current) {
      try { pendingVoiceRecognitionRef.current.onend = null; pendingVoiceRecognitionRef.current.abort(); } catch (e) {}
      pendingVoiceRecognitionRef.current = null;
    }
    const recog = new SR();
    recog.lang = lang === "es" ? "es-MX" : "en-US";
    recog.interimResults = true;
    recog.continuous = !isIOSWebKitBrowser();
    recog.maxAlternatives = 1;
    pendingVoiceRecognitionRef.current = recog;
    const session = { fatalError: false, endRestarts: 0, networkRetries: 0 };
    let dateParsed = false;
    let pendingVoiceHandled = false;
    recog.onresult = (e) => {
      if (pendingVoiceHandled) return;
      let fullRaw = "";
      for (let i = 0; i < e.results.length; i++) {
        fullRaw += e.results[i][0].transcript;
      }
      const raw = fullRaw.trim();
      if (raw) showPendingVoiceListeningNow();
      const lastSeg = e.results[e.results.length - 1];
      const utteranceFinal = lastSeg && lastSeg.isFinal;
      const normCmd = normalizePendingVoiceCommand(raw);
      const isNextCmd = pendingVoiceIsNextCommand(normCmd);
      const isDoneCmd = pendingVoiceIsDoneCommand(normCmd);

      if (isNextCmd || isDoneCmd) {
        pendingVoiceHandled = true;
        dateParsed = true;
        try { recog.stop(); } catch (err) {}
        clearPendingVoiceListenUi();
        suppressNextEmptyPendingDateOnChangeRef.current = false;
        ignoreNextPendingDateInputOnChangeRef.current = false;
        const commitIdx = currentIdx;
        const dateStr = pendingPickedDateRef.current || "";
        if (isNextCmd) {
          const nextIdx = commitIdx + 1;
          const queueHasMore = nextIdx < pendingDateItemsRef.current.length;
          if (queueHasMore) pendingVoiceRestartFromNextRef.current = true;
          savePendingItemWithDate(dateStr, commitIdx);
          playBeep(660, 120);
          if (queueHasMore) {
            setTimeout(() => {
              startPendingVoice(nextIdx);
            }, pendingVoiceResumeAfterNextMs());
          }
        } else {
          finishPendingQueueFromIndex(dateStr, commitIdx);
          playBeep(880, 120);
          setTimeout(() => playBeep(660, 150), 220);
          setTimeout(() => playBeep(660, 150), 470);
        }
        return;
      }

      if (!utteranceFinal) return;

      const parsed = parseSpokenDate(raw);
      if (parsed) {
        pendingVoiceHandled = true;
        dateParsed = true;
        scheduleNextDoneAfterStop.current = true;
        try { recog.stop(); } catch (err) {}
        clearPendingVoiceListenUi();
        suppressNextEmptyPendingDateOnChangeRef.current = true;
        ignoreNextPendingDateInputOnChangeRef.current = true;
        pendingPickedDateRef.current = parsed;
        playBeep(880, 120);
        setPendingPickedDate(parsed);
        setPendingAwaitNextOrDone(true);
      } else {
        try { recog.stop(); } catch (e) {}
        setPendingVoiceError(lang === "es" ? "No entendí. Di una fecha, o \"Next\" / \"Done\"." : "Could not understand. Try a date, or say Next / Done.");
        clearPendingVoiceListenUi();
      }
    };
    recog.onerror = (ev) => {
      const code = ev && ev.error ? ev.error : "";
      if (code === "aborted") return;
      if (!dateParsed) {
        if (code === "network") {
          if (isLocalDevHost()) {
            session.fatalError = true;
            setPendingVoiceError(pendingVoiceNetworkErrorMsg());
            clearPendingVoiceListenUi();
            return;
          }
          if (pendingVoiceNetworkRetry(recog, session, tryStart)) return;
          session.fatalError = true;
        } else {
          try { recog.stop(); } catch (e) {}
        }
        if (code === "not-allowed" || code === "audio-capture") {
          pendingMicNeedsGestureRef.current = true;
          session.fatalError = true;
        } else if (code !== "network" && code !== "no-speech") {
          session.fatalError = true;
        }
        if (session.fatalError) {
          const msg =
            code === "not-allowed"
              ? (lang === "es" ? "Permite el micrófono para este sitio (icono de candado)." : "Allow microphone access for this site (lock icon in the address bar).")
              : code === "audio-capture"
                ? (lang === "es" ? "No se detectó micrófono. Conecta uno o revisa permisos." : "No microphone found. Plug one in or check permissions.")
                : code === "network"
                  ? pendingVoiceNetworkErrorMsg()
                  : code === "no-speech"
                    ? (lang === "es" ? "No se oyó habla. Toca el mic o habla más cerca." : "No speech heard. Tap the mic or speak closer.")
                    : (lang === "es" ? "No se pudo iniciar el mic. Toca el botón del mic otra vez." : "Could not start the mic. Tap the mic button again.");
          setPendingVoiceError(msg);
          clearPendingVoiceListenUi();
        }
      }
    };
    recog.onstart = () => {
      pendingMicNeedsGestureRef.current = false;
      markPendingVoiceListening();
      setPendingVoiceError("");
    };
    recog.onend = () => {
      if (pendingVoiceRecognitionRef.current === recog) pendingVoiceRecognitionRef.current = null;
      if (scheduleNextDoneAfterStop.current) {
        scheduleNextDoneAfterStop.current = false;
        const i = currentIdx;
        window.setTimeout(() => startPendingVoiceNextDone(i), 120);
        return;
      }
      if (dateParsed || pendingVoiceHandled || session.fatalError || pendingVoiceUserStopRef.current) {
        if (!dateParsed && !pendingVoiceHandled) clearPendingVoiceListenUi();
        return;
      }
      schedulePendingVoiceOnEndRestart(recog, session, currentIdx, tryStart);
    };
    const tryStart = (attempt) => {
      pendingVoiceRecognitionRef.current = recog;
      try {
        recog.start();
      } catch (err) {
        const name = err && err.name;
        if (name === "InvalidStateError" && attempt < 4) {
          if (pendingVoiceRetryTimeoutRef.current) clearTimeout(pendingVoiceRetryTimeoutRef.current);
          pendingVoiceRetryTimeoutRef.current = window.setTimeout(() => {
            pendingVoiceRetryTimeoutRef.current = null;
            if (pendingVoiceRecognitionRef.current !== recog) return;
            tryStart(attempt + 1);
          }, 40 + attempt * 50);
          return;
        }
        clearPendingVoiceListenUi();
        pendingMicNeedsGestureRef.current = true;
        setPendingVoiceError(
          lang === "es"
            ? "Toca el micrófono para permitir el audio (Safari)."
            : "Tap the mic button to allow audio (Safari)."
        );
      }
    };
    tryStart(0);
  };

  const handlePendingMicPress = () => {
    clearPendingVoiceListenUi();
    if (typeof window !== "undefined" && isLocalDevHost()) {
      setPendingVoiceError(pendingVoiceNetworkErrorMsg());
      return;
    }
    pendingVoiceUserStopRef.current = false;
    pendingMicNeedsGestureRef.current = false;
    setPendingVoiceError("");
    if (pendingPickedDate && pendingAwaitNextOrDone) {
      startPendingVoiceNextDone(pendingDateIndex);
    } else {
      startPendingVoice(pendingDateIndex);
    }
  };

  useEffect(() => {
    if (!showPendingDateIntro) return;
    const text = t("pendingDateIntro");
    speakPendingIntro(text);
    return () => { try { window.speechSynthesis?.cancel(); } catch (e) {} };
  }, [showPendingDateIntro, lang]);

  useEffect(() => {
    if (showPendingDateIntro) return;
    if (pendingDateItems.length === 0 || pendingDateIndex >= pendingDateItems.length) return;
    return () => {
      pendingVoiceUserStopRef.current = true;
      if (pendingVoiceOnEndRestartTimeoutRef.current) {
        clearTimeout(pendingVoiceOnEndRestartTimeoutRef.current);
        pendingVoiceOnEndRestartTimeoutRef.current = null;
      }
      if (pendingVoiceRetryTimeoutRef.current) {
        clearTimeout(pendingVoiceRetryTimeoutRef.current);
        pendingVoiceRetryTimeoutRef.current = null;
      }
      if (pendingVoiceRecognitionRef.current) {
        try { pendingVoiceRecognitionRef.current.onend = null; pendingVoiceRecognitionRef.current.abort(); } catch (e) {}
        pendingVoiceRecognitionRef.current = null;
      }
      if (pendingVoiceListenUiTimeoutRef.current) {
        clearTimeout(pendingVoiceListenUiTimeoutRef.current);
        pendingVoiceListenUiTimeoutRef.current = null;
      }
      setPendingVoiceListening(false);
    };
  }, [pendingDateItems, pendingDateIndex, showPendingDateIntro]);

  useEffect(() => {
    setPendingTypedDate("");
  }, [pendingDateIndex]);

  useEffect(() => {
    if (pendingDateItems.length === 0) pendingProduceDefaultedRef.current.clear();
  }, [pendingDateItems.length]);

  useEffect(() => {
    if (!pendingDateItems.length || pendingDateIndex >= pendingDateItems.length) return;
    const item = pendingDateItems[pendingDateIndex];
    if (!item || !isProduceCategory(item.category)) return;
    const days = conservativeProduceShelfDays(item);
    if (days == null) return;
    if (pendingPickedDate) return;
    const key = item.id;
    if (pendingProduceDefaultedRef.current.has(key)) return;
    pendingProduceDefaultedRef.current.add(key);
    const d = new Date();
    d.setDate(d.getDate() + days);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    pendingPickedDateRef.current = iso;
    setPendingPickedDate(iso);
    setPendingAwaitNextOrDone(true);
  }, [pendingDateIndex, pendingDateItems, pendingPickedDate]);

  const handleSetUsername = () => { const n = usernameInput.trim(); if (!n) return; setUsername(n); try { localStorage.setItem(USERNAME_KEY, n); } catch(e) {} setUsernameInput(""); };
  const handlePostRecipe = () => { if (!newRecipeTitle.trim() || !newRecipeBody.trim()) return; setCommunity((prev) => ({ ...prev, recipes: [{ id: crypto.randomUUID(), author: username, title: newRecipeTitle.trim(), body: newRecipeBody.trim(), date: new Date().toLocaleDateString() }, ...prev.recipes] })); setNewRecipeTitle(""); setNewRecipeBody(""); };
  const handlePostTip = () => { if (!newTip.trim()) return; setCommunity((prev) => ({ ...prev, tips: [{ id: crypto.randomUUID(), author: username, text: newTip.trim(), date: new Date().toLocaleDateString() }, ...prev.tips] })); setNewTip(""); };
  const handlePostChat = () => { if (!newChat.trim()) return; setCommunity((prev) => ({ ...prev, chat: [...prev.chat, { id: crypto.randomUUID(), author: username, text: newChat.trim(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }] })); setNewChat(""); };

  const onboardingOverlays = (
    <>
      {welcomeStep === 1 && (
        <div className="fixed inset-0 z-[10050] flex items-center justify-center p-4 overflow-y-auto tf-premium-bg">
          <div className="w-full max-w-md text-center animate-[fadeIn_0.4s_ease]" style={{background:"rgba(0,0,0,0.35)",border:"2px solid rgba(255,102,0,0.45)",backdropFilter:"blur(14px)",borderRadius:"24px",padding:"2rem"}}>
            <div className="text-5xl mb-3">🥦</div>
            <h2 className="text-xl font-extrabold text-white mb-5" style={{textShadow:"0 2px 8px rgba(0,0,0,0.3)"}}><TrackFreshLogo showBroc={false} /></h2>
            <div className="space-y-4 text-left mb-6">
              <div className="rounded-xl p-4" style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)"}}>
                <p className="text-sm leading-relaxed" style={{color:"rgba(255,255,255,0.85)"}}>{t("welcomeNoticeData")}</p>
              </div>
              <div className="rounded-xl p-4" style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(251,191,36,0.3)"}}>
                <p className="text-sm leading-relaxed" style={{color:"rgba(255,255,255,0.85)"}}>{t("welcomeNoticeExpiry")}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                try { localStorage.setItem(DISCLAIMER_KEY, "1"); } catch (e) {}
                try {
                  const flow = localStorage.getItem(FLOW_KEY) || FLOWS.default;
                  if (flow === FLOWS.guided || flow === FLOWS.coach) {
                    finishWelcomeForFlow();
                  } else if (!localStorage.getItem(WELCOMED_KEY)) setWelcomeStep(2);
                  else setWelcomeStep(0);
                } catch (e) {
                  setWelcomeStep(2);
                }
              }}
              className="tf-onboarding-cta w-full py-3 rounded-xl font-bold text-base text-white btn-amber-3d"
              style={{ color: "#ffffff" }}
            >
              {t("disclaimerContinue")}
            </button>
          </div>
        </div>
      )}
      {welcomeStep === 2 && (
        <div className="fixed inset-0 z-[10050] flex items-center justify-center p-4 overflow-y-auto tf-premium-bg">
          <div className="w-full max-w-md text-center animate-[fadeIn_0.4s_ease]" style={{background:"rgba(0,0,0,0.35)",border:"2px solid rgba(255,102,0,0.45)",backdropFilter:"blur(14px)",borderRadius:"24px",padding:"2rem"}}>
            <div className="text-5xl mb-3">🥦</div>
            <h2 className="text-2xl font-extrabold text-white mb-6" style={{textShadow:"0 2px 8px rgba(0,0,0,0.3)"}}>{t("welcomeHeading")}</h2>
            <button
              type="button"
              onClick={() => {
                setWelcomeStep(0);
                try { localStorage.setItem(WELCOMED_KEY, "true"); } catch (e) {}
              }}
              className="tf-onboarding-cta w-full py-3.5 rounded-xl font-bold text-lg text-white btn-amber-3d"
              style={{ color: "#ffffff", cursor: "pointer" }}
            >
              {t("welcomeLetsGo")}
            </button>
          </div>
        </div>
      )}
    </>
  );

  if (showMarketing) return <MarketingPage onLaunchApp={handleLaunchApp} lang={lang} onChangeLang={changeLang} />;
  if (welcomeStep > 0) {
    return (
      <div className="min-h-screen tf-premium-bg">
        <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />
        {onboardingOverlays}
      </div>
    );
  }
  if (isUnlocked === false) return (
    <>
    <div className="min-h-screen tf-premium-bg flex items-center justify-center p-4">
      <div style={{background:"rgba(0,0,0,0.35)",border:"2px solid rgba(255,102,0,0.45)",backdropFilter:"blur(14px)",borderRadius:"24px"}} className="shadow-2xl p-8 max-w-sm w-full text-center">
        <div className="text-5xl mb-3">🥦</div>
        <h1 className="text-3xl font-extrabold text-white mb-0" style={{textShadow:"0 2px 8px rgba(0,0,0,0.3)"}}><TrackFreshLogo showBroc={false} /></h1>
        <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1 mt-1">{t("betaTesting")}</p>
        {(onboardingFlow === FLOWS.guided || onboardingFlow === FLOWS.coach) && (
          <p className="text-xs font-semibold text-green-300 mb-2 px-3 py-1.5 rounded-lg" style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.35)" }}>
            🧪 {flowLabel(onboardingFlow, lang)}
          </p>
        )}
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
        <p className="text-xs text-green-300/60 mt-4">
          {t("contactAccessBefore")}
          <a href="mailto:hello@trackfresh.com" className="underline hover:text-green-200">hello@trackfresh.com</a>
          {t("contactAccessAfter")}
        </p>
      </div>
    </div>
    </>
  );

    return (
    <>
    {onboardingOverlays}
    {showGuidedWizard && (
      <GuidedFlowWizard
        lang={lang}
        step={guidedStep}
        onStepChange={setGuidedStep}
        onScanReceipt={openReceiptFromOnboarding}
        onGoHome={() => setActiveTab("home")}
        onComplete={completeGuidedFlow}
        onSkipReceipt={() => {}}
      />
    )}
    <div className="min-h-screen app-bg"><style dangerouslySetInnerHTML={{__html: GLOBAL_STYLES}} />
      {/* Sticky header: logo + top nav */}
      <div style={{position:"sticky",top:0,zIndex:50,background:"linear-gradient(to bottom,#064e3b,#022c22)",boxShadow:"0 4px 20px rgba(0,0,0,0.3)"}}>
        <div className={`mx-auto px-4 pt-3 pb-2 flex items-center justify-between ${TF_APP_SHELL_MAX}`}>
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
      <div key={activeTab} className={`mx-auto space-y-4 px-4 pt-4 pb-8 tab-enter ${TF_APP_SHELL_MAX}`}>



        {showGroceryScan && (
          <GroceryScanModal
            lang={lang}
            scanTitle={t("smartScanTitle")}
            onClose={() => setShowGroceryScan(false)}
            onEnqueue={(apiItems) => {
              if (!apiItems || !apiItems.length) return;
              const rows = apiItems.map(mapScanApiItemToPendingRow);
              enqueuePendingRows(rows);
              queueMicrotask(() => setShowGroceryScan(false));
            }}
          />
        )}

        {showReceiptScanner && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center tf-premium-overlay p-4 overflow-y-auto" style={{paddingTop:"calc(env(safe-area-inset-top, 0px) + 3rem)"}}>
            <div className="w-full max-w-lg rounded-xl p-6 shadow-lg tf-modal-glass-surface">
              <h2 className="mb-2 text-lg tf-modal-accent-h--mint">{t("scanReceiptTitle")}</h2>
              <InstructionHint className="mb-4">{t("scanReceiptDesc")}</InstructionHint>
              {!receiptScanning && (
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
                <div className="flex flex-col items-center py-8 gap-3">
                  <div className="text-3xl animate-spin">⏳</div>
                  <p className="text-sm" style={{color:"rgba(255,255,255,0.75)",margin:0}}>{t("readingReceipt")}</p>
                  <LoadingFoodFact lang={lang} />
                </div>
              )}
              {receiptError && <p className="mt-2 text-sm" style={{color:"#fca5a5"}}>Error: {receiptError}</p>}
              <InstructionHint className="mt-2" style={{ fontSize: "0.8125rem" }}>{t("pendingDateIntro")}</InstructionHint>
              <button type="button" onClick={() => { setShowReceiptScanner(false); setReceiptError(""); }} className="mt-3 w-full rounded-xl py-2 text-sm tf-glass-primary-btn">{t("cancel")}</button>
            </div>
          </div>
        )}

        {pendingDateItems.length > 0 && showPendingDateIntro && (
          <div className="fixed inset-0 z-[10055] flex flex-col items-center justify-center tf-premium-bg" style={{ padding: "2rem 1.25rem" }}>
            <div
              className="w-full max-w-md text-center animate-[fadeIn_0.35s_ease]"
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "2px solid rgba(250,204,21,0.55)",
                backdropFilter: "blur(14px)",
                borderRadius: "24px",
                padding: "2rem 1.5rem",
              }}
            >
              <div style={{ fontSize: "3.5rem", lineHeight: 1, marginBottom: "0.75rem" }}>🎤</div>
              <p className="tf-modal-accent-h" style={{ fontSize: "1rem", margin: "0 0 0.75rem" }}>
                📅 {t("pendingDateIntroTitle")}
              </p>
              <InstructionHint style={{ marginBottom: "1.5rem" }}>{t("pendingDateIntro")}</InstructionHint>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8rem", margin: "0 0 1.25rem" }}>
                {pendingDateItems.length} {lang === "es" ? "artículos por fechar" : "items to date"}
              </p>
              <button type="button" onClick={dismissPendingDateIntro} className="w-full py-3 rounded-xl font-bold text-base btn-amber-3d">
                {t("pendingDateIntroContinue")}
              </button>
            </div>
          </div>
        )}

        {pendingDateItems.length > 0 && !showPendingDateIntro && pendingDateIndex < pendingDateItems.length && (() => {
          const item = pendingDateItems[pendingDateIndex];
          const isEs = lang === "es";
          const micLblListen = isEs ? "🎤 Escuchando…" : "🎤 Listening…";
          const micLblNext = isEs ? "🎤 Di «Next» o «Done»" : '🎤 Say "Next" or "Done"';
          const micLblIdle = isEs ? "🎤 Voz" : "🎤 Voice";
          const micAria = pendingVoiceListening
            ? (isEs ? "Escuchando" : "Listening")
            : (pendingAwaitNextOrDone && pendingPickedDate)
              ? (isEs ? "Di Next o Done para continuar" : "Say Next or Done to continue")
              : (isEs ? "Micrófono: decir la fecha de vencimiento" : "Microphone: speak the expiration date");
          const micSlotBase = {
            position: "absolute", left: 0, right: 0, top: 0, bottom: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "0.75rem 0.75rem", boxSizing: "border-box",
            fontWeight: 700, fontSize: "1rem", lineHeight: 1.25, textAlign: "center",
            pointerEvents: "none",
          };
          return (
            <div className="fixed inset-0 z-[10050] flex flex-col items-stretch justify-center tf-premium-bg" style={{padding:"2rem 1.25rem",gap:"1.25rem"}}>
              <div style={{textAlign:"center"}}>
                <p style={{color:"rgba(255,255,255,0.45)",fontSize:"0.75rem",fontWeight:600,margin:"0 0 0.35rem"}}>{pendingDateIndex + 1} / {pendingDateItems.length}</p>
                <p className="tf-modal-accent-h" style={{fontSize:"1.1rem",margin:0}}>📅 {isEs ? "¿Fecha de vencimiento?" : "Expiration Date?"}</p>
                <p
                  style={{
                    margin: "0.65rem 0 0",
                    fontSize: "1.35rem",
                    fontWeight: 800,
                    lineHeight: 1.25,
                    letterSpacing: "-0.02em",
                    color: "#bfe9a8",
                    textShadow: "0 0 28px rgba(134, 239, 172, 0.35), 0 1px 0 rgba(0,0,0,0.35)",
                  }}
                >
                  {itemDisplayName(item)}
                </p>
                {item.category === "Produce" && formatInGeneralInstruction(item, lang) ? (
                  <p className="tf-instruction-hint--inline" style={{ margin: "0.45rem 0.5rem 0", textAlign: "center" }}>
                    {formatInGeneralInstruction(item, lang)}
                  </p>
                ) : null}
              </div>
              <div
                className={pendingPickedDate ? "" : "tf-pending-date-empty"}
                style={{ position: "relative", borderRadius: "14px", border: "2px solid #facc15", background: "#1a1a1a", padding: "0.35rem 0.5rem 0.5rem" }}
              >
                {!pendingPickedDate ? (
                  <p className="tf-instruction-hint--inline" style={{ margin: "0.35rem 0 0.15rem", textAlign: "center", fontSize: "0.82rem" }}>
                    {isEs ? "📅 Toca abajo para abrir el calendario" : "📅 Tap below to open calendar"}
                  </p>
                ) : null}
                <input
                  ref={pendingDateInputRef}
                  type="date"
                  className="tf-pending-date-native"
                  value={pendingPickedDate}
                  onChange={(e) => applyPendingDateValue(e.target.value)}
                  onFocus={() => {
                    abortPendingVoiceRecognition();
                    pendingVoiceUserStopRef.current = false;
                    setPendingVoiceError("");
                  }}
                  aria-label={isEs ? "Fecha de vencimiento" : "Expiration date"}
                />
              </div>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "stretch" }}>
                <input
                  type="text"
                  value={pendingTypedDate}
                  onChange={(e) => setPendingTypedDate(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handlePendingApplyTypedDate(); }}
                  placeholder={t("sayDateExample")}
                  aria-label={t("sayDateExample")}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    padding: "0.75rem 0.85rem",
                    borderRadius: "12px",
                    border: "2px solid rgba(250,204,21,0.45)",
                    background: "rgba(0,0,0,0.35)",
                    color: "#fff",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                  }}
                />
                <button
                  type="button"
                  onClick={handlePendingApplyTypedDate}
                  className="tf-glass-primary-btn"
                  style={{
                    flexShrink: 0,
                    padding: "0.75rem 1rem",
                    borderRadius: "12px",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                  }}
                >
                  {t("pendingDateTypeApply")}
                </button>
              </div>
              <VoiceDateNextHint lang={lang} text={t("pendingDateVoiceHint")} />
              <button
                type="button"
                className={`tf-glass-scan${pendingVoiceListening ? " tf-pending-mic-listening" : ""}`}
                aria-label={micAria}
                onClick={handlePendingMicPress}
                style={{
                  position: "relative",
                  width: "100%",
                  minHeight: "4.5rem",
                  boxSizing: "border-box",
                  padding: 0,
                  ...(!pendingVoiceListening ? { color: "#fde047" } : {}),
                  fontWeight: 700,
                  fontSize: "1rem",
                  borderRadius: "16px",
                  cursor: "pointer",
                  overflow: "hidden",
                  userSelect: "none",
                }}
              >
                <span style={{ ...micSlotBase, opacity: pendingVoiceListening ? 1 : 0 }} aria-hidden>{micLblListen}</span>
                <span style={{ ...micSlotBase, opacity: !pendingVoiceListening && pendingAwaitNextOrDone && pendingPickedDate ? 1 : 0 }} aria-hidden>{micLblNext}</span>
                <span style={{ ...micSlotBase, opacity: !pendingVoiceListening && !(pendingAwaitNextOrDone && pendingPickedDate) ? 1 : 0 }} aria-hidden>{micLblIdle}</span>
              </button>
              <div style={{marginTop: "0.25rem"}}>
                {pendingVoiceError && (
                  <p style={{color:"#f87171", fontSize:"0.75rem", textAlign:"center", margin:"0.4rem 0 0", fontWeight:600}}>
                    {pendingVoiceError}
                  </p>
                )}
              </div>
              {pendingPickedDate && isValidYYYYMMDD(pendingPickedDate) && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.65rem" }}>
                  {pendingDateIndex < pendingDateItems.length - 1 ? (
                    <button
                      type="button"
                      onClick={handlePendingSaveAndNext}
                      className="w-full py-3 rounded-xl font-bold text-base text-white btn-amber-3d tf-onboarding-cta"
                      style={{ color: "#ffffff" }}
                    >
                      {t("pendingSaveNext")}
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={handlePendingSaveAndFinish}
                    className="w-full py-3 rounded-xl font-bold text-base text-white btn-amber-3d tf-onboarding-cta"
                    style={{ color: "#ffffff" }}
                  >
                    {t("pendingSaveFinish")}
                  </button>
                </div>
              )}
              <button
                type="button"
                className="tf-pending-skip-btn tf-glass-primary-btn"
                onClick={handlePendingSkipDate}
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                  padding: "0.65rem 1rem",
                  fontSize: "0.875rem",
                  letterSpacing: "0.04em",
                }}
              >
                {isEs ? "Omitir fecha" : "Skip date"}
              </button>
            </div>
          );
        })()}
      {showHelp && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center tf-premium-overlay p-4">
            <div className="w-full max-w-lg rounded-xl p-6 tf-modal-glass-surface">
              <h2 className="mb-3 text-lg tf-modal-accent-h--mint">{lang === "es" ? "Cómo Usar " : "How to Use "}<TrackFreshLogo showBroc={false} style={{fontSize:"0.95em"}} /></h2>
              <ul className="space-y-3 text-sm tf-instruction-hint--inline tf-instruction-hint--left" style={{ fontSize: "0.875rem", lineHeight: 1.55 }}>
                <li className="flex gap-2"><span>\ud83e\udd66</span><span><strong>Tracker:</strong> {lang === "es" ? "La IA escanea un n\u00famero infinito de productos. Categor\u00eda y ubicaci\u00f3n se llenan autom\u00e1ticamente." : "AI scans an infinite number of items. Category and location auto-fill intelligently."}</span></li>
                <li className="flex gap-2"><span>\ud83d\udcf8</span><span><strong>{lang === "es" ? "Esc\u00e1ner" : "Scanners"}:</strong> {lang === "es" ? "Usa Recibo, Etiqueta, C\u00f3digo de Barras o Agregar R\u00e1pido para a\u00f1adir productos." : "Use Receipt, Label, Barcode, or Quick Add to add items."}</span></li>
                <li className="flex gap-2"><span>\ud83d\udd0d</span><span><strong>Filter:</strong> {lang === "es" ? "Filtra por ubicaci\u00f3n (Refrigerador, Congelador, Despensa) o categor\u00eda (L\u00e1cteos, Carne, etc.)." : "Filter by location (Fridge, Freezer, Pantry) or category (Dairy, Meat, Produce, etc.)."}</span></li>
                <li className="flex gap-2"><span>\ud83c\udf73</span><span><strong>{lang === "es" ? "Recetas" : "Recipes"}:</strong> {lang === "es" ? "La IA sugiere recetas basadas en lo que tienes en tu cocina." : "AI suggests recipes based on what\u2019s in your kitchen."}</span></li>
                <li className="flex gap-2"><span>\ud83d\uded2</span><span><strong>Shopping:</strong> {lang === "es" ? "Crea tu lista de compras y marca lo que compres." : "Build your shopping list and check off items as you shop."}</span></li>
                <li className="flex gap-2"><span>\ud83d\udcc5</span><span><strong>{lang === "es" ? "Comidas" : "Meals"}:</strong> {lang === "es" ? "La IA planifica tus comidas de la semana." : "AI plans your weekly meals based on your tracked items."}</span></li>
                <li className="flex gap-2"><span>\ud83d\udc65</span><span><strong>{lang === "es" ? "Comunidad" : "Community"}:</strong> {lang === "es" ? "Comparte recetas, consejos y chatea." : "Share recipes, tips, and chat with others."}</span></li>
                <li className="flex gap-2"><span>⚠️</span><span><strong>FDA Recalls:</strong> {lang === "es" ? "Alertas de seguridad alimentaria en tiempo real." : "Real-time food safety alerts from the FDA."}</span></li>
              </ul>
              <button type="button" onClick={() => setShowHelp(false)} className="mt-4 w-full rounded-xl px-4 py-2 text-sm tf-glass-primary-btn">{t("close")}</button>
            </div>
          </div>
        )}

        {editingItem && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center tf-premium-overlay p-4">
            <div className="w-full max-w-md rounded-2xl p-6 tf-modal-glass-surface">
              <h2 className="mb-4 text-lg tf-modal-accent-h--mint">✏️ Edit Item</h2>
              <div className="space-y-3">
                <div><label className="mb-1 block text-sm font-medium" style={{color:"#fff"}}>{t("nameWord")}</label><input type="text" value={editingItem.name} onChange={(e) => setEditingItem({...editingItem, name: e.target.value})} className="w-full rounded-xl px-3 py-2 text-sm" style={{background:"rgba(255,255,255,0.12)",color:"#fff",border:"1px solid rgba(183,214,58,0.5)"}} /></div>
                <div>
                  <label className="mb-1 block text-sm font-medium" style={{color:"#fff"}}>📅 {lang === "es" ? "Agregar Fecha" : "Add Date"}</label>
                  <input id="editDateInput" type="date" value={editingItem.useByDate} onChange={(e) => setEditingItem({...editingItem, useByDate: e.target.value})} className="w-full rounded-xl px-3 py-2 text-sm" style={{background:"rgba(255,255,255,0.12)",color:"#fff",border:"2px solid #B7D63A"}} />
                </div>
                <div><label className="mb-1 block text-sm font-medium" style={{color:"#fff"}}>Location</label><select value={editingItem.location || "Fridge"} onChange={(e) => setEditingItem({...editingItem, location: e.target.value})} className="w-full rounded-xl px-3 py-2 text-sm" style={{background:"rgba(255,255,255,0.12)",color:"#fff",border:"1px solid rgba(183,214,58,0.5)"}}><option style={{background:"#0d3d2e"}}>Fridge</option><option style={{background:"#0d3d2e"}}>Freezer</option><option style={{background:"#0d3d2e"}}>Pantry</option><option style={{background:"#0d3d2e"}}>Counter</option></select></div>
                <div><label className="mb-1 block text-sm font-medium" style={{color:"#fff"}}>Category</label><select value={editingItem.category || "Other"} onChange={(e) => setEditingItem({...editingItem, category: e.target.value})} className="w-full rounded-xl px-3 py-2 text-sm" style={{background:"rgba(255,255,255,0.12)",color:"#fff",border:"1px solid rgba(183,214,58,0.5)"}}><option style={{background:"#0d3d2e"}}>Dairy</option><option style={{background:"#0d3d2e"}}>Meat</option><option style={{background:"#0d3d2e"}}>Produce</option><option style={{background:"#0d3d2e"}}>Bakery</option><option style={{background:"#0d3d2e"}}>Frozen</option><option style={{background:"#0d3d2e"}}>Pantry</option><option style={{background:"#0d3d2e"}}>Beverages</option><option style={{background:"#0d3d2e"}}>Condiments</option><option style={{background:"#0d3d2e"}}>Snacks</option><option style={{background:"#0d3d2e"}}>Other</option></select></div>
                <div className="flex gap-2 pt-2"><button type="button" onClick={handleSaveEdit} className="flex-1 rounded-xl py-2 text-sm font-semibold tf-glass-primary-btn" style={{background:"rgba(183,214,58,0.25)",color:"#ecfccb"}}>{t("save")}</button><button type="button" onClick={() => setEditingItem(null)} className="flex-1 rounded-xl py-2 text-sm tf-glass-primary-btn">{t("cancel")}</button></div>
              </div>
            </div>
          </div>
        )}
        {showAlert && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center tf-premium-overlay p-4">
            <div className="w-full max-w-md rounded-xl p-6 tf-modal-glass-surface">
              <div className="mb-3 flex items-center gap-2"><Bell className="h-5 w-5 text-red-400 animate-bounce" /><h2 className="text-lg tf-modal-accent-h" style={{color:"#fecaca"}}>{t("expiringSoon")}</h2></div>
              {(() => { const urgent = trackedItems.filter(it => it.daysLeft !== null && it.daysLeft <= 2); return urgent.length > 0 ? (
                <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                  {urgent.map(it => (
                    <div key={it.id} className="flex items-center justify-between rounded-lg px-3 py-2" style={{border:"1px solid rgba(248,113,113,0.45)",background:"rgba(127,29,29,0.25)"}}>
                      <span className="text-sm font-semibold text-white">{it.name}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${it.daysLeft <= 0 ? "bg-red-600 text-white" : "bg-red-100 text-red-800"}`}>{it.daysLeft <= 0 ? "EXPIRED" : it.daysLeft + " day" + (it.daysLeft === 1 ? "" : "s") + " left"}</span>
                    </div>
                  ))}
                </div>
              ) : <p className="text-sm mb-4" style={{color:"rgba(255,255,255,0.88)"}}><span className="font-semibold">{alertItem.name}</span> expires in <span className="font-semibold">{alertItem.daysLeft}</span> day{alertItem.daysLeft === 1 ? "" : "s"}.</p>; })()}
              <InstructionHint className="text-xs mb-3" style={{ fontSize: "0.75rem", marginBottom: "0.75rem" }}>{t("useItemsSoon")}</InstructionHint>
              <div className="flex gap-2">
                <button type="button" onClick={() => setShowAlert(false)} className="flex-1 rounded-lg py-2 text-sm tf-glass-primary-btn" style={{background:"rgba(220,38,38,0.35)"}}>{t("gotIt")}</button>
                <button type="button" onClick={() => { setShowAlert(false); setActiveTab("recipes"); }} className="flex-1 rounded-lg py-2 text-sm tf-glass-primary-btn">{t("findRecipes")}</button>
              </div>
            </div>
          </div>
        )}

        {showBarcodeScanner && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center tf-premium-overlay p-4 overflow-y-auto" style={{paddingTop:"2rem"}}>
            <div className="w-full max-w-lg rounded-xl p-6 tf-modal-glass-surface">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg tf-modal-accent-h--mint">{t("scanBarcodeTitle")}</h2>
                <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                  {scanMode === "multi" && <span className="rounded-full bg-blue-600 text-white px-2 py-1 text-xs font-bold">Mult. Scans</span>}
                  {scanMode === "multi" && multiScanCount > 0 && <span className="rounded-full bg-green-600 text-white px-2 py-1 text-xs font-bold">{multiScanCount} added</span>}
                  <button type="button" onClick={() => { setShowBarcodeScanner(false); setBarcodeItem(null); setBarcodeError(""); setBarcodeDetected(""); setMultiScanCount(0); setMultiScanLastItem(""); setScanMode(null); }} className="tf-glass-primary-btn" style={{borderRadius:"50%",width:"32px",height:"32px",fontSize:"1.1rem",padding:0}}>&times;</button>
                </div>
              </div>
              {scanMode === null && (
                <div className="tf-premium-sheet tf-modal-glass-surface rounded-[14px] p-4">
                  <p style={{textAlign:"center",fontSize:"0.875rem",fontWeight:"600",color:"rgba(255,255,255,0.9)",marginBottom:"0.75rem"}}>{t("howManyItems")}</p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem"}}>
                    <button onClick={() => setScanMode("single")} className="glass-scan-btn" style={{padding:"1.25rem 0.5rem"}}><span style={{fontSize:"1.75rem"}}>1️⃣</span><span style={{fontSize:"0.875rem"}}>{t("singleScan")}</span></button>
                    <button onClick={() => setScanMode("multi")} className="glass-scan-btn" style={{padding:"1.25rem 0.5rem"}}><span style={{fontSize:"1.75rem"}}>📦</span><span style={{fontSize:"0.875rem"}}>{t("multiScans")}</span></button>
                  </div>
                </div>
              )}
              {scanMode !== null && <>
              {multiScanLastItem && <div className="mb-3 rounded-lg px-3 py-2 text-sm font-semibold animate-pulse" style={{border:"1px solid rgba(134,239,172,0.45)",background:"rgba(6,78,59,0.45)",color:"#bbf7d0"}}>✅ Added: {multiScanLastItem} — Ready for next scan!</div>}
              <InstructionHint className="mb-4">{t("scanBarcodeDesc")}</InstructionHint>
              {!barcodeItem && (
                <BarcodeScanner key={barcodeScanKey} onDetected={handleBarcodeDetected} />
              )}
              {barcodeScanning && (
                <div className="flex flex-col items-center py-4 gap-3">
                  <div className="text-3xl animate-spin">⏳</div>
                  <p className="text-sm" style={{color:"rgba(255,255,255,0.72)",margin:0}}>{t("lookingUp")}</p>
                  <LoadingFoodFact lang={lang} />
                </div>
              )}
              {barcodeError && (
                <div className="mt-2 rounded-lg p-3" style={{background:"rgba(127,29,29,0.25)",border:"1px solid rgba(252,165,165,0.35)"}}>
                  <p className="text-sm" style={{color:"#fecaca"}}>{barcodeError}</p>
<button type="button" onClick={() => { setBarcodeError(""); setBarcodeDetected(""); setBarcodeItem(null); setBarcodeScanning(false); setShowBarcodeScanner(false); setScanMode(null); setTimeout(() => { window.scrollTo(0,0); setShowBarcodeScanner(true); }, 1000); }} className="mt-2 text-xs underline" style={{color:"#a7f3d0"}}>{t("tryAgain")}</button>
                </div>
              )}
              {barcodeItem && (
                <div className="space-y-3">
                  <div className="rounded-lg border p-3" style={{background:"rgba(6,78,59,0.35)",borderColor:"rgba(134,239,172,0.35)"}}>
                    <p className="text-xs font-semibold mb-1" style={{color:"#86efac"}}>✅ Product found!</p>
                    <p className="font-bold" style={{color:"#fff"}}>{barcodeItem.name}</p>
                    <p className="text-xs" style={{color:"rgba(255,255,255,0.55)"}}>{barcodeItem.category}</p>
                    {barcodeItem.storageTip && <p className="tf-instruction-hint--inline tf-instruction-hint--left" style={{ marginTop: "0.25rem" }}>💡 {barcodeItem.storageTip}</p>}
                    {isProduceCategory(barcodeItem.category) && formatInGeneralInstruction(barcodeItem, lang) ? (
                      <p className="text-xs text-blue-600 mt-1">🥬 {formatInGeneralInstruction(barcodeItem, lang)}</p>
                    ) : null}
                    {!isProduceCategory(barcodeItem.category) && barcodeItem.openedTip && <p className="text-xs text-orange-600 mt-1">⚠️ {barcodeItem.openedTip}</p>}
                    {!isProduceCategory(barcodeItem.category) && barcodeItem.daysAfterOpening ? <p className="text-xs text-blue-600 mt-1">📅 Use within {barcodeItem.daysAfterOpening} days of opening</p> : null}
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2" style={{color:"rgba(255,255,255,0.9)"}}>{t("whereStoring")}</p>
                    <div className="flex w-full max-w-md mx-auto flex-col items-stretch gap-2">
                      <div className="grid grid-cols-2 gap-2">
                        <button type="button" onClick={() => { setBarcodeLocation("Fridge"); setBarcodeFreezeBy(""); }} className={`rounded-lg border py-3 text-sm font-semibold transition-colors ${barcodeLocation === "Fridge" ? "border-emerald-400/80 bg-emerald-500/25 text-emerald-100" : "border-white/20 bg-white/5 text-white/65"}`}>🧊 Fridge</button>
                        <button type="button" onClick={() => { setBarcodeLocation("Pantry"); setBarcodeFreezeBy(""); }} className={`rounded-lg border py-3 text-sm font-semibold transition-colors ${barcodeLocation === "Pantry" ? "border-amber-400/80 bg-amber-500/20 text-amber-100" : "border-white/20 bg-white/5 text-white/65"}`}>🗄️ Pantry</button>
                      </div>
                      <button type="button" onClick={() => setBarcodeLocation("Freezer")} className={`w-full rounded-xl border py-4 text-base font-extrabold tracking-wide transition-colors ${barcodeLocation === "Freezer" ? "border-emerald-300/90 bg-emerald-600/35 text-white shadow-[0_0_20px_rgba(16,185,129,0.25)]" : "border-emerald-500/40 bg-emerald-900/30 text-emerald-100"}`}>❄️ Freezer</button>
                    </div>
                  </div>
                  {barcodeLocation && (
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-bold mb-2" style={{color:"rgba(255,255,255,0.92)"}}>📅 {barcodeLocation === "Freezer" ? t("freezeByLabel") + " Date" : t("expDateLabel")} {barcodeUseBy && <span style={{color:"#86efac"}}>✓ {barcodeUseBy}</span>}</p>
                        <VoiceDateNextHint lang={lang} text={t("pendingDateVoiceHint")} />
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <button type="button" onClick={() => handleVoiceDate("useBy")} className={`rounded-xl py-3 text-sm font-bold ${voiceListening === "useBy" ? "tf-voice-listening" : "tf-glass-primary-btn"}`}>🎤 {voiceListening === "useBy" ? "Listening..." : "Speak Date"}</button>
                          <label className="rounded-xl py-3 text-sm font-bold tf-glass-primary-btn" style={{display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>📅 Enter Date<input type="date" value={barcodeUseBy} onChange={(e) => setBarcodeUseBy(e.target.value)} style={{position:"absolute",opacity:0,width:"1px",height:"1px"}} /></label>
                        </div>
                        {(voiceListening === "useBy" || barcodeUseBy) && <p className="text-xs mt-1" style={{color: barcodeUseBy ? "#86efac" : "#fca5a5"}}>{voiceListening === "useBy" ? "🎤 Listening... say e.g. March 20 2026" : "✓ " + barcodeUseBy}</p>}
                        {voiceListening === "useBy" && <p className="text-xs mt-1" style={{color:"#a7f3d0"}}>Say the date e.g. February 20 2026</p>}
                      </div>
                      {barcodeLocation === "Fridge" && barcodeItem.category === "Meat" && (
                        <div>
                          <label className="mb-1 block text-sm font-medium" style={{color:"rgba(255,255,255,0.85)"}}>{t("freezeByLabel")} Date <span className="text-xs" style={{color:"rgba(255,255,255,0.45)"}}>(optional - we will remind you)</span></label>
                          <VoiceDateNextHint lang={lang} text={t("pendingDateVoiceHint")} />
                          <div className="flex gap-2">
                            <input type="date" value={barcodeFreezeBy} onChange={(e) => setBarcodeFreezeBy(e.target.value)} className="flex-1 rounded border px-3 py-2 text-sm" style={{background:"rgba(0,0,0,0.25)",borderColor:"rgba(255,255,255,0.25)",color:"#fff"}} />
                            <button type="button" onClick={() => handleVoiceDate("freezeBy")} className={`rounded px-3 py-2 text-sm font-semibold ${voiceListening === "freezeBy" ? "tf-voice-listening" : "tf-glass-primary-btn"}`}>{voiceListening === "freezeBy" ? "🎤 Listening..." : "🎤"}</button>
                          </div>
                          {voiceListening === "freezeBy" && <p className="text-xs mt-1" style={{color:"#a7f3d0"}}>Say the date e.g. February 25 2026</p>}
                        </div>
                      )}
                      {voiceError && <p className="text-xs" style={{color:"#fca5a5"}}>{voiceError}</p>}
                    </div>
                  )}
                  <button onClick={handleAddBarcodeItem} disabled={!barcodeLocation} className={`w-full rounded-xl py-2.5 text-sm font-bold ${!barcodeLocation ? "bg-gray-300 text-white" : "btn-green-3d"}`}>{t("addToTracker")}</button>
                  <button type="button" onClick={() => { setBarcodeItem(null); setBarcodeDetected(""); setBarcodeLocation(""); setBarcodeUseBy(""); setBarcodeFreezeBy(""); setVoiceError(""); setBarcodeScanKey(prev => prev + 1); resetMultiScanTimer(); }} className="w-full rounded-xl py-2 text-sm font-bold tf-glass-primary-btn">{t("scanAnother")}</button>
                </div>
              )}
              </>}
              <button type="button" onClick={handleDoneScanning} className="mt-3 w-full rounded-xl py-2.5 text-sm font-bold tf-glass-primary-btn" style={{background:"rgba(16,185,129,0.35)"}}>{multiScanCount > 0 ? (lang === "es" ? "✅ Listo (" + multiScanCount + " artículos)" : "✅ Done (" + multiScanCount + " items added)") : t("cancel")}</button>
            </div>
          </div>
        )}

        {storeDiscountItem && (
          <StoreDiscountModal
            item={storeDiscountItem}
            lang={lang}
            onClose={() => setStoreDiscountItem(null)}
          />
        )}

        {showQuickAdd && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center tf-premium-overlay p-4">
            <div className="w-full max-w-lg rounded-xl p-6 tf-modal-glass-surface">
              <h2 className="mb-2 text-lg tf-modal-accent-h--mint">✏️ Quick Add</h2>
              <InstructionHint className="mb-4">{t("quickAddTitleDesc")}</InstructionHint>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm font-medium" style={{color:"#4ade80"}}>{t("foodItem")}</label>
                  <select
                    value={FOOD_DB.some((f) => f.name === quickAddName) ? quickAddName : ""}
                    onChange={(e) => {
                      const f = FOOD_DB.find((x) => x.name === e.target.value);
                      if (f) applyQuickAddFoodSelection(f);
                    }}
                    className="w-full rounded-xl px-3 py-2 text-sm mb-2"
                    style={{ background: "#1a1a1a", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", colorScheme: "light" }}
                  >
                    <option value="" style={{ color: "#0f172a", background: "#ffffff" }}>{lang === "es" ? "Elegir de la lista…" : "Choose from list…"}</option>
                    {quickAddFoodOptions.map((f) => (
                      <option key={f.name} value={f.name} style={{ color: "#0f172a", background: "#ffffff" }}>
                        {lang === "es" && FOOD_ES[f.name] ? FOOD_ES[f.name] : f.name}
                      </option>
                    ))}
                  </select>
                  <FoodAutocomplete
                    lang={lang}
                    dark
                    menuZIndex={300}
                    value={quickAddName}
                    onChange={setQuickAddName}
                    onSelect={applyQuickAddFoodSelection}
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
                  <input type="date" value={quickAddDate} onChange={(e) => setQuickAddDate(e.target.value)} className="w-full rounded-xl px-3 py-2 text-sm" style={{background:"#1a1a1a",color:"#fff",border:"2px solid #f97316"}} />
                </div>
                <button onClick={handleQuickAdd} className="w-full rounded-xl py-2.5 text-sm font-bold" style={{background:"#22c55e",color:"#0a0a0a"}}>{lang === "es" ? "Agregar Artículo" : "Add Item"}</button>
                <button type="button" onClick={() => { setShowQuickAdd(false); setQuickAddName(""); setQuickAddDate(""); setQuickAddQty(""); setQuickAddCategory("Other"); setQuickAddLocation("Fridge"); }} className="w-full rounded-xl py-2 text-sm tf-glass-primary-btn">{t("cancel")}</button>
              </div>
            </div>
          </div>
        )}

        {showLabelScanner && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center tf-premium-overlay p-4 overflow-y-auto" style={{paddingTop:"2rem"}}>
            <div className="w-full max-w-lg rounded-xl p-6 tf-modal-glass-surface">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg tf-modal-accent-h--mint">{t("scanLabelTitle")}</h2>
                <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                  {labelScanMode === "multi" && <span className="rounded-full bg-blue-600 text-white px-2 py-1 text-xs font-bold">Mult. Scans</span>}
                  {labelScanMode === "multi" && labelScanCount > 0 && <span className="rounded-full bg-green-600 text-white px-2 py-1 text-xs font-bold">{labelScanCount} added</span>}
                  <button type="button" onClick={() => { setShowLabelScanner(false); setLabelItem(null); setLabelError(""); setLabelScanCount(0); setLabelLastItem(""); setLabelScanMode(null); }} className="tf-glass-primary-btn" style={{borderRadius:"50%",width:"32px",height:"32px",fontSize:"1.1rem",padding:0}}>&times;</button>
                </div>
              </div>
              {labelScanMode === null && (
                <div className="tf-premium-sheet tf-modal-glass-surface rounded-[14px] p-4">
                  <p style={{textAlign:"center",fontSize:"0.875rem",fontWeight:"600",color:"rgba(255,255,255,0.9)",marginBottom:"0.75rem"}}>{t("howManyItems")}</p>
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
              {labelLastItem && <div className="mb-3 rounded-lg px-3 py-2 text-sm font-semibold animate-pulse" style={{border:"1px solid rgba(134,239,172,0.45)",background:"rgba(6,78,59,0.45)",color:"#bbf7d0"}}>✅ Added: {labelLastItem} — Ready for next scan!</div>}
              {!labelScanning && !labelItem && (
                <label key={labelScanKey} className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8" style={{borderColor:"rgba(134,239,172,0.45)",background:"rgba(6,78,59,0.25)"}}>
                  <span className="text-3xl mb-2">📷</span>
                  <span className="text-sm font-semibold" style={{color:"#86efac"}}>{labelScanMode === "multi" ? t("tapToScanNext") : t("tapToPhoto")}</span>
                  <span className="tf-instruction-hint--inline" style={{ display: "block", marginTop: "0.25rem", textAlign: "center" }}>{t("tapOpenCamera")}</span>
                  <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => { setLabelError(""); if(e.target.files[0]) handleScanLabel(e.target.files[0]); e.target.value=""; }} />
                </label>
              )}
              {labelScanning && (
                <div className="flex flex-col items-center py-8 gap-3">
                  <div className="text-3xl animate-spin">⏳</div>
                  <p className="text-sm" style={{color:"rgba(255,255,255,0.72)",margin:0}}>{t("readingLabel")}</p>
                  <LoadingFoodFact lang={lang} />
                </div>
              )}
              {labelError && <p className="mt-2 text-sm" style={{color:"#fca5a5"}}>{labelError}</p>}
              {labelItem && (
                <div className="space-y-3">
                  <div className="rounded-lg border p-3" style={{background:"rgba(6,78,59,0.35)",borderColor:"rgba(134,239,172,0.35)"}}>
                    <p className="text-xs font-semibold mb-1" style={{color:"#86efac"}}>✅ Label read!</p>
                    <p className="font-bold" style={{color:"#fff"}}>{labelItem.name}</p>
                    <p className="text-xs" style={{color:"rgba(255,255,255,0.55)"}}>{labelItem.category} · {labelItem.location}</p>
                    <p className="text-xs mt-1" style={{color:"rgba(255,255,255,0.75)"}}>{labelItem.dateType}: {labelItem.date || "Not found"}</p>
                    <p className="text-sm font-bold mt-2 mb-1" style={{color:"rgba(255,255,255,0.92)"}}>📅 {t("expDateLabel")} {labelItem.date && <span className="text-xs font-normal" style={{color:"#86efac"}}>✓ auto-detected</span>}</p>
                    <VoiceDateNextHint lang={lang} text={t("pendingDateVoiceHint")} />
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <button type="button" onClick={() => handleVoiceDate("labelDate")} className={`rounded-xl py-3 text-sm font-bold ${voiceListening === "labelDate" ? "tf-voice-listening" : "tf-glass-primary-btn"}`}>🎤 {voiceListening === "labelDate" ? "Listening..." : "Speak Date"}</button>
                      <label className="rounded-xl py-3 text-sm font-bold tf-glass-primary-btn" style={{display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>📅 Enter Date<input type="date" value={labelItem.date||""} onChange={(e) => setLabelItem(prev=>({...prev,date:e.target.value,dateFound:true}))} style={{position:"absolute",opacity:0,width:"1px",height:"1px"}} /></label>
                    </div>
                    {(voiceListening === "labelDate" || labelItem.date) && <p className="text-xs mt-1" style={{color: labelItem.date ? "#86efac" : "#fca5a5"}}>{voiceListening === "labelDate" ? "🎤 Listening... say e.g. March 20 2026" : "✓ " + labelItem.date}</p>}
                    {labelItem.storageTip && <p className="tf-instruction-hint--inline tf-instruction-hint--left" style={{ marginTop: "0.25rem" }}>💡 {labelItem.storageTip}</p>}
                    {isProduceCategory(labelItem.category) && formatInGeneralInstruction(labelItem, lang) ? (
                      <p className="text-xs text-blue-600 mt-1">🥬 {formatInGeneralInstruction(labelItem, lang)}</p>
                    ) : null}
                    {!isProduceCategory(labelItem.category) && labelItem.openedTip && <p className="text-xs text-orange-600 mt-1">⚠️ {labelItem.openedTip}</p>}
                    {!isProduceCategory(labelItem.category) && labelItem.daysAfterOpening ? <p className="text-xs text-blue-600 mt-1">📅 Use within {labelItem.daysAfterOpening} days of opening</p> : null}
                  </div>
                  <button onClick={handleAddLabelItem} className="w-full rounded-xl py-2.5 text-sm btn-green-3d">{labelScanMode === "multi" ? t("addAndNext") : t("addToTracker")}</button>
                  <button type="button" onClick={() => { setLabelItem(null); setLabelError(""); }} className="w-full rounded-xl py-2 text-sm font-bold tf-glass-primary-btn">{t("scanAnother")}</button>
                </div>
              )}
              <button type="button" onClick={() => { setShowLabelScanner(false); setLabelItem(null); setLabelError(""); setLabelScanCount(0); setLabelLastItem(""); setLabelScanMode(null); }} className="mt-3 w-full rounded-xl py-2.5 text-sm font-bold tf-glass-primary-btn" style={{background:"rgba(16,185,129,0.35)"}}>{labelScanCount > 0 ? (lang === "es" ? "✅ Listo (" + labelScanCount + " artículos)" : "✅ Done (" + labelScanCount + " items added)") : t("cancel")}</button>
              </>}
            </div>
          </div>
        )}

        {activeTab === "home" && (
          <div
            ref={homeTopRef}
            style={{
              marginLeft: "-1rem",
              marginRight: "-1rem",
              marginTop: "-1rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingTop: "1.25rem",
              paddingBottom: "2rem",
              background: "transparent",
            }}
          >
            <p
              style={{
                fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 600,
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.82)",
                textAlign: "center",
                margin: "0 0 1.25rem",
                lineHeight: 1.5,
              }}
            >
              {lang === "es" ? "Escanea para llevar la cuenta de la frescura" : "Scan to Track Freshness"}
            </p>
            {coachTip && (
              <CoachTipCard
                lang={lang}
                tip={coachTip}
                onAction={handleCoachAction}
                onDismiss={dismissCoachFlow}
              />
            )}
            {/* ── Your Kitchen Today panel ── always visible ── */}
            {(() => {
              const isEs = lang === "es";
              const expired       = [...itemsWithCountdown].filter(it => it.daysLeft !== null && it.daysLeft < 0).sort((a,b) => a.daysLeft - b.daysLeft);
              const expiringToday = [...itemsWithCountdown].filter(it => it.daysLeft !== null && it.daysLeft === 0);
              const useSoon       = [...itemsWithCountdown].filter(it => it.daysLeft !== null && it.daysLeft >= 1 && it.daysLeft <= 3).sort((a,b) => a.daysLeft - b.daysLeft);
              const alertItems    = [...expired, ...expiringToday, ...useSoon];
              const hasAlerts     = alertItems.length > 0;
              const hasPastDate = itemsWithCountdown.some(itemIsPastDate);
              const subtitle = hasAlerts
                ? null
                : (isEs ? "Todo se ve bien hoy" : "Everything looks good today");
              const accentColor = hasAlerts ? "#dc2626" : "#4ade80";

              const UrgentAlertCard = ({ item }) => {
                const d = item.daysLeft;
                const isPastDue = d !== null && d < 0;
                let statusLabel;
                if (d < 0) statusLabel = isEs ? "Fecha pasada" : "Past Date";
                else if (d === 0) statusLabel = isEs ? "Vence hoy" : "Expires today";
                else statusLabel = isEs ? `${d} día${d === 1 ? "" : "s"}` : `${d} day${d === 1 ? "" : "s"} left`;
                const displayName = item.brand ? `${item.brand} ${item.name}` : item.name;
                return (
                  <div className={`tf-kitchen-urgent-item${isPastDue ? " tf-kitchen-urgent-item--past-due" : ""}`}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", minWidth: 0, flex: 1 }}>
                      <span aria-hidden="true" style={{ fontSize: "0.85rem", flexShrink: 0 }}>🔴</span>
                      <span className="tf-kitchen-urgent-item__name">{displayName}</span>
                      {item.openDate && <span style={{ fontSize: "0.6rem", color: "#fecaca", fontWeight: 700, flexShrink: 0 }}>📂</span>}
                    </div>
                    <span className="tf-kitchen-urgent-item__badge">{statusLabel}</span>
                  </div>
                );
              };

              if (trackedItems.length === 0) {
                return (
                  <div className="tf-glass-window">
                    <div style={{marginBottom:"0.75rem"}}>
                      <h2 className="app-section-h2" style={{margin:0}}>🍽️ {isEs?"Tu Cocina Hoy":"Your Kitchen Today"}</h2>
                    </div>
                    <div className="tf-card-surface" style={{textAlign:"center",padding:"2.25rem 1.5rem 2rem",marginBottom:0}}>
                      <div style={{fontSize:"2.5rem",marginBottom:"0.85rem",lineHeight:1}}>🥦</div>
                      <p className="tf-instruction-hint--inline" style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.55rem", lineHeight: 1.4, textAlign: "center" }}>
                        {isEs ? "Tu Cocina Hoy cobrará vida a medida que construyas tu inventario." : "Your Kitchen Today will come to life as you build your inventory."}
                      </p>
                      <InstructionHint style={{ margin: "0 0 1.5rem" }}>
                        {t("trackerStartOrderHint")}
                      </InstructionHint>
                      <button onClick={handleGoToTracker} className="glass-scan-btn tf-home-go-tracker-btn" style={{fontSize:"0.88rem",padding:"0.7rem 1.75rem"}}>
                        {isEs ? "Ir al Rastreador →" : "Go to Tracker →"}
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <div className="tf-glass-window">
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"0.75rem",gap:"0.75rem"}}>
                    <div style={{minWidth:0}}>
                      <h2 className="app-section-h2" style={{margin:0}}>🍽️ {isEs?"Tu Cocina Hoy":"Your Kitchen Today"}</h2>
                      {subtitle && (
                        <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.75)", marginTop: "0.2rem", fontWeight: 500, marginBottom: 0 }}>
                          {subtitle}
                        </p>
                      )}
                    </div>
                    <button type="button" onClick={() => setActiveTab("tracker")} className="tf-glass-scan" style={{fontSize:"0.72rem",fontWeight:700,color:"#86efac",borderRadius:"999px",padding:"0.3rem 0.75rem",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,lineHeight:1.4,minHeight:"2rem",display:"flex",alignItems:"center"}}>
                      {isEs?"Ver Todo":"See All"} ›
                    </button>
                  </div>
                  <div className="tf-card-surface" style={{borderLeft:`4px solid ${accentColor}`,padding:"1rem 1.1rem",marginBottom:"1.25rem"}}>
                    {hasAlerts ? (
                      <>
                        {!hasPastDate && alertItems.length > 0 && (
                          <p
                            style={{
                              fontSize: "0.82rem",
                              fontWeight: 800,
                              color: "#fecaca",
                              marginBottom: "0.65rem",
                              lineHeight: 1.45,
                              textShadow: "0 0 14px rgba(239,68,68,0.75), 0 2px 6px rgba(0,0,0,0.5)",
                              background: "rgba(127,29,29,0.35)",
                              border: "1px solid rgba(248,113,113,0.55)",
                              borderRadius: "10px",
                              padding: "0.55rem 0.7rem",
                            }}
                          >
                            <span aria-hidden="true" style={{ marginRight: "0.35em" }}>🔴</span>
                            {isEs
                              ? `${alertItems.length} artículo${alertItems.length > 1 ? "s" : ""} por vencer pronto`
                              : `${alertItems.length} item${alertItems.length > 1 ? "s" : ""} expiring soon`}
                          </p>
                        )}
                        <div className="tf-kitchen-urgent-list" role="list" aria-label={isEs ? "Artículos vencidos o por vencer" : "Past due and expiring items"}>
                          {alertItems.map((it) => (
                            <UrgentAlertCard key={it.id} item={it} />
                          ))}
                        </div>
                      </>
                    ) : (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "0.75rem 0 0.875rem",
                          color: "#bbf7d0",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          textShadow: "0 0 6px rgba(52,211,153,0.4), 0 0 14px rgba(34,197,94,0.2)",
                          boxShadow: "0 0 22px rgba(34,197,94,0.12)",
                          borderRadius: "10px",
                        }}
                      >
                        ✅ {isEs ? "Todo fresco — ¡buen trabajo!" : "Everything looks fresh — great job!"}
                      </div>
                    )}
                  </div>
                  <button onClick={() => { setActiveTab("tracker"); }} className="glass-scan-btn w-full" style={{padding:"0.9rem 1rem",fontSize:"0.875rem",flexDirection:"row",justifyContent:"center",gap:"0.6rem"}}>
                    <span style={{fontSize:"1.4rem"}}>📂</span>
                    <span style={{fontWeight:800}}>{isEs ? "Marcar Lo Que Abrí" : "Mark What You've Opened"}</span>
                  </button>
                </div>
              );
            })()}

            <div className="tf-glass-window tf-glass-window--flush">
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: String.fromCodePoint(0x1F966), label: lang === "es" ? "Rastreador" : "Tracker",    sub: lang === "es" ? "Rastrea tu Comida" : "Track Your Food",    action: () => setActiveTab("tracker") },
                { icon: String.fromCodePoint(0x1F373), label: lang === "es" ? "Recetas" : "Recipes",       sub: lang === "es" ? "Usa Lo Que Tienes" : "Use What You Have",  action: () => setActiveTab("recipes") },
                { icon: String.fromCodePoint(0x1F6D2), label: lang === "es" ? "Lista de Compras" : "Shopping List", sub: lang === "es" ? "Tu Lista" : "Build Your List",         action: () => setActiveTab("shopping") },
                { icon: String.fromCodePoint(0x1F4C5), label: lang === "es" ? "Comidas" : "Meals",         sub: lang === "es" ? "Tu Semana" : "Plan Your Week",              action: () => setActiveTab("meals") },
                { icon: "🏪",                           label: lang === "es" ? "Tiendas" : "Stores",        sub: lang === "es" ? "Enlaza y Compra" : "Link And Shop",          action: () => setActiveTab("stores-page") },
                { icon: "⚠️",                           label: lang === "es" ? "Alertas FDA" : "FDA Recalls", sub: lang === "es" ? "Revisa Diario" : "Check Daily",           action: () => setShowRecallsPanel(true) },
                { icon: "🤝",                           label: lang === "es" ? "Socios" : "Partners",       sub: lang === "es" ? "Beneficios y Dar" : "Benefits & Giving Back", action: () => setActiveTab("partners") },
                { icon: "💰",                           label: lang === "es" ? "Buscar y Ahorrar" : "Search & Save", sub: lang === "es" ? "20% en caja" : "20% at checkout",             action: () => setActiveTab("search-save") },
                { icon: "💬",                           label: lang === "es" ? "Sugerencias" : "Suggestions", sub: lang === "es" ? "Tu Opinión" : "Share Feedback",           action: () => setActiveTab("suggestions") },
              ].map(({ icon, label, sub, action }) => {
                const isTrackerTile = label === (lang === "es" ? "Rastreador" : "Tracker");
                const isShoppingTile = label === (lang === "es" ? "Lista de Compras" : "Shopping List");
                return (
                  <button key={label} onClick={action} className={`dash-tile${isTrackerTile ? " dash-tile--tracker-home" : ""}${isTrackerTile && trackerTileFlash ? " tracker-tile-active" : ""}`}>
                    <span style={{fontSize:"2rem",...(isShoppingTile ? {filter:"drop-shadow(0 0 4px rgba(249,115,22,0.55)) brightness(1.13)",display:"inline-block"} : {})}}>{icon}</span>
                    <span style={{fontSize:"0.7rem",fontWeight:700,color:"#fff",letterSpacing:"0.02em",textAlign:"center",lineHeight:1.2}}>{label}</span>
                    {sub && <span style={{fontSize:"0.6rem",fontWeight:600,color:"#86efac",textAlign:"center",lineHeight:1.2}}>{sub}</span>}
                  </button>
                );
              })}
            </div>
            </div>

            <div className="tf-glass-window tf-glass-window--legal" aria-label={lang === "es" ? "Aviso legal y seguridad alimentaria" : "Legal and food safety notice"}>
              <h3 className="tf-home-legal-h" role="heading" aria-level={2}>
                <span aria-hidden="true" style={{ marginRight: "0.35em" }}>⚠️</span>
                {lang === "es" ? "Aviso de seguridad importante" : "Important Safety Notice"}
              </h3>
              <div className="tf-home-legal-body">
                {lang === "es" ? (
                  <>
                    <p>
                      <strong>Términos de uso y seguridad alimentaria.</strong> TrackFresh se ofrece solo con fines informativos y de organización. Las fechas, estimaciones de vida útil, retiros, recetas y contenido generado por IA pueden estar incompletos o ser inexactos. Usted es el único responsable de verificar las fechas de caducidad, el almacenamiento y la inocuidad de los alimentos con el empaque del producto, el fabricante y profesionales cualificados antes de consumir o desechar alimentos. TrackFresh no proporciona asesoramiento médico, nutricional ni legal. El uso de la aplicación es bajo su propio riesgo. Siga siempre las recomendaciones de USDA, FDA y las autoridades sanitarias locales para la manipulación y conservación de alimentos.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Terms of Use &amp; Food Safety.</strong> TrackFresh is provided for informational and organizational purposes only. Dates, shelf-life estimates, recalls, recipes, and AI-generated content may be incomplete or inaccurate. You are solely responsible for verifying expiration dates, storage guidance, and food safety using product packaging, manufacturers, and qualified professionals before consuming or discarding food. TrackFresh does not provide medical, nutritional, or legal advice. Use of the app is at your own risk. Always follow USDA, FDA, and local health authority guidance for food handling and storage.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "tracker" && (
          <div ref={trackerTopRef} style={{display:"flex",flexDirection:"column",gap:"0.75rem"}}>

            {/* Header — always visible */}
            <div className={trackerEntryFlash ? "tracker-entry-flash" : ""} style={{marginBottom:"0.5rem",padding:trackerEntryFlash?"0.4rem 0.5rem":"0",transition:"padding 0s"}}>
              <h2
                className="text-xl font-semibold"
                style={{
                  margin: 0,
                  color: "rgba(255,255,255,0.93)",
                  letterSpacing: "0.06em",
                  fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  lineHeight: 1.35,
                }}
              >
                {lang === "es" ? "Escanea para llevar la cuenta de la frescura" : "Scan to Track Freshness"}
              </h2>
            </div>

            {trackedItems.length === 0 ? (
              /* ── EMPTY STATE ── */
              <div className="tf-glass-window">
                <div className="tf-card-surface" style={{textAlign:"center",padding:"1.25rem 1rem 1rem",marginBottom:"0.75rem"}}>
                  <div style={{fontSize:"2rem",marginBottom:"0.5rem",lineHeight:1}}>🥦</div>
                  <InstructionHint style={{ margin: 0 }}>
                    {t("trackerStartOrderHint")}
                  </InstructionHint>
                </div>

                <div>
                  <button onClick={() => { setShowReceiptScanner(true); }} className="w-full tf-glass-scan" style={{...TRACKER_SCAN_BTN_LAYOUT, padding:"0.85rem 1rem", marginBottom:"0.75rem"}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem"}}><span style={{fontSize:"1.25rem",lineHeight:1}} aria-hidden>📄</span><span>{t("scanReceipts")}</span></div>
                    <span style={{display:"inline-block",background:"linear-gradient(135deg,#F0C070,#E8A63C)",color:"#000",fontWeight:800,fontSize:"0.65rem",borderRadius:"999px",padding:"0.2rem 0.75rem",boxShadow:"0 2px 6px rgba(232,166,60,0.4)"}}>⭐ {lang === "es" ? "Empieza aquí para mejores resultados" : "Start here for best results"}</span>
                  </button>
                  <button onClick={() => setShowGroceryScan(true)} className="w-full tf-glass-scan tf-glass-scan--accent" style={{...TRACKER_SCAN_BTN_LAYOUT, padding:"0.85rem 0.35rem", marginBottom:"0.5rem"}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem"}}><span style={{fontSize:"1.2rem",lineHeight:1}} aria-hidden>✨</span><span>{t("smartScanTitle")}</span></div>
                    <span style={{display:"inline-block",background:"linear-gradient(135deg,#F0C070,#E8A63C)",color:"#000",fontWeight:800,fontSize:"0.65rem",borderRadius:"999px",padding:"0.2rem 0.75rem",boxShadow:"0 2px 6px rgba(232,166,60,0.4)"}}>{lang==="es"?"Varios artículos, códigos y etiquetas":"Mult. items barcodes and labels"}</span>
                  </button>
                  <button onClick={() => setShowQuickAdd(true)} className="w-full tf-glass-scan" style={{...TRACKER_SCAN_BTN_LAYOUT, padding:"0.85rem 0.35rem", marginTop:"0.5rem"}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem"}}><span style={{fontSize:"1.1rem",lineHeight:1}} aria-hidden>✏️</span><span>{t("quickAdd")}</span></div>
                    <span style={{display:"inline-block",background:"linear-gradient(135deg,#F0C070,#E8A63C)",color:"#000",fontWeight:800,fontSize:"0.65rem",borderRadius:"999px",padding:"0.2rem 0.75rem",boxShadow:"0 2px 6px rgba(232,166,60,0.4)"}}>{t("quickAddTrackerBar")}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* ── POPULATED STATE ── */
              <>
                <div className="tf-glass-window">
                {/* Summary bar */}
                {(() => {
                  const pastDateCount = itemsWithCountdown.filter(itemIsPastDate).length;
                  const soonCount = itemsWithCountdown.filter(it => it.daysLeft !== null && it.daysLeft >= 0 && it.daysLeft <= 3).length;
                  const msg = pastDateCount > 0
                    ? pastDateAlertMessage(pastDateCount, lang)
                    : soonCount > 0
                    ? (lang === "es" ? `Tienes ${soonCount} artículo${soonCount > 1 ? "s" : ""} para usar pronto.` : `You have ${soonCount} item${soonCount > 1 ? "s" : ""} to use soon.`)
                    : (lang === "es" ? "Todo fresco — ¡buen trabajo!" : "Everything looks fresh — great job!");
                  const isPastDateAlert = pastDateCount > 0;
                  const isAlert = isPastDateAlert || soonCount > 0;
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
                    <div style={{display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.6rem 0.9rem",background: isPastDateAlert ? "rgba(127,29,29,0.45)" : isAlert ? "rgba(251,191,36,0.1)" : "rgba(34,197,94,0.08)",border:`1px solid ${isPastDateAlert ? "rgba(248,113,113,0.55)" : isAlert ? "rgba(251,191,36,0.25)" : "rgba(34,197,94,0.2)"}`,borderRadius:"12px",boxShadow: isPastDateAlert ? "0 0 20px rgba(239,68,68,0.35)" : "none"}}>
                      <span style={{fontSize:"0.95rem",flexShrink:0}}>{isPastDateAlert ? "🔴" : isAlert ? "⚠️" : "✅"}</span>
                      <span style={{color: isPastDateAlert ? "#fecaca" : isAlert ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.72)",fontSize: isPastDateAlert ? "0.9rem" : "0.83rem",fontWeight: isPastDateAlert ? 800 : 500,lineHeight:1.4,textShadow: isPastDateAlert ? "0 0 10px rgba(239,68,68,0.5)" : "none"}}>{msg}</span>
                    </div>
                  );
                })()}

                <div
                  style={{
                    marginTop: "0.65rem",
                    padding: "0.75rem 0.9rem",
                    borderRadius: "12px",
                    background: "rgba(250,204,21,0.08)",
                    border: "1px solid rgba(250,204,21,0.28)",
                  }}
                >
                  <p style={{ margin: "0 0 0.35rem", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.06em", color: "#fde68a", textTransform: "uppercase" }}>
                    💰 {t("savingsMonthTitle")}
                  </p>
                  {monthSavings.totalUSD > 0 ? (
                    <>
                      <p style={{ margin: "0 0 0.25rem", fontSize: "0.95rem", fontWeight: 800, color: "#fff", lineHeight: 1.35 }}>
                        <span style={{ color: "#86efac" }}>{formatUSD(monthSavings.savedUSD)}</span>
                        {" "}{t("savingsSaved")}
                        {" · "}
                        <span style={{ color: "#fca5a5" }}>{formatUSD(monthSavings.wastedUSD)}</span>
                        {" "}{t("savingsWasted")}
                      </p>
                      <p style={{ margin: 0, fontSize: "0.78rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.45 }}>
                        {t("savingsUsedPct")
                          .replace("{pct}", String(monthSavings.savedPct))
                          .replace("{waste}", String(monthSavings.wastePct))}
                      </p>
                    </>
                  ) : (
                    <InstructionHint style={{ margin: 0, fontSize: "0.8rem" }}>{t("savingsReceiptHint")}</InstructionHint>
                  )}
                </div>

                {/* Track Your Food + scan actions */}
                <div>
                  <span className="app-section-label">{String.fromCodePoint(0x1F966)} {t("tracker")}</span>
                </div>
                <div>
                  <button onClick={() => { setShowReceiptScanner(true); }} className="w-full tf-glass-scan" style={{...TRACKER_SCAN_BTN_LAYOUT, padding:"0.85rem 1rem", marginBottom:"0.75rem"}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem"}}><span style={{fontSize:"1.25rem",lineHeight:1}} aria-hidden>📄</span><span>{t("scanReceipts")}</span></div>
                    <span style={{display:"inline-block",background:"linear-gradient(135deg,#F0C070,#E8A63C)",color:"#000",fontWeight:800,fontSize:"0.65rem",borderRadius:"999px",padding:"0.2rem 0.75rem",boxShadow:"0 2px 6px rgba(232,166,60,0.4)"}}>⭐ {lang === "es" ? "Empieza aquí para mejores resultados" : "Start here for best results"}</span>
                  </button>
                  <button onClick={() => setShowGroceryScan(true)} className="w-full tf-glass-scan tf-glass-scan--accent" style={{...TRACKER_SCAN_BTN_LAYOUT, padding:"0.85rem 0.35rem", marginBottom:"0.5rem"}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem"}}><span style={{fontSize:"1.2rem",lineHeight:1}} aria-hidden>✨</span><span>{t("smartScanTitle")}</span></div>
                    <span style={{display:"inline-block",background:"linear-gradient(135deg,#F0C070,#E8A63C)",color:"#000",fontWeight:800,fontSize:"0.65rem",borderRadius:"999px",padding:"0.2rem 0.75rem",boxShadow:"0 2px 6px rgba(232,166,60,0.4)"}}>{lang==="es"?"Varios artículos, códigos y etiquetas":"Mult. items barcodes and labels"}</span>
                  </button>
                  <button onClick={() => setShowQuickAdd(true)} className="w-full tf-glass-scan" style={{...TRACKER_SCAN_BTN_LAYOUT, padding:"0.85rem 0.35rem", marginTop:"0.5rem"}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem"}}><span style={{fontSize:"1.1rem",lineHeight:1}} aria-hidden>✏️</span><span>{t("quickAdd")}</span></div>
                    <span style={{display:"inline-block",background:"linear-gradient(135deg,#F0C070,#E8A63C)",color:"#000",fontWeight:800,fontSize:"0.65rem",borderRadius:"999px",padding:"0.2rem 0.75rem",boxShadow:"0 2px 6px rgba(232,166,60,0.4)"}}>{t("quickAddTrackerBar")}</span>
                  </button>
                </div>
                </div>

                {registerDiscountItems.length > 0 && (
                  <div
                    className="tf-glass-window"
                    style={{
                      marginBottom: "0.75rem",
                      padding: "0.85rem 1rem",
                      border: "2px solid rgba(245, 158, 11, 0.65)",
                      background: "linear-gradient(180deg, rgba(245,158,11,0.18) 0%, rgba(0,0,0,0.45) 100%)",
                      boxShadow: "0 0 22px rgba(249, 115, 22, 0.28)",
                    }}
                  >
                    <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: 800, color: "#fde68a", lineHeight: 1.45 }}>
                      🏷️ {registerDiscountItems.length} {t("storeDiscountBanner")}
                    </p>
                    <button
                      type="button"
                      className="btn-amber-3d w-full rounded-xl py-2.5 text-sm font-bold mt-3"
                      onClick={() => setStoreDiscountItem(registerDiscountItems[0])}
                    >
                      {t("storeDiscountSee")} {t("storeDiscountBtn")} →
                    </button>
                  </div>
                )}

                {/* Items card */}
                <div className="tf-glass-window">
                  <p style={{color:"rgba(255,255,255,0.9)",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:"0.4rem",textAlign:"center"}}>Organize Tracked Items</p>
                  <Card className="tracker-items-card">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button onClick={() => { if (window.confirm(t("clearAllConfirm"))) { setTrackedItems([]); } }} className="rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">{t("clearAll")}</button>
                      </div>
                      <span style={{color:"rgba(255,255,255,0.75)",fontSize:"0.875rem",fontWeight:600}}>{filteredItems.length} item{filteredItems.length === 1 ? "" : "s"}</span>
                    </div>
                    <p style={{fontSize:"0.7rem",color:"#F59E0B",marginBottom:"0.35rem",fontWeight:500}}>{lang === "es" ? "Toca ▼ en cada artículo para ver detalles" : "Tap ▼ on each item to expand details"}</p>
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
                      <div className="tf-kitchen-grid">
                        {(filterLocation === "All" ? LOCATIONS : [filterLocation]).map((loc) => {
                          const locLabel = lang === "es"
                            ? { Fridge: "Refrigerador", Freezer: "Congelador", Pantry: "Despensa" }[loc]
                            : loc;
                          const locItems = filteredItems.filter((it) => (it.location ?? "Fridge") === loc);
                          return (
                            <section key={loc} className="tf-kitchen-col" aria-labelledby={`kitchen-col-${loc}`}>
                              <div id={`kitchen-col-${loc}`} className="tf-kitchen-col-header">
                                <span>{LOCATION_ICONS[loc]} {locLabel}</span>
                                <span className="tf-kitchen-col-count">{locItems.length}</span>
                              </div>
                              {locItems.length === 0 ? (
                                <p className="tf-kitchen-col-empty text-xs text-white/50">{lang === "es" ? "Vacío" : "Empty"}</p>
                              ) : (
                              <ul className="tf-pending-queue-list">
                        {locItems.map((it) => {
                          const isEs = lang === "es";
                          const expanded = trackerExpandedId === it.id;
                          const locKey = it.location ?? "Fridge";
                          const catKey = it.category ?? "Other";
                          const needsAttention = it.daysLeft === null || (it.daysLeft !== null && it.daysLeft <= 2);
                          const boxShadow = it.daysLeft !== null && it.daysLeft < 0 ? "0 0 20px rgba(239,68,68,0.6), 0 0 40px rgba(239,68,68,0.3)" : it.daysLeft !== null && it.daysLeft <= 2 ? "0 0 20px rgba(245,158,11,0.6), 0 0 40px rgba(245,158,11,0.3)" : it.daysLeft !== null && it.daysLeft <= 7 ? "0 0 15px rgba(251,191,36,0.5), 0 0 30px rgba(251,191,36,0.2)" : "none";
                          return (
                            <li key={it.id} className={`tf-pending-queue-item${expanded ? " tf-pending-queue-item--open" : ""}`} style={{ boxShadow }}>
                              <button type="button" className="tf-pending-queue-header" onClick={() => toggleTrackerExpand(it.id)} aria-expanded={expanded}>
                                <span className={`tf-pending-queue-arrow${expanded ? " tf-pending-queue-arrow--open" : ""}`} aria-hidden>▼</span>
                                <div className="tf-pending-queue-summary">
                                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.35rem 0.45rem", width: "100%" }}>
                                    {it.daysLeft === null ? <span className="tf-pending-queue-chip tf-pending-queue-chip--exp">EXP</span> : null}
                                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${LOCATION_COLORS[locKey]}`}>
                                      {LOCATION_ICONS[locKey]} {locKey}
                                    </span>
                                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[catKey]}`}>{catKey}</span>
                                    <span className="tf-pending-queue-chip tf-pending-queue-chip--tip">{itemStorageTip(it, isEs)}</span>
                                    {needsAttention ? (
                                      <span className="tf-pending-status-blink">STATUS</span>
                                    ) : it.daysLeft !== null ? (
                                      <span className="tf-pending-status-ready">{it.daysLeft} {t("days")}</span>
                                    ) : null}
                                  </div>
                                  <span className="tf-pending-queue-name">{itemDisplayName(it)}</span>
                                </div>
                              </button>
                              {expanded && (
                              <div className="tf-pending-queue-body">
                              <div>
                                <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:"0.5rem"}}>
                                  <div>
                                    {itemPrice(it) != null && (
                                      <span className="text-xs" style={{ color: "#fde68a", fontWeight: 700 }}>{formatUSD(itemPrice(it))}</span>
                                    )}
                                    {it.quantity && <span className="text-xs ml-2" style={{color:"rgba(255,255,255,0.5)"}}>{it.quantity}</span>}
                                  </div>
                                  <div style={{marginLeft:"0.5rem",flexShrink:0,textAlign:"center"}}>
                                    {it.daysLeft !== null && (() => {
                                      const d = it.daysLeft;
                                      const [color, border] = d < 0 || d <= 2 ? ["#ef4444","3px solid #ef4444"] : d <= 4 ? ["#f97316","3px solid #f97316"] : d <= 7 ? ["#eab308","3px solid #eab308"] : ["#4ade80","3px solid #4ade80"];
                                      const expiredLabel = isEs ? "Vencido" : "Expired";
                                      return (
                                        <div>
                                          <div style={{display:"inline-block",background:"transparent",border,borderRadius:"999px",padding:"0.18rem 0.55rem",fontSize:d < 0 ? "0.72rem" : "0.85rem",fontWeight:800,color,whiteSpace:"nowrap",lineHeight:1.2}}>{d < 0 ? expiredLabel : d}</div>
                                          <div className="text-xs mt-0.5" style={{color,opacity:0.8}}>{d < 0 ? "" : t("days")}</div>
                                        </div>
                                      );
                                    })()}
                                  </div>
                                </div>
                                <div className="tf-tracker-item-actions" style={{display:"flex",gap:"0.4rem",marginBottom:"0.5rem"}}>
                                  {it.daysLeft === null ? (
                                    <button onClick={() => handleEditItem(it.id)} className="animate-pulse" style={{flex:1,background:"#ef4444",borderRadius:"10px",padding:"0.3rem 0.4rem",fontSize:"0.68rem",fontWeight:800,color:"#fff",cursor:"pointer",textAlign:"center",lineHeight:1.35,border:"2px solid #ef4444"}}>EXP Date</button>
                                  ) : isRegisterDiscountEligible(it) ? (
                                    <button
                                      type="button"
                                      onClick={() => setStoreDiscountItem(it)}
                                      className="btn-amber-3d"
                                      style={{
                                        flex: 1,
                                        borderRadius: "10px",
                                        padding: "0.3rem 0.35rem",
                                        fontSize: "0.65rem",
                                        fontWeight: 800,
                                        border: "2px solid #f59e0b",
                                        cursor: "pointer",
                                        lineHeight: 1.25,
                                      }}
                                    >
                                      {t("storeDiscountBtn")}
                                    </button>
                                  ) : it.daysLeft <= 2 ? (
                                    <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(183,214,58,0.2)",borderRadius:"10px",padding:"0.3rem 0.4rem",fontSize:"0.68rem",fontWeight:800,color:"#B7D63A",border:"2px solid #B7D63A",textAlign:"center"}}>Expiring Soon</div>
                                  ) : (
                                    <div style={{flex:1}} />
                                  )}
                                  <button onClick={() => { setTrackedItems(prev => prev.map(x => { if (x.id !== it.id) return x; if (x.openDate) return { ...x, openDate: "", openUseBy: null }; const _td = new Date(); const today = `${_td.getFullYear()}-${String(_td.getMonth()+1).padStart(2,'0')}-${String(_td.getDate()).padStart(2,'0')}`; const days = x.daysAfterOpening || 5; const useBy = new Date(Date.now() + days * 86400000).toISOString().split("T")[0]; return { ...x, openDate: today, useByDate: useBy }; })); }} className="rounded-lg px-2 py-1 text-xs font-bold shadow-md" style={{flex:1,background: it.openDate ? "#6b7280" : "#f97316", color: it.openDate ? "rgba(255,255,255,0.88)" : "#fff", border:"none", textShadow:"0 1px 2px rgba(0,0,0,0.4)", cursor:"pointer"}}>{it.openDate ? (lang === "es" ? "¡Abierto!" : "Opened!") : (lang === "es" ? "¿Abierto?" : "Opened?")}</button>
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
                                  {(() => {
                                    if (it.category === "Produce") {
                                      const ig = formatInGeneralInstruction(it, lang);
                                      return ig ? <TipPill type="blue">🥬 {ig}</TipPill> : null;
                                    }
                                    const label = afterOpeningLabel(it) || (it.location === "Freezer" ? null : it.category === "Dairy" ? "Keep refrigerated, use within 7 days" : it.category === "Meat" ? "Cook or freeze within 2–3 days" : it.category === "Beverages" ? "Refrigerate after opening" : it.category === "Bread" ? "Use within 5 days or freeze" : "Check package for timing after opening");
                                    return label ? <TipPill type="blue">📂 After opening: {label}</TipPill> : null;
                                  })()}
                                  {it.freezeBy && it.location === "Fridge" && <TipPill type="cyan">🧊 Freeze by: {it.freezeBy}</TipPill>}
                                </div>
                              </div>
                              </div>
                              )}
                            </li>
                          );
                        })}
                              </ul>
                              )}
                            </section>
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
                  <p className="text-sm py-4 text-center tf-instruction-hint--inline" style={{ fontSize: "0.875rem" }}>{lang === "es" ? "Sin favoritos aún — ¡genera recetas y guarda las que te gusten!" : "No favorites yet — generate recipes and save ones you love!"}</p>
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
            <InstructionHint className="mb-4">
              {lang === "es" ? "Combinado con lo que tienes en tu refrigerador, despensa y congelador. Prioriza lo que vence primero — puede sugerir 1-2 ingredientes extra para completar un platillo." : "Matched to what's in your fridge, pantry & freezer. Prioritizes what expires soonest — may suggest 1-2 extra ingredients to complete a dish."}
            </InstructionHint>
            <button onClick={handleSuggestRecipes} disabled={recipesLoading} className="glass-scan-btn inline-flex items-center gap-2 px-5 py-2.5 text-sm disabled:opacity-50">{recipesLoading ? <><span className="animate-spin">🤖</span> <AiBadge style={{fontSize:"1.5em"}} /> is cooking...</> : <><ChefHat className="h-4 w-4" /> {lang === "es" ? "Ideas de Recetas" : "AI Recipe Ideas"} <AiBadge style={{fontSize:"1.5em"}} /></>}</button>
            {recipesLoading && <div className="mt-4 flex justify-center"><LoadingFoodFact lang={lang} /></div>}
            {recipesGenerated && recipeSuggestions.length === 0 && <InstructionHint className="mt-4">{t("noMatches")}</InstructionHint>}
            {recipeSuggestions.length > 0 && (
              <div className="mt-4 space-y-3">
                <InstructionHint className="mt-4">{t("recipeExpandHint")}</InstructionHint>
                {recipeSuggestions.map((r, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden" style={{background:"rgba(0,0,0,0.25)",border:"1px solid rgba(255,255,255,0.13)"}}>
                    <button
                      type="button"
                      onClick={() => setExpandedRecipe(expandedRecipe === i ? null : i)}
                      aria-expanded={expandedRecipe === i}
                      aria-label={expandedRecipe === i ? `${r.name} — ${t("recipeTapToHide")}` : `${r.name} — ${t("recipeTapForDetails")}`}
                      className="w-full p-4 text-left"
                      style={{borderRadius:"inherit",transition:"background 0.15s"}}
                      onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.06)"}
                      onMouseLeave={e=>e.currentTarget.style.background=""}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-white">{r.name}</h3>
                          <p className="text-xs mt-0.5 tf-instruction-hint--inline">
                            {expandedRecipe === i ? t("recipeTapToHide") : t("recipeTapForDetails")}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1 ml-2 shrink-0">
                          <span className="rounded px-2 py-0.5 text-xs font-semibold" style={{background:"rgba(249,115,22,0.25)",color:"#fed7aa"}}>⏱ {r.time}</span>
                          <span
                            className={`tf-instruction-hint__kw ${expandedRecipe === i ? "arrow-up" : "arrow-down"}`}
                            style={{ fontSize: "1.1rem", lineHeight: 1 }}
                            aria-hidden
                          >
                            {expandedRecipe === i ? "▲" : "▼"}
                          </span>
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
                              const addStatus = addedIngredients[ingKey];
                              return (
                                <li key={j} className="text-sm flex items-center flex-wrap gap-1" style={{color: isNeed ? "#F97316" : "rgba(255,255,255,0.8)"}}>
                                  <span style={{color:"#4ade80"}}>•</span>
                                  {ing}
                                  {isNeed && (
                                    addStatus ? (
                                      <span
                                        className="recipe-shop-added-msg"
                                        style={{
                                          marginLeft: "6px",
                                          fontSize: "0.72rem",
                                          fontWeight: 700,
                                          color: addStatus === "exists" ? "var(--tf-instruction-text)" : "#86efac",
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        {addStatus === "exists" ? t("alreadyOnShoppingList") : t("addedToShoppingList")}
                                      </span>
                                    ) : (
                                      <button
                                        type="button"
                                        aria-label={t("addedToShoppingList")}
                                        onClick={() => {
                                          const name = ing.replace(" (need)", "").trim();
                                          const exists = shoppingItems.some((s) => s.name.toLowerCase() === name.toLowerCase());
                                          if (exists) {
                                            setAddedIngredients((prev) => ({ ...prev, [ingKey]: "exists" }));
                                          } else {
                                            setShoppingItems((prev) => [...prev, { id: crypto.randomUUID(), name, checked: false }]);
                                            setAddedIngredients((prev) => ({ ...prev, [ingKey]: "added" }));
                                          }
                                          setTimeout(() => {
                                            setAddedIngredients((prev) => {
                                              const next = { ...prev };
                                              delete next[ingKey];
                                              return next;
                                            });
                                          }, 2200);
                                        }}
                                        style={{marginLeft:"4px",width:"18px",height:"18px",borderRadius:"50%",background:"#F97316",color:"#fff",border:"none",cursor:"pointer",fontSize:"13px",fontWeight:"bold",lineHeight:"18px",textAlign:"center",flexShrink:0,padding:0}}
                                      >
                                        +
                                      </button>
                                    )
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
            {!recipesGenerated && (
              <InstructionHint className="mt-4">
                You have {trackedItems.length} tracked item{trackedItems.length === 1 ? "" : "s"}. Click the button to see recipe matches.{trackedItems.length === 0 && " Add items in the Tracker tab first."}
              </InstructionHint>
            )}
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
                  <button onClick={handleAddShoppingItem} className="glass-scan-btn py-2 text-sm" style={{flex:"1"}}>{t("addBtn")}</button>
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
          <div className="fixed inset-0 z-[200] flex items-center justify-center tf-premium-overlay p-4">
            <div className="w-full max-w-lg rounded-xl p-6 tf-modal-glass-surface">
              <h2 className="mb-1 text-lg tf-modal-accent-h--mint">{t("pickAMeal")}</h2>
              <p className="mb-3 text-xs" style={{color:"rgba(255,255,255,0.55)"}}>{mealPickerDay} — {mealPickerSlot}</p>
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
                    <button
                      type="button"
                      key={r.name}
                      onClick={() => handleSetMeal(mealPickerDay, mealPickerSlot, r.name)}
                      className="w-full rounded-lg px-3 py-2 text-left text-sm tf-glass-primary-btn"
                      style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium" style={{color:"#fff"}}>{r.name}</span>
                        <div className="flex items-center gap-1">
                          {usesExpiring && <span className="text-xs" style={{color:"#fdba74"}}>⚡ {t("usesExpiring")}</span>}
                          <span className="text-xs" style={{color:"rgba(255,255,255,0.45)"}}>⏱ {r.time}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <button type="button" onClick={() => { setShowMealPicker(false); setMealPickerSearch(""); }} className="mt-3 w-full rounded-xl py-2 text-sm font-bold tf-glass-primary-btn">{t("cancel")}</button>
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
              {aiPlanLoading && <div className="mb-3 flex justify-center"><LoadingFoodFact lang={lang} /></div>}
              <InstructionHint className="mb-4" style={{ fontSize: "0.75rem" }}>{t("mealDesc")}</InstructionHint>
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

        {activeTab === "search-save" && (
          <div className="space-y-4">
            <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
              <div style={{textAlign:"center",marginBottom:"0.85rem"}}>
                <p style={{color:"#f59e0b",fontWeight:700,fontSize:"0.85rem",letterSpacing:"0.13em",textTransform:"uppercase",margin:0}}>
                  {lang === "es" ? "BUSCAR Y AHORRAR EN CAJA" : "SEARCH AND SAVE AT CHECKOUT"}
                </p>
              </div>
              <h2 className="text-base font-bold text-white" style={{margin:"0 0 0.35rem",textAlign:"center"}}>
                {lang === "es" ? "TrackFresh Buscar y Ahorrar — todos ganan" : "TrackFresh Search and Save — everyone wins"}
              </h2>
              <p className="text-xs text-green-200" style={{margin:"0 0 1rem",textAlign:"center",lineHeight:1.5}}>
                {lang === "es"
                  ? "Cuando encuentras un artículo que vence en 2 días o menos, TrackFresh te ayuda a ahorrar — y ayuda a la tienda a mover inventario antes de que se eche a perder."
                  : "When you find an item that expires within 2 days, TrackFresh helps you save — and helps the store move inventory before it goes to waste."}
              </p>
              <p style={{textAlign:"center",fontWeight:900,fontSize:"1.35rem",color:"#f59e0b",margin:"0 0 1rem"}}>20% OFF</p>
              <div className="space-y-3 mb-4">
                {[
                  [lang === "es" ? "Para consumidores" : "For consumers", lang === "es" ? "Ahorra con 'Buscar y Ahorrar' en productos que aún están buenos — no esperes al desperdicio." : "'Search & Save' money on food that's still good — don't wait until it's waste."],
                  [lang === "es" ? "Para tiendas" : "For stores", lang === "es" ? "Mejor control de inventario: vende antes del vencimiento y reduce mermas." : "Better inventory control: sell through before expiry and cut shrinkage."],
                  [lang === "es" ? "Para TrackFresh" : "For TrackFresh", lang === "es" ? "Valor añadido: engagement del usuario/ mayores ganancias para proveedores/ la app de referencia — menos desperdicio de alimentos, todo rastreado." : "Added value: User engagement/ Vendor increased profits/ The 'go to' App less food waste fully tracked."],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-xl px-3 py-3" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)"}}>
                    <h3 className="text-sm font-bold text-white" style={{margin:"0 0 0.35rem"}}>{title}</h3>
                    <p className="text-xs text-green-100" style={{margin:0,lineHeight:1.45}}>{text}</p>
                  </div>
                ))}
              </div>
              <ol className="space-y-3" style={{margin:0,padding:0,listStyle:"none"}}>
                {[
                  [lang === "es" ? "Rastrea" : "Track", lang === "es" ? "fechas mientras recorres los pasillos." : "dates as you peruse the aisles."],
                  [lang === "es" ? "Elegible:" : "Eligible:", lang === "es" ? "fecha de vencimiento o usar antes dentro de 2 días." : "expiry date or use-by date within 2 days."],
                  [lang === "es" ? "En caja:" : "At register:", lang === "es" ? "muestra la app; el cajero verifica la fecha, escanea y etiqueta el/los artículo(s) y luego aplica el código de descuento." : "show the app; clerk verifies date, scans and tags the item(s) then applies the discount code."],
                ].map(([label, text], i) => (
                  <li key={label} className="flex items-start gap-3">
                    <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:"1.5rem",height:"1.5rem",borderRadius:"999px",background:"rgba(245,158,11,0.25)",color:"#f59e0b",fontSize:"0.75rem",fontWeight:800,flexShrink:0}}>{i + 1}</span>
                    <span className="text-xs text-green-100" style={{lineHeight:1.45}}><strong className="text-white">{label}</strong> {text}</span>
                  </li>
                ))}
              </ol>
              <p className="text-xs text-green-300 opacity-80" style={{margin:"0.85rem 0 0",textAlign:"center"}}>
                {lang === "es" ? "Programa piloto en tiendas participantes." : "Pilot at participating stores."}
              </p>
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
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[["🛒","Shoppers"],["🏪","Supermarkets"],["🏭","Brands"]].map(([icon, label]) => (
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
              <p className="text-sm text-green-200 mb-4">Whether you&apos;re a supermarket or food brand — we&apos;d love to hear from you.</p>
              <a href="mailto:hello@trackfresh.ai" className="glass-scan-btn text-sm py-3" style={{textDecoration:"none",display:"flex",justifyContent:"center"}}>✉️ hello@trackfresh.ai</a>
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
              <InstructionHint className="mb-4">{t("shopOnlineDesc")}</InstructionHint>

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

        {showRecallsPanel && (
          <div
            className="tf-premium-overlay"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 10000,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              overflowY: "auto",
              padding: "1rem",
              paddingTop: "calc(env(safe-area-inset-top, 0px) + 3.75rem)",
              paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)",
            }}
            onClick={() => setShowRecallsPanel(false)}
          >
            <div
              className="w-full max-w-lg rounded-xl tf-modal-glass-surface"
              style={{
                maxHeight: "calc(100dvh - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px) - 5.5rem)",
                overflow: "auto",
                padding: "1.25rem",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <button type="button" onClick={() => setShowRecallsPanel(false)} className="tf-glass-primary-btn" style={{ fontSize: "0.9rem", padding: "0.35rem 0.75rem", gap: "4px" }}>
                  <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>←</span> {lang === "es" ? "Atrás" : "Back"}
                </button>
                <button type="button" onClick={() => setShowRecallsPanel(false)} className="tf-glass-primary-btn" style={{ borderRadius: "50%", width: "32px", height: "32px", fontSize: "1.1rem", padding: 0 }} aria-label={t("fdaClose")}>&#10005;</button>
              </div>
              <h2 className="tf-modal-accent-h" style={{ fontSize: "1.05rem", margin: "0 0 1rem", textAlign: "center", lineHeight: 1.35 }}>
                {lang === "es" ? "🛡️ GUARDIÁN DE COCINA: ALERTAS ACTIVAS" : "🛡️ KITCHEN GUARD: ACTIVE ALERTS"}
              </h2>
              {fdaLoading && <p style={{ textAlign: "center", color: "rgba(255,255,255,0.55)", padding: "2rem 0" }}>{t("fdaLoading")}</p>}
              {fdaRecalls.length === 0 && !fdaLoading && <p style={{ textAlign: "center", color: "rgba(255,255,255,0.55)", padding: "2rem 0" }}>{t("fdaError")}</p>}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {fdaRecalls.map((recall) => (
                  <div key={recall.id} style={{ background: "rgba(255,255,255,0.05)", borderRadius: "12px", padding: "1rem", borderLeft: recall.severity === "high" ? "4px solid #fbbf24" : "4px solid rgba(255,255,255,0.3)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#FFFFFF", lineHeight: 1.3 }}>{recall.product}</div>
                        <div style={{ fontSize: "0.75rem", color: "#fbbf24", marginTop: "3px" }}>Brand: {recall.brand}</div>
                        <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.9)", marginTop: "0.3rem" }}>{recall.reason}</div>
                        <div style={{ fontSize: "0.65rem", color: "rgba(251,191,36,0.8)", marginTop: "4px" }}>{recall.date}</div>
                      </div>
                      <span style={{ fontSize: "0.6rem", fontWeight: 700, padding: "3px 8px", borderRadius: "999px", flexShrink: 0, textTransform: "uppercase", background: recall.severity === "high" ? "#fee2e2" : recall.severity === "medium" ? "#ffedd5" : "#f3f4f6", color: recall.severity === "high" ? "#b91c1c" : recall.severity === "medium" ? "#c2410c" : "#374151" }}>{recall.severity === "high" ? t("fdaClassI") : recall.severity === "medium" ? t("fdaClassII") : t("fdaClassIII")}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <button onClick={() => window.open("https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts", "_blank")} style={{ width: "100%", background: "linear-gradient(to bottom,#dc2626,#991b1b)", color: "white", border: "none", borderRadius: "10px", padding: "0.7rem", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer" }}>{t("fdaViewAll")} &#8594; FDA.gov</button>
                <button type="button" onClick={() => setShowRecallsPanel(false)} className="tf-glass-primary-btn" style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem" }}>{t("fdaClose")}</button>
              </div>
            </div>
          </div>
        )}

        {showExpiryVoice && (
          <div className="tf-premium-overlay" style={{position:"fixed",inset:0,zIndex:10500,display:"flex",alignItems:"flex-end",justifyContent:"center",padding:"1rem"}}>
            <div className="tf-modal-glass-surface tf-premium-sheet" style={{borderRadius:"20px 20px 16px 16px",width:"100%",maxWidth:"440px",boxShadow:"0 -4px 32px rgba(0,0,0,0.45)",display:"flex",flexDirection:"column",maxHeight:"62vh",overflow:"hidden"}}>
              {/* Sticky header */}
              <div style={{flexShrink:0,padding:"1rem 1.25rem 0.75rem",borderBottom:"1px solid rgba(255,255,255,0.12)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                    <span style={{fontSize:"1.4rem"}}>{expiryVoiceStatus === "listening" ? "🔴" : expiryVoiceStatus === "done" ? "✅" : "🎙️"}</span>
                    <div>
                      <p className="tf-modal-accent-h--mint" style={{fontSize:"0.95rem",margin:0}}>Expiry Date Assistant</p>
                      <p style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.55)",marginTop:"0.1rem"}}>
                        {expiryVoiceStatus === "speaking" && "Speaking…"}
                        {expiryVoiceStatus === "listening" && "🔴 Listening — say product name + date"}
                        {expiryVoiceStatus === "done" && "All done!"}
                      </p>
                    </div>
                  </div>
                  <button type="button" onClick={stopExpiryVoiceFlow} className="tf-glass-primary-btn" style={{borderRadius:"50%",width:"32px",height:"32px",fontSize:"1.1rem",padding:0}}>&times;</button>
                </div>
              </div>

              {/* Scrollable middle — instructions + item list */}
              <div style={{flex:"1 1 auto",overflowY:"auto",padding:"0.75rem 1.25rem"}}>
                {expiryVoiceStatus === "listening" && (
                  <div style={{background:"rgba(6,78,59,0.55)",border:"0.5px solid rgba(183,214,58,0.45)",borderRadius:"12px",padding:"0.65rem",marginBottom:"0.6rem"}}>
                    <p style={{fontSize:"0.8rem",fontWeight:700,color:"#ecfccb",marginBottom:"0.3rem",textAlign:"center"}}>
                      Say: <span style={{background:"rgba(0,0,0,0.35)",color:"white",borderRadius:"6px",padding:"0.1rem 0.45rem",fontFamily:"ui-monospace,monospace",fontSize:"0.78rem"}}>product name</span>
                      {" + "}
                      <span style={{background:"rgba(183,214,58,0.35)",color:"#ecfccb",borderRadius:"6px",padding:"0.1rem 0.45rem",fontFamily:"ui-monospace,monospace",fontSize:"0.78rem"}}>month day year</span>
                    </p>
                    <p style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.75)",textAlign:"center",marginBottom:"0.3rem"}}>
                      e.g. <em>"Milk, <strong>March 20 2026</strong>"</em> &nbsp;·&nbsp; <em>"Chicken <strong>Apr 5</strong>"</em>
                    </p>
                    <p style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.5)",textAlign:"center"}}>Say <strong>"no"</strong>, <strong>"skip"</strong>, or <strong>"done"</strong> to exit</p>
                    <VoiceDateNextHint lang={lang} text={t("pendingDateVoiceHint")} />
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
                            <div key={i} style={{display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.35rem 0.6rem",borderRadius:"8px",background:"rgba(16,185,129,0.2)",border:"0.5px solid rgba(134,239,172,0.4)",marginBottom:"0.25rem"}}>
                              <span style={{color:"#86efac",fontWeight:900,fontSize:"0.85rem"}}>✓</span>
                              <span style={{flex:1,fontSize:"0.8rem",fontWeight:600,color:"#fff"}}>{entry.name}</span>
                              <span style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.55)"}}>{entry.dateStr}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {remaining.length > 0 && expiryVoiceStatus !== "done" && (
                        <div>
                          <p style={{fontSize:"0.68rem",fontWeight:700,color:"rgba(255,255,255,0.5)",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:"0.35rem"}}>Still needed ({remaining.length}):</p>
                          <div style={{display:"flex",flexWrap:"wrap",gap:"0.3rem"}}>
                            {remaining.map((it, i) => (
                              <span key={i} style={{background:"rgba(255,255,255,0.08)",border:"0.5px solid rgba(255,255,255,0.25)",borderRadius:"999px",padding:"0.2rem 0.6rem",fontSize:"0.72rem",fontWeight:600,color:"rgba(255,255,255,0.85)"}}>{it.name}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>

              {/* Sticky footer — always visible */}
              <div style={{flexShrink:0,padding:"0.75rem 1.25rem 1rem",borderTop:"1px solid rgba(255,255,255,0.12)"}}>
                <button type="button" onClick={stopExpiryVoiceFlow} className="w-full tf-glass-primary-btn" style={{padding:"0.75rem",fontSize:"0.875rem",background:"rgba(16,185,129,0.3)"}}>
                  ✅ Done — Skip Remaining
                </button>
              </div>
            </div>
          </div>
        )}

        {usedPortionItem && (() => {
          const price = itemPrice(usedPortionItem) || 0;
          const portions = USED_PORTION_FRACTIONS.map((fraction) => ({
            fraction,
            label: usedPortionButtonLabel(fraction),
          }));
          return (
            <div className="fixed inset-0 z-[10060] flex items-center justify-center p-4 tf-premium-overlay">
              <div
                className="w-full max-w-sm tf-modal-glass-surface"
                style={{ borderRadius: "20px", padding: "1.25rem 1.25rem 1rem" }}
                role="dialog"
                aria-labelledby="used-portion-title"
              >
                <h3 id="used-portion-title" className="tf-modal-accent-h" style={{ fontSize: "1.05rem", margin: "0 0 0.35rem", textAlign: "center" }}>
                  {t("usedPortionTitle")}
                </h3>
                <p style={{ margin: "0 0 0.75rem", fontSize: "0.82rem", color: "rgba(255,255,255,0.75)", textAlign: "center", lineHeight: 1.45 }}>
                  {usedPortionItem.brand ? `${usedPortionItem.brand} ` : ""}{usedPortionItem.name}
                  {price > 0 ? ` · ${formatUSD(price)}` : ""}
                </p>
                <p style={{ margin: "0 0 1rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.55)", textAlign: "center", lineHeight: 1.4 }}>
                  {t("usedPortionHint")}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                  {portions.map(({ fraction, label }) => {
                    const { used, wasted } = splitPortionAmounts(price, fraction);
                    return (
                      <button
                        key={fraction}
                        type="button"
                        onClick={() => finalizeUseTodayItem(usedPortionItem, fraction)}
                        className="w-full py-3 rounded-xl font-bold text-base text-white btn-amber-3d tf-onboarding-cta"
                        style={{ color: "#ffffff", fontSize: "0.9rem" }}
                      >
                        {label}
                        {price > 0 && (
                          <span style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, opacity: 0.9, marginTop: "0.15rem" }}>
                            {formatUSD(used)} {t("usedPortionSaved")}
                            {fraction < 1 && wasted > 0 ? ` · ${formatUSD(wasted)} ${t("savingsWasted")}` : ""}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => setUsedPortionItem(null)}
                  className="w-full mt-3 py-2 rounded-xl tf-glass-primary-btn"
                  style={{ fontSize: "0.85rem" }}
                >
                  {t("cancel")}
                </button>
              </div>
            </div>
          );
        })()}

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
            <div className="tf-premium-overlay" style={{position:"fixed",inset:0,zIndex:9999,display:"flex",flexDirection:"column",justifyContent:"flex-end",paddingBottom:openedModalOffset,transition:"padding-bottom 0.2s ease"}}>
              <div className="tf-premium-sheet tf-modal-glass-surface" style={{borderRadius:"20px 20px 0 0",padding:"1.25rem 1.25rem calc(env(safe-area-inset-bottom) + 0.75rem)",maxHeight:`calc(90vh - ${openedModalOffset}px)`,display:"flex",flexDirection:"column",boxShadow:"0 -8px 40px rgba(0,0,0,0.45)",transition:"max-height 0.2s ease"}}>

                {/* Header */}
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1rem",flexShrink:0}}>
                  <h3 className="tf-modal-accent-h--mint" style={{fontSize:"1.1rem",margin:0}}>📂 {lang==="es"?"Marcar Lo Que Abrí":"Mark What You've Opened"}</h3>
                  <button type="button" onClick={() => { setShowOpenedModal(false); setOpenedConfirm(null); }} className="tf-glass-primary-btn" style={{borderRadius:"50%",width:32,height:32,padding:0,fontSize:"1.1rem"}}>✕</button>
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
          <div className="fixed inset-0 z-[100] flex items-end justify-center tf-premium-overlay" onClick={() => setShowTutorial(false)}>
            <div className="tut-modal w-full max-w-lg rounded-t-3xl p-6 tf-premium-sheet tf-modal-glass-surface" style={{borderBottom:"none",boxShadow:"0 -8px 40px rgba(0,0,0,0.45)"}} onClick={e => e.stopPropagation()}>
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
                  <h2 className="text-xl tf-modal-accent-h--mint mb-2" style={{textShadow:"0 2px 6px rgba(0,0,0,0.3)"}}>{step.title}</h2>
                  <p className="text-green-100 text-sm leading-relaxed">{step.body}</p>
                </div>
              </div>
              <div className="flex gap-3">
                {tutorialStep > 0 && (
                  <button onClick={() => setTutorialStep(s => s - 1)} className="back-btn" style={{border:"none"}}></button>
                )}
                {!isLast ? (
                  <button onClick={() => setTutorialStep(s => s + 1)} className="flex-1 rounded-2xl py-3 text-sm font-bold glass-scan-btn">{lang === "es" ? "Siguiente →" : "Next →"}</button>
                ) : (
                  <button type="button" onClick={() => setShowTutorial(false)} className="flex-1 rounded-2xl py-3 text-base font-extrabold tf-glass-primary-btn" style={{background:"rgba(232,166,60,0.18)",color:"#fef9c3"}}>🎉 {lang === "es" ? "¡Listo!" : "Got it!"}</button>
                )}
              </div>
              {!isLast && <button onClick={() => setShowTutorial(false)} className="mt-3 w-full text-center text-xs" style={{color:"rgba(255,255,255,0.35)",background:"none",border:"none",cursor:"pointer"}}>{lang === "es" ? "saltar tutorial" : "skip tutorial"}</button>}
            </div>
          </div>
        );
      })()}

      {tourMode && (
        <div className="tf-premium-bg" style={{position:"fixed",inset:0,zIndex:60,display:"flex",flexDirection:"column",overflowY:"auto"}}>
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
                {tourSlide === 2 && <button className="btn-amber-3d w-full" style={{marginTop:"1.25rem"}} onClick={() => { setTourMode(false); setTourSlide(0); }}>{lang === "es" ? `Probar ${t("smartScanTitle")}` : `Try ${t("smartScanTitle")}`}</button>}
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

    </>
  );
}

