/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'upload.wikimedia.org',
      'dummy.xtemos.com',
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during production builds
  },
}

export default nextConfig
