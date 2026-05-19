import { ConcertMapClient } from "@/components/ConcertMapClient";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { getUserConcerts } from "@/lib/concerts";
import { groupConcertsByCity } from "@/lib/mapLocations";

export default async function MapPage() {
  const concerts = await getUserConcerts();
  const mapData = groupConcertsByCity(concerts);

  return (
    <div className="page-section">
      <PageHeader
        title="Concert map"
        subtitle="See where you have been to shows across the United States."
      />

      {concerts.length === 0 ? (
        <EmptyState
          title="No pins yet"
          message="Log concerts with a city and state to see them on the map."
        />
      ) : mapData.pins.length === 0 ? (
        <EmptyState
          title="Cities need a match"
          message="We could not place your cities on the map. Use common city names like Memphis, Chicago, or Los Angeles with a two-letter state."
          showAddLink={false}
        />
      ) : (
        <ConcertMapClient data={mapData} />
      )}
    </div>
  );
}
