import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Compiler (experimental) — requires babel-plugin-react-compiler
  reactCompiler: true,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
