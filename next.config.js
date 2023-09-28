/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: "/",
      destination: "/landing",
      permanent: false,
    },
  ],
};

module.exports = nextConfig;
