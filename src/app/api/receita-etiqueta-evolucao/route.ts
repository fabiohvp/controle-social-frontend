import { ENV } from "@/shared/env";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tipoEsfera =
    searchParams.get("tipoEsfera") === "estado"
      ? "EstadoControllers"
      : "MunicipioControllers";
  const idEsfera = searchParams.get("idEsferaAdministrativa") || "77";
  const ano = searchParams.get("anoExercicio") || "2026";
  const etiqueta = searchParams.get("etiqueta") || "";

  const query = `idEsferaAdministrativa=${idEsfera}&anoExercicio=${ano}&etiqueta=${etiqueta}&v=${ENV.apiVersion}`;
  const base = `${ENV.apiUrl}/${tipoEsfera}/Receita`;

  try {
    const [anualRes, mensalRes] = await Promise.all([
      fetch(`${base}/GetEvolucaoAnualPorEtiquetaSingleseries?${query}`),
      fetch(`${base}/GetEvolucaoMensalPorEtiquetaSingleseries?${query}`),
    ]);
    const anual = anualRes.ok ? await anualRes.json() : [];
    const mensal = mensalRes.ok ? await mensalRes.json() : [];
    return NextResponse.json({ anual, mensal });
  } catch (error) {
    return NextResponse.json({ anual: [], mensal: [] }, { status: 500 });
  }
}
