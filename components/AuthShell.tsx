import { ThemeSelector } from "@/components/ThemeSelector";
import { Music } from "lucide-react";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20"
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="container mx-auto flex justify-end px-4 py-4">
          <ThemeSelector />
        </header>

        <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 pb-12">
          <div className="pointer-events-none mb-8 max-w-xl select-none text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-content shadow-lg">
              <Music className="h-8 w-8" aria-hidden />
            </div>
            <h1 className="text-4xl font-bold text-base-content md:text-5xl">
              Concert Cost Tracker
            </h1>
            <p className="mt-3 text-lg text-base-content/70">
              Remember every show. See what you spent, how long you were there,
              and whether it was worth it.
            </p>
          </div>
          <div className="relative z-40 w-full max-w-md">{children}</div>
        </main>
      </div>
    </div>
  );
}
