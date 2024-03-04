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
      name: "0,3%",
      value: 0.3,
    },
    {
      color: COLOR["chart-info"],
      name: "0,7%",
      value: 0.7,
    },
    {
      color: COLOR["chart-negativo"],
      name: "",
      value: 1,
    },
  ],
  style: { height: "200px" },
  title: "Solvência do RPPS",
};

export async function FundoPrevidenciarioWidget({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  const data = await getData({ ano, municipio });

  return (
    <PanelWithTitle
      bodyProps={{ style }}
      header="Previdência - Fundo Previdenciário"
      legend={
        <LegendaTooltip id="previdencia-fundo-previdenciario-tooltip">
          Solvência, em finanças e contabilidade, é<br />
          o estado do devedor que possui seu ativo
          <br />
          maior do que o passivo, ou a sua capacidade
          <br />
          de cumprir os compromissos com os recursos
          <br />
          que constituem seu patrimônio ou seu ativo.
        </LegendaTooltip>
      }
    >
      <GaugeChart {...CHART_SETTINGS} selectedValue={Math.abs(data?.valor)} />
    </PanelWithTitle>
  );
}

const getData = cache(
  async ({ ano, municipio }: Partial<MunicipioPageProps>) => {
    const municipios = await getMunicipios();
    const codigo = getCodigoMunicipio(municipios, municipio!);
    const res = await fetch(
      `${ENV.apiUrl}/PrevidenciaControllers/Patrimonio/GetIValorIndiceCobertura?codigoUnidadeGestora=${codigo}E0900002&anoExercicio=${ano}&v=${ENV.apiVersion}`
    );
    const data = await res.json();
    return data as { [key: string]: number };
  }
);
