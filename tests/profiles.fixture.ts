import { profiles, type Profile } from "../data/profiles";
export const scaleProfiles: Profile[] = Array.from(
  { length: 24 },
  (_, index) => ({
    ...profiles[index % profiles.length],
    id: `qa-${index}`,
    slug: `qa-${index}`,
    displayName: `${profiles[index % profiles.length].displayName} ${index + 1}`,
    status: "published",
  }),
);
