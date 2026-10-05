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
  awards?: string[];
  stack: string[];
  href?: string;
  source?: string;
  devpost?: string;
  pitch?: string;
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
    awards: ["Finalist @ Hack Atlantic 2026"],
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
    description:
      "A desktop app that finds unwanted words in your videos and bleeps them out before you upload.",
    image: modsquadImage,
    awards: [
      "1st @ UNB Research Expo Pitch Competition",
      "Impact Award @ RBC Student Pitch Competition",
    ],
    stack: ["React", "Electron", "FastAPI", "WhisperX"],
    source: "https://github.com/kumathy/Modsquad",
    pitch: "https://www.youtube.com/watch?v=dwXhHY42PLk&t=6793s",
    featured: true,
  },
  {
    slug: "quizzical",
    title: "Quizzical",
    year: "2025",
    blurb:
      "Trivia quiz app that pulls questions from the Open Trivia Database API.",
    description:
      "A trivia game where you pick a category and difficulty, with questions from the Open Trivia Database.",
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
