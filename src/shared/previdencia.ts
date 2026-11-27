import { Pagina } from "./paginas";

/*
 * Tipos e regras de previdência que podem ser importados em client components.
 * Leitura de arquivos/redirect ficam em `previdenciaServer.ts`.
 */

/** UG de regime próprio de previdência (RPPS) exibida no seletor do breadcrumb */
export type UnidadeGestoraPrevidencia = {
  /** ex.: "077E0800001" (instituto), "077E0900001" (fundo financeiro) */
  codigo: string;
  nome: string;
  /** texto do seletor: "IPAM", "Fundo Financeiro", "Fundo Previdenciário"... */
  titulo: string;
};

/**
 * Página de previdência. `filtrarUnidadesGestoras` restringe as UGs válidas
 * para a página (ex.: projeções atuariais não exibem o instituto quando há
 * segregação de massa). Quem implementa a página ajusta o filtro.
 */
export type PaginaPrevidencia = Pagina & {
  filtrarUnidadesGestoras?: (
    unidadesGestoras: UnidadeGestoraPrevidencia[]
  ) => UnidadeGestoraPrevidencia[];
};

/** Fundo de Proteção Social dos Militares (Estado) */
export const CODIGO_UNIDADE_GESTORA_MILITARES = "500E2900001";

/** Instituto (IPAM/IPAJM): código "xxxE08xxxxx" */
export function isInstituto(ug: UnidadeGestoraPrevidencia) {
  return ug.codigo.substring(3, 6) === "E08";
}

export function isFundoFinanceiro(ug: UnidadeGestoraPrevidencia) {
  return ug.codigo.endsWith("E0900001");
}

export function isFundoPrevidenciario(ug: UnidadeGestoraPrevidencia) {
  return ug.codigo.endsWith("E0900002");
}

export function filtrarUnidadesGestorasDaPagina(
  pagina: PaginaPrevidencia | undefined,
  unidadesGestoras: UnidadeGestoraPrevidencia[]
) {
  return pagina?.filtrarUnidadesGestoras
    ? pagina.filtrarUnidadesGestoras(unidadesGestoras)
    : unidadesGestoras;
}
