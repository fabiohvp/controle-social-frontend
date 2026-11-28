import { EstadoPanelProps } from "@/app/estado/[ano]/routes";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import { fetchJson } from "@/shared/api";
import { ENV } from "@/shared/env";
import ReceitasXDespesasChart from "../charts/ReceitasXDespesasChart";
import { ID_ESFERA_ESTADO } from "./MedidoresEstado";

type Item = { nome: string; valor: number };

async function getData(ano: string) {
  const itens = await fetchJson<Item[]>(
    `${ENV.apiUrl}/EstadoControllers/ReceitaDespesa/GetReceitaXDespesaResumoPorEsferaAdministrativaBarrasHorizontais?idEsferaAdministrativa=${ID_ESFERA_ESTADO}&anoExercicio=${ano}&v=${ENV.apiVersion}`
  );
  if (!itens?.length) return null;
  const valor = (nome: string) => itens.find((i) => i.nome.toLowerCase() === nome)?.valor ?? 0;
  return {
    receita: { previsaoInicial: valor("receita prevista"), arrecadada: valor("receita arrecadada") },
    despesa: { previsaoInicial: valor("despesa prevista"), liquidada: valor("despesa liquidada"), empenhada: 0, paga: 0 },
  };
}

export async function ReceitasXDespesasWidget({ ano, pagina, style }: EstadoPanelProps) {
  const data = await getData(ano);

  return (
    <PanelWithTitle
      bodyProps={{ className: data ? undefined : "center", style }}
      header="Receita X Despesa"
    >
      {data ? (
        <ReceitasXDespesasChart ano={ano} pagina={pagina} {...data} />
      ) : (
        <div className="m-auto opacity-60 text-sm">Sem dados</div>
      )}
    </PanelWithTitle>
  );
}
