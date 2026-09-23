export type ProfileService = {
  name: string;
  price: string;
};

export type ProfileStatus =
  | "draft"
  | "review"
  | "published"
  | "suspended"
  | "archived";

export type VerificationStatus =
  | "unverified"
  | "pending"
  | "verified"
  | "rejected";

export type Profile = {
  id: string;
  slug: string;
  displayName: string;
  city: string;
  age: number;
  tagline: string;
  bio: string;
  availability: string;
  languages: string[];
  services: ProfileService[];
  images: string[];
  featured: boolean;
  status: ProfileStatus;
  verificationStatus: VerificationStatus;
};

// Datos temporales de desarrollo.
// Más adelante esta misma estructura será sustituida por datos de Supabase.
export const profiles: Profile[] = [
  {
    id: "01",
    slug: "laura",
    displayName: "Laura",
    city: "Madrid",
    age: 29,
    tagline: "Una noche que no tiene por qué terminar pronto.",
    bio: "Me gustan los planes tranquilos, descubrir restaurantes nuevos y dejar espacio para que una buena conversación marque el ritmo.",
    availability: "Disponible esta semana",
    languages: ["Español", "Inglés"],
    services: [
      { name: "Cena", price: "Consultar" },
      { name: "Copas", price: "Consultar" },
      { name: "Eventos", price: "Consultar" },
    ],
    images: [
      "/images/experiences/cena.png",
      "/images/experiences/copas.png",
      "/images/experiences/eventos.png",
    ],
    featured: true,
    status: "published",
    verificationStatus: "verified",
  },
  {
    id: "02",
    slug: "marta",
    displayName: "Marta",
    city: "Madrid",
    age: 31,
    tagline: "La ciudad siempre tiene algo pendiente.",
    bio: "Disfruto de los planes espontáneos, los eventos especiales y esas noches en las que el plan se descubre sobre la marcha.",
    availability: "Consultar disponibilidad",
    languages: ["Español", "Francés"],
    services: [
      { name: "Salida", price: "Consultar" },
      { name: "Copas", price: "Consultar" },
      { name: "Eventos", price: "Consultar" },
    ],
    images: [
      "/images/experiences/salida.png",
      "/images/experiences/copas.png",
      "/images/experiences/eventos.png",
    ],
    featured: true,
    status: "review",
    verificationStatus: "pending",
  },
  {
    id: "03",
    slug: "sofia",
    displayName: "Sofía",
    city: "Madrid",
    age: 28,
    tagline: "A veces el mejor plan es no tener prisa.",
    bio: "Prefiero los ambientes relajados, una cena sin prisas y los planes donde sentirse cómodo es parte de la experiencia.",
    availability: "Disponible próximamente",
    languages: ["Español", "Inglés"],
    services: [
      { name: "Cena", price: "Consultar" },
      { name: "En casa", price: "Consultar" },
      { name: "Eventos", price: "Consultar" },
    ],
    images: [
      "/images/experiences/en-casa.png",
      "/images/experiences/cena.png",
      "/images/experiences/eventos.png",
    ],
    featured: true,
    status: "draft",
    verificationStatus: "unverified",
  },
];

export function getProfileBySlug(slug: string) {
  return profiles.find((profile) => profile.slug === slug);
}