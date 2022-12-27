/** @type {import('next').NextConfig} */
module.exports = {
  //reactStrictMode: false,
  images: {
    domains: ["randomuser.me"],
  },
  experimental: {
    appDir: true,
  },
  env: {
    APP_URL: "http://localhost:3000",

    USER_DEFAULT_PASS: "Heslo123456",
  },
};
