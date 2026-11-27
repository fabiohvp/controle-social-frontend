import MultiSeriesChart from "@/components/charts/MultiSeriesChart";
import SingleSeriesChart from "@/components/charts/SingleSeriesChart";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import { formatInt } from "@/formatters/number";
import { ENV } from "@/shared/env";
import { MultiSerie, SerieItem } from "@/types/Serie";
import { FaHeartbeat, FaUserFriends, FaUserGraduate, FaUserShield } from "react-icons/fa";
import { PrevidenciaProps } from "../previdenciaApi";
import SeguradosTabs, { EstatisticaItem } from "./SeguradosTabs";

type DadosSegurados = {
  servidores?: EstatisticaItem | { quantidade: number } | number;
  aposentados?: EstatisticaItem | { quantidade: number } | number;
  pensionistas?: EstatisticaItem | { quantidade: number } | number;
  relacaoAtivosInativos?: SerieItem[];
  evolucaoBeneficiarios?: MultiSerie;
  evolucaoTipoAposentadoria?: MultiSerie;
};

async function getSegurados(esfera: PrevidenciaProps["esfera"], codigoUG: string, ano: number) {
  try {
    let url: string;
    if (esfera.tipo === "estado" && codigoUG.includes("500E29")) {
      url = `${ENV.apiUrl}/FolhaPagamentoControllers/FolhaPagamento/GetGraficosSeguradosMilitares?anoExercicio=${ano}&codigoUnidadeGestora=${codigoUG}&mes=12&v=${ENV.apiVersion}`;
    } else {
      url = `${ENV.apiUrl}/MunicipioControllers/Previdencia/GetGraficosSegurados?codigoUnidadeGestora=${codigoUG}&anoReferencia=${ano}&mesUltimoEnvio=12&v=${ENV.apiVersion}`;
    }
    const res = await fetch(url);
    if (!res.ok) return null;
    return (await res.json()) as DadosSegurados;
  } catch {
    return null;
  }
}

function getValor(val: EstatisticaItem | { quantidade: number } | number | undefined): number {
  if (val === undefined || val === null) return 0;
  if (typeof val === "number") return val;
  if (typeof val.quantidade === "number") return val.quantidade;
  if (val.quantidade && typeof val.quantidade === "object" && "series" in val.quantidade) {
    const ms = val.quantidade as MultiSerie;
    if (ms.series?.length) {
      return ms.series.reduce((acc, s) => {
        const lastVal = s.values?.[s.values.length - 1] ?? 0;
        return acc + lastVal;
      }, 0);
    }
  }
  return 0;
}

export default async function Segurados(props: PrevidenciaProps) {
  const { esfera, anoExercicio, codigoUnidadeGestora } = props;
  const dados = await getSegurados(esfera, codigoUnidadeGestora, anoExercicio);

  const ativos = getValor(dados?.servidores);
  const aposentados = getValor(dados?.aposentados);
  const pensionistas = getValor(dados?.pensionistas);
  const totalInativos = aposentados + pensionistas;

  const isMilitares = esfera.tipo === "estado" && codigoUnidadeGestora.includes("500E29");
  const labels: [string, string, string] = isMilitares
    ? ["Militares", "Reservistas/Reformados", "Pensionistas"]
    : ["Servidores", "Aposentados", "Pensionistas"];

  return (
    <div className="flex flex-col gap-4" id="segurados-rpps">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-gray-200 rounded shadow-sm flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
            <FaUserGraduate className="text-xl" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-semibold uppercase">
              Servidores Ativos
            </div>
            <div className="text-2xl font-bold text-gray-800">{formatInt(ativos)}</div>
          </div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded shadow-sm flex items-center gap-3">
          <div className="p-3 bg-teal-50 text-teal-600 rounded-full">
            <FaUserShield className="text-xl" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-semibold uppercase">
              Aposentados
            </div>
            <div className="text-2xl font-bold text-gray-800">{formatInt(aposentados)}</div>
          </div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded shadow-sm flex items-center gap-3">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-full">
            <FaHeartbeat className="text-xl" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-semibold uppercase">
              Pensionistas
            </div>
            <div className="text-2xl font-bold text-gray-800">{formatInt(pensionistas)}</div>
          </div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded shadow-sm flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full">
            <FaUserFriends className="text-xl" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-semibold uppercase">
              Relação Ativos / Inativos
            </div>
            <div className="text-2xl font-bold text-indigo-700">
              {totalInativos > 0 ? (ativos / totalInativos).toFixed(2) : "-"}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {dados?.evolucaoBeneficiarios && (
          <PanelWithDescription
            titulo="Evolução de beneficiários"
            descricao="Evolução anual do número de servidores ativos, aposentados e pensionistas vinculados ao RPPS."
          >
            <MultiSeriesChart
              dados={dados.evolucaoBeneficiarios}
              tipos={["line", "line", "line"]}
              cores={["#C0392B", "#F4B351", "#607D8B"]}
            />
          </PanelWithDescription>
        )}

        {dados?.evolucaoTipoAposentadoria && (
          <PanelWithDescription
            titulo="Evolução por tipo de aposentadoria"
            descricao="Distribuição de servidores aposentados por tipo de benefício (aposentadoria compulsória, aposentadoria por idade, aposentadoria por invalidez e aposentadoria por tempo de contribuição)."
          >
            <MultiSeriesChart
              dados={dados.evolucaoTipoAposentadoria}
              tipos={["line", "line", "line", "line"]}
              cores={["#1DA1F2", "#F4B351", "#607D8B", "#8AA2AD"]}
            />
          </PanelWithDescription>
        )}

        {dados?.relacaoAtivosInativos && (
          <PanelWithDescription
            titulo="Relação entre servidores ativos e inativos"
            descricao="Relação entre a quantidade de servidores ativos e a quantidade de beneficiários (aposentados e pensionistas)."
          >
            <SingleSeriesChart dados={dados.relacaoAtivosInativos} tipo="bar" />
          </PanelWithDescription>
        )}
      </div>

      <SeguradosTabs
        labels={labels}
        servidores={dados?.servidores as EstatisticaItem}
        aposentados={dados?.aposentados as EstatisticaItem}
        pensionistas={dados?.pensionistas as EstatisticaItem}
      />
    </div>
  );
}
