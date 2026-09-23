import { profiles } from "../data/profiles";
import type { Profile } from "../data/profiles";

export const experiences = [
  "Todos",
  "Cena",
  "Copas",
  "Salida",
  "Eventos",
  "En casa",
] as const;
export type Experience = (typeof experiences)[number];
export const PAGE_SIZE = 8;
export const publicProfiles = profiles.filter(
  (profile) => profile.status === "published",
);
export const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export function filterProfiles(
  items: Profile[],
  experience: Experience,
  query: string,
) {
  const search = normalize(query);
  return items.filter(
    (profile) =>
      profile.status === "published" &&
      (experience === "Todos" ||
        profile.services.some((service) => service.name === experience)) &&
      normalize(
        [profile.displayName, profile.city, ...profile.languages].join(" "),
      ).includes(search),
  );
}
