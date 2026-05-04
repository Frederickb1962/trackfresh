"use client";

import { useRef, useState, useEffect } from "react";

export default function SmartScanner({ onResult, onError, captureRef, lang }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("starting");
  const [scanError, setScanError] = useState("");
  const detectedRef = useRef(false);
  const readerRef = useRef(null);
  const timerRef = useRef(null);
  const voiceRef = useRef(null);

  const speak = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.8; u.pitch = 1;
    const preferred = ["Google US English", "Samantha", "Zoe"];
    const doSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      const pick = preferred.map(n => voices.find(v => v.name === n)).find(Boolean);
      if (pick) u.voice = pick;
      window.speechSynthesis.speak(u);
    };
    if (window.speechSynthesis.getVoices().length > 0) {
      doSpeak();
    } else {
      window.speechSynthesis.addEventListener('voiceschanged', doSpeak, { once: true });
    }
  };

  const listenForCommand = (onCmd) => {
    console.log("[SCANNER] listenForCommand started");
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    let isAborting = false;
    if (voiceRef.current) {
      isAborting = true;
      try { voiceRef.current.stop(); } catch(e) {}
      voiceRef.current = null;
    }
    isAborting = false;
    const recog = new SR();
    recog.lang = lang === "es" ? "es-MX" : "en-US";
    recog.interimResults = false;
    recog.maxAlternatives = 3;
    voiceRef.current = recog;
    let gotResult = false;
    recog.onresult = (ev) => {
      gotResult = true;
      voiceRef.current = null;
      const t = ev.results[0][0].transcript.toLowerCase().trim();
      console.log("[SCANNER] heard:", t);
      onCmd(t);
    };
    recog.onerror = (e) => {
      console.log("[SCANNER] listenForCommand error:", e.error);
      if (e.error === 'aborted') return;
      setTimeout(() => { if (!isAborting && !gotResult) { console.log("[SCANNER] listenForCommand: restarting after error"); listenForCommand(onCmd); } }, 500);
    };
    recog.onend = () => {
      console.log("[SCANNER] listenForCommand ended, gotResult:", gotResult, "voiceRef===recog:", voiceRef.current === recog);
      setTimeout(() => { if (!isAborting && !gotResult && voiceRef.current === recog) { console.log("[SCANNER] listenForCommand: restarting after onend"); listenForCommand(onCmd); } }, 500);
    };
    recog.start();
  };

  useEffect(() => {
    detectedRef.current = false;
    let stream = null;

    async function captureAndScan() {
      if (detectedRef.current) return;
      detectedRef.current = true;
      setStatus("reading");
      console.log("[SCANNER] captureAndScan: aborting voice, voiceRef.current:", voiceRef.current ? "active" : "null");
      if (voiceRef.current) { try { voiceRef.current.abort(); } catch(e) {} voiceRef.current = null; }
      if (readerRef.current) { try { readerRef.current.reset(); } catch(e) {} readerRef.current = null; }
      console.log("[SCANNER] captureAndScan: voiceRef nulled, proceeding to capture");
      speak(lang === "es" ? "Capturando..." : "Capturing...");
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) { onError("Camera not ready"); return; }
      canvas.width = video.videoWidth || 1920;
      canvas.height = video.videoHeight || 1080;
      canvas.getContext("2d").drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      const base64 = dataUrl.split(",")[1];
      try {
        const res = await fetch("/api/scan-smart", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageData: base64, mediaType: "image/jpeg" })
        });
        const data = await res.json();
        if (data.items && data.items.length > 0) { onResult({ ...data.items[0], _allItems: data.items, _scanType: data.type, source: data.items[0].source || "label" }); }
        else if (data.item) { onResult({ ...data.item, source: data.item.source || "label" }); }
        else { onError(data.error || "Could not read. Say capture to try again."); }
      } catch (e) { onError("Scan failed: " + e.message); }
    }

    function startListening() {
      setStatus("listening");
      listenForCommand((cmd) => {
        if (cmd.includes("capture") || cmd.includes("captura") || cmd.includes("photo") || cmd.includes("foto") || cmd.includes("scan") || cmd.includes("escanea")) {
          captureAndScan();
        } else if (cmd.includes("stop") || cmd.includes("done") || cmd.includes("listo") || cmd.includes("detener") || cmd.includes("parar")) {
          onError("__done__");
        } else {
          speak(lang === "es" ? "Di capturar cuando estés listo." : "Say 'capture' when you're ready.");
          startListening();
        }
      });
    }

    async function start() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 }, advanced: [{ torch: false }] }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute("playsinline", "true");
          await videoRef.current.play();
        }
        setStatus("scanning");
        // Try barcode detection
        try {
          const { BrowserMultiFormatReader } = await import("@zxing/library");
          readerRef.current = new BrowserMultiFormatReader();
          readerRef.current.decodeFromStream(stream, videoRef.current, async (result) => {
            if (result && !detectedRef.current) {
              detectedRef.current = true;
              if (voiceRef.current) { try { voiceRef.current.abort(); } catch(e) {} }
              if (readerRef.current) { try { readerRef.current.reset(); } catch(e) {} readerRef.current = null; }
              setStatus("barcode_found");
              speak(lang === "es" ? "Código de barras encontrado." : "Barcode found.");
              try {
                const res = await fetch("/api/scan-barcode", {
                  method: "POST", headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ barcode: result.getText() })
                });
                const data = await res.json();
                if (data.item) { onResult({ ...data.item, barcode: result.getText(), source: "barcode" }); }
                else { detectedRef.current = false; speak(lang === "es" ? "No encontrado. Di capturar para la etiqueta." : "Not found. Say capture to scan the label."); startListening(); }
              } catch(e) { detectedRef.current = false; startListening(); }
            }
          });
        } catch(e) { /* barcode lib failed */ }
        // Prompt user with voice
        timerRef.current = setTimeout(() => {
          if (!detectedRef.current) {
            speak(lang === "es" ? "Apunta a tu artículo. Di capturar cuando estés listo." : "Point at your item. Say 'capture' when you're ready.");
            startListening();
          }
        }, 500);
        if (captureRef) captureRef.current = () => { if (!detectedRef.current) { if (voiceRef.current) { try { voiceRef.current.abort(); } catch(e) {} } captureAndScan(); } };
      } catch (e) { setScanError("Camera access denied. Please allow camera access."); }
    }
    start();
    return () => {
      console.log("[SCANNER] CLEANUP: SmartScanner unmounting, voiceRef.current:", voiceRef.current ? "active" : "null");
      if (readerRef.current) { try { readerRef.current.reset(); } catch(e) {} readerRef.current = null; }
      if (timerRef.current) clearTimeout(timerRef.current);
      if (voiceRef.current) { console.log("[SCANNER] CLEANUP: aborting voiceRef"); try { voiceRef.current.abort(); } catch(e) {} }
      console.log("[SCANNER] CLEANUP: cancelling speechSynthesis");
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      if (videoRef.current && videoRef.current.srcObject) { videoRef.current.srcObject.getTracks().forEach(t => t.stop()); videoRef.current.srcObject = null; }
    };
  }, []);

  return (
    <div className="relative">
      {scanError ? <p className="text-sm text-red-600 p-4">{scanError}</p> : (
        <div className="relative overflow-hidden rounded-xl bg-black">
          <video ref={videoRef} id="smartScannerVideo" playsInline muted className="w-full rounded-xl" style={{ height: "420px", objectFit: "cover" }} />
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {(status === "scanning" || status === "listening") && <div style={{border:"2px solid #4ade80",borderRadius:"12px",width:"280px",height:"200px",opacity:0.7}} />}
            {status === "reading" && <div style={{border:"2px solid #fb923c",borderRadius:"12px",width:"280px",height:"200px",opacity:0.8}} />}
            {status === "barcode_found" && <div style={{border:"3px solid #22c55e",borderRadius:"12px",width:"280px",height:"200px",background:"rgba(34,197,94,0.15)"}} />}
            {status === "listening" && <div style={{position:"absolute",bottom:"80px",background:"rgba(239,68,68,0.9)",borderRadius:"999px",padding:"0.4rem 1rem",display:"flex",alignItems:"center",gap:"0.4rem"}}><span style={{fontSize:"1rem"}}>🎤</span><span style={{color:"#fff",fontSize:"0.75rem",fontWeight:700}}>Listening...</span></div>}
          </div>
          <p className="absolute bottom-0 left-0 right-0 text-center text-xs text-white py-2 font-bold" style={{background:"rgba(0,0,0,0.6)"}}>
            {status === "starting" && "Starting camera..."}
            {status === "scanning" && (lang === "es" ? "Preparando..." : "Getting ready...")}
            {status === "listening" && (lang === "es" ? "🎤 Di \"capturar\" cuando estés listo" : "🎤 Say \"capture\" when ready")}
            {status === "barcode_found" && "✅ Barcode found!"}
            {status === "reading" && (lang === "es" ? "📖 IA leyendo..." : "📖 AI reading...")}
          </p>
          {(status === "scanning" || status === "listening") && (
            <button onClick={() => { if (captureRef && captureRef.current) captureRef.current(); }}
              style={{position:"absolute",bottom:"44px",left:"50%",transform:"translateX(-50%)",background:"linear-gradient(to bottom,#F0C070,#E8A63C)",color:"#000",border:"none",borderRadius:"24px",padding:"0.65rem 1.25rem",fontWeight:800,fontSize:"0.8rem",cursor:"pointer",whiteSpace:"nowrap",boxShadow:"0 4px 0 #8C5A10,0 6px 16px rgba(0,0,0,0.3)",opacity:0.85}}>
              📸 {lang === "es" ? "o toca aquí" : "or tap here"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
