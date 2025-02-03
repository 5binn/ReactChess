import ChessPiece from "./ChessPiece";
import Square from "./Square";

export default function BoardSquare({ piece, isBlack, onclick, turn }: any) {
  return (
    <div className="board-square">
      <Square isBlack={isBlack}>
        <ChessPiece piece={piece} onclick={onclick} turn={turn} />
      </Square>
    </div>
  );
}
