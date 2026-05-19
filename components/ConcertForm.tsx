"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { toast } from "sonner";
import { FormField } from "@/components/FormField";
import { MoneyInput } from "@/components/MoneyInput";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/client";
import { getTotalCost } from "@/lib/calculations";
import { COST_CATEGORIES, GENRES } from "@/lib/constants";
import type { Genre } from "@/lib/types";
import { friendlyError } from "@/lib/userMessages";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const emptyForm = {
  concert_name: "",
  artist: "",
  genre: "Pop" as Genre,
  venue: "",
  city: "",
  state: "",
  concert_date: "",
  distance_from_home: "0",
  hours_at_event: "",
  ticket_cost: "0",
  ticket_fees: "0",
  parking_cost: "0",
  food_drink_cost: "0",
  merchandise_cost: "0",
  lodging_cost: "0",
  travel_cost: "0",
  other_cost: "0",
  fun_rating: "7",
  notes: "",
};

function TotalBadge({ total }: { total: number }) {
  const reduced = usePrefersReducedMotion();
  const formatted = total.toFixed(2);

  if (reduced) {
    return (
      <span className="badge badge-primary badge-lg">Total: ${formatted}</span>
    );
  }

  return (
    <motion.span
      key={formatted}
      initial={{ scale: 1.05 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.15 }}
      className="badge badge-primary badge-lg"
    >
      Total: ${formatted}
    </motion.span>
  );
}

export function ConcertForm() {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalCost = useMemo(() => {
    return getTotalCost({
      ticket_cost: Number(form.ticket_cost) || 0,
      ticket_fees: Number(form.ticket_fees) || 0,
      parking_cost: Number(form.parking_cost) || 0,
      food_drink_cost: Number(form.food_drink_cost) || 0,
      merchandise_cost: Number(form.merchandise_cost) || 0,
      lodging_cost: Number(form.lodging_cost) || 0,
      travel_cost: Number(form.travel_cost) || 0,
      other_cost: Number(form.other_cost) || 0,
    });
  }, [form]);

  function updateField(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const hours = Number(form.hours_at_event);
    if (!hours || hours <= 0) {
      setError(
        "Please enter how many hours you were at the event (must be greater than 0).",
      );
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      setError("You need to be logged in to save a concert.");
      return;
    }

    const { error: insertError } = await supabase.from("concerts").insert({
      user_id: user.id,
      concert_name: form.concert_name.trim(),
      artist: form.artist.trim(),
      genre: form.genre,
      venue: form.venue.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      concert_date: form.concert_date,
      distance_from_home: Number(form.distance_from_home) || 0,
      hours_at_event: hours,
      ticket_cost: Number(form.ticket_cost) || 0,
      ticket_fees: Number(form.ticket_fees) || 0,
      parking_cost: Number(form.parking_cost) || 0,
      food_drink_cost: Number(form.food_drink_cost) || 0,
      merchandise_cost: Number(form.merchandise_cost) || 0,
      lodging_cost: Number(form.lodging_cost) || 0,
      travel_cost: Number(form.travel_cost) || 0,
      other_cost: Number(form.other_cost) || 0,
      fun_rating: Number(form.fun_rating),
      notes: form.notes.trim() || null,
    });

    setLoading(false);

    if (insertError) {
      const text = friendlyError(insertError.message);
      setError(text);
      toast.error(text);
      return;
    }

    setForm(emptyForm);
    toast.success("Concert saved!");
    router.refresh();
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="page-section max-w-3xl pb-28 sm:pb-6">
        {error && (
          <div className="alert alert-error text-sm">
            <span>{error}</span>
          </div>
        )}

        <Card bodyClassName="gap-4">
          <h2 className="text-lg font-semibold">Concert details</h2>
          <FormField label="Concert name" htmlFor="concert_name">
            <input
              id="concert_name"
              className="input input-bordered input-md w-full"
              value={form.concert_name}
              onChange={(e) => updateField("concert_name", e.target.value)}
              required
            />
          </FormField>
          <FormField label="Artist / band" htmlFor="artist">
            <input
              id="artist"
              className="input input-bordered input-md w-full"
              value={form.artist}
              onChange={(e) => updateField("artist", e.target.value)}
              required
            />
          </FormField>
          <FormField label="Genre" htmlFor="genre">
            <select
              id="genre"
              className="select select-bordered select-md w-full"
              value={form.genre}
              onChange={(e) => updateField("genre", e.target.value)}
              required
            >
              {GENRES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Venue" htmlFor="venue">
            <input
              id="venue"
              className="input input-bordered input-md w-full"
              value={form.venue}
              onChange={(e) => updateField("venue", e.target.value)}
              required
            />
          </FormField>
          <FormField label="City" htmlFor="city">
            <input
              id="city"
              className="input input-bordered input-md w-full"
              value={form.city}
              onChange={(e) => updateField("city", e.target.value)}
              required
            />
          </FormField>
          <FormField label="State" htmlFor="state">
            <input
              id="state"
              className="input input-bordered input-md w-full"
              value={form.state}
              onChange={(e) => updateField("state", e.target.value)}
              required
            />
          </FormField>
          <FormField label="Concert date" htmlFor="concert_date">
            <input
              id="concert_date"
              type="date"
              className="input input-bordered input-md w-full"
              value={form.concert_date}
              onChange={(e) => updateField("concert_date", e.target.value)}
              required
            />
          </FormField>
          <FormField
            label="Distance (mi)"
            htmlFor="distance_from_home"
            hint="Miles from home — stay consistent each time."
          >
            <input
              id="distance_from_home"
              type="number"
              min="0"
              step="0.1"
              className="input input-bordered input-md w-full"
              value={form.distance_from_home}
              onChange={(e) =>
                updateField("distance_from_home", e.target.value)
              }
            />
          </FormField>
          <FormField
            label="Hours at event"
            htmlFor="hours_at_event"
            hint="Include travel time if you want cost per hour to reflect the full outing."
          >
            <input
              id="hours_at_event"
              type="number"
              min="0.5"
              step="0.5"
              className="input input-bordered input-md w-full"
              value={form.hours_at_event}
              onChange={(e) => updateField("hours_at_event", e.target.value)}
              required
            />
          </FormField>
          <FormField label="Notes" htmlFor="notes">
            <textarea
              id="notes"
              className="textarea textarea-bordered w-full"
              rows={3}
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              placeholder="Optional memories, setlist highlights, who you went with..."
            />
          </FormField>
        </Card>

        <Card bodyClassName="gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold">Costs</h2>
            <TotalBadge total={totalCost} />
          </div>
          {COST_CATEGORIES.map(({ key, label }) => (
            <FormField key={key} label={label} htmlFor={key}>
              <MoneyInput
                id={key}
                value={form[key]}
                onChange={(v) => updateField(key, v)}
              />
            </FormField>
          ))}
        </Card>

        <Card bodyClassName="gap-4">
          <h2 className="text-lg font-semibold">Fun rating</h2>
          <div className="flex justify-between text-xs text-base-content/70">
            <span>Terrible Time</span>
            <span className="text-2xl font-bold text-primary">
              {form.fun_rating}
            </span>
            <span>Best Time Ever</span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            className="range range-primary"
            value={form.fun_rating}
            onChange={(e) => updateField("fun_rating", e.target.value)}
          />
        </Card>

        <button
          type="submit"
          className={`btn btn-primary btn-lg w-full sm:w-auto ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save concert"}
        </button>
      </form>

      <div className="fixed bottom-16 left-0 right-0 z-40 border-t border-base-300 bg-base-100/95 px-4 py-3 shadow-lg backdrop-blur sm:hidden">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Running total</span>
          <span className="text-lg font-bold text-primary">
            ${totalCost.toFixed(2)}
          </span>
        </div>
      </div>
    </>
  );
}
