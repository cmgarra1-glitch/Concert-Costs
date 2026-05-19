"use client";

import {
  Calendar,
  Clock,
  DollarSign,
  Music,
  Sparkles,
  Ticket,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import { Card } from "@/components/ui/Card";
import {
  formatCurrency,
  formatNumber,
  getDashboardSummary,
} from "@/lib/calculations";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import type { Concert } from "@/lib/types";

type StatItem = {
  label: string;
  value: string;
  sub?: string;
  icon: React.ComponentType<{ className?: string }>;
};

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const reduced = usePrefersReducedMotion();
  const Icon = stat.icon;

  const content = (
    <Card bodyClassName="gap-1 p-4">
      <div className="flex items-center gap-2 text-base-content/60">
        <Icon className="h-4 w-4 shrink-0" aria-hidden />
        <span className="stat-title text-xs">{stat.label}</span>
      </div>
      <div className="stat-value truncate text-2xl font-bold">{stat.value}</div>
      {stat.sub && <div className="stat-desc text-xs">{stat.sub}</div>}
    </Card>
  );

  if (reduced) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
    >
      {content}
    </motion.div>
  );
}

export function DashboardStats({ concerts }: { concerts: Concert[] }) {
  const summary = getDashboardSummary(concerts);
  if (!summary) return null;

  const overview: StatItem[] = [
    {
      label: "Total concerts",
      value: String(summary.totalConcerts),
      icon: Music,
    },
    {
      label: "Total spent",
      value: formatCurrency(summary.totalSpent),
      icon: Wallet,
    },
    {
      label: "Avg cost / concert",
      value: formatCurrency(summary.avgCostPerConcert),
      icon: DollarSign,
    },
    {
      label: "Avg fun rating",
      value: formatNumber(summary.avgFun, 1),
      icon: Sparkles,
    },
    {
      label: "Avg cost / hour",
      value: formatCurrency(summary.avgCostPerHour),
      icon: Clock,
    },
  ];

  const highlights: StatItem[] = [
    {
      label: "Best value",
      value: summary.bestValue.concert.concert_name,
      sub: `${formatNumber(summary.bestValue.funPointsPer100)} Fun Points per $100`,
      icon: TrendingUp,
    },
    {
      label: "Most expensive",
      value: summary.mostExpensive.concert.concert_name,
      sub: formatCurrency(summary.mostExpensive.totalCost),
      icon: Ticket,
    },
    {
      label: "Highest fun",
      value: summary.highestFun.concert.concert_name,
      sub: `${summary.highestFun.concert.fun_rating}/10`,
      icon: Calendar,
    },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h3 className="section-heading mb-4">Overview</h3>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {overview.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </section>
      <section>
        <h3 className="section-heading mb-4">Highlights</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {highlights.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={i + overview.length}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
