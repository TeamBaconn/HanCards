import { LANGUAGES } from "../config";

export default function LangSelectModal({ onSelect, onClose }) {
  return (
    <div className="lang-overlay">
      <div className="lang-modal">
        {onClose && (
          <button className="lang-modal-close" onClick={onClose} aria-label="Close">✕</button>
        )}
        <img src={(import.meta.env.BASE_URL || '/') + 'icon.png'} alt="HanCards" className="lang-modal-icon" width="150" height="150" />
        <p className="lang-modal-title">한카드 HanCards</p>
        <p className="lang-modal-subtitle">Choose your language</p>
        <div className="lang-btn-group">
          {LANGUAGES.map(lang => (
            <button key={lang.code} onClick={() => onSelect(lang.code)}
              className="lang-btn"
              style={{ '--lang-color': lang.color, '--lang-border': lang.borderColor }}
            >{lang.flag} {lang.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
