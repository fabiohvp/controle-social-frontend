import PanelWithDescription from "@/components/panel/PanelWithDescription";
import { formatCurrency, formatPercent } from "@/formatters/number";
import { ENV } from "@/shared/env";
import { PrevidenciaProps } from "../previdenciaApi";

type ItemAliquota = {
  ano: number;
  codigoUnidadeGestora: string;
  tipoPlano: string;
  codigoEsferaAdministrativa: string;
  aliquota?: number;
  anoExigibilidade?: number;
  unidadeGestora?: string;
};

type ItemAporte = {
  ano: number;
  codigoUnidadeGestora: string;
  tipoPlano: string;
  codigoEsferaAdministrativa: string;
  valorAporte?: number;
  anoExigibilidade?: number;
  unidadeGestora?: string;
};

async function getPlanos(ano: number, codigoEsfera: string) {
  try {
    const base = `${ENV.apiUrl}/RankingsControllers/Previdencia`;
    const [aliqRes, aportesRes] = await Promise.all([
      fetch(`${base}/GetRankingsPlanoAmortizacaoAliquotas?anoSelecionado=${ano}&v=${ENV.apiVersion}`),
      fetch(`${base}/GetRankingsPlanoAmortizacaoAportes?anoSelecionado=${ano}&v=${ENV.apiVersion}`),
    ]);

    const aliquotas = aliqRes.ok ? ((await aliqRes.json()) as ItemAliquota[]) : [];
    const aportes = aportesRes.ok ? ((await aportesRes.json()) as ItemAporte[]) : [];

    const aliqFiltrada = aliquotas.filter((a) => a.codigoEsferaAdministrativa === codigoEsfera);
    const aportesFiltrados = aportes.filter((a) => a.codigoEsferaAdministrativa === codigoEsfera);

    return { aliquotas: aliqFiltrada, aportes: aportesFiltrados };
  } catch {
    return { aliquotas: [], aportes: [] };
  }
}

export default async function PlanoAmortizacao(props: PrevidenciaProps) {
  const { esfera, anoExercicio } = props;
  const { aliquotas, aportes } = await getPlanos(anoExercicio, esfera.codigo);

  return (
    <div className="flex flex-col gap-4" id="plano-amortizacao">
      <PanelWithDescription
        titulo="Plano de Amortização do Déficit Atuarial"
        descricao="O plano de amortização visa equacionar o déficit atuarial apurado na avaliação atuarial do RPPS, mediante alíquotas suplementares ou aportes financeiros periódicos definidos em lei."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 border border-gray-200 rounded">
            <h4 className="font-semibold text-sm text-gray-800 mb-3 border-b pb-2">
              Alíquotas Suplementares Programadas
            </h4>
            {aliquotas.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-gray-100 text-gray-600 font-semibold border-b">
                    <tr>
                      <th className="p-2">Ano Exigibilidade</th>
                      <th className="p-2">Tipo de Plano</th>
                      <th className="p-2 text-right">Alíquota</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aliquotas.map((item, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="p-2 font-medium">{item.anoExigibilidade ?? item.ano}</td>
                        <td className="p-2">{item.tipoPlano}</td>
                        <td className="p-2 text-right font-bold text-blue-600">
                          {item.aliquota !== undefined ? formatPercent(item.aliquota) : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-gray-500 py-4 text-center">
                Nenhum registro de alíquota suplementar para este exercício.
              </p>
            )}
          </div>

          <div className="p-4 bg-gray-50 border border-gray-200 rounded">
            <h4 className="font-semibold text-sm text-gray-800 mb-3 border-b pb-2">
              Aportes Atuariais Programados
            </h4>
            {aportes.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-gray-100 text-gray-600 font-semibold border-b">
                    <tr>
                      <th className="p-2">Ano Exigibilidade</th>
                      <th className="p-2">Tipo de Plano</th>
                      <th className="p-2 text-right">Valor do Aporte</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aportes.map((item, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="p-2 font-medium">{item.anoExigibilidade ?? item.ano}</td>
                        <td className="p-2">{item.tipoPlano}</td>
                        <td className="p-2 text-right font-bold text-green-700">
                          {item.valorAporte !== undefined ? formatCurrency(item.valorAporte) : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-gray-500 py-4 text-center">
                Nenhum registro de aporte atuarial para este exercício.
              </p>
            )}
          </div>
        </div>
      </PanelWithDescription>
    </div>
  );
}
