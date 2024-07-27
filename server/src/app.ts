import express from 'express';
import { Server ,createServer } from 'http';
import { Server as Io } from 'socket.io';

class App {
    public app: express.Application;
    public server: Server;
    private socketIo: Io;

    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.socketIo = new Io(this.server, {
            cors: {
                origin: '*'
            }
        });

        this.socketIo.on('connection', (socket) => {
            console.log('Usuario conectou');


            socket.on('disconnect', () => {
                console.log('Usuario desconectado!')
            })
        });
    }

}

export default App;