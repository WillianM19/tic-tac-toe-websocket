import express from 'express';
import { Server ,createServer } from 'http';
import { Server as Io } from 'socket.io';

interface Player {
    id: string;
    name: string;
    piece: 'X' | 'O';
    wins: number;
}

interface board {
    board: ('X' | 'O' | null)[][];
    players: Player[];
    currentPlayer: Player;
}

interface Room {
    id: number;
    game: board;
}

class App {
    public app: express.Application;
    public server: Server;
    private socketIo: Io;
    private rooms: Room[] = [];

    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.socketIo = new Io(this.server, {
            cors: {
                origin: '*'
            }
        });

        this.socketIo.on('connection', (socket) => {

            console.log(socket.id);

            socket.on('joinRoom', (data: {name: string, piece: string}) => {
                this.room(socket, data);
            });

            socket.on('getRoomState', (data: { roomId: number }) => {
                this.getRoomState(socket, data.roomId);
            });

            socket.on('movement', (data: { roomId: number, coordinate: { x: number, y: number } }) => {
                this.movement(socket, data.roomId, data.coordinate);
            });

            socket.on('clearBoard', (data: { roomId: number }) => {
                this.clearBoard(socket, data.roomId);
            });

            socket.on('disconnect', () => {
                this.handleDisconnect(socket);
            })
        });
    }

    private movement(socket: any, roomId: number, coordinate: { x: number, y: number }): void {
        const room = this.rooms.find(r => r.id === roomId);

        if (!room) {
            console.error('Sala não encontrada:', roomId);
            socket.emit('error', 'Sala não encontrada.');
            return;
        }

        const player = room.game.players.find(p => p.id === socket.id);
        if (!player) {
            console.error('Jogador não encontrado na sala:', socket.id);
            socket.emit('error', 'Jogador não encontrado na sala.');
            return;
        }

        if (room.game.currentPlayer.id !== player.id) {
            console.error('Não é a vez do jogador:', socket.id);
            socket.emit('error', 'Não é a sua vez.');
            return;
        }

        if (room.game.board[coordinate.x][coordinate.y] !== null) {
            console.error('Movimento inválido, posição já ocupada:', coordinate);
            socket.emit('error', 'Movimento inválido, posição já ocupada.');
            return;
        }

        room.game.board[coordinate.x][coordinate.y] = player.piece;

        if (this.checkDraw(room.game.board)) {
            this.socketIo.to(room.id.toString()).emit('gameDraw');
            this.clearBoard(socket, roomId);
            return;
        } else if (this.checkWin(room.game.board, player.piece)) {
            player.wins++;
            this.socketIo.to(room.id.toString()).emit('gameWon', player);
            this.clearBoard(socket, roomId);
            return;
        } else {
            room.game.currentPlayer = room.game.players.find(p => p.id !== player.id)!;
        }

        this.socketIo.to(room.id.toString()).emit('roomUpdated', room);
    }

    private checkWin(board: ('X' | 'O' | null)[][], piece: 'X' | 'O'): boolean {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === piece && board[i][1] === piece && board[i][2] === piece) {
                return true;
            }
        }

        for (let i = 0; i < 3; i++) {
            if (board[0][i] === piece && board[1][i] === piece && board[2][i] === piece) {
                return true;
            }
        }

        if (board[0][0] === piece && board[1][1] === piece && board[2][2] === piece) {
            return true;
        }

        if (board[0][2] === piece && board[1][1] === piece && board[2][0] === piece) {
            return true;
        }

        return false;
    }

    private checkDraw(board: ('X' | 'O' | null)[][]): boolean {
        return board.flat().every(cell => cell !== null);
    }

    private room(socket: any, data: { name: string; piece: string }): void {

        if (!data.name || !data.piece || (data.piece !== 'X' && data.piece !== 'O')) {
            console.error('Dados inválidos recebidos:', data);
            socket.emit('error', 'Dados inválidos recebidos.');
            return;
        }

        const player: Player = {
            id: socket.id,
            name: data.name,
            piece: data.piece as 'X' | 'O',
            wins: 0
        };
    
        let room = this.rooms.find(
            r => r.game.players.length < 2 
            && 
            !r.game.players.some(p => p.piece === player.piece)
        );
        
        if (!room) {

            room = {
                id: this.rooms.length + 1,
                game: {
                    board: [
                        [null, null, null],
                        [null, null, null],
                        [null, null, null]
                    ],
                    players: [player],
                    currentPlayer: player
                }
            };
            this.rooms.push(room);
        } else {
            room.game.players.push(player);
        }
    
        socket.join(room.id.toString());
        if (room.game.players.length === 2) {
            this.socketIo.to(room.id.toString()).emit('roomId', room.id);
        }
    }

    private getRoomState(socket: any, roomId: number): void {
        const room = this.rooms.find(r => r.id === roomId);
        if (!room) {
            console.error('Sala não encontrada:', roomId);
            socket.emit('error', 'Sala não encontrada.');
            return;
        }
        this.socketIo.to(room.id.toString()).emit('roomUpdated', room);
    }

    private clearBoard(socket: any, roomId: number): void {
        const room = this.rooms.find(r => r.id === roomId);
        if (!room) {
            console.error('Sala não encontrada:', roomId);
            socket.emit('error', 'Sala não encontrada.');
            return;
        }

        room.game.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];

        this.socketIo.to(room.id.toString()).emit('roomUpdated', room);
    }

    private handleDisconnect(socket: any): void {
        const roomIndex = this.rooms.findIndex(room => room.game.players.some(player => player.id === socket.id));
        if (roomIndex !== -1) {
            const room = this.rooms[roomIndex];
            
            this.socketIo.to(room.id.toString()).emit('roomClosed', `Algum usuario foi desconectado`);
            
            this.rooms.splice(roomIndex, 1);
            
            this.socketIo.in(room.id.toString()).socketsLeave(room.id.toString());
        }
    }
}

export default App;