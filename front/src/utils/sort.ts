import { Piece } from "./types";

//position으로 정렬
export function sortedData(data: Piece[]) {
  return data.sort((a: Piece, b: Piece) => {
    const fileA = a.position[0];
    const rankA = parseInt(a.position.slice(1));

    const fileB = b.position[0];
    const rankB = parseInt(b.position.slice(1));

    if (fileA === fileB) {
      return rankA - rankB;
    } else {
      return fileA.localeCompare(fileB);
    }
  });
}
