// The v1 site is served at ekram.tech/archive/v1 (the current site proxies that path to this project).
const BASE_PATH = "/archive/v1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: BASE_PATH,
  // Plain strings (public assets, fetch URLs) are not prefixed by Next, so components read the base from here.
  env: { NEXT_PUBLIC_BASE_PATH: BASE_PATH },
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // An archive shouldn't compete with the current site in search results.
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
