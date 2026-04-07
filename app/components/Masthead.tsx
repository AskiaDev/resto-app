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
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="https://github.com/AskiaDev/resto-app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
            className="text-muted hover:text-foreground transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Powered by Yelp Fusion
          </span>
        </div>
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
