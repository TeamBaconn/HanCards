import { useTranslation } from "react-i18next";
import { LANG_MAP } from "../config";
import { SunIcon, MoonIcon } from "./icons";
import Modal from "./Modal";

export default function SettingsModal({ dark, onToggleDark, onChangeLang, onDeleteUserData, onClose }) {
  const { t: tr, i18n } = useTranslation();
  const curLang = LANG_MAP[i18n.language];

  return (
    <Modal title={tr('settings.title')} onClose={onClose} className="modal--narrow">
      <div className="settings-list">
        {/* ── Language ── */}
        <div className="settings-row">
          <span className="settings-label">{tr('settings.language')}</span>
          <button className="settings-lang-btn" onClick={onChangeLang}>
            {curLang ? `${curLang.flag} ${curLang.label}` : "🌐"}
          </button>
        </div>

        {/* ── Theme ── */}
        <div className="settings-row">
          <span className="settings-label">{tr('settings.theme')}</span>
          <div className="settings-theme-toggle">
            <button
              className={`settings-theme-btn ${!dark ? 'settings-theme-btn--active' : ''}`}
              onClick={() => dark && onToggleDark()}
            >
              <SunIcon /> {tr('settings.light')}
            </button>
            <button
              className={`settings-theme-btn ${dark ? 'settings-theme-btn--active' : ''}`}
              onClick={() => !dark && onToggleDark()}
            >
              <MoonIcon /> {tr('settings.dark')}
            </button>
          </div>
        </div>

        {/* ── Reset ── */}
        <div className="settings-row settings-row--danger">
          <button className="btn btn-ghost btn-danger settings-reset-btn" onClick={onDeleteUserData}>
            {tr('settings.deleteUserData')}
          </button>
        </div>
      </div>
    </Modal>
  );
}
