import { CollapsibleRow } from "@/components/collapsible-row";
import { TechList } from "@/components/tech-list";
import { experience } from "@/content/experience";

export function ExperienceList() {
  return (
    <ul className="-mx-3">
      {experience.map((role) => (
        <CollapsibleRow
          key={`${role.company}-${role.period}`}
          className="group/row relative cursor-pointer rounded-md px-3 py-6 transition-colors before:absolute before:inset-x-3 before:top-0 before:h-px before:bg-border before:transition-opacity first:before:hidden hover:bg-foreground/5 hover:before:opacity-0 has-[summary:focus-visible]:bg-foreground/5 has-[summary:focus-visible]:before:opacity-0 active:bg-foreground/10 [li:hover+&]:before:opacity-0 [li:has(summary:focus-visible)+&]:before:opacity-0"
        >
          <details className="group">
            <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <h3 className="font-medium">
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

              <div className="flex shrink-0 items-baseline gap-3">
                <span className="text-xs text-muted">
                  {role.period}
                </span>
                <span className="inline-block text-xs text-muted transition group-open:rotate-90 group-hover/row:text-foreground">
                  &rsaquo;
                </span>
              </div>
            </summary>

            <div className="min-h-0 overflow-hidden -translate-y-1 opacity-0 transition-[opacity,translate] duration-200 ease-out group-open:translate-y-0 group-open:animate-slide-down group-open:opacity-100 motion-reduce:transition-none">
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
