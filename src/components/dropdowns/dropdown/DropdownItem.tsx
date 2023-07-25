import { KeyValue } from "@/types/KeyValue";
import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import "./dropdownItem.css";

export type DropdownItemRender<T> = KeyValue<string, T> & {
  render: (item: KeyValue<string, T>, index: number) => ReactNode;
};

type Props = {
  children: ReactNode;
} & HTMLAttributes<HTMLLIElement>;

export default function DropdownItem({ className, children, ...props }: Props) {
  return (
    <li className={twMerge("dropdown-item", className)} {...props}>
      {children}
    </li>
  );
}
