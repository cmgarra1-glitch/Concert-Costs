import { genreKey, normalizeGenre } from "@/lib/genre";
import type { Concert } from "@/lib/types";

export type ArtistEntry = {
  name: string;
  genre: string;
  showCount: number;
};

export type GenreGroup = {
  genre: string;
  artists: ArtistEntry[];
};

/** One section per genre you have logged; artists appear in every genre they played */
export function groupArtistsByGenre(concerts: Concert[]): GenreGroup[] {
  const genreLabels = new Map<string, { label: string; latestDate: string }>();

  for (const concert of concerts) {
    const key = genreKey(concert.genre ?? "");
    if (!key) continue;
    const label = normalizeGenre(concert.genre);
    const prev = genreLabels.get(key);
    if (!prev || concert.concert_date >= prev.latestDate) {
      genreLabels.set(key, { label, latestDate: concert.concert_date });
    }
  }

  const groups = new Map<
    string,
    Map<string, { name: string; showCount: number }>
  >();

  for (const concert of concerts) {
    const gKey = genreKey(concert.genre ?? "");
    if (!gKey) continue;

    const artistKey = concert.artist.trim().toLowerCase();
    if (!artistKey) continue;

    if (!groups.has(gKey)) {
      groups.set(gKey, new Map());
    }

    const artistsInGenre = groups.get(gKey)!;
    const existing = artistsInGenre.get(artistKey);

    if (existing) {
      existing.showCount += 1;
    } else {
      artistsInGenre.set(artistKey, {
        name: concert.artist.trim(),
        showCount: 1,
      });
    }
  }

  return [...groups.entries()]
    .map(([key, artistMap]) => ({
      genre: genreLabels.get(key)?.label ?? key,
      artists: [...artistMap.values()]
        .map((a) => ({
          name: a.name,
          genre: genreLabels.get(key)?.label ?? key,
          showCount: a.showCount,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.genre.localeCompare(b.genre));
}
