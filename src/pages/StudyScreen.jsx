import { useTranslation } from "react-i18next";
import { scoreColor } from "../config";
import FlipCard from "../components/FlipCard";
import { SpeakerPlayIcon, SpeakerStopIcon } from "../components/icons";

export default function StudyScreen({
  allWords, card, front, back, mode, flipped, enabledCount,
  avgScore, cardScore, autoSpeak,
  onSetMode, onFlip, onNext, onSpeakerTap
}) {
  const { t: tr } = useTranslation();

  return (
    <div className="study-screen">
      {allWords.length > 0 && (
        <div className="mode-toggle mode-toggle--study">
          <div />
          <div className="mode-toggle-group">
            {[['eng', tr('study.toKorean')], ['kor', tr('study.fromKorean')]].map(([v, label]) => (
              <button key={v} onClick={() => onSetMode(v)}
                title={v === 'eng' ? tr('study.toKoreanTitle') : tr('study.fromKoreanTitle')}
                className={`mode-toggle-btn ${mode === v ? 'mode-toggle-btn--active' : ''}`}>
                {label}
              </button>
            ))}
          </div>
          <div className="mode-toggle-right">
            <button
              onClick={onSpeakerTap}
              className={`auto-speak-btn ${autoSpeak ? 'auto-speak-btn--active' : ''}`}
              title={autoSpeak ? tr('study.stopAutoSpeak') : tr('study.startAutoSpeak')}
            >
              {autoSpeak ? <SpeakerStopIcon /> : <SpeakerPlayIcon />}
            </button>
          </div>
        </div>
      )}
      {allWords.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <p>{tr('study.noPacks')} <strong className="empty-state-link" onClick={() => {/* handled via onGoToManage prop if needed */}}>{tr('nav.manage')}</strong> {tr('study.noPacksEnd')}</p>
        </div>
      ) : card ? (
        <>
          <FlipCard front={front} back={back} flipped={flipped}
            onFlip={onFlip}
            onNext={onNext} />
          <div className="study-stats">
            <span>{allWords.length} {tr('study.words')} · {enabledCount} {enabledCount !== 1 ? tr('study.packs') : tr('study.pack')}</span>
            <span>{tr('study.avgScore')}: <strong style={{ color: scoreColor(avgScore) }}>{avgScore}%</strong></span>
            <span>{tr('study.cardScore')}: <strong style={{ color: scoreColor(cardScore) }}>{cardScore}%</strong></span>
          </div>
          <div className="card-tips card-tips-bottom-left card-tips-align-left">
            <div className="card-tip-line">
              <kbd className="kbd">→</kbd> <kbd className="kbd">Enter</kbd> {tr('study.next')}
            </div>
            <div className="card-tip-line">
              <kbd className="kbd">↑</kbd> <kbd className="kbd">↓</kbd> <kbd className="kbd">Space</kbd> {tr('study.flip')}
            </div>
            <div className="card-tip-line">
              {tr('study.cardTipTap')} <kbd className="kbd">{tr('study.cardTipUpper')}</kbd> {tr('study.cardTipFlip')}
            </div>
            <div className="card-tip-line">
              {tr('study.cardTipTap')} <kbd className="kbd">{tr('study.cardTipLower')}</kbd> {tr('study.cardTipNext')}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
