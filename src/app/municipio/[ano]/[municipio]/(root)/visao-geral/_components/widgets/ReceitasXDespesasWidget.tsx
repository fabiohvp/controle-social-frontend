import PanelWithTitle from "@/components/panel/PanelWithTitle";
import { ENV } from "@/shared/env";
import { getCodigoMunicipio, getMunicipios } from "@/shared/municipio";
import { MunicipioPageProps, MunicipioPanelProps } from "../../../../routes";
import ReceitasXDespesasChart from "../charts/ReceitasXDespesasChart";

export async function ReceitasXDespesasWidget({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  const data = await getData({ ano, municipio });

  return (
    <PanelWithTitle bodyProps={{ style }} header="Receitas X Despesas">
      <ReceitasXDespesasChart ano={ano} municipio={municipio} {...data} />
    </PanelWithTitle>
  );
}

async function getData({ ano, municipio }: Partial<MunicipioPageProps>) {
  const municipios = await getMunicipios();
  const codigo = getCodigoMunicipio(municipios, municipio!);
  const res = await fetch(
    `${ENV.apiUrl}/MunicipioControllers/ReceitaDespesa/GetReceitaXDespesaPorEsferaAdministrativa?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=${ENV.apiVersion}`
  );
  const data = await res.json();
  return data;
}
