import DoughnutChart from "@/components/charts/DoughnutChart";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import LegendTooltip from "@/components/tooltip/LegendTooltip";
import { COLOR } from "@/theme/colors";
import { cache } from "react";
import { EstadoPageProps, EstadoPanelProps } from "../../../EstadoPageProps";

const CHART_SETTINGS = {
  items: [
    {
      color: COLOR["chart-positivo"],
      title: "15%",
      value: 0.15,
    },
    {
      color: COLOR["chart-negativo"],
      title: "",
      value: 1,
    },
  ],
  style: { height: "200px" },
  title: "Limite constitucional",
};

const getData = cache(async ({ ano }: EstadoPageProps) => {
  const codigo = "001";
  const res = await fetch(
    `https://paineldecontrole.tcees.tc.br/api/MunicipioControllers/Saude/GetSumario?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=11-07-2023-5.2.10`
  );
  const data = await res.json();
  return data as { [key: string]: number };
});

export async function SaudePanel({ ano, style }: EstadoPanelProps) {
  const data = await getData({ ano });

  return (
    <PanelWithTitle
      bodyProps={{ style }}
      legend={
        <LegendTooltip id="saude-tooltip">
          A Constituição Federal estabelece que o<br />
          município deve aplicar o limite mínimo de
          <br />
          15% da soma dos recursos de impostos e<br />
          transferências em ações e serviços
          <br />
          públicos de saúde.
        </LegendTooltip>
      }
      header="Educação"
    >
      <DoughnutChart
        {...CHART_SETTINGS}
        selectedValue={data.aplicacaoPercentual / 100}
      />
    </PanelWithTitle>
  );
}
