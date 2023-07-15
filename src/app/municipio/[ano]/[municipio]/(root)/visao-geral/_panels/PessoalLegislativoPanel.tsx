import DoughnutChart from "@/components/charts/DoughnutChart";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import LegendTooltip from "@/components/tooltip/LegendTooltip";
import { COLOR } from "@/theme/colors";
import { cache } from "react";
import {
  MunicipioPageProps,
  MunicipioPanelProps,
  getCodigoMunicipio,
} from "../../../MunicipioPageProps";

const CHART_SETTINGS = {
  items: [
    {
      color: COLOR.chartPositivo,
      title: "48,6%",
      value: 0.54,
    },
    {
      color: COLOR.chartInfo,
      title: "51,3%",
      value: 0.57,
    },
    {
      color: COLOR.chartAlerta,
      title: "54%",
      value: 0.6,
    },
    {
      color: COLOR.chartNegativo,
      title: "",
      value: 1,
    },
  ],
  style: { height: "200px" },
  title: "Limite LRF",
};

const getData = cache(async ({ ano, municipio }: MunicipioPageProps) => {
  const codigo = getCodigoMunicipio(municipio);
  const res = await fetch(
    `https://paineldecontrole.tcees.tc.br/api/MunicipioControllers/PessoalLegislativo/GetSumario?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=11-07-2023-5.2.10`
  );
  const data = await res.json();
  return data as { [key: string]: number };
});

export async function PessoalLegislativoPanel({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  const data = await getData({ ano, municipio });

  return (
    <PanelWithTitle
      style={style}
      legend={
        <LegendTooltip id="pessoal-legislativo-tooltip">
          De acordo com a LRF (Lei de
          <br />
          Responsabilidade Fiscal) as despesas
          <br />
          com pessoal do Poder Legislativo não
          <br />
          podem ultrapassar 6% da RCL (Receita
          <br />
          Corrente Líquida) do Município.
          <br />
          Caso esses gastos atinjam 5,4% da RCL o<br />
          Tribunal de Contas emitirá parecer de alerta.
          <br />
          Caso esses gastos atinjam 5,7% da RCL o<br />
          município entra no limite prudencial.
        </LegendTooltip>
      }
      title="Pessoal - Legislativo"
    >
      <DoughnutChart
        {...CHART_SETTINGS}
        selectedValue={data.valorPercentual / 100}
      />
    </PanelWithTitle>
  );
}
