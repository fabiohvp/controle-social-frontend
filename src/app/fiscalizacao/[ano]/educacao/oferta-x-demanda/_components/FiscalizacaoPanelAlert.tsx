"use client";

import PanelAlert from "@/components/panel/PanelAlert";
import Link from "next/link";
import { useParams } from "next/navigation";

const RELATORIOS: { [key: string]: string } = {
  2015: "https://servicos.tcees.tc.br/DocumentoDisponibilizado/BaixarDocumentoDisponibilizado?idDocumento=1279595&key=d19e8f0b3a52b7fbba6ee6f8d63778a44e277446d4198949f1bdc2d8d1f78bea03569ddfc8ee672f211aba38126981de8a940cdac54423622e6691fda6e4218a",
  2020: "https://servicos.tcees.tc.br/DocumentoDisponibilizado/BaixarDocumentoDisponibilizado?idDocumento=2887747&key=9d829bc76a85837c2ad3c0bb441adb68159a3c9f9b855a76dc9f6ecf13b3fecea5663dc122f48c8647f33c5746c5fb96ea7b6e704ada0d880c9e470fec7bc184",
};

export default function FiscalizacaoPanelAlert() {
  const routeParams = useParams();

  return (
    <PanelAlert type="info">
      O objetivo do presente levantamento foi avaliar o funcionamento do sistema
      de controle interno dos Municípios do Estado do Espírito Santo, mais
      notadamente, nas Prefeitura e Câmaras, ressalvados os municípios em que se
      optou por Sistema Único de Controle Interno, conforme extraído dos sistema
      CidadES, situação na qual foi avaliado apenas o instituído no âmbito do
      Poder Executivo. Importante ressaltar que o resultado é baseado em
      informações prestadas pelos próprios Municípios. A nota total máxima de
      cada jurisdicionado (soma dos grupos de controle) poderia atingir 84
      pontos o que equivale a 100%. As notas abaixo representam o percentual
      atingido por cada município, utilizando a seguinte fórmula: (nota do
      Município * 100) / 84.
      <br />
      <Link
        href={RELATORIOS[routeParams.ano]}
        target="_blank"
        title="Relatório de auditoria"
      >
        Acesse na íntegra o relatório de auditoria.
      </Link>
    </PanelAlert>
  );
}
