import { pick } from "./i18n";

export const FLOW_KEY = "trackfresh.flow";
export const GUIDED_DONE_KEY = "trackfresh.guided.done";
export const COACH_DONE_KEY = "trackfresh.coach.done";
export const COACH_STEP_KEY = "trackfresh.coach.step";
export const DISCLAIMER_KEY = "tf_disclaimer_seen";
export const WELCOMED_KEY = "trackfresh.welcomed";
export const MKT_SEEN_KEY = "tf_mkt_seen";
export const LAUNCH_TAB_KEY = "tf_launch_tab";
export const ENTER_APP_PARAM = "enter";

export function readLaunchGateFromBrowser() {
  if (typeof window === "undefined") return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const enter = params.get(ENTER_APP_PARAM);
    const forceEnter = enter === "1" || enter === "app" || enter === "tracker";
    const mktSeen = sessionStorage.getItem(MKT_SEEN_KEY) === "1" || forceEnter;
    const onboardingDone = hasCompletedFirstTimeOnboarding();
    const unlocked = sessionStorage.getItem("tf_ok") === "1";
    const launchTab = enter === "tracker" ? "tracker" : null;

    return {
      showMarketing: !(mktSeen || onboardingDone),
      welcomeStep: mktSeen && !onboardingDone ? resolveWelcomeStepAfterMarketing() : 0,
      isUnlocked: unlocked,
      isAdmin: sessionStorage.getItem("tf_admin") === "1",
      launchTab,
      cleanUrl: forceEnter,
      markMktSeen: forceEnter,
    };
  } catch (e) {
    return null;
  }
}

export function hasCompletedFirstTimeOnboarding() {
  if (typeof window === "undefined") return false;
  try {
    const welcomed = localStorage.getItem(WELCOMED_KEY);
    return localStorage.getItem(DISCLAIMER_KEY) === "1" && (welcomed === "1" || welcomed === "true");
  } catch (e) {
    return false;
  }
}

export function resolveWelcomeStepAfterMarketing() {
  try {
    return hasCompletedFirstTimeOnboarding() ? 0 : 1;
  } catch (e) {
    return 1;
  }
}

export const FLOWS = {
  default: "default",
  guided: "guided",
  coach: "coach",
};

export function readFlowFromUrl() {
  if (typeof window === "undefined") return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const flow = params.get("flow");
    if (flow === FLOWS.guided || flow === FLOWS.coach) return flow;
  } catch (e) {}
  return null;
}

export function applyFlowResetIfRequested() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("reset") !== "1") return;
    localStorage.removeItem(GUIDED_DONE_KEY);
    localStorage.removeItem(COACH_DONE_KEY);
    localStorage.removeItem(COACH_STEP_KEY);
    localStorage.removeItem(WELCOMED_KEY);
    localStorage.removeItem(DISCLAIMER_KEY);
    sessionStorage.removeItem(MKT_SEEN_KEY);
  } catch (e) {}
}

export const GUIDED_STEPS = [
  {
    id: "welcome",
    emoji: "🥦",
    title: {
      en: "Welcome to TrackFresh",
      es: "Bienvenido a TrackFresh",
      fr: "Bienvenue sur TrackFresh",
      it: "Benvenuto su TrackFresh",
    },
    body: {
      en: "We'll walk you through the basics in a few quick steps — scan a receipt, set dates, then see your kitchen dashboard.",
      es: "Te guiaremos en unos pocos pasos: escanea un recibo, pon fechas y mira tu panel de cocina.",
      fr: "Nous vous guiderons en quelques étapes : scannez un reçu, ajoutez les dates, puis consultez votre tableau de bord.",
      it: "Ti guideremo in pochi passi: scansiona uno scontrino, imposta le date e guarda la tua cucina.",
    },
    action: { en: "Let's go →", es: "Vamos →", fr: "C'est parti →", it: "Andiamo →" },
  },
  {
    id: "receipt",
    emoji: "🧾",
    title: {
      en: "Step 1 — Scan your receipt",
      es: "Paso 1 — Escanea tu recibo",
      fr: "Étape 1 — Scannez votre reçu",
      it: "Passo 1 — Scansiona lo scontrino",
    },
    body: {
      en: "This is the fastest way to add food. Take a photo of your grocery receipt and TrackFresh reads every item for you.",
      es: "Es la forma más rápida de agregar comida. Toma una foto del recibo y TrackFresh lee cada artículo.",
      fr: "C'est le moyen le plus rapide. Prenez une photo du ticket et TrackFresh lit chaque article.",
      it: "È il modo più veloce. Scatta una foto dello scontrino e TrackFresh legge ogni articolo.",
    },
    action: { en: "Scan my receipt", es: "Escanear mi recibo", fr: "Scanner mon reçu", it: "Scansiona scontrino" },
    skip: { en: "Skip for now", es: "Omitir por ahora", fr: "Passer pour l'instant", it: "Salta per ora" },
  },
  {
    id: "dates",
    emoji: "🎤",
    title: {
      en: "Step 2 — Save the dates",
      es: "Paso 2 — Guarda las fechas",
      fr: "Étape 2 — Enregistrez les dates",
      it: "Passo 2 — Salva le date",
    },
    body: {
      en: "After scanning, speak expiration dates hands-free — or tap the calendar. Say \"Next\" to move on or \"Done\" when finished.",
      es: "Después de escanear, di las fechas de voz — o toca el calendario. Di «Next» o «Done» al terminar.",
      fr: "Après le scan, dictez les dates — ou touchez le calendrier. Dites « Next » ou « Done » à la fin.",
      it: "Dopo la scansione, detta le date — o tocca il calendario. Di « Next » o « Done » alla fine.",
    },
    action: { en: "Got it →", es: "Entendido →", fr: "Compris →", it: "Capito →" },
  },
  {
    id: "home",
    emoji: "🍽️",
    title: {
      en: "Step 3 — Your Kitchen Today",
      es: "Paso 3 — Tu Cocina Hoy",
      fr: "Étape 3 — Votre cuisine aujourd'hui",
      it: "Passo 3 — La tua cucina oggi",
    },
    body: {
      en: "Your home screen shows what needs attention — expiring soon, use today, or all good. It updates as you add food.",
      es: "Tu inicio muestra qué necesita atención — vence pronto, hoy o todo bien. Se actualiza al agregar comida.",
      fr: "L'accueil montre ce qui expire bientôt ou va bien. Tout se met à jour quand vous ajoutez des aliments.",
      it: "La home mostra cosa scade presto o va bene. Si aggiorna man mano che aggiungi cibo.",
    },
    action: { en: "See my kitchen", es: "Ver mi cocina", fr: "Voir ma cuisine", it: "Vedi la mia cucina" },
  },
  {
    id: "done",
    emoji: "🎉",
    title: {
      en: "You're all set!",
      es: "¡Listo!",
      fr: "C'est bon !",
      it: "Tutto pronto!",
    },
    body: {
      en: "Explore Tracker, Recipes, and Shopping whenever you like. Tap ✨ Tour anytime for a full walkthrough.",
      es: "Explora Rastreador, Recetas y Compras cuando quieras. Toca ✨ Tour para un recorrido completo.",
      fr: "Explorez le suivi, les recettes et les courses. Touchez ✨ Tour pour la visite complète.",
      it: "Esplora tracker, ricette e spesa quando vuoi. Tocca ✨ Tour per il tour completo.",
    },
    action: { en: "Start using TrackFresh", es: "Empezar a usar TrackFresh", fr: "Commencer", it: "Inizia" },
  },
];

export function getCoachTip(lang, { trackedCount, pendingDates, coachStep = 0 }) {
  const tips = [
    {
      id: "receipt",
      emoji: "🧾",
      title: {
        en: "Do this next: scan a receipt",
        es: "Siguiente paso: escanea un recibo",
        fr: "Prochaine étape : scannez un reçu",
        it: "Prossimo passo: scansiona uno scontrino",
      },
      body: {
        en: "Snap your grocery receipt — TrackFresh adds every item automatically.",
        es: "Fotografía tu recibo — TrackFresh agrega cada artículo solo.",
        fr: "Photographiez votre ticket — TrackFresh ajoute chaque article.",
        it: "Fotografa lo scontrino — TrackFresh aggiunge ogni articolo.",
      },
      action: {
        en: "Scan receipt →",
        es: "Escanear recibo →",
        fr: "Scanner →",
        it: "Scansiona →",
      },
    },
    {
      id: "dates",
      emoji: "🎤",
      title: {
        en: "Do this next: set expiration dates",
        es: "Siguiente paso: pon las fechas",
        fr: "Prochaine étape : dates de péremption",
        it: "Prossimo passo: imposta le scadenze",
      },
      body: {
        en: "You have items waiting for dates. Use your voice or the calendar.",
        es: "Hay artículos esperando fechas. Usa tu voz o el calendario.",
        fr: "Des articles attendent une date. Utilisez la voix ou le calendrier.",
        it: "Ci sono articoli in attesa di date. Usa la voce o il calendario.",
      },
      action: {
        en: "Set dates →",
        es: "Poner fechas →",
        fr: "Dates →",
        it: "Date →",
      },
    },
    {
      id: "kitchen",
      emoji: "🍽️",
      title: {
        en: "Do this next: check your kitchen",
        es: "Siguiente paso: revisa tu cocina",
        fr: "Prochaine étape : votre cuisine",
        it: "Prossimo passo: controlla la cucina",
      },
      body: {
        en: "Scroll to \"Your Kitchen Today\" — it shows what's fresh and what's expiring soon.",
        es: "Mira «Tu Cocina Hoy» — muestra qué está fresco y qué vence pronto.",
        fr: "Regardez « Votre cuisine » — fraîcheur et dates proches.",
        it: "Guarda « La tua cucina oggi » — cosa è fresco e cosa scade presto.",
      },
      action: {
        en: "Got it →",
        es: "Entendido →",
        fr: "Compris →",
        it: "Capito →",
      },
    },
    {
      id: "recipes",
      emoji: "🍳",
      title: {
        en: "Nice! Try a recipe idea",
        es: "¡Bien! Prueba una receta",
        fr: "Essayez une recette",
        it: "Prova una ricetta",
      },
      body: {
        en: "TrackFresh can suggest meals from what's already in your fridge.",
        es: "TrackFresh sugiere comidas con lo que ya tienes en el refrigerador.",
        fr: "TrackFresh suggère des repas avec ce que vous avez déjà.",
        it: "TrackFresh suggerisce pasti con ciò che hai già in frigo.",
      },
      action: {
        en: "Browse recipes →",
        es: "Ver recetas →",
        fr: "Recettes →",
        it: "Ricette →",
      },
    },
    {
      id: "done",
      emoji: "✅",
      title: {
        en: "You're on a roll!",
        es: "¡Vas muy bien!",
        fr: "Vous êtes lancé !",
        it: "Stai andando alla grande!",
      },
      body: {
        en: "You've got the basics. Tap ✨ Tour anytime if you need help.",
        es: "Ya tienes lo básico. Toca ✨ Tour si necesitas ayuda.",
        fr: "Les bases sont là. Touchez ✨ Tour si besoin.",
        it: "Hai le basi. Tocca ✨ Tour se serve aiuto.",
      },
      action: {
        en: "Dismiss",
        es: "Cerrar",
        fr: "Fermer",
        it: "Chiudi",
      },
    },
  ];

  let index = coachStep;
  if (pendingDates > 0) index = 1;
  else if (trackedCount === 0) index = 0;
  else {
    index = Math.max(coachStep, 2);
    if (index > 4) index = 4;
  }

  return { ...tips[index], stepIndex: index };
}

export function flowLabel(flow, lang) {
  const map = {
    guided: {
      en: "Guided walkthrough (test)",
      es: "Recorrido guiado (prueba)",
      fr: "Visite guidée (test)",
      it: "Guida passo passo (test)",
    },
    coach: {
      en: "One tip at a time (test)",
      es: "Un consejo a la vez (prueba)",
      fr: "Un conseil à la fois (test)",
      it: "Un suggerimento alla volta (test)",
    },
  };
  return pick(lang, map[flow] || { en: "" });
}
