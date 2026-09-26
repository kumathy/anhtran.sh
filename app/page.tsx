import { AwardList } from "@/components/award-list";
import { RainbowText } from "@/components/rainbow-text";
import { Section } from "@/components/section";
import { site } from "@/lib/site";

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

      <Section title="Awards &amp; certifications">
        <AwardList />
      </Section>
    </main>
  );
}
