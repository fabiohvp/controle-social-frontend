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
    `https://paineldecontrole.tcees.tc.br/api/PrevidenciaControllers/Patrimonio/GetIValorIndiceCobertura?codigoUnidadeGestora=${codigo}E0900002&anoExercicio=${ano}&v=11-07-2023-5.2.10`
  );
  const data = await res.json();
  return data as { [key: string]: number };
}
const CHART_SETTINGS = {
  items: [
    {
      color: COLOR.chartPositivo,
      title: "0,3%",
      value: 0.3,
    },
    {
      color: COLOR.chartInfo,
      title: "0,7%",
      value: 0.7,
    },
    {
      color: COLOR.chartNegativo,
      title: "",
      value: 1,
    },
  ],
  style: { height: "200px" },
  title: "Solvência do RPPS",
};

export async function FundoPrevidenciarioPanel({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  const data = await getData({ ano, municipio });

  return (
    <PanelWithTitle
      style={style}
      legend={
        <LegendTooltip id="pessoal-consolidado-tooltip">
          Solvência, em finanças e contabilidade, é o estado do devedor que
          possui seu ativo maior do que o passivo, ou a sua capacidade de
          cumprir os compromissos com os recursos que constituem seu patrimônio
          ou seu ativo.
        </LegendTooltip>
      }
      title="Previdência - Fundo Previdenciário"
    >
      <DoughnutChart {...CHART_SETTINGS} selectedValue={Math.abs(data.valor)} />
    </PanelWithTitle>
  );
}
