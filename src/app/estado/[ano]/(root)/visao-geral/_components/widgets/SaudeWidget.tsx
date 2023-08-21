import { EstadoPageProps, EstadoPanelProps } from "@/app/estado/[ano]/routes";
import GaugeChart from "@/components/charts/GaugeChart";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import LegendaTooltip from "@/components/tooltip/LegendaTooltip";
import { ENV } from "@/shared/env";
import { COLOR } from "@/theme/colors";
import { cache } from "react";

const CHART_SETTINGS = {
  items: [
    {
      color: COLOR["chart-positivo"],
      name: "15%",
      value: 0.15,
    },
    {
      color: COLOR["chart-negativo"],
      name: "",
      value: 1,
    },
  ],
  style: { height: "200px" },
  title: "Limite constitucional",
};

const getData = cache(async ({ ano }: Partial<EstadoPageProps>) => {
  const codigo = "001";
  const res = await fetch(
    `${ENV.apiUrl}/MunicipioControllers/Saude/GetSumario?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=11-07-2023-5.2.10`
  );
  const data = await res.json();
  return data as { [key: string]: number };
});

export async function SaudeWidget({ ano, style }: EstadoPanelProps) {
  const data = await getData({ ano });

  return (
    <PanelWithTitle
      bodyProps={{ style }}
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
      <GaugeChart
        {...CHART_SETTINGS}
        selectedValue={data.aplicacaoPercentual / 100}
      />
    </PanelWithTitle>
  );
}
