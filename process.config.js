module.exports = { // pm2 start process.config.js
  apps: [
    {
      name: 'gateway',
      script: './server/gateway.js',
      ignore_watch : ["node_modules"],
      watch: true,
    },
    {
      name: 'basicgram',
      script: './server/basicgram.js',
      ignore_watch : ["node_modules"],
      watch: true,
      instances: 2,
    },
    {
      name: 'websocket',
      script: './server/post-server.js',
      ignore_watch : ["node_modules"],
      watch: true,
      instances: 2,
    },
    {
      name: 'auth-server',
      script: './server/auth-server.js',
      ignore_watch : ["node_modules"],
      watch: true,
    }
  ],
};