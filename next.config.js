/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
  // Allow loading external images from anywhere in development by disabling Next.js image optimization.
  // This bypasses the remotePatterns/domains whitelist. In production you may want to set specific
  // remotePatterns or domains and remove `unoptimized` for performance.
  unoptimized: true,
  },
}

export default nextConfig