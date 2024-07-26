import { playerProps, tableElement } from "@/types/globalTypes";
import PlayerXImg from "/public/img/icon-player-x.svg";
import PlayerOImg from "/public/img/icon-player-o.svg";
import Image from "next/image";

interface UserInfoProps {
  type: "x" | "o"
}

export default function UserInfo({username, points, type}: playerProps & UserInfoProps ) {
  return (
    <div className="text-[40px] text-white font-bold flex flex-col items-center">
      <p>PLAYER {type == "x" ? 1 : 2}</p>
      <p>{username}</p>
      <Image className="my-[38px]" src={type == "x" ? PlayerXImg : PlayerOImg} alt="Player X" />
      <p>{points}</p>
    </div>
  );
}
