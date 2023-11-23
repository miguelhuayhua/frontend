module.exports = {
  apps: [
    {
      name: "gamea",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
      max_restarts: 5,
    
    },
  ],

};
