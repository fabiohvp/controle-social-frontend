import { COLOR } from "@/theme/colors";
import { CSSProperties } from "react";

/** Cores das notas A-D (CAPAG, ISP): verde, amarelo, laranja, vermelho */
const COR_NOTA: Record<string, string> = {
  A: COLOR.positivo,
  B: COLOR["chart-alerta"],
  C: COLOR["chart-negativo"],
  D: COLOR.negativo,
};

export function getCorNota(nota: string | null | undefined) {
  return COR_NOTA[(nota ?? "").toUpperCase()] ?? COLOR["chart-muito-positivo"];
}

type Props = {
  nota: string | null | undefined;
  tamanho?: number;
  style?: CSSProperties;
};

/** Círculo colorido com a nota ("circulo-nota" do site oficial) */
export default function NotaCirculo({ nota, tamanho = 28, style }: Props) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white"
      style={{
        backgroundColor: getCorNota(nota),
        fontSize: tamanho * 0.5,
        height: tamanho,
        width: tamanho,
        ...style,
      }}
    >
      {nota ?? "-"}
    </span>
  );
}
