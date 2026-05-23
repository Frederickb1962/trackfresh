"use client";

import { useEffect, useState } from "react";
import { FOOD_FACTS } from "../../lib/foodFacts";

function nextIndex(prev) {
  if (FOOD_FACTS.length <= 1) return 0;
  let i = Math.floor(Math.random() * FOOD_FACTS.length);
  while (i === prev) i = Math.floor(Math.random() * FOOD_FACTS.length);
  return i;
}

/** Rotating food fact for loading / scanning screens. Mount only while loading. */
export function LoadingFoodFact({ lang, className = "", style }) {
  const isEs = lang === "es";
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * FOOD_FACTS.length));

  useEffect(() => {
    const id = setInterval(() => setIdx((prev) => nextIndex(prev)), 4500);
    return () => clearInterval(id);
  }, []);

  const fact = FOOD_FACTS[idx];
  return (
    <p
      className={className}
      style={{
        margin: 0,
        textAlign: "center",
        lineHeight: 1.5,
        fontStyle: "italic",
        color: "#F0C070",
        fontSize: "0.85rem",
        fontWeight: 600,
        maxWidth: "22rem",
        textShadow: "0 0 12px rgba(232, 166, 60, 0.45), 0 1px 2px rgba(0, 0, 0, 0.4)",
        ...style,
      }}
    >
      🥦 {isEs ? fact.es : fact.en}
    </p>
  );
}
