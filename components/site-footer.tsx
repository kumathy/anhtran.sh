import { site } from "@/lib/site";

const updated = new Date(process.env.LAST_UPDATED ?? Date.now());

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-2xl px-6 pt-20 pb-12">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-t-2 border-border pt-6 text-sm text-muted">
        <p>
          © {updated.getFullYear()} {site.name}
        </p>
        <p>
          Updated{" "}
          <time dateTime={updated.toISOString()}>
            {updated.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              timeZone: "America/Moncton",
            })}
          </time>
        </p>
      </div>
    </footer>
  );
}
