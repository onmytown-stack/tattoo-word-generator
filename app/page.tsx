import QuizSection from "./components/QuizSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-parchment">
      {/* ── Header ── */}
      <header className="w-full pt-8 pb-4 px-6 flex justify-center">
        <div className="w-full max-w-lg flex items-center justify-between">
          <span className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
            wa·bi
          </span>
          <span className="font-mono text-xs tracking-[0.12em] text-ink-muted">
            Japanese Tattoo Words
          </span>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="px-6 pt-12 pb-16 flex flex-col items-center text-center">
        <div className="max-w-lg w-full flex flex-col gap-6">
          {/* Background kanji decoration */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2 -translate-y-4 opacity-[0.04] pointer-events-none select-none kanji-display text-[260px] text-ink leading-none hidden md:block"
            style={{ top: "6rem" }}
          >
            文
          </div>

          {/* Badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 border border-parchment-deep bg-parchment-soft px-3 py-1.5 rounded-full text-[0.6875rem] font-mono text-ink-muted tracking-widest uppercase">
              <span className="w-1 h-1 rounded-full bg-accent inline-block" />
              Native Japanese sourced
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif font-light text-4xl md:text-5xl text-ink leading-[1.15] tracking-tight">
            Find your{" "}
            <span className="italic text-accent">Japanese</span>
            <br />
            tattoo word
          </h1>

          {/* Subline */}
          <p className="font-sans text-sm md:text-base text-ink-muted leading-relaxed max-w-sm mx-auto">
            3 quick questions. A word selected with nuance by a native Japanese
            creator.
          </p>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-2 pt-2">
            <span className="text-xs font-mono text-ink-muted tracking-widest uppercase">
              Scroll to begin
            </span>
            <div className="flex flex-col gap-1 items-center">
              <span className="w-px h-8 bg-gradient-to-b from-parchment-deep to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Quiz ── */}
      <section className="px-6 pb-24 flex flex-col items-center">
        <div className="w-full max-w-lg">
          {/* Ornament line */}
          <div className="ornament-line mb-12">
            <span className="text-xs font-mono tracking-[0.2em] text-accent uppercase whitespace-nowrap">
              Begin
            </span>
          </div>

          <QuizSection />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-parchment-deep px-6 py-8 text-center">
        <p className="font-sans text-xs text-ink-muted leading-relaxed max-w-sm mx-auto">
          Words are carefully selected for cultural accuracy and tattoo
          suitability. Always consult a professional tattoo artist and a native
          speaker before making a permanent decision.
        </p>
        <p className="mt-4 font-mono text-[0.625rem] tracking-widest text-ink-muted uppercase opacity-60">
          © {new Date().getFullYear()} Wabi · Japanese Tattoo Words
        </p>
      </footer>
    </main>
  );
}
