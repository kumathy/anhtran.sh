import type { StaticImageData } from "next/image";
import frederictonsFinest3 from "@/content/photos/fredericton-s-finest-3.webp";
import sunriseTrials from "@/content/photos/sunrise-trials.webp";
import tomorrowlan2024 from "@/content/photos/tomorrowlan-2024.webp";
import tomorrowlan2025 from "@/content/photos/tomorrowlan-2025.webp";
import tomorrowlan2025Second from "@/content/photos/tomorrowlan-2025-2.webp";
import tomorrowlan2026 from "@/content/photos/tomorrowlan-2026.webp";

export type Photo = {
  image: StaticImageData;
  event: string;
  label: string;
  date: string;
  url: string;
};

export const photos: Photo[] = [
  {
    image: tomorrowlan2026,
    event: "TomorrowLAN 2026",
    label: "TLAN 2026",
    date: "Mar 2026",
    url: "https://www.start.gg/tournament/tomorrowlan-2026",
  },
  {
    image: sunriseTrials,
    event: "Sunrise Trials",
    label: "Sunrise Trials",
    date: "Nov 2025",
    url: "https://www.start.gg/tournament/sunrise-trials",
  },
  {
    image: tomorrowlan2025,
    event: "TomorrowLAN 2025",
    label: "TLAN 2025",
    date: "Mar 2025",
    url: "https://www.start.gg/tournament/tomorrowlan-2025",
  },
  {
    image: tomorrowlan2025Second,
    event: "TomorrowLAN 2025",
    label: "TLAN 2025",
    date: "Mar 2025",
    url: "https://www.start.gg/tournament/tomorrowlan-2025",
  },
  {
    image: tomorrowlan2024,
    event: "TomorrowLAN 2024",
    label: "TLAN 2024",
    date: "Mar 2024",
    url: "https://www.start.gg/tournament/tomorrowlan-2024",
  },
  {
    image: frederictonsFinest3,
    event: "Fredericton’s Finest #3",
    label: "FF #3",
    date: "Nov 2023",
    url: "https://www.start.gg/tournament/fredericton-s-finest-3",
  },
];
