/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**', // Allow all domains or specify the exact one
        },
      ],
    },
  };
  
  export default nextConfig;
  