import GaugeChart from "@/components/charts/GaugeChart";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import LegendaTooltip from "@/components/tooltip/LegendaTooltip";
import { ENV } from "@/shared/env";
import { getCodigoMunicipio, getMunicipios } from "@/shared/municipio";
import { COLOR } from "@/theme/colors";
import { cache } from "react";
import { MunicipioPageProps, MunicipioPanelProps } from "../../../../routes";

const CHART_SETTINGS = {
  items: [
    {
      color: COLOR["chart-positivo"],
      name: "48,6%",
      value: 0.54,
    },
    {
      color: COLOR["chart-info"],
      name: "51,3%",
      value: 0.57,
    },
    {
      color: COLOR["chart-alerta"],
      name: "54%",
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

export async function PessoalLegislativoWidget({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  const data = await getData({ ano, municipio });

  return (
    <PanelWithTitle
      bodyProps={{ style }}
      header="Pessoal - Legislativo"
      legend={
        <LegendaTooltip id="pessoal-legislativo-tooltip">
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

const getData = cache(
  async ({ ano, municipio }: Partial<MunicipioPageProps>) => {
    const municipios = await getMunicipios();
    const codigo = getCodigoMunicipio(municipios, municipio!);
    const res = await fetch(
      `${ENV.apiUrl}/MunicipioControllers/PessoalLegislativo/GetSumario?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=${ENV.apiVersion}`
    );
    const data = await res.json();
    return data as { [key: string]: number };
  }
);
