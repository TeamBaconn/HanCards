import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AUTO_SPEAK } from "../config";
import Modal from "./Modal";

export default function VoiceSettingsModal({ settings, langPairs, onClose, onStart, onSaveSettings }) {
  const { t: tr } = useTranslation();
  const [local, setLocal] = useState(() => {
    const langs = {};
    langPairs.forEach(({ ttsLang }) => {
      langs[ttsLang] = {
        voiceURI: settings.langs?.[ttsLang]?.voiceURI ?? null,
        rate:     settings.langs?.[ttsLang]?.rate     ?? AUTO_SPEAK.rate,
        pitch:    settings.langs?.[ttsLang]?.pitch    ?? AUTO_SPEAK.pitch,
      };
    });
    return { langs, flipSpeed: settings.flipSpeed ?? 1.0 };
  });
  const [voices, setVoices] = useState(() => window.speechSynthesis?.getVoices() ?? []);

  useEffect(() => {
    const load = () => setVoices(window.speechSynthesis?.getVoices() ?? []);
    window.speechSynthesis?.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis?.removeEventListener("voiceschanged", load);
  }, []);

  const voicesFor = (ttsLang) =>
    voices.filter(v => v.lang.toLowerCase().startsWith(ttsLang.slice(0, 2).toLowerCase()));

  const setLang = (ttsLang, patch) =>
    setLocal(s => ({ ...s, langs: { ...s.langs, [ttsLang]: { ...s.langs[ttsLang], ...patch } } }));

  const testVoice = (sample, ttsLang) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const lv  = local.langs[ttsLang];
    const utt = new SpeechSynthesisUtterance(sample);
    utt.lang  = ttsLang;
    utt.rate  = lv?.rate  ?? AUTO_SPEAK.rate;
    utt.pitch = lv?.pitch ?? AUTO_SPEAK.pitch;
    const uri = lv?.voiceURI;
    if (uri) { const v = voices.find(gv => gv.voiceURI === uri); if (v) utt.voice = v; }
    window.speechSynthesis.speak(utt);
  };

  return (
    <Modal title={tr('study.voiceSettings')} onClose={onClose} className="modal--narrow">
      <div className="voice-lang-list">
        {langPairs.map(({ label, ttsLang, sample }, idx) => {
          const available = voicesFor(ttsLang);
          const lv = local.langs[ttsLang] ?? {};
          return (
            <>
              {idx > 0 && (
                <div className="voice-lang-separator">
                  <hr />
                </div>
              )}
              <div key={ttsLang} className="voice-lang-card voice-lang-card--plain">
                <div className="voice-lang-label">{label}</div>
                <div className="voice-lang-controls">
                  <select
                    className="input voice-select"
                    value={lv.voiceURI ?? ""}
                    onChange={e => setLang(ttsLang, { voiceURI: e.target.value || null })}
                  >
                    <option value="">{tr('study.defaultVoice')}</option>
                    {available.map(v => (
                      <option key={v.voiceURI} value={v.voiceURI}>{v.name}</option>
                    ))}
                  </select>
                  <button className="btn btn-ghost voice-test-btn" onClick={() => testVoice(sample, ttsLang)}>▶</button>
                </div>
                <div className="voice-inline-row">
                  <span className="voice-inline-label">{tr('study.rate')}</span>
                  <input type="range" min="0" max="2" step="0.25" value={lv.rate ?? AUTO_SPEAK.rate}
                    onChange={e => setLang(ttsLang, { rate: parseFloat(e.target.value) })}
                    className="voice-slider" />
                  <span className="voice-inline-label voice-inline-gap">{tr('study.pitch')}</span>
                  <input type="range" min="0" max="2" step="0.1" value={lv.pitch ?? AUTO_SPEAK.pitch}
                    onChange={e => setLang(ttsLang, { pitch: parseFloat(e.target.value) })}
                    className="voice-slider" />
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="voice-flip-speed-section">
        <div className="voice-lang-separator"><hr /></div>
        <div className="voice-flip-label-row">
          <span className="voice-inline-label voice-flip-label">{tr('study.flipSpeed')}</span>
          <span className="voice-flip-speed-value">{local.flipSpeed.toFixed(1)}x</span>
        </div>
        <div className="voice-flip-slider-row">
          <input type="range" min="0.3" max="5" step="0.1" value={local.flipSpeed}
            onChange={e => setLocal(s => ({ ...s, flipSpeed: parseFloat(e.target.value) }))}
            className="voice-slider" />
        </div>
      </div>
      <div className="voice-modal-actions">
        <button className="btn btn-primary"
          onClick={() => { onSaveSettings(local); onStart(); onClose(); }}>
          {tr('study.startSpeaking')}
        </button>
      </div>
    </Modal>
  );
}
