import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { LuFileText } from "react-icons/lu";
import { AwardList } from "@/components/award-list";
import { CopyEmailButton } from "@/components/copy-email-button";
import { RainbowText } from "@/components/rainbow-text";
import { Section } from "@/components/section";
import { site } from "@/lib/site";

const socialIcons: Record<string, IconType> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
};

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6">
      <h1 className="text-3xl font-medium tracking-tight">
        Hi, I&rsquo;m {site.name}!{" "}
      </h1>

      <p className="mt-4 text-lg leading-relaxed text-pretty">
        I&rsquo;m a Computer Science graduate @{" "}
        <a
          href={site.schoolUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 transition-colors hover:text-accent"
        >
          {site.school}
        </a>
        . I previously worked as a junior SDET and software engineer at{" "}
        <a
          href="https://sonraisecurity.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 transition-colors hover:text-accent"
        >
          Sonrai Security
        </a>
        , building test automation and production alerting.
      </p>

      <p className="mt-4 text-lg leading-relaxed text-pretty">
        Outside of work, I have a great passion for{" "}
        <a
          href="https://en.wikipedia.org/wiki/Fighting_game"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 transition-colors hover:text-accent"
        >
          fighting games
        </a>{" "}
        and the{" "}
        <span className="group relative inline-block">
          <a
            href="https://www.youtube.com/watch?v=JzS96auqau0"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-accent"
          >
            FGC
          </a>
          <span
            role="tooltip"
            className="pointer-events-none absolute top-full left-1/2 z-10 mt-2 flex -translate-x-1/2 -translate-y-1 items-center gap-1.5 rounded border border-border bg-background px-2.5 py-1.5 text-sm whitespace-nowrap text-muted opacity-0 transition duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
          >
            <span
              aria-hidden="true"
              className="absolute -top-1.25 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-t border-l border-border bg-background"
            />
            <span aria-hidden="true">🕹️</span>
            Fighting Game Community
          </span>
        </span>
        . I also like to climb <RainbowText>colored</RainbowText> rocks and lift
        weights!
      </p>

      <p className="mt-4 text-lg leading-relaxed text-pretty">
        I am currently open to any full-time software engineer/SDET roles.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={site.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border-2 border-border px-4 py-2 text-sm transition hover:border-accent hover:text-accent active:scale-95"
        >
          <LuFileText className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          Resume
        </a>

        <CopyEmailButton />

        {site.socials.map((social) => {
          const Icon = socialIcons[social.label];

          return (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              title={social.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-border transition hover:border-accent hover:text-accent active:scale-95"
            >
              {Icon ? (
                <Icon className="h-4 w-4" aria-hidden="true" />
              ) : (
                <span className="text-xs">{social.label}</span>
              )}
            </a>
          );
        })}
      </div>

      <Section title="Awards &amp; certifications">
        <AwardList />
      </Section>
    </main>
  );
}
