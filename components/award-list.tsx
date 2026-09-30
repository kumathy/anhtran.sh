import { awards } from "@/content/awards";

export function AwardList() {
  return (
    <ul className="space-y-6">
      {awards.map((award) => (
        <li
          key={award.title}
          className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
        >
          <div>
            <span>
              {award.href ? (
                <a
                  href={award.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 transition-colors hover:text-accent"
                >
                  {award.title}
                </a>
              ) : (
                award.title
              )}
            </span>
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
