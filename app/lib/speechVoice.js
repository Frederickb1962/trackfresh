/** Natural female TTS for expiration-date voice and in-app prompts. */

const FEMALE_HINTS = {
  en: ["zoe", "ava", "samantha", "karen", "victoria", "moira", "tessa", "fiona", "allison", "nicky", "serena", "susan", "kate", "zira", "jenny", "joanna", "sara", "female"],
  es: ["paulina", "monica", "helena", "lucia", "paloma", "soledad", "female", "mujer"],
  fr: ["amelie", "virginie", "aurelie", "marie", "hortense", "female", "femme"],
  it: ["alice", "federica", "elsa", "female", "donna"],
};

const MALE_HINTS = ["daniel", "alex", "fred", "tom", "lee", "aaron", "ralph", "bruce", "david", "james", "mark", "male", "thomas", "gordon", "nathan"];

let voicesCache = null;

function getVoicesList() {
  if (typeof window === "undefined" || !window.speechSynthesis) return [];
  const list = window.speechSynthesis.getVoices();
  if (list.length) voicesCache = list;
  return voicesCache || list;
}

function scoreVoice(voice, locale) {
  const name = voice.name.toLowerCase();
  const vl = voice.lang.toLowerCase();
  const localeLower = locale.toLowerCase();
  const prefix = localeLower.split("-")[0];

  if (!vl.startsWith(prefix) && !vl.startsWith(localeLower)) return -1;

  let score = vl.startsWith(localeLower) ? 20 : 10;

  if (/premium|enhanced|neural|natural|wavenet|siri/i.test(name)) score += 55;
  if (voice.localService) score += 12;

  const hints = FEMALE_HINTS[prefix] || FEMALE_HINTS.en;
  for (let i = 0; i < hints.length; i++) {
    if (name.includes(hints[i])) {
      score += 120 - i * 2;
      break;
    }
  }

  if (MALE_HINTS.some((m) => name.includes(m))) score -= 90;

  return score;
}

export function pickPreferredFemaleVoice(locale = "en-US") {
  const voices = getVoicesList();
  if (!voices.length) return null;

  let best = null;
  let bestScore = -1;
  for (const v of voices) {
    const s = scoreVoice(v, locale);
    if (s > bestScore) {
      bestScore = s;
      best = v;
    }
  }
  return best;
}

export function warmSpeechVoices() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  getVoicesList();
  const refresh = () => {
    voicesCache = window.speechSynthesis.getVoices();
  };
  window.speechSynthesis.addEventListener("voiceschanged", refresh);
  refresh();
}

/**
 * @param {string} text
 * @param {{ lang?: string, onDone?: () => void, rate?: number, pitch?: number }} [options]
 */
export function speakWithVoice(text, options = {}) {
  const { lang = "en-US", onDone, rate = 0.94, pitch = 1.06 } = options;

  if (typeof window === "undefined" || !window.speechSynthesis) {
    if (onDone) setTimeout(onDone, 300);
    return null;
  }

  window.speechSynthesis.cancel();

  const doSpeak = () => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = rate;
    u.pitch = pitch;
    u.volume = 1;
    const voice = pickPreferredFemaleVoice(lang);
    if (voice) u.voice = voice;

    if (onDone) {
      const ms = Math.max(1600, (text.split(/\s+/).length / 2.15) * 1000 + 750);
      let fired = false;
      const fire = () => {
        if (!fired) {
          fired = true;
          onDone();
        }
      };
      u.onend = fire;
      u.onerror = fire;
      setTimeout(fire, ms);
    }

    window.speechSynthesis.speak(u);
    return u;
  };

  if (getVoicesList().length > 0) return doSpeak();

  const onVoices = () => {
    window.speechSynthesis.removeEventListener("voiceschanged", onVoices);
    doSpeak();
  };
  window.speechSynthesis.addEventListener("voiceschanged", onVoices);
  window.speechSynthesis.getVoices();
  return null;
}
