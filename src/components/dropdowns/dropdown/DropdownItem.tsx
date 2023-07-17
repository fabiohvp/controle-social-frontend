import { LiHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import "./dropdown-item.css";

type Props = {
  children: ReactNode;
} & LiHTMLAttributes<HTMLLIElement>;

export default function DropdownItem({ className, children, ...props }: Props) {
  return (
    <li className={twMerge("dropdown-item", className)} {...props}>
      {children}
    </li>
  );
}
