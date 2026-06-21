"use client";

import React from "react";
import SearchSaveDiscountCard from "./SearchSaveDiscountCard";
import { TrackFreshLogo } from "./ui/TrackFreshLogo";

export default function StoreDiscountModal({ item, lang, onClose }) {
  const isEs = lang === "es";
  if (!item) return null;

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

        <p className="tf-instruction-hint--inline text-xs mb-4" style={{ fontWeight: 700, lineHeight: 1.5 }}>
          {isEs
            ? "Lleva tu app TrackFresh a una tienda participante. Preséntala en caja y muestra la fecha de vencimiento."
            : "Take your TrackFresh app with you to a participating store. Present this at checkout and show the expiry date."}
        </p>

        <SearchSaveDiscountCard item={item} lang={lang} />

        <ol className="text-sm space-y-2 m-0 mt-4 mb-3 pl-4" style={{ color: "rgba(255,255,255,0.9)" }}>
          <li>
            <strong>{isEs ? "En caja:" : "At checkout:"}</strong>{" "}
            {isEs
              ? "Presenta esta pantalla al cajero con el artículo."
              : "Present this screen to the clerk with the item."}
          </li>
          <li>
            <strong>{isEs ? "Verificación:" : "Verification:"}</strong>{" "}
            {isEs
              ? "El cajero verifica la fecha, escanea y etiqueta el artículo y aplica el código de descuento."
              : "Clerk verifies the expiry date, scans and tags the item, and applies the discount code."}
          </li>
        </ol>

        <p className="text-xs text-center m-0 mb-3" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.45 }}>
          {isEs
            ? "Programa piloto — tiendas participantes."
            : "Pilot program — participating stores."}
        </p>

        <div className="flex justify-center opacity-80">
          <TrackFreshLogo showBroc={false} style={{ fontSize: "0.85rem" }} />
        </div>
      </div>
    </div>
  );
}
