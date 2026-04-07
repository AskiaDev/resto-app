function getTimeOfDay(): string {
  const h = new Date().getHours();
  if (h >= 5 && h < 11) return "this morning";
  if (h >= 11 && h < 17) return "this afternoon";
  if (h >= 17 && h < 22) return "tonight";
  return "right now";
}

export function Masthead() {
  return (
    <header className="border-b border-rule px-6 md:px-12 lg:px-20 pt-12 pb-10">
      <div className="flex items-baseline justify-between gap-6 mb-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          Vol. 01 — A Field Guide
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted hidden sm:inline">
          Powered by Yelp Fusion
        </span>
      </div>

      <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.88] tracking-[-0.035em] font-light">
        Where to <em className="italic font-normal">eat</em>,
        <br />
        <span suppressHydrationWarning>{getTimeOfDay()}</span>.
      </h1>

      <p className="font-display italic text-xl md:text-2xl text-muted mt-8 max-w-2xl leading-snug">
        A clean, honest list of restaurants — anywhere you happen to be. Search
        a city to begin.
      </p>
    </header>
  );
}
