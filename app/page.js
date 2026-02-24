"use client";
import { useState, useEffect } from "react";

const FOOD_DB = [
  { name: "Apples", category: "Produce" },
  { name: "Avocados", category: "Produce" },
  { name: "Bananas", category: "Produce" },
  { name: "Bell Peppers", category: "Produce" },
  { name: "Blueberries", category: "Produce" },
  { name: "Broccoli", category: "Produce" },
  { name: "Carrots", category: "Produce" },
  { name: "Chicken Breast", category: "Meat" },
  { name: "Ground Beef", category: "Meat" },
  { name: "Ribeye Steak", category: "Meat" },
  { name: "Salmon", category: "Meat" },
  { name: "Eggs", category: "Dairy" },
  { name: "Milk", category: "Dairy" },
  { name: "Cheddar Cheese", category: "Dairy" },
  { name: "Yogurt", category: "Dairy" },
  { name: "Bread", category: "Bread" },
  { name: "Ketchup", category: "Condiments" },
  { name: "Mustard", category: "Condiments" },
  { name: "Mayonnaise", category: "Condiments" }
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
  
  const [showSmartScanner, setShowSmartScanner] = useState(false);
  const [scanMode, setScanMode] = useState("choose");
  const [barcodeInput, setBarcodeInput] = useState("");
  const [barcodeData, setBarcodeData] = useState(null);
  const [labelPhotos, setLabelPhotos] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [scanError, setScanError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("trackfresh.items");
    if (saved) setTrackedItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("trackfresh.items", JSON.stringify(trackedItems));
  }, [trackedItems]);

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

  const lookupBarcode = async (barcode) => {
    setScanning(true);
    setScanError(null);
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      const data = await response.json();
      
      if (data.status === 1 && data.product) {
        const productName = data.product.product_name || data.product.generic_name || "Unknown Product";
        const categories = data.product.categories || "";
        const category = 
          categories.includes("dairy") || categories.includes("milk") || categories.includes("cheese") ? "Dairy" :
          categories.includes("meat") || categories.includes("poultry") || categories.includes("beef") ? "Meat" :
          categories.includes("produce") || categories.includes("fruit") || categories.includes("vegetable") ? "Produce" :
          categories.includes("bread") || categories.includes("bakery") ? "Bread" :
          categories.includes("condiment") || categories.includes("sauce") ? "Condiments" : "Pantry";
        
        setBarcodeData({ name: productName, category: category });
        setScanMode("photo");
      } else {
        setScanError("Product not found. Try photo scanner instead.");
        setScanMode("photo");
      }
    } catch (error) {
      setScanError("Barcode lookup failed. Try photo scanner instead.");
      setScanMode("photo");
    }
    setScanning(false);
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

  const scanPhotos = async () => {
    if (labelPhotos.length === 0) return;
    
    setScanning(true);
    setScanError(null);
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
        const finalResult = barcodeData ? {
          name: barcodeData.name,
          category: barcodeData.category,
          date: result.date || null
        } : result;
        setScanResult(finalResult);
      } else {
        setScanError('Could not read label. Try taking clearer photos!');
      }
    } catch (error) {
      setScanError(result.error || "Scanning failed. Try again.");
    }
    setScanning(false);
  };

  const addScannedItem = () => {
    if (scanResult && scanResult.name && scanResult.date) {
      setTrackedItems(prev => [...prev, {
        id: crypto.randomUUID(),
        name: scanResult.name,
        category: scanResult.category || 'Other',
        useByDate: scanResult.date,
        addedDate: new Date().toISOString()
      }]);
      closeScanner();
    }
  };

  const closeScanner = () => {
    setShowSmartScanner(false);
    setScanMode('choose');
    setBarcodeInput('');
    setBarcodeData(null);
    setLabelPhotos([]);
    setScanResult(null);
    setScanError(null);
  };

  const itemsWithCountdown = trackedItems.map(item => ({
    ...item,
    daysLeft: daysUntil(item.useByDate),
    urgent: daysUntil(item.useByDate) !== null && daysUntil(item.useByDate) <= 3
  })).sort((a, b) => (a.daysLeft || 999) - (b.daysLeft || 999));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white min-h-screen shadow-2xl">
        
        {view === "home" && (
          <div className="p-8">
            <h1 className="text-6xl font-bold text-center mb-4">🥦 TrackFresh</h1>
            <p className="text-3xl text-center text-gray-600 mb-12">Save Food • Save Money</p>
            
            <div className="space-y-6">
              <button
                onClick={() => setView("tracker")}
                className="w-full py-16 bg-green-500 text-white rounded-3xl font-bold text-4xl shadow-2xl"
              >
                📦 Food Tracker
              </button>
              
              <button
                onClick={() => setView("shopping")}
                className="w-full py-16 bg-blue-500 text-white rounded-3xl font-bold text-4xl shadow-2xl"
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
                <button
                  onClick={() => setShowSmartScanner(true)}
                  className="w-full py-10 bg-orange-400 text-white rounded-3xl font-bold text-3xl shadow-lg"
                >
                  📦 Smart Scanner
                </button>
              </div>

              <div className="mb-6 overflow-x-auto">
                <div className="flex gap-2 pb-2">
                  {["All", "Produce", "Meat", "Dairy", "Bread", "Condiments"].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-6 py-3 rounded-full font-bold text-xl whitespace-nowrap ${
                        categoryFilter === cat ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

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

              <div className="mb-8">
                <label className="block text-3xl font-bold text-gray-800 mb-3">Add Food:</label>
                <div className="relative mb-4">
                  <input
                    type="text"
                    value={foodInput}
                    onChange={(e) => setFoodInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (showSuggestions && suggestions.length > 0) {
                          setFoodInput(suggestions[0]);
                          setShowSuggestions(false);
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

            {showSmartScanner && (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
                <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <h2 className="text-4xl font-bold mb-4">📦 Smart Scanner</h2>
                  
                  {!scanResult ? (
                    <>
                      {scanMode === 'choose' && (
                        <>
                          <p className="text-2xl mb-6">Choose scanning method:</p>
                          <button
                            onClick={() => setScanMode('barcode')}
                            className="w-full py-8 bg-purple-500 text-white rounded-3xl font-bold text-3xl mb-4 shadow-lg"
                          >
                            📦 Scan Barcode
                          </button>
                          <button
                            onClick={() => setScanMode('photo')}
                            className="w-full py-8 bg-blue-500 text-white rounded-3xl font-bold text-3xl mb-4 shadow-lg"
                          >
                            📸 Take Photos
                          </button>
                          <button
                            onClick={closeScanner}
                            className="w-full py-4 bg-gray-300 rounded-2xl font-bold text-xl"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      {scanMode === 'barcode' && (
                        <>
                          <p className="text-xl mb-4">Enter or scan the product barcode</p>
                          <input
                            type="text"
                            value={barcodeInput}
                            onChange={(e) => setBarcodeInput(e.target.value)}
                            placeholder="Enter barcode number..."
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && barcodeInput.trim()) {
                                lookupBarcode(barcodeInput.trim());
                              }
                            }}
                            className="w-full px-6 py-6 rounded-2xl border-4 text-3xl mb-4"
                          />
                          <button
                            onClick={() => lookupBarcode(barcodeInput.trim())}
                            disabled={!barcodeInput.trim() || scanning}
                            className="w-full py-6 bg-purple-500 text-white rounded-2xl font-bold text-2xl mb-4 disabled:bg-gray-300"
                          >
                            {scanning ? '🔍 Looking up...' : '🔍 Look Up Product'}
                          </button>
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
                          {barcodeData && (
                            <div className="bg-green-50 border-4 border-green-300 rounded-2xl p-4 mb-4">
                              <p className="text-xl font-bold">✅ Product: {barcodeData.name}</p>
                              <p className="text-lg">Now take photo of expiration date</p>
                            </div>
                          )}
                          {!barcodeData && <p className="text-xl mb-4">Take photos of the food label (front and back if needed)</p>}
                          
                          {scanError && (
                            <div className="bg-red-50 border-4 border-red-400 rounded-2xl p-4 mb-4">
                              <p className="text-xl font-bold text-red-800">⚠️ {scanError}</p>
                            </div>
                          )}

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

                          {labelPhotos.length > 0 && (
                            <div className="mb-4">
                              <p className="text-xl font-bold mb-2">{labelPhotos.length} photo(s) captured</p>
                              <div className="grid grid-cols-3 gap-2 mb-4">
                                {labelPhotos.map((photo, idx) => (
                                  <img key={idx} src={photo.preview} className="w-full h-24 object-cover rounded-lg" alt="Label" />
                                ))}
                              </div>
                              <button
                                onClick={scanPhotos}
                                disabled={scanning}
                                className="w-full py-6 bg-green-500 text-white rounded-2xl font-bold text-2xl disabled:bg-gray-300"
                              >
                                {scanning ? '🔍 Scanning...' : '✓ Scan Photos'}
                              </button>
                            </div>
                          )}

                          <button
                            onClick={closeScanner}
                            className="w-full py-4 bg-gray-300 text-gray-900 rounded-2xl font-bold text-xl"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="bg-green-50 border-4 border-green-300 rounded-2xl p-6 mb-4">
                        <p className="text-2xl font-bold mb-2">✅ Found:</p>
                        <p className="text-xl"><strong>Name:</strong> {scanResult.name || 'Not found'}</p>
                        <p className="text-xl"><strong>Expires:</strong> {scanResult.date || 'Not found'}</p>
                        <p className="text-xl"><strong>Category:</strong> {scanResult.category || 'Unknown'}</p>
                      </div>

                      <button
                        onClick={addScannedItem}
                        disabled={!scanResult.name || !scanResult.date}
                        className="w-full py-6 bg-green-500 text-white rounded-3xl font-bold text-2xl mb-3 disabled:bg-gray-300"
                      >
                        ✓ Add to Tracker
                      </button>

                      <button
                        onClick={() => {
                          setScanResult(null);
                          setLabelPhotos([]);
                          setScanMode(barcodeData ? 'photo' : 'choose');
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
              <p className="text-3xl text-center text-gray-600">Shopping list feature available!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
