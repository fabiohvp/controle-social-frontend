import { KeyValue } from "@/types/KeyValue";
import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { DropdownValue } from "./DropdownValue";
import "./dropdownItem.css";

export type DropdownItem<T> = [string, DropdownValue<T>];

export type DropdownItemRender<T> = KeyValue<string, DropdownValue<T>> & {
  render: (item: DropdownItem<T>, index: number) => ReactNode;
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
