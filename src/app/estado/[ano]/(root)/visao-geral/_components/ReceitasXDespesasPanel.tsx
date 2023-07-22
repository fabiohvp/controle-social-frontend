import PanelWithTitle from "@/components/panel/PanelWithTitle";
import { getCodigoMunicipio } from "@/shared/municipio";
import { EstadoPageProps, EstadoPanelProps } from "../../../EstadoPageProps";
import ReceitasXDespesasChart from "../../../_components/charts/ReceitasXDespesasChart";

async function getData({ ano, municipio }: EstadoPageProps) {
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
}: EstadoPanelProps) {
  const data = await getData({ ano, municipio });

  return (
    <PanelWithTitle style={style} title="Receitas X Despesas">
      <ReceitasXDespesasChart ano={ano} municipio={municipio} {...data} />
    </PanelWithTitle>
  );
}
