import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest) {
  const res = await fetch(
    "https://paineldecontrole.tcees.tc.br/api/FiscalizacaoControllers/DoencasCronicas/DownloadRelatorio%3FanoExercicio%3D2021#locale=pt-BR"
  );
  const contents = await res.blob();

  return new NextResponse(contents, {
    status: 201,
    headers: { "Content-Type": "application/pdf" },
  });
}
