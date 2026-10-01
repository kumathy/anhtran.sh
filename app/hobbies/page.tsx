import Image from "next/image";
import { FaDiscord, FaInstagram } from "react-icons/fa";
import { PageMain } from "@/components/page-main";
import { Section } from "@/components/section";
import { TournamentTimeline } from "@/components/tournament-timeline";
import { getTournaments } from "@/lib/startgg";

const links = [
  { label: "Discord", href: "https://discord.gg/bg5xHTrRN", Icon: FaDiscord },
  {
    label: "Instagram",
    href: "https://www.instagram.com/greendoorsmash/",
    Icon: FaInstagram,
  },
];

export default async function HobbiesPage() {
  const tournaments = await getTournaments();

  const latestLocal = tournaments.find((tournament) =>
    tournament.name.includes("Green Door Smash"),
  );

  return (
    <PageMain>
      <h1 className="border-b-2 border-border pb-10 text-lg font-medium">Hobbies</h1>

      <p className="mt-8 text-lg leading-relaxed text-pretty">
        I started playing fighting games in the arcade days with{" "}
        <a
          href="https://en.wikipedia.org/wiki/Tekken_6"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-2 underline-offset-6 transition-colors hover:text-accent"
        >
          Tekken 6
        </a>
        , and I&rsquo;ve loved the genre, the culture and the community ever
        since.
      </p>

      <p className="mt-4 text-lg leading-relaxed text-pretty">
        These days you&rsquo;ll find me at Green Door Smash, our local weekly.
        If you&rsquo;re in Fredericton and ever feel like trying out fighting
        games, come say hi!
      </p>

      <div className="mt-6">
        {latestLocal ? (
          <a
            href={`${latestLocal.url}/details`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 transition-colors hover:text-accent"
          >
            {latestLocal.logo ? (
              <Image
                src={latestLocal.logo}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-md object-cover"
              />
            ) : null}
            <span className="underline decoration-2 underline-offset-6">
              Green Door Smash
            </span>
          </a>
        ) : (
          <p>Green Door Smash</p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {links.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-border px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </a>
        ))}
      </div>

      <Section title="Tournament history">
        <TournamentTimeline tournaments={tournaments} />
      </Section>
    </PageMain>
  );
}
