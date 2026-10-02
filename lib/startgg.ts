import { smallImage } from "@/lib/images";
import { getGameIcons } from "@/lib/steamgriddb";

const API_URL = "https://api.start.gg/gql/alpha";
const LOGO_SIZE = 80;
const ICON_SIZE = 48;
const GAME_NAMES: Record<string, string> = {
  "TEKKEN 7": "Tekken 7",
  "TEKKEN 8": "Tekken 8",
};
const USER_SLUG = "user/f710cc98";
const LOCAL_NAME = "Green Door Smash";
const LOCAL_ORGANIZER_SLUG = "user/4232f2eb";
const USER_ID = "1913384";

const QUERY = `
  query History($slug: String!, $userId: ID!, $page: Int!) {
    user(slug: $slug) {
      events(query: { page: $page, perPage: 40 }) {
        pageInfo {
          totalPages
        }
        nodes {
          startAt
          numEntrants
          isOnline
          videogame {
            name
            images {
              type
              url
            }
          }
          tournament {
            name
            slug
            images {
              type
              url
            }
            city
            addrState
            isOnline
            startAt
          }
          userEntrant(userId: $userId) {
            standing {
              placement
            }
          }
        }
      }
    }
  }
`;

type ApiEvent = {
  startAt: number | null;
  numEntrants: number | null;
  isOnline: boolean | null;
  videogame: { name: string; images: { type: string; url: string }[] | null };
  tournament: {
    name: string;
    slug: string;
    images: { type: string; url: string }[] | null;
    city: string | null;
    addrState: string | null;
    isOnline: boolean | null;
    startAt: number;
  };
  userEntrant: { standing: { placement: number | null } | null } | null;
};

export type Bracket = {
  game: string;
  image: string | null;
  placement: number | null;
  entrants: number;
};

export type Tournament = {
  name: string;
  url: string;
  logo: string | null;
  startAt: number;
  location: string;
  brackets: Bracket[];
};

async function request(
  query: string,
  variables: Record<string, unknown>,
  token: string,
) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!response.ok) {
    throw new Error(`start.gg request failed with ${response.status}`);
  }

  const { data, errors } = await response.json();
  if (errors?.length) {
    throw new Error(`start.gg returned an error: ${errors[0].message}`);
  }
  return data;
}

async function fetchEvents(token: string) {
  const events: ApiEvent[] = [];

  for (let page = 1; ; page++) {
    const data = await request(
      QUERY,
      { slug: USER_SLUG, userId: USER_ID, page },
      token,
    );

    const { nodes, pageInfo } = data.user.events;
    events.push(...nodes);
    if (page >= pageInfo.totalPages) return events;
  }
}

export async function getTournaments(): Promise<Tournament[]> {
  const token = process.env.STARTGG_TOKEN;
  if (!token) throw new Error("STARTGG_TOKEN is not set");

  const events = await fetchEvents(token);
  const bySlug = new Map<string, Tournament>();

  for (const event of events) {
    const { tournament } = event;
    const startAt = event.startAt ?? tournament.startAt;
    const online = event.isOnline || tournament.isOnline;

    const entry = bySlug.get(tournament.slug) ?? {
      name: tournament.name,
      url: `https://www.start.gg/${tournament.slug}`,
      logo:
        tournament.images?.find((image) => image.type === "profile")?.url ??
        null,
      startAt,
      location: online
        ? "Online"
        : [tournament.city, tournament.addrState].filter(Boolean).join(", "),
      brackets: [],
    };

    entry.startAt = Math.min(entry.startAt, startAt);
    const images = event.videogame.images ?? [];
    const image =
      images.find((candidate) => candidate.type === "primary-quality") ??
      images[0];

    entry.brackets.push({
      game: GAME_NAMES[event.videogame.name] ?? event.videogame.name,
      image: image?.url ?? null,
      placement: event.userEntrant?.standing?.placement ?? null,
      entrants: event.numEntrants ?? 0,
    });
    bySlug.set(tournament.slug, entry);
  }

  const tournaments = [...bySlug.values()];
  const icons = await getGameIcons(
    tournaments.flatMap((t) => t.brackets.map((bracket) => bracket.game)),
  );
  for (const bracket of tournaments.flatMap((t) => t.brackets)) {
    bracket.image = icons.get(bracket.game) ?? bracket.image;
  }

  const logos = await shrinkAll(
    tournaments.map((t) => t.logo),
    LOGO_SIZE,
    "cover",
  );
  const gameImages = await shrinkAll(
    tournaments.flatMap((t) => t.brackets.map((bracket) => bracket.image)),
    ICON_SIZE,
    "contain",
  );
  for (const tournament of tournaments) {
    if (tournament.logo) tournament.logo = logos.get(tournament.logo) ?? null;
    for (const bracket of tournament.brackets) {
      if (bracket.image) bracket.image = gameImages.get(bracket.image) ?? null;
    }
  }

  return tournaments.sort((a, b) => b.startAt - a.startAt);
}

const LOCAL_QUERY = `
  query Local($slug: String!) {
    user(slug: $slug) {
      upcoming: tournaments(
        query: { page: 1, perPage: 10, filter: { upcoming: true } }
      ) {
        nodes {
          ...LocalTournament
        }
      }
      past: tournaments(query: { page: 1, perPage: 10, filter: { past: true } }) {
        nodes {
          ...LocalTournament
        }
      }
    }
  }

  fragment LocalTournament on Tournament {
    name
    slug
    startAt
    images {
      type
      url
    }
  }
`;

type LocalTournament = {
  name: string;
  slug: string;
  startAt: number;
  images: { type: string; url: string }[] | null;
};

export async function getLatestLocal() {
  const token = process.env.STARTGG_TOKEN;
  if (!token) throw new Error("STARTGG_TOKEN is not set");

  const data = await request(LOCAL_QUERY, { slug: LOCAL_ORGANIZER_SLUG }, token);
  const isLocal = (t: LocalTournament) => t.name.includes(LOCAL_NAME);

  const upcoming: LocalTournament[] = data.user.upcoming.nodes.filter(isLocal);
  const past: LocalTournament[] = data.user.past.nodes.filter(isLocal);

  const next =
    upcoming.sort((a, b) => a.startAt - b.startAt)[0] ??
    past.sort((a, b) => b.startAt - a.startAt)[0];
  if (!next) return null;

  const logo = next.images?.find((image) => image.type === "profile")?.url;

  return {
    url: `https://www.start.gg/${next.slug}`,
    logo: logo ? await smallImage(logo, LOGO_SIZE, "cover") : null,
  };
}

async function shrinkAll(
  urls: (string | null)[],
  size: number,
  fit: "cover" | "contain",
) {
  const unique = [...new Set(urls.filter((url): url is string => !!url))];
  const results = new Map<string, string>();

  for (let i = 0; i < unique.length; i += 8) {
    const batch = unique.slice(i, i + 8);
    const small = await Promise.all(
      batch.map((url) => smallImage(url, size, fit)),
    );
    batch.forEach((url, index) => results.set(url, small[index]));
  }

  return results;
}
