/** @type {import('next').NextConfig} */

const nextConfig ={
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*', // Redireciona solicitações da API para o backend
      },
    ]
  },
};


export default nextConfig;
