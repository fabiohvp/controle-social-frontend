import PanelWithTitle from "@/components/panel/PanelWithTitle";
import LegendaTooltip from "@/components/tooltip/LegendaTooltip";
import { formatCurrency } from "@/formatters/number";
import { fetchJson } from "@/shared/api";
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
  const hasValue = data?.valor != null && !Number.isNaN(Number(data.valor));

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
      <div className="font-bold text-3xl">
        {hasValue ? formatCurrency(Number(data!.valor)) : "-"}
      </div>
      <div className="text-sm">
        {hasValue
          ? "Necessidade de cobertura financeira nos próximos 75 anos"
          : "Sem registro de fundo financeiro"}
      </div>
    </PanelWithTitle>
  );
}

const getData = cache(
  async ({ ano, municipio }: Partial<MunicipioPageProps>) => {
    const municipios = await getMunicipios();
    const codigo = getCodigoMunicipio(municipios, municipio!);
    if (!codigo) return null;
    return fetchJson<{ valor?: number; [key: string]: unknown }>(
      `${ENV.apiUrl}/PrevidenciaControllers/Patrimonio/GetNecessidadeCoberturaFinanceira?codigoUnidadeGestora=${codigo}E0900001&anoExercicio=${ano}&v=${ENV.apiVersion}`
    );
  }
);
