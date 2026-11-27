import PanelWithTitle from "@/components/panel/PanelWithTitle";
import { fetchJson } from "@/shared/api";
import { ENV } from "@/shared/env";
import { getCodigoMunicipio, getMunicipios } from "@/shared/municipio";
import { MunicipioPageProps, MunicipioPanelProps } from "../../../../routes";
import ReceitasXDespesasChart from "../charts/ReceitasXDespesasChart";

type ReceitaDespesaData = {
  despesa: {
    empenhada: number;
    previsaoInicial: number;
    liquidada: number;
    paga: number;
  };
  receita: {
    arrecadada: number;
    previsaoInicial: number;
  };
};

export async function ReceitasXDespesasWidget({
  style,
  ...props
}: MunicipioPanelProps) {
  const data = await getData(props);

  return (
    <PanelWithTitle
      bodyProps={{ className: data ? undefined : "center", style }}
      header="Receitas X Despesas"
    >
      {data?.despesa && data?.receita ? (
        <ReceitasXDespesasChart
          {...props}
          despesa={data.despesa}
          receita={data.receita}
        />
      ) : (
        <div className="m-auto opacity-60 text-sm">Sem dados</div>
      )}
    </PanelWithTitle>
  );
}

async function getData({ ano, municipio }: Partial<MunicipioPageProps>) {
  const municipios = await getMunicipios();
  const codigo = getCodigoMunicipio(municipios, municipio!);
  if (!codigo) return null;
  return fetchJson<ReceitaDespesaData>(
    `${ENV.apiUrl}/MunicipioControllers/ReceitaDespesa/GetReceitaXDespesaPorEsferaAdministrativa?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=${ENV.apiVersion}`
  );
}
