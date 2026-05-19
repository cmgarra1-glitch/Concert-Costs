export type BudgetDeal = {
  title: string;
  description: string;
  tag?: string;
};

export const BUDGET_DEALS: BudgetDeal[] = [
  {
    title: "Artist presale",
    description:
      "Sign up for the artist’s email list or fan club. Presales often have lower fees and better seats before the public on-sale.",
    tag: "Presale",
  },
  {
    title: "Watch the fee line",
    description:
      "Service fees can add 15–30% on top of the ticket price. Compare the “all-in” total, not just the face value.",
    tag: "Fees",
  },
  {
    title: "Student & military discounts",
    description:
      "Some venues offer discounted tickets with a valid student or military ID—check the venue site before buying resale.",
    tag: "Discount",
  },
  {
    title: "Buy early vs. day-of",
    description:
      "Popular shows usually cost more close to the date. Day-of deals are rare for big tours—plan ahead when you can.",
    tag: "Timing",
  },
  {
    title: "Parking & transit",
    description:
      "Lot parking near arenas is pricey. Look at transit, rideshare drop-off zones, or parking a few blocks away.",
    tag: "Parking",
  },
  {
    title: "Set a merch budget",
    description:
      "Decide your shirt or poster limit before you go. Merch tables are designed to make you spend more in the moment.",
    tag: "Merch",
  },
];
