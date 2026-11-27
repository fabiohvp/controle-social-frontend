"use client";
import { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  height?: string | number;
  style?: CSSProperties;
};

export default function ChartSkeleton({ className, height = "200px", style }: Props) {
  return (
    <div
      style={{ height, ...style }}
      className={twMerge(
        "w-full rounded bg-gray-50/80 p-3 flex flex-col justify-between animate-pulse border border-gray-100",
        className
      )}
      aria-busy="true"
      aria-label="Carregando gráfico..."
    >
      <div className="flex justify-between items-center mb-2">
        <div className="h-3 w-1/3 bg-gray-200 rounded"></div>
        <div className="h-3 w-12 bg-gray-200 rounded"></div>
      </div>
      <div className="flex-1 flex items-end gap-2 px-1 pb-1 pt-3">
        <div className="h-2/5 flex-1 bg-gray-200 rounded-t"></div>
        <div className="h-3/5 flex-1 bg-gray-200 rounded-t"></div>
        <div className="h-4/5 flex-1 bg-gray-200 rounded-t"></div>
        <div className="h-1/2 flex-1 bg-gray-200 rounded-t"></div>
        <div className="h-3/4 flex-1 bg-gray-200 rounded-t"></div>
        <div className="h-2/3 flex-1 bg-gray-200 rounded-t"></div>
        <div className="h-5/6 flex-1 bg-gray-200 rounded-t"></div>
      </div>
      <div className="h-1.5 w-full bg-gray-200 rounded mt-1.5"></div>
    </div>
  );
}
