import GaugeChart from "@/components/charts/GaugeChart";
import PainelComTitulo from "@/components/paineis/PainelComTitulo";
import LegendaTooltip from "@/components/tooltip/LegendaTooltip";
import { COLOR } from "@/theme/colors";
import { cache } from "react";
import { EstadoPageProps, EstadoPanelProps } from "../../../../EstadoPageProps";

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

const getData = cache(async ({ ano }: EstadoPageProps) => {
  const codigo = "001";
  const res = await fetch(
    `https://paineldecontrole.tcees.tc.br/api/MunicipioControllers/Educacao/GetSumario?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=11-07-2023-5.2.10`
  );
  const data = await res.json();
  return data as { [key: string]: number };
});

export async function EducacaoWidget({ ano, style }: EstadoPanelProps) {
  const data = await getData({ ano });

  return (
    <PainelComTitulo
      bodyProps={{ style }}
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
      header="Educação"
    >
      <GaugeChart
        {...CHART_SETTINGS}
        selectedValue={data.aplicacaoPercentual / 100}
      />
    </PainelComTitulo>
  );
}