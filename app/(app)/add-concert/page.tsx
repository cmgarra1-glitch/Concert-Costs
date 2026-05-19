import { ConcertForm } from "@/components/ConcertForm";
import { PageHeader } from "@/components/PageHeader";
import { getUserConcerts } from "@/lib/concerts";
import { getDistinctGenres } from "@/lib/genre";

export default async function AddConcertPage() {
  const concerts = await getUserConcerts();
  const genreSuggestions = getDistinctGenres(
    concerts.map((c) => c.genre ?? ""),
  );

  return (
    <>
      <PageHeader
        title="Add Concert"
        subtitle="Log a show you attended. Type any genre you want (not just Pop, Country, or Rap) — it will appear on your Artists tab."
      />
      <ConcertForm genreSuggestions={genreSuggestions} />
    </>
  );
}
