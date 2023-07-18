import DoughnutChart from "@/components/charts/DoughnutChart";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import LegendTooltip from "@/components/tooltip/LegendTooltip";
import { getCodigoMunicipio } from "@/shared/municipio";
import { COLOR } from "@/theme/colors";
import { cache } from "react";
import {
  MunicipioPageProps,
  MunicipioPanelProps,
} from "../../../MunicipioPageProps";

const CHART_SETTINGS = {
  items: [
    {
      color: COLOR.chartMuitoPositivo,
      title: "0%",
      value: 0,
    },
    {
      color: COLOR.chartPositivo,
      title: "108%",
      value: 1.08,
    },
    {
      color: COLOR.chartAlerta,
      title: "120%",
      value: 1.2,
    },
    {
      color: COLOR.chartNegativo,
      title: "",
      value: 1,
    },
  ],
  style: { height: "200px" },
  title: "Tende a obedecer ao limite de 120% da RCL", //TODO: condicional para quando o valor ultrapassar
};

const getData = cache(async ({ ano, municipio }: MunicipioPageProps) => {
  const codigo = getCodigoMunicipio(municipio);
  const res = await fetch(
    `https://paineldecontrole.tcees.tc.br/api/MunicipioControllers/LimiteDespesaReceita/GetLimiteDespesaReceita?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=11-07-2023-5.2.10`
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

export async function DividaConsolidadaLiquidaPanel({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  const data = await getData({ ano, municipio });

  return (
    <PanelWithTitle
      style={style}
      legend={
        <LegendTooltip id="despesa-receita-correntes-tooltip">
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
        </LegendTooltip>
      }
      title="Desp. x receitas correntes"
    >
      <DoughnutChart
        {...CHART_SETTINGS}
        selectedValue={data.valorApurado / 100}
      />
    </PanelWithTitle>
  );
}
