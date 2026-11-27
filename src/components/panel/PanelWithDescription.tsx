"use client";
import LegendaTooltip from "@/components/tooltip/LegendaTooltip";
import { HTMLAttributes, ReactNode, useId } from "react";
import { twMerge } from "tailwind-merge";
import PanelWithTitle from "./PanelWithTitle";

type Props = {
  titulo: string;
  /** texto do ícone "i" no cabeçalho (o "popover" dos cards do site oficial) */
  descricao?: ReactNode;
  bodyProps?: HTMLAttributes<HTMLDivElement>;
  children: ReactNode;
  className?: string;
};

/** Card padrão das páginas de município/estado: título + descrição em tooltip */
export default function PanelWithDescription({
  titulo,
  descricao,
  bodyProps: { className: bodyClassName, ...bodyProps } = {},
  children,
  className,
}: Props) {
  const id = useId();

  return (
    <PanelWithTitle
      className={twMerge("flex flex-col", className)}
      bodyProps={{
        className: twMerge("grow", bodyClassName),
        ...bodyProps,
      }}
      header={titulo}
      legend={
        descricao && (
          <LegendaTooltip id={`descricao-${id}`}>
            <div className="max-w-xs">{descricao}</div>
          </LegendaTooltip>
        )
      }
    >
      {children}
    </PanelWithTitle>
  );
}
