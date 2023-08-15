import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ThemeKey = "danger" | "info" | "success" | "warning";
type ThemeValue = {
  background: string;
  border: string;
  text: string;
};

const THEME: { [key in ThemeKey]: ThemeValue } = {
  danger: {
    background: "bg-red-100",
    border: "border-red-500",
    text: "text-red-700",
  },
  info: {
    background: "bg-sky-100",
    border: "border-sky-500",
    text: "text-sky-700",
  },
  success: {
    background: "bg-green-100",
    border: "border-green-500",
    text: "text-green-700",
  },
  warning: {
    background: "bg-orange-100",
    border: "border-orange-500",
    text: "text-orange-700",
  },
};

type Props = {
  children: ReactNode;
  type: ThemeKey;
} & HTMLAttributes<HTMLDivElement>;

export default function AlertPanel({
  children,
  className,
  type,
  ...props
}: Props) {
  return (
    <div
      className={twMerge(
        `border-l-4 p-2 min-h-[120px] md:max-h-full overflow-y-auto md:min-h-unset md:overflow-unset ${THEME[type].background} ${THEME[type].border} ${THEME[type].text}`,
        className
      )}
      role="alert"
      {...props}
    >
      {children}
    </div>
  );
}
