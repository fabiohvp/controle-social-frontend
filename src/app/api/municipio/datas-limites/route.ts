import DATAS_LIMITES from "@/data/datas-limites.json";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ano = searchParams.get("ano")!;
  return NextResponse.json((DATAS_LIMITES as any)[ano]);
}
