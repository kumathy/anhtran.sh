"use client";

import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Switch color theme"
      className="inline-flex shrink-0 items-center text-muted transition-colors hover:text-foreground"
    >
      <LuMoon
        className="h-5 w-5 dark:hidden"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <LuSun
        className="hidden h-5 w-5 dark:block"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </button>
  );
}
