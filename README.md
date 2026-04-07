# Resto

A restaurant finder built with Next.js 16 and the Yelp Fusion API. Search any city and get a clean list of nearby restaurants with their name, rating, address, and coordinates.

## Preview

| | |
|---|---|
| ![Search view](public/demo1.png) | ![Results view](public/demo2.png) |

## Getting Started

Copy the example env file and add your Yelp API key:

```bash
cp .env.local.example .env.local
```

Then run the dev server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Approach

The app is built with Next.js 16. The search page talks to Yelp through a server-side API route — that's what keeps the API key off the client and out of the browser.

```ts
// app/api/restaurants/route.ts
const apiKey = process.env.YELP_API_KEY;

const url = new URL("https://api.yelp.com/v3/businesses/search");
url.searchParams.set("location", city);
url.searchParams.set("term", "restaurants");
url.searchParams.set("radius", "8047");
url.searchParams.set("limit", "20");

const res = await fetch(url, {
  headers: { Authorization: `Bearer ${apiKey}` },
  cache: "no-store",
});
```

On the client, a `useRestaurants` hook handles the fetch and uses React's `useTransition` to track the loading state, which is cleaner than manually flipping an `isLoading` boolean on and off.

```ts
// app/useRestaurants.ts
const [isPending, startTransition] = useTransition();

function search(city: string) {
  setError(null);
  startTransition(async () => {
    const res = await fetch(`/api/restaurants?city=${encodeURIComponent(city)}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Failed to fetch restaurants");
    setResult({ city, restaurants: data.restaurants });
  });
}
```

For the Yelp call, I'm using their `/v3/businesses/search` endpoint with the city name passed as plain text. I chose the text-based location over passing raw coordinates because Yelp handles the geocoding for us — no need to add a separate service like Google Maps just to turn a city name into lat/lng before making the call. I went with `term=restaurants` as the filter since it maps directly to what the user is looking for; `categories=restaurants` is a stricter option that filters against Yelp's own category list, and would be worth switching to if we started seeing irrelevant results. Outside of that, the setup is kept minimal: one API route, one hook, and a few straightforward components for the layout.

---

## Edge Cases & Accuracy

For accuracy, the 5-mile radius (`radius=8047` — Yelp uses meters) keeps results focused on the actual city and prevents searches for places like "Los Angeles" from pulling in restaurants from a completely different city nearby. The address and coordinates come directly from Yelp's response without any modification on our end — the only thing we do is round the coordinates to 4 decimal places for display. We don't touch the address format at all, since rewriting it is usually how data ends up looking wrong.

```ts
// app/api/restaurants/route.ts
const restaurants = data.businesses.map((b) => ({
  id: b.id,
  name: b.name,
  rating: b.rating,
  address: b.location.display_address.join(", "),
  latitude: b.coordinates.latitude,
  longitude: b.coordinates.longitude,
}));
```

The one edge case we ran into was with the time-of-day greeting — the headline that says "where to eat this morning" or "tonight" depending on the hour. The problem is that when the page first loads on the server, it computes the time in UTC. But the user's browser runs in their own local timezone, so the two values don't always match. React notices that mismatch and throws a warning. We didn't want to delay showing the greeting until after the page loads in the browser, because that causes a visible flash where it briefly shows nothing. The fix was to keep the time check running on both sides as-is, but tell React to ignore the mismatch on just that one element using `suppressHydrationWarning`.

```tsx
// app/components/Masthead.tsx
function getTimeOfDay(): string {
  const h = new Date().getHours();
  if (h >= 5 && h < 11) return "this morning";
  if (h >= 11 && h < 17) return "this afternoon";
  if (h >= 17 && h < 22) return "tonight";
  return "right now";
}

// suppressHydrationWarning scoped to this one element only
<span suppressHydrationWarning>{getTimeOfDay()}</span>
```

The server still renders a valid greeting, the browser quietly replaces it with the correct local time on load, and everything else on the page stays fully checked for mismatches.
