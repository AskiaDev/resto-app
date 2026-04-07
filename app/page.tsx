"use client";

import { Footer } from "./components/Footer";
import { Masthead } from "./components/Masthead";
import { RestaurantGrid } from "./components/RestaurantGrid";
import { SearchForm } from "./components/SearchForm";
import { useRestaurants } from "./useRestaurants";

export default function Home() {
  const { result, error, isPending, search } = useRestaurants();

  const showEmptyState =
    result !== null && result.restaurants.length === 0 && !isPending && !error;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Masthead />
      <SearchForm onSearch={search} isPending={isPending} />

      <section className="px-6 md:px-12 lg:px-20 py-12">
        {error && (
          <div className="border border-accent/40 bg-accent/5 text-accent px-5 py-4 font-mono text-sm">
            ✗ {error}
          </div>
        )}

        {showEmptyState && (
          <p className="font-display italic text-2xl text-muted">
            Nothing found in &ldquo;{result.city}&rdquo;. Try another city.
          </p>
        )}

        {!result && !error && !isPending && (
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            ◯ Awaiting input
          </div>
        )}

        {result && result.restaurants.length > 0 && (
          <RestaurantGrid
            city={result.city}
            restaurants={result.restaurants}
          />
        )}
      </section>

      <Footer />
    </main>
  );
}
