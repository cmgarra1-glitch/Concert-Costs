export type PlannerCosts = {
  ticket_cost: number;
  ticket_fees: number;
  parking_cost: number;
  food_drink_cost: number;
  merchandise_cost: number;
  lodging_cost: number;
  travel_cost: number;
  other_cost: number;
};

export function getPlannerTotal(
  costs: PlannerCosts,
  ticketQuantity: number,
): number {
  const qty = Math.max(1, ticketQuantity);
  const tickets = (costs.ticket_cost + costs.ticket_fees) * qty;

  return (
    tickets +
    costs.parking_cost +
    costs.food_drink_cost +
    costs.merchandise_cost +
    costs.lodging_cost +
    costs.travel_cost +
    costs.other_cost
  );
}
