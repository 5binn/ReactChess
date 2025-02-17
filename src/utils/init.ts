import { Piece } from "./types";

export default function baseBoard() {
  const board = [];
  let id = 0;

  for (let i = 0; i < 8; i++) {
    let position = String.fromCharCode(97 + i);
    for (let j = 1; j <= 8; j++) {
      let type = null;
      let color = null;
      let state: string | null = "alive";
      switch (j) {
        case 1:
        case 2:
          {
            color = "w";
            if (j == 2) {
              type = "p";
            } else {
              type = getPieceType(position);
            }
          }
          break;
        case 7:
        case 8:
          {
            color = "b";
            if (j == 7) {
              type = "p";
            } else {
              type = getPieceType(position);
            }
          }
          break;
        default: {
          state = null;
        }
      }
      let piece: Piece = {
        id: ++id,
        position: position + j,
        type: type,
        color: color,
        state: state,
      };
      board.push(piece);
    }
  }

  return board;
}

function getPieceType(position: string): string | null {
  let type = null;
  switch (position) {
    case "a":
    case "h":
      type = "r";
      break; //룩
    case "b":
    case "g":
      type = "n";
      break; // 나이트
    case "c":
    case "f":
      type = "b";
      break; // 비숍
    case "d":
      type = "q";
      break; // 퀸
    case "e":
      type = "k";
      break; // 킹
    default:
      type = null;
  }
  return type;
}
