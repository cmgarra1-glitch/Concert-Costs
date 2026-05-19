import { ArtistsByGenre } from "@/components/ArtistsByGenre";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { groupArtistsByGenre } from "@/lib/artists";
import { getUserConcerts } from "@/lib/concerts";

export default async function ArtistsPage() {
  const concerts = await getUserConcerts();
  const artists = groupArtistsByGenre(concerts);

  return (
    <div className="page-section">
      <PageHeader
        title="Artists by genre"
        subtitle="Each genre you type when adding a concert gets its own category here — unlimited genres."
      />

      {concerts.length === 0 ? (
        <EmptyState message="Add concerts with a genre to build your artist list." />
      ) : (
        <ArtistsByGenre groups={artists} />
      )}
    </div>
  );
}
