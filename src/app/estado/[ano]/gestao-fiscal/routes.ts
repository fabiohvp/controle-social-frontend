import { Pagina, gerarAnos } from "@/shared/paginas";

export const SLUG_GESTAO_FISCAL = "gestao-fiscal";

/**
 * Gestão fiscal do Estado (/estado/[ano]/gestao-fiscal/<slug>).
 * Cadastro completo do site oficial, na ordem do menu. Para ligar uma página:
 * crie `<slug>/page.tsx` e troque `implementado` para true.
 */
export const PAGINAS_GESTAO_FISCAL: Pagina[] = [
  // #9
  {
    slug: "meta-arrecadacao",
    titulo: "Metas de arrecadação",
    implementado: true,
    anos: gerarAnos(2016),
  },
  // #8 (página de referência)
  {
    slug: "receita-corrente-liquida",
    titulo: "RCL",
    tituloCompleto: "Receita corrente líquida",
    implementado: true,
    anos: gerarAnos(2016),
  },
  // #14 daqui para baixo
  {
    slug: "despesas-correntes-x-receitas-correntes",
    titulo: "Despesas correntes x receitas correntes",
    implementado: true,
    anos: gerarAnos(2021),
  },
  {
    slug: "resultado-primario",
    titulo: "Resultado primário",
    implementado: true,
    anos: gerarAnos(2016),
  },
  {
    slug: "resultado-nominal",
    titulo: "Resultado nominal",
    implementado: true,
    anos: gerarAnos(2016),
  },
  {
    slug: "endividamento",
    titulo: "Endividamento",
    implementado: true,
    anos: gerarAnos(2016),
  },
  {
    slug: "pessoal",
    titulo: "Limites com pessoal",
    implementado: true,
    anos: gerarAnos(2016),
  },
  {
    slug: "saude",
    titulo: "Limites com saúde",
    implementado: true,
    anos: gerarAnos(2016),
  },
  {
    slug: "educacao",
    titulo: "Limites com educação",
    implementado: true,
    anos: gerarAnos(2016),
  },
  {
    slug: "educacao-fundeb",
    titulo: "Educação - FUNDEB",
    implementado: true,
    anos: gerarAnos(2013),
  },
  {
    slug: "destinacao-fundeb",
    titulo: "Destinação ao FUNDEB",
    implementado: true,
    anos: gerarAnos(2016),
  },
];
