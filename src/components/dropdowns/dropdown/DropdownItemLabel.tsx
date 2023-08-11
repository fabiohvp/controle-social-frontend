import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  disabled?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export default function DropdownItemLabel({
  children,
  className,
  disabled,
  ...props
}: Props) {
  return (
    <li className={disabled ? "opacity-60" : ""}>
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
