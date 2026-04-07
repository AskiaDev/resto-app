"use client";

import { useState, useTransition } from "react";

export type Restaurant = {
  id: string;
  name: string;
  rating: number;
  address: string;
  latitude: number;
  longitude: number;
};

type Result = { city: string; restaurants: Restaurant[] };

export function useRestaurants() {
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function search(city: string) {
    const trimmed = city.trim();
    if (!trimmed) return;

    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch(
          `/api/restaurants?city=${encodeURIComponent(trimmed)}`,
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error ?? "Failed to fetch restaurants");
        }
        setResult({ city: trimmed, restaurants: data.restaurants });
      } catch (e) {
        setResult(null);
        setError(e instanceof Error ? e.message : "Unknown error");
      }
    });
  }

  return { result, error, isPending, search };
}
