/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // @the-manual/core (packages/core/) is an npm-workspace package, not
  // published — Next must be told to compile its TS source itself rather
  // than expecting pre-built JS in node_modules, the same as any other
  // workspace-linked source package. Shared by both forks of the monorepo
  // (this one, mobile/); see packages/core/README.md and MASTERFILE.md §3.6.5.
  transpilePackages: ['@the-manual/core'],
}

export default nextConfig
