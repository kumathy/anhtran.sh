"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LuPause, LuPlay, LuSkipBack, LuSkipForward } from "react-icons/lu";

export type Track = {
  title: string;
  artist: string;
  cover: string;
  framedCover: boolean;
  preview: string;
  href: string;
};

const controlClass =
  "inline-flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:text-accent";

export function NowPlaying({ tracks }: { tracks: Track[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  const track = tracks[index];

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const text = tracks.map((item) => item.title + item.artist).join("");
        const family = getComputedStyle(document.body).fontFamily;
        document.fonts.load(`1em ${family}`, text).catch(() => {});
      },
      { rootMargin: "200px" },
    );

    observer.observe(player);
    return () => observer.disconnect();
  }, [tracks]);

  function skip(step: number) {
    setIndex((current) => (current + step + tracks.length) % tracks.length);
  }

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }

  return (
    <div ref={playerRef} className="flex items-center gap-4">
      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md">
        <Image
          src={track.cover}
          alt=""
          width={48}
          height={48}
          className={`h-full w-full ${track.framedCover ? "scale-107" : ""}`}
        />
      </div>

      <div className="min-w-0 flex-1">
        <a
          href={track.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block truncate transition-colors hover:text-accent"
        >
          {track.title}
        </a>
        <p className="truncate text-sm text-muted">{track.artist}</p>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={() => skip(-1)}
          aria-label="Previous song"
          className={controlClass}
        >
          <LuSkipBack className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause preview" : "Play preview"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-border transition-colors hover:border-accent hover:text-accent"
        >
          {playing ? (
            <LuPause className="h-4 w-4" aria-hidden="true" />
          ) : (
            <LuPlay className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
        <button
          type="button"
          onClick={() => skip(1)}
          aria-label="Next song"
          className={controlClass}
        >
          <LuSkipForward className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <audio
        ref={audioRef}
        src={track.preview}
        autoPlay={playing}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          skip(1);
          setPlaying(true);
        }}
      />
    </div>
  );
}
