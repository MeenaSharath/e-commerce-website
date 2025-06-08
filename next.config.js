/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['res.cloudinary.com'], // ✅ Add allowed image domain here
  },
  // ✅ Add middleware matcher to specify which routes it should apply to
  matcher: ['/', '/dashboard/:path*', '/profile/:path*'], // add more paths if needed
};

module.exports = nextConfig;
