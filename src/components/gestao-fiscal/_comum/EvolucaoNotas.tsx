import PanelWithDescription from "@/components/panel/PanelWithDescription";
import { SerieItem } from "@/types/Serie";
import NotaCirculo from "./NotaCirculo";

/**
 * Evolução de uma nota A-D (CAPAG) em círculos por período; o valor numérico
 * da API vem com a letra em `displayValue`.
 */
export default function EvolucaoNotas({
  titulo,
  descricao,
  dados,
  className,
}: {
  titulo: string;
  descricao?: string;
  dados: SerieItem[] | null;
  className?: string;
}) {
  return (
    <PanelWithDescription
      titulo={titulo}
      descricao={descricao}
      className={className}
      bodyProps={{ className: "items-center justify-center" }}
    >
      {dados?.length ? (
        <ol className="flex flex-wrap justify-center gap-3">
          {dados.map((item) => (
            <li
              key={`${item.ano}-${item.nome}`}
              className="flex flex-col items-center gap-1 text-xs text-gray-dark"
            >
              <NotaCirculo nota={item.displayValue} tamanho={36} />
              <span>{item.nome}</span>
            </li>
          ))}
        </ol>
      ) : (
        <span className="text-gray-medium text-sm">Informação indisponível</span>
      )}
    </PanelWithDescription>
  );
}
