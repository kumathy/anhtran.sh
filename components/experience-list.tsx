import { LuChevronRight } from "react-icons/lu";
import { CollapsibleRow } from "@/components/collapsible-row";
import { TechList } from "@/components/tech-list";
import { experience } from "@/content/experience";

export function ExperienceList() {
  return (
    <ul>
      {experience.map((role) => (
        <CollapsibleRow
          key={`${role.company}-${role.period}`}
          className="group/row cursor-pointer border-t-2 border-border py-6 first:border-t-0"
        >
          <details className="group">
            <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <h3 className="font-medium">
                {role.href ? (
                  <a
                    href={role.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-2 underline-offset-6 transition-colors hover:text-accent"
                  >
                    {role.company}
                  </a>
                ) : (
                  role.company
                )}
                <span className="text-muted"> — {role.title}</span>
              </h3>

              <div className="flex shrink-0 items-center gap-3">
                <span className="text-xs text-muted">
                  {role.period}
                </span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-border text-muted transition duration-200 group-hover/row:border-accent group-hover/row:text-accent group-has-[summary:focus-visible]/row:border-accent group-has-[summary:focus-visible]/row:text-accent">
                  <LuChevronRight
                    aria-hidden="true"
                    className="h-4 w-4 transition duration-200 group-open:rotate-90"
                  />
                </span>
              </div>
            </summary>

            <div className="min-h-0 overflow-hidden -translate-y-1 opacity-0 transition-[opacity,translate] duration-200 ease-out group-open:translate-y-0 group-open:animate-slide-down group-open:opacity-100 motion-reduce:transition-none">
              {role.notes?.length ? (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
                  {role.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              ) : null}

              {role.technologies.length ? (
                <div className="mt-3">
                  <TechList items={role.technologies} />
                </div>
              ) : null}
            </div>
          </details>
        </CollapsibleRow>
      ))}
    </ul>
  );
}
