/** @type {import('next').NextConfig} */
module.exports = {
  //reactStrictMode: false,
  /*   future: {
    webpack5: true,
  }, */
  webpack: (config) => {
    // load worker files as a urls with `file-loader`
    config.module.rules.unshift({
      test: /pdf\.worker\.(min\.)?js/,
      //domains: ["eosvc.fra1.digitaloceanspaces.com"],
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[contenthash].[ext]",
            publicPath: "_next/static/worker",
            outputPath: "static/worker",
          },
        },
      ],
    });

    return config;
  },
  /*   plugins: [require("@tailwindcss/forms")], */
  images: {
    domains: ["randomuser.me", "eosvc.fra1.digitaloceanspaces.com"],
  },
  /*   experimental: {
    appDir: true,
  }, */
  env: {
    APP_URL: "http://localhost:3000",
  },
};
