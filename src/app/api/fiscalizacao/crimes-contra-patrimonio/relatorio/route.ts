import { ENV } from "@/shared/env";
import { getAnoParam, proxyPdf } from "@/shared/proxyPdf";

export async function GET(request: Request) {
  const ano = getAnoParam(request, 2022);
  return proxyPdf(
    `${ENV.apiUrl}/FiscalizacaoControllers/CrimesContraPatrimonio/DownloadRelatorio?anoExercicio=${ano}`
  );
}
