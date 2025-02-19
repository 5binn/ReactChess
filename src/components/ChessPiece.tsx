import { Piece } from "../utils/types";

interface ChessPieceProps {
  piece: Piece;
  onclick: () => void;
  turn: "b" | "w" | "";
  reverse: boolean;
}

export default function ChessPiece({
  piece,
  onclick,
  turn,
  reverse,
}: ChessPieceProps) {
  const pieceImg = `/assets/${piece.type}_${piece.color}.png`;
  const isTurn =
    (turn === "b" && piece.color === "b") ||
    (turn === "w" && piece.color === "w");
  const isClickable = piece.state === "deathBed" || isTurn;
  const isReverse = piece.color === "b" && reverse;
  return (
    <div className="piece-container">
      {piece.state !== null && (
        <img
          src={pieceImg}
          alt=" "
          className={`${piece.state} piece ${isReverse ? "reverse" : ""}`}
          onClick={isClickable ? onclick : undefined}
        />
      )}
    </div>
  );
}
