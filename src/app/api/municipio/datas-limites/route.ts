import DATAS_LIMITES from "@/data/datas-limites.json";
import { NextRequest, NextResponse } from "next/server";

//TODO: para atos de pessoal retornar no ano corrente os dados do ano anterior
//hoje está os dados no ano anterior com a propriedade ano com o valor do ano corrente
export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const ano = searchParams.get("ano")!;
	return NextResponse.json((DATAS_LIMITES as any)[ano]);
}
