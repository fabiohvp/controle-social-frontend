"use client";
import { useCorrecaoIpca } from "@/components/buttons/ipca/useCorrecaoIpca";
import { formatFloat, formatMoney } from "@/formatters/number";
import { twMerge } from "tailwind-merge";

type Props = {
  valor: number | null | undefined;
  /** ano do valor, para a correção do IPCA */
  ano: number;
  corrigirIpca?: boolean;
  className?: string;
};

/**
 * Valor monetário abreviado ("R$ 3,06B") com o valor completo no title.
 * Diferente de MoneyValue, aceita zero e negativos (dívida líquida, déficit).
 */
export default function ValorDinheiro({
  valor,
  ano,
  corrigirIpca = true,
  className,
}: Props) {
  const corrigir = useCorrecaoIpca();

  if (valor === null || valor === undefined) {
    return (
      <span className="text-gray-medium text-sm">Informação indisponível</span>
    );
  }

  const valorExibido = corrigirIpca ? corrigir(valor, ano) : valor;

  return (
    <span
      className={twMerge("text-2xl text-blue-dark", className)}
      title={`R$ ${formatFloat(valorExibido)}`}
      data-valor={valorExibido}
    >
      R$ <span className="font-extrabold">{formatMoney(valorExibido)}</span>
    </span>
  );
}
