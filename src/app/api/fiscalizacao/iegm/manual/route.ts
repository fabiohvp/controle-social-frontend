import { ENV } from "@/shared/env";
import { getAnoParam, proxyPdf } from "@/shared/proxyPdf";

export async function GET(request: Request) {
  const ano = getAnoParam(request, 2017);
  return proxyPdf(
    `${ENV.apiUrl}/IEGMControllers/IEGM/DownloadManual?anoExercicio=${ano}`
  );
}
