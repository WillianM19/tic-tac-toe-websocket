# Eventos

Este é o resumo da interação entre o servidor e os clientes através dos eventos Socket.io. 

## Eventos de Entrada
1. `joinRoom`

    Descrição: Evento emitido por um cliente para se juntar a uma sala.
    
    - Dados Esperados: { name: string, piece: 'X' | 'O' }
        - name: Nome do jogador.
        - piece: Peça do jogador ('X' ou 'O').
    
    - Resposta Esperada:

        Emissão de `roomId` com o ID da sala criada ou na qual o jogador foi adicionado.

2. `getRoomState`

    Descrição: Evento emitido por um cliente para obter o estado atual da sala.
    - Dados Esperados: { roomId: number }
        - roomId: ID da sala para a qual o estado deve ser retornado.

    - Resposta Esperada:

        Emissão de roomUpdated com o estado atual da sala.

3. `movement`

    Descrição: Evento emitido por um cliente para fazer um movimento no tabuleiro.
    
    - Dados Esperados: { roomId: number, coordinate: { x: number, y: number } }
        - roomId: ID da sala onde o movimento deve ser feito.
        - coordinate: Coordenadas do movimento no tabuleiro (x e y).
    - Resposta Esperada:
        
        Emissão de `roomUpdated` com o estado atualizado da sala.
        Emissão de `gameWon` se um jogador ganhou o jogo.

4. `clearBoard`

    Descrição: Evento emitido por um cliente para limpar o tabuleiro da sala.

    - Dados Esperados: { roomId: number }
        - roomId: ID da sala cujo tabuleiro deve ser limpo.
    
    - Resposta Esperada:
        
        Emissão de `roomUpdated` com o estado atualizado da sala (tabuleiro limpo).

5. `disconnect`

    Descrição: Evento emitido quando um cliente se desconecta do servidor.(Ao fechar o navegador ou aba.)

    - Dados Esperados: Nenhum.

    - Resposta Esperada:

        Emissão de `roomUpdated` para as salas onde o jogador estava, indicando a remoção do jogador.

## Eventos de Saída

1. `roomId`

    Descrição: Emissão para informar ao cliente o ID da sala à qual ele foi adicionado ou a qual ele se juntou.
    
    - Dados Enviados: { roomId: number }
        - roomId: ID da sala.

2. `roomUpdated`

    Descrição: Emissão para atualizar todos os clientes na sala com o estado atual da sala.

    - Dados Enviados: { id: number, game: board }
        - id: ID da sala.
        - game: Estado atual do jogo na sala, incluindo o tabuleiro, jogadores e jogador atual.

3. `gameWon`

    Descrição: Emissão para informar a todos os clientes na sala que um jogador ganhou o jogo.

    - Dados Enviados: { id: string, name: string, piece: 'X' | 'O', wins: number }
        - id: ID do jogador que ganhou.
        - name: Nome do jogador que ganhou.
        - piece: Peça do jogador ('X' ou 'O').
        - wins: Número de vitórias do jogador.

4. `error`

    Descrição: Emissão para informar o cliente sobre erros que ocorreram.

    - Dados Enviados: { error: string }
        - error: Mensagem de erro descrevendo o problema.