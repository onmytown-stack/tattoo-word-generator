"use client";

import { useEffect, useRef, useState } from "react";
import {
  QUESTIONS,
  RESULTS,
  PLACEMENT_SUGGESTIONS,
  type Feeling,
  type Theme,
  type Placement,
  type ResultKey,
} from "../data";

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="toast-enter fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-2.5 rounded-full bg-ink px-5 py-3 text-sm font-sans font-medium tracking-wide text-parchment shadow-lg">
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
  groupName: string;
  value: string;
  label: string;
  description: string;
  selected: boolean;
  onChange: (v: string) => void;
}

function RadioOption({
  groupName,
  value,
  label,
  description,
  selected,
  onChange,
}: RadioOptionProps) {
  const inputId = `${groupName}-${value}`;

  return (
    <label
      htmlFor={inputId}
      className={`
        group relative cursor-pointer rounded-2xl border-2 p-4 transition-all duration-200
        ${
          selected
            ? "border-accent bg-white shadow-md ring-2 ring-accent/15 -translate-y-[1px]"
            : "border-parchment-deep bg-white/80 hover:bg-white hover:shadow-sm hover:-translate-y-[1px]"
        }
      `}
    >
      <input
        id={inputId}
        type="radio"
        name={groupName}
        value={value}
        checked={selected}
        onChange={() => onChange(value)}
        className="sr-only"
      />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {/* dot */}
          <span
            aria-hidden="true"
            className={`
              mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 transition
              ${
                selected
                  ? "border-accent bg-brand-yellow/40"
                  : "border-parchment-deep bg-parchment"
              }
            `}
          >
            <span
              className={`
                h-2.5 w-2.5 rounded-full transition
                ${selected ? "scale-100 bg-accent" : "scale-75 bg-transparent"}
              `}
            />
          </span>

          <span className="flex flex-col gap-1">
            <span className="font-lilita text-base leading-tight tracking-[0.02em] text-ink">
              {label}
            </span>
            <span className="font-sans text-xs leading-snug text-ink-muted">
              {description}
            </span>
          </span>
        </div>

        {/* badge */}
        <span
          className={`
            shrink-0 rounded-full px-2.5 py-1 text-[10px] uppercase transition
            ${
              selected
                ? "bg-accent font-lilita tracking-[0.04em] text-white"
                : "bg-parchment font-lilita tracking-[0.04em] text-ink-muted opacity-0 group-hover:opacity-100"
            }
          `}
        >
          {selected ? "Picked" : "Pick"}
        </span>
      </div>
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
  const groupName = `question-${number}`;

  return (
    <section className="rounded-3xl border-2 border-parchment-deep bg-white/70 p-5 shadow-sm md:p-6">
      <div className="mb-4 flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-8 min-w-8 items-center justify-center rounded-full border-2 border-accent/20 bg-brand-yellow/70 px-2 font-lilita text-xs tracking-[0.03em] text-brand-green shadow-sm">
          {String(number).padStart(2, "0")}
        </span>

        <div className="flex-1">
          <h3 className="font-lilita text-2xl leading-tight tracking-[0.02em] text-ink">
            {label}
          </h3>
          <p className="mt-1 font-sans text-xs text-ink-muted">
            Choose one option
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3" role="radiogroup" aria-label={label}>
        {options.map((opt) => (
          <RadioOption
            key={opt.value}
            groupName={groupName}
            value={opt.value}
            label={opt.label}
            description={opt.description}
            selected={selected === opt.value}
            onChange={onChange}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Result Card ──────────────────────────────────────────────────────────────
interface ResultCardProps {
  result: {
    word: string;
    tagline: string;
    gumroadUrl: string;
  };
  placementText?: string;
}

function ResultCard({ result, placementText }: ResultCardProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Word preview (blurred) */}
      <div className="border-y border-parchment-deep py-10 text-center">
        <div className="relative inline-block">
          <p
            className="kanji-display pointer-events-none select-none text-[7rem] leading-none text-ink opacity-75 blur-[6px] md:text-[9rem]"
            lang="ja"
          >
            {result.word}
          </p>

          <div
            className="pointer-events-none absolute inset-0 opacity-35 mix-blend-multiply"
            aria-hidden="true"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 1px, transparent 2px, transparent 5px)",
            }}
          />
        </div>

        <p className="mt-4 font-serif text-lg italic text-ink-muted">
          {result.tagline}
        </p>

        <p className="mt-2 font-sans text-[11px] text-ink-muted">
          Tattoos are permanent — the full reading and nuance are inside the $3 PDF.
        </p>
      </div>

      {/* Placement note */}
      {placementText && (
        <div className="rounded-2xl border border-parchment-deep bg-white/60 p-4">
          <p className="text-xs font-lilita uppercase tracking-[0.06em] text-accent">
            Placement note
          </p>
          <p className="mt-2 font-sans text-sm leading-relaxed text-ink">
            {placementText}
          </p>
        </div>
      )}

      {/* Locked meaning box */}
      <div className="flex flex-col gap-4 rounded-2xl border border-parchment-deep bg-white/60 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-lilita uppercase tracking-[0.06em] text-accent">
              Before you commit (PDF includes)
            </p>
            <p className="mt-1 font-sans text-xs text-ink-muted">
              Romaji • literal meaning • nuance • what feels natural • what to avoid •
              placement notes
            </p>
          </div>

          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-parchment-deep bg-parchment text-ink-muted"
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

        <div className="flex flex-col gap-2">
          <div className="h-3 rounded bg-parchment-deep/80 blur-[3px]" />
          <div className="h-3 w-11/12 rounded bg-parchment-deep/70 blur-[3px]" />
          <div className="h-3 w-10/12 rounded bg-parchment-deep/60 blur-[3px]" />
        </div>

        <ul className="list-disc space-y-1 pl-5 font-sans text-sm text-ink">
          <li>What this word truly implies in Japanese</li>
          <li>What reads natural (and what to avoid)</li>
          <li>Artist-ready reference page (PDF)</li>
        </ul>

        <div className="flex flex-col gap-3 rounded-2xl border border-parchment-deep bg-parchment-soft/80 p-5">
          <p className="text-xs font-lilita uppercase tracking-[0.06em] text-brand-green">
            What you’ll receive (PDF)
          </p>

          <ul className="list-disc space-y-1.5 pl-5 font-sans text-sm text-ink">
            <li>Romaji + literal meaning</li>
            <li>Nuance: what sounds natural (and what to avoid)</li>
            <li>Artist-ready reference page (placement notes)</li>
          </ul>

          <p className="font-sans text-[11px] text-ink-muted">
            Created to help you decide with confidence — before anything becomes permanent.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-center text-xs font-lilita uppercase tracking-[0.06em] text-accent">
            Preview from the PDF
          </p>

          <div className="grid grid-cols-3 gap-2">
            <img
              src="/1.png"
              alt="PDF cover preview"
              className="rounded-xl border border-parchment-deep bg-white/70 shadow-sm"
              loading="lazy"
            />
            <img
              src="/2.png"
              alt="Meaning page preview"
              className="rounded-xl border border-parchment-deep bg-white/70 shadow-sm"
              loading="lazy"
            />
            <img
              src="/3.png"
              alt="Quote page preview"
              className="rounded-xl border border-parchment-deep bg-white/70 shadow-sm"
              loading="lazy"
            />
          </div>

          <p className="text-center font-sans text-[11px] leading-relaxed text-ink-muted">
            Sample pages from the actual PDF (example:{" "}
            <span className="font-medium">静</span>).
            <br className="hidden sm:block" />
            Each tattoo word has its own version.
          </p>
        </div>

        <a
          href={result.gumroadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full rounded-full bg-brand-yellow px-8 py-4 text-center font-lilita text-sm tracking-[0.04em] text-brand-green shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
        >
          ✅ Check this before committing — $3 PDF
        </a>

        <p className="text-center font-sans text-[11px] text-ink-muted">
          One-time payment • Instant download • Created by a native Japanese speaker
        </p>
      </div>

      <p className="border-l-2 border-parchment-deep pl-3 font-sans text-xs leading-relaxed text-ink-muted">
        Tip: Show the PDF to your tattoo artist to confirm spacing, balance, and readability.
      </p>
    </div>
  );
}

// ─── Sticky CTA (mobile) ──────────────────────────────────────────────────────
interface StickyCTAProps {
  visible: boolean;
  allAnswered: boolean;
  unansweredCount: number;
  onGenerate: () => void;
}

function StickyCTA({
  visible,
  allAnswered,
  unansweredCount,
  onGenerate,
}: StickyCTAProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-4 sm:pb-4 md:hidden">
      <div className="mx-auto w-full max-w-2xl rounded-2xl border-2 border-parchment-deep/80 bg-white/85 p-3 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-white/75">
        <div className="flex items-center gap-3">
          <div
            className={`shrink-0 rounded-full px-3 py-1 text-xs ${
              allAnswered
                ? "bg-brand-yellow/80 font-lilita tracking-[0.03em] text-brand-green"
                : "bg-parchment font-sans text-ink-muted"
            }`}
          >
            {allAnswered
              ? "Ready ✨"
              : `Answer ${unansweredCount} more question${unansweredCount === 1 ? "" : "s"}`}
          </div>

          <button
            type="button"
            onClick={onGenerate}
            disabled={!allAnswered}
            className={`flex-1 rounded-full px-5 py-3 text-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow ${
              allAnswered
                ? "bg-brand-yellow font-lilita text-base tracking-[0.03em] text-brand-green shadow-md hover:-translate-y-0.5 hover:opacity-90"
                : "cursor-not-allowed bg-parchment-deep font-lilita text-base tracking-[0.03em] text-ink-muted"
            }`}
            aria-disabled={!allAnswered}
          >
            Generate my tattoo word
          </button>
        </div>

        {!allAnswered && (
          <p className="mt-2 text-center font-sans text-[11px] text-ink-muted">
            Complete all 3 answers to unlock your result preview
          </p>
        )}
      </div>
    </div>
  );
}

export default function QuizSection() {
  const [feeling, setFeeling] = useState<Feeling | null>(null);
  const [theme, setTheme] = useState<Theme | null>(null);
  const [placement, setPlacement] = useState<Placement | null>(null);
  const [showResult, setShowResult] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);

  const allAnswered = feeling !== null && theme !== null && placement !== null;
  const unansweredCount = [feeling, theme, placement].filter((v) => v === null).length;

  const resultKey: ResultKey | null =
    feeling && theme ? `${feeling}+${theme}` : null;
  const result = resultKey ? RESULTS[resultKey] : null;

  useEffect(() => {
    if (showResult && result) {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "generate_result",
        result_word: result.word,
      });

      console.log("generate_result fired:", result.word);
    }
  }, [showResult, result]);

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

  const placementText = placement ? PLACEMENT_SUGGESTIONS[placement] : "";

  return (
    <div className="flex w-full flex-col gap-10 pb-24 md:pb-0">
      {/* Questions */}
      <div className="flex flex-col gap-5">
        <QuestionBlock
          number={1}
          label={QUESTIONS.feeling.label}
          options={[...QUESTIONS.feeling.options]}
          selected={feeling}
          onChange={(v) => setFeeling(v as Feeling)}
        />

        <QuestionBlock
          number={2}
          label={QUESTIONS.theme.label}
          options={[...QUESTIONS.theme.options]}
          selected={theme}
          onChange={(v) => setTheme(v as Theme)}
        />

        <QuestionBlock
          number={3}
          label={QUESTIONS.placement.label}
          options={[...QUESTIONS.placement.options]}
          selected={placement}
          onChange={(v) => setPlacement(v as Placement)}
        />
      </div>

      {/* Generate Button (desktop only) */}
      <div className="hidden flex-col items-center gap-3 md:flex">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={!allAnswered}
          className={`w-full max-w-sm rounded-full px-8 py-4 font-lilita text-base tracking-[0.03em]
          transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow
          ${
            allAnswered
              ? "cursor-pointer bg-brand-yellow text-brand-green shadow-lg hover:-translate-y-0.5 hover:opacity-90"
              : "cursor-not-allowed bg-parchment-deep text-ink-muted"
          }`}
          aria-disabled={!allAnswered}
        >
          Generate my tattoo word
        </button>

        {!allAnswered && (
          <p className="font-sans text-xs text-ink-muted">
            Answer all 3 questions to continue
          </p>
        )}
      </div>

      {/* Result */}
      {showResult && result && (
        <div ref={resultRef} className="scroll-mt-12 flex flex-col gap-8">
          <div className="ornament-line">
            <span className="whitespace-nowrap text-sm font-lilita uppercase tracking-[0.06em] text-accent">
              Your word
            </span>
          </div>

          <ResultCard result={result} placementText={placementText} />

          <div className="pt-4 text-center">
            <button
              type="button"
              onClick={handleRetake}
              className="rounded font-sans text-sm text-ink-muted underline underline-offset-4 transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Start over
            </button>
          </div>
        </div>
      )}

      {/* Sticky CTA (mobile only) */}
      <StickyCTA
        visible={!showResult}
        allAnswered={allAnswered}
        unansweredCount={unansweredCount}
        onGenerate={handleGenerate}
      />

      {/* Toast (currently hidden unless you wire copy state later) */}
      <Toast visible={false} />
    </div>
  );
}