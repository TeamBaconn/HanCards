import { useTranslation } from "react-i18next";

export default function Header({ screen, onSetScreen, onGoToManage }) {
  const { t: tr } = useTranslation();

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <span onClick={() => onSetScreen("about")} style={{ cursor: "pointer" }}>
            <img src={(import.meta.env.BASE_URL || '/') + 'icon.png'} alt="App Icon" className="header-brand-icon" />
            한카드 <span className="header-brand-sub">HanCards</span>
          </span>
        </div>
        <nav className="nav-tabs">
          {[["quiz", tr('nav.quiz')], ["study", tr('nav.study')], ["manage", tr('nav.manage')], ["about", tr('nav.about')]].map(([s, lbl]) => (
            <button key={s} onClick={() => s === "manage" ? onGoToManage() : onSetScreen(s)} className={`nav-tab ${screen === s ? 'nav-tab--active' : ''}`}>{lbl}</button>
          ))}
        </nav>
      </div>
    </header>
  );
}
