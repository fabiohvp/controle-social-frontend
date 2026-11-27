import { ReactNode } from "react";

/** Linha secundária dos cards ("Média municipal ........ R$ 35,98M") */
export default function LinhaValor({
  titulo,
  children,
}: {
  titulo: string;
  children: ReactNode;
}) {
  return (
    <div className="flex w-full items-center justify-between gap-2 text-sm text-gray-dark">
      <span>{titulo}</span>
      <span className="font-bold">{children}</span>
    </div>
  );
}
