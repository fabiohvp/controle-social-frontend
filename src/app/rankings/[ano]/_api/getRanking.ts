import { RankingItem } from "@/components/ranking/types";
import { ENV } from "@/shared/env";
import { getMunicipios } from "@/shared/municipio";
import { cache } from "react";

/** Conversões de respostas que não vêm no formato `RankingItem[]`. */
export type AdaptadorRanking = "artigo29A";

type Params = {
  ano: string;
  /**
   * `<Controller>/<Acao>` dentro de `RankingsControllers`. Se começar com
   * `MunicipioControllers/` é usado como está. Aceita query extra
   * (`...?idEsferaAdministrativa=null`).
   */
  endpoint: string;
  adaptador?: AdaptadorRanking;
};

/**
 * `RankingsControllers/<endpoint>?anoExercicio=`. A API oficial às vezes
 * responde 500 de forma intermitente, por isso tenta uma segunda vez.
 */
export const getRanking = cache(
  async ({ ano, endpoint, adaptador }: Params) => {
    const caminho = endpoint.startsWith("MunicipioControllers/")
      ? endpoint
      : `RankingsControllers/${endpoint}`;
    const separador = caminho.includes("?") ? "&" : "?";
    const url = `${ENV.apiUrl}/${caminho}${separador}anoExercicio=${ano}&v=${ENV.apiVersion}`;
    let res = await fetch(url);

    if (!res.ok) {
      res = await fetch(url);
    }
    if (!res.ok) {
      throw new Error(`Erro ${res.status} ao consultar ${endpoint} (${ano})`);
    }
    const dados = await res.json();

    if (adaptador === "artigo29A") {
      return getItensArtigo29A(dados as ItemArtigo29A[]);
    }
    return dados as RankingItem[];
  }
);

type ItemArtigo29A = {
  ano: number;
  idEsferaAdministrativa: number;
  valores: {
    DespesaPercentualMesEnvioObrigatorio?: { valor: number | null };
    Populacao?: { valor: number | null };
  };
};

/** Art. 29-A da CF: limite da despesa do Legislativo conforme a população. */
const LIMITES_ARTIGO_29A = [
  { populacaoMinima: 8000001, limite: 3.5 },
  { populacaoMinima: 3000001, limite: 4 },
  { populacaoMinima: 500001, limite: 4.5 },
  { populacaoMinima: 300001, limite: 5 },
  { populacaoMinima: 100001, limite: 6 },
  { populacaoMinima: 0, limite: 7 },
];

/**
 * `MunicipioControllers/PoderLegislativo/GetRankingDespesaLegislativoArtigo29A`
 * devolve só o percentual e a população por município. Vira `RankingItem` com
 * `valor` = despesa (% da receita) e `valorExigido` = limite da faixa de população.
 */
async function getItensArtigo29A(itens: ItemArtigo29A[]): Promise<RankingItem[]> {
  const municipios = await getMunicipios();

  return itens.map((item) => {
    const codigo = String(item.idEsferaAdministrativa).padStart(3, "0");
    const populacao = item.valores.Populacao?.valor ?? 0;
    const valor = item.valores.DespesaPercentualMesEnvioObrigatorio?.valor ?? null;
    const limite = LIMITES_ARTIGO_29A.find(
      (faixa) => populacao >= faixa.populacaoMinima
    )!.limite;

    return {
      ano: item.ano,
      codigoEsferaAdministrativa: codigo,
      idEsferaAdministrativa: item.idEsferaAdministrativa,
      mesUltimoEnvio: null,
      nomeEsferaAdministrativa:
        municipios.find((municipio) => municipio.codigo === codigo)?.nome ??
        codigo,
      posicao: 0,
      valor,
      valorAplicado: valor,
      valorExigido: limite,
    };
  });
}
