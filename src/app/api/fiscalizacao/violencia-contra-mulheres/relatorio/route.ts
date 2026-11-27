import { ENV } from "@/shared/env";
import { getAnoParam, proxyPdf } from "@/shared/proxyPdf";

export async function GET(request: Request) {
  const ano = getAnoParam(request, 2024);
  return proxyPdf(
    `${ENV.apiUrl}/FiscalizacaoControllers/ViolenciaContraMulheres/DownloadRelatorio?anoExercicio=${ano}`
  );
}
