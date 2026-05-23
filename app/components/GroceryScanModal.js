"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  finalizeProduceScannerItems,
  conservativeProduceShelfDays,
  finalizeProduceScannerItem,
  formatInGeneralInstruction,
  isProduceCategory,
} from "../lib/aiProduceNormalize";
import { LoadingFoodFact } from "./ui/LoadingFoodFact";
import { compressImageFile } from "../lib/compressImage";
import { formatAiError } from "../lib/formatAiError";

const glassBtnLayout = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontWeight: 700,
  borderRadius: "16px",
  cursor: "pointer",
  WebkitTapHighlightColor: "transparent",
};

/** Match desktop split layout breakpoint (Tailwind lg). */
const DESKTOP_MIN_PX = 1024;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(min-width: ${DESKTOP_MIN_PX}px)`).matches;
  });
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_MIN_PX}px)`);
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

/**
 * Matches parent VoiceDateNextHint — only `tf-voice-date-hint` / `tf-voice-date-hint__kw` (globals.css).
 * English string is fixed copy for downstream voice queue parity.
 */
function VoiceQueueHint({ lang }) {
  return (
    <p className="tf-voice-date-hint" style={{ maxWidth: "100%", marginTop: "0.5rem", marginBottom: "0.85rem" }}>
      {lang === "es" ? (
        <>
          Di la fecha y di <span className="tf-voice-date-hint__kw">NEXT</span>. Di <span className="tf-voice-date-hint__kw">DONE</span> cuando hayas terminado.
        </>
      ) : (
        <>
          Speak date and say <span className="tf-voice-date-hint__kw">NEXT</span>. Say <span className="tf-voice-date-hint__kw">DONE</span> when finished.
        </>
      )}
    </p>
  );
}

/** Produce verification line: never “after opening”; prefer range copy, else conservativeProduceShelfDays (lesser fallback). */
function produceInGeneralMicrocopy(item, lang) {
  if (!isProduceCategory(item?.category)) return null;
  const fin = finalizeProduceScannerItem({ ...item });
  const ranged = formatInGeneralInstruction(fin, lang);
  if (ranged) return ranged;
  const days = conservativeProduceShelfDays(fin);
  if (days == null) return null;
  return lang === "es"
    ? `En general: usar en ~${days} días (estimación conservadora)`
    : `In General: use within ~${days} days (conservative estimate)`;
}

function suggestedExpiryISO(item) {
  const fin = finalizeProduceScannerItem({ ...item });
  const iso = typeof fin.date === "string" && fin.date.trim() ? fin.date.trim() : "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const days = conservativeProduceShelfDays(fin);
  if (days == null) return "";
  const d = new Date();
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/**
 * Smart Scan (grocery): camera (mobile) or drag‑drop/file (desktop) → POST /api/scan-smart → onEnqueue(items).
 */
export default function GroceryScanModal({ onClose, lang, scanTitle, onEnqueue }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);
  const mountedRef = useRef(true);
  const isEs = lang === "es";

  const isDesktop = useIsDesktop();
  const [screen, setScreen] = useState("camera");
  const [camError, setCamError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [parsedItems, setParsedItems] = useState([]);
  const [desktopBusy, setDesktopBusy] = useState(false);
  const [desktopError, setDesktopError] = useState("");

  const playBeep = (freq, dur, vol = 0.28) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const play = () => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = "sine";
        gain.gain.setValueAtTime(vol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + dur);
      };
      if (ctx.state === "suspended") {
        ctx.resume().then(play);
      } else {
        play();
      }
    } catch (e) {}
  };

  const playShutter = () => playBeep(1000, 0.05);
  const playError = () => {
    playBeep(400, 0.12);
    setTimeout(() => playBeep(300, 0.18), 200);
  };

  const runSmartScan = useCallback(
    async (base64, mediaType = "image/jpeg") => {
      if (isDesktop) {
        setDesktopError("");
        setDesktopBusy(true);
      } else {
        setScreen("scanning");
      }
      try {
        const res = await fetch("/api/scan-smart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageData: base64, mediaType: mediaType || "image/jpeg" }),
        });
        if (!mountedRef.current) return;
        const data = await res.json();
        if (!res.ok || data.error) {
          playError();
          const msg = formatAiError(data.error, lang);
          if (isDesktop) {
            setDesktopError(msg);
            setParsedItems([]);
          } else {
            setErrorMsg(msg);
            setScreen("error");
          }
          return;
        }
        const raw = data.items || (data.item ? [data.item] : []);
        const items = finalizeProduceScannerItems(Array.isArray(raw) ? raw : []);
        if (!items.length) {
          playError();
          const msg = isEs ? "No se detectaron artículos. Intenta de nuevo." : "No items detected. Try again.";
          if (isDesktop) {
            setDesktopError(msg);
            setParsedItems([]);
          } else {
            setErrorMsg(msg);
            setScreen("error");
          }
          return;
        }
        if (isDesktop) {
          setParsedItems(items);
        } else {
          onEnqueue(items);
        }
      } catch (e) {
        if (!mountedRef.current) return;
        playError();
        const msg = formatAiError(e.message, lang);
        if (isDesktop) {
          setDesktopError(msg);
          setParsedItems([]);
        } else {
          setErrorMsg(msg);
          setScreen("error");
        }
      } finally {
        if (mountedRef.current && isDesktop) setDesktopBusy(false);
      }
    },
    [isDesktop, isEs, lang, onEnqueue]
  );

  const processImageFile = useCallback(
    async (file) => {
      if (!file || !String(file.type || "").startsWith("image/")) {
        const msg = isEs ? "Elige una imagen (JPG, PNG, WEBP)." : "Please choose an image file (JPG, PNG, WEBP).";
        setDesktopError(msg);
        return;
      }
      try {
        const { base64, mimeType } = await compressImageFile(file);
        runSmartScan(base64, mimeType);
      } catch {
        setDesktopError(isEs ? "No se pudo procesar la imagen." : "Could not process image.");
      }
    },
    [isEs, runSmartScan]
  );

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    /** Mobile / narrow: keep existing camera lifecycle unchanged. Desktop: skip webcam to avoid needless permission prompts. */
    if (isDesktop) return;
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } },
        });
        if (!mountedRef.current) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute("playsinline", "true");
          await videoRef.current.play();
        }
      } catch (e) {
        if (mountedRef.current) setCamError(isEs ? "Acceso a cámara denegado." : "Camera access denied.");
      }
    }
    startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [isDesktop, isEs]);

  const capture = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    playShutter();
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const base64 = canvas.toDataURL("image/jpeg", 0.85).split(",")[1];
    await runSmartScan(base64, "image/jpeg");
  };

  /** ─── Mobile fullscreen: scanning ─── */
  if (screen === "scanning" && !isDesktop) {
    return (
      <div
        className="tf-premium-bg"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10001,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          className="tf-glass-scan"
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            ...glassBtnLayout,
            padding: "0.4rem 1rem",
            fontSize: "0.9rem",
          }}
        >
          ← {isEs ? "Atrás" : "Back"}
        </button>
        <div
          style={{
            width: 56,
            height: 56,
            border: "5px solid #4ade80",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 0.9s linear infinite",
          }}
        />
        <p style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem", margin: 0 }}>
          {isEs ? "Analizando imagen..." : "Analyzing image..."}
        </p>
        <LoadingFoodFact lang={lang} style={{ padding: "0 1.25rem" }} />
      </div>
    );
  }

  /** ─── Mobile fullscreen: error ─── */
  if (screen === "error" && !isDesktop) {
    return (
      <div
        className="tf-premium-bg"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10001,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          padding: "2rem",
        }}
      >
        <span style={{ fontSize: "3rem" }}>❌</span>
        <p style={{ color: "#f87171", fontWeight: 700, fontSize: "1.1rem", textAlign: "center", margin: 0 }}>
          {errorMsg || (isEs ? "Error al escanear" : "Scan error")}
        </p>
        <button
          type="button"
          onClick={() => setScreen("camera")}
          className="tf-glass-scan"
          style={{
            padding: "0.9rem 2rem",
            ...glassBtnLayout,
            fontSize: "1rem",
          }}
        >
          {isEs ? "Intentar de nuevo" : "Try Again"}
        </button>
        <button type="button" onClick={onClose} className="tf-glass-scan" style={{ padding: "0.7rem 1.5rem", ...glassBtnLayout, fontSize: "0.9rem" }}>
          {isEs ? "Cerrar" : "Close"}
        </button>
      </div>
    );
  }

  /** ─── Desktop dashboard panel ─── */
  if (isDesktop) {
    const title = scanTitle ?? (isEs ? "Escaneo Inteligente" : "Smart Scan");
    const dropLabel = isEs ? "Arrastra y suelta recibos/fotos o haz clic para buscar" : "Drag & Drop Receipts/Photos or Click to Browse";
    return (
      <div className="tf-premium-bg" style={{ position: "fixed", inset: 0, zIndex: 10001, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", overflow: "auto" }}>
        <div
          style={{
            width: "min(90vw, 1000px)",
            maxWidth: "100%",
            maxHeight: "min(92vh, 880px)",
            minHeight: "min(78vh, 720px)",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid rgba(251,191,36,0.45)",
            boxShadow:
              "0 0 0 1px rgba(249,115,22,0.35), 0 0 48px rgba(251,146,60,0.42), 0 0 80px rgba(234,88,12,0.22), 0 24px 56px rgba(0,0,0,0.55)",
            background: "linear-gradient(160deg,rgba(6,46,38,0.92),rgba(3,26,22,0.96))",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem 1rem",
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              flexShrink: 0,
              borderBottom: "0.5px solid rgba(255,255,255,0.28)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <button type="button" onClick={onClose} className="tf-glass-scan" style={{ ...glassBtnLayout, padding: "0.35rem 0.85rem", fontSize: "0.85rem" }}>
                ← {isEs ? "Atrás" : "Back"}
              </button>
              <span
                style={{
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: "1.05rem",
                  textShadow: "0 0 18px rgba(249,115,22,0.85), 0 0 6px rgba(251,146,60,0.5)",
                  letterSpacing: "0.02em",
                }}
              >
                🛒 {title}
              </span>
            </div>
            <button type="button" onClick={onClose} className="tf-glass-scan" style={{ ...glassBtnLayout, padding: "0.35rem 1rem", fontSize: "0.85rem" }}>
              ✕ {isEs ? "Cerrar" : "Close"}
            </button>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "stretch",
              gap: "1rem",
              padding: "1rem",
              minHeight: 0,
              boxSizing: "border-box",
            }}
          >
            {/* Left — drag & drop (same JSON body as mobile: imageData + mediaType → /api/scan-smart) */}
            <div
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (desktopBusy) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              aria-label={dropLabel}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (desktopBusy) return;
                const f = e.dataTransfer.files && e.dataTransfer.files[0];
                if (f) processImageFile(f);
              }}
              onClick={() => {
                if (desktopBusy) return;
                fileInputRef.current?.click();
              }}
              style={{
                flex: "1 1 42%",
                minWidth: 0,
                alignSelf: "stretch",
                position: "relative",
                background: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "2px dashed #f97316",
                borderRadius: "12px",
                cursor: desktopBusy ? "wait" : "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                padding: "1.75rem 1.25rem",
                opacity: desktopBusy ? 0.75 : 1,
                pointerEvents: desktopBusy ? "none" : "auto",
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) processImageFile(f);
                  e.target.value = "";
                }}
              />
              <span style={{ fontSize: "2.75rem", lineHeight: 1 }}>📎</span>
              <p
                style={{
                  margin: 0,
                  color: "#ffedd5",
                  fontWeight: 800,
                  fontSize: "1rem",
                  textAlign: "center",
                  lineHeight: 1.35,
                  textShadow: "0 0 20px rgba(249,115,22,0.45)",
                }}
              >
                {dropLabel}
              </p>
              <p style={{ margin: 0, color: "rgba(255,237,213,0.65)", fontSize: "0.78rem", textAlign: "center", fontWeight: 600 }}>
                {isEs ? "Misma IA que Capturar en móvil (API /scan-smart)" : "Same AI endpoint as mobile “Capture & Scan All”"}
              </p>
            </div>

            {/* Right — verification panel */}
            <div
              style={{
                flex: "1 1 58%",
                minWidth: 0,
                alignSelf: "stretch",
                position: "relative",
                minHeight: "min(50vh, 420px)",
                borderRadius: "14px",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "0.5px solid rgba(255,255,255,0.3)",
                padding: "1rem 1rem 1.1rem",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {desktopBusy && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 2,
                    height: "100%",
                    background: "rgba(4, 24, 20, 0.72)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "1rem",
                    borderRadius: "14px",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      border: "4px solid #4ade80",
                      borderTopColor: "transparent",
                      borderRadius: "50%",
                      animation: "spin 0.9s linear infinite",
                    }}
                  />
                  <p style={{ color: "#fff", fontWeight: 700, textShadow: "0 0 12px rgba(249,115,22,0.5)", margin: 0 }}>{isEs ? "Analizando imagen..." : "Analyzing image..."}</p>
                  <LoadingFoodFact lang={lang} style={{ padding: "0 1rem" }} />
                </div>
              )}

              <h3
                style={{
                  margin: "0 0 0.25rem",
                  fontSize: "0.92rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#fff",
                  textShadow: "0 0 14px rgba(249,115,22,0.75)",
                }}
              >
                {isEs ? "Verificación — próximo paso" : "Verification — next step"}
              </h3>
              <p style={{ margin: "0 0 0.35rem", fontSize: "0.82rem", color: "rgba(255,255,255,0.76)", fontWeight: 600, lineHeight: 1.4 }}>
                {isEs
                  ? "Al continuar se abrirá la cola de fechas por voz. Usa tu calendario o el micrófono igual que en el teléfono."
                  : "When you continue, the voice date queue opens. Use the calendar picker or mic exactly like on your phone."}
              </p>
              <VoiceQueueHint lang={lang} />

              {desktopError ? (
                <p style={{ color: "#fca5a5", fontWeight: 700, fontSize: "0.88rem", margin: "0.25rem 0 0.75rem" }}>{desktopError}</p>
              ) : null}

              <div style={{ flex: 1, minHeight: 0, overflowY: "auto", marginBottom: "0.75rem" }}>
                {!parsedItems.length && !desktopError && !desktopBusy ? (
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", margin: "0.5rem 0 0" }}>
                    {isEs ? "Aún no hay artículos. Suelta o elige una imagen a la izquierda." : "No parsed items yet. Drop or browse for an image on the left."}
                  </p>
                ) : null}
                {parsedItems.length > 0 && (
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                    {parsedItems.map((item, idx) => {
                      const name = item.name || (isEs ? "Artículo" : "Item");
                      const brand = item.brand ? ` (${item.brand})` : "";
                      const sug = suggestedExpiryISO(item);
                      const inGeneralLine = produceInGeneralMicrocopy(item, lang);
                      const source =
                        item.date && String(item.date).trim().match(/^\d{4}-\d{2}-\d{2}$/)
                          ? isEs
                            ? "fecha en imagen"
                            : "from photo"
                          : isEs
                            ? "estimada (conservador)"
                            : "estimated (conservative)";
                      const nonProduceOpened =
                        !isProduceCategory(item.category) && item.openedTip ? String(item.openedTip) : "";
                      return (
                        <li
                          key={item.id ?? `${name}-${idx}`}
                          style={{
                            borderRadius: "10px",
                            padding: "0.55rem 0.65rem",
                            background: "rgba(0,0,0,0.25)",
                            border: "1px solid rgba(255,255,255,0.12)",
                          }}
                        >
                          <div style={{ fontWeight: 800, color: "#f1f5f9", fontSize: "0.92rem", textShadow: "0 1px 0 rgba(0,0,0,0.4)" }}>
                            {name}
                            <span style={{ fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>{brand}</span>
                          </div>
                          <div style={{ marginTop: "0.25rem", fontSize: "0.78rem", color: "#86efac", fontWeight: 600 }}>
                            {item.category || "Other"} · {item.location || "Fridge"}
                          </div>
                          <div style={{ marginTop: "0.35rem", fontSize: "0.8rem", fontWeight: 700, color: "#fdba74" }}>
                            ≈{" "}
                            {sug
                              ? sug
                              : isEs
                                ? "fecha por confirmar"
                                : "confirm date"}
                            <span style={{ fontWeight: 600, opacity: 0.85 }}>
                              {" · "}
                              {source}
                            </span>
                          </div>
                          {inGeneralLine ? (
                            <div style={{ marginTop: "0.35rem", fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,200,120,0.95)" }}>🥬 {inGeneralLine}</div>
                          ) : nonProduceOpened ? (
                            <div style={{ marginTop: "0.35rem", fontSize: "0.74rem", fontWeight: 600, color: "rgba(254,215,170,0.95)" }}>📂 {nonProduceOpened}</div>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
                <button
                  type="button"
                  disabled={!parsedItems.length || desktopBusy}
                  className="tf-glass-scan"
                  style={{
                    ...glassBtnLayout,
                    padding: "0.85rem 1.25rem",
                    fontSize: "0.95rem",
                    fontWeight: 900,
                    opacity: !parsedItems.length || desktopBusy ? 0.5 : 1,
                    cursor: !parsedItems.length || desktopBusy ? "not-allowed" : "pointer",
                    flex: "1 1 auto",
                    minWidth: "200px",
                    boxShadow: parsedItems.length ? "0 0 18px rgba(249,115,22,0.35)" : "none",
                  }}
                  onClick={() => {
                    if (!parsedItems.length) return;
                    /* Parent: apiItems.map(mapScanApiItemToPendingRow) → enqueue pending voice queue */
                    onEnqueue(parsedItems);
                  }}
                >
                  {isEs ? "Continuar → cola de voz / fechas" : "Continue → voice date queue"}
                </button>
                <button
                  type="button"
                  disabled={!parsedItems.length || desktopBusy}
                  className="tf-glass-primary-btn"
                  style={{ padding: "0.65rem 1rem", fontSize: "0.85rem", fontWeight: 700, opacity: !parsedItems.length ? 0.45 : 1 }}
                  onClick={() => {
                    setParsedItems([]);
                    setDesktopError("");
                  }}
                >
                  {isEs ? "Borrar resultados" : "Clear results"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /** ─── Mobile-only (unchanged UX): fullscreen camera ─── */
  return (
    <div className="tf-premium-bg" style={{ position: "fixed", inset: 0, zIndex: 10001, display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.75rem 1rem",
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          flexShrink: 0,
          borderBottom: "0.5px solid rgba(255,255,255,0.35)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button type="button" onClick={onClose} className="tf-glass-scan" style={{ ...glassBtnLayout, padding: "0.35rem 0.85rem", fontSize: "0.85rem", flexShrink: 0 }}>
            ← {isEs ? "Atrás" : "Back"}
          </button>
          <span style={{ color: "#d1fae5", fontWeight: 800, fontSize: "1rem", textShadow: "0 0 14px rgba(134,239,172,0.25)" }}>
            🛒 {scanTitle ?? (isEs ? "Escaneo Inteligente" : "Smart Scan")}
          </span>
        </div>
        <button type="button" onClick={onClose} className="tf-glass-scan" style={{ ...glassBtnLayout, padding: "0.35rem 1rem", fontSize: "0.85rem" }}>
          ✕ {isEs ? "Cerrar" : "Close"}
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
              <div
                style={{
                  width: "85%",
                  height: "65%",
                  border: "2.5px solid #4ade80",
                  borderRadius: "20px",
                  boxShadow: "0 0 0 9999px rgba(0,0,0,0.45), 0 0 24px #4ade8044",
                }}
              />
            </div>
          </>
        )}
      </div>
      <div
        style={{
          padding: "0.75rem 1rem",
          paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          flexShrink: 0,
          borderTop: "0.5px solid rgba(255,255,255,0.35)",
        }}
      >
        <button type="button" onClick={capture} disabled={!!camError} className="tf-glass-scan" style={{ width: "100%", padding: "1.2rem", ...glassBtnLayout, fontSize: "1.2rem", fontWeight: 900, opacity: camError ? 0.45 : 1, cursor: camError ? "not-allowed" : "pointer" }}>
          📷 {isEs ? "Capturar y Escanear Todo" : "Capture & Scan All"}
        </button>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.7rem", textAlign: "center", margin: "0.5rem 0 0", fontWeight: 600 }}>
          {isEs ? "Los artículos van a la cola de voz (fecha → Next / Done)" : "Items go to the voice queue (date → Next / Done)"}
        </p>
      </div>
    </div>
  );
}
