import { GENRES } from "@/lib/constants";
import type { Concert, Genre } from "@/lib/types";

export type ArtistEntry = {
  name: string;
  genre: Genre;
  showCount: number;
};

export type ArtistsByGenre = Record<Genre, ArtistEntry[]>;

export function groupArtistsByGenre(concerts: Concert[]): ArtistsByGenre {
  const byArtist = new Map<
    string,
    { name: string; genre: Genre; showCount: number; latestDate: string }
  >();

  for (const concert of concerts) {
    const key = concert.artist.trim().toLowerCase();
    const existing = byArtist.get(key);

    if (!existing) {
      byArtist.set(key, {
        name: concert.artist.trim(),
        genre: concert.genre,
        showCount: 1,
        latestDate: concert.concert_date,
      });
      continue;
    }

    existing.showCount += 1;
    if (concert.concert_date > existing.latestDate) {
      existing.latestDate = concert.concert_date;
      existing.genre = concert.genre;
    }
  }

  const result: ArtistsByGenre = {
    Country: [],
    Rap: [],
    Pop: [],
  };

  for (const { name, genre, showCount } of byArtist.values()) {
    result[genre].push({ name, genre, showCount });
  }

  for (const g of GENRES) {
    result[g].sort((a, b) => a.name.localeCompare(b.name));
  }

  return result;
}
