"use client";

import { useState, FormEvent } from "react";

type Restaurant = {
  id: string;
  name: string;
  rating: number;
  address: string;
  latitude: number;
  longitude: number;
};

export default function Home() {
  const [city, setCity] = useState("");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedCity, setSearchedCity] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = city.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setRestaurants([]);

    try {
      const res = await fetch(`/api/restaurants?city=${encodeURIComponent(trimmed)}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Failed to fetch restaurants");
      }
      setRestaurants(data.restaurants);
      setSearchedCity(trimmed);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50 mb-2">
          Restaurant Finder
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Search restaurants by city using the Yelp Fusion API.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter a city (e.g. San Francisco)"
            className="flex-1 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !city.trim()}
            className="rounded-md bg-black dark:bg-white text-white dark:text-black px-5 py-2 font-medium disabled:opacity-50"
          >
            {loading ? "Searching…" : "Search"}
          </button>
        </form>

        {error && (
          <div className="rounded-md border border-red-300 bg-red-50 text-red-800 px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {searchedCity && !loading && !error && restaurants.length === 0 && (
          <p className="text-zinc-600 dark:text-zinc-400">
            No restaurants found for &ldquo;{searchedCity}&rdquo;.
          </p>
        )}

        {restaurants.length > 0 && (
          <ul className="space-y-4">
            {restaurants.map((r) => (
              <li
                key={r.id}
                className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4"
              >
                <div className="flex justify-between items-start gap-4">
                  <h2 className="font-semibold text-black dark:text-zinc-50">{r.name}</h2>
                  <span className="text-sm font-medium text-amber-600 dark:text-amber-400 whitespace-nowrap">
                    ★ {r.rating.toFixed(1)}
                  </span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{r.address}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1 font-mono">
                  {r.latitude.toFixed(5)}, {r.longitude.toFixed(5)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
