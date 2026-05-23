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
        color: "rgba(255,255,255,0.72)",
        fontSize: "0.85rem",
        maxWidth: "22rem",
        ...style,
      }}
    >
      🥦 {isEs ? fact.es : fact.en}
    </p>
  );
}
