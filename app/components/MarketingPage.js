"use client";

import React from "react";
import { GLOBAL_STYLES } from "../lib/styles";
import { TrackFreshLogo } from "./ui/TrackFreshLogo";

export default function MarketingPage({ onLaunchApp, onLaunchToTracker, lang, onChangeLang }) {
  const launchToTracker = onLaunchToTracker || (() => onLaunchApp?.("tracker"));
  const handleLaunchClick = (e, targetTab = null) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    try { sessionStorage.setItem("tf_mkt_seen", "1"); } catch (err) {}
    if (typeof onLaunchApp === "function") {
      onLaunchApp(targetTab);
      return;
    }
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("enter", targetTab === "tracker" ? "tracker" : "1");
      window.history.replaceState({}, "", url.pathname + url.search);
    } catch (err) {}
    window.location.reload();
  };
  const isEs = lang === "es";
  const scrollFrameRef = React.useRef(null);
  const bottomBtnRef = React.useRef(null);
  const howItWorksRef = React.useRef(null);
  const [view, setView] = React.useState("main");
  const goToSpeculative = () => { setView("speculative"); try { window.scrollTo(0, 0); } catch (err) {} };
  const goToMain = () => { setView("main"); try { window.scrollTo(0, 0); } catch (err) {} };
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
          handleLaunchClick({ preventDefault: () => {} });
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

  if (view === "speculative") {
    return (
      <div className="app-bg">
        <style dangerouslySetInnerHTML={{__html: GLOBAL_STYLES}} />
        <div className="tf-app-shell">
          <div className="mkt-page">
            {/* Nav */}
            <nav className="mkt-nav">
              <div className="mkt-nav-side">
                <button type="button" onClick={goToMain} className="mkt-nav-glass-btn">{isEs ? "← Volver" : "← Back"}</button>
              </div>
              <div className="mkt-nav-center mkt-nav-logo"><TrackFreshLogo /></div>
              <div className="mkt-nav-side mkt-nav-side--end">
                <button type="button" onClick={(e) => handleLaunchClick(e)} className="mkt-cta mkt-cta--nav" style={{fontSize:"0.8rem",padding:"0.4rem 1.1rem",border:"none",cursor:"pointer",fontFamily:"inherit"}}>{isEs ? "Empezar" : "Get started"}</button>
              </div>
            </nav>

            <div className="mkt-section-wrap">
              {/* Search & Save detail */}
              <section className="mkt-section-card mkt-animate mkt-animate-d1" aria-label={isEs ? "Buscar y Ahorrar (piloto)" : "Search & Save (pilot)"}>
                <div className="mkt-speculative">
                  <p className="mkt-speculative__headline">
                    {isEs
                      ? "Buscar y Ahorrar (piloto)"
                      : "Search & Save (pilot)"}
                  </p>
                  <p className="mkt-speculative__disclaimer">
                    {isEs
                      ? "No se han firmado contratos ni acuerdos a la fecha — programa piloto."
                      : "No contracts nor agreements have been signed as of this date — pilot program."}
                  </p>
                </div>
              </section>

              {/* TrackFresh Search and Save (register discount + store inventory) */}
              <section className="mkt-section-card mkt-animate mkt-animate-d2" aria-label={isEs ? "TrackFresh Buscar y Ahorrar" : "TrackFresh Search and Save"}>
                <div style={{ textAlign: "center", marginBottom: "0.65rem" }}>
                  <p style={{ color: "#f59e0b", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.13em", textTransform: "uppercase", margin: 0 }}>
                    {isEs ? "BUSCAR Y AHORRAR EN CAJA" : "SEARCH AND SAVE AT CHECKOUT"}
                  </p>
                </div>
                <div className="mkt-save-program">
                  <h2 style={{ margin: "0 0 0.35rem", fontSize: "1.2rem", fontWeight: 900, lineHeight: 1.25 }}>
                    {isEs ? "TrackFresh Buscar y Ahorrar — todos ganan" : "TrackFresh Search and Save — everyone wins"}
                  </h2>
                  <p style={{ margin: 0, fontSize: "0.92rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.5 }}>
                    {isEs
                      ? "Cuando encuentras un artículo que vence en 2 días o menos, TrackFresh te ayuda a ahorrar — y ayuda a la tienda a mover inventario antes de que se eche a perder."
                      : "When you find an item that expires within 2 days, TrackFresh helps you save — and helps the store move inventory before it goes to waste."}
                  </p>
                  <p className="mkt-save-program__badge">20% OFF</p>
                  <div className="mkt-save-program__grid">
                    <div className="mkt-save-program__card">
                      <h3>{isEs ? "Para consumidores" : "For consumers"}</h3>
                      <p>
                        {isEs
                          ? "Ahorra dinero en productos que aún están buenos — no esperes al desperdicio."
                          : "'Search & Save' money on food that's still good — don't wait until it's waste."}
                      </p>
                    </div>
                    <div className="mkt-save-program__card">
                      <h3>{isEs ? "Para tiendas" : "For stores"}</h3>
                      <p>
                        {isEs
                          ? "Mejor control de inventario: vende antes del vencimiento y reduce mermas."
                          : "Better inventory control: sell through before expiry and cut shrinkage."}
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
                          ? "muestra la app; el cajero verifica la fecha, escanea y etiqueta el/los artículo(s) y luego aplica el código de descuento."
                          : "show the app; clerk verifies date, scans and tags the item(s) then applies the discount code."}
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

              {/* Grocery stores & partners */}
              <section className="mkt-section-card mkt-animate mkt-animate-d3" aria-label={isEs ? "Para tiendas" : "For grocery stores"}>
                <div style={{ textAlign: "center", marginBottom: "0.65rem" }}>
                  <p style={{ color: "#f59e0b", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.13em", textTransform: "uppercase", margin: 0 }}>
                    {isEs ? "PARA TIENDAS DE COMESTIBLES" : "FOR GROCERY STORES"}
                  </p>
                </div>
                <div className="mkt-stores">
                  <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.15rem", fontWeight: 900, lineHeight: 1.3, textAlign: "center" }}>
                    {isEs ? "Asóciate con TrackFresh Buscar y Ahorrar" : "Partner with TrackFresh Search and Save"}
                  </h2>
                  <p className="mkt-stores__lead">
                    {isEs
                      ? "TrackFresh envía compradores con fechas reales en la app. Tu equipo confirma el artículo en caja — tú mueves inventario por vencer y reduces mermas."
                      : "TrackFresh encourages shoppers to check your inventory. Your team confirms the item at checkout — you move near-expiry inventory and cut shrink."}
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
                          ? "alta participación y fidelidad del cliente. Los usuarios de TrackFresh vienen a tu tienda porque participas en TrackFresh."
                          : "High Customer engagement and loyalty. TrackFresh users come to your store because you participate in TrackFresh."}
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
                        <strong>{isEs ? "Iniciativa verde:" : "Green initiative:"}</strong>{" "}
                        {isEs
                          ? "demuestra que te importa reducir el desperdicio — bueno para tu marca y tu comunidad."
                          : "Shows that you care about less waste — good for your brand and community."}
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
                    <a href="mailto:hello@trackfresh.ai?subject=TrackFresh%20Search%20and%20Save%20Store%20Partner" className="mkt-stores__email">
                      ✉️ {isEs ? "Contactar para asociarse" : "Contact us to partner"}
                    </a>
                    <p style={{ margin: 0, fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>hello@trackfresh.ai</p>
                  </div>
                </div>
              </section>

              {/* Back to main */}
              <section className="mkt-section-card mkt-section-card--cta" aria-label={isEs ? "Volver" : "Back"}>
                <button type="button" onClick={goToMain} className="mkt-cta" style={{fontSize:"1.05rem",padding:"0.65rem 1.75rem",border:"none",cursor:"pointer",fontFamily:"inherit"}}>{isEs ? "← Volver a la página principal" : "← Back to main page"}</button>
              </section>
            </div>

            <div className="mkt-footer"><TrackFreshLogo /> © 2026 — {isEs ? "Ahorra Comida. Ahorra Dinero. Salva el Planeta." : "Save Food. Save Money. Save the Planet."}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-bg">
      <style dangerouslySetInnerHTML={{__html: GLOBAL_STYLES}} />
      <div className="tf-app-shell">
    <div className="mkt-page">
      {/* Nav */}
      <nav className="mkt-nav">
        <div className="mkt-nav-side">
          <button type="button" onClick={() => onChangeLang(lang === "en" ? "es" : "en")} className="mkt-nav-glass-btn">{lang === "en" ? mxFlag + " ES" : usFlag + " EN"}</button>
        </div>
        <div className="mkt-nav-center mkt-nav-logo"><TrackFreshLogo /></div>
        <div className="mkt-nav-side mkt-nav-side--end">
          <button type="button" onClick={(e) => handleLaunchClick(e)} className="mkt-cta mkt-cta--nav" style={{fontSize:"0.8rem",padding:"0.4rem 1.1rem",border:"none",cursor:"pointer",fontFamily:"inherit"}}>{isEs ? "Empezar" : "Get started"}</button>
        </div>
      </nav>

      <div className="mkt-section-wrap">
        {/* Section 1 — Hero + condiments */}
        <section className="mkt-section-card mkt-animate mkt-animate-d1" aria-label={isEs ? "Introducción" : "Introduction"}>
          <div className="mkt-hero">
            <span className="mkt-hero-eyebrow mkt-animate">
              {isEs ? "Ahorra Dinero. Menos Desperdicio. Mejor Cocina." : "Save Money. Waste Less. Eat Better."}
            </span>
            <h1 className="mkt-hero-title">
              <span className="hero-slide-left" style={{animationDelay:"0.1s"}}>{isEs ? "Tu Cocina. Tu Comida." : "Your Kitchen. Your Food."}</span>
              <br />
              <span className="hero-slide-right" style={{animationDelay:"0.28s"}}>{isEs ? "Sabe qué está fresco, qué sigue y qué usar." : "Know what's fresh, what's next, what to use."}</span>
            </h1>
            <p className="mkt-hero-sub mkt-animate" style={{animationDelay:"0.55s",color:"#ffffff"}}>
              {isEs ? "Tu puerta del refrigerador es un misterio. TrackFresh lo resuelve." : "Your fridge door is a mystery. TrackFresh solves it."}
            </p>
            <p className="mkt-hero-sub mkt-animate" style={{animationDelay:"0.72s",color:"rgba(255,255,255,0.85)",fontSize:"0.9rem",marginTop:"0.15rem"}}>
              {isEs
                ? "Refrigerador, congelador y despensa — todo en un solo lugar."
                : "Fridge, freezer, and pantry — all in one place."}
            </p>
            <p className="mkt-hero-sub mkt-animate" style={{animationDelay:"0.85s",color:"rgba(167,243,208,0.95)",fontSize:"0.85rem",marginTop:"0.35rem"}}>
              {isEs
                ? "Tus datos se guardan en tu dispositivo. No necesitas cuenta."
                : "Your data stays on your device. No account required."}
            </p>
          </div>
          <div className="mkt-condiment-strip mkt-animate" style={{animationDelay:"0.65s"}}>
            <p className="mkt-condiment-strip-lead">
              {isEs
                ? "Toca un condimento — mira cuánto dura después de abrir."
                : "Tap a condiment — see how long it lasts after opening."}
            </p>
            <div className="mkt-condiment-row">
              {["ketchup", "mustard", "mayo"].map((key) => {
                const item = ICON_INFO[key];
                const isActive = activeIcon === key;
                const tapHint = isEs ? "Toca" : "Tap";
                return (
                  <div key={key} className="mkt-condiment-cell">
                    <button
                      type="button"
                      className={`mkt-condiment-btn${isActive ? " mkt-condiment-btn--active" : ""}`}
                      onClick={() => handleIconTap(key)}
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
            {activeIcon && ICON_INFO[activeIcon] ? (
              <div className="mkt-condiment-insight" role="status" aria-live="polite">
                <p className="mkt-condiment-insight__info">{ICON_INFO[activeIcon].info}</p>
                <p className="mkt-condiment-insight__tag">
                  ✨ {isEs ? "TrackFresh rastrea y te recuerda" : "TrackFresh tracks & reminds you!"}
                </p>
              </div>
            ) : null}
          </div>
        </section>

        {/* Section 2 — The Issue (top 3) */}
        <section className="mkt-section-card mkt-animate mkt-animate-d2" aria-label={isEs ? "El problema" : "The Issue"}>
        <div style={{textAlign:"center",marginBottom:"0.85rem"}}>
          <p style={{color:"#f59e0b",fontWeight:700,fontSize:"0.95rem",letterSpacing:"0.13em",textTransform:"uppercase",margin:0}}>{isEs ? "EL PROBLEMA" : "The Issue"}</p>
        </div>
        <ul style={{listStyle:"none",padding:0,margin:"0 0 1rem",display:"flex",flexDirection:"column",gap:"0.6rem"}}>
          <li style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",fontSize:"0.97rem"}}><span>🏷️</span><span><strong>{isEs ? "Las fechas de caducidad confunden — y después de abrir, nadie te recuerda cuánto dura." : "Expiration dates are confusing — and after opening, no one reminds you how long food lasts."}</strong></span></li>
          <li style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",fontSize:"0.97rem"}}><span>🍽️</span><span><strong>{isEs ? "La comida buena caduca en el fondo del refrigerador mientras preguntas \"¿qué hay para cenar?\"" : "Good food expires in the back of the fridge while you wonder what's for dinner."}</strong></span></li>
          <li style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",fontSize:"0.97rem"}}><span>📋</span><span><strong>{isEs ? "Las listas se pierden — recompras lo que ya tienes y olvidas lo que necesitas." : "Shopping lists get lost — you rebuy what you have and forget what you need."}</strong></span></li>
        </ul>
        </section>

        {/* Section 3 — How it works (3 steps) */}
        <section className="mkt-section-card mkt-animate mkt-animate-d3" aria-label={isEs ? "Cómo funciona" : "How it works"}>
        <div style={{textAlign:"center",marginBottom:"0.85rem"}}>
          <p style={{color:"#f59e0b",fontWeight:700,fontSize:"0.95rem",letterSpacing:"0.13em",textTransform:"uppercase",margin:0}}>{isEs ? "CÓMO FUNCIONA" : "How It Works"}</p>
        </div>
        <ul style={{listStyle:"none",padding:0,margin:"0 0 1rem",display:"flex",flexDirection:"column",gap:"0.6rem"}}>
          <li style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",fontSize:"0.97rem"}}><span>🧾</span><span><strong>{isEs ? "Toma una foto del recibo o de tus productos — TrackFresh agrega artículos y fechas." : "Snap a receipt or photo — TrackFresh adds your items and dates."}</strong></span></li>
          <li style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",fontSize:"0.97rem"}}><span>⏰</span><span><strong>{isEs ? "Recibe recordatorios antes de que la comida caduque." : "Get reminders before food expires."}</strong></span></li>
          <li style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",fontSize:"0.97rem"}}><span>🛒</span><span><strong>{isEs ? "Compra y cocina más inteligente con lo que ya tienes." : "Shop and cook smarter from what you already have."}</strong></span></li>
        </ul>
        </section>

        {/* Section 4 — Search & Save pilot */}
        <section className="mkt-section-card mkt-animate mkt-animate-d4" aria-label={isEs ? "Buscar y Ahorrar (piloto)" : "Search & Save (pilot)"}>
          <div className="mkt-speculative">
            <p className="mkt-speculative__headline">
              {isEs
                ? "Buscar y Ahorrar (piloto)"
                : "Search & Save (pilot)"}
            </p>
            <p style={{ margin: "0 0 1rem", fontSize: "0.9rem", lineHeight: 1.5, color: "rgba(255,255,255,0.82)" }}>
              {isEs
                ? "Hasta 20% de descuento en artículos por vencer en tiendas participantes."
                : "Save up to 20% on near-expiry items at participating stores."}
            </p>
            <button
              type="button"
              onClick={goToSpeculative}
              className="mkt-cta"
              style={{ fontSize: "1.05rem", padding: "0.65rem 1.75rem", border: "none", cursor: "pointer", fontFamily: "inherit" }}
            >
              {isEs ? "Cómo funciona →" : "How it works →"}
            </button>
            <p className="mkt-speculative__disclaimer" style={{ marginTop: "0.75rem" }}>
              {isEs
                ? "No se han firmado contratos ni acuerdos a la fecha, ya que esta es una aplicación Beta."
                : "No contracts nor agreements have been signed as of this date — pilot program."}
            </p>
          </div>
        </section>

        {/* Section 6 — Safety notice (shown before entering app) */}
        <section className="mkt-section-card" aria-label={isEs ? "Aviso de seguridad" : "Safety notice"}>
          <h3 style={{ margin: "0 0 0.65rem", fontSize: "0.88rem", fontWeight: 800, color: "#fde68a", lineHeight: 1.35, textAlign: "center" }}>
            ⚠️ {isEs ? "Aviso de seguridad importante" : "Important Safety Notice"}
          </h3>
          <p style={{ margin: 0, fontSize: "0.76rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.55 }}>
            {isEs ? (
              <>
                <strong style={{ color: "rgba(255,255,255,0.92)" }}>Términos de uso y seguridad alimentaria.</strong>{" "}
                TrackFresh es solo para organización — siempre verifica fechas y seguridad en el empaque del producto. Términos completos dentro de la app.
              </>
            ) : (
              <>
                <strong style={{ color: "rgba(255,255,255,0.92)" }}>Terms of Use &amp; Food Safety.</strong>{" "}
                TrackFresh is for organization only — always verify dates and food safety on the package. Full terms inside the app.
              </>
            )}
          </p>
        </section>

        {/* Section 7 — headline + Track Your Food CTA */}
        <section className="mkt-section-card mkt-section-card--cta" aria-label={isEs ? "Empezar" : "Get started"}>
          <p style={{textAlign:"center",fontWeight:900,fontSize:"1.35rem",margin:"0 0 1rem",letterSpacing:"-0.01em",lineHeight:1.25}}>{isEs ? "Siempre sabe lo que hay en tu refrigerador, congelador y despensa." : "Always know what's in your fridge, freezer, and pantry."}</p>
          <p style={{fontSize:"1.1rem",fontWeight:500,opacity:0.85,marginBottom:"0.75rem"}}>{isEs ? "¿Listo?" : "Ready?"}</p>
          <button type="button" ref={bottomBtnRef} onClick={(e) => handleLaunchClick(e, "tracker")} className="mkt-cta" style={{fontSize:"1.1rem",padding:"0.65rem 1.75rem",position:"relative",zIndex:2,border:"none",cursor:"pointer",fontFamily:"inherit"}}>{isEs ? "Rastrea mi comida" : "Track my food"}</button>
        </section>
      </div>

      <div className="mkt-footer"><TrackFreshLogo /> © 2026 — {isEs ? "Ahorra Comida. Ahorra Dinero. Salva el Planeta." : "Save Food. Save Money. Save the Planet."}</div>
    </div>
      </div>
    </div>
  );
}
