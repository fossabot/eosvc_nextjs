/** @type {import('next').NextConfig} */
module.exports = {
  //reactStrictMode: false,
  plugins: [require("@tailwindcss/forms")],
  images: {
    domains: ["randomuser.me"],
  },
  experimental: {
    appDir: true,
  },
  env: {
    APP_URL: "http://localhost:3000",
  },
};
