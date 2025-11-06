import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL, // URL API yang digunakan oleh aplikasi
  },
  basePath: process.env.NEXT_PUBLIC_BASEPATH || '',
  reactCompiler: true,
};

export default nextConfig;
