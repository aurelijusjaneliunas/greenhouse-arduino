// Johnny Five
import {Board} from 'johnny-five';
import LedController from './LedController';

const board = new Board();

class Arduino {

    constructor(socketConnection) {
        this.socketConnection = socketConnection;
    }

    ready() {
        let io = this.socketConnection;
        board.on('ready', () => {
            new LedController(io).mount();
        });
    }

}

export default Arduino;