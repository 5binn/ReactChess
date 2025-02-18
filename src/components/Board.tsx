import { useEffect, useState } from "react";
import { Piece } from "../utils/types";
import BoardSquare from "./BoardSquare";
import { getAvailablePositions, getPieceByPosition } from "../utils/logic";

interface BoardProps {
  board: Piece[];
  setBoard: (board: Piece[]) => void;
  setTurn: (turn: "b" | "w" | "") => void;
  turn: "b" | "w" | "";
  setGameState: any;
}

export default function Board({
  board,
  setBoard,
  setTurn,
  turn,
  setGameState,
}: BoardProps) {
  const [selectedPosition, setSelectedPosition] = useState(""); //선택된 좌표
  const [prevBoard, setPrevBoard] = useState<Piece[]>([]); //이전 보드 상태

  // 배열에서 x, y 위치 계산
  function getXYPosition(i: number) {
    const x = i % 8;
    const y = Math.abs(Math.floor(i / 8) - 7);
    return { x, y };
  }
  // 검은색 칸인지 확인
  function isBlack(i: number) {
    const { x, y } = getXYPosition(i);
    return (x + y) % 2 === 1;
  }

  useEffect(() => {
    console.log("Selected Position:", selectedPosition);
    if (selectedPosition) {
      setPrevBoard(board); // 이전 보드 상태 저장
      ready(selectedPosition); // 선택한 좌표에서 준비
    }
  }, [selectedPosition]);

  //클릭 이벤트
  async function handleClick(position: string) {
    if (selectedPosition.length === 0 || selectedPosition === position) {
      setPrevBoard(board);
      setSelectedPosition(selectedPosition.length === 0 ? position : "");
      if (selectedPosition === position) {
        setBoard(prevBoard);
      }
    } else {
      setBoard(prevBoard);
      setPrevBoard(board);
      setSelectedPosition(position);
    }
  }

  //준비 상태 변환
  async function ready(position: string) {
    const piece: Piece | null = getPieceByPosition({ pieces: board, position });
    if (!piece) return;

    const positions = getAvailablePositions({ pieces: board, piece });
    const updatedBoard = board.map((p) => {
      const targetPosition = positions.find(
        (pos) => pos.replace("-", "") === p.position
      );
      if (targetPosition) {
        const isCapture = targetPosition.includes("-");
        return {
          ...p,
          type: isCapture ? p.type : piece.type,
          color: isCapture ? p.color : piece.color,
          state: isCapture ? "deathBed" : "ready",
        };
      }
      return p;
    });

    setBoard(updatedBoard);
  }

  //준비상태에서 이동 가능한 칸 클릭 이벤트
  async function handleMove(
    to: string,
    from: string,
    type: string | null,
    state: string
  ) {
    setSelectedPosition("");
    await move(to, from, state);
    if (turn === "b") {
      setTurn("w");
      if (type === "k" && state === "deathBed") {
        setGameState("Black Win!");
        setTurn("");
      }
    } else {
      setTurn("b");
      if (type === "k" && state === "deathBed") {
        setGameState("White Win!");
        setTurn("");
      }
    }
  }

  //이동시킨 보드 반환
  async function move(to: string, from: string, state: string) {
    const toPiece = getPieceByPosition({ pieces: board, position: to });
    const fromPiece = getPieceByPosition({ pieces: board, position: from });

    const updatedBoard = board.map((p) => {
      if (p.position === to) {
        return {
          ...p,
          type:
            state === "ready" ? toPiece?.type ?? null : fromPiece?.type ?? null,
          color:
            state === "ready"
              ? toPiece?.color ?? null
              : fromPiece?.color ?? null,
          state: "alive",
        };
      }
      if (p.position === from || p.state === "ready") {
        return {
          ...p,
          type: null,
          color: null,
          state: null,
        };
      }
      if (p.state === "deathBed") {
        return {
          ...p,
          state: "alive",
        };
      }
      return p;
    });
    setBoard(updatedBoard);
  }

  return (
    <div className="board">
      {board.map((piece) => (
        <div key={piece.id} className="square">
          <BoardSquare
            piece={piece}
            turn={turn}
            isBlack={isBlack(piece.id - 1)}
            onclick={() =>
              piece.state === "ready" || piece.state === "deathBed"
                ? handleMove(
                    piece.position,
                    selectedPosition,
                    piece.type,
                    piece.state
                  )
                : handleClick(piece.position)
            }
          ></BoardSquare>
        </div>
      ))}
    </div>
  );
}
