import { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onMouseEnter?: (event: React.MouseEvent<HTMLUListElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLUListElement>) => void;
  onTransitionEnd?: (event: React.TransitionEvent<HTMLUListElement>) => void;
};

export function SidebarList(props: Props) {
  return (
    <ul
      className={`${props.className ?? ""}`}
      style={props.style}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onTransitionEnd={props.onTransitionEnd}
    >
      {props.children}
    </ul>
  );
}
