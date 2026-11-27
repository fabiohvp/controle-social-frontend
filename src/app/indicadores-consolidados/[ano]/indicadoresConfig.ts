/** Temas da sidebar/breadcrumb (ordem de exibição). */
export type GrupoIndicadorSlug =
  | "receita"
  | "despesa"
  | "resultado"
  | "pessoal"
  | "educacao"
  | "saude"
  | "previdencia"
  | "alertas"
  | "capag"
  | "ivf"
  | "iegm";

export type GrupoIndicador = {
  slug: GrupoIndicadorSlug;
  titulo: string;
};

export const GRUPOS_INDICADOR: GrupoIndicador[] = [
  { slug: "receita", titulo: "Receitas" },
  { slug: "despesa", titulo: "Despesas" },
  { slug: "resultado", titulo: "Resultado" },
  { slug: "pessoal", titulo: "Pessoal" },
  { slug: "educacao", titulo: "Educação" },
  { slug: "saude", titulo: "Saúde" },
  { slug: "previdencia", titulo: "Previdência" },
  { slug: "alertas", titulo: "Alertas LRF" },
  { slug: "capag", titulo: "CAPAG" },
  { slug: "ivf", titulo: "IVF" },
  { slug: "iegm", titulo: "IEGM" },
];

export type IndicadorConfig = {
  /** Pasta da rota (kebab-case): `/indicadores-consolidados/:ano/<slug>`. */
  slug: string;
  grupo: GrupoIndicadorSlug;
  /** Nome curto do menu/breadcrumb (ex.: "Composição"). */
  titulo: string;
  /** Título da página e da aba do navegador (igual ao site oficial). */
  tituloCompleto: string;
  /** Aba do site oficial (`/indicadoresConsolidados/:ano/:abaSelecionada`), para referência. */
  abaOficial: string;
};

/**
 * Uma página = uma entrada aqui + `page.tsx` em `<slug>/`
 * (ver `docs/INDICADORES.md`). A ordem do array é a ordem do menu dentro do grupo.
 */
export const INDICADORES: IndicadorConfig[] = [
  // Receitas
  {
    slug: "receita",
    grupo: "receita",
    titulo: "Receitas",
    tituloCompleto: "Receitas",
    abaOficial: "receitas",
  },
  {
    slug: "receita-composicao",
    grupo: "receita",
    titulo: "Composição",
    tituloCompleto: "Receitas - Composição",
    abaOficial: "receitasComposicao",
  },
  {
    slug: "receita-destaque",
    grupo: "receita",
    titulo: "Destaque",
    tituloCompleto: "Receitas - Destaque",
    abaOficial: "receitasDestaque",
  },
  // Despesas
  {
    slug: "despesa",
    grupo: "despesa",
    titulo: "Despesas",
    tituloCompleto: "Despesas",
    abaOficial: "despesas",
  },
  {
    slug: "despesa-composicao",
    grupo: "despesa",
    titulo: "Composição",
    tituloCompleto: "Despesas - Composição",
    abaOficial: "despesasComposicao",
  },
  {
    slug: "despesa-destaque",
    grupo: "despesa",
    titulo: "Destaque",
    tituloCompleto: "Despesas - Destaque",
    abaOficial: "despesasDestaque",
  },
  {
    slug: "despesa-corrente-x-receita-corrente",
    grupo: "despesa",
    titulo: "Despesas x Receitas correntes",
    tituloCompleto: "Despesas Correntes X Receitas Correntes",
    abaOficial: "despesasReceitas",
  },
  // Resultado
  {
    slug: "resultado-orcamentario",
    grupo: "resultado",
    titulo: "Resultado orçamentário",
    tituloCompleto: "Resultado Orçamentário",
    abaOficial: "resultadoOrcamentario",
  },
  // Pessoal
  {
    slug: "pessoal",
    grupo: "pessoal",
    titulo: "Pessoal",
    tituloCompleto: "Pessoal",
    abaOficial: "pessoal",
  },
  // Educação
  {
    slug: "educacao",
    grupo: "educacao",
    titulo: "Educação",
    tituloCompleto: "Educação",
    abaOficial: "educacao",
  },
  {
    slug: "educacao-fundeb",
    grupo: "educacao",
    titulo: "FUNDEB",
    tituloCompleto: "Educação - FUNDEB",
    abaOficial: "educacaoFundeb",
  },
  // Saúde
  {
    slug: "saude",
    grupo: "saude",
    titulo: "Saúde",
    tituloCompleto: "Saúde",
    abaOficial: "saude",
  },
  // Previdência
  {
    slug: "previdencia-financeiro",
    grupo: "previdencia",
    titulo: "Financeiro",
    tituloCompleto: "Previdência - Financeiro",
    abaOficial: "previdenciaFinanceiro",
  },
  {
    slug: "previdencia-resultado-atuarial",
    grupo: "previdencia",
    titulo: "Resultado atuarial",
    tituloCompleto: "Previdência - Resultado Atuarial",
    abaOficial: "previdenciaResultadoAtuarial",
  },
  {
    slug: "previdencia-segurados",
    grupo: "previdencia",
    titulo: "Segurados",
    tituloCompleto: "Previdência - Segurados",
    abaOficial: "previdenciaSegurados",
  },
  {
    slug: "previdencia-situacao-previdenciaria",
    grupo: "previdencia",
    titulo: "Situação previdenciária",
    tituloCompleto: "Previdência - Situação Previdenciária",
    abaOficial: "previdenciaSituacao",
  },
  // Alertas LRF
  {
    slug: "alerta-antecipacao-orcamentaria",
    grupo: "alertas",
    titulo: "Antecipação de receitas orçamentárias",
    tituloCompleto: "Alertas - Antecipação de receitas orçamentárias",
    abaOficial: "antecipacaoReceitasOrcamentarias",
  },
  {
    slug: "alerta-despesa-com-pessoal",
    grupo: "alertas",
    titulo: "Despesa com pessoal",
    tituloCompleto: "Alertas - Despesa com pessoal",
    abaOficial: "despesaPessoal",
  },
  {
    slug: "alerta-divida-consolidada",
    grupo: "alertas",
    titulo: "Dívida consolidada",
    tituloCompleto: "Alertas - Dívida consolidada",
    abaOficial: "dividaConsolidada",
  },
  {
    slug: "alerta-garantia-e-contra-garantia",
    grupo: "alertas",
    titulo: "Garantia e contra-garantia",
    tituloCompleto: "Alertas - Garantia e contra-garantia",
    abaOficial: "garantiaContraGarantia",
  },
  {
    slug: "alerta-meta-de-arrecadacao",
    grupo: "alertas",
    titulo: "Meta de arrecadação",
    tituloCompleto: "Alertas - Meta de arrecadação",
    abaOficial: "metaArrecadacao",
  },
  {
    slug: "alerta-operacao-de-credito",
    grupo: "alertas",
    titulo: "Operação de crédito",
    tituloCompleto: "Alertas - Operação de crédito",
    abaOficial: "operacaoCredito",
  },
  {
    slug: "alerta-resultado-nominal",
    grupo: "alertas",
    titulo: "Resultado nominal",
    tituloCompleto: "Alertas - Resultado nominal",
    abaOficial: "resultadoNominal",
  },
  {
    slug: "alerta-resultado-primario",
    grupo: "alertas",
    titulo: "Resultado primário",
    tituloCompleto: "Alertas - Resultado primário",
    abaOficial: "resultadoPrimario",
  },
  {
    slug: "alerta-despesas-correntes-x-receitas-correntes",
    grupo: "alertas",
    titulo: "Receitas e Despesas Correntes",
    tituloCompleto: "Alertas - Relação de Receitas e Despesas Correntes",
    abaOficial: "despesasXReceitasCorrentes",
  },
  // CAPAG
  {
    slug: "capag",
    grupo: "capag",
    titulo: "Capacidade de pagamento",
    tituloCompleto: "CAPAG - Capacidade de pagamento TCEES",
    abaOficial: "capacidadePagamento",
  },
  {
    slug: "capag-endividamento",
    grupo: "capag",
    titulo: "Endividamento",
    tituloCompleto: "CAPAG - Endividamento TCEES",
    abaOficial: "endividamentoCapag",
  },
  {
    slug: "capag-liquidez",
    grupo: "capag",
    titulo: "Liquidez relativa",
    tituloCompleto: "CAPAG - Liquidez relativa TCEES",
    abaOficial: "liquidezCapag",
  },
  {
    slug: "capag-poupanca-corrente",
    grupo: "capag",
    titulo: "Poupança corrente",
    tituloCompleto: "CAPAG - Poupança corrente TCEES",
    abaOficial: "poupancaCorrenteCapag",
  },
  // IVF
  {
    slug: "indice-vulnerabilidade-fiscal",
    grupo: "ivf",
    titulo: "IVF Geral",
    tituloCompleto: "IVF - Índice de Vulnerabilidade Fiscal",
    abaOficial: "indiceVulnerabilidadeFiscal",
  },
  {
    slug: "ivf-endividamento",
    grupo: "ivf",
    titulo: "Endividamento",
    tituloCompleto: "IVF - Endividamento",
    abaOficial: "ivfEndividamento",
  },
  {
    slug: "ivf-liquidez",
    grupo: "ivf",
    titulo: "Liquidez",
    tituloCompleto: "IVF - Liquidez",
    abaOficial: "ivfLiquidez",
  },
  {
    slug: "ivf-margem",
    grupo: "ivf",
    titulo: "Margem",
    tituloCompleto: "IVF - Margem",
    abaOficial: "ivfMargem",
  },
  // IEGM
  {
    slug: "iegm",
    grupo: "iegm",
    titulo: "IEGM",
    tituloCompleto: "IEGM",
    abaOficial: "iegm",
  },
];

export function getIndicadorConfig(slug?: string) {
  return INDICADORES.find((indicador) => indicador.slug === slug);
}

export function getIndicadoresPorGrupo(grupo?: string) {
  return INDICADORES.filter((indicador) => indicador.grupo === grupo);
}

export function getGrupoIndicador(slug?: string) {
  return GRUPOS_INDICADOR.find((grupo) => grupo.slug === slug);
}

/** Grupo de uma página (a partir do slug da rota). */
export function getGrupoDoIndicador(slug?: string) {
  return getGrupoIndicador(getIndicadorConfig(slug)?.grupo);
}
