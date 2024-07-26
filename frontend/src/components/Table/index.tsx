import { boardType } from "@/types/globalTypes";
import Cell from "../Cell";

interface TableProps {
  renderBy: boardType;
}

export default function Table({ renderBy }: TableProps) {
  return (
    <div className="w-[70vh] p-[30px] aspect-square bg-white rounded-md grid grid-cols-3 grid-rows-3 gap-[30px]">
      {renderBy.map((i) => i.map((j) => <Cell marked={j} />))}
    </div>
  );
}
