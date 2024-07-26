import { useRouter } from "next/router";
import Table from "@/components/Table";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    //Atualizar estados aqui
  }, [])

  return (
    <main className="h-[100vh] max-w-[1980px] m-auto relative flex justify-evenly items-center">
      <HomeBtn/>
      <UserInfo {...gameData.playerX} type="x" />
      <Table renderBy={currentBoard}/>
      <UserInfo {...gameData.playerO} type="o" />
    </main>
  );
}
