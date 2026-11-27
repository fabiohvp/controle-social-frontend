import DoughnutChart from "@/components/charts/DoughnutChart";
import MultiSeriesChart from "@/components/charts/MultiSeriesChart";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import { formatInt } from "@/formatters/number";
import { COLOR } from "@/theme/colors";
import { MultiSerie } from "@/types/Serie";

export type QuantidadesDeliberacoes = {
  quantidadeProvidencia: number;
  quantidadeProvidenciaVencida: number;
  quantidadeProvidenciaVencimentoProximo: number;
  quantidadeProvidenciaConcluida: number;
};

export type ResultadoProvidenciaTotalItem = {
  nome: string;
  valor: number;
};

export type ProvidenciaItem = {
  ano: number;
  descricao: string;
  municipios: string[];
  nomes: string[];
  situacaoProvidencia: string;
  prazo: string;
  numeroCompletoDeliberacao: string;
  tipoDeliberacao: string;
  tipoProvidencia: string;
};

type Props = {
  quantidades: QuantidadesDeliberacoes | null;
  totalSituacao: ResultadoProvidenciaTotalItem[] | null;
  evolucao: MultiSerie | null;
  providencias: ProvidenciaItem[] | null;
};

const CORES_DONUT = [
  COLOR["chart-info"],
  COLOR["chart-positivo"],
  COLOR["chart-alerta"],
  COLOR["chart-negativo"],
  "#8884d8",
  "#82ca9d",
];

export default function MonitoramentoConteudo({
  quantidades,
  totalSituacao,
  evolucao,
  providencias,
}: Props) {
  const donutItems = (totalSituacao ?? []).map((item) => ({
    name: item.nome,
    value: item.valor,
  }));

  return (
    <div className="flex flex-col gap-4">
      {/* Cards de resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 bg-white border border-gray-200 rounded shadow-sm">
          <div className="text-sm text-gray-500 font-medium">Total de Deliberações</div>
          <div className="text-2xl font-bold text-gray-800 mt-1">
            {formatInt(quantidades?.quantidadeProvidencia ?? 0)}
          </div>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded shadow-sm">
          <div className="text-sm text-gray-500 font-medium">Concluídas / Cumpridas</div>
          <div className="text-2xl font-bold text-green-600 mt-1">
            {formatInt(quantidades?.quantidadeProvidenciaConcluida ?? 0)}
          </div>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded shadow-sm">
          <div className="text-sm text-gray-500 font-medium">Vencidas</div>
          <div className="text-2xl font-bold text-red-600 mt-1">
            {formatInt(quantidades?.quantidadeProvidenciaVencida ?? 0)}
          </div>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded shadow-sm">
          <div className="text-sm text-gray-500 font-medium">Vencimento Próximo</div>
          <div className="text-2xl font-bold text-amber-500 mt-1">
            {formatInt(quantidades?.quantidadeProvidenciaVencimentoProximo ?? 0)}
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PanelWithTitle header="Situação das Deliberações">
          <DoughnutChart
            items={donutItems}
            colors={CORES_DONUT}
            style={{ height: "300px" }}
            legend={{ bottom: 0, left: "center", orient: "horizontal" }}
            tooltip={{
              formatter: "{b}: <b>{c}</b> ({d}%)",
            }}
          />
        </PanelWithTitle>

        <PanelWithTitle header="Evolução por Exercício">
          <MultiSeriesChart
            dados={evolucao}
            corrigirIpca={false}
            style={{ height: "300px" }}
          />
        </PanelWithTitle>
      </div>

      {/* Tabela de Deliberações */}
      <PanelWithTitle header={`Deliberações (${providencias?.length ?? 0})`}>
        {!providencias?.length ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            Nenhuma deliberação encontrada para o filtro selecionado.
          </div>
        ) : (
          <div className="overflow-x-auto max-h-[500px]">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-700 sticky top-0">
                <tr>
                  <th className="p-2.5">Deliberação</th>
                  <th className="p-2.5">Órgão / Município</th>
                  <th className="p-2.5">Tipo</th>
                  <th className="p-2.5">Prazo</th>
                  <th className="p-2.5">Situação</th>
                  <th className="p-2.5">Descrição</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {providencias.slice(0, 100).map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 odd:bg-white even:bg-gray-50/50">
                    <td className="p-2.5 font-medium whitespace-nowrap">
                      {item.tipoDeliberacao} {item.numeroCompletoDeliberacao}
                    </td>
                    <td className="p-2.5 text-xs max-w-[200px] truncate" title={item.nomes?.join(", ")}>
                      {item.nomes?.join(", ") || item.municipios?.join(", ")}
                    </td>
                    <td className="p-2.5 whitespace-nowrap text-xs">{item.tipoProvidencia}</td>
                    <td className="p-2.5 whitespace-nowrap text-xs">{item.prazo || "-"}</td>
                    <td className="p-2.5 whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-0.5 text-xs rounded font-medium ${
                          item.situacaoProvidencia?.toLowerCase().includes("cumprida")
                            ? "bg-green-100 text-green-800"
                            : item.situacaoProvidencia?.toLowerCase().includes("vencid")
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {item.situacaoProvidencia}
                      </span>
                    </td>
                    <td className="p-2.5 text-xs text-gray-600 max-w-md line-clamp-2" title={item.descricao}>
                      {item.descricao}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </PanelWithTitle>
    </div>
  );
}
