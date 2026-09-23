"use client";

import Link from "next/link";

import {
  useParams,
  useRouter,
} from "next/navigation";

import { useState } from "react";

import ProfileForm, {
  type ProfileFormValues,
} from "@/components/admin/ProfileForm";

import {
  deleteProfile,
  updateProfile,
  useAdminProfiles,
} from "@/lib/admin/profile-storage";

export default function EditProfilePage() {
  const params =
    useParams<{
      id: string;
    }>();

  const router =
    useRouter();

  const profiles =
    useAdminProfiles();

  const profile =
    profiles.find(
      (currentProfile) =>
        currentProfile.id ===
        params.id,
    ) ?? null;

  const [
    showDelete,
    setShowDelete,
  ] = useState(false);

  function handleUpdate(
    values: ProfileFormValues,
  ) {
    const updatedProfile =
      updateProfile(
        params.id,
        values,
      );

    if (!updatedProfile) {
      return;
    }

    router.push(
      "/admin/perfiles",
    );
  }

  function handleDelete() {
    deleteProfile(
      params.id,
    );

    router.push(
      "/admin/perfiles",
    );
  }

  if (profile === null) {
    return (
      <section className="px-6 py-14 md:px-10 lg:px-14">
        <div className="mx-auto max-w-5xl">
          <p className="font-functional text-xs uppercase tracking-[0.22em] text-brand-burgundy">
            Administración
          </p>

          <h1 className="mt-3 font-editorial text-5xl tracking-[-0.04em]">
            Perfil no encontrado.
          </h1>

          <p className="mt-4 max-w-lg font-functional text-sm leading-6 text-text-muted-light">
            El perfil solicitado no existe o ha sido eliminado.
          </p>

          <Link
            href="/admin/perfiles"
            className="mt-8 inline-block font-functional text-xs uppercase tracking-[0.18em] text-brand-burgundy"
          >
            ← Volver a perfiles
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-10 md:px-10 lg:px-14 lg:py-14">
      <div className="mx-auto max-w-5xl">
        {/* Cabecera */}
        <div className="flex flex-col justify-between gap-8 border-b border-black/10 pb-8 md:flex-row md:items-end">
          <div>
            <p className="font-functional text-xs uppercase tracking-[0.24em] text-brand-burgundy">
              Perfiles / Editar
            </p>

            <h1 className="mt-3 font-editorial text-5xl tracking-[-0.045em] md:text-6xl">
              {profile.displayName}.
            </h1>

            <p className="mt-3 font-functional text-sm text-text-muted-light">
              /perfiles/
              {profile.slug}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setShowDelete(true)
            }
            className="w-fit border border-red-900/20 px-5 py-3 font-functional text-xs uppercase tracking-[0.18em] text-red-900 transition hover:bg-red-950 hover:text-white"
          >
            Eliminar perfil
          </button>
        </div>

        {/* Formulario */}
        <div className="mt-10">
          <ProfileForm
            profile={profile}
            submitLabel="Guardar cambios"
            onSubmit={handleUpdate}
          />
        </div>
      </div>

      {/* Confirmación de borrado */}
      {showDelete && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-profile-title"
          className="fixed inset-0 z-80 flex items-center justify-center bg-black/60 p-6"
        >
          <div className="w-full max-w-md bg-brand-ivory p-8 shadow-xl">
            <p className="font-functional text-[10px] uppercase tracking-[0.22em] text-red-900">
              Acción irreversible
            </p>

            <h2
              id="delete-profile-title"
              className="mt-3 font-editorial text-4xl tracking-[-0.035em]"
            >
              ¿Eliminar{" "}
              {profile.displayName}?
            </h2>

            <p className="mt-4 font-functional text-sm leading-6 text-text-muted-light">
              El perfil desaparecerá del almacenamiento local utilizado por esta versión del panel.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  setShowDelete(false)
                }
                className="border border-black/15 px-5 py-3 font-functional text-xs uppercase tracking-[0.16em]"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-950 px-5 py-3 font-functional text-xs uppercase tracking-[0.16em] text-white"
              >
                Eliminar definitivamente
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}