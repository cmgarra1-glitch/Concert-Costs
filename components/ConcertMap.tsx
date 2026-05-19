"use client";

import { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import type { MapLocationData, MapPin } from "@/lib/mapLocations";
import { formatDate } from "@/lib/calculations";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

type ConcertMapProps = {
  data: MapLocationData;
};

function PinDetail({ pin }: { pin: MapPin }) {
  return (
    <section className="mt-4 rounded-xl border border-base-300 bg-base-200/50 p-4 lg:mt-0">
      <h3 className="font-semibold">
        {pin.city}, {pin.state.toUpperCase()}
      </h3>
      <p className="text-sm text-base-content/70">
        {pin.concerts.length} concert{pin.concerts.length === 1 ? "" : "s"}
      </p>
      <ul className="mt-2 space-y-2 text-sm">
        {pin.concerts.map((c) => (
          <li key={c.id} className="border-l-2 border-primary pl-3">
            <span className="font-medium">{c.concert_name}</span>
            <span className="text-base-content/70"> — {c.artist}</span>
            <br />
            <span className="text-xs text-base-content/60">
              {formatDate(c.concert_date)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ConcertMap({ data }: ConcertMapProps) {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const selectedPin = useMemo(() => {
    if (!selectedKey) return data.pins[0] ?? null;
    return (
      data.pins.find(
        (p) => `${p.city}|${p.state}`.toLowerCase() === selectedKey,
      ) ?? null
    );
  }, [data.pins, selectedKey]);

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_minmax(240px,320px)]">
      <article className="app-card overflow-hidden p-2 sm:p-4">
        <ComposableMap
          projection="geoAlbersUsa"
          className="h-auto w-full"
          style={{ maxHeight: "420px" }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="currentColor"
                  className="text-base-300"
                  stroke="currentColor"
                  style={{
                    default: { outline: "none" },
                    hover: {
                      outline: "none",
                      fill: "oklch(var(--bc) / 0.15)",
                    },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          {data.pins.map((pin) => {
            const key = `${pin.city}|${pin.state}`.toLowerCase();
            const isSelected =
              selectedKey === key ||
              (!selectedKey && pin === data.pins[0]);
            return (
              <Marker
                key={key}
                coordinates={pin.coordinates}
                onClick={() => setSelectedKey(key)}
              >
                <g className="cursor-pointer">
                  <circle
                    r={isSelected ? 8 : 6}
                    className={
                      isSelected ? "fill-primary" : "fill-secondary"
                    }
                    stroke="currentColor"
                    strokeWidth={1.5}
                  />
                  {pin.concerts.length > 1 && (
                    <text
                      textAnchor="middle"
                      y={4}
                      className="pointer-events-none fill-primary-content text-[10px] font-bold"
                    >
                      {pin.concerts.length}
                    </text>
                  )}
                </g>
              </Marker>
            );
          })}
        </ComposableMap>
        <p className="px-2 pb-2 text-center text-xs text-base-content/60 sm:px-0">
          Tap a pin to see concerts in that city.
        </p>
      </article>

      {selectedPin && <PinDetail pin={selectedPin} />}

      {data.unmapped.length > 0 && (
        <aside className="lg:col-span-2">
          <div className="alert alert-warning text-sm">
            <>
              <p className="font-medium">Cities not on the map yet</p>
              <p className="mt-1 opacity-90">
                These locations are saved but need coordinates added. Try
                common spellings (e.g. &quot;Los Angeles&quot; and
                &quot;CA&quot;).
              </p>
              <ul className="mt-2 list-inside list-disc">
                {data.unmapped.map((u) => (
                  <li key={`${u.city}|${u.state}`}>
                    {u.city}, {u.state} ({u.concerts.length} show
                    {u.concerts.length === 1 ? "" : "s"})
                  </li>
                ))}
              </ul>
            </>
          </div>
        </aside>
      )}
    </section>
  );
}
