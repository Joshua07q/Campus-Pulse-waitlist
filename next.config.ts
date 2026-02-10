import type { NextConfig } from "next";
import { dirname } from "path";
import { fileURLToPath } from "url";

const root = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Prevent Next from walking up directories to find lockfiles in parent folders.
  // This avoids workspace-root confusion and makes Vercel builds more deterministic.
  outputFileTracingRoot: root,
};

export default nextConfig;
