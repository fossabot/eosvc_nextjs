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
