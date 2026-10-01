"use client";

import { useEffect, useState } from "react";
import { LuCheck, LuMail } from "react-icons/lu";
import { site } from "@/lib/site";

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  }

  const Icon = copied ? LuCheck : LuMail;

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        title={copied ? undefined : `Copy ${site.email}`}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-border transition hover:border-accent hover:text-accent"
      >
        <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
      </button>

      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-full -left-2 z-10 mt-3 flex items-center rounded-full border border-border bg-surface px-3 py-1.5 text-sm whitespace-nowrap text-foreground transition duration-200 ease-out md:left-1/2 md:-translate-x-1/2 ${
          copied ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
        }`}
      >
        <span className="absolute -top-1.5 left-6.75 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-t border-l border-border bg-surface md:left-1/2" />
        Email copied
      </span>

      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </span>
  );
}
