import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import Iframe from "@/components/iframes/Iframe";
import AlertPanel from "@/components/panel/AlertPanel";
import { ENV } from "@/shared/env";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import BreadcrumbFiscalizacaoSimples from "../../../_components/BreadcrumbFiscalizacaoSimples";
import BreadcrumbIegmIndices from "../_components/BreadcrumbIegmIndices";
import GraficosIndice from "../_components/GraficosIndice";
import TabelaIegm, { LinhaIegm } from "../_components/TabelaIegm";
import {
  ANOS_IEGM,
  ANO_SEM_MANUAL,
  DadoIndice,
  INDICES_IEGM,
  NotasMunicipio,
} from "../iegm";

type Props = { params: Promise<{ ano: string; indice: string }> };

export default async function Page({ params }: Props) {
  const { ano, indice: slug } = await params;
  const indice = INDICES_IEGM.find((i) => i.slug === slug);
  if (!ANOS_IEGM.includes(Number(ano)) || !indice) notFound();

  return (
    <DashboardLayout
      className="pt-2 px-2"
      exibirFooter={false}
      itensBreadcrumb={
        <BreadcrumbFiscalizacaoSimples
          anos={ANOS_IEGM}
          rota="iegm"
          titulo="IEGM - Índice de efetividade da gestão municipal"
        >
          <BreadcrumbIegmIndices />
        </BreadcrumbFiscalizacaoSimples>
      }
    >
      {slug === "manual" &&
        (Number(ano) >= ANO_SEM_MANUAL ? (
          <AlertPanel type="warning">
            Manual não produzido para esse ano. Os manuais foram produzidos
            apenas até o ano de 2017.
          </AlertPanel>
        ) : (
          <Iframe
            src={`/api/fiscalizacao/iegm/manual?ano=${ano}`}
            title="Manual do IEGM"
            className="h-full w-full"
            style={{ minHeight: "800px" }}
          />
        ))}
      {slug === "relatorio" && (
        <Iframe
          src={`/api/fiscalizacao/iegm/relatorio?ano=${ano}`}
          title="Relatório do IEGM"
          className="h-full w-full"
          style={{ minHeight: "800px" }}
        />
      )}
      {indice.metodo && (
        <IndiceTematico ano={ano} metodo={indice.metodo} slug={slug} />
      )}
    </DashboardLayout>
  );
}

async function IndiceTematico({
  ano,
  metodo,
  slug,
}: {
  ano: string;
  metodo: string;
  slug: string;
}) {
  const indice = INDICES_IEGM.find((i) => i.slug === slug)!;
  const dados = await getIndice(ano, metodo);

  return (
    <>
      <AlertPanel type="info">
        {slug === "geral" ? <TextoIegm ano={ano} /> : <p>{indice.descricao}</p>}
      </AlertPanel>
      {dados.length ? (
        <div className="mt-2 pb-4">
          <GraficosIndice dados={dados} />
          {slug === "geral" && <TabelaGeral ano={ano} dados={dados} />}
        </div>
      ) : (
        <AlertPanel type="warning" className="mt-2">
          Não há dados do {indice.rotulo} para o ano {ano}.
        </AlertPanel>
      )}
    </>
  );
}

async function TabelaGeral({
  ano,
  dados,
}: {
  ano: string;
  dados: DadoIndice[];
}) {
  const { valores } = await getTodosIndices(ano);
  const nomes = new Map(
    dados.map((d) => [d.idEsferaAdministrativa, d.nomeEsferaAdministrativa])
  );
  const linhas: LinhaIegm[] = valores.map((v) => ({
    municipio: nomes.get(v.idEsferaAdministrativa) ?? `#${v.idEsferaAdministrativa}`,
    iIEGM: v.iIEGM,
    iEduc: v.iEduc,
    iSaude: v.iSaude,
    iPlanejamento: v.iPlanejamento,
    iFiscal: v.iFiscal,
    iAmb: v.iAmb,
    iCidade: v.iCidade,
    iGovTI: v.iGovTI,
  }));
  return <TabelaIegm linhas={linhas} />;
}

function TextoIegm({ ano }: { ano: string }) {
  const link = (slug: string, texto: string) => (
    <Link className="underline" href={`/fiscalizacao/${ano}/iegm/${slug}`} prefetch={false}>
      {texto}
    </Link>
  );
  return (
    <>
      <p>
        O Índice de Efetividade da Gestão Municipal - IEGM é um indicador de
        processo, composto por 7 (sete) índices temáticos (
        {link("educacao", "Educação")}; {link("saude", "Saúde")};{" "}
        {link("planejamento", "Planejamento")}; {link("fiscal", "Gestão Fiscal")};{" "}
        {link("ambiental", "Meio Ambiente")}; {link("cidade", "Cidades Protegidas")};{" "}
        {link("gov-ti", "Governança em Tecnologia da Informação")}) consolidados
        em um único índice por meio de um modelo matemático buscando avaliar
        aspectos relevantes das políticas e atividades públicas desenvolvidas
        pelos gestores.
      </p>
      <p className="mt-1">
        O IEGM possibilita a elaboração de relatórios objetivos em áreas
        sensíveis do planejamento público para as Cortes de Contas brasileiras,
        oferecendo elementos importantes para auxiliar e subsidiar a ação
        fiscalizatória exercida pelo Controle Externo, em complemento às
        ferramentas que lhe são inerentes e as demais hoje disponíveis.
      </p>
      <p className="mt-1">
        Importante ressaltar que o resultado do IEGM é baseado em informações
        prestadas pelos próprios Municípios, dentre as quais algumas foram
        validadas pela equipe de fiscalização do Tribunal de Contas. As
        variáveis captadas somente poderão ser consideradas definitivas se forem
        validadas em fiscalizações e após o trânsito em julgado da Decisão do
        TCEES sobre as respectivas contas.
      </p>
    </>
  );
}

async function fetchJson<T>(metodo: string, ano: string, vazio: T): Promise<T> {
  const res = await fetch(
    `${ENV.apiUrl}/IEGMControllers/IEGM/${metodo}?anoExercicio=${ano}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return vazio;
  const text = await res.text();
  return text ? (JSON.parse(text) as T) : vazio;
}

const getIndice = cache((ano: string, metodo: string) =>
  fetchJson<DadoIndice[]>(metodo, ano, [])
);

const getTodosIndices = cache((ano: string) =>
  fetchJson<{ valores: NotasMunicipio[] }>("GetTodosIndices", ano, {
    valores: [],
  })
);
