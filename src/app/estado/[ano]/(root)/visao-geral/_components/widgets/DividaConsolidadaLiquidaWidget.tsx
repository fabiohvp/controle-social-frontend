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
      color: COLOR["chart-muito-positivo"],
      name: "0%",
      value: 0,
    },
    {
      color: COLOR["chart-positivo"],
      name: "108%",
      value: 1.08,
    },
    {
      color: COLOR["chart-alerta"],
      name: "120%",
      value: 1.2,
    },
    {
      color: COLOR["chart-negativo"],
      name: "",
      value: 1,
    },
  ],
  style: { height: "200px" },
  title: "Tende a obedecer ao limite de 120% da RCL", //TODO: condicional para quando o valor ultrapassar
};

const getData = cache(async ({ ano }: Partial<EstadoPageProps>) => {
  const codigo = "001";
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
});

export async function DividaConsolidadaLiquidaWidget({
  ano,
  style,
}: EstadoPanelProps) {
  const data = await getData({ ano });

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
