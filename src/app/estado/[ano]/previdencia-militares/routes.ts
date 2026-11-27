import { gerarAnos } from "@/shared/paginas";
import { PaginaPrevidencia } from "@/shared/previdencia";

export const SLUG_PREVIDENCIA_MILITARES = "previdencia-militares";

/**
 * Previdência dos militares (Fundo de Proteção Social dos Militares):
 * /estado/[ano]/previdencia-militares/<slug>/500E2900001. A page fica em
 * `previdencia-militares/<slug>/[[...unidadeGestora]]/page.tsx` e usa
 * `getUnidadeGestoraDaPagina` com `getUnidadesGestorasPrevidenciaMilitares()`.
 * Tudo aqui é da #15.
 */
export const PAGINAS_PREVIDENCIA_MILITARES: PaginaPrevidencia[] = [
  {
    slug: "receitas",
    titulo: "Receitas",
    implementado: true,
    anos: gerarAnos(2020),
  },
  {
    slug: "despesas",
    titulo: "Despesas",
    implementado: true,
    anos: gerarAnos(2020),
  },
  {
    slug: "projecoes-atuariais",
    titulo: "Projeções atuariais",
    implementado: true,
    anos: gerarAnos(2020, 2024),
  },
  {
    slug: "resultado-atuarial",
    titulo: "Resultado atuarial",
    implementado: true,
    anos: gerarAnos(2020, 2025),
  },
  {
    slug: "segurados",
    titulo: "Segurados",
    implementado: true,
    anos: gerarAnos(2022),
  },
];
