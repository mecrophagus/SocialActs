"use client";

import { FormEvent, useMemo, useState } from "react";

import type {
  Profile,
  ProfileStatus,
  VerificationStatus,
} from "@/data/profiles";

export type ProfileFormValues = {
  displayName: string;
  slug: string;
  city: string;
  age: number;
  tagline: string;
  bio: string;
  availability: string;
  languages: string[];
  services: {
    name: string;
    price: string;
  }[];
  images: string[];
  featured: boolean;
  status: ProfileStatus;
  verificationStatus: VerificationStatus;
};

type ProfileFormProps = {
  profile?: Profile;
  submitLabel: string;
  onSubmit: (values: ProfileFormValues) => void;
};

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ProfileForm({
  profile,
  submitLabel,
  onSubmit,
}: ProfileFormProps) {
  const [displayName, setDisplayName] = useState(
    profile?.displayName ?? "",
  );

  const [slug, setSlug] = useState(
    profile?.slug ?? "",
  );

  const [slugWasEdited, setSlugWasEdited] =
    useState(Boolean(profile));

  const [city, setCity] = useState(
    profile?.city ?? "Madrid",
  );

  const [age, setAge] = useState(
    profile?.age ?? 18,
  );

  const [tagline, setTagline] = useState(
    profile?.tagline ?? "",
  );

  const [bio, setBio] = useState(
    profile?.bio ?? "",
  );

  const [availability, setAvailability] =
    useState(profile?.availability ?? "");

  const [languages, setLanguages] = useState(
    profile?.languages?.join(", ") ?? "Español",
  );

  const [services, setServices] = useState(
    profile?.services?.length
      ? profile.services
      : [
          {
            name: "",
            price: "",
          },
        ],
  );

  const [images, setImages] = useState(
    profile?.images?.length
      ? profile.images
      : [""],
  );

  const [featured, setFeatured] = useState(
    profile?.featured ?? false,
  );

  const [status, setStatus] =
    useState<ProfileStatus>(
      profile?.status ?? "draft",
    );

  const [
    verificationStatus,
    setVerificationStatus,
  ] = useState<VerificationStatus>(
    profile?.verificationStatus ??
      "unverified",
  );

  const generatedSlug = useMemo(
    () => slugify(displayName),
    [displayName],
  );

  function handleNameChange(value: string) {
    setDisplayName(value);

    if (!slugWasEdited) {
      setSlug(slugify(value));
    }
  }

  function updateService(
    index: number,
    field: "name" | "price",
    value: string,
  ) {
    setServices((current) =>
      current.map((service, serviceIndex) =>
        serviceIndex === index
          ? {
              ...service,
              [field]: value,
            }
          : service,
      ),
    );
  }

  function addService() {
    setServices((current) => [
      ...current,
      {
        name: "",
        price: "",
      },
    ]);
  }

  function removeService(index: number) {
    setServices((current) =>
      current.filter(
        (_, serviceIndex) =>
          serviceIndex !== index,
      ),
    );
  }

  function updateImage(
    index: number,
    value: string,
  ) {
    setImages((current) =>
      current.map((image, imageIndex) =>
        imageIndex === index ? value : image,
      ),
    );
  }

  function addImage() {
    setImages((current) => [
      ...current,
      "",
    ]);
  }

  function removeImage(index: number) {
    setImages((current) =>
      current.filter(
        (_, imageIndex) =>
          imageIndex !== index,
      ),
    );
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const cleanedServices =
      services.filter(
        (service) =>
          service.name.trim() !== "",
      );

    const cleanedImages =
      images
        .map((image) => image.trim())
        .filter(Boolean);

    const cleanedLanguages =
      languages
        .split(",")
        .map((language) =>
          language.trim(),
        )
        .filter(Boolean);

    onSubmit({
      displayName: displayName.trim(),
      slug:
        slug.trim() || generatedSlug,
      city: city.trim(),
      age,
      tagline: tagline.trim(),
      bio: bio.trim(),
      availability:
        availability.trim(),
      languages: cleanedLanguages,
      services: cleanedServices,
      images: cleanedImages,
      featured,
      status,
      verificationStatus,
    });
  }

  const inputClass =
    "mt-2 w-full border border-black/15 bg-white px-4 py-3 font-functional text-sm outline-none transition focus:border-brand-burgundy";

  const labelClass =
    "font-functional text-[10px] uppercase tracking-[0.18em] text-text-muted-light";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-10"
    >
      {/* Datos principales */}
      <section className="border border-black/10 bg-white p-6 md:p-8">
        <p className="font-functional text-[10px] uppercase tracking-[0.22em] text-brand-burgundy">
          01 / Información
        </p>

        <h2 className="mt-2 font-editorial text-3xl">
          Datos principales
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <label>
            <span className={labelClass}>
              Nombre visible
            </span>

            <input
              required
              value={displayName}
              onChange={(event) =>
                handleNameChange(
                  event.target.value,
                )
              }
              className={inputClass}
            />
          </label>

          <label>
            <span className={labelClass}>
              Slug
            </span>

            <input
              required
              value={slug}
              onChange={(event) => {
                setSlugWasEdited(true);
                setSlug(
                  slugify(
                    event.target.value,
                  ),
                );
              }}
              className={inputClass}
            />

            <span className="mt-2 block font-functional text-xs text-black/40">
              /perfiles/{slug || generatedSlug}
            </span>
          </label>

          <label>
            <span className={labelClass}>
              Ciudad
            </span>

            <input
              required
              value={city}
              onChange={(event) =>
                setCity(
                  event.target.value,
                )
              }
              className={inputClass}
            />
          </label>

          <label>
            <span className={labelClass}>
              Edad
            </span>

            <input
              required
              min={18}
              type="number"
              value={age}
              onChange={(event) =>
                setAge(
                  Number(
                    event.target.value,
                  ),
                )
              }
              className={inputClass}
            />
          </label>
        </div>

        <div className="mt-6 grid gap-6">
          <label>
            <span className={labelClass}>
              Frase principal
            </span>

            <input
              required
              value={tagline}
              onChange={(event) =>
                setTagline(
                  event.target.value,
                )
              }
              className={inputClass}
            />
          </label>

          <label>
            <span className={labelClass}>
              Biografía
            </span>

            <textarea
              required
              rows={6}
              value={bio}
              onChange={(event) =>
                setBio(
                  event.target.value,
                )
              }
              className={inputClass}
            />
          </label>

          <label>
            <span className={labelClass}>
              Disponibilidad
            </span>

            <input
              value={availability}
              onChange={(event) =>
                setAvailability(
                  event.target.value,
                )
              }
              className={inputClass}
            />
          </label>

          <label>
            <span className={labelClass}>
              Idiomas
            </span>

            <input
              value={languages}
              onChange={(event) =>
                setLanguages(
                  event.target.value,
                )
              }
              placeholder="Español, Inglés"
              className={inputClass}
            />

            <span className="mt-2 block font-functional text-xs text-black/40">
              Separa cada idioma con una coma.
            </span>
          </label>
        </div>
      </section>

      {/* Servicios */}
      <section className="border border-black/10 bg-white p-6 md:p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-functional text-[10px] uppercase tracking-[0.22em] text-brand-burgundy">
              02 / Servicios
            </p>

            <h2 className="mt-2 font-editorial text-3xl">
              Servicios
            </h2>
          </div>

          <button
            type="button"
            onClick={addService}
            className="font-functional text-xs uppercase tracking-[0.15em] text-brand-burgundy"
          >
            + Añadir
          </button>
        </div>

        <div className="mt-8 space-y-4">
          {services.map(
            (service, index) => (
              <div
                key={index}
                className="grid gap-3 border border-black/10 bg-[#f8f5f0] p-4 md:grid-cols-[1fr_180px_auto] md:items-end"
              >
                <label>
                  <span
                    className={
                      labelClass
                    }
                  >
                    Servicio
                  </span>

                  <input
                    value={
                      service.name
                    }
                    onChange={(event) =>
                      updateService(
                        index,
                        "name",
                        event.target
                          .value,
                      )
                    }
                    className={
                      inputClass
                    }
                  />
                </label>

                <label>
                  <span
                    className={
                      labelClass
                    }
                  >
                    Precio
                  </span>

                  <input
                    value={
                      service.price
                    }
                    onChange={(event) =>
                      updateService(
                        index,
                        "price",
                        event.target
                          .value,
                      )
                    }
                    placeholder="Consultar"
                    className={
                      inputClass
                    }
                  />
                </label>

                <button
                  type="button"
                  onClick={() =>
                    removeService(
                      index,
                    )
                  }
                  className="mb-3 font-functional text-xs uppercase tracking-[0.15em] text-black/45 hover:text-brand-burgundy"
                >
                  Quitar
                </button>
              </div>
            ),
          )}
        </div>
      </section>

      {/* Imágenes */}
      <section className="border border-black/10 bg-white p-6 md:p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-functional text-[10px] uppercase tracking-[0.22em] text-brand-burgundy">
              03 / Imágenes
            </p>

            <h2 className="mt-2 font-editorial text-3xl">
              Galería
            </h2>
          </div>

          <button
            type="button"
            onClick={addImage}
            className="font-functional text-xs uppercase tracking-[0.15em] text-brand-burgundy"
          >
            + Añadir
          </button>
        </div>

        <p className="mt-4 max-w-2xl font-functional text-xs leading-5 text-text-muted-light">
          Por ahora utilizamos rutas locales o URLs.
          La subida real de archivos llegará con
          Supabase Storage.
        </p>

        <div className="mt-8 space-y-3">
          {images.map(
            (image, index) => (
              <div
                key={index}
                className="flex gap-3"
              >
                <input
                  value={image}
                  onChange={(event) =>
                    updateImage(
                      index,
                      event.target
                        .value,
                    )
                  }
                  placeholder="/images/perfiles/foto.jpg"
                  className={`${inputClass} mt-0`}
                />

                <button
                  type="button"
                  onClick={() =>
                    removeImage(
                      index,
                    )
                  }
                  className="border border-black/10 px-4 font-functional text-xs uppercase tracking-[0.14em] text-black/45 transition hover:border-brand-burgundy hover:text-brand-burgundy"
                >
                  Quitar
                </button>
              </div>
            ),
          )}
        </div>
      </section>

      {/* Publicación */}
      <section className="border border-black/10 bg-white p-6 md:p-8">
        <p className="font-functional text-[10px] uppercase tracking-[0.22em] text-brand-burgundy">
          04 / Publicación
        </p>

        <h2 className="mt-2 font-editorial text-3xl">
          Estado del perfil
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <label>
            <span className={labelClass}>
              Estado
            </span>

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target
                    .value as ProfileStatus,
                )
              }
              className={inputClass}
            >
              <option value="draft">
                Borrador
              </option>

              <option value="review">
                En revisión
              </option>

              <option value="published">
                Publicado
              </option>

              <option value="suspended">
                Suspendido
              </option>

              <option value="archived">
                Archivado
              </option>
            </select>
          </label>

          <label>
            <span className={labelClass}>
              Verificación
            </span>

            <select
              value={
                verificationStatus
              }
              onChange={(event) =>
                setVerificationStatus(
                  event.target
                    .value as VerificationStatus,
                )
              }
              className={inputClass}
            >
              <option value="unverified">
                No verificado
              </option>

              <option value="pending">
                Pendiente
              </option>

              <option value="verified">
                Verificado
              </option>

              <option value="rejected">
                Rechazado
              </option>
            </select>
          </label>
        </div>

        <label className="mt-8 flex items-center gap-3">
          <input
            type="checkbox"
            checked={featured}
            onChange={(event) =>
              setFeatured(
                event.target.checked,
              )
            }
            className="h-4 w-4 accent-[#4A0E17]"
          />

          <span className="font-functional text-sm">
            Mostrar como perfil destacado
          </span>
        </label>
      </section>

      {/* Guardado */}
      <div className="sticky bottom-4 z-20 flex justify-end">
        <button
          type="submit"
          className="bg-brand-burgundy px-8 py-4 font-functional text-xs uppercase tracking-[0.2em] text-brand-ivory shadow-lg transition hover:opacity-90"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}