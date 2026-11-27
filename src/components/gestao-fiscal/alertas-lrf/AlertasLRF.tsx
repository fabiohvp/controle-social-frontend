import PanelWithDescription from "@/components/panel/PanelWithDescription";
import { EsferaProps, getDadosApiEsfera } from "@/shared/esfera";
import { FaBell, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import AvisoPagina from "../_comum/AvisoPagina";

type AlertaItem = {
  idIndicador: number;
  dataAlerta: string | null;
  dataCiencia: string | null;
  indicador: string;
  limiteMaximo?: number;
  limitePrudencial?: number;
  limiteAlerta?: number;
  metaLimite?: number | null;
  numeroPeriodo: number | null;
  percentualSobreRCL?: number | null;
  poder: string | null;
  resultado: string | null;
  tipoPeriodo: string;
  valorApurado?: number | null;
  responsavel: string | null;
};

export default async function AlertasLRF({
  esfera,
  anoExercicio,
}: EsferaProps) {
  const alertas =
    (await getDadosApiEsfera<AlertaItem[]>(
      esfera,
      anoExercicio,
      "AlertaLRF/GetAlertas"
    )) ?? [];

  const alertasEmitidos = alertas.filter((a) => a.dataAlerta !== null);

  // Group by indicador and tipoPeriodo
  const grupos = new Map<string, { indicador: string; tipoPeriodo: string; itens: AlertaItem[] }>();

  for (const item of alertas) {
    const chave = `${item.indicador}_${item.tipoPeriodo}_${item.poder ?? ""}`;
    if (!grupos.has(chave)) {
      grupos.set(chave, {
        indicador: item.indicador,
        tipoPeriodo: item.tipoPeriodo,
        itens: [],
      });
    }
    grupos.get(chave)!.itens.push(item);
  }

  const linhas = Array.from(grupos.values());

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white border border-gray-200 rounded shadow-sm flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
            <FaBell className="text-xl" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-semibold uppercase">
              Total de Alertas Avaliados
            </div>
            <div className="text-xl font-bold text-gray-800">{alertas.length}</div>
          </div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded shadow-sm flex items-center gap-3">
          <div className="p-3 bg-red-50 text-red-600 rounded-full">
            <FaExclamationTriangle className="text-xl" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-semibold uppercase">
              Alertas Emitidos
            </div>
            <div className="text-xl font-bold text-red-600">
              {alertasEmitidos.length}
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded shadow-sm flex items-center gap-3">
          <div className="p-3 bg-green-50 text-green-600 rounded-full">
            <FaCheckCircle className="text-xl" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-semibold uppercase">
              Situação Geral
            </div>
            <div className="text-sm font-bold text-green-700">
              {alertasEmitidos.length === 0
                ? "Sem alertas emitidos no exercício"
                : `${alertasEmitidos.length} alerta(s) emitido(s)`}
            </div>
          </div>
        </div>
      </div>

      <PanelWithDescription
        titulo="Painel de Monitoramento de Alertas LRF"
        descricao="Acompanhamento sistemático dos limites e metas estabelecidos pela Lei de Responsabilidade Fiscal (LRF - LC 101/2000)."
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-100 text-gray-700 font-semibold border-b">
              <tr>
                <th className="p-2.5">Indicador / Limite Fiscal</th>
                <th className="p-2.5">Periodicidade</th>
                <th className="p-2.5">Status dos Períodos</th>
                <th className="p-2.5 text-center">Alertas Emitidos</th>
              </tr>
            </thead>
            <tbody>
              {linhas.map((grupo, idx) => {
                const emitidosNoGrupo = grupo.itens.filter((i) => i.dataAlerta !== null);
                return (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-2.5 font-medium text-gray-800">
                      {grupo.indicador}
                    </td>
                    <td className="p-2.5 text-gray-600">{grupo.tipoPeriodo}</td>
                    <td className="p-2.5">
                      <div className="flex flex-wrap gap-1.5">
                        {grupo.itens.map((item, pIdx) => {
                          const hasAlert = item.dataAlerta !== null;
                          return (
                            <span
                              key={pIdx}
                              title={
                                hasAlert
                                  ? `Alerta emitido em ${item.dataAlerta}`
                                  : "Sem alerta no período"
                              }
                              className={`px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 ${
                                hasAlert
                                  ? "bg-red-100 text-red-800 border border-red-200"
                                  : "bg-green-50 text-green-700 border border-green-200"
                              }`}
                            >
                              {hasAlert ? (
                                <FaExclamationTriangle className="text-[10px]" />
                              ) : (
                                <FaCheckCircle className="text-[10px]" />
                              )}
                              {item.numeroPeriodo ? `${item.numeroPeriodo}º` : `P${pIdx + 1}`}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td className="p-2.5 text-center">
                      {emitidosNoGrupo.length > 0 ? (
                        <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 font-bold">
                          {emitidosNoGrupo.length}
                        </span>
                      ) : (
                        <span className="text-gray-400 font-mono">0</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </PanelWithDescription>

      <AvisoPagina>
        Os alertas da LRF são emitidos pelo Tribunal de Contas nos termos do art.
        59, § 1º, da Lei Complementar nº 101/2000, com base nos relatórios de
        gestão fiscal e demonstrativos das remessas periódicas.
      </AvisoPagina>
    </div>
  );
}
