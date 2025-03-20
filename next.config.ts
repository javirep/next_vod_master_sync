import type { NextConfig } from "next";
const path = require('path');

const nextConfig: NextConfig = {
    output: "export",
    images: {
      unoptimized: true, // Required if using Next.js Image component
    },
    basePath: "/next_vod_master_sync", // Required for GitHub Pages
    sassOptions: {
        quietDeps: true, // Suppresses deprecation warnings
        includePaths: [path.join(__dirname, 'styles')], // Optional: Set Sass include paths
      },
};

export default nextConfig;
