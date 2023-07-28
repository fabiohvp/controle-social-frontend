import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import "./listaCircular.css";

type Props = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLUListElement>;

export default function ListaCircular({
  className,
  children,
  ...props
}: Props) {
  return (
    <ul className={twMerge("circle-list", className)} {...props}>
      {children}
    </ul>
  );
}
