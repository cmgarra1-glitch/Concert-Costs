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

  const byArtist = new Map<
    string,
    { name: string; genreKey: string; showCount: number; latestDate: string }
  >();

  for (const concert of concerts) {
    const gKey = genreKey(concert.genre ?? "");
    if (!gKey) continue;

    const artistKey = concert.artist.trim().toLowerCase();
    const existing = byArtist.get(artistKey);

    if (!existing) {
      byArtist.set(artistKey, {
        name: concert.artist.trim(),
        genreKey: gKey,
        showCount: 1,
        latestDate: concert.concert_date,
      });
      continue;
    }

    existing.showCount += 1;
    if (concert.concert_date > existing.latestDate) {
      existing.latestDate = concert.concert_date;
      existing.genreKey = gKey;
    }
  }

  const groups = new Map<string, ArtistEntry[]>();

  for (const { name, genreKey: gKey, showCount } of byArtist.values()) {
    const list = groups.get(gKey) ?? [];
    list.push({
      name,
      genre: genreLabels.get(gKey)?.label ?? gKey,
      showCount,
    });
    groups.set(gKey, list);
  }

  return [...groups.entries()]
    .map(([key, artists]) => ({
      genre: genreLabels.get(key)?.label ?? key,
      artists: artists.sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.genre.localeCompare(b.genre));
}
