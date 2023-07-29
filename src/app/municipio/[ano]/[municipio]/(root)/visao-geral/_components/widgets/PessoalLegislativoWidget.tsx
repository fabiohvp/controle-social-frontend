import GaugeChart from "@/components/charts/GaugeChart";
import PainelComTitulo from "@/components/paineis/PainelComTitulo";
import LegendaTooltip from "@/components/tooltip/LegendaTooltip";
import { getCodigoMunicipio, getMunicipios } from "@/shared/municipio";
import { COLOR } from "@/theme/colors";
import { cache } from "react";
import {
  MunicipioPageProps,
  MunicipioPanelProps,
} from "../../../../MunicipioPageProps";

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

const getData = cache(async ({ ano, municipio }: MunicipioPageProps) => {
  const municipios = await getMunicipios();
  const codigo = await getCodigoMunicipio(municipios, municipio);
  const res = await fetch(
    `https://paineldecontrole.tcees.tc.br/api/MunicipioControllers/PessoalLegislativo/GetSumario?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=11-07-2023-5.2.10`
  );
  const data = await res.json();
  return data as { [key: string]: number };
});

export async function PessoalLegislativoWidget({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  const data = await getData({ ano, municipio });

  return (
    <PainelComTitulo
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
    </PainelComTitulo>
  );
}
