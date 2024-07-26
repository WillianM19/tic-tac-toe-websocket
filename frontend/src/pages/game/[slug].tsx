import { useRouter } from "next/router";
import Image from "next/image";
import HomeImg from "/public/img/icon-home.svg";
import PlayerXImg from "/public/img/icon-player-x.svg";
import PlayerOImg from "/public/img/icon-player-o.svg";

export default function game() {
  const router = useRouter();
  return (
    <main className="h-[100vh] max-w-[1980px] m-auto relative flex justify-evenly items-center">
      <div
        onClick={() => router.replace("/")}
        className="flex gap-[11px] text-[24px] font-bold absolute top-[22px] left-[40px]"
      >
        <div className="bg-white w-max p-[12px] rounded-full flex">
          <Image src={HomeImg} alt="icon home" />
        </div>
        <p className="bg-white w-[130px] p[10px] rounded-br-[34px] rounded-tr-[34px] rounded-tl-[13px] flex items-center pl-[15px]">
          HOME
        </p>
      </div>

      <div className="text-[40px] text-white font-bold flex flex-col items-center">
        <p>PLAYER 1</p>
        <p>(Nome)</p>
        <Image className="mt-[38px]" src={PlayerXImg} alt="Player X" />
      </div>

      <div className="w-[70vh] p-[30px] aspect-square bg-white rounded-md grid grid-cols-3 grid-rows-3 gap-[30px]">
        <div className="bg-gray-1 rounded-md"></div>
        <div className="bg-gray-1 rounded-md"></div>
        <div className="bg-gray-1 rounded-md"></div>
        <div className="bg-gray-1 rounded-md"></div>
        <div className="bg-gray-1 rounded-md"></div>
        <div className="bg-gray-1 rounded-md"></div>
        <div className="bg-gray-1 rounded-md"></div>
        <div className="bg-gray-1 rounded-md"></div>
        <div className="bg-gray-1 rounded-md"></div>
      </div>

      <div className="text-[40px] text-white font-bold flex flex-col items-center">
        <p>PLAYER 2</p>
        <p>(Nome)</p>
        <Image className="mt-[38px]" src={PlayerOImg} alt="Player X" />
      </div>
    </main>
  );
}
