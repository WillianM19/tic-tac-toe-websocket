import Table from "@/components/Table";
import { useState, useEffect, useRef, SetStateAction } from "react";
import { boardType, gameDataProps } from "@/types/globalTypes";
import UserInfo from "@/components/UserInfo";
import HomeBtn from "@/components/HomeBtn";
import { socket } from "..";

export default function game() {
  const roomId = useRef<number | null>(null);

  //Estado do board
  const [currentBoard, setCurrentBoard] = useState<boardType>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  //Estado de usuários
  const [gameData, setGameData] = useState<gameDataProps>({
    playerX: {
      username: "Jogador 1",
      points: 0,
    },
    playerO: {
      username: "Jogador 2",
      points: 0,
    },
  });

  const [currentPlayer, setCurrentPlayer] = useState<string>("");

  //Atualizar board
  function Update(row: number, column: number) {
    socket.emit("movement", {
      roomId: roomId.current,
      coordinate: { x: row, y: column },
    });
  }

  useEffect(() => {
    const handleRoomUpdated = (response: {
      game: {
        board: SetStateAction<boardType>;
        players: any[];
        currentPlayer: { name: SetStateAction<string> };
      };
    }) => {
      console.log("entrou", response);
      if (response) {
        setCurrentBoard(response.game.board);
        console.log(response);

        const playerX = response.game.players.find(
          (player: { piece: string }) => player.piece === "X"
        );
        const playerO = response.game.players.find(
          (player: { piece: string }) => player.piece === "O"
        );
        console.log(playerX);
        const players = {
          playerX: {
            username: playerX.name ? playerX.name : "Desconectado",
            points: playerX.wins,
          },
          playerO: {
            username: playerO.name ? playerO.name : "Desconectado",
            points: playerO.wins,
          },
        };

        setCurrentPlayer(response.game.currentPlayer.name);

        setGameData(players);
      }
    };

    const handleGameWon = (response: { name: string }) => {
      alert(`O jogador ${response.name} ganhou!`);
    };

    const handleGameDraw = () => {
      alert(`O Jogo empatou!`);
    };

    socket.on("roomUpdated", handleRoomUpdated);

    socket.on("gameWon", handleGameWon);
    socket.on("gameDraw", handleGameDraw);

    socket.emit("clearBoard", { roomId: roomId });
    setCurrentBoard([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);

    const roomId_temp = Number(window.location.href.match(/\/game\/(.+)/)?.[1]);
    roomId.current = roomId_temp;

    socket.emit("getRoomState", { roomId: roomId_temp });

    return () => {
      socket.off("roomUpdated", handleRoomUpdated);
      socket.off("gameWon", handleGameWon);
      socket.off("gameDraw", handleGameDraw);
    };
  }, []);

  return (
    <>
      {roomId ? (
        <main className="h-[100vh] max-w-[1980px] m-auto relative flex justify-evenly items-center">
          <HomeBtn />
          <div
            className={
              currentPlayer == gameData.playerX.username ? "animate-pulse" : ""
            }
          >
            <UserInfo {...gameData.playerX} type="x" />
          </div>
          <div>
            <p className="text-white mb-[8px] text-[18px] text-center">
              Vez de: {currentPlayer}
            </p>
            <Table
              onCellClick={(row, column) => Update(row, column)}
              renderBy={currentBoard}
            />
          </div>
          <div
            className={
              currentPlayer == gameData.playerO.username ? "animate-pulse" : ""
            }
          >
            <UserInfo {...gameData.playerO} type="o" />
          </div>
        </main>
      ) : (
        <></>
      )}
    </>
  );
}
