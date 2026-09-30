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
    <button
      type="button"
      onClick={copy}
      aria-label="Copy email address"
      title={copied ? "Copied" : `Copy ${site.email}`}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-border transition hover:border-accent hover:text-accent active:scale-95"
    >
      <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </button>
  );
}
