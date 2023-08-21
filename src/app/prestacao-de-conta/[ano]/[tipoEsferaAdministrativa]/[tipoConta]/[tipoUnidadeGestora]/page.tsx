import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import ExternalLink from "@/components/links/ExternalLink";
import AlertPanel from "@/components/panel/AlertPanel";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import PanelWithTitleCollapsible from "@/components/panel/PanelWithTitleCollapsible";
import { ENV } from "@/shared/env";
import { handleSettledPromise } from "@/shared/promise";
import {
  getTipoUnidadesGestorasEstaduais,
  getTipoUnidadesGestorasMunicipais,
} from "@/shared/unidadeGestora";
import Link from "next/link";
import { HTMLAttributes, ReactNode } from "react";
import { FaBalanceScale, FaHistory } from "react-icons/fa";
import { FaRegHand } from "react-icons/fa6";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import {
  ResumoProcessoKey,
  ResumoProcessos,
  SituacaoProcesso,
} from "../../../types";
import BreadcrumbPrestacaoDeConta from "./BreadcrumbPrestacaoDeConta";
import { PrestacaoDeContaGovernoPageProps } from "./routes";

export default async function Page({
  params,
}: {
  params: PrestacaoDeContaGovernoPageProps;
}) {
  const [resumoProcessosRes, situacaoProcessosRes] = await Promise.allSettled([
    getResumoProcessos(params),
    getSituacaoProcessos(params),
  ]);

  const resumoProcessos = handleSettledPromise(resumoProcessosRes);
  const situacaoProcessos = handleSettledPromise(situacaoProcessosRes);

  return (
    <DashboardLayout
      className="gap-2 p-2"
      exibirBotaoIPCA
      itensBreadcrumb={
        <BreadcrumbPrestacaoDeConta
          tiposUnidadesGestoras={
            await (params.tipoEsferaAdministrativa === "estado"
              ? getTipoUnidadesGestorasEstaduais()
              : getTipoUnidadesGestorasMunicipais())
          }
        />
      }
    >
      <AlertPanel type="info">
        A partir do exercício de 2019, as contas de gestão do prefeito podem ser
        apensadas às contas de governo, conforme{" "}
        <Link
          href="https://www.tcees.tc.br/wp-content/uploads/formidable/108/Decisao-Plenaria-TC-15-2020-Dispoe-sobre-deliberacoes-nos-processos-que-o-Prefeito-ordenador-despesas.pdf"
          className="font-bold"
        >
          Decisão Plenária 15/2020
        </Link>
        .
      </AlertPanel>

      <h4 className="font-normal">
        Prestações de contas anuais submetidas ao TCE-ES <hr />
      </h4>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <RenderResumoProcesso resumoProcessos={resumoProcessos} />
        <RenderInformacoes />
      </div>
      <RenderTable situacaoProcessos={situacaoProcessos} />
      <AlertPanel type="info">
        Para ter acesso a diversas outras informações sobre os processos, tais
        como documentos, vídeos, movimentações, etc. basta clicar no número do
        processo.
      </AlertPanel>
    </DashboardLayout>
  );
}

function RenderInformacoes() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <PanelWithTitleCollapsible
        collapsed={false}
        header="Prestação de Contas Anual (PCA)"
      >
        Documento que consolida os demonstrativos contábeis, relatórios de
        gestão e demais peças necessárias à composição da prestação de contas de
        gestores responsáveis por prefeituras, câmaras, órgãos e entidades que
        estão na alçada de atuação do Tribunal de Contas – os chamados
        jurisdicionados. A eles, cabe o dever de encaminhar à Corte, anualmente,
        prestação de contas.
      </PanelWithTitleCollapsible>
      <PanelWithTitleCollapsible collapsed={false} header="Contas de Governo">
        Documentação que permite ao Tribunal de Contas a avaliação da gestão
        política do chefe do Poder Executivo (prefeitos e governador) para fins
        de emissão de parecer prévio a ser enviado ao Poder Legislativo, onde
        ocorrerá seu julgamento. Trata-se do conjunto de demonstrativos e
        informações de natureza contábil, financeira, orçamentária, patrimonial
        e operacional, expressando os resultados da atuação governamental.
      </PanelWithTitleCollapsible>
      <PanelWithTitleCollapsible collapsed={false} header="Contas de Gestão">
        Submetidas ao Tribunal de Contas para julgamento (posição manifestada
        pela emissão de acórdão), a documentação é analisada examinando-se,
        dentre outros aspectos, a legalidade, a legitimidade, a economicidade, a
        aplicação das subvenções e a renúncia de receitas na gestão dos recursos
        públicos.
      </PanelWithTitleCollapsible>
    </div>
  );
}

function RenderResumoProcesso({
  resumoProcessos,
}: {
  resumoProcessos: ResumoProcessos & HTMLAttributes<HTMLAnchorElement>;
}) {
  const items = getResumoProcessoItemsTemplate(resumoProcessos);

  return (
    <PanelWithTitle header="Resumo das situações das prestações de contas anuais">
      <ul className="w-full">
        {Object.entries(items).map(([key, value]) => (
          <li
            key={key}
            className="border-b border-b-gray-200 border-dashed flex justify-between py-1"
          >
            <span className="flex items-center gap-2">
              {value.icon}
              <span className="text-sm">{value.texto}</span>
            </span>
            <span className="text-sm">{value.quantidade}</span>
          </li>
        ))}
        <li className="flex font-bold justify-between pl-6 py-1">
          <span className="text-sm">Total</span>
          <span className="text-sm">
            {Object.values(resumoProcessos).reduce(
              (acc, item) => acc + (item as any).quantidade,
              0
            )}
          </span>
        </li>
      </ul>
    </PanelWithTitle>
  );
}

function RenderTable({
  situacaoProcessos,
}: {
  situacaoProcessos: SituacaoProcesso[];
}) {
  return (
    <table className="table mt-4 responsive text-sm">
      <thead>
        <tr>
          <th>Situação</th>
          <th>Processo</th>
          <th>Órgão público</th>
          <th className="min-w-[120px]">Responsáveis</th>
          <th className="min-w-[120px]">Relator</th>
          <th>Acórdão/Parecer</th>
          <th>Recurso</th>
        </tr>
      </thead>
      <tbody>
        {situacaoProcessos.map((row, index) => (
          <tr
            key={row.processo.id}
            className={`${index % 2 === 0 ? "even" : "odd"}`}
          >
            {/* //TODO: acertar ícone/cor */}
            <td data-label="Situação">
              <FiThumbsUp className="ml-auto sm:m-auto" />
            </td>
            <td data-label="Processo">
              <ExternalLink
                className="justify-end sm:justify-normal"
                href={`https://www.tcees.tc.br/consultas/processo/detalhar-processo-id?idProcesso=${row.processo.id}&key=${row.chaveSeguranca}`}
              >
                {row.processo.numeroCompleto}
              </ExternalLink>
            </td>
            <td data-label="Órgão público">
              {row.processo.unidadesGestoras.map((ug) => (
                <div key={ug.codigo}>
                  <Link
                    href={`/unidade-gestora/${ug.codigo}`}
                    className="justify-end sm:justify-normal"
                  >
                    {ug.nome}
                  </Link>
                </div>
              ))}
            </td>
            <td data-label="Responsáveis">
              {row.processo.responsaveis.map((responsavel) => (
                <div key={responsavel.nome} className="capitalize">
                  {responsavel.nome.toLocaleLowerCase()}
                </div>
              ))}
            </td>
            <td data-label="Relator">{row.processo.relator}</td>
            <td data-label="Acórdão/Parecer">
              {row.processo.responsaveis.map((responsavel) =>
                responsavel.deliberacao ? (
                  <div key={responsavel.nome}>
                    <ExternalLink
                      href={`https://servicos.tcees.tc.br/DocumentoDisponibilizado/BaixarDocumentoDisponibilizado?idDocumento=${responsavel.idDocumentoDeliberacao}&key=${responsavel.chaveSegurancaDeliberacao}`}
                      className="justify-end sm:justify-normal"
                    >
                      {responsavel.deliberacao}
                    </ExternalLink>
                  </div>
                ) : (
                  <div key={responsavel.nome}>&nbsp;</div>
                )
              )}
            </td>
            <td data-label="Recurso">
              {row.processo.responsaveis.map((responsavel) =>
                responsavel.numeroCompletoRecurso ? (
                  <div key={responsavel.nome}>
                    <ExternalLink
                      href={`https://www.tcees.tc.br/consultas/processo/detalhar-processo-id?idProcesso=${responsavel.idProcessoEtceesRecurso}&key=${responsavel.chaveSegurancaRecurso}`}
                      className="justify-end sm:justify-normal"
                    >
                      {responsavel.numeroCompletoRecurso}
                    </ExternalLink>
                  </div>
                ) : (
                  <div key={responsavel.nome}>&nbsp;</div>
                )
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

async function getResumoProcessos(
  props: PrestacaoDeContaGovernoPageProps
): Promise<ResumoProcessos> {
  const res = await fetch(
    `${
      ENV.apiUrl
    }/PrestacaoContaControllers/EsferaAdministrativa/GetResumoProcessosPrestacaoContaAnualPorTipoConta?${generateQueryString(
      props
    )}`
  );
  return res.json().then((o) =>
    o.reduce((acc: any, p: any) => {
      acc[p.resultado] = { quantidade: p.quantidade };
      return acc;
    }, {})
  );
}

//TODO: gerar de acordo com o tipoEsferaAdministrativa (municipios/estado), por algum motivo são diferentes (deveria ser?)
function getResumoProcessoItemsTemplate(resumoProcessos: ResumoProcessos): {
  [key in ResumoProcessoKey]: {
    icon: ReactNode;
    texto: string;
    quantidade: number;
  };
} {
  const items = {
    Aprovação: {
      icon: <FiThumbsUp />,
      texto: "Parecer de aprovação",
      quantidade: 0,
    },
    Regulares: {
      icon: <FiThumbsUp />,
      texto: "Julgada como regular / Parecer de aprovação",
      quantidade: 0,
    },
    "Aprovação com ressalva": {
      icon: <FaRegHand className="text-yellow-300" />,
      texto: "Parecer de aprovação com ressalva",
      quantidade: 0,
    },
    "Regulares com ressalvas": {
      icon: <FaRegHand className="text-yellow-300" />,
      texto:
        "Julgada como regular com ressalva / Parecer de aprovação com ressalva",
      quantidade: 0,
    },
    Irregular: {
      icon: <FiThumbsDown className="mirror text-COLOR-negativo" />,
      texto: "Julgada como irregular / Parecer de rejeição",
      quantidade: 0,
    },
    Rejeição: {
      icon: <FiThumbsDown className="mirror text-COLOR-negativo" />,
      texto: "Parecer de rejeição",
      quantidade: 0,
    },
    "Extinção sem resolução de mérito": {
      icon: <FiThumbsUp className="text-zinc-400" />,
      texto: "Extinção sem resolução de mérito",
      quantidade: 0,
    },
    semITC: {
      icon: <FaHistory className="mirror text-link" />,
      texto: "Aguardando instrução técnica",
      quantidade: 0,
    },
    comITC: {
      icon: <FaBalanceScale className="text-blue-400" />,
      texto: "Aguardando apreciação do colegiado",
      quantidade: 0,
    },
  };

  for (const [key, value] of Object.entries(resumoProcessos)) {
    items[key as ResumoProcessoKey].quantidade = (value as any).quantidade;
  }
  return items;
}

async function getSituacaoProcessos(
  props: PrestacaoDeContaGovernoPageProps
): Promise<SituacaoProcesso[]> {
  const res = await fetch(
    `${
      ENV.apiUrl
    }/PrestacaoContaControllers/EsferaAdministrativa/GetProcessosPrestacaoContaAnualPorTipoConta?${generateQueryString(
      props
    )}`
  );
  return res.json();
}

function generateQueryString({
  ano,
  tipoConta,
  tipoEsferaAdministrativa,
  tipoUnidadeGestora,
}: PrestacaoDeContaGovernoPageProps) {
  return `tipoConta=${
    tipoConta === "governo" ? "Governo" : encodeURIComponent("Gestão")
  }&anoExercicio=${ano}&codigoTipoUG=${tipoUnidadeGestora}&dadosMunicipios=${
    tipoEsferaAdministrativa === "municipios"
  }&v=29-07-2023-5.2.19`;
}
