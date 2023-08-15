import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function Panel({ children, className, ...props }: Props) {
  return (
    <div className={twMerge("rounded-md border p-[5px]", className)} {...props}>
      {children}
    </div>
  );
}
