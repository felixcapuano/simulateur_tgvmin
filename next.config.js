/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    TGVMAX_BASE_URL: 'https://sncf-simulateur-api-prod.azurewebsites.net',
    TGVMAX_ORIGIN_PATH: '/api/Stations/AllOrigins',
    TGVMAX_DESTINATION_PATH: '/api/Stations/Destinations/',
    TGVMAX_SEARCH_PATH: '/api/RailAvailability/Search/',
  },
  serverRuntimeConfig: {},
};

module.exports = nextConfig;
