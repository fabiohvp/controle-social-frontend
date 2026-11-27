import { CSSProperties } from "react";

export default function NoDataChart({ style }: { style?: CSSProperties }) {
  return (
    <div
      className="center w-full text-gray-light text-sm"
      style={{ minHeight: "120px", ...style }}
    >
      Informação indisponível
    </div>
  );
}
