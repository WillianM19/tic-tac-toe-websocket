import PlayerXImg from "/public/img/icon-player-x.svg";
import PlayerOImg from "/public/img/icon-player-o.svg";
import Image from "next/image";
import { tableElement } from "@/types/globalTypes";

interface CellProps {
  marked?: tableElement;
  onClick?: () => void;
}

export default function Cell({ marked, onClick }: CellProps) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-1 rounded-md flex justify-center items-center cursor-pointer hover:scale-[1.04] transition-all"
    >
      {marked && (
        <Image
          src={marked == "x" ? PlayerXImg : PlayerOImg}
          alt="player cell"
          width={80}
        />
      )}
    </div>
  );
}
