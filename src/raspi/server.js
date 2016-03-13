import Express from 'express';
import socketIo from 'socket.io';
import { Server as server } from 'http';

import path from 'path';

// Johnny Five
import { Board, Led } from 'johnny-five';

// Webpack Requirements
import webpack from 'webpack';
import config from '../../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// initialize socket.io
const http = server(app);
const io = socketIo(http);

app.use(Express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

http.listen(3000, () => console.log('listening on 3000'));

// initialize the board
const myBoard = new Board();

myBoard.on('ready', () => {
  // initialize led
  const led = new Led(13);
  let stat = true;
  led.on();

  io.on('connection', (socket) => {
    socket.emit('led:status', stat);
    // register listener
    socket.on('led:toggle', () => {
      stat = !stat;
      led.toggle();
      io.emit('led:status', stat);
    });
  });
});
