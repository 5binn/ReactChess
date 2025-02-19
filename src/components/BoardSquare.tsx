import { Piece } from "../utils/types";
import ChessPiece from "./ChessPiece";
import Square from "./Square";

interface BoardSquareProps {
  piece: Piece;
  isBlack: boolean;
  onclick: () => void;
  turn: "b" | "w" | "";
  reverse: boolean;
}

export default function BoardSquare({
  piece,
  isBlack,
  onclick,
  turn,
  reverse,
}: BoardSquareProps) {
  return (
    <div className="board-square">
      <Square isBlack={isBlack}>
        <ChessPiece
          piece={piece}
          onclick={onclick}
          turn={turn}
          reverse={reverse}
        />
      </Square>
    </div>
  );
}
