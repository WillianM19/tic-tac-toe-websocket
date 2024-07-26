import Table from "@/components/Table";
import { useState } from "react";
import { boardType, gameDataProps } from "@/types/globalTypes";
import UserInfo from "@/components/UserInfo";
import HomeBtn from "@/components/HomeBtn";


export default function game() {
  // const router = useRouter();

  //Estado do board
  const [currentBoard, setCurrentBoard] = useState<boardType>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
  ])

  //Estado de usuários
  const [gameData, setGameData] = useState<gameDataProps>({
    playerX: {
      username: "Jogador 1",
      points: 0,
    },
    playerO: {
      username: "Jogador 2",
      points: 0,
    }
  })

  //Atualizar board
  function Update(row: number, column: number) {
    //Lógica temporária apenas para testes
    setCurrentBoard((p) => {
      const newBoard = p.map((row) => [...row]) as boardType;
      newBoard[row][column] = "x";
      return newBoard;
    });
  }

  // useEffect(() => {
  //   console.table(currentBoard)
  // }, [currentBoard])

  return (
    <main className="h-[100vh] max-w-[1980px] m-auto relative flex justify-evenly items-center">
      <HomeBtn/>
      <UserInfo {...gameData.playerX} type="x" />
      <Table onCellClick={(row, column) => Update(row, column)} renderBy={currentBoard}/>
      <UserInfo {...gameData.playerO} type="o" />
    </main>
  );
}
