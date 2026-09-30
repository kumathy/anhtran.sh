import { LuExternalLink } from "react-icons/lu";
import { awards } from "@/content/awards";

export function AwardList() {
  return (
    <ul className="space-y-6">
      {awards.map((award) => (
        <li
          key={award.title}
          className="flex items-baseline justify-between gap-4"
        >
          <div>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              {award.shortTitle ? (
                <span>
                  <span className="sm:hidden">{award.shortTitle}</span>
                  <span className="hidden sm:inline">{award.title}</span>
                </span>
              ) : (
                <span>{award.title}</span>
              )}
              {award.link ? (
                <a
                  href={award.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
                >
                  {award.link.label}
                  <LuExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : null}
            </div>
            {award.note ? (
              <p className="mt-1 text-sm text-muted">{award.note}</p>
            ) : null}
          </div>
          <span className="shrink-0 text-xs text-muted">
            {award.period}
          </span>
        </li>
      ))}
    </ul>
  );
}
