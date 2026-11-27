import { gerarAnos } from "@/shared/paginas";
import {
  PaginaPrevidencia,
  UnidadeGestoraPrevidencia,
  isInstituto,
} from "@/shared/previdencia";

export const SLUG_PREVIDENCIA = "previdencia";

/** Site oficial: projeções e resultado atuarial só existem para os fundos (sem IPAJM) */
function semInstituto(ugs: UnidadeGestoraPrevidencia[]) {
  return ugs.filter((ug) => !isInstituto(ug));
}

/**
 * Previdência do Estado (servidores civis):
 * /estado/[ano]/previdencia/<slug>/<codigoUG>, ex.:
 * /estado/2024/previdencia/receitas/500E0800001 (IPAJM; Fundo Financeiro =
 * 500E0900001; Fundo Previdenciário = 500E0900002). A page fica em
 * `previdencia/<slug>/[[...unidadeGestora]]/page.tsx` e usa
 * `getUnidadeGestoraDaPagina` (src/shared/previdenciaServer.ts).
 * Tudo aqui é da #15.
 */
export const PAGINAS_PREVIDENCIA: PaginaPrevidencia[] = [
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
    slug: "patrimonio",
    titulo: "Patrimônio",
    implementado: true,
    anos: gerarAnos(2019),
  },
  {
    slug: "projecoes-atuariais",
    titulo: "Projeções atuariais",
    implementado: true,
    anos: gerarAnos(2019),
    filtrarUnidadesGestoras: semInstituto,
  },
  {
    slug: "resultado-atuarial",
    titulo: "Resultado atuarial",
    implementado: true,
    anos: gerarAnos(2019),
    filtrarUnidadesGestoras: semInstituto,
  },
  {
    slug: "situacao-previdenciaria",
    titulo: "Situação previdenciária",
    implementado: true,
    anos: gerarAnos(2018),
  },
];
