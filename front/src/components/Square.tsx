import { ReactNode } from "react";

export default function Square({
  children,
  isBlack,
}: {
  children: ReactNode;
  isBlack: boolean;
}) {
  const squareStyle = isBlack ? "square-black" : "square-white";
  return <div className={`${squareStyle} board-square`}>{children}</div>;
}
