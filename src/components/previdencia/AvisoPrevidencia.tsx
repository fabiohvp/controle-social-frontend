import AlertPanel from "@/components/panel/AlertPanel";
import { ReactNode } from "react";

type Props = {
  titulo?: string;
  type?: "danger" | "info" | "success" | "warning";
  children: ReactNode;
};

/** Faixa de aviso/introdução das páginas de previdência (AlertaSanfona/AlertaPagina do site oficial) */
export default function AvisoPrevidencia({
  titulo,
  type = "info",
  children,
}: Props) {
  return (
    <AlertPanel type={type} className="min-h-0 md:min-h-0">
      {titulo && <strong className="block">{titulo}</strong>}
      <span>{children}</span>
    </AlertPanel>
  );
}

export const TEXTO_RPPS_SITUACAO =
  "Monitore a previdência dos municípios que possuem RPPS, a partir dos dados de receitas, despesas, segurados, índice de situação previdenciária, compromissos, projeções atuariais e contribuições previdenciárias. Quando há segregação de massa, o menu superior permite a seleção do próprio instituto de previdência, do Fundo Financeiro ou do Fundo Previdenciário.";

export function AvisoDeclaratorio() {
  return (
    <AvisoPrevidencia titulo="Situação dos Regimes Próprios de Previdência (RPPS)">
      {TEXTO_RPPS_SITUACAO}
      <br />
      Os dados exibidos neste painel são <b>declaratórios</b>, tendo como fonte
      as remessas enviadas e homologadas por meio do sistema CidadES-Prestação
      de Contas Mensal, conforme Anexo IV da IN 68/2020.
    </AvisoPrevidencia>
  );
}
