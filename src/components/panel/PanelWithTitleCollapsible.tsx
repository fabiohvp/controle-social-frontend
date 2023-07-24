"use client";
import { ReactNode, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import PanelWithTitle, { PanelWithTitleProps } from "./PanelWithTitle";

type Props = {
  children: ReactNode;
  collapsed?: boolean;
} & PanelWithTitleProps;

export default function PanelWithTitleCollapsible({
  children,
  collapsed,
  ...props
}: Props) {
  //TODO: fix animation
  const [open, setOpen] = useState(collapsed !== false);

  return (
    <div className="relative">
      <button
        className="absolute center h-6 w-6 right-2 top-2"
        onClick={() => setOpen(!open)}
      >
        {open ? <FaMinus /> : <FaPlus />}
      </button>
      <PanelWithTitle collapsed={open} {...props}>
        {children}
      </PanelWithTitle>
    </div>
  );
}

//  return (
//    <section {...props}>
//      <h5 className="bg-gray-header border flex items-center justify-between font-normal px-2 py-1 rounded-t-md">
//        <span className={headerClassName}>{title}</span>
//        <button className="center h-6 w-6" onClick={() => setOpen(!open)}>
//          {open ? <FaMinus /> : <FaPlus />}
//        </button>
//        {legend && <span>{legend}</span>}
//      </h5>
//      <div
//        className={twMerge(
//          "border-b border-x p-2 overflow-hidden relative rounded-b-md",
//          className
//        )}
//        style={{
//          ...style,
//          display: open ? "flex" : "none",
//        }}
//      >
//        {children}
//      </div>
//    </section>
//  );
