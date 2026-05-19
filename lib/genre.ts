/** Trim and collapse extra whitespace for display and storage */
export function normalizeGenre(genre: string): string {
  return genre.trim().replace(/\s+/g, " ");
}

export function genreKey(genre: string): string {
  return normalizeGenre(genre).toLowerCase();
}

export function getDistinctGenres(
  genres: Iterable<string>,
): string[] {
  const map = new Map<string, string>();
  for (const raw of genres) {
    const key = genreKey(raw);
    if (!key) continue;
    map.set(key, normalizeGenre(raw));
  }
  return [...map.values()].sort((a, b) => a.localeCompare(b));
}
