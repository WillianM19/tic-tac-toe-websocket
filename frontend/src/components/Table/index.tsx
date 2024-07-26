import { boardType } from "@/types/globalTypes";
import Cell from "../Cell";

interface TableProps {
  renderBy: boardType;
  onCellClick: (column: number, row: number) => void;
}

export default function Table({ renderBy, onCellClick }: TableProps) {
  return (
    <div className="w-[70vh] p-[30px] aspect-square bg-white rounded-md grid grid-cols-3 grid-rows-3 gap-[30px]">
      {renderBy.map((i, i_index) => i.map((j, j_index) => <Cell onClick={() => onCellClick(i_index, j_index)} marked={j} />))}
    </div>
  );
}
