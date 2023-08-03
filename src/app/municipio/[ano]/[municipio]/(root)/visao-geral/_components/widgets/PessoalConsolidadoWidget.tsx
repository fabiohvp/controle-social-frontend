import GaugeChart from "@/components/charts/GaugeChart";
import PainelComTitulo from "@/components/paineis/PainelComTitulo";
import LegendaTooltip from "@/components/tooltip/LegendaTooltip";
import { getCodigoMunicipio, getMunicipios } from "@/shared/municipio";
import { COLOR } from "@/theme/colors";
import { cache } from "react";
import { MunicipioPageProps, MunicipioPanelProps } from "../../../../routes";

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

export async function PessoalConsolidadoWidget({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  const data = await getData({ ano, municipio });

  return (
    <PainelComTitulo
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
    </PainelComTitulo>
  );
}

const getData = cache(
  async ({ ano, municipio }: Partial<MunicipioPageProps>) => {
    const municipios = getMunicipios();
    const codigo = getCodigoMunicipio(municipios, municipio!);
    const res = await fetch(
      `https://paineldecontrole.tcees.tc.br/api/MunicipioControllers/PessoalConsolidado/GetSumario?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=11-07-2023-5.2.10`
    );
    const data = await res.json();
    return data as { [key: string]: number };
  }
);
