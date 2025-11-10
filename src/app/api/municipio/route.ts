import { readJsonFile } from "@/shared/serverJson";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest) {
	const MUNICIPIOS = await readJsonFile("data/municipios.json");
	return NextResponse.json(MUNICIPIOS);
}
