import { FOOD_FACTS } from "./foodFacts";

let shuffledIndices = [];
let cursor = 0;

function shuffleDeck() {
  shuffledIndices = FOOD_FACTS.map((_, i) => i);
  for (let i = shuffledIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
  }
  cursor = 0;
}

/** Next fact index — no repeat until every fact in the deck has been shown once. */
export function nextFoodFactIndex() {
  if (!FOOD_FACTS.length) return 0;
  if (!shuffledIndices.length || cursor >= shuffledIndices.length) shuffleDeck();
  return shuffledIndices[cursor++];
}
