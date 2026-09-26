import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { site } from "@/lib/site";

const socialIcons: Record<string, IconType> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
};

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-2xl px-6 pt-20 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className="flex flex-wrap items-center gap-4">
          <li>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="block transition-colors hover:text-foreground"
            >
              <LuMail className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            </a>
          </li>
          {site.socials.map((social) => {
            const Icon = socialIcons[social.label];

            return (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="block transition-colors hover:text-foreground"
                >
                  {Icon ? (
                    <Icon className="h-5 w-5" />
                  ) : (
                    <span>{social.label}</span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
