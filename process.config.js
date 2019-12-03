module.exports = { // pm2 start process.config.js
  apps: [
    {
      name: 'gateway',
      script: './server/gateway.js',
      watch: true,
    },
    {
      name: 'basicgram',
      script: './server/basicgram.js',
      watch: true,
    },
    {
      name: 'websocket',
      script: './server/websocket.js',
      watch: true,
    },
    {
      name: 'auth-server',
      script: './server/auth-server.js',
      watch: true,
    }
  ],
};