"use client";
import { CSSProperties, ReactNode, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  className?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  headerClassName?: string;
  legend?: ReactNode;
  style?: CSSProperties;
  title: string;
};

export default function PanelWithTitle(props: Props) {
  //TODO: fix animation
  const [open, setOpen] = useState(props.collapsed !== false);

  return (
    <section>
      <h5 className="bg-gray-header border flex items-center justify-between font-normal px-2 py-1 rounded-t-md">
        <span className={props.headerClassName}>{props.title}</span>
        {props.collapsible && (
          <button className="center h-6 w-6" onClick={() => setOpen(!open)}>
            {open ? <FaMinus /> : <FaPlus />}
          </button>
        )}
        {props.legend && <span>{props.legend}</span>}
      </h5>
      <div
        className={twMerge(
          "border-b border-x p-2 overflow-hidden relative rounded-b-md",
          props.className
        )}
        style={{
          ...props.style,
          display: open ? "flex" : "none",
          zIndex: -1,
        }}
      >
        {props.children}
      </div>
    </section>
  );
}
