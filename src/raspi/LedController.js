// Johnny Five
import {Led} from 'johnny-five';

const LED_INDICATOR = 13;

class LedController {

    constructor(socketConnection) {
        this.socketConnection = socketConnection;
    }

    mount() {

        // initialize led
        const led = new Led(LED_INDICATOR);
        let stat = true;
        led.on();

        let io = this.socketConnection;

        io.on('connection', (socket) => {
            socket.emit('led:status', stat);
            // register listener
            socket.on('led:toggle', () => {
                stat = !stat;
                led.toggle();
                io.emit('led:status', stat);
            });
        });

    }

}

export default LedController;