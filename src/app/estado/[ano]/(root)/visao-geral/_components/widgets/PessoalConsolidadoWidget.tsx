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
      name: "54%",
      value: 0.54,
    },
    {
      color: COLOR["chart-info"],
      name: "57%",
      value: 0.57,
    },
    {
      color: COLOR["chart-alerta"],
      name: "60%",
      value: 0.6,
    },
    {
      color: COLOR["chart-negativo"],
      name: "",
      value: 1,
    },
  ],
  style: { height: "200px" },
  title: "Limite LRF",
};

const getData = cache(async ({ ano }: Partial<EstadoPageProps>) => {
  const codigo = "001";
  const res = await fetch(
    `${ENV.apiUrl}/MunicipioControllers/PessoalConsolidado/GetSumario?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=11-07-2023-5.2.10`
  );
  const data = await res.json();
  return data as { [key: string]: number };
});

export async function PessoalConsolidadoWidget({
  ano,
  style,
}: EstadoPanelProps) {
  const data = await getData({ ano });

  return (
    <PanelWithTitle
      bodyProps={{ style }}
      header="Pessoal - Consolidado"
      legend={
        <LegendaTooltip id="pessoal-consolidado-tooltip">
          De acordo com a LRF (Lei de Responsabilidade
          <br />
          Fiscal) as despesas com pessoal nos municípios
          <br />
          não podem ultrapassar 60% da RCL (Receita
          <br />
          Corrente Líquida) do Município.
          <br />
          Caso esses gastos atinjam 57% da RCL o município
          <br />
          entra no limite prudencial.
          <br />
          Caso esses gastos atinjam 54% da RCL o Tribunal
          <br />
          de Contas emitirá parecer de alerta.
        </LegendaTooltip>
      }
    >
      <GaugeChart
        {...CHART_SETTINGS}
        selectedValue={data.valorPercentual / 100}
      />
    </PanelWithTitle>
  );
}
