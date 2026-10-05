"use client";

import Image from "next/image";
import { useId, useRef } from "react";
import { LuAward, LuExternalLink, LuMaximize2, LuX } from "react-icons/lu";
import { TechList } from "@/components/tech-list";
import type { Project } from "@/content/projects";

function ProjectItem({ project }: { project: Project }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  const links = [
    { label: "Demo", href: project.href },
    { label: "Source", href: project.source },
    { label: "Devpost", href: project.devpost },
    { label: "Pitch", href: project.pitch },
  ].filter((link): link is { label: string; href: string } =>
    Boolean(link.href),
  );

  const imageLink = project.href
    ? { label: "demo", href: project.href }
    : project.source
      ? { label: "source code", href: project.source }
      : null;

  return (
    <li className="group/row relative border-t-2 border-border py-6 first:border-t-0">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-medium">
            <button
              type="button"
              onClick={() => dialogRef.current?.showModal()}
              className="cursor-pointer text-left transition-colors group-hover/row:text-accent after:absolute after:inset-0"
            >
              {project.title}
            </button>
          </h3>
          <p className="mt-2 text-muted">{project.blurb}</p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span className="text-xs text-muted">{project.year}</span>
          <LuMaximize2
            aria-hidden="true"
            className="h-4 w-4 text-muted transition-colors duration-200 group-hover/row:text-accent group-has-[button:focus-visible]/row:text-accent"
          />
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-xl translate-y-2 overflow-y-auto rounded-xl border-2 border-border bg-background p-0 text-foreground opacity-0 transition-[opacity,translate,display,overlay] transition-discrete duration-200 ease-out backdrop:bg-black/50 open:translate-y-0 open:opacity-100 starting:open:translate-y-2 starting:open:opacity-0 motion-reduce:transition-none"
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id={titleId} className="text-lg font-medium">
                {project.title}
              </h2>
              <p className="text-xs text-muted">{project.year}</p>
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

          {project.image && imageLink ? (
            <a
              href={imageLink.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} ${imageLink.label}`}
              className="group/image mt-4 block rounded-lg"
            >
              <Image
                src={project.image}
                alt=""
                className="mx-auto block h-auto max-h-[60vh] w-auto max-w-full rounded-lg border-2 border-border transition-colors group-hover/image:border-accent"
              />
            </a>
          ) : project.image ? (
            <Image
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              className="mx-auto mt-4 block h-auto max-h-[60vh] w-auto max-w-full rounded-lg border-2 border-border"
            />
          ) : null}

          <p className="mt-4 text-muted">
            {project.description ?? project.blurb}
          </p>

          {project.awards?.length ? (
            <ul className="mt-4 space-y-1.5 text-sm">
              {project.awards.map((award) => (
                <li key={award} className="flex items-center gap-2">
                  <LuAward
                    className="h-4 w-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  {award}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-4">
            <TechList items={project.stack} />
          </div>

          {links.length ? (
            <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 basis-24 items-center justify-center gap-1.5 rounded-full border-2 border-border px-2 py-2.5 text-sm whitespace-nowrap transition-colors hover:border-accent hover:text-accent sm:gap-2 sm:px-4 sm:py-2"
                >
                  {link.label}
                  <LuExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </dialog>
    </li>
  );
}

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul>
      {projects.map((project) => (
        <ProjectItem key={project.slug} project={project} />
      ))}
    </ul>
  );
}
