"use client";
import { useState } from "react";

export default function TrackFresh() {
  const [view, setView] = useState("home");

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
            <div className="p-6 space-y-4">
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
              <p className="text-3xl text-center text-gray-600">Shopping list ready!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
