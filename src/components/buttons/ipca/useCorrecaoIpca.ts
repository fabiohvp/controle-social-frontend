"use client";
import { calculateIpca } from "@/shared/math";
import { useAtom } from "jotai";
import { useCallback } from "react";
import { ipcaState } from "./ipcaState";

/**
 * Retorna `corrigir(valor, ano)`: aplica a correção do IPCA quando o usuário
 * marcou "Correção pelo IPCA" no breadcrumb; senão devolve o valor original.
 */
export function useCorrecaoIpca() {
  const [ipca] = useAtom(ipcaState);
  return useCallback(
    (valor: number, ano: number) =>
      ipca.enabled ? calculateIpca(valor, ano, ipca.values) : valor,
    [ipca]
  );
}
