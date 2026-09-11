"use client";

import { useState } from "react";
import ProfileCard from "@/components/profiles/ProfileCard";
import ProfileGallery from "@/components/profiles/ProfileGallery";
import ProfileQuickView from "@/components/profiles/ProfileQuickView";
import {
  profiles,
  type Profile,
} from "@/data/profiles";

export default function ProfilesExplorer() {
  const [selectedProfile, setSelectedProfile] =
    useState<Profile | null>(null);

  const [galleryIndex, setGalleryIndex] =
    useState<number | null>(null);

  const closeQuickView = () => {
    setSelectedProfile(null);
    setGalleryIndex(null);
  };

  return (
    <>
      <section className="bg-brand-ivory px-6 text-brand-ink lg:px-10">
        <div className="mx-auto max-w-350">
          {profiles.map((profile, index) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              index={index}
              onOpen={setSelectedProfile}
            />
          ))}
        </div>
      </section>

      {selectedProfile && (
        <ProfileQuickView
          profile={selectedProfile}
          onClose={closeQuickView}
          onOpenGallery={setGalleryIndex}
        />
      )}

      {selectedProfile && galleryIndex !== null && (
        <ProfileGallery
          name={selectedProfile.displayName}
          images={selectedProfile.images}
          activeIndex={galleryIndex}
          onChange={setGalleryIndex}
          onClose={() => setGalleryIndex(null)}
        />
      )}
    </>
  );
}