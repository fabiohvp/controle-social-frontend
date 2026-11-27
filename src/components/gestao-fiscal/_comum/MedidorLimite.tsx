import GaugeChart from "@/components/charts/GaugeChart";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import { formatFloat } from "@/formatters/number";
import { COLOR } from "@/theme/colors";
import { ReactNode } from "react";
import { FaHandPaper, FaThumbsDown, FaThumbsUp } from "react-icons/fa";

export type SituacaoMedidor = "ok" | "alerta" | "ruim";

export type FaixaMedidor = {
  /** limite superior da faixa, na mesma escala de `valor` */
  ate: number;
  cor: string;
  /** rótulo do ponto de corte (limite superior da faixa) */
  rotulo?: string;
};

type Props = {
  titulo: string;
  descricao?: ReactNode;
  valor: number | null | undefined;
  /** valor máximo da escala do medidor (o "upperLimit" do site oficial) */
  max: number;
  /** faixas em ordem crescente; a última vai até o fim da escala */
  faixas: FaixaMedidor[];
  situacao: SituacaoMedidor;
  /** texto sob o medidor ("Obedeceu o limite mínimo de 15%...") */
  texto?: ReactNode;
  /** legenda dos limites, sob o texto ("A, se < 60%; B, se ...") */
  legenda?: ReactNode;
  /** nome exibido sob o ponteiro */
  nomeMedidor?: string;
  sufixo?: string;
  className?: string;
};

export const COR_MEDIDOR = {
  ok: COLOR["chart-positivo"],
  atencao: COLOR["chart-info"],
  alerta: COLOR["chart-alerta"],
  ruim: COLOR["chart-negativo"],
};

const ESTILO_SITUACAO: Record<SituacaoMedidor, { cor: string }> = {
  ok: { cor: COLOR["chart-positivo"] },
  alerta: { cor: COLOR["chart-alerta"] },
  ruim: { cor: COLOR.negativo },
};

function limitar(valor: number) {
  return Math.min(Math.max(valor, 0), 1);
}

/**
 * Card com valor percentual, ícone de situação e medidor semicircular com os
 * limites legais (os "widget-gauge" do site oficial).
 */
export default function MedidorLimite({
  titulo,
  descricao,
  valor,
  max,
  faixas,
  situacao,
  texto,
  legenda,
  nomeMedidor = "",
  sufixo = "%",
  className,
}: Props) {
  const semDados = valor === null || valor === undefined;
  const Icone =
    situacao === "ok" ? FaThumbsUp : situacao === "ruim" ? FaThumbsDown : FaHandPaper;
  const cor = ESTILO_SITUACAO[situacao].cor;

  const items = faixas.map((faixa, indice) => ({
    color: faixa.cor,
    name: indice === faixas.length - 1 ? "" : (faixa.rotulo ?? ""),
    value: indice === faixas.length - 1 ? 1 : limitar(faixa.ate / max),
  }));

  return (
    <PanelWithDescription
      titulo={titulo}
      descricao={descricao}
      className={className}
      bodyProps={{ className: "flex-col items-center" }}
    >
      {semDados ? (
        <span className="text-gray-medium m-auto text-sm">
          Informação indisponível
        </span>
      ) : (
        <>
          <div
            className="flex items-center gap-2 text-3xl font-extrabold"
            style={{ color: cor }}
          >
            <Icone size={24} />
            <span>
              {formatFloat(valor)}
              {sufixo}
            </span>
          </div>
          <GaugeChart
            items={items}
            selectedValue={limitar(valor / max)}
            style={{ height: "170px", width: "100%" }}
            title={nomeMedidor}
          />
          {texto && (
            <p className="text-center text-sm text-gray-dark">{texto}</p>
          )}
          {legenda && (
            <p className="text-center text-xs text-gray-medium">{legenda}</p>
          )}
        </>
      )}
    </PanelWithDescription>
  );
}
