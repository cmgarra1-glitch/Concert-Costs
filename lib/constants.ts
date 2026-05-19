import type { Genre } from "@/lib/types";

export const GENRES: Genre[] = ["Country", "Rap", "Pop"];

export const DAISY_THEMES = ["light", "dark", "synthwave"] as const;

export type DaisyTheme = (typeof DAISY_THEMES)[number];

export const THEME_STORAGE_KEY = "concert-cost-tracker-theme";

export const COST_CATEGORIES = [
  { key: "ticket_cost" as const, label: "Tickets" },
  { key: "ticket_fees" as const, label: "Ticket fees" },
  { key: "parking_cost" as const, label: "Parking" },
  { key: "food_drink_cost" as const, label: "Food & drink" },
  { key: "merchandise_cost" as const, label: "Merchandise" },
  { key: "lodging_cost" as const, label: "Hotel / lodging" },
  { key: "travel_cost" as const, label: "Travel / gas" },
  { key: "other_cost" as const, label: "Other" },
];
