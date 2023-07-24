module.exports = {
  apps : [{
    name: 'gamea-next',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    env: {
      NODE_ENV: 'production',
    },
  },],

};
