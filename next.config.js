
module.exports = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node/,
      use: 'raw-loader'
    })
    return config;
  }
};