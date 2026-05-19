"use client";

import { motion } from "motion/react";
import {
  enrichConcert,
  formatCurrency,
  formatDate,
  formatNumber,
  getCategoryBreakdown,
} from "@/lib/calculations";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import type { Concert } from "@/lib/types";
import { MapPin, Star } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function ConcertCard({
  concert,
  index = 0,
}: {
  concert: Concert;
  index?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const metrics = enrichConcert(concert);
  const categories = getCategoryBreakdown(concert);

  const inner = (
    <Card hoverable bodyClassName="gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">{concert.concert_name}</h2>
          <p className="text-base-content/80">{concert.artist}</p>
          <p className="mt-1 flex items-center gap-1 text-sm text-base-content/70">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {concert.venue} · {concert.city}, {concert.state}
          </p>
          <p className="text-sm text-base-content/60">
            {formatDate(concert.concert_date)}
          </p>
        </div>
        <div className="badge badge-primary gap-1">
          <Star className="h-3.5 w-3.5 fill-current" aria-hidden />
          {concert.fun_rating}/10
        </div>
      </div>

      <div className="rounded-xl bg-primary/10 p-4 text-center sm:text-left">
        <p className="text-xs font-medium uppercase tracking-wide text-base-content/60">
          Total cost
        </p>
        <p className="text-3xl font-bold text-primary">
          {formatCurrency(metrics.totalCost)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <div className="rounded-lg bg-base-200/80 p-3">
          <p className="text-xs text-base-content/60">Cost / hour</p>
          <p className="text-lg font-semibold">
            {formatCurrency(metrics.costPerHour)}
          </p>
        </div>
        <div className="rounded-lg bg-base-200/80 p-3">
          <p className="text-xs text-base-content/60">Fun Points per $100</p>
          <p className="text-lg font-semibold">
            {formatNumber(metrics.funPointsPer100)}
          </p>
        </div>
        <div className="col-span-2 rounded-lg bg-base-200/80 p-3 md:col-span-1">
          <p className="text-xs text-base-content/60">Hours</p>
          <p className="text-lg font-semibold">{concert.hours_at_event}</p>
        </div>
      </div>

      {categories.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-medium text-base-content/60">
            Cost breakdown
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map(({ label, amount }) => (
              <span key={label} className="badge badge-ghost gap-1">
                {label}: {formatCurrency(amount)}
              </span>
            ))}
          </div>
        </div>
      )}

      {concert.notes && (
        <p className="border-t border-base-300 pt-3 text-sm text-base-content/70">
          {concert.notes}
        </p>
      )}
    </Card>
  );

  if (reduced) return inner;

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.04 }}
      whileHover={{ scale: 1.01 }}
    >
      {inner}
    </motion.article>
  );
}
