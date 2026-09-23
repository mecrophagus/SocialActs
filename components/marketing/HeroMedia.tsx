"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function HeroMedia() {
  const video = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const update = () => setEnabled(media.matches && !connection?.saveData);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!enabled) return;
    const element = video.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) element?.pause();
    });
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, [enabled]);
  return (
    <>
      <Image
        src="/images/hero/lolitas-hero-poster.webp"
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover object-center"
      />
      {enabled && (
        <video
          ref={video}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/lolitas-hero.mp4" type="video/mp4" />
        </video>
      )}
      {enabled && (
        <button
          onClick={() => {
            if (video.current?.paused)
              void video.current.play().catch(() => setPlaying(false));
            else video.current?.pause();
          }}
          className="absolute bottom-5 right-6 z-40 min-h-11 border border-white/40 bg-black/50 px-4 text-xs text-white"
        >
          {playing ? "Pausar vídeo" : "Reproducir vídeo"}
        </button>
      )}
    </>
  );
}
