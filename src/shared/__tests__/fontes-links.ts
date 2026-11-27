import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import * as ts from "typescript";

/**
 * Extrai os `href` das fontes de navegação (TSX e JSON do painel da home).
 * Os valores de exemplo substituem `${...}` e placeholders `{...}`.
 */

export type LinkEncontrado = { href: string; origem: string };

/** Valores de exemplo usados para `${...}` nos TSX. */
export const VALORES_EXEMPLO = {
  ano: "2024",
  municipio: "vitoria",
  mes: "1",
  codigoMunicipio: "077",
};

/**
 * Placeholders do JSON do painel, com os mesmos valores que a home usa em
 * `replaceAnos` (LinksWidgets.tsx). Um placeholder que a home não resolve
 * continua literal e o link falha, como acontece no site.
 */
export const PLACEHOLDERS_DA_HOME: Record<string, string> = {
  "{municipio-nome-normalizado}": VALORES_EXEMPLO.municipio,
  "{municipio-ano}": VALORES_EXEMPLO.ano,
  "{estado-ano}": VALORES_EXEMPLO.ano,
  "{boletins-ano}": VALORES_EXEMPLO.ano,
  "{folha-de-pagamento-ano}": VALORES_EXEMPLO.ano,
  "{obrigacao-de-envio-ano}": VALORES_EXEMPLO.ano,
};

/** Valor de exemplo para uma expressão `${...}`, pelo texto da expressão. */
function valorDaExpressao(texto: string, constantes: Map<string, string>): string {
  const constante = constantes.get(texto);
  if (constante !== undefined) return constante;
  if (/getCodigoMunicipio/.test(texto)) return VALORES_EXEMPLO.codigoMunicipio;
  if (/municipio/i.test(texto)) return VALORES_EXEMPLO.municipio;
  if (/\bmes\b/i.test(texto)) return VALORES_EXEMPLO.mes;
  if (/ano/i.test(texto)) return VALORES_EXEMPLO.ano;
  throw new Error(`Expressão de href sem valor de exemplo: ${texto}`);
}

function avaliaTemplate(
  modelo: ts.TemplateLiteral,
  constantes: Map<string, string>
): string {
  if (ts.isNoSubstitutionTemplateLiteral(modelo)) return modelo.text;
  let resultado = modelo.head.text;
  for (const span of modelo.templateSpans) {
    resultado +=
      valorDaExpressao(span.expression.getText(), constantes) +
      span.literal.text;
  }
  return resultado;
}

/** Constantes de topo do arquivo com valor literal (string ou número). */
function coletaConstantes(sf: ts.SourceFile): Map<string, string> {
  const constantes = new Map<string, string>();
  for (const comando of sf.statements) {
    if (!ts.isVariableStatement(comando)) continue;
    for (const decl of comando.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name) || !decl.initializer) continue;
      const init = decl.initializer;
      if (ts.isStringLiteral(init) || ts.isNoSubstitutionTemplateLiteral(init)) {
        constantes.set(decl.name.text, init.text);
      } else if (ts.isNumericLiteral(init)) {
        constantes.set(decl.name.text, init.text);
      }
    }
  }
  return constantes;
}

function valorDoAtributoHref(
  init: ts.Node,
  constantes: Map<string, string>
): string {
  if (ts.isStringLiteral(init)) return init.text;
  if (ts.isJsxExpression(init) && init.expression) {
    const expressao = init.expression;
    if (ts.isStringLiteral(expressao) || ts.isNoSubstitutionTemplateLiteral(expressao)) {
      return expressao.text;
    }
    if (ts.isTemplateExpression(expressao)) {
      return avaliaTemplate(expressao, constantes);
    }
    if (ts.isIdentifier(expressao) && constantes.has(expressao.text)) {
      return constantes.get(expressao.text) as string;
    }
    throw new Error(`href dinâmico sem resolução: ${expressao.getText()}`);
  }
  throw new Error(`Atributo href sem valor: ${init.getText()}`);
}

/** Extrai os `href="..."` e `href={...}` de um arquivo TSX. */
export function extrairHrefsDeTsx(
  caminhoAbsoluto: string,
  caminhoRelativo: string
): LinkEncontrado[] {
  const texto = readFileSync(caminhoAbsoluto, "utf8");
  const sf = ts.createSourceFile(
    caminhoAbsoluto,
    texto,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );
  const constantes = coletaConstantes(sf);
  const links: LinkEncontrado[] = [];

  const visita = (no: ts.Node) => {
    if (
      ts.isJsxAttribute(no) &&
      ts.isIdentifier(no.name) &&
      no.name.text === "href" &&
      no.initializer
    ) {
      const linha = sf.getLineAndCharacterOfPosition(no.getStart(sf)).line + 1;
      links.push({
        href: valorDoAtributoHref(no.initializer, constantes),
        origem: `${caminhoRelativo}:${linha}`,
      });
    }
    ts.forEachChild(no, visita);
  };
  visita(sf);
  return links;
}

/** Extrai os `href` dos `artigos` dos JSONs de um diretório, já com placeholders substituídos. */
export function extrairHrefsDeJson(dir: string, caminhoRelativo: string): LinkEncontrado[] {
  const links: LinkEncontrado[] = [];
  for (const nome of readdirSync(dir)) {
    if (!nome.endsWith(".json")) continue;
    const conteudo = JSON.parse(readFileSync(path.join(dir, nome), "utf8")) as {
      artigos: { href: string }[];
    };
    for (const artigo of conteudo.artigos) {
      links.push({
        href: substituiPlaceholders(artigo.href),
        origem: `${caminhoRelativo}/${nome}`,
      });
    }
  }
  return links;
}

function substituiPlaceholders(href: string): string {
  let resultado = href;
  for (const [placeholder, valor] of Object.entries(PLACEHOLDERS_DA_HOME)) {
    resultado = resultado.split(placeholder).join(valor);
  }
  return resultado;
}
