"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = [
  { href: "/", label: "home" },
  { href: "/experience", label: "experience" },
  { href: "/projects", label: "projects" },
  { href: "/hobbies", label: "hobbies" },
];

export function SiteHeader() {
  const pathname = usePathname().replace(/(.)\/$/, "$1");

  return (
    <header className="mx-auto w-full max-w-2xl px-6 pt-12 pb-10">
      <div className="flex items-start justify-between gap-6 border-b-2 border-border pb-6">
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
        {nav.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`relative transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:bg-current after:opacity-0 after:transition-opacity after:duration-200 ${
                active
                  ? "text-foreground after:opacity-100"
                  : "hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
