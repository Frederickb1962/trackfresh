"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { FOOD_DB } from "../../lib/foodData";
import { FOOD_ES } from "../../lib/foodData";
import { CATEGORY_COLORS, LOCATION_COLORS, LOCATION_ICONS } from "../../lib/uiConstants";

export function MealSearchInput({ value, onChange, onKeyDown }) {
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

export function FoodAutocomplete({ value, onChange, onSelect, lang }) {
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
        placeholder={lang === "es" ? "ej. Pechuga de Pollo" : "e.g. Chicken Breast"}
        className="w-full rounded border px-3 py-2 text-sm text-gray-900"
      />
      {open && matches.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border bg-white shadow-lg">
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

export function CommunityStewAnim() {
  const [phase, setPhase] = React.useState("dance");
  const chars = [
    { emoji: "🥕", left: "calc(50% - 80px)", delay: "0s" },
    { emoji: "🥦", left: "calc(50% - 40px)", delay: "0.15s" },
    { emoji: "🍗", left: "calc(50%)", delay: "0.3s" },
    { emoji: "🥩", left: "calc(50% + 40px)", delay: "0.1s" },
    { emoji: "🌽", left: "calc(50% + 80px)", delay: "0.2s" },
    { emoji: "🧅", left: "calc(50% - 60px)", delay: "0.25s", top: true },
    { emoji: "🍅", left: "calc(50% + 60px)", delay: "0.05s", top: true },
  ];

  React.useEffect(() => {
    const t1 = setTimeout(() => setPhase("jump"), 3500);
    const t2 = setTimeout(() => setPhase("done"), 5500);
    const t3 = setTimeout(() => setPhase("dance"), 7500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <>
      {chars.map((ch, i) => (
        <div
          key={i}
          className={`food-char ${i % 2 === 0 ? "" : "r"} ${phase === "jump" ? "jump" : ""}`}
          style={{
            left: ch.left,
            bottom: ch.top ? "130px" : "95px",
            animationDelay: phase === "jump" ? `${i * 0.15}s` : ch.delay,
            fontSize: "32px"
          }}
        >
          {ch.emoji}
        </div>
      ))}
    </>
  );
}
