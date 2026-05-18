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
  const cam = B(0x1F4F7);
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
            <p className="mkt-hero-sub mkt-animate" style={{animationDelay:"0.65s",color:"rgba(255,255,255,0.85)",fontSize:"0.9rem"}}>
              {isEs ? "Escanea un recibo. Rastrea cada frasco y sobrante — incluso después de abrirlo." : "Snap a receipt. Track every jar, bottle, and leftover — even after you open it."}
            </p>
            <p className="mkt-hero-sub mkt-animate" style={{animationDelay:"0.72s",color:"rgba(255,255,255,0.85)",fontSize:"0.9rem",marginTop:"-0.3rem"}}>
              {isEs ? "Sabe qué está fresco, qué sigue, qué tirar." : "Know what's fresh, what's next, what to toss."}
            </p>
          </div>
          <div className="mkt-condiment-strip mkt-animate" style={{animationDelay:"0.65s"}} onClick={() => setActiveIcon(null)} role="presentation">
        <div style={{position:"relative",display:"flex",justifyContent:"center",gap:"2rem",alignItems:"center"}}>
          {activeIcon && (() => { const item = ICON_INFO[activeIcon]; const offset = activeIcon === "ketchup" ? "calc(50% - 28px)" : activeIcon === "mayo" ? "calc(50% + 28px)" : "50%"; const arrowOffset = activeIcon === "ketchup" ? "calc(50% - 28px)" : activeIcon === "mayo" ? "calc(50% + 28px)" : "50%"; return (
            <div style={{position:"absolute",bottom:"calc(100% + 12px)",left:offset,transform:"translateX(-50%)",background:"#1a1a2e",border:"1px solid rgba(255,255,255,0.15)",borderRadius:"12px",padding:"0.6rem 0.9rem",whiteSpace:"nowrap",zIndex:100,boxShadow:"0 8px 24px rgba(0,0,0,0.4)",minWidth:"190px",textAlign:"center"}}>
              <div style={{fontWeight:700,fontSize:"0.85rem",color:"#fff",marginBottom:"0.25rem"}}>{item.info}</div>
              <div style={{fontSize:"0.72rem",color:"#86efac",fontWeight:600}}>✨ {isEs ? "TrackFresh rastrea esto por ti" : "TrackFresh tracks this for you!"}</div>
              <div style={{position:"absolute",bottom:"-6px",left:arrowOffset,transform:"translateX(-50%)",width:0,height:0,borderLeft:"6px solid transparent",borderRight:"6px solid transparent",borderTop:"6px solid #1a1a2e"}}/>
            </div>
          ); })()}
          {["ketchup","mustard","mayo"].map(key => {
            const item = ICON_INFO[key];
            const isActive = activeIcon === key;
            return (
              <div key={key} style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <button
                  onClick={e => { e.stopPropagation(); handleIconTap(key); }}
                  style={{background:"none",border:"none",cursor:"pointer",padding:"4px",lineHeight:1,transition:"transform 0.15s ease",transform:isActive?"scale(1.15)":"scale(1)",display:"inline-flex",alignItems:"flex-end",justifyContent:"center"}}
                  aria-label={item.label}
                >
                  <div className={`icon-bounce-${key === "ketchup" ? 1 : key === "mustard" ? 2 : 3}`}>
                    <img src={`/${key}.png`} alt={item.label} style={{height:"80px",width:"auto",display:"block",...(key==="mustard"?{mixBlendMode:"multiply",backgroundColor:"#141418"}:{})}} />
                  </div>
                </button>
              </div>
            );
          })}
        </div>
            <p className="shimmer-text" style={{textAlign:"center",fontSize:"1.35rem",marginTop:"0.4rem",fontWeight:600,letterSpacing:"0.02em"}}>{isEs ? "✨ Toca para ver lo que hará TrackFresh" : "✨ Tap to see what TrackFresh will do."}</p>
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
          <li style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",fontSize:"0.97rem"}}><span>💸</span><span><strong>{isEs ? "Los consumidores desperdician casi 35 millones de toneladas de comida al año." : "Consumers waste nearly 35 million tons of food each year."}</strong></span></li>
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
          <li style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",fontSize:"0.97rem"}}><span>🧾</span><span><strong>{isEs ? "Toma una foto o sube tu recibo de compras — nuestra IA identifica al instante cada artículo, categoría, vida útil y ventana tras apertura, luego rellena todo automáticamente y activa alarmas por ti." : "Snap or upload your grocery receipt — our AI instantly identifies every item, category, shelf life, and after-opening window, then autofills and sets alarms for you."}</strong></span></li>
          <li style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",fontSize:"0.97rem"}}><span>📷</span><span><strong>{isEs ? "Escanea uno o seis artículos a la vez y TrackFresh los identificará por código de barras y etiquetas en la misma foto y, por supuesto, rellenará el resto automáticamente." : "Scan one or scan six items at the same time and TrackFresh will identify by barcode and labels all in the same shot and of course autofill the rest."}</strong></span></li>
          <li style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",fontSize:"0.97rem"}}><span>🎤</span><span><strong>{isEs ? "Reconocimiento de voz para fechas de caducidad cuando lo necesites." : "Voice recognition of expiration dates when needed."}</strong></span></li>
          <li style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",fontSize:"0.97rem"}}><span>⏰</span><span><strong>{isEs ? "Aviso de una semana para artículos por vencer." : "One week notice on expiring items."}</strong></span></li>
        </ul>
        </section>

        {/* Section 4 — headline + Track Your Food CTA */}
        <section className="mkt-section-card mkt-section-card--cta mkt-animate mkt-animate-d4" aria-label={isEs ? "Empezar" : "Get started"}>
          <p style={{textAlign:"center",fontWeight:900,fontSize:"1.35rem",margin:"0 0 1rem",letterSpacing:"-0.01em",lineHeight:1.25}}>{isEs ? "Siempre sabe lo que hay en tu refrigerador, congelador y despensa." : "Always know what's in your fridge, freezer, and pantry."}</p>
          <p style={{fontSize:"1.1rem",fontWeight:500,opacity:0.85,marginBottom:"0.75rem"}}>{isEs ? "¿Listo?" : "Ready?"}</p>
          <button type="button" ref={bottomBtnRef} onClick={onLaunchApp} className="mkt-cta" style={{fontSize:"1.1rem",padding:"0.65rem 1.75rem"}}>{isEs ? "Rastrea tu comida" : "Track Your Food"}</button>
        </section>
      </div>

      <div className="mkt-footer"><TrackFreshLogo /> © 2026 — {isEs ? "Ahorra Comida. Ahorra Dinero. Salva el Planeta." : "Save Food. Save Money. Save the Planet."}</div>
    </div>
  );
}
