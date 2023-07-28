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
      name: "5,4%",
      value: 0.54,
    },
    {
      color: COLOR["chart-info"],
      name: "5,7%",
      value: 0.57,
    },
    {
      color: COLOR["chart-alerta"],
      name: "6%",
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

const getData = cache(async ({ ano }: EstadoPageProps) => {
  const codigo = "001";
  const res = await fetch(
    `https://paineldecontrole.tcees.tc.br/api/MunicipioControllers/PessoalExecutivo/GetSumario?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=11-07-2023-5.2.10`
  );
  const data = await res.json();
  return data as { [key: string]: number };
});

export async function PessoalExecutivoWidget({ ano, style }: EstadoPanelProps) {
  const data = await getData({ ano });

  return (
    <PainelComTitulo
      bodyProps={{ style }}
      legend={
        <LegendaTooltip id="pessoal-executivo-tooltip">
          De acordo com a LRF (Lei de Responsabilidade
          <br />
          Fiscal) as despesas com pessoal no Poder
          <br />
          Executivo não podem ultrapassar 54% da RCL
          <br />
          (Receita Corrente Líquida) do Município.
          <br />
          Caso esses gastos atinjam 51,3% da RCL o<br />
          município entra no limite prudencial.
          <br />
          Caso esses gastos atinjam 48,6% da RCL
          <br />o Tribunal de Contas emitirá
          <br />
          parecer de alerta.
        </LegendaTooltip>
      }
      header="Pessoal - Executivo"
    >
      <GaugeChart
        {...CHART_SETTINGS}
        selectedValue={data.valorPercentual / 100}
      />
    </PainelComTitulo>
  );
}