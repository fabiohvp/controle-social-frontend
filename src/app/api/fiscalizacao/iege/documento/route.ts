import { ENV } from "@/shared/env";
import { proxyPdf } from "@/shared/proxyPdf";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  if (!id || !/^\d+$/.test(id)) {
    return new NextResponse("Documento inválido.", { status: 400 });
  }
  return proxyPdf(
    `${ENV.apiUrl}/EsferaAdministrativaControllers/Etcees/DownloadEtceesArquivo?idDocumento=${id}`
  );
}
