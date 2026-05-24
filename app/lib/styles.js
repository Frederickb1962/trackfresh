export const GLOBAL_STYLES = `
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
  .btn-amber-3d {
    background: linear-gradient(to bottom, #f59e0b, #d97706) !important;
    color: #ffffff !important;
    font-weight: 800 !important;
    text-shadow: 0 1px 2px rgba(0,0,0,0.6) !important;
    box-shadow: 0 5px 0px #92400e, 0 8px 16px rgba(0,0,0,0.35), inset 0 1.5px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.2) !important;
    border: none !important;
    border-radius: 12px;
    transition: all 0.12s ease;
    -webkit-font-smoothing: antialiased;
  }
  .btn-amber-3d:hover {
    background: linear-gradient(to bottom, #fbbf24, #b45309) !important;
    box-shadow: 0 7px 0px #92400e, 0 10px 20px rgba(0,0,0,0.4), inset 0 1.5px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(0,0,0,0.2) !important;
    transform: translateY(-2px);
  }
  .btn-amber-3d:active {
    box-shadow: 0 1px 0px #92400e, 0 2px 6px rgba(0,0,0,0.25), inset 0 2px 4px rgba(0,0,0,0.15) !important;
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
  .bubble-amber {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #92400e 100%);
    color: #ffffff;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 0px #78350f, 0 8px 16px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.2);
    border: none;
    transition: transform 0.3s ease, box-shadow 0.3s ease, width 0.3s ease, height 0.3s ease;
    cursor: pointer;
    -webkit-font-smoothing: antialiased;
    animation: float 3s ease-in-out infinite;
  }
  .bubble-amber:nth-child(1) { animation-delay: 0s; }
  .bubble-amber:nth-child(2) { animation-delay: 0.4s; }
  .bubble-amber:nth-child(3) { animation-delay: 0.8s; }
  .bubble-amber:nth-child(4) { animation-delay: 1.2s; }
  .bubble-amber:nth-child(5) { animation-delay: 1.6s; }
  .bubble-amber:nth-child(6) { animation-delay: 2.0s; }
  .bubble-amber:active {
    animation-play-state: paused;
    transform: scale(0.92);
    box-shadow: 0 2px 0px #78350f, 0 3px 6px rgba(0,0,0,0.2);
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

  /* === MARKETING PAGE (matches app home: charcoal + shiny glass) === */
  .mkt-page { min-height: 100vh; background: linear-gradient(180deg, #052e1f 0%, #031910 38%, #010a08 68%, #000000 100%); background-attachment: fixed; color: #fff; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif; overflow-x: hidden; }
  .mkt-nav { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 1.5rem; max-width: 900px; margin: 0 auto 0.5rem; }
  .mkt-nav-logo { font-size: 1.4rem; font-weight: 800; }
  .mkt-section-wrap { max-width: 800px; margin: 0 auto; padding: 0 1rem 1.5rem; display: flex; flex-direction: column; gap: 1.1rem; }
  /* Frosted panels — dark base fading up to green + orange rim (app windows) */
  .mkt-section-card {
    position: relative;
    border-radius: 16px;
    padding: 1.15rem 1.1rem 1.25rem;
    border: 0.5px solid rgba(249, 115, 22, 0.42);
    background: linear-gradient(180deg, rgba(22, 118, 84, 0.46) 0%, rgba(6, 44, 30, 0.58) 40%, rgba(0, 0, 0, 0.82) 100%);
    backdrop-filter: blur(22px) saturate(1.12);
    -webkit-backdrop-filter: blur(22px) saturate(1.12);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.52), 0 0 0 1px rgba(249, 115, 22, 0.12), 0 0 44px rgba(249, 115, 22, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.14), inset 0 -36px 72px rgba(0, 0, 0, 0.3);
  }
  .mkt-section-wrap .mkt-section-card:nth-child(2) {
    background: linear-gradient(180deg, rgba(26, 100, 72, 0.42) 0%, rgba(48, 32, 12, 0.22) 35%, rgba(0, 0, 0, 0.84) 100%);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.52), 0 0 0 1px rgba(249, 115, 22, 0.14), 0 0 40px rgba(251, 146, 60, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.12), inset 0 -32px 68px rgba(0, 0, 0, 0.32);
  }
  .mkt-section-wrap .mkt-section-card:nth-child(3) {
    background: linear-gradient(180deg, rgba(18, 108, 76, 0.48) 0%, rgba(5, 52, 36, 0.55) 42%, rgba(0, 0, 0, 0.83) 100%);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.52), 0 0 0 1px rgba(249, 115, 22, 0.13), 0 0 42px rgba(249, 115, 22, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.14), inset 0 -36px 72px rgba(0, 0, 0, 0.28);
  }
  .mkt-section-wrap .mkt-section-card:nth-child(4) {
    background: linear-gradient(180deg, rgba(24, 122, 88, 0.5) 0%, rgba(8, 48, 32, 0.52) 38%, rgba(0, 0, 0, 0.8) 100%);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.52), 0 0 0 1px rgba(249, 115, 22, 0.16), 0 0 48px rgba(249, 115, 22, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -28px 64px rgba(0, 0, 0, 0.26);
  }
  .mkt-section-card .mkt-hero { padding: 0.25rem 0 0; max-width: none; margin: 0; }
  .mkt-section-card--cta { text-align: center; }
  .mkt-condiment-strip { margin-top: 0.75rem; padding-top: 0.5rem; overflow: visible; }
  .mkt-condiment-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.65rem;
    align-items: flex-end;
  }
  .mkt-condiment-cell {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 1 6.5rem;
    min-width: 6.5rem;
    max-width: 7.25rem;
  }
  .mkt-condiment-popover {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    background: #1a1a2e;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    padding: 0.6rem 0.9rem;
    white-space: normal;
    z-index: 100;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    min-width: 190px;
    max-width: min(92vw, 280px);
    text-align: center;
    pointer-events: none;
  }
  .mkt-condiment-popover__info {
    font-weight: 700;
    font-size: 0.85rem;
    color: #fff;
    margin-bottom: 0.25rem;
    line-height: 1.45;
  }
  .mkt-condiment-popover__tag {
    font-size: 0.72rem;
    color: #fff;
    font-weight: 600;
  }
  .mkt-condiment-popover__arrow {
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #1a1a2e;
  }
  .mkt-condiment-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 0.35rem;
    width: 100%;
    box-sizing: border-box;
    padding: 0.55rem 0.5rem 0.65rem;
    border-radius: 14px;
    border: 2px solid rgba(249, 115, 22, 0.65);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.06) 45%, rgba(0, 0, 0, 0.35) 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 4px 14px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(134, 239, 172, 0.2);
    cursor: pointer;
    color: #fff;
    font-family: inherit;
    line-height: 1.2;
    transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .mkt-condiment-btn:hover {
    transform: translateY(-2px);
    border-color: rgba(251, 191, 36, 0.9);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.45), 0 8px 22px rgba(249, 115, 22, 0.25), 0 0 0 1px rgba(134, 239, 172, 0.35);
  }
  .mkt-condiment-btn:active {
    transform: translateY(1px);
    background: rgba(0, 0, 0, 0.4);
  }
  .mkt-condiment-btn--active {
    border-color: #86efac;
    background: linear-gradient(180deg, rgba(134, 239, 172, 0.28) 0%, rgba(6, 78, 59, 0.55) 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 0 24px rgba(134, 239, 172, 0.35), 0 0 0 2px rgba(134, 239, 172, 0.5);
    transform: scale(1.04);
  }
  .mkt-condiment-btn__img {
    height: 4.5rem;
    width: auto;
    display: block;
    object-fit: contain;
    pointer-events: none;
  }
  .mkt-condiment-btn__label {
    font-size: 0.82rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #fde68a;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    pointer-events: none;
  }
  .mkt-condiment-btn__hint {
    font-size: 0.68rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.78);
    pointer-events: none;
  }
  .mkt-condiment-strip-lead {
    text-align: center;
    font-size: 0.95rem;
    font-weight: 700;
    margin: 0 0 0.65rem;
    color: #fde68a;
    letter-spacing: 0.02em;
  }
  /* Signature amber — "After opening" callout */
  .mkt-save-program {
    text-align: center;
  }
  .mkt-save-program__badge {
    display: inline-block;
    margin: 0 0 0.75rem;
    padding: 0.35rem 0.9rem;
    border-radius: 999px;
    font-size: 1.35rem;
    font-weight: 900;
    color: #1a1a1a;
    background: linear-gradient(180deg, #fde68a 0%, #f59e0b 55%, #ea580c 100%);
    border: 2px solid #fff;
    box-shadow: 0 4px 18px rgba(249, 115, 22, 0.45);
  }
  .mkt-save-program__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.65rem;
    margin: 0.85rem 0 0;
    text-align: left;
  }
  @media (min-width: 520px) {
    .mkt-save-program__grid { grid-template-columns: 1fr 1fr 1fr; }
  }
  .mkt-save-program__card {
    border-radius: 12px;
    padding: 0.75rem 0.8rem;
    background: rgba(0, 0, 0, 0.28);
    border: 1px solid rgba(249, 115, 22, 0.35);
  }
  .mkt-save-program__card h3 {
    margin: 0 0 0.35rem;
    font-size: 0.82rem;
    font-weight: 800;
    color: #fde68a;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .mkt-save-program__card p {
    margin: 0;
    font-size: 0.82rem;
    line-height: 1.45;
    color: rgba(255, 255, 255, 0.88);
  }
  .mkt-save-program__steps {
    list-style: none;
    padding: 0;
    margin: 0.85rem 0 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: left;
  }
  .mkt-save-program__steps li {
    display: flex;
    gap: 0.55rem;
    align-items: flex-start;
    font-size: 0.9rem;
    line-height: 1.45;
  }
  .mkt-save-program__step-num {
    flex-shrink: 0;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 900;
    color: #1a1a1a;
    background: linear-gradient(180deg, #fbbf24, #f59e0b);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }
  .mkt-nav-glass-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 45%, rgba(255, 255, 255, 0.06) 100%);
    border: 0.5px solid rgba(255, 255, 255, 0.55);
    border-radius: 999px;
    padding: 0.4rem 0.75rem;
    color: #fff;
    font-weight: 700;
    font-size: 0.8rem;
    cursor: pointer;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65), inset 0 -1px 0 rgba(0, 0, 0, 0.18), inset 1px 0 0 rgba(255, 255, 255, 0.22), inset -1px 0 0 rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(134, 239, 172, 0.22), 0 4px 16px rgba(251, 146, 60, 0.08);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
    transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .mkt-nav-glass-btn:hover {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.14) 50%, rgba(255, 255, 255, 0.08) 100%);
    border-color: rgba(255, 255, 255, 0.72);
    transform: translateY(-1px);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.75), inset 0 -1px 0 rgba(0, 0, 0, 0.14), inset 1px 0 0 rgba(255, 255, 255, 0.3), inset -1px 0 0 rgba(255, 255, 255, 0.14), 0 0 0 1px rgba(134, 239, 172, 0.38), 0 6px 22px rgba(251, 146, 60, 0.12);
  }
  .mkt-nav-glass-btn:active {
    transform: translateY(1px);
    background: rgba(255, 255, 255, 0.12);
    box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 0 0 1px rgba(134, 239, 172, 0.18);
    transition-duration: 0.08s;
  }
  .mkt-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: linear-gradient(180deg, #fb923c 0%, #f97316 40%, #ea580c 100%);
    color: #fff;
    font-weight: 800;
    font-size: 1.05rem;
    padding: 1rem 2.35rem;
    border-radius: 16px;
    border: 0.5px solid rgba(154, 52, 18, 0.9);
    cursor: pointer;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.35),
      inset 0 -2px 0 rgba(0, 0, 0, 0.22),
      0 4px 0 rgba(124, 45, 18, 0.65),
      0 10px 28px rgba(0, 0, 0, 0.38);
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
    transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
  }
  .mkt-cta:hover {
    transform: translateY(-3px);
    background: linear-gradient(180deg, #fdba74 0%, #fb923c 42%, #f97316 100%);
    border-color: rgba(194, 65, 12, 0.95);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.42),
      inset 0 -2px 0 rgba(0, 0, 0, 0.16),
      0 5px 0 rgba(124, 45, 18, 0.6),
      0 14px 36px rgba(0, 0, 0, 0.4);
  }
  .mkt-cta:active {
    transform: translateY(1px) scale(0.99);
    background: linear-gradient(180deg, #ea580c 0%, #c2410c 100%);
    border-color: rgba(124, 45, 18, 0.95);
    box-shadow:
      inset 0 3px 10px rgba(0, 0, 0, 0.28),
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 2px 0 rgba(124, 45, 18, 0.5),
      0 4px 14px rgba(0, 0, 0, 0.35);
    transition-duration: 0.08s;
  }
  .mkt-cta-ghost {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.07) 100%);
    color: #fff;
    font-weight: 700;
    font-size: 1.05rem;
    padding: 0.97rem 2.1rem;
    border-radius: 16px;
    border: 0.5px solid rgba(255, 255, 255, 0.52);
    cursor: pointer;
    text-decoration: none;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.55), inset 0 -1px 0 rgba(0, 0, 0, 0.15), inset 1px 0 0 rgba(255, 255, 255, 0.18), inset -1px 0 0 rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(134, 239, 172, 0.2);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    -webkit-tap-highlight-color: transparent;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
    transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
  }
  .mkt-cta-ghost:hover {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.1) 100%);
    border-color: rgba(255, 255, 255, 0.68);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65), inset 0 -1px 0 rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(251, 191, 36, 0.28), 0 6px 20px rgba(34, 197, 94, 0.08);
    transform: translateY(-2px);
  }
  .mkt-cta-ghost:active {
    transform: translateY(1px);
    background: rgba(255, 255, 255, 0.1);
    transition-duration: 0.08s;
  }
  .mkt-hero { text-align: center; padding: 1.5rem 1.5rem 0.5rem; max-width: 680px; margin: 0 auto; }
  .mkt-hero-eyebrow { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase; color: #86efac; margin-bottom: 0.6rem; display: block; }
  .mkt-hero h1 { font-size: 2.9rem; font-weight: 900; line-height: 1.03; margin-bottom: 0.75rem; letter-spacing: -0.025em; color: #ffffff; }
  .mkt-hero h1 span { color: #ffffff; }
  .mkt-hero-sub { font-size: 1rem; color: rgba(255,255,255,0.72); line-height: 1.4; margin-bottom: 0.65rem; }
  .mkt-hero-btns { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; margin-top: 0.5rem; }
  .mkt-section { padding: 0.5rem 1.5rem; max-width: 800px; margin: 0 auto; }
  .mkt-section-dark { background: rgba(0,0,0,0.28); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
  .mkt-section-title { text-align: center; margin-bottom: 0.4rem; }
  .mkt-section-title h2 { font-size: 1.6rem; font-weight: 900; margin-top: 0; letter-spacing: -0.01em; }
  .mkt-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin-top: 0; text-align: center; padding: 0.1rem 0; }
  .mkt-stat-num { font-size: 1.65rem; font-weight: 900; color: #B7D63A; }
  .mkt-stat-label { font-size: 0.75rem; opacity: 0.8; margin-top: 0.1rem; }
  /* Dashboard mockup */
  .mkt-dashboard { max-width: 540px; margin: 0.75rem auto; background: rgba(0,0,0,0.42); border-radius: 20px; padding: 1.25rem; backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); box-shadow: 0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(183,214,58,0.3); color: #fff; border: 0.5px solid rgba(255,255,255,0.4); }
  .mkt-dash-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.875rem; padding-bottom: 0.625rem; border-bottom: 0.5px solid rgba(255,255,255,0.22); }
  .mkt-dash-title { font-size: 0.875rem; font-weight: 800; color: #fff; }
  .mkt-dash-date { font-size: 0.7rem; color: rgba(255,255,255,0.55); font-weight: 600; }
  .mkt-dash-section { margin-bottom: 0.75rem; }
  .mkt-dash-section-label { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.6); margin-bottom: 0.35rem; }
  .mkt-dash-item { display: flex; align-items: center; justify-content: space-between; padding: 0.4rem 0.6rem; border-radius: 10px; margin-bottom: 0.3rem; background: rgba(0,0,0,0.35); border: 0.5px solid rgba(255,255,255,0.35); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow: inset 0 1px 0 rgba(255,255,255,0.12); }
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
  .mkt-benefit-card { background: linear-gradient(180deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0.09) 48%,rgba(255,255,255,0.03) 100%); border: 0.5px solid rgba(255,255,255,0.44); border-radius: 16px; padding: 0.35rem 0.5rem; backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); box-shadow: inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(0,0,0,0.12), inset 0 0 0 0.5px rgba(255,255,255,0.05); transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s; width: calc(50% - 0.1rem); max-width: 280px; }
  .mkt-benefit-card:hover { transform: translateY(-3px); border-color: rgba(255,255,255,0.58); box-shadow: inset 0 1px 0 rgba(255,255,255,0.36), inset 0 -1px 0 rgba(0,0,0,0.1), inset 0 0 0 0.5px rgba(255,255,255,0.08), 0 12px 28px rgba(0,0,0,0.35); }
  .mkt-benefit-icon { font-size: 1.2rem; margin-bottom: 0.1rem; }
  .mkt-benefit-card h3 { font-size: 0.95rem; font-weight: 800; margin-bottom: 0.1rem; }
  .mkt-benefit-card p { font-size: 0.75rem; opacity: 0.72; line-height: 1.2; }
  /* 3-step */
  .mkt-3steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.3rem; margin-top: 0.3rem; text-align: center; }
  .mkt-3step { padding: 0.15rem; display: flex; align-items: center; justify-content: center; gap: 0.4rem; }
  .mkt-3step-num { width: 32px; height: 32px; background: linear-gradient(180deg,rgba(255,255,255,0.28) 0%,rgba(255,255,255,0.12) 50%,rgba(240,192,112,0.35) 100%); color: #0a0a0c; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 0.9rem; margin: 0; flex-shrink: 0; border: 0.5px solid rgba(255,255,255,0.45); box-shadow: inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.15); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
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
  .mkt-animate-d5 { animation-delay: 0.5s; }
  .icon-bounce-1 { }
  .icon-bounce-2 { }
  .icon-bounce-3 { }
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
  .mkt-store-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.2); border-color: rgba(255,255,255,0.48) !important; }
  .mkt-store-card:active { transform: translateY(1px); transition-duration: 0.08s; }

  /* === APP INTERIOR THEME === */
  .app-bg { background: linear-gradient(180deg, #052e1f 0%, #031910 38%, #010a08 68%, #000000 100%); background-attachment: fixed; }
  .app-section-label { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.1em; color: #86efac; font-weight: 700; display: block; margin-bottom: 0.2rem; }
  .app-section-h2 { font-size: 1.3rem; font-weight: 900; color: #fff; margin: 0 0 0.75rem; text-shadow: 0 1px 4px rgba(0,0,0,0.2); }
  .glass-scan-btn { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.3rem; border-radius: 16px; padding: 0.85rem 0.5rem; background: linear-gradient(180deg,rgba(255,255,255,0.32) 0%,rgba(255,255,255,0.16) 42%,rgba(255,255,255,0.07) 100%); border: 0.5px solid rgba(255,255,255,0.58); color: #fff; font-weight: 700; font-size: 0.75rem; cursor: pointer; transition: transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease; backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); width: 100%; box-shadow: inset 0 1px 0 rgba(255,255,255,0.52), inset 0 -1px 0 rgba(0,0,0,0.14), inset 1px 0 0 rgba(255,255,255,0.18), inset -1px 0 0 rgba(255,255,255,0.08), 0 6px 22px rgba(0,0,0,0.28); -webkit-tap-highlight-color: transparent; text-shadow: 0 1px 2px rgba(0,0,0,0.45); }
  @keyframes letterPop { 0%,100% { transform:scale(1); color:#f97316; text-shadow:none; } 4% { transform:scale(1.28); color:#fde68a; text-shadow:0 0 10px rgba(251,191,36,0.9),0 0 4px rgba(249,115,22,0.7); } 10% { transform:scale(1); color:#f97316; text-shadow:none; } }
  .glass-scan-btn:hover { background: linear-gradient(180deg,rgba(255,255,255,0.4) 0%,rgba(255,255,255,0.22) 48%,rgba(255,255,255,0.12) 100%); transform: translateY(-2px); border-color: rgba(255,255,255,0.78); color: #fff; box-shadow: inset 0 1px 0 rgba(255,255,255,0.52), inset 0 -1px 0 rgba(0,0,0,0.14), inset 1px 0 0 rgba(255,255,255,0.18), inset -1px 0 0 rgba(255,255,255,0.08), 0 6px 22px rgba(0,0,0,0.28); }
  .glass-scan-btn:active { transform: translateY(1px); background: linear-gradient(180deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.03) 100%); border-color: rgba(255,255,255,0.58); box-shadow: inset 0 1px 0 rgba(255,255,255,0.52), inset 0 -1px 0 rgba(0,0,0,0.14), 0 4px 14px rgba(0,0,0,0.22); }
  .tracker-items-card { background: linear-gradient(180deg, rgba(18, 100, 72, 0.4) 0%, rgba(5, 36, 24, 0.58) 45%, rgba(0, 0, 0, 0.82) 100%) !important; border: 0.5px solid rgba(249, 115, 22, 0.38) !important; backdrop-filter: blur(12px) !important; -webkit-backdrop-filter: blur(12px) !important; box-shadow: 0 10px 30px rgba(0,0,0,0.52), 0 0 0 1px rgba(249, 115, 22, 0.12), 0 0 40px rgba(249, 115, 22, 0.07), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -28px 64px rgba(0,0,0,0.28) !important; }
  .glass-tile { background: rgba(0,0,0,0.4); border: 0.5px solid rgba(255,255,255,0.35); border-radius: 16px; padding: 1.25rem 1rem; text-align: center; backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); box-shadow: 0 10px 36px rgba(0,0,0,0.42), inset 0 1px 1px rgba(255,255,255,0.06); transition: transform 0.2s, background 0.2s; cursor: pointer; width: 100%; display: block; }
  .glass-tile:hover { transform: translateY(-3px); background: rgba(0,0,0,0.48); box-shadow: 0 10px 36px rgba(0,0,0,0.48), inset 0 1px 1px rgba(255,255,255,0.08); }
  .glass-tile:active { transform: translateY(1px); }
  .app-header-btn { background: none; border: none; border-radius: 0; padding: 0.4rem 0.5rem; color: #fff; font-weight: 700; font-size: 0.8rem; cursor: pointer; transition: all 0.15s; }
  .app-header-btn:hover { opacity: 0.75; }
  .back-btn { display: inline-flex; align-items: center; justify-content: center; width: 2rem; height: 2rem; background: linear-gradient(180deg,rgba(255,255,255,0.26) 0%,rgba(255,255,255,0.11) 45%,rgba(255,255,255,0.035) 100%); border: 0.5px solid rgba(255,255,255,0.44); border-radius: 50%; color: #fff; font-size: 1rem; cursor: pointer; transition: all 0.15s; flex-shrink: 0; padding: 0; line-height: 1; backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); box-shadow: inset 0 1px 0 rgba(255,255,255,0.32), inset 0 -1px 0 rgba(0,0,0,0.14), inset 0 0 0 0.5px rgba(255,255,255,0.06); text-shadow: 0 1px 2px rgba(0,0,0,0.45); }
  .back-btn:hover { background: linear-gradient(180deg,rgba(255,255,255,0.34) 0%,rgba(255,255,255,0.18) 48%,rgba(255,255,255,0.1) 100%); border-color: rgba(255,255,255,0.58); color: #fff; box-shadow: inset 0 1px 0 rgba(255,255,255,0.38), inset 0 -1px 0 rgba(0,0,0,0.12), inset 0 0 0 0.5px rgba(255,255,255,0.08); }
  @keyframes arrowBounceDown { 0%,100% { transform:translateY(0); } 50% { transform:translateY(3px); } }
  @keyframes arrowBounceUp   { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-3px); } }
  @keyframes textShimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
  .shimmer-text { background: linear-gradient(90deg, #E8A63C 25%, #fffbe8 50%, #E8A63C 75%); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: textShimmer 3s linear infinite; }
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
  @keyframes pulseRed { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.75; transform:scale(0.95); } }
  .pulse-red { animation: pulseRed 1.2s ease-in-out infinite; }
  @keyframes arrowBounceDown { 0%,100% { transform:translateY(0); } 50% { transform:translateY(3px); } }
  @keyframes arrowBounceUp   { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-3px); } }
  .arrow-down { color:#B7D63A; display:inline-block; animation:arrowBounceDown 1.1s ease-in-out infinite; }
  .arrow-up   { color:#B7D63A; display:inline-block; animation:arrowBounceUp   1.1s ease-in-out infinite; }

  /* ── Premium polish ── */
  /* 1. Dashboard tile — lift on hover (desktop) + visible tap feedback (mobile) */
  .dash-tile { background:linear-gradient(180deg,rgba(255,255,255,0.32) 0%,rgba(255,255,255,0.16) 42%,rgba(255,255,255,0.07) 100%); border:0.5px solid rgba(255,255,255,0.58); border-radius:16px; padding:1rem 0.5rem; display:flex; flex-direction:column; align-items:center; gap:0.4rem; cursor:pointer; color:#fff; transition:transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, border-color 0.18s ease; backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); width:100%; -webkit-tap-highlight-color:transparent; box-shadow:inset 0 1px 0 rgba(255,255,255,0.52), inset 0 -1px 0 rgba(0,0,0,0.14), inset 1px 0 0 rgba(255,255,255,0.18), inset -1px 0 0 rgba(255,255,255,0.08), 0 6px 22px rgba(0,0,0,0.28); text-shadow:0 1px 2px rgba(0,0,0,0.45); }
  .dash-tile > span:nth-child(2) { color: #fff !important; font-weight: 700 !important; }
  .dash-tile > span:nth-child(3) { color: #fde047 !important; font-weight: 600 !important; text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important; }
  .dash-tile:hover { transform:translateY(-2px); background:linear-gradient(180deg,rgba(255,255,255,0.4) 0%,rgba(255,255,255,0.22) 48%,rgba(255,255,255,0.12) 100%); border-color:rgba(255,255,255,0.78); box-shadow:inset 0 1px 0 rgba(255,255,255,0.52), inset 0 -1px 0 rgba(0,0,0,0.12), inset 1px 0 0 rgba(255,255,255,0.22), inset -1px 0 0 rgba(255,255,255,0.1), 0 8px 26px rgba(0,0,0,0.32); }
  .dash-tile:active { transform:translateY(1px) scale(0.98); background:linear-gradient(180deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.03) 100%); border-color:rgba(255,255,255,0.58); box-shadow:inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.16), 0 0 0 2.5px rgba(183,214,58,0.45), 0 0 18px rgba(183,214,58,0.2); outline:none; transition-duration:0.08s; }
  /* 2. I Opened Something — visible on tap */
  .opened-btn { width:100%; display:flex; align-items:center; justify-content:center; gap:0.5rem; background:linear-gradient(180deg,rgba(255,255,255,0.26) 0%,rgba(255,255,255,0.11) 45%,rgba(255,255,255,0.035) 100%); border:0.5px solid rgba(255,255,255,0.44); border-radius:16px; padding:0.6rem; cursor:pointer; color:#fde047; font-weight:800; font-size:0.82rem; transition:transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, border-color 0.18s ease; -webkit-tap-highlight-color:transparent; backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); box-shadow:inset 0 1px 0 rgba(255,255,255,0.32), inset 0 -1px 0 rgba(0,0,0,0.14), inset 0 0 0 0.5px rgba(255,255,255,0.06); text-shadow:0 1px 2px rgba(0,0,0,0.45); }
  .opened-btn:hover { transform:translateY(-2px); background:linear-gradient(180deg,rgba(255,255,255,0.34) 0%,rgba(255,255,255,0.18) 48%,rgba(255,255,255,0.1) 100%); border-color:rgba(255,255,255,0.58); color:#fef08a; box-shadow:inset 0 1px 0 rgba(255,255,255,0.38), inset 0 -1px 0 rgba(0,0,0,0.12), inset 0 0 0 0.5px rgba(255,255,255,0.08); }
  .opened-btn:active { transform:translateY(1px); background:linear-gradient(180deg,rgba(255,255,255,0.14) 0%,rgba(255,255,255,0.06) 50%,rgba(255,255,255,0.02) 100%); border-color:rgba(255,255,255,0.44); box-shadow:inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.16), inset 0 0 0 0.5px rgba(255,255,255,0.04); transition-duration:0.08s; }
  /* 3. Tab fade-up transition — increased distance for visibility */
  @keyframes tabFadeUp { from { opacity:0; } to { opacity:1; } }
  .tab-enter { animation:tabFadeUp 0.28s ease-out both; }
  @keyframes trackerLinkPulse { 0%{opacity:0} 25%{opacity:1} 100%{opacity:0} }
  .tracker-link-overlay { position:fixed; inset:0; background:rgba(183,214,58,0.06); pointer-events:none; z-index:9990; animation:trackerLinkPulse 0.85s ease-out forwards; }
  @keyframes trackerEntryGlow { 0%{box-shadow:0 0 0 0 rgba(183,214,58,0);} 25%{box-shadow:0 0 0 3px rgba(183,214,58,0.5), 0 0 22px rgba(183,214,58,0.22);} 100%{box-shadow:0 0 0 0 rgba(183,214,58,0);} }
  .tracker-entry-flash { animation:trackerEntryGlow 0.65s ease-out both; border-radius:12px; }
  @keyframes trackerTilePulse { 0%{transform:translateY(0) scale(1);box-shadow:inset 0 1px 0 rgba(255,255,255,0.32), inset 0 -1px 0 rgba(0,0,0,0.14), inset 0 0 0 0.5px rgba(255,255,255,0.06);filter:brightness(1);} 20%{transform:translateY(2px) scale(0.97);box-shadow:inset 0 1px 0 rgba(255,255,255,0.32), inset 0 -1px 0 rgba(0,0,0,0.14), inset 0 0 0 0.5px rgba(255,255,255,0.06),0 0 0 3px rgba(183,214,58,0.55),0 0 28px rgba(183,214,58,0.3);filter:brightness(1.08);} 60%{transform:translateY(2px) scale(0.97);box-shadow:inset 0 1px 0 rgba(255,255,255,0.32), inset 0 -1px 0 rgba(0,0,0,0.14), inset 0 0 0 0.5px rgba(255,255,255,0.06),0 0 0 3px rgba(183,214,58,0.45),0 0 22px rgba(183,214,58,0.22);filter:brightness(1.04);} 100%{transform:translateY(0) scale(1);box-shadow:inset 0 1px 0 rgba(255,255,255,0.32), inset 0 -1px 0 rgba(0,0,0,0.14), inset 0 0 0 0.5px rgba(255,255,255,0.06);filter:brightness(1);} }
  .tracker-tile-active { animation:trackerTilePulse 0.7s ease-out both; }
  /* 4. Card depth */
  .card-premium { box-shadow:0 4px 6px rgba(0,0,0,0.05), 0 12px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.95); }
  /* 5. Urgency pulse — red only, more visible */
  @keyframes urgencyGlow { 0%,100% { box-shadow:0 0 0 0 rgba(220,38,38,0.6); } 50% { box-shadow:0 0 0 6px rgba(220,38,38,0); } }
  .urgency-pulse { animation:urgencyGlow 1.6s ease-in-out infinite; }
  @keyframes mic-pulse { 0%,100%{box-shadow:0 0 0 1px rgba(255,255,255,0.35),0 0 20px 4px rgba(239,68,68,0.5),0 0 40px 10px rgba(127,29,29,0.25)} 50%{box-shadow:0 0 0 1px rgba(255,255,255,0.55),0 0 28px 8px rgba(239,68,68,0.72),0 0 52px 16px rgba(185,28,28,0.38)} }
  @keyframes tf-first-item { 0%{opacity:0;transform:translateY(5px)} 12%{opacity:1;transform:translateY(0)} 75%{opacity:1} 100%{opacity:0;transform:translateY(-3px)} }
  .tf-first-item-msg { animation: tf-first-item 2.2s ease forwards; pointer-events:none; }
  .voice-mic-btn { display:flex;align-items:center;justify-content:center;width:2.2rem;height:2.2rem;border-radius:50%;background:linear-gradient(180deg,rgba(255,255,255,0.26) 0%,rgba(255,255,255,0.11) 45%,rgba(255,255,255,0.035) 100%);border:0.5px solid rgba(255,255,255,0.44);color:#fff;cursor:pointer;font-size:1rem;transition:all 0.2s;flex-shrink:0;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:inset 0 1px 0 rgba(255,255,255,0.32), inset 0 -1px 0 rgba(0,0,0,0.14), inset 0 0 0 0.5px rgba(255,255,255,0.06);text-shadow:0 1px 2px rgba(0,0,0,0.45); }
  .voice-mic-btn:hover { background:linear-gradient(180deg,rgba(255,255,255,0.34) 0%,rgba(255,255,255,0.18) 48%,rgba(255,255,255,0.1) 100%);border-color:rgba(255,255,255,0.58);color:#fef08a;box-shadow:inset 0 1px 0 rgba(255,255,255,0.38), inset 0 -1px 0 rgba(0,0,0,0.12), inset 0 0 0 0.5px rgba(255,255,255,0.08); }
  .voice-mic-btn.listening { background:rgba(185,28,28,0.55);border:0.5px solid rgba(255,255,255,0.44);color:#fff;animation:mic-pulse 1.15s ease-in-out infinite; }
  @keyframes emberPulse {
    0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7); }
    70% { box-shadow: 0 0 0 15px rgba(245, 158, 11, 0); }
    100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
  }
`;
