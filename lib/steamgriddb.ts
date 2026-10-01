import { gameIcons } from "@/content/game-icons";

const API_URL = "https://www.steamgriddb.com/api/v2";

type Game = { id: number; name: string };

type Icon = {
  url: string;
  style: string;
  width: number;
  mime: string;
};

function normalize(name: string) {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

async function get<T>(path: string, key: string): Promise<T[]> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { Authorization: `Bearer ${key}` },
  });
  if (!response.ok) return [];

  const { data } = (await response.json()) as { data?: T[] };
  return data ?? [];
}

async function findIcon(name: string, key: string) {
  const games = await get<Game>(
    `/search/autocomplete/${encodeURIComponent(name)}`,
    key,
  );
  const game = games.find(
    (candidate) => normalize(candidate.name) === normalize(name),
  );
  if (!game) return null;

  const icons = await get<Icon>(
    `/icons/game/${game.id}?nsfw=false&humor=false&types=static`,
    key,
  );
  const [best] = icons
    .filter((icon) => icon.mime === "image/png")
    .sort(
      (a, b) =>
        Number(b.style === "official") - Number(a.style === "official") ||
        b.width - a.width,
    );

  return best?.url ?? null;
}

async function resolvePick(pick: string, key: string | undefined) {
  const page = pick.match(
    /^https?:\/\/(?:www\.)?steamgriddb\.com\/(icon|logo|grid|hero)\/(\d+)\/?$/,
  );
  if (!page) return pick;
  if (!key) return null;

  const response = await fetch(`${API_URL}/${page[1]}s/${page[2]}`, {
    headers: { Authorization: `Bearer ${key}` },
  });
  if (!response.ok) return null;

  const { data } = (await response.json()) as { data?: { url: string } };
  return data?.url ?? null;
}

export async function getGameIcons(names: string[]) {
  const key = process.env.STEAMGRIDDB_KEY;
  const icons = new Map<string, string>();

  for (const name of new Set(names)) {
    const pick = gameIcons[name];
    const icon = pick
      ? await resolvePick(pick, key)
      : key
        ? await findIcon(name, key)
        : null;
    if (icon) icons.set(name, icon);
  }

  return icons;
}
