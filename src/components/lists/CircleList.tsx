import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import "./circleList.css";

type Props = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLUListElement>;

export default function CircleList({ className, children, ...props }: Props) {
  return (
    <ul className={twMerge("circle-list", className)} {...props}>
      {children}
    </ul>
  );
}
