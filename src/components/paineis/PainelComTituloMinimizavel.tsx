"use client";
import { ReactNode, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import PainelComTitulo, { PainelComTituloProps } from "./PainelComTitulo";

type Props = {
  children: ReactNode;
  collapsed?: boolean;
} & PainelComTituloProps;

export default function PainelComTituloMinimizavel({
  children,
  collapsed,
  headerProps: { className: headerClassName, ...headerProps } = {},
  ...props
}: Props) {
  //TODO: fix animation
  const [open, setOpen] = useState(collapsed !== false);

  return (
    <PainelComTitulo
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
    </PainelComTitulo>
  );
}
