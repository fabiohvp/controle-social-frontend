import GaugeChart from "@/components/charts/GaugeChart";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import LegendaTooltip from "@/components/tooltip/LegendaTooltip";
import { fetchJson } from "@/shared/api";
import { ENV } from "@/shared/env";
import { getCodigoMunicipio, getMunicipios } from "@/shared/municipio";
import { COLOR } from "@/theme/colors";
import { cache } from "react";
import { MunicipioPageProps, MunicipioPanelProps } from "../../../../routes";

const CHART_SETTINGS = {
  items: [
    {
      color: COLOR["chart-positivo"],
      name: "54%",
      value: 0.54,
    },
    {
      color: COLOR["chart-info"],
      name: "57%",
      value: 0.57,
    },
    {
      color: COLOR["chart-alerta"],
      name: "60%",
      value: 0.6,
    },
    {
      color: COLOR["chart-negativo"],
      name: "",
      value: 1,
    },
  ],
  style: { height: "200px" },
  title: "Limite LRF",
};

export async function PessoalConsolidadoWidget({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  const data = await getData({ ano, municipio });
  const hasValue =
    data?.valorPercentual != null && !Number.isNaN(Number(data.valorPercentual));

  return (
    <PanelWithTitle
      bodyProps={{ className: hasValue ? undefined : "center", style }}
      header="Pessoal - Consolidado"
      legend={
        <LegendaTooltip id="pessoal-consolidado-tooltip">
          De acordo com a LRF (Lei de Responsabilidade
          <br />
          Fiscal) as despesas com pessoal nos municípios
          <br />
          não podem ultrapassar 60% da RCL (Receita
          <br />
          Corrente Líquida) do Município.
          <br />
          Caso esses gastos atinjam 57% da RCL o município
          <br />
          entra no limite prudencial.
          <br />
          Caso esses gastos atinjam 54% da RCL o Tribunal
          <br />
          de Contas emitirá parecer de alerta.
        </LegendaTooltip>
      }
    >
      {hasValue ? (
        <GaugeChart
          {...CHART_SETTINGS}
          selectedValue={Number(data!.valorPercentual) / 100}
        />
      ) : (
        <div className="m-auto opacity-60 text-sm">Sem dados</div>
      )}
    </PanelWithTitle>
  );
}

const getData = cache(
  async ({ ano, municipio }: Partial<MunicipioPageProps>) => {
    const municipios = await getMunicipios();
    const codigo = getCodigoMunicipio(municipios, municipio!);
    if (!codigo) return null;
    return fetchJson<{ valorPercentual?: number; [key: string]: unknown }>(
      `${ENV.apiUrl}/MunicipioControllers/PessoalConsolidado/GetSumario?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=${ENV.apiVersion}`
    );
  }
);
