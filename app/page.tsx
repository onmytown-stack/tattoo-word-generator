"use client";

import QuizSection from "./components/QuizSection";

export default function Home() {
  const scrollToQuiz = () => {
    const el = document.getElementById("begin");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="min-h-screen bg-parchment">
      {/* ── Header ── */}
      <header className="w-full px-6 pt-6 pb-3 md:pt-8 md:pb-4 flex justify-center">
        <div className="w-full max-w-lg flex items-center justify-between">
          <span className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
            wa·bi
          </span>
          <span className="font-mono text-xs tracking-[0.12em] text-ink-muted">
            Japanese Tattoo Words
          </span>
        </div>
      </header>

      {/* ── Hero (Green) ── */}
      <section className="relative px-6 pt-10 pb-10 md:pt-14 md:pb-14 flex flex-col items-center text-center bg-brand-green text-brand-yellow overflow-hidden">
        <div className="max-w-lg w-full flex flex-col gap-5 md:gap-6">
          {/* Background kanji decoration */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none select-none kanji-display
                       opacity-[0.05] md:opacity-[0.08]
                       text-[170px] md:text-[240px] leading-none"
            style={{ top: "4.8rem", color: "rgba(246, 241, 231, 0.18)" }}
          >
            文
          </div>

          {/* Badge */}
          <div className="relative z-10 flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-cream/40 bg-brand-green/50 px-3 py-1.5 text-[0.65rem] md:text-[0.6875rem] font-mono tracking-[0.16em] md:tracking-widest uppercase text-brand-cream/90">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-yellow" />
              Human-picked by a native Japanese speaker
            </span>
          </div>

          {/* Headline */}
          <h1 className="relative z-10 font-lilita text-[1.65rem] leading-[1.12] tracking-[0.01em] md:text-5xl md:leading-[1.1]">
            Thinking of a Japanese tattoo?
            <br />
            Which word suits your <span className="italic">soul</span>?
          </h1>

          {/* Subline */}
          <p className="relative z-10 mx-auto max-w-md font-sans text-sm md:text-base leading-relaxed text-brand-cream/90">
            3 quick questions — then a word chosen for nuance.
            <br className="hidden sm:block" />
            Get a culturally accurate first read before it’s permanent.
          </p>

          {/* Hero CTA */}
          <div className="relative z-10 flex justify-center pt-1">
            <button
              onClick={scrollToQuiz}
              className="rounded-full bg-brand-yellow px-6 py-3 font-lilita text-sm md:text-base tracking-[0.03em] text-brand-green shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green"
            >
              Start quiz ↓
            </button>
          </div>

          {/* Small helper text (optional but useful on mobile) */}
          <p className="relative z-10 text-[11px] md:text-xs font-sans text-brand-cream/75">
            Takes less than 10 seconds · No signup required
          </p>
        </div>
      </section>

      {/* ── Quiz ── */}
      <section
        id="begin"
        className="scroll-mt-8 px-6 pt-6 md:pt-8 pb-24 flex flex-col items-center"
      >
        <div className="w-full max-w-lg">
          <QuizSection />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-parchment-deep px-6 py-8 text-center">
        <p className="font-sans text-xs text-ink-muted leading-relaxed max-w-sm mx-auto">
          These words are selected with cultural nuance in mind.
          <br />
          Tattoos are permanent — if you’re unsure, double-check with a native
          Japanese speaker and your tattoo artist before committing.
        </p>
        <p className="mt-4 font-mono text-[0.625rem] tracking-widest text-ink-muted uppercase opacity-60">
          © {new Date().getFullYear()} Wabi · Japanese Tattoo Words
        </p>
      </footer>
    </main>
  );
}