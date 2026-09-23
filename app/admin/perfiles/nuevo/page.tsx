"use client";

import { useRouter } from "next/navigation";

import ProfileForm, {
  type ProfileFormValues,
} from "@/components/admin/ProfileForm";

import {
  createProfile,
} from "@/lib/admin/profile-storage";

export default function NewProfilePage() {
  const router = useRouter();

  function handleCreate(
    values: ProfileFormValues,
  ) {
    createProfile(values);

    router.push(
      "/admin/perfiles",
    );
  }

  return (
    <section className="px-6 py-10 md:px-10 lg:px-14 lg:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="border-b border-black/10 pb-8">
          <p className="font-functional text-xs uppercase tracking-[0.24em] text-brand-burgundy">
            Perfiles / Nuevo
          </p>

          <h1 className="mt-3 font-editorial text-5xl tracking-[-0.045em] md:text-6xl">
            Crear perfil.
          </h1>

          <p className="mt-4 max-w-xl font-functional text-sm leading-6 text-text-muted-light">
            Completa la información del perfil.
            Podrás modificarla posteriormente desde
            administración.
          </p>
        </div>

        <div className="mt-10">
          <ProfileForm
            submitLabel="Crear perfil"
            onSubmit={handleCreate}
          />
        </div>
      </div>
    </section>
  );
}