"use client";

import ExternalLink from "@/components/links/ExternalLink";
import AlertPanel from "@/components/panel/AlertPanel";
import { useParams } from "next/navigation";

const RELATORIOS: { [key: string]: string } = {
  2016: "https://servicos.tcees.tc.br/DocumentoDisponibilizado/BaixarDocumentoDisponibilizado?idDocumento=1311590&key=3e78aa8683990bc4272494009eb25800ef9b61297eb42d0c056ee4235476e35ed9d02fc9a34e8f9b6ca1431665abc9f6078594fc5ab24c3f70a884b59e6ef305",
  2018: "https://servicos.tcees.tc.br/DocumentoDisponibilizado/BaixarDocumentoDisponibilizado?idDocumento=2132536&key=1711a86e16d85a27d6f54c9a1ce6d9af95af9e5b7ccda1ec3ab0e7ef6af725048878004d6bf2f95afce2de18dc8e9af022d2aa60094bdeb02fb69a9a28cd9c99",
};

export default function AlertaTransparenciaPassiva() {
  const routeParams = useParams<{ ano: string }>();
  const ano = routeParams.ano ? parseInt(routeParams.ano, 10) : 2018;

  return (
    <AlertPanel type="info">
      Em {routeParams.ano} o Tribunal de Contas do ES realizou auditoria para
      avaliar os Portais de Transparência das Prefeituras e Câmaras municipais.
      Foram verificados mais de 200 itens, sob a ótica do conteúdo e da
      qualidade das informações. Os temas avaliados incluem, entre outros:
      despesas, receitas, licitações, contratos, pessoal, gestão fiscal,
      patrimônio e produção legislativa. Um índice de transparência foi
      proposto, por meio da atribuição de pontos a cada item avaliado. Isso
      permite fazer comparação entre os municípios e verificar se há melhoria da
      transparência no decorrer do tempo.
      <br />
      <ExternalLink href={RELATORIOS[ano]} title="Relatório de auditoria">
        Acesse na íntegra o relatório de auditoria.
      </ExternalLink>
    </AlertPanel>
  );
}
