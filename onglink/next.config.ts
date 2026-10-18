import type { NextConfig } from "next";
import packageJson from "./package.json";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**', // Permite qualquer imagem de 'res.cloudinary.com'
      },
    ],
  },
  output: 'standalone',

  env: {
    NEXT_PUBLIC_APP_VERSION: packageJson.version,
  },

  // ADICIONADO: Redirecionamento da Vercel para o servidor Oracle
  async rewrites() {
    return [
      {
        // Interceta todas as chamadas que o front faz para /api/...
        source: '/api/:path*',
        // Encaminha silenciosamente para o backend HTTP no IP público
        destination: 'http://163.176.72.142:4000/api/:path*',
      },
    ];
  },
};

export default nextConfig;