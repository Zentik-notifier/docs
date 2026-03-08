import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    turbo: { root: process.cwd() },
  },
};

export default withMDX(config);
