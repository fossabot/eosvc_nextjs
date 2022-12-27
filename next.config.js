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
    OPENAI_API_KEY: "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",
    USER_DEFAULT_PASS: "Heslo123456",
  },
};
