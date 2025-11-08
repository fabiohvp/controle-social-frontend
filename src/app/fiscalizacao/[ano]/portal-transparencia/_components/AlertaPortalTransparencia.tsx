"use client";

import ExternalLink from "@/components/links/ExternalLink";
import AlertPanel from "@/components/panel/AlertPanel";
import { useParams } from "next/navigation";

const RELATORIOS: { [key: string]: string } = {
  2015: "https://servicos.tcees.tc.br/DocumentoDisponibilizado/BaixarDocumentoDisponibilizado?idDocumento=1010335&key=ada67a2f7c060e0ceb89ebacb0e20cf4a67f90ae6d32b18ce7d4733d63dbdd71dc72254744b9f6528c3a37ab7e9a663c3cf64c503defb9ec8c18e3014f689923",
  2017: "https://servicos.tcees.tc.br/DocumentoDisponibilizado/BaixarDocumentoDisponibilizado?idDocumento=1800104&key=be9abe5bafbd1096b5c8dea1573a25bb61e8715b086edc18e7faa64a3f1ef4aa9ff57a4ea10f06b961ddf7d4e81319fe4e1359464410915c894d0455836688af",
  2020: "https://servicos.tcees.tc.br/DocumentoDisponibilizado/BaixarDocumentoDisponibilizado?idDocumento=2969482&key=80388cd135bbed7ef97e01ad486c8c062c21a0951927d0bcd750c39b91e07819f3a8b579838d883cefb2ed9a34c0d8e2d92fd80a08fe783b41ec9cb164c00db5",
};

export default function AlertaPortalTransparencia() {
  const routeParams = useParams<{ ano: string }>();
  const ano = routeParams.ano ? parseInt(routeParams.ano, 10) : 2020;

  return (
    <AlertPanel type="info">
      Em 2020 o Tribunal de Contas do ES realizou auditoria para avaliar os
      Portais de Transparência das Prefeituras e Câmaras municipais. Foram
      verificados mais de 200 itens, sob a ótica do conteúdo e da qualidade das
      informações. Os temas avaliados incluem, entre outros: despesas, receitas,
      licitações, contratos, pessoal, gestão fiscal, patrimônio e produção
      legislativa. Um índice de transparência foi proposto, por meio da
      atribuição de pontos a cada item avaliado. Isso permite fazer comparação
      entre os municípios e verificar se há melhoria da transparência no
      decorrer do tempo.
      <br />
      <ExternalLink href={RELATORIOS[ano]} title="Relatório de auditoria">
        Acesse na íntegra o relatório de auditoria.
      </ExternalLink>
    </AlertPanel>
  );
}
