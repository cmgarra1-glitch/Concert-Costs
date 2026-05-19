import { COST_CATEGORIES } from "@/lib/constants";
import type { Concert } from "@/lib/types";

type CostFields = Pick<
  Concert,
  | "ticket_cost"
  | "ticket_fees"
  | "parking_cost"
  | "food_drink_cost"
  | "merchandise_cost"
  | "lodging_cost"
  | "travel_cost"
  | "other_cost"
>;

export function getTotalCost(concert: CostFields): number {
  return COST_CATEGORIES.reduce(
    (sum, { key }) => sum + Number(concert[key] ?? 0),
    0,
  );
}

export function getCostPerHour(totalCost: number, hours: number): number {
  if (hours <= 0) return 0;
  return totalCost / hours;
}

export function getFunPointsPer100(
  funRating: number,
  totalCost: number,
): number {
  if (totalCost <= 0) return 0;
  return (funRating / totalCost) * 100;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatNumber(amount: number, decimals = 2): string {
  return amount.toFixed(decimals);
}

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getCategoryBreakdown(concert: Concert) {
  return COST_CATEGORIES.map(({ key, label }) => ({
    label,
    amount: Number(concert[key] ?? 0),
  })).filter((item) => item.amount > 0);
}

export function getAggregatedCategoryTotals(concerts: Concert[]) {
  return COST_CATEGORIES.map(({ key, label }) => ({
    name: label,
    total: concerts.reduce((sum, c) => sum + Number(c[key] ?? 0), 0),
  }));
}

export type ConcertMetrics = {
  concert: Concert;
  totalCost: number;
  costPerHour: number;
  funPointsPer100: number;
};

export function enrichConcert(concert: Concert): ConcertMetrics {
  const totalCost = getTotalCost(concert);
  return {
    concert,
    totalCost,
    costPerHour: getCostPerHour(totalCost, Number(concert.hours_at_event)),
    funPointsPer100: getFunPointsPer100(
      concert.fun_rating,
      totalCost,
    ),
  };
}

export function getDashboardSummary(concerts: Concert[]) {
  if (concerts.length === 0) {
    return null;
  }

  const enriched = concerts.map(enrichConcert);
  const totalSpent = enriched.reduce((s, e) => s + e.totalCost, 0);
  const avgCostPerConcert = totalSpent / enriched.length;
  const avgFun =
    enriched.reduce((s, e) => s + e.concert.fun_rating, 0) / enriched.length;
  const avgCostPerHour =
    enriched.reduce((s, e) => s + e.costPerHour, 0) / enriched.length;

  const bestValue = enriched.reduce((best, curr) =>
    curr.funPointsPer100 > best.funPointsPer100 ? curr : best,
  );
  const mostExpensive = enriched.reduce((best, curr) =>
    curr.totalCost > best.totalCost ? curr : best,
  );
  const highestFun = enriched.reduce((best, curr) =>
    curr.concert.fun_rating > best.concert.fun_rating ? curr : best,
  );

  return {
    totalConcerts: concerts.length,
    totalSpent,
    avgCostPerConcert,
    avgFun,
    avgCostPerHour,
    bestValue,
    mostExpensive,
    highestFun,
    enriched,
    categoryTotals: getAggregatedCategoryTotals(concerts),
  };
}
