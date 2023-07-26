import MUNICIPIOS from "@/data/municipios.json";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest) {
  return NextResponse.json(MUNICIPIOS);
}
