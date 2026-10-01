import type { StaticImageData } from "next/image";
import fitquestImage from "@/public/images/projects/fitquest.webp";
import modsquadImage from "@/public/images/projects/modsquad.webp";
import quizzicalImage from "@/public/images/projects/quizzical.webp";
import thorpeWatchImage from "@/public/images/projects/thorpe-watch.webp";

export type Project = {
  slug: string;
  title: string;
  year: string;
  blurb: string;
  description?: string;
  image?: StaticImageData;
  stack: string[];
  href?: string;
  source?: string;
  devpost?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "thorpe-watch",
    title: "Thorpe Watch",
    year: "2026",
    blurb: "Real-time monitoring for Fredericton's most-hit overpass.",
    description:
      "Trucks keep getting stuck under the overpass of the Bill Thorpe Walking Bridge on Waterloo Row, and it's become kind of a local meme. Thorpe Watch keeps a public record of past hits, catches new incidents live with a proof-of-concept vibration sensor that can be attached to the bridge, and alerts subscribers in real time.",
    image: thorpeWatchImage,
    stack: ["Next.js", "TypeScript", "Python", "Flask", "Supabase", "Arduino"],
    href: "https://kumathy.github.io/thorpe-watch/",
    source: "https://github.com/kumathy/thorpe-watch",
    devpost: "https://devpost.com/software/thorpe-watch",
    featured: true,
  },
  {
    slug: "modsquad",
    title: "Modsquad",
    year: "2026",
    blurb: "Automated moderation tool for content creation.",
    image: modsquadImage,
    stack: ["React", "Electron", "FastAPI", "WhisperX"],
    source: "https://github.com/kumathy/Modsquad",
    featured: true,
  },
  {
    slug: "quizzical",
    title: "Quizzical",
    year: "2025",
    blurb:
      "Trivia quiz app that pulls questions from the Open Trivia Database API.",
    image: quizzicalImage,
    stack: ["React", "JavaScript"],
    href: "https://kumathy.github.io/react-projects/quizzical/",
    source: "https://github.com/kumathy/react-projects",
    featured: true,
  },
  {
    slug: "fitquest",
    title: "FitQuest",
    year: "2023",
    blurb: "Gamified Android fitness app.",
    description:
      "A fusion of fitness tracking and game mechanics, FitQuest gamifies your fitness journey to keep you motivated and engaged.",
    image: fitquestImage,
    stack: ["Kotlin", "Firebase", "Android SDK"],
    source: "https://github.com/kumathy/FitQuest",
  },
];
