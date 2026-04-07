import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city")?.trim();

  if (!city) {
    return NextResponse.json({ error: "Missing 'city' query param" }, { status: 400 });
  }

  const apiKey = process.env.YELP_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server misconfigured: YELP_API_KEY not set" },
      { status: 500 },
    );
  }

  // Yelp Fusion: 5-mile radius ≈ 8047 meters (max allowed: 40000)
  const url = new URL("https://api.yelp.com/v3/businesses/search");
  url.searchParams.set("location", city);
  url.searchParams.set("term", "restaurants");
  url.searchParams.set("radius", "8047");
  url.searchParams.set("limit", "20");

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json(
      { error: `Yelp API error (${res.status})`, detail: text },
      { status: res.status },
    );
  }

  const data = (await res.json()) as {
    businesses: Array<{
      id: string;
      name: string;
      rating: number;
      coordinates: { latitude: number; longitude: number };
      location: { display_address: string[] };
    }>;
  };

  const restaurants = data.businesses.map((b) => ({
    id: b.id,
    name: b.name,
    rating: b.rating,
    address: b.location.display_address.join(", "),
    latitude: b.coordinates.latitude,
    longitude: b.coordinates.longitude,
  }));

  return NextResponse.json({ restaurants });
}
