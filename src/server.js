import Express from 'express';
import bodyParser from 'body-parser';

import { Board, Led } from 'johnny-five';

// initialize express app
const app = new Express();

app.listen(3000);

// initialize the board
const myBoard = new Board();

myBoard.on('ready', () => {
  const led = new Led(13);
  led.blink(500);
});
