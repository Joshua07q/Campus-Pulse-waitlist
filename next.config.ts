import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep config minimal to avoid build worker serialization issues.
  experimental: {
    // Avoid spawning child processes in constrained environments.
    workerThreads: true,
  },
};

export default nextConfig;
