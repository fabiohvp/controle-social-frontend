import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

/** Título de bloco de uma página (o "TituloSecao" com linha do site oficial) */
export default function SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={twMerge(
        "border-b border-gray-300 col-span-full pb-1 text-lg text-blue-dark",
        className
      )}
    >
      {children}
    </h2>
  );
}
