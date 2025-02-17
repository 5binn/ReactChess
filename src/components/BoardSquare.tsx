import { Piece } from "../utils/types";
import ChessPiece from "./ChessPiece";
import Square from "./Square";

interface BoardSquareProps {
  piece: Piece;
  isBlack: boolean;
  onclick: () => void;
  turn: "b" | "w" | "";
}

export default function BoardSquare({
  piece,
  isBlack,
  onclick,
  turn,
}: BoardSquareProps) {
  return (
    <div className="board-square">
      <Square isBlack={isBlack}>
        <ChessPiece piece={piece} onclick={onclick} turn={turn} />
      </Square>
    </div>
  );
}
