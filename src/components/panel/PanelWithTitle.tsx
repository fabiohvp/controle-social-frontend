"use client";
import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type PanelWithTitleProps = {
  bodyProps?: HTMLAttributes<HTMLDivElement>;
  children: ReactNode;
  collapsed?: boolean;
  header: string;
  headerProps?: HTMLAttributes<HTMLSpanElement>;
  legend?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function PanelWithTitle({
  bodyProps: { className: bodyClassName, ...bodyProps } = {},
  children,
  className,
  collapsed = true,
  header,
  headerProps: { className: headerClassName, ...headerProps } = {},
  legend,
  style,
  ...props
}: PanelWithTitleProps) {
  return (
    <section className={twMerge("flex flex-col", className)} {...props}>
      <h5
        className={twMerge(
          "bg-gray-header border flex justify-between font-normal px-2 py-1 rounded-t-md",
          headerClassName
        )}
        {...headerProps}
      >
        <span {...headerProps}>{header}</span>
        {legend && <span>{legend}</span>}
      </h5>
      {collapsed && (
        <div
          className={twMerge(
            "border-b border-x flex p-2 overflow-hidden relative rounded-b-md -z-10",
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
