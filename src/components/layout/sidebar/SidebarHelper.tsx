import { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function SidebarList(props: Props) {
  return (
    <ul className={`${props.className ?? ""}`} style={props.style}>
      {props.children}
    </ul>
  );
}
