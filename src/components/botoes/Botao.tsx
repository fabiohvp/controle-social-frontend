import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import "./botao.css";

export type BotaoProps = HTMLAttributes<HTMLButtonElement>;

export default function Botao({ children, className, ...props }: BotaoProps) {
  return (
    <button
      className={twMerge("botao px-2 py-1 rounded-sm text-sm", className)}
      {...props}
    >
      {children}
    </button>
  );
}
