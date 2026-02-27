import { useTranslation } from "react-i18next";
import { SCORE, scoreColor } from "../config";
import { medianOf } from "../utils/cards";

export default function ProgressChart({ packs, scores }) {
  const { t: tr } = useTranslation();

  const byCategory = {};
  packs.forEach(p => {
    const cat = p.category || p.pack_category || "Uncategorized";
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(p);
  });
  const categories = Object.entries(byCategory);
  if (!categories.length) return null;

  const packData = categories.map(([cat, catPacks]) => ({
    cat,
    packs: catPacks.map(p => {
      const wordScores = p.words.map(w => scores[w.korean] ?? SCORE.defaultScore);
      const med = Math.round(medianOf(wordScores));
      return { name: p.name, median: med, color: scoreColor(med) };
    })
  }));

  const barWidth = 6;
  const barGap = 2;
  const groupGap = 20;
  const chartHeight = 50;
  const topPad = 5;
  const bottomPad = 10;

  let x = 16;
  const groups = packData.map(group => {
    const gx = x;
    const bars = group.packs.map(p => {
      const bx = x;
      x += barWidth + barGap;
      return { ...p, x: bx };
    });
    x -= barGap;
    const gw = x - gx;
    x += groupGap;
    return { ...group, x: gx, width: gw, bars };
  });
  const svgWidth = Math.max(x - groupGap + 16, 120);
  const svgHeight = chartHeight + topPad + bottomPad;

  return (
    <div className="progress-chart">
      <div className="chart-title">{tr('manage.progress')}</div>
      <svg width="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMinYMid meet" style={{ display: "block" }}>
        {[0, 50, 100].map(v => {
          const y = topPad + chartHeight - (v / 100) * chartHeight;
          return (
            <g key={v}>
              <line x1={12} x2={svgWidth - 5} y1={y} y2={y} style={{ stroke: "var(--color-chart-line)" }} strokeDasharray={v === 0 ? "none" : "2,4"} strokeWidth="0.4" />
              <text x={1} y={y + 1.5} fontSize="3.5" style={{ fill: "var(--color-text-secondary)" }}>{v}</text>
            </g>
          );
        })}
        {groups.map((group, gi) => (
          <g key={gi}>
            {group.bars.map((p, pi) => {
              const height = (p.median / 100) * chartHeight;
              const y = topPad + chartHeight - height;
              const barH = p.median === 0 ? 0.5 : height;
              return (
                <rect key={pi} x={p.x} y={topPad + chartHeight - barH} width={barWidth} height={barH} rx={0} ry={0} fill={p.color} opacity={0.9}>
                  <title>{`${p.name}: ${p.median}%`}</title>
                </rect>
              );
            })}
            <text x={group.x + group.width / 2} y={topPad + chartHeight + 9} textAnchor="middle" fontSize="4.5" fontWeight="600" style={{ fill: "var(--color-text-secondary)" }}>{group.cat}</text>
          </g>
        ))}
      </svg>
      <div className="chart-legend">
        <span className="chart-legend-item"><span className="chart-legend-dot" style={{ background: "#ff5566" }} />{tr('manage.learning')}</span>
        <span className="chart-legend-item"><span className="chart-legend-dot" style={{ background: "#ffb830" }} />{tr('manage.familiar')}</span>
        <span className="chart-legend-item"><span className="chart-legend-dot" style={{ background: "#58cc02" }} />{tr('manage.mastered')}</span>
      </div>
    </div>
  );
}
