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
      color: COLOR["chart-negativo"],
      name: "15%",
      value: 0.15,
    },
    {
      color: COLOR["chart-positivo"],
      name: "",
      value: 1,
    },
  ],
  style: { height: "200px" },
  title: "Limite constitucional",
};

export async function SaudeWidget({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  const data = await getData({ ano, municipio });
  const hasValue =
    data?.aplicacaoPercentual != null &&
    !Number.isNaN(Number(data.aplicacaoPercentual));

  return (
    <PanelWithTitle
      bodyProps={{ className: hasValue ? undefined : "center", style }}
      header="Saúde"
      legend={
        <LegendaTooltip id="saude-tooltip">
          A Constituição Federal estabelece que o<br />
          município deve aplicar o limite mínimo de
          <br />
          15% da soma dos recursos de impostos e<br />
          transferências em ações e serviços
          <br />
          públicos de saúde.
        </LegendaTooltip>
      }
    >
      {hasValue ? (
        <GaugeChart
          {...CHART_SETTINGS}
          selectedValue={Number(data!.aplicacaoPercentual) / 100}
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
    return fetchJson<{ aplicacaoPercentual?: number; [key: string]: unknown }>(
      `${ENV.apiUrl}/MunicipioControllers/Saude/GetSumario?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=${ENV.apiVersion}`
    );
  }
);
