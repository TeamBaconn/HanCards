import { useTranslation } from "react-i18next";
import { GearIcon } from "../components/icons";

export default function AboutScreen({ onOpenSettings }) {
  const { t: tr } = useTranslation();

  return (
    <div className="about-screen">
      <img src={(import.meta.env.BASE_URL || '/') + 'icon.png'} alt="App Icon" className="about-icon" width="300" height="300" loading="lazy" />
      <h2 className="about-title">HanCards</h2>
      <p className="about-description">
        {tr('about.description')}
        <a href="https://bacongamedev.com/posts/portfolio/" target="_blank" rel="noopener noreferrer" className="about-link">Bacon</a>
      </p>
      <div className="about-copyright">
        {tr('about.copyright', { year: new Date().getFullYear() })}
      </div>

      <div className="about-actions">
        <button className="btn btn-primary about-gear-btn" onClick={onOpenSettings}>
          <GearIcon /> {tr('settings.title')}
        </button>
      </div>
    </div>
  );
}
