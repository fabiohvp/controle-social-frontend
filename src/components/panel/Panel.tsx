import { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function Panel(props: Props) {
  return (
    <div
      className={`rounded-md border p-[5px] ${props.className ?? ""}`}
      style={props.style}
    >
      {props.children}
    </div>
  );
}
