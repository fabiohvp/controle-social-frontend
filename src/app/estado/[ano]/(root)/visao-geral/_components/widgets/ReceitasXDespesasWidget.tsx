import { EstadoPageProps, EstadoPanelProps } from "@/app/estado/[ano]/routes";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import { ENV } from "@/shared/env";
import ReceitasXDespesasChart from "../charts/ReceitasXDespesasChart";

async function getData({ ano }: Partial<EstadoPageProps>) {
  const codigo = "001";
  const res = await fetch(
    `${ENV.apiUrl}/MunicipioControllers/ReceitaDespesa/GetReceitaXDespesaPorEsferaAdministrativa?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=11-07-2023-5.2.10`
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
    <PanelWithTitle bodyProps={{ style }} header="Receitas X Despesas">
      <ReceitasXDespesasChart ano={ano} municipio={"001"} {...data} />
    </PanelWithTitle>
  );
}
