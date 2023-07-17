"use client";
import useClickOutside from "@/hooks/useClickOutside";
import useForwardedRef from "@/hooks/useForwardedRef";
import {
  ForwardedRef,
  HTMLAttributes,
  ReactNode,
  forwardRef,
  useState,
} from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import DropdownModal from "./DropdownModal";

type Props = {
  children: ReactNode;
  icon?: ReactNode;
  modalClassName?: string;
  title: string;
} & HTMLAttributes<HTMLDivElement>;

function DropdownMenu(
  { children, icon, modalClassName, title, ...props }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const [active, setActive] = useState(false);
  const element = useForwardedRef(ref);

  useClickOutside({ element, toggle: setActive });

  return (
    <div ref={element} {...props}>
      <button className="center gap-1">
        <span>{icon}</span>
        <span className="hover:text-link">{title}</span>
        {active ? <FaCaretUp /> : <FaCaretDown />}
      </button>
      {active && (
        <DropdownModal className={modalClassName}>{children}</DropdownModal>
      )}
    </div>
  );
}

export default forwardRef<HTMLDivElement, Props>(DropdownMenu);
