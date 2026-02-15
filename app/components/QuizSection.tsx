"use client";

import { useRef, useState } from "react";
import {
  QUESTIONS,
  RESULTS,
  PLACEMENT_SUGGESTIONS,
  GUMROAD_URL,
  type Feeling,
  type Theme,
  type Placement,
  type ResultKey,
} from "../data";

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 toast-enter">
      <div className="flex items-center gap-2.5 bg-ink text-parchment px-5 py-3 rounded-full shadow-lg text-sm font-sans font-medium tracking-wide">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path
            d="M2 7.5L6 11.5L13 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Copied!
      </div>
    </div>
  );
}

// ─── Radio Option ─────────────────────────────────────────────────────────────
interface RadioOptionProps {
  value: string;
  label: string;
  description: string;
  selected: boolean;
  onChange: (v: string) => void;
}

function RadioOption({ value, label, description, selected, onChange }: RadioOptionProps) {
  return (
    <label
      className={`radio-option ${selected ? "selected" : ""}`}
      onClick={() => onChange(value)}
    >
      <input
        type="radio"
        name={value}
        value={value}
        checked={selected}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <span className="radio-dot" aria-hidden="true" />
      <span className="flex flex-col gap-0.5">
        <span className="font-sans font-medium text-sm text-ink leading-snug">
          {label}
        </span>
        <span className="font-sans text-xs text-ink-muted leading-snug">
          {description}
        </span>
      </span>
    </label>
  );
}

// ─── Question Block ───────────────────────────────────────────────────────────
interface QuestionBlockProps {
  number: number;
  label: string;
  options: { value: string; label: string; description: string }[];
  selected: string | null;
  onChange: (v: string) => void;
}

function QuestionBlock({
  number,
  label,
  options,
  selected,
  onChange,
}: QuestionBlockProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-accent tracking-widest font-medium">
          {String(number).padStart(2, "0")}
        </span>
        <h3 className="font-serif text-xl text-ink leading-snug">{label}</h3>
      </div>
      <div className="flex flex-col gap-2.5" role="radiogroup" aria-label={label}>
        {options.map((opt) => (
          <RadioOption
            key={opt.value}
            value={opt.value}
            label={opt.label}
            description={opt.description}
            selected={selected === opt.value}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Result Card ──────────────────────────────────────────────────────────────
interface ResultCardProps {
  result: {
    word: string;     // preview only
    tagline: string;  // preview copy
  };
}

function ResultCard({ result }: ResultCardProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Word preview (BLURRED, stronger + tasteful) */}
      <div className="text-center py-10 border-t border-b border-parchment-deep">
        <div className="relative inline-block">
          <p
            className="kanji-display text-[7rem] md:text-[9rem] leading-none text-ink
                       select-none pointer-events-none
                       blur-[6px] opacity-75"
            lang="ja"
          >
            {result.word}
          </p>

          {/* Soft noise/scanlines overlay to prevent “reading by squinting” */}
          <div
            className="absolute inset-0 pointer-events-none opacity-35 mix-blend-multiply"
            aria-hidden="true"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 1px, transparent 2px, transparent 5px)",
            }}
          />
        </div>

        <p className="font-serif italic text-lg text-ink-muted mt-4">
          {result.tagline}
        </p>

        <p className="text-[11px] text-ink-muted font-sans mt-2">
          Full reading, nuance, and tattoo-safe reference are inside the $3 PDF.
        </p>
      </div>

      {/* Locked meaning box */}
      <div className="rounded-2xl border border-parchment-deep bg-white/60 p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.6875rem] font-mono tracking-[0.18em] text-accent uppercase">
              Full meaning (locked)
            </p>
            <p className="text-xs text-ink-muted font-sans mt-1">
              Romaji • exact meaning • nuance • cultural context • placement notes
            </p>
          </div>

          {/* Lock icon (cleaner than emoji) */}
          <div
            className="w-9 h-9 rounded-xl border border-parchment-deep bg-parchment flex items-center justify-center text-ink-muted"
            aria-hidden="true"
            title="Locked"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M17 11V8a5 5 0 0 0-10 0v3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M7.5 11h9A2.5 2.5 0 0 1 19 13.5v5A2.5 2.5 0 0 1 16.5 21h-9A2.5 2.5 0 0 1 5 18.5v-5A2.5 2.5 0 0 1 7.5 11Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>

        {/* Blur teaser (stronger blur) */}
        <div className="flex flex-col gap-2">
          <div className="h-3 rounded bg-parchment-deep/80 blur-[3px]" />
          <div className="h-3 rounded bg-parchment-deep/70 blur-[3px] w-11/12" />
          <div className="h-3 rounded bg-parchment-deep/60 blur-[3px] w-10/12" />
        </div>

        <ul className="text-sm text-ink font-sans list-disc pl-5 space-y-1">
          <li>What this word truly implies in Japanese</li>
          <li>What reads natural (and what to avoid)</li>
          <li>Artist-ready reference page (PDF)</li>
        </ul>

        {/* Single CTA (price-forward) */}
        <a
          href={GUMROAD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center py-4 px-8 rounded-xl font-sans font-medium text-sm tracking-wide
                     bg-ink text-parchment hover:bg-ink-soft shadow-md hover:shadow-lg
                     transition-all duration-300"
        >
          Unlock full meaning — $3 PDF (instant download)
        </a>

        <p className="text-[11px] text-ink-muted font-sans text-center">
          One-time payment • Instant access • Native Japanese creator
        </p>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-ink-muted leading-relaxed border-l-2 border-parchment-deep pl-3 font-sans">
        Always double-check spelling and meaning with a professional before tattooing.
      </p>
    </div>
  );
}


// ─── Main Quiz Section ────────────────────────────────────────────────────────
export default function QuizSection() {
  const [feeling, setFeeling] = useState<Feeling | null>(null);
  const [theme, setTheme] = useState<Theme | null>(null);
  const [placement, setPlacement] = useState<Placement | null>(null);
  const [showResult, setShowResult] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);

  const allAnswered = feeling !== null && theme !== null && placement !== null;

  const handleGenerate = () => {
    if (!allAnswered) return;
    setShowResult(true);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleRetake = () => {
    setShowResult(false);
    setFeeling(null);
    setTheme(null);
    setPlacement(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resultKey: ResultKey | null =
    feeling && theme ? `${feeling}+${theme}` : null;
  const result = resultKey ? RESULTS[resultKey] : null;
  const placementText = placement ? PLACEMENT_SUGGESTIONS[placement] : "";

  return (
    <div className="flex flex-col gap-16 w-full">
      {/* Questions */}
      <div className="flex flex-col gap-10">
        <QuestionBlock
          number={1}
          label={QUESTIONS.feeling.label}
          options={[...QUESTIONS.feeling.options]}
          selected={feeling}
          onChange={(v) => setFeeling(v as Feeling)}
        />

        <div className="h-px bg-gradient-to-r from-transparent via-parchment-deep to-transparent" />

        <QuestionBlock
          number={2}
          label={QUESTIONS.theme.label}
          options={[...QUESTIONS.theme.options]}
          selected={theme}
          onChange={(v) => setTheme(v as Theme)}
        />

        <div className="h-px bg-gradient-to-r from-transparent via-parchment-deep to-transparent" />

        <QuestionBlock
          number={3}
          label={QUESTIONS.placement.label}
          options={[...QUESTIONS.placement.options]}
          selected={placement}
          onChange={(v) => setPlacement(v as Placement)}
        />
      </div>

            {/* Generate Button */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={handleGenerate}
          disabled={!allAnswered}
          className={`w-full max-w-sm py-4 px-8 rounded-xl font-sans font-medium text-sm tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
            ${
              allAnswered
                ? "bg-ink text-parchment hover:bg-ink-soft shadow-md hover:shadow-lg cursor-pointer"
                : "bg-parchment-deep text-ink-muted cursor-not-allowed"
            }`}
          aria-disabled={!allAnswered}
        >
          Generate my tattoo word
        </button>
        {!allAnswered && (
          <p className="text-xs text-ink-muted font-sans">
            Answer all 3 questions to continue
          </p>
        )}
      </div>

      {/* Result */}
      {showResult && result && (
        <div
          ref={resultRef}
          className="flex flex-col gap-8 scroll-mt-12"
        >
          {/* Ornament */}
          <div className="ornament-line">
            <span className="text-xs font-mono tracking-[0.2em] text-accent uppercase whitespace-nowrap">
              Your word
            </span>
          </div>

          <ResultCard result={result} />

          {/* Retake */}
          <div className="text-center pt-4">
            <button
              onClick={handleRetake}
              className="font-sans text-sm text-ink-muted hover:text-accent transition-colors underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              Start over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
