import { boardType } from "@/types/globalTypes";
import Cell from "../Cell";

interface TableProps {
  renderBy: boardType;
  onCellClick: (row: number, column: number) => void;
}

export default function Table({ renderBy, onCellClick }: TableProps) {
  return (
    <div className="w-[70vh] p-[30px] aspect-square bg-white rounded-md grid grid-cols-3 grid-rows-3 gap-[30px]">
      {renderBy.map((row, rowIndex) => 
        row.map((cell, colIndex) => (
          <Cell 
            key={`${rowIndex}-${colIndex}`} 
            onClick={() => onCellClick(rowIndex, colIndex)} 
            marked={cell} 
          />
        ))
      )}
    </div>
  );
}
