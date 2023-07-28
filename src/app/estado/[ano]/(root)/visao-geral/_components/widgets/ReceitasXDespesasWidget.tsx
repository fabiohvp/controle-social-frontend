import PainelComTitulo from "@/components/paineis/PainelComTitulo";
import { EstadoPageProps, EstadoPanelProps } from "../../../../EstadoPageProps";
import ReceitasXDespesasChart from "../charts/ReceitasXDespesasChart";

async function getData({ ano }: EstadoPageProps) {
  const codigo = "001";
  const res = await fetch(
    `https://paineldecontrole.tcees.tc.br/api/MunicipioControllers/ReceitaDespesa/GetReceitaXDespesaPorEsferaAdministrativa?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=11-07-2023-5.2.10`
  );
  const data = await res.json();
  return data;
}

export async function ReceitasXDespesasWidget({
  ano,
  style,
}: EstadoPanelProps) {
  const data = await getData({ ano });

  return (
    <PainelComTitulo bodyProps={{ style }} header="Receitas X Despesas">
      <ReceitasXDespesasChart ano={ano} municipio={"001"} {...data} />
    </PainelComTitulo>
  );
}
