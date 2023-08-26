/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd36887svjhykt4.cloudfront.net',
        port: '',
        pathname: '/users/*'
      }
    ]
  }
}

module.exports = nextConfig
