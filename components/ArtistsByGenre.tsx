import { Music2 } from "lucide-react";
import type { GenreGroup } from "@/lib/artists";

type ArtistsByGenreProps = {
  groups: GenreGroup[];
};

export function ArtistsByGenre({ groups }: ArtistsByGenreProps) {
  if (groups.length === 0) {
    return (
      <p className="text-sm text-base-content/70">
        No genres yet. Add a concert and enter a genre (Rock, Jazz, EDM, etc.).
      </p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {groups.map(({ genre, artists }) => (
        <div key={genre} className="collapse collapse-arrow app-card">
          <input
            type="checkbox"
            defaultChecked
            aria-label={`Toggle ${genre} artists`}
          />
          <div className="collapse-title flex items-center gap-2 font-semibold">
            <Music2 className="h-5 w-5 text-primary" aria-hidden />
            {genre}
            <span className="badge badge-ghost badge-sm">{artists.length}</span>
          </div>
          <div className="collapse-content">
            <ul className="space-y-2">
              {artists.map((a) => (
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
          </div>
        </div>
      ))}
    </div>
  );
}
