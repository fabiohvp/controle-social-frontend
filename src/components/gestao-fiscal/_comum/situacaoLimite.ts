import { ANO_CORRENTE } from "@/shared/paginas";
import { COR_MEDIDOR, FaixaMedidor, SituacaoMedidor } from "./MedidorLimite";

/**
 * O site oficial usa o último mês enviado para dizer "Obedeceu" (exercício
 * encerrado) ou "Tende a obedecer" (em andamento). Aqui, sem a prestação de
 * contas, o exercício é considerado encerrado quando é anterior ao corrente.
 */
export function isExercicioEncerrado(anoExercicio: number) {
  return anoExercicio < ANO_CORRENTE;
}

/** Limite mínimo constitucional (saúde, educação, FUNDEB) */
export function getSituacaoLimiteMinimo(
  valor: number | null | undefined,
  minimo: number
): SituacaoMedidor {
  return valor !== null && valor !== undefined && valor < minimo ? "ruim" : "ok";
}

export function getTextoLimiteMinimo(
  valor: number | null | undefined,
  minimo: number,
  anoExercicio: number,
  /** "da receita" em "Obedeceu o limite mínimo de 15% da receita" */
  complemento = ""
) {
  if (valor === null || valor === undefined) return undefined;
  const atingiu = valor >= minimo;
  const sufixo = complemento ? ` ${complemento}` : "";
  if (isExercicioEncerrado(anoExercicio)) {
    return `${atingiu ? "Obedeceu" : "Não obedeceu"} o limite mínimo de ${minimo}%${sufixo}`;
  }
  return `${atingiu ? "Tende a obedecer" : "Tende a não obedecer"} o limite mínimo de ${minimo}%${sufixo}`;
}

/** Faixas de um limite mínimo: vermelho abaixo do mínimo, cinza-azulado acima */
export function getFaixasLimiteMinimo(minimo: number, max: number): FaixaMedidor[] {
  return [
    { ate: minimo, cor: COR_MEDIDOR.ruim, rotulo: `${minimo}%` },
    { ate: max, cor: COR_MEDIDOR.ok },
  ];
}
