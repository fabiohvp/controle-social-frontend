import GaugeChart from "@/components/charts/GaugeChart";
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
      title: "25%",
      value: 0.25,
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

const getData = cache(async ({ ano, municipio }: MunicipioPageProps) => {
  const codigo = getCodigoMunicipio(municipio);
  const res = await fetch(
    `https://paineldecontrole.tcees.tc.br/api/MunicipioControllers/Educacao/GetSumario?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=11-07-2023-5.2.10`
  );
  const data = await res.json();
  return data as { [key: string]: number };
});

export async function EducacaoPanel({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  const data = await getData({ ano, municipio });

  return (
    <PanelWithTitle
      bodyProps={{ style }}
      legend={
        <LegendTooltip id="educacao-tooltip">
          A Constituição Federal estabelece que o<br />
          município deve aplicar o limite mínimo de
          <br />
          25% da receita resultante de impostos,
          <br />
          incluídas transferências de impostos, para
          <br />a manutenção e desenvolvimento do ensino.
        </LegendTooltip>
      }
      header="Educação"
    >
      <GaugeChart
        {...CHART_SETTINGS}
        selectedValue={data.aplicacaoPercentual / 100}
      />
    </PanelWithTitle>
  );
}
