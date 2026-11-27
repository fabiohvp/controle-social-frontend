"use client";
import { useCorrecaoIpca } from "@/components/buttons/ipca/useCorrecaoIpca";
import { formatFloat, formatMoney } from "@/formatters/number";

type Props = {
  valor: number | null | undefined;
  /** ano do valor, para a correção do IPCA */
  ano: number;
  corrigirIpca?: boolean;
};

/** Valor principal de um card ("R$ 3,06B"), com o valor completo no title */
export default function MoneyValue({ valor, ano, corrigirIpca = true }: Props) {
  const corrigir = useCorrecaoIpca();

  if (valor === null || valor === undefined || valor <= 0) {
    return (
      <span className="text-gray-light text-sm">Informação indisponível</span>
    );
  }

  const valorExibido = corrigirIpca ? corrigir(valor, ano) : valor;

  return (
    <span
      className="text-2xl text-blue-dark"
      title={`R$ ${formatFloat(valorExibido)}`}
      data-valor={valorExibido}
    >
      R$ <span className="font-extrabold">{formatMoney(valorExibido)}</span>
    </span>
  );
}
