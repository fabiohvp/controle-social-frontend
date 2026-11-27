import DoughnutChart from "@/components/charts/DoughnutChart";
import MultiSeriesChart from "@/components/charts/MultiSeriesChart";
import NoDataChart from "@/components/charts/NoDataChart";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import { formatCurrency, formatPercent } from "@/formatters/number";
import { EsferaProps, getDadosApiEsfera } from "@/shared/esfera";
import { MultiSerie } from "@/types/Serie";
import AvisoPagina from "../_comum/AvisoPagina";

type ValorDeficit = {
  anoExercicio: number;
  saldoFinal: number;
  saldoFinalExercicioAnterior: number;
  valor: number;
  valorExercicioAnterior: number;
};

type ItemPizza = {
  name: string;
  value: number;
};

type FonteItem = {
  codigoFonteReduzida: string;
  codigoDetalhamento?: string;
  nomeFonteReduzida: string;
  saldoFinal: number;
  saldoFinalExercicioAnterior: number;
};

type TabelaDeficit = {
  vinculadas: FonteItem[];
  naoVinculada: FonteItem[];
  totalFinal?: number;
  totalFinalAnterior?: number;
  totalVinculadaFinal?: number;
  totalNaoVinculadaFinal?: number;
};

export default async function SuperavitDeficit({
  esfera,
  anoExercicio,
}: EsferaProps) {
  const get = <T,>(recurso: string) =>
    getDadosApiEsfera<T>(esfera, anoExercicio, `BalancoPatrimonial/${recurso}`);

  const [sumario, vinculadoLivre, composicaoVinculado, evolucaoAnual, tabela] =
    await Promise.all([
      get<ValorDeficit>("GetValorDeficitSuperavit"),
      get<ItemPizza[]>("GetValorDeficitSuperavitVinculadoLivre"),
      get<ItemPizza[]>("GetValorComposicaoVinculado"),
      get<MultiSerie>("GetEvolucaoAnualDeficitSuperavit"),
      get<TabelaDeficit>("GetTabelaDeficitSuperavit"),
    ]);

  const saldo = sumario?.saldoFinal ?? 0;
  const isSuperavit = saldo >= 0;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
      <PanelWithDescription
        className="md:col-span-4"
        titulo="Superávit / Déficit financeiro"
        descricao="O superávit financeiro ocorre quando a diferença entre o ativo financeiro e o passivo financeiro é positiva; quando é negativa fica caracterizado o déficit financeiro."
      >
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <span className="text-sm font-semibold uppercase text-gray-500">
            {isSuperavit ? "Superávit Apurado" : "Déficit Apurado"}
          </span>
          <span
            className={`text-2xl font-bold mt-2 ${
              isSuperavit ? "text-green-600" : "text-red-600"
            }`}
          >
            {formatCurrency(saldo)}
          </span>
          {sumario?.valor !== undefined && sumario?.valor !== null && (
            <span className="text-xs text-gray-500 mt-1">
              Relação com a RCL: {formatPercent(sumario.valor)}
            </span>
          )}
          {sumario?.saldoFinalExercicioAnterior !== undefined && (
            <div className="mt-4 pt-3 border-t w-full text-xs text-gray-600 flex justify-between">
              <span>Exercício anterior:</span>
              <strong
                className={
                  sumario.saldoFinalExercicioAnterior >= 0
                    ? "text-gray-800"
                    : "text-red-600"
                }
              >
                {formatCurrency(sumario.saldoFinalExercicioAnterior)}
              </strong>
            </div>
          )}
        </div>
      </PanelWithDescription>

      <PanelWithDescription
        className="md:col-span-4"
        titulo="Recursos vinculados e livres"
        descricao="Distribuição do resultado financeiro apurado entre fontes de recursos vinculados e recursos livres (não vinculados)."
      >
        {vinculadoLivre?.length ? (
          <DoughnutChart
            items={vinculadoLivre}
            colors={["#2b82bd", "#60bd68"]}
            style={{ height: "240px" }}
          />
        ) : (
          <NoDataChart />
        )}
      </PanelWithDescription>

      <PanelWithDescription
        className="md:col-span-4"
        titulo="Composição dos recursos vinculados"
        descricao="Abertura por destinação dos recursos vinculados (Educação, Saúde, RPPS, Assistência, etc.)."
      >
        {composicaoVinculado?.length ? (
          <DoughnutChart
            items={composicaoVinculado}
            colors={["#5da5da", "#faa43a", "#60bd68", "#f17cb0", "#b2912f"]}
            style={{ height: "240px" }}
          />
        ) : (
          <NoDataChart />
        )}
      </PanelWithDescription>

      <PanelWithDescription
        className="md:col-span-12"
        titulo="Evolução anual do resultado financeiro"
        descricao="Evolução do superávit ou déficit financeiro ao longo dos exercícios."
      >
        <MultiSeriesChart dados={evolucaoAnual} />
      </PanelWithDescription>

      {tabela && (
        <PanelWithDescription
          className="md:col-span-12"
          titulo="Detalhamento das Fontes de Recursos"
          descricao="Valores apurados por fonte de recursos no exercício e no exercício anterior."
        >
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-100 text-gray-700 font-semibold border-b">
                <tr>
                  <th className="p-2">Fonte</th>
                  <th className="p-2">Descrição</th>
                  <th className="p-2 text-right">Exercício Anterior (R$)</th>
                  <th className="p-2 text-right">Saldo Final (R$)</th>
                </tr>
              </thead>
              <tbody>
                {tabela.naoVinculada?.map((item, idx) => (
                  <tr key={`nv-${idx}`} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono">{item.codigoFonteReduzida}</td>
                    <td className="p-2">{item.nomeFonteReduzida}</td>
                    <td className="p-2 text-right">
                      {formatCurrency(item.saldoFinalExercicioAnterior)}
                    </td>
                    <td className="p-2 text-right font-medium">
                      {formatCurrency(item.saldoFinal)}
                    </td>
                  </tr>
                ))}
                {tabela.vinculadas?.map((item, idx) => (
                  <tr key={`v-${idx}`} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono">{item.codigoFonteReduzida}</td>
                    <td className="p-2">{item.nomeFonteReduzida}</td>
                    <td className="p-2 text-right">
                      {formatCurrency(item.saldoFinalExercicioAnterior)}
                    </td>
                    <td className="p-2 text-right font-medium">
                      {formatCurrency(item.saldoFinal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PanelWithDescription>
      )}

      <AvisoPagina>
        Os dados do Balanço Patrimonial e apuração do Superávit/Déficit
        Financeiro são obtidos a partir dos demonstrativos contábeis encaminhados
        pelo ente ao TCE-ES via sistema CidadES, em cumprimento às diretrizes da
        Lei 4.320/64 e da LRF.
      </AvisoPagina>
    </div>
  );
}
