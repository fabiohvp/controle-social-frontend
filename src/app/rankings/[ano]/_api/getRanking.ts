import { RankingItem } from "@/components/ranking/types";
import { ENV } from "@/shared/env";
import { getMunicipios } from "@/shared/municipio";
import { cache } from "react";

/** Conversões de respostas que não vêm no formato `RankingItem[]`. */
export type AdaptadorRanking =
  | "artigo29A"
  | "previdencia"
  | "deliberacoes"
  | "isp"
  | "capag"
  | "ivf"
  | `vaat.${string}`;

type Params = {
  ano: string;
  /**
   * `<Controller>/<Acao>` dentro de `RankingsControllers`. Se começar com
   * `MunicipioControllers/`, `CAPAGControllers/`, `IVFControllers/`, `ISPControllers/` ou `PrestacaoContaControllers/`
   * é usado como está. Aceita query extra (`...?idEsferaAdministrativa=null`).
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
    const isCustomPrefix =
      endpoint.startsWith("MunicipioControllers/") ||
      endpoint.startsWith("CAPAGControllers/") ||
      endpoint.startsWith("IVFControllers/") ||
      endpoint.startsWith("ISPControllers/") ||
      endpoint.startsWith("PrestacaoContaControllers/");

    const caminho = isCustomPrefix ? endpoint : `RankingsControllers/${endpoint}`;
    const separador = caminho.includes("?") ? "&" : "?";
    
    // Se o endpoint já traz anoSelecionado= no query, preenche o ano correto
    let caminhoTratado = caminho;
    if (caminhoTratado.includes("anoSelecionado=")) {
      caminhoTratado = caminhoTratado.replace(/anoSelecionado=([^&]*)/, `anoSelecionado=${ano}`);
    }

    const url = `${ENV.apiUrl}/${caminhoTratado}${separador}anoExercicio=${ano}&v=${ENV.apiVersion}`;
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
    if (adaptador === "previdencia") {
      return getItensPrevidencia(dados, Number(ano));
    }
    if (adaptador === "deliberacoes") {
      return getItensDeliberacoes(dados, Number(ano));
    }
    if (adaptador === "isp") {
      return getItensIsp(dados, Number(ano));
    }
    if (adaptador === "capag") {
      return getItensCapag(dados, Number(ano));
    }
    if (adaptador === "ivf") {
      return getItensIvf(dados, Number(ano));
    }
    if (adaptador?.startsWith("vaat.")) {
      const campo = adaptador.replace("vaat.", "");
      const lista = dados?.[campo] ?? [];
      return getItensVaat(lista, Number(ano));
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

async function getItensPrevidencia(itens: any[], ano: number): Promise<RankingItem[]> {
  const municipios = await getMunicipios();

  return (itens || []).map((item, index) => {
    const codigo = item.codigoEsferaAdministrativa || "";
    const mun = municipios.find((m) => m.codigo === codigo);

    return {
      ano: item.ano ?? ano,
      codigoEsferaAdministrativa: codigo,
      idEsferaAdministrativa: Number(item.idEsferaAdministrativa) || Number(codigo) || 0,
      mesUltimoEnvio: null,
      nomeEsferaAdministrativa:
        item.nomeEsferaAdministrativa ??
        mun?.nome ??
        item.label ??
        codigo,
      posicao: Number(item.posicao) || index + 1,
      valor: item.valor !== undefined && item.valor !== null ? Number(item.valor) : null,
      valorAplicado: item.valor !== undefined && item.valor !== null ? Number(item.valor) : null,
    };
  });
}

async function getItensDeliberacoes(itens: any[], ano: number): Promise<RankingItem[]> {
  const municipios = await getMunicipios();

  return (itens || []).map((item, index) => {
    const codigo = item.codigoEsferaAdministrativa || "";
    const mun = municipios.find((m) => m.codigo === codigo);

    return {
      ano: ano,
      codigoEsferaAdministrativa: codigo,
      idEsferaAdministrativa: Number(codigo) || 0,
      mesUltimoEnvio: null,
      nomeEsferaAdministrativa: item.nomeEsferaAdministrativa ?? mun?.nome ?? codigo,
      posicao: Number(item.posicao) || index + 1,
      valor: item.valor !== undefined && item.valor !== null ? Number(item.valor) : null,
      valorAplicado: item.valor !== undefined && item.valor !== null ? Number(item.valor) : null,
    };
  });
}

const ISP_MAP: Record<string, number> = {
  A: 4,
  B: 3,
  C: 2,
  D: 1,
};

async function getItensIsp(itens: any[], ano: number): Promise<RankingItem[]> {
  const municipios = await getMunicipios();

  return (itens || []).map((item, index) => {
    const codigo = item.codigoEsferaAdministrativa || String(item.idEsferaAdministrativa || "").padStart(3, "0");
    const mun = municipios.find((m) => m.codigo === codigo);
    const rawVal = item.valor !== undefined && item.valor !== null ? String(item.valor).trim() : "";
    const numVal = ISP_MAP[rawVal.toUpperCase()] ?? (Number(rawVal) || null);

    return {
      ano: ano,
      codigoEsferaAdministrativa: codigo,
      idEsferaAdministrativa: Number(item.idEsferaAdministrativa) || Number(codigo) || 0,
      mesUltimoEnvio: null,
      nomeEsferaAdministrativa: mun?.nome ?? codigo,
      posicao: index + 1,
      valor: numVal,
      valorTexto: rawVal || undefined,
    };
  });
}

const CAPAG_LETRA_VAL: Record<string, number> = {
  A: 4,
  B: 3,
  C: 2,
  D: 1,
};

async function getItensCapag(itens: any[], ano: number): Promise<RankingItem[]> {
  const municipios = await getMunicipios();

  return (itens || []).map((item, index) => {
    const codigo = item.codigoEsferaAdministrativa || "";
    const mun = municipios.find((m) => m.codigo === codigo);
    const rawPosicao = item.posicao;
    const isLetra = typeof rawPosicao === "string" && ["A", "B", "C", "D"].includes(rawPosicao.toUpperCase());

    const valorNum = isLetra ? (CAPAG_LETRA_VAL[rawPosicao.toUpperCase()] ?? Number(item.valor)) : Number(item.valor);
    const valorTexto = isLetra ? rawPosicao : undefined;

    return {
      ano: item.ano ?? ano,
      codigoEsferaAdministrativa: codigo,
      idEsferaAdministrativa: Number(item.idEsferaAdministrativa) || Number(codigo) || 0,
      mesUltimoEnvio: item.ultimoMesEnvio ?? null,
      nomeEsferaAdministrativa: item.nomeEsferaAdministrativa ?? mun?.nome ?? codigo,
      posicao: isLetra ? 0 : Number(item.posicao) || index + 1,
      valor: isNaN(valorNum) ? null : valorNum,
      valorTexto,
    };
  });
}

async function getItensIvf(itens: any[], ano: number): Promise<RankingItem[]> {
  const municipios = await getMunicipios();

  return (itens || []).map((item, index) => {
    const codigo = item.codigoEsferaAdministrativa || "";
    const mun = municipios.find((m) => m.codigo === codigo);

    return {
      ano: item.ano ?? ano,
      codigoEsferaAdministrativa: codigo,
      idEsferaAdministrativa: Number(item.idEsferaAdministrativa) || Number(codigo) || 0,
      mesUltimoEnvio: item.ultimoMesEnvio ?? null,
      nomeEsferaAdministrativa: item.nomeEsferaAdministrativa ?? mun?.nome ?? codigo,
      posicao: Number(item.posicao) || index + 1,
      valor: item.valor !== undefined && item.valor !== null ? Number(item.valor) : null,
    };
  });
}

async function getItensVaat(itens: any[], ano: number): Promise<RankingItem[]> {
  const municipios = await getMunicipios();

  return (itens || []).map((item, index) => {
    const codigo = item.codigoEsferaAdministrativa || "";
    const mun = municipios.find((m) => m.codigo === codigo);

    return {
      ano: item.ano ?? ano,
      codigoEsferaAdministrativa: codigo,
      idEsferaAdministrativa: Number(item.idEsferaAdministrativa) || Number(codigo) || 0,
      mesUltimoEnvio: item.mesUltimoEnvio ?? null,
      nomeEsferaAdministrativa: item.nomeEsferaAdministrativa ?? mun?.nome ?? codigo,
      posicao: Number(item.posicao) || index + 1,
      valor: item.valor !== undefined && item.valor !== null ? Number(item.valor) : null,
      valorAplicado: item.valorAplicado !== undefined && item.valorAplicado !== null ? Number(item.valorAplicado) : null,
      valorExigido: item.valorExigido !== undefined && item.valorExigido !== null ? Number(item.valorExigido) : null,
    };
  });
}
