
"use client";

const GLOBAL_STYLES = `
  .btn-3d {
    background-image: linear-gradient(to bottom, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 60%, rgba(0,0,0,0.1) 100%);
    text-shadow: 0 1px 2px rgba(0,0,0,0.4);
    box-shadow: 0 4px 0 rgba(0,0,0,0.22), 0 6px 12px rgba(0,0,0,0.18), inset 0 1.5px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.12);
    transition: all 0.15s ease;
    position: relative;
    font-weight: 700 !important;
    letter-spacing: 0.02em;
    border-radius: 10px;
  }
  .btn-3d.text-white, .btn-3d .text-white {
    color: #fff !important;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important;
  }
  .btn-3d:hover {
    box-shadow: 0 6px 0 rgba(0,0,0,0.22), 0 8px 16px rgba(0,0,0,0.22), inset 0 1.5px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.12);
    transform: translateY(-2px);
  }
  .btn-3d:active {
    box-shadow: 0 1px 0 rgba(0,0,0,0.22), 0 2px 4px rgba(0,0,0,0.12), inset 0 2px 4px rgba(0,0,0,0.12);
    transform: translateY(3px);
    transition-duration: 0.08s;
  }
  .pill-3d {
    background-image: linear-gradient(to bottom, rgba(255,255,255,0.18) 0%, rgba(0,0,0,0.06) 100%);
    box-shadow: 0 3px 0 rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.25);
    transition: all 0.15s ease;
    font-weight: 600 !important;
  }
  .pill-3d:hover {
    box-shadow: 0 5px 0 rgba(0,0,0,0.2), 0 6px 12px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.3);
    transform: translateY(-2px);
  }
  .pill-3d:active {
    box-shadow: 0 1px 0 rgba(0,0,0,0.2), inset 0 2px 4px rgba(0,0,0,0.1);
    transform: translateY(2px);
    transition-duration: 0.08s;
  }
  .pill-3d-active {
    background-image: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.1) 100%);
    box-shadow: 0 3px 0 rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.2);
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
    background: linear-gradient(to bottom, #16a34a, #14532d) !important;
    color: #ffffff !important;
    font-weight: 800 !important;
    text-shadow: 0 1px 2px rgba(0,0,0,0.6) !important;
    box-shadow: 0 5px 0px #0a2e16, 0 8px 16px rgba(0,0,0,0.35), inset 0 1.5px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.2) !important;
    border: none !important;
    border-radius: 12px;
    transition: all 0.12s ease;
    -webkit-font-smoothing: antialiased;
  }
  .btn-green-3d:hover {
    background: linear-gradient(to bottom, #22c55e, #15803d) !important;
    box-shadow: 0 7px 0px #0a2e16, 0 10px 20px rgba(0,0,0,0.4), inset 0 1.5px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(0,0,0,0.2) !important;
    transform: translateY(-2px);
  }
  .btn-green-3d:active {
    box-shadow: 0 1px 0px #0a2e16, 0 2px 6px rgba(0,0,0,0.25), inset 0 2px 4px rgba(0,0,0,0.15) !important;
    transform: translateY(4px);
    transition-duration: 0.08s;
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
  .mkt-cta { display: inline-block; background: linear-gradient(to bottom, #F0C070, #E8A63C); color: #000; font-weight: 800; font-size: 1.05rem; padding: 1rem 2.35rem; border-radius: 18px; border: none; cursor: pointer; box-shadow: 0 5px 0px #8C5A10, 0 10px 26px rgba(0,0,0,0.32), inset 0 1.5px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.15); transition: all 0.22s cubic-bezier(0.34,1.4,0.64,1); text-decoration: none; -webkit-tap-highlight-color:transparent; }
  .mkt-cta:hover { transform: translateY(-3px); box-shadow: 0 8px 0px #8C5A10, 0 14px 32px rgba(0,0,0,0.36), 0 0 22px rgba(232,166,60,0.28), inset 0 1.5px 0 rgba(255,255,255,0.45); }
  .mkt-cta:active { transform: translateY(4px); box-shadow: 0 1px 0px #8C5A10, 0 2px 6px rgba(0,0,0,0.2), inset 0 2px 4px rgba(0,0,0,0.12); transition-duration: 0.08s; }
  .mkt-cta-ghost { display: inline-block; background: linear-gradient(to bottom, rgba(255,255,255,0.18), rgba(255,255,255,0.07)); color: #fff; font-weight: 700; font-size: 1.05rem; padding: 0.97rem 2.1rem; border-radius: 14px; border: 1.5px solid rgba(255,255,255,0.52); cursor: pointer; transition: all 0.22s cubic-bezier(0.34,1.4,0.64,1); text-decoration: none; box-shadow: 0 4px 0 rgba(0,0,0,0.22), 0 8px 18px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.3); -webkit-tap-highlight-color:transparent; }
  .mkt-cta-ghost:hover { background: linear-gradient(to bottom, rgba(255,255,255,0.27), rgba(255,255,255,0.11)); border-color: rgba(255,255,255,0.88); box-shadow: 0 6px 0 rgba(0,0,0,0.22), 0 10px 22px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.35); transform: translateY(-2px); }
  .mkt-cta-ghost:active { transform: translateY(3px); box-shadow: 0 1px 0 rgba(0,0,0,0.2), inset 0 2px 4px rgba(0,0,0,0.12); transition-duration: 0.08s; }
  .mkt-hero { text-align: center; padding: 1.5rem 1.5rem 0.5rem; max-width: 680px; margin: 0 auto; }
  .mkt-hero-eyebrow { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase; color: #86efac; margin-bottom: 0.6rem; display: block; }
  .mkt-hero h1 { font-size: 2.9rem; font-weight: 900; line-height: 1.03; margin-bottom: 0.75rem; letter-spacing: -0.025em; }
  .mkt-hero h1 span { color: #B7D63A; }
  .mkt-hero-sub { font-size: 1rem; color: rgba(255,255,255,0.72); line-height: 1.4; margin-bottom: 0.65rem; }
  .mkt-hero-btns { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; margin-top: 0.5rem; }
  .mkt-section { padding: 0.5rem 1.5rem; max-width: 800px; margin: 0 auto; }
  .mkt-section-dark { background: rgba(0,0,0,0.15); }
  .mkt-section-title { text-align: center; margin-bottom: 0.4rem; }
  .mkt-section-title h2 { font-size: 1.6rem; font-weight: 900; margin-top: 0; letter-spacing: -0.01em; }
  .mkt-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin-top: 0; text-align: center; padding: 0.1rem 0; }
  .mkt-stat-num { font-size: 1.65rem; font-weight: 900; color: #B7D63A; }
  .mkt-stat-label { font-size: 0.75rem; opacity: 0.8; margin-top: 0.1rem; }
  /* Dashboard mockup */
  .mkt-dashboard { max-width: 540px; margin: 0.75rem auto; background: linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%); border-radius: 20px; padding: 1.25rem; box-shadow: 0 24px 64px rgba(0,0,0,0.4); color: #fff; border: 2px solid rgba(183,214,58,0.55); }
  .mkt-dash-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.875rem; padding-bottom: 0.625rem; border-bottom: 1px solid rgba(255,255,255,0.15); }
  .mkt-dash-title { font-size: 0.875rem; font-weight: 800; color: #fff; }
  .mkt-dash-date { font-size: 0.7rem; color: rgba(255,255,255,0.55); font-weight: 600; }
  .mkt-dash-section { margin-bottom: 0.75rem; }
  .mkt-dash-section-label { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.6); margin-bottom: 0.35rem; }
  .mkt-dash-item { display: flex; align-items: center; justify-content: space-between; padding: 0.4rem 0.6rem; border-radius: 10px; margin-bottom: 0.3rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18); }
  .mkt-dash-item-name { font-size: 0.78rem; font-weight: 700; color: #fff; }
  .mkt-dash-badge { font-size: 0.62rem; font-weight: 700; padding: 0.12rem 0.5rem; border-radius: 999px; white-space: nowrap; }
  .mkt-dash-badge-red { background: rgba(220,38,38,0.25); color: #fca5a5; border: 1px solid rgba(220,38,38,0.5); }
  .mkt-dash-badge-yellow { background: rgba(163,230,53,0.15); color: #a3e635; border: 1px solid rgba(163,230,53,0.4); }
  .mkt-dash-badge-green { background: rgba(74,222,128,0.15); color: #4ade80; border: 1px solid rgba(74,222,128,0.3); }
  .mkt-dash-badge-blue { background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.85); border: 1px solid rgba(255,255,255,0.25); }
  .mkt-dash-use-soon { background: rgba(183,214,58,0.12); border: 1.5px solid rgba(183,214,58,0.45); border-radius: 10px; padding: 0.55rem 0.65rem; }
  .mkt-dash-use-soon-label { font-size: 0.6rem; font-weight: 700; color: #B7D63A; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.35rem; }
  .mkt-dash-use-soon-items { display: flex; gap: 0.35rem; flex-wrap: wrap; }
  .mkt-dash-use-soon-chip { background: rgba(183,214,58,0.2); color: #B7D63A; font-size: 0.65rem; font-weight: 700; padding: 0.18rem 0.5rem; border-radius: 999px; border: 1px solid rgba(183,214,58,0.4); }
  /* Benefit cards */
  .mkt-benefits { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.2rem; margin-top: 0.15rem; }
  .mkt-benefit-card { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18); border-radius: 16px; padding: 0.35rem 0.5rem; backdrop-filter: blur(4px); transition: transform 0.2s, background 0.2s; width: calc(50% - 0.1rem); max-width: 280px; }
  .mkt-benefit-card:hover { transform: translateY(-3px); background: rgba(255,255,255,0.15); }
  .mkt-benefit-icon { font-size: 1.2rem; margin-bottom: 0.1rem; }
  .mkt-benefit-card h3 { font-size: 0.95rem; font-weight: 800; margin-bottom: 0.1rem; }
  .mkt-benefit-card p { font-size: 0.75rem; opacity: 0.72; line-height: 1.2; }
  /* 3-step */
  .mkt-3steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.3rem; margin-top: 0.3rem; text-align: center; }
  .mkt-3step { padding: 0.15rem; display: flex; align-items: center; justify-content: center; gap: 0.4rem; }
  .mkt-3step-num { width: 32px; height: 32px; background: linear-gradient(135deg, #F0C070, #E8A63C); color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 0.9rem; margin: 0; flex-shrink: 0; box-shadow: 0 2px 0 #8C5A10; }
  .mkt-3step h3 { font-size: 1rem; font-weight: 800; margin: 0; }
  .mkt-footer { text-align: center; padding: 1.25rem 1.5rem; opacity: 0.6; font-size: 0.75rem; }
  @media (max-width: 560px) { .mkt-3steps { grid-template-columns: repeat(3, 1fr); gap: 0.3rem; } .mkt-stats { grid-template-columns: repeat(3, 1fr); gap: 0.5rem; } .mkt-hero h1 { font-size: 2.1rem; } .mkt-dashboard { margin: 0.75rem 0.75rem; } }
  @keyframes mktFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .mkt-animate { animation: mktFadeIn 0.45s ease-out both; }
  @keyframes heroSlideFromLeft { from { opacity: 0; transform: translateX(-32px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes heroSlideFromRight { from { opacity: 0; transform: translateX(32px); } to { opacity: 1; transform: translateX(0); } }
  .hero-slide-left { display: inline-block; animation: heroSlideFromLeft 0.52s cubic-bezier(0.22,1,0.36,1) both; }
  .hero-slide-right { display: inline-block; animation: heroSlideFromRight 0.52s cubic-bezier(0.22,1,0.36,1) both; }
  .mkt-animate-d1 { animation-delay: 0.1s; }
  .mkt-animate-d2 { animation-delay: 0.2s; }
  .mkt-animate-d3 { animation-delay: 0.3s; }
  .mkt-animate-d4 { animation-delay: 0.4s; }
  /* === TOP NAV === */
  @keyframes navWobble { 0%,100% { transform: rotate(0deg); } 4% { transform: rotate(-11deg); } 8% { transform: rotate(10deg); } 12% { transform: rotate(-5deg); } 16% { transform: rotate(0deg); } }
  .top-nav { position: sticky; top: 0; z-index: 50; background: linear-gradient(to bottom, #7c2d12, #c2410c); border-bottom: 2px solid rgba(0,0,0,0.25); display: flex; justify-content: space-around; align-items: center; box-shadow: 0 4px 24px rgba(0,0,0,0.55); overflow-x: auto; }
  .top-nav button { display: flex; flex-direction: column; align-items: center; gap: 3px; background: none; border: none; cursor: pointer; padding: 0.45rem 0.5rem; min-width: 56px; flex-shrink: 0; border-radius: 8px; }
  .top-nav button span.nav-icon { font-size: 1.6rem; transition: transform 0.2s; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.4)); }
  .top-nav button span.nav-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.03em; }
  .top-nav button.nav-active { background: rgba(255,255,255,0.2); box-shadow: 0 0 10px rgba(255,255,255,0.2), inset 0 0 8px rgba(255,255,255,0.08); }
  .top-nav button.nav-active span.nav-icon { transform: scale(1.18); filter: drop-shadow(0 0 5px rgba(255,255,255,0.7)) drop-shadow(0 1px 2px rgba(0,0,0,0.4)); }
  .top-nav button.nav-active span.nav-label { color: #fff; text-shadow: 0 0 6px rgba(255,255,255,0.6); }
  .top-nav button:not(.nav-active) span.nav-label { color: rgba(255,255,255,0.75); }
  .top-nav button:not(.nav-active) span.nav-icon { opacity: 0.85; }
  .top-nav button:not(:last-child) { border-right: 1px solid rgba(0,0,0,0.2); }
  .top-nav button:nth-child(1) { animation: navWobble 4.2s 0.0s infinite; }
  .top-nav button:nth-child(2) { animation: navWobble 4.2s 0.7s infinite; }
  .top-nav button:nth-child(3) { animation: navWobble 4.2s 1.4s infinite; }
  .top-nav button:nth-child(4) { animation: navWobble 4.2s 2.1s infinite; }
  .top-nav button:nth-child(5) { animation: navWobble 4.2s 2.8s infinite; }
  .top-nav button:nth-child(6) { animation: navWobble 4.2s 3.5s infinite; }
  .main-content { padding-bottom: 5.5rem !important; }
  /* === FOOTER NAV === */
  .footer-nav { position: fixed; bottom: 0; left: 0; right: 0; z-index: 50; background: linear-gradient(to top, #7c2d12, #c2410c); border-top: 2px solid rgba(0,0,0,0.25); display: flex; justify-content: space-around; align-items: center; box-shadow: 0 -4px 24px rgba(0,0,0,0.55); padding: 0.3rem 0 calc(0.3rem + env(safe-area-inset-bottom)); overflow-x: auto; }
  .footer-nav button { display: flex; flex-direction: column; align-items: center; gap: 2px; background: none; border: none; cursor: pointer; padding: 0.35rem 0.5rem; min-width: 52px; flex-shrink: 0; border-radius: 8px; }
  .footer-nav button span.footer-icon { font-size: 1.45rem; transition: transform 0.2s; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.4)); }
  .footer-nav button span.footer-label { font-size: 0.58rem; font-weight: 700; letter-spacing: 0.02em; text-align: center; line-height: 1.2; }
  .footer-nav button.footer-active { background: rgba(255,255,255,0.2); box-shadow: 0 0 10px rgba(255,255,255,0.2), inset 0 0 8px rgba(255,255,255,0.08); }
  .footer-nav button.footer-active span.footer-icon { transform: scale(1.18); filter: drop-shadow(0 0 5px rgba(255,255,255,0.7)) drop-shadow(0 1px 2px rgba(0,0,0,0.4)); }
  .footer-nav button.footer-active span.footer-label { color: #fff; text-shadow: 0 0 6px rgba(255,255,255,0.6); }
  .footer-nav button:not(.footer-active) span.footer-label { color: rgba(255,255,255,0.75); }
  .footer-nav button:not(.footer-active) span.footer-icon { opacity: 0.85; }
  .footer-nav button:not(:last-child) { border-right: 1px solid rgba(0,0,0,0.2); }
  .footer-nav button:nth-child(1) { animation: navWobble 4.2s 0.0s infinite; }
  .footer-nav button:nth-child(2) { animation: navWobble 4.2s 0.7s infinite; }
  .footer-nav button:nth-child(3) { animation: navWobble 4.2s 1.4s infinite; }
  .footer-nav button:nth-child(4) { animation: navWobble 4.2s 2.1s infinite; }
  .footer-nav button:nth-child(5) { animation: navWobble 4.2s 2.8s infinite; }
  .footer-nav button:nth-child(6) { animation: navWobble 4.2s 3.5s infinite; }
  .footer-nav button:not(:last-child) { border-right: 1px solid rgba(255,102,0,0.2); }
  .cart-icon { display: inline-block; filter: drop-shadow(0 0 4px rgba(249,115,22,0.55)) brightness(1.13); }
  /* Enter Beta button — override inline box-shadow on hover/active */
  .enter-beta-btn { transition: transform 0.16s ease, box-shadow 0.16s ease !important; }
  .enter-beta-btn:hover { transform: translateY(-2px) !important; box-shadow: 0 8px 18px rgba(0,0,0,0.18), 0 2px 8px rgba(210,130,40,0.22) !important; }
  .enter-beta-btn:active { transform: translateY(2px) scale(0.97) !important; box-shadow: 0 2px 6px rgba(0,0,0,0.12) !important; transition-duration: 0.08s !important; }
  /* Landing store tile hover */
  .mkt-store-card { transition: transform 0.16s ease, box-shadow 0.16s ease, border-color 0.16s ease; }
  .mkt-store-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.2); border-color: rgba(255,255,255,0.35) !important; }
  .mkt-store-card:active { transform: translateY(1px); transition-duration: 0.08s; }

  /* === APP INTERIOR THEME (matches landing page) === */
  .app-bg { background: linear-gradient(160deg, #064e3b 0%, #065f46 45%, #047857 100%); background-attachment: fixed; }
  .app-section-label { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.1em; color: #86efac; font-weight: 700; display: block; margin-bottom: 0.2rem; }
  .app-section-h2 { font-size: 1.3rem; font-weight: 900; color: #fff; margin: 0 0 0.75rem; text-shadow: 0 1px 4px rgba(0,0,0,0.2); }
  .glass-scan-btn { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.3rem; border-radius: 16px; padding: 0.85rem 0.5rem; background: linear-gradient(to bottom, rgba(255,255,255,0.18), rgba(255,255,255,0.07)); border: 2px solid #B7D63A; border-bottom: 3px solid rgba(80,105,15,0.7); color: #fff; font-weight: 700; font-size: 0.75rem; cursor: pointer; transition: all 0.15s; backdrop-filter: blur(6px); width: 100%; box-shadow: 0 4px 0 rgba(80,105,15,0.5), 0 6px 14px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.22); -webkit-tap-highlight-color:transparent; }
  @keyframes letterPop { 0%,100% { transform:scale(1); color:#f97316; text-shadow:none; } 4% { transform:scale(1.28); color:#fde68a; text-shadow:0 0 10px rgba(251,191,36,0.9),0 0 4px rgba(249,115,22,0.7); } 10% { transform:scale(1); color:#f97316; text-shadow:none; } }
  .glass-scan-btn:hover { background: rgba(255,255,255,0.2); border-color: #B7D63A; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.2); }
  .glass-scan-btn:active { transform: translateY(1px); background: rgba(255,255,255,0.08); }
  .tracker-items-card { background: rgba(255,255,255,0.12) !important; border: 3px solid #B7D63A !important; backdrop-filter: blur(4px); }
  .glass-tile { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18); border-radius: 16px; padding: 1.25rem 1rem; text-align: center; backdrop-filter: blur(6px); transition: transform 0.2s, background 0.2s; cursor: pointer; width: 100%; display: block; }
  .glass-tile:hover { transform: translateY(-3px); background: rgba(255,255,255,0.18); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
  .glass-tile:active { transform: translateY(1px); }
  .app-header-btn { background: none; border: none; border-radius: 0; padding: 0.4rem 0.5rem; color: #fff; font-weight: 700; font-size: 0.8rem; cursor: pointer; transition: all 0.15s; }
  .app-header-btn:hover { opacity: 0.75; }
  .back-btn { display: inline-flex; align-items: center; justify-content: center; width: 2rem; height: 2rem; background: rgba(255,255,255,0.12); border: 1.5px solid rgba(255,255,255,0.2); border-radius: 50%; color: #fff; font-size: 1rem; cursor: pointer; transition: all 0.15s; flex-shrink: 0; padding: 0; line-height: 1; }
  .back-btn:hover { background: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.35); }
  @keyframes arrowBounceDown { 0%,100% { transform:translateY(0); } 50% { transform:translateY(3px); } }
  @keyframes arrowBounceUp   { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-3px); } }
  .arrow-down { color:#B7D63A; display:inline-block; animation:arrowBounceDown 1.1s ease-in-out infinite; }
  .arrow-up   { color:#B7D63A; display:inline-block; animation:arrowBounceUp   1.1s ease-in-out infinite; }
  /* === TUTORIAL === */
  @keyframes tutSlideUp { from { opacity:0; transform:translateY(60px) scale(0.95); } to { opacity:1; transform:translateY(0) scale(1); } }
  @keyframes tutEmojiPop { 0%,100% { transform:scale(1) rotate(0deg); } 20% { transform:scale(1.45) rotate(-10deg); } 45% { transform:scale(1.2) rotate(8deg); } 65% { transform:scale(1.3) rotate(-4deg); } 82% { transform:scale(1.1) rotate(2deg); } }
  @keyframes tutStepIn { from { opacity:0; transform:translateX(36px); } to { opacity:1; transform:translateX(0); } }
  @keyframes tutBtnPulse { 0%,100% { box-shadow:0 0 0 0 rgba(183,214,58,0.55); } 50% { box-shadow:0 0 0 7px rgba(183,214,58,0); } }
  .tut-pulse { animation: tutBtnPulse 2.5s infinite; }
  .tut-modal { animation: tutSlideUp 0.38s cubic-bezier(0.34,1.56,0.64,1) both; }
  .tut-step { animation: tutStepIn 0.28s ease both; }
  @keyframes flashRed { 0%,100% { opacity:1; background:rgba(220,38,38,0.25); } 50% { opacity:0.45; background:rgba(220,38,38,0.05); } }
  .flash-red { animation: flashRed 1.1s ease-in-out infinite; }
  @keyframes arrowBounceDown { 0%,100% { transform:translateY(0); } 50% { transform:translateY(3px); } }
  @keyframes arrowBounceUp   { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-3px); } }
  .arrow-down { color:#B7D63A; display:inline-block; animation:arrowBounceDown 1.1s ease-in-out infinite; }
  .arrow-up   { color:#B7D63A; display:inline-block; animation:arrowBounceUp   1.1s ease-in-out infinite; }

  /* ── Premium polish ── */
  /* 1. Dashboard tile — lift on hover (desktop) + visible tap feedback (mobile) */
  .dash-tile { background:linear-gradient(175deg,rgba(255,255,255,0.26) 0%,rgba(255,255,255,0.08) 55%,rgba(0,0,0,0.08) 100%); border:1.5px solid rgba(255,255,255,0.28); border-bottom:3.5px solid rgba(0,0,0,0.35); border-radius:20px; padding:1rem 0.5rem; display:flex; flex-direction:column; align-items:center; gap:0.4rem; cursor:pointer; transition:transform 0.18s ease, box-shadow 0.18s ease; backdrop-filter:blur(8px); width:100%; -webkit-tap-highlight-color:transparent; box-shadow:0 6px 0 rgba(0,0,0,0.35), 0 10px 18px rgba(0,0,0,0.25), inset 0 1.5px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(0,0,0,0.15); }
  .dash-tile:hover { transform:translateY(-3px); box-shadow:0 9px 0 rgba(0,0,0,0.35), 0 14px 24px rgba(0,0,0,0.28), inset 0 1.5px 0 rgba(255,255,255,0.32), inset 0 -1px 0 rgba(0,0,0,0.15); }
  .dash-tile:active { transform:translateY(5px) scale(0.96); box-shadow:0 1px 0 rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 2px 6px rgba(0,0,0,0.1), 0 0 0 2.5px rgba(183,214,58,0.5), 0 0 18px rgba(183,214,58,0.22); outline:none; transition-duration:0.08s; }
  /* 2. I Opened Something — visible on tap */
  .opened-btn { width:100%; display:flex; align-items:center; justify-content:center; gap:0.5rem; background:linear-gradient(to bottom, rgba(183,214,58,0.22), rgba(183,214,58,0.1)); border:1.5px solid rgba(183,214,58,0.55); border-bottom:2.5px solid rgba(70,90,10,0.4); border-radius:12px; padding:0.6rem; cursor:pointer; color:#B7D63A; font-weight:800; font-size:0.82rem; transition:transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease; -webkit-tap-highlight-color:transparent; box-shadow:0 4px 0 rgba(70,90,10,0.35), 0 6px 14px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.15); }
  .opened-btn:hover { transform:translateY(-2px); background:linear-gradient(to bottom, rgba(183,214,58,0.32), rgba(183,214,58,0.16)); box-shadow:0 6px 0 rgba(70,90,10,0.35), 0 10px 20px rgba(183,214,58,0.18), inset 0 1px 0 rgba(255,255,255,0.2); border-color:rgba(183,214,58,0.8); }
  .opened-btn:active { transform:translateY(4px); background:rgba(183,214,58,0.28); box-shadow:0 1px 0 rgba(70,90,10,0.35), inset 0 2px 4px rgba(0,0,0,0.1); transition-duration:0.08s; }
  /* 3. Tab fade-up transition — increased distance for visibility */
  @keyframes tabFadeUp { from { opacity:0; } to { opacity:1; } }
  .tab-enter { animation:tabFadeUp 0.28s ease-out both; }
  @keyframes trackerLinkPulse { 0%{opacity:0} 25%{opacity:1} 100%{opacity:0} }
  .tracker-link-overlay { position:fixed; inset:0; background:rgba(183,214,58,0.06); pointer-events:none; z-index:9990; animation:trackerLinkPulse 0.85s ease-out forwards; }
  @keyframes trackerEntryGlow { 0%{box-shadow:0 0 0 0 rgba(183,214,58,0);} 25%{box-shadow:0 0 0 3px rgba(183,214,58,0.5), 0 0 22px rgba(183,214,58,0.22);} 100%{box-shadow:0 0 0 0 rgba(183,214,58,0);} }
  .tracker-entry-flash { animation:trackerEntryGlow 0.65s ease-out both; border-radius:12px; }
  @keyframes trackerTilePulse { 0%{transform:translateY(0) scale(1);box-shadow:0 6px 0 rgba(0,0,0,0.35),0 10px 18px rgba(0,0,0,0.25),inset 0 1.5px 0 rgba(255,255,255,0.28);filter:brightness(1);} 20%{transform:translateY(4px) scale(0.93);box-shadow:0 1px 0 rgba(0,0,0,0.3),0 0 0 3px rgba(183,214,58,0.65),0 0 28px rgba(183,214,58,0.35),inset 0 1px 0 rgba(255,255,255,0.15);filter:brightness(1.25);} 60%{transform:translateY(4px) scale(0.93);box-shadow:0 1px 0 rgba(0,0,0,0.3),0 0 0 3px rgba(183,214,58,0.5),0 0 22px rgba(183,214,58,0.25),inset 0 1px 0 rgba(255,255,255,0.15);filter:brightness(1.15);} 100%{transform:translateY(0) scale(1);box-shadow:0 6px 0 rgba(0,0,0,0.35),0 10px 18px rgba(0,0,0,0.25),inset 0 1.5px 0 rgba(255,255,255,0.28);filter:brightness(1);} }
  .tracker-tile-active { animation:trackerTilePulse 0.7s ease-out both; }
  /* 4. Card depth */
  .card-premium { box-shadow:0 4px 6px rgba(0,0,0,0.05), 0 12px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.95); }
  /* 5. Urgency pulse — red only, more visible */
  @keyframes urgencyGlow { 0%,100% { box-shadow:0 0 0 0 rgba(220,38,38,0.6); } 50% { box-shadow:0 0 0 6px rgba(220,38,38,0); } }
  .urgency-pulse { animation:urgencyGlow 1.6s ease-in-out infinite; }
  /* CTA tap/hover feedback */
  .mkt-cta:hover { transform:translateY(-2px); box-shadow:0 6px 0px #8C5A10, 0 10px 24px rgba(0,0,0,0.35), 0 0 18px rgba(232,166,60,0.3); }
  .mkt-cta:active { transform:translateY(2px); box-shadow:0 1px 0px #8C5A10, 0 2px 8px rgba(0,0,0,0.25); }
  /* glass-scan-btn tap feedback */
  .glass-scan-btn:hover { background: linear-gradient(to bottom, rgba(255,255,255,0.26), rgba(255,255,255,0.1)); border-color: #B7D63A; transform: translateY(-3px); box-shadow: 0 7px 0 rgba(80,105,15,0.5), 0 10px 20px rgba(0,0,0,0.25), 0 0 14px rgba(183,214,58,0.18), inset 0 1px 0 rgba(255,255,255,0.28); }
  .glass-scan-btn:active { transform: translateY(3px); background: rgba(255,255,255,0.1); box-shadow: 0 1px 0 rgba(150,50,0,0.5), 0 2px 6px rgba(0,0,0,0.15), inset 0 2px 4px rgba(0,0,0,0.1); transition-duration: 0.08s; }
  @keyframes mic-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,0.4)} 50%{box-shadow:0 0 0 8px rgba(239,68,68,0)} }
  @keyframes tf-first-item { 0%{opacity:0;transform:translateY(5px)} 12%{opacity:1;transform:translateY(0)} 75%{opacity:1} 100%{opacity:0;transform:translateY(-3px)} }
  .tf-first-item-msg { animation: tf-first-item 2.2s ease forwards; pointer-events:none; }
  .voice-mic-btn { display:flex;align-items:center;justify-content:center;width:2.2rem;height:2.2rem;border-radius:50%;background:rgba(255,255,255,0.1);border:1.5px solid rgba(255,255,255,0.22);color:rgba(255,255,255,0.65);cursor:pointer;font-size:1rem;transition:all 0.2s;flex-shrink:0; }
  .voice-mic-btn:hover { background:rgba(255,255,255,0.18);border-color:rgba(255,255,255,0.4); }
  .voice-mic-btn.listening { background:rgba(239,68,68,0.15);border-color:rgba(239,68,68,0.55);color:#ef4444;animation:mic-pulse 1.1s infinite; }
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
  welcomeTitle: { en: "Welcome to TrackFresh.AI!", es: "\u00a1Bienvenido a TrackFresh.AI!" },
  welcomeDesc: { en: "The smart way to track your groceries, reduce food waste, and save money.", es: "La forma inteligente de rastrear tus alimentos, reducir el desperdicio y ahorrar dinero." },
  welcomeF1: { en: "AI-powered label, barcode & receipt scanning", es: "Escaneo de etiquetas, códigos de barras y recibos con IA" },
  welcomeF2: { en: "Smart expiry predictions, alerts & freeze reminders", es: "Predicciones de vencimiento, alertas y avisos de congelación" },
  welcomeF3: { en: "Voice-powered hands-free entry", es: "Entrada manos libres por voz" },
  welcomeF4: { en: "AI recipe suggestions from what's in your fridge", es: "Recetas con IA basadas en lo que tienes en tu refrigerador" },
  welcomeF5: { en: "Weekly meal planner & smart shopping lists", es: "Planificador semanal de comidas y listas de compras inteligentes" },
  welcomeF6: { en: "Community recipes, tips & food storage advice", es: "Recetas, consejos y almacenamiento de alimentos en comunidad" },
  welcomeF7: { en: "Full English & Spanish language support", es: "Soporte completo en inglés y español" },
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
recipeIntro: { en: "Matched to what's in your fridge, pantry & freezer.", es: "Basado en lo que tienes en tu refrigerador, despensa y congelador." },
noMatches: { en: "No matches found. Try adding more items like eggs, carrots, or onions.", es: "Sin coincidencias. Agrega más alimentos como huevos, zanahorias o cebollas." },
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
  howManyItems: { en: "How many items are you scanning?", es: "¿Cuántos productos vas a escanear?" },
  singleScan: { en: "Single Scan", es: "Escaneo Único" },
  multiScans: { en: "Mult. Scans", es: "Múlt. Escaneos" },
  scanReceipts: { en: "Scan Receipt(s)", es: "Escanear Recibo(s)" },
  scanLabels: { en: "Scan Label(s)", es: "Escanear Etiqueta(s)" },
  scanBarcodes: { en: "Scan Barcode(s)", es: "Escanear Código(s)" },
  pickAMeal: { en: "Pick a Meal", es: "Elegir una Comida" },
  addMeal: { en: "+ Add meal", es: "+ Agregar comida" },
  changeWord: { en: "Change", es: "Cambiar" },
  expiringSoonTitle: { en: "🔔 Expiring Soon — Add to List?", es: "🔔 ¡Vence Pronto! — ¿Agregar a la lista?" },
  expiringSoonDesc: { en: "These items expire within 7 days. Tap to add a replacement to your shopping list.", es: "Estos productos vencen en 7 días. Toca para agregar un reemplazo a tu lista." },
  addedWord: { en: "Added", es: "Agregado" },
  addWord: { en: "+ Add", es: "+ Agregar" },
  addItemPlaceholder: { en: "Add item…", es: "Agregar artículo…" },
  qtyPlaceholder: { en: "Qty", es: "Cant." },
  displayNamePlaceholder: { en: "Your display name", es: "Tu nombre de pantalla" },
  signedInAs: { en: "Signed in as", es: "Conectado como" },
  chatTabLabel: { en: "💬 Chat", es: "💬 Chat" },
  recipesTabLabel: { en: "📖 Recipes", es: "📖 Recetas" },
  tipsTabLabel: { en: "💡 Tips", es: "💡 Consejos" },
  typeMessage: { en: "Type a message…", es: "Escribe un mensaje…" },
  recipeTitlePlaceholder: { en: "Recipe title", es: "Título de receta" },
  ingredientsPlaceholder: { en: "Ingredients and instructions…", es: "Ingredientes e instrucciones…" },
  tipSharePlaceholder: { en: "Share a food storage tip…", es: "Comparte un consejo de almacenamiento…" },
  listeningDate: { en: "Listening for expiration date...", es: "Escuchando la fecha de vencimiento..." },
  saySampleDate: { en: "Say something like March 15, 2026", es: "Di algo como 15 de marzo de 2026" },
  addAndNext: { en: "➕ Add & Scan Next", es: "➕ Agregar y Escanear Siguiente" },
  tapToScanNext: { en: "Tap to scan next item", es: "Toca para escanear el siguiente" },
  tapToPhoto: { en: "Tap to photograph label", es: "Toca para fotografiar la etiqueta" },
  tapOpenCamera: { en: "Tap to open camera", es: "Toca para abrir cámara" },
  doneWord: { en: "Done", es: "Listo" },
  sayDateExample: { en: "Say date e.g. February 20, 2026", es: "Di la fecha ej. 20 de febrero de 2026" },
  freezeByLabel: { en: "Freeze By", es: "Congelar Antes De" },
  expDateLabel: { en: "Exp. Date", es: "Fecha de Venc." },
  usesExpiring: { en: "uses expiring", es: "usa los que vencen" },
  storingWhere: { en: "Where are you storing this?", es: "¿Dónde vas a guardar esto?" },
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
const SAVED_RECIPES_KEY = "trackfresh.savedRecipes";
const RECIPE_MODE_KEY = "trackfresh.recipeMode";

const CATEGORIES = ["Produce", "Dairy", "Meat", "Pantry", "Leftovers", "Other"];
const LOCATIONS = ["Fridge", "Freezer", "Pantry"];

const SHELF_LIFE_AFTER_OPENING = [
  { keys: ["ketchup"],                     days: 180 },
  { keys: ["mustard"],                     days: 365 },
  { keys: ["pickle"],                      days: 90  },
  { keys: ["mayo", "mayonnaise"],          days: 60  },
  { keys: ["salsa"],                       days: 14  },
  { keys: ["pasta sauce","tomato sauce","marinara","spaghetti sauce"], days: 7 },
  { keys: ["milk"],                        days: 7   },
  { keys: ["almond milk","oat milk","soy milk"], days: 10 },
  { keys: ["salad dressing","dressing","vinaigrette"], days: 60 },
  { keys: ["jam", "jelly", "preserves"],   days: 180 },
  { keys: ["peanut butter","almond butter","nut butter"], days: 90 },
  { keys: ["soy sauce"],                   days: 730 },
  { keys: ["worcestershire"],              days: 365 },
  { keys: ["hot sauce","sriracha","tabasco"], days: 180 },
  { keys: ["olive oil","vegetable oil","canola oil"], days: 60 },
  { keys: ["coconut oil"],                 days: 365 },
  { keys: ["cream cheese"],               days: 10  },
  { keys: ["sour cream"],                 days: 14  },
  { keys: ["cottage cheese"],             days: 7   },
  { keys: ["yogurt"],                     days: 14  },
  { keys: ["butter"],                     days: 30  },
  { keys: ["heavy cream","whipping cream","half and half"], days: 7 },
  { keys: ["orange juice","apple juice","grape juice","juice"], days: 7 },
  { keys: ["salami","pepperoni"],         days: 21  },
  { keys: ["deli meat","lunch meat","turkey breast","ham slices"], days: 5 },
  { keys: ["bread","bagel","buns","rolls"], days: 7 },
  { keys: ["parmesan","romano"],          days: 30  },
  { keys: ["cheddar","mozzarella","swiss","provolone","cheese"], days: 21 },
  { keys: ["hummus"],                     days: 7   },
  { keys: ["guacamole"],                  days: 3   },
  { keys: ["wine"],                       days: 5   },
  { keys: ["coffee","cold brew"],         days: 14  },
  { keys: ["maple syrup","syrup"],        days: 365 },
  { keys: ["honey"],                      days: 9999},
  { keys: ["salted caramel","bbq sauce","barbecue"], days: 120 },
  { keys: ["fish sauce","oyster sauce"],  days: 180 },
  { keys: ["chicken broth","beef broth","vegetable broth"], days: 5 },
];

function getShelfLifeDays(name) {
  const lower = (name || "").toLowerCase();
  for (const entry of SHELF_LIFE_AFTER_OPENING) {
    if (entry.keys.some(k => lower.includes(k))) return entry.days;
  }
  return null;
}

function addDaysToDate(dateStr, days) {
  const d = new Date(dateStr + "T12:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function fuzzyMatchItems(query, items) {
  const q = query.toLowerCase().trim();
  if (!q) return items;
  return items.filter(it => it.name.toLowerCase().includes(q));
}

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

function fmtDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

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

// Returns the earliest relevant date for an item — used for sorting, daysLeft, and urgency.
function effectiveDate(it) {
  const pkg  = it.useByDate ? new Date(it.useByDate  + "T00:00:00").getTime() : null;
  const open = it.openUseBy ? new Date(it.openUseBy  + "T00:00:00").getTime() : null;
  if (pkg !== null && open !== null) return Math.min(pkg, open);
  if (pkg  !== null) return pkg;
  if (open !== null) return open;
  return null;
}

function loadItems(key = STORAGE_KEY) {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return parsed.map((it) => ({
      id:               it.id ?? crypto.randomUUID(),
      name:             (it.name ?? "").trim(),
      useByDate:        it.useByDate        ?? "",
      openDate:         it.openDate         ?? "",
      openUseBy:        it.openUseBy        ?? null,
      category:         it.category         ?? "Other",
      quantity:         it.quantity         ?? "",
      location:         it.location         ?? "Fridge",
      storageTip:       it.storageTip       ?? "",
      openedTip:        it.openedTip        ?? "",
      daysAfterOpening: it.daysAfterOpening ?? null,
      freezeBy:         it.freezeBy         ?? "",
    }));
  } catch (e) { return []; }
}

function saveItems(items, key = STORAGE_KEY) {
  const sorted = [...items].sort((a, b) => {
    const da = effectiveDate(a) ?? Infinity;
    const db = effectiveDate(b) ?? Infinity;
    return da - db;
  });
  try { localStorage.setItem(key, JSON.stringify(sorted)); } catch (e) {}
}

function loadCommunity(key = COMMUNITY_KEY) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : { recipes: [], tips: [], chat: [] };
  } catch (e) { return { recipes: [], tips: [], chat: [] }; }
}

function saveCommunity(data, key = COMMUNITY_KEY) {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch (e) {}
}

function loadShopping(key = SHOPPING_KEY) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

function saveShopping(items, key = SHOPPING_KEY) {
  try { localStorage.setItem(key, JSON.stringify(items)); } catch (e) {}
}

function loadMeals(key = MEAL_KEY) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}

function saveMeals(meals, key = MEAL_KEY) {
  try { localStorage.setItem(key, JSON.stringify(meals)); } catch (e) {}
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

function AiBadge({ style = {} }) {
  return (
    <span style={{whiteSpace:"nowrap",...style}}>
      <span style={{color:"#f97316",fontWeight:900,fontSize:"1.2em",lineHeight:1,letterSpacing:"-0.02em"}}>A</span><span style={{color:"#4ade80",fontWeight:900,lineHeight:1,marginLeft:"0.02em"}}>i</span>
    </span>
  );
}

function GreenDot() {
  return <span style={{display:"inline-block",width:"0.32em",height:"0.32em",background:"#22c55e",borderRadius:"50%",marginLeft:"0.05em",marginRight:"0em",verticalAlign:"baseline",boxShadow:"0 0 7px #22c55e,0 0 14px rgba(34,197,94,0.4)",flexShrink:0}} />;
}

function TrackFreshLogo({ showBroc = true, style = {} }) {
  return (
    <span style={{whiteSpace:"nowrap",...style}}>
      {showBroc && <>{String.fromCodePoint(0x1F966)} </>}<span style={{color:"#fff",fontWeight:900}}>TrackFresh</span><GreenDot /><AiBadge />
    </span>
  );
}

function BloomText({ text, duration = 8 }) {
  const chars = text.split("");
  const n = chars.length;
  return (
    <span style={{display:"inline",fontWeight:700}}>
      {chars.map((ch, i) => (
        <span key={i} style={{
          display:"inline-block",
          whiteSpace: ch === " " ? "pre" : "normal",
          animation:`letterPop ${duration}s ease-in-out ${(i/n*duration).toFixed(2)}s infinite`,
          color:"#f97316",
        }}>{ch === " " ? "\u00a0" : ch}</span>
      ))}
    </span>
  );
}

const PILL = {base:{display:"inline-flex",alignItems:"center",gap:"0.25rem",borderRadius:"999px",padding:"0.18rem 0.6rem",fontSize:"0.63rem",fontWeight:700,lineHeight:1.4},gray:{background:"#f3f4f6",color:"#374151"},orange:{background:"#f5fad0",color:"#5a6e0a"},blue:{background:"#eff6ff",color:"#1d4ed8"},cyan:{background:"#ecfeff",color:"#0e7490"}};
function TipPill({ type, children }) { return <span style={{...PILL.base,...PILL[type]}}>{children}</span>; }

function ShoppingAutocomplete({ value, onChange, onSelect, onAddItem, lang }) {
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
    if (e.key === "Enter") {
      if (open && matches.length > 0) { e.preventDefault(); onSelect(matches[highlighted]); setOpen(false); }
      else { onAddItem && onAddItem(); }
      return;
    }
    if (!open || matches.length === 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setHighlighted((h) => Math.min(h + 1, matches.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHighlighted((h) => Math.max(h - 1, 0)); }
    else if (e.key === "Escape") { setOpen(false); }
  };

  return (
    <div className="relative flex-1" ref={ref}>
      <input
        value={value}
        onChange={(e) => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => { if (value) setOpen(true); }}
        onKeyDown={handleKeyDown}
        placeholder={lang === "es" ? "Agregar artículo..." : "Add item..."}
        className="w-full rounded-xl px-3 py-2 text-sm text-gray-900"
      />
      {open && matches.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border bg-white shadow-lg" style={{maxHeight:"220px",overflowY:"auto"}}>
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

function Card({ children, className = "", style = {} }) {
  return <div className={`rounded-2xl border border-green-900/20 bg-white/95 backdrop-blur-md p-5 card-3d card-premium ${className}`} style={style}>{children}</div>;
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
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } } }); if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play(); }
        
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
  const [showPhotoBtn, setShowPhotoBtn] = useState(false);
  const detectedRef = useRef(false);
  const readerRef = useRef(null);
  const timerRef = useRef(null);
  const photoTimerRef = useRef(null);

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
        photoTimerRef.current = setTimeout(() => setShowPhotoBtn(true), 8000);
        try {
          const { BrowserMultiFormatReader } = await import("@zxing/library");
          readerRef.current = new BrowserMultiFormatReader();
          readerRef.current.decodeFromStream(stream, videoRef.current, async (result) => {
            if (result && !detectedRef.current) {
              detectedRef.current = true;
              if (timerRef.current) clearTimeout(timerRef.current);
              if (readerRef.current) { try { readerRef.current.reset(); } catch(e) {} readerRef.current = null; }
              setStatus("barcode_found");
              if (photoTimerRef.current) clearTimeout(photoTimerRef.current);
              setShowPhotoBtn(false);
              if ('speechSynthesis' in window) {
                const u = new SpeechSynthesisUtterance("Barcode found. Searching, just one moment.");
                u.rate = 1.1;
                window.speechSynthesis.speak(u);
              }
              try {
                const controller = new AbortController();
                const timer = setTimeout(() => controller.abort(), 8000);
                const res = await fetch("/api/scan-barcode", {
                  method: "POST", headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ barcode: result.getText() }),
                  signal: controller.signal
                });
                clearTimeout(timer);
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
      if (photoTimerRef.current) clearTimeout(photoTimerRef.current);
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
            {status === "scanning" && "Point at barcode..."}
            {status === "barcode_found" && "✅ Barcode found! Looking up product..."}
            {status === "reading_label" && "📖 AI reading label..."}
          </p>
          {showPhotoBtn && status === "scanning" && (
            <button onClick={() => { if (captureRef && captureRef.current) captureRef.current(); }}
              style={{position:"absolute",bottom:"40px",left:"50%",transform:"translateX(-50%)",background:"rgba(251,146,60,0.95)",color:"white",border:"none",borderRadius:"20px",padding:"0.5rem 1.25rem",fontWeight:"bold",fontSize:"0.8rem",cursor:"pointer",whiteSpace:"nowrap"}}>
              📷 Can't read barcode? Photograph it
            </button>
          )}
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
  const scrollFrameRef = React.useRef(null);
  const bottomBtnRef = React.useRef(null);
  const howItWorksRef = React.useRef(null);

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
          <button onClick={() => onChangeLang(lang === "en" ? "es" : "en")} style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.25)",borderRadius:"999px",padding:"0.4rem 0.75rem",color:"#fff",fontWeight:700,fontSize:"0.8rem",cursor:"pointer"}}>{lang === "en" ? mxFlag + " ES" : usFlag + " EN"}</button>
          <button onClick={onLaunchApp} className="mkt-cta" style={{fontSize:"0.8rem",padding:"0.4rem 1.1rem"}}>{isEs ? "Abrir" : "Launch"}</button>
        </div>
      </nav>

      {/* Hero */}
<div className="mkt-hero">
  <span className="mkt-hero-eyebrow mkt-animate">
    {isEs ? "Menos Desperdicio. Mejor Cocina." : "Waste Less. Eat Better."}
  </span>

<h1 className="mkt-hero-title">
  <span className="hero-slide-left" style={{animationDelay:"0.1s"}}>{isEs ? "Tu Cocina." : "Your Kitchen."}</span>
  {" "}
  <span className="hero-slide-right" style={{animationDelay:"0.28s"}}>{isEs ? "Tu Comida." : "Your Food."}</span>
  <br/>
  <span className="hero-slide-left" style={{animationDelay:"0.45s"}}>{isEs ? "Todo" : "Fully"}</span>
  {" "}
  <span className="hero-slide-right" style={{animationDelay:"0.45s"}}>{isEs ? "Rastreado." : "Tracked."}</span>
</h1>

<p className="mkt-hero-sub mkt-animate" style={{animationDelay:"0.6s"}}>{isEs
      ? "Finalmente: sabe cuándo esa botella de ketchup, frasco de mayonesa o frasco de pepinillos en tu refrigerador realmente vencen."
      : "Finally—know when that bottle of ketchup, jar of mayo, or jar of pickles in your fridge actually expire."}
  </p>

  <p className="mkt-hero-sub mkt-animate" style={{animationDelay:"0.7s"}}>
    {isEs
      ? "Escanea alimentos, rastrea fechas de vencimiento y siempre sabe lo que hay en tu refrigerador, congelador y despensa."
      : "Scan groceries, track expiration dates, and always know what's in your fridge, freezer, and pantry."}
  </p>

        <div className="mkt-hero-btns mkt-animate" style={{animationDelay:"0.82s"}}>
          <button onClick={onLaunchApp} className="mkt-cta">{isEs ? "Empieza a Rastrear" : "Start Tracking Your Food"}</button>
          <button onClick={handleSeeHow} className="mkt-cta-ghost">{isEs ? "Cómo Funciona" : "See How It Works"}</button>
        </div>
      </div>

      {/* Dashboard mockup */}
      <div className="mkt-dashboard mkt-animate mkt-animate-d2">
        <div className="mkt-dash-header">
          <span className="mkt-dash-title">🥦 {isEs ? "Mi Cocina" : "My Kitchen"}</span>
          <span className="mkt-dash-date">{isEs ? "Hoy" : "Today"}</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem"}}>
          <div>
            <div className="mkt-dash-section">
              <div className="mkt-dash-section-label">🧊 {isEs ? "Refrigerador" : "Fridge"}</div>
              <div className="mkt-dash-item"><span className="mkt-dash-item-name">🥛 {isEs ? "Leche" : "Milk"}</span><span className="mkt-dash-badge mkt-dash-badge-yellow">{isEs ? "3 días" : "3 days"}</span></div>
              <div className="mkt-dash-item"><span className="mkt-dash-item-name">🥬 {isEs ? "Espinacas" : "Spinach"}</span><span className="mkt-dash-badge mkt-dash-badge-yellow">{isEs ? "2 días" : "2 days"}</span></div>
              <div className="mkt-dash-item"><span className="mkt-dash-item-name">🍓 {isEs ? "Fresas" : "Strawberries"}</span><span className="mkt-dash-badge mkt-dash-badge-red">{isEs ? "1 día" : "1 day"}</span></div>
            </div>
            <div className="mkt-dash-section">
              <div className="mkt-dash-section-label">❄️ {isEs ? "Congelador" : "Freezer"}</div>
              <div className="mkt-dash-item"><span className="mkt-dash-item-name">🍗 {isEs ? "Pollo" : "Chicken"}</span><span className="mkt-dash-badge mkt-dash-badge-green">{isEs ? "2 meses" : "2 mo."}</span></div>
              <div className="mkt-dash-item"><span className="mkt-dash-item-name">🦐 {isEs ? "Camarón" : "Shrimp"}</span><span className="mkt-dash-badge mkt-dash-badge-green">{isEs ? "3 meses" : "3 mo."}</span></div>
            </div>
          </div>
          <div>
            <div className="mkt-dash-section">
              <div className="mkt-dash-section-label">🏺 {isEs ? "Despensa" : "Pantry"}</div>
              <div className="mkt-dash-item"><span className="mkt-dash-item-name">🍝 Pasta</span><span className="mkt-dash-badge mkt-dash-badge-blue">{isEs ? "1 año" : "1 yr"}</span></div>
              <div className="mkt-dash-item"><span className="mkt-dash-item-name">🍅 {isEs ? "Salsa" : "Tom. Sauce"}</span><span className="mkt-dash-badge mkt-dash-badge-green">{isEs ? "8 meses" : "8 mo."}</span></div>
            </div>
            <div className="mkt-dash-use-soon">
              <div className="mkt-dash-use-soon-label">⚡ {isEs ? "Usar Pronto" : "Use Soon"}</div>
              <div className="mkt-dash-use-soon-items">
                <span className="mkt-dash-use-soon-chip">🍓 {isEs ? "Fresas" : "Strawberries"}</span>
                <span className="mkt-dash-use-soon-chip">🥬 {isEs ? "Espinacas" : "Spinach"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mkt-section mkt-section-dark mkt-animate mkt-animate-d1">
        <div className="mkt-stats">
          <div><div className="mkt-stat-num">40%</div><div className="mkt-stat-label">{isEs ? "de la comida se desperdicia" : "of food produced is wasted"}</div></div>
          <div><div className="mkt-stat-num">$1,500</div><div className="mkt-stat-label">{isEs ? "tirado por familia al año" : "thrown away per family yearly"}</div></div>
          <div><div className="mkt-stat-num">43%</div><div className="mkt-stat-label">{isEs ? "del desperdicio ocurre en casa" : "of waste happens at home"}</div></div>
        </div>
      </div>

      {/* Why TrackFresh Works */}
      <div className="mkt-section">
        <div style={{maxWidth:"720px",margin:"0 auto"}}>
          <div className="mkt-section-title" style={{marginBottom:"0.5rem"}}><h2>{isEs ? "Por Qué Funciona TrackFresh" : "Why TrackFresh Works"}</h2></div>
          <div className="mkt-benefits" style={{marginTop:"0.15rem",gap:"0.2rem"}}>
            {[
              {icon:"👁️", title:isEs?"Sabe lo que tienes":"Know what you have",          desc:isEs?"Deja de olvidar lo que ya tienes en tu cocina.":"Stop forgetting what's already in your kitchen."},
              {icon:"⏱️", title:isEs?"Usa antes de que venza":"Use food before it expires", desc:isEs?"Obtén visibilidad clara de lo que necesita atención primero.":"Get clear visibility into what needs attention first."},
              {icon:"🛒", title:isEs?"Compra más inteligente":"Shop smarter",              desc:isEs?"Evita comprar duplicados y desperdiciar dinero.":"Avoid buying duplicates and wasting money."},
              {icon:"🍳", title:isEs?"Planifica comidas fácilmente":"Plan meals more easily", desc:isEs?"Convierte lo que ya tienes en ideas de comidas simples.":"Turn what you already own into simple meal ideas."},
            ].map((b,i) => (
              <div key={i} className="mkt-benefit-card mkt-animate" style={{animationDelay:0.1*i+"s",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                <div className="mkt-benefit-icon">{b.icon}</div>
                <h3>{b.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div ref={howItWorksRef} className="mkt-section mkt-section-dark">
        <div className="mkt-section-title"><h2>{isEs ? "Cómo Funciona" : "How It Works"}</h2></div>
        <div className="mkt-3steps">
          {[
            {n:"1", title:isEs?"Escanea":"Scan",  desc:isEs?"Agrega alimentos por código de barras o etiqueta.":"Add groceries by barcode or label."},
            {n:"2", title:isEs?"Rastrea":"Track", desc:isEs?"Organiza la comida en tu refrigerador, congelador y despensa.":"Organize food in your fridge, freezer, and pantry."},
            {n:"3", title:isEs?"Usa":"Use",       desc:isEs?"Ve qué usar primero antes de que se eche a perder.":"See what to use first before it goes bad."},
          ].map((s,i) => (
            <div key={i} className="mkt-3step mkt-animate" style={{animationDelay:0.12*i+"s"}}>
              <div className="mkt-3step-num">{s.n}</div>
              <h3>{s.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Statement */}
      <div className="mkt-animate mkt-animate-d3" style={{background:"rgba(0,0,0,0.22)",padding:"0.75rem 1.5rem",textAlign:"center"}}>
        <h2 style={{fontSize:"1.6rem",fontWeight:900,marginBottom:"0",letterSpacing:"-0.01em"}}>{isEs ? "Más Que un Rastreador. Una Cocina Más Inteligente." : "More Than a Tracker. A Smarter Kitchen."}</h2>
      </div>

      {/* Stores */}
      <div className="mkt-section mkt-animate mkt-animate-d2">
        <div className="mkt-section-title"><h2>{isEs ? "Enlaza y Compra en Línea" : "Link And Shop Online"}</h2></div>
        <p style={{textAlign:"center",opacity:0.75,marginBottom:"0.6rem",fontSize:"0.85rem"}}>{isEs ? "Conecta directamente con tus tiendas favoritas." : "Shop directly from your favorite stores."}</p>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"0.5rem"}}>
          {[
            {logo:"https://www.google.com/s2/favicons?domain=amazon.com&sz=128",         name:"Amazon Fresh"},
            {logo:"https://www.google.com/s2/favicons?domain=kroger.com&sz=128",          name:"Kroger"},
            {logo:"https://www.google.com/s2/favicons?domain=walmart.com&sz=128",         name:"Walmart"},
            {logo:"https://www.google.com/s2/favicons?domain=wholefoodsmarket.com&sz=128",name:"Whole Foods"},
            {logo:"https://www.google.com/s2/favicons?domain=target.com&sz=128",          name:"Target"},
            {logo:"https://www.google.com/s2/favicons?domain=costco.com&sz=128",          name:"Costco"},
            {logo:"https://www.google.com/s2/favicons?domain=traderjoes.com&sz=128",      name:"Trader Joe's"},
            {logo:"https://www.google.com/s2/favicons?domain=instacart.com&sz=128",       name:"Instacart"},
          ].map(({logo,name}) => (
            <div key={name} className="mkt-store-card" style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.25rem",background:"rgba(255,255,255,0.1)",borderRadius:"14px",padding:"0.5rem 0.65rem",minWidth:"80px",border:"1px solid rgba(255,255,255,0.18)"}}>
              <div style={{width:44,height:44,background:"#fff",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",padding:3}}>
                <img src={logo} alt={name} style={{width:38,height:38,objectFit:"contain"}} onError={e=>{e.target.parentNode.innerHTML='<span style="font-size:1.4rem">🏪</span>';}} />
              </div>
              <span style={{fontSize:"0.6rem",fontWeight:700,color:"rgba(255,255,255,0.92)",textAlign:"center"}}>{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="mkt-section mkt-animate mkt-animate-d4" style={{textAlign:"center",paddingTop:"0.5rem",paddingBottom:"1.5rem"}}>
        <p style={{fontSize:"1.1rem",fontWeight:500,opacity:0.85,marginBottom:"0.6rem"}}>{isEs ? "¿Listo?" : "Ready?"}</p>
        <button ref={bottomBtnRef} onClick={onLaunchApp} className="mkt-cta" style={{fontSize:"1.1rem",padding:"0.6rem 2.5rem"}}>{isEs ? "Empieza a Rastrear tu Comida" : "Start Tracking Your Food"}</button>
      </div>

      <div className="mkt-footer"><TrackFreshLogo /> © 2026 — {isEs ? "Ahorra Comida. Ahorra Dinero. Salva el Planeta." : "Save Food. Save Money. Save the Planet."}</div>
    </div>
  );
}

const TUTORIALS = {
  home: [
    { emoji: "🥦", title: "Welcome to TrackFresh.AI!", body: "Your intelligent kitchen assistant — tracks food, surfaces expiry urgency, suggests recipes, plans meals, and manages your shopping list. All your data saves automatically." },
    { emoji: "⚡", title: "Your Kitchen Today", body: "The dashboard reads your tracked items and tells you exactly what needs attention — Use Today, Use Soon, Use This Week, or Everything Looks Fresh. It updates automatically as items change." },
    { emoji: "⚡", title: "Use Soon Tile", body: "The full-width Use Soon tile at the top of the dashboard shows how many items are expiring in 1–3 days. Tap it to see everything sorted by urgency across Fridge, Freezer, and Pantry." },
    { emoji: "📂", title: "Mark What You've Opened", body: "Tap 'Mark What You've Opened' on the dashboard or in Tracker to mark any item as opened. TrackFresh calculates a use-by date based on shelf life after opening and starts a new countdown." },
    { emoji: "🥗", title: "Set Up Dietary Needs", body: "Go to the Dietary tab and add household restrictions plus individual profiles for each family member. Recipes, shopping alerts, and your meal plan all adapt automatically." },
  ],
  tracker: [
    { emoji: "🧾", title: "Receipt Scanner — Start Here", body: "The #1 recommended way to add food. Snap your grocery receipt and AI reads every item, sets expiry dates, and organizes by category. After scanning, the Expiry Date Assistant lets you speak dates by voice." },
    { emoji: "📷", title: "Smart Scan", body: "Point your camera at any food product. Smart Scan detects barcodes or labels automatically — no mode switching needed. It identifies the item, category, location, and storage tips in seconds." },
    { emoji: "📦", title: "Scan Multiple", body: "Lay several products together or line them up and take one photo. AI identifies every item in the frame at once — great for stocking up after a big shop." },
    { emoji: "📂", title: "Mark What You've Opened", body: "Tap 'Mark What You've Opened' to mark an existing item as opened. Search by name, use voice, or browse by Fridge/Freezer/Pantry. The countdown switches to opened shelf life automatically." },
    { emoji: "⏰", title: "Watch the Colors", body: "Red = expires very soon. Orange = 2–4 days. Yellow = this week. Green = all good. Items with no date show a flashing 'Add Date' badge — tap Edit to fill it in." },
    { emoji: "📅", title: "Date Display", body: "Each item card shows the most relevant date insight: 'Use by Mar 20' for sealed items, or '📂 Opened Mar 16 · Use within 5 days' for opened items. The countdown badge is always the visual anchor." },
  ],
  recipes: [
    { emoji: "🍳", title: "Recipes From Your Fridge", body: "Tap 'Get AI Recipe Ideas' and TrackFresh builds recipes around what you already have, prioritizing whatever expires soonest. No more forgotten produce!" },
    { emoji: "🥦", title: "Use What I Have Mode", body: "Strict mode — only uses your tracked items plus basic pantry staples like salt and oil. Perfect for using up what's already in your kitchen without an extra shopping trip." },
    { emoji: "✨", title: "Suggest Missing Ingredients", body: "AI adds 1–2 extra ingredients with real brand names (e.g. 'Heinz Ketchup') to complete a dish. Items you already have are marked ✓, extras marked 'need:'." },
    { emoji: "🔒", title: "Dietary Filters Active", body: "Every recipe respects the restrictions you've set in the Dietary tab — for the whole household and each individual family member." },
  ],
  shopping: [
    { emoji: "🛒", title: "Your Smart Shopping List", body: "Add items with an optional quantity, check them off as you shop, and your list saves automatically — even if you close the app mid-shop." },
    { emoji: "🔄", title: "Used Items — Restock", body: "When you mark a tracked item as used, it moves to the 'Recently Used — Restock' section as a reminder. Check it off once it's in your cart." },
    { emoji: "⚠️", title: "Allergen Warnings", body: "Shopping items that match your dietary restrictions are automatically flagged with a red ⚠️ badge — no extra setup needed." },
    { emoji: "🤖", title: "Auto-Add from Meals", body: "When AI plans your weekly meals, missing ingredients are added to your shopping list with a meal tag showing which meal they belong to." },
  ],
  meals: [
    { emoji: "📅", title: "Plan Your Whole Week", body: "Monday through Sunday — Breakfast, Lunch, and Dinner. Each slot shows the meal name and a toggle to view full ingredients and step-by-step instructions." },
    { emoji: "🤖", title: "AI Plans for Everyone", body: "Tap 'AI Plan My Week' and TrackFresh fills all 21 meals using your tracked food, prioritizing items expiring soonest. Every meal respects your household and family member dietary restrictions." },
    { emoji: "✏️", title: "Edit Any Meal", body: "Tap ✕ on any slot to clear it, then tap the slot to pick a different meal. Add custom meal names or search the built-in recipe list. Changes save instantly." },
    { emoji: "🎯", title: "Tap to See the Recipe", body: "Tap ▼ on any AI-planned meal to expand the full recipe card — ingredients list and cooking instructions included." },
  ],
  composting: [
    { emoji: "🌱", title: "Close the Loop", body: "Food you can't eat doesn't have to be trash. Composting turns scraps into rich soil and keeps methane out of landfills." },
    { emoji: "🪣", title: "Choose Your Method", body: "Tumbler, Worm Bin, Bokashi, Electric Recycler, or Traditional Bin — each section explains the pros, cons, setup, and what it accepts." },
    { emoji: "🌍", title: "Real Impact", body: "The average family wastes 30% of the food they buy. Composting that waste meaningfully shrinks your carbon footprint every week." },
    { emoji: "🛒", title: "Shop Composting Gear", body: "Tap the Shop button in any composting section to find quality gear from our sustainability partners." },
  ],
  community: [
    { emoji: "👥", title: "Community Chat", body: "Connect with other TrackFresh users. Share what you cooked, ask food questions, and cheer each other on. A daily tip posts every morning to kick off the conversation." },
    { emoji: "🤖", title: "Ask AI by Text", body: "Type a food question and tap 'Ask AI Text' — TrackFresh AI answers in the chat. Storage, cooking, shelf life, and reducing waste are its specialties." },
    { emoji: "🎤", title: "Ask AI by Voice", body: "Tap '🎤 Ask AI' to speak your question. Your voice is transcribed and sent to AI automatically — no typing needed." },
    { emoji: "💡", title: "Recipes & Tips Tabs", body: "Share a recipe in the Recipes tab to add it to the community cookbook. Post a tip in the Tips tab to help others waste less." },
  ],
  more: [
    { emoji: "💬", title: "Suggestions", body: "Share feedback on any section of the app — rate your experience and leave ideas. Your input shapes what gets built next." },
    { emoji: "👤", title: "Your Username", body: "Your username appears in Community when you post. Change it anytime from the Community tab." },
    { emoji: "🌐", title: "English / Spanish", body: "Switch between English and Español with one tap. Every label, button, tip, and category updates instantly. Your preference saves automatically." },
    { emoji: "💾", title: "Data Always Saves", body: "All tracked items, meal plans, shopping lists, dietary profiles, and community posts save to your device automatically. No account needed." },
  ],
  "stores-page": [
    { emoji: "🏪", title: "Linked Stores", body: "Connect your favorite grocery stores to TrackFresh so you can shop smarter and compare prices easily." },
    { emoji: "🔗", title: "Coming Soon", body: "Deep store integrations are on the way — tap an item on your shopping list and jump straight to the store's product page." },
    { emoji: "💰", title: "Partner Discounts", body: "Partner stores offer TrackFresh users exclusive deals. Check back often for new savings." },
  ],
  dietary: [
    { emoji: "🥗", title: "Household Restrictions", body: "Set restrictions that apply to everyone — vegetarian, vegan, gluten-free, keto, nut-free, dairy-free, and more. These filter every recipe and meal plan automatically." },
    { emoji: "👨‍👩‍👧", title: "Family Member Profiles", body: "Add a name for each household member and set their individual restrictions. The app merges everyone's needs so every suggested meal is safe for the whole family." },
    { emoji: "⚠️", title: "Allergen Alerts in Shopping", body: "Shopping list items that match any active restriction are flagged with a red ⚠️ badge automatically — no extra setup needed." },
    { emoji: "🎯", title: "Active Across the App", body: "Dietary profiles are live in Recipes, Shopping allergen warnings, and the AI Meal Planner. The more you set up here, the smarter the whole app gets." },
  ],
  partners: [
    { emoji: "🤝", title: "TrackFresh Partners", body: "Our partners share our mission — less food waste, healthier kitchens, and a greener planet for everyone." },
    { emoji: "🎁", title: "Exclusive Benefits", body: "As a TrackFresh user you unlock special offers from partner brands in food, wellness, and sustainability." },
    { emoji: "🌿", title: "Join the Movement", body: "Every partnership supports our goal: helping 1 million families reduce food waste by 2027." },
  ],
};

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
    if (pwInput === "fresh2026" || pwInput === "CarlosG2026") { setIsUnlocked(true); setPwError(false); try { if (window.sessionStorage) { sessionStorage.setItem("tf_ok", "1"); if (pwInput === "fresh2026") sessionStorage.setItem("tf_admin", "1"); } } catch(e) {} if (pwInput === "fresh2026") setIsAdmin(true); } else { setPwError(true); }
  };
  const [isAdmin, setIsAdmin] = useState(false);
  React.useEffect(() => { try { if (typeof window !== "undefined" && window.sessionStorage) { if (sessionStorage.getItem("tf_ok") === "1") setIsUnlocked(true); if (sessionStorage.getItem("tf_admin") === "1") setIsAdmin(true); } } catch(e) {} }, []);
  const [activeTab, setActiveTab] = useState("home");
  const homeTopRef = React.useRef(null);
  const [burstingBubble, setBurstingBubble] = useState(null);
  const trackerTopRef = React.useRef(null);
  const [trackerEntryFlash, setTrackerEntryFlash] = useState(false);
  const [trackerLinkOverlay, setTrackerLinkOverlay] = useState(false);
  const [trackerTileFlash, setTrackerTileFlash] = useState(false);
  useEffect(() => {
    if (trackerEntryFlash) {
      const t = setTimeout(() => setTrackerEntryFlash(false), 650);
      return () => clearTimeout(t);
    }
  }, [trackerEntryFlash]);
  const handleGoToTracker = () => {
    setTrackerTileFlash(true);
    setTrackerLinkOverlay(true);
    setTimeout(() => {
      setTrackerEntryFlash(true);
      setActiveTab("tracker");
    }, 240);
    setTimeout(() => {
      setTrackerTileFlash(false);
      setTrackerLinkOverlay(false);
    }, 900);
  };
  const handleBubbleTap = (target) => {
    setBurstingBubble(target);
    setTimeout(() => {
      setActiveTab(target);
      setBurstingBubble(null);
    }, 550);
  };
  const [trackedItems, setTrackedItems] = useState([]);
  const [justAddedFirst, setJustAddedFirst] = useState(false);
  const prevItemCount = React.useRef(0);
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
  const [recipeMode, setRecipeMode] = useState("suggest");
  const [editDateListening, setEditDateListening] = useState(false);

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
  const [labelScanCount, setLabelScanCount] = useState(0);
  const [labelLastItem, setLabelLastItem] = useState("");
  const [labelScanMode, setLabelScanMode] = useState(null);
  const [labelScanKey, setLabelScanKey] = useState(0);
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
  const [compExpanded, setCompExpanded] = useState({});
  const toggleComp = (key) => setCompExpanded(p => ({...p, [key]: !p[key]}));
  const DIETARY_KEY = "tf_dietary";
  const [dietaryRestrictions, setDietaryRestrictions] = useState(() => { try { return JSON.parse(localStorage.getItem(DIETARY_KEY) || "{}"); } catch(e) { return {}; } });
  const toggleDietary = (key) => setDietaryRestrictions(p => { const next = {...p, [key]: !p[key]}; try { localStorage.setItem(DIETARY_KEY, JSON.stringify(next)); } catch(e) {} return next; });
  const [familyMembers, setFamilyMembers] = useState(() => { try { return JSON.parse(localStorage.getItem("tf_family") || "[]"); } catch(e) { return []; } });
  const [familyInput, setFamilyInput] = useState("");
  const [expandedMember, setExpandedMember] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  const [editMemberName, setEditMemberName] = useState("");
  const DIETARY_TAGS = [["vegetarian","🥦","Vegetarian"],["vegan","🌱","Vegan"],["glutenFree","🌾","Gluten-Free"],["dairyFree","🥛","Dairy-Free"],["nutFree","🥜","Nut-Free"],["lowSodium","🧂","Low Sodium"],["highProtein","💪","High Protein"],["lowSugar","🍬","Low Sugar"]];
  const saveMembersToStorage = (next) => { try { localStorage.setItem("tf_family", JSON.stringify(next)); } catch(e) {} };
  const addFamilyMember = () => { if (!familyInput.trim()) return; const next = [...familyMembers, {name: familyInput.trim(), restrictions: {}}]; setFamilyMembers(next); saveMembersToStorage(next); setFamilyInput(""); };
  const removeFamilyMember = (i) => { const next = familyMembers.filter((_,idx) => idx !== i); setFamilyMembers(next); saveMembersToStorage(next); if (expandedMember === i) setExpandedMember(null); };
  const toggleMemberTag = (i, key) => { const next = familyMembers.map((m, idx) => idx === i ? {...m, restrictions: {...(m.restrictions||{}), [key]: !(m.restrictions||{})[key]}} : m); setFamilyMembers(next); saveMembersToStorage(next); };
  const saveMemberName = (i) => { if (!editMemberName.trim()) return; const next = familyMembers.map((m, idx) => idx === i ? {...m, name: editMemberName.trim()} : m); setFamilyMembers(next); saveMembersToStorage(next); setEditingMember(null); setEditMemberName(""); };
  const [quickVoiceListening, setQuickVoiceListening] = useState("");
  const [quickVoiceError, setQuickVoiceError] = useState("");
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [scanMode, setScanMode] = useState(null);
  const [multiScanCount, setMultiScanCount] = useState(0);
  const [multiScanLastItem, setMultiScanLastItem] = useState("");
  const multiScanTimer = React.useRef(null);
  const resetMultiScanTimer = () => {
    if (multiScanTimer.current) clearTimeout(multiScanTimer.current);
    multiScanTimer.current = setTimeout(() => {
      setShowBarcodeScanner(false); setBarcodeItem(null); setBarcodeError(""); setBarcodeDetected("");
      setMultiScanCount(0); setMultiScanLastItem("");
    }, 30000);
  };
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
  const [uniScanCount, setUniScanCount] = useState(0);
  const [uniScanLastItem, setUniScanLastItem] = useState("");
  const [voiceFlowStep, setVoiceFlowStep] = useState(null);
  const [smartScanKey, setSmartScanKey] = useState(0);
  const [voiceFlowPaused, setVoiceFlowPaused] = useState(false);
  const [showVoiceEditForm, setShowVoiceEditForm] = useState(false);
  const uniScanTimer = React.useRef(null);
  const voiceFlowRef = React.useRef(null);
  const voiceCmdRef = React.useRef(null);
  const voiceFeedbackTimer = React.useRef(null);
  const [showExpiryVoice, setShowExpiryVoice] = useState(false);
  const [expiryVoiceItems, setExpiryVoiceItems] = useState([]);
  const [expiryVoiceLog, setExpiryVoiceLog] = useState([]);
  const [expiryVoiceStatus, setExpiryVoiceStatus] = useState("speaking");
  const expiryVoiceRef = React.useRef(null);
  const [voiceCmdActive, setVoiceCmdActive] = useState(false);
  const [voiceCmdFeedback, setVoiceCmdFeedback] = useState("");
  const [showOpenedModal, setShowOpenedModal] = useState(false);
  const [openedSearch, setOpenedSearch] = useState("");
  const [openedConfirm, setOpenedConfirm] = useState(null);
  const [showOpenedDateEdit, setShowOpenedDateEdit] = useState(false);
  const [openedEditDate, setOpenedEditDate] = useState("");
  const [openedModalOffset, setOpenedModalOffset] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  const resetUniScanTimer = () => {
    if (uniScanTimer.current) clearTimeout(uniScanTimer.current);
    uniScanTimer.current = setTimeout(() => {
      handleDoneUniScan();
    }, 30000);
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 1.1;
      u.pitch = 1;
      window.speechSynthesis.speak(u);
      return u;
    }
    return null;
  };

  const speakThen = (text, cb) => {
    if (!('speechSynthesis' in window)) { setTimeout(cb || (() => {}), 300); return; }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.1; u.pitch = 1;
    const ms = Math.max(2000, (text.trim().split(/\s+/).length / 120) * 60000 + 1200);
    let done = false;
    const fire = () => { if (!done) { done = true; if (cb) cb(); } };
    u.onend = fire; setTimeout(fire, ms);
    window.speechSynthesis.speak(u);
  };

  const startVoiceCommand = (onResult) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    if (voiceFlowRef.current) { try { voiceFlowRef.current.abort(); } catch(e) {} }
    const recog = new SR();
    recog.lang = lang === "es" ? "es-MX" : "en-US";
    recog.interimResults = false;
    recog.maxAlternatives = 3;
    voiceFlowRef.current = recog;
    let gotResult = false;
    recog.onresult = (ev) => {
      gotResult = true;
      voiceFlowRef.current = null;
      const transcript = ev.results[0][0].transcript.toLowerCase().trim();
      onResult(transcript);
    };
    recog.onerror = (e) => {
      if (e.error === 'aborted') return;
      setTimeout(() => { if (!gotResult) startVoiceCommand(onResult); }, 300);
    };
    recog.onend = () => {
      setTimeout(() => { if (!gotResult && voiceFlowRef.current === recog) startVoiceCommand(onResult); }, 300);
    };
    recog.start();
  };

  const listenForDate = () => {
    setVoiceFlowStep("listening_date");
    startVoiceCommand((transcript) => {
      const t = transcript.toLowerCase();
      if (t.includes("pause") || t.includes("pausa")) { setVoiceFlowPaused(true); speak(lang === "es" ? "Pausado." : "Paused."); return; }
      if (t.includes("edit") || t.includes("editar")) { setShowVoiceEditForm(true); speak(lang === "es" ? "Modo edición." : "Edit mode. Say Return to Scan when done."); return; }
      if (t.includes("stop") || t.includes("detener")) { handleDoneUniScan(); return; }
      if (t.includes("skip") || t.includes("omitir")) { speak(lang === "es" ? "Omitido." : "Skipped."); resetSmartScanner(); setTimeout(() => startScanCommandLoop(), 1200); return; }
      const parsed = parseSpokenDate(transcript);
      if (parsed) {
        setSmartUseBy(parsed);
        setVoiceFlowStep("say_next");
        const loc = smartLocation || 'Fridge';
        const locPrompt = lang === 'es'
          ? 'Fecha capturada. Donde lo guardas? Di Refrigerador, Congelador o Despensa.'
          : 'Date captured. Where are you storing it? Say Fridge, Freezer, or Pantry.';
        speakThen(locPrompt, () => {
          setVoiceFlowStep('listening_location');
          startVoiceCommand((cmd) => {
            const t = cmd.toLowerCase();
            if (t.includes('fridge') || t.includes('refrigerador') || t.includes('refri')) setSmartLocation('Fridge');
            else if (t.includes('freeze') || t.includes('freezer') || t.includes('congelador')) setSmartLocation('Freezer');
            else if (t.includes('pantry') || t.includes('despensa')) setSmartLocation('Pantry');
            speakThen(lang === 'es' ? 'Di Siguiente para continuar o Listo para terminar.' : 'Say Next to continue or Done to finish.', () => {
              setVoiceFlowStep('listening_next');
              startVoiceCommand((cmd2) => handleVoiceNextDone(cmd2));
            });
          });
        });
      } else {
        speak(lang === "es" ? "No entendí. Intente de nuevo." : "Could not understand. Try again.");
        setTimeout(() => listenForDate(), 1800);
      }
    });
  };

  const startScanCommandLoop = () => {
    startVoiceCommand((transcript) => {
      const t = transcript.toLowerCase();
      if (t.includes('capture') || t.includes('capturar') || t.includes('photo') || t.includes('foto')) {
        if (smartCaptureRef && smartCaptureRef.current) smartCaptureRef.current();
        else setTimeout(() => startScanCommandLoop(), 500);
      } else if (t.includes('skip') || t.includes('omitir') || t.includes('saltar')) {
        speakThen(lang === "es" ? "Omitido." : "Skipped.", () => startScanCommandLoop());
      } else if (t.includes('edit') || t.includes('editar')) {
        setShowVoiceEditForm(true);
        speak(lang === "es" ? "Modo edición. Di Volver a Escanear para continuar." : "Edit mode. Say Return to Scan when done.");
      } else if (t.includes('pause') || t.includes('pausa')) {
        setVoiceFlowPaused(true);
        speak(lang === "es" ? "Pausado. Di Continuar." : "Paused. Say Continue to resume.");
      } else if (t.includes('continue') || t.includes('continuar')) {
        setVoiceFlowPaused(false);
        speakThen(lang === "es" ? "Continuando." : "Continuing.", () => startScanCommandLoop());
      } else if (t.includes('return') || t.includes('volver')) {
        setShowVoiceEditForm(false);
        speakThen(lang === "es" ? "Volviendo al escáner." : "Returning to scanner.", () => startScanCommandLoop());
      } else if (t.includes('stop') || t.includes('detener') || t.includes('parar')) {
        handleDoneUniScan();
      } else {
        startScanCommandLoop();
      }
    });
  };

  const handleSmartResultMulti = (item) => {
    if (voiceFlowRef.current) { try { voiceFlowRef.current.abort(); } catch(e) {} }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setSmartResult(item);
    setSmartError("");
    setShowVoiceEditForm(false);
    resetUniScanTimer();
    setSmartLocation(item.location || "Fridge");
    const itemName = item.name || "item";
    setVoiceFlowStep("say_date");

  };
  const handleVoiceNextDone = (cmd) => {
    const t = cmd.toLowerCase();
    if (t.includes("pause") || t.includes("pausa")) { setVoiceFlowPaused(true); speak(lang === "es" ? "Pausado." : "Paused. Say Continue."); return; }
    if (t.includes("edit") || t.includes("editar")) { setShowVoiceEditForm(true); speak(lang === "es" ? "Modo edición." : "Edit mode. Say Return to Scan when done."); return; }
    if (t.includes("stop") || t.includes("detener")) { handleDoneUniScan(); return; }
    if (t.includes("next") || t.includes("siguiente") || t.includes("próxima") || t.includes("proxima")) { handleAddSmartItemMulti(); return; }
    if (t.includes("done") || t.includes("listo") || t.includes("lista") || t.includes("finish") || t.includes("terminar")) { handleAddSmartItemMulti(); setTimeout(() => handleDoneUniScan(), 300); return; }
    setVoiceFlowStep("listening_next");
    startVoiceCommand((cmd2) => handleVoiceNextDone(cmd2));
  };
  const handleAddSmartItemMulti = () => {
    if (!smartResult) return;
    if (voiceFlowRef.current) { try { voiceFlowRef.current.abort(); } catch(e) {} voiceFlowRef.current = null; }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    const itemName = smartResult.name || "Unknown Item";
    const newItem = { id: Date.now().toString(), name: itemName, useByDate: smartUseBy || "", openDate: "", category: smartResult.category || "Other", quantity: "1", location: smartLocation || smartResult.location || "Fridge", freezeByDate: smartFreezeBy || "" };
    setTrackedItems(prev => [newItem, ...prev]);
    setUniScanCount(prev => prev + 1);
    setUniScanLastItem(itemName);
    resetSmartScanner();
    setVoiceFlowStep(null);
    resetUniScanTimer();
    setSmartScanKey(prev => prev + 1);
  };





  const handleDoneUniScan = () => {
    setShowSmartScanner(false);
    resetSmartScanner();
    setUniScanCount(0);
    setUniScanLastItem("");
    setVoiceFlowStep(null);
    if (uniScanTimer.current) clearTimeout(uniScanTimer.current);
    if (voiceFlowRef.current) { try { voiceFlowRef.current.abort(); } catch(e) {} }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  };

  const handleSmartError = (msg) => { setSmartError(msg); setSmartResult(null); };
  const resetSmartScanner = () => { setSmartResult(null); setSmartError(""); setSmartLocation(""); setSmartUseBy(""); setSmartFreezeBy(""); setScanningDate(false); setVoiceListening(false); setVoicePromptDone(false); setShowVoiceEditForm(false); setVoiceFlowStep(null); setShowExpiryVoice(false); };
  const handleAddSmartItem = () => {
    if (!smartResult) return;
    const newItem = { id: Date.now().toString(), name: smartResult.name || "Unknown Item", useByDate: smartUseBy || "", openDate: new Date().toISOString().split("T")[0], category: smartResult.category || "Other", quantity: "1", location: smartLocation || smartResult.location || "Fridge", freezeByDate: smartFreezeBy || "", daysAfterOpening: smartResult.daysAfterOpening || null, storageTip: smartResult.storageTip || "", openedTip: smartResult.openedTip || "" };
    setTrackedItems(prev => [newItem, ...prev]);
    if (scanMode === "single") {
      setShowSmartScanner(false); resetSmartScanner(); setScanMode(null);
    } else {
      setUniScanCount(prev => prev + 1); setUniScanLastItem(newItem.name);
      resetSmartScanner(); setSmartScanKey(prev => prev + 1); resetUniScanTimer();
    }
  };
  const [voiceListening, setVoiceListening] = useState("");
  const [voicePromptDone, setVoicePromptDone] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const [showReceiptScanner, setShowReceiptScanner] = useState(false);
  const [receiptScanning, setReceiptScanning] = useState(false);
  const [receiptItems, setReceiptItems] = useState([]);
  const [receiptError, setReceiptError] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  useEffect(() => { try { if (!localStorage.getItem("trackfresh.welcomed")) setShowWelcome(true); } catch(e) {} }, []);
  useEffect(() => {
    if (trackedItems.length === 0) return;
    const urgent = trackedItems.filter(it => it.daysLeft !== null && it.daysLeft <= 2);
    if (urgent.length > 0) { setAlertItem({ name: urgent[0].name, daysLeft: urgent[0].daysLeft }); setShowAlert(true); }
  }, [trackedItems.length]);
  useEffect(() => {
    if (!showOpenedModal) { setOpenedModalOffset(0); return; }
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => {
      const kbHeight = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      setOpenedModalOffset(kbHeight);
    };
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    update();
    return () => { vv.removeEventListener("resize", update); vv.removeEventListener("scroll", update); };
  }, [showOpenedModal]);

  useEffect(() => {
    setTrackedItems(loadItems());
    setCommunity(loadCommunity());
    setShoppingItems(loadShopping());
    setMeals(loadMeals());
    let savedName = null; try { savedName = localStorage.getItem(USERNAME_KEY); } catch(e) {}
    if (savedName) setUsername(savedName);
  }, []);
  useEffect(() => { saveItems(trackedItems); }, [trackedItems]);
  useEffect(() => { saveCommunity(community); }, [community]);
  useEffect(() => { saveShopping(shoppingItems); }, [shoppingItems]);
  useEffect(() => { saveMeals(meals); }, [meals]);
  useEffect(() => { try { localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(savedRecipes)); } catch(e) {} }, [savedRecipes]);
  useEffect(() => { try { localStorage.setItem(RECIPE_MODE_KEY, recipeMode); } catch(e) {} }, [recipeMode]);
  useEffect(() => { try { window.scrollTo(0, 0); } catch(e) {} }, [activeTab]);

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
        body: JSON.stringify({ expiring: expiringNames, available: allItems, dietaryNeeds: activeDietaryProfile })
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

  // All known tag keys → human-readable labels (shared between household and per-member use)
  const ALL_TAG_LABELS = {vegetarian:"Vegetarian",vegan:"Vegan",glutenFree:"Gluten-Free",dairyFree:"Dairy-Free",nutFree:"Nut-Free",lowSodium:"Low Sodium",highProtein:"High Protein",lowSugar:"Low Sugar",halal:"Halal",kosher:"Kosher",keto:"Keto"};

  const ALLERGEN_KEYWORDS = {
    "Nut-Free":    ["nut","peanut","almond","cashew","walnut","pecan","pistachio","hazelnut","macadamia"],
    "Dairy-Free":  ["milk","cheese","butter","cream","yogurt","dairy","whey","lactose","brie","cheddar","mozzarella","parmesan"],
    "Gluten-Free": ["wheat","bread","flour","gluten","pasta","noodle","cereal","barley","rye","cracker","biscuit","bagel","pretzel"],
    "Vegan":       ["meat","chicken","beef","pork","fish","salmon","tuna","shrimp","egg","honey","gelatin","lard"],
    "Vegetarian":  ["meat","chicken","beef","pork","fish","salmon","tuna","shrimp","turkey","bacon","ham","sausage"],
    "Low Sodium":  ["salt","soy sauce","pickle","chip","pretzel","jerky","anchovy","capers"],
    "Low Sugar":   ["candy","sugar","syrup","soda","juice","cookie","cake","chocolate","jam","jelly"],
  };

  // Derived dietary profile — merges household + all family member restrictions.
  // Shape: { household: string[], members: {name, tags}[], combinedTags: string[] }
  // combinedTags = union of all active restrictions across the household.
  // This is the single object passed to the meal planner API.
  const activeDietaryProfile = useMemo(() => {
    const householdTags = Object.entries(dietaryRestrictions).filter(([,on]) => on).map(([key]) => ALL_TAG_LABELS[key] || key);
    const memberProfiles = familyMembers
      .map(m => ({ name: m.name, tags: Object.entries(m.restrictions || {}).filter(([,on]) => on).map(([key]) => ALL_TAG_LABELS[key] || key) }))
      .filter(m => m.tags.length > 0);
    const combinedTags = [...new Set([...householdTags, ...memberProfiles.flatMap(m => m.tags)])];
    return { household: householdTags, members: memberProfiles, combinedTags };
  }, [dietaryRestrictions, familyMembers]);

  const itemsWithCountdown = useMemo(() => trackedItems.map((it) => {
    const eff = effectiveDate(it);
    const daysLeft = eff !== null ? Math.ceil((eff - new Date().setHours(0,0,0,0)) / 86400000) : null;
    return { ...it, daysLeft };
  }), [trackedItems]);

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

  const addToShoppingIfMissing = (item, source) => {
    setShoppingItems((prev) => {
      const exists = prev.some((s) => s.name.toLowerCase() === item.name.toLowerCase());
      if (exists) return prev;
      return [...prev, { id: crypto.randomUUID(), name: item.name, checked: false, ...(source ? { source } : {}) }];
    });
  };

  const handleRemoveItem = (id) => {
    const item = trackedItems.find((it) => it.id === id);
    if (item) addToShoppingIfMissing(item);
    setTrackedItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleEditItem = (id) => { const item = trackedItems.find(it => it.id === id); if (item) setEditingItem({ ...item }); };
  const handleSaveEdit = () => { if (!editingItem) return; setTrackedItems(prev => prev.map(it => it.id === editingItem.id ? { ...editingItem } : it)); setEditingItem(null); };

  const handleMarkOpened = (item, dateStr) => {
    const shelfDays = getShelfLifeDays(item.name);
    const openUseBy = shelfDays ? addDaysToDate(dateStr, shelfDays) : null;
    setTrackedItems(prev => prev.map(it => it.id === item.id ? { ...it, openDate: dateStr, openUseBy } : it));
    setOpenedConfirm({ item: { ...item, openDate: dateStr, openUseBy }, openDate: dateStr, openUseBy, shelfDays });
    setShowOpenedDateEdit(false);
  };

  const handleUseTodayItem = (id) => {
    const item = trackedItems.find((it) => it.id === id);
    if (item) addToShoppingIfMissing(item, "used");
    setTrackedItems((prev) => prev.filter((it) => it.id !== id));
  };

  const triggerVoiceCommand = () => {
    const isEs = lang === "es";
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setVoiceCmdFeedback(isEs ? "Tu navegador no soporta voz." : "Voice input isn't supported in this browser.");
      if (voiceFeedbackTimer.current) clearTimeout(voiceFeedbackTimer.current);
      voiceFeedbackTimer.current = setTimeout(() => setVoiceCmdFeedback(""), 3500);
      return;
    }
    if (voiceCmdRef.current) {
      try { voiceCmdRef.current.abort(); } catch(e) {}
      voiceCmdRef.current = null;
      setVoiceCmdActive(false);
      return;
    }
    const recog = new SR();
    recog.lang = isEs ? "es-MX" : "en-US";
    recog.interimResults = false;
    recog.maxAlternatives = 3;
    voiceCmdRef.current = recog;
    setVoiceCmdActive(true);

    const finish = (feedback) => {
      voiceCmdRef.current = null;
      setVoiceCmdActive(false);
      if (feedback) {
        setVoiceCmdFeedback(feedback);
        if (voiceFeedbackTimer.current) clearTimeout(voiceFeedbackTimer.current);
        voiceFeedbackTimer.current = setTimeout(() => setVoiceCmdFeedback(""), 4500);
      }
    };

    recog.onresult = (ev) => {
      const t = ev.results[0][0].transcript.toLowerCase().trim();

      if (/\b(opened?|abrí|abri|abrir)\b/.test(t)) {
        const m = t.match(/(?:opened?|abrí|abri|abrir)\s+(?:el\s+|la\s+|los\s+|las\s+|the\s+)?(.+)/);
        const query = m?.[1]?.replace(/[?.!,]+$/,"").trim();
        const found = query && trackedItems.find(it => it.name.toLowerCase().includes(query));
        if (found) {
          const today = new Date().toISOString().split("T")[0];
          handleMarkOpened(found, today);
          setShowOpenedModal(true);
          finish(isEs ? `${found.name} marcado como abierto.` : `Marked ${found.name} as opened.`);
        } else {
          setShowOpenedModal(true); setOpenedSearch(query || ""); setOpenedConfirm(null); setShowOpenedDateEdit(false);
          finish(query
            ? (isEs ? `No encontré "${query}". Búscalo en el modal.` : `Couldn't find "${query}" — search in the panel.`)
            : (isEs ? "¿Qué abriste? Búscalo en el modal." : "What did you open? Search below."));
        }
        return;
      }

      if (/\b(add|agregar|añadir|track|log)\b/.test(t)) {
        const m = t.match(/(?:add|agregar|añadir|track|log)\s+(?:a\s+|an\s+|some\s+|un\s+|una\s+|unos\s+)?(.+)/);
        const name = m?.[1]?.replace(/[?.!,]+$/,"").trim() || "";
        setItemName(name);
        setShowQuickAdd(true);
        finish(name
          ? (isEs ? `Listo para agregar ${name}.` : `Ready to add ${name}.`)
          : (isEs ? "Abriendo agregar rápido." : "Opening quick add."));
        return;
      }

      if (/\b(expir|venc|use\s+soon|usar\s+pronto|going\s+bad|por\s+vencer)\b/.test(t)) {
        const soon = trackedItems.filter(it => { const d = daysUntil(it.useByDate); return d !== null && d >= 0 && d <= 3; });
        finish(soon.length === 0
          ? (isEs ? "Todo fresco — nada vence pronto." : "Everything looks good — nothing expiring soon.")
          : (isEs
              ? `${soon.length} artículo${soon.length>1?"s":""} vencen pronto: ${soon.slice(0,3).map(it=>it.name).join(", ")}.`
              : `${soon.length} item${soon.length>1?"s":""} expiring soon: ${soon.slice(0,3).map(it=>it.name).join(", ")}.`));
        return;
      }

      if (/\b(use\s+first|usar\s+primero|what.*(use|eat|cook)|qué\s+(usar|comer|cocinar))\b/.test(t)) {
        const urgent = trackedItems.filter(it => { const d = daysUntil(it.useByDate); return d !== null && d >= 0; }).sort((a,b) => daysUntil(a.useByDate) - daysUntil(b.useByDate));
        if (!urgent.length) { finish(isEs ? "Tu cocina está fresca." : "Your kitchen is looking fresh — nothing urgent."); return; }
        const first = urgent[0];
        const dl = daysUntil(first.useByDate);
        finish(isEs
          ? `Usa ${first.name} primero — ${dl===0?"vence hoy":`${dl} día${dl===1?"":"s"}`}.`
          : `Use ${first.name} first — ${dl===0?"expires today":`${dl} day${dl===1?"":"s"} left`}.`);
        return;
      }

      if (/\b(have|got|tengo|is\s+there|hay|do\s+i\s+have|tienes)\b/.test(t)) {
        const m = t.match(/(?:have|got|tengo|is\s+there|hay|do\s+i\s+have|tienes)\s+(?:any\s+|some\s+|a\s+|an\s+|un\s+|una\s+|unos\s+)?(.+?)(?:\?)?$/);
        const query = m?.[1]?.replace(/[?.!,]+$/,"").trim();
        const found = query && trackedItems.find(it => it.name.toLowerCase().includes(query));
        if (found) finish(isEs
          ? `Sí, tienes ${found.name}${found.useByDate?` — usar antes del ${fmtDate(found.useByDate)}`:""}.`
          : `Yes, you have ${found.name}${found.useByDate?` — use by ${fmtDate(found.useByDate)}`:""}.`);
        else if (query) finish(isEs ? `No encuentro "${query}" en tu cocina.` : `I don't see "${query}" in your kitchen.`);
        else finish(isEs ? "¿Qué artículo buscas?" : "Which item are you looking for?");
        return;
      }

      finish(isEs
        ? "No entendí. Intenta: 'Agregar leche' o '¿Qué vence pronto?'"
        : "I didn't catch that. Try: 'Add milk' or 'What expires soon?'");
    };

    recog.onerror = (e) => {
      if (e.error === "aborted") { finish(""); return; }
      finish(isEs ? "No pude escucharte. Intenta de nuevo." : "Couldn't hear you. Try again.");
    };
    recog.onend = () => { if (voiceCmdRef.current === recog) finish(""); };
    recog.start();
  };

  const parseSpokenDateNoYear = (text) => {
    const months = { january:1,february:2,march:3,april:4,may:5,june:6,july:7,august:8,september:9,october:10,november:11,december:12,jan:1,feb:2,mar:3,apr:4,jun:6,jul:7,aug:8,sep:9,oct:10,nov:11,dec:12 };
    const t = text.toLowerCase().trim();
    const match = t.match(/^([a-z]+)\s+(\d{1,2})(?:\s+(\d{2,4}))?$/);
    if (!match) return null;
    const month = months[match[1]]; if (!month) return null;
    const day = parseInt(match[2]);
    let year = match[3] ? (match[3].length === 2 ? 2000 + parseInt(match[3]) : parseInt(match[3])) : null;
    if (!year) { const now = new Date(); year = now.getFullYear(); if (new Date(year, month-1, day) < now) year++; }
    return new Date(year, month-1, day).toISOString().split("T")[0];
  };

  const parseProductAndDate = (transcript) => {
    const monthRegex = /\b(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|oct|nov|dec)\b/i;
    const monthMatch = transcript.match(monthRegex);
    if (!monthMatch) return null;
    const monthIdx = transcript.toLowerCase().indexOf(monthMatch[0].toLowerCase());
    const productName = transcript.substring(0, monthIdx).trim().replace(/[,\s]+$/, "");
    const datePart = transcript.substring(monthIdx).trim();
    if (!productName) return null;
    const date = parseSpokenDate(datePart) || parseSpokenDateNoYear(datePart);
    if (!date) return null;
    return { productName, date };
  };

  const matchItemByName = (spokenName, items) => {
    const spoken = spokenName.toLowerCase().trim();
    if (!spoken || !items.length) return null;
    let found = items.find(it => it.name.toLowerCase() === spoken);
    if (found) return found;
    found = items.find(it => it.name.toLowerCase().includes(spoken));
    if (found) return found;
    found = items.find(it => { const words = it.name.toLowerCase().split(/\s+/).filter(w => w.length > 2); return words.some(w => spoken.includes(w)); });
    if (found) return found;
    const spokenWords = spoken.split(/\s+/).filter(w => w.length > 2);
    let best = 0, bestItem = null;
    for (const it of items) {
      const nameWords = it.name.toLowerCase().split(/\s+/);
      const score = spokenWords.filter(sw => nameWords.some(nw => nw.includes(sw) || sw.includes(nw))).length;
      if (score > best) { best = score; bestItem = it; }
    }
    return best > 0 ? bestItem : null;
  };

  const expirySpeak = (text, onDone) => {
    setExpiryVoiceStatus("speaking");
    if (!("speechSynthesis" in window)) { if (onDone) setTimeout(onDone, 300); return; }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.05; u.pitch = 1.0;
    const ms = Math.max(1500, (text.split(" ").length / 2.2) * 1000 + 800);
    let fired = false;
    const fire = () => { if (!fired) { fired = true; if (onDone) onDone(); } };
    u.onend = fire; setTimeout(fire, ms);
    window.speechSynthesis.speak(u);
  };

  const listenForExpiryDates = (items, attemptsLeft) => {
    if (attemptsLeft <= 0) { setExpiryVoiceStatus("done"); setTimeout(() => setShowExpiryVoice(false), 1500); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setShowExpiryVoice(false); return; }
    setExpiryVoiceStatus("listening");
    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    expiryVoiceRef.current = recognition;
    recognition.onresult = (event) => {
      expiryVoiceRef.current = null;
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      const isDone = transcript.includes("done") || transcript.includes("that's all") || transcript.includes("stop") || transcript.includes("finish") || transcript.includes("all done") || transcript.includes("that is all") || transcript.includes("skip") || transcript.includes("not now") || transcript.includes("no thanks") || transcript.includes("cancel") || /\bno\b/.test(transcript) || /\bnope\b/.test(transcript);
      if (isDone) {
        setExpiryVoiceStatus("done");
        expirySpeak("All done! Expiry dates saved.", () => setTimeout(() => setShowExpiryVoice(false), 1200));
        return;
      }
      const parsed = parseProductAndDate(transcript);
      if (parsed) {
        const matched = matchItemByName(parsed.productName, items);
        if (matched) {
          setTrackedItems(prev => prev.map(it => it.id === matched.id ? {...it, useByDate: parsed.date} : it));
          const d = new Date(parsed.date + "T12:00:00");
          const dateStr = d.toLocaleDateString("en-US", {month:"long", day:"numeric"});
          const shortYear = d.getFullYear() !== new Date().getFullYear() ? " " + d.getFullYear() : "";
          setExpiryVoiceLog(prev => [...prev, {name: matched.name, dateStr: dateStr + shortYear}]);
          expirySpeak(`Got it, ${matched.name} expires ${dateStr + shortYear}.`, () => listenForExpiryDates(items, attemptsLeft - 1));
        } else {
          expirySpeak("I didn't find that item. Try again or say done.", () => listenForExpiryDates(items, attemptsLeft - 1));
        }
      } else {
        expirySpeak("Try saying the product name then the date, like: milk, March 20 2026.", () => listenForExpiryDates(items, attemptsLeft - 1));
      }
    };
    recognition.onerror = (e) => {
      if (e.error === "aborted") return;
      expiryVoiceRef.current = null;
      if (e.error === "no-speech" && attemptsLeft > 1) { listenForExpiryDates(items, attemptsLeft - 1); }
      else { setExpiryVoiceStatus("done"); setTimeout(() => setShowExpiryVoice(false), 1500); }
    };
    recognition.start();
  };

  const startExpiryVoiceFlow = (items) => {
    if (!items || !items.length) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR || !("speechSynthesis" in window)) return;
    const flowItems = items.map(it => ({id: it.id, name: it.name}));
    setExpiryVoiceItems(flowItems);
    setExpiryVoiceLog([]);
    setExpiryVoiceStatus("speaking");
    setShowExpiryVoice(true);
    expirySpeak("Would you like to tell me the expiration dates for your recent scan? Just speak the product name and expiration date and I will do the rest.", () => listenForExpiryDates(flowItems, 12));
  };

  const stopExpiryVoiceFlow = () => {
    if (expiryVoiceRef.current) { try { expiryVoiceRef.current.abort(); } catch(e) {} expiryVoiceRef.current = null; }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setShowExpiryVoice(false);
    setExpiryVoiceLog([]);
  };

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
        const res = await fetch("/api/scan-receipt", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image: base64, mimeType: mediaType || "image/jpeg" }) });
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
    const itemName = barcodeItem.name;
    setTrackedItems((prev) => [...prev, { id: crypto.randomUUID(), name: barcodeItem.name, category: barcodeItem.category, location: loc, quantity: "", useByDate: barcodeUseBy, openDate: today, freezeBy: barcodeFreezeBy, barcode: barcodeItem.barcode || "", daysAfterOpening: barcodeItem.daysAfterOpening || null, storageTip: barcodeItem.storageTip || "", openedTip: barcodeItem.openedTip || "" }]);
    setMultiScanCount(prev => prev + 1);
    setMultiScanLastItem(itemName);
    setBarcodeItem(null);
    setBarcodeDetected("");
    setBarcodeLocation("");
    setBarcodeUseBy("");
    setBarcodeFreezeBy("");
    setVoiceError("");
    if (scanMode === "single") {
      setShowBarcodeScanner(false);
      setMultiScanCount(0); setMultiScanLastItem("");
      if (multiScanTimer.current) clearTimeout(multiScanTimer.current);
    } else {
      setBarcodeScanKey(prev => prev + 1);
      resetMultiScanTimer();
    }
  };
  const handleDoneScanning = () => {
    setShowBarcodeScanner(false);
    setBarcodeItem(null);
    setBarcodeError("");
    setBarcodeDetected("");
    setMultiScanCount(0);
    setMultiScanLastItem("");
    if (multiScanTimer.current) clearTimeout(multiScanTimer.current);
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
        if (field === "labelDate") setLabelItem(prev => prev ? {...prev, date: parsed, dateFound: true} : prev);
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
        const res = await fetch("/api/scan-label", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ imageData: base64, mediaType: mediaType || "image/jpeg" }) });
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
    const itemName = labelItem.name;
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
    setLabelScanCount(prev => prev + 1);
    setLabelLastItem(itemName);
    if (labelScanMode === "single") {
      setShowLabelScanner(false);
      setLabelScanCount(0); setLabelLastItem("");
      setLabelScanMode(null);
    } else {
      setLabelScanKey(prev => prev + 1);
    }
    setLabelItem(null);
    setLabelError("");
    setVoiceListening("");
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

  const handleSetUsername = () => { const n = usernameInput.trim(); if (!n) return; setUsername(n); try { localStorage.setItem(USERNAME_KEY, n); } catch(e) {} setUsernameInput(""); };
  const handlePostRecipe = () => { if (!newRecipeTitle.trim() || !newRecipeBody.trim()) return; setCommunity((prev) => ({ ...prev, recipes: [{ id: crypto.randomUUID(), author: username, title: newRecipeTitle.trim(), body: newRecipeBody.trim(), date: new Date().toLocaleDateString() }, ...prev.recipes] })); setNewRecipeTitle(""); setNewRecipeBody(""); };
  const handlePostTip = () => { if (!newTip.trim()) return; setCommunity((prev) => ({ ...prev, tips: [{ id: crypto.randomUUID(), author: username, text: newTip.trim(), date: new Date().toLocaleDateString() }, ...prev.tips] })); setNewTip(""); };
  const handlePostChat = () => { if (!newChat.trim()) return; setCommunity((prev) => ({ ...prev, chat: [...prev.chat, { id: crypto.randomUUID(), author: username, text: newChat.trim(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }] })); setNewChat(""); };

      if (showMarketing) return <MarketingPage onLaunchApp={handleLaunchApp} lang={lang} onChangeLang={changeLang} />;
  if (isUnlocked === false) return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
      <div style={{background:"rgba(0,0,0,0.35)",border:"2px solid rgba(255,102,0,0.45)",backdropFilter:"blur(14px)",borderRadius:"24px"}} className="shadow-2xl p-8 max-w-sm w-full text-center">
        <div className="text-5xl mb-3">🥦</div>
        <h1 className="text-3xl font-extrabold text-white mb-0" style={{textShadow:"0 2px 8px rgba(0,0,0,0.3)"}}><TrackFreshLogo showBroc={false} /></h1>
        <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1 mt-1">{t("betaTesting")}</p>
        <p className="text-sm text-green-200 mb-5">{t("enterAccessCode")}</p>
        <div className="mb-5">
          <p className="text-xs font-bold text-green-300 mb-2 uppercase tracking-wider">🌐 Language / Idioma</p>
          <div className="flex justify-center gap-3">
            <button onClick={() => changeLang("en")} className={`rounded-xl px-5 py-2.5 text-sm font-bold border-2 transition-all ${lang === "en" ? "border-orange-500 bg-orange-500/20 text-white" : "border-white/20 bg-white/10 text-white/70"}`}>🇺🇸 English</button>
            <button onClick={() => changeLang("es")} className={`rounded-xl px-5 py-2.5 text-sm font-bold border-2 transition-all ${lang === "es" ? "border-orange-500 bg-orange-500/20 text-white" : "border-white/20 bg-white/10 text-white/70"}`}>🇲🇽 Español</button>
          </div>
        </div>
        <input type="password" value={pwInput} onChange={(e) => { setPwInput(e.target.value); setPwError(false); }} onKeyDown={(e) => e.key === "Enter" && handlePwSubmit()} placeholder="Access Code" className="w-full rounded-xl px-4 py-3 text-center text-lg mb-3 focus:outline-none" style={{background:"rgba(255,255,255,0.1)",border:"2px solid rgba(255,102,0,0.4)",color:"#fff",caretColor:"#ff6600"}} />
        {pwError && <p className="text-red-400 text-sm mb-3">{t("invalidCode")}</p>}
        <button onClick={handlePwSubmit} style={{width:"100%",padding:"0.95rem 1.5rem",borderRadius:"16px",background:"linear-gradient(to bottom,#F0C070,#E8A63C)",color:"#1a0a00",fontWeight:800,fontSize:"1.05rem",border:"none",cursor:"pointer",boxShadow:"0 5px 0px #8C5A10, 0 10px 26px rgba(0,0,0,0.32), inset 0 1.5px 0 rgba(255,255,255,0.45)",letterSpacing:"0.01em"}}>{t("enterBeta")}</button>
        <p className="text-xs text-green-300/60 mt-4">{t("contactFreddie")}</p>
      </div>
    </div>
  );

    return (
    <>{showWelcome && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto" style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
        <div className="w-full max-w-md text-center animate-[fadeIn_0.4s_ease] py-6" style={{background:"rgba(0,0,0,0.3)",border:"2px solid rgba(255,102,0,0.45)",backdropFilter:"blur(14px)",borderRadius:"24px",padding:"2rem"}}>
          <div className="text-5xl mb-3">🥦</div>
          <h2 className="text-2xl font-extrabold text-white mb-1" style={{textShadow:"0 2px 8px rgba(0,0,0,0.3)"}}><TrackFreshLogo showBroc={false} /></h2>
          <p className="text-green-200 text-sm mb-4">{t("welcomeDesc")}</p>
          <div className="mb-4">
            <p className="text-xs font-bold text-green-300 mb-2 uppercase tracking-wider">🌐 Language / Idioma</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => changeLang("en")} className={`rounded-xl px-5 py-2.5 text-sm font-bold border-2 transition-all ${lang === "en" ? "border-orange-500 bg-orange-500/20 text-white" : "border-white/20 bg-white/10 text-white/70"}`}>🇺🇸 English</button>
              <button onClick={() => changeLang("es")} className={`rounded-xl px-5 py-2.5 text-sm font-bold border-2 transition-all ${lang === "es" ? "border-orange-500 bg-orange-500/20 text-white" : "border-white/20 bg-white/10 text-white/70"}`}>🇲🇽 Español</button>
            </div>
          </div>
          <div className="text-left rounded-xl p-4 mb-4 space-y-2" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)"}}>
            <div className="flex items-center gap-2 text-sm"><span>📸</span><span className="text-green-100">{t("welcomeF1")}</span></div>
            <div className="flex items-center gap-2 text-sm"><span>⏰</span><span className="text-green-100">{t("welcomeF2")}</span></div>
            <div className="flex items-center gap-2 text-sm"><span>🎤</span><span className="text-green-100">{t("welcomeF3")}</span></div>
            <div className="flex items-center gap-2 text-sm"><span>🍳</span><span className="text-green-100">{t("welcomeF4")}</span></div>
            <div className="flex items-center gap-2 text-sm"><span>📅</span><span className="text-green-100">{t("welcomeF5")}</span></div>
            <div className="flex items-center gap-2 text-sm"><span>💬</span><span className="text-green-100">{t("welcomeF6")}</span></div>
            <div className="flex items-center gap-2 text-sm"><span>🌎</span><span className="text-green-100">{t("welcomeF7")}</span></div>
          </div>
          <p className="text-xs text-green-300/60 mb-4">{t("welcomeLocal")}</p>
          <button onClick={() => { setShowWelcome(false); try { localStorage.setItem("trackfresh.welcomed", "true"); } catch(e) {} }} className="glass-scan-btn w-full py-3 text-base font-bold">{t("getStarted")}</button>
        </div>
      </div>
    )}

    <div className="min-h-screen app-bg"><style dangerouslySetInnerHTML={{__html: GLOBAL_STYLES}} />
      {/* Sticky header: logo + top nav */}
      <div style={{position:"sticky",top:0,zIndex:50,background:"linear-gradient(to bottom,#064e3b,#022c22)",boxShadow:"0 4px 20px rgba(0,0,0,0.3)"}}>
        <div className="mx-auto max-w-2xl px-4 pt-3 pb-2 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-white" style={{textShadow:"0 2px 8px rgba(0,0,0,0.25)"}}><TrackFreshLogo /></h1>
          <div className="flex items-center gap-2">
            <button onClick={() => { setTutorialStep(0); setShowTutorial(true); }} className="app-header-btn tut-pulse">✨ Tour</button>
            <button onClick={() => changeLang(lang === "en" ? "es" : "en")} className="app-header-btn">{lang === "en" ? "\ud83c\uddf2\ud83c\uddfd ES" : "\ud83c\uddfa\ud83c\uddf8 EN"}</button>
            {activeTab !== "home" && (
              <button onClick={() => setActiveTab("home")} className="back-btn" title={lang === "es" ? "Atrás" : "Back"}>←</button>
            )}
            {isAdmin && <button onClick={() => setActiveTab("admin")} className="app-header-btn" style={{color: activeTab === "admin" ? "#B7D63A" : "rgba(255,255,255,0.5)", fontSize:"1.1rem"}} title="Admin">⚙️</button>}
            <button onClick={() => { setIsUnlocked(false); setIsAdmin(false); try { sessionStorage.removeItem("tf_ok"); sessionStorage.removeItem("tf_admin"); } catch(e) {} }} className="app-header-btn">{lang === "es" ? "Salir" : "Sign Out"}</button>
          </div>
        </div>
      </div>
      <div key={activeTab} className="mx-auto max-w-2xl space-y-4 px-4 pt-4 pb-8 tab-enter">



        {showReceiptScanner && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/50 p-4 overflow-y-auto" style={{paddingTop:"2rem"}}>
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-2 text-lg font-bold">{t("scanReceiptTitle")}</h2>
              <p className="mb-4 text-sm text-gray-600">{t("scanReceiptDesc")}</p>
              {!receiptScanning && receiptItems.length === 0 && (
                <div style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)",borderRadius:"14px",padding:"1rem"}}>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="glass-scan-btn" style={{cursor:"pointer"}}>
                      <span style={{fontSize:"1.75rem"}}>📸</span>
                      <span style={{fontSize:"0.875rem"}}>{t("takePhoto")}</span>
                      <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => e.target.files[0] && handleScanReceipt(e.target.files[0])} />
                    </label>
                    <label className="glass-scan-btn" style={{cursor:"pointer"}}>
                      <span style={{fontSize:"1.75rem"}}>🖼️</span>
                      <span style={{fontSize:"0.875rem"}}>{t("uploadPhoto")}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && handleScanReceipt(e.target.files[0])} />
                    </label>
                  </div>
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
                  <p className="mb-2 text-sm font-semibold text-gray-700">{lang === "es" ? `Se encontraron ${receiptItems.length} productos — selecciona cuáles agregar:` : `Found ${receiptItems.length} items — select which to add:`}</p>
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
                  <button onClick={handleAddReceiptItems} className="glass-scan-btn w-full py-2.5 text-sm">{lang === "es" ? `Agregar ${selectedReceiptItems.length} productos al Rastreador` : `Add ${selectedReceiptItems.length} Items to Tracker`}</button>
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
              <h2 className="mb-3 text-lg font-bold text-green-700">{lang === "es" ? "Cómo Usar " : "How to Use "}<TrackFreshLogo showBroc={false} style={{fontSize:"0.95em"}} /></h2>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-2"><span>\ud83e\udd66</span><span><strong>Tracker:</strong> {lang === "es" ? "La IA escanea un n\u00famero infinito de productos. Categor\u00eda y ubicaci\u00f3n se llenan autom\u00e1ticamente." : "AI scans an infinite number of items. Category and location auto-fill intelligently."}</span></li>
                <li className="flex gap-2"><span>\ud83d\udcf8</span><span><strong>{lang === "es" ? "Esc\u00e1ner" : "Scanners"}:</strong> {lang === "es" ? "Usa Recibo, Etiqueta, C\u00f3digo de Barras o Agregar R\u00e1pido para a\u00f1adir productos." : "Use Receipt, Label, Barcode, or Quick Add to add items."}</span></li>
                <li className="flex gap-2"><span>\ud83d\udd0d</span><span><strong>Filter:</strong> {lang === "es" ? "Filtra por ubicaci\u00f3n (Refrigerador, Congelador, Despensa) o categor\u00eda (L\u00e1cteos, Carne, etc.)." : "Filter by location (Fridge, Freezer, Pantry) or category (Dairy, Meat, Produce, etc.)."}</span></li>
                <li className="flex gap-2"><span>\ud83c\udf73</span><span><strong>{lang === "es" ? "Recetas" : "Recipes"}:</strong> {lang === "es" ? "La IA sugiere recetas basadas en lo que tienes en tu cocina." : "AI suggests recipes based on what\u2019s in your kitchen."}</span></li>
                <li className="flex gap-2"><span>\ud83d\uded2</span><span><strong>Shopping:</strong> {lang === "es" ? "Crea tu lista de compras y marca lo que compres." : "Build your shopping list and check off items as you shop."}</span></li>
                <li className="flex gap-2"><span>\ud83d\udcc5</span><span><strong>{lang === "es" ? "Comidas" : "Meals"}:</strong> {lang === "es" ? "La IA planifica tus comidas de la semana." : "AI plans your weekly meals based on your tracked items."}</span></li>
                <li className="flex gap-2"><span>\ud83d\udc65</span><span><strong>{lang === "es" ? "Comunidad" : "Community"}:</strong> {lang === "es" ? "Comparte recetas, consejos y chatea." : "Share recipes, tips, and chat with others."}</span></li>
                <li className="flex gap-2"><span>⚠️</span><span><strong>FDA Recalls:</strong> {lang === "es" ? "Alertas de seguridad alimentaria en tiempo real." : "Real-time food safety alerts from the FDA."}</span></li>
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
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:9999,display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"1rem",paddingTop:"2rem",overflowY:"auto"}}>
            <div style={{background:"white",borderRadius:"20px",width:"100%",maxWidth:"440px",maxHeight:"90vh",overflow:"auto",padding:"1.25rem"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.75rem"}}>
                <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                  <h2 className="text-lg font-bold">{t("smartScanTitle")}</h2>
                  {scanMode === "multi" && <span className="rounded-full bg-blue-600 text-white px-2 py-1 text-xs font-bold">Mult. Scans</span>}
                  {scanMode === "multi" && uniScanCount > 0 && <span className="rounded-full bg-green-600 text-white px-2 py-1 text-xs font-bold">{uniScanCount} added</span>}
                </div>
                <button onClick={() => { setShowSmartScanner(false); resetSmartScanner(); setScanMode(null); }} style={{background:"#f3f4f6",border:"none",borderRadius:"50%",width:"32px",height:"32px",fontSize:"1.1rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>&times;</button>
              </div>
              {scanMode === null && (
                <div style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)",borderRadius:"14px",padding:"1rem"}}>
                  <p style={{textAlign:"center",fontSize:"0.875rem",fontWeight:"600",color:"#fff",marginBottom:"0.75rem"}}>{t("howManyItems")}</p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem"}}>
                    <button onClick={() => setScanMode("single")} className="glass-scan-btn" style={{padding:"1.25rem 0.5rem"}}><span style={{fontSize:"1.75rem"}}>1️⃣</span><span style={{fontSize:"0.875rem"}}>{t("singleScan")}</span></button>
                    <button onClick={() => setScanMode("multi")} className="glass-scan-btn" style={{padding:"1.25rem 0.5rem"}}><span style={{fontSize:"1.75rem"}}>📦</span><span style={{fontSize:"0.875rem"}}>{t("multiScans")}</span></button>
                  </div>
                </div>
              )}
              {scanMode !== null && <>
              <p className="text-sm text-gray-500 mb-3">{t("smartScanDesc")}</p>
              {!smartResult && !smartError && (<div>
                {(voiceFlowStep || voiceFlowPaused) && (
                  <div style={{background: voiceFlowPaused ? "#7c3aed" : "#1e3a5f", borderRadius:"10px", padding:"0.5rem 0.75rem", marginBottom:"0.5rem", display:"flex", alignItems:"center", gap:"0.5rem"}}>
                    <span>{voiceFlowPaused ? "⏸" : "🎙️"}</span>
                    <span style={{color:"white", fontSize:"0.75rem", fontWeight:"bold"}}>
                      {voiceFlowPaused && "Paused — say Continue"}
                      {!voiceFlowPaused && voiceFlowStep === "say_date" && (lang === "es" ? "Preparando..." : "Preparing...")}
                      {!voiceFlowPaused && voiceFlowStep === "listening_date" && (lang === "es" ? "🔴 Di la fecha..." : "🔴 Say the date...")}
                      {!voiceFlowPaused && voiceFlowStep === "say_next" && "✓ Date saved!"}
                      {!voiceFlowPaused && voiceFlowStep === "listening_next" && (lang === "es" ? "🔴 Di Siguiente o Listo..." : "🔴 Say Next or Done...")}
                    </span>
                  </div>
                )}
                <SmartScanner key={smartScanKey} onResult={handleSmartResultMulti} onError={handleSmartError} captureRef={smartCaptureRef} />

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
                          if (data.item && data.item.name) { handleSmartResultMulti({ ...data.item, source: "label" }); }
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
                        if (data.item && data.item.name) { handleSmartResultMulti({ ...data.item, source: "label" }); }
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
                    <p className="text-sm font-bold text-orange-700">{t("listeningDate")}</p>
                    <p className="text-xs text-orange-500 mt-1">{t("saySampleDate")}</p>
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
                      <p className="text-sm font-bold text-gray-700 mb-2">📅 {t("expDateLabel")} {smartUseBy && <span className="text-green-600 text-xs font-normal">✓ {smartUseBy}</span>}</p>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <button onClick={() => startVoiceDatePrompt(smartResult.name)} className={`rounded-xl py-3 text-sm font-bold bg-gradient-to-b from-blue-50 to-blue-100 text-blue-700 border-2 border-blue-300 pill-3d`}>🎤 Speak Date</button>
                        <label className="rounded-xl py-3 text-sm font-bold bg-gradient-to-b from-gray-50 to-gray-100 text-gray-700 border-2 border-gray-300 pill-3d" style={{display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>📅 Enter Date<input type="date" value={smartUseBy} onChange={e => setSmartUseBy(e.target.value)} style={{position:"absolute",opacity:0,width:"1px",height:"1px"}} /></label>
                      </div>
                      <button onClick={() => document.getElementById("smartDateInput").click()} className="w-full rounded-xl py-2 text-sm font-bold bg-gradient-to-b from-orange-400 to-orange-500 text-white" style={{border:"none",cursor:"pointer"}}>{t("smartScanDate")}</button>
                    </>)}
                  </div>)}
                </div>
                {smartLocation === "Freezer" && (<div className="mb-3"><p className="text-xs font-bold text-gray-700 mb-1">{t("freezeByLabel")}</p><input type="date" value={smartFreezeBy} onChange={e => setSmartFreezeBy(e.target.value)} className="w-full rounded border px-3 py-2 text-sm" /></div>)}
                <button onClick={handleAddSmartItem} disabled={!smartLocation} className={`w-full rounded-xl py-3 text-sm font-bold mt-2 ${!smartLocation ? "bg-gray-300 text-white" : "btn-green-3d"}`}>{t("addToTracker")}</button>
                <button onClick={resetSmartScanner} className="w-full rounded-xl border bg-white py-2 text-sm font-bold text-gray-600 mt-2 pill-3d">{t("smartScanRetry")}</button>
                <button onClick={() => { handleAddSmartItemMulti(); }} disabled={!smartResult} className={`w-full rounded-xl py-2 text-sm font-bold mt-2 ${!smartResult ? "bg-gray-200 text-gray-400" : "bg-blue-500 text-white shadow-md"}`} style={smartResult ? {boxShadow:"0 3px 0 #1d4ed8"} : {}}>{t("addAndNext")}</button>
              <button onClick={handleDoneUniScan} className="w-full rounded-xl py-2.5 text-sm font-bold mt-2" style={{background:"linear-gradient(to bottom, #059669, #047857)", color:"white", boxShadow:"0 3px 0 #065f46"}}>{uniScanCount > 0 ? (lang === "es" ? "✅ Listo (" + uniScanCount + " artículos)" : "✅ Done (" + uniScanCount + " items)") : t("cancel")}</button>
              </div>)}
              </>}
            </div>
          </div>
        )}

        {showVoiceEditForm && smartResult && (
          <div style={{position:"fixed",inset:0,zIndex:10000,background:"rgba(0,0,0,0.5)"}} onClick={() => setShowVoiceEditForm(false)}>
            <div style={{position:"fixed",bottom:0,left:0,right:0,background:"white",borderRadius:"20px 20px 0 0",padding:"1.25rem",zIndex:10001,maxHeight:"75vh",overflow:"auto"}} onClick={e => e.stopPropagation()}>
              <div style={{width:"40px",height:"4px",background:"#e5e7eb",borderRadius:"2px",margin:"0 auto 1rem"}} />
              <h3 style={{fontWeight:"bold",marginBottom:"0.75rem"}}>✏️ {lang === "es" ? "Editar Item" : "Edit Item"}</h3>
              <div style={{marginBottom:"0.75rem"}}>
                <p style={{fontSize:"0.75rem",color:"#6b7280",marginBottom:"0.25rem"}}>{lang === "es" ? "Nombre" : "Name"}</p>
                <input value={smartResult.name || ""} onChange={e => setSmartResult(prev => prev ? {...prev, name: e.target.value} : prev)} style={{width:"100%",border:"1px solid #d1d5db",borderRadius:"6px",padding:"0.5rem 0.75rem",fontSize:"0.875rem",boxSizing:"border-box"}} />
              </div>
              <div style={{marginBottom:"0.75rem"}}>
                <p style={{fontSize:"0.75rem",color:"#6b7280",marginBottom:"0.25rem"}}>{lang === "es" ? "Fecha de vencimiento" : "Use By Date"}</p>
                <input type="date" value={smartUseBy} onChange={e => setSmartUseBy(e.target.value)} style={{width:"100%",border:"1px solid #d1d5db",borderRadius:"6px",padding:"0.5rem 0.75rem",fontSize:"0.875rem",boxSizing:"border-box"}} />
              </div>
              <div style={{marginBottom:"1rem"}}>
                <p style={{fontSize:"0.75rem",color:"#6b7280",marginBottom:"0.5rem"}}>{lang === "es" ? "Ubicación" : "Location"}</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"0.5rem"}}>
                  {["Fridge","Freezer","Pantry"].map(loc => (
                    <button key={loc} onClick={() => setSmartLocation(loc)} style={{border: smartLocation === loc ? "2px solid #16a34a" : "2px solid #e5e7eb",borderRadius:"8px",padding:"0.5rem",fontSize:"0.75rem",fontWeight:"600",background: smartLocation === loc ? "#f0fdf4" : "white",color: smartLocation === loc ? "#15803d" : "#4b5563",cursor:"pointer"}}>{loc}</button>
                  ))}
                </div>
              </div>
              <button onClick={() => { setShowVoiceEditForm(false); speakThen(lang === "es" ? "Volviendo al escáner." : "Returning to scanner.", () => startScanCommandLoop()); }} className="w-full rounded-xl py-2.5 text-sm font-bold btn-green-3d" style={{marginBottom:"0.5rem",display:"block"}}>
                🎙️ {lang === "es" ? "Volver a Escanear" : "Return to Scan"}
              </button>
              <button onClick={() => handleAddSmartItemMulti()} style={{width:"100%",background:"#3b82f6",color:"white",borderRadius:"10px",border:"none",cursor:"pointer",padding:"0.625rem",fontSize:"0.875rem",fontWeight:"bold"}}>
                ✅ {lang === "es" ? "Guardar y Siguiente" : "Save & Next"}
              </button>
            </div>
          </div>
        )}

        {showVoiceEditForm && smartResult && (
          <div style={{position:"fixed",inset:0,zIndex:10000,background:"rgba(0,0,0,0.5)"}} onClick={() => setShowVoiceEditForm(false)}>
            <div style={{position:"fixed",bottom:0,left:0,right:0,background:"white",borderRadius:"20px 20px 0 0",padding:"1.25rem",zIndex:10001,maxHeight:"75vh",overflow:"auto"}} onClick={e => e.stopPropagation()}>
              <div style={{width:"40px",height:"4px",background:"#e5e7eb",borderRadius:"2px",margin:"0 auto 1rem"}} />
              <h3 style={{fontWeight:"bold",marginBottom:"0.75rem"}}>✏️ {lang === "es" ? "Editar Item" : "Edit Item"}</h3>
              <div style={{marginBottom:"0.75rem"}}>
                <p style={{fontSize:"0.75rem",color:"#6b7280",marginBottom:"0.25rem"}}>{lang === "es" ? "Nombre" : "Name"}</p>
                <input value={smartResult.name || ""} onChange={e => setSmartResult(prev => prev ? {...prev, name: e.target.value} : prev)} style={{width:"100%",border:"1px solid #d1d5db",borderRadius:"6px",padding:"0.5rem 0.75rem",fontSize:"0.875rem",boxSizing:"border-box"}} />
              </div>
              <div style={{marginBottom:"0.75rem"}}>
                <p style={{fontSize:"0.75rem",color:"#6b7280",marginBottom:"0.25rem"}}>{lang === "es" ? "Fecha de vencimiento" : "Use By Date"}</p>
                <input type="date" value={smartUseBy} onChange={e => setSmartUseBy(e.target.value)} style={{width:"100%",border:"1px solid #d1d5db",borderRadius:"6px",padding:"0.5rem 0.75rem",fontSize:"0.875rem",boxSizing:"border-box"}} />
              </div>
              <div style={{marginBottom:"1rem"}}>
                <p style={{fontSize:"0.75rem",color:"#6b7280",marginBottom:"0.5rem"}}>{lang === "es" ? "Ubicación" : "Location"}</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"0.5rem"}}>
                  {["Fridge","Freezer","Pantry"].map(loc => (
                    <button key={loc} onClick={() => setSmartLocation(loc)} style={{border: smartLocation === loc ? "2px solid #16a34a" : "2px solid #e5e7eb",borderRadius:"8px",padding:"0.5rem",fontSize:"0.75rem",fontWeight:"600",background: smartLocation === loc ? "#f0fdf4" : "white",color: smartLocation === loc ? "#15803d" : "#4b5563",cursor:"pointer"}}>{loc}</button>
                  ))}
                </div>
              </div>
              <button onClick={() => { setShowVoiceEditForm(false); speakThen(lang === "es" ? "Volviendo al escáner." : "Returning to scanner.", () => startScanCommandLoop()); }} className="w-full rounded-xl py-2.5 text-sm font-bold btn-green-3d" style={{marginBottom:"0.5rem",display:"block"}}>
                🎙️ {lang === "es" ? "Volver a Escanear" : "Return to Scan"}
              </button>
              <button onClick={() => handleAddSmartItemMulti()} style={{width:"100%",background:"#3b82f6",color:"white",borderRadius:"10px",border:"none",cursor:"pointer",padding:"0.625rem",fontSize:"0.875rem",fontWeight:"bold"}}>
                ✅ {lang === "es" ? "Guardar y Siguiente" : "Save & Next"}
              </button>
            </div>
          </div>
        )}

        {showBarcodeScanner && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/50 p-4 overflow-y-auto" style={{paddingTop:"2rem"}}>
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold">{t("scanBarcodeTitle")}</h2>
                <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                  {scanMode === "multi" && <span className="rounded-full bg-blue-600 text-white px-2 py-1 text-xs font-bold">Mult. Scans</span>}
                  {scanMode === "multi" && multiScanCount > 0 && <span className="rounded-full bg-green-600 text-white px-2 py-1 text-xs font-bold">{multiScanCount} added</span>}
                  <button onClick={() => { setShowBarcodeScanner(false); setBarcodeItem(null); setBarcodeError(""); setBarcodeDetected(""); setMultiScanCount(0); setMultiScanLastItem(""); setScanMode(null); }} style={{background:"#f3f4f6",border:"none",borderRadius:"50%",width:"32px",height:"32px",fontSize:"1.1rem",cursor:"pointer"}}>&times;</button>
                </div>
              </div>
              {scanMode === null && (
                <div style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)",borderRadius:"14px",padding:"1rem"}}>
                  <p style={{textAlign:"center",fontSize:"0.875rem",fontWeight:"600",color:"#fff",marginBottom:"0.75rem"}}>{t("howManyItems")}</p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem"}}>
                    <button onClick={() => setScanMode("single")} className="glass-scan-btn" style={{padding:"1.25rem 0.5rem"}}><span style={{fontSize:"1.75rem"}}>1️⃣</span><span style={{fontSize:"0.875rem"}}>{t("singleScan")}</span></button>
                    <button onClick={() => setScanMode("multi")} className="glass-scan-btn" style={{padding:"1.25rem 0.5rem"}}><span style={{fontSize:"1.75rem"}}>📦</span><span style={{fontSize:"0.875rem"}}>{t("multiScans")}</span></button>
                  </div>
                </div>
              )}
              {scanMode !== null && <>
              {multiScanLastItem && <div className="mb-3 rounded-lg bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-700 font-semibold animate-pulse">✅ Added: {multiScanLastItem} — Ready for next scan!</div>}
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
<button onClick={() => { setBarcodeError(""); setBarcodeDetected(""); setBarcodeItem(null); setBarcodeScanning(false); setShowBarcodeScanner(false); setScanMode(null); setTimeout(() => { window.scrollTo(0,0); setShowBarcodeScanner(true); }, 1000); }} className="mt-2 text-xs text-green-700 underline">{t("tryAgain")}</button>
                </div>
              )}
              {barcodeItem && (
                <div className="space-y-3">
                  <div className="rounded-lg border p-3 bg-green-50">
                    <p className="text-xs text-green-600 font-semibold mb-1">✅ Product found!</p>
                    <p className="font-bold text-gray-800">{barcodeItem.name}</p>
                    <p className="text-xs text-gray-500">{barcodeItem.category}</p>
                    {barcodeItem.storageTip && <p className="text-xs text-gray-600 mt-1">💡 {barcodeItem.storageTip}</p>}
                    {barcodeItem.openedTip && <p className="text-xs text-orange-600 mt-1">⚠️ {barcodeItem.openedTip}</p>}
                    {barcodeItem.daysAfterOpening && <p className="text-xs text-blue-600 mt-1">📅 Use within {barcodeItem.daysAfterOpening} days of opening</p>}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">{t("whereStoring")}</p>
                    <div className="grid grid-cols-3 gap-2">
                      <button onClick={() => { setBarcodeLocation("Fridge"); setBarcodeFreezeBy(""); }} className={`rounded-lg border-2 py-3 text-sm font-semibold transition-colors ${barcodeLocation === "Fridge" ? "border-green-500 bg-gradient-to-b from-green-50 to-green-100 text-green-700 pill-3d-active" : "border-gray-200 text-gray-600 pill-3d"}`}>🧊 Fridge</button>
                      <button onClick={() => setBarcodeLocation("Freezer")} className={`rounded-lg border-2 py-3 text-sm font-semibold transition-colors ${barcodeLocation === "Freezer" ? "border-cyan-500 bg-gradient-to-b from-cyan-50 to-cyan-100 text-cyan-700 pill-3d-active" : "border-gray-200 text-gray-600 pill-3d"}`}>❄️ Freezer</button>
                      <button onClick={() => { setBarcodeLocation("Pantry"); setBarcodeFreezeBy(""); }} className={`rounded-lg border-2 py-3 text-sm font-semibold transition-colors ${barcodeLocation === "Pantry" ? "border-amber-500 bg-gradient-to-b from-amber-50 to-amber-100 text-amber-700 pill-3d-active" : "border-gray-200 text-gray-600 pill-3d"}`}>🗄️ Pantry</button>
                    </div>
                  </div>
                  {barcodeLocation && (
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-bold text-gray-700 mb-2">📅 {barcodeLocation === "Freezer" ? t("freezeByLabel") + " Date" : t("expDateLabel")} {barcodeUseBy && <span className="text-green-600">✓ {barcodeUseBy}</span>}</p>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <button onClick={() => handleVoiceDate("useBy")} className={`rounded-xl py-3 text-sm font-bold ${voiceListening === "useBy" ? "bg-red-500 text-white animate-pulse" : "bg-gradient-to-b from-blue-50 to-blue-100 text-blue-700 border-2 border-blue-300 pill-3d"}`}>🎤 {voiceListening === "useBy" ? "Listening..." : "Speak Date"}</button>
                          <label className="rounded-xl py-3 text-sm font-bold bg-gradient-to-b from-gray-50 to-gray-100 text-gray-700 border-2 border-gray-300 pill-3d" style={{display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>📅 Enter Date<input type="date" value={barcodeUseBy} onChange={(e) => setBarcodeUseBy(e.target.value)} style={{position:"absolute",opacity:0,width:"1px",height:"1px"}} /></label>
                        </div>
                        {(voiceListening === "useBy" || barcodeUseBy) && <p className="text-xs mt-1" style={{color: barcodeUseBy ? "#059669" : "#ef4444"}}>{voiceListening === "useBy" ? "🎤 Listening... say e.g. March 20 2026" : "✓ " + barcodeUseBy}</p>}
                        {voiceListening === "useBy" && <p className="text-xs text-green-700 mt-1">Say the date e.g. February 20 2026</p>}
                      </div>
                      {barcodeLocation === "Fridge" && barcodeItem.category === "Meat" && (
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">{t("freezeByLabel")} Date <span className="text-xs text-gray-400">(optional - we will remind you)</span></label>
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
                  <button onClick={() => { setBarcodeItem(null); setBarcodeDetected(""); setBarcodeLocation(""); setBarcodeUseBy(""); setBarcodeFreezeBy(""); setVoiceError(""); setBarcodeScanKey(prev => prev + 1); resetMultiScanTimer(); }} className="w-full rounded-xl border bg-gradient-to-b from-white to-gray-50 py-2 text-sm font-bold text-gray-600 pill-3d">{t("scanAnother")}</button>
                </div>
              )}
              </>}
              <button onClick={handleDoneScanning} className="mt-3 w-full rounded-xl py-2.5 text-sm font-bold" style={{background:"linear-gradient(to bottom, #059669, #047857)", color:"white", boxShadow:"0 3px 0 #065f46"}}>{multiScanCount > 0 ? (lang === "es" ? "✅ Listo (" + multiScanCount + " artículos)" : "✅ Done (" + multiScanCount + " items added)") : t("cancel")}</button>
            </div>
          </div>
        )}

        {showQuickAdd && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl p-6 shadow-lg" style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
              <h2 className="mb-2 text-lg font-bold text-white">✏️ Quick Add</h2>
              <p className="mb-4 text-sm text-green-200">{t("quickAddTitleDesc")}</p>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-green-200">{t("foodItem")}</label>
                  <FoodAutocomplete lang={lang}
                    value={quickAddName}
                    onChange={setQuickAddName}
                    onSelect={(f) => { setQuickAddName(f.name); setQuickAddCategory(f.category); setQuickAddLocation(f.location); }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-green-200">{t("category")}</label>
                    <select value={quickAddCategory} onChange={(e) => setQuickAddCategory(e.target.value)} className="w-full rounded border px-3 py-2 text-sm text-gray-900">
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-green-200">{t("locationWord")}</label>
                    <select value={quickAddLocation} onChange={(e) => setQuickAddLocation(e.target.value)} className="w-full rounded border px-3 py-2 text-sm text-gray-900">
                      {LOCATIONS.map((l) => <option key={l} value={l}>{LOCATION_ICONS[l]} {l}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-green-200">{t("quantity")}</label>
                  <div className="flex gap-2">
                    <input value={quickAddQty} onChange={(e) => setQuickAddQty(e.target.value)} placeholder="e.g. 2 lbs" className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                    <button onClick={() => handleQuickVoice("qty")} className={`rounded px-3 py-2 text-sm font-semibold ${quickVoiceListening === "qty" ? "bg-red-500 text-white animate-pulse" : "bg-white/20 text-white"}`}>{quickVoiceListening === "qty" ? "🎤 Listening..." : "🎤"}</button>
                  </div>
                  {quickVoiceListening === "qty" && <p className="text-xs text-green-300 mt-1">{lang === "es" ? "Di la cantidad ej. dos libras" : "Say quantity e.g. two pounds"}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-green-200">Use By Date</label>
                  <div className="flex gap-2">
                    <input type="date" value={quickAddDate} onChange={(e) => setQuickAddDate(e.target.value)} className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                    <button onClick={() => handleQuickVoice("date")} className={`rounded px-3 py-2 text-sm font-semibold ${quickVoiceListening === "date" ? "bg-red-500 text-white animate-pulse" : "bg-white/20 text-white"}`}>{quickVoiceListening === "date" ? "🎤 Listening..." : "🎤"}</button>
                  </div>
                  {quickVoiceListening === "date" && <p className="text-xs text-green-300 mt-1">{t("sayDateExample")}</p>}
                  {quickVoiceError && <p className="text-xs text-red-400 mt-1">{quickVoiceError}</p>}
                </div>
                <button onClick={handleQuickAdd} className="glass-scan-btn w-full py-2.5 text-sm">Add to Tracker</button>
                <button onClick={() => { setShowQuickAdd(false); setQuickAddName(""); setQuickAddDate(""); setQuickAddQty(""); setQuickAddCategory("Other"); setQuickAddLocation("Fridge"); }} className="w-full rounded border border-white/30 py-2 text-sm font-semibold text-white/70">{t("cancel")}</button>
              </div>
            </div>
          </div>
        )}

        {showLabelScanner && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/50 p-4 overflow-y-auto" style={{paddingTop:"2rem"}}>
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold">{t("scanLabelTitle")}</h2>
                <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                  {labelScanMode === "multi" && <span className="rounded-full bg-blue-600 text-white px-2 py-1 text-xs font-bold">Mult. Scans</span>}
                  {labelScanMode === "multi" && labelScanCount > 0 && <span className="rounded-full bg-green-600 text-white px-2 py-1 text-xs font-bold">{labelScanCount} added</span>}
                  <button onClick={() => { setShowLabelScanner(false); setLabelItem(null); setLabelError(""); setLabelScanCount(0); setLabelLastItem(""); setLabelScanMode(null); }} style={{background:"#f3f4f6",border:"none",borderRadius:"50%",width:"32px",height:"32px",fontSize:"1.1rem",cursor:"pointer"}}>&times;</button>
                </div>
              </div>
              {labelScanMode === null && (
                <div style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)",borderRadius:"14px",padding:"1rem"}}>
                  <p style={{textAlign:"center",fontSize:"0.875rem",fontWeight:"600",color:"#fff",marginBottom:"0.75rem"}}>{t("howManyItems")}</p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem"}}>
                    <label className="glass-scan-btn" style={{padding:"1.25rem 0.5rem",cursor:"pointer"}}>
                      <span style={{fontSize:"1.75rem"}}>1️⃣</span>
                      <span style={{fontSize:"0.875rem"}}>{t("singleScan")}</span>
                      <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => { setLabelError(""); setLabelScanMode("single"); if(e.target.files[0]) handleScanLabel(e.target.files[0]); e.target.value=""; }} />
                    </label>
                    <label className="glass-scan-btn" style={{padding:"1.25rem 0.5rem",cursor:"pointer"}}>
                      <span style={{fontSize:"1.75rem"}}>📦</span>
                      <span style={{fontSize:"0.875rem"}}>{t("multiScans")}</span>
                      <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => { setLabelError(""); setLabelScanMode("multi"); if(e.target.files[0]) handleScanLabel(e.target.files[0]); e.target.value=""; }} />
                    </label>
                  </div>
                </div>
              )}
              {labelScanMode !== null && <>
              {labelLastItem && <div className="mb-3 rounded-lg bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-700 font-semibold animate-pulse">✅ Added: {labelLastItem} — Ready for next scan!</div>}
              {!labelScanning && !labelItem && (
                <label key={labelScanKey} className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-green-300 bg-green-50 p-8 hover:bg-green-100">
                  <span className="text-3xl mb-2">📷</span>
                  <span className="text-sm font-semibold text-green-600">{labelScanMode === "multi" ? t("tapToScanNext") : t("tapToPhoto")}</span>
                  <span className="text-xs text-gray-500 mt-1">{t("tapOpenCamera")}</span>
                  <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => { setLabelError(""); if(e.target.files[0]) handleScanLabel(e.target.files[0]); e.target.value=""; }} />
                </label>
              )}
              {labelScanning && (
                <div className="flex flex-col items-center py-8">
                  <div className="mb-3 text-3xl animate-spin">⏳</div>
                  <p className="text-sm text-gray-600">{t("readingLabel")}</p>
                </div>
              )}
              {labelError && <p className="mt-2 text-sm text-red-600">{labelError}</p>}
              {labelItem && (
                <div className="space-y-3">
                  <div className="rounded-lg border p-3 bg-green-50">
                    <p className="text-xs text-green-600 font-semibold mb-1">✅ Label read!</p>
                    <p className="font-bold text-gray-800">{labelItem.name}</p>
                    <p className="text-xs text-gray-500">{labelItem.category} · {labelItem.location}</p>
                    <p className="text-xs text-gray-600 mt-1">{labelItem.dateType}: {labelItem.date || "Not found"}</p>
                    <p className="text-sm font-bold text-gray-700 mt-2 mb-1">📅 {t("expDateLabel")} {labelItem.date && <span className="text-green-600 text-xs font-normal">✓ auto-detected</span>}</p>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <button onClick={() => handleVoiceDate("labelDate")} className={`rounded-xl py-3 text-sm font-bold ${voiceListening === "labelDate" ? "bg-red-500 text-white animate-pulse" : "bg-gradient-to-b from-blue-50 to-blue-100 text-blue-700 border-2 border-blue-300 pill-3d"}`}>🎤 {voiceListening === "labelDate" ? "Listening..." : "Speak Date"}</button>
                      <label className="rounded-xl py-3 text-sm font-bold bg-gradient-to-b from-gray-50 to-gray-100 text-gray-700 border-2 border-gray-300 pill-3d" style={{display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>📅 Enter Date<input type="date" value={labelItem.date||""} onChange={(e) => setLabelItem(prev=>({...prev,date:e.target.value,dateFound:true}))} style={{position:"absolute",opacity:0,width:"1px",height:"1px"}} /></label>
                    </div>
                    {(voiceListening === "labelDate" || labelItem.date) && <p className="text-xs mt-1" style={{color: labelItem.date ? "#059669" : "#ef4444"}}>{voiceListening === "labelDate" ? "🎤 Listening... say e.g. March 20 2026" : "✓ " + labelItem.date}</p>}
                    {labelItem.storageTip && <p className="text-xs text-gray-600 mt-1">💡 {labelItem.storageTip}</p>}
                    {labelItem.openedTip && <p className="text-xs text-orange-600 mt-1">⚠️ {labelItem.openedTip}</p>}
                    {labelItem.daysAfterOpening && <p className="text-xs text-blue-600 mt-1">📅 Use within {labelItem.daysAfterOpening} days of opening</p>}
                  </div>
                  <button onClick={handleAddLabelItem} className="w-full rounded-xl py-2.5 text-sm btn-green-3d">{labelScanMode === "multi" ? t("addAndNext") : t("addToTracker")}</button>
                  <button onClick={() => { setLabelItem(null); setLabelError(""); }} className="w-full rounded-xl border bg-gradient-to-b from-white to-gray-50 py-2 text-sm font-bold text-gray-600 pill-3d">{t("scanAnother")}</button>
                </div>
              )}
              <button onClick={() => { setShowLabelScanner(false); setLabelItem(null); setLabelError(""); setLabelScanCount(0); setLabelLastItem(""); setLabelScanMode(null); }} className="mt-3 w-full rounded-xl py-2.5 text-sm font-bold" style={{background:"linear-gradient(to bottom, #059669, #047857)", color:"white", boxShadow:"0 3px 0 #065f46"}}>{labelScanCount > 0 ? (lang === "es" ? "✅ Listo (" + labelScanCount + " artículos)" : "✅ Done (" + labelScanCount + " items added)") : t("cancel")}</button>
              </>}
            </div>
          </div>
        )}

        {activeTab === "home" && (
          <div ref={homeTopRef}>
            {/* ── Your Kitchen Today panel ── always visible ── */}
            {(() => {
              const isEs = lang === "es";
              const expired       = [...itemsWithCountdown].filter(it => it.daysLeft !== null && it.daysLeft < 0).sort((a,b) => a.daysLeft - b.daysLeft);
              const expiringToday = [...itemsWithCountdown].filter(it => it.daysLeft !== null && it.daysLeft === 0);
              const useSoon       = [...itemsWithCountdown].filter(it => it.daysLeft !== null && it.daysLeft >= 1 && it.daysLeft <= 3).sort((a,b) => a.daysLeft - b.daysLeft);
              const fresh         = [...itemsWithCountdown].filter(it => it.daysLeft !== null && it.daysLeft > 3).sort((a,b) => a.daysLeft - b.daysLeft);
              const showItems     = [...expired, ...expiringToday, ...useSoon, ...fresh].slice(0, 6);
              const attentionCount = expired.length + expiringToday.length + useSoon.length;
              let subtitle;
              if (attentionCount > 0) subtitle = isEs ? `${attentionCount} artículo${attentionCount>1?"s":""} necesitan tu atención` : `${attentionCount} item${attentionCount>1?"s":""} need your attention`;
              else                    subtitle = isEs ? "Todo se ve bien hoy" : "Everything looks good today";
              const accentColor = expired.length > 0 ? "#dc2626" : expiringToday.length > 0 ? "#fbbf24" : useSoon.length > 0 ? "#a3e635" : "#4ade80";

              const KRow = ({ item }) => {
                const d = item.daysLeft;
                let dot, textColor, statusLabel;
                if (d < 0)       { dot = "🔴"; textColor = "#fca5a5"; statusLabel = isEs ? "Fecha pasada" : "Past Date"; }
                else if (d === 0){ dot = "🔴"; textColor = "#fbbf24"; statusLabel = isEs ? "Hoy" : "Today"; }
                else if (d <= 3) { dot = "🟠"; textColor = "#a3e635"; statusLabel = `${d} ${isEs?"día"+(d===1?"":"s"):"day"+(d===1?"":"s")}`; }
                else if (d <= 7) { dot = "🟡"; textColor = "#a3e635"; statusLabel = `${d} ${isEs?(d===1?"día":"días"):(d===1?"day":"days")}`; }
                else             { dot = "🟢"; textColor = "#4ade80"; statusLabel = `${d} ${isEs?(d===1?"día":"días"):(d===1?"day":"days")}`; }
                return (
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.35rem 0",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"0.5rem",minWidth:0}}>
                      <span style={{fontSize:"0.75rem",flexShrink:0}}>{dot}</span>
                      <span style={{fontSize:"0.82rem",fontWeight:600,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</span>
                      {item.openDate && <span style={{fontSize:"0.6rem",color:"#B7D63A",fontWeight:700,flexShrink:0}}>📂</span>}
                    </div>
                    <span style={{fontSize:"0.72rem",fontWeight:700,color:textColor,whiteSpace:"nowrap",marginLeft:"0.5rem"}}>{statusLabel}</span>
                  </div>
                );
              };

              if (trackedItems.length === 0) {
                return (
                  <>
                    <div style={{marginBottom:"0.75rem"}}>
                      <h2 className="app-section-h2" style={{margin:0}}>🍽️ {isEs?"Tu Cocina Hoy":"Your Kitchen Today"}</h2>
                    </div>
                    <div style={{textAlign:"center",padding:"2.25rem 1.5rem 2rem",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.13)",borderRadius:"20px",backdropFilter:"blur(8px)",marginBottom:"1.25rem"}}>
                      <div style={{fontSize:"2.5rem",marginBottom:"0.85rem",lineHeight:1}}>🥦</div>
                      <p style={{color:"rgba(255,255,255,0.92)",fontWeight:700,fontSize:"1.05rem",marginBottom:"0.55rem",lineHeight:1.4}}>
                        {isEs ? "Tu Cocina Hoy cobrará vida a medida que construyas tu inventario." : "Your Kitchen Today will come to life as you build your inventory."}
                      </p>
                      <p style={{color:"rgba(255,255,255,0.92)",fontWeight:500,fontSize:"0.88rem",lineHeight:1.55,margin:"0 0 1.5rem"}}>
                        {isEs ? "Empieza agregando artículos en Rastreador." : "Start by adding items in Tracker."}
                      </p>
                      <button onClick={handleGoToTracker} className="glass-scan-btn" style={{fontSize:"0.88rem",padding:"0.7rem 1.75rem"}}>
                        {isEs ? "Ir al Rastreador →" : "Go to Tracker →"}
                      </button>
                    </div>
                  </>
                );
              }

              return (
                <>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"0.75rem",gap:"0.75rem"}}>
                    <div style={{minWidth:0}}>
                      <h2 className="app-section-h2" style={{margin:0}}>🍽️ {isEs?"Tu Cocina Hoy":"Your Kitchen Today"}</h2>
                      <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.75)",marginTop:"0.2rem",fontWeight:500}}>{subtitle}</div>
                    </div>
                    <button onClick={() => setActiveTab("use-soon")} style={{fontSize:"0.72rem",fontWeight:700,color:"#86efac",background:"rgba(134,239,172,0.12)",border:"1px solid rgba(134,239,172,0.3)",borderRadius:"999px",padding:"0.3rem 0.75rem",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,lineHeight:1.4,minHeight:"2rem",display:"flex",alignItems:"center"}}>
                      {isEs?"Ver Todo":"See All"} ›
                    </button>
                  </div>
                  <div style={{background:"rgba(0,0,0,0.25)",border:"1px solid rgba(255,255,255,0.12)",borderLeft:`4px solid ${accentColor}`,borderRadius:"18px",padding:"1rem 1.1rem",marginBottom:"1.25rem",backdropFilter:"blur(8px)"}}>
                    {(() => {
                      const soonItems = [...expiringToday, ...useSoon];
                      const names = soonItems.slice(0, 2).map(it => it.name);
                      let msg;
                      if (names.length === 0) { msg = isEs ? "Todo se ve fresco — ¡buen trabajo!" : "Everything looks fresh — great job."; }
                      else if (names.length === 1) { msg = isEs ? `Usa tu ${names[0]} pronto.` : `Use your ${names[0]} soon.`; }
                      else { msg = isEs ? `Usa tu ${names[0]} y ${names[1]} pronto.` : `Use your ${names[0]} and ${names[1]} soon.`; }
                      return (
                        <p style={{fontSize:"0.78rem",fontWeight:600,color:soonItems.length > 0 ? "rgba(163,230,53,0.9)" : "rgba(74,222,128,0.85)",marginBottom:"0.75rem",lineHeight:1.45}}>{msg}</p>
                      );
                    })()}
                    {showItems.length > 0 ? (
                      <div style={{marginBottom:"0.75rem"}}>{showItems.map(it => <KRow key={it.id} item={it} />)}</div>
                    ) : (
                      <div style={{textAlign:"center",padding:"0.75rem 0 0.875rem",color:"#86efac",fontSize:"0.82rem",fontWeight:600}}>✅ {isEs?"Todo fresco — ¡buen trabajo!":"Everything looks fresh — great job!"}</div>
                    )}
                    <p style={{color:"rgba(255,255,255,0.72)",fontSize:"0.88rem",fontWeight:500,marginBottom:"0.6rem",textAlign:"center",lineHeight:1.45}}>
                      {isEs ? "¿Has abierto algo últimamente?" : "Have you opened anything lately?"}
                    </p>
                    <button
                      onClick={() => { setShowOpenedModal(true); setOpenedSearch(""); setOpenedConfirm(null); setShowOpenedDateEdit(false); }}
                      className="glass-scan-btn w-full"
                      style={{padding:"0.9rem 1rem",fontSize:"0.875rem",flexDirection:"row",justifyContent:"center",gap:"0.6rem",background:"rgba(183,214,58,0.15)",borderColor:"#B7D63A"}}
                    >
                      <span style={{fontSize:"1.4rem"}}>📂</span>
                      <span style={{fontWeight:800}}>{isEs ? "Marcar Lo Que Abrí" : "Mark What You've Opened"}</span>
                    </button>
                  </div>
                </>
              );
            })()}

            <div className="grid grid-cols-3 gap-3">
              {trackedItems.length > 0 && (() => {
                const urgentCount = itemsWithCountdown.filter(it => it.daysLeft !== null && it.daysLeft <= 3).length;
                const weekCount   = itemsWithCountdown.filter(it => it.daysLeft !== null && it.daysLeft > 3 && it.daysLeft <= 7).length;
                const totalAlert  = urgentCount + weekCount;
                return (
                  <button key="use-soon" onClick={() => setActiveTab("use-soon")} style={{gridColumn:"1/-1",background: urgentCount > 0 ? "linear-gradient(135deg,rgba(220,38,38,0.25),rgba(234,88,12,0.2))" : "rgba(255,255,255,0.1)",border: urgentCount > 0 ? "1.5px solid rgba(220,38,38,0.55)" : "1.5px solid rgba(183,214,58,0.45)",borderRadius:"16px",padding:"0.875rem 1.25rem",display:"flex",alignItems:"center",gap:"1rem",cursor:"pointer",transition:"all 0.15s",backdropFilter:"blur(6px)",textAlign:"left"}}>
                    <span style={{fontSize:"2.2rem",flexShrink:0}}>⚡</span>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:800,color:"#fff",fontSize:"0.95rem",lineHeight:1.2}}>{lang==="es"?"Usar Pronto":"Use Soon"}</div>
                      <div style={{fontSize:"0.7rem",color:"#86efac",fontWeight:600,marginTop:"0.2rem"}}>
                        {urgentCount > 0
                          ? (lang==="es" ? `${urgentCount} ítem${urgentCount>1?"s":""} expiran en 1–3 días` : `${urgentCount} item${urgentCount>1?"s":""} expiring in 1–3 days`)
                          : weekCount > 0
                          ? (lang==="es" ? `${weekCount} ítem${weekCount>1?"s":""} esta semana` : `${weekCount} item${weekCount>1?"s":""} to use this week`)
                          : (lang==="es" ? "Todo fresco — revisa diario" : "All fresh — check daily")}
                      </div>
                    </div>
                    {totalAlert > 0 && <span className={urgentCount > 0 ? "urgency-pulse" : ""} style={{background: urgentCount > 0 ? "#dc2626" : "#B7D63A",color:"#fff",fontWeight:800,fontSize:"0.75rem",borderRadius:"999px",padding:"0.2rem 0.6rem",flexShrink:0,display:"inline-block"}}>{totalAlert}</span>}
                    <span style={{color:"rgba(255,255,255,0.4)",fontSize:"1.1rem",flexShrink:0}}>›</span>
                  </button>
                );
              })()}
              {[
                { icon: String.fromCodePoint(0x1F966), label: lang === "es" ? "Rastreador" : "Tracker",    sub: lang === "es" ? "Rastrea tu Comida" : "Track Your Food",    action: () => setActiveTab("tracker") },
                { icon: String.fromCodePoint(0x1F373), label: lang === "es" ? "Recetas" : "Recipes",       sub: lang === "es" ? "Usa Lo Que Tienes" : "Use What You Have",  action: () => setActiveTab("recipes") },
                { icon: String.fromCodePoint(0x1F6D2), label: lang === "es" ? "Compras" : "Shopping",      sub: lang === "es" ? "Tu Lista" : "Build Your List",              action: () => setActiveTab("shopping") },
                { icon: String.fromCodePoint(0x1F4C5), label: lang === "es" ? "Comidas" : "Meals",         sub: lang === "es" ? "Tu Semana" : "Plan Your Week",              action: () => setActiveTab("meals") },
                { icon: "🌱",                           label: lang === "es" ? "Compost" : "Compost",       sub: lang === "es" ? "Salva El Mundo" : "Save The World",         action: () => setActiveTab("composting") },
                { icon: "🏪",                           label: lang === "es" ? "Tiendas" : "Stores",        sub: lang === "es" ? "Enlaza y Compra" : "Link And Shop",          action: () => setActiveTab("stores-page") },
                { icon: "👥",                           label: lang === "es" ? "Comunidad" : "Community",   sub: lang === "es" ? "Comparte" : "Share",                        action: () => setActiveTab("community") },
                { icon: "⚠️",                           label: lang === "es" ? "Alertas FDA" : "FDA Recalls", sub: lang === "es" ? "Revisa Diario" : "Check Daily",           action: () => setShowRecallsPanel(true) },
                { icon: "❓",                           label: lang === "es" ? "Cómo Usar" : "How to Use",  sub: lang === "es" ? "Orientación" : "Guidance",                  action: () => setShowHelp(true) },
                { icon: "🤝",                           label: lang === "es" ? "Socios" : "Partners",       sub: lang === "es" ? "Beneficios y Dar" : "Benefits & Giving Back", action: () => setActiveTab("partners") },
                { icon: "🥗",                           label: lang === "es" ? "Dieta" : "Dietary",         sub: lang === "es" ? "Necesidades" : "Dietary Needs",             action: () => setActiveTab("dietary") },
                { icon: "💬",                           label: lang === "es" ? "Sugerencias" : "Suggestions", sub: lang === "es" ? "Tu Opinión" : "Share Feedback",           action: () => setActiveTab("more") },
              ].map(({ icon, label, sub, action }) => {
                const isTrackerTile = label === (lang === "es" ? "Rastreador" : "Tracker");
                const isShoppingTile = label === (lang === "es" ? "Compras" : "Shopping");
                return (
                  <button key={label} onClick={action} className={`dash-tile${isTrackerTile && trackerTileFlash ? " tracker-tile-active" : ""}`}>
                    <span style={{fontSize:"2rem",...(isShoppingTile ? {filter:"drop-shadow(0 0 4px rgba(249,115,22,0.55)) brightness(1.13)",display:"inline-block"} : {})}}>{icon}</span>
                    <span style={{fontSize:"0.7rem",fontWeight:700,color:"#fff",letterSpacing:"0.02em",textAlign:"center",lineHeight:1.2}}>{label}</span>
                    {sub && <span style={{fontSize:"0.6rem",fontWeight:600,color:"#86efac",textAlign:"center",lineHeight:1.2}}>{sub}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "tracker" && (
          <div ref={trackerTopRef} style={{display:"flex",flexDirection:"column",gap:"0.75rem"}}>

            {/* Header — always visible */}
            <div className={trackerEntryFlash ? "tracker-entry-flash" : ""} style={{marginBottom:"0.5rem",padding:trackerEntryFlash?"0.4rem 0.5rem":"0",transition:"padding 0s"}}>
              <h2 className="text-xl font-semibold" style={{margin:0,color:"#fff"}}>
                {lang === "es" ? "Rastrea tu Comida" : "Keep Track of Your Food"}
              </h2>
            </div>

            {trackedItems.length === 0 ? (
              /* ── EMPTY STATE ── */
              <>
                <div style={{textAlign:"center",padding:"1.25rem 1rem 1rem",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:"16px",backdropFilter:"blur(6px)"}}>
                  <div style={{fontSize:"2rem",marginBottom:"0.5rem",lineHeight:1}}>🥦</div>
                  <p style={{color:"rgba(255,255,255,0.9)",fontWeight:700,fontSize:"1rem",marginBottom:"0.35rem",lineHeight:1.4}}>
                    {lang === "es" ? "Empieza agregando artículos en Rastreador." : "Start by adding items below."}
                  </p>
                  <p style={{color:"rgba(255,255,255,0.75)",fontWeight:500,fontSize:"0.8rem",lineHeight:1.5,margin:0}}>
                    {lang === "es" ? "Aquí es donde llevarás un registro de todo lo que tienes." : "This is where you'll keep track of everything you have."}
                  </p>
                </div>

                <div>
                  <div style={{textAlign:"center",marginBottom:"0.5rem"}}>
                    <span style={{display:"inline-block",background:"linear-gradient(135deg,#F0C070,#E8A63C)",color:"#000",fontWeight:800,fontSize:"0.6rem",borderRadius:"999px",padding:"0.15rem 0.65rem",boxShadow:"0 2px 6px rgba(232,166,60,0.35)"}}>⭐ {lang === "es" ? "Empieza aquí" : "Start here for best results"}</span>
                  </div>
                  <button
                    onClick={() => { window.scrollTo(0,0); setShowReceiptScanner(true); }}
                    style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:"0.6rem",background:"linear-gradient(to bottom,#F0C070,#E8A63C)",color:"#000",fontWeight:800,fontSize:"0.95rem",padding:"1rem 1.25rem",borderRadius:"14px",border:"none",cursor:"pointer",boxShadow:"0 5px 0 #8C5A10,0 8px 22px rgba(0,0,0,0.28),inset 0 1.5px 0 rgba(255,255,255,0.4)",transition:"all 0.18s ease",marginBottom:"1rem",WebkitTapHighlightColor:"transparent"}}
                    onMouseOver={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 7px 0 #8C5A10,0 12px 26px rgba(0,0,0,0.32),inset 0 1.5px 0 rgba(255,255,255,0.4)";}}
                    onMouseOut={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 5px 0 #8C5A10,0 8px 22px rgba(0,0,0,0.28),inset 0 1.5px 0 rgba(255,255,255,0.4)";}}
                  >
                    <span style={{fontSize:"1.4rem",lineHeight:1}}>📷</span>
                    <span>{lang === "es" ? "Escanear Recibos al Rastreador" : "Scan Grocery Receipts to Tracker"}</span>
                  </button>
                  <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"0.75rem"}}>
                    <div style={{flex:1,height:"1px",background:"rgba(255,255,255,0.1)"}}></div>
                    <span style={{color:"rgba(255,255,255,0.3)",fontSize:"0.68rem",fontWeight:600,letterSpacing:"0.06em",whiteSpace:"nowrap"}}>{lang==="es"?"O AGREGA DE OTRA MANERA":"OR ADD ANOTHER WAY"}</span>
                    <div style={{flex:1,height:"1px",background:"rgba(255,255,255,0.1)"}}></div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:"0.5rem"}}>
                    {[
                      { icon:"📸", primary: lang==="es"?"Escanea el código de barras o etiqueta de un artículo":"Scan a single item's barcode or label", secondary:"Smart Scan", onClick: ()=>{ window.scrollTo(0,0);setShowSmartScanner(true);setUniScanCount(0);setUniScanLastItem("");setVoiceFlowStep(null);setScanMode("single");sessionItemsRef.current=[]; }},
                      { icon:"📦", primary: lang==="es"?"Escanea varios códigos de barras o etiquetas a la vez":"Scan several barcodes or labels at once", secondary:"Scan Multiple", onClick: ()=>{ setShowMultiScanner(true);setMultiScanStatus("camera");setMultiItems([]);setMultiScanError(""); }},
                    ].map(({icon,primary,secondary,onClick})=>(
                      <button key={secondary} onClick={onClick} style={{width:"100%",display:"flex",alignItems:"center",gap:"0.65rem",background:"rgba(255,255,255,0.09)",border:"1.5px solid rgba(255,255,255,0.18)",borderRadius:"14px",padding:"0.85rem 1.1rem",cursor:"pointer",transition:"all 0.18s ease",WebkitTapHighlightColor:"transparent"}}
                        onMouseOver={e=>{e.currentTarget.style.background="rgba(255,255,255,0.15)";e.currentTarget.style.borderColor="rgba(255,255,255,0.3)";}}
                        onMouseOut={e=>{e.currentTarget.style.background="rgba(255,255,255,0.09)";e.currentTarget.style.borderColor="rgba(255,255,255,0.18)";}}
                      >
                        <span style={{fontSize:"1.3rem",lineHeight:1,flexShrink:0}}>{icon}</span>
                        <div style={{textAlign:"left"}}>
                          <div style={{color:"#fff",fontWeight:700,fontSize:"0.85rem",lineHeight:1.3}}>{primary}</div>
                          <div style={{color:"rgba(255,255,255,0.75)",fontWeight:600,fontSize:"0.68rem",marginTop:"0.2rem",letterSpacing:"0.02em"}}>{secondary}</div>
                        </div>
                      </button>
                    ))}
                    {/* Quick Add + Voice row */}
                    <div style={{display:"flex",gap:"0.5rem"}}>
                      <button onClick={() => setShowQuickAdd(true)} style={{flex:1,display:"flex",alignItems:"center",gap:"0.65rem",background:"rgba(255,255,255,0.09)",border:"1.5px solid rgba(255,255,255,0.18)",borderRadius:"14px",padding:"0.85rem 1.1rem",cursor:"pointer",transition:"all 0.18s ease",WebkitTapHighlightColor:"transparent"}}
                        onMouseOver={e=>{e.currentTarget.style.background="rgba(255,255,255,0.15)";e.currentTarget.style.borderColor="rgba(255,255,255,0.3)";}}
                        onMouseOut={e=>{e.currentTarget.style.background="rgba(255,255,255,0.09)";e.currentTarget.style.borderColor="rgba(255,255,255,0.18)";}}
                      >
                        <span style={{fontSize:"1.3rem",lineHeight:1,flexShrink:0}}>✏️</span>
                        <div style={{textAlign:"left"}}>
                          <div style={{color:"#fff",fontWeight:700,fontSize:"0.85rem",lineHeight:1.3}}>{lang==="es"?"Agrega un artículo manualmente":"Add an item manually"}</div>
                          <div style={{color:"rgba(255,255,255,0.75)",fontWeight:600,fontSize:"0.68rem",marginTop:"0.2rem",letterSpacing:"0.02em"}}>{t("quickAdd")}</div>
                        </div>
                      </button>
                      <button onClick={triggerVoiceCommand} style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"0.2rem",background:voiceCmdActive?"rgba(239,68,68,0.15)":"rgba(255,255,255,0.09)",border:`1.5px solid ${voiceCmdActive?"rgba(239,68,68,0.5)":"rgba(255,255,255,0.18)"}`,borderRadius:"14px",padding:"0.75rem 1rem",cursor:"pointer",flexShrink:0,transition:"all 0.18s ease",WebkitTapHighlightColor:"transparent"}} title={lang==="es"?"Comando de voz":"Voice command"}>
                        <span style={{fontSize:"1.3rem",lineHeight:1}}>🎤</span>
                        <span style={{color:"rgba(255,255,255,0.75)",fontSize:"0.6rem",fontWeight:600,whiteSpace:"nowrap"}}>{lang==="es"?"o dilo":"or say it"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* ── POPULATED STATE ── */
              <>
                {/* Summary bar */}
                {(() => {
                  const soonCount = itemsWithCountdown.filter(it => it.daysLeft !== null && it.daysLeft >= 0 && it.daysLeft <= 3).length;
                  const msg = soonCount > 0
                    ? (lang === "es" ? `Tienes ${soonCount} artículo${soonCount > 1 ? "s" : ""} para usar pronto.` : `You have ${soonCount} item${soonCount > 1 ? "s" : ""} to use soon.`)
                    : (lang === "es" ? "Todo fresco — ¡buen trabajo!" : "Everything looks fresh — great job!");
                  const isAlert = soonCount > 0;
                  if (justAddedFirst) {
                    return (
                      <div className="tf-first-item-msg" style={{textAlign:"center",padding:"0.65rem 1rem",background:"rgba(134,239,172,0.08)",border:"1px solid rgba(134,239,172,0.2)",borderRadius:"12px"}}>
                        <span style={{color:"rgba(255,255,255,0.92)",fontSize:"0.85rem",fontWeight:500,lineHeight:1.4}}>
                          🌱 {lang === "es" ? "Tu cocina está empezando a tomar forma." : "Your kitchen is starting to take shape."}
                        </span>
                      </div>
                    );
                  }
                  return (
                    <div style={{display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.6rem 0.9rem",background: isAlert ? "rgba(251,191,36,0.1)" : "rgba(34,197,94,0.08)",border:`1px solid ${isAlert ? "rgba(251,191,36,0.25)" : "rgba(34,197,94,0.2)"}`,borderRadius:"12px"}}>
                      <span style={{fontSize:"0.95rem",flexShrink:0}}>{isAlert ? "⚠️" : "✅"}</span>
                      <span style={{color: isAlert ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.72)",fontSize:"0.83rem",fontWeight:500,lineHeight:1.4}}>{msg}</span>
                    </div>
                  );
                })()}

                {/* Track Your Food + scan actions */}
                <div>
                  <span className="app-section-label">{String.fromCodePoint(0x1F966)} {t("tracker")}</span>
                  <h2 className="app-section-h2" style={{marginBottom:"0.25rem"}}>{lang === "es" ? "Rastrea tu Comida" : "Track Your Food"}</h2>
                </div>
                <div>
                  <button onClick={() => { window.scrollTo(0,0); setShowReceiptScanner(true); }} className="glass-scan-btn w-full" style={{padding:"0.85rem 1rem",fontSize:"0.8rem",flexDirection:"row",justifyContent:"center",gap:"0.5rem",marginBottom:"0.3rem"}}><span style={{fontSize:"1.4rem"}}>📷</span>{t("scanReceipts")}</button>
                  <div style={{textAlign:"center",marginBottom:"0.75rem"}}>
                    <span style={{display:"inline-block",background:"linear-gradient(135deg,#F0C070,#E8A63C)",color:"#000",fontWeight:800,fontSize:"0.65rem",borderRadius:"999px",padding:"0.2rem 0.75rem",boxShadow:"0 2px 6px rgba(232,166,60,0.4)"}}>⭐ {lang === "es" ? "Empieza aquí para mejores resultados" : "Start here for best results"}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => { window.scrollTo(0,0); setShowSmartScanner(true); setUniScanCount(0); setUniScanLastItem(""); setVoiceFlowStep(null); setScanMode("single"); sessionItemsRef.current = []; }} className="glass-scan-btn" style={{padding:"0.85rem 0.35rem",fontSize:"0.7rem"}}><span style={{fontSize:"1.3rem"}}>📸</span>Smart Scan</button>
                    <button onClick={() => { setShowMultiScanner(true); setMultiScanStatus("camera"); setMultiItems([]); setMultiScanError(""); }} className="glass-scan-btn" style={{padding:"0.85rem 0.35rem",fontSize:"0.7rem"}}><span style={{fontSize:"1.3rem"}}>📦</span>Scan Multiple</button>
                  </div>
                  <div style={{display:"flex",gap:"0.5rem",marginTop:"0.5rem"}}>
                    <button onClick={() => setShowQuickAdd(true)} className="glass-scan-btn" style={{flex:1,padding:"0.75rem 0.75rem",fontSize:"0.75rem",flexDirection:"row",justifyContent:"center",gap:"0.4rem"}}><span style={{fontSize:"1.1rem"}}>✏️</span>{lang==="es"?"Agregar manualmente":"Add manually"}</button>
                    <button onClick={triggerVoiceCommand} style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"0.2rem",background:voiceCmdActive?"rgba(239,68,68,0.15)":"rgba(255,255,255,0.12)",border:`1.5px solid ${voiceCmdActive?"rgba(239,68,68,0.5)":"#B7D63A"}`,borderRadius:"12px",padding:"0.65rem 0.9rem",cursor:"pointer",flexShrink:0,transition:"all 0.18s ease",WebkitTapHighlightColor:"transparent"}} title={lang==="es"?"Comando de voz":"Voice command"}>
                      <span style={{fontSize:"1.1rem",lineHeight:1}}>🎤</span>
                      <span style={{color:"rgba(255,255,255,0.75)",fontSize:"0.6rem",fontWeight:600,whiteSpace:"nowrap"}}>{lang==="es"?"o dilo":"or say it"}</span>
                    </button>
                  </div>
                </div>

                {/* Mark What You've Opened */}
                <div>
                  <p style={{color:"rgba(255,255,255,0.72)",fontSize:"0.88rem",fontWeight:500,marginBottom:"0.6rem",textAlign:"center",lineHeight:1.45}}>
                    {lang === "es" ? "¿Has abierto algo últimamente?" : "Have you opened anything lately?"}
                  </p>
                  <button onClick={() => { setShowOpenedModal(true); setOpenedSearch(""); setOpenedConfirm(null); setShowOpenedDateEdit(false); }} className="glass-scan-btn w-full" style={{padding:"0.9rem 1rem",fontSize:"0.875rem",flexDirection:"row",justifyContent:"center",gap:"0.6rem",background:"rgba(183,214,58,0.15)",borderColor:"#B7D63A"}}>
                    <span style={{fontSize:"1.4rem"}}>📂</span>
                    <span style={{fontWeight:800}}>{lang === "es" ? "Marcar Lo Que Abrí" : "Mark What You've Opened"}</span>
                  </button>
                </div>

                {/* Items card */}
                <div>
                  <p style={{color:"rgba(255,255,255,0.9)",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:"0.4rem",textAlign:"center"}}>Organize Tracked Items</p>
                  <Card className="tracker-items-card">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button onClick={() => { if (window.confirm(t("clearAllConfirm"))) { setTrackedItems([]); } }} className="rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">{t("clearAll")}</button>
                      </div>
                      <span style={{color:"rgba(255,255,255,0.75)",fontSize:"0.875rem",fontWeight:600}}>{filteredItems.length} item{filteredItems.length === 1 ? "" : "s"}</span>
                    </div>
                    <div className="mb-2 flex flex-wrap gap-1">
                      {["All", ...LOCATIONS].map((l) => {
                        const LOC_ES = {All:"Todo",Fridge:"Refrigerador",Freezer:"Congelador",Pantry:"Despensa"};
                        const label = lang === "es" ? LOC_ES[l] : l;
                        return (
                          <button key={l} onClick={() => setFilterLocation(l)} className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${filterLocation === l ? "bg-green-700 text-white" : "bg-white text-gray-600 hover:bg-green-50 border border-gray-200 pill-3d"}`}>
                            {l !== "All" ? LOCATION_ICONS[l] + " " : ""}{label}
                          </button>
                        );
                      })}
                    </div>
                    <div className="mb-3 flex flex-wrap gap-1">
                      {["All", ...CATEGORIES].map((c) => {
                        const CAT_ES = {All:"Todo",Produce:"Verduras",Dairy:"Lácteos",Meat:"Carne",Pantry:"Despensa",Leftovers:"Sobras",Other:"Otro"};
                        const label = lang === "es" ? CAT_ES[c] : c;
                        return (
                          <button key={c} onClick={() => setFilterCategory(c)} className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${filterCategory === c ? "bg-green-700 text-white" : "bg-white text-gray-600 hover:bg-green-50 border border-gray-200 pill-3d"}`}>{label}</button>
                        );
                      })}
                    </div>
                    {filteredItems.length === 0 ? (
                      <p className="text-sm text-white/70">{t("noFilter")}</p>
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
                                  <div className="text-xs mt-0.5">
                                    {it.openDate ? (
                                      <span style={{color:"#15803d",fontWeight:700}}>
                                        📂 Opened {fmtDate(it.openDate)}
                                        {it.openUseBy && it.daysLeft !== null
                                          ? ` · Use within ${it.daysLeft} day${it.daysLeft === 1 ? "" : "s"}`
                                          : ""}
                                      </span>
                                    ) : it.useByDate ? (
                                      <span className="text-gray-500">Use by {fmtDate(it.useByDate)}</span>
                                    ) : null}
                                  </div>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {it.storageTip && <TipPill type="gray">💡 {it.storageTip}</TipPill>}
                                    {it.openedTip && <TipPill type="orange">⚠️ {it.openedTip}</TipPill>}
                                    {it.daysAfterOpening && <TipPill type="blue">📅 Use within {it.daysAfterOpening} days of opening</TipPill>}
                                    {it.freezeBy && it.location === "Fridge" && <TipPill type="cyan">🧊 Freeze by: {it.freezeBy}</TipPill>}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 ml-2">
                                  <div className="text-right" style={{minWidth:"3.2rem"}}>
                                    {it.daysLeft === null ? (
                                      <div className="flash-red" onClick={() => handleEditItem(it.id)} style={{display:"inline-block",border:"1.5px solid rgba(220,38,38,0.7)",borderRadius:"999px",padding:"0.18rem 0.45rem",fontSize:"0.65rem",fontWeight:800,color:"#dc2626",whiteSpace:"nowrap",cursor:"pointer",textAlign:"center",lineHeight:1.3}}>Add<br/>Date</div>
                                    ) : (() => {
                                      const d = it.daysLeft;
                                      const [bg, color, border] = d <= 2 ? ["rgba(220,38,38,0.15)","#dc2626","rgba(220,38,38,0.5)"] : d <= 4 ? ["rgba(234,88,12,0.15)","#ea580c","rgba(234,88,12,0.5)"] : d <= 7 ? ["rgba(202,138,4,0.15)","#ca8a04","rgba(202,138,4,0.5)"] : ["rgba(22,163,74,0.15)","#16a34a","rgba(22,163,74,0.5)"];
                                      return (
                                        <div>
                                          <div style={{display:"inline-block",background:bg,border:`1.5px solid ${border}`,borderRadius:"999px",padding:"0.18rem 0.55rem",fontSize:"0.85rem",fontWeight:800,color,whiteSpace:"nowrap",lineHeight:1.2}}>{d}</div>
                                          <div className="text-xs mt-0.5" style={{color,opacity:0.8}}>{t("days")}</div>
                                          {d <= 2 && <div style={{fontSize:"0.6rem",fontWeight:700,color:"#dc2626",letterSpacing:"0.02em",marginTop:"0.1rem",whiteSpace:"nowrap"}}>Expiring Soon</div>}
                                        </div>
                                      );
                                    })()}
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
                </div>
              </>
            )}
          </div>
        )}
        {activeTab === "recipes" && (
          <>
          <div className="mb-3">
            <span className="app-section-label"><AiBadge />-Powered</span>
            <h2 className="app-section-h2">🍳 {t("recipeSugg")}</h2>
          </div>
          <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
            <div className="mb-3 flex items-center gap-2">
              <ChefHat className="h-5 w-5" style={{color:"#B7D63A"}} /><h2 className="text-lg font-bold text-white">{t("recipeSugg")}</h2>
            </div>
            <p className="mb-4 text-sm" style={{color:"rgba(255,255,255,0.8)",lineHeight:1.55}}>
              {lang === "es" ? "Basado en lo que tienes. " : "Matched to what's in your fridge, pantry & freezer. "}
              <span style={{color:"#fbbf24",fontWeight:800,textShadow:"0 1px 4px rgba(0,0,0,0.3)"}}>{lang === "es" ? "Prioriza lo que vence pronto" : "Prioritizes what expires soonest"}</span>
              {lang === "es" ? " — puede sugerir 1-2 ingredientes extra." : " — may suggest 1-2 extra ingredients to complete a dish."}
            </p>
            <div className="flex gap-2 mb-3">
              <button onClick={() => setRecipeMode("strict")} className="flex-1 rounded-xl py-2 px-3 text-xs font-bold border-2 transition-all" style={recipeMode === "strict" ? {background:"rgba(21,128,61,0.7)",borderColor:"#4ade80",color:"#fff"} : {background:"rgba(255,255,255,0.07)",borderColor:"rgba(74,222,128,0.4)",color:"#86efac"}}>🥦 {lang === "es" ? "Usar Lo Que Tengo" : "Use What I Have"}</button>
              <button onClick={() => setRecipeMode("suggest")} className="flex-1 rounded-xl py-2 px-3 text-xs font-bold border-2 transition-all" style={recipeMode === "suggest" ? {background:"rgba(29,78,216,0.7)",borderColor:"#93c5fd",color:"#fff"} : {background:"rgba(255,255,255,0.07)",borderColor:"rgba(147,197,253,0.4)",color:"#93c5fd"}}>✨ {lang === "es" ? "Sugerir Faltantes" : "Suggest Additional Ingredients"}</button>
            </div>
            <button onClick={handleSuggestRecipes} disabled={recipesLoading} className="glass-scan-btn inline-flex items-center gap-2 px-5 py-2.5 text-sm disabled:opacity-50">{recipesLoading ? <><span className="animate-spin">🤖</span> <AiBadge style={{fontSize:"1.5em"}} /> is cooking...</> : <><ChefHat className="h-4 w-4" /> Get <AiBadge style={{fontSize:"1.5em"}} /> Recipe Ideas</>}</button>
            {recipesGenerated && recipeSuggestions.length === 0 && <p className="mt-4 text-sm" style={{color:"rgba(255,255,255,0.6)"}}>{t("noMatches")}</p>}
            {recipeSuggestions.length > 0 && (
              <div className="mt-4 space-y-3">
                {recipeSuggestions.map((r, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden" style={{background:"rgba(0,0,0,0.25)",border:"1px solid rgba(255,255,255,0.13)"}}>
                    <button onClick={() => setExpandedRecipe(expandedRecipe === i ? null : i)} className="w-full p-4 text-left" style={{borderRadius:"inherit",transition:"background 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.06)"} onMouseLeave={e=>e.currentTarget.style.background=""}>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-white">{r.name}</h3>
                          <p className="text-xs mt-0.5" style={{color:"rgba(134,239,172,0.7)"}}>{lang === "es" ? "Incluye ingredientes y pasos" : "Includes ingredients & steps"}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-2 shrink-0">
                          <span className="rounded px-2 py-0.5 text-xs font-semibold" style={{background:"rgba(249,115,22,0.25)",color:"#fed7aa"}}>⏱ {r.time}</span>
                          {expandedRecipe !== i && <span style={{color:"rgba(255,255,255,0.45)",fontWeight:700,fontSize:"1rem"}}>→</span>}
                          <span className={expandedRecipe === i ? "arrow-up" : "arrow-down"}>{expandedRecipe === i ? "▲" : "▼"}</span>
                        </div>
                      </div>
                      <p className="mt-1 text-sm" style={{color:"rgba(255,255,255,0.72)"}}>{r.description}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {r.difficulty && <span className="rounded-full px-2 py-0.5 text-xs font-bold" style={{background:"rgba(168,85,247,0.25)",color:"#d8b4fe"}}>{r.difficulty}</span>}
                        {(r.usesExpiring || []).map((name, j) => (
                          <span key={j} className="rounded-full px-2 py-0.5 text-xs font-medium" style={{background:"rgba(220,38,38,0.25)",color:"#fca5a5"}}>⚡ {name}</span>
                        ))}
                      </div>
                    </button>
                    {expandedRecipe === i && (
                      <div className="px-4 py-3" style={{background:"rgba(0,0,0,0.3)",borderTop:"1px solid rgba(255,255,255,0.1)"}}>
                        {r.ingredients && r.ingredients.length > 0 && (<><h4 className="mb-2 text-sm font-bold text-white">{t("ingredientsWord")}</h4><ul className="mb-3 space-y-1">{r.ingredients.map((ing, j) => <li key={j} className="text-sm flex items-center gap-1" style={{color:"rgba(255,255,255,0.8)"}}><span style={{color:"#4ade80"}}>•</span> {ing}</li>)}</ul></>)}
                        <h4 className="mb-2 text-sm font-bold text-white">{t("instructionsWord")}</h4>
                        <p className="whitespace-pre-line text-sm leading-relaxed" style={{color:"rgba(255,255,255,0.8)"}}>{r.instructions}</p>
                        <div className="mt-3 flex justify-end">
                          <button onClick={() => handleSaveRecipeToCommunity(r)} disabled={savedRecipes.includes(r.name)} className="glass-scan-btn px-3 py-1.5 text-xs disabled:opacity-40">
                            {savedRecipes.includes(r.name) ? "Saved to Community" : "Save to Community"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {!recipesGenerated && <div className="mt-4 rounded-xl p-4 text-sm" style={{background:"rgba(255,255,255,0.07)",color:"rgba(255,255,255,0.6)"}}>You have {trackedItems.length} tracked item{trackedItems.length === 1 ? "" : "s"}. Click the button to see recipe matches.{trackedItems.length === 0 && " Add items in the Tracker tab first."}</div>}
          </Card>
          </>
        )}

        {activeTab === "shopping" && (
          <>
            <div className="mb-3">
              <span className="app-section-label">Grocery</span>
              <h2 className="app-section-h2"><span className="cart-icon">🛒</span> {t("shoppingList")}</h2>
            </div>
            <Card style={{background:"linear-gradient(160deg,#053d2e 0%,#064e3b 50%,#065f46 100%)",border:"2px solid rgba(183,214,58,0.75)"}}>
              <div className="mb-3 flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" style={{color:"#B7D63A"}} />
                <h2 className="text-lg font-bold text-white">{t("shoppingList")}</h2>
                {shoppingItems.some((it) => it.checked) && (
                  <button onClick={handleClearChecked} className="ml-auto rounded px-3 py-1 text-xs font-semibold text-red-200" style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,100,100,0.5)"}}>{t("clearChecked")}</button>
                )}
              </div>
              <div className="flex flex-col gap-2 mb-2 w-full">
                <ShoppingAutocomplete
                  value={newShoppingItem}
                  onChange={setNewShoppingItem}
                  onSelect={(f) => {
                    const name = (lang === "es" && FOOD_ES[f.name]) ? FOOD_ES[f.name] : f.name;
                    setShoppingItems(prev => [...prev, { id: crypto.randomUUID(), name, qty: newShoppingQty.trim(), checked: false }]);
                    setNewShoppingItem(""); setNewShoppingQty("");
                  }}
                  onAddItem={handleAddShoppingItem}
                  lang={lang}
                />
                <div className="flex gap-2">
                  <input value={newShoppingQty} onChange={(e) => setNewShoppingQty(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddShoppingItem()} placeholder={t("qtyPlaceholder")} className="w-24 rounded-xl px-3 py-2 text-sm text-gray-900" />
                  <button onClick={handleAddShoppingItem} className="glass-scan-btn flex-1 py-2 text-sm" style={{background:"rgba(255,102,0,0.22)",boxShadow:"0 2px 10px rgba(255,102,0,0.3)"}}>{t("addBtn")}</button>
                </div>
              </div>
              {shoppingItems.filter(it => it.source !== "used").length === 0 ? (
                <p className="text-sm text-green-100 mt-3">{t("emptyList")}</p>
              ) : (
                <div className="mt-3 space-y-2">
                  {shoppingItems.filter(it => it.source !== "used").sort((a, b) => (a.checked ? 1 : 0) - (b.checked ? 1 : 0)).map((it) => {
                    const nameLower = it.name.toLowerCase();
                    const flaggedAllergens = activeDietaryProfile.combinedTags.filter(tag => (ALLERGEN_KEYWORDS[tag] || []).some(kw => nameLower.includes(kw)));
                    return (
                    <div key={it.id} className="flex items-center gap-3 rounded-lg px-3 py-2" style={{background: it.checked ? "rgba(255,255,255,0.14)" : flaggedAllergens.length > 0 ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.22)", border: it.checked ? "1px solid rgba(255,255,255,0.28)" : flaggedAllergens.length > 0 ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(255,255,255,0.35)", opacity: it.checked ? 0.85 : 1}}>
                      <input type="checkbox" checked={it.checked} onChange={() => handleToggleShoppingItem(it.id)} className="h-4 w-4 rounded accent-orange-500" />
                      <div className="flex-1">
                        <span className={`text-sm ${it.checked ? "line-through text-white/65" : "text-white font-semibold"}`}>{it.name}{it.qty ? " — " + it.qty : ""}</span>
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {it.forMeal && <span className="rounded-full px-2 py-0.5 text-xs font-medium text-orange-200" style={{background:"rgba(183,214,58,0.3)"}}>📅 {it.forMeal}</span>}
                          {flaggedAllergens.map(tag => <span key={tag} className="rounded-full px-2 py-0.5 text-xs font-bold" style={{background:"rgba(239,68,68,0.3)",color:"#fca5a5"}}>⚠️ {tag}</span>)}
                        </div>
                      </div>
                      <button onClick={() => handleRemoveShoppingItem(it.id)} style={{fontSize:"1.1rem",fontWeight:700,color:"#fff",background:"none",border:"none",cursor:"pointer",lineHeight:1,padding:"0 2px"}}>✕</button>
                    </div>
                    );
                  })}
                </div>
              )}
            </Card>
            {shoppingItems.some(it => it.source === "used") && (
              <Card style={{background:"linear-gradient(160deg,#053d2e 0%,#064e3b 50%,#065f46 100%)",border:"2px solid rgba(183,214,58,0.75)"}}>
                <h3 className="mb-1 font-bold text-white">🔄 Recently Used — Restock</h3>
                <p className="mb-3 text-xs text-green-100">Items you've used up. Tap to check off once you've added them to your cart.</p>
                <div className="space-y-2">
                  {shoppingItems.filter(it => it.source === "used").map((it) => (
                    <div key={it.id} className="flex items-center gap-3 rounded-lg px-3 py-2" style={{background: it.checked ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.18)", border: it.checked ? "1px solid rgba(255,255,255,0.28)" : "1px solid rgba(255,165,0,0.45)", opacity: it.checked ? 0.85 : 1}}>
                      <input type="checkbox" checked={it.checked} onChange={() => handleToggleShoppingItem(it.id)} className="h-4 w-4 rounded accent-orange-500" />
                      <div className="flex-1">
                        <span className={`text-sm ${it.checked ? "line-through text-white/65" : "text-white font-semibold"}`}>{it.name}</span>
                        <div className="mt-0.5"><span className="rounded-full px-2 py-0.5 text-xs font-bold" style={{background:"rgba(183,214,58,0.35)",color:"#D4E87A"}}>🔄 Used</span></div>
                      </div>
                      <button onClick={() => handleRemoveShoppingItem(it.id)} style={{fontSize:"1.1rem",fontWeight:700,color:"#fff",background:"none",border:"none",cursor:"pointer",lineHeight:1,padding:"0 2px"}}>✕</button>
                    </div>
                  ))}
                </div>
              </Card>
            )}
            {expiringSoon.length > 0 && (
              <Card style={{background:"linear-gradient(160deg,#053d2e 0%,#064e3b 50%,#065f46 100%)",border:"2px solid rgba(183,214,58,0.75)"}}>
                <h3 className="mb-2 font-bold text-white">{t("expiringSoonTitle")}</h3>
                <p className="mb-3 text-xs text-green-100">{t("expiringSoonDesc")}</p>
                <div className="space-y-2">
                  {expiringSoon.map((it) => {
                    const alreadyAdded = shoppingItems.some((s) => s.name.toLowerCase() === it.name.toLowerCase());
                    const urgent = it.daysLeft !== null && it.daysLeft <= 3;
                    return (
                      <div key={it.id} className="flex items-center justify-between rounded-lg px-3 py-2" style={{background: urgent ? "rgba(255,80,80,0.22)" : "rgba(255,200,0,0.18)", border: urgent ? "1px solid rgba(255,100,100,0.5)" : "1px solid rgba(255,200,0,0.45)"}}>
                        <div>
                          <span className="text-sm font-semibold text-white">{it.name}</span>
                          <span className={`ml-2 text-xs font-bold ${urgent ? "text-red-200" : "text-yellow-200"}`}>{it.daysLeft}d left</span>
                        </div>
                        <button onClick={() => handleAddToShoppingFromTracker(it)} disabled={alreadyAdded} className="glass-scan-btn px-3 py-1.5 text-xs disabled:opacity-40">
                          {alreadyAdded ? t("addedWord") : t("addWord")}
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
              <h2 className="mb-1 text-lg font-bold">{t("pickAMeal")}</h2>
              <p className="mb-3 text-xs text-gray-500">{mealPickerDay} — {mealPickerSlot}</p>
              <div className="flex gap-2 mb-3">
                <MealSearchInput value={mealPickerSearch} onChange={(e) => setMealPickerSearch(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && mealPickerSearch.trim()) handleSetMeal(mealPickerDay, mealPickerSlot, mealPickerSearch.trim()); }} />
                {mealPickerSearch.trim() && <button onClick={() => handleSetMeal(mealPickerDay, mealPickerSlot, mealPickerSearch.trim())} className="glass-scan-btn px-3 py-2 text-sm">Add</button>}
              </div>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {mealPickerSearch && !RECIPE_DB.find((r) => r.name.toLowerCase() === mealPickerSearch.toLowerCase()) && (
                  <button onClick={() => handleSetMeal(mealPickerDay, mealPickerSlot, mealPickerSearch)} className="glass-scan-btn w-full py-2 text-sm">{lang === "es" ? `+ Agregar "${mealPickerSearch}" como comida` : `+ Add "${mealPickerSearch}" as custom meal`}</button>
                )}
                {RECIPE_DB.filter((r) => r.name.toLowerCase().includes(mealPickerSearch.toLowerCase())).map((r) => {
                  const usesExpiring = r.ingredients.some((ing) => itemsWithCountdown.some((it) => it.daysLeft !== null && it.daysLeft <= 7 && (it.name.toLowerCase().includes(ing) || ing.includes(it.name.toLowerCase()))));
                  return (
                    <button key={r.name} onClick={() => handleSetMeal(mealPickerDay, mealPickerSlot, r.name)} className="w-full rounded-lg border px-3 py-2 text-left text-sm hover:bg-orange-50">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{r.name}</span>
                        <div className="flex items-center gap-1">
                          {usesExpiring && <span className="text-xs text-orange-500">⚡ {t("usesExpiring")}</span>}
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
            <div className="mb-3">
              <span className="app-section-label">Weekly</span>
              <h2 className="app-section-h2">📅 {t("mealPlanner")}</h2>
            </div>
            <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📅</span>
                  <h2 className="text-lg font-bold text-white">{t("mealPlanner")}</h2>
                </div>
                <button onClick={handleAiPlanWeek} disabled={aiPlanLoading} className="glass-scan-btn px-4 py-2 text-xs disabled:opacity-50">
                  {aiPlanLoading ? <><span className="animate-spin inline-block">🤖</span> <AiBadge /> {lang === "es" ? "planificando..." : "is planning..."}</> : <span>✨ <AiBadge /> {lang === "es" ? "Planificar Mi Semana" : "Plan My Week"}</span>}
                </button>
              </div>
              <p className="text-xs text-green-200 mb-4">{t("mealDesc")}</p>
              <div className="space-y-4">
                {DAYS.map((day) => (
                  <div key={day} className="rounded-lg overflow-hidden" style={{border:"1px solid rgba(255,255,255,0.15)"}}>
                    {(() => { const DAYS_ES = {Monday:"Lunes",Tuesday:"Martes",Wednesday:"Miércoles",Thursday:"Jueves",Friday:"Viernes",Saturday:"Sábado",Sunday:"Domingo"}; return (
                    <div className="px-3 py-2 font-bold text-sm text-white" style={{background:"rgba(255,255,255,0.12)"}}>{lang === "es" ? DAYS_ES[day] : day}</div>
                    ); })()}
                    <div className="divide-y divide-white/10">
                      {MEAL_SLOTS.map((slot) => {
                        const SLOTS_ES = {Breakfast:"Desayuno",Lunch:"Almuerzo",Dinner:"Cena"};
                        const meal = meals[`${day}-${slot}`];
                        const usesExpiring = meal && itemsWithCountdown.some((it) => it.daysLeft !== null && it.daysLeft <= 7 && meal.toLowerCase().includes(it.name.toLowerCase().split(" ")[0]));
                        return (
                          <div key={slot} className="flex items-center gap-2 px-3 py-2">
                            <span className="w-16 text-xs font-medium text-green-300">{lang === "es" ? SLOTS_ES[slot] : slot}</span>
                            {meal ? (
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1">
                                    {usesExpiring && <span className="text-orange-400">⚡</span>}
                                    <span className="text-sm font-medium text-white">{meal}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <button onClick={() => handleAddMealIngredientsToShopping(meal)} className="rounded-lg px-2 py-1 text-xs font-bold text-green-300" style={{background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)"}}>{lang === "es" ? "+ Lista" : "+ List"}</button>
                                    <button onClick={() => { setMealPickerDay(day); setMealPickerSlot(slot); setShowMealPicker(true); }} className="rounded-lg px-2 py-1 text-xs font-semibold text-white/60" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)"}}>{t("changeWord")}</button>
                                    <button onClick={() => handleClearMeal(day, slot)} className="text-xs text-gray-400 hover:text-red-500">✕</button>
                                  </div>
                                </div>

                              </div>
                            ) : (
                              <button onClick={() => { setMealPickerDay(day); setMealPickerSlot(slot); setShowMealPicker(true); }} className="glass-scan-btn flex-1 py-2 text-xs">{t("addMeal")}</button>
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
            <button onClick={() => setActiveTab("more")} className="flex items-center gap-1 text-sm font-semibold mb-3 app-header-btn" style={{borderRadius:"999px",paddingLeft:"0.75rem"}}>← Back</button>
            
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
                <p className="mb-1 text-sm text-gray-500 italic">No getting fresh here — it's all about the freshness of food.</p>
                <p className="mb-3 text-sm text-gray-600">{t("chooseName")}</p>
                <div className="flex gap-2">
                  <input value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSetUsername()} placeholder={t("displayNamePlaceholder")} className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                  <button onClick={handleSetUsername} className="glass-scan-btn px-4 py-2 text-sm">{t("joinWord")}</button>
                </div>
              </Card>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">{t("signedInAs")} <span className="font-semibold text-green-700">{username}</span></p>
                  <button onClick={() => { setUsername(""); try { localStorage.removeItem(USERNAME_KEY); } catch(e) {} }} className="text-xs text-gray-400 underline">{t("changeName")}</button>
                </div>
                <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
                  {[["chat",t("chatTabLabel")],["recipes",t("recipesTabLabel")],["tips",t("tipsTabLabel")]].map(([id, label]) => (
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
                      <input value={newChat} onChange={(e) => setNewChat(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handlePostChat()} placeholder={t("typeMessage")} className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                      <button onClick={handlePostChat} className="glass-scan-btn px-4 py-2 text-sm">{t("sendWord")}</button>
                    </div>
                  </Card>
                )}
                {communityTab === "recipes" && (
                  <Card>
                    <h3 className="mb-3 font-bold">{t("recipeExch")}</h3>
                    <div className="mb-4 space-y-2">
                      <input value={newRecipeTitle} onChange={(e) => setNewRecipeTitle(e.target.value)} placeholder={t("recipeTitlePlaceholder")} className="w-full rounded border px-3 py-2 text-sm text-gray-900" />
                      <textarea value={newRecipeBody} onChange={(e) => setNewRecipeBody(e.target.value)} placeholder={t("ingredientsPlaceholder")} rows={3} className="w-full rounded border px-3 py-2 text-sm text-gray-900" />
                      <button onClick={handlePostRecipe} className="glass-scan-btn px-4 py-2 text-sm">{t("shareRecipe")}</button>
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
                      <input value={newTip} onChange={(e) => setNewTip(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handlePostTip()} placeholder={t("tipSharePlaceholder")} className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                      <button onClick={handlePostTip} className="glass-scan-btn px-4 py-2 text-sm">{t("postWord")}</button>
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

        {activeTab === "dietary" && (
          <div className="space-y-4">
            <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
              <div className="flex items-center gap-2 mb-3">
                <span style={{fontSize:"1.4rem"}}>🏠</span>
                <h2 className="text-base font-bold text-white">Household Restrictions</h2>
              </div>
              <p className="text-xs text-green-200 mb-3">Tap to toggle any restriction that applies to your whole household.</p>
              <div className="flex flex-wrap gap-2">
                {[...DIETARY_TAGS, ["halal","☪️","Halal"], ["kosher","✡️","Kosher"], ["keto","🥑","Keto"]].map(([key, icon, label]) => (
                  <button key={key} onClick={() => toggleDietary(key)} style={{background: dietaryRestrictions[key] ? "rgba(255,102,0,0.25)" : "rgba(255,255,255,0.08)", border: dietaryRestrictions[key] ? "2px solid #ff6600" : "1px solid rgba(255,255,255,0.2)", borderRadius:"999px", padding:"0.3rem 0.75rem", color: dietaryRestrictions[key] ? "#fff" : "rgba(255,255,255,0.7)", fontSize:"0.75rem", fontWeight: dietaryRestrictions[key] ? 700 : 400, cursor:"pointer", transition:"all 0.15s", display:"flex", alignItems:"center", gap:"0.3rem"}}>
                    <span>{icon}</span>{label}{dietaryRestrictions[key] && <span style={{color:"#ff6600"}}>✓</span>}
                  </button>
                ))}
              </div>
            </Card>

            {/* Family members */}
            <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
              <div className="flex items-center gap-2 mb-3">
                <span style={{fontSize:"1.4rem"}}>👨‍👩‍👧‍👦</span>
                <h2 className="text-base font-bold text-white">Family Members</h2>
              </div>
              <p className="text-xs text-green-200 mb-3">Add each person and set their individual dietary tags.</p>

              {/* Add member input */}
              <div className="flex gap-2 mb-4">
                <input
                  value={familyInput}
                  onChange={(e) => setFamilyInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addFamilyMember()}
                  placeholder="Name (e.g. Emma, Dad)"
                  className="flex-1 rounded-xl px-3 py-2 text-sm text-gray-900"
                  style={{background:"rgba(255,255,255,0.92)"}}
                />
                <button onClick={addFamilyMember} className="glass-scan-btn px-4 py-2 text-sm" style={{flexDirection:"row",gap:"0.3rem",whiteSpace:"nowrap"}}>+ Add</button>
              </div>

              {familyMembers.length === 0 ? (
                <p className="text-xs text-green-300 opacity-60 text-center py-3">No family members added yet. Add one above.</p>
              ) : (
                <div className="space-y-3">
                  {familyMembers.map((member, i) => {
                    const isExpanded = expandedMember === i;
                    const isEditing = editingMember === i;
                    const activeTags = DIETARY_TAGS.filter(([key]) => (member.restrictions||{})[key]);
                    return (
                      <div key={i} className="rounded-xl overflow-hidden" style={{border:"1px solid rgba(255,255,255,0.18)"}}>
                        {/* Member row */}
                        <div className="flex items-center justify-between px-3 py-2" style={{background:"rgba(255,255,255,0.1)"}}>
                          <div className="flex items-center gap-2 flex-1">
                            <span style={{fontSize:"1.1rem"}}>👤</span>
                            {isEditing ? (
                              <div className="flex gap-2 flex-1">
                                <input
                                  value={editMemberName}
                                  onChange={(e) => setEditMemberName(e.target.value)}
                                  onKeyDown={(e) => e.key === "Enter" && saveMemberName(i)}
                                  autoFocus
                                  className="flex-1 rounded px-2 py-1 text-sm text-gray-900"
                                  style={{background:"rgba(255,255,255,0.92)",minWidth:0}}
                                />
                                <button onClick={() => saveMemberName(i)} className="text-xs font-bold text-green-300" style={{background:"none",border:"none",cursor:"pointer"}}>Save</button>
                                <button onClick={() => setEditingMember(null)} className="text-xs text-gray-400" style={{background:"none",border:"none",cursor:"pointer"}}>Cancel</button>
                              </div>
                            ) : (
                              <span className="text-sm font-semibold text-white">{member.name}</span>
                            )}
                          </div>
                          {!isEditing && (
                            <div className="flex items-center gap-2">
                              <button onClick={() => { setEditingMember(i); setEditMemberName(member.name); }} className="text-xs text-green-300" style={{background:"none",border:"none",cursor:"pointer"}}>✏️ Edit</button>
                              <button onClick={() => setExpandedMember(isExpanded ? null : i)} className="text-xs text-white font-bold" style={{background:"none",border:"none",cursor:"pointer"}}>{isExpanded ? "▲" : "▼"}</button>
                              <button onClick={() => removeFamilyMember(i)} className="text-xs text-red-400" style={{background:"none",border:"none",cursor:"pointer"}}>✕</button>
                            </div>
                          )}
                        </div>

                        {/* Active tag summary (collapsed) */}
                        {!isExpanded && activeTags.length > 0 && (
                          <div className="flex flex-wrap gap-1 px-3 py-2">
                            {activeTags.map(([,icon,label]) => (
                              <span key={label} className="text-xs rounded-full px-2 py-0.5" style={{background:"rgba(255,102,0,0.2)",border:"1px solid rgba(255,102,0,0.4)",color:"#fed7aa"}}>{icon} {label}</span>
                            ))}
                          </div>
                        )}

                        {/* Expanded tag editor */}
                        {isExpanded && (
                          <div className="px-3 py-3" style={{background:"rgba(0,0,0,0.15)"}}>
                            <p className="text-xs text-green-300 mb-2 font-semibold">Tap to assign tags for {member.name}:</p>
                            <div className="flex flex-wrap gap-2">
                              {DIETARY_TAGS.map(([key, icon, label]) => {
                                const on = (member.restrictions||{})[key];
                                return (
                                  <button key={key} onClick={() => toggleMemberTag(i, key)} style={{background: on ? "rgba(255,102,0,0.25)" : "rgba(255,255,255,0.07)", border: on ? "2px solid #ff6600" : "1px solid rgba(255,255,255,0.2)", borderRadius:"999px", padding:"0.25rem 0.65rem", color: on ? "#fff" : "rgba(255,255,255,0.7)", fontSize:"0.72rem", fontWeight: on ? 700 : 400, cursor:"pointer", transition:"all 0.15s", display:"flex", alignItems:"center", gap:"0.25rem"}}>
                                    {icon} {label}{on && <span style={{color:"#ff6600"}}>✓</span>}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>

            {/* Coming soon */}
            <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
              <div className="flex items-center gap-2 mb-2">
                <span style={{fontSize:"1.4rem"}}>💡</span>
                <h2 className="text-base font-bold text-white">Coming Soon</h2>
              </div>
              <div className="space-y-2">
                {["Recipe suggestions filtered by household restrictions","Shopping list items flagged for allergens","Meal planner that respects every family member's needs"].map((item) => (
                  <div key={item} className="flex gap-2 items-start">
                    <span className="text-orange-400 font-bold text-xs mt-0.5">→</span>
                    <p className="text-xs text-green-100">{item}</p>
                  </div>
                ))}
              </div>
            </Card>

          </div>
        )}

        {activeTab === "partners" && (
          <div className="space-y-4">

            {/* Header */}
            <div className="flex items-center gap-3 mb-1">
              <button onClick={() => setActiveTab("more")} className="app-header-btn">← Back</button>
              <div>
                <span className="app-section-label">Business</span>
                <h2 className="app-section-h2" style={{marginBottom:0}}>🤝 Partners</h2>
              </div>
            </div>

            {/* Hero tagline */}
            <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)",textAlign:"center",padding:"1.75rem 1.25rem"}}>
              <div style={{fontSize:"2.5rem",marginBottom:"0.5rem"}}>🌍</div>
              <h2 className="text-xl font-extrabold text-white mb-2">The TrackFresh.AI Ecosystem</h2>
              <p className="text-sm text-green-200 leading-relaxed">TrackFresh connects home cooks, grocery retailers, food brands, and sustainability partners — building a smarter, less wasteful food system together.</p>
              <p className="text-sm text-white font-semibold mt-3">One platform. One goal: waste less, eat better.</p>
              <div className="grid grid-cols-4 gap-2 mt-4">
                {[["🛒","Shoppers"],["🏪","Supermarkets"],["🏭","Brands"],["🌱","Composting"]].map(([icon, label]) => (
                  <div key={label} className="rounded-xl py-2 px-1 text-center" style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)"}}>
                    <div style={{fontSize:"1.4rem"}}>{icon}</div>
                    <div style={{fontSize:"0.6rem",fontWeight:700,color:"#86efac",marginTop:"0.2rem"}}>{label}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Supermarkets */}
            <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
              <div className="flex items-center gap-2 mb-2">
                <span style={{fontSize:"1.75rem"}}>🏪</span>
                <h2 className="text-lg font-bold text-white">Supermarkets</h2>
              </div>
              <p className="text-xs text-green-200 mb-3">Build lasting loyalty by meeting your customers where they already manage their food.</p>
              <div className="space-y-2 mb-4">
                {[
                  ["📍","Be listed in the TrackFresh store directory — drive traffic directly to your store"],
                  ["🔁","Loyalty program integration — deliver promotions through your existing loyalty infrastructure"],
                  ["📊","Access aggregate food waste trends from your region — no personal data shared"],
                  ["🎯","Reach eco-conscious shoppers who are actively reducing waste and buying fresh"],
                ].map(([icon, text]) => (
                  <div key={text} className="flex gap-2 items-start rounded-xl px-3 py-2" style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)"}}>
                    <span style={{fontSize:"1rem",flexShrink:0}}>{icon}</span>
                    <p className="text-xs text-green-100 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
              <a href="#" className="glass-scan-btn text-sm py-3" style={{textDecoration:"none",display:"flex",justifyContent:"center"}}>🤝 Partner with us →</a>
            </Card>

            {/* Food Manufacturers */}
            <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
              <div className="flex items-center gap-2 mb-2">
                <span style={{fontSize:"1.75rem"}}>🏭</span>
                <h2 className="text-lg font-bold text-white">Food Manufacturers</h2>
              </div>
              <p className="text-xs text-green-200 mb-3">Put your brand in front of millions of meal planners — without ever touching their personal data.</p>
              <div className="space-y-2 mb-3">
                {[
                  ["🍽️","Sponsored brand placements in the TrackFresh Meal Planner — your products appear naturally in weekly recipe suggestions"],
                  ["🔒","Privacy-first: promotions are delivered through supermarket loyalty systems — you never receive customer data"],
                  ["✅","Customers opt in to brand promotions through their supermarket loyalty account"],
                  ["📈","Measure impact through coupon redemptions and loyalty program data — tracked back to TrackFresh placements"],
                ].map(([icon, text]) => (
                  <div key={text} className="flex gap-2 items-start rounded-xl px-3 py-2" style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)"}}>
                    <span style={{fontSize:"1rem",flexShrink:0}}>{icon}</span>
                    <p className="text-xs text-green-100 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl px-3 py-2 mb-4" style={{background:"rgba(255,102,0,0.12)",border:"1px solid rgba(255,102,0,0.35)"}}>
                <p className="text-xs text-orange-200 font-semibold">Example: Kraft sponsors a "Mac & Cheese Night" meal slot. The suggestion appears in the user's weekly plan. A coupon is delivered through their supermarket loyalty app. Kraft sees redemptions — not names.</p>
              </div>
              <a href="#" className="glass-scan-btn text-sm py-3" style={{textDecoration:"none",display:"flex",justifyContent:"center"}}>📩 Learn about placements →</a>
            </Card>

            {/* Composting Partners */}
            <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
              <div className="flex items-center gap-2 mb-2">
                <span style={{fontSize:"1.75rem"}}>🌱</span>
                <h2 className="text-lg font-bold text-white">Composting Partners</h2>
              </div>
              <p className="text-xs text-green-200 mb-3">Reach the most motivated composting audience on the internet — people already reducing food waste.</p>
              <div className="space-y-2 mb-3">
                {[
                  ["🏷️","Offer a TrackFresh-exclusive coupon code — e.g. 10% off your product — trackable back to our platform"],
                  ["📖","Get featured in the TrackFresh Composting guide alongside educational content"],
                  ["📊","Every coupon redemption is tracked back to TrackFresh — you know exactly what drives your sales"],
                  ["🌿","Align your brand with a sustainability platform trusted by eco-conscious households"],
                ].map(([icon, text]) => (
                  <div key={text} className="flex gap-2 items-start rounded-xl px-3 py-2" style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)"}}>
                    <span style={{fontSize:"1rem",flexShrink:0}}>{icon}</span>
                    <p className="text-xs text-green-100 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl px-3 py-2 mb-4" style={{background:"rgba(255,102,0,0.12)",border:"1px solid rgba(255,102,0,0.35)"}}>
                <p className="text-xs text-orange-200 font-semibold">Example: A bokashi vendor offers code TRACKFRESH10 for 10% off. It appears in our Composting guide. Every redemption is reported back — you see real ROI from TrackFresh.</p>
              </div>
              <a href="#" className="glass-scan-btn text-sm py-3" style={{textDecoration:"none",display:"flex",justifyContent:"center"}}>🌱 Offer a coupon →</a>
            </Card>

            {/* Privacy Principle */}
            <Card style={{background:"linear-gradient(160deg,#1a0a00 0%,#2d1200 100%)",border:"2px solid rgba(255,102,0,0.5)"}}>
              <div className="flex items-center gap-2 mb-2">
                <span style={{fontSize:"1.5rem"}}>🔒</span>
                <h2 className="text-base font-bold text-orange-300">Customer Data Stays Private. Always.</h2>
              </div>
              <p className="text-xs text-orange-100 leading-relaxed mb-3">TrackFresh never sells or shares individual customer data with brand partners or manufacturers. All promotions flow through supermarket loyalty systems or anonymized in-app placements.</p>
              <div className="space-y-2">
                {[
                  "Manufacturers see redemption counts — not customer names or contact details",
                  "Composting partners receive coupon usage stats — not who redeemed them",
                  "Supermarkets manage their own customer relationships — TrackFresh supports but does not own that data",
                ].map((point) => (
                  <div key={point} className="flex gap-2 items-start">
                    <span className="text-orange-400 font-bold text-xs mt-0.5">✓</span>
                    <p className="text-xs text-orange-100">{point}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Contact CTA */}
            <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)",textAlign:"center",padding:"1.75rem 1.25rem"}}>
              <div style={{fontSize:"2rem",marginBottom:"0.5rem"}}>📬</div>
              <h2 className="text-lg font-bold text-white mb-2">Interested in Partnering?</h2>
              <p className="text-sm text-green-200 mb-4">Whether you're a supermarket, food brand, or composting company — we'd love to hear from you.</p>
              <a href="mailto:hello@trackfresh.ai" className="glass-scan-btn text-sm py-3 mb-2" style={{textDecoration:"none",display:"flex",justifyContent:"center"}}>✉️ hello@trackfresh.ai</a>
              <a href="#" className="glass-scan-btn text-sm py-3" style={{textDecoration:"none",display:"flex",justifyContent:"center",opacity:0.75}}>📋 Download Partner Deck →</a>
            </Card>
          </div>
        )}
                    
        {activeTab === "stores-page" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-1">
              <button onClick={() => setActiveTab("more")} className="app-header-btn">← Back</button>
              <div>
                <span className="app-section-label">Online</span>
                <h2 className="app-section-h2" style={{marginBottom:0}}>🏪 {t("shopOnline")}</h2>
              </div>
            </div>

            <div
              className="rounded-2xl p-5 card-3d"
              style={{
                background: "linear-gradient(160deg,#064e3b 0%,#065f46 55%,#047857 100%)",
                border: "1.5px solid rgba(183,214,58,0.3)"
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🏪</span>
                <h2 className="text-lg font-bold text-white">{t("shopOnline")}</h2>
              </div>
              <p className="text-sm text-green-100 mb-4">{t("shopOnlineDesc")}</p>

              <div className="grid grid-cols-2 gap-3">
                <a href="https://www.amazon.com/alm/storefront?almBrandId=QW1hem9uIEZyZXNo" target="_blank" rel="noopener noreferrer" className="btn-green-3d rounded-2xl px-3 py-4 flex flex-col items-center justify-center gap-2 text-center">
                  <img src="https://logo.clearbit.com/amazon.com" alt="Amazon Fresh" className="h-8 w-8 rounded-md bg-white p-1" />
                  <span className="text-sm font-bold text-white">Amazon Fresh</span>
                  <span className="text-xs text-white font-semibold">{t("shopNow")}</span>
                </a>

                <a href="https://www.kroger.com" target="_blank" rel="noopener noreferrer" className="btn-green-3d rounded-2xl px-3 py-4 flex flex-col items-center justify-center gap-2 text-center">
                  <img src="https://logo.clearbit.com/kroger.com" alt="Kroger" className="h-8 w-8 rounded-md bg-white p-1" />
                  <span className="text-sm font-bold text-white">Kroger</span>
                  <span className="text-xs text-white font-semibold">{t("shopNow")}</span>
                </a>

                <a href="https://www.walmart.com/cp/food/976759" target="_blank" rel="noopener noreferrer" className="btn-green-3d rounded-2xl px-3 py-4 flex flex-col items-center justify-center gap-2 text-center">
                  <img src="https://logo.clearbit.com/walmart.com" alt="Walmart" className="h-8 w-8 rounded-md bg-white p-1" />
                  <span className="text-sm font-bold text-white">Walmart</span>
                  <span className="text-xs text-white font-semibold">{t("shopNow")}</span>
                </a>

                <a href="https://www.wholefoodsmarket.com" target="_blank" rel="noopener noreferrer" className="btn-green-3d rounded-2xl px-3 py-4 flex flex-col items-center justify-center gap-2 text-center">
                  <img src="https://logo.clearbit.com/wholefoodsmarket.com" alt="Whole Foods" className="h-8 w-8 rounded-md bg-white p-1" />
                  <span className="text-sm font-bold text-white">Whole Foods</span>
                  <span className="text-xs text-white font-semibold">{t("shopNow")}</span>
                </a>

                <a href="https://www.target.com/c/grocery/-/N-5xt1a" target="_blank" rel="noopener noreferrer" className="btn-green-3d rounded-2xl px-3 py-4 flex flex-col items-center justify-center gap-2 text-center">
                  <img src="https://logo.clearbit.com/target.com" alt="Target" className="h-8 w-8 rounded-md bg-white p-1" />
                  <span className="text-sm font-bold text-white">Target</span>
                  <span className="text-xs text-white font-semibold">{t("shopNow")}</span>
                </a>

                <a href="https://www.costco.com/grocery-household.html" target="_blank" rel="noopener noreferrer" className="btn-green-3d rounded-2xl px-3 py-4 flex flex-col items-center justify-center gap-2 text-center">
                  <img src="https://logo.clearbit.com/costco.com" alt="Costco" className="h-8 w-8 rounded-md bg-white p-1" />
                  <span className="text-sm font-bold text-white">Costco</span>
                  <span className="text-xs text-white font-semibold">{t("shopNow")}</span>
                </a>

                <a href="https://www.traderjoes.com" target="_blank" rel="noopener noreferrer" className="btn-green-3d rounded-2xl px-3 py-4 flex flex-col items-center justify-center gap-2 text-center">
                  <img src="https://logo.clearbit.com/traderjoes.com" alt="Trader Joe's" className="h-8 w-8 rounded-md bg-white p-1" />
                  <span className="text-sm font-bold text-white">Trader Joe&apos;s</span>
                  <span className="text-xs text-white font-semibold">{t("shopNow")}</span>
                </a>
              </div>
            </div>
          </div>
        )}          

        {activeTab === "composting" && (
          <>
            <div className="mb-3">
              <span className="app-section-label">{lang === "es" ? "Sostenibilidad" : "Sustainability"}</span>
              <h2 className="app-section-h2">🌱 {lang === "es" ? "Compostaje" : "Composting"}</h2>
            </div>
            <p className="text-sm text-green-200 mb-4">{lang === "es" ? "Ya sea en interior o exterior, descompone y compostea los restos de comida fácilmente." : "Whether indoors or outdoors, quickly compost or break down leftover food."}</p>

            {/* Card 1: Indoor Composting */}
            <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)",marginBottom:"1rem"}}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🏠</span>
                <h2 className="text-lg font-bold text-white">{lang === "es" ? "Compostaje Interior" : "Indoor Composting"}</h2>
              </div>
              <p className="text-xs text-green-200 mb-4">{lang === "es" ? "Opciones compactas perfectas para apartamentos y espacios pequeños." : "Compact options perfect for apartments and small spaces."}</p>
              <div className="space-y-3">
                {/* Electric Indoor Food Recycler expandable */}
                <div>
                  <button onClick={() => toggleComp("electric-recycler")} className="glass-scan-btn w-full flex-row justify-between px-4 py-3 text-sm font-bold" style={{flexDirection:"row"}}>
                    <span>⚡ {lang === "es" ? "Reciclador Eléctrico" : "Electric Food Recycler"}</span>
                    <span>{compExpanded["electric-recycler"] ? "▲" : "▼"}</span>
                  </button>
                  {compExpanded["electric-recycler"] && (
                    <div className="mt-2 rounded-xl px-4 py-3 text-sm text-green-100" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)"}}>
                      <p className="mb-2 font-semibold text-white">{lang === "es" ? "¿Qué es?" : "What is it?"}</p>
                      <p className="text-xs leading-relaxed">{lang === "es" ? "Los recicladores eléctricos de alimentos deshidratan, trituran y reducen los restos de comida hasta un 90% de su volumen original. El resultado es un polvo seco que puedes añadir al jardín o al cubo de residuos sin malos olores. Sin lombrices, sin fermentación, sin espera." : "Electric food recyclers use heat and grinding to dehydrate and break down food scraps, reducing volume by up to 90%. The result is a dry, odour-free powder you can add to your garden or bin. No worms, no fermentation, no waiting."}</p>
                      <ul className="mt-2 space-y-1 text-xs opacity-80">
                        <li>✅ {lang === "es" ? "Listo en 4–8 horas" : "Done in 4–8 hours"}</li>
                        <li>✅ {lang === "es" ? "Acepta carne, lácteos y cocidos" : "Accepts meat, dairy & cooked food"}</li>
                        <li>✅ {lang === "es" ? "Sin olores, apto para apartamentos" : "Odour-free — perfect for apartments"}</li>
                        <li>✅ {lang === "es" ? "Reduce el volumen hasta un 90%" : "Reduces volume by up to 90%"}</li>
                        <li>⚠️ {lang === "es" ? "Consume electricidad" : "Uses electricity"}</li>
                        <li>⚠️ {lang === "es" ? "Mayor inversión inicial" : "Higher upfront investment"}</li>
                      </ul>
                      <p className="mt-3 text-xs font-semibold text-green-200">{lang === "es" ? "Marcas populares:" : "Popular brands:"} <span className="font-normal opacity-80">Lomi, Mill, Reencle, Vitamix FoodCycler</span></p>
                      <div className="mt-2 rounded-lg px-3 py-2 text-center" style={{background:"rgba(251,146,60,0.12)",border:"1px dashed rgba(251,146,60,0.4)"}}>
                        <span style={{fontSize:"0.65rem",fontWeight:800,letterSpacing:"0.06em",color:"#fb923c"}}>🛒 {lang === "es" ? "Tienda — Próximamente" : "Shop — Coming Soon"}</span>
                      </div>
                    </div>
                  )}
                </div>
                {/* Bokashi expandable */}
                <div>
                  <button onClick={() => toggleComp("indoor-bokashi")} className="glass-scan-btn w-full flex-row justify-between px-4 py-3 text-sm font-bold" style={{flexDirection:"row"}}>
                    <span>🫙 {lang === "es" ? "Sistema Bokashi" : "Bokashi System"}</span>
                    <span>{compExpanded["indoor-bokashi"] ? "▲" : "▼"}</span>
                  </button>
                  {compExpanded["indoor-bokashi"] && (
                    <div className="mt-2 rounded-xl px-4 py-3 text-sm text-green-100" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)"}}>
                      <p className="mb-2 font-semibold text-white">{lang === "es" ? "¿Qué es?" : "What is it?"}</p>
                      <p className="text-xs leading-relaxed">{lang === "es" ? "El sistema Bokashi fermenta los restos de comida usando microorganismos efectivos (EM). Funciona dentro de un cubo sellado, sin malos olores. Puede compostar carne, lácteos y sobras cocidas — cosas que los compostadores tradicionales no admiten." : "Bokashi ferments food scraps using effective microorganisms (EM). Works inside a sealed bucket with no bad smells. Can handle meat, dairy, and cooked leftovers — things traditional composters can't."}</p>
                      <ul className="mt-2 space-y-1 text-xs opacity-80">
                        <li>✅ {lang === "es" ? "Acepta todos los alimentos" : "Accepts all food types"}</li>
                        <li>✅ {lang === "es" ? "Listo en 2–4 semanas" : "Ready in 2–4 weeks"}</li>
                        <li>✅ {lang === "es" ? "Sin malos olores" : "No bad smells"}</li>
                        <li>✅ {lang === "es" ? "Cabe bajo el fregadero" : "Fits under the sink"}</li>
                      </ul>
                    </div>
                  )}
                </div>
                {/* Worm bin expandable */}
                <div>
                  <button onClick={() => toggleComp("indoor-worm")} className="glass-scan-btn w-full flex-row justify-between px-4 py-3 text-sm font-bold" style={{flexDirection:"row"}}>
                    <span>🪱 {lang === "es" ? "Vermicompostaje" : "Worm Bin (Vermicomposting)"}</span>
                    <span>{compExpanded["indoor-worm"] ? "▲" : "▼"}</span>
                  </button>
                  {compExpanded["indoor-worm"] && (
                    <div className="mt-2 rounded-xl px-4 py-3 text-sm text-green-100" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)"}}>
                      <p className="mb-2 font-semibold text-white">{lang === "es" ? "¿Qué es?" : "What is it?"}</p>
                      <p className="text-xs leading-relaxed">{lang === "es" ? "Las lombrices rojas descomponen los restos de comida en un humus rico para las plantas. Solo necesita vegetales, frutas y papel. Las lombrices trabajan silenciosamente y sin malos olores." : "Red wiggler worms break down food scraps into rich castings for plants. Just needs veggies, fruits, and paper. Worms work quietly with no odor when maintained properly."}</p>
                      <ul className="mt-2 space-y-1 text-xs opacity-80">
                        <li>✅ {lang === "es" ? "Produce humus excelente" : "Produces excellent castings"}</li>
                        <li>✅ {lang === "es" ? "Sin electricidad" : "No electricity needed"}</li>
                        <li>✅ {lang === "es" ? "Los niños lo adoran" : "Kids love it"}</li>
                        <li>⚠️ {lang === "es" ? "No acepta carne ni lácteos" : "Avoid meat and dairy"}</li>
                      </ul>
                    </div>
                  )}
                </div>
                <div className="flex justify-center mt-3">
                  <button onClick={() => setActiveTab("partners")} className="glass-scan-btn text-sm py-2 px-8 text-center">🛒 {lang === "es" ? "Tienda" : "Shop"}</button>
                </div>
              </div>
            </Card>

            {/* Card 2: Outdoor Composting */}
            <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)",marginBottom:"1rem"}}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🌿</span>
                <h2 className="text-lg font-bold text-white">{lang === "es" ? "Compostaje Exterior" : "Outdoor Composting"}</h2>
              </div>
              <p className="text-xs text-green-200 mb-4">{lang === "es" ? "Métodos para patios, jardines y espacios al aire libre." : "Methods for yards, gardens, and outdoor spaces."}</p>
              <div className="space-y-3">
                {/* Traditional bin expandable */}
                <div>
                  <button onClick={() => toggleComp("outdoor-bin")} className="glass-scan-btn w-full flex-row justify-between px-4 py-3 text-sm font-bold" style={{flexDirection:"row"}}>
                    <span>🗑️ {lang === "es" ? "Cubo de Compost Tradicional" : "Traditional Compost Bin"}</span>
                    <span>{compExpanded["outdoor-bin"] ? "▲" : "▼"}</span>
                  </button>
                  {compExpanded["outdoor-bin"] && (
                    <div className="mt-2 rounded-xl px-4 py-3 text-sm text-green-100" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)"}}>
                      <p className="mb-2 font-semibold text-white">{lang === "es" ? "¿Qué es?" : "What is it?"}</p>
                      <p className="text-xs leading-relaxed">{lang === "es" ? "Alterna capas de materiales verdes (restos de comida, hierba) y marrones (hojas, cartón). El compostaje tradicional es económico y produce un abono excelente en 2–6 meses." : "Alternate layers of green materials (food scraps, grass) and brown materials (leaves, cardboard). Traditional composting is inexpensive and produces excellent compost in 2–6 months."}</p>
                      <ul className="mt-2 space-y-1 text-xs opacity-80">
                        <li>✅ {lang === "es" ? "Muy económico" : "Very low cost"}</li>
                        <li>✅ {lang === "es" ? "Gran capacidad" : "High capacity"}</li>
                        <li>⚠️ {lang === "es" ? "Requiere voltear" : "Requires turning"}</li>
                        <li>⚠️ {lang === "es" ? "2–6 meses" : "2–6 months to finish"}</li>
                      </ul>
                    </div>
                  )}
                </div>
                {/* Tumbler expandable */}
                <div>
                  <button onClick={() => toggleComp("outdoor-tumbler")} className="glass-scan-btn w-full flex-row justify-between px-4 py-3 text-sm font-bold" style={{flexDirection:"row"}}>
                    <span>⚙️ {lang === "es" ? "Compostador Rotatorio" : "Tumbler Composter"}</span>
                    <span>{compExpanded["outdoor-tumbler"] ? "▲" : "▼"}</span>
                  </button>
                  {compExpanded["outdoor-tumbler"] && (
                    <div className="mt-2 rounded-xl px-4 py-3 text-sm text-green-100" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)"}}>
                      <p className="mb-2 font-semibold text-white">{lang === "es" ? "¿Qué es?" : "What is it?"}</p>
                      <p className="text-xs leading-relaxed">{lang === "es" ? "Un tambor cerrado que giras para mezclar el compost. La descomposición es mucho más rápida — a veces en 2–4 semanas — y está protegido de animales e insectos." : "A sealed drum you rotate to mix compost. Decomposition is much faster — sometimes 2–4 weeks — and it's protected from animals and pests."}</p>
                      <ul className="mt-2 space-y-1 text-xs opacity-80">
                        <li>✅ {lang === "es" ? "Listo en 2–4 semanas" : "Ready in 2–4 weeks"}</li>
                        <li>✅ {lang === "es" ? "Protegido de animales" : "Pest and animal resistant"}</li>
                        <li>✅ {lang === "es" ? "Sin voltear manualmente" : "Easy turning"}</li>
                        <li>⚠️ {lang === "es" ? "Mayor coste inicial" : "Higher upfront cost"}</li>
                      </ul>
                    </div>
                  )}
                </div>
                <div className="flex justify-center mt-3">
                  <button onClick={() => setActiveTab("partners")} className="glass-scan-btn text-sm py-2 px-8 text-center">🛒 {lang === "es" ? "Tienda" : "Shop"}</button>
                </div>
              </div>
            </Card>

            {/* Card 3: Which is right for you? */}
            <Card style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 45%,#047857 100%)"}}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">❓</span>
                <h2 className="text-lg font-bold text-white">{lang === "es" ? "¿Cuál es la mejor opción para ti?" : "Which option is right for you?"}</h2>
              </div>
              <div className="space-y-3">
                <div className="rounded-xl px-4 py-3" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)"}}>
                  <p className="text-xs font-bold text-orange-300 mb-1">📐 {lang === "es" ? "Espacio" : "Space"}</p>
                  <p className="text-xs text-green-100">{lang === "es" ? "¿Tienes patio o jardín? → Rotatorio o Tradicional. ¿Solo interior? → Bokashi o Lombrices." : "Have a yard or garden? → Tumbler or Traditional. Indoors only? → Bokashi or Worm Bin."}</p>
                </div>
                <div className="rounded-xl px-4 py-3" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)"}}>
                  <p className="text-xs font-bold text-orange-300 mb-1">⚡ {lang === "es" ? "Velocidad" : "Speed"}</p>
                  <p className="text-xs text-green-100">{lang === "es" ? "¿Quieres resultados rápidos? → Reciclador Eléctrico (4–8 h) o Bokashi (2–4 sem). ¿No tienes prisa? → Cubo Tradicional o Lombrices." : "Want fast results? → Electric Recycler (4–8 hrs) or Bokashi (2–4 wks). No rush? → Traditional Bin or Worm Bin."}</p>
                </div>
                <div className="rounded-xl px-4 py-3" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)"}}>
                  <p className="text-xs font-bold text-orange-300 mb-1">💰 {lang === "es" ? "Presupuesto" : "Budget"}</p>
                  <p className="text-xs text-green-100">{lang === "es" ? "Bajo coste: Cubo Tradicional o Lombrices. Inversión media: Bokashi. Mayor inversión: Rotatorio o Reciclador Eléctrico." : "Low cost: Traditional Bin or Worm Bin. Mid-range: Bokashi Kit. Higher investment: Tumbler or Electric Recycler."}</p>
                </div>
              </div>
            </Card>
          </>
        )}

      </div>
    </div>

        {showExpiryVoice && (
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:10500,display:"flex",alignItems:"flex-end",justifyContent:"center",padding:"1rem"}}>
            <div style={{background:"white",borderRadius:"20px 20px 16px 16px",width:"100%",maxWidth:"440px",boxShadow:"0 -4px 32px rgba(0,0,0,0.25)",display:"flex",flexDirection:"column",maxHeight:"62vh",overflow:"hidden"}}>
              {/* Sticky header */}
              <div style={{flexShrink:0,padding:"1rem 1.25rem 0.75rem",borderBottom:"1px solid #f3f4f6"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                    <span style={{fontSize:"1.4rem"}}>{expiryVoiceStatus === "listening" ? "🔴" : expiryVoiceStatus === "done" ? "✅" : "🎙️"}</span>
                    <div>
                      <p style={{fontWeight:900,fontSize:"0.95rem",color:"#064e3b"}}>Expiry Date Assistant</p>
                      <p style={{fontSize:"0.72rem",color:"#6b7280",marginTop:"0.1rem"}}>
                        {expiryVoiceStatus === "speaking" && "Speaking…"}
                        {expiryVoiceStatus === "listening" && "🔴 Listening — say product name + date"}
                        {expiryVoiceStatus === "done" && "All done!"}
                      </p>
                    </div>
                  </div>
                  <button onClick={stopExpiryVoiceFlow} style={{background:"#f3f4f6",border:"none",borderRadius:"50%",width:"32px",height:"32px",fontSize:"1.1rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>&times;</button>
                </div>
              </div>

              {/* Scrollable middle — instructions + item list */}
              <div style={{flex:"1 1 auto",overflowY:"auto",padding:"0.75rem 1.25rem"}}>
                {expiryVoiceStatus === "listening" && (
                  <div style={{background:"#f5fad0",border:"2px solid #D4E87A",borderRadius:"12px",padding:"0.65rem",marginBottom:"0.6rem"}}>
                    <p style={{fontSize:"0.8rem",fontWeight:700,color:"#5a6e0a",marginBottom:"0.3rem",textAlign:"center"}}>
                      Say: <span style={{background:"#064e3b",color:"white",borderRadius:"6px",padding:"0.1rem 0.45rem",fontFamily:"monospace",fontSize:"0.78rem"}}>product name</span>
                      {" + "}
                      <span style={{background:"#B7D63A",color:"#000",borderRadius:"6px",padding:"0.1rem 0.45rem",fontFamily:"monospace",fontSize:"0.78rem"}}>month day year</span>
                    </p>
                    <p style={{fontSize:"0.72rem",color:"#5a6e0a",textAlign:"center",marginBottom:"0.3rem"}}>
                      e.g. <em>"Milk, <strong>March 20 2026</strong>"</em> &nbsp;·&nbsp; <em>"Chicken <strong>Apr 5</strong>"</em>
                    </p>
                    <p style={{fontSize:"0.65rem",color:"#6b7280",textAlign:"center"}}>Say <strong>"no"</strong>, <strong>"skip"</strong>, or <strong>"done"</strong> to exit</p>
                  </div>
                )}

                {(() => {
                  const loggedNames = new Set(expiryVoiceLog.map(e => e.name));
                  const remaining = expiryVoiceItems.filter(it => !loggedNames.has(it.name));
                  return (
                    <>
                      {expiryVoiceLog.length > 0 && (
                        <div style={{marginBottom:"0.5rem"}}>
                          {expiryVoiceLog.map((entry, i) => (
                            <div key={i} style={{display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.35rem 0.6rem",borderRadius:"8px",background:"#f0fdf4",border:"1px solid #86efac",marginBottom:"0.25rem"}}>
                              <span style={{color:"#16a34a",fontWeight:900,fontSize:"0.85rem"}}>✓</span>
                              <span style={{flex:1,fontSize:"0.8rem",fontWeight:600,color:"#064e3b"}}>{entry.name}</span>
                              <span style={{fontSize:"0.75rem",color:"#6b7280"}}>{entry.dateStr}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {remaining.length > 0 && expiryVoiceStatus !== "done" && (
                        <div>
                          <p style={{fontSize:"0.68rem",fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:"0.35rem"}}>Still needed ({remaining.length}):</p>
                          <div style={{display:"flex",flexWrap:"wrap",gap:"0.3rem"}}>
                            {remaining.map((it, i) => (
                              <span key={i} style={{background:"#f3f4f6",border:"1px solid #e5e7eb",borderRadius:"999px",padding:"0.2rem 0.6rem",fontSize:"0.72rem",fontWeight:600,color:"#374151"}}>{it.name}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>

              {/* Sticky footer — always visible */}
              <div style={{flexShrink:0,padding:"0.75rem 1.25rem 1rem",borderTop:"1px solid #f3f4f6"}}>
                <button onClick={stopExpiryVoiceFlow} style={{width:"100%",background:"linear-gradient(to bottom,#059669,#047857)",color:"white",border:"none",borderRadius:"12px",padding:"0.75rem",fontSize:"0.875rem",fontWeight:800,cursor:"pointer",boxShadow:"0 3px 0 #065f46"}}>
                  ✅ Done — Skip Remaining
                </button>
              </div>
            </div>
          </div>
        )}

        {showOpenedModal && (() => {
          const today = new Date().toISOString().split("T")[0];
          const allItems = itemsWithCountdown;
          const recentItems = [...allItems].slice(0, 5);
          const fridgeItems = allItems.filter(it => (it.location ?? "Fridge") === "Fridge");
          const freezerItems = allItems.filter(it => it.location === "Freezer");
          const pantryItems = allItems.filter(it => it.location === "Pantry");
          const searchResults = openedSearch.trim() ? fuzzyMatchItems(openedSearch, allItems) : [];

          const ItemRow = ({ item }) => (
            <button onClick={() => handleMarkOpened(item, today)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.18)",borderRadius:"10px",padding:"0.6rem 0.75rem",marginBottom:"0.35rem",cursor:"pointer",textAlign:"left"}}>
              <div>
                <div style={{fontWeight:700,color:"#fff",fontSize:"0.875rem"}}>{item.name}</div>
                <div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.75)",marginTop:"0.1rem"}}>{item.location ?? "Fridge"}{item.useByDate ? " · " + (lang==="es"?"Vence":"Exp") + " " + item.useByDate : ""}</div>
              </div>
              {item.openDate && <span style={{fontSize:"0.65rem",background:"rgba(183,214,58,0.25)",color:"#B7D63A",border:"1px solid rgba(183,214,58,0.4)",borderRadius:"999px",padding:"0.1rem 0.45rem",fontWeight:700,whiteSpace:"nowrap"}}>📂 {lang==="es"?"Abierto":"Opened"}</span>}
            </button>
          );

          const GroupSection = ({ label, items }) => items.length === 0 ? null : (
            <div style={{marginBottom:"0.875rem"}}>
              <p style={{fontSize:"0.63rem",fontWeight:700,color:"rgba(255,255,255,0.75)",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"0.4rem"}}>{label}</p>
              {items.map(it => <ItemRow key={it.id} item={it} />)}
            </div>
          );

          return (
            <div style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,0.65)",backdropFilter:"blur(4px)",display:"flex",flexDirection:"column",justifyContent:"flex-end",paddingBottom:openedModalOffset,transition:"padding-bottom 0.2s ease"}}>
              <div style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 60%,#047857 100%)",borderRadius:"20px 20px 0 0",padding:"1.25rem 1.25rem calc(env(safe-area-inset-bottom) + 0.75rem)",maxHeight:`calc(90vh - ${openedModalOffset}px)`,display:"flex",flexDirection:"column",boxShadow:"0 -8px 40px rgba(0,0,0,0.45)",transition:"max-height 0.2s ease"}}>

                {/* Header */}
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1rem",flexShrink:0}}>
                  <h3 style={{color:"#fff",fontWeight:800,fontSize:"1.1rem",margin:0}}>📂 {lang==="es"?"Marcar Lo Que Abrí":"Mark What You've Opened"}</h3>
                  <button onClick={() => { setShowOpenedModal(false); setOpenedConfirm(null); }} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"50%",width:32,height:32,color:"#fff",fontWeight:700,cursor:"pointer",fontSize:"1.1rem",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
                </div>

                {openedConfirm ? (
                  /* Confirmation screen */
                  <div style={{textAlign:"center",padding:"0.5rem 0",flex:1,display:"flex",flexDirection:"column",justifyContent:"center"}}>
                    <div style={{fontSize:"3rem",marginBottom:"0.75rem"}}>✅</div>
                    <h3 style={{color:"#fff",fontWeight:800,fontSize:"1.1rem",marginBottom:"0.35rem"}}>{openedConfirm.item.name}</h3>
                    <p style={{color:"rgba(255,255,255,0.92)",fontSize:"0.875rem",marginBottom:"0.25rem"}}>
                      {lang==="es"?"Marcado como abierto":"Marked as opened"} — {openedConfirm.openDate}
                    </p>
                    {openedConfirm.openUseBy && (
                      <p style={{color:"#86efac",fontWeight:700,fontSize:"0.875rem",marginBottom:"0.25rem"}}>
                        {lang==="es"?"Usar antes de":"Suggested use by"}: {openedConfirm.openUseBy}
                        {openedConfirm.shelfDays && <span style={{color:"rgba(255,255,255,0.75)",fontWeight:400}}> ({openedConfirm.shelfDays} {lang==="es"?"días tras abrir":"days after opening"})</span>}
                      </p>
                    )}
                    {!openedConfirm.openUseBy && (
                      <p style={{color:"rgba(255,255,255,0.75)",fontSize:"0.8rem",marginBottom:"0.25rem"}}>{lang==="es"?"Sin referencia de duración conocida. Puedes editar la fecha de uso.":"No shelf-life reference found — you can set a use-by date manually."}</p>
                    )}

                    {showOpenedDateEdit ? (
                      <div style={{marginTop:"0.75rem",display:"flex",gap:"0.5rem",alignItems:"center",justifyContent:"center",flexWrap:"wrap"}}>
                        <input type="date" value={openedEditDate} onChange={e => setOpenedEditDate(e.target.value)} style={{borderRadius:"8px",padding:"0.5rem",border:"1.5px solid rgba(255,255,255,0.3)",background:"rgba(255,255,255,0.12)",color:"#fff",fontSize:"0.875rem"}} />
                        <button onClick={() => { if (openedEditDate) handleMarkOpened(openedConfirm.item, openedEditDate); setShowOpenedDateEdit(false); }} className="glass-scan-btn" style={{padding:"0.4rem 1rem",fontSize:"0.8rem"}}>{lang==="es"?"Guardar":"Save"}</button>
                        <button onClick={() => setShowOpenedDateEdit(false)} style={{background:"transparent",border:"none",color:"rgba(255,255,255,0.75)",cursor:"pointer",fontSize:"0.8rem"}}>{lang==="es"?"Cancelar":"Cancel"}</button>
                      </div>
                    ) : (
                      <button onClick={() => { setOpenedEditDate(openedConfirm.openDate); setShowOpenedDateEdit(true); }} style={{background:"transparent",border:"1px solid rgba(255,255,255,0.3)",borderRadius:"999px",padding:"0.3rem 1rem",color:"rgba(255,255,255,0.75)",cursor:"pointer",fontSize:"0.8rem",marginTop:"0.75rem",display:"inline-block"}}>
                        ✏️ {lang==="es"?"Editar fecha":"Edit date"}
                      </button>
                    )}

                    <button onClick={() => { setShowOpenedModal(false); setOpenedConfirm(null); }} className="glass-scan-btn w-full" style={{marginTop:"1.25rem",fontWeight:800}}>
                      {lang==="es"?"Listo":"Done"}
                    </button>
                    <button onClick={() => setOpenedConfirm(null)} style={{background:"transparent",border:"none",color:"rgba(255,255,255,0.75)",cursor:"pointer",fontSize:"0.8rem",marginTop:"0.5rem"}}>
                      ← {lang==="es"?"Marcar otro":"Mark another"}
                    </button>
                  </div>
                ) : (
                  /* Search + inventory list */
                  <>
                    {/* Search row */}
                    <div style={{position:"relative",marginBottom:"0.875rem",flexShrink:0}}>
                      <input
                        value={openedSearch}
                        onChange={e => setOpenedSearch(e.target.value)}
                        placeholder={lang==="es"?"Busca o escribe un producto…":"Search or say an item name…"}
                        autoFocus
                        style={{width:"100%",padding:"0.75rem 3rem 0.75rem 0.875rem",borderRadius:"12px",border:"1.5px solid rgba(255,255,255,0.25)",background:"rgba(255,255,255,0.12)",color:"#fff",fontSize:"0.9rem",outline:"none",boxSizing:"border-box"}}
                      />
                      <button
                        onClick={() => {
                          if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) { alert(lang==="es"?"Voz no disponible en este navegador.":"Voice input not available in this browser."); return; }
                          const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
                          const sr = new SR(); sr.lang = lang === "es" ? "es-US" : "en-US"; sr.interimResults = false; sr.maxAlternatives = 1;
                          sr.onresult = e => setOpenedSearch(e.results[0][0].transcript);
                          sr.start();
                        }}
                        title={lang==="es"?"Hablar":"Speak item name"}
                        style={{position:"absolute",right:"0.5rem",top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"50%",width:34,height:34,cursor:"pointer",fontSize:"1.1rem",display:"flex",alignItems:"center",justifyContent:"center"}}
                      >🎤</button>
                    </div>

                    {/* List */}
                    <div style={{overflowY:"auto",flex:1}}>
                      {openedSearch.trim() ? (
                        searchResults.length === 0
                          ? <p style={{color:"rgba(255,255,255,0.75)",fontSize:"0.85rem",textAlign:"center",paddingTop:"1rem"}}>{lang==="es"?"Sin resultados.":"No matching items found."}</p>
                          : <GroupSection label={lang==="es"?"Resultados":"Results"} items={searchResults} />
                      ) : allItems.length === 0 ? (
                        <p style={{color:"rgba(255,255,255,0.75)",fontSize:"0.85rem",textAlign:"center",paddingTop:"1rem"}}>{lang==="es"?"Sin artículos rastreados todavía.":"No tracked items yet. Add food in the Tracker tab first."}</p>
                      ) : (
                        <>
                          <GroupSection label={lang==="es"?"⏱ Recientes":"⏱ Recent Items"} items={recentItems} />
                          <GroupSection label={lang==="es"?"🧊 Refrigerador":"🧊 Fridge"} items={fridgeItems} />
                          <GroupSection label={lang==="es"?"❄️ Congelador":"❄️ Freezer"} items={freezerItems} />
                          <GroupSection label={lang==="es"?"🏺 Despensa":"🏺 Pantry"} items={pantryItems} />
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })()}

      {showTutorial && (() => {
        const tabKey = TUTORIALS[activeTab] ? activeTab : "home";
        const steps = TUTORIALS[tabKey];
        const step = steps[Math.min(tutorialStep, steps.length - 1)];
        const isLast = tutorialStep >= steps.length - 1;
        return (
          <div className="fixed inset-0 z-[100] flex items-end justify-center" style={{background:"rgba(0,0,0,0.65)",backdropFilter:"blur(4px)"}} onClick={() => setShowTutorial(false)}>
            <div className="tut-modal w-full max-w-lg rounded-t-3xl p-6" style={{background:"linear-gradient(160deg,#064e3b 0%,#065f46 60%,#047857 100%)",border:"2px solid rgba(183,214,58,0.55)",borderBottom:"none",boxShadow:"0 -8px 40px rgba(0,0,0,0.45)"}} onClick={e => e.stopPropagation()}>
              <div className="mx-auto mb-4 h-1 w-12 rounded-full" style={{background:"rgba(255,255,255,0.3)"}} />
              <div className="flex justify-center gap-2 mb-5">
                {steps.map((_, i) => (
                  <div key={i} onClick={() => setTutorialStep(i)} style={{width: i === tutorialStep ? "1.6rem" : "0.45rem", height:"0.45rem", borderRadius:"999px", background: i === tutorialStep ? "#B7D63A" : "rgba(255,255,255,0.3)", transition:"all 0.3s", cursor:"pointer"}} />
                ))}
              </div>
              <div key={tutorialStep} className="tut-step">
                <div className="text-center mb-3">
                  <span style={{fontSize:"4rem", display:"inline-block", animation:"tutEmojiPop 0.7s ease both"}}>{step.emoji}</span>
                </div>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-extrabold text-white mb-2" style={{textShadow:"0 2px 6px rgba(0,0,0,0.3)"}}>{step.title}</h2>
                  <p className="text-green-100 text-sm leading-relaxed">{step.body}</p>
                </div>
              </div>
              <div className="flex gap-3">
                {tutorialStep > 0 && (
                  <button onClick={() => setTutorialStep(s => s - 1)} className="back-btn">←</button>
                )}
                {!isLast ? (
                  <button onClick={() => setTutorialStep(s => s + 1)} className="flex-1 rounded-2xl py-3 text-sm font-bold glass-scan-btn" style={{border:"2px solid #B7D63A"}}>{lang === "es" ? "Siguiente →" : "Next →"}</button>
                ) : (
                  <button onClick={() => setShowTutorial(false)} className="flex-1 rounded-2xl py-3 text-base font-extrabold" style={{background:"#E8A63C",border:"2px solid #F0C070",color:"#000"}}>🎉 {lang === "es" ? "¡Listo!" : "Got it!"}</button>
                )}
              </div>
              {!isLast && <button onClick={() => setShowTutorial(false)} className="mt-3 w-full text-center text-xs" style={{color:"rgba(255,255,255,0.35)",background:"none",border:"none",cursor:"pointer"}}>{lang === "es" ? "saltar tutorial" : "skip tutorial"}</button>}
            </div>
          </div>
        );
      })()}

    </>
  );
}

