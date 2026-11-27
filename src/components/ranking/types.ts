/**
 * Item retornado pelos endpoints `RankingsControllers/<Categoria>/GetRanking<Nome>`.
 * `valor` nulo (ou 1e-16) indica município omisso (não enviou dados).
 */
export type RankingItem = {
  ano: number;
  codigoEsferaAdministrativa: string;
  dataLimite?: string | null;
  idEsferaAdministrativa: number;
  mesUltimoEnvio: number | null;
  nomeEsferaAdministrativa: string;
  posicao: number;
  valor: number | null;
  valorAplicado?: number | null;
  valorExigido?: number | null;
  valorTexto?: string;
};

/**
 * - `monetario`: R$ com 2 casas (ex.: receita arrecadada)
 * - `perCapita`: R$ por habitante/aluno com 2 casas
 * - `percentual`: 2 casas seguidas de %
 * - `numero`: número com 2 casas, sem unidade (índices, notas)
 * - `texto`: texto/conceito (ex.: A, B, C, D)
 */
export type FormatoRanking =
  | "monetario"
  | "numero"
  | "perCapita"
  | "percentual"
  | "texto";

/**
 * Faixa de cor do mapa/tabela. As faixas são avaliadas em ordem: o item entra na
 * primeira faixa cujo `ate` seja maior que o valor (`valor < ate`). A última
 * faixa normalmente não tem `ate` (pega todo o resto).
 */
export type FaixaRanking = {
  ate?: number;
  cor: string;
  descricao: string;
};

export type CoresRanking =
  | {
      tipo: "faixas";
      faixas: FaixaRanking[];
      /** Prefixa a legenda com a quantidade de municípios na faixa ("77 Obedecem"). */
      exibirQuantidade?: boolean;
      /** Esmaece a cor conforme a posição (1º mais forte), como no site oficial. */
      opacidadePorPosicao?: boolean;
    }
  | {
      /** Interpola a cor entre o menor e o maior valor (rankings per capita). */
      tipo: "gradiente";
      corMinima: string;
      corMaxima: string;
    }
  | {
      /**
       * Cada item tem o seu próprio limite (`valorExigido`): acima dele "não
       * obedece". Usado quando o limite varia por município (ex.: art. 29-A).
       */
      tipo: "limiteDoItem";
      corAbaixo: string;
      corAcima: string;
      descricaoAbaixo: string;
      descricaoAcima: string;
      exibirQuantidade?: boolean;
    };

/** Campos numéricos do item que podem virar coluna. `diferenca` = aplicado - exigido. */
export type CampoColunaRanking = "diferenca" | "valorAplicado" | "valorExigido";

export type ColunaExtraRanking = {
  campo: CampoColunaRanking;
  titulo: string;
  formato: FormatoRanking;
};

/**
 * Parte "visual" de um ranking, suficiente para renderizar `RankingTabela`.
 * Deve conter só dados serializáveis (é passada de Server para Client Component).
 */
export type RankingTabelaConfig = {
  colunasExtras?: ColunaExtraRanking[];
  cores?: CoresRanking;
  formato: FormatoRanking;
  /** Ordenação usada quando a API não devolve `posicao`. Padrão: decrescente. */
  ordem?: "crescente" | "decrescente";
  /** Página do município aberta ao clicar (`/municipio/:ano/:municipio/<pagina>`). Padrão: `visao-geral`. */
  paginaMunicipio?: string;
  /** Título da coluna de valor. Padrão: "Valor". */
  tituloValor?: string;
};

export type RankingLinha = RankingItem & {
  cor: string;
  nomeMapa: string;
  nomeNormalizado: string | null;
  omisso: boolean;
  posicaoExibida: number | null;
};
