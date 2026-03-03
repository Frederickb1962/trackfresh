"use client";

const GLOBAL_STYLES = `
  .btn-3d {
    background-image: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.08) 100%);
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    box-shadow: 0 2px 4px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.15);
    transition: all 0.15s ease;
    position: relative;
    font-weight: 700 !important;
    letter-spacing: 0.02em;
  }
  .btn-3d.text-white, .btn-3d .text-white {
    color: #fff !important;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important;
  }
  .btn-3d:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.3);
    transform: translateY(-1px);
  }
  .btn-3d:active {
    box-shadow: 0 1px 2px rgba(0,0,0,0.15), inset 0 1px 3px rgba(0,0,0,0.1);
    transform: translateY(1px);
  }
  .pill-3d {
    background-image: linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0.04) 100%);
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2);
    transition: all 0.15s ease;
    font-weight: 600 !important;
  }
  .pill-3d:hover {
    box-shadow: 0 2px 6px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3);
    transform: translateY(-1px);
  }
  .pill-3d-active {
    background-image: linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.08) 100%);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15);
    font-weight: 700 !important;
  }
  input[type="text"], input[type="date"], input[type="number"], select, textarea,
  input.rounded.border, input.flex-1.rounded.border {
    border-radius: 0.75rem !important;
    border: 1px solid #d1d5db !important;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04) !important;
    transition: all 0.15s ease !important;
    padding: 0.5rem 0.75rem !important;
  }
  input[type="text"]:focus, input[type="date"]:focus, select:focus, textarea:focus {
    border-color: #059669 !important;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.06), 0 0 0 3px rgba(5,150,105,0.15) !important;
    outline: none !important;
  }
  select {
    border-radius: 0.75rem !important;
    background-image: linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(0,0,0,0.02) 100%) !important;
  }
  .btn-green-3d {
    background: linear-gradient(to bottom, #15803d, #14532d) !important;
    color: #ffffff !important;
    font-weight: 800 !important;
    text-shadow: 0 1px 2px rgba(0,0,0,0.6) !important;
    box-shadow: 0 4px 0px #0f3d20, 0 6px 10px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15) !important;
    border: none !important;
    border-radius: 0.75rem;
    transition: all 0.12s ease;
    -webkit-font-smoothing: antialiased;
  }
  .btn-green-3d:hover {
    background: linear-gradient(to bottom, #16a34a, #15803d) !important;
    box-shadow: 0 5px 0px #0f3d20, 0 8px 14px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2) !important;
    transform: translateY(-1px);
  }
  .bubble-blue {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e3a8a 100%);
    color: #ffffff;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 0px #1e3a8a, 0 8px 16px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.2);
    border: none;
    transition: all 0.15s ease;
    cursor: pointer;
    -webkit-font-smoothing: antialiased;
  }
  .bubble-blue:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 0px #1e3a8a, 0 10px 20px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.25);
  }
  .bubble-blue:active {
    transform: translateY(3px);
    box-shadow: 0 2px 0px #1e3a8a, 0 3px 6px rgba(0,0,0,0.2);
  }
  @keyframes bubbleBurst {
    0% { transform: scale(1); opacity: 1; }
    30% { transform: scale(1.8); opacity: 0.8; }
    60% { transform: scale(3.5); opacity: 0.4; border-radius: 30%; }
    100% { transform: scale(8); opacity: 0; border-radius: 10%; }
  }
  .bubble-burst {
    animation: bubbleBurst 0.4s ease-out forwards !important;
    z-index: 100;
    pointer-events: none;
  }
  @keyframes tableShine {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.5; }
  }
  
  @keyframes handGrab {
    0% { transform: translateX(120px) rotate(0deg); opacity: 0; }
    20% { transform: translateX(40px) rotate(-5deg); opacity: 1; }
    40% { transform: translateX(0px) rotate(-10deg); opacity: 1; }
    60% { transform: translateX(-30px) rotate(-5deg); opacity: 1; }
    100% { transform: translateX(-300px) rotate(15deg); opacity: 0; }
  }
  @keyframes platePulled {
    0% { transform: scale(1) translateX(0); opacity: 1; }
    30% { transform: scale(1.05) translateX(-10px); opacity: 1; }
    100% { transform: scale(0.6) translateX(-350px) rotate(-20deg); opacity: 0; }
  }
  @keyframes fadeInPage {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  .bubble-green {
    background: linear-gradient(135deg, #16a34a 0%, #15803d 50%, #14532d 100%);
    color: #ffffff;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 0px #0f3d20, 0 8px 16px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.2);
    border: none;
    transition: transform 0.3s ease, box-shadow 0.3s ease, width 0.3s ease, height 0.3s ease;
    cursor: pointer;
    -webkit-font-smoothing: antialiased;
    animation: float 3s ease-in-out infinite;
  }
  .bubble-green:nth-child(1) { animation-delay: 0s; }
  .bubble-green:nth-child(2) { animation-delay: 0.4s; }
  .bubble-green:nth-child(3) { animation-delay: 0.8s; }
  .bubble-green:nth-child(4) { animation-delay: 1.2s; }
  .bubble-green:nth-child(5) { animation-delay: 1.6s; }
  .bubble-green:nth-child(6) { animation-delay: 2.0s; }
  .bubble-green:active {
    animation-play-state: paused;
    transform: scale(0.92);
    box-shadow: 0 2px 0px #0f3d20, 0 3px 6px rgba(0,0,0,0.2);
  }
  @keyframes dance {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    25% { transform: translateY(-15px) rotate(-8deg); }
    50% { transform: translateY(-5px) rotate(0deg); }
    75% { transform: translateY(-15px) rotate(8deg); }
  }
  @keyframes danceRight {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    25% { transform: translateY(-12px) rotate(10deg); }
    50% { transform: translateY(-3px) rotate(0deg); }
    75% { transform: translateY(-12px) rotate(-10deg); }
  }
  @keyframes jumpIn {
    0% { transform: translateY(0) scale(1); opacity: 1; }
    40% { transform: translateY(-60px) scale(1.2); opacity: 1; }
    70% { transform: translateY(-20px) scale(0.9); opacity: 1; }
    85% { transform: translateY(30px) scale(0.7); opacity: 0.7; }
    100% { transform: translateY(40px) scale(0.3); opacity: 0; }
  }
  @keyframes potBubble {
    0%, 100% { transform: scale(1); opacity: 0.7; }
    50% { transform: scale(1.5) translateY(-8px); opacity: 0; }
  }
  @keyframes potSteam {
    0% { transform: translateY(0) scaleX(1); opacity: 0.6; }
    100% { transform: translateY(-30px) scaleX(1.5); opacity: 0; }
  }
  @keyframes potWiggle {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-2deg); }
    75% { transform: rotate(2deg); }
  }
  @keyframes happy {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  .stew-scene { position: relative; height: 220px; width: 100%; overflow: hidden; margin: 0 auto; }
  .stew-pot {
    position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
    width: 160px; height: 90px; background: linear-gradient(to bottom, #6b7280, #4b5563);
    border-radius: 0 0 40% 40%; border-top: 8px solid #374151;
    animation: potWiggle 0.5s ease-in-out infinite;
    z-index: 10;
  }
  .pot-rim {
    position: absolute; bottom: 82px; left: 50%; transform: translateX(-50%);
    width: 180px; height: 16px; background: linear-gradient(to bottom, #9ca3af, #6b7280);
    border-radius: 8px; z-index: 11;
  }
  .pot-liquid {
    position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%);
    width: 148px; height: 50px; background: linear-gradient(to bottom, #ea580c, #c2410c);
    border-radius: 0 0 38% 38%; z-index: 11;
  }
  .pot-handle-l {
    position: absolute; bottom: 55px; left: calc(50% - 95px);
    width: 20px; height: 30px; border: 4px solid #374151; border-right: none;
    border-radius: 10px 0 0 10px; z-index: 9;
  }
  .pot-handle-r {
    position: absolute; bottom: 55px; left: calc(50% + 75px);
    width: 20px; height: 30px; border: 4px solid #374151; border-left: none;
    border-radius: 0 10px 10px 0; z-index: 9;
  }
  .food-char {
    position: absolute; bottom: 95px; font-size: 32px; z-index: 12;
    animation: dance 0.8s ease-in-out infinite;
  }
  .food-char.r { animation-name: danceRight; }
  .food-char.jump {
    animation: jumpIn 1s ease-in forwards;
  }
  .steam {
    position: absolute; font-size: 18px; z-index: 15; opacity: 0.6;
    animation: potSteam 1.5s ease-out infinite;
  }
  .bubble-pot {
    position: absolute; width: 8px; height: 8px; background: rgba(255,255,255,0.6);
    border-radius: 50%; z-index: 12;
    animation: potBubble 1s ease-in-out infinite;
  }
  .btn-green-3d:active {
    transform: translateY(3px);
    box-shadow: 0 1px 0px #0f3d20, 0 2px 4px rgba(0,0,0,0.2) !important;
  }
  .card-3d {
    box-shadow: 0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06);
    transition: all 0.2s ease;
  }
  .card-3d:hover {
    box-shadow: 0 8px 24px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.06);
  }

  /* === MARKETING PAGE === */
  .mkt-page { min-height: 100vh; background: linear-gradient(135deg, #064e3b 0%, #065f46 30%, #047857 70%, #059669 100%); color: #fff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; overflow-x: hidden; }
  .mkt-nav { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 1.5rem; max-width: 900px; margin: 0 auto; }
  .mkt-nav-logo { font-size: 1.4rem; font-weight: 800; }
  .mkt-hero { text-align: center; padding: 3rem 1.5rem 2rem; max-width: 700px; margin: 0 auto; }
  .mkt-hero h1 { font-size: 2.4rem; font-weight: 900; line-height: 1.1; margin-bottom: 1rem; }
  .mkt-hero h1 span { color: #fbbf24; }
  .mkt-hero p { font-size: 1rem; opacity: 0.85; line-height: 1.6; margin-bottom: 2rem; }
  .mkt-cta { display: inline-block; background: linear-gradient(to bottom, #f59e0b, #d97706); color: #000; font-weight: 800; font-size: 1.1rem; padding: 0.9rem 2.5rem; border-radius: 999px; border: none; cursor: pointer; box-shadow: 0 4px 0px #92400e, 0 6px 16px rgba(0,0,0,0.3); transition: all 0.15s; text-decoration: none; }
  .mkt-cta:hover { transform: translateY(-2px); box-shadow: 0 6px 0px #92400e, 0 8px 20px rgba(0,0,0,0.35); }
  .mkt-cta:active { transform: translateY(2px); box-shadow: 0 1px 0px #92400e, 0 2px 6px rgba(0,0,0,0.2); }
  .mkt-phone { max-width: 280px; margin: 2rem auto; background: #111; border-radius: 28px; padding: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
  .mkt-phone-inner { background: linear-gradient(to bottom, #f0fdf4, #fff); border-radius: 20px; padding: 1rem; }
  .mkt-phone-header { text-align: center; font-size: 0.85rem; font-weight: 800; color: #15803d; margin-bottom: 0.5rem; }
  .mkt-phone-item { display: flex; align-items: center; justify-content: space-between; padding: 0.4rem 0.5rem; border-radius: 8px; margin-bottom: 4px; font-size: 0.7rem; }
  .mkt-phone-nav { display: flex; justify-content: space-around; margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid #e5e7eb; }
  .mkt-phone-nav span { font-size: 0.55rem; color: #6b7280; font-weight: 600; }
  .mkt-section { padding: 3rem 1.5rem; max-width: 800px; margin: 0 auto; }
  .mkt-section-dark { background: rgba(0,0,0,0.15); }
  .mkt-section-title { text-align: center; margin-bottom: 0.5rem; }
  .mkt-section-title span { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #86efac; font-weight: 700; }
  .mkt-section-title h2 { font-size: 1.8rem; font-weight: 900; margin-top: 0.5rem; }
  .mkt-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 2rem; text-align: center; }
  .mkt-stat-num { font-size: 2rem; font-weight: 900; color: #fbbf24; }
  .mkt-stat-label { font-size: 0.75rem; opacity: 0.8; margin-top: 0.25rem; }
  .mkt-features { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 2rem; }
  @media (max-width: 500px) { .mkt-features { grid-template-columns: 1fr; } .mkt-stats { grid-template-columns: 1fr; gap: 1.5rem; } .mkt-hero h1 { font-size: 1.8rem; } }
  .mkt-feature { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); border-radius: 16px; padding: 1.25rem; backdrop-filter: blur(4px); transition: transform 0.2s, background 0.2s; }
  .mkt-feature:hover { transform: translateY(-4px); background: rgba(255,255,255,0.15); }
  .mkt-feature-icon { font-size: 1.8rem; margin-bottom: 0.5rem; }
  .mkt-feature h3 { font-size: 0.95rem; font-weight: 700; margin-bottom: 0.3rem; }
  .mkt-feature p { font-size: 0.8rem; opacity: 0.75; line-height: 1.4; }
  .mkt-steps { counter-reset: step; margin-top: 2rem; }
  .mkt-step { display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 1.5rem; }
  .mkt-step-num { min-width: 40px; height: 40px; background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.1rem; box-shadow: 0 3px 0 #92400e; }
  .mkt-step h3 { font-size: 1rem; font-weight: 700; margin-bottom: 0.25rem; }
  .mkt-step p { font-size: 0.85rem; opacity: 0.8; line-height: 1.5; }
  .mkt-impact { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 2rem; }
  .mkt-impact-card { background: rgba(255,255,255,0.08); border-radius: 12px; padding: 1rem; text-align: center; }
  .mkt-impact-card .icon { font-size: 1.5rem; margin-bottom: 0.5rem; }
  .mkt-impact-card p { font-size: 0.8rem; opacity: 0.85; line-height: 1.4; }
  .mkt-impact-card strong { color: #fbbf24; }
  .mkt-footer { text-align: center; padding: 2rem 1.5rem; opacity: 0.6; font-size: 0.75rem; }
  @keyframes mktFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .mkt-animate { animation: mktFadeIn 0.6s ease-out both; }
  .mkt-animate-d1 { animation-delay: 0.1s; }
  .mkt-animate-d2 { animation-delay: 0.2s; }
  .mkt-animate-d3 { animation-delay: 0.3s; }
  .mkt-animate-d4 { animation-delay: 0.4s; }
  /* === BOTTOM NAV === */
  .bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; z-index: 50; background: linear-gradient(to bottom, #064e3b, #022c22); border-top: 1px solid rgba(255,255,255,0.1); padding: 0.5rem 0 calc(0.5rem + env(safe-area-inset-bottom)); display: flex; justify-content: space-around; align-items: center; box-shadow: 0 -4px 20px rgba(0,0,0,0.3); }
  .bottom-nav button { display: flex; flex-direction: column; align-items: center; gap: 2px; background: none; border: none; cursor: pointer; padding: 0.25rem 0.5rem; min-width: 56px; transition: all 0.2s; }
  .bottom-nav button span.nav-icon { font-size: 1.35rem; transition: transform 0.2s; }
  .bottom-nav button span.nav-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.03em; }
  .bottom-nav button.nav-active span.nav-icon { transform: scale(1.15); }
  .bottom-nav button.nav-active span.nav-label { color: #4ade80; }
  .bottom-nav button:not(.nav-active) span.nav-label { color: rgba(255,255,255,0.5); }
  .bottom-nav button:not(.nav-active) span.nav-icon { opacity: 0.6; }
  .main-content { padding-bottom: 90px !important; }
`;

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Bell, PlusCircle, ChefHat, Users, ShoppingCart } from "lucide-react";


const LANG_KEY = "trackfresh.lang";
const T = {
  appTagline: { en: "\u2728 Your AI-powered kitchen assistant", es: "\u2728 Tu asistente de cocina con IA" },
  howToUse: { en: "How to use", es: "C\u00f3mo usar" },
  signOut: { en: "Sign Out", es: "Cerrar Sesi\u00f3n" },
  signOutConfirm: { en: "Sign out of TrackFresh?", es: "\u00bfCerrar sesi\u00f3n de TrackFresh?" },
  betaTesting: { en: "Beta Testing", es: "Prueba Beta" },
  enterAccessCode: { en: "Enter your access code to continue", es: "Ingresa tu c\u00f3digo de acceso" },
  enterBeta: { en: "Enter Beta", es: "Entrar a Beta" },
  invalidCode: { en: "Invalid code. Try again.", es: "C\u00f3digo inv\u00e1lido. Intenta de nuevo." },
  contactFreddie: { en: "Contact Freddie for access", es: "Contacta a Freddie para acceso" },
  welcomeTitle: { en: "Welcome to FreshTrack.ai!", es: "\u00a1Bienvenido a FreshTrack.ai!" },
  welcomeDesc: { en: "The smart way to track your groceries, reduce food waste, and save money.", es: "La forma inteligente de rastrear tus alimentos, reducir el desperdicio y ahorrar dinero." },
  welcomeF1: { en: "AI-powered label & barcode scanning", es: "Escaneo de etiquetas y c\u00f3digos de barras con IA" },
  welcomeF2: { en: "Smart AI expiry predictions & alerts", es: "Predicciones inteligentes de vencimiento con IA" },
  welcomeF3: { en: "Voice-powered hands-free entry", es: "Entrada manos libres por voz" },
  welcomeF4: { en: "AI-built smart shopping lists", es: "Listas de compras inteligentes con IA" },
  welcomeF5: { en: "AI freeze alerts save your food", es: "Alertas de congelaci\u00f3n con IA salvan tu comida" },
  welcomeLocal: { en: "Your data is stored locally on your device. No account required.", es: "Tus datos se guardan en tu dispositivo. No necesitas cuenta." },
  getStarted: { en: "\ud83d\ude80 Get Started", es: "\ud83d\ude80 Comenzar" },
  tracker: { en: "Tracker", es: "Rastreador" },
  trackerDesc: { en: "AI tracks your food & freshness", es: "IA rastrea tu comida y frescura" },
  recipes: { en: "Recipes", es: "Recetas" },
  recipesDesc: { en: "AI recipes from your fridge", es: "Recetas con IA de tu refrigerador" },
  shopping: { en: "Shopping", es: "Compras" },
  shoppingDesc: { en: "Smart shopping with AI alerts", es: "Compras inteligentes con alertas IA" },
  meals: { en: "Meals", es: "Comidas" },
  mealsDesc: { en: "AI plans meals from what you have", es: "IA planifica comidas con lo que tienes" },
  stores: { en: "Stores", es: "Tiendas" },
  storesDesc: { en: "Shop your favorite stores", es: "Compra en tus tiendas favoritas" },
  communityWord: { en: "Community", es: "Comunidad" },
  communityDesc: { en: "Connect & share with others", es: "Con\u00e9ctate y comparte con otros" },
  aiScanTitle: { en: "\u2728 AI Food Scanner", es: "\u2728 Esc\u00e1ner de Alimentos con IA" },
  aiScanDesc: { en: "Choose how AI should add your items", es: "Elige c\u00f3mo la IA debe agregar tus productos" },
  receipt: { en: "Receipt", es: "Recibo" },
  receiptDesc: { en: "AI reads your receipt instantly", es: "La IA lee tu recibo al instante" },
  barcodeWord: { en: "Barcode", es: "C\u00f3digo" },
  barcodeDesc: { en: "AI identifies any product", es: "La IA identifica cualquier producto" },
  label: { en: "Label", es: "Etiqueta" },
  labelDesc: { en: "AI extracts label details", es: "La IA extrae detalles de la etiqueta" },
  quickAdd: { en: "Quick Add", es: "Agregar" },
  quickAddDesc: { en: "Quick add with AI autocomplete", es: "Agrega r\u00e1pido con autocompletado IA" },
  myItems: { en: "My Items", es: "Mis Productos" },
  myItemsDesc: { en: "Your AI-monitored inventory", es: "Tu inventario monitoreado por IA" },
  back: { en: "Back", es: "Atr\u00e1s" },
  home: { en: "Home", es: "Inicio" },
  itemWord: { en: "Item", es: "Producto" },
  quantity: { en: "Quantity", es: "Cantidad" },
  category: { en: "Category", es: "Categor\u00eda" },
  locationWord: { en: "Location", es: "Ubicaci\u00f3n" },
  useByWord: { en: "Use By", es: "Consumir Antes De" },
  openedOpt: { en: "Opened (optional)", es: "Abierto (opcional)" },
  trackedItemsTitle: { en: "Tracked Items", es: "Productos Rastreados" },
  clearAll: { en: "Clear All", es: "Borrar Todo" },
  clearAllConfirm: { en: "Clear all tracked items and start fresh?", es: "\u00bfBorrar todos los productos y empezar de nuevo?" },
  noFilter: { en: "No items match this filter.", es: "Ning\u00fan producto coincide con este filtro." },
  days: { en: "days", es: "d\u00edas" },
  used: { en: "Used", es: "Usado" },
  edit: { en: "Edit", es: "Editar" },
  remove: { en: "Remove", es: "Quitar" },
  editItemTitle: { en: "\u270f\ufe0f Edit Item", es: "\u270f\ufe0f Editar Producto" },
  nameWord: { en: "Name", es: "Nombre" },
  useByDate: { en: "Use By Date", es: "Fecha de Vencimiento" },
  save: { en: "Save", es: "Guardar" },
  cancel: { en: "Cancel", es: "Cancelar" },
  expiringSoon: { en: "Expiring Soon!", es: "\u00a1Vence Pronto!" },
  useItemsSoon: { en: "Use these items soon, freeze them, or check for recipes!", es: "\u00a1Usa estos productos pronto, cong\u00e9lalos o busca recetas!" },
  gotIt: { en: "Got it", es: "Entendido" },
  findRecipes: { en: "Find Recipes", es: "Buscar Recetas" },
  scanReceiptTitle: { en: "\ud83d\udcf7 Scan Receipt", es: "\ud83d\udcf7 Escanear Recibo" },
  scanReceiptDesc: { en: "Upload a receipt photo and our AI will instantly identify every food item, category, and shelf life.", es: "Sube una foto del recibo y nuestra IA identificar\u00e1 cada producto al instante." },
  takePhoto: { en: "Take Photo", es: "Tomar Foto" },
  openCamera: { en: "Open camera", es: "Abrir c\u00e1mara" },
  uploadPhoto: { en: "Upload Photo", es: "Subir Foto" },
  fromGallery: { en: "From gallery", es: "Desde galer\u00eda" },
  readingReceipt: { en: "Claude is reading your receipt...", es: "Claude est\u00e1 leyendo tu recibo..." },
  scanBarcodeTitle: { en: "\ud83d\udce6 Scan Barcode", es: "\ud83d\udce6 Escanear C\u00f3digo de Barras" },
  scanBarcodeDesc: { en: "Point your camera at the barcode on any food package.", es: "Apunta tu c\u00e1mara al c\u00f3digo de barras de cualquier paquete." },
  lookingUp: { en: "Looking up product...", es: "Buscando producto..." },
  productFound: { en: "\u2705 Product found!", es: "\u2705 \u00a1Producto encontrado!" },
  whereStoring: { en: "Where are you storing this?", es: "\u00bfD\u00f3nde vas a guardar esto?" },
  addToTracker: { en: "Add to Tracker", es: "Agregar al Rastreador" },
  scanAnother: { en: "Scan Another", es: "Escanear Otro" },
  tryAgain: { en: "Try again", es: "Intentar de nuevo" },
  scanLabelTitle: { en: "\ud83c\udff7\ufe0f Scan Package Label", es: "\ud83c\udff7\ufe0f Escanear Etiqueta" },
  scanLabelDesc: { en: "Take a photo of the package label and Claude will read the item name and date automatically.", es: "Toma una foto de la etiqueta y Claude leer\u00e1 el nombre y la fecha." },
  tapUpload: { en: "Tap to upload package photo", es: "Toca para subir foto del paquete" },
  jpgPng: { en: "JPG, PNG supported", es: "Se aceptan JPG, PNG" },
  readingLabel: { en: "Claude is reading the label...", es: "Claude est\u00e1 leyendo la etiqueta..." },
  quickAddTitle: { en: "\u270f\ufe0f Quick Add", es: "\u270f\ufe0f Agregar R\u00e1pido" },
  quickAddTitleDesc: { en: "Select a food from the list or type your own.", es: "Selecciona un alimento o escribe el tuyo." },
  foodItem: { en: "Food Item", es: "Alimento" },
  recipeSugg: { en: "Recipe Suggestions", es: "Sugerencias de Recetas" },
  recipeIntro: { en: "Recipes matched to your ingredients, prioritizing what expires soonest. Tap a recipe to see full instructions.", es: "Recetas con tus ingredientes, priorizando lo que vence primero." },
  noMatches: { en: "No matches found. Try adding more items like eggs, carrots, or onions.", es: "Sin coincidencias. Agrega m\u00e1s productos." },
  ingredientsWord: { en: "Ingredients", es: "Ingredientes" },
  instructionsWord: { en: "Instructions", es: "Instrucciones" },
  shoppingList: { en: "Shopping List", es: "Lista de Compras" },
  clearChecked: { en: "Clear Checked", es: "Borrar Marcados" },
  emptyList: { en: "Your shopping list is empty.", es: "Tu lista de compras est\u00e1 vac\u00eda." },
  mealPlanner: { en: "Meal Planner", es: "Planificador de Comidas" },
  mealDesc: { en: "Tap any slot to add a meal. \u26a1 means it uses ingredients expiring soon.", es: "Toca cualquier espacio para agregar comida." },
  joinComm: { en: "Join the Community", es: "\u00danete a la Comunidad" },
  chooseName: { en: "Choose a display name to get started.", es: "Elige un nombre para comenzar." },
  joinWord: { en: "Join", es: "Unirse" },
  changeName: { en: "Change name", es: "Cambiar nombre" },
  commChat: { en: "Community Chat", es: "Chat de la Comunidad" },
  noMsg: { en: "No messages yet \u2014 say hello!", es: "No hay mensajes \u2014 \u00a1di hola!" },
  sendWord: { en: "Send", es: "Enviar" },
  recipeExch: { en: "Recipe Exchange", es: "Intercambio de Recetas" },
  shareRecipe: { en: "Share Recipe", es: "Compartir Receta" },
  noRecipes: { en: "No recipes shared yet \u2014 be the first!", es: "No hay recetas \u2014 \u00a1s\u00e9 el primero!" },
  tipsIdeas: { en: "Tips & Ideas", es: "Consejos e Ideas" },
  postWord: { en: "Post", es: "Publicar" },
  noTips: { en: "No tips yet \u2014 share one!", es: "No hay consejos \u2014 \u00a1comparte uno!" },
  shopOnline: { en: "Shop Online", es: "Comprar en L\u00ednea" },
  shopOnlineDesc: { en: "Tap any store to shop for groceries online.", es: "Toca cualquier tienda para comprar alimentos." },
  shopNow: { en: "Shop Now \u2192", es: "Comprar Ahora \u2192" },
  close: { en: "Close", es: "Cerrar" },
  addBtn: { en: "Add", es: "Agregar" },
  fdaRecalls: { en: "FDA Recalls", es: "Retiros FDA" },
  fdaRecallsDesc: { en: "Check food safety alerts", es: "Consulta alertas de seguridad alimentaria" },
  fdaRecallsBanner: { en: "Active FDA Food Recalls", es: "Retiros Activos de la FDA" },
  fdaLoading: { en: "Checking FDA recalls...", es: "Verificando retiros FDA..." },
  fdaError: { en: "Could not load recalls", es: "No se pudieron cargar los retiros" },
  fdaViewAll: { en: "View All Recalls", es: "Ver Todos los Retiros" },
  fdaClose: { en: "Close", es: "Cerrar" },
  fdaClassI: { en: "Dangerous", es: "Peligroso" },
  fdaClassII: { en: "Moderate", es: "Moderado" },
  fdaClassIII: { en: "Low Risk", es: "Bajo Riesgo" },
  smartScanTitle: { en: "Smart Scanner", es: "Escaner Inteligente" },
  smartScanDesc: { en: "Auto-detects barcodes, labels & dates", es: "Auto-detecta codigos, etiquetas y fechas" },
  smartScanFound: { en: "Found", es: "Encontrado" },
  smartScanNoDate: { en: "No date found - enter manually", es: "Sin fecha - ingrese manualmente" },
  smartScanRetry: { en: "Scan Again", es: "Escanear Otra Vez" },
  smartScanWhere: { en: "Where are you storing it?", es: "Donde lo guardas?" },
  smartScanDateAuto: { en: "Auto-detected from label", es: "Auto-detectado de la etiqueta" },
  smartScanDate: { en: "Scan Date from Package", es: "Escanear Fecha del Paquete" },
  smartScanDateDesc: { en: "Flip package over and photograph the date", es: "Voltea el paquete y fotografa la fecha" },
  smartScanDateReading: { en: "Reading date...", es: "Leyendo fecha..." },
};

const FOOD_ES = {
  "Apples":"Manzanas","Avocado":"Aguacate","Bananas":"Pl\u00e1tanos","Bell Pepper":"Pimiento",
  "Blueberries":"Ar\u00e1ndanos","Broccoli":"Br\u00f3coli","Carrots":"Zanahorias","Celery":"Apio",
  "Cherries":"Cerezas","Corn":"Ma\u00edz","Cucumber":"Pepino","Garlic":"Ajo","Ginger":"Jengibre",
  "Grapes":"Uvas","Green Beans":"Ejotes","Green Onions":"Cebollitas","Kale":"Col Rizada",
  "Lemons":"Limones","Lettuce":"Lechuga","Limes":"Limas","Mango":"Mango","Mushrooms":"Champi\u00f1ones",
  "Onions":"Cebollas","Oranges":"Naranjas","Peaches":"Duraznos","Pears":"Peras","Pineapple":"Pi\u00f1a",
  "Potatoes":"Papas","Raspberries":"Frambuesas","Spinach":"Espinacas","Strawberries":"Fresas",
  "Sweet Potatoes":"Camotes","Tomatoes":"Tomates","Watermelon":"Sand\u00eda","Zucchini":"Calabac\u00edn",
  "Asparagus":"Esp\u00e1rragos","Cauliflower":"Coliflor","Eggplant":"Berenjena","Peas":"Ch\u00edcharos",
  "Cabbage":"Repollo","Jalape\u00f1o":"Jalape\u00f1o","Cilantro":"Cilantro","Parsley":"Perejil",
  "Basil":"Albahaca","Mint":"Menta","Radishes":"R\u00e1banos",
  "Milk":"Leche","Eggs":"Huevos","Butter":"Mantequilla","Cheddar Cheese":"Queso Cheddar",
  "Mozzarella":"Mozzarella","Parmesan":"Parmesano","Cream Cheese":"Queso Crema","Yogurt":"Yogur",
  "Greek Yogurt":"Yogur Griego","Sour Cream":"Crema Agria","Heavy Cream":"Crema Espesa",
  "Cottage Cheese":"Reques\u00f3n","Almond Milk":"Leche de Almendra","Oat Milk":"Leche de Avena",
  "Chicken Breast":"Pechuga de Pollo","Ground Beef":"Carne Molida","Bacon":"Tocino",
  "Salmon":"Salm\u00f3n","Shrimp":"Camarones","Pork Chops":"Chuletas de Cerdo","Steak":"Bistec",
  "Ground Turkey":"Pavo Molido","Ham":"Jam\u00f3n","Sausage":"Salchicha","Tilapia":"Tilapia",
  "Tuna":"At\u00fan","Turkey Breast":"Pechuga de Pavo","Hot Dogs":"Hot Dogs","Lamb":"Cordero",
  "Cod":"Bacalao","Crab":"Cangrejo",
  "Rice":"Arroz","Pasta":"Pasta","Bread":"Pan","Flour":"Harina","Sugar":"Az\u00facar",
  "Olive Oil":"Aceite de Oliva","Peanut Butter":"Crema de Cacahuate","Canned Beans":"Frijoles Enlatados",
  "Canned Tomatoes":"Tomates Enlatados","Cereal":"Cereal","Oats":"Avena","Honey":"Miel",
  "Soy Sauce":"Salsa de Soya","Vinegar":"Vinagre","Ketchup":"Ketchup","Mustard":"Mostaza",
  "Mayonnaise":"Mayonesa","Hot Sauce":"Salsa Picante","Salsa":"Salsa","Jam":"Mermelada",
  "Maple Syrup":"Miel de Maple","Chips":"Papas Fritas","Crackers":"Galletas Saladas",
  "Granola":"Granola","Nuts":"Nueces","Canned Soup":"Sopa Enlatada","Tortillas":"Tortillas",
  "Baked Beans":"Frijoles Horneados","Coconut Milk":"Leche de Coco","Ramen":"Ramen",
  "Coffee":"Caf\u00e9","Tea":"T\u00e9","Orange Juice":"Jugo de Naranja","Apple Juice":"Jugo de Manzana",
  "Frozen Pizza":"Pizza Congelada","Frozen Vegetables":"Verduras Congeladas",
  "Ice Cream":"Helado","Frozen Fruit":"Fruta Congelada","Frozen Chicken":"Pollo Congelado",
  "Pizza":"Pizza","Leftover Soup":"Sopa Sobrante","Leftover Rice":"Arroz Sobrante",
  "Cooked Chicken":"Pollo Cocido","Cooked Pasta":"Pasta Cocida",
  "Tofu":"Tofu","Hummus":"Hummus","Tortilla Chips":"Totopos","Popcorn":"Palomitas",
  "Chocolate":"Chocolate","Avocado Oil":"Aceite de Aguacate","Sesame Oil":"Aceite de S\u00e9samo",
  "Balsamic Vinegar":"Vinagre Bals\u00e1mico","Dijon Mustard":"Mostaza Dijon",
  "Ranch Dressing":"Aderezo Ranch","BBQ Sauce":"Salsa BBQ","Teriyaki Sauce":"Salsa Teriyaki",
  "Sriracha":"Sriracha","Worcestershire":"Salsa Inglesa","Pickles":"Pepinillos",
  "Olives":"Aceitunas","Capers":"Alcaparras","Dried Pasta":"Pasta Seca",
  "Quinoa":"Quinoa","Lentils":"Lentejas","Black Beans":"Frijoles Negros",
  "Chickpeas":"Garbanzos","Brown Rice":"Arroz Integral","Couscous":"Cusc\u00fas",
  "Baking Powder":"Polvo para Hornear","Baking Soda":"Bicarbonato",
  "Vanilla Extract":"Extracto de Vainilla","Cinnamon":"Canela","Cumin":"Comino",
  "Paprika":"Piment\u00f3n","Black Pepper":"Pimienta Negra","Salt":"Sal",
  "Oregano":"Or\u00e9gano","Thyme":"Tomillo","Rosemary":"Romero",
  "Bay Leaves":"Hojas de Laurel","Chili Powder":"Chile en Polvo",
  "Turmeric":"C\u00farcuma","Garlic Powder":"Ajo en Polvo",
  "Onion Powder":"Cebolla en Polvo","Italian Seasoning":"Sazonador Italiano",
  "Cornstarch":"Maicena","Breadcrumbs":"Pan Molido","Tomato Paste":"Pasta de Tomate",
  "Coconut Oil":"Aceite de Coco","Vegetable Oil":"Aceite Vegetal","Walnuts":"Nueces",
  "Almonds":"Almendras","Pecans":"Pecanas","Cashews":"Anacardos",
  "Peanuts":"Cacahuates","Raisins":"Pasas","Dried Cranberries":"Ar\u00e1ndanos Secos"
};

const STORAGE_KEY = "trackfresh.items";
const COMMUNITY_KEY = "trackfresh.community";
const USERNAME_KEY = "trackfresh.username";
const SHOPPING_KEY = "trackfresh.shopping";
const MEAL_KEY = "trackfresh.meals";

const CATEGORIES = ["Produce", "Dairy", "Meat", "Pantry", "Leftovers", "Other"];
const LOCATIONS = ["Fridge", "Freezer", "Pantry"];

const FOOD_DB = [
  // === PRODUCE ===
  { name: "Apples", category: "Produce", location: "Fridge", daysSealed: 28, daysAfterOpening: null },
  { name: "Asparagus", category: "Produce", location: "Fridge", daysSealed: 5, daysAfterOpening: null },
  { name: "Avocado", category: "Produce", location: "Fridge", daysSealed: 5, daysAfterOpening: 2 },
  { name: "Bananas", category: "Produce", location: "Pantry", daysSealed: 7, daysAfterOpening: null },
  { name: "Basil", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: null },
  { name: "Beets", category: "Produce", location: "Fridge", daysSealed: 14, daysAfterOpening: null },
  { name: "Bell Peppers", category: "Produce", location: "Fridge", daysSealed: 10, daysAfterOpening: 5 },
  { name: "Berries", category: "Produce", location: "Fridge", daysSealed: 5, daysAfterOpening: null },
  { name: "Blackberries", category: "Produce", location: "Fridge", daysSealed: 4, daysAfterOpening: null },
  { name: "Blueberries", category: "Produce", location: "Fridge", daysSealed: 10, daysAfterOpening: null },
  { name: "Bok Choy", category: "Produce", location: "Fridge", daysSealed: 5, daysAfterOpening: null },
  { name: "Broccoli", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: null },
  { name: "Brussels Sprouts", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: null },
  { name: "Butternut Squash", category: "Produce", location: "Pantry", daysSealed: 30, daysAfterOpening: 5 },
  { name: "Cabbage", category: "Produce", location: "Fridge", daysSealed: 14, daysAfterOpening: 5 },
  { name: "Cantaloupe", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: 3 },
  { name: "Carrots", category: "Produce", location: "Fridge", daysSealed: 21, daysAfterOpening: 7 },
  { name: "Cauliflower", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: null },
  { name: "Celery", category: "Produce", location: "Fridge", daysSealed: 14, daysAfterOpening: 7 },
  { name: "Cherries", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: null },
  { name: "Cilantro", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: null },
  { name: "Corn", category: "Produce", location: "Fridge", daysSealed: 5, daysAfterOpening: null },
  { name: "Cranberries", category: "Produce", location: "Fridge", daysSealed: 21, daysAfterOpening: null },
  { name: "Cucumber", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: 3 },
  { name: "Eggplant", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: null },
  { name: "Garlic", category: "Produce", location: "Pantry", daysSealed: 60, daysAfterOpening: 10 },
  { name: "Ginger", category: "Produce", location: "Fridge", daysSealed: 21, daysAfterOpening: 7 },
  { name: "Grapes", category: "Produce", location: "Fridge", daysSealed: 10, daysAfterOpening: null },
  { name: "Green Beans", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: null },
  { name: "Green Onions", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: null },
  { name: "Honeydew", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: 3 },
  { name: "Jalapenos", category: "Produce", location: "Fridge", daysSealed: 14, daysAfterOpening: null },
  { name: "Kale", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: null },
  { name: "Leeks", category: "Produce", location: "Fridge", daysSealed: 10, daysAfterOpening: null },
  { name: "Lemons", category: "Produce", location: "Fridge", daysSealed: 21, daysAfterOpening: 5 },
  { name: "Lettuce", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: 3 },
  { name: "Limes", category: "Produce", location: "Fridge", daysSealed: 21, daysAfterOpening: 5 },
  { name: "Mangoes", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: 3 },
  { name: "Mushrooms", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: 4 },
  { name: "Nectarines", category: "Produce", location: "Fridge", daysSealed: 5, daysAfterOpening: null },
  { name: "Onions", category: "Produce", location: "Pantry", daysSealed: 30, daysAfterOpening: 7 },
  { name: "Oranges", category: "Produce", location: "Fridge", daysSealed: 21, daysAfterOpening: null },
  { name: "Parsley", category: "Produce", location: "Fridge", daysSealed: 10, daysAfterOpening: null },
  { name: "Peaches", category: "Produce", location: "Fridge", daysSealed: 5, daysAfterOpening: null },
  { name: "Pears", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: null },
  { name: "Peas", category: "Produce", location: "Freezer", daysSealed: 240, daysAfterOpening: null },
  { name: "Pineapple", category: "Produce", location: "Fridge", daysSealed: 5, daysAfterOpening: 3 },
  { name: "Plums", category: "Produce", location: "Fridge", daysSealed: 5, daysAfterOpening: null },
  { name: "Pomegranate", category: "Produce", location: "Fridge", daysSealed: 30, daysAfterOpening: 5 },
  { name: "Potatoes", category: "Produce", location: "Pantry", daysSealed: 28, daysAfterOpening: null },
  { name: "Radishes", category: "Produce", location: "Fridge", daysSealed: 14, daysAfterOpening: null },
  { name: "Raspberries", category: "Produce", location: "Fridge", daysSealed: 3, daysAfterOpening: null },
  { name: "Romaine Lettuce", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: 3 },
  { name: "Rosemary", category: "Produce", location: "Fridge", daysSealed: 14, daysAfterOpening: null },
  { name: "Shallots", category: "Produce", location: "Pantry", daysSealed: 30, daysAfterOpening: 7 },
  { name: "Snow Peas", category: "Produce", location: "Fridge", daysSealed: 5, daysAfterOpening: null },
  { name: "Spinach", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: 3 },
  { name: "Strawberries", category: "Produce", location: "Fridge", daysSealed: 5, daysAfterOpening: null },
  { name: "Sweet Potatoes", category: "Produce", location: "Pantry", daysSealed: 28, daysAfterOpening: null },
  { name: "Swiss Chard", category: "Produce", location: "Fridge", daysSealed: 5, daysAfterOpening: null },
  { name: "Thyme", category: "Produce", location: "Fridge", daysSealed: 14, daysAfterOpening: null },
  { name: "Tomatoes", category: "Produce", location: "Pantry", daysSealed: 7, daysAfterOpening: 3 },
  { name: "Turnips", category: "Produce", location: "Fridge", daysSealed: 14, daysAfterOpening: null },
  { name: "Watermelon", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: 3 },
  { name: "Zucchini", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: null },

  // === DAIRY ===
  { name: "Butter", category: "Dairy", location: "Fridge", daysSealed: 90, daysAfterOpening: 30 },
  { name: "Buttermilk", category: "Dairy", location: "Fridge", daysSealed: 14, daysAfterOpening: 7 },
  { name: "Cheddar Cheese", category: "Dairy", location: "Fridge", daysSealed: 42, daysAfterOpening: 21 },
  { name: "Colby Jack", category: "Dairy", location: "Fridge", daysSealed: 42, daysAfterOpening: 21 },
  { name: "Cottage Cheese", category: "Dairy", location: "Fridge", daysSealed: 14, daysAfterOpening: 7 },
  { name: "Cream", category: "Dairy", location: "Fridge", daysSealed: 21, daysAfterOpening: 7 },
  { name: "Cream Cheese", category: "Dairy", location: "Fridge", daysSealed: 30, daysAfterOpening: 14 },
  { name: "Eggs", category: "Dairy", location: "Fridge", daysSealed: 35, daysAfterOpening: null },
  { name: "Feta Cheese", category: "Dairy", location: "Fridge", daysSealed: 42, daysAfterOpening: 7 },
  { name: "Goat Cheese", category: "Dairy", location: "Fridge", daysSealed: 21, daysAfterOpening: 7 },
  { name: "Greek Yogurt", category: "Dairy", location: "Fridge", daysSealed: 14, daysAfterOpening: 7 },
  { name: "Gruyere", category: "Dairy", location: "Fridge", daysSealed: 42, daysAfterOpening: 21 },
  { name: "Half and Half", category: "Dairy", location: "Fridge", daysSealed: 14, daysAfterOpening: 5 },
  { name: "Heavy Cream", category: "Dairy", location: "Fridge", daysSealed: 21, daysAfterOpening: 7 },
  { name: "Mascarpone", category: "Dairy", location: "Fridge", daysSealed: 14, daysAfterOpening: 5 },
  { name: "Milk", category: "Dairy", location: "Fridge", daysSealed: 10, daysAfterOpening: 7 },
  { name: "Mozzarella", category: "Dairy", location: "Fridge", daysSealed: 21, daysAfterOpening: 7 },
  { name: "Oat Milk", category: "Dairy", location: "Fridge", daysSealed: 10, daysAfterOpening: 7 },
  { name: "Parmesan", category: "Dairy", location: "Fridge", daysSealed: 180, daysAfterOpening: 42 },
  { name: "Pepper Jack", category: "Dairy", location: "Fridge", daysSealed: 42, daysAfterOpening: 21 },
  { name: "Provolone", category: "Dairy", location: "Fridge", daysSealed: 42, daysAfterOpening: 21 },
  { name: "Ricotta", category: "Dairy", location: "Fridge", daysSealed: 14, daysAfterOpening: 5 },
  { name: "Sour Cream", category: "Dairy", location: "Fridge", daysSealed: 21, daysAfterOpening: 14 },
  { name: "Swiss Cheese", category: "Dairy", location: "Fridge", daysSealed: 42, daysAfterOpening: 21 },
  { name: "Whipping Cream", category: "Dairy", location: "Fridge", daysSealed: 21, daysAfterOpening: 5 },
  { name: "Yogurt", category: "Dairy", location: "Fridge", daysSealed: 14, daysAfterOpening: 7 },

  // === MEAT & SEAFOOD ===
  { name: "Bacon", category: "Meat", location: "Fridge", daysSealed: 14, daysAfterOpening: 7 },
  { name: "Bratwurst", category: "Meat", location: "Fridge", daysSealed: 7, daysAfterOpening: 3 },
  { name: "Chicken Breast", category: "Meat", location: "Freezer", daysSealed: 270, daysAfterOpening: 2 },
  { name: "Chicken Thighs", category: "Meat", location: "Freezer", daysSealed: 270, daysAfterOpening: 2 },
  { name: "Chicken Wings", category: "Meat", location: "Freezer", daysSealed: 270, daysAfterOpening: 2 },
  { name: "Chorizo", category: "Meat", location: "Fridge", daysSealed: 14, daysAfterOpening: 7 },
  { name: "Cod", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 2 },
  { name: "Crab Meat", category: "Meat", location: "Fridge", daysSealed: 5, daysAfterOpening: 2 },
  { name: "Deli Ham", category: "Meat", location: "Fridge", daysSealed: 7, daysAfterOpening: 5 },
  { name: "Deli Turkey", category: "Meat", location: "Fridge", daysSealed: 7, daysAfterOpening: 5 },
  { name: "Ground Beef", category: "Meat", location: "Freezer", daysSealed: 120, daysAfterOpening: 2 },
  { name: "Ground Pork", category: "Meat", location: "Freezer", daysSealed: 120, daysAfterOpening: 2 },
  { name: "Ground Turkey", category: "Meat", location: "Freezer", daysSealed: 120, daysAfterOpening: 2 },
  { name: "Halibut", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 2 },
  { name: "Ham", category: "Meat", location: "Fridge", daysSealed: 7, daysAfterOpening: 5 },
  { name: "Hot Dogs", category: "Meat", location: "Fridge", daysSealed: 14, daysAfterOpening: 7 },
  { name: "Italian Sausage", category: "Meat", location: "Fridge", daysSealed: 7, daysAfterOpening: 3 },
  { name: "Lamb Chops", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 3 },
  { name: "Lobster", category: "Meat", location: "Fridge", daysSealed: 2, daysAfterOpening: 1 },
  { name: "Mahi Mahi", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 2 },
  { name: "Pepperoni", category: "Meat", location: "Fridge", daysSealed: 42, daysAfterOpening: 21 },
  { name: "Pork Chops", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 3 },
  { name: "Pork Tenderloin", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 3 },
  { name: "Prosciutto", category: "Meat", location: "Fridge", daysSealed: 14, daysAfterOpening: 5 },
  { name: "Ribeye Steak", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 3 },
  { name: "Rotisserie Chicken", category: "Meat", location: "Fridge", daysSealed: 4, daysAfterOpening: 3 },
  { name: "Salami", category: "Meat", location: "Fridge", daysSealed: 42, daysAfterOpening: 14 },
  { name: "Salmon", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 2 },
  { name: "Scallops", category: "Meat", location: "Freezer", daysSealed: 90, daysAfterOpening: 1 },
  { name: "Shrimp", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 2 },
  { name: "Sirloin Steak", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 3 },
  { name: "Smoked Salmon", category: "Meat", location: "Fridge", daysSealed: 14, daysAfterOpening: 5 },
  { name: "Swordfish", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 2 },
  { name: "Tilapia", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 2 },
  { name: "Tuna", category: "Meat", location: "Pantry", daysSealed: 730, daysAfterOpening: 3 },
  { name: "Tuna Steak", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 1 },
  { name: "Turkey Breast", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 3 },

  // === CONDIMENTS & SAUCES ===
  { name: "BBQ Sauce", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 120 },
  { name: "Buffalo Sauce", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 90 },
  { name: "Chili Garlic Sauce", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 90 },
  { name: "Dijon Mustard", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 365 },
  { name: "Fish Sauce", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 365 },
  { name: "Hoisin Sauce", category: "Pantry", location: "Fridge", daysSealed: 540, daysAfterOpening: 90 },
  { name: "Honey Mustard", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 60 },
  { name: "Horseradish", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 90 },
  { name: "Hot Sauce", category: "Pantry", location: "Fridge", daysSealed: 730, daysAfterOpening: 180 },
  { name: "Hummus", category: "Pantry", location: "Fridge", daysSealed: 30, daysAfterOpening: 7 },
  { name: "Ketchup", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 180 },
  { name: "Marinara Sauce", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 7 },
  { name: "Mayonnaise", category: "Pantry", location: "Fridge", daysSealed: 180, daysAfterOpening: 60 },
  { name: "Mustard", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 365 },
  { name: "Oyster Sauce", category: "Pantry", location: "Fridge", daysSealed: 540, daysAfterOpening: 90 },
  { name: "Pesto", category: "Pantry", location: "Fridge", daysSealed: 180, daysAfterOpening: 7 },
  { name: "Pickle Relish", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 90 },
  { name: "Ranch Dressing", category: "Pantry", location: "Fridge", daysSealed: 180, daysAfterOpening: 30 },
  { name: "Salsa", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 14 },
  { name: "Soy Sauce", category: "Pantry", location: "Pantry", daysSealed: 1095, daysAfterOpening: 365 },
  { name: "Sriracha", category: "Pantry", location: "Fridge", daysSealed: 730, daysAfterOpening: 180 },
  { name: "Steak Sauce", category: "Pantry", location: "Fridge", daysSealed: 540, daysAfterOpening: 90 },
  { name: "Tahini", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 90 },
  { name: "Tartar Sauce", category: "Pantry", location: "Fridge", daysSealed: 180, daysAfterOpening: 60 },
  { name: "Teriyaki Sauce", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 30 },
  { name: "Vinaigrette", category: "Pantry", location: "Fridge", daysSealed: 90, daysAfterOpening: 14 },
  { name: "Worcestershire Sauce", category: "Pantry", location: "Pantry", daysSealed: 1095, daysAfterOpening: 365 },
  { name: "Yellow Mustard", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 365 },

  // === PANTRY STAPLES ===
  { name: "All-Purpose Flour", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 180 },
  { name: "Almond Butter", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 90 },
  { name: "Almond Flour", category: "Pantry", location: "Pantry", daysSealed: 180, daysAfterOpening: 90 },
  { name: "Baking Powder", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 180 },
  { name: "Baking Soda", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 180 },
  { name: "Balsamic Vinegar", category: "Pantry", location: "Pantry", daysSealed: 1095, daysAfterOpening: 365 },
  { name: "Black Beans", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 5 },
  { name: "Bread", category: "Pantry", location: "Pantry", daysSealed: 7, daysAfterOpening: 5 },
  { name: "Bread Crumbs", category: "Pantry", location: "Pantry", daysSealed: 180, daysAfterOpening: 90 },
  { name: "Brown Rice", category: "Pantry", location: "Pantry", daysSealed: 180, daysAfterOpening: 90 },
  { name: "Brown Sugar", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 120 },
  { name: "Canola Oil", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 365 },
  { name: "Capers", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 365 },
  { name: "Chicken Broth", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 5 },
  { name: "Chickpeas", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 5 },
  { name: "Cocoa Powder", category: "Pantry", location: "Pantry", daysSealed: 1095, daysAfterOpening: 365 },
  { name: "Coconut Milk", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 5 },
  { name: "Coconut Oil", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 365 },
  { name: "Cornstarch", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 365 },
  { name: "Couscous", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 180 },
  { name: "Crackers", category: "Pantry", location: "Pantry", daysSealed: 180, daysAfterOpening: 14 },
  { name: "Dried Pasta", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 365 },
  { name: "Granola", category: "Pantry", location: "Pantry", daysSealed: 180, daysAfterOpening: 30 },
  { name: "Honey", category: "Pantry", location: "Pantry", daysSealed: 1095, daysAfterOpening: 1095 },
  { name: "Jam", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 30 },
  { name: "Jelly", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 30 },
  { name: "Kidney Beans", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 5 },
  { name: "Lentils", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 365 },
  { name: "Maple Syrup", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 365 },
  { name: "Oats", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 180 },
  { name: "Olive Oil", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 180 },
  { name: "Olives", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 14 },
  { name: "Panko", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 90 },
  { name: "Pasta", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 365 },
  { name: "Peanut Butter", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 90 },
  { name: "Pickles", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 90 },
  { name: "Popcorn Kernels", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 365 },
  { name: "Quinoa", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 180 },
  { name: "Raisins", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 90 },
  { name: "Rice", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 365 },
  { name: "Sesame Oil", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 180 },
  { name: "Sugar", category: "Pantry", location: "Pantry", daysSealed: 1095, daysAfterOpening: 730 },
  { name: "Sun-Dried Tomatoes", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 14 },
  { name: "Tomato Paste", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 7 },
  { name: "Tomato Sauce", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 7 },
  { name: "Tortillas", category: "Pantry", location: "Pantry", daysSealed: 21, daysAfterOpening: 7 },
  { name: "Vegetable Broth", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 5 },
  { name: "Walnuts", category: "Pantry", location: "Pantry", daysSealed: 180, daysAfterOpening: 90 },
  { name: "White Rice", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 365 },
  { name: "White Wine Vinegar", category: "Pantry", location: "Pantry", daysSealed: 1095, daysAfterOpening: 365 },

  // === FROZEN ===
  { name: "Frozen Berries", category: "Other", location: "Freezer", daysSealed: 365, daysAfterOpening: 180 },
  { name: "Frozen Broccoli", category: "Other", location: "Freezer", daysSealed: 365, daysAfterOpening: 180 },
  { name: "Frozen Corn", category: "Other", location: "Freezer", daysSealed: 365, daysAfterOpening: 180 },
  { name: "Frozen Pizza", category: "Other", location: "Freezer", daysSealed: 180, daysAfterOpening: null },
  { name: "Frozen Spinach", category: "Other", location: "Freezer", daysSealed: 365, daysAfterOpening: 180 },
  { name: "Frozen Waffles", category: "Other", location: "Freezer", daysSealed: 240, daysAfterOpening: 60 },
  { name: "Ice Cream", category: "Other", location: "Freezer", daysSealed: 60, daysAfterOpening: 30 },

  // === BEVERAGES ===
  { name: "Almond Milk", category: "Other", location: "Fridge", daysSealed: 10, daysAfterOpening: 7 },
  { name: "Apple Juice", category: "Other", location: "Fridge", daysSealed: 21, daysAfterOpening: 7 },
  { name: "Coconut Water", category: "Other", location: "Pantry", daysSealed: 365, daysAfterOpening: 3 },
  { name: "Orange Juice", category: "Other", location: "Fridge", daysSealed: 14, daysAfterOpening: 7 },
  { name: "Soy Milk", category: "Other", location: "Fridge", daysSealed: 10, daysAfterOpening: 7 },

  // === BAKERY ===
  { name: "Bagels", category: "Other", location: "Pantry", daysSealed: 5, daysAfterOpening: 3 },
  { name: "Croissants", category: "Other", location: "Pantry", daysSealed: 3, daysAfterOpening: 2 },
  { name: "English Muffins", category: "Other", location: "Pantry", daysSealed: 14, daysAfterOpening: 7 },
  { name: "Hamburger Buns", category: "Other", location: "Pantry", daysSealed: 7, daysAfterOpening: 5 },
  { name: "Hot Dog Buns", category: "Other", location: "Pantry", daysSealed: 7, daysAfterOpening: 5 },
  { name: "Pita Bread", category: "Other", location: "Pantry", daysSealed: 7, daysAfterOpening: 5 },
  { name: "Sandwich Bread", category: "Other", location: "Pantry", daysSealed: 7, daysAfterOpening: 5 },
  { name: "Sourdough", category: "Other", location: "Pantry", daysSealed: 5, daysAfterOpening: 3 },
  { name: "Wraps", category: "Other", location: "Pantry", daysSealed: 14, daysAfterOpening: 7 },
];

const RECIPE_DB = [
  { name: "Classic Omelette", ingredients: ["eggs","butter","cheese","milk"], requires: ["eggs"], description: "A quick egg omelette with whatever fillings you have.", time: "10 min", instructions: "1. Crack 2-3 eggs into a bowl, add a splash of milk, and whisk well.\n2. Heat butter in a non-stick pan over medium heat until foamy.\n3. Pour in the egg mixture and let it set for 30 seconds.\n4. Using a spatula, gently push the edges toward the center.\n5. Add cheese or any fillings to one half.\n6. Fold the omelette in half and slide onto a plate.\n7. Season with salt and pepper and serve immediately." },
  { name: "Vegetable Stir Fry", ingredients: ["carrots","onions","garlic","oil"], requires: ["carrots","onions"], description: "Healthy stir fry using fresh vegetables.", time: "15 min", instructions: "1. Slice carrots into thin rounds and dice onions.\n2. Heat oil in a wok or large pan over high heat.\n3. Add onions and stir fry for 2 minutes until softened.\n4. Add carrots and any other vegetables.\n5. Add minced garlic and stir fry for another 3-4 minutes.\n6. Season with soy sauce, salt and pepper.\n7. Serve over rice or noodles." },
  { name: "French Onion Soup", ingredients: ["onions","butter","broth","bread","cheese"], requires: ["onions"], description: "Rich caramelized onion soup.", time: "45 min", instructions: "1. Slice onions thinly. Melt butter in a heavy pot over medium-low heat.\n2. Add onions and cook slowly for 25-30 minutes until deep golden brown.\n3. Pour in broth and simmer for 10 minutes.\n4. Season with salt and pepper.\n5. Ladle into oven-safe bowls, top with toasted bread.\n6. Cover with shredded cheese and broil until bubbly.\n7. Serve immediately." },
  { name: "Potato Hash", ingredients: ["potatos","onions","eggs","butter"], requires: ["potatos"], description: "Crispy pan-fried potatoes with onions.", time: "20 min", instructions: "1. Dice potatoes into small cubes.\n2. Heat butter in a large skillet over medium-high heat.\n3. Add potatoes in a single layer and press down.\n4. Cook without stirring for 5-7 minutes until golden.\n5. Flip and add diced onions.\n6. Cook another 5 minutes until crispy.\n7. Make wells and crack eggs into them.\n8. Cover and cook until eggs are set." },
  { name: "Mashed Potatoes", ingredients: ["potatos","butter","milk","salt"], requires: ["potatos"], description: "Creamy mashed potatoes.", time: "25 min", instructions: "1. Peel and cut potatoes into even chunks.\n2. Cover with cold salted water and bring to a boil.\n3. Cook for 15-18 minutes until fork-tender.\n4. Drain and return to hot pot for 1 minute to dry.\n5. Mash with a potato masher.\n6. Heat butter and milk together, then mix into potatoes.\n7. Season with salt and white pepper." },
  { name: "Berry Smoothie", ingredients: ["berries","milk","yogurt","banana","honey"], requires: ["berries"], description: "Blend up those berries before they go.", time: "5 min", instructions: "1. Add berries to blender.\n2. Add a banana for creaminess.\n3. Pour in milk.\n4. Add a spoonful of yogurt.\n5. Drizzle in honey to taste.\n6. Blend on high for 45-60 seconds until smooth.\n7. Pour into a glass and serve." },
  { name: "Glazed Carrots", ingredients: ["carrots","butter","honey","salt"], requires: ["carrots"], description: "Sweet butter-glazed carrots.", time: "15 min", instructions: "1. Peel and slice carrots into coins.\n2. Place in a pan with enough water to cover.\n3. Bring to a boil and cook for 5 minutes.\n4. Drain most water, leaving a few tablespoons.\n5. Add butter and honey.\n6. Toss carrots over medium heat for 3-4 minutes until glazed.\n7. Season with salt and serve." },
  { name: "Carrot Soup", ingredients: ["carrots","onions","butter","cream","broth"], requires: ["carrots"], description: "Smooth warming carrot soup.", time: "30 min", instructions: "1. Chop carrots and onions roughly.\n2. Melt butter in a pot, add onions and cook for 5 minutes.\n3. Add carrots and cook another 3 minutes.\n4. Pour in broth to cover.\n5. Simmer for 15-20 minutes until carrots are very soft.\n6. Blend until completely smooth.\n7. Stir in cream, season with salt, pepper, and ginger." },
  { name: "Egg Fried Rice", ingredients: ["eggs","rice","carrots","onions","soy sauce"], requires: ["eggs","rice"], description: "Satisfying fried rice with eggs and vegetables.", time: "20 min", instructions: "1. Use day-old cold rice if possible.\n2. Dice carrots small and chop onions.\n3. Heat oil in a wok over high heat.\n4. Fry onions and carrots for 3 minutes.\n5. Push to the side, crack in eggs, and scramble.\n6. Add rice and break up any clumps.\n7. Add soy sauce and toss over high heat for 3-4 minutes." },
  { name: "Deviled Eggs", ingredients: ["eggs","mayonaise","mustard","paprika"], requires: ["eggs","mayonaise"], description: "Classic deviled eggs.", time: "20 min", instructions: "1. Boil eggs for exactly 10 minutes, then transfer to ice water.\n2. Peel eggs and slice in half lengthwise.\n3. Remove yolks into a bowl.\n4. Mash yolks with mayonnaise, mustard, salt and pepper.\n5. Spoon filling back into the egg white halves.\n6. Dust with paprika and refrigerate until ready to serve." },
  { name: "Shakshuka", ingredients: ["eggs","tomatoes","onions","garlic","ketchup"], requires: ["eggs"], description: "Eggs poached in spiced tomato sauce.", time: "25 min", instructions: "1. Heat olive oil in a wide pan over medium heat.\n2. Saute diced onion for 5 minutes until soft.\n3. Add minced garlic and cook 1 minute.\n4. Add chopped tomatoes and ketchup.\n5. Season with cumin, paprika, salt and chili flakes.\n6. Simmer sauce for 10 minutes until thickened.\n7. Make wells and crack eggs into them.\n8. Cover and cook 5-8 minutes until whites are set.\n9. Serve with crusty bread." },
  { name: "Roasted Vegetables", ingredients: ["carrots","potatos","onions","garlic","oil"], requires: ["carrots","potatos"], description: "Roast everything together for an easy hearty dish.", time: "40 min", instructions: "1. Preheat oven to 425F.\n2. Cut carrots, potatoes, and onions into similar-sized chunks.\n3. Toss with olive oil, salt, pepper, and garlic.\n4. Spread in a single layer on a baking sheet.\n5. Roast for 20 minutes, then flip vegetables.\n6. Roast another 15-20 minutes until golden and caramelized.\n7. Sprinkle with fresh herbs and serve hot." },
  { name: "Ketchup Glazed Chicken", ingredients: ["ketchup","chicken","garlic","onions"], requires: ["ketchup"], description: "Simple ketchup-glazed chicken.", time: "35 min", instructions: "1. Mix ketchup with garlic, vinegar, and brown sugar.\n2. Season chicken with salt and pepper.\n3. Heat oil in an oven-safe pan over medium-high heat.\n4. Sear chicken for 3-4 minutes per side.\n5. Pour glaze over the chicken.\n6. Bake at 375F for 20-25 minutes.\n7. Rest 5 minutes before serving." },
  { name: "Onion Soup Pasta", ingredients: ["onions","pasta","butter","cheese"], requires: ["onions"], description: "Simple pasta with caramelized onions and cheese.", time: "25 min", instructions: "1. Slice onions thinly and cook in butter over low heat for 15-20 minutes until golden.\n2. Cook pasta in well-salted boiling water.\n3. Reserve 1 cup of pasta water before draining.\n4. Add pasta to the onions and toss.\n5. Add pasta water a splash at a time to create a sauce.\n6. Season well with salt and pepper.\n7. Serve topped with grated cheese." },
  { name: "Scrambled Eggs on Toast", ingredients: ["eggs","butter","bread","milk"], requires: ["eggs"], description: "Perfect creamy scrambled eggs.", time: "8 min", instructions: "1. Crack eggs into a cold pan, add butter and a splash of milk.\n2. Place over low-medium heat and stir continuously.\n3. Keep stirring, bringing the curds together slowly.\n4. Remove from heat while still slightly underdone.\n5. Season with salt and pepper.\n6. Toast and butter bread.\n7. Pile eggs onto toast and serve immediately." },
  { name: "Frittata", ingredients: ["eggs","onions","carrots","cheese","butter"], requires: ["eggs"], description: "Italian baked omelette great for using up vegetables.", time: "25 min", instructions: "1. Preheat oven to 375F.\n2. Saute any vegetables in an oven-safe pan until softened.\n3. Whisk eggs with salt, pepper, and a splash of cream.\n4. Pour egg mixture over the vegetables.\n5. Cook on stovetop for 3-4 minutes until edges are set.\n6. Transfer to oven and bake 10-12 minutes until puffed and golden.\n7. Let cool slightly, slice like a pizza and serve." },
  { name: "Mayonnaise Roasted Potatoes", ingredients: ["potatos","mayonaise","garlic"], requires: ["potatos","mayonaise"], description: "Incredibly crispy roasted potatoes using the mayo trick.", time: "45 min", instructions: "1. Preheat oven to 425F.\n2. Cut potatoes into wedges or chunks.\n3. Toss thoroughly with mayonnaise, garlic, salt, and pepper.\n4. Spread on a baking sheet in a single layer.\n5. Roast for 20 minutes until golden on the bottom.\n6. Flip and roast another 15 minutes until crispy all over.\n7. Serve with ketchup or sour cream." },
  { name: "Ribeye Steak", ingredients: ["ribeye","butter","garlic","thyme"], requires: ["ribeye"], description: "Perfect pan-seared ribeye with garlic butter.", time: "20 min", instructions: "1. Take steak out of fridge 30 minutes before cooking.\n2. Pat dry and season with salt and pepper.\n3. Heat cast iron skillet until smoking.\n4. Sear 3-4 minutes per side.\n5. Add butter, garlic, and thyme.\n6. Baste continuously for 1-2 minutes.\n7. Rest 5 minutes before slicing.", temps: [{"label":"Rare","temp":"125F","color":"bg-red-100 text-red-800"},{"label":"Medium Rare","temp":"135F","color":"bg-orange-100 text-orange-800"},{"label":"Medium","temp":"145F","color":"bg-yellow-100 text-yellow-800","safe":true},{"label":"Well Done","temp":"160F","color":"bg-green-100 text-green-800","safe":true}] },
  { name: "Roast Chicken", ingredients: ["chicken","butter","garlic","thyme"], requires: ["chicken"], description: "Classic roast chicken with crispy skin.", time: "90 min", instructions: "1. Preheat oven to 425F.\n2. Pat chicken dry inside and out.\n3. Rub all over with butter, salt, pepper, and garlic.\n4. Roast breast side up for 60-75 minutes.\n5. Baste every 20 minutes.\n6. Rest 10 minutes before carving.", temps: [{"label":"USDA Safe Minimum","temp":"165F","color":"bg-green-100 text-green-800","safe":true}] },
  { name: "Pan Seared Salmon", ingredients: ["salmon","butter","lemon","garlic"], requires: ["salmon"], description: "Crispy skin salmon with lemon butter.", time: "15 min", instructions: "1. Pat salmon dry and season with salt and pepper.\n2. Heat oil over medium-high heat.\n3. Place skin side down and press gently.\n4. Cook 4-5 minutes until skin is crispy.\n5. Flip and cook 2-3 more minutes.\n6. Add butter and lemon juice and serve.", temps: [{"label":"Safe Minimum","temp":"145F","color":"bg-green-100 text-green-800","safe":true}] },
];

function daysUntil(dateString) {
  if (!dateString) return null;
  const today = new Date();
  const target = new Date(dateString + "T00:00:00");
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function suggestRecipes(trackedItems) {
  if (!trackedItems || trackedItems.length === 0) return [];
  const itemNames = trackedItems.map((it) => it.name.toLowerCase().trim());
  const scored = RECIPE_DB.map((recipe) => {
    const hasRequired = recipe.requires.every((req) =>
      itemNames.some((item) => item.includes(req) || req.includes(item))
    );
    if (!hasRequired) return null;
    const usedItems = trackedItems.filter((it) =>
      recipe.ingredients.some((ing) => it.name.toLowerCase().includes(ing) || ing.includes(it.name.toLowerCase()))
    );
    const urgencyScore = usedItems.reduce((sum, it) => {
      const days = daysUntil(it.useByDate);
      return days !== null ? sum + Math.max(0, 30 - days) : sum;
    }, 0);
    return { ...recipe, urgencyScore, usedItems };
  }).filter(Boolean);
  scored.sort((a, b) => b.urgencyScore - a.urgencyScore);
  return scored.slice(0, 5);
}

function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return parsed.map((it) => ({
      id: it.id ?? crypto.randomUUID(),
      name: (it.name ?? "").trim(),
      useByDate: it.useByDate ?? "",
      openDate: it.openDate ?? "",
      category: it.category ?? "Other",
      quantity: it.quantity ?? "",
      location: it.location ?? "Fridge",
    }));
  } catch (e) { return []; }
}

function saveItems(items) {
  const sorted = [...items].sort((a, b) => {
    const da = a.useByDate ? new Date(a.useByDate + "T00:00:00").getTime() : Infinity;
    const db = b.useByDate ? new Date(b.useByDate + "T00:00:00").getTime() : Infinity;
    return da - db;
  });
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted)); } catch (e) {}
}

function loadCommunity() {
  try {
    const raw = localStorage.getItem(COMMUNITY_KEY);
    return raw ? JSON.parse(raw) : { recipes: [], tips: [], chat: [] };
  } catch (e) { return { recipes: [], tips: [], chat: [] }; }
}

function saveCommunity(data) {
  try { localStorage.setItem(COMMUNITY_KEY, JSON.stringify(data)); } catch (e) {}
}

function loadShopping() {
  try {
    const raw = localStorage.getItem(SHOPPING_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

function saveShopping(items) {
  try { localStorage.setItem(SHOPPING_KEY, JSON.stringify(items)); } catch (e) {}
}

function loadMeals() {
  try {
    const raw = localStorage.getItem(MEAL_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}

function saveMeals(meals) {
  try { localStorage.setItem(MEAL_KEY, JSON.stringify(meals)); } catch (e) {}
}

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const MEAL_SLOTS = ["Breakfast","Lunch","Dinner"];

const CATEGORY_COLORS = {
  Produce: "bg-green-100 text-green-800",
  Dairy: "bg-blue-100 text-blue-800",
  Meat: "bg-red-100 text-red-800",
  Pantry: "bg-yellow-100 text-yellow-800",
  Leftovers: "bg-purple-100 text-purple-800",
  Other: "bg-gray-100 text-gray-700",
};

const LOCATION_COLORS = {
  Fridge: "bg-sky-100 text-sky-700",
  Freezer: "bg-cyan-100 text-cyan-800",
  Pantry: "bg-amber-100 text-amber-800",
};

const LOCATION_ICONS = {
  Fridge: "🧊",
  Freezer: "❄️",
  Pantry: "🗄️",
};

function Card({ children, className = "" }) {
  return <div className={`rounded-2xl border border-green-900/20 bg-white/95 backdrop-blur-sm p-5 card-3d ${className}`}>{children}</div>;
}

function TabBar({ active, onChange }) {
  return (
    <div className="flex gap-1 rounded-2xl bg-gradient-to-r from-green-900 to-emerald-800 p-1.5 shadow-lg">
      {[["tracker","🥦 Tracker"],["recipes","🍳 Recipes"],["shopping","🛒 Shopping"],["meals","📅 Meals"],["community","👥 Community"]].map(([id, label]) => (
        <button key={id} onClick={() => onChange(id)} className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all duration-300 ${active === id ? "bg-white text-green-800 pill-3d-active scale-[1.02]" : "text-green-100/70 hover:text-white hover:bg-white/10 pill-3d"}`}>{label}</button>
      ))}
    </div>
  );
}

function BarcodeScanner({ onDetected }) {
  const videoRef = useRef(null);
  const [error, setError] = useState("");
  const detectedRef = useRef(false);
  const readerRef = useRef(null);

  useEffect(() => {
    detectedRef.current = false;
    async function startScanner() {
if (readerRef.current) { readerRef.current.reset(); readerRef.current = null; }
      try {
        const { BrowserMultiFormatReader } = await import("@zxing/library");
        readerRef.current = new BrowserMultiFormatReader();
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", focusMode: "continuous", width: { ideal: 1280 }, height: { ideal: 720 } } }); if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play(); }
        
        await readerRef.current.decodeFromStream(videoRef.current.srcObject, videoRef.current, (result, err) => {
          if (result && !detectedRef.current) {
            detectedRef.current = true;
            if (readerRef.current) readerRef.current.reset();
            onDetected(result.getText());
          }
        });
      } catch (e) {
        setError("Camera access denied or not available. Please allow camera access.");
      }
    }
    startScanner();
    return () => { if (readerRef.current) { readerRef.current.reset(); readerRef.current = null; } if (videoRef.current && videoRef.current.srcObject) { videoRef.current.srcObject.getTracks().forEach(t => t.stop()); videoRef.current.srcObject = null; } };
  }, []);

  return (
    <div className="relative">
      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : (
        <div className="relative overflow-hidden rounded-lg bg-black">
          <video ref={videoRef} className="w-full rounded-lg" style={{ height: "240px", objectFit: "cover" }} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="border-2 border-red-400 rounded w-48 h-24 opacity-70" />
          </div>
          <p className="absolute bottom-2 left-0 right-0 text-center text-xs text-white bg-black/40 py-1">Point at barcode</p>
        </div>
      )}
    </div>
  );
}

function SmartScanner({ onResult, onError, captureRef }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("starting");
  const [scanError, setScanError] = useState("");
  const detectedRef = useRef(false);
  const readerRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    detectedRef.current = false;
    let stream = null;

    async function captureAndScan() {
      if (detectedRef.current) return;
      detectedRef.current = true;
      setStatus("reading_label");
      if (readerRef.current) { try { readerRef.current.reset(); } catch(e) {} readerRef.current = null; }
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) { onError("Camera not ready"); return; }
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      canvas.getContext("2d").drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      const base64 = dataUrl.split(",")[1];
      try {
        const res = await fetch("/api/scan-label", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageData: base64, mediaType: "image/jpeg" })
        });
        const data = await res.json();
        if (data.item) { onResult({ ...data.item, source: "label" }); }
        else { onError(data.error || "Could not read label. Try again."); }
      } catch (e) { onError("Scan failed: " + e.message); }
    }

    async function start() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 }, advanced: [{ torch: false }] }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute("playsinline", "true");
          await videoRef.current.play();
        }
        setStatus("scanning");
        try {
          const { BrowserMultiFormatReader } = await import("@zxing/library");
          readerRef.current = new BrowserMultiFormatReader();
          readerRef.current.decodeFromStream(stream, videoRef.current, async (result) => {
            if (result && !detectedRef.current) {
              detectedRef.current = true;
              if (timerRef.current) clearTimeout(timerRef.current);
              if (readerRef.current) { try { readerRef.current.reset(); } catch(e) {} readerRef.current = null; }
              setStatus("barcode_found");
              try {
                const res = await fetch("/api/scan-barcode", {
                  method: "POST", headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ barcode: result.getText() })
                });
                const data = await res.json();
                if (data.item) { onResult({ ...data.item, barcode: result.getText(), source: "barcode" }); }
                else { detectedRef.current = false; captureAndScan(); }
              } catch(e) { detectedRef.current = false; captureAndScan(); }
            }
          });
        } catch(e) { /* barcode lib failed, wait for timer */ }
        if (captureRef) captureRef.current = () => { if (!detectedRef.current) captureAndScan(); };
      } catch (e) { setScanError("Camera access denied. Please allow camera access."); }
    }
    start();
    return () => {
      if (readerRef.current) { try { readerRef.current.reset(); } catch(e) {} readerRef.current = null; }
      if (timerRef.current) clearTimeout(timerRef.current);
      if (videoRef.current && videoRef.current.srcObject) { videoRef.current.srcObject.getTracks().forEach(t => t.stop()); videoRef.current.srcObject = null; }
    };
  }, []);

  return (
    <div className="relative">
      {scanError ? <p className="text-sm text-red-600 p-4">{scanError}</p> : (
        <div className="relative overflow-hidden rounded-xl bg-black">
          <video ref={videoRef} id="smartScannerVideo" playsInline muted className="w-full rounded-xl" style={{ height: "280px", objectFit: "cover" }} />
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {status === "scanning" && <div style={{border:"2px solid #4ade80",borderRadius:"12px",width:"220px",height:"140px",opacity:0.7}} />}
            {status === "reading_label" && <div style={{border:"2px solid #fb923c",borderRadius:"12px",width:"220px",height:"140px",opacity:0.8}} />}
            {status === "barcode_found" && <div style={{border:"3px solid #22c55e",borderRadius:"12px",width:"220px",height:"140px",background:"rgba(34,197,94,0.15)"}} />}
          </div>
          <p className="absolute bottom-0 left-0 right-0 text-center text-xs text-white py-2 font-bold" style={{background:"rgba(0,0,0,0.6)"}}>
            {status === "starting" && "Starting camera..."}
            {status === "scanning" && "Scanning for barcode... or tap Take Photo below"}
            {status === "barcode_found" && "Barcode found! Looking up product..."}
            {status === "reading_label" && "AI reading label... please wait"}
          </p>
        </div>
      )}
    </div>
  );
}

function MealSearchInput({ value, onChange, onKeyDown }) {
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

function FoodAutocomplete({ value, onChange, onSelect, lang }) {
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


function CommunityStewAnim() {
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


function MarketingPage({ onLaunchApp, lang, onChangeLang }) {
  const isEs = lang === "es";
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
      <nav className="mkt-nav">
        <div className="mkt-nav-logo">{broc} TrackFresh <span style={{opacity:0.6,fontSize:"0.7em"}}>Ai</span></div>
        <div style={{display:"flex",gap:"0.75rem",alignItems:"center"}}>
          <button onClick={() => onChangeLang(lang === "en" ? "es" : "en")} style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.25)",borderRadius:"999px",padding:"0.4rem 0.75rem",color:"#fff",fontWeight:700,fontSize:"0.8rem",cursor:"pointer"}}>{lang === "en" ? mxFlag + " ES" : usFlag + " EN"}</button>
        </div>
      </nav>
      <div className="mkt-hero mkt-animate">
        <h1>{isEs ? "Deja de Desperdiciar Comida." : "Stop Wasting Food."}<br/><span>{isEs ? "Empieza a Ahorrar." : "Start Saving."}</span></h1>
        <p>{isEs ? "TrackFresh Ai es tu asistente de cocina inteligente \u2014 escanea, rastrea y administra tu comida, planifica comidas, descubre recetas y elimina el desperdicio." : "TrackFresh Ai is your intelligent kitchen assistant \u2014 scan, track, and manage your food, plan meals, discover recipes, and eliminate waste."}</p>
        <button onClick={onLaunchApp} className="mkt-cta mkt-animate mkt-animate-d2">{rocket} {isEs ? "Abrir TrackFresh" : "Launch TrackFresh"}</button>
      </div>
      <div className="mkt-phone mkt-animate mkt-animate-d3">
        <div className="mkt-phone-inner">
          <div className="mkt-phone-header">{broc} TrackFresh Ai</div>
          <div style={{fontSize:"0.65rem",fontWeight:700,color:"#374151",marginBottom:"4px"}}>{isEs ? "Vence Pronto" : "Expiring Soon"}</div>
          {[{e:milk,n:isEs?"Leche":"Milk",c:"1d",bg:"#fef2f2"},{e:leafy,n:isEs?"Espinacas":"Spinach",c:"3d",bg:"#fefce8"},{e:drum,n:isEs?"Pechuga":"Chicken",c:"2d",bg:"#fef2f2"},{e:berry,n:isEs?"Ar\u00e1ndanos":"Blueberries",c:"5d",bg:"#f0fdf4"},{e:cheese,n:isEs?"Queso":"Cheese",c:"8d",bg:"#f0fdf4"}].map((item,i) => (
            <div key={i} className="mkt-phone-item" style={{background:item.bg}}><span>{item.e} <strong style={{color:"#111"}}>{item.n}</strong></span><span style={{color:"#6b7280"}}>{item.c}</span></div>
          ))}
          <div className="mkt-phone-nav"><span>{pkg} {isEs?"Despensa":"Pantry"}</span><span>{cam} {isEs?"Escanear":"Scan"}</span><span>{cart} {isEs?"Compras":"Shop"}</span><span>{chart} Stats</span></div>
        </div>
      </div>
      <div className="mkt-section mkt-section-dark">
        <div className="mkt-section-title"><span>{isEs ? "El Problema" : "The Problem"}</span><h2>{isEs ? "El Desperdicio se Esconde en Tu Cocina" : "Food Waste Is Hiding in Your Kitchen"}</h2></div>
        <div className="mkt-stats">
          <div><div className="mkt-stat-num">40%</div><div className="mkt-stat-label">{isEs ? "de la comida se desperdicia" : "of food produced is wasted"}</div></div>
          <div><div className="mkt-stat-num">$1,500</div><div className="mkt-stat-label">{isEs ? "tirado por familia al a\u00f1o" : "thrown away per family yearly"}</div></div>
          <div><div className="mkt-stat-num">43%</div><div className="mkt-stat-label">{isEs ? "del desperdicio ocurre en casa" : "of waste happens at home"}</div></div>
        </div>
      </div>
      <div className="mkt-section">
        <div className="mkt-section-title"><span>{isEs ? "La Soluci\u00f3n" : "The Solution"}</span><h2>{isEs ? "Conoce TrackFresh Ai" : "Meet TrackFresh Ai"}</h2></div>
        <div className="mkt-features">
          {[{icon:snap,title:isEs?"Esc\u00e1ner con IA":"AI Label Scanner",desc:isEs?"Toma foto de cualquier etiqueta.":"Snap a photo of any food label."},{icon:pkg,title:isEs?"C\u00f3digo de Barras":"Barcode Scanner",desc:isEs?"Apunta tu c\u00e1mara a cualquier c\u00f3digo.":"Point your camera at any barcode."},{icon:clock,title:isEs?"Alertas Inteligentes":"Smart Expiry Alerts",desc:isEs?"Niveles de urgencia con colores.":"Color-coded urgency levels."},{icon:mic,title:isEs?"Entrada por Voz":"Voice Input",desc:isEs?"Manos ocupadas? Solo habla.":"Hands full? Just speak."},{icon:cook,title:isEs?"Recetas con IA":"AI Recipes",desc:isEs?"Recetas basadas en lo que tienes.":"Recipes from what you have."},{icon:cal,title:isEs?"Planificador":"Meal Planner",desc:isEs?"La IA planifica tus comidas.":"AI plans your weekly meals."},{icon:cart,title:isEs?"Lista de Compras":"Smart Shopping",desc:isEs?"Lista inteligente con alertas.":"Smart list with alerts."},{icon:warn,title:isEs?"Retiros FDA":"FDA Recalls",desc:isEs?"Alertas de seguridad alimentaria.":"Real-time food safety alerts."}].map((f,i) => (
            <div key={i} className="mkt-feature mkt-animate" style={{animationDelay:0.1*i+"s"}}><div className="mkt-feature-icon">{f.icon}</div><h3>{f.title}</h3><p>{f.desc}</p></div>
          ))}
        </div>
      </div>
      <div className="mkt-section mkt-section-dark">
        <div className="mkt-section-title"><span>{isEs ? "C\u00f3mo Funciona" : "How It Works"}</span><h2>{isEs ? "Cuatro Pasos a Cero Desperdicio" : "Four Steps to Zero Waste"}</h2></div>
        <div className="mkt-steps">
          {[{n:"1",title:isEs?"Escanea o Agrega":"Scan or Add",desc:isEs?"Usa el esc\u00e1ner de IA, c\u00f3digo de barras, voz o manual.":"Use AI scanner, barcode, voice, or manual entry."},{n:"2",title:isEs?"Establece Fechas":"Set Expiry Dates",desc:isEs?"La IA auto-detecta fechas de etiquetas.":"AI auto-detects dates from labels."},{n:"3",title:isEs?"Recibe Alertas":"Get Alerts & Act",desc:isEs?"Tarjetas con colores muestran urgencia.":"Color-coded cards show urgency."},{n:"4",title:isEs?"Ahorra":"Save Food & Money",desc:isEs?"Reduce el desperdicio hasta 40%.":"Reduce waste by 40% in three months."}].map((s,i) => (
            <div key={i} className="mkt-step mkt-animate" style={{animationDelay:0.15*i+"s"}}><div className="mkt-step-num">{s.n}</div><div><h3>{s.title}</h3><p>{s.desc}</p></div></div>
          ))}
        </div>
      </div>
      <div className="mkt-section">
        <div className="mkt-section-title"><span>{isEs ? "Tu Impacto" : "Your Impact"}</span><h2>{isEs ? "Cada Producto Salvado Importa" : "Every Item Saved Matters"}</h2></div>
        <div className="mkt-impact">
          <div className="mkt-impact-card"><div className="icon">{money}</div><p><strong>$600-$800</strong> {isEs ? "ahorrados al a\u00f1o" : "saved annually"}</p></div>
          <div className="mkt-impact-card"><div className="icon">{globe}</div><p>{isEs ? "Metano es " : "Methane is "}<strong>25x</strong> {isEs ? "m\u00e1s potente que CO2" : "more potent than CO2"}</p></div>
          <div className="mkt-impact-card"><div className="icon">{apple}</div><p>{isEs ? "Reducir desperdicio " : "Reducing waste by "}<strong>25%</strong> {isEs ? "alimentar\u00eda a todos" : "could feed everyone"}</p></div>
        </div>
      </div>
      <div className="mkt-section" style={{textAlign:"center",paddingBottom:"2rem"}}>
        <h2 style={{fontSize:"1.6rem",fontWeight:900,marginBottom:"1rem"}}>{isEs ? "Listo para Dejar de Desperdiciar?" : "Ready to Stop Wasting Food?"}</h2>
        <p style={{opacity:0.8,marginBottom:"1.5rem",fontSize:"0.95rem"}}>{isEs ? "\u00danete a miles ahorrando comida y dinero." : "Join thousands saving food and money."}</p>
        <button onClick={onLaunchApp} className="mkt-cta">{rocket} {isEs ? "Abrir TrackFresh Ahora" : "Launch TrackFresh Now"}</button>
      </div>
      <div className="mkt-footer">{broc} TrackFresh Ai \u00A9 2026 \u2014 {isEs ? "Ahorra Comida. Ahorra Dinero. Salva el Planeta." : "Save Food. Save Money. Save the Planet."}</div>
    </div>
  );
}

export default function TrackFreshDashboard() {
  const [lang, setLang] = useState("en");
  const changeLang = (l) => { setLang(l); try { localStorage.setItem(LANG_KEY, l); } catch(e) {} };
  React.useEffect(() => { try { const saved = localStorage.getItem(LANG_KEY); if (saved) setLang(saved); } catch(e) {} }, []);
  const t = (key) => { const e = T[key]; return e ? (e[lang] || e.en || key) : key; };

  
  const [showMarketing, setShowMarketing] = useState(true);
  React.useEffect(() => { try { if (typeof window !== "undefined" && window.sessionStorage && sessionStorage.getItem("tf_mkt_seen") === "1") setShowMarketing(false); } catch(e) {} }, []);
  const handleLaunchApp = () => { setShowMarketing(false); try { if (window.sessionStorage) sessionStorage.setItem("tf_mkt_seen", "1"); } catch(e) {} };
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);
  const handlePwSubmit = () => {
    if (pwInput === "fresh2026" || pwInput === "CarlosG2026") { setIsUnlocked(true); setPwError(false); try { if (window.sessionStorage) sessionStorage.setItem("tf_ok", "1"); } catch(e) {} } else { setPwError(true); }
  };
  React.useEffect(() => { try { if (typeof window !== "undefined" && window.sessionStorage && sessionStorage.getItem("tf_ok") === "1") setIsUnlocked(true); } catch(e) {} }, []);
  const [activeTab, setActiveTab] = useState("tracker");
  const [burstingBubble, setBurstingBubble] = useState(null);
  const handleBubbleTap = (target) => {
    setBurstingBubble(target);
    setTimeout(() => {
      setActiveTab(target);
      setBurstingBubble(null);
    }, 550);
  };
  const [trackedItems, setTrackedItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [useByDate, setUseByDate] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [category, setCategory] = useState("Other");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("Fridge");
  const [showAlert, setShowAlert] = useState(false);
  const [alertItem, setAlertItem] = useState({ name: "", daysLeft: 0 });
  const [editingItem, setEditingItem] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [recipeSuggestions, setRecipeSuggestions] = useState([]);
  const [recipesGenerated, setRecipesGenerated] = useState(false);
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [username, setUsername] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [community, setCommunity] = useState({ recipes: [], tips: [], chat: [] });
  const [communityTab, setCommunityTab] = useState("chat");
  const [fdaRecalls, setFdaRecalls] = useState([]);
  const [fdaLoading, setFdaLoading] = useState(false);
  const [showRecallsPanel, setShowRecallsPanel] = useState(false);

  useEffect(() => {
    if (!showRecallsPanel) return;
    let cancelled = false;
    setFdaLoading(true);
    fetch("/api/fda-recalls")
      .then(function(r) { return r.json(); })
      .then(function(d) {
        if (!cancelled && d.recalls) {
          setFdaRecalls(d.recalls);
        }
        if (!cancelled) setFdaLoading(false);
      })
      .catch(function(e) {
        console.error("FDA error:", e);
        if (!cancelled) setFdaLoading(false);
      });
    return function() { cancelled = true; };
  }, [showRecallsPanel]);
  const [newRecipeTitle, setNewRecipeTitle] = useState("");
  const [newRecipeBody, setNewRecipeBody] = useState("");
  const [newTip, setNewTip] = useState("");
  const [newChat, setNewChat] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [shoppingItems, setShoppingItems] = useState([]);
  const [newShoppingItem, setNewShoppingItem] = useState("");
  const [newShoppingQty, setNewShoppingQty] = useState("");
  const [selectedReceiptItems, setSelectedReceiptItems] = useState([]);
  const [showLabelScanner, setShowLabelScanner] = useState(false);
  const [labelItem, setLabelItem] = useState(null);
  const [labelScanning, setLabelScanning] = useState(false);
  const [labelError, setLabelError] = useState("");
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddName, setQuickAddName] = useState("");
  const [quickAddDate, setQuickAddDate] = useState("");
  const [quickAddQty, setQuickAddQty] = useState("");
  const [quickAddCategory, setQuickAddCategory] = useState("Other");
  const [quickAddLocation, setQuickAddLocation] = useState("Fridge");
  const [meals, setMeals] = useState({});
  const [showMealPicker, setShowMealPicker] = useState(false);
  const [mealPickerDay, setMealPickerDay] = useState("");
  const [mealPickerSlot, setMealPickerSlot] = useState("");
  const [mealPickerSearch, setMealPickerSearch] = useState("");
  const [aiPlanLoading, setAiPlanLoading] = useState(false);
  const [quickVoiceListening, setQuickVoiceListening] = useState("");
  const [quickVoiceError, setQuickVoiceError] = useState("");
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [barcodeScanKey, setBarcodeScanKey] = useState(0);
  const [barcodeItem, setBarcodeItem] = useState(null);
  const [barcodeScanning, setBarcodeScanning] = useState(false);
  const [barcodeError, setBarcodeError] = useState("");
  const [barcodeDetected, setBarcodeDetected] = useState("");
  const [barcodeLocation, setBarcodeLocation] = useState("");
  const [barcodeUseBy, setBarcodeUseBy] = useState("");
  const [barcodeFreezeBy, setBarcodeFreezeBy] = useState("");
  const [showSmartScanner, setShowSmartScanner] = useState(false);
  const smartCaptureRef = useRef(null);
  const [smartResult, setSmartResult] = useState(null);
  const [smartError, setSmartError] = useState("");
  const [smartLocation, setSmartLocation] = useState("");
  const [smartUseBy, setSmartUseBy] = useState("");
  const [smartFreezeBy, setSmartFreezeBy] = useState("");
  const [scanningDate, setScanningDate] = useState(false);

  const handleSmartResult = (item) => {
    setSmartResult(item); setSmartError("");
    if (item.date && item.dateFound) setSmartUseBy(item.date);
    if (item.location) setSmartLocation(item.location);
    if (!item.dateFound || !item.date) {
      setTimeout(() => startVoiceDatePrompt(item.name || "this product"), 500);
    }
  };

  const startVoiceDatePrompt = (productName) => {
    setVoicePromptDone(false);
    window.speechSynthesis.cancel();
    const speak = () => {
      const msg = new SpeechSynthesisUtterance("I found " + productName + ". Say the expiration date, or enter it manually.");
    const voices = window.speechSynthesis.getVoices();
    const natural = voices.find(v => v.name.includes("Zoe") && v.lang.startsWith("en")) 
      || voices.find(v => v.name.includes("Nicky") && v.lang.startsWith("en"))
      || voices.find(v => v.name.includes("Ava") && v.lang.startsWith("en"))
      || voices.find(v => v.name.includes("Allison") && v.lang.startsWith("en"))
      || voices.find(v => v.name.includes("Premium") && v.lang.startsWith("en"))
      || voices.find(v => v.name.includes("Enhanced") && v.lang.startsWith("en"))
      || voices.find(v => v.lang.startsWith("en-US") && !v.name.includes("Samantha"));
    if (natural) msg.voice = natural;
    msg.pitch = 1.05;
      msg.rate = 1.15;
      msg.onend = () => { startVoiceListening(); };
      window.speechSynthesis.speak(msg);
    };
    if (window.speechSynthesis.getVoices().length > 0) { speak(); }
    else { window.speechSynthesis.onvoiceschanged = () => { speak(); }; }
  };

  const startVoiceListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setVoicePromptDone(true); return; }
    const recognition = new SR();
    recognition.lang = lang === "es" ? "es-MX" : "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setVoiceListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const parsed = parseSpokenDate(transcript);
      if (parsed) {
        setSmartUseBy(parsed);
        setSmartResult(prev => prev ? {...prev, dateFound: true, date: parsed} : prev);
        const confirm = new SpeechSynthesisUtterance("Got it. " + transcript);
        confirm.rate = 1.15;
        window.speechSynthesis.speak(confirm);
      } else {
        const retry = new SpeechSynthesisUtterance("Sorry, I did not catch that. Please enter the date manually.");
        retry.rate = 1.0;
        window.speechSynthesis.speak(retry);
      }
      setVoiceListening(false);
      setVoicePromptDone(true);
    };
    recognition.onerror = () => { setVoiceListening(false); setVoicePromptDone(true); };
    recognition.onend = () => { setVoiceListening(false); setVoicePromptDone(true); };
    recognition.start();
  };
  const handleSmartError = (msg) => { setSmartError(msg); setSmartResult(null); };
  const resetSmartScanner = () => { setSmartResult(null); setSmartError(""); setSmartLocation(""); setSmartUseBy(""); setSmartFreezeBy(""); setScanningDate(false); setVoiceListening(false); setVoicePromptDone(false); };
  const handleAddSmartItem = () => {
    if (!smartResult) return;
    const newItem = { id: Date.now().toString(), name: smartResult.name || "Unknown Item", useByDate: smartUseBy || "", openDate: "", category: smartResult.category || "Other", quantity: "1", location: smartLocation || smartResult.location || "Fridge", freezeByDate: smartFreezeBy || "" };
    setTrackedItems(prev => [newItem, ...prev]);
    setShowSmartScanner(false); resetSmartScanner();
  };
  const [voiceListening, setVoiceListening] = useState("");
  const [voicePromptDone, setVoicePromptDone] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const [showReceiptScanner, setShowReceiptScanner] = useState(false);
  const [receiptScanning, setReceiptScanning] = useState(false);
  const [receiptItems, setReceiptItems] = useState([]);
  const [receiptError, setReceiptError] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  useEffect(() => { if (!localStorage.getItem("trackfresh.welcomed")) setShowWelcome(true); }, []);
  useEffect(() => {
    if (trackedItems.length === 0) return;
    const urgent = trackedItems.filter(it => it.daysLeft !== null && it.daysLeft <= 2);
    if (urgent.length > 0) { setAlertItem({ name: urgent[0].name, daysLeft: urgent[0].daysLeft }); setShowAlert(true); }
  }, [trackedItems.length]);

  useEffect(() => {
    setTrackedItems(loadItems());
    setCommunity(loadCommunity());
    setShoppingItems(loadShopping());
    setMeals(loadMeals());
    const savedName = localStorage.getItem(USERNAME_KEY);
    if (savedName) setUsername(savedName);
  }, []);
  useEffect(() => { saveItems(trackedItems); }, [trackedItems]);
  useEffect(() => { saveCommunity(community); }, [community]);
  useEffect(() => { saveShopping(shoppingItems); }, [shoppingItems]);
  useEffect(() => { saveMeals(meals); }, [meals]);

  const handleSetMeal = (day, slot, meal) => {
    setMeals((prev) => ({ ...prev, [`${day}-${slot}`]: meal }));
    setShowMealPicker(false);
    setMealPickerSearch("");
  };

  const handleClearMeal = (day, slot) => {
    setMeals((prev) => { const next = { ...prev }; delete next[`${day}-${slot}`]; return next; });
  };

  const handleAiPlanWeek = async () => {
    setAiPlanLoading(true);
    try {
      const expiringNames = itemsWithCountdown.filter((it) => it.daysLeft !== null && it.daysLeft <= 7).map((it) => it.name).join(", ");
      const allItems = trackedItems.map((it) => it.name).join(", ");
      const res = await fetch("/api/plan-meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expiring: expiringNames, available: allItems })
      });
      const data = await res.json();
      if (data.plan) setMeals(data.plan);
    } catch (err) { console.error(err); }
    setAiPlanLoading(false);
  };

  const handleAddMealIngredientsToShopping = (mealName) => {
    const onList = shoppingItems.some((s) => s.name.toLowerCase() === mealName.toLowerCase());
    if (onList) { window.alert(mealName + " is already on your shopping list!"); return; }
    setShoppingItems((prev) => [...prev, { id: crypto.randomUUID(), name: "Ingredients for: " + mealName, qty: "", checked: false, forMeal: mealName }]);
    setActiveTab("shopping");
  };

  const itemsWithCountdown = useMemo(() => trackedItems.map((it) => ({ ...it, daysLeft: daysUntil(it.useByDate) })), [trackedItems]);

  const filteredItems = useMemo(() => {
    return itemsWithCountdown.filter((it) => {
      const catOk = filterCategory === "All" || (it.category ?? "Other") === filterCategory;
      const locOk = filterLocation === "All" || (it.location ?? "Fridge") === filterLocation;
      return catOk && locOk;
    });
  }, [itemsWithCountdown, filterCategory, filterLocation]);

  const expiringSoon = useMemo(() => {
    return itemsWithCountdown.filter((it) => it.daysLeft !== null && it.daysLeft <= 7);
  }, [itemsWithCountdown]);

  const handleAddItem = () => {
    const name = itemName.trim();
    if (!name) return;
    if (name.toLowerCase().startsWith("alexa:")) {
      const spokenItem = name.replace(/alexa:/i, "").trim();
      const today = new Date();
      const useBy = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
      setTrackedItems((prev) => [...prev, { id: crypto.randomUUID(), name: spokenItem, useByDate: useBy.toISOString().split("T")[0], openDate: today.toISOString().split("T")[0], category: "Other", quantity: labelItem.weight || "", location: "Fridge" }]);
      window.alert("Alexa: Tracking " + spokenItem + " opened today, expires in 30 days.");
      setItemName(""); return;
    }
    if (!useByDate) { window.alert("Please enter a Use By date."); return; }
    const daysLeft = daysUntil(useByDate);
    if (daysLeft !== null && daysLeft <= 3) { setAlertItem({ name, daysLeft }); setShowAlert(true); }
    setTrackedItems((prev) => [...prev, { id: crypto.randomUUID(), name, useByDate, openDate, category, quantity, location }]);
    setItemName(""); setUseByDate(""); setOpenDate(""); setCategory("Other"); setQuantity(""); setLocation("Fridge");
  };

  const handleRemoveItem = (id) => setTrackedItems((prev) => prev.filter((it) => it.id !== id));

  const handleEditItem = (id) => { const item = trackedItems.find(it => it.id === id); if (item) setEditingItem({ ...item }); };
  const handleSaveEdit = () => { if (!editingItem) return; setTrackedItems(prev => prev.map(it => it.id === editingItem.id ? { ...editingItem } : it)); setEditingItem(null); };

  const handleUseTodayItem = (id) => setTrackedItems((prev) => prev.filter((it) => it.id !== id));

  const [recipesLoading, setRecipesLoading] = useState(false);
  const handleSuggestRecipes = async () => {
    if (trackedItems.length === 0) { window.alert("Add some food items first!"); return; }
    setRecipesLoading(true);
    setRecipesGenerated(false);
    setRecipeSuggestions([]);
    setExpandedRecipe(null);
    try {
      const res = await fetch("/api/suggest-recipes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: trackedItems.map(it => ({ name: it.name, daysLeft: it.daysLeft, category: it.category, location: it.location })) }) });
      const data = await res.json();
      if (data.error) { window.alert("Recipe error: " + data.error); setRecipesLoading(false); return; }
      setRecipeSuggestions(data.recipes || []);
      setRecipesGenerated(true);
    } catch (e) { window.alert("Failed to get recipes. Try again."); }
    setRecipesLoading(false);
  };

  const handleSaveRecipeToCommunity = (recipe) => {
    if (savedRecipes.includes(recipe.name)) return;
    const entry = {
      id: crypto.randomUUID(),
      author: username || "Anonymous",
      title: recipe.name,
      body: recipe.description + "\n\nInstructions:\n" + recipe.instructions + "\n\nCook time: " + recipe.time,
      date: new Date().toLocaleDateString()
    };
    setCommunity((prev) => ({ ...prev, recipes: [entry, ...prev.recipes] }));
    setSavedRecipes((prev) => [...prev, recipe.name]);
  };

  const handleAddShoppingItem = () => {
    const name = newShoppingItem.trim();
    if (!name) return;
    setShoppingItems((prev) => [...prev, { id: crypto.randomUUID(), name, qty: newShoppingQty.trim(), checked: false }]);
    setNewShoppingItem(""); setNewShoppingQty("");
  };

  const handleToggleShoppingItem = (id) => setShoppingItems((prev) => prev.map((it) => it.id === id ? { ...it, checked: !it.checked } : it));
  const handleRemoveShoppingItem = (id) => setShoppingItems((prev) => prev.filter((it) => it.id !== id));
  const handleClearChecked = () => setShoppingItems((prev) => prev.filter((it) => !it.checked));
  const handleAddToShoppingFromTracker = (item) => {
    const already = shoppingItems.some((s) => s.name.toLowerCase() === item.name.toLowerCase());
    if (already) return;
    setShoppingItems((prev) => [...prev, { id: crypto.randomUUID(), name: item.name, qty: "", checked: false }]);
  };

  const handleScanReceipt = async (file) => {
    setReceiptScanning(true);
    setReceiptError("");
    setReceiptItems([]);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target.result.split(",")[1];
        const mediaType = file.type;
        const res = await fetch("/api/scan-receipt", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image: base64, mimeType: mediaType }) });
        const data = await res.json();
        if (data.error) { setReceiptError(data.error); setReceiptScanning(false); return; }
        setReceiptItems(data.items);
        setSelectedReceiptItems(data.items.map((_, i) => i));
        setReceiptScanning(false);
      };
      reader.readAsDataURL(file);
    } catch (err) { setReceiptError(err.message); setReceiptScanning(false); }
  };

  const handleBarcodeDetected = async (barcode) => {
    if (barcodeDetected === barcode || barcodeScanning) return;
    const alreadyTracked = trackedItems.find((it) => it.barcode === barcode);
    if (alreadyTracked) { setBarcodeError("⚠️ " + alreadyTracked.name + " was already scanned and is in your tracker!"); return; }
    setBarcodeDetected(barcode);
    setBarcodeScanning(true);
    setBarcodeError("");
    try {
      const res = await fetch("/api/scan-barcode", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ barcode }) });
      const data = await res.json();
      if (data.error) { setBarcodeError("Barcode: " + barcode + " — not found in database. Try a different product."); setBarcodeScanning(false); setBarcodeDetected(""); return; }
      setBarcodeItem({ ...data.item, barcode });
      setBarcodeScanning(false);
} catch (err) { setBarcodeError("Scan failed. Please try again."); setBarcodeScanning(false); setBarcodeDetected(""); }
  };

  const handleAddBarcodeItem = () => {
    if (!barcodeItem) return;
    const loc = barcodeLocation || barcodeItem.location;
    const today = new Date().toISOString().split("T")[0];
    setTrackedItems((prev) => [...prev, { id: crypto.randomUUID(), name: barcodeItem.name, category: barcodeItem.category, location: loc, quantity: "", useByDate: barcodeUseBy, openDate: today, freezeBy: barcodeFreezeBy, barcode: barcodeItem.barcode || "", daysAfterOpening: barcodeItem.daysAfterOpening || null, storageTip: barcodeItem.storageTip || "", openedTip: barcodeItem.openedTip || "" }]);
    setShowBarcodeScanner(false);
    setBarcodeItem(null);
    setBarcodeDetected("");
    setBarcodeLocation("");
    setBarcodeUseBy("");
    setBarcodeFreezeBy("");
    setVoiceError("");
  };

  const parseSpokenDate = (transcript) => {
    const months = { january:1, february:2, march:3, april:4, may:5, june:6, july:7, august:8, september:9, october:10, november:11, december:12, jan:1, feb:2, mar:3, apr:4, jun:6, jul:7, aug:8, sep:9, oct:10, nov:11, dec:12 };
    const t = transcript.toLowerCase().trim();
    const match = t.match(/([a-z]+)\s+(\d{1,2})\s*,?\s*(\d{4})/);
    if (match) {
      const month = months[match[1]];
      if (month) {
        const d = new Date(parseInt(match[3]), month - 1, parseInt(match[2]));
        return d.toISOString().split("T")[0];
      }
    }
    const match2 = t.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
    if (match2) {
      const yr = match2[3].length === 2 ? "20" + match2[3] : match2[3];
      const d = new Date(parseInt(yr), parseInt(match2[1]) - 1, parseInt(match2[2]));
      return d.toISOString().split("T")[0];
    }
    return null;
  };

  const handleVoiceDate = (field) => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setVoiceError("Voice not supported on this browser. Please type the date.");
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setVoiceListening(field);
    setVoiceError("");
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      const parsed = parseSpokenDate(transcript);
      if (parsed) {
        if (field === "useBy") setBarcodeUseBy(parsed);
        if (field === "freezeBy") setBarcodeFreezeBy(parsed);
        setVoiceListening("");
      } else {
        setVoiceError("Could not understand date. Try saying: February 20 2026");
        setVoiceListening("");
      }
    };
    recognition.onerror = () => { setVoiceError("Could not hear you. Please try again."); setVoiceListening(""); };
    recognition.onend = () => setVoiceListening("");
    recognition.start();
  };

  const handleFreezeItem = (id) => {
    setTrackedItems((prev) => prev.map((it) => {
      if (it.id !== id) return it;
      const newUseBy = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      return { ...it, location: "Freezer", useByDate: newUseBy };
    }));
  };

  const handleQuickVoice = (field) => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setQuickVoiceError("Voice not supported on this browser.");
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setQuickVoiceListening(field);
    setQuickVoiceError("");
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      if (field === "qty") {
        setQuickAddQty(transcript);
        setQuickVoiceListening("");
      } else {
        const parsed = parseSpokenDate(transcript);
        if (parsed) {
          setQuickAddDate(parsed);
          setQuickVoiceListening("");
        } else {
          setQuickVoiceError("Could not understand date. Try: February 20 2026");
          setQuickVoiceListening("");
        }
      }
    };
    recognition.onerror = () => { setQuickVoiceError("Could not hear you. Please try again."); setQuickVoiceListening(""); };
    recognition.onend = () => setQuickVoiceListening("");
    recognition.start();
  };

  const handleQuickAdd = async () => {
    if (!quickAddName.trim()) return;
    let foodInfo = {};
    try {
      const res = await fetch("/api/food-info", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: quickAddName }) });
      if (res.ok) foodInfo = await res.json();
    } catch (e) { console.log("Food info fetch failed, using defaults"); }
    const today = new Date();
    const useBy = quickAddDate || (foodInfo.daysSealed ? new Date(today.getTime() + foodInfo.daysSealed * 86400000).toISOString().split("T")[0] : "");
    const cat = quickAddCategory !== "Other" ? quickAddCategory : (foodInfo.category || quickAddCategory);
    const loc = quickAddLocation !== "Fridge" ? quickAddLocation : (foodInfo.location || quickAddLocation);
    setTrackedItems((prev) => [...prev, { id: crypto.randomUUID(), name: quickAddName, category: cat, location: loc, quantity: quickAddQty, useByDate: useBy, openDate: today.toISOString().split("T")[0], daysAfterOpening: foodInfo.daysAfterOpening || null, storageTip: foodInfo.storageTip || "", openedTip: foodInfo.openedTip || "" }]);
    setShowQuickAdd(false);
    setQuickAddName(""); setQuickAddDate(""); setQuickAddQty(""); setQuickAddCategory("Other"); setQuickAddLocation("Fridge");
  };

  const handleScanLabel = async (file) => {
    setLabelScanning(true);
    setLabelError("");
    setLabelItem(null);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target.result.split(",")[1];
        const mediaType = file.type;
        const res = await fetch("/api/scan-label", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image: base64, mimeType: mediaType }) });
        const data = await res.json();
        if (data.error) { setLabelError(data.error); setLabelScanning(false); return; }
        
        const item = data.item;
        setLabelItem(item);
        
        if (!item.dateFound) {
          setLabelError("📅 No expiration date visible. Flip package over and scan the other side!");
        }
        
        setLabelScanning(false);
      };
      reader.readAsDataURL(file);
    } catch (err) { setLabelError(err.message); setLabelScanning(false); }
  };

  const handleAddLabelItem = () => {
    if (!labelItem) return;
    const quantity = labelItem.weight || "";
    setTrackedItems((prev) => [...prev, { 
      id: crypto.randomUUID(), 
      name: labelItem.name, 
      category: labelItem.category, 
      location: labelItem.location, 
      quantity: quantity,
      useByDate: labelItem.date || "", 
      openDate: new Date().toISOString().split("T")[0], 
      daysAfterOpening: labelItem.daysAfterOpening || null,
      storageTip: labelItem.storageTip || "",
      openedTip: labelItem.openedTip || ""
    }]);
    setShowLabelScanner(false);
    setLabelItem(null);
    setLabelError("");
  };

  const handleAddReceiptItems = () => {
    const toAdd = receiptItems.filter((_, i) => selectedReceiptItems.includes(i));
    const today = new Date();
    setTrackedItems((prev) => [...prev, ...toAdd.map((it) => {
      const days = it.daysSealed || 7;
      const useBy = new Date(today.getTime() + days * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      return { id: crypto.randomUUID(), name: it.name, category: it.category, location: it.location, quantity: "", useByDate: useBy, openDate: today.toISOString().split("T")[0], daysAfterOpening: it.daysAfterOpening || null, storageTip: it.storageTip || "", openedTip: it.openedTip || "" };
    })]);
    setShowReceiptScanner(false);
    setReceiptItems([]);
    setSelectedReceiptItems([]);
  };

  const handleSetUsername = () => { const n = usernameInput.trim(); if (!n) return; setUsername(n); localStorage.setItem(USERNAME_KEY, n); setUsernameInput(""); };
  const handlePostRecipe = () => { if (!newRecipeTitle.trim() || !newRecipeBody.trim()) return; setCommunity((prev) => ({ ...prev, recipes: [{ id: crypto.randomUUID(), author: username, title: newRecipeTitle.trim(), body: newRecipeBody.trim(), date: new Date().toLocaleDateString() }, ...prev.recipes] })); setNewRecipeTitle(""); setNewRecipeBody(""); };
  const handlePostTip = () => { if (!newTip.trim()) return; setCommunity((prev) => ({ ...prev, tips: [{ id: crypto.randomUUID(), author: username, text: newTip.trim(), date: new Date().toLocaleDateString() }, ...prev.tips] })); setNewTip(""); };
  const handlePostChat = () => { if (!newChat.trim()) return; setCommunity((prev) => ({ ...prev, chat: [...prev.chat, { id: crypto.randomUUID(), author: username, text: newChat.trim(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }] })); setNewChat(""); };

      if (showMarketing) return <MarketingPage onLaunchApp={handleLaunchApp} lang={lang} onChangeLang={changeLang} />;
  if (isUnlocked === false) return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{backgroundColor: "#faf7f2"}}>
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
        <div className="text-4xl mb-3">🥦</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">FreshTrack<span className="text-green-600">.ai</span></h1>
        <p className="text-sm text-gray-500 mb-1">{t("betaTesting")}</p>
        <p className="text-xs text-gray-400 mb-4">{t("enterAccessCode")}</p>
        <div className="mb-5"><p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">\ud83c\udf10 Language / Idioma</p><div className="flex justify-center gap-3"><button onClick={() => changeLang("en")} className={`rounded-xl px-6 py-3 text-base font-bold border-2 transition-all shadow-md ${lang === "en" ? "border-green-600 bg-green-500 text-white" : "border-gray-300 bg-white text-gray-600"}`}>\ud83c\uddfa\ud83c\uddf8 English</button><button onClick={() => changeLang("es")} className={`rounded-xl px-6 py-3 text-base font-bold border-2 transition-all shadow-md ${lang === "es" ? "border-green-600 bg-green-500 text-white" : "border-gray-300 bg-white text-gray-600"}`}>\ud83c\uddf2\ud83c\uddfd Espa\u00f1ol</button></div></div>
        <input type="password" value={pwInput} onChange={(e) => { setPwInput(e.target.value); setPwError(false); }} onKeyDown={(e) => e.key === "Enter" && handlePwSubmit()} placeholder="Access Code" className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-center text-lg text-gray-800 mb-3 focus:border-green-500 focus:outline-none" />
        {pwError && <p className="text-red-500 text-sm mb-3">{t("invalidCode")}</p>}
        <button onClick={handlePwSubmit} className="w-full rounded-xl py-3 text-white font-bold text-lg btn-green-3d">{t("enterBeta")}</button>
        <p className="text-xs text-gray-400 mt-4">{t("contactFreddie")}</p>
      </div>
    </div>
  );

    return (
    <>{showWelcome && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl animate-[fadeIn_0.4s_ease]">
          <div className="text-5xl mb-3">🥦</div>
          <h2 className="text-2xl font-bold text-green-700 mb-1">{t("welcomeTitle")}</h2>
          <p className="text-gray-500 text-sm mb-3">{t("welcomeDesc")}</p>
          <div className="mb-5"><p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">\ud83c\udf10 Language / Idioma</p><div className="flex justify-center gap-3"><button onClick={() => changeLang("en")} className={`rounded-xl px-6 py-3 text-base font-bold border-2 transition-all shadow-md ${lang === "en" ? "border-green-600 bg-green-500 text-white" : "border-gray-300 bg-white text-gray-600"}`}>\ud83c\uddfa\ud83c\uddf8 English</button><button onClick={() => changeLang("es")} className={`rounded-xl px-6 py-3 text-base font-bold border-2 transition-all shadow-md ${lang === "es" ? "border-green-600 bg-green-500 text-white" : "border-gray-300 bg-white text-gray-600"}`}>\ud83c\uddf2\ud83c\uddfd Espa\u00f1ol</button></div></div>
          <div className="text-left bg-green-50 rounded-xl p-4 mb-4 space-y-2">
            <div className="flex items-center gap-2 text-sm"><span>📸</span><span className="text-gray-700">{t("welcomeF1")}</span></div>
            <div className="flex items-center gap-2 text-sm"><span>⏰</span><span className="text-gray-700">{t("welcomeF2")}</span></div>
            <div className="flex items-center gap-2 text-sm"><span>🎤</span><span className="text-gray-700">{t("welcomeF3")}</span></div>
            <div className="flex items-center gap-2 text-sm"><span>🛒</span><span className="text-gray-700">{t("welcomeF4")}</span></div>
            <div className="flex items-center gap-2 text-sm"><span>❄️</span><span className="text-gray-700">{t("welcomeF5")}</span></div>
          </div>
          <p className="text-xs text-gray-400 mb-4">{t("welcomeLocal")}</p>
          <button onClick={() => { setShowWelcome(false); localStorage.setItem("trackfresh.welcomed", "true"); }} className="w-full rounded-full py-3 text-lg btn-green-3d">🚀 Get Started</button>
        </div>
      </div>
    )}

    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50/50 to-white p-4"><style dangerouslySetInnerHTML={{__html: GLOBAL_STYLES}} />
      <div className="mx-auto max-w-2xl space-y-4 main-content">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">🥦 TrackFresh</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => changeLang(lang === "en" ? "es" : "en")} className="rounded-full bg-green-500 px-3 py-1.5 text-sm font-bold text-white hover:bg-green-600 transition-all shadow-md">{lang === "en" ? "\ud83c\uddf2\ud83c\uddfd ES" : "\ud83c\uddfa\ud83c\uddf8 EN"}</button>
            <button onClick={() => setShowHelp(true)} className="text-sm font-semibold text-green-700 hover:text-green-600 transition-colors underline decoration-green-300">{t("howToUse")}</button>
          </div>
        </div>



        {showReceiptScanner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-2 text-lg font-bold">📷 Scan Receipt</h2>
              <p className="mb-4 text-sm text-gray-600">{t("scanReceiptDesc")}</p>
              {!receiptScanning && receiptItems.length === 0 && (
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-green-300 bg-gradient-to-b from-green-50 to-green-100 p-6 btn-3d">
                    <span className="text-3xl mb-2">📸</span>
                    <span className="text-sm font-semibold text-green-700">{t("takePhoto")}</span>
                    <span className="text-xs text-gray-500 mt-1">{t("openCamera")}</span>
                    <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => e.target.files[0] && handleScanReceipt(e.target.files[0])} />
                  </label>
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-green-400 bg-green-50 p-6 hover:bg-blue-100 transition-colors">
                    <span className="text-3xl mb-2">🖼️</span>
                    <span className="text-sm font-semibold text-green-700">{t("uploadPhoto")}</span>
                    <span className="text-xs text-gray-500 mt-1">{t("fromGallery")}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && handleScanReceipt(e.target.files[0])} />
                  </label>
                </div>
              )}
              {receiptScanning && (
                <div className="flex flex-col items-center py-8">
                  <div className="mb-3 text-3xl animate-spin">⏳</div>
                  <p className="text-sm text-gray-600">{t("readingReceipt")}</p>
                </div>
              )}
              {receiptError && <p className="mt-2 text-sm text-red-600">Error: {receiptError}</p>}
              {receiptItems.length > 0 && (
                <div>
                  <p className="mb-2 text-sm font-semibold text-gray-700">Found {receiptItems.length} items — select which to add:</p>
                  <div className="max-h-64 overflow-y-auto space-y-2 mb-4">
                    {receiptItems.map((it, i) => (
                      <div key={i} className="rounded-lg border px-3 py-2">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" checked={selectedReceiptItems.includes(i)} onChange={() => setSelectedReceiptItems((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i])} className="h-4 w-4 accent-green-600" />
                          <span className="flex-1 text-sm font-bold">{it.name}</span>
                          <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">{it.location}</span>
                          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{it.category}</span>
                        </div>
                        <div className="ml-7 mt-1 space-y-0.5">
                          <p className="text-xs text-green-700">📦 Sealed: ~{it.daysSealed || 7} days{it.daysAfterOpening ? " · 📂 After opening: ~" + it.daysAfterOpening + " days" : ""}</p>
                          {it.storageTip && <p className="text-xs text-gray-500">💡 {it.storageTip}</p>}
                          {it.openedTip && <p className="text-xs text-orange-600">⚠️ {it.openedTip}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={handleAddReceiptItems} className="w-full rounded-xl py-2.5 text-sm btn-green-3d btn-3d">Add {selectedReceiptItems.length} Items to Tracker</button>
                </div>
              )}
              <button onClick={() => { setShowReceiptScanner(false); setReceiptItems([]); setReceiptError(""); }} className="mt-3 w-full rounded-xl border bg-gradient-to-b from-white to-gray-50 py-2 text-sm font-bold text-gray-600 pill-3d">{t("cancel")}</button>
            </div>
          </div>
        )}

        {showRecallsPanel && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:9999,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={() => setShowRecallsPanel(false)}>
          <div style={{background:"white",borderRadius:"20px 20px 0 0",width:"100%",maxWidth:"500px",maxHeight:"85vh",overflow:"auto",padding:"1.5rem"}} onClick={e => e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}}>
              <h2 style={{fontWeight:800,fontSize:"1.1rem",color:"#991b1b",margin:0}}>&#9888;&#65039; {t("fdaRecallsBanner")}</h2>
              <button onClick={() => setShowRecallsPanel(false)} style={{background:"#f3f4f6",border:"none",borderRadius:"50%",width:"32px",height:"32px",fontSize:"1.1rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>&#10005;</button>
            </div>
            {fdaLoading && <p style={{textAlign:"center",color:"#6b7280",padding:"2rem 0"}}>{t("fdaLoading")}</p>}
            {fdaRecalls.length === 0 && !fdaLoading && <p style={{textAlign:"center",color:"#6b7280",padding:"2rem 0"}}>{t("fdaError")}</p>}
            <div style={{display:"flex",flexDirection:"column",gap:"0.75rem"}}>
              {fdaRecalls.map(recall => (
                <div key={recall.id} style={{background:"white",borderRadius:"12px",padding:"1rem",border:recall.severity === "high" ? "2px solid #fecaca" : recall.severity === "medium" ? "2px solid #fed7aa" : "1px solid #e5e7eb",boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"0.5rem"}}>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:700,fontSize:"0.85rem",color:"#111",lineHeight:1.3}}>{recall.product}</div>
                      <div style={{fontSize:"0.75rem",color:"#6b7280",marginTop:"3px"}}>Brand: {recall.brand}</div>
                      <div style={{fontSize:"0.75rem",color:"#374151",marginTop:"0.3rem"}}>{recall.reason}</div>
                      <div style={{fontSize:"0.65rem",color:"#9ca3af",marginTop:"4px"}}>{recall.date}</div>
                    </div>
                    <span style={{fontSize:"0.6rem",fontWeight:700,padding:"3px 8px",borderRadius:"999px",flexShrink:0,textTransform:"uppercase",background:recall.severity === "high" ? "#fee2e2" : recall.severity === "medium" ? "#ffedd5" : "#f3f4f6",color:recall.severity === "high" ? "#b91c1c" : recall.severity === "medium" ? "#c2410c" : "#374151"}}>{recall.severity === "high" ? t("fdaClassI") : recall.severity === "medium" ? t("fdaClassII") : t("fdaClassIII")}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{marginTop:"1rem",display:"flex",flexDirection:"column",gap:"0.5rem"}}>
              <button onClick={() => window.open("https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts","_blank")} style={{width:"100%",background:"linear-gradient(to bottom,#dc2626,#991b1b)",color:"white",border:"none",borderRadius:"10px",padding:"0.7rem",fontSize:"0.85rem",fontWeight:700,cursor:"pointer"}}>{t("fdaViewAll")} &#8594; FDA.gov</button>
              <button onClick={() => setShowRecallsPanel(false)} style={{width:"100%",background:"#f3f4f6",color:"#374151",border:"none",borderRadius:"10px",padding:"0.7rem",fontSize:"0.85rem",fontWeight:600,cursor:"pointer"}}>{t("fdaClose")}</button>
            </div>
          </div>
        </div>
      )}

      {showHelp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-2 text-lg font-bold">{t("howToUse")}</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>🔹 <strong>Tracker:</strong> AI searches 100+ items. Category and location auto-fill intelligently.</li>
                <li>🔹 Filter by 🧊 {t("help2")}</li>
                <li>🔹 <strong>Recipes:</strong> AI suggests recipes based on what's in your kitchen.</li>
                <li>🔹 <strong>Shopping:</strong> Build your shopping list, check off items as you shop.</li>
                <li>🔹 <strong>Community:</strong> Share recipes, tips, and chat.</li>
                <li>🔹 {t("help6")}</li>
              </ul>
              <button onClick={() => setShowHelp(false)} className="mt-4 rounded-xl px-4 py-2 text-sm btn-green-3d">{t("close")}</button>
            </div>
          </div>
        )}

        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-lg font-bold">✏️ Edit Item</h2>
              <div className="space-y-3">
                <div><label className="mb-1 block text-sm font-medium">{t("nameWord")}</label><input type="text" value={editingItem.name} onChange={(e) => setEditingItem({...editingItem, name: e.target.value})} className="w-full rounded border px-3 py-2 text-sm" /></div>
                <div><label className="mb-1 block text-sm font-medium">{t("useByDate")}</label><input type="date" value={editingItem.useByDate} onChange={(e) => setEditingItem({...editingItem, useByDate: e.target.value})} className="w-full rounded border px-3 py-2 text-sm" /></div>
                <div><label className="mb-1 block text-sm font-medium">Quantity</label><input type="text" value={editingItem.quantity || ""} onChange={(e) => setEditingItem({...editingItem, quantity: e.target.value})} className="w-full rounded border px-3 py-2 text-sm" /></div>
                <div><label className="mb-1 block text-sm font-medium">Location</label><select value={editingItem.location || "Fridge"} onChange={(e) => setEditingItem({...editingItem, location: e.target.value})} className="w-full rounded border px-3 py-2 text-sm"><option>Fridge</option><option>Freezer</option><option>Pantry</option><option>Counter</option></select></div>
                <div><label className="mb-1 block text-sm font-medium">Category</label><select value={editingItem.category || "Other"} onChange={(e) => setEditingItem({...editingItem, category: e.target.value})} className="w-full rounded border px-3 py-2 text-sm"><option>Dairy</option><option>Meat</option><option>Produce</option><option>Bakery</option><option>Frozen</option><option>Pantry</option><option>Beverages</option><option>Condiments</option><option>Snacks</option><option>Other</option></select></div>
                <div className="flex gap-2 pt-2"><button onClick={handleSaveEdit} className="flex-1 rounded bg-green-500 py-2 text-sm font-semibold text-white">{t("save")}</button><button onClick={() => setEditingItem(null)} className="flex-1 rounded border py-2 text-sm font-semibold text-gray-600">{t("cancel")}</button></div>
              </div>
            </div>
          </div>
        )}
        {showAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
              <div className="mb-3 flex items-center gap-2"><Bell className="h-5 w-5 text-red-500 animate-bounce" /><h2 className="text-lg font-bold text-red-600">{t("expiringSoon")}</h2></div>
              {(() => { const urgent = trackedItems.filter(it => it.daysLeft !== null && it.daysLeft <= 2); return urgent.length > 0 ? (
                <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                  {urgent.map(it => (
                    <div key={it.id} className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-3 py-2">
                      <span className="text-sm font-semibold">{it.name}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${it.daysLeft <= 0 ? "bg-red-600 text-white" : "bg-red-100 text-red-800"}`}>{it.daysLeft <= 0 ? "EXPIRED" : it.daysLeft + " day" + (it.daysLeft === 1 ? "" : "s") + " left"}</span>
                    </div>
                  ))}
                </div>
              ) : <p className="text-sm text-gray-700 mb-4"><span className="font-semibold">{alertItem.name}</span> expires in <span className="font-semibold">{alertItem.daysLeft}</span> day{alertItem.daysLeft === 1 ? "" : "s"}.</p>; })()}
              <p className="text-xs text-gray-500 mb-3">{t("useItemsSoon")}</p>
              <div className="flex gap-2">
                <button onClick={() => setShowAlert(false)} className="flex-1 rounded-lg bg-gradient-to-b from-red-500 to-red-600 py-2 text-sm font-bold text-white btn-3d">{t("gotIt")}</button>
                <button onClick={() => { setShowAlert(false); setActiveTab("recipes"); }} className="flex-1 rounded-lg border border-red-300 bg-gradient-to-b from-white to-red-50 py-2 text-sm font-bold text-red-600 pill-3d">{t("findRecipes")}</button>
              </div>
            </div>
          </div>
        )}

        {showSmartScanner && (
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
            <div style={{background:"white",borderRadius:"20px",width:"100%",maxWidth:"440px",maxHeight:"90vh",overflow:"auto",padding:"1.25rem"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.75rem"}}>
                <h2 className="text-lg font-bold">{t("smartScanTitle")}</h2>
                <button onClick={() => { setShowSmartScanner(false); resetSmartScanner(); }} style={{background:"#f3f4f6",border:"none",borderRadius:"50%",width:"32px",height:"32px",fontSize:"1.1rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>&times;</button>
              </div>
              <p className="text-sm text-gray-500 mb-3">{t("smartScanDesc")}</p>
              {!smartResult && !smartError && (<div>
                <SmartScanner onResult={handleSmartResult} onError={handleSmartError} captureRef={smartCaptureRef} />
                <button onClick={async () => {
                  try {
                    const video = document.querySelector("#smartScannerVideo");
                    if (!video || !video.srcObject) { handleSmartError("Camera not ready"); return; }
                    const track = video.srcObject.getVideoTracks()[0];
                    if (typeof ImageCapture !== "undefined") {
                      const capture = new ImageCapture(track);
                      const blob = await capture.takePhoto();
                      const reader = new FileReader();
                      reader.onload = async () => {
                        const base64 = reader.result.split(",")[1];
                        try {
                          const res = await fetch("/api/scan-label", {
                            method: "POST", headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ imageData: base64, mediaType: "image/jpeg" })
                          });
                          const data = await res.json();
                          if (data.item && data.item.name) { handleSmartResult({ ...data.item, source: "label" }); }
                          else { handleSmartError(data.error || "Could not read label. Try again."); }
                        } catch (err) { handleSmartError("Scan failed: " + err.message); }
                      };
                      reader.readAsDataURL(blob);
                    } else {
                      const canvas = document.createElement("canvas");
                      canvas.width = video.videoWidth || 1280;
                      canvas.height = video.videoHeight || 720;
                      canvas.getContext("2d").drawImage(video, 0, 0);
                      const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
                      const base64 = dataUrl.split(",")[1];
                      try {
                        const res = await fetch("/api/scan-label", {
                          method: "POST", headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ imageData: base64, mediaType: "image/jpeg" })
                        });
                        const data = await res.json();
                        if (data.item && data.item.name) { handleSmartResult({ ...data.item, source: "label" }); }
                        else { handleSmartError(data.error || "Could not read label. Try again."); }
                      } catch (err) { handleSmartError("Scan failed: " + err.message); }
                    }
                  } catch (err) { handleSmartError("Capture failed: " + err.message); }
                }} className="w-full rounded-xl py-3 text-sm font-bold mt-3 btn-green-3d">📸 Take Photo</button>
              </div>)}
              {smartError && (<div className="text-center py-6"><p className="text-sm text-red-600 mb-3">{smartError}</p><button onClick={resetSmartScanner} className="rounded-xl px-6 py-2 text-sm font-bold btn-green-3d">{t("smartScanRetry")}</button></div>)}
              {smartResult && (<div className="mt-3">
                <div style={{background:"#f0fdf4",borderRadius:"12px",padding:"1rem",border:"1px solid #bbf7d0",marginBottom:"0.75rem"}}>
                  <p className="text-xs font-bold text-green-700 mb-1">{t("smartScanFound")}</p>
                  <p className="text-lg font-bold text-gray-900">{smartResult.name}</p>
                  {smartResult.source === "barcode" && <p className="text-xs text-gray-500 mt-1">Via barcode</p>}
                  {smartResult.source === "label" && <p className="text-xs text-gray-500 mt-1">Via AI label scan</p>}
                  {smartResult.category && <p className="text-xs text-gray-500">Category: {smartResult.category}</p>}
                  {smartResult.storageTip && <p className="text-xs text-green-600 mt-1">{smartResult.storageTip}</p>}
                </div>
                <div className="mb-3">
                  <p className="text-xs font-bold text-gray-700 mb-2">{t("smartScanWhere")}</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => { setSmartLocation("Fridge"); setSmartFreezeBy(""); }} className={`rounded-lg border-2 py-3 text-sm font-semibold ${smartLocation === "Fridge" ? "border-green-500 bg-green-50 text-green-700 pill-3d-active" : "border-gray-200 text-gray-600 pill-3d"}`}>Fridge</button>
                    <button onClick={() => { setSmartLocation("Freezer"); }} className={`rounded-lg border-2 py-3 text-sm font-semibold ${smartLocation === "Freezer" ? "border-cyan-500 bg-cyan-50 text-cyan-700 pill-3d-active" : "border-gray-200 text-gray-600 pill-3d"}`}>Freezer</button>
                    <button onClick={() => { setSmartLocation("Pantry"); setSmartFreezeBy(""); }} className={`rounded-lg border-2 py-3 text-sm font-semibold ${smartLocation === "Pantry" ? "border-amber-500 bg-amber-50 text-amber-700 pill-3d-active" : "border-gray-200 text-gray-600 pill-3d"}`}>Pantry</button>
                  </div>
                </div>
                <div className="mb-3">
                  <p className="text-xs font-bold text-gray-700 mb-1">Use By Date</p>
                  {voiceListening && (<div style={{background:"#fff7ed",borderRadius:"12px",padding:"1rem",border:"2px solid #fb923c",textAlign:"center",marginBottom:"0.75rem"}}>
                    <p className="text-2xl mb-2">🎙️</p>
                    <p className="text-sm font-bold text-orange-700">Listening for expiration date...</p>
                    <p className="text-xs text-orange-500 mt-1">Say something like March 15, 2026</p>
                  </div>)}
                  {smartResult.dateFound && smartUseBy ? (<div style={{background:"#ecfdf5",borderRadius:"8px",padding:"0.5rem 0.75rem",border:"1px solid #a7f3d0"}}><p className="text-sm font-bold text-green-800">{smartUseBy}</p><p className="text-xs text-green-600">{t("smartScanDateAuto")}</p></div>) : (<div>
                    <p className="text-xs text-orange-600 mb-2">{t("smartScanNoDate")}</p>
                    <input type="file" accept="image/*" capture="environment" id="smartDateInput" style={{display:"none"}} onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      setScanningDate(true);
                      const reader = new FileReader();
                      reader.onload = async () => {
                        const base64 = reader.result.split(",")[1];
                        try {
                          const res = await fetch("/api/scan-label", {
                            method: "POST", headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ imageData: base64, mediaType: file.type || "image/jpeg" })
                          });
                          const data = await res.json();
                          if (data.item && data.item.date && data.item.dateFound) {
                            setSmartUseBy(data.item.date);
                            setSmartResult(prev => ({...prev, dateFound: true, date: data.item.date}));
                          }
                        } catch (err) { console.error("Date scan error:", err); }
                        setScanningDate(false);
                      };
                      reader.readAsDataURL(file);
                      e.target.value = "";
                    }} />
                    {scanningDate ? (
                      <p className="text-sm text-center text-orange-600 font-bold py-2">{t("smartScanDateReading")}</p>
                    ) : (<>
                      <button onClick={() => document.getElementById("smartDateInput").click()} className="w-full rounded-xl py-2.5 text-sm font-bold bg-gradient-to-b from-orange-400 to-orange-500 text-white mb-2" style={{border:"none",cursor:"pointer"}}>{t("smartScanDate")}</button>
                    <button onClick={() => startVoiceDatePrompt(smartResult.name)} className="w-full rounded-xl py-2 text-sm font-bold bg-gradient-to-b from-blue-400 to-blue-500 text-white mt-2" style={{border:"none",cursor:"pointer"}}>🎙️ Say Date by Voice</button>
                    </>)}
                    <input type="date" value={smartUseBy} onChange={e => setSmartUseBy(e.target.value)} className="w-full rounded border px-3 py-2 text-sm" />
                  </div>)}
                </div>
                {smartLocation === "Freezer" && (<div className="mb-3"><p className="text-xs font-bold text-gray-700 mb-1">Freeze By</p><input type="date" value={smartFreezeBy} onChange={e => setSmartFreezeBy(e.target.value)} className="w-full rounded border px-3 py-2 text-sm" /></div>)}
                <button onClick={handleAddSmartItem} disabled={!smartLocation} className={`w-full rounded-xl py-3 text-sm font-bold mt-2 ${!smartLocation ? "bg-gray-300 text-white" : "btn-green-3d"}`}>{t("addToTracker")}</button>
                <button onClick={resetSmartScanner} className="w-full rounded-xl border bg-white py-2 text-sm font-bold text-gray-600 mt-2 pill-3d">{t("smartScanRetry")}</button>
                <button onClick={() => { setShowSmartScanner(false); resetSmartScanner(); }} className="w-full rounded-xl border bg-white py-2 text-sm font-bold text-gray-600 mt-2 pill-3d">{t("cancel")}</button>
              </div>)}
            </div>
          </div>
        )}

        {showBarcodeScanner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-2 text-lg font-bold">📦 Scan Barcode</h2>
              <p className="mb-4 text-sm text-gray-600">{t("scanBarcodeDesc")}</p>
              {!barcodeItem && (
                <BarcodeScanner key={barcodeScanKey} onDetected={handleBarcodeDetected} />
              )}
              {barcodeScanning && (
                <div className="flex flex-col items-center py-4">
                  <div className="mb-3 text-3xl animate-spin">⏳</div>
                  <p className="text-sm text-gray-600">{t("lookingUp")}</p>
                </div>
              )}
              {barcodeError && (
                <div className="mt-2 rounded-lg bg-red-50 p-3">
                  <p className="text-sm text-red-600">{barcodeError}</p>
<button onClick={() => { setBarcodeError(""); setBarcodeDetected(""); setBarcodeItem(null); setBarcodeScanning(false); setShowBarcodeScanner(false); setTimeout(() => setShowBarcodeScanner(true), 1000); }} className="mt-2 text-xs text-green-700 underline">{t("tryAgain")}</button>
                </div>
              )}
              {barcodeItem && (
                <div className="space-y-3">
                  <div className="rounded-lg border p-3 bg-green-50">
                    <p className="text-xs text-green-600 font-semibold mb-1">✅ Product found!</p>
                    <p className="font-bold text-gray-800">{barcodeItem.name}</p>
                    <p className="text-xs text-gray-500">{barcodeItem.category}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">{t("whereStoring")}</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => { setBarcodeLocation("Fridge"); setBarcodeFreezeBy(""); }} className={`rounded-lg border-2 py-3 text-sm font-semibold transition-colors ${barcodeLocation === "Fridge" ? "border-green-500 bg-gradient-to-b from-green-50 to-green-100 text-green-700 pill-3d-active" : "border-gray-200 text-gray-600 pill-3d"}`}>🧊 Fridge{barcodeLocation === "Fridge" && <p className="text-xs font-normal mt-1">Use fresh</p>}</button>
                      <button onClick={() => setBarcodeLocation("Freezer")} className={`rounded-lg border-2 py-3 text-sm font-semibold transition-colors ${barcodeLocation === "Freezer" ? "border-cyan-500 bg-gradient-to-b from-cyan-50 to-cyan-100 text-cyan-700 pill-3d-active" : "border-gray-200 text-gray-600 pill-3d"}`}>❄️ Freezer{barcodeLocation === "Freezer" && <p className="text-xs font-normal mt-1">Long term storage</p>}</button>
                    </div>
                  </div>
                  {barcodeLocation && (
                    <div className="space-y-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">{barcodeLocation === "Freezer" ? "Freeze By Date" : "Use By Date"}</label>
                        <div className="flex gap-2">
                          <input type="date" value={barcodeUseBy} onChange={(e) => setBarcodeUseBy(e.target.value)} className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                          <button onClick={() => handleVoiceDate("useBy")} className={`rounded px-3 py-2 text-sm font-semibold ${voiceListening === "useBy" ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 text-gray-800"}`}>{voiceListening === "useBy" ? "🎤 Listening..." : "🎤"}</button>
                        </div>
                        {voiceListening === "useBy" && <p className="text-xs text-green-700 mt-1">Say the date e.g. February 20 2026</p>}
                      </div>
                      {barcodeLocation === "Fridge" && barcodeItem.category === "Meat" && (
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">Freeze By Date <span className="text-xs text-gray-400">(optional — we will remind you)</span></label>
                          <div className="flex gap-2">
                            <input type="date" value={barcodeFreezeBy} onChange={(e) => setBarcodeFreezeBy(e.target.value)} className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                            <button onClick={() => handleVoiceDate("freezeBy")} className={`rounded px-3 py-2 text-sm font-semibold ${voiceListening === "freezeBy" ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 text-gray-800"}`}>{voiceListening === "freezeBy" ? "🎤 Listening..." : "🎤"}</button>
                          </div>
                          {voiceListening === "freezeBy" && <p className="text-xs text-green-700 mt-1">Say the date e.g. February 25 2026</p>}
                        </div>
                      )}
                      {voiceError && <p className="text-xs text-red-500">{voiceError}</p>}
                    </div>
                  )}
                  <button onClick={handleAddBarcodeItem} disabled={!barcodeLocation} className={`w-full rounded-xl py-2.5 text-sm font-bold ${!barcodeLocation ? "bg-gray-300 text-white" : "btn-green-3d"}`}>{t("addToTracker")}</button>
                  <button onClick={() => { setBarcodeItem(null); setBarcodeDetected(""); setBarcodeLocation(""); setBarcodeUseBy(""); setBarcodeFreezeBy(""); setVoiceError(""); }} className="w-full rounded-xl border bg-gradient-to-b from-white to-gray-50 py-2 text-sm font-bold text-gray-600 pill-3d">{t("scanAnother")}</button>
                </div>
              )}
              <button onClick={() => { setShowBarcodeScanner(false); setBarcodeItem(null); setBarcodeError(""); setBarcodeDetected(""); }} className="mt-3 w-full rounded-xl border bg-gradient-to-b from-white to-gray-50 py-2 text-sm font-bold text-gray-600 pill-3d">{t("cancel")}</button>
            </div>
          </div>
        )}

        {showQuickAdd && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-2 text-lg font-bold">✏️ Quick Add</h2>
              <p className="mb-4 text-sm text-gray-600">{t("quickAddTitleDesc")}</p>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">{t("foodItem")}</label>
                  <FoodAutocomplete lang={lang}
                    value={quickAddName}
                    onChange={setQuickAddName}
                    onSelect={(f) => { setQuickAddName(f.name); setQuickAddCategory(f.category); setQuickAddLocation(f.location); }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">{t("category")}</label>
                    <select value={quickAddCategory} onChange={(e) => setQuickAddCategory(e.target.value)} className="w-full rounded border px-3 py-2 text-sm text-gray-900">
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">{t("locationWord")}</label>
                    <select value={quickAddLocation} onChange={(e) => setQuickAddLocation(e.target.value)} className="w-full rounded border px-3 py-2 text-sm text-gray-900">
                      {LOCATIONS.map((l) => <option key={l} value={l}>{LOCATION_ICONS[l]} {l}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">{t("quantity")}</label>
                  <div className="flex gap-2">
                    <input value={quickAddQty} onChange={(e) => setQuickAddQty(e.target.value)} placeholder="e.g. 2 lbs" className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                    <button onClick={() => handleQuickVoice("qty")} className={`rounded px-3 py-2 text-sm font-semibold ${quickVoiceListening === "qty" ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 text-gray-800"}`}>{quickVoiceListening === "qty" ? "🎤 Listening..." : "🎤"}</button>
                  </div>
                  {quickVoiceListening === "qty" && <p className="text-xs text-green-700 mt-1">Say quantity e.g. two pounds</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Use By Date</label>
                  <div className="flex gap-2">
                    <input type="date" value={quickAddDate} onChange={(e) => setQuickAddDate(e.target.value)} className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                    <button onClick={() => handleQuickVoice("date")} className={`rounded px-3 py-2 text-sm font-semibold ${quickVoiceListening === "date" ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 text-gray-800"}`}>{quickVoiceListening === "date" ? "🎤 Listening..." : "🎤"}</button>
                  </div>
                  {quickVoiceListening === "date" && <p className="text-xs text-green-700 mt-1">Say date e.g. February 20 2026</p>}
                  {quickVoiceError && <p className="text-xs text-red-500 mt-1">{quickVoiceError}</p>}
                </div>
                <button onClick={handleQuickAdd} className="w-full rounded-xl py-2.5 text-sm btn-green-3d">Add to Tracker</button>
                <button onClick={() => { setShowQuickAdd(false); setQuickAddName(""); setQuickAddDate(""); setQuickAddQty(""); setQuickAddCategory("Other"); setQuickAddLocation("Fridge"); }} className="w-full rounded border py-2 text-sm font-semibold text-gray-600">{t("cancel")}</button>
              </div>
            </div>
          </div>
        )}

        {showLabelScanner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-2 text-lg font-bold">🏷️ Scan Package Label</h2>
              <p className="mb-4 text-sm text-gray-600">{t("scanLabelDesc")}</p>
              {!labelScanning && !labelItem && (
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-green-300 bg-green-50 p-8 hover:bg-green-100">
                  <span className="text-3xl mb-2">🏷️</span>
                  <span className="text-sm font-semibold text-green-600">{t("tapUpload")}</span>
                  <span className="text-xs text-gray-500 mt-1">{t("jpgPng")}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && handleScanLabel(e.target.files[0])} />
                </label>
              )}
              {labelScanning && (
                <div className="flex flex-col items-center py-8">
                  <div className="mb-3 text-3xl animate-spin">⏳</div>
                  <p className="text-sm text-gray-600">{t("readingLabel")}</p>
                </div>
              )}
              {labelError && <p className="mt-2 text-sm text-red-600">Error: {labelError}</p>}
              {labelItem && (
                <div className="space-y-3">
                  <div className="rounded-lg border p-3 bg-gray-50">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="font-semibold text-gray-600">Item:</span><p className="font-bold">{labelItem.name}</p></div>
                      <div><span className="font-semibold text-gray-600">Date:</span><p className="font-bold">{labelItem.dateType}: {labelItem.date || "Not found"}</p></div>
                      <div><span className="font-semibold text-gray-600">Category:</span><p>{labelItem.category}</p></div>
                      <div><span className="font-semibold text-gray-600">Location:</span><p>{labelItem.location}</p></div>
                    </div>
                  </div>
                  <button onClick={handleAddLabelItem} className="w-full rounded-xl py-2.5 text-sm btn-green-3d">Add to Tracker</button>
                  <button onClick={() => setLabelItem(null)} className="w-full rounded-xl border bg-gradient-to-b from-white to-gray-50 py-2 text-sm font-bold text-gray-600 pill-3d">Scan Another</button>
                </div>
              )}
              <button onClick={() => { setShowLabelScanner(false); setLabelItem(null); setLabelError(""); }} className="mt-3 w-full rounded-xl border bg-gradient-to-b from-white to-gray-50 py-2 text-sm font-bold text-gray-600 pill-3d">{t("cancel")}</button>
            </div>
          </div>
        )}

        {activeTab === "tracker" && (
          <>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-800">🥦 {t("trackedItemsTitle")}</h2>
              <span className="text-sm text-gray-500">{filteredItems.length} item{filteredItems.length === 1 ? "" : "s"}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button onClick={() => setShowReceiptScanner(true)} className="rounded-xl bg-gradient-to-b from-green-100 to-green-200 py-3 text-xs font-bold text-green-800 btn-3d border border-green-300">📷 Receipt</button>
              <div><input type="file" accept="image/*" capture="environment" id="trackerLabelInput" style={{display:"none"}} onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                setLabelError("");
                setLabelItem(null);
                setShowLabelScanner(true);
                const reader = new FileReader();
                reader.onload = async () => {
                  const base64 = reader.result.split(",")[1];
                  try {
                    const res = await fetch("/api/scan-label", {
                      method: "POST", headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ imageData: base64, mediaType: file.type || "image/jpeg" })
                    });
                    const data = await res.json();
                    if (data.item && data.item.name) {
                      setLabelItem(data.item);
                      if (data.item.name && !data.item.dateFound) {
                        try {
                          const msg = new SpeechSynthesisUtterance("I found " + data.item.name + ". What is the expiration date?");
                          msg.rate = 1.0;
                          msg.onend = () => {
                            const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
                            if (!SR) return;
                            const rec = new SR();
                            rec.lang = lang === "es" ? "es-MX" : "en-US";
                            rec.interimResults = false;
                            rec.onresult = (ev) => {
                              const t = ev.results[0][0].transcript;
                              const parsed = parseSpokenDate(t);
                              if (parsed) {
                                setLabelItem(prev => prev ? {...prev, date: parsed, dateFound: true} : prev);
                                const ok = new SpeechSynthesisUtterance("Got it. " + t);
                                ok.rate = 1.0;
                                window.speechSynthesis.speak(ok);
                              }
                            };
                            rec.start();
                          };
                          window.speechSynthesis.speak(msg);
                        } catch(err) {}
                      }
                    } else {
                      setLabelError(data.error || "Could not read label. Try again.");
                    }
                  } catch (err) { setLabelError("Scan failed: " + err.message); }
                };
                reader.readAsDataURL(file);
                e.target.value = "";
              }} />
              <button onClick={() => document.getElementById("trackerLabelInput").click()} className="rounded-xl bg-gradient-to-b from-orange-100 to-orange-200 py-3 text-xs font-bold text-orange-800 btn-3d border border-orange-300">🏷️ Label</button></div>
              <button onClick={() => setShowSmartScanner(true)} className="rounded-xl bg-gradient-to-b from-orange-100 to-orange-200 py-3 text-xs font-bold text-orange-800 btn-3d border border-orange-300">📦 Barcode</button>
              <button onClick={() => setShowQuickAdd(true)} className="rounded-xl bg-gradient-to-b from-amber-100 to-amber-200 py-3 text-xs font-bold text-amber-800 btn-3d border border-amber-300">✏️ {t("quickAdd")}</button>
            </div>
            <Card>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {trackedItems.length > 0 && <button onClick={() => { if (window.confirm(t("clearAllConfirm"))) { setTrackedItems([]); } }} className="rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">{t("clearAll")}</button>}
                </div>
              </div>
              <div className="mb-2 flex flex-wrap gap-1">
                {["All", ...LOCATIONS].map((l) => (
                  <button key={l} onClick={() => setFilterLocation(l)} className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${filterLocation === l ? "bg-green-700 text-white" : "bg-white text-gray-600 hover:bg-green-50 border border-gray-200 pill-3d"}`}>
                    {l !== "All" ? LOCATION_ICONS[l] + " " : ""}{l}
                  </button>
                ))}
              </div>
              <div className="mb-3 flex flex-wrap gap-1">
                {["All", ...CATEGORIES].map((c) => (
                  <button key={c} onClick={() => setFilterCategory(c)} className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${filterCategory === c ? "bg-green-700 text-white" : "bg-white text-gray-600 hover:bg-green-50 border border-gray-200 pill-3d"}`}>{c}</button>
                ))}
              </div>
              {filteredItems.length === 0 ? (
                <p className="text-sm text-gray-600">{t("noFilter")}</p>
              ) : (
                <div className="space-y-2">
                  {filteredItems.map((it) => {
                    const urgent = it.daysLeft !== null && it.daysLeft <= 3;
                    const soon = it.daysLeft !== null && it.daysLeft <= 7 && it.daysLeft > 3;
                    return (
                      <div key={it.id} className={`rounded-lg border px-3 py-2 ${urgent ? "border-red-300 bg-gradient-to-r from-red-50 to-red-100/50 shadow-sm" : soon ? "border-yellow-300 bg-gradient-to-r from-yellow-50 to-amber-50/50 shadow-sm" : "bg-white shadow-sm hover:shadow-md transition-shadow"}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold">{it.name}</span>
                              {it.quantity && <span className="text-xs text-gray-500">{it.quantity}</span>}
                              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${LOCATION_COLORS[it.location ?? "Fridge"]}`}>{LOCATION_ICONS[it.location ?? "Fridge"]} {it.location ?? "Fridge"}</span>
                              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[it.category ?? "Other"]}`}>{it.category ?? "Other"}</span>
                            </div>
                            <div className="text-xs text-gray-600 mt-0.5">Use by: {it.useByDate}{it.openDate ? " • Opened: " + it.openDate : ""}</div>
                            {it.daysAfterOpening && <div className="text-xs text-orange-600 mt-0.5">📂 After opening: use within {it.daysAfterOpening} days</div>}
                            {it.storageTip && <div className="text-xs text-green-700 mt-0.5">💡 {it.storageTip}</div>}
                            {it.openedTip && <div className="text-xs text-orange-500 mt-0.5">⚠️ {it.openedTip}</div>}
                          </div>
                          <div className="flex items-center gap-2 ml-2">
                            <div className="text-right">
                              <div className={`text-sm font-bold ${urgent ? "text-red-600" : soon ? "text-yellow-600" : "text-gray-800"}`}>{it.daysLeft === null ? "—" : it.daysLeft}</div>
                              <div className="text-xs text-gray-500">{t("days")}</div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <button onClick={() => handleUseTodayItem(it.id)} className="rounded-lg bg-gradient-to-r from-green-600 to-emerald-800 px-3 py-1 text-xs font-bold text-white shadow-md" style={{textShadow:"0 1px 2px rgba(0,0,0,0.4)"}}>{t("used")}</button>
                              {it.category === "Meat" && it.location === "Fridge" && (() => { const fd = it.freezeBy ? daysUntil(it.freezeBy) : null; const ud = it.daysLeft; return (fd !== null && fd <= 2) || (ud !== null && ud <= 3); })() && (
                                <button onClick={() => handleFreezeItem(it.id)} className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-800 px-3 py-1 text-xs font-bold text-white shadow-md animate-pulse" style={{textShadow:"0 1px 2px rgba(0,0,0,0.4)"}}>❄️ Freeze!</button>
                              )}
                              <button onClick={() => handleEditItem(it.id)} className="rounded-lg bg-emerald-700 px-3 py-1 text-xs font-bold text-white btn-3d">{t("edit")}</button>
                              <button onClick={() => handleRemoveItem(it.id)} className="rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 hover:border-red-300 hover:text-red-600 pill-3d">{t("remove")}</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </>
        )}
        {activeTab === "recipes" && (
          <Card>
            <div className="mb-3 flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-orange-500" /><h2 className="text-lg font-bold">{t("recipeSugg")}</h2></div>
            <p className="mb-4 text-sm text-gray-600">{t("recipeIntro")}</p>
            <button onClick={handleSuggestRecipes} disabled={recipesLoading} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg disabled:opacity-50" style={{textShadow:"0 1px 2px rgba(0,0,0,0.4)"}}>{recipesLoading ? <><span className="animate-spin">🤖</span> AI is cooking...</> : <><ChefHat className="h-4 w-4" /> Get AI Recipe Ideas</>}</button>
            {recipesGenerated && recipeSuggestions.length === 0 && <p className="mt-4 text-sm text-gray-500">{t("noMatches")}</p>}
            {recipeSuggestions.length > 0 && (
              <div className="mt-4 space-y-3">
                {recipeSuggestions.map((r, i) => (
                  <div key={i} className="rounded-lg border border-orange-100 bg-orange-50 overflow-hidden">
                    <button onClick={() => setExpandedRecipe(expandedRecipe === i ? null : i)} className="w-full p-4 text-left">
                      <div className="flex items-start justify-between">
                        <h3 className="font-bold text-gray-800">{r.name}</h3>
                        <div className="flex items-center gap-2 ml-2 shrink-0">
                          <span className="rounded bg-orange-200 px-2 py-0.5 text-xs font-semibold text-orange-800">⏱ {r.time}</span>
                          <span className="text-gray-400 text-sm">{expandedRecipe === i ? "▲" : "▼"}</span>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{r.description}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {r.difficulty && <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-bold text-purple-700">{r.difficulty}</span>}
                        {(r.usesExpiring || []).map((name, j) => (
                          <span key={j} className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">⚡ {name}</span>
                        ))}
                      </div>
                    </button>
                    {expandedRecipe === i && (
                      <div className="border-t border-orange-200 bg-white px-4 py-3">
                        {r.ingredients && r.ingredients.length > 0 && (<><h4 className="mb-2 text-sm font-bold text-gray-700">{t("ingredientsWord")}</h4><ul className="mb-3 space-y-1">{r.ingredients.map((ing, j) => <li key={j} className="text-sm text-gray-600 flex items-center gap-1"><span className="text-green-500">•</span> {ing}</li>)}</ul></>)}
                        <h4 className="mb-2 text-sm font-bold text-gray-700">{t("instructionsWord")}</h4>
                        <p className="whitespace-pre-line text-sm text-gray-700 leading-relaxed">{r.instructions}</p>
                        <div className="mt-3 flex justify-end">
                          <button onClick={() => handleSaveRecipeToCommunity(r)} disabled={savedRecipes.includes(r.name)} className={`rounded px-3 py-1.5 text-xs font-semibold ${savedRecipes.includes(r.name) ? "bg-gray-100 text-gray-400" : "bg-green-700 text-white hover:bg-blue-700"}`}>
                            {savedRecipes.includes(r.name) ? "Saved to Community" : "Save to Community"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {!recipesGenerated && <div className="mt-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-500">You have {trackedItems.length} tracked item{trackedItems.length === 1 ? "" : "s"}. Click the button to see recipe matches.{trackedItems.length === 0 && " Add items in the Tracker tab first."}</div>}
          </Card>
        )}

        {activeTab === "shopping" && (
          <>
            <Card>
              <div className="mb-3 flex items-center gap-2">
            
                <ShoppingCart className="h-5 w-5 text-green-600" />
                <h2 className="text-lg font-bold">{t("shoppingList")}</h2>
                {shoppingItems.some((it) => it.checked) && (
                  <button onClick={handleClearChecked} className="ml-auto rounded bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">{t("clearChecked")}</button>
                )}
              </div>
              <div className="flex gap-2 mb-2">
                <input value={newShoppingItem} onChange={(e) => setNewShoppingItem(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddShoppingItem()} placeholder="Add item…" className="rounded-xl px-3 py-2 text-sm btn-green-3d" />
                <input value={newShoppingQty} onChange={(e) => setNewShoppingQty(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddShoppingItem()} placeholder="Qty" className="rounded-xl px-3 py-2 text-sm btn-green-3d" />
                <button onClick={handleAddShoppingItem} className="rounded-xl px-3 py-2 text-sm btn-green-3d">{t("addBtn")}</button>
              </div>
              {shoppingItems.length === 0 ? (
                <p className="text-sm text-gray-500 mt-3">{t("emptyList")}</p>
              ) : (
                <div className="mt-3 space-y-2">
                  {shoppingItems.map((it) => (
                    <div key={it.id} className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${it.checked ? "bg-gray-50 opacity-60" : "bg-white"}`}>
                      <input type="checkbox" checked={it.checked} onChange={() => handleToggleShoppingItem(it.id)} className="h-4 w-4 rounded accent-green-600" />
                      <div className="flex-1">
                        <span className={`text-sm ${it.checked ? "line-through text-gray-400" : "text-gray-800"}`}>{it.name}{it.qty ? " — " + it.qty : ""}</span>
                        {it.forMeal && <div className="mt-0.5"><span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">📅 {it.forMeal}</span></div>}
                      </div>
                      <button onClick={() => handleRemoveShoppingItem(it.id)} className="text-xs text-gray-400 hover:text-red-500">✕</button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
            {expiringSoon.length > 0 && (
              <Card>
                <h3 className="mb-2 font-bold text-gray-700">🔔 Expiring Soon — Add to List?</h3>
                <p className="mb-3 text-xs text-gray-500">These items expire within 7 days. Tap to add a replacement to your shopping list.</p>
                <div className="space-y-2">
                  {expiringSoon.map((it) => {
                    const alreadyAdded = shoppingItems.some((s) => s.name.toLowerCase() === it.name.toLowerCase());
                    const urgent = it.daysLeft !== null && it.daysLeft <= 3;
                    return (
                      <div key={it.id} className={`flex items-center justify-between rounded-lg border px-3 py-2 ${urgent ? "border-red-200 bg-red-50" : "border-yellow-200 bg-yellow-50"}`}>
                        <div>
                          <span className="text-sm font-semibold">{it.name}</span>
                          <span className={`ml-2 text-xs font-bold ${urgent ? "text-red-600" : "text-yellow-600"}`}>{it.daysLeft}d left</span>
                        </div>
                        <button onClick={() => handleAddToShoppingFromTracker(it)} disabled={alreadyAdded} className={`rounded-xl px-3 py-1.5 text-xs font-bold ${alreadyAdded ? "bg-gray-200 text-gray-400" : "btn-green-3d"}`}>
                          {alreadyAdded ? "Added" : "+ Add"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </>
        )}
        {showMealPicker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-1 text-lg font-bold">Pick a Meal</h2>
              <p className="mb-3 text-xs text-gray-500">{mealPickerDay} — {mealPickerSlot}</p>
              <div className="flex gap-2 mb-3">
                <MealSearchInput value={mealPickerSearch} onChange={(e) => setMealPickerSearch(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && mealPickerSearch.trim()) handleSetMeal(mealPickerDay, mealPickerSlot, mealPickerSearch.trim()); }} />
                {mealPickerSearch.trim() && <button onClick={() => handleSetMeal(mealPickerDay, mealPickerSlot, mealPickerSearch.trim())} className="rounded-xl px-3 py-2 text-sm btn-green-3d">Add</button>}
              </div>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {mealPickerSearch && !RECIPE_DB.find((r) => r.name.toLowerCase() === mealPickerSearch.toLowerCase()) && (
                  <button onClick={() => handleSetMeal(mealPickerDay, mealPickerSlot, mealPickerSearch)} className="w-full rounded-xl py-2 text-sm btn-green-3d">+ Add "{mealPickerSearch}" as custom meal</button>
                )}
                {RECIPE_DB.filter((r) => r.name.toLowerCase().includes(mealPickerSearch.toLowerCase())).map((r) => {
                  const usesExpiring = r.ingredients.some((ing) => itemsWithCountdown.some((it) => it.daysLeft !== null && it.daysLeft <= 7 && (it.name.toLowerCase().includes(ing) || ing.includes(it.name.toLowerCase()))));
                  return (
                    <button key={r.name} onClick={() => handleSetMeal(mealPickerDay, mealPickerSlot, r.name)} className="w-full rounded-lg border px-3 py-2 text-left text-sm hover:bg-orange-50">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{r.name}</span>
                        <div className="flex items-center gap-1">
                          {usesExpiring && <span className="text-xs text-orange-500">⚡ uses expiring</span>}
                          <span className="text-xs text-gray-400">⏱ {r.time}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <button onClick={() => { setShowMealPicker(false); setMealPickerSearch(""); }} className="mt-3 w-full rounded-xl border bg-gradient-to-b from-white to-gray-50 py-2 text-sm font-bold text-gray-600 pill-3d">{t("cancel")}</button>
            </div>
          </div>
        )}

        {activeTab === "meals" && (
          <>
            <Card>
              <div className="mb-3 flex items-center justify-between">
            
                <div className="flex items-center gap-2">
                  <span className="text-xl">📅</span>
                  <h2 className="text-lg font-bold">{t("mealPlanner")}</h2>
                </div>
                <button onClick={handleAiPlanWeek} disabled={aiPlanLoading} className={`rounded-xl px-4 py-2 text-xs font-bold text-white shadow-lg ${aiPlanLoading ? "bg-gray-400" : "bg-gradient-to-r from-purple-700 to-indigo-800"}`} style={{textShadow:"0 1px 2px rgba(0,0,0,0.4)"}}>
                  {aiPlanLoading ? <><span className="animate-spin inline-block">🤖</span> AI is planning...</> : "✨ AI Plan My Week"}
                </button>
              </div>
              <p className="text-xs text-gray-500 mb-4">{t("mealDesc")}</p>
              <div className="space-y-4">
                {DAYS.map((day) => (
                  <div key={day} className="rounded-lg border overflow-hidden">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-2 font-bold text-sm text-green-800">{day}</div>
                    <div className="divide-y">
                      {MEAL_SLOTS.map((slot) => {
                        const meal = meals[`${day}-${slot}`];
                        const usesExpiring = meal && itemsWithCountdown.some((it) => it.daysLeft !== null && it.daysLeft <= 7 && meal.toLowerCase().includes(it.name.toLowerCase().split(" ")[0]));
                        return (
                          <div key={slot} className="flex items-center gap-2 px-3 py-2">
                            <span className="w-16 text-xs font-medium text-gray-500">{slot}</span>
                            {meal ? (
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1">
                                    {usesExpiring && <span className="text-orange-400">⚡</span>}
                                    <span className="text-sm font-medium">{meal}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <button onClick={() => handleAddMealIngredientsToShopping(meal)} className="rounded-lg bg-gradient-to-b from-green-100 to-green-200 px-2 py-1 text-xs font-bold text-green-700 pill-3d">+ List</button>
                                    <button onClick={() => { setMealPickerDay(day); setMealPickerSlot(slot); setShowMealPicker(true); }} className="rounded-lg bg-gradient-to-b from-gray-100 to-gray-200 px-2 py-1 text-xs font-semibold text-gray-500 pill-3d">Change</button>
                                    <button onClick={() => handleClearMeal(day, slot)} className="text-xs text-gray-400 hover:text-red-500">✕</button>
                                  </div>
                                </div>

                              </div>
                            ) : (
                              <button onClick={() => { setMealPickerDay(day); setMealPickerSlot(slot); setShowMealPicker(true); }} className="flex-1 rounded-lg py-2 text-xs font-semibold btn-green-3d">+ Add meal</button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {activeTab === "community" && (
          <>
            <button onClick={() => setActiveTab("more")} className="flex items-center gap-1 text-sm font-semibold text-green-700 mb-3"><span>←</span> Back</button>
            
            <div className="stew-scene mb-4" style={{position: "relative", height: "220px", width: "100%", overflow: "hidden"}}>
              <div style={{position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 160, height: 90, background: "linear-gradient(to bottom, #6b7280, #4b5563)", borderRadius: "0 0 40% 40%", borderTop: "8px solid #374151", zIndex: 10}}></div>
              <div style={{position: "absolute", bottom: 82, left: "50%", transform: "translateX(-50%)", width: 180, height: 16, background: "linear-gradient(to bottom, #9ca3af, #6b7280)", borderRadius: 8, zIndex: 11}}></div>
              <div style={{position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 148, height: 50, background: "linear-gradient(to bottom, #ea580c, #c2410c)", borderRadius: "0 0 38% 38%", zIndex: 11}}></div>
              <div style={{position: "absolute", bottom: 55, left: "calc(50% - 95px)", width: 20, height: 30, border: "4px solid #374151", borderRight: "none", borderRadius: "10px 0 0 10px", zIndex: 9}}></div>
              <div style={{position: "absolute", bottom: 55, left: "calc(50% + 75px)", width: 20, height: 30, border: "4px solid #374151", borderLeft: "none", borderRadius: "0 10px 10px 0", zIndex: 9}}></div>
              <div className="steam" style={{left: "calc(50% - 20px)", bottom: 100, animationDelay: "0s"}}>☁️</div>
              <div className="steam" style={{left: "calc(50% + 10px)", bottom: 105, animationDelay: "0.5s"}}>☁️</div>
              <div className="steam" style={{left: "calc(50% - 5px)", bottom: 95, animationDelay: "1s"}}>☁️</div>
              <div className="bubble-pot" style={{left: "calc(50% - 15px)", bottom: 30, animationDelay: "0s"}}></div>
              <div className="bubble-pot" style={{left: "calc(50% + 10px)", bottom: 25, animationDelay: "0.3s"}}></div>
              <div className="bubble-pot" style={{left: "calc(50% - 5px)", bottom: 35, animationDelay: "0.7s"}}></div>
              <CommunityStewAnim />
            </div>
            {!username ? (
              <Card>
                <div className="mb-2 flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" /><h2 className="text-lg font-bold">{t("joinComm")}</h2></div>
                <p className="mb-3 text-sm text-gray-600">{t("chooseName")}</p>
                <div className="flex gap-2">
                  <input value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSetUsername()} placeholder="Your display name" className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                  <button onClick={handleSetUsername} className="rounded-xl px-4 py-2 text-sm btn-green-3d">{t("joinWord")}</button>
                </div>
              </Card>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Signed in as <span className="font-semibold text-green-700">{username}</span></p>
                  <button onClick={() => { setUsername(""); localStorage.removeItem(USERNAME_KEY); }} className="text-xs text-gray-400 underline">{t("changeName")}</button>
                </div>
                <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
                  {[["chat","💬 Chat"],["recipes","📖 Recipes"],["tips","💡 Tips"]].map(([id, label]) => (
                    <button key={id} onClick={() => setCommunityTab(id)} className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${communityTab === id ? "bg-white shadow text-green-700" : "text-gray-500"}`}>{label}</button>
                  ))}
                </div>
                {communityTab === "chat" && (
                  <Card>
                    <h3 className="mb-3 font-bold">{t("commChat")}</h3>
                    <div className="mb-3 max-h-64 space-y-2 overflow-y-auto">
                      {community.chat.length === 0 ? <p className="text-sm text-gray-500">{t("noMsg")}</p> : community.chat.map((msg) => (
                        <div key={msg.id} className="rounded-lg bg-gray-50 px-3 py-2">
                          <div className="flex items-center justify-between"><span className="text-xs font-semibold text-green-700">{msg.author}</span><span className="text-xs text-gray-400">{msg.time}</span></div>
                          <p className="text-sm text-gray-800">{msg.text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input value={newChat} onChange={(e) => setNewChat(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handlePostChat()} placeholder="Type a message…" className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                      <button onClick={handlePostChat} className="rounded-xl bg-gradient-to-b from-green-600 to-green-700 px-4 py-2 text-sm font-bold text-white btn-3d">{t("sendWord")}</button>
                    </div>
                  </Card>
                )}
                {communityTab === "recipes" && (
                  <Card>
                    <h3 className="mb-3 font-bold">{t("recipeExch")}</h3>
                    <div className="mb-4 space-y-2">
                      <input value={newRecipeTitle} onChange={(e) => setNewRecipeTitle(e.target.value)} placeholder="Recipe title" className="w-full rounded border px-3 py-2 text-sm text-gray-900" />
                      <textarea value={newRecipeBody} onChange={(e) => setNewRecipeBody(e.target.value)} placeholder="Ingredients and instructions…" rows={3} className="w-full rounded border px-3 py-2 text-sm text-gray-900" />
                      <button onClick={handlePostRecipe} className="rounded-xl bg-gradient-to-b from-green-600 to-green-700 px-4 py-2 text-sm font-bold text-white btn-3d">{t("shareRecipe")}</button>
                    </div>
                    <div className="space-y-3">
                      {community.recipes.length === 0 ? <p className="text-sm text-gray-500">{t("noRecipes")}</p> : community.recipes.map((r) => (
                        <div key={r.id} className="rounded-lg border p-3">
                          <div className="flex items-center justify-between"><span className="font-semibold">{r.title}</span><span className="text-xs text-gray-400">{r.date}</span></div>
                          <p className="mt-1 text-xs text-green-700">{r.author}</p>
                          <p className="mt-1 whitespace-pre-wrap text-sm text-gray-700">{r.body}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
                {communityTab === "tips" && (
                  <Card>
                    <h3 className="mb-3 font-bold">{t("tipsIdeas")}</h3>
                    <div className="mb-4 flex gap-2">
                      <input value={newTip} onChange={(e) => setNewTip(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handlePostTip()} placeholder="Share a food storage tip…" className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                      <button onClick={handlePostTip} className="rounded-xl bg-gradient-to-b from-green-600 to-green-700 px-4 py-2 text-sm font-bold text-white btn-3d">{t("postWord")}</button>
                    </div>
                    <div className="space-y-2">
                      {community.tips.length === 0 ? <p className="text-sm text-gray-500">{t("noTips")}</p> : community.tips.map((tip) => (
                        <div key={tip.id} className="rounded-lg bg-yellow-50 border border-yellow-200 px-3 py-2">
                          <div className="flex items-center justify-between"><span className="text-xs font-semibold text-green-700">{tip.author}</span><span className="text-xs text-gray-400">{tip.date}</span></div>
                          <p className="text-sm text-gray-800">{tip.text}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </>
            )}
          </>
        )}

        {activeTab === "more" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800">⚙️ More</h2>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setActiveTab("stores-page")} className="rounded-xl bg-gradient-to-b from-white to-gray-50 border-2 border-gray-100 p-4 text-center shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                <span className="text-2xl block mb-1">🏪</span>
                <span className="text-sm font-bold text-gray-800">{t("stores")}</span>
                <span className="text-xs text-gray-500 block">{t("storesDesc")}</span>
              </button>
              <button onClick={() => setActiveTab("community")} className="rounded-xl bg-gradient-to-b from-white to-gray-50 border-2 border-gray-100 p-4 text-center shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                <span className="text-2xl block mb-1">👥</span>
                <span className="text-sm font-bold text-gray-800">{t("communityWord")}</span>
                <span className="text-xs text-gray-500 block">{t("communityDesc")}</span>
              </button>
              <button onClick={() => { setShowRecallsPanel(true); }} className="rounded-xl bg-gradient-to-b from-white to-gray-50 border-2 border-gray-100 p-4 text-center shadow-sm hover:shadow-md hover:border-green-200 transition-all relative">
                <span className="text-2xl block mb-1">⚠️</span>
                <span className="text-sm font-bold text-gray-800">{t("fdaRecalls")}</span>
                <span className="text-xs text-gray-500 block">{t("fdaRecallsDesc")}</span>
                {fdaRecalls.length > 0 && <span style={{position:"absolute",top:"8px",right:"8px",background:"#ef4444",color:"white",borderRadius:"50%",width:"20px",height:"20px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.6rem",fontWeight:"800"}}>{fdaRecalls.length}</span>}
              </button>
              <button onClick={() => setShowHelp(true)} className="rounded-xl bg-gradient-to-b from-white to-gray-50 border-2 border-gray-100 p-4 text-center shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                <span className="text-2xl block mb-1">❓</span>
                <span className="text-sm font-bold text-gray-800">{t("howToUse")}</span>
                <span className="text-xs text-gray-500 block">Help & tips</span>
              </button>
            </div>
            <button onClick={() => { if (window.confirm(t("signOutConfirm"))) { try { sessionStorage.removeItem("tf_ok"); sessionStorage.removeItem("tf_mkt_seen"); } catch(e) {} window.location.reload(); } }} className="w-full rounded-xl border border-red-200 bg-red-50 py-3 text-sm font-bold text-red-600 mt-4">{t("signOut")}</button>
          </div>
        )}

        {activeTab === "stores-page" && (
          <div className="space-y-4">
            
            <div className="rounded-2xl bg-white p-5 card-3d">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🏪</span>
                <h2 className="text-lg font-bold">{t("shopOnline")}</h2>
              </div>
              <p className="text-sm text-gray-500 mb-4">{t("shopOnlineDesc")}</p>
              <div className="grid grid-cols-2 gap-3">

                <a href="https://www.amazon.com/alm/storefront?almBrandId=QW1hem9uIEZyZXNo" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-xl border-2 border-gray-100 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                  <span className="text-3xl">🛒</span>
                  <span className="text-sm font-bold text-gray-800">Amazon Fresh</span>
                  <span className="text-xs text-green-600 font-semibold">Shop Now →</span>
                </a>

                <a href="https://www.kroger.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-xl border-2 border-gray-100 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                  <span className="text-3xl">🏬</span>
                  <span className="text-sm font-bold text-gray-800">Kroger</span>
                  <span className="text-xs text-green-600 font-semibold">Shop Now →</span>
                </a>

                <a href="https://www.walmart.com/cp/food/976759" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-xl border-2 border-gray-100 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                  <span className="text-3xl">🔵</span>
                  <span className="text-sm font-bold text-gray-800">Walmart</span>
                  <span className="text-xs text-green-600 font-semibold">Shop Now →</span>
                </a>

                <a href="https://www.wholefoodsmarket.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-xl border-2 border-gray-100 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                  <span className="text-3xl">🥬</span>
                  <span className="text-sm font-bold text-gray-800">Whole Foods</span>
                  <span className="text-xs text-green-600 font-semibold">Shop Now →</span>
                </a>

                <a href="https://www.target.com/c/grocery/-/N-5xt1a" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-xl border-2 border-gray-100 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                  <span className="text-3xl">🎯</span>
                  <span className="text-sm font-bold text-gray-800">Target</span>
                  <span className="text-xs text-green-600 font-semibold">Shop Now →</span>
                </a>

                <a href="https://www.costco.com/grocery-household.html" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-xl border-2 border-gray-100 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                  <span className="text-3xl">📦</span>
                  <span className="text-sm font-bold text-gray-800">Costco</span>
                  <span className="text-xs text-green-600 font-semibold">Shop Now →</span>
                </a>

                <a href="https://www.traderjoes.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-xl border-2 border-gray-100 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                  <span className="text-3xl">🌺</span>
                  <span className="text-sm font-bold text-gray-800">Trader Joe&apos;s</span>
                  <span className="text-xs text-green-600 font-semibold">Shop Now →</span>
                </a>

                <a href="https://www.instacart.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-xl border-2 border-gray-100 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                  <span className="text-3xl">🥕</span>
                  <span className="text-sm font-bold text-gray-800">Instacart</span>
                  <span className="text-xs text-green-600 font-semibold">Shop Now →</span>
                </a>

                <a href="https://www.freshdirect.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-xl border-2 border-gray-100 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                  <span className="text-3xl">🍎</span>
                  <span className="text-sm font-bold text-gray-800">FreshDirect</span>
                  <span className="text-xs text-green-600 font-semibold">Shop Now →</span>
                </a>

                <a href="https://www.mortonwilliams.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-xl border-2 border-gray-100 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                  <span className="text-3xl">🏙️</span>
                  <span className="text-sm font-bold text-gray-800">Morton Williams</span>
                  <span className="text-xs text-green-600 font-semibold">Shop Now →</span>
                </a>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
      {/* FLOATING LANGUAGE BUTTON */}
      <button onClick={() => changeLang(lang === "en" ? "es" : "en")} className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 text-white shadow-xl hover:bg-green-600 hover:scale-110 transition-all flex items-center justify-center text-xl font-bold border-2 border-white" style={{ boxShadow: "0 4px 20px rgba(34,197,94,0.4)" }}>{lang === "en" ? "\ud83c\uddf2\ud83c\uddfd" : "\ud83c\uddfa\ud83c\uddf8"}</button>
    </>
  );
}
