import PanelWithDescription from "@/components/panel/PanelWithDescription";
import MoneyValue from "@/components/values/MoneyValue";
import { ReactNode } from "react";

export type EtiquetaPrevidencia = {
  titulo: string;
  valor: number | null | undefined;
};

type Props = {
  titulo: string;
  descricao: ReactNode;
  anoExercicio: number;
  etiquetas: EtiquetaPrevidencia[];
};

/** "Receitas/Despesas em destaque": um valor por etiqueta (natureza de receita/despesa) */
export default function Etiquetas({
  titulo,
  descricao,
  anoExercicio,
  etiquetas,
}: Props) {
  return (
    <PanelWithDescription titulo={titulo} descricao={descricao}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {etiquetas.map((etiqueta) => (
          <div
            key={etiqueta.titulo}
            className="center flex-col gap-1 py-2 text-center"
          >
            <span className="text-gray-dark text-sm">{etiqueta.titulo}</span>
            <MoneyValue valor={etiqueta.valor} ano={anoExercicio} />
          </div>
        ))}
      </div>
    </PanelWithDescription>
  );
}
