import { readJsonFile } from "@/shared/file";
import { NextRequest, NextResponse } from "next/server";

let MUNICIPIOS: {
	"codigo": string,
	"nome": string,
	"nomeNormalizado": string
}[];

readJsonFile("/data/municipios.json").then(municipios => {
	MUNICIPIOS = municipios
});

export async function GET(_: NextRequest) {
	return NextResponse.json(MUNICIPIOS);
}
