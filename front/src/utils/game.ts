import { Piece } from "./types";

export function readyToMove(
  board: (Piece | null)[][],
  from: string
): (Piece | null)[][] {
  const position = getIndex(from);
  console.log(position);
  const piece = board[position[0]][position[1]];
  console.log(piece);
  switch (piece?.type) {
    case "p":
      return pawn(board, from);
    case "r":
      return rook(board, from);
    case "n":
      return knignt(board, from);
    case "b":
      return bishop(board, from);
    case "q":
      return queen(board, from);
    case "k":
      return king(board, from);
    default:
      return board;
  }
}

export function move(board: (Piece | null)[][], from: string, to: string) {
  const fromPosition = getIndex(from);
  const toPosition = getIndex(to);
  const piece = board[fromPosition[0]][fromPosition[1]];
  const newBoard = board.map((row) => [...row]);
  newBoard[fromPosition[0]][fromPosition[1]] = null;
  newBoard[toPosition[0]][toPosition[1]] = piece;
  return newBoard;
}

export function getIndex(position: string) {
  const x = 8 - Number(position.charAt(1));
  const y = position.charAt(0).charCodeAt(0) - "a".charCodeAt(0);
  return [x, y];
}

function isValidPosition(x: number, y: number): boolean {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function exchangeReady(piece: Piece) {
  return {
    type: piece.type,
    color: piece.color,
    state: "ready",
  };
}

function pawn(board: (Piece | null)[][], from: string) {
  const position = getIndex(from);
  const piece = board[position[0]][position[1]];
  const newBoard = board.map((row) => [...row]);
  if (piece?.color === "b") {
    if (
      isValidPosition(position[0] - 1, position[1]) &&
      board[position[0] - 1][position[1]] === null
    ) {
      newBoard[position[0] - 1][position[1]] = exchangeReady(piece);
    }
    if (
      position[0] === 6 &&
      isValidPosition(position[0] - 2, position[1]) &&
      board[position[0] - 2][position[1]] === null
    ) {
      newBoard[position[0] - 2][position[1]] = exchangeReady(piece);
    }
  }
  if (piece?.color === "w") {
    if (
      isValidPosition(position[0] + 1, position[1]) &&
      board[position[0] + 1][position[1]] === null
    ) {
      newBoard[position[0] + 1][position[1]] = exchangeReady(piece);
    }
    if (
      position[0] === 1 &&
      isValidPosition(position[0] + 2, position[1]) &&
      board[position[0] + 2][position[1]] === null
    ) {
      newBoard[position[0] + 2][position[1]] = exchangeReady(piece);
    }
  }
  return newBoard;
}

function knignt(board: (Piece | null)[][], from: string) {
  const position = getIndex(from);
  const piece = board[position[0]][position[1]];
  const newBoard = board.map((row) => [...row]);

  const moves = [
    [position[0] - 2, position[1] - 1],
    [position[0] - 2, position[1] + 1],
    [position[0] - 1, position[1] - 2],
    [position[0] - 1, position[1] + 2],
    [position[0] + 1, position[1] - 2],
    [position[0] + 1, position[1] + 2],
    [position[0] + 2, position[1] - 1],
    [position[0] + 2, position[1] + 1],
  ];

  moves.forEach(([x, y]) => {
    if (isValidPosition(x, y) && board[x][y] === null) {
      newBoard[x][y] = exchangeReady(piece!);
    }
  });
  return newBoard;
}

function rook(board: (Piece | null)[][], from: string) {
  const position = getIndex(from);
  const piece = board[position[0]][position[1]];
  const newBoard = board.map((row) => [...row]);

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  directions.forEach(([dx, dy]) => {
    let x = position[0];
    let y = position[1];
    while (isValidPosition(x + dx, y + dy)) {
      x += dx;
      y += dy;
      if (board[x][y] === null) {
        newBoard[x][y] = exchangeReady(piece!);
      } else if (board[x][y]?.color !== piece!.color) {
        newBoard[x][y] = exchangeReady(piece!);
        break;
      } else {
        break;
      }
    }
  });

  return newBoard;
}

function bishop(board: (Piece | null)[][], from: string) {
  const position = getIndex(from);
  const piece = board[position[0]][position[1]];
  const newBoard = board.map((row) => [...row]);

  const directions = [
    [1, 1], // 대각선 오른쪽 아래
    [-1, -1], // 대각선 왼쪽 위
    [1, -1], // 대각선 왼쪽 아래
    [-1, 1], // 대각선 오른쪽 위
  ];

  directions.forEach(([dx, dy]) => {
    let x = position[0];
    let y = position[1];
    while (isValidPosition(x + dx, y + dy)) {
      x += dx;
      y += dy;
      if (board[x][y] === null) {
        newBoard[x][y] = exchangeReady(piece!);
      } else if (board[x][y]?.color !== piece!.color) {
        newBoard[x][y] = exchangeReady(piece!);
        break;
      } else {
        break;
      }
    }
  });

  return newBoard;
}

function queen(board: (Piece | null)[][], from: string) {
  // 퀸은 룩과 비숍의 이동을 모두 포함
  const rookMoves = rook(board, from);
  const bishopMoves = bishop(board, from);

  // 룩과 비숍 이동 결과를 합친다
  return board.map((row, i) =>
    row.map((cell, j) => rookMoves[i][j] || bishopMoves[i][j] || cell)
  );
}

function king(board: (Piece | null)[][], from: string) {
  const position = getIndex(from);
  const piece = board[position[0]][position[1]];
  const newBoard = board.map((row) => [...row]);

  const moves = [
    [1, 0], // 아래
    [-1, 0], // 위
    [0, 1], // 오른쪽
    [0, -1], // 왼쪽
    [1, 1], // 대각선 오른쪽 아래
    [-1, -1], // 대각선 왼쪽 위
    [1, -1], // 대각선 왼쪽 아래
    [-1, 1], // 대각선 오른쪽 위
  ];

  moves.forEach(([dx, dy]) => {
    const x = position[0] + dx;
    const y = position[1] + dy;
    if (isValidPosition(x, y)) {
      if (board[x][y] === null || board[x][y]?.color !== piece!.color) {
        newBoard[x][y] = exchangeReady(piece!);
      }
    }
  });

  return newBoard;
}
