"use client";

import { useMemo, useState } from "react";
import { FormField } from "@/components/FormField";
import { MoneyInput } from "@/components/MoneyInput";
import { Card } from "@/components/ui/Card";
import { BUDGET_DEALS } from "@/lib/budgetDeals";
import { formatCurrency } from "@/lib/calculations";
import { getPlannerTotal } from "@/lib/plannerCalculations";

const PLANNER_FIELDS = [
  { key: "ticket_cost" as const, label: "Ticket price (each)" },
  { key: "ticket_fees" as const, label: "Service fees (each)" },
  { key: "parking_cost" as const, label: "Parking" },
  { key: "food_drink_cost" as const, label: "Food & drink" },
  { key: "merchandise_cost" as const, label: "Merchandise" },
  { key: "lodging_cost" as const, label: "Hotel / lodging" },
  { key: "travel_cost" as const, label: "Travel / gas" },
  { key: "other_cost" as const, label: "Other" },
];

const emptyPlanner = {
  ticket_cost: "75",
  ticket_fees: "18",
  parking_cost: "25",
  food_drink_cost: "30",
  merchandise_cost: "0",
  lodging_cost: "0",
  travel_cost: "20",
  other_cost: "0",
  ticket_quantity: "2",
};

export function BudgetCalculator() {
  const [form, setForm] = useState(emptyPlanner);

  const costs = useMemo(
    () => ({
      ticket_cost: Number(form.ticket_cost) || 0,
      ticket_fees: Number(form.ticket_fees) || 0,
      parking_cost: Number(form.parking_cost) || 0,
      food_drink_cost: Number(form.food_drink_cost) || 0,
      merchandise_cost: Number(form.merchandise_cost) || 0,
      lodging_cost: Number(form.lodging_cost) || 0,
      travel_cost: Number(form.travel_cost) || 0,
      other_cost: Number(form.other_cost) || 0,
    }),
    [form],
  );

  const qty = Math.max(1, Number(form.ticket_quantity) || 1);
  const total = getPlannerTotal(costs, qty);
  const perTicketAllIn =
    qty > 0
      ? (costs.ticket_cost + costs.ticket_fees) +
        (total - (costs.ticket_cost + costs.ticket_fees) * qty) / qty
      : 0;

  function updateField(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <Card bodyClassName="gap-4">
        <header className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Trip budget planner</h2>
          <span className="badge badge-primary badge-lg">
            Total: {formatCurrency(total)}
          </span>
        </header>

        <FormField label="Number of tickets" htmlFor="ticket_quantity">
          <input
            id="ticket_quantity"
            type="number"
            min={1}
            step={1}
            className="input input-bordered input-md w-full max-w-xs"
            value={form.ticket_quantity}
            onChange={(e) => updateField("ticket_quantity", e.target.value)}
          />
        </FormField>

        {PLANNER_FIELDS.map(({ key, label }) => (
          <FormField key={key} label={label} htmlFor={`planner-${key}`}>
            <MoneyInput
              id={`planner-${key}`}
              value={form[key]}
              onChange={(v) => updateField(key, v)}
            />
          </FormField>
        ))}

        <p className="text-sm text-base-content/70">
          Ticket price and fees are multiplied by {qty} ticket
          {qty === 1 ? "" : "s"}. Other costs are counted once for the trip.
        </p>
        <p className="text-sm">
          Rough per-person share (tickets + fees + split extras):{" "}
          <span className="font-semibold text-primary">
            {formatCurrency(perTicketAllIn)}
          </span>
        </p>
      </Card>

      <aside className="space-y-4">
        <h2 className="text-lg font-semibold">Deals & tips</h2>
        {BUDGET_DEALS.map((deal) => (
          <Card key={deal.title} bodyClassName="gap-2">
            <header className="flex items-start justify-between gap-2">
              <h3 className="font-medium">{deal.title}</h3>
              {deal.tag && (
                <span className="badge badge-outline badge-sm">{deal.tag}</span>
              )}
            </header>
            <p className="text-sm text-base-content/80">{deal.description}</p>
          </Card>
        ))}
      </aside>
    </section>
  );
}
