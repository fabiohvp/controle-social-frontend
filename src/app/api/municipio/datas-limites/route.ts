import { readJsonFile } from "@/shared/file";
import { NextRequest, NextResponse } from "next/server";

let DATAS_LIMITES: any;

readJsonFile("/data/datas-limites.json").then(datasLimites => {
	DATAS_LIMITES = datasLimites
});

//TODO: para atos de pessoal retornar no ano corrente os dados do ano anterior
//hoje está os dados no ano anterior com a propriedade ano com o valor do ano corrente
export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const ano = searchParams.get("ano")!;
	return NextResponse.json(DATAS_LIMITES[ano]);
}
