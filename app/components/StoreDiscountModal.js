"use client";

import React from "react";
import {
  REGISTER_DISCOUNT_PERCENT,
  registerDiscountDaysLabel,
  registerDiscountVerifyCode,
} from "../lib/storeDiscount";
import { TrackFreshLogo } from "./ui/TrackFreshLogo";

function fmtDate(dateString) {
  if (!dateString) return "—";
  const d = new Date(dateString + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function StoreDiscountModal({ item, lang, onClose }) {
  const isEs = lang === "es";
  if (!item) return null;

  const code = registerDiscountVerifyCode(item.id, item.useByDate);
  const name = item.brand ? `${item.brand} ${item.name}` : item.name;

  return (
    <div
      className="fixed inset-0 z-[10060] flex items-end justify-center tf-premium-overlay p-3 sm:items-center"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-md rounded-2xl tf-modal-glass-surface p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="store-discount-title"
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest m-0" style={{ color: "#f59e0b" }}>
              {isEs ? "TrackFresh Buscar y Ahorrar" : "TrackFresh Search and Save"}
            </p>
            <h2 id="store-discount-title" className="text-lg font-bold text-white m-0 mt-1">
              {isEs ? "20% de descuento en caja" : "20% off at register"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="tf-glass-scan shrink-0"
            style={{ padding: "0.35rem 0.65rem", fontSize: "0.85rem" }}
            aria-label={isEs ? "Cerrar" : "Close"}
          >
            ✕
          </button>
        </div>

        <div
          className="rounded-xl p-4 mb-4 text-center"
          style={{
            border: "2px solid #f59e0b",
            background: "linear-gradient(180deg, rgba(245,158,11,0.22) 0%, rgba(0,0,0,0.35) 100%)",
            boxShadow: "0 0 24px rgba(249,115,22,0.35)",
          }}
        >
          <p className="text-4xl font-black m-0" style={{ color: "#fde68a" }}>
            {REGISTER_DISCOUNT_PERCENT}% OFF
          </p>
          <p className="text-sm font-bold m-0 mt-1" style={{ color: "#fff" }}>
            {name}
          </p>
          <p className="text-xs m-0 mt-2" style={{ color: "rgba(255,255,255,0.85)" }}>
            {isEs ? "Usar antes de:" : "Use by:"}{" "}
            <strong>{fmtDate(item.useByDate)}</strong>
            {" · "}
            {registerDiscountDaysLabel(item.daysLeft, lang)}
          </p>
        </div>

        <ol className="text-sm space-y-2 m-0 mb-4 pl-4" style={{ color: "rgba(255,255,255,0.9)" }}>
          <li>
            <strong>{isEs ? "En la tienda:" : "At the store:"}</strong>{" "}
            {isEs
              ? "Lleva este artículo a caja en una tienda participante."
              : "Bring this same item to checkout at a participating store."}
          </li>
          <li>
            <strong>{isEs ? "Muestra TrackFresh:" : "Show TrackFresh:"}</strong>{" "}
            {isEs
              ? "Presenta esta pantalla al cajero."
              : "Show this screen to the clerk."}
          </li>
          <li>
            <strong>{isEs ? "Verificación:" : "Verification:"}</strong>{" "}
            {isEs
              ? "El cajero verifica la fecha, escanea y etiqueta el artículo y aplica el código de descuento."
              : "Clerk verifies date, scans and tags the item, and applies the discount code."}
          </li>
        </ol>

        <div
          className="rounded-lg px-3 py-2 mb-3 text-center"
          style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          <p className="text-xs m-0 mb-1" style={{ color: "rgba(255,255,255,0.65)" }}>
            {isEs ? "Código de verificación" : "Verification code"}
          </p>
          <p
            className="text-xl font-mono font-bold m-0 tracking-wider"
            style={{ color: "#86efac", letterSpacing: "0.12em" }}
          >
            {code}
          </p>
        </div>

        <p className="text-xs text-center m-0 mb-3" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.45 }}>
          {isEs
            ? "Programa piloto — tiendas asociadas. Ayuda a reducir desperdicio y mejora el inventario."
            : "Pilot program — participating stores. Cuts waste and helps stores move inventory."}
        </p>

        <div className="flex justify-center opacity-80">
          <TrackFreshLogo showBroc={false} style={{ fontSize: "0.85rem" }} />
        </div>
      </div>
    </div>
  );
}
