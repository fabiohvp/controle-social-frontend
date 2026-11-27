import {
  CORES_RANKING,
  CORES_RANKING_PER_CAPITA,
  CORES_RANKING_RESULTADO,
  getCoresLimiteMinimo,
  getCoresLimitePessoal,
} from "@/components/ranking/rankingUtils";
import {
  CoresRanking,
  RankingTabelaConfig,
} from "@/components/ranking/types";
import type { AdaptadorRanking } from "./_api/getRanking";

/** Slugs das pastas em `src/app/rankings/[ano]/<categoria>/`. */
export type CategoriaRankingSlug =
  | "despesa"
  | "educacao"
  | "gestao-fiscal"
  | "pessoal"
  | "receita"
  | "resultado"
  | "saude";

export type CategoriaRanking = {
  slug: CategoriaRankingSlug;
  titulo: string;
};

/** Ordem do sidebar/breadcrumb (mesma do site oficial). */
export const CATEGORIAS_RANKING: CategoriaRanking[] = [
  { slug: "receita", titulo: "Receitas" },
  { slug: "despesa", titulo: "Despesas" },
  { slug: "resultado", titulo: "Resultado" },
  { slug: "gestao-fiscal", titulo: "Gestão Fiscal" },
  { slug: "saude", titulo: "Saúde" },
  { slug: "educacao", titulo: "Educação" },
  { slug: "pessoal", titulo: "Pessoal" },
];

/**
 * Um ranking = uma entrada aqui + um `page.tsx` de 3 linhas na pasta
 * `<categoria>/<slug>/` (ver `docs/RANKINGS.md`). Só dados serializáveis.
 */
export type RankingConfig = RankingTabelaConfig & {
  categoria: CategoriaRankingSlug;
  /** Pasta da rota (kebab-case): `/rankings/:ano/<categoria>/<slug>`. */
  slug: string;
  /** Nome curto do menu/breadcrumb (ex.: "Arrecadadas"). */
  titulo: string;
  /** Título do alerta, do painel e da aba do navegador. */
  tituloCompleto: string;
  /** Texto explicativo exibido no alerta do topo. */
  descricao: string;
  /** Texto extra (ex.: "Quanto mais alta for a posição..."). */
  observacao?: string;
  /**
   * `<Controller>/<Acao>` em `RankingsControllers`; chamado com `?anoExercicio=`.
   * Fora de `RankingsControllers`, use o caminho completo começando por
   * `MunicipioControllers/` (ex.: balanço patrimonial). Aceita query extra.
   */
  endpoint: string;
  /** Converte respostas que não vêm como `RankingItem[]` (ver `getRanking.ts`). */
  adaptador?: AdaptadorRanking;
  /** Acrescenta " - Tendência" ao título quando os dados ainda não fecharam o ano. */
  tendenciaQuandoParcial?: boolean;
  /**
   * Caminho do mesmo ranking na resposta de
   * `MunicipioControllers/Ranking/GetRanking?anoExercicio=&idEsferaAdministrativa=`
   * (posição de um município em todos os rankings), ex.: `receita.receitaArrecadada`.
   */
  chaveRankingMunicipio?: string;
  /** Nome do submenu no site oficial (`/rankings/:ano/:aba/:submenu`), para referência. */
  submenuOficial?: string;
};

const OBSERVACAO_PER_CAPITA_DESPESA =
  "Quanto mais alta for a posição no ranking maior é o gasto do município para cada um dos seus habitantes.";

/** Limite da Lei de Responsabilidade Fiscal, ver `getCoresLimitePessoal` (valores de `Settings/GetAll`). */
const CORES_PESSOAL_EXECUTIVO = getCoresLimitePessoal(48.6, 51.3, 54);
const CORES_PESSOAL_LEGISLATIVO = getCoresLimitePessoal(5.4, 5.7, 6);
const CORES_PESSOAL_CONSOLIDADO = getCoresLimitePessoal(54, 57, 60);

/** Despesas correntes x receitas correntes: alerta 85%, máximo 95%. */
const CORES_DESPESA_RECEITA_CORRENTE: CoresRanking = {
  tipo: "faixas",
  faixas: [
    {
      ate: 85,
      cor: CORES_RANKING.verdePastelClaro,
      descricao: "está(ão) abaixo do limite de 85% das receitas correntes",
    },
    {
      ate: 95,
      cor: CORES_RANKING.amareloMuitoClaro,
      descricao:
        "está(ão) acima do limite de alerta de 85% das receitas correntes",
    },
    {
      cor: CORES_RANKING.vermelhoPastel,
      descricao: "está(ão) acima do limite máximo de 95% das receitas correntes",
    },
  ],
  exibirQuantidade: true,
};

/** Endividamento (DCL/RCL): alerta 108% (90% do limite), máximo 120%. */
const CORES_ENDIVIDAMENTO: CoresRanking = {
  tipo: "faixas",
  faixas: [
    {
      ate: 108,
      cor: CORES_RANKING.verdePastelClaro,
      descricao: "Está(ão) abaixo dos limites",
    },
    {
      ate: 120,
      cor: CORES_RANKING.amareloMuitoClaro,
      descricao: "Está(ão) acima do limite de alerta (90% do limite legal)",
    },
    {
      cor: CORES_RANKING.amareloMostardaPastel,
      descricao: "Está(ão) acima do limite legal (120% da RCL)",
    },
  ],
  exibirQuantidade: true,
};

const DESCRICAO_SUPERAVIT_DEFICIT =
  "O superávit financeiro ocorre quando a diferença entre o ativo financeiro e o passivo financeiro é positiva; quando é negativa fica caracterizado o déficit financeiro.";

const DESCRICAO_LIMITE_PESSOAL_LRF =
  "A Lei de Responsabilidade Fiscal (LRF) determina que o limite de despesas com pessoal";

const PARA_CONHECER_RESTRICOES =
  "Para conhecer quais são as restrições e providências a serem tomadas quando são atingidos os limites consulte o manual de encerramento de mandato do TCE-ES.";

/** Ordem por categoria = ordem do site oficial. */
export const RANKINGS: RankingConfig[] = [
  // ---------------------------------------------------------------- receita
  {
    categoria: "receita",
    slug: "arrecadada",
    titulo: "Arrecadadas",
    tituloCompleto: "Receitas Arrecadadas",
    descricao:
      "Total de impostos, taxas, contribuições, transferências e outras fontes de recursos arrecadados pelo município e usadas para custear as despesas públicas e as necessidades de investimentos.",
    endpoint: "Receita/GetRankingReceitaArrecadada",
    formato: "monetario",
    tituloValor: "Receita arrecadada",
    chaveRankingMunicipio: "receita.receitaArrecadada",
    submenuOficial: "receitaArrecadada",
  },
  {
    categoria: "receita",
    slug: "arrecadada-per-capita",
    titulo: "Arrecadadas per capita",
    tituloCompleto: "Receitas Arrecadadas per capita",
    descricao:
      "Receita total arrecadada pelo município dividida pelo número de seus habitantes.",
    endpoint: "Receita/GetRankingReceitaArrecadadaPerCapita",
    formato: "perCapita",
    cores: CORES_RANKING_PER_CAPITA,
    tituloValor: "Receita per capita",
    chaveRankingMunicipio: "receita.receitaArrecadadaPerCapita",
    submenuOficial: "receitaArrecadadaPerCapita",
  },

  // ---------------------------------------------------------------- despesa
  {
    categoria: "despesa",
    slug: "empenhada",
    titulo: "Empenhadas",
    tituloCompleto: "Despesas Empenhadas",
    descricao:
      "Parcela do orçamento do município que foi reservado para o pagamento de compromissos assumidos com terceiros.",
    endpoint: "Despesa/GetRankingDespesaEmpenhada",
    formato: "monetario",
    tituloValor: "Despesa empenhada",
    chaveRankingMunicipio: "despesa.despesaEmpenhadaTotal",
    submenuOficial: "despesaEmpenhada",
  },
  {
    categoria: "despesa",
    slug: "empenhada-per-capita",
    titulo: "Empenhadas per capita",
    tituloCompleto: "Despesas Empenhadas per capita",
    descricao:
      "Total das despesas empenhadas do município dividido pelo número de seus habitantes.",
    endpoint: "Despesa/GetRankingDespesaEmpenhadaPerCapita",
    formato: "perCapita",
    cores: CORES_RANKING_PER_CAPITA,
    tituloValor: "Despesa per capita",
    chaveRankingMunicipio: "despesa.despesaEmpenhadaTotalPerCapita",
    submenuOficial: "despesaEmpenhadaPerCapita",
  },
  {
    categoria: "despesa",
    slug: "liquidada",
    titulo: "Liquidadas",
    tituloCompleto: "Despesas Liquidadas",
    descricao:
      "Total do orçamento do município correspondente ao direito adquirido pelos seus credores de receberem o pagamento. É o segundo estágio da execução da despesa, posterior ao empenho e anterior ao pagamento.",
    endpoint: "Despesa/GetRankingDespesaLiquidada",
    formato: "monetario",
    tituloValor: "Despesa liquidada",
    chaveRankingMunicipio: "despesa.despesaLiquidadaTotal",
    submenuOficial: "despesaLiquidada",
  },
  {
    categoria: "despesa",
    slug: "liquidada-per-capita",
    titulo: "Liquidadas per capita",
    tituloCompleto: "Despesas Liquidadas per capita",
    descricao:
      "Total das despesas liquidadas do município dividido pelo número de seus habitantes.",
    endpoint: "Despesa/GetRankingDespesaLiquidadaPerCapita",
    formato: "perCapita",
    cores: CORES_RANKING_PER_CAPITA,
    tituloValor: "Despesa per capita",
    chaveRankingMunicipio: "despesa.despesaLiquidadaTotalPerCapita",
    submenuOficial: "despesaLiquidadaPerCapita",
  },
  {
    categoria: "despesa",
    slug: "poder-legislativo",
    titulo: "Poder Legislativo",
    tituloCompleto: "Despesas do Poder Legislativo",
    descricao:
      "De acordo com o artigo 29-A da Constituição Federal o total da despesa do Poder Legislativo Municipal, incluídos os subsídios dos vereadores e excluídos os gastos com inativos, não poderá ultrapassar os seguintes percentuais, relativos ao somatório da receita tributária e das transferências, efetivamente realizado no exercício anterior: 7% (população de até 100.000 habitantes); 6% (entre 100.001 e 300.000); 5% (entre 300.001 e 500.000); 4,5% (entre 500.001 e 3.000.000); 4% (entre 3.000.001 e 8.000.000); 3,5% (acima de 8.000.001 habitantes).",
    observacao:
      "Quanto mais alta for a posição no ranking maior será a despesa do Poder Legislativo do município em relação à receita.",
    endpoint:
      "MunicipioControllers/PoderLegislativo/GetRankingDespesaLegislativoArtigo29A?idEsferaAdministrativa=null",
    adaptador: "artigo29A",
    formato: "percentual",
    cores: {
      tipo: "limiteDoItem",
      corAbaixo: CORES_RANKING.verdePastelClaro,
      corAcima: CORES_RANKING.vermelhoPastel,
      descricaoAbaixo: "Obedece",
      descricaoAcima: "Não obedece",
    },
    tituloValor: "Despesa (% da receita)",
    colunasExtras: [
      { campo: "valorExigido", titulo: "Limite", formato: "percentual" },
      { campo: "diferenca", titulo: "Diferença", formato: "percentual" },
    ],
    submenuOficial: "despesaLegislativo",
  },

  // -------------------------------------------------------------- resultado
  {
    categoria: "resultado",
    slug: "orcamentario",
    titulo: "Resultado Orçamentário",
    tituloCompleto: "Receitas Arrecadadas x Despesas Empenhadas",
    descricao:
      "Representa a diferença entre as Receitas Arrecadadas e as Despesas Empenhadas, conforme previsão da Lei Nacional de Direito Financeiro (4.320/64).",
    endpoint: "Resultado/GetRankingReceitaArrecadadaXDespesaEmpenhada",
    formato: "monetario",
    cores: CORES_RANKING_RESULTADO,
    tendenciaQuandoParcial: true,
    tituloValor: "Resultado",
    chaveRankingMunicipio: "resultado.receitaArrecadadaXDespesaEmpenhada",
    submenuOficial: "resultadoOrcamentario",
  },
  {
    categoria: "resultado",
    slug: "despesa-liquidada-x-receita-arrecadada",
    titulo: "Receitas Arrecadadas X Despesas Liquidadas",
    tituloCompleto: "Receitas Arrecadadas x Despesas Liquidadas",
    descricao:
      "Representa a diferença entre as Receitas Arrecadadas e as Despesas Liquidadas.",
    endpoint: "Resultado/GetRankingReceitaArrecadadaXDespesaLiquidada",
    formato: "monetario",
    cores: CORES_RANKING_RESULTADO,
    tituloValor: "Resultado",
    submenuOficial: "receitaArrecadadaDespesaLiquidada",
  },
  {
    categoria: "resultado",
    slug: "despesa-liquidada-x-despesa-paga",
    titulo: "Despesas Liquidadas x Despesas Pagas",
    tituloCompleto: "Despesas Liquidadas x Despesas Pagas",
    descricao:
      "Representa a diferença entre as Despesas Liquidadas e as Despesas Pagas.",
    endpoint: "Resultado/GetRankingDespesaLiquidadaXDespesaPaga",
    formato: "monetario",
    cores: CORES_RANKING_RESULTADO,
    tituloValor: "Diferença",
    submenuOficial: "despesaLiquidadaDespesaPaga",
  },

  // ----------------------------------------------------------- gestão fiscal
  {
    categoria: "gestao-fiscal",
    slug: "despesa-corrente-x-receita-corrente",
    titulo: "Despesas Correntes x Receitas Correntes",
    tituloCompleto: "Relação entre despesas correntes e receitas correntes",
    descricao:
      "Superado o percentual de 95%, é facultada a adoção do mecanismo de ajuste fiscal no município, previsto no art. 167-A da CF/88 (Constituição Federal). Superado o percentual de 85%, o chefe do poder executivo já pode implementar as medidas previstas nos incisos I a X do art. 167-A da CF/88, facultado aos demais Poderes e órgãos autônomos implementá-las em seus respectivos âmbitos.",
    observacao:
      "Quanto mais alta for a posição no ranking maior é a relação entre despesas correntes e receitas correntes.",
    endpoint:
      "MunicipioControllers/LimiteDespesaReceita/GetRankingLimiteDespesaReceita",
    formato: "percentual",
    cores: CORES_DESPESA_RECEITA_CORRENTE,
    tituloValor: "Despesas / receitas correntes",
    submenuOficial: "despesasCorrentesReceitasCorrentes",
  },
  {
    categoria: "gestao-fiscal",
    slug: "endividamento",
    titulo: "Endividamento",
    tituloCompleto: "Endividamento",
    descricao:
      "De acordo com a LRF (Lei de Responsabilidade Fiscal) e Resolução 40/2001 (Senado Federal) a Dívida Consolidada Líquida (DCL) municipal não pode ultrapassar 120% da Receita Corrente Líquida (RCL) do município. Alcança o limite de alerta o município que atingir 90% do limite acima (120%). A DCL é positiva quando a dívida pública supera as disponibilidades de caixa, as aplicações e os demais haveres financeiros. Por outro lado, a DCL é negativa quando ocorre o inverso.",
    observacao:
      "Quanto mais alta for a posição no ranking, maior é o endividamento.",
    endpoint: "Resultado/GetRankingEndividamento",
    formato: "percentual",
    cores: CORES_ENDIVIDAMENTO,
    tituloValor: "DCL / RCL",
    submenuOficial: "endividamento",
  },
  {
    categoria: "gestao-fiscal",
    slug: "superavit-e-deficit-financeiro",
    titulo: "Superávit / déficit consolidado",
    tituloCompleto: "Superávit / déficit consolidado",
    descricao: DESCRICAO_SUPERAVIT_DEFICIT,
    endpoint: "MunicipioControllers/BalancoPatrimonial/GetValorDeficitSuperavitRanking",
    formato: "monetario",
    tituloValor: "Superávit / déficit",
    submenuOficial: "balancoPatrimonial",
  },
  {
    categoria: "gestao-fiscal",
    slug: "balanco-patrimonial-rpps",
    titulo: "Superávit / déficit dos RPPS",
    tituloCompleto: "Superávit / déficit dos RPPS",
    descricao: DESCRICAO_SUPERAVIT_DEFICIT,
    endpoint: "MunicipioControllers/BalancoPatrimonial/GetValorDeficitSuperavitRPPS",
    formato: "monetario",
    tituloValor: "Superávit / déficit",
    submenuOficial: "balancoPatrimonialRPPS",
  },
  {
    categoria: "gestao-fiscal",
    slug: "balanco-patrimonial-exceto-rpps",
    titulo: "Superávit / déficit exceto RPPS",
    tituloCompleto: "Superávit / déficit exceto RPPS",
    descricao: DESCRICAO_SUPERAVIT_DEFICIT,
    endpoint:
      "MunicipioControllers/BalancoPatrimonial/GetValorDeficitSuperavitExcetoRPPS",
    formato: "monetario",
    tituloValor: "Superávit / déficit",
    submenuOficial: "balancoPatrimonialExcetoRPPS",
  },
  {
    categoria: "gestao-fiscal",
    slug: "balanco-patrimonial-x-rcl",
    titulo: "Superávit / déficit x RCL",
    tituloCompleto: "Superávit / déficit x RCL",
    descricao: `${DESCRICAO_SUPERAVIT_DEFICIT} Segundo a Lei de Responsabilidade Fiscal, RCL (Receita Corrente Líquida) é o somatório das receitas tributárias, de contribuições, patrimoniais, agropecuárias, industriais, de serviços, transferências correntes e outras receitas correntes do ente da Federação, deduzidos alguns itens exaustivamente explicitados no artigo 2º da LRF. A RCL é apurada somando-se as receitas arrecadadas no mês em referência e nos onze anteriores.`,
    endpoint:
      "MunicipioControllers/BalancoPatrimonial/GetValorDeficitSuperavitXRclRanking",
    formato: "percentual",
    tituloValor: "Superávit / déficit x RCL",
    submenuOficial: "balancoPatrimonialXRcl",
  },

  // ------------------------------------------------------------------ saúde
  {
    categoria: "saude",
    slug: "aplicacao",
    titulo: "Aplicação",
    tituloCompleto: "Aplicação em Saúde",
    descricao:
      "Total de recursos públicos do município aplicados em políticas públicas de saúde.",
    endpoint: "Saude/GetRankingSaudePorAplicacao",
    formato: "monetario",
    tituloValor: "Aplicação",
    chaveRankingMunicipio: "saude.saudePorAplicacao",
    submenuOficial: "saudePorAplicacao",
  },
  {
    categoria: "saude",
    slug: "aplicacao-per-capita",
    titulo: "Per capita",
    tituloCompleto: "Aplicação em Saúde per capita",
    descricao:
      "Total de recursos públicos do município aplicados em políticas públicas de saúde dividido pelo número de seus habitantes.",
    observacao:
      "Quanto mais alta for a posição no ranking maior é o investimento do município em Saúde para cada um dos seus habitantes.",
    endpoint: "Saude/GetRankingSaudePorPerCapita",
    formato: "perCapita",
    cores: CORES_RANKING_PER_CAPITA,
    tituloValor: "Aplicação per capita",
    chaveRankingMunicipio: "saude.saudePorPerCapita",
    submenuOficial: "saudePerCapita",
  },
  {
    categoria: "saude",
    slug: "limite-constitucional",
    titulo: "Limite constitucional",
    tituloCompleto: "Aplicação em Saúde - Limite Constitucional Mínimo",
    descricao:
      "A Constituição estabelece que os municípios devem aplicar 15%, no mínimo, da receita resultante de impostos, compreendida a proveniente de transferências, em ações e serviços públicos de saúde.",
    observacao:
      "Quanto mais alta for a posição no ranking maior é o comprometimento da receita do município em ações e serviços públicos de Saúde.",
    endpoint: "Saude/GetRankingSaudePorPercentual",
    formato: "percentual",
    tituloValor: "Aplicação",
    cores: getCoresLimiteMinimo(15),
    tendenciaQuandoParcial: true,
    chaveRankingMunicipio: "saude.saudePorPercentual",
    submenuOficial: "saudePorPercentual",
  },

  // --------------------------------------------------------------- educação
  {
    categoria: "educacao",
    slug: "aplicacao",
    titulo: "Aplicação",
    tituloCompleto: "Aplicação em Educação",
    descricao:
      "Total de recursos públicos do município aplicados em manutenção e desenvolvimento do ensino.",
    endpoint: "Educacao/GetRankingEducacaoPorAplicacao",
    formato: "monetario",
    tituloValor: "Aplicação",
    chaveRankingMunicipio: "educacao.educacaoPorAplicacao",
    submenuOficial: "educacaoPorAplicacao",
  },
  {
    categoria: "educacao",
    slug: "aplicacao-por-aluno",
    titulo: "Aplicação - Por aluno",
    tituloCompleto: "Aplicação em Educação Por Aluno",
    descricao:
      "Total de recursos públicos do município aplicados em manutenção e desenvolvimento do ensino dividido pelo número de alunos matriculados na rede pública de ensino municipal.",
    observacao:
      "Quanto mais alta for a posição no ranking maior é o investimento do município em manutenção e desenvolvimento do ensino por aluno da rede municipal.",
    endpoint: "Educacao/GetRankingEducacaoPorAluno",
    formato: "perCapita",
    cores: CORES_RANKING_PER_CAPITA,
    tituloValor: "Aplicação por aluno",
    chaveRankingMunicipio: "educacao.educacaoPorAluno",
    submenuOficial: "educacaoPorAluno",
  },
  {
    categoria: "educacao",
    slug: "limite-constitucional",
    titulo: "Aplicação em Manutenção e Desenvolvimento do Ensino - percentual",
    tituloCompleto: "Aplicação em Educação - Limite Constitucional Mínimo",
    descricao:
      "A Constituição estabelece que os municípios devem aplicar 25% (vinte e cinco), no mínimo, da receita resultante de impostos, compreendida a proveniente de transferências, na manutenção e desenvolvimento do ensino.",
    observacao:
      "Quanto mais alta for a posição no ranking maior é o investimento do município na manutenção e desenvolvimento do ensino com receita resultante de impostos, compreendida a proveniente de transferências.",
    endpoint: "Educacao/GetRankingEducacaoPorPercentual",
    formato: "percentual",
    cores: getCoresLimiteMinimo(25),
    tendenciaQuandoParcial: true,
    tituloValor: "Aplicação",
    chaveRankingMunicipio: "educacao.educacaoPorPercentual",
    submenuOficial: "educacaoPorPercentual",
  },
  {
    categoria: "educacao",
    slug: "recurso-fundeb",
    titulo: "Aplicação dos recursos FUNDEB",
    tituloCompleto: "Aplicação em Educação com recursos do FUNDEB",
    descricao:
      "Total de recursos do Fundo de Manutenção e Desenvolvimento da Educação Básica e de Valorização dos Profissionais da Educação – FUNDEB, aplicados na educação básica municipal.",
    endpoint: "Educacao/GetRankingEducacaoPorAplicacaoFUNDEB",
    formato: "monetario",
    tituloValor: "Aplicação FUNDEB",
    submenuOficial: "educacaoPorAplicacaoFUNDEB",
  },
  {
    categoria: "educacao",
    slug: "recurso-fundeb-por-aluno",
    titulo: "Aplicação dos recursos FUNDEB - Por aluno",
    tituloCompleto: "Aplicação em Educação com recursos do FUNDEB - Por Aluno",
    descricao:
      "Total de recursos do Fundo de Manutenção e Desenvolvimento da Educação Básica e de Valorização dos Profissionais da Educação – FUNDEB, aplicados na educação básica, dividido pelo número de alunos matriculados na educação básica municipal.",
    observacao:
      "Quanto mais alta for a posição no ranking maior é o investimento do município em educação básica por aluno, com recursos do FUNDEB.",
    endpoint: "Educacao/GetRankingEducacaoPorAlunoFUNDEB",
    formato: "perCapita",
    cores: CORES_RANKING_PER_CAPITA,
    tituloValor: "Aplicação FUNDEB por aluno",
    submenuOficial: "educacaoPorAlunoFUNDEB",
  },
  {
    categoria: "educacao",
    slug: "recurso-fundeb-remuneracao-do-magisterio",
    titulo:
      "Aplicação dos recursos Fundeb em remuneração dos profissionais da educação básica - percentual",
    tituloCompleto:
      "Aplicação dos recursos Fundeb em remuneração dos profissionais da educação básica",
    descricao:
      "A Constituição estabelece que pelo menos 70% (sessenta por cento) dos recursos do FUNDEB devem ser destinados ao pagamento da remuneração dos profissionais da educação básica em efetivo exercício na rede pública. Aplicação acima de 100%, significa que o município investiu todo o recurso recebido do FUNDEB em remuneração dos profissionais da educação básica, e teve que acrescentar sua aplicação com recursos próprios.",
    observacao:
      "Quanto mais alta for a posição no ranking maior é o investimento do município em remuneração dos profissionais da educação básica em efetivo exercício na rede pública, com recursos do FUNDEB.",
    endpoint: "Educacao/GetRankingEducacaoPercentualPorMagisterio",
    formato: "percentual",
    cores: getCoresLimiteMinimo(70),
    tituloValor: "Aplicação",
    submenuOficial: "municipioEducacaoMagisterio",
  },

  // ----------------------------------------------------------------- pessoal
  {
    categoria: "pessoal",
    slug: "receita-corrente-liquida",
    titulo: "Receitas Correntes Líquidas",
    tituloCompleto: "Receita Corrente Líquida - RCL",
    descricao:
      "Para os municípios, a receita corrente líquida é o somatório das receitas correntes obtidas nos últimos 12 meses, deduzidas as receitas de contribuições dos servidores para o regime próprio, bem como outras deduções previstas na Lei de Responsabilidade Fiscal.",
    endpoint: "PessoalConsolidado/GetRankingDespesaPessoalRCL",
    formato: "monetario",
    tituloValor: "RCL",
    submenuOficial: "despesaPessoalRCL",
  },
  {
    categoria: "pessoal",
    slug: "executivo-total-gasto",
    titulo: "Executivo > Total gasto",
    tituloCompleto: "Despesa com Pessoal do Poder Executivo",
    descricao:
      "Total de recursos públicos aplicados, pelo poder executivo do município, no pagamento de despesas com pessoal (folha de pagamento).",
    endpoint: "PessoalExecutivo/GetRankingDespesaPessoal",
    formato: "monetario",
    tituloValor: "Despesa com pessoal",
    chaveRankingMunicipio: "pessoalExecutivo.despesaPessoalExecutivo",
    submenuOficial: "despesaPessoalExecutivo",
  },
  {
    categoria: "pessoal",
    slug: "executivo-despesa-per-capita",
    titulo: "Executivo > Despesas per capita",
    tituloCompleto: "Despesa com Pessoal do Poder Executivo per capita",
    descricao:
      "Total de recursos públicos aplicados, pelo poder executivo do município, no pagamento de despesas com pessoal dividido pelo número de seus habitantes.",
    observacao:
      "Quanto mais alta for a posição no ranking maior é a despesa com pessoal do município para cada um dos seus habitantes.",
    endpoint: "PessoalExecutivo/GetRankingDespesaPessoalPerCapita",
    formato: "perCapita",
    cores: CORES_RANKING_PER_CAPITA,
    tituloValor: "Despesa per capita",
    chaveRankingMunicipio: "pessoalExecutivo.despesaPessoalExecutivoPerCapita",
    submenuOficial: "despesaPessoalExecutivoPerCapita",
  },
  {
    categoria: "pessoal",
    slug: "executivo-limite-lrf",
    titulo: "Executivo > Limites da LRF",
    tituloCompleto:
      "Despesa com Pessoal do Poder Executivo - Limites da Lei de Responsabilidade Fiscal",
    descricao: `${DESCRICAO_LIMITE_PESSOAL_LRF} para o Poder Executivo nos municípios não poderá exceder o percentual de 54% da Receita Corrente Líquida (RCL). Caso esses gastos atinjam 48,6% da RCL o TCE-ES emitirá parecer de alerta. Caso atinjam 51,3% da RCL será atingido o limite prudencial. ${PARA_CONHECER_RESTRICOES}`,
    observacao:
      "Quanto mais alta for a posição no ranking maior é o comprometimento da Receita Corrente Líquida do município com o pagamento de pessoal do Poder Executivo.",
    endpoint: "PessoalExecutivo/GetRankingDespesaPessoalPercentual",
    formato: "percentual",
    cores: CORES_PESSOAL_EXECUTIVO,
    tituloValor: "% da RCL",
    chaveRankingMunicipio: "pessoalExecutivo.despesaPessoalExecutivoPercentual",
    submenuOficial: "despesaPessoalExecutivoPercentual",
  },
  {
    categoria: "pessoal",
    slug: "legislativo-total-gasto",
    titulo: "Legislativo > Total gasto",
    tituloCompleto: "Despesa com Pessoal do Poder Legislativo",
    descricao:
      "Total de recursos públicos aplicados, pelo poder legislativo do município, no pagamento de despesas com pessoal (folha de pagamento).",
    endpoint: "PessoalLegislativo/GetRankingDespesaPessoal",
    formato: "monetario",
    tituloValor: "Despesa com pessoal",
    chaveRankingMunicipio: "pessoalLegislativo.despesaPessoalLegislativo",
    submenuOficial: "despesaPessoalLegislativo",
  },
  {
    categoria: "pessoal",
    slug: "legislativo-despesa-per-capita",
    titulo: "Legislativo > Despesas per capita",
    tituloCompleto: "Despesa com Pessoal do Poder Legislativo per capita",
    descricao:
      "Total de recursos públicos aplicados, pelo poder legislativo do município, no pagamento de despesas com pessoal dividido pelo número de seus habitantes.",
    observacao:
      "Quanto mais alta for a posição no ranking maior será a despesa com pessoal do município para cada um dos seus habitantes.",
    endpoint: "PessoalLegislativo/GetRankingDespesaPessoalPerCapita",
    formato: "perCapita",
    cores: CORES_RANKING_PER_CAPITA,
    tituloValor: "Despesa per capita",
    chaveRankingMunicipio:
      "pessoalLegislativo.despesaPessoalLegislativoPerCapita",
    submenuOficial: "despesaPessoalLegislativoPerCapita",
  },
  {
    categoria: "pessoal",
    slug: "legislativo-por-vereador",
    titulo: "Legislativo > Despesas Por Vereador",
    tituloCompleto: "Despesa com Pessoal do Poder Legislativo Por Vereador",
    descricao:
      "Total de recursos públicos aplicados, pelo poder legislativo do município, no pagamento de despesas com pessoal (folha de pagamento), dividido pelo número de seus vereadores.",
    observacao:
      "Quanto mais alta for a posição no ranking maior é o gasto com pessoal do Poder Legislativo proporcionalmente ao número de vereadores do município.",
    endpoint:
      "PessoalLegislativo/GetRankingDespesaPessoalLegislativoGastoPorVereador",
    formato: "monetario",
    tituloValor: "Despesa por vereador",
    chaveRankingMunicipio:
      "pessoalLegislativo.despesaPessoalLegislativoPorVereador",
    submenuOficial: "despesaPessoalLegislativoGastoPorVereador",
  },
  {
    categoria: "pessoal",
    slug: "legislativo-limite-lrf",
    titulo: "Legislativo > Limites da LRF",
    tituloCompleto:
      "Despesa com Pessoal do Poder Legislativo - Limites da Lei de Responsabilidade Fiscal",
    descricao:
      "Total de recursos públicos aplicados, pelo poder legislativo do município, no pagamento de despesas com pessoal (folha de pagamento), em percentual da Receita Corrente Líquida (RCL).",
    observacao:
      "Limites usados na legenda: alerta em 5,4%, prudencial em 5,7% e máximo em 6% da RCL.",
    endpoint: "PessoalLegislativo/GetRankingDespesaPessoalPercentual",
    formato: "percentual",
    cores: CORES_PESSOAL_LEGISLATIVO,
    tituloValor: "% da RCL",
    chaveRankingMunicipio:
      "pessoalLegislativo.despesaPessoalLegislativoPercentual",
    submenuOficial: "despesaPessoalLegislativoPercentual",
  },
  {
    categoria: "pessoal",
    slug: "consolidado-total-gasto",
    titulo: "Consolidado > Total gasto",
    tituloCompleto: "Despesa com Pessoal Consolidada (Poder Legislativo e Executivo)",
    descricao:
      "Total de recursos públicos aplicados, pelo município, no pagamento de despesas com pessoal (folha de pagamento) dos Poderes Legislativo e Executivo.",
    endpoint: "PessoalConsolidado/GetRankingDespesaPessoal",
    formato: "monetario",
    tituloValor: "Despesa com pessoal",
    chaveRankingMunicipio: "pessoalConsolidado.despesaPessoalConsolidado",
    submenuOficial: "despesaPessoalConsolidado",
  },
  {
    categoria: "pessoal",
    slug: "consolidado-despesa-per-capita",
    titulo: "Consolidado > Despesas per capita",
    tituloCompleto:
      "Despesa com Pessoal Consolidada (Executivo e Legislativo) per capita",
    descricao:
      "Total de recursos públicos aplicados, pelo município, no pagamento de despesas com pessoal (folha de pagamento) dos Poderes Executivo e Legislativo, dividido pelo número de seus habitantes.",
    observacao:
      "Quanto mais alta for a posição no ranking maior será a despesa com pessoal do município para cada um dos seus habitantes.",
    endpoint: "PessoalConsolidado/GetRankingDespesaPessoalPerCapita",
    formato: "perCapita",
    cores: CORES_RANKING_PER_CAPITA,
    tituloValor: "Despesa per capita",
    chaveRankingMunicipio:
      "pessoalConsolidado.despesaPessoalConsolidadoPerCapita",
    submenuOficial: "despesaPessoalConsolidadoPerCapita",
  },
  {
    categoria: "pessoal",
    slug: "consolidado-limite-lrf",
    titulo: "Consolidado > Limites da LRF",
    tituloCompleto:
      "Despesa com Pessoal Consolidada (Executivo e Legislativo) - Limites da Lei de Responsabilidade Fiscal",
    descricao: `${DESCRICAO_LIMITE_PESSOAL_LRF} dos municípios não poderá exceder o percentual de 60% da Receita Corrente Líquida (RCL). Caso esses gastos atinjam 54% da RCL o TCE-ES emitirá parecer de alerta. Caso atinjam 57% da RCL será atingido o limite prudencial. ${PARA_CONHECER_RESTRICOES}`,
    observacao:
      "Quanto mais alta for a posição no ranking maior é o comprometimento da Receita Corrente Líquida do município com o pagamento de pessoal.",
    endpoint: "PessoalConsolidado/GetRankingDespesaPessoalPercentual",
    formato: "percentual",
    cores: CORES_PESSOAL_CONSOLIDADO,
    tituloValor: "% da RCL",
    chaveRankingMunicipio:
      "pessoalConsolidado.despesaPessoalConsolidadoPercentual",
    submenuOficial: "despesaPessoalConsolidadoPercentual",
  },
];

// Fora do escopo (formatos/controllers que não cabem em `RankingItem[]` ou sem dados na API):
// CAPAG, IVF, Previdência, Cumprimento de deliberações, ISP e VAAT. Ver docs/RANKINGS.md.

export function getChaveRanking(config: Pick<RankingConfig, "categoria" | "slug">) {
  return `${config.categoria}/${config.slug}`;
}

/** Busca pela chave `categoria/slug` (ex.: `receita/arrecadada`). */
export function getRankingConfig(chave: string) {
  return RANKINGS.find((ranking) => getChaveRanking(ranking) === chave);
}

export function getRankingsPorCategoria(categoria: string) {
  return RANKINGS.filter((ranking) => ranking.categoria === categoria);
}

/** Categorias que têm ao menos um ranking configurado, com seus rankings. */
export function getCategoriasComRankings() {
  return CATEGORIAS_RANKING.map((categoria) => ({
    ...categoria,
    rankings: getRankingsPorCategoria(categoria.slug),
  })).filter((categoria) => categoria.rankings.length > 0);
}
