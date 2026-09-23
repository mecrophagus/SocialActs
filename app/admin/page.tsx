"use client";

import Link from "next/link";

import {
  useAdminProfiles,
} from "@/lib/admin/profile-storage";

export default function AdminPage() {
  const profiles =
    useAdminProfiles();

  const published =
    profiles.filter(
      (profile) =>
        profile.status === "published",
    ).length;

  const pending =
    profiles.filter(
      (profile) =>
        profile.status === "review",
    ).length;

  const drafts =
    profiles.filter(
      (profile) =>
        profile.status === "draft",
    ).length;

  return (
    <section className="px-6 py-10 md:px-10 lg:px-14 lg:py-14">
      <div className="mx-auto max-w-6xl">
        {/* Cabecera */}
        <div className="flex flex-col justify-between gap-6 border-b border-black/10 pb-8 md:flex-row md:items-end">
          <div>
            <p className="font-functional text-xs uppercase tracking-[0.24em] text-brand-burgundy">
              Panel interno
            </p>

            <h1 className="mt-3 font-editorial text-5xl tracking-[-0.045em] md:text-6xl">
              Administración.
            </h1>
          </div>

          <Link
            href="/admin/perfiles/nuevo"
            className="inline-flex w-fit items-center gap-3 bg-brand-burgundy px-5 py-3 font-functional text-xs uppercase tracking-[0.18em] text-brand-ivory"
          >
            Nuevo perfil

            <span aria-hidden="true">
              +
            </span>
          </Link>
        </div>

        {/* Resumen */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="border border-black/10 bg-white p-6">
            <p className="font-functional text-xs uppercase tracking-[0.2em] text-text-muted-light">
              Publicados
            </p>

            <p className="mt-6 font-editorial text-5xl text-brand-burgundy">
              {published}
            </p>
          </div>

          <div className="border border-black/10 bg-white p-6">
            <p className="font-functional text-xs uppercase tracking-[0.2em] text-text-muted-light">
              En revisión
            </p>

            <p className="mt-6 font-editorial text-5xl text-brand-burgundy">
              {pending}
            </p>
          </div>

          <div className="border border-black/10 bg-white p-6">
            <p className="font-functional text-xs uppercase tracking-[0.2em] text-text-muted-light">
              Borradores
            </p>

            <p className="mt-6 font-editorial text-5xl text-brand-burgundy">
              {drafts}
            </p>
          </div>
        </div>

        {/* Perfiles recientes */}
        <div className="mt-10 overflow-hidden border border-black/10 bg-white">
          <div className="flex items-center justify-between gap-6 border-b border-black/10 p-6">
            <div>
              <h2 className="font-editorial text-3xl">
                Perfiles
              </h2>

              <p className="mt-1 font-functional text-sm text-text-muted-light">
                Gestión de perfiles y estados de publicación.
              </p>
            </div>

            <Link
              href="/admin/perfiles"
              className="shrink-0 font-functional text-xs uppercase tracking-[0.18em] text-brand-burgundy"
            >
              Gestionar →
            </Link>
          </div>

          <div className="divide-y divide-black/10">
            {profiles
              .slice(0, 5)
              .map((profile) => (
                <div
                  key={profile.id}
                  className="flex items-center justify-between gap-4 p-6"
                >
                  <div className="min-w-0">
                    <p className="truncate font-functional font-medium">
                      {profile.displayName}
                    </p>

                    <p className="mt-1 font-functional text-xs text-text-muted-light">
                      {profile.city} ·{" "}
                      {profile.status}
                    </p>
                  </div>

                  <Link
                    href={`/admin/perfiles/${profile.id}/editar`}
                    className="shrink-0 font-functional text-xs uppercase tracking-[0.16em] text-brand-burgundy"
                  >
                    Editar
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}