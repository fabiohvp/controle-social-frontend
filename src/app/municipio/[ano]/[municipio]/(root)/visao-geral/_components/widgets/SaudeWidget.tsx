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
      color: COLOR["chart-negativo"],
      name: "15%",
      value: 0.15,
    },
    {
      color: COLOR["chart-positivo"],
      name: "",
      value: 1,
    },
  ],
  style: { height: "200px" },
  title: "Limite constitucional",
};

export async function SaudeWidget({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  const data = await getData({ ano, municipio });

  return (
    <PainelComTitulo
      bodyProps={{ style }}
      header="Saúde"
      legend={
        <LegendaTooltip id="saude-tooltip">
          A Constituição Federal estabelece que o<br />
          município deve aplicar o limite mínimo de
          <br />
          15% da soma dos recursos de impostos e<br />
          transferências em ações e serviços
          <br />
          públicos de saúde.
        </LegendaTooltip>
      }
    >
      <GaugeChart
        {...CHART_SETTINGS}
        selectedValue={data.aplicacaoPercentual / 100}
      />
    </PainelComTitulo>
  );
}

const getData = cache(
  async ({ ano, municipio }: Partial<MunicipioPageProps>) => {
    const municipios = getMunicipios();
    const codigo = getCodigoMunicipio(municipios, municipio!);
    const res = await fetch(
      `https://paineldecontrole.tcees.tc.br/api/MunicipioControllers/Saude/GetSumario?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=11-07-2023-5.2.10`
    );
    const data = await res.json();
    return data as { [key: string]: number };
  }
);
