"use client";

import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";

function applyTheme(theme: string) {
  const root = document.documentElement;
  const pause = document.createElement("style");
  pause.textContent = "*,*::before,*::after{transition:none!important}";
  document.head.append(pause);

  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  void window.getComputedStyle(document.body).color;
  pause.remove();
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  function toggle() {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!document.startViewTransition || reduceMotion) {
      applyTheme(next);
      setTheme(next);
      return;
    }

    document.startViewTransition(() => {
      applyTheme(next);
      setTheme(next);
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
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
