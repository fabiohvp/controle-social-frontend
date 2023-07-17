import { ForwardedRef, HTMLAttributes, ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import "./dropdown-modal.css";

type Props = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

function DropdownModal(
  { className, children, ...props }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div ref={ref} className={twMerge("dropdown-modal", className)} {...props}>
      {children}
    </div>
  );
}

export default forwardRef<HTMLDivElement, Props>(DropdownModal);
