import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  swcMinify: process.env.NODE_ENV === 'production',

  webpack: (config) => {
    return config;
  },
  images: {
    domains: ['prueba-tecnica-api-tienda-moviles.onrender.com'],
  },
};

export default nextConfig;
