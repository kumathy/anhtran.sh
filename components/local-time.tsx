"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { LuClock } from "react-icons/lu";

const TIME_ZONE = "America/Moncton";

function subscribeNever() {
  return () => {};
}

function formatTime(date: Date, precise: boolean) {
  return date.toLocaleTimeString("en-US", {
    timeZone: TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: precise ? 3 : undefined,
  });
}

function zoneOffsetMinutes(date: Date) {
  const name =
    new Intl.DateTimeFormat("en-US", {
      timeZone: TIME_ZONE,
      timeZoneName: "longOffset",
    })
      .formatToParts(date)
      .find((part) => part.type === "timeZoneName")?.value ?? "GMT";

  const match = name.match(/GMT([+-])(\d{2}):(\d{2})/);
  if (!match) return 0;

  const minutes = Number(match[2]) * 60 + Number(match[3]);
  return match[1] === "-" ? -minutes : minutes;
}

function describeDifference(date: Date) {
  const difference = zoneOffsetMinutes(date) + date.getTimezoneOffset();
  if (difference === 0) return "Same time as you!";

  const minutes = Math.abs(difference);
  const hours = minutes / 60;
  const amount =
    minutes < 60
      ? `${minutes} minutes`
      : `${Number.isInteger(hours) ? hours : hours.toFixed(1)} ${hours === 1 ? "hour" : "hours"}`;

  return `${amount} ${difference > 0 ? "ahead of" : "behind"} you`;
}

export function LocalTime() {
  const mounted = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
  const [open, setOpen] = useState(false);
  const tooltipId = useId();
  const timeRef = useRef<HTMLTimeElement>(null);
  const differenceRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!mounted) return;

    const precise = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    let frame = 0;
    let timeout = 0;
    let lastMinute = -1;

    function tick() {
      const now = new Date();
      if (timeRef.current) {
        timeRef.current.textContent = formatTime(now, precise);
        timeRef.current.dateTime = now.toISOString();
      }

      const minute = Math.floor(now.getTime() / 60_000);
      if (minute !== lastMinute && differenceRef.current) {
        differenceRef.current.textContent = describeDifference(now);
        lastMinute = minute;
      }

      if (precise) {
        frame = requestAnimationFrame(tick);
      } else {
        timeout = window.setTimeout(tick, 1000 - now.getMilliseconds());
      }
    }

    tick();
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <span className="inline-flex items-center gap-1.5">
      <LuClock className="h-3.5 w-3.5" aria-hidden="true" />
      <span className="sr-only">Local time </span>
      <span className="group relative inline-block">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          onBlur={() => setOpen(false)}
          aria-describedby={tooltipId}
          className="cursor-pointer tabular-nums underline decoration-dotted decoration-2 underline-offset-6 transition-colors hover:text-foreground"
        >
          <time ref={timeRef} />
        </button>
        <span
          id={tooltipId}
          role="tooltip"
          className={`pointer-events-none absolute top-full -left-2 z-10 mt-3 flex items-center rounded-full border border-border bg-surface px-3 py-1.5 text-sm whitespace-nowrap text-foreground transition duration-200 ease-out md:left-1/2 md:-translate-x-1/2 ${
            open
              ? "translate-y-0 opacity-100"
              : "-translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-has-[:focus-visible]:translate-y-0 group-has-[:focus-visible]:opacity-100"
          }`}
        >
          <span className="absolute -top-1.5 left-14 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-t border-l border-border bg-surface md:left-1/2" />
          <span ref={differenceRef} />
        </span>
      </span>
    </span>
  );
}
