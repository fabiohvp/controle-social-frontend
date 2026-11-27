import { Pagina, gerarAnos } from "@/shared/paginas";

export const SLUG_GESTAO_FISCAL = "gestao-fiscal";

/**
 * Gestão fiscal do município (/municipio/[ano]/[municipio]/gestao-fiscal/<slug>).
 * Cadastro completo do site oficial, na ordem do menu; `anos` = anos do
 * seletor no site oficial. Para ligar uma página: crie `<slug>/page.tsx` e
 * troque `implementado` para true.
 */
export const PAGINAS_GESTAO_FISCAL: Pagina[] = [
  // #9
  {
    slug: "meta-arrecadacao",
    titulo: "Metas de arrecadação",
    implementado: true,
    anos: gerarAnos(2013),
  },
  // #8 (página de referência)
  {
    slug: "receita-corrente-liquida",
    titulo: "RCL",
    tituloCompleto: "Receita corrente líquida",
    implementado: true,
    anos: gerarAnos(2018),
  },
  // #11 daqui para baixo
  {
    slug: "capag",
    titulo: "Capacidade de pagamento TCEES",
    tituloCompleto: "CAPAG - Capacidade de pagamento TCEES",
    implementado: true,
    anos: gerarAnos(2018),
  },
  {
    slug: "indice-vulnerabilidade-fiscal",
    titulo: "Índice de Vulnerabilidade Fiscal",
    implementado: true,
    anos: gerarAnos(2023),
  },
  {
    slug: "despesas-correntes-x-receitas-correntes",
    titulo: "Despesas correntes x receitas correntes",
    implementado: true,
    anos: gerarAnos(2021),
  },
  {
    slug: "endividamento",
    titulo: "Endividamento",
    implementado: true,
    anos: gerarAnos(2020),
  },
  {
    slug: "superavit-deficit",
    titulo: "Superávit/déficit financeiro",
    implementado: true,
    anos: gerarAnos(2021, 2025),
  },
  {
    slug: "pessoal",
    titulo: "Limites com pessoal",
    implementado: true,
    anos: gerarAnos(2013),
  },
  {
    slug: "saude",
    titulo: "Limites com saúde",
    implementado: true,
    anos: gerarAnos(2013),
  },
  {
    slug: "educacao",
    titulo: "Limites com educação",
    implementado: true,
    anos: gerarAnos(2013),
  },
  {
    slug: "educacao-fundeb",
    titulo: "Educação - FUNDEB",
    implementado: true,
    anos: gerarAnos(2013),
  },
  {
    slug: "alertas-lrf",
    titulo: "Alertas LRF",
    implementado: true,
    anos: gerarAnos(2013),
  },
];
