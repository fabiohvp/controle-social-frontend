/**
 * Registro central de painéis: fonte do índice da busca "Pesquisar" do header
 * (`src/components/search/SearchDialog.tsx`).
 *
 * ## Como adicionar um painel
 *
 * Acrescente um objeto `Painel` no array da seção correspondente (abaixo).
 * Cada seção tem o seu próprio array para que issues em paralelo editem
 * trechos diferentes do arquivo. Para uma seção nova, crie um array
 * `PAINEIS_<SECAO>` e inclua-o em `PAINEIS`, no fim do arquivo.
 *
 * ```ts
 * {
 *   titulo: "Receita corrente líquida",     // texto exibido e pesquisado
 *   secao: SECAO.municipio,                 // agrupa e desambigua títulos iguais
 *   href: "/municipio/{ano}/{municipio}/gestao-fiscal/receita-corrente-liquida",
 *   ano: "municipio",                       // chave de globalState.anos usada em {ano}
 *   palavrasChave: ["rcl"],                 // sinônimos/siglas (opcional)
 * }
 * ```
 *
 * Placeholders aceitos no `href` (resolvidos por `getHrefPainel`):
 * - `{ano}`: ano da rota atual, se estiver entre `anoInicio` e `anoAtual` da
 *   chave `ano` em `globalState.anos`; caso contrário, o `anoAtual` dessa chave.
 *   Sem `ano`, usa `"municipio"`.
 * - `{municipio}`: `nomeNormalizado` do município da rota atual; fora de uma
 *   rota de município, o município padrão (`globalState.municipio`, Vitória).
 *
 * Painéis com ano fixo (ex.: fiscalizações) usam o ano literal no `href`.
 *
 * Regras:
 * - Só registre rotas que existem e renderizam conteúdo (nada de 404 nem de
 *   página `//TODO: implementar pagina`).
 * - `titulo` segue o rótulo usado na sidebar/breadcrumb da própria página.
 * - Não é preciso repetir no `titulo` ou em `palavrasChave` o que já está em
 *   `secao`: a busca considera título, seção e palavras-chave, sem acentos.
 * - Municípios não entram aqui: são gerados de `globalState.municipios` por
 *   `getPaineisMunicipios`.
 */
import { normalize } from "@/formatters/string";
import { GlobalState } from "@/shared/globalState";
import { EsferaAdministrativa } from "@/types/EsferaAdministrativa";

export type AnoPainel = keyof GlobalState["anos"];

export type Painel = {
  /** Ano usado no placeholder `{ano}`. Padrão: `"municipio"`. */
  ano?: AnoPainel;
  /** Rota interna, com placeholders `{ano}` e `{municipio}` opcionais. */
  href: string;
  palavrasChave?: string[];
  secao: string;
  titulo: string;
};

export type ContextoPainel = {
  /** `params.ano` da rota atual, se houver. */
  ano?: string;
  globalState: GlobalState;
  /** `params.municipio` da rota atual, se houver. */
  municipio?: string;
};

export const SECAO = {
  areaTematica: "Áreas temáticas",
  boletins: "Boletins e informativos",
  estado: "Estado",
  fiscalizacao: "Fiscalizações",
  indicadoresConsolidados: "Indicadores consolidados",
  informacoes: "Mais informações",
  municipio: "Município",
  obrigacoes: "Obrigações",
  pessoal: "Pessoal",
  prestacaoDeConta: "Prestações de contas",
  rankings: "Rankings",
} as const;

// ---------------------------------------------------------------------------
// Município
// ---------------------------------------------------------------------------
export const PAINEIS_MUNICIPIO: Painel[] = [
  {
    titulo: "Visão geral",
    secao: SECAO.municipio,
    href: "/municipio/{ano}/{municipio}/visao-geral",
    ano: "municipio",
  },
  {
    titulo: "Obrigações junto ao TCE-ES",
    secao: SECAO.municipio,
    href: "/municipio/{ano}/{municipio}/obrigacao-de-envio",
    ano: "municipio",
    palavrasChave: ["remessas", "envio"],
  },
  {
    titulo: "Planejamento governamental",
    secao: SECAO.municipio,
    href: "/municipio/{ano}/{municipio}/gestao-orcamentaria/planejamento-governamental",
    ano: "municipio",
    palavrasChave: ["gestão orçamentária"],
  },
  {
    titulo: "Plano plurianual",
    secao: SECAO.municipio,
    href: "/municipio/{ano}/{municipio}/gestao-orcamentaria/plano-plurianual",
    ano: "municipio",
    palavrasChave: ["ppa", "gestão orçamentária"],
  },
  {
    titulo: "Metas de arrecadação",
    secao: SECAO.municipio,
    href: "/municipio/{ano}/{municipio}/gestao-fiscal/meta-arrecadacao",
    ano: "municipio",
    palavrasChave: ["gestão fiscal", "receita"],
  },
  {
    titulo: "Receita corrente líquida",
    secao: SECAO.municipio,
    href: "/municipio/{ano}/{municipio}/gestao-fiscal/receita-corrente-liquida",
    ano: "municipio",
    palavrasChave: ["rcl", "gestão fiscal"],
  },
  {
    titulo: "Prestações de contas",
    secao: SECAO.municipio,
    href: "/municipio/{ano}/{municipio}/prestacao-conta",
    ano: "municipio",
  },
  {
    titulo: "Comparação de municípios",
    secao: SECAO.municipio,
    href: "/municipio/{ano}/comparador",
    ano: "municipio",
    palavrasChave: ["comparador"],
  },
];

// ---------------------------------------------------------------------------
// Estado
// ---------------------------------------------------------------------------
export const PAINEIS_ESTADO: Painel[] = [
  {
    titulo: "Visão geral",
    secao: SECAO.estado,
    href: "/estado/{ano}/visao-geral",
    ano: "estado",
    palavrasChave: ["macrogestão governamental"],
  },
  {
    titulo: "Obrigações junto ao TCE-ES",
    secao: SECAO.estado,
    href: "/estado/{ano}/obrigacao-de-envio",
    ano: "estado",
    palavrasChave: ["remessas", "envio"],
  },
  {
    titulo: "Planejamento governamental",
    secao: SECAO.estado,
    href: "/estado/{ano}/gestao-orcamentaria/planejamento-governamental",
    ano: "estado",
    palavrasChave: ["gestão orçamentária"],
  },
  {
    titulo: "Plano plurianual",
    secao: SECAO.estado,
    href: "/estado/{ano}/gestao-orcamentaria/plano-plurianual",
    ano: "estado",
    palavrasChave: ["ppa", "gestão orçamentária"],
  },
  {
    titulo: "Metas de arrecadação",
    secao: SECAO.estado,
    href: "/estado/{ano}/gestao-fiscal/meta-arrecadacao",
    ano: "estado",
    palavrasChave: ["gestão fiscal", "receita"],
  },
  {
    titulo: "Receita corrente líquida",
    secao: SECAO.estado,
    href: "/estado/{ano}/gestao-fiscal/receita-corrente-liquida",
    ano: "estado",
    palavrasChave: ["rcl", "gestão fiscal"],
  },
  {
    titulo: "Prestações de contas",
    secao: SECAO.estado,
    href: "/estado/{ano}/prestacao-conta",
    ano: "estado",
  },
];

// ---------------------------------------------------------------------------
// Obrigações
// ---------------------------------------------------------------------------
export const PAINEIS_OBRIGACOES: Painel[] = [
  {
    titulo: "Obrigações dos municípios",
    secao: SECAO.obrigacoes,
    href: "/obrigacao-de-envio/{ano}/municipios",
    ano: "obrigacaoEnvio",
    palavrasChave: ["remessas", "envio"],
  },
  {
    titulo: "Obrigações do Estado",
    secao: SECAO.obrigacoes,
    href: "/obrigacao-de-envio/{ano}/estado",
    ano: "obrigacaoEnvio",
    palavrasChave: ["remessas", "envio"],
  },
];

// ---------------------------------------------------------------------------
// Prestações de contas
// ---------------------------------------------------------------------------
export const PAINEIS_PRESTACAO_DE_CONTA: Painel[] = [
  {
    titulo: "Processos dos municípios",
    secao: SECAO.prestacaoDeConta,
    href: "/prestacao-de-conta/{ano}/municipios/governo/07",
    ano: "prestacaoDeConta",
    palavrasChave: ["contas anuais", "governo", "gestão"],
  },
  {
    titulo: "Processos do Estado",
    secao: SECAO.prestacaoDeConta,
    href: "/prestacao-de-conta/{ano}/estado/governo/10",
    ano: "prestacaoDeConta",
    palavrasChave: ["contas anuais", "governo", "gestão"],
  },
  {
    titulo: "Monitoramentos",
    secao: SECAO.prestacaoDeConta,
    href: "/prestacao-de-conta/{ano}/municipios/monitoramento/todos",
    ano: "prestacaoDeConta",
    palavrasChave: ["deliberações"],
  },
  {
    titulo: "Parecer prévio",
    secao: SECAO.prestacaoDeConta,
    href: "/prestacao-de-conta/{ano}/parecer-previo",
    ano: "prestacaoDeConta",
    palavrasChave: ["contas anuais"],
  },
  {
    titulo: "Julgamento de contas - visão geral",
    secao: SECAO.prestacaoDeConta,
    href: "/prestacao-de-conta/{ano}/julgamento-de-conta/visao-geral",
    ano: "prestacaoDeConta",
    palavrasChave: ["câmara"],
  },
  {
    titulo: "Julgamento de contas - município",
    secao: SECAO.prestacaoDeConta,
    href: "/prestacao-de-conta/{ano}/julgamento-de-conta/{municipio}",
    ano: "prestacaoDeConta",
    palavrasChave: ["câmara"],
  },
  {
    titulo: "Julgamento de contas - sessão",
    secao: SECAO.prestacaoDeConta,
    href: "/prestacao-de-conta/{ano}/julgamento-de-conta/{municipio}/sessao",
    ano: "prestacaoDeConta",
    palavrasChave: ["câmara"],
  },
];

// ---------------------------------------------------------------------------
// Fiscalizações (ano fixo: o ano em que a fiscalização foi realizada)
// ---------------------------------------------------------------------------
export const PAINEIS_FISCALIZACAO: Painel[] = [
  {
    titulo: "Ações sobre a pandemia",
    secao: SECAO.fiscalizacao,
    href: "/fiscalizacao/2020/saude/acoes-pandemia",
    palavrasChave: ["covid", "saúde"],
  },
  {
    titulo: "Câncer de colo de útero",
    secao: SECAO.fiscalizacao,
    href: "/fiscalizacao/2022/saude/cancer-colo-de-utero",
    palavrasChave: ["saúde"],
  },
  {
    titulo: "Doenças crônicas não transmissíveis",
    secao: SECAO.fiscalizacao,
    href: "/fiscalizacao/2021/saude/doencas-cronicas-nao-transmissiveis",
    palavrasChave: ["dcnt", "saúde"],
  },
  {
    titulo: "Mamografias de rastreamento",
    secao: SECAO.fiscalizacao,
    href: "/fiscalizacao/2021/saude/mamografia-de-rastreamento",
    palavrasChave: ["câncer de mama", "saúde"],
  },
  {
    titulo: "Controle interno dos municípios - prefeituras",
    secao: SECAO.fiscalizacao,
    href: "/fiscalizacao/2020/controle-interno/prefeituras",
  },
  {
    titulo: "Controle interno dos municípios - câmaras",
    secao: SECAO.fiscalizacao,
    href: "/fiscalizacao/2020/controle-interno/camaras",
  },
  {
    titulo: "Desigualdade educacional - manifestação técnica",
    secao: SECAO.fiscalizacao,
    href: "/fiscalizacao/2020/educacao/desigualdade-educacional/manifestacao-tecnica",
    palavrasChave: ["educação"],
  },
  {
    titulo: "Desigualdade educacional - relatório",
    secao: SECAO.fiscalizacao,
    href: "/fiscalizacao/2020/educacao/desigualdade-educacional/relatorio",
    palavrasChave: ["educação"],
  },
  {
    titulo: "Educação - oferta x demanda - distribuição das escolas",
    secao: SECAO.fiscalizacao,
    href: "/fiscalizacao/2019/educacao/oferta-x-demanda/escolas",
    palavrasChave: ["levantamento"],
  },
  {
    titulo: "Educação - oferta x demanda - distribuição das matrículas",
    secao: SECAO.fiscalizacao,
    href: "/fiscalizacao/2019/educacao/oferta-x-demanda/matriculas",
    palavrasChave: ["levantamento"],
  },
  {
    titulo: "Educação - oferta x demanda - geolocalização das escolas",
    secao: SECAO.fiscalizacao,
    href: "/fiscalizacao/2019/educacao/oferta-x-demanda/geolocalizacao",
    palavrasChave: ["levantamento", "mapa"],
  },
  {
    titulo: "Educação - oferta x demanda - indicadores de desempenho",
    secao: SECAO.fiscalizacao,
    href: "/fiscalizacao/2019/educacao/oferta-x-demanda/desempenho",
    palavrasChave: ["levantamento"],
  },
  {
    titulo: "Educação - oferta x demanda - índice da educação básica por municípios",
    secao: SECAO.fiscalizacao,
    href: "/fiscalizacao/2019/educacao/oferta-x-demanda/ideb",
    palavrasChave: ["levantamento", "ideb"],
  },
  {
    titulo: "Educação - oferta x demanda - percentual de ocupação",
    secao: SECAO.fiscalizacao,
    href: "/fiscalizacao/2019/educacao/oferta-x-demanda/ocupacao",
    palavrasChave: ["levantamento"],
  },
  {
    titulo: "Educação - oferta x demanda - sistema informatizado de gestão",
    secao: SECAO.fiscalizacao,
    href: "/fiscalizacao/2019/educacao/oferta-x-demanda/sistema-informatizado",
    palavrasChave: ["levantamento"],
  },
  {
    titulo: "Educação - oferta x demanda - relatório",
    secao: SECAO.fiscalizacao,
    href: "/fiscalizacao/2019/educacao/oferta-x-demanda/relatorio",
    palavrasChave: ["levantamento"],
  },
  {
    titulo: "Portais de transparência - Estado",
    secao: SECAO.fiscalizacao,
    href: "/fiscalizacao/2020/portal-transparencia/estado",
  },
  {
    titulo: "Portais de transparência - prefeituras",
    secao: SECAO.fiscalizacao,
    href: "/fiscalizacao/2020/portal-transparencia/prefeituras",
  },
  {
    titulo: "Portais de transparência - câmaras",
    secao: SECAO.fiscalizacao,
    href: "/fiscalizacao/2020/portal-transparencia/camaras",
  },
  {
    titulo: "Receita pública municipal",
    secao: SECAO.fiscalizacao,
    href: "/fiscalizacao/receita-municipal",
  },
  {
    titulo: "Transparência passiva - Estado",
    secao: SECAO.fiscalizacao,
    href: "/fiscalizacao/2018/transparencia-passiva/estado",
    palavrasChave: ["lai", "acesso à informação"],
  },
  {
    titulo: "Transparência passiva - prefeituras",
    secao: SECAO.fiscalizacao,
    href: "/fiscalizacao/2018/transparencia-passiva/prefeituras",
    palavrasChave: ["lai", "acesso à informação"],
  },
  {
    titulo: "Transparência passiva - câmaras",
    secao: SECAO.fiscalizacao,
    href: "/fiscalizacao/2018/transparencia-passiva/camaras",
    palavrasChave: ["lai", "acesso à informação"],
  },
];

// ---------------------------------------------------------------------------
// Áreas temáticas
// ---------------------------------------------------------------------------
export const PAINEIS_AREA_TEMATICA: Painel[] = [
  {
    titulo: "Assistência social - capacidade de referenciamento",
    secao: SECAO.areaTematica,
    href: "/area-tematica/assistencia-social/referenciamento",
    palavrasChave: ["cras"],
  },
  {
    titulo: "Assistência social - espaço físico e equipamentos",
    secao: SECAO.areaTematica,
    href: "/area-tematica/assistencia-social/espaco-fisico",
    palavrasChave: ["cras"],
  },
  {
    titulo: "Assistência social - serviços e atendimento",
    secao: SECAO.areaTematica,
    href: "/area-tematica/assistencia-social/servicos",
    palavrasChave: ["cras"],
  },
  {
    titulo: "Assistência social - recursos humanos",
    secao: SECAO.areaTematica,
    href: "/area-tematica/assistencia-social/recursos-humano",
    palavrasChave: ["cras"],
  },
  {
    titulo: "Concessões comuns e PPP - visão geral",
    secao: SECAO.areaTematica,
    href: "/area-tematica/concessao-publica/visao-geral",
    palavrasChave: ["desestatizações", "parceria público-privada"],
  },
  {
    titulo: "Concessões comuns e PPP - despesas com PPP",
    secao: SECAO.areaTematica,
    href: "/area-tematica/concessao-publica/despesas-ppp",
    palavrasChave: ["desestatizações", "parceria público-privada"],
  },
  {
    titulo: "Educação - visão geral",
    secao: SECAO.areaTematica,
    href: "/area-tematica/educacao/visao-geral",
  },
  {
    titulo: "Educação - escolas",
    secao: SECAO.areaTematica,
    href: "/area-tematica/educacao/escolas",
  },
  {
    titulo: "Educação - profissionais",
    secao: SECAO.areaTematica,
    href: "/area-tematica/educacao/profissionais",
    palavrasChave: ["professores"],
  },
  {
    titulo: "Educação - inativos",
    secao: SECAO.areaTematica,
    href: "/area-tematica/educacao/inativos",
    palavrasChave: ["aposentados"],
  },
  {
    titulo: "Estrutura administrativa",
    secao: SECAO.areaTematica,
    href: "/area-tematica/estrutura-administrativa",
    palavrasChave: ["cargos", "empregos"],
  },
  {
    titulo: "Saúde - estabelecimentos de saúde",
    secao: SECAO.areaTematica,
    href: "/area-tematica/saude/estabelecimentos",
  },
  {
    titulo: "Saúde - distribuição de equipamentos",
    secao: SECAO.areaTematica,
    href: "/area-tematica/saude/distribuicao-de-equipamentos",
  },
  {
    titulo: "Saúde - distribuição de leitos",
    secao: SECAO.areaTematica,
    href: "/area-tematica/saude/distribuicao-de-leitos",
  },
  {
    titulo: "Saúde - gastos com a função saúde",
    secao: SECAO.areaTematica,
    href: "/area-tematica/saude/gastos-com-saude",
  },
  {
    titulo: "Saúde - população com plano de saúde",
    secao: SECAO.areaTematica,
    href: "/area-tematica/saude/acesso-a-saude",
  },
  {
    titulo: "Obras públicas",
    secao: SECAO.areaTematica,
    href: "/obras",
    palavrasChave: ["geo-obras", "inteligência artificial"],
  },
  {
    titulo: "Projeções de gastos com pessoal",
    secao: SECAO.areaTematica,
    href: "/projecao",
    palavrasChave: ["inteligência artificial"],
  },
];

// ---------------------------------------------------------------------------
// Pessoal (folha de pagamento)
// ---------------------------------------------------------------------------
export const PAINEIS_PESSOAL: Painel[] = [
  {
    titulo: "Folha de pagamento - visão geral",
    secao: SECAO.pessoal,
    href: "/folha-de-pagamento/todos/{ano}/1/visao-geral",
    ano: "folhaDePagamento",
    palavrasChave: ["servidores", "salários"],
  },
  {
    titulo: "Folha de pagamento - ativos",
    secao: SECAO.pessoal,
    href: "/folha-de-pagamento/todos/{ano}/1/ativos",
    ano: "folhaDePagamento",
    palavrasChave: ["servidores", "salários"],
  },
  {
    titulo: "Folha de pagamento - beneficiários",
    secao: SECAO.pessoal,
    href: "/folha-de-pagamento/todos/{ano}/1/beneficiarios",
    ano: "folhaDePagamento",
    palavrasChave: ["aposentados", "pensionistas"],
  },
  {
    titulo: "Folha de pagamento - estagiários",
    secao: SECAO.pessoal,
    href: "/folha-de-pagamento/todos/{ano}/1/estagiarios",
    ano: "folhaDePagamento",
  },
  {
    titulo: "Contratações e demissões",
    secao: SECAO.pessoal,
    href: "/folha-de-pagamento/todos/{ano}/contratacoes-e-demissoes",
    ano: "folhaDePagamento",
    palavrasChave: ["ingressos", "desligamentos"],
  },
  {
    titulo: "Consulta de vínculo",
    secao: SECAO.pessoal,
    href: "/folha-de-pagamento/consulta-vinculo",
    palavrasChave: ["servidor", "cpf"],
  },
];

// ---------------------------------------------------------------------------
// Boletins e informativos
// ---------------------------------------------------------------------------
export const PAINEIS_BOLETINS: Painel[] = [
  {
    titulo: "Boletim de macrogestão",
    secao: SECAO.boletins,
    href: "/boletins/{ano}",
    ano: "boletins",
    palavrasChave: ["boletim mensal"],
  },
  {
    titulo: "Boletim extraordinário",
    secao: SECAO.boletins,
    href: "/boletins/{ano}/extraordinario",
    ano: "boletins",
  },
  {
    titulo: "Informativos",
    secao: SECAO.boletins,
    href: "/boletins/{ano}/informativo",
    ano: "boletins",
  },
];

// ---------------------------------------------------------------------------
// Rankings (preencher junto com a implementação das páginas)
// ---------------------------------------------------------------------------
export const PAINEIS_RANKINGS: Painel[] = [];

// ---------------------------------------------------------------------------
// Indicadores consolidados (preencher junto com a implementação das páginas)
// ---------------------------------------------------------------------------
export const PAINEIS_INDICADORES_CONSOLIDADOS: Painel[] = [];

// ---------------------------------------------------------------------------
// Mais informações
// ---------------------------------------------------------------------------
export const PAINEIS_INFORMACOES: Painel[] = [
  {
    titulo: "Dados abertos",
    secao: SECAO.informacoes,
    href: "/wiki/dados-abertos",
    palavrasChave: ["api", "download"],
  },
  {
    titulo: "Novidades",
    secao: SECAO.informacoes,
    href: "/wiki/novidades",
  },
  {
    titulo: "Sobre",
    secao: SECAO.informacoes,
    href: "/wiki/sobre",
  },
];

export const PAINEIS: Painel[] = [
  ...PAINEIS_MUNICIPIO,
  ...PAINEIS_ESTADO,
  ...PAINEIS_OBRIGACOES,
  ...PAINEIS_PRESTACAO_DE_CONTA,
  ...PAINEIS_FISCALIZACAO,
  ...PAINEIS_AREA_TEMATICA,
  ...PAINEIS_PESSOAL,
  ...PAINEIS_BOLETINS,
  ...PAINEIS_RANKINGS,
  ...PAINEIS_INDICADORES_CONSOLIDADOS,
  ...PAINEIS_INFORMACOES,
];

/** Um painel por município, apontando para a visão geral no ano atual. */
export function getPaineisMunicipios(
  municipios: EsferaAdministrativa[],
  globalState: GlobalState
): Painel[] {
  const ano = globalState.anos.municipio.anoAtual;

  return municipios.map((municipio) => ({
    titulo: municipio.nome,
    secao: "Municípios",
    href: `/municipio/${ano}/${municipio.nomeNormalizado}/visao-geral`,
  }));
}

export function getHrefPainel(
  painel: Painel,
  { ano, globalState, municipio }: ContextoPainel
) {
  return painel.href
    .replaceAll("{ano}", getAnoPainel(painel.ano ?? "municipio", globalState, ano))
    .replaceAll("{municipio}", getMunicipioPainel(globalState, municipio));
}

function getAnoPainel(
  anoPainel: AnoPainel,
  globalState: GlobalState,
  anoRota?: string
) {
  const { anoAtual, anoInicio } = globalState.anos[anoPainel];
  const ano = Number(anoRota);

  if (Number.isInteger(ano) && ano >= anoInicio && ano <= anoAtual) {
    return ano.toString();
  }
  return anoAtual.toString();
}

function getMunicipioPainel(globalState: GlobalState, municipioRota?: string) {
  const existe = globalState.municipios.some(
    (municipio) => municipio.nomeNormalizado === municipioRota
  );
  return existe ? municipioRota! : globalState.municipio.nomeNormalizado;
}

/** Texto pesquisável do painel: título, seção e palavras-chave sem acentos. */
export function getTextoPesquisaPainel(painel: Painel) {
  return normalizePesquisa(
    [painel.titulo, painel.secao, ...(painel.palavrasChave ?? [])].join(" ")
  );
}

export function normalizePesquisa(texto: string) {
  return normalize(texto, { toLowerCase: true, replaceSpaceWithHyphen: false })
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Filtra e ordena os painéis: todos os termos da busca precisam aparecer.
 * Título que começa com a busca vem primeiro, depois título que contém a busca,
 * depois o restante, mantendo a ordem do registro em cada grupo.
 */
export function pesquisarPaineis(paineis: Painel[], busca: string) {
  const termos = normalizePesquisa(busca).split(" ").filter(Boolean);

  if (termos.length === 0) {
    return [];
  }
  const buscaNormalizada = termos.join(" ");

  return paineis
    .map((painel, index) => {
      const texto = getTextoPesquisaPainel(painel);

      if (!termos.every((termo) => texto.includes(termo))) {
        return null;
      }
      const titulo = normalizePesquisa(painel.titulo);
      const peso = titulo.startsWith(buscaNormalizada)
        ? 0
        : titulo.includes(buscaNormalizada)
          ? 1
          : 2;
      return { index, painel, peso };
    })
    .filter((resultado) => resultado !== null)
    .sort((a, b) => a.peso - b.peso || a.index - b.index)
    .map((resultado) => resultado.painel);
}
