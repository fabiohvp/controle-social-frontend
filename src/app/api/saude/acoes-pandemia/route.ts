import { ENV } from "@/shared/env";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest) {
  const res = await fetch(
    `${ENV.apiUrl}/FiscalizacaoControllers/AcoesPandemia/DownloadRelatorio?anoExercicio=2020`
  );
  const contents = await res.blob();

  return new NextResponse(contents, {
    status: 201,
    headers: { "Content-Type": "application/pdf" },
  });
}
