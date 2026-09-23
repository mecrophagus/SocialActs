"use client";

import Link from "next/link";

import {
  useMemo,
  useState,
} from "react";

import type {
  ProfileStatus,
  VerificationStatus,
} from "@/data/profiles";

import {
  resetProfiles,
  useAdminProfiles,
} from "@/lib/admin/profile-storage";

const statusLabel: Record<
  ProfileStatus,
  string
> = {
  draft: "Borrador",
  review: "En revisión",
  published: "Publicado",
  suspended: "Suspendido",
  archived: "Archivado",
};

const verificationLabel: Record<
  VerificationStatus,
  string
> = {
  unverified: "No verificado",
  pending: "Pendiente",
  verified: "Verificado",
  rejected: "Rechazado",
};

export default function AdminProfilesPage() {
  const profiles =
    useAdminProfiles();

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState<
    "all" | ProfileStatus
  >("all");

  const filteredProfiles =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      return profiles.filter(
        (profile) => {
          const matchesSearch =
            normalizedSearch === "" ||
            profile.displayName
              .toLowerCase()
              .includes(
                normalizedSearch,
              ) ||
            profile.city
              .toLowerCase()
              .includes(
                normalizedSearch,
              ) ||
            profile.slug
              .toLowerCase()
              .includes(
                normalizedSearch,
              );

          const matchesStatus =
            statusFilter === "all" ||
            profile.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        },
      );
    }, [
      profiles,
      search,
      statusFilter,
    ]);

  function handleReset() {
    const confirmed =
      window.confirm(
        "¿Restaurar los perfiles de prueba originales? Se perderán los cambios guardados en esta demo.",
      );

    if (!confirmed) {
      return;
    }

    resetProfiles();

    setSearch("");
    setStatusFilter("all");
  }

  return (
    <section className="px-6 py-10 md:px-10 lg:px-14 lg:py-14">
      <div className="mx-auto max-w-6xl">
        {/* Cabecera */}
        <div className="flex flex-col justify-between gap-6 border-b border-black/10 pb-8 md:flex-row md:items-end">
          <div>
            <p className="font-functional text-xs uppercase tracking-[0.24em] text-brand-burgundy">
              Administración
            </p>

            <h1 className="mt-3 font-editorial text-5xl tracking-[-0.045em] md:text-6xl">
              Perfiles.
            </h1>

            <p className="mt-3 font-functional text-sm text-text-muted-light">
              {profiles.length} perfiles registrados
            </p>
          </div>

          <Link
            href="/admin/perfiles/nuevo"
            className="inline-flex w-fit bg-brand-burgundy px-5 py-3 font-functional text-xs uppercase tracking-[0.18em] text-brand-ivory"
          >
            Crear perfil
          </Link>
        </div>

        {/* Herramientas */}
        <div className="mt-8 grid gap-4 md:grid-cols-[1fr_220px_auto]">
          <label>
            <span className="sr-only">
              Buscar perfiles
            </span>

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Buscar nombre, ciudad o slug…"
              className="w-full border border-black/10 bg-white px-4 py-3 font-functional text-sm outline-none transition focus:border-brand-burgundy"
            />
          </label>

          <label>
            <span className="sr-only">
              Filtrar por estado
            </span>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target
                    .value as
                    | "all"
                    | ProfileStatus,
                )
              }
              className="w-full border border-black/10 bg-white px-4 py-3 font-functional text-sm outline-none transition focus:border-brand-burgundy"
            >
              <option value="all">
                Todos los estados
              </option>

              <option value="published">
                Publicados
              </option>

              <option value="review">
                En revisión
              </option>

              <option value="draft">
                Borradores
              </option>

              <option value="suspended">
                Suspendidos
              </option>

              <option value="archived">
                Archivados
              </option>
            </select>
          </label>

          <button
            type="button"
            onClick={handleReset}
            className="border border-black/10 px-4 py-3 font-functional text-xs uppercase tracking-[0.15em] text-black/50 transition hover:border-brand-burgundy hover:text-brand-burgundy"
          >
            Restaurar demo
          </button>
        </div>

        {/* Tabla desktop */}
        <div className="mt-8 hidden overflow-hidden border border-black/10 bg-white md:block">
          <div className="grid grid-cols-[1.4fr_0.75fr_0.85fr_auto] gap-6 border-b border-black/10 bg-[#f7f4ef] px-6 py-4">
            <span className="font-functional text-[10px] uppercase tracking-[0.2em] text-text-muted-light">
              Perfil
            </span>

            <span className="font-functional text-[10px] uppercase tracking-[0.2em] text-text-muted-light">
              Estado
            </span>

            <span className="font-functional text-[10px] uppercase tracking-[0.2em] text-text-muted-light">
              Verificación
            </span>

            <span className="font-functional text-[10px] uppercase tracking-[0.2em] text-text-muted-light">
              Acción
            </span>
          </div>

          {filteredProfiles.map(
            (profile) => (
              <article
                key={profile.id}
                className="grid grid-cols-[1.4fr_0.75fr_0.85fr_auto] items-center gap-6 border-b border-black/10 px-6 py-6 last:border-b-0"
              >
                <div className="min-w-0">
                  <p className="truncate font-functional font-medium">
                    {profile.displayName}
                  </p>

                  <p className="mt-1 truncate font-functional text-xs text-text-muted-light">
                    {profile.city} · /perfiles/
                    {profile.slug}
                  </p>
                </div>

                <div>
                  <span className="inline-flex border border-black/10 px-3 py-1.5 font-functional text-xs">
                    {
                      statusLabel[
                        profile.status
                      ]
                    }
                  </span>
                </div>

                <p className="font-functional text-sm text-text-muted-light">
                  {
                    verificationLabel[
                      profile
                        .verificationStatus
                    ]
                  }
                </p>

                <Link
                  href={`/admin/perfiles/${profile.id}/editar`}
                  className="font-functional text-xs uppercase tracking-[0.18em] text-brand-burgundy"
                >
                  Editar →
                </Link>
              </article>
            ),
          )}

          {filteredProfiles.length ===
            0 && (
            <div className="px-6 py-16 text-center">
              <p className="font-editorial text-3xl">
                No hay resultados.
              </p>

              <p className="mt-2 font-functional text-sm text-text-muted-light">
                Prueba con otra búsqueda o cambia los filtros.
              </p>
            </div>
          )}
        </div>

        {/* Mobile */}
        <div className="mt-8 space-y-4 md:hidden">
          {filteredProfiles.map(
            (profile) => (
              <article
                key={profile.id}
                className="border border-black/10 bg-white p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="truncate font-editorial text-3xl">
                      {profile.displayName}
                    </h2>

                    <p className="mt-1 font-functional text-xs text-text-muted-light">
                      {profile.city}
                    </p>
                  </div>

                  <span className="shrink-0 border border-black/10 px-2 py-1 font-functional text-[10px] uppercase">
                    {
                      statusLabel[
                        profile.status
                      ]
                    }
                  </span>
                </div>

                <div className="mt-5 border-t border-black/10 pt-4">
                  <p className="font-functional text-xs text-text-muted-light">
                    Verificación:{" "}
                    {
                      verificationLabel[
                        profile
                          .verificationStatus
                      ]
                    }
                  </p>

                  <p className="mt-2 truncate font-functional text-xs text-black/35">
                    /perfiles/
                    {profile.slug}
                  </p>

                  <Link
                    href={`/admin/perfiles/${profile.id}/editar`}
                    className="mt-5 inline-block font-functional text-xs uppercase tracking-[0.18em] text-brand-burgundy"
                  >
                    Editar perfil →
                  </Link>
                </div>
              </article>
            ),
          )}

          {filteredProfiles.length ===
            0 && (
            <div className="border border-black/10 bg-white px-6 py-14 text-center">
              <p className="font-editorial text-3xl">
                No hay resultados.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}