"use client";
import { useState } from "react";
import "./hambuguer-button.css";

type Props = {
  className?: string;
};

export default function HamburguerButton(props: Props) {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`hamburguer-button ${active ? "active" : ""} ${
        props.className ?? ""
      }`}
      onClick={() => setActive(!active)}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
