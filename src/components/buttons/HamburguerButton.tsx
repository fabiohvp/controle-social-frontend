"use client";
import { CommonBurgerProps, Turn as Hamburger } from "hamburger-react";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  hamburguer: CommonBurgerProps;
} & HTMLAttributes<HTMLDivElement>;

export default function HamburguerButton({
  className,
  hamburguer,
  ...props
}: Props) {
  return (
    <div className={twMerge("cursor-pointer", className)} {...props}>
      <Hamburger {...hamburguer} />
    </div>
  );
}
