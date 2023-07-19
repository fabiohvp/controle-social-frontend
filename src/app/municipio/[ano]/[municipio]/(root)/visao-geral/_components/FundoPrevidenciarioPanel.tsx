import DoughnutChart from "@/components/charts/DoughnutChart";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import LegendTooltip from "@/components/tooltip/LegendTooltip";
import { getCodigoMunicipio } from "@/shared/municipio";
import { COLOR } from "@/theme/colors";
import { cache } from "react";
import {
  MunicipioPageProps,
  MunicipioPanelProps,
} from "../../../MunicipioPageProps";

const CHART_SETTINGS = {
  items: [
    {
      color: COLOR["chart-positivo"],
      title: "0,3%",
      value: 0.3,
    },
    {
      color: COLOR["chart-info"],
      title: "0,7%",
      value: 0.7,
    },
    {
      color: COLOR["chart-negativo"],
      title: "",
      value: 1,
    },
  ],
  style: { height: "200px" },
  title: "Solvência do RPPS",
};

const getData = cache(async ({ ano, municipio }: MunicipioPageProps) => {
  const codigo = getCodigoMunicipio(municipio);
  const res = await fetch(
    `https://paineldecontrole.tcees.tc.br/api/PrevidenciaControllers/Patrimonio/GetIValorIndiceCobertura?codigoUnidadeGestora=${codigo}E0900002&anoExercicio=${ano}&v=11-07-2023-5.2.10`
  );
  const data = await res.json();
  return data as { [key: string]: number };
});

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
        <LegendTooltip id="previdencia-fundo-previdenciario-tooltip">
          Solvência, em finanças e contabilidade, é<br />
          o estado do devedor que possui seu ativo
          <br />
          maior do que o passivo, ou a sua capacidade
          <br />
          de cumprir os compromissos com os recursos
          <br />
          que constituem seu patrimônio ou seu ativo.
        </LegendTooltip>
      }
      title="Previdência - Fundo Previdenciário"
    >
      <DoughnutChart
        {...CHART_SETTINGS}
        selectedValue={Math.abs(data?.valor)}
      />
    </PanelWithTitle>
  );
}
