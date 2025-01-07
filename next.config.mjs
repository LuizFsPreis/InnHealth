/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "img-c.udemycdn.com", 
      "img-b.udemycdn.com", 
      "t3.ftcdn.net", 
      "localhost",
      "92.113.34.132"
    ], // Domínios permitidos
    unoptimized: true,  // Desativa a otimização de imagens
  },
};

export default nextConfig;
