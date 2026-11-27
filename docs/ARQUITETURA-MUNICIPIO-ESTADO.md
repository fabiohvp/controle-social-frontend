# Arquitetura Município / Estado

Decisões da issue #8. Vale para `src/app/municipio/[ano]/[municipio]/` e `src/app/estado/[ano]/`. As issues #9–#15 partem desta branch em paralelo: **cada uma só cria as próprias páginas e muda os flags no `routes.ts` da própria seção**. Assim os arquivos tocados não se sobrepõem.

## Estrutura de pastas

```
src/app/municipio/[ano]/[municipio]/          (estado: src/app/estado/[ano]/, mesma estrutura)
├── routes.ts                 tipos, getUrlBaseMunicipio, INDICE_SEGMENTO_* (não editar)
├── [pagina]/page.tsx         fallback da raiz → visao-geral (não editar)
├── _components/
│   ├── menuMunicipio.tsx     ordem da sidebar e do breadcrumb principal (não editar)
│   ├── BarraLateralMunicipios.tsx, BreadcrumbMunicipioSecao.tsx, Breadcrumb*.tsx (não editar)
├── (root)/
│   ├── routes.ts             PAGINAS_RAIZ_MUNICIPIO: visao-geral, obrigacao-de-envio, rankings, …
│   ├── layout.tsx            DashboardLayout + sidebar + breadcrumb (não editar)
│   └── <slug>/page.tsx       só o conteúdo
├── gestao-fiscal/
│   ├── routes.ts             PAGINAS_GESTAO_FISCAL (todos os itens do site oficial)
│   ├── layout.tsx, page.tsx, [subpagina]/page.tsx, Breadcrumb*.tsx (não editar)
│   └── <slug>/page.tsx       só o conteúdo
├── gestao-orcamentaria/      (igual a gestao-fiscal)
└── previdencia/
    ├── routes.ts             PAGINAS_PREVIDENCIA (+ filtro de UG por página)
    ├── layout.tsx            carrega as UGs de RPPS e monta o seletor de UG (não editar)
    ├── [subpagina]/[[...unidadeGestora]]/page.tsx   fallback (não editar)
    └── <slug>/[[...unidadeGestora]]/page.tsx        só o conteúdo
```

O Estado tem também `previdencia-militares/` (mesma estrutura, UG fixa `500E2900001`) e não tem `rankings`/`iegm`/`mais-informacoes`.

### Registro de páginas (`routes.ts`)

Cada seção declara **todas** as páginas do site oficial, na ordem do menu, como `Pagina` (`src/shared/paginas.ts`):

```ts
{ slug: "endividamento", titulo: "Endividamento", implementado: false, anos: gerarAnos(2020) }
```

- `implementado: false` oculta o item na sidebar e nos breadcrumbs. A URL redireciona para a primeira página implementada da seção (fallback `[subpagina]`), então links antigos ou da home não dão 404.
- `anos` vem da configuração do site oficial e alimenta o seletor de ano da página. Sem `anos`, o seletor usa `municipioState`/`estadoState`.
- `tituloCompleto` é usado no tooltip da sidebar e no breadcrumb principal.
- A sidebar (`SidebarMenu`) e os breadcrumbs (`BreadcrumbMenu`, `BreadcrumbPaginas`) são gerados desses arrays. Ninguém mais precisa editar `BarraLateral*.tsx`, `Breadcrumb*.tsx`, `menu*.tsx` nem `[pagina]/page.tsx`.

### Rotas

- Slugs em kebab-case. O nome do site oficial fica no comentário quando for diferente: `metasArrecadacao` → `meta-arrecadacao`, `despesasReceitas` → `despesas-correntes-x-receitas-correntes`, `destinoDinheiro` → `destino-do-dinheiro`, `programasAcoes` → `programas-e-acoes`, `ranking` → `rankings`, `fiscalizacao` → `fiscalizacoes`, `informacao` → `mais-informacoes`, `contribuicaoPrevidenciaria` → `contribuicoes-previdenciarias`.
- **Previdência**: `/<ente>/previdencia/<slug>/<codigoUG>`, mesma ordem do site oficial. Exemplos: `/municipio/2024/vitoria/previdencia/receitas/077E0800001` e `/estado/2024/previdencia-militares/segurados/500E2900001`. Pasta: `previdencia/<slug>/[[...unidadeGestora]]/page.tsx`. As UGs de RPPS seguem a regra do site oficial: código `xxxE08*` é o instituto (IPAM/IPAJM) e `xxxE09*` são os fundos financeiro e previdenciário. A lista vem de `public/data/unidades-gestoras.json`, via `getUnidadesGestorasPrevidencia(codigoEsfera)`.
- **planejamento-governamental**: não existe no site oficial.
  - Município: removido. O menu agora é `plano-plurianual`, `diretrizes-orcamentarias`, `programas-e-acoes`, … e o slug antigo redireciona pelo fallback.
  - Estado: o site oficial não tem `plano-plurianual` nem `planejamento-governamental`. Os dois stubs foram removidos.

## Como criar uma página

1. Crie `<secao>/<slug>/page.tsx`, ou `previdencia/<slug>/[[...unidadeGestora]]/page.tsx`, retornando **só o conteúdo**: o `layout.tsx` da seção já põe o `DashboardLayout`, a sidebar, o breadcrumb e o botão IPCA.
2. No `routes.ts` da seção, troque `implementado: false` para `true`. Ajuste `anos` se precisar.
3. Pronto: o item aparece na sidebar e nos breadcrumbs.

Exemplo (é a página de referência, `gestao-fiscal/receita-corrente-liquida/page.tsx`):

```tsx
export default async function Page({ params }: { params: Promise<MunicipioPageProps> }) {
  const { ano, municipio } = await params;
  const esfera = await getEsferaMunicipio(municipio);
  if (!esfera) notFound();
  return <ReceitaCorrenteLiquida esfera={esfera} anoExercicio={Number(ano)} />;
}
// Estado: <ReceitaCorrenteLiquida esfera={ESFERA_ESTADO} anoExercicio={Number(ano)} />
```

Na previdência, valide a UG no topo da página:

```tsx
const { ano, municipio, unidadeGestora } = await params;   // unidadeGestora?: string[]
const esfera = await getEsferaMunicipio(municipio);          // estado: ESFERA_ESTADO
const ugs = await getUnidadesGestorasPrevidencia(esfera.codigo); // militares: getUnidadesGestorasPrevidenciaMilitares()
const ug = getUnidadeGestoraDaPagina({
  pagina: getPaginaPorSlug(PAGINAS_PREVIDENCIA, "receitas"),
  unidadesGestoras: ugs, unidadeGestora,
  urlPagina: `${getUrlBaseMunicipio(ano, municipio)}/previdencia/receitas`,
}); // redireciona para a 1ª UG válida; null = ente sem RPPS (mostrar aviso)
```

## Município x Estado: API e componentes compartilhados

O site oficial usa os **mesmos métodos** para os dois entes e muda só o controller e o id:

| | controller | `idEsferaAdministrativa` |
|---|---|---|
| Município | `MunicipioControllers/<Recurso>/<Metodo>` | código do município como número (Vitória `"077"` → 77) |
| Estado | `EstadoControllers/<Recurso>/<Metodo>` | `81` (código `"500"`) |

Algumas chamadas do Estado exigem parâmetros extras. Exemplo: `PessoalConsolidado/*RCLAjustadaPessoal` precisa de `tipoModulo=503`, senão responde vazio.

`src/shared/esfera.ts`:
- `Esfera` (`tipo`, `idEsferaAdministrativa`, `codigo`, `nome`), `ESFERA_ESTADO`, `getEsferaMunicipio(nomeNormalizado)`.
- `EsferaProps = { esfera, anoExercicio, style? }`: **interface de todo componente compartilhado**.
- `getDadosApiEsfera<T>(esfera, anoExercicio, "Recurso/Metodo", extras?)`: monta a URL com `idEsferaAdministrativa`, `anoExercicio` e `v`, usa fetch em `cache()` e devolve `null` quando há erro.

### Onde ficam os componentes

| O quê | Onde |
|---|---|
| Página/bloco igual para município e estado | `src/components/<secao>/<slug>/` (ex.: `src/components/gestao-fiscal/receita-corrente-liquida/ReceitaCorrenteLiquida.tsx`). Server Component `async` que recebe `EsferaProps` |
| Algo só de um ente | `<secao>/<slug>/_components/` dentro da rota |
| Gráficos genéricos | `src/components/charts/`: `SingleSeriesChart` (formato `{ano,nome,valor}[]`), `MultiSeriesChart` (formato `{labels, series:[{name, values}]}`), `GaugeChart`, `DoughnutChart`, `EChart`. Os dois primeiros já aplicam o IPCA (`useCorrecaoIpca`) |
| Cards | `PanelWithDescription` (título + tooltip "i"), `SectionTitle`, `MoneyValue` (valor "R$ 3,06B" com o valor completo no `title`) |
| Previdência | `src/components/previdencia/` (`BreadcrumbUnidadeGestora` já existe) |
| Tipos | `src/types/Serie.ts` (`SerieItem`, `MultiSerie`, `FormatoValor`) |

**Regra para paralelismo.** A issue de **município** é dona de `src/components/<secao>/<slug>/` para as páginas que existem nos dois entes. Por isso o componente deve ser escrito sem depender do ente: recebe `EsferaProps` e chama a API por `getDadosApiEsfera`. As issues de **estado** (#14, #15) rodam ao mesmo tempo e não podem importar o que #10/#11/#12 ainda vão criar. Elas põem os próprios componentes em `src/app/estado/[ano]/<secao>/<slug>/_components/` e reaproveitam só o que já existe nesta branch. A troca pelo componente compartilhado fica para um PR posterior ao merge.

**Não editar** (são compartilhados; uma mudança aqui gera conflito entre as issues):
- `src/shared/{paginas,paginasRedirect,esfera,previdencia,previdenciaServer}.ts`
- `src/components/{charts,panel,values,breadcrumb,sidebar}/*`
- `src/formatters/number.ts`
- `layout.tsx`, `menu*.tsx`, `BarraLateral*.tsx` e `Breadcrumb*.tsx` das seções

Se precisar de um helper novo, crie um arquivo novo dentro da sua pasta.

## O que cada issue edita

| Issue | Cria | Edita |
|---|---|---|
| #9 stubs | Conteúdo de município `(root)/obrigacao-de-envio`, `(root)/prestacao-conta`, `gestao-fiscal/meta-arrecadacao`, `gestao-orcamentaria/plano-plurianual`; de Estado `(root)/obrigacao-de-envio`, `(root)/prestacao-conta`, `gestao-fiscal/meta-arrecadacao`. Compartilhado (opcional): `src/components/gestao-fiscal/meta-arrecadacao/` | só esses `page.tsx` (+ `_components/` deles). **RCL já feita aqui (município e Estado).** Os stubs de Estado `planejamento-governamental`/`plano-plurianual` foram removidos e não têm equivalente oficial. `planejamento-governamental` do município foi removido (ver #10) |
| #10 município gestão orçamentária | `gestao-orcamentaria/{diretrizes-orcamentarias,programas-e-acoes,receitas,despesas,destino-do-dinheiro,resultado-orcamentario}/`, `src/components/gestao-orcamentaria/<slug>/` | `municipio/.../gestao-orcamentaria/routes.ts`; `src/app/(home)/_components/widgets/DestinoDinheiroWidget.tsx` (href `destino-dinheiro` → `destino-do-dinheiro`) |
| #11 município gestão fiscal | `gestao-fiscal/{capag,indice-vulnerabilidade-fiscal,despesas-correntes-x-receitas-correntes,endividamento,superavit-deficit,pessoal,saude,educacao,educacao-fundeb,alertas-lrf}/`, `src/components/gestao-fiscal/<slug>/` | `municipio/.../gestao-fiscal/routes.ts`; links dos widgets em `municipio/.../(root)/visao-geral/_components/widgets/*` |
| #12 município previdência | `previdencia/<slug>/[[...unidadeGestora]]/` (9 páginas), `src/components/previdencia/<slug>/` | `municipio/.../previdencia/routes.ts` (flags e filtros de UG); `src/app/(home)/_components/widgets/PrevidenciaWidget.tsx` (href `previdencia/receita` → `previdencia/receitas`) |
| #13 município raiz | `(root)/{rankings,fiscalizacoes,iegm,mais-informacoes}/` | `municipio/.../(root)/routes.ts` |
| #14 estado orçamentária + fiscal | `estado/[ano]/gestao-orcamentaria/<slug>/` (4), `estado/[ano]/gestao-fiscal/<slug>/` (9), componentes em `_components/` da rota | `estado/[ano]/gestao-orcamentaria/routes.ts`, `estado/[ano]/gestao-fiscal/routes.ts` |
| #15 estado previdência + raiz | `estado/[ano]/previdencia/<slug>/[[...unidadeGestora]]/` (6), `estado/[ano]/previdencia-militares/<slug>/[[...unidadeGestora]]/` (5), `estado/[ano]/(root)/{fiscalizacoes,iege}/` | `estado/[ano]/previdencia/routes.ts`, `estado/[ano]/previdencia-militares/routes.ts`, `estado/[ano]/(root)/routes.ts` |

## Pendências conhecidas (fora do escopo de #8)

- Os widgets da visão geral do Estado chamam `MunicipioControllers/*?idEsferaAdministrativa=001`. Pelo site oficial, o certo seria `EstadoControllers/*` com id 81.
- `municipioState`/`estadoState` têm anos defasados (até 2023). As páginas novas usam o `anos` do `routes.ts`.
- Os redirects das rotas fallback são enviados por streaming: a resposta é 200 com `meta refresh` e `NEXT_REDIRECT`, porque o layout já começou a renderizar. É o mesmo comportamento do `[pagina]` existente.
