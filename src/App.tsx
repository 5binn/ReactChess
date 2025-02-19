import { useEffect, useState } from "react";
import "./App.css";
import { Piece } from "./utils/types";
import Board from "./components/Board";
import { sortedData } from "./utils/sort";
import baseBoard from "./utils/init";

function App() {
  const [board, setBoard] = useState<Piece[]>([]);
  const [turn, setTurn] = useState<"b" | "w" | "">("b");
  const [gameState, setGameState] = useState("");
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    setBoard(sortedData(baseBoard()));
  }, []);

  useEffect(() => {
    console.log("Board Updated:", board);
  }, [board]);

  //초기 상태로 리셋
  async function resetBoard() {
    const confirmed = window.confirm("다시 시작하시겠습니까?");
    if (confirmed) {
      setTurn("b");
      setGameState("");
      setBoard(sortedData(baseBoard()));
    }
  }

  return (
    <>
      <div className="container">
        <div className="btn-container">
          <div className="turn-container">
            <span className="turn-label">차례 : </span>
            <div className={`turn ${turn === "b" ? "black" : "white"}`}></div>
          </div>
          <div className="turn-container">
            <span className="state">{gameState}</span>
          </div>
          <div>
            <button
              className="btn-reset"
              onClick={() => {
                setReverse((prev) => !prev);
              }}
            >
              반전
            </button>
            <button className="btn-reset" onClick={resetBoard}>
              재시작
            </button>
          </div>
        </div>
        <div className="board-container">
          <Board
            board={board}
            setBoard={setBoard}
            setTurn={setTurn}
            setGameState={setGameState}
            turn={turn}
            reverse={reverse}
          ></Board>
        </div>
      </div>
    </>
  );
}

export default App;
