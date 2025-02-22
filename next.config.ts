import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    return config;
  },
  images: {
    domains: ['prueba-tecnica-api-tienda-moviles.onrender.com'],
  },
};

export default nextConfig;
