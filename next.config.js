/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['unsplash.com', 'images.unsplash.com', 'plus.unsplash.com', 'source.unsplash.com', 'www.google.com', 'cdn.sanity.io'],

    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
      { protocol: 'https', hostname: 'www.google.com'},
      { protocol: 'https', hostname: 'cdn.sanity.io'}
    ],
  },
}

export default nextConfig