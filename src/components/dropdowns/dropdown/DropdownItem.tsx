import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import "./dropdown-item.css";

type Props = {
  children: ReactNode;
  itemKey?: string;
} & HTMLAttributes<HTMLLIElement>;

export default function DropdownItem({
  className,
  children,
  itemKey,
  ...props
}: Props) {
  return (
    <li
      key={itemKey}
      className={twMerge("dropdown-item", className)}
      {...props}
    >
      {children}
    </li>
  );
}
