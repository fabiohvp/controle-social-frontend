import { notFound, redirect } from "next/navigation";
import { Pagina, getPaginaPadrao } from "./paginas";

type Props = {
  /** páginas da seção (routes.ts) */
  paginas: Pagina[];
  /** slug pedido na URL */
  subpagina: string;
  /** URL da seção sem a subpágina, ex.: /municipio/2024/vitoria/gestao-fiscal */
  urlSecao: string;
  /** destino quando a seção ainda não tem página implementada */
  urlAlternativa: string;
};

/**
 * Usado pelas rotas fallback `[subpagina]/page.tsx`: qualquer slug sem
 * page.tsx própria (não implementado, antigo ou inválido) vai para a primeira
 * página implementada da seção. As páginas reais (pastas estáticas) têm
 * prioridade sobre a rota dinâmica, então este código só roda para slugs sem page.
 */
export function redirecionarParaPaginaPadrao({
  paginas,
  subpagina,
  urlSecao,
  urlAlternativa,
}: Props): never {
  const padrao = getPaginaPadrao(paginas);
  if (!padrao) redirect(urlAlternativa);
  // marcado como implementado mas sem page.tsx: evita loop de redirect
  if (padrao.slug === subpagina) notFound();
  redirect(`${urlSecao}/${padrao.slug}`);
}
