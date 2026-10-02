"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import {
  LuCheck,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuListFilter,
} from "react-icons/lu";
import type { Bracket, Tournament } from "@/lib/startgg";

const TIME_ZONE = "America/Moncton";
const MEDALS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };
const LOCAL = "Green Door Smash";
const PAGE_SIZE = 5;
const DEFAULT_YEAR: string | null = "2025";

function yearOf(seconds: number) {
  return new Date(seconds * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    timeZone: TIME_ZONE,
  });
}

function dayOf(seconds: number) {
  return new Date(seconds * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: TIME_ZONE,
  });
}

function ordinal(n: number) {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (suffixes[(v - 20) % 10] ?? suffixes[v] ?? suffixes[0]);
}

function result(bracket: Bracket) {
  if (!bracket.placement) return "Entered";
  const medal = MEDALS[bracket.placement];
  const place = `${ordinal(bracket.placement)} of ${bracket.entrants}`;
  return medal ? `${place} ${medal}` : place;
}

function pageItems(page: number, count: number) {
  const pages = [0, page - 1, page, page + 1, count - 1]
    .filter((value) => value >= 0 && value < count)
    .filter((value, index, all) => all.indexOf(value) === index)
    .sort((a, b) => a - b);

  const items: (number | "gap")[] = [];
  for (const value of pages) {
    const previous = items.at(-1);
    if (typeof previous === "number" && value - previous > 1) {
      items.push(value - previous === 2 ? previous + 1 : "gap");
    }
    items.push(value);
  }
  return items;
}

type Hidden = { locals: boolean; online: boolean };

const HIDE_OPTIONS: { key: keyof Hidden; label: string }[] = [
  { key: "locals", label: "Hide locals" },
  { key: "online", label: "Hide online" },
];

function Menu({
  trigger,
  highlighted = false,
  children,
}: {
  trigger: React.ReactNode;
  highlighted?: boolean;
  children: (close: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border-2 px-3 py-1 text-sm transition-colors hover:border-accent hover:text-accent ${
          highlighted ? "border-accent text-accent" : "border-border"
        }`}
      >
        {trigger}
      </button>

      {open ? (
        <div
          id={panelId}
          className="absolute top-full left-0 z-10 mt-2 w-max min-w-full rounded-xl border-2 border-border bg-surface p-3 text-sm"
        >
          {children(() => setOpen(false))}
        </div>
      ) : null}
    </div>
  );
}

function YearMenu({
  years,
  year,
  onChange,
}: {
  years: string[];
  year: string;
  onChange: (year: string) => void;
}) {
  return (
    <Menu
      trigger={
        <>
          {year}
          <LuChevronDown className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
        </>
      }
    >
      {(close) => (
        <ul className="space-y-1">
          {years.map((option) => (
            <li key={option}>
              <button
                type="button"
                onClick={() => {
                  onChange(option);
                  close();
                }}
                aria-current={option === year ? "true" : undefined}
                className={`w-full cursor-pointer rounded-md px-2 py-1 text-center transition-colors hover:bg-foreground/5 hover:text-accent ${
                  option === year ? "bg-foreground/5 text-accent" : ""
                }`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </Menu>
  );
}

function FilterMenu({
  hidden,
  onChange,
}: {
  hidden: Hidden;
  onChange: (hidden: Hidden) => void;
}) {
  const active = Object.values(hidden).filter(Boolean).length;

  return (
    <Menu
      highlighted={active > 0}
      trigger={
        <>
          <LuListFilter className="h-3.5 w-3.5" aria-hidden="true" />
          Filter
          {active ? <span>({active})</span> : null}
        </>
      }
    >
      {() => (
        <>
          <div className="space-y-2">
            {HIDE_OPTIONS.map((option) => (
              <label
                key={option.key}
                className="flex cursor-pointer items-center gap-2"
              >
                <span className="relative inline-flex h-4 w-4 shrink-0">
                  <input
                    type="checkbox"
                    checked={hidden[option.key]}
                    onChange={(event) =>
                      onChange({
                        ...hidden,
                        [option.key]: event.target.checked,
                      })
                    }
                    className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-border bg-background transition-colors checked:border-accent checked:bg-accent hover:border-accent"
                  />
                  <LuCheck
                    aria-hidden="true"
                    strokeWidth={3}
                    className="pointer-events-none absolute inset-0.5 hidden h-3 w-3 text-background peer-checked:block"
                  />
                </span>
                {option.label}
              </label>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onChange({ locals: false, online: false })}
            disabled={!active}
            className="mt-3 w-full cursor-pointer border-t-2 border-border pt-3 text-center text-muted transition-colors hover:text-accent disabled:cursor-default disabled:opacity-50 disabled:hover:text-muted"
          >
            Show all
          </button>
        </>
      )}
    </Menu>
  );
}

export function TournamentTimeline({
  tournaments,
}: {
  tournaments: Tournament[];
}) {
  const years = [...new Set(tournaments.map((t) => yearOf(t.startAt)))];
  const brackets = tournaments.reduce((sum, t) => sum + t.brackets.length, 0);
  const [year, setYear] = useState(
    DEFAULT_YEAR && years.includes(DEFAULT_YEAR) ? DEFAULT_YEAR : years[0],
  );
  const [hidden, setHidden] = useState<Hidden>({
    locals: true,
    online: true,
  });

  const shown = tournaments.filter(
    (t) =>
      yearOf(t.startAt) === year &&
      !(hidden.locals && t.name.includes(LOCAL)) &&
      !(hidden.online && t.location === "Online"),
  );

  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(shown.length / PAGE_SIZE);
  const visible = shown.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <YearMenu
          years={years}
          year={year}
          onChange={(value) => {
            setYear(value);
            setPage(0);
          }}
        />
        <FilterMenu
          hidden={hidden}
          onChange={(value) => {
            setHidden(value);
            setPage(0);
          }}
        />
        <p className="w-full text-sm text-muted sm:ml-auto sm:w-auto">
          {brackets} brackets at {tournaments.length} tournaments
        </p>
      </div>

      {shown.length ? (
        <ol className="mt-8 ml-1 space-y-6 border-l-2 border-border pl-6">
          {visible.map((tournament) => {
            return (
              <li
                key={tournament.url}
                className="relative before:absolute before:top-1 before:-left-7.5 before:h-2.5 before:w-2.5 before:rounded-full before:bg-border"
              >
                <time
                  dateTime={new Date(tournament.startAt * 1000).toISOString()}
                  className="block text-xs text-muted"
                >
                  {dayOf(tournament.startAt)}
                </time>
                <div className="mt-1 flex items-center gap-3">
                  {tournament.logo ? (
                    <Image
                      src={tournament.logo}
                      alt=""
                      width={40}
                      height={40}
                      className="h-10 w-10 shrink-0 rounded-md object-cover"
                    />
                  ) : null}
                  <div className="min-w-0">
                    <a
                      href={tournament.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-2 underline-offset-6 transition-colors hover:text-accent"
                    >
                      {tournament.name}
                    </a>
                    {tournament.location ? (
                      <p className="mt-1 text-sm text-muted">
                        {tournament.location}
                      </p>
                    ) : null}
                  </div>
                </div>
                <ul className="mt-2 space-y-2 text-sm">
                  {tournament.brackets.map((bracket) => (
                    <li key={bracket.game} className="flex items-center gap-2">
                      {bracket.image ? (
                        <Image
                          src={bracket.image}
                          alt=""
                          width={24}
                          height={24}
                          className="h-6 w-6 shrink-0 rounded-sm object-contain"
                        />
                      ) : null}
                      <span>
                        {bracket.game}:{" "}
                        <span className="text-muted">{result(bracket)}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      ) : (
        <p className="mt-8 text-muted">No tournaments to show for {year}.</p>
      )}

      {pageCount > 1 ? (
        <nav aria-label="Tournament pages" className="mt-8 flex items-center justify-end gap-2 text-sm">
          <button
            type="button"
            onClick={() => setPage((value) => value - 1)}
            disabled={page === 0}
            aria-label="Previous page"
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-border text-muted transition-colors hover:border-accent hover:text-accent disabled:cursor-default disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted"
          >
            <LuChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <ol className="flex items-center gap-1">
            {pageItems(page, pageCount).map((item, index) =>
              item === "gap" ? (
                <li key={`gap-${index}`} className="px-1 text-muted">
                  …
                </li>
              ) : (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => setPage(item)}
                    aria-label={`Page ${item + 1}`}
                    aria-current={item === page ? "page" : undefined}
                    className={`inline-flex h-8 min-w-8 cursor-pointer items-center justify-center px-2 transition-colors hover:text-accent ${
                      item === page ? "text-accent" : "text-muted"
                    }`}
                  >
                    {item + 1}
                  </button>
                </li>
              ),
            )}
          </ol>
          <button
            type="button"
            onClick={() => setPage((value) => value + 1)}
            disabled={page === pageCount - 1}
            aria-label="Next page"
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-border text-muted transition-colors hover:border-accent hover:text-accent disabled:cursor-default disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted"
          >
            <LuChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </nav>
      ) : null}
    </div>
  );
}
