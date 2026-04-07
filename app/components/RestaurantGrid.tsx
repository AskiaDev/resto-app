import type { Restaurant } from "../useRestaurants";
import { RestaurantCard } from "./RestaurantCard";

type Props = {
  city: string;
  restaurants: Restaurant[];
};

export function RestaurantGrid({ city, restaurants }: Props) {
  const [featured, ...rest] = restaurants;

  return (
    <>
      <div className="flex items-baseline justify-between border-b border-rule pb-4 mb-8">
        <h2 className="font-display text-2xl md:text-3xl">
          Eating in <em className="italic">{city}</em>
        </h2>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          {restaurants.length} places
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-rule border border-rule">
        {featured && (
          <RestaurantCard
            restaurant={featured}
            featured
            className="sm:col-span-2 lg:col-span-2 lg:row-span-2"
          />
        )}
        {rest.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} />
        ))}
      </div>
    </>
  );
}
