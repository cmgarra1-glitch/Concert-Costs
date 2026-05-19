"use client";

type GenreInputProps = {
  value: string;
  onChange: (value: string) => void;
  pastGenres?: string[];
};

export function GenreInput({ value, onChange, pastGenres = [] }: GenreInputProps) {
  return (
    <section className="space-y-2">
      <input
        id="genre"
        name="genre"
        type="text"
        autoComplete="off"
        className="input input-bordered input-md w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type any genre — Metal, Jazz, K-Pop, Indie…"
        required
        aria-describedby="genre-help"
      />
      <p id="genre-help" className="text-xs text-base-content/70">
        Not limited to a list. Type whatever you want — a new section appears on
        the Artists tab for each genre you save.
      </p>
      {pastGenres.length > 0 && (
        <aside className="rounded-lg border border-dashed border-base-300 bg-base-200/40 p-2">
          <p className="mb-1.5 text-xs text-base-content/60">
            Optional — tap a past genre to fill the box:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {pastGenres.map((g) => (
              <button
                key={g}
                type="button"
                className="btn btn-xs btn-ghost"
                onClick={() => onChange(g)}
              >
                {g}
              </button>
            ))}
          </div>
        </aside>
      )}
    </section>
  );
}
