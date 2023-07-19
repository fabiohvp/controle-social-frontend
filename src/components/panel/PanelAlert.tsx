"use client";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ThemeKey = "danger" | "info" | "success" | "warning";
type ThemeValue = {
  background: string;
  border: string;
  text: string;
};

type Props = {
  children: ReactNode;
  className?: string;
  type: ThemeKey;
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

export default function PanelAlert(props: Props) {
  return (
    <div
      className={twMerge(
        `border-l-4 p-4 ${THEME[props.type].background} ${
          THEME[props.type].border
        } ${THEME[props.type].text}`,
        props.className
      )}
      role="alert"
    >
      {props.children}
    </div>
  );
}
