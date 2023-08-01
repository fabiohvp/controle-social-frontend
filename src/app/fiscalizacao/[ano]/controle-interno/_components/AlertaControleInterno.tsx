"use client";

import ExternalLink from "@/components/links/ExternalLink";
import PainelDeAlerta from "@/components/paineis/PainelDeAlerta";
import { useParams } from "next/navigation";

const RELATORIOS: { [key: string]: { texto: string; href: string } } = {
  2015: {
    href: "https://servicos.tcees.tc.br/DocumentoDisponibilizado/BaixarDocumentoDisponibilizado?idDocumento=1279595&key=d19e8f0b3a52b7fbba6ee6f8d63778a44e277446d4198949f1bdc2d8d1f78bea03569ddfc8ee672f211aba38126981de8a940cdac54423622e6691fda6e4218a",
    texto: `Em 2016 o Tribunal de Contas do ES realizou levantamento para avaliar o Sistema de Controle Interno das Prefeituras e Câmaras municipais. Foram verificados 28 itens, sob a ótica de sua implementação e do seu funcionamento. Os temas avaliados incluem, entre outros: Ambiente de Controle Interno, Unidade de Controle Interno da UJ, Avaliação de Risco e Procedimentos de Controle. Um índice para mensurar a qualidade do Controle Interno foi proposto, por meio da atribuição de pontuação a cada item avaliado. Isso permite fazer comparações entre os municípios e verificar se há melhoria da qualidade do Controle Interno no decorrer do tempo.
		<br />A nota total máxima de cada jurisdicionado (soma dos grupos de controle) poderia atingir 84 pontos o que equivale a 100%. As notas abaixo representam o percentual atingido por cada município, utilizando a seguinte fórmula: (nota do Município * 100) / 84`,
  },
  2020: {
    texto: `O objetivo do presente levantamento foi avaliar o funcionamento do sistema de controle interno dos Municípios do Estado do Espírito Santo, mais notadamente, nas Prefeitura e Câmaras, ressalvados os municípios em que se optou por Sistema Único de Controle Interno, conforme extraído dos sistema CidadES, situação na qual foi avaliado apenas o instituído no âmbito do Poder Executivo.
		<br />Importante ressaltar que o resultado é baseado em informações prestadas pelos próprios Municípios.
		<br />A nota total máxima de cada jurisdicionado (soma dos grupos de controle) poderia atingir 84 pontos o que equivale a 100%. As notas abaixo representam o percentual atingido por cada município, utilizando a seguinte fórmula: (nota do Município * 100) / 84`,
    href: "https://servicos.tcees.tc.br/DocumentoDisponibilizado/BaixarDocumentoDisponibilizado?idDocumento=2887747&key=9d829bc76a85837c2ad3c0bb441adb68159a3c9f9b855a76dc9f6ecf13b3fecea5663dc122f48c8647f33c5746c5fb96ea7b6e704ada0d880c9e470fec7bc184",
  },
};

export default function AlertaControleInterno() {
  const routeParams = useParams();

  return (
    <PainelDeAlerta type="info">
      <div
        dangerouslySetInnerHTML={{ __html: RELATORIOS[routeParams.ano].texto }}
      ></div>
      <ExternalLink
        href={RELATORIOS[routeParams.ano].href}
        title="Relatório de auditoria"
      >
        Acesse na íntegra o relatório de auditoria.
      </ExternalLink>
    </PainelDeAlerta>
  );
}
