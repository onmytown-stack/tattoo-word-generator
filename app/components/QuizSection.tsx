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

// ─── GA4 helper ───────────────────────────────────────────────────────────────
function pushGAEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined") return;

  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({
    event: eventName,
    ...params,
  });

  // Debug (remove later if you want)
  console.log(`[GA4] ${eventName}`, params);
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 toast-enter">
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
  return (
    <label
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

// ─── Step Progress ────────────────────────────────────────────────────────────
function StepProgress({ step }: { step: 1 | 2 | 3 }) {
  const progress = (step / 3) * 100;

  return (
    <div className="mb-4 rounded-2xl border border-parchment-deep bg-white/70 p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-lilita text-sm tracking-[0.03em] text-ink">
          Step {step} of 3
        </p>
        <p className="font-sans text-xs text-ink-muted">Quick quiz</p>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-parchment">
        <div
          className="h-full rounded-full bg-brand-yellow transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// ─── Question Step Card ───────────────────────────────────────────────────────
interface QuestionStepCardProps {
  step: 1 | 2 | 3;
  label: string;
  options: { value: string; label: string; description: string }[];
  selected: string | null;
  onSelect: (v: string) => void;
  onBack?: () => void;
  showGenerate?: boolean;
  onGenerate?: () => void;
  canGenerate?: boolean;
}

function QuestionStepCard({
  step,
  label,
  options,
  selected,
  onSelect,
  onBack,
  showGenerate = false,
  onGenerate,
  canGenerate = false,
}: QuestionStepCardProps) {
  const groupName = `question-${step}`;

  return (
    <div className="flex flex-col gap-5">
      <StepProgress step={step} />

      <section className="rounded-3xl border-2 border-parchment-deep bg-white/70 p-5 shadow-sm md:p-6">
        <div className="mb-4 flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-8 min-w-8 items-center justify-center rounded-full border-2 border-accent/20 bg-brand-yellow/70 px-2 font-lilita text-xs tracking-[0.03em] text-brand-green shadow-sm">
            {String(step).padStart(2, "0")}
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
              onChange={onSelect}
            />
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            disabled={!onBack}
            className={`rounded-full px-4 py-2 text-sm transition ${
              onBack
                ? "border border-parchment-deep bg-white text-ink hover:bg-parchment"
                : "cursor-not-allowed border border-parchment-deep/60 bg-white/40 text-ink-muted"
            }`}
          >
            ← Back
          </button>

          <p className="font-sans text-[11px] text-ink-muted">
            Takes less than 10 seconds
          </p>
        </div>

        {showGenerate && (
          <div className="mt-5 border-t border-parchment-deep pt-5">
            <button
              type="button"
              onClick={onGenerate}
              disabled={!canGenerate}
              className={`w-full rounded-full px-8 py-4 font-lilita text-base tracking-[0.03em]
              transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow
              ${
                canGenerate
                  ? "cursor-pointer bg-brand-yellow text-brand-green shadow-lg hover:-translate-y-0.5 hover:opacity-90"
                  : "cursor-not-allowed bg-parchment-deep text-ink-muted"
              }`}
              aria-disabled={!canGenerate}
            >
              Generate my tattoo word
            </button>

            {!canGenerate && (
              <p className="mt-2 text-center font-sans text-xs text-ink-muted">
                Answer all 3 questions to continue
              </p>
            )}
          </div>
        )}
      </section>
    </div>
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
  onCtaClick?: () => void;
}

function ResultCard({ result, placementText, onCtaClick }: ResultCardProps) {
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
            Created to help you decide with confidence — before anything becomes
            permanent.
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
          onClick={onCtaClick}
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

// ─── Main Quiz Section ────────────────────────────────────────────────────────
type Step = 1 | 2 | 3 | 4; // 4 = result

export default function QuizSection() {
  const [feeling, setFeeling] = useState<Feeling | null>(null);
  const [theme, setTheme] = useState<Theme | null>(null);
  const [placement, setPlacement] = useState<Placement | null>(null);

  const [step, setStep] = useState<Step>(1);
  const [showResult, setShowResult] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);

  const allAnswered = feeling !== null && theme !== null && placement !== null;

  const resultKey: ResultKey | null =
    feeling && theme ? `${feeling}+${theme}` : null;
  const result = resultKey ? RESULTS[resultKey] : null;

  const placementText = placement ? PLACEMENT_SUGGESTIONS[placement] : "";

  // generate_result
  useEffect(() => {
    if (showResult && result) {
      pushGAEvent("generate_result", {
        result_word: result.word,
        feeling,
        theme,
        placement,
      });
    }
  }, [showResult, result, feeling, theme, placement]);

  const goToStep = (next: Step) => {
    setStep(next);
    setTimeout(() => {
      const el = document.getElementById("quiz-step-top");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 30);
  };

  const handleSelectFeeling = (v: string) => {
    const isFirstAnswer = feeling === null;

    setFeeling(v as Feeling);
    setShowResult(false);

    if (isFirstAnswer) {
      pushGAEvent("start_quiz", { source: "q1_selection" });
    }

    pushGAEvent("select_q1", {
      question: "feeling",
      answer: v,
    });

    setTimeout(() => goToStep(2), 120);
  };

  const handleSelectTheme = (v: string) => {
    setTheme(v as Theme);
    setShowResult(false);

    pushGAEvent("select_q2", {
      question: "theme",
      answer: v,
    });

    setTimeout(() => goToStep(3), 120);
  };

  const handleSelectPlacement = (v: string) => {
    setPlacement(v as Placement);
    setShowResult(false);

    pushGAEvent("select_q3", {
      question: "placement",
      answer: v,
    });
  };

  const handleGenerate = () => {
    if (!allAnswered) return;

    setShowResult(true);
    setStep(4);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const handleRetake = () => {
    setShowResult(false);
    setFeeling(null);
    setTheme(null);
    setPlacement(null);
    setStep(1);

    setTimeout(() => {
      const el = document.getElementById("quiz-step-top");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <div className="flex w-full flex-col gap-8">
      {/* anchor for smooth step scroll */}
      <div id="quiz-step-top" className="scroll-mt-24" />

      {/* Step screens */}
      {!showResult && step === 1 && (
        <QuestionStepCard
          step={1}
          label={QUESTIONS.feeling.label}
          options={[...QUESTIONS.feeling.options]}
          selected={feeling}
          onSelect={handleSelectFeeling}
        />
      )}

      {!showResult && step === 2 && (
        <QuestionStepCard
          step={2}
          label={QUESTIONS.theme.label}
          options={[...QUESTIONS.theme.options]}
          selected={theme}
          onSelect={handleSelectTheme}
          onBack={() => goToStep(1)}
        />
      )}

      {!showResult && step === 3 && (
        <QuestionStepCard
          step={3}
          label={QUESTIONS.placement.label}
          options={[...QUESTIONS.placement.options]}
          selected={placement}
          onSelect={handleSelectPlacement}
          onBack={() => goToStep(2)}
          showGenerate
          onGenerate={handleGenerate}
          canGenerate={allAnswered}
        />
      )}

      {/* Result */}
      {showResult && result && (
        <div ref={resultRef} className="scroll-mt-12 flex flex-col gap-8">
          <div className="ornament-line">
            <span className="whitespace-nowrap text-sm font-lilita uppercase tracking-[0.06em] text-accent">
              Your word
            </span>
          </div>

          <ResultCard
            result={result}
            placementText={placementText}
            onCtaClick={() => {
              pushGAEvent("click_gumroad_cta", {
                result_word: result.word,
                feeling,
                theme,
                placement,
                gumroad_url: result.gumroadUrl,
              });
            }}
          />

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

      <Toast visible={false} />
    </div>
  );
}