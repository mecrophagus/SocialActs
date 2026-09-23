import { useSyncExternalStore } from "react";

import {
  profiles as initialProfiles,
  type Profile,
  type ProfileStatus,
  type VerificationStatus,
} from "@/data/profiles";

const STORAGE_KEY = "lolitas-admin-profiles-v1";

/*
 * Cache en memoria.
 *
 * useSyncExternalStore necesita que getSnapshot()
 * devuelva la misma referencia mientras los datos
 * no hayan cambiado.
 */
let cachedProfiles: Profile[] | null = null;

const listeners = new Set<() => void>();

export type ProfileInput = {
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

/*
 * Comprueba si estamos ejecutando código en navegador.
 */
function canUseStorage() {
  return typeof window !== "undefined";
}

/*
 * Notifica a todos los componentes que utilizan
 * el store que los perfiles han cambiado.
 */
function emitChange() {
  listeners.forEach((listener) => {
    listener();
  });
}

/*
 * Lee los perfiles almacenados.
 *
 * En servidor devolvemos los perfiles iniciales.
 * En navegador utilizamos localStorage.
 */
export function getStoredProfiles(): Profile[] {
  if (!canUseStorage()) {
    return initialProfiles;
  }

  if (cachedProfiles !== null) {
    return cachedProfiles;
  }

  const storedProfiles =
    window.localStorage.getItem(STORAGE_KEY);

  if (!storedProfiles) {
    cachedProfiles = initialProfiles;

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(initialProfiles),
    );

    return cachedProfiles;
  }

  try {
    cachedProfiles =
      JSON.parse(storedProfiles) as Profile[];

    return cachedProfiles;
  } catch {
    cachedProfiles = initialProfiles;

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(initialProfiles),
    );

    return cachedProfiles;
  }
}

/*
 * Snapshot utilizado en navegador.
 */
function getProfilesSnapshot(): Profile[] {
  return getStoredProfiles();
}

/*
 * Snapshot utilizado durante SSR.
 *
 * Es importante que sea estable para evitar
 * diferencias durante la hidratación.
 */
function getProfilesServerSnapshot(): Profile[] {
  return initialProfiles;
}

/*
 * React se suscribe a cambios del almacenamiento.
 *
 * También escuchamos el evento "storage" para
 * sincronizar otras pestañas del navegador.
 */
function subscribeProfiles(
  listener: () => void,
) {
  listeners.add(listener);

  function handleStorage(
    event: StorageEvent,
  ) {
    if (event.key !== STORAGE_KEY) {
      return;
    }

    cachedProfiles = null;

    listener();
  }

  if (canUseStorage()) {
    window.addEventListener(
      "storage",
      handleStorage,
    );
  }

  return () => {
    listeners.delete(listener);

    if (canUseStorage()) {
      window.removeEventListener(
        "storage",
        handleStorage,
      );
    }
  };
}

/*
 * Hook central para consumir perfiles dentro
 * del panel administrativo.
 *
 * useSyncExternalStore permite trabajar con
 * localStorage sin provocar hydration mismatch.
 */
export function useAdminProfiles() {
  return useSyncExternalStore(
    subscribeProfiles,
    getProfilesSnapshot,
    getProfilesServerSnapshot,
  );
}

/*
 * Guarda la colección completa de perfiles.
 */
export function saveProfiles(
  profiles: Profile[],
) {
  if (!canUseStorage()) {
    return;
  }

  cachedProfiles = profiles;

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(profiles),
  );

  emitChange();
}

/*
 * Obtiene un perfil mediante su ID interno.
 */
export function getStoredProfileById(
  id: string,
): Profile | undefined {
  return getStoredProfiles().find(
    (profile) =>
      profile.id === id,
  );
}

/*
 * Crea un nuevo perfil.
 */
export function createProfile(
  input: ProfileInput,
): Profile {
  const currentProfiles =
    getStoredProfiles();

  const profile: Profile = {
    id: crypto.randomUUID(),
    ...input,
  };

  saveProfiles([
    ...currentProfiles,
    profile,
  ]);

  return profile;
}

/*
 * Actualiza un perfil existente.
 */
export function updateProfile(
  id: string,
  input: ProfileInput,
): Profile | null {
  const currentProfiles =
    getStoredProfiles();

  const existingProfile =
    currentProfiles.find(
      (profile) =>
        profile.id === id,
    );

  if (!existingProfile) {
    return null;
  }

  const updatedProfile: Profile = {
    ...existingProfile,
    ...input,
  };

  const updatedProfiles =
    currentProfiles.map(
      (profile) =>
        profile.id === id
          ? updatedProfile
          : profile,
    );

  saveProfiles(
    updatedProfiles,
  );

  return updatedProfile;
}

/*
 * Elimina un perfil.
 */
export function deleteProfile(
  id: string,
) {
  const currentProfiles =
    getStoredProfiles();

  const remainingProfiles =
    currentProfiles.filter(
      (profile) =>
        profile.id !== id,
    );

  saveProfiles(
    remainingProfiles,
  );
}

/*
 * Restaura los datos demo originales.
 */
export function resetProfiles(): Profile[] {
  const restoredProfiles = [
    ...initialProfiles,
  ];

  saveProfiles(
    restoredProfiles,
  );

  return restoredProfiles;
}