import { Pagina, gerarAnos } from "@/shared/paginas";

export const SLUG_GESTAO_ORCAMENTARIA = "gestao-orcamentaria";

/**
 * Gestão orçamentária do município (/municipio/[ano]/[municipio]/gestao-orcamentaria/<slug>).
 * Cadastro completo do site oficial, na ordem do menu. O antigo
 * "planejamento-governamental" não existe no site oficial: foi substituído por
 * diretrizes-orcamentarias + programas-e-acoes (a rota fallback redireciona).
 * Para ligar uma página: crie `<slug>/page.tsx` e troque `implementado` para true.
 */
export const PAGINAS_GESTAO_ORCAMENTARIA: Pagina[] = [
  // #9
  {
    slug: "plano-plurianual",
    titulo: "Plano plurianual",
    implementado: true,
    anos: [2026, 2022, 2018],
  },
  // #10 daqui para baixo
  {
    slug: "diretrizes-orcamentarias",
    titulo: "Diretrizes orçamentárias",
    implementado: true,
    anos: [2026, 2022, 2018],
  },
  {
    slug: "programas-e-acoes",
    titulo: "Programas e ações",
    implementado: true,
    anos: gerarAnos(2018),
  },
  {
    slug: "receitas",
    titulo: "Receitas",
    implementado: true,
    anos: gerarAnos(2013),
  },
  {
    slug: "despesas",
    titulo: "Despesas",
    implementado: true,
    anos: gerarAnos(2013),
  },
  {
    slug: "destino-do-dinheiro",
    titulo: "Destino do dinheiro",
    implementado: true,
    anos: gerarAnos(2013),
  },
  {
    slug: "resultado-orcamentario",
    titulo: "Resultado orçamentário",
    implementado: true,
    anos: gerarAnos(2014),
  },
];
