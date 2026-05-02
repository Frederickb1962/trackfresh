"use client";

import { useRef, useState, useEffect } from "react";

export default function GroceryScanModal({ onAddItem, onClose, lang, parseSpokenDate }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const mountedRef = useRef(true);
  const dateInputRef = useRef(null);
  const isEs = lang === "es";

  // screen: "camera" | "scanning" | "review" | "dates" | "error"
  const [screen, setScreen] = useState("camera");
  const [camError, setCamError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // review state
  const [detectedItems, setDetectedItems] = useState([]);
  const [checked, setChecked] = useState({});
  const [names, setNames] = useState({});
  const [locations, setLocations] = useState({});

  // dates state
  const [dateItems, setDateItems] = useState([]);
  const [dateIndex, setDateIndex] = useState(0);
  const [pickedDate, setPickedDate] = useState("");
  const [sessionCount, setSessionCount] = useState(0);
  const [groceryVoiceListening, setGroceryVoiceListening] = useState(false);
  const [groceryVoiceError, setGroceryVoiceError] = useState("");
  const [groceryVoiceAwaitND, setGroceryVoiceAwaitND] = useState(false);
  const groceryNDRef = useRef(null);

  const playBeep = (freq, dur, vol = 0.28) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const play = () => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = freq; osc.type = "sine";
        gain.gain.setValueAtTime(vol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
        osc.start(ctx.currentTime); osc.stop(ctx.currentTime + dur);
      };
      if (ctx.state === "suspended") { ctx.resume().then(play); } else { play(); }
    } catch(e) {}
  };
  const playShutter = () => playBeep(1000, 0.05);
  const playSuccess = () => { playBeep(880, 0.2); setTimeout(() => playBeep(1100, 0.25), 220); };
  const playError   = () => { playBeep(400, 0.12); setTimeout(() => playBeep(300, 0.18), 200); };

  useEffect(() => {
    mountedRef.current = true;
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        if (!mountedRef.current) { stream.getTracks().forEach(t => t.stop()); return; }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute("playsinline", "true");
          await videoRef.current.play();
        }
      } catch(e) {
        if (mountedRef.current) setCamError(isEs ? "Acceso a cámara denegado." : "Camera access denied.");
      }
    }
    startCamera();
    return () => {
      mountedRef.current = false;
      if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    };
  }, []);

  const capture = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    playShutter();
    setScreen("scanning");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const base64 = canvas.toDataURL("image/jpeg", 0.85).split(",")[1];
    try {
      const res = await fetch("/api/scan-smart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageData: base64, mediaType: "image/jpeg" })
      });
      if (!mountedRef.current) return;
      const data = await res.json();
      const items = data.items || (data.item ? [data.item] : []);
      if (items.length === 0) {
        playError();
        setErrorMsg(isEs ? "No se detectaron artículos. Intenta de nuevo." : "No items detected. Try again.");
        setScreen("error");
        return;
      }
      playSuccess();
      setDetectedItems(items);
      const initChecked = {};
      const initNames = {};
      const initLocs = {};
      items.forEach((it, i) => {
        initChecked[i] = true;
        initNames[i] = it.name || "Unknown Item";
        initLocs[i] = it.location || "Fridge";
      });
      setChecked(initChecked);
      setNames(initNames);
      setLocations(initLocs);
      setScreen("review");
    } catch(e) {
      if (!mountedRef.current) return;
      playError();
      setErrorMsg(e.message || "Scan failed");
      setScreen("error");
    }
  };

  const handleAddSelected = () => {
    const selected = detectedItems
      .map((it, i) => ({ ...it, _index: i }))
      .filter((_, i) => checked[i]);
    if (selected.length === 0) { onClose(); return; }
    setDateItems(selected.map(it => ({
      ...it,
      name: names[it._index] || it.name,
      location: locations[it._index] || it.location || "Fridge",
      date: it.date && it.dateFound ? it.date : "",
    })));
    setDateIndex(0);
    setPickedDate(selected[0]?.date || "");
    setScreen("dates");
  };

  const handleSaveDate = () => {
    const item = dateItems[dateIndex];
    onAddItem({
      id: Date.now().toString() + dateIndex,
      name: item.name,
      useByDate: pickedDate || item.date || "",
      openDate: "",
      category: item.category || "Other",
      location: item.location,
      daysAfterOpening: item.daysAfterOpening || null,
      storageTip: item.storageTip || "",
      openedTip: item.openedTip || "",
    });
    setSessionCount(c => c + 1);
    const next = dateIndex + 1;
    if (next >= dateItems.length) { onClose(); } else { setDateIndex(next); setPickedDate(dateItems[next]?.date || ""); }
  };

  const handleSkipDate = () => {
    const item = dateItems[dateIndex];
    onAddItem({
      id: Date.now().toString() + dateIndex,
      name: item.name,
      useByDate: item.date || "",
      openDate: "",
      category: item.category || "Other",
      location: item.location,
      daysAfterOpening: item.daysAfterOpening || null,
      storageTip: item.storageTip || "",
      openedTip: item.openedTip || "",
    });
    setSessionCount(c => c + 1);
    const next = dateIndex + 1;
    if (next >= dateItems.length) { onClose(); } else { setDateIndex(next); setPickedDate(dateItems[next]?.date || ""); }
  };

  const startGroceryVoice = () => {
    setGroceryVoiceError("");
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setGroceryVoiceError("Voice not supported on this device"); return; }
    playBeep(880, 0.15);
    const recog = new SR();
    recog.lang = "en-US"; recog.interimResults = false; recog.maxAlternatives = 1;
    setGroceryVoiceListening(true);
    recog.onresult = (e) => {
      const t = e.results[0][0].transcript;
      const parsed = parseSpokenDate(t);
      if (parsed) {
        setPickedDate(parsed); playBeep(880, 0.12); setTimeout(() => playBeep(660, 0.1), 180);
        setGroceryVoiceError(""); setGroceryVoiceListening(false); setGroceryVoiceAwaitND(true);
        const ndMsg = new SpeechSynthesisUtterance("Say Next to save and continue, or Done to finish.");
        ndMsg.rate = 1.1;
        ndMsg.onend = () => {
          const SR2 = window.SpeechRecognition || window.webkitSpeechRecognition;
          if (!SR2) { setGroceryVoiceAwaitND(false); return; }
          if (groceryNDRef.current) { try { groceryNDRef.current.abort(); } catch(ex) {} }
          const ndRecog = new SR2(); ndRecog.lang = "en-US"; ndRecog.interimResults = false; ndRecog.maxAlternatives = 1;
          groceryNDRef.current = ndRecog;
          let settled = false;
          const ndTimeout = setTimeout(() => { if (!settled) { settled = true; setGroceryVoiceAwaitND(false); groceryNDRef.current = null; try { ndRecog.abort(); } catch(ex) {} } }, 10000);
          ndRecog.onresult = (ev) => {
            if (settled) return; settled = true; clearTimeout(ndTimeout); setGroceryVoiceAwaitND(false); groceryNDRef.current = null;
            const cmd = ev.results[0][0].transcript.toLowerCase();
            const nextIdx = dateIndex + 1;
            if (cmd.includes("next") || cmd.includes("yes") || cmd.includes("more")) { handleSaveDate(); if (nextIdx < dateItems.length) setTimeout(() => startGroceryVoice(), 700); }
            else if (cmd.includes("done") || cmd.includes("stop") || cmd.includes("finish")) { handleSaveDate(); setTimeout(() => onClose(), 300); }
          };
          ndRecog.onerror = () => { if (!settled) { settled = true; clearTimeout(ndTimeout); setGroceryVoiceAwaitND(false); groceryNDRef.current = null; } };
          ndRecog.onend = () => { if (!settled) { settled = true; clearTimeout(ndTimeout); setGroceryVoiceAwaitND(false); groceryNDRef.current = null; } };
          ndRecog.start();
        };
        window.speechSynthesis.cancel(); window.speechSynthesis.speak(ndMsg);
      } else { setGroceryVoiceError("Could not understand. Try: April 20"); setGroceryVoiceListening(false); }
    };
    recog.onerror = () => { setGroceryVoiceError("Could not understand. Try: April 20"); setGroceryVoiceListening(false); };
    recog.onend = () => setGroceryVoiceListening(false);
    recog.start();
  };

  if (screen === "scanning") {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 10001, background: "#000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "1rem", left: "1rem", background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "999px", padding: "0.4rem 1rem", color: "#fff", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer" }}>← {isEs ? "Atrás" : "Back"}</button>
        <div style={{ width: 56, height: 56, border: "5px solid #4ade80", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.9s linear infinite" }} />
        <p style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem", margin: 0 }}>{isEs ? "Analizando imagen..." : "Analyzing image..."}</p>
      </div>
    );
  }

  if (screen === "error") {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 10001, background: "#000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem", padding: "2rem" }}>
        <span style={{ fontSize: "3rem" }}>❌</span>
        <p style={{ color: "#f87171", fontWeight: 700, fontSize: "1.1rem", textAlign: "center", margin: 0 }}>{errorMsg || (isEs ? "Error al escanear" : "Scan error")}</p>
        <button onClick={() => setScreen("camera")} style={{ padding: "0.9rem 2rem", background: "#16a34a", color: "#fff", fontWeight: 800, fontSize: "1rem", border: "none", borderRadius: "14px", cursor: "pointer" }}>{isEs ? "Intentar de nuevo" : "Try Again"}</button>
        <button onClick={onClose} style={{ padding: "0.7rem 1.5rem", background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", fontWeight: 700, fontSize: "0.9rem", border: "2px solid rgba(255,255,255,0.2)", borderRadius: "12px", cursor: "pointer" }}>{isEs ? "Cerrar" : "Close"}</button>
      </div>
    );
  }

  if (screen === "review") {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 10001, background: "#111", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", background: "#000", flexShrink: 0 }}>
          <span style={{ color: "#fff", fontWeight: 900, fontSize: "1rem" }}>🛒 {isEs ? "Artículos Detectados" : "Detected Items"}</span>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.18)", border: "2px solid rgba(255,255,255,0.45)", color: "#fff", borderRadius: "999px", padding: "0.35rem 1rem", fontWeight: 800, cursor: "pointer", fontSize: "0.85rem" }}>✕ {isEs ? "Cerrar" : "Close"}</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "0.75rem 1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {detectedItems.map((it, i) => (
            <div key={i} style={{ background: "#1e1e1e", borderRadius: "14px", padding: "0.85rem 1rem", display: "flex", flexDirection: "column", gap: "0.6rem", border: checked[i] ? "1.5px solid #4ade80" : "1.5px solid #333" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <input type="checkbox" checked={!!checked[i]} onChange={e => setChecked(c => ({ ...c, [i]: e.target.checked }))} style={{ width: 22, height: 22, accentColor: "#4ade80", flexShrink: 0, cursor: "pointer" }} />
                <input type="text" value={names[i] || ""} onChange={e => setNames(n => ({ ...n, [i]: e.target.value }))}
                  style={{ flex: 1, background: "transparent", border: "none", borderBottom: "1.5px solid #444", color: "#fff", fontWeight: 700, fontSize: "0.95rem", padding: "0.1rem 0", outline: "none" }} />
              </div>
              <div style={{ display: "flex", gap: "0.5rem", paddingLeft: "2rem" }}>
                {["Fridge", "Freezer", "Pantry"].map(loc => (
                  <button key={loc} onClick={() => setLocations(l => ({ ...l, [i]: loc }))}
                    style={{ flex: 1, padding: "0.45rem 0.25rem", fontSize: "0.72rem", fontWeight: 700, borderRadius: "8px", border: "none", cursor: "pointer",
                      background: locations[i] === loc ? (loc === "Freezer" ? "#2563eb" : loc === "Fridge" ? "#16a34a" : "#ea580c") : "#2a2a2a",
                      color: locations[i] === loc ? "#fff" : "#888" }}>
                    {loc === "Fridge" ? "🥬" : loc === "Freezer" ? "❄️" : "🫙"} {isEs ? (loc === "Fridge" ? "Refri" : loc === "Freezer" ? "Conge" : "Despe") : loc}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "0.75rem 1rem", paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))", background: "#000", flexShrink: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <button onClick={handleAddSelected}
            style={{ width: "100%", padding: "1.1rem", background: "linear-gradient(to bottom,#16a34a,#15803d)", color: "#fff", fontWeight: 900, fontSize: "1.15rem", border: "none", borderRadius: "16px", cursor: "pointer", boxShadow: "0 4px 0 #14532d" }}>
            ✅ {isEs ? "Agregar Seleccionados" : "Add All Selected"} ({Object.values(checked).filter(Boolean).length})
          </button>
          <button onClick={() => setScreen("camera")}
            style={{ width: "100%", padding: "0.75rem", background: "transparent", color: "rgba(255,255,255,0.55)", fontWeight: 600, fontSize: "0.9rem", border: "1.5px solid rgba(255,255,255,0.15)", borderRadius: "12px", cursor: "pointer" }}>
            📷 {isEs ? "Escanear de nuevo" : "Scan Again"}
          </button>
        </div>
      </div>
    );
  }

  if (screen === "dates") {
    const item = dateItems[dateIndex];
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 10001, background: "#000", display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "center", padding: "2rem 1.25rem", gap: "1.25rem" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem", fontWeight: 600, margin: "0 0 0.35rem" }}>{dateIndex + 1} / {dateItems.length}</p>
          <p style={{ color: "#facc15", fontWeight: 900, fontSize: "1.1rem", margin: 0 }}>📅 {isEs ? "¿Fecha de vencimiento?" : "Expiration Date?"}</p>
          <p style={{ color: "#86efac", fontSize: "0.95rem", fontWeight: 700, margin: "0.5rem 0 0" }}>{item?.name}</p>
        </div>
        <div style={{ position: "relative", borderRadius: "14px", border: "2px solid #facc15", background: "#1a1a1a", overflow: "hidden" }}>
          <div style={{ width: "100%", padding: "1rem", fontSize: pickedDate ? "1.15rem" : "0.95rem", fontWeight: 700, color: pickedDate ? "#fff" : "rgba(255,255,255,0.45)", textAlign: "center", boxSizing: "border-box", lineHeight: 1.4, pointerEvents: "none" }}>
            {pickedDate
              ? (() => { try { return new Date(pickedDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); } catch(e) { return pickedDate; } })()
              : (isEs ? "📅 Toca para seleccionar fecha de vencimiento" : "📅 Tap to select expiration date")}
          </div>
          <input type="date" value={pickedDate} onChange={e => setPickedDate(e.target.value)}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer", zIndex: 1 }} />
        </div>
        <div>
          <button onClick={startGroceryVoice} style={{ width: "100%", padding: "0.85rem", background: groceryVoiceListening || groceryVoiceAwaitND ? "rgba(239,68,68,0.2)" : "rgba(249,115,22,0.15)", color: groceryVoiceListening || groceryVoiceAwaitND ? "#fca5a5" : "#fb923c", fontWeight: 700, fontSize: "1rem", border: `1.5px solid ${groceryVoiceListening || groceryVoiceAwaitND ? "rgba(239,68,68,0.5)" : "rgba(249,115,22,0.4)"}`, borderRadius: "16px", cursor: "pointer" }}>
            {groceryVoiceAwaitND ? "🎤 Say Next or Done..." : groceryVoiceListening ? "🎤 Listening..." : (isEs ? "🎤 Hablar Fecha(s)" : "🎤 Tap to Speak Date(s)")}
          </button>
          {groceryVoiceError && <p style={{ color: "#f87171", fontSize: "0.75rem", textAlign: "center", margin: "0.4rem 0 0", fontWeight: 600 }}>{groceryVoiceError}</p>}
        </div>
        <button onClick={() => { if (groceryNDRef.current) { try { groceryNDRef.current.abort(); } catch(ex) {} groceryNDRef.current = null; } setGroceryVoiceAwaitND(false); const nextIdx = dateIndex + 1; handleSaveDate(); if (nextIdx < dateItems.length) setTimeout(() => startGroceryVoice(), 600); }}
          style={{ width: "100%", padding: "1.1rem", background: "linear-gradient(to bottom,#16a34a,#15803d)", color: "#fff", fontWeight: 900, fontSize: "1.2rem", border: "none", borderRadius: "16px", cursor: "pointer", boxShadow: "0 5px 0 #14532d" }}>
          ✅ {isEs ? "Guardar con Fecha" : "Save with Date"}
        </button>
        <button onClick={handleSkipDate}
          style={{ width: "100%", padding: "1rem", background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.65)", fontWeight: 700, fontSize: "1rem", border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: "16px", cursor: "pointer" }}>
          {isEs ? "Omitir Fecha" : "Skip Date"} →
        </button>
        <button onClick={() => {
          if (groceryNDRef.current) { try { groceryNDRef.current.abort(); } catch(ex) {} groceryNDRef.current = null; }
          setGroceryVoiceAwaitND(false);
          for (let i = dateIndex; i < dateItems.length; i++) {
            const it = dateItems[i];
            onAddItem({ id: Date.now().toString() + i, name: it.name, useByDate: it.date || "", openDate: "", category: it.category || "Other", location: it.location, daysAfterOpening: it.daysAfterOpening || null, storageTip: it.storageTip || "", openedTip: it.openedTip || "" });
          }
          onClose();
        }} style={{ width: "100%", padding: "0.55rem", background: "none", color: "rgba(255,255,255,0.38)", fontWeight: 500, fontSize: "0.78rem", border: "none", cursor: "pointer" }}>
          {isEs ? "Omitir Todas las Fechas →" : "Skip All Dates for Now →"}
        </button>
      </div>
    );
  }

  // screen === "camera"
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 10001, background: "#000", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", background: "rgba(0,0,0,0.8)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "999px", padding: "0.35rem 0.85rem", color: "#fff", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", flexShrink: 0 }}>← {isEs ? "Atrás" : "Back"}</button>
          <span style={{ color: "#fff", fontWeight: 900, fontSize: "1rem" }}>🛒 {isEs ? "Escaneo de Compras" : "Grocery Scan"}</span>
          {sessionCount > 0 && <span style={{ background: "#22c55e", color: "#fff", fontSize: "0.65rem", fontWeight: 700, borderRadius: "999px", padding: "0.15rem 0.55rem" }}>{sessionCount} added</span>}
        </div>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.18)", border: "2px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: "999px", padding: "0.35rem 1rem", fontWeight: 800, cursor: "pointer", fontSize: "0.85rem" }}>
          {isEs ? "Listo ✓" : "Done ✓"}
        </button>
      </div>
      <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#000", minHeight: "80dvh" }}>
        {camError ? (
          <div style={{ color: "#f87171", textAlign: "center", padding: "3rem 1.5rem", fontSize: "0.95rem" }}>{camError}</div>
        ) : (
          <>
            <video ref={videoRef} playsInline muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <canvas ref={canvasRef} style={{ display: "none" }} />
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "85%", height: "65%", border: "2.5px solid #4ade80", borderRadius: "20px", boxShadow: "0 0 0 9999px rgba(0,0,0,0.45), 0 0 24px #4ade8044" }} />
            </div>
            <button onClick={onClose} style={{ position: "absolute", top: "0.75rem", left: "0.75rem", width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", fontWeight: 900, color: "#111", boxShadow: "0 2px 8px rgba(0,0,0,0.4)", pointerEvents: "auto" }}>✕</button>
          </>
        )}
      </div>
      <div style={{ padding: "0.75rem 1rem", paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))", background: "#000", flexShrink: 0 }}>
        <button onClick={capture} disabled={!!camError}
          style={{ width: "100%", padding: "1.2rem", background: camError ? "#333" : "linear-gradient(to bottom,#16a34a,#15803d)", color: "#fff", fontWeight: 900, fontSize: "1.2rem", border: "none", borderRadius: "18px", cursor: camError ? "not-allowed" : "pointer", boxShadow: camError ? "none" : "0 5px 0 #14532d,0 8px 20px rgba(0,0,0,0.3)", opacity: camError ? 0.5 : 1 }}>
          📷 {isEs ? "Capturar y Escanear Todo" : "Capture & Scan All"}
        </button>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", textAlign: "center", margin: "0.5rem 0 0", fontWeight: 600 }}>
          {isEs ? "Apunta a múltiples productos — todos serán detectados" : "Point at multiple items — all will be detected"}
        </p>
      </div>
    </div>
  );
}
