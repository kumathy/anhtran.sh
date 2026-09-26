import { CollapsibleRow } from "@/components/collapsible-row";
import { TechList } from "@/components/tech-list";
import { experience } from "@/content/experience";

export function ExperienceList() {
  return (
    <ul className="-mx-3">
      {experience.map((role) => (
        <CollapsibleRow
          key={`${role.company}-${role.period}`}
          className="group/row cursor-pointer border-t border-border px-3 py-6 transition-colors first:border-t-0 hover:bg-foreground/5"
        >
          <details className="group">
            <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <h3 className="font-medium">
                <span className="mr-2 inline-block font-mono text-xs text-muted transition group-open:rotate-90 group-hover/row:text-foreground">
                  &rsaquo;
                </span>
                {role.href ? (
                  <a
                    href={role.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 transition-colors hover:text-accent"
                  >
                    {role.company}
                  </a>
                ) : (
                  role.company
                )}
                <span className="text-muted"> — {role.title}</span>
              </h3>
              <span className="shrink-0 font-mono text-xs text-muted">
                {role.period}
              </span>
            </summary>

            <div className="pl-5">
              {role.notes?.length ? (
                <div className="mt-2 space-y-1 text-muted">
                  {role.notes.map((note) => (
                    <p key={note}>{note}</p>
                  ))}
                </div>
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
