"use client";
import {
  ButtonHTMLAttributes,
  ForwardedRef,
  forwardRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import "./hambuguer-button.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

function HamburguerButton(
  { ...props }: Props,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const [active, setActive] = useState(false);

  return (
    <button
      ref={ref}
      className={twMerge(
        "hamburguer-button",
        active ? "active" : "",
        props.className
      )}
      onClick={() => setActive(!active)}
      {...props}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}

export default forwardRef<HTMLButtonElement, Props>(HamburguerButton);
