import { ConcertCard } from "@/components/ConcertCard";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { getUserConcerts } from "@/lib/concerts";

export default async function ConcertsPage() {
  const concerts = await getUserConcerts();

  return (
    <div className="page-section">
      <PageHeader
        title="My Concerts"
        subtitle="Every show you have logged, with costs and fun scores."
      />

      {concerts.length === 0 ? (
        <EmptyState message="Add your first concert to start seeing your dashboard." />
      ) : (
        <div className="grid gap-4">
          {concerts.map((concert, index) => (
            <ConcertCard key={concert.id} concert={concert} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
