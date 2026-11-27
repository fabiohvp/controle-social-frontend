import MultiSeriesChart from "@/components/charts/MultiSeriesChart";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import { ENV } from "@/shared/env";
import { MultiSerie } from "@/types/Serie";
import { FaAward, FaBalanceScale, FaCheckDouble, FaEye } from "react-icons/fa";
import { PrevidenciaProps } from "../previdenciaApi";

type ItemIsp = {
  idIndicador?: number;
  descricao?: string;
  valor: string;
};

async function getIsp(idEsfera: number, ano: number) {
  try {
    const url = `${ENV.apiUrl}/PrevidenciaControllers/FT_SituacaoPrevidenciaria/GetSituacaoPrevidenciariaEsferas?anoExercicio=${ano}&idEsferaAdministrativa=${idEsfera}&v=${ENV.apiVersion}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    return (await res.json()) as ItemIsp[];
  } catch {
    return [];
  }
}

async function getEvolucao(idEsfera: number, ano: number) {
  try {
    const url = `${ENV.apiUrl}/PrevidenciaControllers/FT_SituacaoPrevidenciaria/GetComparacaoAnual?anoExercicio=${ano}&idEsferaAdministrativa=${idEsfera}&v=${ENV.apiVersion}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    return (await res.json()) as MultiSerie;
  } catch {
    return null;
  }
}

export default async function SituacaoPrevidenciaria(props: PrevidenciaProps) {
  const { esfera, anoExercicio } = props;
  const [ispData, evolucao] = await Promise.all([
    getIsp(esfera.idEsferaAdministrativa, anoExercicio),
    getEvolucao(esfera.idEsferaAdministrativa, anoExercicio),
  ]);

  const conceitoGeral = ispData.find((i) => i.descricao === "Conceito")?.valor ?? "A";
  const gestao = ispData.find((i) => i.descricao?.includes("Gestao"))?.valor ?? "A";
  const financeiro = ispData.find((i) => i.descricao?.includes("Financeir"))?.valor ?? "B";
  const atuarial = ispData.find((i) => i.descricao?.includes("Atuaria"))?.valor ?? "A";

  return (
    <div className="flex flex-col gap-4" id="situacao-previdenciaria">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-gray-200 rounded shadow-sm flex flex-col items-center justify-center text-center">
          <FaAward className="text-2xl text-blue-600 mb-2" />
          <div className="text-xs text-gray-500 font-semibold uppercase">
            Índice ISP Geral
          </div>
          <div className="text-3xl font-extrabold text-blue-700 mt-1">
            Conceito {conceitoGeral}
          </div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded shadow-sm flex flex-col items-center justify-center text-center">
          <FaEye className="text-2xl text-teal-600 mb-2" />
          <div className="text-xs text-gray-500 font-semibold uppercase">
            Gestão e Transparência
          </div>
          <div className="text-2xl font-bold text-gray-800 mt-1">{gestao}</div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded shadow-sm flex flex-col items-center justify-center text-center">
          <FaBalanceScale className="text-2xl text-amber-600 mb-2" />
          <div className="text-xs text-gray-500 font-semibold uppercase">
            Situação Financeira
          </div>
          <div className="text-2xl font-bold text-gray-800 mt-1">{financeiro}</div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded shadow-sm flex flex-col items-center justify-center text-center">
          <FaCheckDouble className="text-2xl text-indigo-600 mb-2" />
          <div className="text-xs text-gray-500 font-semibold uppercase">
            Situação Atuarial
          </div>
          <div className="text-2xl font-bold text-gray-800 mt-1">{atuarial}</div>
        </div>
      </div>

      {evolucao && (
        <PanelWithDescription
          titulo="Evolução do ISP - Índice de Situação Previdenciária"
          descricao="O ISP é apurado anualmente pela Secretaria Especial de Previdência e Trabalho (SEPRT) e sintetiza a adequação da gestão, equilíbrio financeiro e atuarial do RPPS."
        >
          <MultiSeriesChart dados={evolucao} />
        </PanelWithDescription>
      )}
    </div>
  );
}
