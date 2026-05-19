"use client";

import dynamic from "next/dynamic";
import type { MapLocationData } from "@/lib/mapLocations";

const ConcertMap = dynamic(
  () => import("@/components/ConcertMap").then((m) => m.ConcertMap),
  {
    ssr: false,
    loading: () => (
      <div className="skeleton h-[420px] w-full rounded-2xl" />
    ),
  },
);

type ConcertMapClientProps = {
  data: MapLocationData;
};

export function ConcertMapClient({ data }: ConcertMapClientProps) {
  return <ConcertMap data={data} />;
}
