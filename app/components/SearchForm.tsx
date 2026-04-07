"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  onSearch: (city: string) => void;
  isPending: boolean;
};

export function SearchForm({ onSearch, isPending }: Props) {
  const [city, setCity] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key !== "/") return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }
      e.preventDefault();
      inputRef.current?.focus();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    onSearch(city);
  }

  return (
    <section className="border-b border-rule px-6 md:px-12 lg:px-20 py-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-8"
      >
        <label className="flex-1 min-w-0">
          <span className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2">
            <span>① Enter a city</span>
            <kbd className="border border-rule px-1.5 py-0.5 rounded-sm text-foreground/70 normal-case tracking-normal">
              Press /
            </kbd>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="San Francisco, Tokyo, Lisbon…"
            className="w-full bg-transparent border-b border-foreground/30 focus:border-foreground focus:outline-none font-display text-3xl md:text-5xl pb-2 placeholder:text-muted/50 transition-colors"
            disabled={isPending}
            autoFocus
          />
        </label>
        <button
          type="submit"
          disabled={isPending || !city.trim()}
          className="group shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] border border-foreground px-6 py-4 hover:bg-foreground hover:text-background transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-foreground"
        >
          {isPending ? "Searching…" : "Find Places →"}
        </button>
      </form>
    </section>
  );
}
