import { gerarAnos } from "@/shared/paginas";
import {
  PaginaPrevidencia,
  isFundoFinanceiro,
  isFundoPrevidenciario,
  isInstituto,
} from "@/shared/previdencia";

export const SLUG_PREVIDENCIA = "previdencia";

/**
 * Previdência do município:
 * /municipio/[ano]/[municipio]/previdencia/<slug>/<codigoUG>, ex.:
 * /municipio/2024/vitoria/previdencia/receitas/077E0800001.
 * A page fica em `previdencia/<slug>/[[...unidadeGestora]]/page.tsx` e usa
 * `getUnidadeGestoraDaPagina` (src/shared/previdenciaServer.ts) para validar a
 * UG ou redirecionar para a primeira válida. Cadastro completo do site
 * oficial; `implementado: false` fica oculto. Tudo aqui é da #12.
 */
export const PAGINAS_PREVIDENCIA: PaginaPrevidencia[] = [
  {
    slug: "receitas",
    titulo: "Receitas",
    implementado: true,
    anos: gerarAnos(2017),
  },
  {
    slug: "despesas",
    titulo: "Despesas",
    implementado: true,
    anos: gerarAnos(2017),
  },
  {
    slug: "patrimonio",
    titulo: "Patrimônio",
    implementado: true,
    anos: gerarAnos(2017),
  },
  {
    slug: "resultado-atuarial",
    titulo: "Resultado atuarial",
    implementado: true,
    anos: gerarAnos(2017),
  },
  {
    slug: "projecoes-atuariais",
    titulo: "Projeções atuariais",
    implementado: true,
    anos: gerarAnos(2019),
    // site oficial: com segregação de massa, o instituto não tem projeção própria
    filtrarUnidadesGestoras: (ugs) =>
      ugs.some(isFundoFinanceiro) ? ugs.filter((ug) => !isInstituto(ug)) : ugs,
  },
  {
    slug: "plano-amortizacao",
    titulo: "Plano de amortização",
    implementado: true,
    anos: gerarAnos(2024),
    // site oficial: só o instituto (sem segregação) ou o fundo previdenciário
    filtrarUnidadesGestoras: (ugs) =>
      ugs.every(isInstituto) ? ugs : ugs.filter(isFundoPrevidenciario),
  },
  {
    slug: "segurados",
    titulo: "Segurados",
    tituloCompleto: "Segurados do RPPS",
    implementado: true,
    anos: gerarAnos(2017),
  },
  {
    slug: "contribuicoes-previdenciarias",
    titulo: "Contribuições previdenciárias",
    implementado: true,
    anos: gerarAnos(2020),
  },
  {
    slug: "situacao-previdenciaria",
    titulo: "Situação previdenciária",
    implementado: true,
    anos: gerarAnos(2018),
  },
];
