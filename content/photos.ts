import type { StaticImageData } from "next/image";
import frederictonsFinest3 from "@/content/photos/fredericton-s-finest-3.webp";
import sunriseTrials from "@/content/photos/sunrise-trials.webp";
import frederictonsFinest3Thumb from "@/content/photos/thumbs/fredericton-s-finest-3.webp";
import sunriseTrialsThumb from "@/content/photos/thumbs/sunrise-trials.webp";
import tomorrowlan2024Thumb from "@/content/photos/thumbs/tomorrowlan-2024.webp";
import tomorrowlan2025SecondThumb from "@/content/photos/thumbs/tomorrowlan-2025-2.webp";
import tomorrowlan2025Thumb from "@/content/photos/thumbs/tomorrowlan-2025.webp";
import tomorrowlan2026Thumb from "@/content/photos/thumbs/tomorrowlan-2026.webp";
import tomorrowlan2024 from "@/content/photos/tomorrowlan-2024.webp";
import tomorrowlan2025 from "@/content/photos/tomorrowlan-2025.webp";
import tomorrowlan2025Second from "@/content/photos/tomorrowlan-2025-2.webp";
import tomorrowlan2026 from "@/content/photos/tomorrowlan-2026.webp";

export type Photo = {
  image: StaticImageData;
  thumb: StaticImageData;
  event: string;
  label: string;
  credit?: { name: string; url: string };
};

const nerpp = { name: "@_nerpp", url: "https://www.instagram.com/_nerpp/" };

export const photos: Photo[] = [
  {
    image: tomorrowlan2026,
    thumb: tomorrowlan2026Thumb,
    event: "TomorrowLAN 2026",
    label: "TLAN 2026",
  },
  {
    image: sunriseTrials,
    thumb: sunriseTrialsThumb,
    event: "Sunrise Trials",
    label: "Sunrise Trials",
  },
  {
    image: tomorrowlan2025,
    thumb: tomorrowlan2025Thumb,
    event: "TomorrowLAN 2025",
    label: "TLAN 2025",
    credit: nerpp,
  },
  {
    image: tomorrowlan2025Second,
    thumb: tomorrowlan2025SecondThumb,
    event: "TomorrowLAN 2025",
    label: "TLAN 2025",
    credit: nerpp,
  },
  {
    image: tomorrowlan2024,
    thumb: tomorrowlan2024Thumb,
    event: "TomorrowLAN 2024",
    label: "TLAN 2024",
  },
  {
    image: frederictonsFinest3,
    thumb: frederictonsFinest3Thumb,
    event: "Fredericton’s Finest #3",
    label: "FF #3",
  },
];
