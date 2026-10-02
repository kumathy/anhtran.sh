"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { LuExternalLink, LuX } from "react-icons/lu";
import type { Photo } from "@/content/photos";

export function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const photo = photos[index];

  function open(next: number) {
    setIndex(next);
    dialogRef.current?.showModal();
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
                    src={item.image}
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
        className="m-auto max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-3xl translate-y-2 overflow-y-auto rounded-xl border-2 border-border bg-background p-0 text-foreground opacity-0 transition-[opacity,translate,display,overlay] transition-discrete duration-200 ease-out backdrop:bg-black/50 open:translate-y-0 open:opacity-100 starting:open:translate-y-2 starting:open:opacity-0 motion-reduce:transition-none"
      >
        <div className="p-4">
          <Image
            src={photo.image}
            alt={`At ${photo.event}`}
            sizes="(min-width: 800px) 736px, 100vw"
            className="mx-auto block h-auto max-h-[70vh] w-auto max-w-full rounded-lg"
          />
          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <a
                id={titleId}
                href={photo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 underline decoration-2 underline-offset-6 transition-colors hover:text-accent"
              >
                {photo.event}
                <LuExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <p className="mt-1 text-sm text-muted">{photo.date}</p>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-border text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <LuX className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
