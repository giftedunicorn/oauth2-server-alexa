module.exports = {
    apps : [{
      name: 'third-party-server',
      script: './src/server.js',
      instances: "max",
      autorestart: true,
      watch: true,
      env: {
        NODE_ENV: 'production'
      },
    }],
  };
  