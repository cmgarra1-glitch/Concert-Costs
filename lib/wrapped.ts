import { enrichConcert, formatCurrency, formatDate } from "@/lib/calculations";
import type { Concert } from "@/lib/types";

export type AnnualWrapped = {
  year: number;
  totalSpent: number;
  concertsAttended: number;
  topArtist: string | null;
  topArtistShowCount: number;
  milesTraveled: number;
  favoriteShow: {
    concertName: string;
    artist: string;
    venue: string;
    city: string;
    state: string;
    date: string;
    funRating: number;
    totalCost: number;
  } | null;
};

export function getConcertYear(concertDate: string): number {
  return Number(concertDate.split("-")[0]);
}

export function getAvailableYears(concerts: Concert[]): number[] {
  const years = new Set(concerts.map((c) => getConcertYear(c.concert_date)));
  if (years.size === 0) {
    return [new Date().getFullYear()];
  }
  return [...years].sort((a, b) => b - a);
}

export function filterConcertsByYear(
  concerts: Concert[],
  year: number,
): Concert[] {
  return concerts.filter((c) => getConcertYear(c.concert_date) === year);
}

export function getAnnualWrapped(
  concerts: Concert[],
  year: number,
): AnnualWrapped | null {
  const yearConcerts = filterConcertsByYear(concerts, year);
  if (yearConcerts.length === 0) return null;

  const enriched = yearConcerts.map(enrichConcert);
  const totalSpent = enriched.reduce((s, e) => s + e.totalCost, 0);
  const milesTraveled = yearConcerts.reduce(
    (s, c) => s + Number(c.distance_from_home ?? 0),
    0,
  );

  const artistCounts = new Map<string, { name: string; count: number }>();
  for (const c of yearConcerts) {
    const key = c.artist.trim().toLowerCase();
    const existing = artistCounts.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      artistCounts.set(key, { name: c.artist.trim(), count: 1 });
    }
  }

  let topArtist: string | null = null;
  let topArtistShowCount = 0;
  for (const { name, count } of artistCounts.values()) {
    if (count > topArtistShowCount) {
      topArtistShowCount = count;
      topArtist = name;
    }
  }

  const favorite = enriched.reduce((best, curr) => {
    if (curr.concert.fun_rating > best.concert.fun_rating) return curr;
    if (
      curr.concert.fun_rating === best.concert.fun_rating &&
      curr.concert.concert_date > best.concert.concert_date
    ) {
      return curr;
    }
    return best;
  });

  return {
    year,
    totalSpent,
    concertsAttended: yearConcerts.length,
    topArtist,
    topArtistShowCount,
    milesTraveled,
    favoriteShow: {
      concertName: favorite.concert.concert_name,
      artist: favorite.concert.artist,
      venue: favorite.concert.venue,
      city: favorite.concert.city,
      state: favorite.concert.state,
      date: formatDate(favorite.concert.concert_date),
      funRating: favorite.concert.fun_rating,
      totalCost: favorite.totalCost,
    },
  };
}

export function buildShareText(wrapped: AnnualWrapped): string {
  const lines = [
    `My ${wrapped.year} Concert Wrapped`,
    "",
    `Total spent: ${formatCurrency(wrapped.totalSpent)}`,
    `Concerts attended: ${wrapped.concertsAttended}`,
  ];

  if (wrapped.topArtist) {
    lines.push(
      `Top artist: ${wrapped.topArtist} (${wrapped.topArtistShowCount} show${wrapped.topArtistShowCount === 1 ? "" : "s"})`,
    );
  }

  lines.push(`Miles traveled: ${Math.round(wrapped.milesTraveled)}`);

  if (wrapped.favoriteShow) {
    lines.push(
      "",
      `Favorite show: ${wrapped.favoriteShow.concertName}`,
      `${wrapped.favoriteShow.artist} · ${wrapped.favoriteShow.venue}`,
      `${wrapped.favoriteShow.city}, ${wrapped.favoriteShow.state} · ${wrapped.favoriteShow.date}`,
      `Fun rating: ${wrapped.favoriteShow.funRating}/10`,
    );
  }

  lines.push("", "Tracked with Concert Cost Tracker");
  return lines.join("\n");
}
