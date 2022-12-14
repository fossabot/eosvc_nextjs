/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["randomuser.me"],
  },
  env: {
    APP_URL: "http://localhost:3000",
  },
};
