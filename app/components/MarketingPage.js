"use client";

import React from "react";
import { GLOBAL_STYLES } from "../lib/styles";
import { TrackFreshLogo } from "./ui/TrackFreshLogo";

export default function MarketingPage({ onLaunchApp, lang, onChangeLang }) {
  const isEs = lang === "es";
  const scrollFrameRef = React.useRef(null);
  const bottomBtnRef = React.useRef(null);
  const howItWorksRef = React.useRef(null);
  const [activeIcon, setActiveIcon] = React.useState(null);
  const iconDismissRef = React.useRef(null);
  const handleIconTap = (key) => {
    if (iconDismissRef.current) clearTimeout(iconDismissRef.current);
    setActiveIcon(prev => prev === key ? null : key);
    iconDismissRef.current = setTimeout(() => setActiveIcon(null), 3000);
  };
  const ICON_INFO = {
    ketchup: { emoji:"🍅", label: isEs ? "Ketchup" : "Ketchup", info: isEs ? "Después de abrir: 6 meses en el refrigerador" : "After opening: 6 months in fridge" },
    mayo:    { emoji:"🫙", label: isEs ? "Mayonesa" : "Mayo",    info: isEs ? "Después de abrir: 2 meses en el refrigerador" : "After opening: 2 months in fridge" },
    mustard: { emoji:"🌭", label: isEs ? "Mostaza" : "Mustard",  info: isEs ? "Después de abrir: 12 meses en el refrigerador" : "After opening: 12 months in fridge" },
  };

  React.useEffect(() => {
    return () => { if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current); };
  }, []);

  const handleAutoScroll = () => {
    window.scrollTo(0, 0);
    const scrollStep = () => {
      window.scrollBy(0, 7);
      if (bottomBtnRef.current) {
        const rect = bottomBtnRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.55) {
          cancelAnimationFrame(scrollFrameRef.current);
          onLaunchApp();
          return;
        }
      }
      scrollFrameRef.current = requestAnimationFrame(scrollStep);
    };
    scrollFrameRef.current = requestAnimationFrame(scrollStep);
  };

  const handleSeeHow = () => {
    if (howItWorksRef.current) howItWorksRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const B = String.fromCodePoint;
  const broc = B(0x1F966);
  const rocket = B(0x1F680);
  const milk = B(0x1F95B);
  const leafy = B(0x1F96C);
  const drum = B(0x1F357);
  const berry = B(0x1FAD0);
  const cheese = B(0x1F9C0);
  const pkg = B(0x1F4E6);
  const cart = B(0x1F6D2);
  const chart = B(0x1F4CA);
  const snap = B(0x1F4F8);
  const clock = B(0x23F0);
  const mic = B(0x1F3A4);
  const cook = B(0x1F373);
  const cal = B(0x1F4C5);
  const warn = B(0x26A0) + B(0xFE0F);
  const money = B(0x1F4B0);
  const globe = B(0x1F30D);
  const apple = B(0x1F34E);
  const mxFlag = B(0x1F1F2) + B(0x1F1FD);
  const usFlag = B(0x1F1FA) + B(0x1F1F8);
  return (
    <div className="mkt-page">
      <style dangerouslySetInnerHTML={{__html: GLOBAL_STYLES}} />

      {/* Nav */}
      <nav className="mkt-nav">
        <div className="mkt-nav-logo"><TrackFreshLogo /></div>
        <div style={{display:"flex",gap:"0.75rem",alignItems:"center"}}>
          <button type="button" onClick={() => onChangeLang(lang === "en" ? "es" : "en")} className="mkt-nav-glass-btn">{lang === "en" ? mxFlag + " ES" : usFlag + " EN"}</button>
          <button type="button" onClick={onLaunchApp} className="mkt-cta" style={{fontSize:"0.8rem",padding:"0.4rem 1.1rem"}}>{isEs ? "Abrir" : "Launch"}</button>
        </div>
      </nav>

      <div className="mkt-section-wrap">
        {/* Section 1 — Waste Less / hero + condiments */}
        <section className="mkt-section-card mkt-animate mkt-animate-d1" aria-label={isEs ? "Introducción" : "Introduction"}>
          <div className="mkt-hero">
            <span className="mkt-hero-eyebrow mkt-animate">
              {isEs ? "Menos Desperdicio. Mejor Cocina." : "Waste Less. Eat Better."}
            </span>
            <h1 className="mkt-hero-title">
              <span className="hero-slide-left" style={{animationDelay:"0.1s"}}>{isEs ? "Tu Cocina. Tu Comida." : "Your Kitchen. Your Food."}</span>
              <br />
              <span className="hero-slide-right" style={{animationDelay:"0.28s"}}>{isEs ? "Todo Rastreado para Mayor Frescura." : "Fully Tracked for Freshness."}</span>
            </h1>
            <p className="mkt-hero-sub mkt-animate" style={{animationDelay:"0.55s",color:"#ffffff"}}>
              {isEs ? "Tu puerta del refrigerador es un misterio. TrackFresh lo resuelve." : "Your fridge door is a mystery. TrackFresh solves it."}
            </p>
            <p className="mkt-hero-sub mkt-animate" style={{animationDelay:"0.72s",color:"rgba(255,255,255,0.85)",fontSize:"0.9rem",marginTop:"0.15rem"}}>
              {isEs ? "Sabe qué está fresco, qué sigue y qué tirar." : "Know what's fresh, what's next and what to toss."}
            </p>
          </div>
          <div className="mkt-condiment-strip mkt-animate" style={{animationDelay:"0.65s"}} onClick={() => setActiveIcon(null)} role="presentation">
            <p className="mkt-condiment-strip-lead">
              {isEs ? "👇 Toca un botón — prueba con ketchup, mostaza o mayonesa" : "👇 Tap a button — try ketchup, mustard, or mayo"}
            </p>
            <div className="mkt-condiment-row">
              {["ketchup", "mustard", "mayo"].map((key) => {
                const item = ICON_INFO[key];
                const isActive = activeIcon === key;
                const tapHint = isEs ? "Toca" : "Tap";
                return (
                  <div key={key} className="mkt-condiment-cell">
                    {isActive ? (
                      <div className="mkt-condiment-popover" role="status">
                        <p className="mkt-condiment-popover__info">{item.info}</p>
                        <p className="mkt-condiment-popover__tag">
                          ✨ {isEs ? "TrackFresh rastrea y te recuerda" : "TrackFresh tracks & reminds you!"}
                        </p>
                        <div className="mkt-condiment-popover__arrow" aria-hidden />
                      </div>
                    ) : null}
                    <button
                      type="button"
                      className={`mkt-condiment-btn${isActive ? " mkt-condiment-btn--active" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleIconTap(key);
                      }}
                      aria-label={`${item.label}. ${item.info}`}
                      aria-pressed={isActive}
                    >
                      <img src={`/${key}.png`} alt="" className="mkt-condiment-btn__img" />
                      <span className="mkt-condiment-btn__label">{item.label}</span>
                      <span className="mkt-condiment-btn__hint">{tapHint} →</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 2 — The Issue */}
        <section className="mkt-section-card mkt-animate mkt-animate-d2" aria-label={isEs ? "El problema" : "The Issue"}>
        <div style={{textAlign:"center",marginBottom:"0.85rem"}}>
          <p style={{color:"#f59e0b",fontWeight:700,fontSize:"0.95rem",letterSpacing:"0.13em",textTransform:"uppercase",margin:0}}>{isEs ? "EL PROBLEMA" : "The Issue"}</p>
        </div>
        <ul style={{listStyle:"none",padding:0,margin:"0 0 1rem",display:"flex",flexDirection:"column",gap:"0.6rem"}}>
          <li style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",fontSize:"0.97rem"}}><span>🏷️</span><span><strong>{isEs ? "¿Fechas de caducidad? Confusas por diseño — si es que las encuentras." : "Expiration dates? Confusing by design — if you can even find them."}</strong></span></li>
          <li style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",fontSize:"0.97rem"}}><span>🔓</span><span><strong>{isEs ? "¿Después de abrir? Prácticamente nadie te dice cuánto dura la comida en realidad. Y nadie te lo recuerda." : "After opening? Virtually no one tells you how long food actually lasts. And no one reminds you."}</strong></span></li>
          <li style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",fontSize:"0.97rem"}}><span>💸</span><span><strong>{isEs ? "Los consumidores desperdician casi 35 millones de toneladas de comida al año. = ¡$$$$$!" : "Consumers waste nearly 35 million tons of food each year. = $$$$$!"}</strong></span></li>
        </ul>
        <div style={{height:"2rem"}} />
          <p style={{textAlign:"center",fontWeight:900,fontSize:"1.1rem",margin:0,letterSpacing:"-0.01em"}}><span style={{color:"#f59e0b"}}>TrackFresh</span>{isEs ? " supera las etiquetas para que puedas rastrear la frescura en la palma de tu mano." : " outsmarts the labels so you can track freshness in the palm of your hand."}</p>
        </section>

        {/* Section 3 — The Solution (list only) */}
        <section className="mkt-section-card mkt-animate mkt-animate-d3" aria-label={isEs ? "La solución" : "The Solution"}>
        <div style={{textAlign:"center",marginBottom:"0.85rem"}}>
          <p style={{color:"#f59e0b",fontWeight:700,fontSize:"0.95rem",letterSpacing:"0.13em",textTransform:"uppercase",margin:0}}>{isEs ? "LA SOLUCIÓN" : "The Solution"}</p>
        </div>
        <ul style={{listStyle:"none",padding:0,margin:"0 0 1rem",display:"flex",flexDirection:"column",gap:"0.6rem"}}>
          <li style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",fontSize:"0.97rem"}}><span>🧾</span><span><strong>{isEs ? "Foto o sube un recibo—artículos, vida útil, tras abrir, autocompletado y alarmas." : "Snap or upload a receipt—items, shelf life, after-opening, autofilled with alarms."}</strong></span></li>
          <li style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",fontSize:"0.97rem"}}><span>📷</span><span><strong>{isEs ? "¿Sin recibo? Escanea hasta 10 o más artículos en una foto grupal—códigos, etiquetas, autocompletado." : "No receipt? Scan up to 10 or more items in a group shot—barcodes, labels, autofilled."}</strong></span></li>
          <li style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",fontSize:"0.97rem"}}><span>🎤</span><span><strong>{isEs ? "Reconocimiento de voz para fechas de caducidad cuando lo necesites." : "Voice recognition of expiration dates when needed."}</strong></span></li>
          <li style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",fontSize:"0.97rem"}}><span>🍳</span><span><strong>{isEs ? "La IA de TrackFresh genera recetas para ayudarte a usar lo que está por vencer." : "TrackFresh AI generates recipes to help you use expiring items."}</strong></span></li>
          <li style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",fontSize:"0.97rem"}}><span>⏰</span><span><strong>{isEs ? "Aviso de una semana para artículos por vencer." : "One week notice on expiring items."}</strong></span></li>
        </ul>
        </section>

        {/* Section 4 — TrackFresh Save (register discount + store inventory) */}
        <section className="mkt-section-card mkt-animate mkt-animate-d4" aria-label={isEs ? "TrackFresh Save" : "TrackFresh Save"}>
          <div style={{ textAlign: "center", marginBottom: "0.65rem" }}>
            <p style={{ color: "#f59e0b", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.13em", textTransform: "uppercase", margin: 0 }}>
              {isEs ? "BUSCAR Y AHORRAR EN CAJA" : "SEARCH AND SAVE AT CHECKOUT"}
            </p>
          </div>
          <div className="mkt-save-program">
            <h2 style={{ margin: "0 0 0.35rem", fontSize: "1.2rem", fontWeight: 900, lineHeight: 1.25 }}>
              {isEs ? "TrackFresh Save — todos ganan" : "TrackFresh Save — everyone wins"}
            </h2>
            <p style={{ margin: 0, fontSize: "0.92rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.5 }}>
              {isEs
                ? "Si un artículo vence en 2 días o menos, TrackFresh te ayuda a ahorrar — y ayuda a la tienda a mover inventario antes de que se eche a perder."
                : "When an item expires within 2 days, TrackFresh helps you save — and helps the store move inventory before it goes to waste."}
            </p>
            <p className="mkt-save-program__badge">20% OFF</p>
            <div className="mkt-save-program__grid">
              <div className="mkt-save-program__card">
                <h3>{isEs ? "Para ti" : "For you"}</h3>
                <p>
                  {isEs
                    ? "Ahorra dinero en productos que aún están buenos — no esperes al desperdicio."
                    : "Save money on food that's still good — don't wait until it's waste."}
                </p>
              </div>
              <div className="mkt-save-program__card">
                <h3>{isEs ? "Para tiendas" : "For stores"}</h3>
                <p>
                  {isEs
                    ? "Mejor control de inventario: vende antes del vencimiento y reduce mermas."
                    : "Better inventory control: sell through before expiry and cut shrink."}
                </p>
              </div>
              <div className="mkt-save-program__card">
                <h3>{isEs ? "Para TrackFresh" : "For TrackFresh"}</h3>
                <p>
                  {isEs
                    ? "Más valor: frescura rastreada que se convierte en ahorro real en la caja."
                    : "More value: tracked freshness that turns into real savings at checkout."}
                </p>
              </div>
            </div>
            <ol className="mkt-save-program__steps">
              <li>
                <span className="mkt-save-program__step-num">1</span>
                <span>
                  <strong>{isEs ? "Rastrea" : "Track"}</strong>{" "}
                  {isEs ? "fechas mientras recorres los pasillos." : "dates as you peruse the aisles."}
                </span>
              </li>
              <li>
                <span className="mkt-save-program__step-num">2</span>
                <span>
                  <strong>{isEs ? "Elegible:" : "Eligible:"}</strong>{" "}
                  {isEs
                    ? "fecha de vencimiento o usar antes dentro de 2 días."
                    : "expiry date or use-by date within 2 days."}
                </span>
              </li>
              <li>
                <span className="mkt-save-program__step-num">3</span>
                <span>
                  <strong>{isEs ? "En caja:" : "At register:"}</strong>{" "}
                  {isEs
                    ? "muestra la app; el cajero verifica la fecha, escanea y etiqueta el artículo y aplica el código de descuento."
                    : "show the app; clerk verifies date, scans and tags the item, and applies the discount code."}
                </span>
              </li>
              <li>
                <span className="mkt-save-program__step-num">4</span>
                <span>
                  {isEs ? "Mejora el vínculo con tus clientes." : "Enhance customer engagement."}
                </span>
              </li>
            </ol>
            <p style={{ margin: "0.85rem 0 0", fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.45 }}>
              {isEs
                ? "Programa piloto en tiendas participantes."
                : "Pilot at participating stores."}
            </p>
          </div>
        </section>

        {/* Section 5 — Grocery stores & partners */}
        <section className="mkt-section-card mkt-animate mkt-animate-d5" aria-label={isEs ? "Para tiendas" : "For grocery stores"}>
          <div style={{ textAlign: "center", marginBottom: "0.65rem" }}>
            <p style={{ color: "#f59e0b", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.13em", textTransform: "uppercase", margin: 0 }}>
              {isEs ? "PARA TIENDAS DE COMESTIBLES" : "FOR GROCERY STORES"}
            </p>
          </div>
          <div className="mkt-stores">
            <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.15rem", fontWeight: 900, lineHeight: 1.3, textAlign: "center" }}>
              {isEs ? "Asóciate con TrackFresh Save" : "Partner with TrackFresh Save"}
            </h2>
            <p className="mkt-stores__lead">
              {isEs
                ? "TrackFresh envía compradores con fechas reales en la app. Tu equipo confirma el artículo en caja — tú mueves inventario por vencer y reduces mermas."
                : "TrackFresh sends shoppers with real dates in the app. Your team confirms the item at checkout — you move near-expiry inventory and cut shrink."}
            </p>
            <div className="mkt-stores__grid">
              <div className="mkt-stores__benefit">
                <span aria-hidden>📉</span>
                <span>
                  <strong>{isEs ? "Menos merma:" : "Less shrink:"}</strong>{" "}
                  {isEs
                    ? "vende productos aún buenos antes del vencimiento, no después."
                    : "sell still-good product before expiry, not after."}
                </span>
              </div>
              <div className="mkt-stores__benefit">
                <span aria-hidden>🛒</span>
                <span>
                  <strong>{isEs ? "Más tráfico:" : "More traffic:"}</strong>{" "}
                  {isEs
                    ? "clientes con TrackFresh vienen a tu tienda por el 20% en caja."
                    : "TrackFresh users come to your store for 20% at register."}
                </span>
              </div>
              <div className="mkt-stores__benefit">
                <span aria-hidden>✅</span>
                <span>
                  <strong>{isEs ? "Caja simple:" : "Simple checkout:"}</strong>{" "}
                  {isEs
                    ? "el cliente abre TrackFresh, muestra su app y presenta los artículos por vencer; el cajero verifica la fecha, escanea, etiqueta y aplica el código de descuento."
                    : "customer opens TrackFresh, shows their app, presents expiring items; clerk verifies date, scans, tags, and applies the discount code."}
                </span>
              </div>
              <div className="mkt-stores__benefit">
                <span aria-hidden>🌱</span>
                <span>
                  <strong>{isEs ? "Historia verde:" : "Green story:"}</strong>{" "}
                  {isEs
                    ? "menos desperdicio — bueno para tu marca y tu comunidad."
                    : "less waste — good for your brand and your community."}
                </span>
              </div>
            </div>
            <div className="mkt-stores__register">
              <h3>{isEs ? "En caja (programa piloto)" : "At the register (pilot)"}</h3>
              <ol>
                <li>
                  {isEs
                    ? "El cliente abre TrackFresh, muestra su app y presenta los artículos por vencer."
                    : "Customer opens TrackFresh, shows their app, then presents the expiring items."}
                </li>
                <li>
                  {isEs
                    ? "El cajero verifica la fecha. Escanea y etiqueta el artículo y aplica el código de descuento."
                    : "Clerk verifies date. Scans and tags item and applies discount code."}
                </li>
                <li>
                  {isEs
                    ? "El cliente se lleva la compra; tú reduces inventario por vencer."
                    : "Customer takes the sale; you clear near-expiry stock."}
                </li>
              </ol>
            </div>
            <div className="mkt-stores__contact">
              <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: 600, color: "rgba(255,255,255,0.85)", lineHeight: 1.45 }}>
                {isEs
                  ? "¿Quieres ser tienda participante? Hablemos del piloto en tu cadena o ubicación."
                  : "Want to be a participating store? Let's talk about a pilot at your chain or location."}
              </p>
              <a href="mailto:hello@trackfresh.ai?subject=TrackFresh%20Save%20Store%20Partner" className="mkt-stores__email">
                ✉️ {isEs ? "Contactar para asociarse" : "Contact us to partner"}
              </a>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>hello@trackfresh.ai</p>
            </div>
          </div>
        </section>

        {/* Section 6 — headline + Track Your Food CTA */}
        <section className="mkt-section-card mkt-section-card--cta mkt-animate mkt-animate-d6" aria-label={isEs ? "Empezar" : "Get started"}>
          <p style={{textAlign:"center",fontWeight:900,fontSize:"1.35rem",margin:"0 0 1rem",letterSpacing:"-0.01em",lineHeight:1.25}}>{isEs ? "Siempre sabe lo que hay en tu refrigerador, congelador y despensa." : "Always know what's in your fridge, freezer, and pantry."}</p>
          <p style={{fontSize:"1.1rem",fontWeight:500,opacity:0.85,marginBottom:"0.75rem"}}>{isEs ? "¿Listo?" : "Ready?"}</p>
          <button type="button" ref={bottomBtnRef} onClick={onLaunchApp} className="mkt-cta" style={{fontSize:"1.1rem",padding:"0.65rem 1.75rem"}}>{isEs ? "Rastrea tu comida" : "Track Your Food"}</button>
        </section>
      </div>

      <div className="mkt-footer"><TrackFreshLogo /> © 2026 — {isEs ? "Ahorra Comida. Ahorra Dinero. Salva el Planeta." : "Save Food. Save Money. Save the Planet."}</div>
    </div>
  );
}
