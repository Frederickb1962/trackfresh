#!/bin/bash
# TrackFresh fix: Add Scan Multiple functionality
# Run from inside your trackfresh-v3 folder

echo "🔧 Adding Scan Multiple feature..."

# Step 1: Add state variables after showSmartScanner line
sed -i '' '/const \[showSmartScanner, setShowSmartScanner\] = useState(false);/a\
  const [showMultiScanner, setShowMultiScanner] = useState(false);\
  const [multiScanStatus, setMultiScanStatus] = useState("camera");\
  const [multiItems, setMultiItems] = useState([]);\
  const [multiScanError, setMultiScanError] = useState("");\
  const [selectedMultiItems, setSelectedMultiItems] = useState([]);
' app/page.js

echo "✅ State variables added"

# Step 2: Add handler functions after handleSmartError line
sed -i '' '/const handleSmartError = (msg) => {/a\
\
  const handleMultiScan = async (file) => {\
    setMultiScanStatus("scanning"); setMultiScanError(""); setMultiItems([]);\
    try {\
      const reader = new FileReader();\
      reader.onload = async (e) => {\
        const base64 = e.target.result.split(",")[1];\
        const mType = file.type || "image/jpeg";\
        const res = await fetch("/api/scan-multi", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ imageData: base64, mediaType: mType }) });\
        const data = await res.json();\
        if (data.error) { setMultiScanError(data.error); setMultiScanStatus("camera"); return; }\
        if (!data.items || data.items.length === 0) { setMultiScanError("No food items found. Try again."); setMultiScanStatus("camera"); return; }\
        setMultiItems(data.items);\
        setSelectedMultiItems(data.items.map((_, i) => i));\
        setMultiScanStatus("review");\
      };\
      reader.readAsDataURL(file);\
    } catch (err) { setMultiScanError(err.message); setMultiScanStatus("camera"); }\
  };\
\
  const handleAddMultiItems = () => {\
    const today = new Date().toISOString().split("T")[0];\
    const newItems = selectedMultiItems.map(i => multiItems[i]).filter(Boolean).map(item => ({\
      id: crypto.randomUUID(), name: item.name || "Unknown", useByDate: item.date || "", openDate: today,\
      category: item.category || "Other", quantity: "1", location: item.location || "Fridge",\
      daysAfterOpening: item.daysAfterOpening || null, storageTip: item.storageTip || "", openedTip: item.openedTip || ""\
    }));\
    setTrackedItems(prev => [...newItems, ...prev]);\
    setShowMultiScanner(false); setMultiItems([]); setMultiScanStatus("camera"); setSelectedMultiItems([]);\
  };
' app/page.js

echo "✅ Handler functions added"

echo ""
echo "⚠️  Now you need to add the modal UI. This is too large for sed."
echo "    Proceed to the next step..."
