"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Bell, PlusCircle, ChefHat, Users, ShoppingCart } from "lucide-react";

const STORAGE_KEY = "trackfresh.items";
const COMMUNITY_KEY = "trackfresh.community";
const USERNAME_KEY = "trackfresh.username";
const SHOPPING_KEY = "trackfresh.shopping";
const MEAL_KEY = "trackfresh.meals";

const CATEGORIES = ["Produce", "Dairy", "Meat", "Pantry", "Leftovers", "Other"];
const LOCATIONS = ["Fridge", "Freezer", "Pantry"];

const FOOD_DB = [
  { name: "Apples", category: "Produce", location: "Fridge" },
  { name: "Avocado", category: "Produce", location: "Fridge" },
  { name: "Bananas", category: "Produce", location: "Pantry" },
  { name: "Basil", category: "Produce", location: "Fridge" },
  { name: "Bell Peppers", category: "Produce", location: "Fridge" },
  { name: "Berries", category: "Produce", location: "Fridge" },
  { name: "Blueberries", category: "Produce", location: "Fridge" },
  { name: "Broccoli", category: "Produce", location: "Fridge" },
  { name: "Brussels Sprouts", category: "Produce", location: "Fridge" },
  { name: "Cabbage", category: "Produce", location: "Fridge" },
  { name: "Carrots", category: "Produce", location: "Fridge" },
  { name: "Cauliflower", category: "Produce", location: "Fridge" },
  { name: "Celery", category: "Produce", location: "Fridge" },
  { name: "Cherries", category: "Produce", location: "Fridge" },
  { name: "Cilantro", category: "Produce", location: "Fridge" },
  { name: "Corn", category: "Produce", location: "Fridge" },
  { name: "Cucumber", category: "Produce", location: "Fridge" },
  { name: "Garlic", category: "Produce", location: "Pantry" },
  { name: "Ginger", category: "Produce", location: "Fridge" },
  { name: "Grapes", category: "Produce", location: "Fridge" },
  { name: "Green Beans", category: "Produce", location: "Fridge" },
  { name: "Green Onions", category: "Produce", location: "Fridge" },
  { name: "Jalapeno", category: "Produce", location: "Fridge" },
  { name: "Kale", category: "Produce", location: "Fridge" },
  { name: "Leeks", category: "Produce", location: "Fridge" },
  { name: "Lemon", category: "Produce", location: "Fridge" },
  { name: "Lettuce", category: "Produce", location: "Fridge" },
  { name: "Lime", category: "Produce", location: "Fridge" },
  { name: "Mango", category: "Produce", location: "Fridge" },
  { name: "Mushrooms", category: "Produce", location: "Fridge" },
  { name: "Onions", category: "Produce", location: "Pantry" },
  { name: "Oranges", category: "Produce", location: "Fridge" },
  { name: "Parsley", category: "Produce", location: "Fridge" },
  { name: "Peaches", category: "Produce", location: "Fridge" },
  { name: "Pears", category: "Produce", location: "Fridge" },
  { name: "Peas", category: "Produce", location: "Freezer" },
  { name: "Pineapple", category: "Produce", location: "Fridge" },
  { name: "Potatoes", category: "Produce", location: "Pantry" },
  { name: "Raspberries", category: "Produce", location: "Fridge" },
  { name: "Romaine Lettuce", category: "Produce", location: "Fridge" },
  { name: "Shallots", category: "Produce", location: "Pantry" },
  { name: "Spinach", category: "Produce", location: "Fridge" },
  { name: "Strawberries", category: "Produce", location: "Fridge" },
  { name: "Sweet Potatoes", category: "Produce", location: "Pantry" },
  { name: "Thyme", category: "Produce", location: "Fridge" },
  { name: "Tomatoes", category: "Produce", location: "Pantry" },
  { name: "Zucchini", category: "Produce", location: "Fridge" },
  { name: "Butter", category: "Dairy", location: "Fridge" },
  { name: "Cheddar Cheese", category: "Dairy", location: "Fridge" },
  { name: "Cottage Cheese", category: "Dairy", location: "Fridge" },
  { name: "Cream", category: "Dairy", location: "Fridge" },
  { name: "Cream Cheese", category: "Dairy", location: "Fridge" },
  { name: "Eggs", category: "Dairy", location: "Fridge" },
  { name: "Feta Cheese", category: "Dairy", location: "Fridge" },
  { name: "Greek Yogurt", category: "Dairy", location: "Fridge" },
  { name: "Half and Half", category: "Dairy", location: "Fridge" },
  { name: "Milk", category: "Dairy", location: "Fridge" },
  { name: "Mozzarella", category: "Dairy", location: "Fridge" },
  { name: "Parmesan", category: "Dairy", location: "Fridge" },
  { name: "Ricotta", category: "Dairy", location: "Fridge" },
  { name: "Sour Cream", category: "Dairy", location: "Fridge" },
  { name: "Swiss Cheese", category: "Dairy", location: "Fridge" },
  { name: "Whipping Cream", category: "Dairy", location: "Fridge" },
  { name: "Yogurt", category: "Dairy", location: "Fridge" },
  { name: "Bacon", category: "Meat", location: "Fridge" },
  { name: "Chicken Breast", category: "Meat", location: "Freezer" },
  { name: "Chicken Thighs", category: "Meat", location: "Freezer" },
  { name: "Chicken Wings", category: "Meat", location: "Freezer" },
  { name: "Deli Turkey", category: "Meat", location: "Fridge" },
  { name: "Ground Beef", category: "Meat", location: "Freezer" },
  { name: "Ground Turkey", category: "Meat", location: "Freezer" },
  { name: "Ham", category: "Meat", location: "Fridge" },
  { name: "Italian Sausage", category: "Meat", location: "Fridge" },
  { name: "Lamb Chops", category: "Meat", location: "Freezer" },
  { name: "Pork Chops", category: "Meat", location: "Freezer" },
  { name: "Pork Tenderloin", category: "Meat", location: "Freezer" },
  { name: "Prosciutto", category: "Meat", location: "Fridge" },
  { name: "Ribeye Steak", category: "Meat", location: "Freezer" },
  { name: "Salmon", category: "Meat", location: "Freezer" },
  { name: "Shrimp", category: "Meat", location: "Freezer" },
  { name: "Sirloin Steak", category: "Meat", location: "Freezer" },
  { name: "Smoked Salmon", category: "Meat", location: "Fridge" },
  { name: "Tilapia", category: "Meat", location: "Freezer" },
  { name: "Tuna", category: "Meat", location: "Pantry" },
  { name: "Turkey Breast", category: "Meat", location: "Freezer" },
  { name: "All-Purpose Flour", category: "Pantry", location: "Pantry" },
  { name: "Almond Butter", category: "Pantry", location: "Pantry" },
  { name: "Balsamic Vinegar", category: "Pantry", location: "Pantry" },
  { name: "Black Beans", category: "Pantry", location: "Pantry" },
  { name: "Bread", category: "Pantry", location: "Pantry" },
  { name: "Brown Rice", category: "Pantry", location: "Pantry" },
  { name: "Brown Sugar", category: "Pantry", location: "Pantry" },
  { name: "Canola Oil", category: "Pantry", location: "Pantry" },
  { name: "Chicken Broth", category: "Pantry", location: "Pantry" },
  { name: "Chickpeas", category: "Pantry", location: "Pantry" },
  { name: "Coconut Milk", category: "Pantry", location: "Pantry" },
  { name: "Dijon Mustard", category: "Pantry", location: "Fridge" },
  { name: "Honey", category: "Pantry", location: "Pantry" },
  { name: "Hot Sauce", category: "Pantry", location: "Fridge" },
  { name: "Ketchup", category: "Pantry", location: "Fridge" },
  { name: "Lentils", category: "Pantry", location: "Pantry" },
  { name: "Maple Syrup", category: "Pantry", location: "Pantry" },
  { name: "Mayonnaise", category: "Pantry", location: "Fridge" },
  { name: "Oats", category: "Pantry", location: "Pantry" },
  { name: "Olive Oil", category: "Pantry", location: "Pantry" },
  { name: "Pasta", category: "Pantry", location: "Pantry" },
  { name: "Peanut Butter", category: "Pantry", location: "Pantry" },
  { name: "Quinoa", category: "Pantry", location: "Pantry" },
  { name: "Rice", category: "Pantry", location: "Pantry" },
  { name: "Sesame Oil", category: "Pantry", location: "Pantry" },
  { name: "Soy Sauce", category: "Pantry", location: "Pantry" },
  { name: "Sriracha", category: "Pantry", location: "Fridge" },
  { name: "Sugar", category: "Pantry", location: "Pantry" },
  { name: "Tomato Paste", category: "Pantry", location: "Pantry" },
  { name: "Vegetable Broth", category: "Pantry", location: "Pantry" },
  { name: "White Rice", category: "Pantry", location: "Pantry" },
  { name: "White Wine Vinegar", category: "Pantry", location: "Pantry" },
  { name: "Worcestershire Sauce", category: "Pantry", location: "Pantry" },
];

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
  { name: "Ribeye Steak", ingredients: ["ribeye","butter","garlic","thyme"], requires: ["ribeye"], description: "Perfect pan-seared ribeye with garlic butter.", time: "20 min", instructions: "1. Take steak out of fridge 30 minutes before cooking.\n2. Pat dry and season with salt and pepper.\n3. Heat cast iron skillet until smoking.\n4. Sear 3-4 minutes per side.\n5. Add butter, garlic, and thyme.\n6. Baste continuously for 1-2 minutes.\n7. Rest 5 minutes before slicing.", temps: [{"label":"Rare","temp":"125F","color":"bg-red-100 text-red-700"},{"label":"Medium Rare","temp":"135F","color":"bg-orange-100 text-orange-700"},{"label":"Medium","temp":"145F","color":"bg-yellow-100 text-yellow-700","safe":true},{"label":"Well Done","temp":"160F","color":"bg-green-100 text-green-700","safe":true}] },
  { name: "Roast Chicken", ingredients: ["chicken","butter","garlic","thyme"], requires: ["chicken"], description: "Classic roast chicken with crispy skin.", time: "90 min", instructions: "1. Preheat oven to 425F.\n2. Pat chicken dry inside and out.\n3. Rub all over with butter, salt, pepper, and garlic.\n4. Roast breast side up for 60-75 minutes.\n5. Baste every 20 minutes.\n6. Rest 10 minutes before carving.", temps: [{"label":"USDA Safe Minimum","temp":"165F","color":"bg-green-100 text-green-700","safe":true}] },
  { name: "Pan Seared Salmon", ingredients: ["salmon","butter","lemon","garlic"], requires: ["salmon"], description: "Crispy skin salmon with lemon butter.", time: "15 min", instructions: "1. Pat salmon dry and season with salt and pepper.\n2. Heat oil over medium-high heat.\n3. Place skin side down and press gently.\n4. Cook 4-5 minutes until skin is crispy.\n5. Flip and cook 2-3 more minutes.\n6. Add butter and lemon juice and serve.", temps: [{"label":"Safe Minimum","temp":"145F","color":"bg-green-100 text-green-700","safe":true}] },
];

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

function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return parsed.map((it) => ({
      id: it.id ?? crypto.randomUUID(),
      name: (it.name ?? "").trim(),
      useByDate: it.useByDate ?? "",
      openDate: it.openDate ?? "",
      category: it.category ?? "Other",
      quantity: it.quantity ?? "",
      location: it.location ?? "Fridge",
    }));
  } catch (e) { return []; }
}

function saveItems(items) {
  const sorted = [...items].sort((a, b) => {
    const da = a.useByDate ? new Date(a.useByDate + "T00:00:00").getTime() : Infinity;
    const db = b.useByDate ? new Date(b.useByDate + "T00:00:00").getTime() : Infinity;
    return da - db;
  });
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted)); } catch (e) {}
}

function loadCommunity() {
  try {
    const raw = localStorage.getItem(COMMUNITY_KEY);
    return raw ? JSON.parse(raw) : { recipes: [], tips: [], chat: [] };
  } catch (e) { return { recipes: [], tips: [], chat: [] }; }
}

function saveCommunity(data) {
  try { localStorage.setItem(COMMUNITY_KEY, JSON.stringify(data)); } catch (e) {}
}

function loadShopping() {
  try {
    const raw = localStorage.getItem(SHOPPING_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

function saveShopping(items) {
  try { localStorage.setItem(SHOPPING_KEY, JSON.stringify(items)); } catch (e) {}
}

function loadMeals() {
  try {
    const raw = localStorage.getItem(MEAL_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}

function saveMeals(meals) {
  try { localStorage.setItem(MEAL_KEY, JSON.stringify(meals)); } catch (e) {}
}

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const MEAL_SLOTS = ["Breakfast","Lunch","Dinner"];

const CATEGORY_COLORS = {
  Produce: "bg-green-100 text-green-700",
  Dairy: "bg-blue-100 text-blue-700",
  Meat: "bg-red-100 text-red-700",
  Pantry: "bg-yellow-100 text-yellow-700",
  Leftovers: "bg-purple-100 text-purple-700",
  Other: "bg-gray-100 text-gray-700",
};

const LOCATION_COLORS = {
  Fridge: "bg-sky-100 text-sky-700",
  Freezer: "bg-cyan-100 text-cyan-700",
  Pantry: "bg-amber-100 text-amber-700",
};

const LOCATION_ICONS = {
  Fridge: "🧊",
  Freezer: "❄️",
  Pantry: "🗄️",
};

function Card({ children, className = "" }) {
  return <div className={`rounded-xl border bg-white p-4 shadow-sm ${className}`}>{children}</div>;
}

function TabBar({ active, onChange }) {
  return (
    <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
      {[["tracker","🥦 Tracker"],["recipes","🍳 Recipes"],["shopping","🛒 Shopping"],["meals","📅 Meals"],["community","👥 Community"]].map(([id, label]) => (
        <button key={id} onClick={() => onChange(id)} className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-colors ${active === id ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700"}`}>{label}</button>
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
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", focusMode: "continuous", width: { ideal: 1280 }, height: { ideal: 720 } } }); if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play(); }
        
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

function MealSearchInput({ value, onChange, onKeyDown }) {
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.focus(); }, []);
  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="Search recipes or type your own..."
      className="flex-1 rounded border px-3 py-2 text-sm text-gray-900"
    />
  );
}

function FoodAutocomplete({ value, onChange, onSelect }) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const ref = useRef(null);

  const matches = useMemo(() => {
    if (!value || value.length < 1) return [];
    const q = value.toLowerCase();
    return FOOD_DB.filter((f) => f.name.toLowerCase().includes(q)).slice(0, 8);
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
    if (!open || matches.length === 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setHighlighted((h) => Math.min(h + 1, matches.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHighlighted((h) => Math.max(h - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); onSelect(matches[highlighted]); setOpen(false); }
    else if (e.key === "Escape") { setOpen(false); }
  };

  return (
    <div className="relative" ref={ref}>
      <input
        value={value}
        onChange={(e) => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="e.g. Chicken Breast"
        className="w-full rounded border px-3 py-2 text-sm text-gray-900"
      />
      {open && matches.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border bg-white shadow-lg">
          {matches.map((f, i) => (
            <button
              key={f.name}
              onMouseDown={() => { onSelect(f); setOpen(false); }}
              onMouseEnter={() => setHighlighted(i)}
              className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm ${highlighted === i ? "bg-blue-50" : "hover:bg-blue-50"}`}
            >
              <span>{f.name}</span>
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

export default function TrackFreshDashboard() {
  const [activeTab, setActiveTab] = useState("tracker");
  const [trackedItems, setTrackedItems] = useState([]);
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
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [username, setUsername] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [community, setCommunity] = useState({ recipes: [], tips: [], chat: [] });
  const [communityTab, setCommunityTab] = useState("chat");
  const [newRecipeTitle, setNewRecipeTitle] = useState("");
  const [newRecipeBody, setNewRecipeBody] = useState("");
  const [newTip, setNewTip] = useState("");
  const [newChat, setNewChat] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [shoppingItems, setShoppingItems] = useState([]);
  const [newShoppingItem, setNewShoppingItem] = useState("");
  const [newShoppingQty, setNewShoppingQty] = useState("");
  const [selectedReceiptItems, setSelectedReceiptItems] = useState([]);
  const [showLabelScanner, setShowLabelScanner] = useState(false);
  const [labelItem, setLabelItem] = useState(null);
  const [labelScanning, setLabelScanning] = useState(false);
  const [labelError, setLabelError] = useState("");
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddName, setQuickAddName] = useState("");
  const [quickAddDate, setQuickAddDate] = useState("");
  const [quickAddQty, setQuickAddQty] = useState("");
  const [quickAddCategory, setQuickAddCategory] = useState("Other");
  const [quickAddLocation, setQuickAddLocation] = useState("Fridge");
  const [meals, setMeals] = useState({});
  const [showMealPicker, setShowMealPicker] = useState(false);
  const [mealPickerDay, setMealPickerDay] = useState("");
  const [mealPickerSlot, setMealPickerSlot] = useState("");
  const [mealPickerSearch, setMealPickerSearch] = useState("");
  const [aiPlanLoading, setAiPlanLoading] = useState(false);
  const [quickVoiceListening, setQuickVoiceListening] = useState("");
  const [quickVoiceError, setQuickVoiceError] = useState("");
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [barcodeScanKey, setBarcodeScanKey] = useState(0);
  const [barcodeItem, setBarcodeItem] = useState(null);
  const [barcodeScanning, setBarcodeScanning] = useState(false);
  const [barcodeError, setBarcodeError] = useState("");
  const [barcodeDetected, setBarcodeDetected] = useState("");
  const [barcodeLocation, setBarcodeLocation] = useState("");
  const [barcodeUseBy, setBarcodeUseBy] = useState("");
  const [barcodeFreezeBy, setBarcodeFreezeBy] = useState("");
  const [voiceListening, setVoiceListening] = useState("");
  const [voiceError, setVoiceError] = useState("");
  const [showReceiptScanner, setShowReceiptScanner] = useState(false);
  const [receiptScanning, setReceiptScanning] = useState(false);
  const [receiptItems, setReceiptItems] = useState([]);
  const [receiptError, setReceiptError] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  useEffect(() => { if (!localStorage.getItem("trackfresh.welcomed")) setShowWelcome(true); }, []);

  useEffect(() => {
    setTrackedItems(loadItems());
    setCommunity(loadCommunity());
    setShoppingItems(loadShopping());
    setMeals(loadMeals());
    const savedName = localStorage.getItem(USERNAME_KEY);
    if (savedName) setUsername(savedName);
  }, []);
  useEffect(() => { saveItems(trackedItems); }, [trackedItems]);
  useEffect(() => { saveCommunity(community); }, [community]);
  useEffect(() => { saveShopping(shoppingItems); }, [shoppingItems]);
  useEffect(() => { saveMeals(meals); }, [meals]);

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
        body: JSON.stringify({ expiring: expiringNames, available: allItems })
      });
      const data = await res.json();
      if (data.plan) setMeals(data.plan);
    } catch (err) { console.error(err); }
    setAiPlanLoading(false);
  };

  const handleAddMealIngredientsToShopping = (mealName) => {
    const recipe = RECIPE_DB.find((r) => r.name === mealName);
    if (!recipe) { setShoppingItems((prev) => [...prev, { id: crypto.randomUUID(), name: mealName, qty: "", checked: false, forMeal: mealName }]); setActiveTab("shopping"); return; }
    const trackedNames = trackedItems.map((it) => it.name.toLowerCase());
    let added = 0;
    recipe.ingredients.forEach((ing) => {
      const have = trackedNames.some((n) => n.includes(ing));
      const onList = shoppingItems.some((s) => s.name.toLowerCase().includes(ing));
      if (!have && !onList) {
        setShoppingItems((prev) => [...prev, { id: crypto.randomUUID(), name: ing.charAt(0).toUpperCase() + ing.slice(1), qty: "", checked: false, forMeal: mealName }]);
        added++;
      }
    });
    if (added === 0) { window.alert("You already have all ingredients for " + mealName + "!"); return; }
    setActiveTab("shopping");
  };

  const itemsWithCountdown = useMemo(() => trackedItems.map((it) => ({ ...it, daysLeft: daysUntil(it.useByDate) })), [trackedItems]);

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

  const handleRemoveItem = (id) => setTrackedItems((prev) => prev.filter((it) => it.id !== id));

  const handleEditItem = (id) => { const item = trackedItems.find(it => it.id === id); if (item) setEditingItem({ ...item }); };
  const handleSaveEdit = () => { if (!editingItem) return; setTrackedItems(prev => prev.map(it => it.id === editingItem.id ? { ...editingItem } : it)); setEditingItem(null); };

  const handleUseTodayItem = (id) => setTrackedItems((prev) => prev.filter((it) => it.id !== id));

  const handleSuggestRecipes = () => {
    setRecipeSuggestions(suggestRecipes(trackedItems));
    setRecipesGenerated(true);
    setExpandedRecipe(null);
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
    setShoppingItems((prev) => [...prev, { id: crypto.randomUUID(), name, qty: newShoppingQty.trim(), checked: false }]);
    setNewShoppingItem(""); setNewShoppingQty("");
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
        const res = await fetch("/api/scan-receipt", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image: base64, mimeType: mediaType }) });
        const data = await res.json();
        if (data.error) { setReceiptError(data.error); setReceiptScanning(false); return; }
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
    const today = new Date().toISOString().split("T")[0];
    setTrackedItems((prev) => [...prev, { id: crypto.randomUUID(), name: barcodeItem.name, category: barcodeItem.category, location: loc, quantity: "", useByDate: barcodeUseBy, openDate: today, freezeBy: barcodeFreezeBy, barcode: barcodeItem.barcode || "" }]);
    setShowBarcodeScanner(false);
    setBarcodeItem(null);
    setBarcodeDetected("");
    setBarcodeLocation("");
    setBarcodeUseBy("");
    setBarcodeFreezeBy("");
    setVoiceError("");
  };

  const parseSpokenDate = (transcript) => {
    const months = { january:1, february:2, march:3, april:4, may:5, june:6, july:7, august:8, september:9, october:10, november:11, december:12, jan:1, feb:2, mar:3, apr:4, jun:6, jul:7, aug:8, sep:9, oct:10, nov:11, dec:12 };
    const t = transcript.toLowerCase().trim();
    const match = t.match(/([a-z]+)\s+(\d{1,2})\s*,?\s*(\d{4})/);
    if (match) {
      const month = months[match[1]];
      if (month) {
        const d = new Date(parseInt(match[3]), month - 1, parseInt(match[2]));
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

  const handleQuickAdd = () => {
    if (!quickAddName.trim()) return;
    if (!quickAddDate) { window.alert("Please enter a Use By date."); return; }
    setTrackedItems((prev) => [...prev, { id: crypto.randomUUID(), name: quickAddName, category: quickAddCategory, location: quickAddLocation, quantity: quickAddQty, useByDate: quickAddDate, openDate: new Date().toISOString().split("T")[0] }]);
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
        const res = await fetch("/api/scan-label", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image: base64, mimeType: mediaType }) });
        const data = await res.json();
        if (data.error) { setLabelError(data.error); setLabelScanning(false); return; }
        
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
    setTrackedItems((prev) => [...prev, { 
      id: crypto.randomUUID(), 
      name: labelItem.name, 
      category: labelItem.category, 
      location: labelItem.location, 
      quantity: quantity,
      useByDate: labelItem.date || "", 
      openDate: new Date().toISOString().split("T")[0] 
    }]);
    setShowLabelScanner(false);
    setLabelItem(null);
    setLabelError("");
  };

  const handleAddReceiptItems = () => {
    const toAdd = receiptItems.filter((_, i) => selectedReceiptItems.includes(i));
    const today = new Date();
    setTrackedItems((prev) => [...prev, ...toAdd.map((it) => {
      const days = it.daysSealed || 7;
      const useBy = new Date(today.getTime() + days * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      return { id: crypto.randomUUID(), name: it.name, category: it.category, location: it.location, quantity: "", useByDate: useBy, openDate: today.toISOString().split("T")[0], daysAfterOpening: it.daysAfterOpening || null, storageTip: it.storageTip || "", openedTip: it.openedTip || "" };
    })]);
    setShowReceiptScanner(false);
    setReceiptItems([]);
    setSelectedReceiptItems([]);
  };

  const handleSetUsername = () => { const n = usernameInput.trim(); if (!n) return; setUsername(n); localStorage.setItem(USERNAME_KEY, n); setUsernameInput(""); };
  const handlePostRecipe = () => { if (!newRecipeTitle.trim() || !newRecipeBody.trim()) return; setCommunity((prev) => ({ ...prev, recipes: [{ id: crypto.randomUUID(), author: username, title: newRecipeTitle.trim(), body: newRecipeBody.trim(), date: new Date().toLocaleDateString() }, ...prev.recipes] })); setNewRecipeTitle(""); setNewRecipeBody(""); };
  const handlePostTip = () => { if (!newTip.trim()) return; setCommunity((prev) => ({ ...prev, tips: [{ id: crypto.randomUUID(), author: username, text: newTip.trim(), date: new Date().toLocaleDateString() }, ...prev.tips] })); setNewTip(""); };
  const handlePostChat = () => { if (!newChat.trim()) return; setCommunity((prev) => ({ ...prev, chat: [...prev.chat, { id: crypto.randomUUID(), author: username, text: newChat.trim(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }] })); setNewChat(""); };

    return (
    <>{showWelcome && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl animate-[fadeIn_0.4s_ease]">
          <div className="text-5xl mb-3">🥦</div>
          <h2 className="text-2xl font-bold text-green-700 mb-1">Welcome to TrackFresh!</h2>
          <p className="text-gray-500 text-sm mb-4">The smart way to track your groceries, reduce food waste, and save money.</p>
          <div className="text-left bg-green-50 rounded-xl p-4 mb-4 space-y-2">
            <div className="flex items-center gap-2 text-sm"><span>📸</span><span className="text-gray-700">Scan labels &amp; barcodes with AI</span></div>
            <div className="flex items-center gap-2 text-sm"><span>⏰</span><span className="text-gray-700">Get color-coded expiry alerts</span></div>
            <div className="flex items-center gap-2 text-sm"><span>🎤</span><span className="text-gray-700">Add items by voice, hands-free</span></div>
            <div className="flex items-center gap-2 text-sm"><span>🛒</span><span className="text-gray-700">Smart shopping list with autocomplete</span></div>
            <div className="flex items-center gap-2 text-sm"><span>❄️</span><span className="text-gray-700">Freeze alerts before meat goes bad</span></div>
          </div>
          <p className="text-xs text-gray-400 mb-4">Your data is stored locally on your device. No account required.</p>
          <button onClick={() => { setShowWelcome(false); localStorage.setItem("trackfresh.welcomed", "true"); }} className="w-full rounded-full bg-green-600 py-3 text-lg font-bold text-white shadow-lg hover:bg-green-500 transition-all">🚀 Get Started</button>
        </div>
      </div>
    )}

    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">TrackFresh</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowHelp(true)} className="text-sm font-medium text-blue-600 underline">How to use</button>
            <button onClick={() => { if (window.confirm("Sign out of TrackFresh?")) { window.location.href = "https://logout@trackfresh.vercel.app"; } }} className="text-sm font-medium text-red-600 underline">Sign Out</button>
          </div>
        </div>
        <TabBar active={activeTab} onChange={setActiveTab} />

        {showReceiptScanner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-2 text-lg font-bold">📷 Scan Receipt</h2>
              <p className="mb-4 text-sm text-gray-600">Upload a photo of your grocery receipt and Claude will extract the food items automatically.</p>
              {!receiptScanning && receiptItems.length === 0 && (
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 p-8 hover:bg-blue-100">
                  <span className="text-3xl mb-2">📷</span>
                  <span className="text-sm font-semibold text-blue-600">Tap to upload receipt photo</span>
                  <span className="text-xs text-gray-500 mt-1">JPG, PNG supported</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && handleScanReceipt(e.target.files[0])} />
                </label>
              )}
              {receiptScanning && (
                <div className="flex flex-col items-center py-8">
                  <div className="mb-3 text-3xl animate-spin">⏳</div>
                  <p className="text-sm text-gray-600">Claude is reading your receipt...</p>
                </div>
              )}
              {receiptError && <p className="mt-2 text-sm text-red-600">Error: {receiptError}</p>}
              {receiptItems.length > 0 && (
                <div>
                  <p className="mb-2 text-sm font-semibold text-gray-700">Found {receiptItems.length} items — select which to add:</p>
                  <div className="max-h-64 overflow-y-auto space-y-2 mb-4">
                    {receiptItems.map((it, i) => (
                      <div key={i} className="rounded-lg border px-3 py-2">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" checked={selectedReceiptItems.includes(i)} onChange={() => setSelectedReceiptItems((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i])} className="h-4 w-4 accent-green-600" />
                          <span className="flex-1 text-sm font-bold">{it.name}</span>
                          <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">{it.location}</span>
                          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{it.category}</span>
                        </div>
                        <div className="ml-7 mt-1 space-y-0.5">
                          <p className="text-xs text-green-700">📦 Sealed: ~{it.daysSealed || 7} days{it.daysAfterOpening ? " · 📂 After opening: ~" + it.daysAfterOpening + " days" : ""}</p>
                          {it.storageTip && <p className="text-xs text-gray-500">💡 {it.storageTip}</p>}
                          {it.openedTip && <p className="text-xs text-orange-600">⚠️ {it.openedTip}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={handleAddReceiptItems} className="w-full rounded bg-blue-600 py-2 text-sm font-semibold text-white">Add {selectedReceiptItems.length} Items to Tracker</button>
                </div>
              )}
              <button onClick={() => { setShowReceiptScanner(false); setReceiptItems([]); setReceiptError(""); }} className="mt-3 w-full rounded border py-2 text-sm font-semibold text-gray-600">Cancel</button>
            </div>
          </div>
        )}

        {showHelp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-2 text-lg font-bold">How to Use</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>🔹 <strong>Tracker:</strong> Type a food name to search from 100+ items. Category and location auto-fill.</li>
                <li>🔹 Filter by 🧊 Fridge, ❄️ Freezer, or 🗄️ Pantry to see items by location.</li>
                <li>🔹 <strong>Recipes:</strong> Get recipe suggestions, tap to see full instructions.</li>
                <li>🔹 <strong>Shopping:</strong> Build your shopping list, check off items as you shop.</li>
                <li>🔹 <strong>Community:</strong> Share recipes, tips, and chat.</li>
                <li>🔹 Red = expires within 3 days. Yellow = within 7 days.</li>
              </ul>
              <button onClick={() => setShowHelp(false)} className="mt-4 rounded bg-blue-600 px-4 py-2 font-semibold text-white">Close</button>
            </div>
          </div>
        )}

        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-lg font-bold">✏️ Edit Item</h2>
              <div className="space-y-3">
                <div><label className="mb-1 block text-sm font-medium">Name</label><input type="text" value={editingItem.name} onChange={(e) => setEditingItem({...editingItem, name: e.target.value})} className="w-full rounded border px-3 py-2 text-sm" /></div>
                <div><label className="mb-1 block text-sm font-medium">Use By Date</label><input type="date" value={editingItem.useByDate} onChange={(e) => setEditingItem({...editingItem, useByDate: e.target.value})} className="w-full rounded border px-3 py-2 text-sm" /></div>
                <div><label className="mb-1 block text-sm font-medium">Quantity</label><input type="text" value={editingItem.quantity || ""} onChange={(e) => setEditingItem({...editingItem, quantity: e.target.value})} className="w-full rounded border px-3 py-2 text-sm" /></div>
                <div><label className="mb-1 block text-sm font-medium">Location</label><select value={editingItem.location || "Fridge"} onChange={(e) => setEditingItem({...editingItem, location: e.target.value})} className="w-full rounded border px-3 py-2 text-sm"><option>Fridge</option><option>Freezer</option><option>Pantry</option><option>Counter</option></select></div>
                <div><label className="mb-1 block text-sm font-medium">Category</label><select value={editingItem.category || "Other"} onChange={(e) => setEditingItem({...editingItem, category: e.target.value})} className="w-full rounded border px-3 py-2 text-sm"><option>Dairy</option><option>Meat</option><option>Produce</option><option>Bakery</option><option>Frozen</option><option>Pantry</option><option>Beverages</option><option>Condiments</option><option>Snacks</option><option>Other</option></select></div>
                <div className="flex gap-2 pt-2"><button onClick={handleSaveEdit} className="flex-1 rounded bg-green-500 py-2 text-sm font-semibold text-white">Save</button><button onClick={() => setEditingItem(null)} className="flex-1 rounded border py-2 text-sm font-semibold text-gray-600">Cancel</button></div>
              </div>
            </div>
          </div>
        )}
        {showAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
              <div className="mb-2 flex items-center gap-2"><Bell className="h-5 w-5 text-red-500" /><h2 className="text-lg font-bold">Use-by Alert</h2></div>
              <p className="text-sm text-gray-700"><span className="font-semibold">{alertItem.name}</span> is <span className="font-semibold">{alertItem.daysLeft}</span> day{alertItem.daysLeft === 1 ? "" : "s"} from its use-by date.</p>
              <div className="mt-4 flex justify-end"><button onClick={() => setShowAlert(false)} className="rounded border px-4 py-2 text-sm font-semibold">OK</button></div>
            </div>
          </div>
        )}

        {showBarcodeScanner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-2 text-lg font-bold">📦 Scan Barcode</h2>
              <p className="mb-4 text-sm text-gray-600">Point your camera at the barcode on any food package.</p>
              {!barcodeItem && (
                <BarcodeScanner key={barcodeScanKey} onDetected={handleBarcodeDetected} />
              )}
              {barcodeScanning && (
                <div className="flex flex-col items-center py-4">
                  <div className="mb-3 text-3xl animate-spin">⏳</div>
                  <p className="text-sm text-gray-600">Looking up product...</p>
                </div>
              )}
              {barcodeError && (
                <div className="mt-2 rounded-lg bg-red-50 p-3">
                  <p className="text-sm text-red-600">{barcodeError}</p>
<button onClick={() => { setBarcodeError(""); setBarcodeDetected(""); setBarcodeItem(null); setBarcodeScanning(false); setShowBarcodeScanner(false); setTimeout(() => setShowBarcodeScanner(true), 1000); }} className="mt-2 text-xs text-blue-600 underline">Try again</button>
                </div>
              )}
              {barcodeItem && (
                <div className="space-y-3">
                  <div className="rounded-lg border p-3 bg-green-50">
                    <p className="text-xs text-green-600 font-semibold mb-1">✅ Product found!</p>
                    <p className="font-bold text-gray-800">{barcodeItem.name}</p>
                    <p className="text-xs text-gray-500">{barcodeItem.category}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Where are you storing this?</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => { setBarcodeLocation("Fridge"); setBarcodeFreezeBy(""); }} className={`rounded-lg border-2 py-3 text-sm font-semibold transition-colors ${barcodeLocation === "Fridge" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600"}`}>🧊 Fridge{barcodeLocation === "Fridge" && <p className="text-xs font-normal mt-1">Use fresh</p>}</button>
                      <button onClick={() => setBarcodeLocation("Freezer")} className={`rounded-lg border-2 py-3 text-sm font-semibold transition-colors ${barcodeLocation === "Freezer" ? "border-cyan-500 bg-cyan-50 text-cyan-700" : "border-gray-200 text-gray-600"}`}>❄️ Freezer{barcodeLocation === "Freezer" && <p className="text-xs font-normal mt-1">Long term storage</p>}</button>
                    </div>
                  </div>
                  {barcodeLocation && (
                    <div className="space-y-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">{barcodeLocation === "Freezer" ? "Freeze By Date" : "Use By Date"}</label>
                        <div className="flex gap-2">
                          <input type="date" value={barcodeUseBy} onChange={(e) => setBarcodeUseBy(e.target.value)} className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                          <button onClick={() => handleVoiceDate("useBy")} className={`rounded px-3 py-2 text-sm font-semibold ${voiceListening === "useBy" ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 text-gray-600"}`}>{voiceListening === "useBy" ? "🎤 Listening..." : "🎤"}</button>
                        </div>
                        {voiceListening === "useBy" && <p className="text-xs text-blue-600 mt-1">Say the date e.g. February 20 2026</p>}
                      </div>
                      {barcodeLocation === "Fridge" && barcodeItem.category === "Meat" && (
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">Freeze By Date <span className="text-xs text-gray-400">(optional — we will remind you)</span></label>
                          <div className="flex gap-2">
                            <input type="date" value={barcodeFreezeBy} onChange={(e) => setBarcodeFreezeBy(e.target.value)} className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                            <button onClick={() => handleVoiceDate("freezeBy")} className={`rounded px-3 py-2 text-sm font-semibold ${voiceListening === "freezeBy" ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 text-gray-600"}`}>{voiceListening === "freezeBy" ? "🎤 Listening..." : "🎤"}</button>
                          </div>
                          {voiceListening === "freezeBy" && <p className="text-xs text-blue-600 mt-1">Say the date e.g. February 25 2026</p>}
                        </div>
                      )}
                      {voiceError && <p className="text-xs text-red-500">{voiceError}</p>}
                    </div>
                  )}
                  <button onClick={handleAddBarcodeItem} disabled={!barcodeLocation} className={`w-full rounded py-2 text-sm font-semibold text-white ${!barcodeLocation ? "bg-gray-300" : "bg-blue-600"}`}>Add to Tracker</button>
                  <button onClick={() => { setBarcodeItem(null); setBarcodeDetected(""); setBarcodeLocation(""); setBarcodeUseBy(""); setBarcodeFreezeBy(""); setVoiceError(""); }} className="w-full rounded border py-2 text-sm font-semibold text-gray-600">Scan Another</button>
                </div>
              )}
              <button onClick={() => { setShowBarcodeScanner(false); setBarcodeItem(null); setBarcodeError(""); setBarcodeDetected(""); }} className="mt-3 w-full rounded border py-2 text-sm font-semibold text-gray-600">Cancel</button>
            </div>
          </div>
        )}

        {showQuickAdd && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-2 text-lg font-bold">✏️ Quick Add</h2>
              <p className="mb-4 text-sm text-gray-600">Select a food from the list or type your own.</p>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Food Item</label>
                  <FoodAutocomplete
                    value={quickAddName}
                    onChange={setQuickAddName}
                    onSelect={(f) => { setQuickAddName(f.name); setQuickAddCategory(f.category); setQuickAddLocation(f.location); }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
                    <select value={quickAddCategory} onChange={(e) => setQuickAddCategory(e.target.value)} className="w-full rounded border px-3 py-2 text-sm text-gray-900">
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Location</label>
                    <select value={quickAddLocation} onChange={(e) => setQuickAddLocation(e.target.value)} className="w-full rounded border px-3 py-2 text-sm text-gray-900">
                      {LOCATIONS.map((l) => <option key={l} value={l}>{LOCATION_ICONS[l]} {l}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Quantity</label>
                  <div className="flex gap-2">
                    <input value={quickAddQty} onChange={(e) => setQuickAddQty(e.target.value)} placeholder="e.g. 2 lbs" className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                    <button onClick={() => handleQuickVoice("qty")} className={`rounded px-3 py-2 text-sm font-semibold ${quickVoiceListening === "qty" ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 text-gray-600"}`}>{quickVoiceListening === "qty" ? "🎤 Listening..." : "🎤"}</button>
                  </div>
                  {quickVoiceListening === "qty" && <p className="text-xs text-blue-600 mt-1">Say quantity e.g. two pounds</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Use By Date</label>
                  <div className="flex gap-2">
                    <input type="date" value={quickAddDate} onChange={(e) => setQuickAddDate(e.target.value)} className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                    <button onClick={() => handleQuickVoice("date")} className={`rounded px-3 py-2 text-sm font-semibold ${quickVoiceListening === "date" ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 text-gray-600"}`}>{quickVoiceListening === "date" ? "🎤 Listening..." : "🎤"}</button>
                  </div>
                  {quickVoiceListening === "date" && <p className="text-xs text-blue-600 mt-1">Say date e.g. February 20 2026</p>}
                  {quickVoiceError && <p className="text-xs text-red-500 mt-1">{quickVoiceError}</p>}
                </div>
                <button onClick={handleQuickAdd} className="w-full rounded bg-green-600 py-2 text-sm font-semibold text-white">Add to Tracker</button>
                <button onClick={() => { setShowQuickAdd(false); setQuickAddName(""); setQuickAddDate(""); setQuickAddQty(""); setQuickAddCategory("Other"); setQuickAddLocation("Fridge"); }} className="w-full rounded border py-2 text-sm font-semibold text-gray-600">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {showLabelScanner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-2 text-lg font-bold">🏷️ Scan Package Label</h2>
              <p className="mb-4 text-sm text-gray-600">Take a photo of the package label and Claude will read the item name and date automatically.</p>
              {!labelScanning && !labelItem && (
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-green-300 bg-green-50 p-8 hover:bg-green-100">
                  <span className="text-3xl mb-2">🏷️</span>
                  <span className="text-sm font-semibold text-green-600">Tap to upload package photo</span>
                  <span className="text-xs text-gray-500 mt-1">JPG, PNG supported</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && handleScanLabel(e.target.files[0])} />
                </label>
              )}
              {labelScanning && (
                <div className="flex flex-col items-center py-8">
                  <div className="mb-3 text-3xl animate-spin">⏳</div>
                  <p className="text-sm text-gray-600">Claude is reading the label...</p>
                </div>
              )}
              {labelError && <p className="mt-2 text-sm text-red-600">Error: {labelError}</p>}
              {labelItem && (
                <div className="space-y-3">
                  <div className="rounded-lg border p-3 bg-gray-50">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="font-semibold text-gray-600">Item:</span><p className="font-bold">{labelItem.name}</p></div>
                      <div><span className="font-semibold text-gray-600">Date:</span><p className="font-bold">{labelItem.dateType}: {labelItem.date || "Not found"}</p></div>
                      <div><span className="font-semibold text-gray-600">Category:</span><p>{labelItem.category}</p></div>
                      <div><span className="font-semibold text-gray-600">Location:</span><p>{labelItem.location}</p></div>
                    </div>
                  </div>
                  <button onClick={handleAddLabelItem} className="w-full rounded bg-green-600 py-2 text-sm font-semibold text-white">Add to Tracker</button>
                  <button onClick={() => setLabelItem(null)} className="w-full rounded border py-2 text-sm font-semibold text-gray-600">Scan Another</button>
                </div>
              )}
              <button onClick={() => { setShowLabelScanner(false); setLabelItem(null); setLabelError(""); }} className="mt-3 w-full rounded border py-2 text-sm font-semibold text-gray-600">Cancel</button>
            </div>
          </div>
        )}

        {activeTab === "tracker" && (
          <>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setShowReceiptScanner(true)} className="rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 py-3 text-xs font-semibold text-blue-600 hover:bg-blue-100">📷 Receipt</button>
              <button onClick={() => setShowLabelScanner(true)} className="rounded-xl border-2 border-dashed border-orange-300 bg-orange-50 py-3 text-xs font-semibold text-orange-600 hover:bg-orange-100">🏷️ Label</button>
              <button onClick={() => setShowBarcodeScanner(true)} className="rounded-xl border-2 border-dashed border-purple-300 bg-purple-50 py-3 text-xs font-semibold text-purple-600 hover:bg-purple-100">📦 Barcode</button>
              <button onClick={() => setShowQuickAdd(true)} className="rounded-xl border-2 border-dashed border-green-300 bg-green-50 py-3 text-xs font-semibold text-green-600 hover:bg-green-100">✏️ Quick Add</button>
            </div>
          <>
            <Card>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Item</label>
                  <FoodAutocomplete
                    value={itemName}
                    onChange={setItemName}
                    onSelect={(f) => { setItemName(f.name); setCategory(f.category); setLocation(f.location); }}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Quantity</label>
                  <input value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="e.g. 2 lbs, 1 carton" className="w-full rounded border px-3 py-2 text-sm text-gray-900" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded border px-3 py-2 text-sm text-gray-900">
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Location</label>
                  <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full rounded border px-3 py-2 text-sm text-gray-900">
                    {LOCATIONS.map((l) => <option key={l} value={l}>{LOCATION_ICONS[l]} {l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Use By</label>
                  <input type="date" value={useByDate} onChange={(e) => setUseByDate(e.target.value)} className="w-full rounded border px-3 py-2 text-sm text-gray-900" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Opened (optional)</label>
                  <input type="date" value={openDate} onChange={(e) => setOpenDate(e.target.value)} className="w-full rounded border px-3 py-2 text-sm text-gray-900" />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={handleAddItem} className="inline-flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                  <PlusCircle className="h-4 w-4" /> Add
                </button>
              </div>
            </Card>
            <Card>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-bold">Tracked Items</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{filteredItems.length} item{filteredItems.length === 1 ? "" : "s"}</span>
                  {trackedItems.length > 0 && <button onClick={() => { if (window.confirm("Clear all tracked items and start fresh?")) { setTrackedItems([]); } }} className="rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">Clear All</button>}
                </div>
              </div>
              <div className="mb-2 flex flex-wrap gap-1">
                {["All", ...LOCATIONS].map((l) => (
                  <button key={l} onClick={() => setFilterLocation(l)} className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${filterLocation === l ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                    {l !== "All" ? LOCATION_ICONS[l] + " " : ""}{l}
                  </button>
                ))}
              </div>
              <div className="mb-3 flex flex-wrap gap-1">
                {["All", ...CATEGORIES].map((c) => (
                  <button key={c} onClick={() => setFilterCategory(c)} className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${filterCategory === c ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{c}</button>
                ))}
              </div>
              {filteredItems.length === 0 ? (
                <p className="text-sm text-gray-600">No items match this filter.</p>
              ) : (
                <div className="space-y-2">
                  {filteredItems.map((it) => {
                    const urgent = it.daysLeft !== null && it.daysLeft <= 3;
                    const soon = it.daysLeft !== null && it.daysLeft <= 7 && it.daysLeft > 3;
                    return (
                      <div key={it.id} className={`rounded-lg border px-3 py-2 ${urgent ? "border-red-300 bg-red-50" : soon ? "border-yellow-300 bg-yellow-50" : "bg-white"}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold">{it.name}</span>
                              {it.quantity && <span className="text-xs text-gray-500">{it.quantity}</span>}
                              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${LOCATION_COLORS[it.location ?? "Fridge"]}`}>{LOCATION_ICONS[it.location ?? "Fridge"]} {it.location ?? "Fridge"}</span>
                              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[it.category ?? "Other"]}`}>{it.category ?? "Other"}</span>
                            </div>
                            <div className="text-xs text-gray-600 mt-0.5">Use by: {it.useByDate}{it.openDate ? " • Opened: " + it.openDate : ""}</div>
                          </div>
                          <div className="flex items-center gap-2 ml-2">
                            <div className="text-right">
                              <div className={`text-sm font-bold ${urgent ? "text-red-600" : soon ? "text-yellow-600" : "text-gray-800"}`}>{it.daysLeft === null ? "—" : it.daysLeft}</div>
                              <div className="text-xs text-gray-500">days</div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <button onClick={() => handleUseTodayItem(it.id)} className="rounded bg-green-500 px-2 py-1 text-xs font-semibold text-white">Used</button>
                              {it.category === "Meat" && it.location === "Fridge" && (() => { const fd = it.freezeBy ? daysUntil(it.freezeBy) : null; const ud = it.daysLeft; return (fd !== null && fd <= 2) || (ud !== null && ud <= 3); })() && (
                                <button onClick={() => handleFreezeItem(it.id)} className="rounded bg-cyan-500 px-2 py-1 text-xs font-semibold text-white animate-pulse">❄️ Freeze!</button>
                              )}
                              <button onClick={() => handleEditItem(it.id)} className="rounded bg-blue-500 px-2 py-1 text-xs font-semibold text-white">Edit</button>
                              <button onClick={() => handleRemoveItem(it.id)} className="rounded border px-2 py-1 text-xs font-semibold">Remove</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </>
          </>
        )}
        {activeTab === "recipes" && (
          <Card>
            <div className="mb-3 flex items-center gap-2"><ChefHat className="h-5 w-5 text-orange-500" /><h2 className="text-lg font-bold">Recipe Suggestions</h2></div>
            <p className="mb-4 text-sm text-gray-600">Recipes matched to your ingredients, prioritizing what expires soonest. Tap a recipe to see full instructions.</p>
            <button onClick={handleSuggestRecipes} className="inline-flex items-center gap-2 rounded bg-orange-500 px-4 py-2 text-sm font-semibold text-white"><ChefHat className="h-4 w-4" /> Suggest Recipes</button>
            {recipesGenerated && recipeSuggestions.length === 0 && <p className="mt-4 text-sm text-gray-500">No matches found. Try adding more items like eggs, carrots, or onions.</p>}
            {recipeSuggestions.length > 0 && (
              <div className="mt-4 space-y-3">
                {recipeSuggestions.map((r, i) => (
                  <div key={i} className="rounded-lg border border-orange-100 bg-orange-50 overflow-hidden">
                    <button onClick={() => setExpandedRecipe(expandedRecipe === i ? null : i)} className="w-full p-4 text-left">
                      <div className="flex items-start justify-between">
                        <h3 className="font-bold text-gray-800">{r.name}</h3>
                        <div className="flex items-center gap-2 ml-2 shrink-0">
                          <span className="rounded bg-orange-200 px-2 py-0.5 text-xs font-semibold text-orange-800">⏱ {r.time}</span>
                          <span className="text-gray-400 text-sm">{expandedRecipe === i ? "▲" : "▼"}</span>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{r.description}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {r.usedItems.map((it) => {
                          const days = daysUntil(it.useByDate);
                          const urgent = days !== null && days <= 3;
                          const soon = days !== null && days <= 7 && days > 3;
                          return <span key={it.id} className={`rounded-full px-2 py-0.5 text-xs font-medium ${urgent ? "bg-red-100 text-red-700" : soon ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>{urgent ? "⚡ " : ""}{it.name} {days !== null ? "(" + days + "d)" : ""}</span>;
                        })}
                      </div>
                    </button>
                    {expandedRecipe === i && (
                      <div className="border-t border-orange-200 bg-white px-4 py-3">
                        <h4 className="mb-2 text-sm font-bold text-gray-700">Instructions</h4>
                        <p className="whitespace-pre-line text-sm text-gray-700 leading-relaxed">{r.instructions}</p>
                        <div className="mt-3 flex justify-end">
                          <button onClick={() => handleSaveRecipeToCommunity(r)} disabled={savedRecipes.includes(r.name)} className={`rounded px-3 py-1.5 text-xs font-semibold ${savedRecipes.includes(r.name) ? "bg-gray-100 text-gray-400" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
                            {savedRecipes.includes(r.name) ? "Saved to Community" : "Save to Community"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {!recipesGenerated && <div className="mt-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-500">You have {trackedItems.length} tracked item{trackedItems.length === 1 ? "" : "s"}. Click the button to see recipe matches.{trackedItems.length === 0 && " Add items in the Tracker tab first."}</div>}
          </Card>
        )}

        {activeTab === "shopping" && (
          <>
            <Card>
              <div className="mb-3 flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-green-600" />
                <h2 className="text-lg font-bold">Shopping List</h2>
                {shoppingItems.some((it) => it.checked) && (
                  <button onClick={handleClearChecked} className="ml-auto rounded bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">Clear Checked</button>
                )}
              </div>
              <div className="flex gap-2 mb-2">
                <input value={newShoppingItem} onChange={(e) => setNewShoppingItem(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddShoppingItem()} placeholder="Add item…" className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                <input value={newShoppingQty} onChange={(e) => setNewShoppingQty(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddShoppingItem()} placeholder="Qty" className="w-20 rounded border px-3 py-2 text-sm" />
                <button onClick={handleAddShoppingItem} className="rounded bg-green-600 px-3 py-2 text-sm font-semibold text-white">Add</button>
              </div>
              {shoppingItems.length === 0 ? (
                <p className="text-sm text-gray-500 mt-3">Your shopping list is empty.</p>
              ) : (
                <div className="mt-3 space-y-2">
                  {shoppingItems.map((it) => (
                    <div key={it.id} className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${it.checked ? "bg-gray-50 opacity-60" : "bg-white"}`}>
                      <input type="checkbox" checked={it.checked} onChange={() => handleToggleShoppingItem(it.id)} className="h-4 w-4 rounded accent-green-600" />
                      <div className="flex-1">
                        <span className={`text-sm ${it.checked ? "line-through text-gray-400" : "text-gray-800"}`}>{it.name}{it.qty ? " — " + it.qty : ""}</span>
                        {it.forMeal && <div className="mt-0.5"><span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">📅 {it.forMeal}</span></div>}
                      </div>
                      <button onClick={() => handleRemoveShoppingItem(it.id)} className="text-xs text-gray-400 hover:text-red-500">✕</button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
            {expiringSoon.length > 0 && (
              <Card>
                <h3 className="mb-2 font-bold text-gray-700">🔔 Expiring Soon — Add to List?</h3>
                <p className="mb-3 text-xs text-gray-500">These items expire within 7 days. Tap to add a replacement to your shopping list.</p>
                <div className="space-y-2">
                  {expiringSoon.map((it) => {
                    const alreadyAdded = shoppingItems.some((s) => s.name.toLowerCase() === it.name.toLowerCase());
                    const urgent = it.daysLeft !== null && it.daysLeft <= 3;
                    return (
                      <div key={it.id} className={`flex items-center justify-between rounded-lg border px-3 py-2 ${urgent ? "border-red-200 bg-red-50" : "border-yellow-200 bg-yellow-50"}`}>
                        <div>
                          <span className="text-sm font-semibold">{it.name}</span>
                          <span className={`ml-2 text-xs font-bold ${urgent ? "text-red-600" : "text-yellow-600"}`}>{it.daysLeft}d left</span>
                        </div>
                        <button onClick={() => handleAddToShoppingFromTracker(it)} disabled={alreadyAdded} className={`rounded px-3 py-1 text-xs font-semibold ${alreadyAdded ? "bg-gray-100 text-gray-400" : "bg-green-600 text-white"}`}>
                          {alreadyAdded ? "Added" : "+ Add"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </>
        )}
        {showMealPicker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-1 text-lg font-bold">Pick a Meal</h2>
              <p className="mb-3 text-xs text-gray-500">{mealPickerDay} — {mealPickerSlot}</p>
              <div className="flex gap-2 mb-3">
                <MealSearchInput value={mealPickerSearch} onChange={(e) => setMealPickerSearch(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && mealPickerSearch.trim()) handleSetMeal(mealPickerDay, mealPickerSlot, mealPickerSearch.trim()); }} />
                {mealPickerSearch.trim() && <button onClick={() => handleSetMeal(mealPickerDay, mealPickerSlot, mealPickerSearch.trim())} className="rounded bg-blue-600 px-3 py-2 text-sm font-semibold text-white">Add</button>}
              </div>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {mealPickerSearch && !RECIPE_DB.find((r) => r.name.toLowerCase() === mealPickerSearch.toLowerCase()) && (
                  <button onClick={() => handleSetMeal(mealPickerDay, mealPickerSlot, mealPickerSearch)} className="w-full rounded-lg border-2 border-dashed border-blue-300 px-3 py-2 text-left text-sm text-blue-600">+ Add "{mealPickerSearch}" as custom meal</button>
                )}
                {RECIPE_DB.filter((r) => r.name.toLowerCase().includes(mealPickerSearch.toLowerCase())).map((r) => {
                  const usesExpiring = r.ingredients.some((ing) => itemsWithCountdown.some((it) => it.daysLeft !== null && it.daysLeft <= 7 && (it.name.toLowerCase().includes(ing) || ing.includes(it.name.toLowerCase()))));
                  return (
                    <button key={r.name} onClick={() => handleSetMeal(mealPickerDay, mealPickerSlot, r.name)} className="w-full rounded-lg border px-3 py-2 text-left text-sm hover:bg-orange-50">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{r.name}</span>
                        <div className="flex items-center gap-1">
                          {usesExpiring && <span className="text-xs text-orange-500">⚡ uses expiring</span>}
                          <span className="text-xs text-gray-400">⏱ {r.time}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <button onClick={() => { setShowMealPicker(false); setMealPickerSearch(""); }} className="mt-3 w-full rounded border py-2 text-sm font-semibold text-gray-600">Cancel</button>
            </div>
          </div>
        )}

        {activeTab === "meals" && (
          <>
            <Card>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📅</span>
                  <h2 className="text-lg font-bold">Meal Planner</h2>
                </div>
                <button onClick={handleAiPlanWeek} disabled={aiPlanLoading} className={`rounded px-3 py-1.5 text-xs font-semibold text-white ${aiPlanLoading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"}`}>
                  {aiPlanLoading ? "⏳ Planning..." : "✨ AI Plan My Week"}
                </button>
              </div>
              <p className="text-xs text-gray-500 mb-4">Tap any slot to add a meal. ⚡ means it uses ingredients expiring soon.</p>
              <div className="space-y-4">
                {DAYS.map((day) => (
                  <div key={day} className="rounded-lg border overflow-hidden">
                    <div className="bg-gray-50 px-3 py-2 font-semibold text-sm text-gray-700">{day}</div>
                    <div className="divide-y">
                      {MEAL_SLOTS.map((slot) => {
                        const meal = meals[`${day}-${slot}`];
                        const recipe = meal ? RECIPE_DB.find((r) => r.name === meal) : null;
                        const usesExpiring = recipe && recipe.ingredients.some((ing) => itemsWithCountdown.some((it) => it.daysLeft !== null && it.daysLeft <= 7 && (it.name.toLowerCase().includes(ing) || ing.includes(it.name.toLowerCase()))));
                        return (
                          <div key={slot} className="flex items-center gap-2 px-3 py-2">
                            <span className="w-16 text-xs font-medium text-gray-500">{slot}</span>
                            {meal ? (
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1">
                                    {usesExpiring && <span className="text-orange-400">⚡</span>}
                                    <span className="text-sm font-medium">{meal}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    {recipe && <button onClick={() => handleAddMealIngredientsToShopping(meal)} className="rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">+ List</button>}
                                    <button onClick={() => { setMealPickerDay(day); setMealPickerSlot(slot); setShowMealPicker(true); }} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">Change</button>
                                    <button onClick={() => handleClearMeal(day, slot)} className="text-xs text-gray-400 hover:text-red-500">✕</button>
                                  </div>
                                </div>
                                {recipe && recipe.temps && (
                                  <div className="mt-1 flex flex-wrap gap-1">
                                    <span className="text-xs text-gray-500 mr-1">🌡️</span>
                                    {recipe.temps.map((t) => (
                                      <span key={t.label} className={`rounded-full px-2 py-0.5 text-xs font-medium ${t.color} ${t.safe ? "ring-1 ring-green-400" : ""}`}>{t.label}: {t.temp}{t.safe ? " ✅" : ""}</span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <button onClick={() => { setMealPickerDay(day); setMealPickerSlot(slot); setShowMealPicker(true); }} className="flex-1 rounded border border-dashed border-gray-200 py-1 text-xs text-gray-400 hover:border-orange-300 hover:text-orange-400">+ Add meal</button>
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
            {!username ? (
              <Card>
                <div className="mb-2 flex items-center gap-2"><Users className="h-5 w-5 text-blue-500" /><h2 className="text-lg font-bold">Join the Community</h2></div>
                <p className="mb-3 text-sm text-gray-600">Choose a display name to get started.</p>
                <div className="flex gap-2">
                  <input value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSetUsername()} placeholder="Your display name" className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                  <button onClick={handleSetUsername} className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Join</button>
                </div>
              </Card>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Signed in as <span className="font-semibold text-blue-600">{username}</span></p>
                  <button onClick={() => { setUsername(""); localStorage.removeItem(USERNAME_KEY); }} className="text-xs text-gray-400 underline">Change name</button>
                </div>
                <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
                  {[["chat","💬 Chat"],["recipes","📖 Recipes"],["tips","💡 Tips"]].map(([id, label]) => (
                    <button key={id} onClick={() => setCommunityTab(id)} className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${communityTab === id ? "bg-white shadow text-blue-600" : "text-gray-500"}`}>{label}</button>
                  ))}
                </div>
                {communityTab === "chat" && (
                  <Card>
                    <h3 className="mb-3 font-bold">Community Chat</h3>
                    <div className="mb-3 max-h-64 space-y-2 overflow-y-auto">
                      {community.chat.length === 0 ? <p className="text-sm text-gray-500">No messages yet — say hello!</p> : community.chat.map((msg) => (
                        <div key={msg.id} className="rounded-lg bg-gray-50 px-3 py-2">
                          <div className="flex items-center justify-between"><span className="text-xs font-semibold text-blue-600">{msg.author}</span><span className="text-xs text-gray-400">{msg.time}</span></div>
                          <p className="text-sm text-gray-800">{msg.text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input value={newChat} onChange={(e) => setNewChat(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handlePostChat()} placeholder="Type a message…" className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                      <button onClick={handlePostChat} className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Send</button>
                    </div>
                  </Card>
                )}
                {communityTab === "recipes" && (
                  <Card>
                    <h3 className="mb-3 font-bold">Recipe Exchange</h3>
                    <div className="mb-4 space-y-2">
                      <input value={newRecipeTitle} onChange={(e) => setNewRecipeTitle(e.target.value)} placeholder="Recipe title" className="w-full rounded border px-3 py-2 text-sm text-gray-900" />
                      <textarea value={newRecipeBody} onChange={(e) => setNewRecipeBody(e.target.value)} placeholder="Ingredients and instructions…" rows={3} className="w-full rounded border px-3 py-2 text-sm text-gray-900" />
                      <button onClick={handlePostRecipe} className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Share Recipe</button>
                    </div>
                    <div className="space-y-3">
                      {community.recipes.length === 0 ? <p className="text-sm text-gray-500">No recipes shared yet — be the first!</p> : community.recipes.map((r) => (
                        <div key={r.id} className="rounded-lg border p-3">
                          <div className="flex items-center justify-between"><span className="font-semibold">{r.title}</span><span className="text-xs text-gray-400">{r.date}</span></div>
                          <p className="mt-1 text-xs text-blue-600">{r.author}</p>
                          <p className="mt-1 whitespace-pre-wrap text-sm text-gray-700">{r.body}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
                {communityTab === "tips" && (
                  <Card>
                    <h3 className="mb-3 font-bold">Tips & Ideas</h3>
                    <div className="mb-4 flex gap-2">
                      <input value={newTip} onChange={(e) => setNewTip(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handlePostTip()} placeholder="Share a food storage tip…" className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                      <button onClick={handlePostTip} className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Post</button>
                    </div>
                    <div className="space-y-2">
                      {community.tips.length === 0 ? <p className="text-sm text-gray-500">No tips yet — share one!</p> : community.tips.map((tip) => (
                        <div key={tip.id} className="rounded-lg bg-yellow-50 border border-yellow-200 px-3 py-2">
                          <div className="flex items-center justify-between"><span className="text-xs font-semibold text-blue-600">{tip.author}</span><span className="text-xs text-gray-400">{tip.date}</span></div>
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
      </div>
    </div>
    </>
  );
}
