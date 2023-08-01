import PainelComTitulo from "@/components/paineis/PainelComTitulo";
import { getCodigoMunicipio, getMunicipios } from "@/shared/municipio";
import { MunicipioPageProps, MunicipioPanelProps } from "../../../../routes";
import ReceitasXDespesasChart from "../charts/ReceitasXDespesasChart";

async function getData({ ano, municipio }: MunicipioPageProps) {
  const municipios = await getMunicipios();
  const codigo = await getCodigoMunicipio(municipios, municipio);
  const res = await fetch(
    `https://paineldecontrole.tcees.tc.br/api/MunicipioControllers/ReceitaDespesa/GetReceitaXDespesaPorEsferaAdministrativa?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=11-07-2023-5.2.10`
  );
  const data = await res.json();
  return data;
}

export async function ReceitasXDespesasWidget({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  const data = await getData({ ano, municipio });

  return (
    <PainelComTitulo bodyProps={{ style }} header="Receitas X Despesas">
      <ReceitasXDespesasChart ano={ano} municipio={municipio} {...data} />
    </PainelComTitulo>
  );
}
