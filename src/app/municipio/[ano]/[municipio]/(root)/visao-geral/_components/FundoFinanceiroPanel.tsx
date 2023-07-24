import PanelWithTitle from "@/components/panel/PanelWithTitle";
import LegendTooltip from "@/components/tooltip/LegendTooltip";
import { formatCurrency } from "@/formatters/number";
import { getCodigoMunicipio } from "@/shared/municipio";
import { cache } from "react";
import {
  MunicipioPageProps,
  MunicipioPanelProps,
} from "../../../MunicipioPageProps";

const getData = cache(async ({ ano, municipio }: MunicipioPageProps) => {
  const codigo = getCodigoMunicipio(municipio);
  const res = await fetch(
    `https://paineldecontrole.tcees.tc.br/api/PrevidenciaControllers/Patrimonio/GetNecessidadeCoberturaFinanceira?codigoUnidadeGestora=${codigo}E0900001&anoExercicio=${ano}&v=11-07-2023-5.2.10`
  );
  const data = await res.json();
  return data as { [key: string]: number };
});

export async function FundoFinanceiroPanel({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  const data = await getData({ ano, municipio });

  return (
    <PanelWithTitle
      bodyProps={{ className: "center flex-col gap-4", style }}
      legend={
        <LegendTooltip id="previdencia-fundo-financeiro-tooltip">
          Diferença negativa entre receitas e despesas
          <br />
          previdenciárias, revelando a necessidade de
          <br />
          cobertura de insuficiência financeira por
          <br />
          meio de aporte financeiro do ente federativo.
        </LegendTooltip>
      }
      header="Previdência - Fundo Financeiro"
    >
      <div className="font-bold text-3xl">{formatCurrency(data?.valor)}</div>
      <div className="text-sm">
        Necessidade de cobertura financeira nos próximos 75 anos
      </div>
    </PanelWithTitle>
  );
}
