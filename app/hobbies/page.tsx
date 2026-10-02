import Image from "next/image";
import { FaDiscord, FaInstagram } from "react-icons/fa";
import { LuCalendar, LuDoorClosed, LuMapPin } from "react-icons/lu";
import { PageMain } from "@/components/page-main";
import { PhotoGallery } from "@/components/photo-gallery";
import { Section } from "@/components/section";
import { TournamentTimeline } from "@/components/tournament-timeline";
import { photos } from "@/content/photos";
import { getTournaments } from "@/lib/startgg";

const greenDoorInfo = [
  { key: "time", text: "Every Friday, 6 PM", Icon: LuCalendar },
  {
    key: "place",
    text: "Room 116, Marshall d’Avray Hall, UNB",
    Icon: LuMapPin,
  },
  {
    key: "hint",
    text: (
      <>
        Look for a{" "}
        <span className="font-medium text-[#558b4b] dark:text-[#80bd75]">
          green
        </span>{" "}
        door
      </>
    ),
    Icon: LuDoorClosed,
  },
];

const tooltipVisible =
  "group-hover:translate-y-0 group-hover:opacity-100 group-has-[:focus-visible]:translate-y-0 group-has-[:focus-visible]:opacity-100";

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
      <h1 className="border-b-2 border-border pb-10 text-lg font-medium">
        Hobbies
      </h1>

      <p className="mt-8 text-lg leading-relaxed text-pretty">
        I grew up in arcades as a kid, mindlessly button mashing my way through
        whatever fighting games were around. In uni, I found my way back to the
        genre, and have loved it ever since: the games, the culture and the
        amazing community around it that&rsquo;s given me some of my closest
        friends.
      </p>

      <p className="mt-4 text-lg leading-relaxed text-pretty">
        These days, you&rsquo;ll find me at Green Door Smash, our local weekly.
        If you&rsquo;re in Fredericton and ever feel like trying out fighting
        games, come say hi!
      </p>

      <div className="mt-6">
        {latestLocal ? (
          <span className="group relative inline-block">
            <a
              href={`${latestLocal.url}/details`}
              target="_blank"
              rel="noopener noreferrer"
              aria-describedby="green-door-info"
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
              <span className="relative underline decoration-2 underline-offset-6">
                Green Door Smash
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-full ${latestLocal.logo ? "-left-8" : "left-5"} z-20 mt-2.75 h-2.5 w-2.5 -translate-x-1/2 md:left-1/2 -translate-y-1 rotate-45 border-t border-l border-border bg-surface opacity-0 transition duration-200 ease-out ${tooltipVisible}`}
                />
                <span
                  id="green-door-info"
                  role="tooltip"
                  className={`pointer-events-none absolute top-full ${latestLocal.logo ? "-left-15" : "-left-2"} z-10 mt-4 flex -translate-y-1 flex-col gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-sm whitespace-nowrap text-foreground no-underline opacity-0 transition duration-200 ease-out md:left-1/2 md:-translate-x-1/2 ${tooltipVisible}`}
                >
                  {greenDoorInfo.map(({ key, text, Icon }) => (
                    <span key={key} className="flex items-center gap-2">
                      <Icon
                        className="h-3.5 w-3.5 shrink-0 text-muted"
                        aria-hidden="true"
                      />
                      <span>{text}</span>
                    </span>
                  ))}
                </span>
              </span>
            </a>
          </span>
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

      <div className="mt-12">
        <PhotoGallery photos={photos} />
      </div>

      <Section title="Tournament history">
        <TournamentTimeline tournaments={tournaments} />
      </Section>
    </PageMain>
  );
}
