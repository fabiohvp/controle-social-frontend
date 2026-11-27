import PanelWithDescription from "@/components/panel/PanelWithDescription";
import { ReactNode } from "react";
import LinhaValor from "./LinhaValor";
import ValorDinheiro from "./ValorDinheiro";

type Props = {
  titulo: string;
  descricao?: ReactNode;
  valor: number | null | undefined;
  ano: number;
  /** média de todos os municípios (mesmo critério do valor) */
  media?: number | null;
  /** posição no ranking dos municípios */
  ranking?: number | null;
  tituloMedia?: string;
  className?: string;
};

/** Card "Aplicação"/"Despesa com pessoal" (valor + média + posição no ranking) */
export default function CardAplicacao({
  titulo,
  descricao,
  valor,
  ano,
  media,
  ranking,
  tituloMedia = "Média municipal",
  className,
}: Props) {
  return (
    <PanelWithDescription
      titulo={titulo}
      descricao={descricao}
      className={className}
      bodyProps={{ className: "flex-col items-center justify-center gap-2" }}
    >
      <ValorDinheiro valor={valor} ano={ano} />
      {media !== undefined && media !== null && (
        <LinhaValor titulo={tituloMedia}>
          <ValorDinheiro valor={media} ano={ano} className="text-sm" />
        </LinhaValor>
      )}
      {ranking !== undefined && ranking !== null && (
        <LinhaValor titulo="Posição no ranking">{ranking}º</LinhaValor>
      )}
    </PanelWithDescription>
  );
}
