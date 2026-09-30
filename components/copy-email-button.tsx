"use client";

import { useEffect, useState } from "react";
import { LuCheck, LuMail } from "react-icons/lu";
import { TooltipArrow } from "@/components/tooltip-arrow";
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
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-border transition hover:border-accent hover:text-accent active:scale-95"
      >
        <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
      </button>

      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-full left-0 z-10 mt-2 rounded-full border-2 border-border bg-background px-3 py-1.5 text-sm whitespace-nowrap text-muted transition duration-200 ease-out ${
          copied ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
        }`}
      >
        <TooltipArrow className="left-4.5" />
        Email copied
      </span>

      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </span>
  );
}
