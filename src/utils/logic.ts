import { Piece } from "./types";

//해당 하는 말의 타입별 이동 가능한 좌표들 반환
export function getAvailablePositions({
  pieces,
  piece,
}: {
  pieces: Piece[];
  piece: Piece | null;
}): string[] {
  switch (piece?.type) {
    case "p":
      return pawn({ pieces, piece });
    case "n":
      return knight({ pieces, piece });
    case "r":
      return rook({ pieces, piece });
    case "b":
      return bishop({ pieces, piece });
    case "q":
      return queen({ pieces, piece });
    case "k":
      return king({ pieces, piece });
    default:
      throw new Error("Invalid piece type: " + piece?.type);
  }
}

//해당 좌표의 말
export function getPieceByPosition({
  pieces,
  position,
}: {
  pieces: Piece[];
  position: string;
}): Piece | null {
  return pieces.find((piece) => piece.position === position) || null;
}

//해당 좌표가 범위내인지
function isValidPosition({
  column,
  row,
}: {
  column: string;
  row: number;
}): boolean {
  return column >= "a" && column <= "h" && row > 0 && row <= 8;
}

//해당 좌표가 이동 가능한지
function canMove({
  pieces,
  column,
  row,
}: {
  pieces: Piece[];
  column: string;
  row: number;
}): boolean {
  return (
    isValidPosition({ column, row }) &&
    (getPieceByPosition({ pieces, position: column + row }) == null ||
      getPieceByPosition({ pieces, position: column + row })?.type == null)
  );
}

//해당 좌표가 잡을 수 있는지
function canCapture({
  pieces,
  column,
  row,
  piece,
}: {
  pieces: Piece[];
  column: string;
  row: number;
  piece: Piece;
}): boolean {
  return (
    isValidPosition({ column, row }) &&
    getPieceByPosition({ pieces, position: column + row }) != null &&
    getPieceByPosition({ pieces, position: column + row })?.color != null &&
    getPieceByPosition({ pieces, position: column + row })?.color != piece.color
  );
}

//moves 좌표에 따른 이동 가능한 좌표
function getMoves({
  pieces,
  piece,
  moves,
}: {
  pieces: Piece[];
  piece: Piece;
  moves: number[][];
}) {
  const positions: string[] = [];
  let targetColumn = piece.position.charCodeAt(0);
  let targetRow = Number(piece.position.charAt(1));

  moves.forEach((move: number[]) => {
    let column = String.fromCharCode(targetColumn + move[0]);
    let row = targetRow + move[1];
    if (canMove({ pieces, column, row })) {
      positions.push(column + row);
    }
    if (canCapture({ pieces, column, row, piece })) {
      positions.push("-" + column + row); //잡을 수 있는 상대 말의 좌표는 "-" 추가
    }
  });
  return positions;
}

//directions 방향 좌표에 따른 이동 가능한 직선 좌표들
function getDirectionalMoves({
  pieces,
  piece,
  directions,
}: {
  pieces: Piece[];
  piece: Piece;
  directions: number[][];
}) {
  const positions: string[] = [];
  let targetColumn = piece.position.charCodeAt(0);
  let targetRow = Number(piece.position.charAt(1));

  directions.forEach((direction: number[]) => {
    let column = targetColumn;
    let row = targetRow;
    while (true) {
      column += direction[0];
      row += direction[1];
      if (
        canCapture({ pieces, column: String.fromCharCode(column), row, piece })
      ) {
        positions.push("-" + String.fromCharCode(column) + row); //잡을 수 있는 상대 말의 좌표는 "-" 추가
        break;
      }
      if (!canMove({ pieces, column: String.fromCharCode(column), row })) {
        break;
      }
      const targetPiece = getPieceByPosition({
        pieces,
        position: String.fromCharCode(column) + row,
      });
      if (targetPiece == null || targetPiece.type == null) {
        positions.push(String.fromCharCode(column) + row);
      } else if (targetPiece.color != piece.color) {
        positions.push(String.fromCharCode(column) + row);
        break;
      } else {
        break;
      }
    }
  });

  return positions;
}

//폰의 움직임(초기 두 칸 이동)
function pawn({ pieces, piece }: { pieces: Piece[]; piece: Piece }) {
  const positions: string[] = [];
  let column = piece.position.charAt(0);
  let row = Number(piece.position.charAt(1));
  let direction = piece.color === "w" ? 1 : -1;
  //기본 한 칸
  if (canMove({ pieces, column, row: row + direction }))
    positions.push(column + (row + direction));
  //초기 두 칸
  if ((piece.color === "w" && row == 2) || (piece.color === "b" && row == 7)) {
    if (canMove({ pieces, column, row: row + direction * 2 }))
      positions.push(column + (row + direction * 2));
  }
  //왼쪽 대각선
  if (
    canCapture({
      pieces,
      column: String.fromCharCode(column.charCodeAt(0) - 1),
      row: row + direction,
      piece,
    })
  ) {
    positions.push(
      "-" + String.fromCharCode(column.charCodeAt(0) - 1) + (row + direction) //잡을 수 있는 상대 말의 좌표는 "-" 추가
    );
  }
  //오른쪽 대각선
  if (
    canCapture({
      pieces,
      column: String.fromCharCode(column.charCodeAt(0) + 1),
      row: row + direction,
      piece,
    })
  ) {
    positions.push(
      "-" + String.fromCharCode(column.charCodeAt(0) + 1) + (row + direction) //잡을 수 있는 상대 말의 좌표는 "-" 추가
    );
  }
  return positions;
}

//나이트 좌표
function knight({ pieces, piece }: { pieces: Piece[]; piece: Piece }) {
  const moves: number[][] = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];
  return getMoves({ pieces, piece, moves });
}

//룩 방향 좌표
function rook({ pieces, piece }: { pieces: Piece[]; piece: Piece }) {
  const directions: number[][] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  return getDirectionalMoves({ pieces, piece, directions });
}

//비숍 방향 좌표
function bishop({ pieces, piece }: { pieces: Piece[]; piece: Piece }) {
  const directions: number[][] = [
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];
  return getDirectionalMoves({ pieces, piece, directions });
}

//퀸 방향 좌표(룩 + 비숍)
function queen({ pieces, piece }: { pieces: Piece[]; piece: Piece }): string[] {
  const rookPositions = rook({ pieces, piece });
  const bishopPostions = bishop({ pieces, piece });
  return [...rookPositions, ...bishopPostions];
}

//킹 좌표
function king({ pieces, piece }: { pieces: Piece[]; piece: Piece }) {
  const moves: number[][] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];
  return getMoves({ pieces, piece, moves });
}
