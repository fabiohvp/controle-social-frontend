import { CSSProperties } from "react";

type Props = {
  children: JSX.Element | JSX.Element[];
  className?: string;
  style?: CSSProperties;
};

export default function Panel(props: Props) {
  return (
    <span
      className={`panel rounded-md border p-[5px] ${props.className ?? ""}`}
      style={props.style}
    >
      {props.children}
    </span>
  );
}
