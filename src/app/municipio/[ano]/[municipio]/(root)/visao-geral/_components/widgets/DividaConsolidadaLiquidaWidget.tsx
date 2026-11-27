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
  title: "Tende a obedecer ao limite de 120% da RCL",
};

export async function DividaConsolidadaLiquidaWidget({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  const data = await getData({ ano, municipio });

  return (
    <PanelWithTitle
      bodyProps={{ className: data ? undefined : "center", style }}
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
      {data?.valorApurado != null ? (
        <GaugeChart {...CHART_SETTINGS} selectedValue={data.valorApurado / 100} />
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
    const res = await fetchJson<{
      valorAlerta?: number;
      valorApurado?: string | number;
      valorMaximo?: number;
    }>(
      `${ENV.apiUrl}/MunicipioControllers/LimiteDespesaReceita/GetLimiteDespesaReceita?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=${ENV.apiVersion}`
    );
    if (!res || res.valorApurado == null) return null;
    const valorApuradoNum =
      typeof res.valorApurado === "number"
        ? res.valorApurado
        : parseFloat(String(res.valorApurado).replace(",", "."));
    return {
      valorAlerta: Number(res.valorAlerta ?? 0),
      valorApurado: valorApuradoNum,
      valorMaximo: Number(res.valorMaximo ?? 0),
    };
  }
);
