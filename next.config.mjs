/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/bjj',
  assetPrefix: '/bjj/',
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
