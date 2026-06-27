"use client";

import React from "react";
import {
  REGISTER_DISCOUNT_PERCENT,
  registerDiscountDaysLabel,
  registerDiscountVerifyCode,
} from "../lib/storeDiscount";

function fmtDate(dateString) {
  if (!dateString) return "—";
  const d = new Date(dateString + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function SearchSaveDiscountCard({ item, lang, compact = false, onClick }) {
  const isEs = lang === "es";
  if (!item) return null;

  const code = registerDiscountVerifyCode(item.id, item.useByDate);
  const name = item.brand ? `${item.brand} ${item.name}` : item.name;

  const inner = (
    <>
      <p
        className="font-black m-0"
        style={{ color: "#fde68a", fontSize: compact ? "1.75rem" : "2.25rem", lineHeight: 1.1 }}
      >
        {REGISTER_DISCOUNT_PERCENT}% OFF
      </p>
      <p className="text-sm font-bold m-0 mt-1" style={{ color: "#fff" }}>
        {name}
      </p>
      <p className="text-xs m-0 mt-2" style={{ color: "rgba(255,255,255,0.88)" }}>
        {isEs ? "Mostrar en caja — vence:" : "Show at checkout — expires:"}{" "}
        <strong style={{ color: "#fde68a" }}>{fmtDate(item.useByDate)}</strong>
        {" · "}
        {registerDiscountDaysLabel(item.daysLeft, lang)}
      </p>
      <div
        className="rounded-lg px-3 py-2 mt-3 text-center"
        style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.15)" }}
      >
        <p className="text-xs m-0 mb-1" style={{ color: "rgba(253, 224, 71, 0.75)" }}>
          {isEs ? "Buscar y Ahorrar — código" : "Search and Save — code"}
        </p>
        <p
          className="font-mono font-bold m-0 tracking-wider"
          style={{ color: "#fde047", letterSpacing: "0.12em", fontSize: compact ? "1rem" : "1.25rem" }}
        >
          {code}
        </p>
      </div>
    </>
  );

  const cardStyle = {
    border: "2px solid rgba(253, 224, 71, 0.45)",
    background: "linear-gradient(180deg, rgba(253, 224, 71, 0.14) 0%, rgba(0, 0, 0, 0.38) 100%)",
    boxShadow: "0 0 20px rgba(253, 224, 71, 0.14)",
    borderRadius: "12px",
    padding: compact ? "0.85rem 1rem" : "1rem 1.1rem",
    textAlign: "center",
    width: "100%",
    boxSizing: "border-box",
  };

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-full text-left"
        style={{ ...cardStyle, cursor: "pointer", fontFamily: "inherit", color: "inherit" }}
      >
        {inner}
      </button>
    );
  }

  return <div style={cardStyle}>{inner}</div>;
}
