import PanelWithDescription from "@/components/panel/PanelWithDescription";
import MoneyValue from "@/components/values/MoneyValue";
import { formatFloat } from "@/formatters/number";

export type Sumario = {
  /** valor total (receita arrecadada ou despesa liquidada) */
  valor?: number | null;
  participacaoMunicipal?: number | null;
  rankingMunicipal?: number | null;
  perCapita?: number | null;
  participacaoPerCapitaMunicipal?: number | null;
  rankingPerCapitaMunicipal?: number | null;
};

function Linha({ titulo, valor }: { titulo: string; valor: string }) {
  return (
    <div className="flex justify-between gap-2 text-sm text-gray-dark">
      <span>{titulo}</span>
      <strong>{valor}</strong>
    </div>
  );
}

/** `CardReceitasArrecadadas` / `CardDespesaLiquidada` do site oficial */
export default function CardResumo({
  titulo,
  descricao,
  ano,
  sumario,
  className,
}: {
  titulo: string;
  descricao: string;
  ano: number;
  sumario: Sumario | null;
  className?: string;
}) {
  return (
    <PanelWithDescription
      className={className}
      titulo={titulo}
      descricao={descricao}
      bodyProps={{ className: "flex flex-col gap-2 min-h-[120px]" }}
    >
      <div className="text-center">
        <MoneyValue valor={sumario?.valor} ano={ano} />
      </div>
      {sumario?.participacaoMunicipal != null && (
        <Linha
          titulo="Participação municipal"
          valor={`${formatFloat(sumario.participacaoMunicipal)}%`}
        />
      )}
      {sumario?.rankingMunicipal != null && (
        <Linha
          titulo="Ranking municipal"
          valor={`${sumario.rankingMunicipal}°`}
        />
      )}
      {sumario?.perCapita != null && (
        <Linha titulo="Per capita" valor={`R$ ${formatFloat(sumario.perCapita)}`} />
      )}
      {sumario?.participacaoPerCapitaMunicipal != null && (
        <Linha
          titulo="Média municipal"
          valor={`R$ ${formatFloat(sumario.participacaoPerCapitaMunicipal)}`}
        />
      )}
      {sumario?.rankingPerCapitaMunicipal != null && (
        <Linha
          titulo="Ranking municipal (per capita)"
          valor={`${sumario.rankingPerCapitaMunicipal}°`}
        />
      )}
    </PanelWithDescription>
  );
}
