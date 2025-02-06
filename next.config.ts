import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
 
  swcMinify: process.env.NODE_ENV === 'production', 

  webpack: (config, { dev }) => {
    if (dev) {
      console.log('Modo Desarrollo: No se minimizan los assets.');
    } else {
      console.log('Modo Producción: Minimizando assets y concatenando.');
    }

    return config;
  },
  images: {
    domains: ['prueba-tecnica-api-tienda-moviles.onrender.com'],
  },
};

export default nextConfig;
