export default function ChessPiece({ piece, onclick, turn }: any) {
  const pieceImg = `/assets/${piece.type}_${piece.color}.png`;
  const currentTurn =
    piece.state === "deathBed" ||
    (turn ? piece.color === "b" : piece.color === "w");

  return (
    <div className="piece-container">
      <img
        src={pieceImg}
        alt=""
        className={`${piece.state} piece`}
        onClick={currentTurn ? onclick : undefined}
      />
    </div>
  );
}
