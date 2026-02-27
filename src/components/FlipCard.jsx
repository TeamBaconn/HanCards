import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { getCardFontSize } from "../utils/cards";

const HALF = 110;

export default function FlipCard({ front, back, flipped, onFlip, onNext }) {
  const { t: tr } = useTranslation();

  const [text, setText] = useState(front || "");
  const [label, setLabel] = useState("prompt");
  const labelText = label === "answer" ? tr("study.answer") : tr("study.prompt");
  const [phase, setPhase] = useState("idle");
  const timerRef = useRef(null);
  const prevFlipped = useRef(flipped);
  const prevFront = useRef(front);
  const textRef = useRef(null);
  const cardRef = useRef(null);
  const [fontSize, setFontSize] = useState(() => getCardFontSize(front));

  /* Auto-shrink: scale font so text never splits mid-word, max 2 lines */
  const recalcFontSize = useCallback(() => {
    const el = textRef.current;
    if (!el) return;
    const initial = getCardFontSize(text);
    let size = parseFloat(initial);
    const unit = initial.replace(/[\d.]/g, "");
    const minSize = 0.7;

    el.style.fontSize = size + unit;
    el.style.wordBreak = "keep-all";
    el.style.overflowWrap = "normal";
    el.style.whiteSpace = "normal";
    el.style.lineHeight = "1.3";

    const MAX_LINES = 2;
    let attempts = 0;
    while (attempts < 25 && size > minSize) {
      const computedFs = parseFloat(getComputedStyle(el).fontSize);
      const maxH = computedFs * 1.3 * MAX_LINES + 4;
      const overflowsV = el.scrollHeight > maxH;
      const overflowsH = el.scrollWidth > el.clientWidth + 2;
      if (!overflowsV && !overflowsH) break;
      size = Math.max(minSize, size * 0.88);
      el.style.fontSize = size + unit;
      attempts++;
    }
    setFontSize(size + unit);
  }, [text]);

  useEffect(() => { recalcFontSize(); }, [recalcFontSize]);

  /* Re-calc font size immediately when card is resized (resolution change) */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => recalcFontSize());
    ro.observe(el);
    return () => ro.disconnect();
  }, [recalcFontSize]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    if (clickY < rect.height / 2) onFlip?.();
    else onNext?.();
  };

  useEffect(() => {
    if (prevFront.current !== front) {
      prevFront.current = front;
      clearTimeout(timerRef.current);
      setPhase("idle"); setText(front || ""); setLabel("prompt");
      setFontSize(getCardFontSize(front || ""));
    }
  }, [front]);

  useEffect(() => {
    if (prevFlipped.current === flipped) return;
    prevFlipped.current = flipped;
    clearTimeout(timerRef.current);
    setPhase("out");
    timerRef.current = setTimeout(() => {
      setText(flipped ? (back || "") : (front || ""));
      setLabel(flipped ? "answer" : "prompt");
      setPhase("in");
      timerRef.current = setTimeout(() => setPhase("idle"), HALF);
    }, HALF);
    return () => clearTimeout(timerRef.current);
  }, [flipped, front, back]);

  const isBack = flipped ? (phase !== "out") : (phase === "out");

  const cardClass = [
    "flip-card",
    isBack && "flip-card--back",
    phase === "out" && "flip-card--out",
  ].filter(Boolean).join(" ");

  return (
    <div ref={cardRef} onClick={handleClick} className={cardClass}>
      <div className="flip-card-label">{labelText}</div>
      <div ref={textRef} className="flip-card-text" style={{ fontSize }}>{text}</div>
    </div>
  );
}
