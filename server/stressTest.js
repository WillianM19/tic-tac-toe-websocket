const io = require('socket.io-client');

// Configurações do teste
const numberOfClients = 1000; // Número de clientes a serem simulados
const serverUrl = 'http://localhost:3333'; // URL do servidor
const delayBetweenActions = 100; // Atraso entre as ações de cada cliente (em milissegundos)

function createClient(clientId) {
    const socket = io(serverUrl);

    socket.on('connect', () => {
        console.log(`Client ${clientId} connected`);

        // Cliente entra em uma sala
        socket.emit('joinRoom', {
            name: `Player ${clientId}`,
            piece: clientId % 2 === 0 ? 'X' : 'O'
        });

        // Solicita o estado da sala
        socket.emit('getRoomState', { roomId: 1 });

        // Realiza um movimento aleatório
        setTimeout(() => {
            const x = Math.floor(Math.random() * 3);
            const y = Math.floor(Math.random() * 3);

            socket.emit('movement', {
                roomId: 1,
                coordinate: { x, y }
            });
        }, delayBetweenActions);
    });

    socket.on('roomUpdated', (room) => {
        console.log(`Client ${clientId} received room update`);
    });

    socket.on('disconnect', () => {
        console.log(`Client ${clientId} disconnected`);
    });
}

// Cria múltiplos clientes para realizar o teste de estresse
for (let i = 0; i < numberOfClients; i++) {
    setTimeout(() => createClient(i + 1), i * delayBetweenActions);
}
