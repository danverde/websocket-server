const WebSocket = require('ws');
const chalk = require('chalk');

const port = 8080;

const wws = new WebSocket.Server({
  port,
  perMessageDeflate: {
    zlibDeflateOptions: {
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    clientNoContextTakeover: true,
    serverNoContextTakeover: true,
    serverMaxWindowBits: 10,
    concurrencyLimit: 10,
    threshold: 1024
  }
});

wws.on('connection', (ws) => {
  console.log(chalk.green('connected'));

  ws.on('message', (message) => {
    console.log(message);
  })

  ws.on('open', () => {
    console.log('open');
  });

  ws.on('close', (data) => {
    console.log(chalk.blue(data));
  });

  ws.on('error', (err) => {
    console.error(chalk.red(err));
  });

  ws.send('something');
});

console.log(chalk.cyan(`WWS Server running on port ${port}`));
