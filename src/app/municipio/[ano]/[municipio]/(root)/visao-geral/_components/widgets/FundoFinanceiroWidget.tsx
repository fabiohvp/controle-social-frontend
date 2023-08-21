import PanelWithTitle from "@/components/panel/PanelWithTitle";
import LegendaTooltip from "@/components/tooltip/LegendaTooltip";
import { formatCurrency } from "@/formatters/number";
import { ENV } from "@/shared/env";
import { getCodigoMunicipio, getMunicipios } from "@/shared/municipio";
import { cache } from "react";
import { MunicipioPageProps, MunicipioPanelProps } from "../../../../routes";

export async function FundoFinanceiroWidget({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  const data = await getData({ ano, municipio });

  return (
    <PanelWithTitle
      bodyProps={{ className: "center flex-col gap-4", style }}
      header="Previdência - Fundo Financeiro"
      legend={
        <LegendaTooltip id="previdencia-fundo-financeiro-tooltip">
          Diferença negativa entre receitas e despesas
          <br />
          previdenciárias, revelando a necessidade de
          <br />
          cobertura de insuficiência financeira por
          <br />
          meio de aporte financeiro do ente federativo.
        </LegendaTooltip>
      }
    >
      <div className="font-bold text-3xl">{formatCurrency(data?.valor)}</div>
      <div className="text-sm">
        Necessidade de cobertura financeira nos próximos 75 anos
      </div>
    </PanelWithTitle>
  );
}

const getData = cache(
  async ({ ano, municipio }: Partial<MunicipioPageProps>) => {
    const municipios = await getMunicipios();
    const codigo = getCodigoMunicipio(municipios, municipio!);
    const res = await fetch(
      `${ENV.apiUrl}/PrevidenciaControllers/Patrimonio/GetNecessidadeCoberturaFinanceira?codigoUnidadeGestora=${codigo}E0900001&anoExercicio=${ano}&v=11-07-2023-5.2.10`
    );
    const data = await res.json();
    return data as { [key: string]: number };
  }
);
