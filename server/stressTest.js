const io = require('socket.io-client');

// Configurações do teste
const numberOfClients = 10000; // Número de clientes a serem simulados
const serverUrl = 'http://localhost:3333'; // URL do servidor
const delayBetweenActions = 10; // Atraso entre as ações de cada cliente (em milissegundos)

function createClient(clientId) {
    const socket = io(serverUrl);

    socket.on('connect', () => {
        console.log(`Client ${clientId} connected`);

        // Cliente entra em uma sala
        socket.emit('joinRoom', {
            name: `Player ${clientId}`,
            piece: clientId % 2 === 0 ? 'X' : 'O'
        });

    });
    socket.on('roomId', (room) => {
        console.log(`Client ${clientId} received Id room`);
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
