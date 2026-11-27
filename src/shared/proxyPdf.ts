import { NextResponse } from "next/server";

/**
 * Repassa um arquivo (normalmente PDF) da API oficial. Retorna 502 quando a API
 * responde erro ou com um corpo que não é PDF (a API devolve uma página HTML de
 * manutenção/vazia nesses casos).
 */
export async function proxyPdf(url: string) {
  const res = await fetch(url);
  const contents = await res.arrayBuffer();
  const isPdf =
    contents.byteLength > 4 &&
    new TextDecoder().decode(contents.slice(0, 4)) === "%PDF";

  if (!res.ok || !isPdf) {
    return new NextResponse("Documento indisponível.", { status: 502 });
  }

  return new NextResponse(contents, {
    status: 200,
    headers: { "Content-Type": "application/pdf" },
  });
}

/** Lê o parâmetro `ano` (4 dígitos) da query string. */
export function getAnoParam(request: Request, padrao: number) {
  const ano = new URL(request.url).searchParams.get("ano");
  return ano && /^\d{4}$/.test(ano) ? ano : String(padrao);
}
