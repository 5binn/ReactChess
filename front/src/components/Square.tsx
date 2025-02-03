import { ReactNode } from "react";

interface SquareProps {
  children: ReactNode;
  isBlack: boolean;
}

export default function Square({ children, isBlack }: SquareProps) {
  const squareStyle = isBlack ? "square-black" : "square-white";
  return <div className={`${squareStyle} board-square`}>{children}</div>;
}
