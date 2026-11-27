import ExternalLink from "@/components/links/ExternalLink";
import AlertPanel from "@/components/panel/AlertPanel";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import { ENV } from "@/shared/env";
import { Esfera } from "@/shared/esfera";
import Link from "next/link";
import { FaFileAlt, FaUserTie } from "react-icons/fa";

type ProcessoItem = {
  processo: {
    id: number;
    numeroCompleto: string;
    descricaoClassificacaoProcesso: string;
    relator: string;
    possuiITC: boolean;
    dataEntrega?: string;
    unidadesGestoras: { codigo: string; nome: string }[];
    responsaveis: { nome: string; cargo?: string }[];
  };
  chaveSeguranca?: string;
};

type Props = {
  ano: string;
  esfera: Esfera;
};

async function getProcessos(idEsfera: number, ano: string) {
  try {
    const base = `${ENV.apiUrl}/MunicipioControllers/PrestacaoConta`;
    const [prefeituraECamaraRes, outrasRes] = await Promise.all([
      fetch(
        `${base}/GetProcessosPrefeituraECamara?idEsferaAdministrativa=${idEsfera}&anoExercicio=${ano}&v=${ENV.apiVersion}`
      ),
      fetch(
        `${base}/GetProcessosOutrasUnidadesGestoras?idEsferaAdministrativa=${idEsfera}&anoExercicio=${ano}&v=${ENV.apiVersion}`
      ),
    ]);

    const prefeituraECamara = prefeituraECamaraRes.ok
      ? ((await prefeituraECamaraRes.json()) as ProcessoItem[])
      : [];
    const outras = outrasRes.ok
      ? ((await outrasRes.json()) as ProcessoItem[])
      : [];

    const prefeitura = prefeituraECamara.find(
      (p) =>
        p.processo?.descricaoClassificacaoProcesso
          ?.toLowerCase()
          .includes("prefeito") ||
        p.processo?.unidadesGestoras?.some((u) => u.codigo.includes("E07"))
    );

    const camara = prefeituraECamara.find(
      (p) =>
        p.processo?.descricaoClassificacaoProcesso
          ?.toLowerCase()
          .includes("câmara") ||
        p.processo?.unidadesGestoras?.some((u) => u.codigo.includes("E01"))
    );

    return { prefeitura, camara, outras };
  } catch {
    return { prefeitura: undefined, camara: undefined, outras: [] };
  }
}

function CardProcesso({
  titulo,
  item,
}: {
  titulo: string;
  item?: ProcessoItem;
}) {
  if (!item?.processo) {
    return (
      <PanelWithTitle header={titulo}>
        <div className="p-4 text-sm text-gray-500">
          Nenhum processo autuado para o exercício.
        </div>
      </PanelWithTitle>
    );
  }

  const { processo } = item;
  const ugNome = processo.unidadesGestoras?.[0]?.nome || titulo;
  const responsaveis = processo.responsaveis?.map((r) => r.nome).join(", ") || "-";

  return (
    <PanelWithTitle header={titulo}>
      <div className="flex flex-col gap-3 p-1">
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-xs text-gray-500 font-semibold uppercase">
            Processo
          </span>
          <ExternalLink
            href={`https://servicos.tcees.tc.br/Processo/DetalhesProcesso/${processo.id}`}
            title="Ver no e-TCEES"
            className="font-bold text-blue-600 hover:underline"
          >
            {processo.numeroCompleto}
          </ExternalLink>
        </div>

        <div className="text-sm">
          <span className="text-xs text-gray-500 block">Unidade Gestora:</span>
          <strong>{ugNome}</strong>
        </div>

        <div className="text-sm">
          <span className="text-xs text-gray-500 block">Relator:</span>
          <span>{processo.relator || "A definir"}</span>
        </div>

        <div className="text-sm flex items-start gap-1.5">
          <FaUserTie className="text-gray-400 mt-1 shrink-0" />
          <div>
            <span className="text-xs text-gray-500 block">Responsáveis:</span>
            <span>{responsaveis}</span>
          </div>
        </div>

        <div className="pt-2 border-t flex items-center justify-between text-xs">
          <span
            className={`px-2 py-0.5 rounded font-medium ${
              processo.possuiITC
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {processo.possuiITC ? "Possui ITC emitida" : "Em instrução"}
          </span>
          {processo.dataEntrega && (
            <span className="text-gray-500">Entrega: {processo.dataEntrega}</span>
          )}
        </div>
      </div>
    </PanelWithTitle>
  );
}

export default async function PrestacaoContaRaiz({ ano, esfera }: Props) {
  if (esfera.tipo === "estado") {
    return (
      <div className="flex flex-col gap-4">
        <AlertPanel type="info">
          Acompanhe os processos de prestação de contas do Governo do Estado e de
          suas Unidades Gestoras junto ao TCE-ES.
        </AlertPanel>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-white border border-gray-200 rounded shadow-sm flex flex-col justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg text-gray-800">
                Contas de Governo
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Processos referentes à prestação de contas anual do Governador do
                Estado.
              </p>
            </div>
            <Link
              href={`/prestacao-de-conta/${ano}/estado/Governo/01`}
              className="inline-block text-center bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition"
            >
              Acessar Contas de Governo
            </Link>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded shadow-sm flex flex-col justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg text-gray-800">
                Contas de Gestão
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Processos de prestação de contas dos ordenadores de despesas e
                administradores de órgãos estaduais.
              </p>
            </div>
            <Link
              href={`/prestacao-de-conta/${ano}/estado/Gestão/01`}
              className="inline-block text-center bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition"
            >
              Acessar Contas de Gestão
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { prefeitura, camara, outras } = await getProcessos(
    esfera.idEsferaAdministrativa,
    ano
  );

  return (
    <div className="flex flex-col gap-4">
      <AlertPanel type="info">
        Acompanhe a tramitação dos processos de Prestação de Contas Anual dos
        órgãos e entidades de {esfera.nome} junto ao Tribunal de Contas do Estado
        do Espírito Santo.
      </AlertPanel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardProcesso titulo="Prefeitura Municipal" item={prefeitura} />
        <CardProcesso titulo="Câmara Municipal" item={camara} />
      </div>

      {outras.length > 0 && (
        <PanelWithTitle header={`Outras Unidades Gestoras (${outras.length})`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {outras.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-gray-50 border border-gray-200 rounded flex flex-col gap-1.5 text-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-600">
                    {item.processo?.numeroCompleto}
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                      item.processo?.possuiITC
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {item.processo?.possuiITC ? "Com ITC" : "Em instrução"}
                  </span>
                </div>
                <div className="font-medium text-xs text-gray-800 truncate">
                  {item.processo?.unidadesGestoras?.[0]?.nome}
                </div>
                <div className="text-xs text-gray-500">
                  Relator: {item.processo?.relator || "-"}
                </div>
              </div>
            ))}
          </div>
        </PanelWithTitle>
      )}
    </div>
  );
}
