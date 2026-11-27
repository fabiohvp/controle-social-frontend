import { Pagina, gerarAnos } from "@/shared/paginas";

/**
 * Páginas na raiz do município (/municipio/[ano]/[municipio]/<slug>).
 * Cadastro completo do site oficial; `implementado: false` fica oculto.
 * Para ligar uma página: crie `(root)/<slug>/page.tsx` e troque o flag aqui.
 */
export const PAGINAS_RAIZ_MUNICIPIO = {
  visaoGeral: {
    slug: "visao-geral",
    titulo: "Visão geral",
    implementado: true,
  },
  obrigacoes: {
    slug: "obrigacao-de-envio",
    titulo: "Obrigações",
    tituloCompleto: "Obrigações junto ao TCE-ES",
    implementado: true,
    anos: gerarAnos(2016),
  },
  // #13
  rankings: {
    slug: "rankings",
    titulo: "Rankings",
    tituloCompleto: "Posições nos rankings",
    implementado: true,
    anos: gerarAnos(2009),
  },
  prestacaoConta: {
    slug: "prestacao-conta",
    titulo: "Prestação de contas",
    tituloCompleto: "Prestações de contas",
    implementado: true,
  },
  // #13
  fiscalizacoes: {
    slug: "fiscalizacoes",
    titulo: "Fiscalizações",
    implementado: true,
  },
  // #13
  iegm: {
    slug: "iegm",
    titulo: "IEGM",
    tituloCompleto: "Índice de Efetividade da Gestão Municipal",
    implementado: true,
    anos: [2023, 2018, 2017, 2016, 2015],
  },
  // #13
  maisInformacoes: {
    slug: "mais-informacoes",
    titulo: "Mais informações",
    implementado: true,
  },
} satisfies Record<string, Pagina>;

export const LISTA_PAGINAS_RAIZ_MUNICIPIO: Pagina[] = Object.values(
  PAGINAS_RAIZ_MUNICIPIO
);
