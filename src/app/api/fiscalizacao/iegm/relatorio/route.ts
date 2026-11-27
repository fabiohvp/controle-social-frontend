import { ENV } from "@/shared/env";
import { getAnoParam, proxyPdf } from "@/shared/proxyPdf";

export async function GET(request: Request) {
  const ano = getAnoParam(request, 2023);
  return proxyPdf(
    `${ENV.apiUrl}/IEGMControllers/IEGM/DownloadRelatorio?anoExercicio=${ano}`
  );
}
