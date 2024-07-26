import Image from "next/image";
import Homebanner from "/public/img/home-banner.svg";
import PlayerXImg from "/public/img/icon-player-x.svg";
import PlayerOImg from "/public/img/icon-player-o.svg";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

interface UserSettingsProps {
  username: string;
  player: "x" | "o";
}

export default function Home() {
  const router = useRouter()

  const [userSettings, setUserSettings] = useState<Partial<UserSettingsProps>>({
    username: "",
    player: undefined,
  });

  const [statusButtonSearching, setStatusButtonSearching] = useState(false)

  function matchFinder(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatusButtonSearching(true)
    

    try {
      //Encontrar partida aqui
  
      //Id da partida encontrado
      const matchid = "389jdslkj890rf34"
  
      setTimeout(() => { // Simular tempo de conneção
        router.push(`game/${matchid}`)
      }, 1500)

    } catch(_) {
      setStatusButtonSearching(false)
      alert("Erro na conexão")
    }
  }

  return (
    <main className="h-[100vh] max-w-[1980px] m-auto flex items-center gap-[16px]">
      <div>
        <Image src={Homebanner} alt="imagem de banner" objectFit="cover" />
      </div>
      <div className="flex flex-col items-center gap-[36px] text-white max-w-[826px]">
        <h1 className="font-bold text-[40px]">JOGAR AGORA</h1>
        <p className="uppercase font-light text-[20px]">
          Prepare-se para desafiar seus amigos e testar suas habilidades
          estratégicas com o nosso clássico Jogo da Velha, agora disponível
          online!
        </p>
        <form
          onSubmit={matchFinder}
          id="form"
          className="w-full h-[440px] bg-white rounded-lg flex flex-col justify-evenly items-center px-[50px] text-[27px]"
        >
          <input
            type="text"
            placeholder="INFORME UM NOME"
            className="bg-gray-1 w-full h-[61px] rounded-md p-[10px] text-black  outline-none"
            required
          />
          <div className="bg-gray-1 w-full h-[109px] rounded-md flex p-[12px]">
            <div className="flex-1">
              <input
                type="radio"
                name="option"
                id="1"
                value="1"
                className="peer hidden"
                checked
              />
              <label
                htmlFor="1"
                className="h-full cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-white peer-checked:font-bold flex justify-center"
              >
                <Image
                  src={PlayerXImg}
                  alt="X"
                  className="pointer-events-none"
                />
              </label>
            </div>

            <div className="flex-1">
              <input
                type="radio"
                name="option"
                id="2"
                value="2"
                className="peer hidden"
              />
              <label
                htmlFor="2"
                className="h-full cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-white peer-checked:font-bold flex justify-center"
              >
                <Image
                  src={PlayerOImg}
                  alt="X"
                  className="pointer-events-none"
                />
              </label>
            </div>
          </div>
          <button disabled={statusButtonSearching} type="submit" className="uppercase rounded-md h-[61px] bg-blue-2 w-full text-[">
            {!statusButtonSearching ? "Buscar partida" : "Buscando..."}
          </button>
          <p className="text-black uppercase">Preencha os campos</p>
        </form>
      </div>
    </main>
  );
}
