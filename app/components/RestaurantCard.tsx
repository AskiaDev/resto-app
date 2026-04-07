import type { Restaurant } from "../useRestaurants";

type Props = {
  restaurant: Restaurant;
  featured?: boolean;
  className?: string;
};

export function RestaurantCard({
  restaurant,
  featured = false,
  className = "",
}: Props) {
  return (
    <article
      className={`group bg-card relative flex flex-col justify-between p-6 md:p-8 transition-colors hover:bg-background ${className}`}
    >
      <div className="flex items-start justify-between gap-4 mb-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          {featured ? "Featured" : "Listing"}
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-accent text-sm">★</span>
          <span
            className={`font-display tabular-nums ${
              featured ? "text-3xl" : "text-2xl"
            }`}
          >
            {restaurant.rating.toFixed(1)}
          </span>
        </div>
      </div>

      <div>
        <h3
          className={`font-display leading-[0.95] tracking-[-0.02em] mb-4 ${
            featured ? "text-5xl md:text-6xl" : "text-3xl"
          }`}
        >
          {restaurant.name}
        </h3>

        <p
          className={`text-muted leading-snug ${
            featured ? "text-base max-w-md" : "text-sm"
          }`}
        >
          {restaurant.address}
        </p>

        <div className="border-t border-rule mt-6 pt-3 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Coords
          </span>
          <span className="font-mono text-[10px] text-muted tabular-nums">
            {restaurant.latitude.toFixed(4)}, {restaurant.longitude.toFixed(4)}
          </span>
        </div>
      </div>
    </article>
  );
}
