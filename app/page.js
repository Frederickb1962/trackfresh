"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Bell, PlusCircle } from "lucide-react";

const STORAGE_KEY = "trackfresh.items";

function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    // Upgrade older saved items: add an id if missing
    return parsed.map((it) => ({
      id: it.id ?? crypto.randomUUID(),
      name: (it.name ?? "").trim(),
      useByDate: it.useByDate ?? "",
      openDate: it.openDate ?? "",
    }));
  } catch (e) {
    console.error("Failed to load saved items", e);
    return [];
  }
}

function saveItems(items) {
  const sorted = [...items].sort((a, b) => {
    const da = a.useByDate ? new Date(a.useByDate + "T00:00:00").getTime() : Infinity;
    const db = b.useByDate ? new Date(b.useByDate + "T00:00:00").getTime() : Infinity;
    return da - db;
  });
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted));
  } catch (e) {
    console.error("Failed to save items", e);
  }
}

function daysUntil(dateString) {
  if (!dateString) return null;
  const today = new Date();
  const targetDate = new Date(dateString + "T00:00:00");
  const diffTime = targetDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-xl border bg-white p-4 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export default function TrackFreshDashboard() {
  const [showHelp, setShowHelp] = useState(false);
  const [itemName, setItemName] = useState("");
  const [useByDate, setUseByDate] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertItem, setAlertItem] = useState({ name: "", daysLeft: 0 });
  const [trackedItems, setTrackedItems] = useState([]);

  // Load saved items on first render
  useEffect(() => {
    setTrackedItems(loadItems());
  }, []);

  // Save items whenever they change
  useEffect(() => {
    saveItems(trackedItems);
  }, [trackedItems]);

  const itemsWithCountdown = useMemo(() => {
    return trackedItems.map((it) => ({
      ...it,
      daysLeft: daysUntil(it.useByDate),
    }));
  }, [trackedItems]);

  const handleAddItem = () => {
    const name = itemName.trim();
    if (!name) return;

    if (name.toLowerCase().startsWith("alexa:")) {
      const spokenItem = name.replace(/alexa:/i, "").trim();
      const today = new Date();
      const todayStr = today.toISOString().split("T")[0];
      const defaultDays = 30;
      const useBy = new Date(today.getTime() + defaultDays * 24 * 60 * 60 * 1000);

      const newItem = {
        name: spokenItem,
        useByDate: useBy.toISOString().split("T")[0],
        openDate: todayStr,
      };

      setTrackedItems((prev) => [...prev, newItem]);
      window.alert(
        `Alexa: Tracking "${spokenItem}" opened today, expires in ${defaultDays} days.`
      );
      setItemName("");
      return;
    }

    if (name.toLowerCase().includes("spinach")) {
      window.alert("⚠️ Recall alert example: Spinach Recall (demo)");
    }

    if (!useByDate) {
      window.alert("Please enter a Use By date.");
      return;
    }

    const daysLeft = daysUntil(useByDate);
    if (daysLeft !== null && daysLeft <= 3) {
      setAlertItem({ name, daysLeft });
      setShowAlert(true);
    }

    setTrackedItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name, useByDate, openDate },
    ]);

    setItemName("");
    setUseByDate("");
    setOpenDate("");
  };

  const handleRemoveItem = (idx) => {
    setTrackedItems((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">TrackFresh</h1>
          <button
            onClick={() => setShowHelp(true)}
            className="text-sm font-medium text-blue-600 underline"
          >
            How to use
          </button>
        </div>

        {showHelp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-2 text-lg font-bold">How to Use</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>🔹 Add a grocery item and its "Use By" date.</li>
                <li>🔹 See the countdown; get alerted if it's within 3 days.</li>
                <li>🔹 Later: recipes, safety alerts, coupons, voice logging.</li>
              </ul>
              <button
                onClick={() => setShowHelp(false)}
                className="mt-4 rounded bg-blue-600 px-4 py-2 font-semibold text-white"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {showAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
              <div className="mb-2 flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <h2 className="text-lg font-bold">Use-by Alert</h2>
              </div>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">{alertItem.name}</span> is{" "}
                <span className="font-semibold">{alertItem.daysLeft}</span>{" "}
                day{alertItem.daysLeft === 1 ? "" : "s"} from its use-by date.
              </p>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setShowAlert(false)}
                  className="rounded border px-4 py-2 text-sm font-semibold"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        <Card>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Item
              </label>
              <input
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder='e.g. "Chicken" or "Alexa: Milk"'
                className="w-full rounded border px-3 py-2 text-sm"
              />
            </div>

            <div className="sm:col-span-1">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Use By
              </label>
              <input
                type="date"
                value={useByDate}
                onChange={(e) => setUseByDate(e.target.value)}
                className="w-full rounded border px-3 py-2 text-sm"
              />
            </div>

            <div className="sm:col-span-1">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Opened (optional)
              </label>
              <input
                type="date"
                value={openDate}
                onChange={(e) => setOpenDate(e.target.value)}
                className="w-full rounded border px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-gray-600">
              Tip: try <span className="font-mono">Alexa: berries</span> for a
              quick demo add.
            </p>
            <button
              onClick={handleAddItem}
              className="inline-flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
            >
              <PlusCircle className="h-4 w-4" />
              Add
            </button>
          </div>
        </Card>

        <Card>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg font-bold">Tracked Items</h2>
            <span className="text-sm text-gray-600">
              {itemsWithCountdown.length} item
              {itemsWithCountdown.length === 1 ? "" : "s"}
            </span>
          </div>

          {itemsWithCountdown.length === 0 ? (
            <p className="text-sm text-gray-600">
              No items yet — add something above.
            </p>
          ) : (
            <div className="space-y-2">
              {itemsWithCountdown.map((it, idx) => (
                <div
                  key={it.id ?? `${it.name}-${idx}`}
                  className="flex items-center justify-between rounded-lg border bg-white px-3 py-2"
                >
                  <div>
                    <div className="font-semibold">{it.name}</div>
                    <div className="text-xs text-gray-600">
                      Use by: {it.useByDate}
                      {it.openDate ? ` • Opened: ${it.openDate}` : ""}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-semibold">
                        {it.daysLeft === null ? "—" : it.daysLeft}
                      </div>
                      <div className="text-xs text-gray-600">days left</div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(idx)}
                      className="rounded border px-3 py-1 text-xs font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
