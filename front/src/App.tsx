import { useEffect, useState } from "react";
import "./App.css";
import { Piece } from "./utils/types";
import Board from "./components/Board";
import api from "./utils/api";
import { sortedData } from "./utils/sort";

function App() {
  const [board, setBoard] = useState<Piece[]>([]);
  const [turn, setTurn] = useState<"b" | "w">("b");
  const [gameState, setGameState] = useState("");

  useEffect(() => {
    fetchBoard();
  }, []);

  //보드 불러오기
  function fetchBoard() {
    api
      .get("/pieces/")
      .then((response) => {
        console.log(sortedData(response.data));
        setBoard(sortedData(response.data));
      })
      .catch((err) => {
        console.error(err);
      });
    console.log(board);
  }

  //초기 상태로 리셋
  async function resetBoard() {
    const confirmed = window.confirm("다시 시작하시겠습니까?");
    if (confirmed) {
      setTurn("b");
      setGameState("");
      try {
        const response = await api.patch("/pieces/reset");
        console.log(response.data);
        fetchBoard();
      } catch (err) {
        console.error(err);
      }
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
          <button className="btn-reset" onClick={resetBoard}>
            재시작
          </button>
        </div>
        <div className="board-container">
          <Board
            board={board}
            setBoard={setBoard}
            setTurn={setTurn}
            setGameState={setGameState}
            turn={turn}
          ></Board>
        </div>
      </div>
    </>
  );
}

export default App;
