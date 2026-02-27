import { useTranslation } from "react-i18next";
import { SCORE, scoreColor } from "../config";
import { medianOf } from "../utils/cards";
import { EditIcon, TrashIcon } from "../components/icons";
import ProgressChart from "../components/ProgressChart";

export default function ManageScreen({
  packs, scores, allWords, enabledCount, expandedCats,
  onTogglePack, onToggleCategory, onDeleteCategory, onDeletePack,
  onSetExpandedCats, onEditPack, onOpenImport,
}) {
  const { t: tr } = useTranslation();

  const packsByCategory = {};
  packs.forEach(p => {
    const cat = p.category || p.pack_category || "Uncategorized";
    if (!packsByCategory[cat]) packsByCategory[cat] = [];
    packsByCategory[cat].push(p);
  });

  return (
    <div className="manage-screen">
      <div className="manage-top">
        {packs.length > 0 && (
          <ProgressChart packs={packs} scores={scores} />
        )}
        <div className="stats-grid">
          {[
            [tr("manage.categories"), `${Object.keys(packsByCategory).length}`],
            [tr("manage.packs"), `${packs.length}`],
            [tr("manage.activePacks"), `${enabledCount} / ${packs.length}`],
            [tr("manage.words"), `${packs.reduce((a, p) => a + p.words.length, 0)}`],
            [tr("manage.activeWords"), `${allWords.length}`],
          ].map(([lbl, val]) => (
            <div key={lbl} className="stat-card">
              <div className="stat-value">{val}</div>
              <div className="stat-label">{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="actions-bar">
        <button className="btn btn-ghost" onClick={onOpenImport}>{tr('manage.csvImport')}</button>
      </div>

      {/* Pack grid */}
      {packs.length === 0 ? (
        <div className="no-packs">{tr('manage.noPacks')}</div>
      ) : (
        <div className="ps" style={{ paddingRight: 4 }}>
          {Object.entries(packsByCategory).map(([cat, catPacks]) => {
            const hasEnabled = catPacks.some(p => p.enabled);
            const isExpanded = expandedCats[cat] !== undefined ? expandedCats[cat] : hasEnabled;
            const allCatEnabled = catPacks.every(p => p.enabled);
            return (
              <div key={cat} className="category-section">
                <div className={`category-header ${isExpanded ? 'category-header--expanded' : ''}`}
                  onClick={(e) => { if (e.target.closest('button')) return; onSetExpandedCats(prev => ({ ...prev, [cat]: !isExpanded })); }}>
                  <span className="category-name-group">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`category-chevron text-secondary ${isExpanded ? 'category-chevron--expanded' : ''}`}><polyline points="9 18 15 12 9 6"/></svg>
                    <span className="category-name">{cat}</span>
                  </span>
                  <button onClick={() => onToggleCategory(cat)} className={`toggle-cat ${allCatEnabled ? 'toggle-cat--on' : ''}`} aria-label={tr('manage.toggleCategory', { cat })}>
                    <div className="toggle-cat-knob" />
                  </button>
                  <span className="category-meta">{catPacks.filter(p => p.enabled).length}/{catPacks.length} {tr('manage.packPlural')}</span>
                  <button onClick={() => onDeleteCategory(cat)} title={`Delete all packs in ${cat}`}
                    className="btn-icon text-danger category-delete"><TrashIcon /></button>
                </div>
                {isExpanded && (
                  <div className="pack-grid">
                    {catPacks.map(p => {
                      const packMedian = Math.round(medianOf(p.words.map(w => scores[w.korean] ?? SCORE.defaultScore)));
                      return (
                        <div key={p.id} className={`pack-card ${p.enabled ? 'pack-card--active' : ''}`}>
                          <div className="pack-name" title={p.name}>{p.name}</div>
                          <div className="pack-word-count">{p.words.length} {p.words.length !== 1 ? tr('manage.wordPlural') : tr('manage.word')}</div>
                          <div className="pack-progress">
                            <div className="pack-progress-fill" style={{ width: `${packMedian}%`, minWidth: packMedian > 0 ? 2 : 0, background: scoreColor(packMedian) }} />
                          </div>
                          <div className="pack-actions">
                            <div onClick={() => onTogglePack(p.id)} className={`toggle ${p.enabled ? 'toggle--on' : ''}`}>
                              <div className="toggle-knob" />
                            </div>
                            <div className="pack-actions-spacer" />
                            <button title="Edit" onClick={() => onEditPack(p.id)}
                              className="btn-icon text-secondary"><EditIcon /></button>
                            <button title="Delete" onClick={() => onDeletePack(p.id)}
                              className="btn-icon text-danger"><TrashIcon /></button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
