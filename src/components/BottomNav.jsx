import { useTranslation } from "react-i18next";
import { NAV_ITEMS } from "./icons";

export default function BottomNav({ screen, onSetScreen, onGoToManage }) {
  const { t: tr } = useTranslation();

  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map(([s, key, Icon]) => (
        <button key={s} onClick={() => s === "manage" ? onGoToManage() : onSetScreen(s)} className={`bottom-nav-item${screen === s ? ' bottom-nav-item--active' : ''}`}>
          <Icon />
          <span className="bottom-nav-label">{tr(key)}</span>
        </button>
      ))}
    </nav>
  );
}
