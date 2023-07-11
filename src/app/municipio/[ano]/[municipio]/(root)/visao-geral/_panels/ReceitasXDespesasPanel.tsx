import PanelWithTitle from "@/components/layout/panel/PanelWithTitle";
import {
  MunicipioPageProps,
  MunicipioPanelProps,
  getCodigoMunicipio,
} from "../../MunicipioPageProps";
import ReceitasXDespesasChart from "../_components/ReceitasXDespesasChart";

export async function ReceitasXDespesasPanel({
  height,
  ano,
  municipio,
}: MunicipioPanelProps) {
  async function getData({ ano, municipio }: MunicipioPageProps) {
    "use server";
    const codigo = getCodigoMunicipio(municipio);
    const res = await fetch(
      `https://paineldecontrole.tcees.tc.br/api/MunicipioControllers/ReceitaDespesa/GetReceitaXDespesaPorEsferaAdministrativa?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=11-07-2023-5.2.10`
    );
    const data = await res.json();
    return data;
  }

  let loading = true;
  const data = await getData({ ano, municipio });
  loading = false;

  return (
    <PanelWithTitle height={height} title="Receitas X Despesas">
      <ReceitasXDespesasChart loading={loading} />
    </PanelWithTitle>
  );
}
