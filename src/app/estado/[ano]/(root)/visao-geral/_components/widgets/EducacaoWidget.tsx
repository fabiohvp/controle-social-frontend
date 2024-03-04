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
      name: "25%",
      value: 0.25,
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
    `${ENV.apiUrl}/MunicipioControllers/Educacao/GetSumario?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=${ENV.apiVersion}`
  );
  const data = await res.json();
  return data as { [key: string]: number };
});

export async function EducacaoWidget({ ano, style }: EstadoPanelProps) {
  const data = await getData({ ano });

  return (
    <PanelWithTitle
      bodyProps={{ style }}
      header="Educação"
      legend={
        <LegendaTooltip id="educacao-tooltip">
          A Constituição Federal estabelece que o<br />
          município deve aplicar o limite mínimo de
          <br />
          25% da receita resultante de impostos,
          <br />
          incluídas transferências de impostos, para
          <br />a manutenção e desenvolvimento do ensino.
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
