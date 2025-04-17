import type { NextConfig } from "next";
const path = require('path');

const nextConfig: NextConfig = {
    sassOptions: {
        quietDeps: true, // Suppresses deprecation warnings
        includePaths: [path.join(__dirname, 'styles')], // Optional: Set Sass include paths
      },
};

export default nextConfig;
