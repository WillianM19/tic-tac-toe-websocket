<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Jogo_da_velha_-_tic_tac_toe.png/709px-Jogo_da_velha_-_tic_tac_toe.png" alt="Jogo da Velha" width="300"/>
</p>

# Jogo da Velha Multiplayer com WebSocket

Este projeto é um jogo da velha multiplayer em tempo real, desenvolvido durante a disciplina de arquitetura de computadores - ADS (IFRN), que utiliza WebSocket para comunicação em tempo real. O backend é construído com Express e o frontend é construído com Next.js. O jogo permite que múltiplos jogadores joguem em salas separadas.

## Funcionalidades

- **Jogabilidade em Tempo Real**: A comunicação entre os jogadores é feita em tempo real usando a biblioteca Socket.io, permitindo uma experiência de jogo fluida e interativa.
- **Salas de Jogo**: Os jogadores podem criar e ingressar em salas de jogo. Cada sala é independente e permite que jogadores joguem entre si sem interferência de outros jogos.

## Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.

### Configuração do Backend

1. Navegue até o diretório de server e instale as dependências:

```bash
npm install

#or

yarn
```

2. Rode o projeto

```bash
node server.js
```

### Configuração do Frontend

1. Navegue até o diretório de frontend e instale as dependências:

```bash
npm install

#ou

yarn
```

2. Rode o projeto

```bash
npm run dev

#ou

yarn dev
```