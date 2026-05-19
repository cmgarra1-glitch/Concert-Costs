"use client";

import { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import { DAISY_THEMES, THEME_STORAGE_KEY, type DaisyTheme } from "@/lib/constants";

export function ThemeSelector() {
  const [theme, setTheme] = useState<DaisyTheme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as DaisyTheme | null;
    if (saved && DAISY_THEMES.includes(saved)) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
    setMounted(true);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as DaisyTheme;
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
  }

  return (
    <label className="form-control w-full max-w-xs">
      <div className="label py-0">
        <span className="label-text flex items-center gap-1 text-xs">
          <Palette className="h-3.5 w-3.5" aria-hidden />
          Theme
        </span>
      </div>
      <select
        className="select select-bordered select-sm w-full capitalize"
        value={mounted ? theme : "light"}
        onChange={handleChange}
        aria-label="Choose app theme"
        suppressHydrationWarning
      >
        {DAISY_THEMES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </label>
  );
}
