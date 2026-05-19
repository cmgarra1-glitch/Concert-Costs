"use client";

import { useEffect } from "react";
import { DAISY_THEMES, THEME_STORAGE_KEY } from "@/lib/constants";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    const theme =
      saved && DAISY_THEMES.includes(saved as (typeof DAISY_THEMES)[number])
        ? saved
        : "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  return <>{children}</>;
}
