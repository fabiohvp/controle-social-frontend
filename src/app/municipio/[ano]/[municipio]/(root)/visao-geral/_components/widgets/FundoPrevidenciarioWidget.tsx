import GaugeChart from "@/components/charts/GaugeChart";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import LegendaTooltip from "@/components/tooltip/LegendaTooltip";
import { fetchJson } from "@/shared/api";
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
  const hasValue = data?.valor != null && !Number.isNaN(Number(data.valor));

  return (
    <PanelWithTitle
      bodyProps={{ className: hasValue ? undefined : "center", style }}
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
      {hasValue ? (
        <GaugeChart {...CHART_SETTINGS} selectedValue={Math.abs(Number(data!.valor))} />
      ) : (
        <div className="m-auto opacity-60 text-sm">Sem dados</div>
      )}
    </PanelWithTitle>
  );
}

const getData = cache(
  async ({ ano, municipio }: Partial<MunicipioPageProps>) => {
    const municipios = await getMunicipios();
    const codigo = getCodigoMunicipio(municipios, municipio!);
    if (!codigo) return null;
    return fetchJson<{ valor?: number; [key: string]: unknown }>(
      `${ENV.apiUrl}/PrevidenciaControllers/Patrimonio/GetIValorIndiceCobertura?codigoUnidadeGestora=${codigo}E0900002&anoExercicio=${ano}&v=${ENV.apiVersion}`
    );
  }
);
