import { SCORE, CARD_FONT_STEPS } from "../config";

/** Score-weighted card picking — avoids repeating the same card */
export function pickCard(words, scores, lastIdx) {
  if (!words.length) return null;
  if (words.length === 1) return 0;
  const weights = words.map((w, i) => {
    const s = scores[w.korean] ?? SCORE.defaultScore;
    const weight = SCORE.max + 1 - s;
    return i === lastIdx ? weight * 0.1 : weight;
  });
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < weights.length; i++) { r -= weights[i]; if (r <= 0) return i; }
  return 0;
}

/** Auto-shrink font size based on text length — never splits mid-word */
export function getCardFontSize(text) {
  const len = (text || "").length;
  for (const step of CARD_FONT_STEPS) {
    if (len <= step.maxLen) return step.size;
  }
  return CARD_FONT_STEPS[CARD_FONT_STEPS.length - 1].size;
}

/** Compute the median of a numeric array */
export function medianOf(arr) {
  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
