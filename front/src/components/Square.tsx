import { ReactNode } from "react";

interface SquareProps {
  children: ReactNode;
  isBlack: boolean;
}

//보드판 흑백 생성
export default function Square({ children, isBlack }: SquareProps) {
  const squareStyle = isBlack ? "square-black" : "square-white";
  return <div className={`${squareStyle} board-square`}>{children}</div>;
}
