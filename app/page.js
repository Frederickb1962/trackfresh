"use client";
import { useState, useEffect } from "react";

const FOOD_DB = [
  // Produce
  { name: "Apples", category: "Produce" },
  { name: "Avocados", category: "Produce" },
  { name: "Bananas", category: "Produce" },
  { name: "Bell Peppers", category: "Produce" },
  { name: "Blueberries", category: "Produce" },
  { name: "Blackberries", category: "Produce" },
  { name: "Raspberries", category: "Produce" },
  { name: "Strawberries", category: "Produce" },
  { name: "Broccoli", category: "Produce" },
  { name: "Brussels Sprouts", category: "Produce" },
  { name: "Cabbage", category: "Produce" },
  { name: "Carrots", category: "Produce" },
  { name: "Cauliflower", category: "Produce" },
  { name: "Celery", category: "Produce" },
  { name: "Cherries", category: "Produce" },
  { name: "Corn", category: "Produce" },
  { name: "Cucumbers", category: "Produce" },
  { name: "Eggplant", category: "Produce" },
  { name: "Garlic", category: "Produce" },
  { name: "Ginger", category: "Produce" },
  { name: "Grapes", category: "Produce" },
  { name: "Green Beans", category: "Produce" },
  { name: "Kale", category: "Produce" },
  { name: "Lemons", category: "Produce" },
  { name: "Lettuce", category: "Produce" },
  { name: "Limes", category: "Produce" },
  { name: "Mango", category: "Produce" },
  { name: "Mushrooms", category: "Produce" },
  { name: "Onions", category: "Produce" },
  { name: "Oranges", category: "Produce" },
  { name: "Peaches", category: "Produce" },
  { name: "Pears", category: "Produce" },
  { name: "Pineapple", category: "Produce" },
  { name: "Potatoes", category: "Produce" },
  { name: "Radishes", category: "Produce" },
  { name: "Spinach", category: "Produce" },
  { name: "Sweet Potatoes", category: "Produce" },
  { name: "Tomatoes", category: "Produce" },
  { name: "Watermelon", category: "Produce" },
  { name: "Zucchini", category: "Produce" },
  
  // Meat & Seafood
  { name: "Bacon", category: "Meat" },
  { name: "Beef Brisket", category: "Meat" },
  { name: "Beef Chuck Roast", category: "Meat" },
  { name: "Chicken Breast", category: "Meat" },
  { name: "Chicken Thighs", category: "Meat" },
  { name: "Chicken Wings", category: "Meat" },
  { name: "Deli Ham", category: "Meat" },
  { name: "Deli Turkey", category: "Meat" },
  { name: "Filet Mignon", category: "Meat" },
  { name: "Flank Steak", category: "Meat" },
  { name: "Ground Beef", category: "Meat" },
  { name: "Ground Chicken", category: "Meat" },
  { name: "Ground Pork", category: "Meat" },
  { name: "Ground Turkey", category: "Meat" },
  { name: "Ham", category: "Meat" },
  { name: "Hot Dogs", category: "Meat" },
  { name: "Pork Chops", category: "Meat" },
  { name: "Pork Ribs", category: "Meat" },
  { name: "Pork Tenderloin", category: "Meat" },
  { name: "Ribeye Steak", category: "Meat" },
  { name: "Salmon", category: "Meat" },
  { name: "Sausage", category: "Meat" },
  { name: "Shrimp", category: "Meat" },
  { name: "Sirloin Steak", category: "Meat" },
  { name: "T-Bone Steak", category: "Meat" },
  { name: "Tilapia", category: "Meat" },
  { name: "Tuna", category: "Meat" },
  { name: "Turkey Breast", category: "Meat" },
  { name: "Whole Chicken", category: "Meat" },
  
  // Dairy
  { name: "Almond Milk", category: "Dairy" },
  { name: "Butter", category: "Dairy" },
  { name: "Cheddar Cheese", category: "Dairy" },
  { name: "Cottage Cheese", category: "Dairy" },
  { name: "Cream Cheese", category: "Dairy" },
  { name: "Eggs", category: "Dairy" },
  { name: "Feta Cheese", category: "Dairy" },
  { name: "Greek Yogurt", category: "Dairy" },
  { name: "Half and Half", category: "Dairy" },
  { name: "Heavy Cream", category: "Dairy" },
  { name: "Milk", category: "Dairy" },
  { name: "Mozzarella", category: "Dairy" },
  { name: "Oat Milk", category: "Dairy" },
  { name: "Parmesan", category: "Dairy" },
  { name: "Sour Cream", category: "Dairy" },
  { name: "Swiss Cheese", category: "Dairy" },
  { name: "Whipped Cream", category: "Dairy" },
  { name: "Yogurt", category: "Dairy" },
  
  // Bread & Bakery
  { name: "Bagels", category: "Bread" },
  { name: "Baguette", category: "Bread" },
  { name: "Bread", category: "Bread" },
  { name: "Croissants", category: "Bread" },
  { name: "Dinner Rolls", category: "Bread" },
  { name: "English Muffins", category: "Bread" },
  { name: "Hamburger Buns", category: "Bread" },
  { name: "Hot Dog Buns", category: "Bread" },
  { name: "Pita Bread", category: "Bread" },
  { name: "Sourdough", category: "Bread" },
  { name: "Tortillas", category: "Bread" },
  { name: "Wheat Bread", category: "Bread" },
  { name: "White Bread", category: "Bread" },
  
  // Condiments & Sauces
  { name: "BBQ Sauce", category: "Condiments" },
  { name: "Hot Sauce", category: "Condiments" },
  { name: "Ketchup", category: "Condiments" },
  { name: "Mayonnaise", category: "Condiments" },
  { name: "Mustard", category: "Condiments" },
  { name: "Ranch Dressing", category: "Condiments" },
  { name: "Salsa", category: "Condiments" },
  { name: "Soy Sauce", category: "Condiments" },
  { name: "Sriracha", category: "Condiments" },
  { name: "Tartar Sauce", category: "Condiments" },
  { name: "Teriyaki Sauce", category: "Condiments" },
  { name: "Worcestershire Sauce", category: "Condiments" },
  
  // Frozen
  { name: "Frozen Broccoli", category: "Frozen" },
  { name: "Frozen Corn", category: "Frozen" },
  { name: "Frozen Peas", category: "Frozen" },
  { name: "Frozen Pizza", category: "Frozen" },
  { name: "Ice Cream", category: "Frozen" },
  { name: "Frozen Vegetables", category: "Frozen" },
  
  // Pantry
  { name: "Olive Oil", category: "Pantry" },
  { name: "Pasta", category: "Pantry" },
  { name: "Rice", category: "Pantry" },
  { name: "Canned Beans", category: "Pantry" },
  { name: "Canned Tomatoes", category: "Pantry" },
  { name: "Flour", category: "Pantry" },
  { name: "Sugar", category: "Pantry" },
  { name: "Salt", category: "Pantry" },
  { name: "Pepper", category: "Pantry" },
  { name: "Oats", category: "Pantry" },
  { name: "Cereal", category: "Pantry" },
  { name: "Peanut Butter", category: "Pantry" }
];

const FOOD_ITEMS = FOOD_DB.map(f => f.name);

export default function TrackFresh() {
  const [view, setView] = useState("home");
  const [trackedItems, setTrackedItems] = useState([]);
  const [foodInput, setFoodInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [shoppingItems, setShoppingItems] = useState([]);
  const [shoppingInput, setShoppingInput] = useState("");
  const [shoppingSuggestions, setShoppingSuggestions] = useState([]);
  const [showShoppingSuggestions, setShowShoppingSuggestions] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("trackfresh.items");
    if (saved) setTrackedItems(JSON.parse(saved));
    const savedShopping = localStorage.getItem("trackfresh.shopping");
    if (savedShopping) setShoppingItems(JSON.parse(savedShopping));
  }, []);

  useEffect(() => {
    localStorage.setItem("trackfresh.items", JSON.stringify(trackedItems));
  }, [trackedItems]);

  useEffect(() => {
    localStorage.setItem("trackfresh.shopping", JSON.stringify(shoppingItems));
  }, [shoppingItems]);

  useEffect(() => {
    if (shoppingInput.trim().length > 0) {
      const filtered = FOOD_ITEMS.filter(item =>
        item.toLowerCase().includes(shoppingInput.toLowerCase())
      ).slice(0, 5);
      setShoppingSuggestions(filtered);
      setShowShoppingSuggestions(true);
    } else {
      setShoppingSuggestions([]);
      setShowShoppingSuggestions(false);
    }
  }, [shoppingInput]);

  useEffect(() => {
    localStorage.setItem("trackfresh.shopping", JSON.stringify(shoppingItems));
  }, [shoppingItems]);

  useEffect(() => {
    if (shoppingInput.trim().length > 0) {
      const filtered = FOOD_ITEMS.filter(item =>
        item.toLowerCase().includes(shoppingInput.toLowerCase())
      ).slice(0, 5);
      setShoppingSuggestions(filtered);
      setShowShoppingSuggestions(true);
    } else {
      setShoppingSuggestions([]);
      setShowShoppingSuggestions(false);
    }
  }, [shoppingInput]);

  useEffect(() => {
    if (foodInput.trim().length > 0) {
      const filtered = FOOD_DB
        .filter(item => item.name.toLowerCase().includes(foodInput.toLowerCase()))
        .map(item => item.name)
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [foodInput]);

  const daysUntil = (date) => {
    if (!date) return null;
    const today = new Date();
    const expiry = new Date(date);
    return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  };

  const addFood = (name) => {
    if (name.trim() && dateInput) {
      const foodData = FOOD_DB.find(f => f.name === name);
      setTrackedItems(prev => [...prev, {
        id: crypto.randomUUID(),
        name: name,
        category: foodData ? foodData.category : "Other",
        useByDate: dateInput,
        addedDate: new Date().toISOString()
      }]);
      setFoodInput("");
      setDateInput("");
      setShowSuggestions(false);
    }
  };

  const itemsWithCountdown = trackedItems.map(item => ({
    ...item,
    daysLeft: daysUntil(item.useByDate),
    urgent: daysUntil(item.useByDate) !== null && daysUntil(item.useByDate) <= 3
  })).sort((a, b) => (a.daysLeft || 999) - (b.daysLeft || 999));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white min-h-screen">
        {view === "home" && (
          <div className="p-8">
            <h1 className="text-6xl font-bold text-center mb-4">🥦 TrackFresh</h1>
            <p className="text-3xl text-center text-gray-600 mb-12">Save Food • Save Money</p>
            
            <div className="space-y-6">
              <button
                onClick={() => setView("tracker")}
                className="w-full py-16 bg-green-500 text-white rounded-3xl font-bold text-4xl"
              >
                📦 Food Tracker
              </button>
              
              <button
                onClick={() => setView("shopping")}
                className="w-full py-16 bg-blue-500 text-white rounded-3xl font-bold text-4xl"
              >
                🛒 Shopping List
              </button>
            </div>
          </div>
        )}
        
        {view === "tracker" && (
          <div>
            <div className="bg-green-500 text-white p-6">
              <button onClick={() => setView("home")} className="text-3xl bg-white text-gray-900 px-6 py-3 rounded-2xl font-bold mb-4">
                ← Back
              </button>
              <h2 className="text-5xl font-bold">Food Tracker</h2>
            </div>
            
            <div className="p-6">
              {itemsWithCountdown.filter(i => i.urgent).length > 0 && (
                <div className="mb-6 p-6 bg-red-50 border-4 border-red-400 rounded-3xl">
                  <div className="flex items-center gap-4">
                    <span className="text-6xl">⚠️</span>
                    <div>
                      <p className="font-bold text-3xl text-red-800">
                        {itemsWithCountdown.filter(i => i.urgent).length} item{itemsWithCountdown.filter(i => i.urgent).length > 1 ? 's' : ''} expiring soon!
                      </p>
                      <p className="text-red-700 text-2xl mt-1">Use them before they go bad!</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="space-y-4 mb-8">
                <button className="w-full py-10 bg-orange-400 text-white rounded-3xl font-bold text-3xl">
                  🏷️ Label Scanner
                </button>
                <button className="w-full py-10 bg-purple-400 text-white rounded-3xl font-bold text-3xl">
                  📦 Barcode
                </button>
                <button className="w-full py-10 bg-blue-400 text-white rounded-3xl font-bold text-3xl">
                  📹 Receipt
                </button>
              </div>

              <div className="mb-6 overflow-x-auto">
                <div className="flex gap-2 pb-2">
                  {["All", "Produce", "Meat", "Dairy", "Bread", "Condiments", "Frozen", "Pantry"].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-6 py-3 rounded-full font-bold text-xl whitespace-nowrap ${
                        categoryFilter === cat
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-3xl font-bold text-gray-800 mb-3">Add Food:</label>
                <div className="relative mb-4">
                  <input
                    type="text"
                    value={foodInput}
                    onChange={(e) => setFoodInput(e.target.value)}
                    placeholder="Type food name..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (showSuggestions && suggestions.length > 0) {
                          setFoodInput(suggestions[0]);
                          setShowSuggestions(false);
                        }
                      }
                    }}
                    className="w-full px-8 py-8 rounded-3xl border-4 border-green-300 text-4xl text-gray-900 font-bold"
                  />
                  
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-2 bg-white border-4 border-green-300 rounded-2xl shadow-2xl">
                      {suggestions.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setFoodInput(item);
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left px-8 py-6 text-3xl font-bold text-gray-900 hover:bg-green-100 border-b-2 last:border-b-0"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <label className="block text-3xl font-bold text-gray-800 mb-3">Expiration Date:</label>
                <input
                  type="date"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && foodInput && dateInput) {
                      addFood(foodInput);
                    }
                  }}
                  className="w-full px-8 py-8 rounded-3xl border-4 border-green-300 text-4xl text-gray-900 font-bold mb-4"
                />

                <button
                  onClick={() => addFood(foodInput)}
                  disabled={!foodInput || !dateInput}
                  className="w-full py-6 bg-green-500 text-white rounded-3xl font-bold text-3xl disabled:bg-gray-300"
                >
                  ✅ Add to Tracker
                </button>
              </div>

              {itemsWithCountdown.filter(item => 
                categoryFilter === "All" || item.category === categoryFilter
              ).length > 0 ? (
                <div className="space-y-4">
                  {itemsWithCountdown
                    .filter(item => categoryFilter === "All" || item.category === categoryFilter)
                    .map(item => (
                    <div
                      key={item.id}
                      className={`p-6 rounded-3xl shadow-xl ${
                        item.urgent
                          ? "bg-gradient-to-br from-red-50 to-orange-50 border-4 border-red-300"
                          : "bg-white border-4 border-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-4xl font-bold text-gray-900">{item.name}</h3>
                          <span className="inline-block mt-2 px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-xl font-bold">
                            {item.category}
                          </span>
                        </div>
                        <div className="text-right ml-4">
                          <div className={`text-6xl font-black ${item.urgent ? "text-red-600" : "text-green-600"}`}>
                            {item.daysLeft !== null ? item.daysLeft : "?"}
                          </div>
                          <div className="text-2xl text-gray-600 font-bold">days left</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <button
                          onClick={() => setTrackedItems(prev => prev.filter(i => i.id !== item.id))}
                          className="py-4 bg-green-500 text-white rounded-2xl font-bold text-2xl"
                        >
                          ✓ Used It!
                        </button>
                        <button
                          onClick={() => setTrackedItems(prev => prev.filter(i => i.id !== item.id))}
                          className="py-4 bg-gray-400 text-white rounded-2xl font-bold text-2xl"
                        >
                          × Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-3xl text-gray-600">Add food with expiration date!</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {view === "shopping" && (
          <div>
            <div className="bg-blue-500 text-white p-6">
              <button onClick={() => setView("home")} className="text-3xl bg-white text-gray-900 px-6 py-3 rounded-2xl font-bold mb-4">
                ← Back
              </button>
              <h2 className="text-5xl font-bold">Shopping List</h2>
            </div>
            
            <div className="p-6">
              <div className="mb-6 relative">
                <input
                  type="text"
                  value={shoppingInput}
                  onChange={(e) => setShoppingInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const itemToAdd = showShoppingSuggestions && shoppingSuggestions.length > 0 
                        ? shoppingSuggestions[0] 
                        : shoppingInput;
                      if (itemToAdd.trim()) {
                        setShoppingItems(prev => [...prev, {
                          id: crypto.randomUUID(),
                          name: itemToAdd,
                          checked: false
                        }]);
                        setShoppingInput("");
                        setShowShoppingSuggestions(false);
                      }
                    }
                  }}
                  placeholder="Add item..."
                  className="w-full px-8 py-8 rounded-3xl border-4 border-blue-300 text-4xl text-gray-900"
                />
                
                {showShoppingSuggestions && shoppingSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 bg-white border-4 border-blue-300 rounded-2xl shadow-2xl">
                    {shoppingSuggestions.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setShoppingItems(prev => [...prev, {
                            id: crypto.randomUUID(),
                            name: item,
                            checked: false
                          }]);
                          setShoppingInput("");
                          setShowShoppingSuggestions(false);
                        }}
                        className="w-full text-left px-8 py-6 text-3xl font-bold text-gray-900 hover:bg-blue-100 border-b-2 last:border-b-0"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {shoppingItems.some(item => item.checked) && (
                <button
                  onClick={() => setShoppingItems(prev => prev.filter(item => !item.checked))}
                  className="w-full mb-6 py-5 bg-red-500 text-white rounded-3xl font-bold text-3xl"
                >
                  🗑️ Clear Checked Items
                </button>
              )}

              {shoppingItems.length > 0 ? (
                <div className="space-y-3">
                  {shoppingItems.map(item => (
                    <div
                      key={item.id}
                      onClick={() => setShoppingItems(prev => prev.map(i =>
                        i.id === item.id ? { ...i, checked: !i.checked } : i
                      ))}
                      className="flex items-center gap-4 p-6 border-4 border-blue-200 rounded-3xl bg-white cursor-pointer hover:bg-blue-50"
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => {}}
                        className="w-10 h-10"
                      />
                      <span className={`text-4xl flex-1 ${item.checked ? "line-through text-gray-400" : "text-gray-900 font-bold"}`}>
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-3xl text-gray-600">Add items to your shopping list!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
