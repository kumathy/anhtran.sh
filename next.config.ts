import { execSync } from "node:child_process";
import type { NextConfig } from "next";

const basePath = process.env.PAGES_BASE_PATH ?? "";

function lastCommitDate() {
  try {
    return execSync("git log -1 --format=%cI").toString().trim();
  } catch {
    return new Date().toISOString();
  }
}

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    BASE_PATH: basePath,
    LAST_UPDATED: lastCommitDate(),
  },
};

export default nextConfig;
