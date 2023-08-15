"use client";
import { ReactNode, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import PanelWithTitle, { PainelComTituloProps } from "./PanelWithTitle";

type Props = {
  children: ReactNode;
  collapsed?: boolean;
} & PainelComTituloProps;

export default function PanelWithTitleCollapsible({
  children,
  collapsed,
  headerProps: { className: headerClassName, ...headerProps } = {},
  ...props
}: Props) {
  //TODO: fix animation
  const [open, setOpen] = useState(collapsed !== false);

  return (
    <PanelWithTitle
      button={<>{open ? <FaMinus /> : <FaPlus />}</>}
      collapsed={open}
      headerProps={{
        className: twMerge("cursor-pointer", headerClassName),
        onClick: () => setOpen(!open),
        ...headerProps,
      }}
      {...props}
    >
      {children}
    </PanelWithTitle>
  );
}
