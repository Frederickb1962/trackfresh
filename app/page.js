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
  const [showWelcome, setShowWelcome] = useState(false);
  const [showLabelScanner, setShowLabelScanner] = useState(false);
  const [labelPhotos, setLabelPhotos] = useState([]);
  const [labelScanning, setLabelScanning] = useState(false);
  const [labelResult, setLabelResult] = useState(null);
  const [scanError, setScanError] = useState(null);
  const [scanMode, setScanMode] = useState('choose'); // 'choose', 'barcode', 'photo'
  const [scannedBarcode, setScannedBarcode] = useState(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
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
    
    const hasSeenWelcome = localStorage.getItem("trackfresh.welcomed");
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
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

  const handleAcceptTerms = () => {
    if (agreedToTerms) {
      localStorage.setItem("trackfresh.welcomed", "true");
      setShowWelcome(false);
    }
  };

  const daysUntil = (date) => {
    if (!date) return null;
    const today = new Date();
    const expiry = new Date(date);
    return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  };
  const handlePhotoCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLabelPhotos(prev => [...prev, {
          data: event.target.result.split(',')[1],
          mediaType: file.type,
          preview: event.target.result
        }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const scanLabelPhotos = async () => {
    if (labelPhotos.length === 0) return;
    
    setLabelScanning(true);
    try {
      const response = await fetch('/api/scan-label', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          images: labelPhotos.map(p => ({ data: p.data, mediaType: p.mediaType }))
        })
      });
      
      const result = await response.json();
      if (result.error) {
        setScanError(result.error);
      } else if (result.name || result.date) {
        const finalResult = scannedBarcode ? {
          name: scannedBarcode.name,
          category: scannedBarcode.category,
          date: result.date || null
        } : result;
        setLabelResult(finalResult);
        setScanError(null);
      } else {
        setScanError('Could not read label. Try taking clearer photos!');
      }
    } catch (error) {
      setScanError('Error scanning: ' + error.message);
    }
    setLabelScanning(false);
  };


  const lookupBarcode = async (barcode) => {
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      const data = await response.json();
      
      if (data.status === 1 && data.product) {
        const productName = data.product.product_name || data.product.generic_name || 'Unknown Product';
        const category = data.product.categories ? 
          (data.product.categories.includes('dairy') ? 'Dairy' :
           data.product.categories.includes('meat') ? 'Meat' :
           data.product.categories.includes('produce') ? 'Produce' : 'Pantry') 
          : 'Pantry';
        
        setScannedBarcode({ name: productName, category: category });
        setScanMode('photo');
        setScanError(null);
      } else {
        setScanError('Product not found. Use photo scanner instead.');
        setScanMode('photo');
      }
    } catch (error) {
      setScanError('Barcode lookup failed. Use photo scanner instead.');
      setScanMode('photo');
    }
  };

  const addScannedItem = () => {
    if (labelResult && labelResult.name && labelResult.date) {
      setTrackedItems(prev => [...prev, {
        id: crypto.randomUUID(),
        name: labelResult.name,
        category: labelResult.category || 'Other',
        useByDate: labelResult.date,
        addedDate: new Date().toISOString()
      }]);
      setShowLabelScanner(false);
      setLabelPhotos([]);
      setLabelResult(null);
    }
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
                <button onClick={() => setShowLabelScanner(true)}
                  className="w-full py-10 bg-orange-400 text-white rounded-3xl font-bold text-3xl">
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

              {/* Smart Scanner Modal */}
              {showLabelScanner && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
                  <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <h2 className="text-4xl font-bold mb-4">📦 Smart Scanner</h2>
                    
                    {!labelResult ? (
                      <>
                        {scanMode === 'choose' && (
                          <>
                            <p className="text-2xl mb-6">Choose scanning method:</p>
                            <button
                              onClick={() => setScanMode('barcode')}
                              className="w-full py-8 bg-purple-500 text-white rounded-3xl font-bold text-3xl mb-4"
                            >
                              📦 Scan Barcode
                            </button>
                            <button
                              onClick={() => setScanMode('photo')}
                              className="w-full py-8 bg-blue-500 text-white rounded-3xl font-bold text-3xl mb-4"
                            >
                              📸 Take Photos
                            </button>
                            <button
                              onClick={() => {
                                setShowLabelScanner(false);
                                setScanMode('choose');
                              }}
                              className="w-full py-4 bg-gray-300 rounded-2xl font-bold text-xl"
                            >
                              Cancel
                            </button>
                          </>
                        )}

                        {scanMode === 'barcode' && (
                          <>
                            <p className="text-xl mb-4">Scan the product barcode</p>
                            <input
                              type="text"
                              placeholder="Or enter barcode manually..."
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.target.value) {
                                  lookupBarcode(e.target.value);
                                }
                              }}
                              className="w-full px-6 py-6 rounded-2xl border-4 text-3xl mb-4"
                            />
                            <button
                              onClick={() => setScanMode('choose')}
                              className="w-full py-4 bg-gray-300 rounded-2xl font-bold text-xl"
                            >
                              ← Back
                            </button>
                          </>
                        )}

                        {scanMode === 'photo' && (
                          <>
                            {scannedBarcode && (
                              <div className="bg-green-50 border-4 border-green-300 rounded-2xl p-4 mb-4">
                                <p className="text-xl font-bold">✅ Product: {scannedBarcode.name}</p>
                                <p className="text-lg">Now take photo of expiration date</p>
                              </div>
                            )}
                            {!scannedBarcode && <p className="text-xl mb-4">Take photos of the food label (front and back if needed)</p>}
                        
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={handlePhotoCapture}
                          className="hidden"
                          id="photo-input"
                        />
                        
                        <label htmlFor="photo-input" className="block w-full py-6 bg-blue-500 text-white rounded-2xl text-center font-bold text-2xl mb-4 cursor-pointer">
                          📷 Take Photo
                        </label>

                        {scanError && (
                          <div className="bg-red-50 border-4 border-red-400 rounded-2xl p-4 mb-4">
                            <p className="text-xl font-bold text-red-800">⚠️ {scanError}</p>
                          </div>
                        )}

                        {labelPhotos.length > 0 && (
                          <div className="mb-4">
                            <p className="text-xl font-bold mb-2">{labelPhotos.length} photo(s) captured</p>
                            <div className="grid grid-cols-3 gap-2 mb-4">
                              {labelPhotos.map((photo, idx) => (
                                <img key={idx} src={photo.preview} className="w-full h-24 object-cover rounded-lg" alt="Label" />
                              ))}
                            </div>
                            <button
                              onClick={scanLabelPhotos}
                              disabled={labelScanning}
                              className="w-full py-6 bg-green-500 text-white rounded-2xl font-bold text-2xl disabled:bg-gray-300"
                            >
                              {labelScanning ? '🔍 Scanning...' : '✓ Scan Photos'}
                            </button>
                          </div>
                        )}

                        <button
                          onClick={() => {
                            setShowLabelScanner(false);
                            setLabelPhotos([]);
                            setScanMode('choose');
                            setScannedBarcode(null);
                            setScanError(null);
                          }}
                          className="w-full py-4 bg-gray-300 text-gray-900 rounded-2xl font-bold text-xl"
                        >
                          Cancel
                        </button>
                      </>
                    ) && (
                      <>
                        <div className="bg-green-50 border-4 border-green-300 rounded-2xl p-6 mb-4">
                          <p className="text-2xl font-bold mb-2">✅ Found:</p>
                          <p className="text-xl"><strong>Name:</strong> {labelResult.name || 'Not found'}</p>
                          <p className="text-xl"><strong>Expires:</strong> {labelResult.date || 'Not found'}</p>
                          <p className="text-xl"><strong>Category:</strong> {labelResult.category || 'Unknown'}</p>
                        </div>

                        <button
                          onClick={addScannedItem}
                          disabled={!labelResult.name || !labelResult.date}
                          className="w-full py-6 bg-green-500 text-white rounded-2xl font-bold text-2xl mb-3 disabled:bg-gray-300"
                        >
                          ✓ Add to Tracker
                        </button>

                        <button
                          onClick={() => {
                            setLabelResult(null);
                            setLabelPhotos([]);
                          }}
                          className="w-full py-4 bg-yellow-400 text-gray-900 rounded-2xl font-bold text-xl"
                        >
                          📸 Try Again
                        </button>
                      </>
                    )}
                  </div>
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
