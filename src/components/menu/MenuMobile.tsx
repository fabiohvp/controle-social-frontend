import { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  style?: CSSProperties;
};

export default function MenuMobile(props: Props) {
  return (
    <div
      className={twMerge(
        "bg-gray-200 center h-screen menu-mobile overflow-y-auto p-4",
        props.className
      )}
      style={props.style}
    >
      <ul>
        <li>Serra</li>
        <li>Municípios</li>
      </ul>
    </div>
  );
}
