import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function DropdownItemLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <li>
      <div
        className={twMerge(
          "flex h-full items-center overflow-hidden px-2",
          className
        )}
      >
        {children}
      </div>
    </li>
  );
}
