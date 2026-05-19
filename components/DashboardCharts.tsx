"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { getDashboardSummary } from "@/lib/calculations";
import type { Concert } from "@/lib/types";

function ChartCard({
  title,
  caption,
  children,
}: {
  title: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <Card bodyClassName="gap-2">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="text-xs text-base-content/60">{caption}</p>
      <div className="h-[220px] w-full lg:h-[280px]">{children}</div>
    </Card>
  );
}

export function DashboardCharts({ concerts }: { concerts: Concert[] }) {
  const summary = getDashboardSummary(concerts);
  if (!summary) return null;

  const categoryData = summary.categoryTotals
    .filter((c) => c.total > 0)
    .map((c) => ({ name: c.name, amount: c.total }));

  const perConcert = summary.enriched.map((e) => ({
    name:
      e.concert.concert_name.length > 18
        ? `${e.concert.concert_name.slice(0, 16)}…`
        : e.concert.concert_name,
    fullName: e.concert.concert_name,
    totalCost: e.totalCost,
    funRating: e.concert.fun_rating,
    funPoints: Number(e.funPointsPer100.toFixed(2)),
  }));

  const chartMargin = { top: 8, right: 8, left: 0, bottom: 60 };

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
      <ChartCard
        title="Spending by cost category"
        caption="Where your money went across all shows"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={categoryData} margin={chartMargin}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="name"
              angle={-35}
              textAnchor="end"
              interval={0}
              height={70}
              tick={{ fontSize: 11 }}
            />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v) => [`$${Number(v).toFixed(2)}`, "Spent"]} />
            <Bar dataKey="amount" fill="oklch(var(--p))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title="Total cost by concert"
        caption="Compare what each night cost you"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={perConcert} margin={chartMargin}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="name"
              angle={-35}
              textAnchor="end"
              interval={0}
              height={70}
              tick={{ fontSize: 11 }}
            />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(v) => [`$${Number(v).toFixed(2)}`, "Total"]}
              labelFormatter={(_, payload) =>
                payload?.[0]?.payload?.fullName ?? ""
              }
            />
            <Bar dataKey="totalCost" fill="oklch(var(--s))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title="Fun rating by concert"
        caption="How much you enjoyed each show"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={perConcert} margin={chartMargin}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="name"
              angle={-35}
              textAnchor="end"
              interval={0}
              height={70}
              tick={{ fontSize: 11 }}
            />
            <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} />
            <Tooltip
              labelFormatter={(_, payload) =>
                payload?.[0]?.payload?.fullName ?? ""
              }
            />
            <Bar dataKey="funRating" fill="oklch(var(--a))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title="Fun Points per $100 by concert"
        caption="Higher means better bang for your buck"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={perConcert} margin={chartMargin}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="name"
              angle={-35}
              textAnchor="end"
              interval={0}
              height={70}
              tick={{ fontSize: 11 }}
            />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(v) => [v, "Fun Points per $100"]}
              labelFormatter={(_, payload) =>
                payload?.[0]?.payload?.fullName ?? ""
              }
            />
            <Bar dataKey="funPoints" fill="oklch(var(--in))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
