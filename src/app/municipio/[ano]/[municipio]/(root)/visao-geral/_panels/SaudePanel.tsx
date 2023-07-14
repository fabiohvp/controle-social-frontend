import DoughnutChart from "@/components/charts/DoughnutChart";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import LegendTooltip from "@/components/tooltip/LegendTooltip";
import { COLOR } from "@/theme/colors";
import {
  MunicipioPageProps,
  MunicipioPanelProps,
  getCodigoMunicipio,
} from "../../MunicipioPageProps";

async function getData({ ano, municipio }: MunicipioPageProps) {
  "use server";
  const codigo = getCodigoMunicipio(municipio);
  const res = await fetch(
    `https://paineldecontrole.tcees.tc.br/api/MunicipioControllers/Saude/GetSumario?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=11-07-2023-5.2.10`
  );
  const data = await res.json();
  return data as { [key: string]: number };
}
const CHART_SETTINGS = {
  items: [
    {
      color: COLOR.chartPositivo,
      title: "15%",
      value: 0.15,
    },
    {
      color: COLOR.chartNegativo,
      title: "",
      value: 1,
    },
  ],
  style: { height: "200px" },
  title: "Limite constitucional",
};

export async function SaudePanel({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  const data = await getData({ ano, municipio });

  return (
    <PanelWithTitle
      style={style}
      legend={
        <LegendTooltip id="saude-tooltip">
          A Constituição Federal estabelece que o<br />
          município deve aplicar o limite mínimo de
          <br />
          15% da soma dos recursos de impostos e<br />
          transferências em ações e serviços
          <br /> públicos de saúde.
        </LegendTooltip>
      }
      title="Educação"
    >
      <DoughnutChart
        {...CHART_SETTINGS}
        selectedValue={data.aplicacaoPercentual / 100}
      />
    </PanelWithTitle>
  );
}
