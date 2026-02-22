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
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("trackfresh.items");
    if (saved) setTrackedItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("trackfresh.items", JSON.stringify(trackedItems));
  }, [trackedItems]);

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

  const addFood = (name) => {
    if (name.trim()) {
      setTrackedItems(prev => [...prev, {
        id: crypto.randomUUID(),
        name: name,
        addedDate: new Date().toISOString()
      }]);
      setFoodInput("");
      setShowSuggestions(false);
    }
  };

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

              <div className="mb-8 relative">
                <label className="block text-3xl font-bold text-gray-800 mb-3">Add Food:</label>
                <input
                  type="text"
                  value={foodInput}
                  onChange={(e) => setFoodInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (showSuggestions && suggestions.length > 0) {
                        addFood(suggestions[0]);
                      } else if (foodInput.trim()) {
                        addFood(foodInput);
                      }
                    }
                  }}
                  placeholder="Type food name..."
                  className="w-full px-8 py-8 rounded-3xl border-4 border-green-300 text-4xl text-gray-900 font-bold"
                />
                
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 bg-white border-4 border-green-300 rounded-2xl shadow-2xl">
                    {suggestions.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => addFood(item)}
                        className="w-full text-left px-8 py-6 text-3xl font-bold text-gray-900 hover:bg-green-100 border-b-2 last:border-b-0"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {trackedItems.length > 0 ? (
                <div className="space-y-4">
                  {trackedItems.map(item => (
                    <div key={item.id} className="p-6 bg-white border-4 border-gray-200 rounded-3xl">
                      <div className="flex justify-between items-center">
                        <h3 className="text-4xl font-bold text-gray-900">{item.name}</h3>
                        <button
                          onClick={() => setTrackedItems(prev => prev.filter(i => i.id !== item.id))}
                          className="px-6 py-3 bg-red-500 text-white rounded-2xl font-bold text-2xl"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-3xl text-gray-600">Start typing to add food!</p>
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
              <p className="text-3xl text-center text-gray-600">Shopping list coming next!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
