import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest) {
  const res = await fetch(
    "https://paineldecontrole.tcees.tc.br/api/FiscalizacaoControllers/CancerColoDeUtero/DownloadRelatorio?anoExercicio=2022"
  );
  const contents = await res.blob();

  return new NextResponse(contents, {
    status: 201,
    headers: { "Content-Type": "application/pdf" },
  });
}
