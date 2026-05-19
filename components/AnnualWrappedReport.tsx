"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  Calendar,
  Car,
  Copy,
  DollarSign,
  Mic2,
  Share2,
  Sparkles,
  Star,
  Ticket,
} from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "@/components/EmptyState";
import {
  buildShareText,
  type AnnualWrapped,
} from "@/lib/wrapped";
import { formatCurrency } from "@/lib/calculations";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type AnnualWrappedReportProps = {
  wrapped: AnnualWrapped | null;
  years: number[];
  selectedYear: number;
};

function StatBlock({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-xl bg-base-100/10 p-4 backdrop-blur-sm">
      <div className="mb-2 flex items-center gap-2 text-sm opacity-90">
        <Icon className="h-4 w-4 shrink-0" aria-hidden />
        {label}
      </div>
      <p className="text-2xl font-bold leading-tight">{value}</p>
      {sub && <p className="mt-1 text-xs opacity-80">{sub}</p>}
    </div>
  );
}

export function AnnualWrappedReport({
  wrapped,
  years,
  selectedYear,
}: AnnualWrappedReportProps) {
  const router = useRouter();
  const reduced = usePrefersReducedMotion();
  const [copying, setCopying] = useState(false);

  const shareText = useMemo(
    () => (wrapped ? buildShareText(wrapped) : ""),
    [wrapped],
  );

  if (!wrapped) {
    return (
      <>
        <YearPicker
          years={years}
          selectedYear={selectedYear}
          onChange={(y) => router.push(`/wrapped?year=${y}`)}
        />
        <EmptyState
          title={`No shows in ${selectedYear}`}
          message="Log concerts from this year to unlock your annual wrapped recap."
        />
      </>
    );
  }

  const data = wrapped;

  async function handleCopy() {
    setCopying(true);
    try {
      await navigator.clipboard.writeText(shareText);
      toast.success("Recap copied to clipboard!");
    } catch {
      toast.error("Could not copy. Try selecting the text manually.");
    } finally {
      setCopying(false);
    }
  }

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `My ${data.year} Concert Wrapped`,
          text: shareText,
        });
        return;
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
      }
    }
    await handleCopy();
  }

  const card = (
    <article
      id="wrapped-card"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-6 text-primary-content shadow-xl sm:p-8"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-base-100/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-base-100/10 blur-2xl" />

      <header className="relative mb-6">
        <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest opacity-90">
          <Sparkles className="h-4 w-4" aria-hidden />
          Annual wrapped
        </p>
        <h2 className="mt-1 text-3xl font-black sm:text-4xl">
          {wrapped.year} Yearbook
        </h2>
        <p className="mt-2 text-sm opacity-90">
          Your personal concert season in one glance.
        </p>
      </header>

      <div className="relative grid gap-3 sm:grid-cols-2">
        <StatBlock
          icon={DollarSign}
          label="Total spent"
          value={formatCurrency(wrapped.totalSpent)}
        />
        <StatBlock
          icon={Ticket}
          label="Concerts attended"
          value={String(wrapped.concertsAttended)}
        />
        <StatBlock
          icon={Mic2}
          label="Top artist"
          value={wrapped.topArtist ?? "—"}
          sub={
            wrapped.topArtist
              ? `${wrapped.topArtistShowCount} show${wrapped.topArtistShowCount === 1 ? "" : "s"}`
              : undefined
          }
        />
        <StatBlock
          icon={Car}
          label="Miles traveled"
          value={`${Math.round(wrapped.milesTraveled).toLocaleString()} mi`}
          sub="Sum of distances you logged"
        />
      </div>

      {wrapped.favoriteShow && (
        <section className="relative mt-6 rounded-2xl border border-base-100/20 bg-base-100/10 p-5">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide opacity-90">
            <Star className="h-4 w-4 fill-current" aria-hidden />
            Favorite show
          </p>
          <h3 className="mt-2 text-xl font-bold">
            {wrapped.favoriteShow.concertName}
          </h3>
          <p className="mt-1 opacity-90">{wrapped.favoriteShow.artist}</p>
          <p className="mt-2 text-sm opacity-80">
            {wrapped.favoriteShow.venue} · {wrapped.favoriteShow.city},{" "}
            {wrapped.favoriteShow.state}
          </p>
          <p className="mt-1 flex flex-wrap items-center gap-3 text-sm opacity-80">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" aria-hidden />
              {wrapped.favoriteShow.date}
            </span>
            <span className="badge badge-lg border-0 bg-base-100/20">
              {wrapped.favoriteShow.funRating}/10 fun
            </span>
            <span>{formatCurrency(wrapped.favoriteShow.totalCost)} total</span>
          </p>
        </section>
      )}
    </article>
  );

  return (
    <div className="space-y-6">
      <YearPicker
        years={years}
        selectedYear={selectedYear}
        onChange={(y) => router.push(`/wrapped?year=${y}`)}
      />

      {reduced ? card : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {card}
        </motion.div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className={`btn btn-primary gap-2 ${copying ? "loading" : ""}`}
          onClick={handleCopy}
          disabled={copying}
        >
          <Copy className="h-4 w-4" aria-hidden />
          Copy recap
        </button>
        <button
          type="button"
          className="btn btn-outline gap-2"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4" aria-hidden />
          Share
        </button>
      </div>

      <p className="text-sm text-base-content/60">
        Share your yearbook with friends — copy the text or use your device&apos;s
        share sheet on mobile.
      </p>
    </div>
  );
}

function YearPicker({
  years,
  selectedYear,
  onChange,
}: {
  years: number[];
  selectedYear: number;
  onChange: (year: number) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <label htmlFor="wrapped-year" className="text-sm font-medium">
        Year
      </label>
      <select
        id="wrapped-year"
        className="select select-bordered select-sm"
        value={selectedYear}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}
