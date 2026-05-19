import { getCityCoordinates, normalizeCityKey } from "@/lib/cityCoordinates";
import type { Concert } from "@/lib/types";

export type MapPin = {
  city: string;
  state: string;
  coordinates: [number, number];
  concerts: Concert[];
};

export type MapLocationData = {
  pins: MapPin[];
  unmapped: { city: string; state: string; concerts: Concert[] }[];
};

export function groupConcertsByCity(concerts: Concert[]): MapLocationData {
  const byKey = new Map<string, Concert[]>();

  for (const concert of concerts) {
    const key = normalizeCityKey(concert.city, concert.state);
    const list = byKey.get(key) ?? [];
    list.push(concert);
    byKey.set(key, list);
  }

  const pins: MapPin[] = [];
  const unmapped: MapLocationData["unmapped"] = [];

  for (const [, cityConcerts] of byKey) {
    const { city, state } = cityConcerts[0];
    const coords = getCityCoordinates(city, state);

    if (coords) {
      pins.push({
        city,
        state,
        coordinates: coords,
        concerts: cityConcerts,
      });
    } else {
      unmapped.push({ city, state, concerts: cityConcerts });
    }
  }

  pins.sort((a, b) => a.city.localeCompare(b.city));
  unmapped.sort((a, b) => a.city.localeCompare(b.city));

  return { pins, unmapped };
}
