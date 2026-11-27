import { Pagina, gerarAnos } from "@/shared/paginas";

/**
 * Páginas na raiz do Estado (/estado/[ano]/<slug>).
 * Cadastro completo do site oficial; `implementado: false` fica oculto.
 * Para ligar uma página: crie `(root)/<slug>/page.tsx` e troque o flag aqui.
 */
export const PAGINAS_RAIZ_ESTADO = {
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
  prestacaoConta: {
    slug: "prestacao-conta",
    titulo: "Prestação de contas",
    tituloCompleto: "Prestações de contas",
    implementado: true,
    anos: gerarAnos(2009, 2024),
  },
  // #15
  fiscalizacoes: {
    slug: "fiscalizacoes",
    titulo: "Fiscalizações",
    implementado: false,
  },
  // #15
  iege: {
    slug: "iege",
    titulo: "IEGE",
    tituloCompleto: "Índice de Efetividade da Gestão Estadual",
    implementado: false,
    anos: [2019, 2018, 2017],
  },
} satisfies Record<string, Pagina>;

export const LISTA_PAGINAS_RAIZ_ESTADO: Pagina[] =
  Object.values(PAGINAS_RAIZ_ESTADO);
