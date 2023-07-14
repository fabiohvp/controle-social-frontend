"use client";
import { CSSProperties, useState } from "react";
import "./hambuguer-button.css";

type Props = {
  className?: string;
  style?: CSSProperties;
};

export default function HamburguerButton(props: Props) {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`hamburguer-button ${active ? "active" : ""} ${
        props.className ?? ""
      }`}
      style={props.style}
      onClick={() => setActive(!active)}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
