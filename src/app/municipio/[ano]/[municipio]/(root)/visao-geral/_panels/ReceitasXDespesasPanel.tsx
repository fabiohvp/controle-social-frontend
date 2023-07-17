import PanelWithTitle from "@/components/panel/PanelWithTitle";
import {
  MunicipioPageProps,
  MunicipioPanelProps,
  getCodigoMunicipio,
} from "../../../MunicipioPageProps";
import ReceitasXDespesasChart from "../../../_components/charts/ReceitasXDespesasChart";

async function getData({ ano, municipio }: MunicipioPageProps) {
  "use server";
  const codigo = getCodigoMunicipio(municipio);
  const res = await fetch(
    `https://paineldecontrole.tcees.tc.br/api/MunicipioControllers/ReceitaDespesa/GetReceitaXDespesaPorEsferaAdministrativa?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=11-07-2023-5.2.10`
  );
  const data = await res.json();
  return data;
}

export async function ReceitasXDespesasPanel({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  const data = await getData({ ano, municipio });

  return (
    <PanelWithTitle style={style} title="Receitas X Despesas">
      <ReceitasXDespesasChart ano={ano} municipio={municipio} {...data} />
    </PanelWithTitle>
  );
}
