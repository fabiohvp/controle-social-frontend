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
import { twMerge } from "tailwind-merge";
import DropdownModal from "./DropdownModal";

type Props = {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  modalClassName?: string;
  title: string;
} & HTMLAttributes<HTMLDivElement>;

function DropdownMenu(
  { children, className, icon, modalClassName, title, ...props }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const [open, setOpen] = useState(false);
  const element = useForwardedRef(ref);

  useClickOutside({ element, toggle: setOpen });

  return (
    <div ref={element} className={twMerge("h-full", className)} {...props}>
      <button className="center gap-1 h-full">
        <span>{icon}</span>
        <span className="hover:text-link">{title}</span>
        {open ? <FaCaretUp /> : <FaCaretDown />}
      </button>
      {open && (
        <DropdownModal className={modalClassName}>{children}</DropdownModal>
      )}
    </div>
  );
}

export default forwardRef<HTMLDivElement, Props>(DropdownMenu);
