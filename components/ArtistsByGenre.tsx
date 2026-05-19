import { Music2 } from "lucide-react";
import { GENRES } from "@/lib/constants";
import type { ArtistsByGenre as ArtistsByGenreData } from "@/lib/artists";

type ArtistsByGenreProps = {
  artists: ArtistsByGenreData;
};

const GENRE_HINTS: Record<(typeof GENRES)[number], string> = {
  Country: "Boots, trucks, and twang",
  Rap: "Beats, bars, and energy",
  Pop: "Hooks, choruses, and stadium lights",
};

export function ArtistsByGenre({ artists }: ArtistsByGenreProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {GENRES.map((genre) => {
        const list = artists[genre];
        return (
          <div key={genre} className="collapse collapse-arrow app-card">
            <input
              type="checkbox"
              defaultChecked
              aria-label={`Toggle ${genre} artists`}
            />
            <div className="collapse-title flex items-center gap-2 font-semibold">
              <Music2 className="h-5 w-5 text-primary" aria-hidden />
              {genre}
              <span className="badge badge-ghost badge-sm">
                {list.length}
              </span>
            </div>
            <div className="collapse-content">
              <p className="mb-3 text-xs text-base-content/60">
                {GENRE_HINTS[genre]}
              </p>
              {list.length === 0 ? (
                <p className="text-sm text-base-content/70">
                  No {genre.toLowerCase()} artists yet. Add a concert and pick
                  this genre.
                </p>
              ) : (
                <ul className="space-y-2">
                  {list.map((a) => (
                    <li
                      key={a.name}
                      className="flex items-center justify-between rounded-lg bg-base-200/60 px-3 py-2 text-sm"
                    >
                      <span className="font-medium">{a.name}</span>
                      <span className="text-xs text-base-content/60">
                        {a.showCount} show{a.showCount === 1 ? "" : "s"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
