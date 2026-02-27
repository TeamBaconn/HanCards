/**
 * ═══════════════════════════════════════════════════════════════
 * HanCards Configuration
 * ═══════════════════════════════════════════════════════════════
 *
 * HOW TO ADD A NEW LANGUAGE:
 *
 * 1. Create locale file:  src/locales/<code>.json   (copy en.json as template)
 * 2. Create word-pack CSVs in  public/packs/  (e.g.  tc3-ja.csv)
 * 3. Register the language below in LANGUAGES array:
 *      { code: "ja", label: "日本語", flag: "🇯🇵",
 *        color: "#dc3545", borderColor: "#b02a37",
 *        packs: ["tc3-ja.csv", "tc4-ja.csv"],
 *        ttsLang: "ja-JP",
 *        ttsSample: "こんにちは、テストです。" }
 * 4. Import the locale in  src/i18n.js  and add it to `resources`.
 * 5. Done — it appears in the first-visit picker and language switcher.
 */

/* ── Storage keys ── */
export const STORAGE_KEY        = "HANCARDS";
export const LANG_KEY           = "HANCARDS_LANG";
export const VOICE_SETTINGS_KEY = "HANCARDS_VOICE";

/* ── Quiz scoring and settings ── */


export const QUIZ_DELAY = {
  correct: 2500,
  wrong: 4000,
};

/* ── Scoring ── */
export const SCORE = {
  /** Starting score for every new word (0-100) */
  defaultScore: 0,
  /** Points added when user skips without revealing the answer (knows it) */
  skipBonus: 5,
  /** Points subtracted when user reveals the answer (needs practice) */
  flipPenalty: 0,
  /** Points added for correct quiz answer */
  quizBonus: 10,
  /** Points subtracted for wrong quiz answer */
  quizPenalty: 10,
  /** Minimum possible score */
  min: 0,
  /** Maximum possible score */
  max: 100,
};

/* ── Score color thresholds ── */
export const SCORE_COLORS = {
  low:    { max: 33, color: "#ff5566" },   // Learning
  mid:    { max: 66, color: "#ffb830" },   // Familiar
  high:   { max: 100, color: "#58cc02" },  // Mastered
};

export function scoreColor(score) {
  if (score <= SCORE_COLORS.low.max)  return SCORE_COLORS.low.color;
  if (score <= SCORE_COLORS.mid.max)  return SCORE_COLORS.mid.color;
  return SCORE_COLORS.high.color;
}

/* ── Languages ────────────────────────────────────────────────
   Each entry drives:
     • First-visit picker button (flag, color, label)
     • Floating language-cycle button
     • Which CSVs to auto-import on first visit
   ───────────────────────────────────────────────────────────── */
export const LANGUAGES = [
  {
    code: "vi",
    label: "Tiếng Việt",
    flag: "🇻🇳",
    color: "#ff160a",
    borderColor: "#b01e18",
    packs: ["sc1-vn.csv", "sc2-vn.csv", "tc3-vn.csv", "tc4-vn.csv"],
    /** BCP-47 tag used for text-to-speech on the translation side */
    ttsLang: "vi-VN",
    /** Sample sentence spoken in the voice-settings preview */
    ttsSample: "Học tiếng Hàn cùng Hancards",
  },
  {
    code: "en",
    label: "English",
    flag: "🇬🇧",
    color: "#1cb0f6",
    borderColor: "#1590c8",
    packs: ["sc1-en.csv", "sc2-en.csv", "tc3-en.csv", "tc4-en.csv"],
    ttsLang: "en-US",
    ttsSample: "Learn Korean with Hancards",
  },
];

/** BCP-47 tag and preview sample for the Korean (target) side of every card */
export const KOREAN_TTS_LANG   = "ko-KR";
export const KOREAN_TTS_SAMPLE = "한카드와 함께 한국어를 배우세요.";

/* ── Auto-speak settings ─────────────────────────────────── */
export const AUTO_SPEAK = {
  /** Speech rate (1 = normal; user can override in voice settings) */
  rate: 0.9,
  /** Speech pitch (1 = normal; user can override in voice settings) */
  pitch: 1.0,
  /** ms to wait before speaking the front of a new card */
  startDelay: 400,
  /** ms to wait after front speech before flipping */
  postFrontDelay: 600,
  /** ms to wait after visual flip before speaking the back */
  preBackDelay: 350,
  /** ms to wait after back speech before advancing to next card */
  postBackDelay: 1200,
};

/** Ordered list of language codes for the floating cycle button */
export const LANG_CYCLE = LANGUAGES.map(l => l.code);

/** Lookup helpers */
export const LANG_MAP = Object.fromEntries(LANGUAGES.map(l => [l.code, l]));

/* ── Card font sizing ─────────────────────────────────────── */
export const CARD_FONT_STEPS = [
  { maxLen: 3,  size: "6rem" },
  { maxLen: 6,  size: "5rem" },
  { maxLen: 10, size: "4rem" },
  { maxLen: 18, size: "3rem" },
  { maxLen: 30, size: "2.2rem" },
  { maxLen: 50, size: "1.6rem" },
  { maxLen: Infinity, size: "1.2rem" },
];

export const CSV_HINT = `Example:

pack_category,pack_name,korean,translation
TC3 🇻🇳,B1,학기,semester
TC3 🇻🇳,B1,과목,subject`;
