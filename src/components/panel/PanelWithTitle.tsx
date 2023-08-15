"use client";
import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type PainelComTituloProps = {
  bodyProps?: HTMLAttributes<HTMLDivElement>;
  button?: ReactNode;
  children: ReactNode;
  collapsed?: boolean;
  header: string;
  headerProps?: HTMLAttributes<HTMLSpanElement>;
  legend?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function PanelWithTitle({
  bodyProps: { className: bodyClassName, ...bodyProps } = {},
  button,
  children,
  collapsed = true,
  header,
  headerProps: { className: headerClassName, ...headerProps } = {},
  legend,
  ...props
}: PainelComTituloProps) {
  return (
    <section {...props}>
      <h5
        className={twMerge(
          "bg-gray-header border flex items-center justify-between font-normal px-2 py-1 rounded-t-md",
          collapsed ? "" : "rounded-md",
          headerClassName
        )}
        {...headerProps}
      >
        <span>{header}</span>
        {legend && <span>{legend}</span>}
        {button && <span>{button}</span>}
      </h5>
      {collapsed && (
        <div
          className={twMerge(
            "border-b border-x flex p-2 overflow-hidden relative rounded-b-md",
            bodyClassName
          )}
          {...bodyProps}
        >
          {children}
        </div>
      )}
    </section>
  );
}
