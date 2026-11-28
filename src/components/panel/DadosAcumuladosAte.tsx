import { fetchJson } from "@/shared/api";
import { ENV } from "@/shared/env";

const MESES = [
  "JANEIRO",
  "FEVEREIRO",
  "MARÇO",
  "ABRIL",
  "MAIO",
  "JUNHO",
  "JULHO",
  "AGOSTO",
  "SETEMBRO",
  "OUTUBRO",
  "NOVEMBRO",
  "DEZEMBRO",
];

type EnvioPcm = { mes: number; dataHomologacao: string | null };

/**
 * "Dados acumulados até DEZEMBRO" das visões gerais do site oficial: último mês
 * com PCM homologada pela unidade gestora principal (prefeitura ou governo).
 */
export default async function DadosAcumuladosAte({
  ano,
  controller,
  codigoUnidadeGestora,
}: {
  ano: string;
  controller: "MunicipioControllers" | "EstadoControllers";
  codigoUnidadeGestora: string | undefined;
}) {
  if (!codigoUnidadeGestora) return null;
  const envios = await fetchJson<EnvioPcm[]>(
    `${ENV.apiUrl}/${controller}/ObrigacaoEnvio/GetUnidadeGestoraPendenciaEnvioPCM?anoExercicio=${ano}&codigoUnidadeGestora=${codigoUnidadeGestora}&v=${ENV.apiVersion}`
  );
  const ultimoMes = Math.max(0, ...(envios ?? []).filter((e) => e.dataHomologacao).map((e) => e.mes));
  if (!ultimoMes) return null;

  return (
    <p className="px-1 text-sm text-primary">
      Dados acumulados até <strong>{MESES[ultimoMes - 1]}</strong>
    </p>
  );
}
