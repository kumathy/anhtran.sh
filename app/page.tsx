import { VN } from "country-flag-icons/react/3x2";
import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { LuFileText, LuMapPin } from "react-icons/lu";
import { AwardList } from "@/components/award-list";
import { CopyEmailButton } from "@/components/copy-email-button";
import { Misc } from "@/components/misc";
import { LocalTime } from "@/components/local-time";
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
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
        <span className="inline-flex items-center gap-1.5">
          <LuMapPin className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="sr-only">Based in </span>
          Fredericton, NB
        </span>
        <LocalTime />
      </div>

      <p className="mt-4 text-lg leading-relaxed text-pretty">
        I&rsquo;m a{" "}
        <VN
          title="Vietnamese"
          role="img"
          aria-label="Vietnamese"
          className="inline-block mx-0.5 h-[0.77em] w-[1.155em] rounded-sm align-[-0.035em] supports-[height:1cap]:h-[1.1cap] supports-[height:1cap]:w-[1.65cap] supports-[height:1cap]:align-[-0.05cap] [&>path:nth-of-type(1)]:fill-[#c94a3a] [&>path:nth-of-type(2)]:fill-[#f5d25a]"
        />{" "}
        Computer Science graduate @{" "}
        <a
          href={site.schoolUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-2 underline-offset-6 transition-colors hover:text-accent"
        >
          {site.school}
        </a>
        . I previously worked as a junior SDET and software engineer @{" "}
        <a
          href="https://sonraisecurity.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-2 underline-offset-6 transition-colors hover:text-accent"
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
          className="underline decoration-2 underline-offset-6 transition-colors hover:text-accent"
        >
          fighting games
        </a>{" "}
        and the{" "}
        <span className="group relative inline-block">
          <a
            href="https://www.youtube.com/watch?v=JzS96auqau0"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-2 underline-offset-6 transition-colors hover:text-accent"
          >
            FGC
          </a>
          <span
            role="tooltip"
            className="pointer-events-none absolute top-full -left-2 z-10 mt-3 flex -translate-y-1 md:left-1/2 md:-translate-x-1/2 items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm whitespace-nowrap text-foreground opacity-0 transition duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
          >
            <span
              aria-hidden="true"
              className="absolute -top-1.5 left-6 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-t border-l border-border bg-surface md:left-1/2"
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

      <p className="mt-4 text-lg leading-relaxed text-pretty">Find me here:</p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-border transition hover:border-accent hover:text-accent"
            >
              {Icon ? (
                <Icon className="h-4 w-4" aria-hidden="true" />
              ) : (
                <span className="text-xs">{social.label}</span>
              )}
            </a>
          );
        })}

        <a
          href={site.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border-2 border-border px-4 py-2 text-sm transition hover:border-accent hover:text-accent"
        >
          <LuFileText className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          Resume
        </a>
      </div>

      <Section title="Highlights">
        <AwardList />
      </Section>

      <Section title="Misc">
        <Misc />
      </Section>
    </main>
  );
}
