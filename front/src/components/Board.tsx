import { useState } from "react";
import api from "../utils/api";
import { Piece } from "../utils/types";
import BoardSquare from "./BoardSquare";
import { sortedData } from "../utils/sort";

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
  const [selectedPosition, setSelectedPosition] = useState("");

  function getXYPosition(i: number) {
    const x = i % 8;
    const y = Math.abs(Math.floor(i / 8) - 7);
    return { x, y };
  }
  function isBlack(i: number) {
    const { x, y } = getXYPosition(i);
    return (x + y) % 2 === 1;
  }

  async function handleClick(position: string) {
    if (selectedPosition.length === 0) {
      setSelectedPosition(position);
      await ready(position); // 처음 선택
    } else if (selectedPosition === position) {
      setSelectedPosition(""); // 같은 칸 클릭 시 선택 해제
      await cancel();
    } else {
      setSelectedPosition(position); // 다른 칸 선택 시
      await cancel(); // 기존 선택 해제
      await ready(position); // 새로운 칸 선택
    }
  }

  async function handleMove(to: string, from: string) {
    setSelectedPosition("");
    console.log("move");
    await move(to, from);
    await cancel();
    setTurn(turn === "b" ? "w" : "b");
  }

  async function handleCapture(to: string, from: string, type: string) {
    setSelectedPosition("");
    console.log("capture");
    await capture(to, from);
    await cancel();
    if (turn === "b") {
      setTurn("w");
      if (type === "k") {
        setGameState("Black Win!");
        setTurn("");
      }
    } else {
      setTurn("b");
      if (type === "k") {
        setGameState("White Win!");
        setTurn("");
      }
    }
  }

  async function ready(position: string) {
    try {
      const response = await api.patch(`/pieces/${position}`);
      setBoard(sortedData(response.data));
    } catch (err) {
      console.error(err);
    }
  }

  async function cancel() {
    try {
      const response = await api.patch("/pieces/cancel");
      setBoard(sortedData(response.data));
    } catch (err) {
      console.error(err);
    }
  }

  async function move(to: string, from: string) {
    try {
      const response = await api.patch(`/pieces/move/${to}/${from}`);
      setBoard(sortedData(response.data));
    } catch (err) {
      console.error(err);
    }
  }

  async function capture(to: string, from: string) {
    try {
      const response = await api.patch(`/pieces/capture/${to}/${from}`);
      setBoard(sortedData(response.data));
    } catch (err) {
      console.error(err);
    }
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
              piece.state === "ready"
                ? handleMove(piece.position, selectedPosition)
                : piece.state === "deathBed"
                ? handleCapture(piece.position, selectedPosition, piece.type)
                : handleClick(piece.position)
            }
          ></BoardSquare>
        </div>
      ))}
    </div>
  );
}
