import { LuBookText } from "react-icons/lu";
import { NowPlaying, type Track } from "@/components/now-playing";
import { book, songs } from "@/content/now";

type ItunesTrack = {
  trackId: number;
  artworkUrl100: string;
  previewUrl: string;
  trackViewUrl: string;
};

async function getTracks(): Promise<Track[]> {
  const ids = songs.map((song) => song.id).join(",");
  const response = await fetch(
    `https://itunes.apple.com/lookup?id=${ids}&country=CA`,
  );
  if (!response.ok) {
    throw new Error(`iTunes lookup failed with ${response.status}`);
  }

  const { results } = (await response.json()) as { results: ItunesTrack[] };
  const byId = new Map(results.map((result) => [result.trackId, result]));

  return songs.flatMap((song) => {
    const result = byId.get(song.id);
    if (!result?.previewUrl) return [];

    return {
      title: song.title,
      artist: song.artist,
      cover: result.artworkUrl100.replace("100x100bb", "200x200bb"),
      preview: result.previewUrl,
      href: result.trackViewUrl,
    };
  });
}

export async function Misc() {
  const tracks = await getTracks();

  return (
    <div>
      <NowPlaying tracks={tracks} />

      <p className="mt-6">
        <span className="mr-4">
          <LuBookText
            className="mr-2 inline h-4 w-4 align-[-0.125em]"
            aria-hidden="true"
          />
          Reading:
        </span>
        <cite className="italic">{book.title}</cite>{" "}
        <span className="text-muted">- {book.authors}</span>
      </p>
    </div>
  );
}
