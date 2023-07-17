import { ReactNode } from "react";
import "./dropdown-modal.css";

type Props = {
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

export default function DropdownModal(props: Props) {
  return (
    <div className="dropdown-modal" onClick={props.onClick}>
      {props.children}
    </div>
  );
}
