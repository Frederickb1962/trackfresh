"use client";
import { useState, useEffect } from "react";

const FOOD_ITEMS = [
  "Apples", "Avocados", "Bananas", "Bell Peppers", "Blueberries", "Bread",
  "Broccoli", "Butter", "Carrots", "Cheddar Cheese", "Chicken Breast",
  "Eggs", "Garlic", "Grapes", "Greek Yogurt", "Ground Beef", "Ham",
  "Lettuce", "Milk", "Mozzarella", "Mushrooms", "Onions", "Oranges",
  "Pasta", "Potatoes", "Rice", "Salmon", "Spinach", "Strawberries",
  "Tomatoes", "Turkey", "Yogurt"
];

export default function TrackFresh() {
  const [view, setView] = useState("home");
  const [trackedItems, setTrackedItems] = useState([]);
  const [foodInput, setFoodInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [shoppingItems, setShoppingItems] = useState([]);
  const [shoppingInput, setShoppingInput] = useState("");
  const [shoppingItems, setShoppingItems] = useState([]);
  const [shoppingInput, setShoppingInput] = useState("");

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
    localStorage.setItem("trackfresh.shopping", JSON.stringify(shoppingItems));
  }, [shoppingItems]);

  useEffect(() => {
    if (foodInput.trim().length > 0) {
      const filtered = FOOD_ITEMS.filter(item =>
        item.toLowerCase().includes(foodInput.toLowerCase())
      ).slice(0, 5);
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
      setTrackedItems(prev => [...prev, {
        id: crypto.randomUUID(),
        name: name,
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

              {itemsWithCountdown.length > 0 ? (
                <div className="space-y-4">
                  {itemsWithCountdown.map(item => (
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
                        </div>
                        <div className="text-right ml-4">
                          <div className={`text-6xl font-black ${item.urgent ? "text-red-600" : "text-green-600"}`}>
                            {item.daysLeft !== null ? item.daysLeft : "?"}
                          </div>
                          <div className="text-2xl text-gray-600 font-bold">days left</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setTrackedItems(prev => prev.filter(i => i.id !== item.id))}
                        className="mt-4 w-full py-4 bg-red-500 text-white rounded-2xl font-bold text-2xl"
                      >
                        × Remove
                      </button>
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
              <div className="mb-6">
                <input
                  type="text"
                  value={shoppingInput}
                  onChange={(e) => setShoppingInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && shoppingInput.trim()) {
                      setShoppingItems(prev => [...prev, {
                        id: crypto.randomUUID(),
                        name: shoppingInput,
                        checked: false
                      }]);
                      setShoppingInput("");
                    }
                  }}
                  placeholder="Add item..."
                  className="w-full px-8 py-8 rounded-3xl border-4 border-blue-300 text-4xl text-gray-900"
                />
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
