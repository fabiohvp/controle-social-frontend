import GaugeChart from "@/components/charts/GaugeChart";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import LegendaTooltip from "@/components/tooltip/LegendaTooltip";
import { ENV } from "@/shared/env";
import { getCodigoMunicipio, getMunicipios } from "@/shared/municipio";
import { COLOR } from "@/theme/colors";
import { cache } from "react";
import { MunicipioPageProps, MunicipioPanelProps } from "../../../../routes";

export async function DespesaReceitaCorrentesWidget({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  const data = await getData({ ano, municipio });

  const CHART_SETTINGS = {
    items: [
      {
        color: COLOR["chart-positivo"],
        name: `${data.valorAlerta}`,
        value: data.valorAlerta / 100,
      },
      {
        color: COLOR["chart-info"],
        name: `${data.valorMaximo}`,
        value: data.valorMaximo / 100,
      },
      {
        color: COLOR["chart-negativo"],
        name: "",
        value: 1,
      },
    ],
    style: { height: "200px" },
    title:
      data.valorApurado > data.valorAlerta
        ? `Despesas correntes ultrapassaram ${data.valorAlerta}% das receitas correntes`
        : `Despesas correntes não superam ${data.valorAlerta}% das receitas correntes`, //TODO: condicional para quando o valor ultrapassar
  };

  return (
    <PanelWithTitle
      bodyProps={{ style }}
      header="Desp. x receitas correntes"
      legend={
        <LegendaTooltip id="despesa-receita-correntes-tooltip">
          As despesas correntes não devem superar 95%
          <br />
          das receitas correntes. Mesmo não atingindo
          <br />
          essa relação, caso as despesas correntes
          <br />
          superem 85% das receitas correntes, o<br />
          mecanismo de ajuste fiscal já pode ser
          <br />
          adotado (art. 167-A da Constituição Federal
          <br />
          de 1988).
        </LegendaTooltip>
      }
    >
      <GaugeChart {...CHART_SETTINGS} selectedValue={data.valorApurado / 100} />
    </PanelWithTitle>
  );
}

const getData = cache(
  async ({ ano, municipio }: Partial<MunicipioPageProps>) => {
    const municipios = await getMunicipios();
    const codigo = getCodigoMunicipio(municipios, municipio!);
    const res = await fetch(
      `${ENV.apiUrl}/MunicipioControllers/LimiteDespesaReceita/GetLimiteDespesaReceita?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=${ENV.apiVersion}`
    );
    const data = await res.json();
    return {
      ...data,
      valorApurado: parseFloat(data?.valorApurado.replace(",", ".")),
    } as {
      valorAlerta: number;
      valorApurado: number;
      valorMaximo: number;
    };
  }
);
