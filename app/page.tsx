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

      {/* ── Hero (Green) ── */}
      <section className="relative px-6 pt-12 pb-16 flex flex-col items-center text-center bg-brand-green text-brand-yellow">
        <div className="max-w-lg w-full flex flex-col gap-6">
          {/* Background kanji decoration */}
          {/* ② スマホでも薄く表示（opacity/text-sizeを調整） */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2 -translate-y-4
                       opacity-[0.06] md:opacity-[0.08]
                       pointer-events-none select-none kanji-display
                       text-[200px] md:text-[260px] leading-none"
            style={{ top: "6rem", color: "rgba(246, 241, 231, 0.22)" }}
          >
            文
          </div>

          {/* Badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 border border-brand-cream/25 bg-brand-green/60 px-3 py-1.5 rounded-full text-[0.6875rem] font-mono text-brand-cream/80 tracking-widest uppercase">
              <span className="w-1 h-1 rounded-full bg-brand-yellow inline-block" />
              Human-picked by a native Japanese speaker
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif font-light text-4xl md:text-5xl leading-[1.15] tracking-tight">
            Thinking of a Japanese tattoo?
            <br />
            Which word suits your <span className="text-brand-yellow italic">soul</span>?
          </h1>

          {/* Subline */}
          <p className="font-sans text-sm md:text-base leading-relaxed max-w-sm mx-auto text-brand-cream/85">
            3 quick questions — then a word chosen for nuance.
            <br />
            Before it’s permanent, get a culturally accurate first read.
          </p>

          {/* CTA */}
          <div className="flex justify-center pt-2">
            <a
              href="#begin"
              className="inline-flex items-center justify-center rounded-full bg-brand-yellow px-8 py-3 font-mono text-xs tracking-widest uppercase text-brand-green hover:opacity-90 transition shadow-lg"
            >
              Begin
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-2 pt-2">
            <span className="text-xs font-mono tracking-widest uppercase text-brand-cream/70">
              Scroll to begin
            </span>
            <div className="flex flex-col gap-1 items-center">
              <span className="w-px h-8 bg-gradient-to-b from-brand-cream/35 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Quiz ── */}
      {/* ① scroll-mt を追加してスクロール位置を気持ちよく */}
      <section
        id="begin"
        className="scroll-mt-10 px-6 pb-24 pt-10 flex flex-col items-center"
      >
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