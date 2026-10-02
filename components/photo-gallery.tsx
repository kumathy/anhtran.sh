"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { LuX } from "react-icons/lu";
import type { Photo } from "@/content/photos";

const controlClass =
  "inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-background/80 text-muted transition-colors hover:border-accent hover:text-accent";

export function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const photo = photos[index];

  function open(next: number) {
    setIndex(next);
    dialogRef.current?.showModal();
  }

  function step(by: number) {
    setIndex((current) => (current + by + photos.length) % photos.length);
  }

  return (
    <>
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] motion-reduce:overflow-x-auto">
        <ul className="flex w-max animate-marquee hover:[animation-play-state:paused] has-[:focus-visible]:[animation-play-state:paused] motion-reduce:animate-none">
          {[...photos, ...photos].map((item, i) => {
            const copy = i >= photos.length;

            return (
              <li
                key={`${item.image.src}-${i}`}
                aria-hidden={copy || undefined}
                className={`shrink-0 pr-3 ${copy ? "motion-reduce:hidden" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => open(i % photos.length)}
                  tabIndex={copy ? -1 : undefined}
                  aria-label={`View photo from ${item.event}`}
                  className="relative block overflow-hidden rounded-lg border-2 border-border transition-colors hover:border-accent"
                >
                  <Image
                    src={item.thumb}
                    alt=""
                    sizes="240px"
                    className="block h-28 w-auto sm:h-32"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-2 pt-6 pb-1.5 text-left text-xs text-white">
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") step(-1);
          if (event.key === "ArrowRight") step(1);
        }}
        className="m-auto max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-3xl translate-y-2 overflow-y-auto rounded-xl border-2 border-border bg-background p-0 text-foreground opacity-0 transition-[opacity,translate,display,overlay] transition-discrete duration-200 ease-out backdrop:bg-black/50 open:translate-y-0 open:opacity-100 starting:open:translate-y-2 starting:open:opacity-0 motion-reduce:transition-none"
      >
        <div className="p-4">
          <div className="mb-3 flex justify-end">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close"
              className={controlClass}
            >
              <LuX className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="relative">
            <Image
              src={photo.image}
              alt={`At ${photo.event}`}
              sizes="(min-width: 800px) 736px, 100vw"
              className="mx-auto block h-auto max-h-[70vh] w-auto max-w-full rounded-lg"
            />
          </div>

          <div className="mt-4">
            <p id={titleId}>{photo.event}</p>
            {photo.credit ? (
              <p className="mt-1 text-sm text-muted">
                Photo by{" "}
                <a
                  href={photo.credit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 align-bottom transition-colors hover:text-accent"
                >
                  {photo.credit.name} on
                  <FaInstagram className="h-3.5 w-3.5" aria-label="Instagram" />
                </a>
              </p>
            ) : null}
          </div>
        </div>
      </dialog>
    </>
  );
}
