import { Piece } from "../utils/types";

interface ChessPieceProps {
  piece: Piece;
  onclick: () => void;
  turn: "b" | "w" | "";
}

export default function ChessPiece({ piece, onclick, turn }: ChessPieceProps) {
  const pieceImg = `/assets/${piece.type}_${piece.color}.png`;
  const isTurn =
    (turn === "b" && piece.color === "b") ||
    (turn === "w" && piece.color === "w");
  const isClickable = piece.state === "deathBed" || isTurn;

  return (
    <div className="piece-container">
      {piece.state !== null && (
        <img
          src={pieceImg}
          alt=" "
          className={`${piece.state} piece`}
          onClick={isClickable ? onclick : undefined}
        />
      )}
    </div>
  );
}
