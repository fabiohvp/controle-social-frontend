import { Pagina, gerarAnos } from "@/shared/paginas";

export const SLUG_GESTAO_ORCAMENTARIA = "gestao-orcamentaria";

/**
 * Gestão orçamentária do Estado (/estado/[ano]/gestao-orcamentaria/<slug>).
 * Cadastro completo do site oficial. O Estado NÃO tem plano plurianual nem
 * planejamento governamental no site oficial: os stubs antigos foram
 * removidos e a rota fallback redireciona esses slugs.
 * Para ligar uma página: crie `<slug>/page.tsx` e troque `implementado` para true.
 * Tudo aqui é da #14.
 */
export const PAGINAS_GESTAO_ORCAMENTARIA: Pagina[] = [
  {
    slug: "receitas",
    titulo: "Receitas",
    implementado: true,
    anos: gerarAnos(2016),
  },
  {
    slug: "despesas",
    titulo: "Despesas",
    implementado: true,
    anos: gerarAnos(2016),
  },
  {
    slug: "despesas-por-poder",
    titulo: "Despesas por poder",
    implementado: true,
    anos: gerarAnos(2016),
  },
  {
    slug: "resultado-orcamentario",
    titulo: "Resultado orçamentário",
    implementado: true,
    anos: gerarAnos(2016),
  },
];
