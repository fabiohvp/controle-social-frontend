import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function DropdownItemLabel({
  children,
  className,
  ...props
}: Props) {
  return (
    <li>
      <div
        className={twMerge(
          "flex h-full items-center overflow-hidden px-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </li>
  );
}
