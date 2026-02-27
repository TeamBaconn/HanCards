import { STORAGE_KEY, LANG_MAP } from "../config";

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { packs: [], scores: {}, isNew: true };
    const parsed = JSON.parse(raw);
    return { packs: parsed.packs || [], scores: parsed.scores || {}, isNew: false };
  } catch {
    return { packs: [], scores: {}, isNew: true };
  }
}

export function saveData(d) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); }
  catch (e) { console.error("Save failed", e); }
}

export function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  if (!lines.length) return [];
  const header = lines[0].toLowerCase().replace(/\s/g, "");
  let data = lines, hasCategory = false;
  if (header.startsWith("pack_category,pack_name")) { data = lines.slice(1); hasCategory = true; }
  else if (header.startsWith("pack_name")) { data = lines.slice(1); }
  return data.map(line => {
    if (!line.trim()) return null;
    const fields = []; let cur = "", inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') inQ = !inQ;
      else if (ch === "," && !inQ) { fields.push(cur); cur = ""; }
      else cur += ch;
    }
    fields.push(cur);
    const clean = (s) => s.trim().replace(/^"|"$/g, "").trim();
    if (hasCategory) {
      if (fields.length < 4) return null;
      return { pack_category: clean(fields[0]), pack_name: clean(fields[1]), korean: clean(fields[2]), english: clean(fields[3]) };
    }
    if (fields.length < 3) return null;
    return { pack_category: "", pack_name: clean(fields[0]), korean: clean(fields[1]), english: clean(fields[2]) };
  }).filter(Boolean);
}

export async function importDefaultPacks(langCode) {
  const base = import.meta.env.BASE_URL || "/";
  const langDef = LANG_MAP[langCode];
  const csvFiles = langDef ? langDef.packs : (LANG_MAP.en?.packs || []);
  const allPacks = [];
  for (const csvFile of csvFiles) {
    try {
      const res = await fetch(`${base}packs/${csvFile}`);
      if (!res.ok) continue;
      const csvText = await res.text();
      const rows = parseCSV(csvText);
      const grouped = {};
      rows.forEach(({ pack_category, pack_name, korean, english }) => {
        if (!pack_name || !korean || !english) return;
        const key = (pack_category || "") + "|||" + pack_name;
        if (!grouped[key]) grouped[key] = { category: pack_category || "Uncategorized", name: pack_name, words: [] };
        grouped[key].words.push({ korean, english });
      });
      for (const dp of Object.values(grouped)) {
        allPacks.push({
          id: `pack-default-${dp.category}-${dp.name}`.replace(/\s+/g, "_"),
          name: dp.name, category: dp.category, words: dp.words, enabled: true,
        });
      }
    } catch (e) { console.warn(`Could not load pack ${csvFile}`, e); }
  }
  return allPacks;
}
