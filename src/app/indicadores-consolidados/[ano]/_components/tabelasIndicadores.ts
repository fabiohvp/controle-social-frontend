import { fetchJson } from "@/shared/api";
import { ENV } from "@/shared/env";
import { getMunicipios } from "@/shared/municipio";
import { COLOR } from "@/theme/colors";
import {
  CelulaIndicador,
  ColunaIndicador,
  IconeIndicador,
  LinhaIndicador,
  TabelaIndicadorDados,
} from "./tabelaTipos";

/*
 * Tabelas de Indicadores Consolidados, equivalentes às de
 * paineldecontrole.tcees.tc.br/indicadoresConsolidados/:ano/:aba
 * (mesmos endpoints, colunas e regras de cálculo).
 */

const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const MESES_COMPLETOS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const COR = {
  ok: COLOR.padraoNivel6,
  verde: COLOR.positivo,
  vermelho: COLOR["em-atraso"],
  alerta: COLOR.alerta,
};

const api = <T,>(rota: string) => fetchJson<T>(`${ENV.apiUrl}/${rota}`);

type Municipio = { id: number; nome: string; nomeNormalizado: string };

async function listarMunicipios(): Promise<Municipio[]> {
  const municipios = await getMunicipios();
  return municipios
    .map((m) => ({ id: Number(m.codigo), nome: m.nome, nomeNormalizado: m.nomeNormalizado }))
    .filter((m) => m.id >= 1 && m.id <= 78)
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
}

const porId = <T extends { idEsferaAdministrativa: number }>(itens: T[] | null | undefined) =>
  new Map((itens ?? []).map((i) => [i.idEsferaAdministrativa, i]));

const normalizarNome = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
const porNome = <T,>(itens: T[] | null | undefined, nome: (i: T) => string) =>
  new Map((itens ?? []).map((i) => [normalizarNome(nome(i)), i]));

const reais = (v: number | null | undefined) =>
  v === null || v === undefined
    ? undefined
    : `R$${v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const moeda = (v: number | null | undefined): CelulaIndicador => ({ v: v ?? null, titulo: reais(v) });
const mes = (m: number | null | undefined): CelulaIndicador => ({
  v: m ? MESES[m - 1] : null,
  titulo: m ? `Último mês de envio: ${MESES_COMPLETOS[m - 1]}` : undefined,
});

/** 👍 quando cumpre o limite (mínimo ou máximo), 👎 quando não cumpre */
function limite(v: number | null | undefined, cumpre: boolean | null): CelulaIndicador {
  if (v === null || v === undefined) return { v: null };
  return cumpre
    ? { v, icone: "polegarCima", corIcone: COR.ok }
    : { v, icone: "polegarBaixo", corIcone: COR.vermelho };
}

const col = (chave: string, titulo: string, formato: ColunaIndicador["formato"], barra = true): ColunaIndicador => ({
  chave,
  titulo,
  formato,
  barra,
});

async function montar(
  colunas: ColunaIndicador[],
  celulas: (m: Municipio) => Record<string, CelulaIndicador> | null,
  extra?: Partial<TabelaIndicadorDados>,
  municipios?: Municipio[]
): Promise<TabelaIndicadorDados> {
  const lista = municipios ?? (await listarMunicipios());
  const linhas: LinhaIndicador[] = [];
  for (const m of lista) {
    const c = celulas(m);
    if (c) linhas.push({ chave: String(m.id), municipio: m.nome, celulas: c });
  }
  return { colunas, linhas, ...extra };
}

// ---------------------------------------------------------------- receitas / despesas

type ReceitaDespesa = {
  despesa: { idEsferaAdministrativa: number; empenhada: number; previsaoInicial: number; liquidada: number; paga: number; mes: number }[];
  receita: { idEsferaAdministrativa: number; arrecadada: number; previsaoInicial: number; mes: number }[];
  resultadoOrcamentario: { idEsferaAdministrativa: number; valor: number; mes: number }[];
};
type ValorEsfera = { idEsferaAdministrativa: number; valor: number | null; valores?: { atual?: number; anterior?: number } };

const desempenho = (v?: { atual?: number; anterior?: number }) =>
  v && v.anterior ? ((v.atual ?? 0) / v.anterior - 1) * 100 : null;

async function receita(ano: string) {
  const [rd, perCapita, evolucao] = await Promise.all([
    api<ReceitaDespesa>(`MunicipioControllers/ReceitaDespesa/GetReceitaXDespesaMunicipios?anoExercicio=${ano}`),
    api<ValorEsfera[]>(`MunicipioControllers/Receita/GetEsferaAdministrativaValorPerCapita?anoExercicio=${ano}`),
    api<ValorEsfera[]>(`MunicipioControllers/Receita/GetEvolucaoReceitaArrecadadaEsferas?anoExercicio=${ano}&idEsferaAdministrativa=`),
  ]);
  const r = porId(rd?.receita);
  const pc = porId(perCapita);
  const ev = porId(evolucao);
  return montar(
    [col("mes", "Até o mês", "texto", false), col("prevista", "Prevista", "moeda"), col("arrecadada", "Arrecadada", "moeda"), col("perCapita", "Per capita", "moeda"), col("desempenho", "Desempenho", "percentual")],
    (m) => {
      const x = r.get(m.id);
      if (!x) return null;
      return {
        mes: mes(x.mes),
        prevista: moeda(x.previsaoInicial),
        arrecadada: moeda(x.arrecadada),
        perCapita: moeda(pc.get(m.id)?.valor),
        desempenho: { v: desempenho(ev.get(m.id)?.valores) },
      };
    }
  );
}

type Composicao = Record<string, { idEsferaAdministrativa: number; valor: number }[]>;

async function receitaComposicao(ano: string) {
  const [comp, rd] = await Promise.all([
    api<Composicao>(`MunicipioControllers/Receita/GetValoresComposicaoTodos?anoExercicio=${ano}`),
    api<ReceitaDespesa>(`MunicipioControllers/ReceitaDespesa/GetReceitaXDespesaMunicipios?anoExercicio=${ano}`),
  ]);
  const r = porId(rd?.receita);
  const chaves = [
    ["receitasMunicipio", "Receitas do Município"],
    ["transferenciasEstados", "Estado"],
    ["transferenciasUniao", "Tranf. União"],
    ["operacoesCredito", "Operações de crédito"],
    ["receitasIntra", "Receitas Intra"],
    ["outrasTransferencias", "Outras"],
  ] as const;
  const mapas = Object.fromEntries(chaves.map(([k]) => [k, porId(comp?.[k])]));
  return montar(
    [col("mes", "Até o mês", "texto", false), ...chaves.map(([k, t]) => col(k, t, "moeda")), col("arrecadada", "Arrecadada", "moeda")],
    (m) => {
      const x = r.get(m.id);
      if (!x) return null;
      return {
        mes: mes(x.mes),
        ...Object.fromEntries(chaves.map(([k]) => [k, moeda(mapas[k].get(m.id)?.valor ?? 0)])),
        arrecadada: moeda(x.arrecadada),
      };
    }
  );
}

async function receitaDestaque(ano: string) {
  // etiquetas do site oficial: 5 IPTU, 8 ITBI, 7 ISS, 4 ICMS, 6 IPVA, 2 convênios estado, 3 FPM, 1 convênios união
  const etiquetas = [
    ["iptu", "IPTU", 5],
    ["itbi", "ITBI", 8],
    ["iss", "ISS", 7],
    ["icms", "ICMS", 4],
    ["ipva", "IPVA", 6],
    ["conveniosEstado", "Convênios", 2],
    ["fpm", "FPM", 3],
    ["conveniosUniao", "Convênios", 1],
  ] as const;
  const [rd, ...dados] = await Promise.all([
    api<ReceitaDespesa>(`MunicipioControllers/ReceitaDespesa/GetReceitaXDespesaMunicipios?anoExercicio=${ano}`),
    ...etiquetas.map(([, , e]) =>
      api<{ receitaArrecadadaPorClassificacaoNatureza: { idEsferaAdministrativa: number; valor: number }[] }>(
        `MunicipioControllers/Receita/GetReceitaArrecadadaPorClassificacaoNatureza/etiqueta?anoExercicio=${ano}&etiqueta=${e}&idEsferaAdministrativa=`
      )
    ),
  ]);
  const r = porId(rd?.receita);
  const mapas = dados.map((d) => porId(d?.receitaArrecadadaPorClassificacaoNatureza));
  return montar(
    [col("mes", "Até o mês", "texto", false), ...etiquetas.map(([k, t]) => col(k, t, "moeda"))],
    (m) => ({
      mes: mes(r.get(m.id)?.mes),
      ...Object.fromEntries(etiquetas.map(([k], i) => [k, moeda(mapas[i].get(m.id)?.valor ?? 0)])),
    }),
    { grupos: [{ titulo: "", span: 2 }, { titulo: "Município", span: 3 }, { titulo: "Estado", span: 3 }, { titulo: "União", span: 2 }] }
  );
}

type DespesaEsferas = Record<string, { idEsferaAdministrativa: number; valor: number }[]>;

async function despesa(ano: string) {
  const [esf, evolucao, rd] = await Promise.all([
    api<DespesaEsferas>(`MunicipioControllers/Despesa/GetDespesaEsferas?anoExercicio=${ano}&idEsferaAdministrativa=`),
    api<(ValorEsfera & { ano: number })[]>(`MunicipioControllers/Despesa/GetEvolucaoAnualDespesaPagaPorEsferaAdministrativa?anoExercicio=${ano}&idEsferaAdministrativa=`),
    api<ReceitaDespesa>(`MunicipioControllers/ReceitaDespesa/GetReceitaXDespesaMunicipios?anoExercicio=${ano}`),
  ]);
  const d = porId(rd?.despesa);
  const ro = porId(rd?.resultadoOrcamentario);
  const empPc = porId(esf?.despesaEmpenhadaTotalPerCapita);
  const liqPc = porId(esf?.despesaLiquidadaTotalPerCapita);
  const ev = porId((evolucao ?? []).filter((e) => e.ano === Number(ano)));
  return montar(
    [
      col("mes", "Até o mês", "texto", false),
      col("empenhada", "Empenhada", "moeda"),
      col("empenhadaPc", "Per capita", "moeda"),
      col("liquidada", "Liquidada", "moeda"),
      col("liquidadaPc", "Per capita", "moeda"),
      col("paga", "Paga", "moeda"),
      col("orcamentario", "Orçamentário", "moeda"),
      col("desempenho", "Desempenho", "percentual"),
    ],
    (m) => {
      const x = d.get(m.id);
      if (!x) return null;
      return {
        mes: mes(x.mes),
        empenhada: moeda(x.empenhada),
        empenhadaPc: moeda(empPc.get(m.id)?.valor),
        liquidada: moeda(x.liquidada),
        liquidadaPc: moeda(liqPc.get(m.id)?.valor),
        paga: moeda(x.paga),
        orcamentario: moeda(ro.get(m.id)?.valor),
        desempenho: { v: desempenho(ev.get(m.id)?.valores) },
      };
    }
  );
}

async function despesaComposicao(ano: string) {
  const [comp, rd] = await Promise.all([
    api<Record<string, { idEsferaAdministrativa: number; valor: number }[]>>(`MunicipioControllers/Despesa/GetValoresComposicao?anoExercicio=${ano}`),
    api<ReceitaDespesa>(`MunicipioControllers/ReceitaDespesa/GetReceitaXDespesaMunicipios?anoExercicio=${ano}`),
  ]);
  const d = porId(rd?.despesa);
  const soma = (lista?: { idEsferaAdministrativa: number; valor: number }[]) => {
    const m = new Map<number, number>();
    for (const i of lista ?? []) m.set(i.idEsferaAdministrativa, (m.get(i.idEsferaAdministrativa) ?? 0) + i.valor);
    return m;
  };
  const chaves = [
    ["valoresSaude", "Saúde"],
    ["valoresPrevSocial", "Previdência Social"],
    ["valoresEducacao", "Educação"],
    ["valoresAdministracao", "Administração"],
    ["valoresOutras", "Outras"],
  ] as const;
  const mapas = Object.fromEntries(chaves.map(([k]) => [k, soma(comp?.[k])]));
  return montar(
    [col("mes", "Até o mês", "texto", false), ...chaves.map(([k, t]) => col(k, t, "moeda"))],
    (m) => ({
      mes: mes(d.get(m.id)?.mes),
      ...Object.fromEntries(chaves.map(([k]) => [k, moeda(mapas[k].get(m.id) ?? 0)])),
    })
  );
}

async function despesaDestaque(ano: string) {
  const etiquetas = [
    ["diarias", "Diárias", 1],
    ["permanente", "Material permanente", 2],
    ["obras", "Obras", 4],
    ["consumo", "Material de consumo", 3],
  ] as const;
  const [rd, ...dados] = await Promise.all([
    api<ReceitaDespesa>(`MunicipioControllers/ReceitaDespesa/GetReceitaXDespesaMunicipios?anoExercicio=${ano}`),
    ...etiquetas.map(([, , e]) =>
      api<ValorEsfera[]>(`MunicipioControllers/Despesa/GetDespesaLiquidadaPorClassificacaoNatureza/etiqueta?anoExercicio=${ano}&etiqueta=${e}&idEsferaAdministrativa=`)
    ),
  ]);
  const d = porId(rd?.despesa);
  const mapas = dados.map((x) => porId(x));
  return montar(
    [col("mes", "Até o mês", "texto", false), ...etiquetas.map(([k, t]) => col(k, t, "moeda"))],
    (m) => ({
      mes: mes(d.get(m.id)?.mes),
      ...Object.fromEntries(etiquetas.map(([k], i) => [k, moeda(mapas[i].get(m.id)?.valor ?? 0)])),
    })
  );
}

/** valores bimestrais com seta: queda = verde, alta = vermelho (despesa x receita) */
async function despesaCorrenteXReceitaCorrente(ano: string) {
  const dados = await api<{ nomeEsferaAdministrativa: string; dados: { mes: number; valorApurado: string }[] }[]>(
    `MunicipioControllers/LimiteDespesaReceita/GetEvolucaoMensalLimiteDespesaReceitaIndicador?anoExercicio=${ano}`
  );
  const mapa = porNome(dados, (d) => d.nomeEsferaAdministrativa);
  const num = (s?: string) => (s === undefined || s === null ? null : parseFloat(String(s).replace(",", ".")));
  const bimestres = [1, 2, 3, 4, 5, 6];
  return montar(
    [...bimestres.map((b) => col(`b${b}`, `${b}º Bimestre`, "percentual", false)), col("variacao", "Variação Anual", "percentual", false)],
    (m) => {
      const x = mapa.get(normalizarNome(m.nome));
      if (!x) return null;
      const valores = bimestres.map((b) => num(x.dados.find((d) => d.mes === b * 2)?.valorApurado));
      const celulas: Record<string, CelulaIndicador> = {};
      valores.forEach((v, i) => {
        const ant = i > 0 ? valores[i - 1] : null;
        celulas[`b${i + 1}`] = { v, ...seta(v, ant, "menorMelhor") };
      });
      const validos = valores.filter((v): v is number => v !== null);
      const variacao = validos.length > 1 ? +(validos[validos.length - 1] - validos[0]).toFixed(2) : null;
      celulas.variacao = { v: variacao, ...seta(variacao, 0, "menorMelhor") };
      return celulas;
    }
  );
}

function seta(
  v: number | null,
  anterior: number | null,
  sentido: "maiorMelhor" | "menorMelhor"
): Pick<CelulaIndicador, "icone" | "corIcone"> {
  if (v === null || anterior === null || v === anterior) return {};
  const subiu = v > anterior;
  const bom = sentido === "maiorMelhor" ? subiu : !subiu;
  return { icone: subiu ? "setaCima" : "setaBaixo", corIcone: bom ? COR.verde : COR.vermelho };
}

async function resultadoOrcamentario(ano: string) {
  const rd = await api<ReceitaDespesa>(`MunicipioControllers/ReceitaDespesa/GetReceitaXDespesaMunicipios?anoExercicio=${ano}`);
  const r = porId(rd?.receita);
  const d = porId(rd?.despesa);
  const ro = porId(rd?.resultadoOrcamentario);
  return montar(
    [col("mes", "Até o mês", "texto", false), col("receita", "Receita realizada acumulada", "moeda"), col("despesa", "Despesa executada acumulada", "moeda"), col("resultado", "Resultado orçamentário", "moeda")],
    (m) => {
      const x = r.get(m.id);
      if (!x) return null;
      return {
        mes: mes(x.mes),
        receita: moeda(x.arrecadada),
        despesa: moeda(d.get(m.id)?.empenhada),
        resultado: moeda(ro.get(m.id)?.valor),
      };
    }
  );
}

// ---------------------------------------------------------------- pessoal / educação / saúde

type ItemPessoal = { idEsferaAdministrativa: number; valor: number; mesUltimoEnvio: number };

async function pessoal(ano: string) {
  const dados = await api<Record<string, Record<string, ItemPessoal[]>>>(
    `MunicipioControllers/PessoalConsolidado/GetDespesasPessoais?idEsferaAdministrativa=&anoExercicio=${ano}`
  );
  const poderes = [
    ["Consolidado", 54, 60],
    ["Executivo", 48.6, 54],
    ["Legislativo", 5.4, 6],
  ] as const;
  const mapas = poderes.map(([p]) => {
    const g = dados?.[`pessoal${p}`] ?? {};
    return {
      valor: porId(g[`despesaPessoal${p}`]),
      perCapita: porId(g[`despesaPessoal${p}PerCapita`]),
      percentual: porId(g[`despesaPessoal${p}Percentual`]),
    };
  });
  const colunas: ColunaIndicador[] = [col("mes", "Até o mês", "texto", false)];
  poderes.forEach(([p]) => {
    colunas.push(col(`${p}Despesa`, "Despesa", "moeda"), col(`${p}PerCapita`, "Per capita", "moeda"), col(`${p}Lrf`, "LRF", "percentual"));
  });
  return montar(
    colunas,
    (m) => {
      const consolidado = mapas[0].valor.get(m.id);
      if (!consolidado) return null;
      const celulas: Record<string, CelulaIndicador> = { mes: mes(consolidado.mesUltimoEnvio) };
      poderes.forEach(([p, alerta, maximo], i) => {
        const perc = mapas[i].percentual.get(m.id)?.valor;
        celulas[`${p}Despesa`] = moeda(mapas[i].valor.get(m.id)?.valor);
        celulas[`${p}PerCapita`] = moeda(mapas[i].perCapita.get(m.id)?.valor);
        celulas[`${p}Lrf`] =
          perc === undefined
            ? { v: null }
            : perc >= maximo
              ? { v: perc, icone: "polegarBaixo", corIcone: COR.vermelho }
              : perc >= alerta
                ? { v: perc, icone: "mao", corIcone: COR.alerta }
                : { v: perc, icone: "polegarCima", corIcone: COR.ok };
      });
      return celulas;
    },
    { grupos: [{ titulo: "", span: 2 }, { titulo: "Consolidada", span: 3 }, { titulo: "Executivo", span: 3 }, { titulo: "Legislativo", span: 3 }] }
  );
}

type ValorNome = { idEsferaAdministrativa: number; valor: number };
type Alunos = { idEsferaAdministrativa: number; alunos: number };

async function educacao(ano: string) {
  const d = await api<{ educacaoPorAplicacao: ValorNome[]; educacaoPorAluno: ValorNome[]; educacaoPorPercentual: ValorNome[]; alunos: Alunos[] }>(
    `MunicipioControllers/Informacao/GetAplicacaoEducacao?idEsferaAdministrativa=&anoExercicio=${ano}`
  );
  const ap = porId(d?.educacaoPorAplicacao);
  const al = porId(d?.alunos);
  const pa = porId(d?.educacaoPorAluno);
  const pc = porId(d?.educacaoPorPercentual);
  const rd = await api<ReceitaDespesa>(`MunicipioControllers/ReceitaDespesa/GetReceitaXDespesaMunicipios?anoExercicio=${ano}`);
  const r = porId(rd?.receita);
  return montar(
    [col("mes", "Até o mês", "texto", false), col("alunos", "Alunos", "moeda"), col("aplicacao", "Aplicação total", "moeda"), col("porAluno", "Aplicação por aluno", "moeda"), col("limite", "Limite constitucional", "percentual")],
    (m) => {
      const v = pc.get(m.id)?.valor;
      return {
        mes: mes(r.get(m.id)?.mes),
        alunos: { v: al.get(m.id)?.alunos ?? null },
        aplicacao: moeda(ap.get(m.id)?.valor),
        porAluno: moeda(pa.get(m.id)?.valor),
        limite: limite(v, v === undefined ? null : v >= 25),
      };
    }
  );
}

async function educacaoFundeb(ano: string) {
  const [alunos, sumario, fundeb, rd] = await Promise.all([
    api<Alunos[]>(`MunicipioControllers/Informacao/GetQuantidadeAlunosPorAno?anoExercicio=${ano}`),
    api<{ educacaoMunicipio: { idEsferaAdministrativa: number; aplicacaoPercentualMagisterio: number | null; mesUltimoEnvio: number }[] }>(
      `MunicipioControllers/Educacao/GetSumario?anoExercicio=${ano}&idEsferaAdministrativa=`
    ),
    api<{ idEsferaAdministrativa: number; recebido: number; enviado: number }[]>(
      `MunicipioControllers/Receita/GetReceitaArrecadadaFundebTodosMunicipios?anoExercicio=${ano}`
    ),
    api<ReceitaDespesa>(`MunicipioControllers/ReceitaDespesa/GetReceitaXDespesaMunicipios?anoExercicio=${ano}`),
  ]);
  const al = porId(alunos);
  const su = porId(sumario?.educacaoMunicipio);
  const fu = porId(fundeb);
  const r = porId(rd?.receita);
  const minimo = Number(ano) >= 2021 ? 70 : 60;
  return montar(
    [
      col("mes", "Até o mês", "texto", false),
      col("alunos", "Alunos", "moeda"),
      col("destinado", "Destinado", "moeda"),
      col("recebido", "Recebido", "moeda"),
      col("relacao", "Destinado X Recebido", "percentual"),
      col("magisterio", "Aplicação no Magistério", "percentual"),
    ],
    (m) => {
      const f = fu.get(m.id);
      const mag = su.get(m.id)?.aplicacaoPercentualMagisterio ?? undefined;
      return {
        mes: mes(su.get(m.id)?.mesUltimoEnvio ?? r.get(m.id)?.mes),
        alunos: { v: al.get(m.id)?.alunos ?? null },
        destinado: moeda(f?.enviado),
        recebido: moeda(f?.recebido),
        relacao: { v: f && f.enviado ? (f.recebido / f.enviado - 1) * 100 : null },
        magisterio: limite(mag, mag === undefined ? null : mag >= minimo),
      };
    }
  );
}

async function saude(ano: string) {
  const d = await api<Record<"saudePorAplicacao" | "saudePorPerCapita" | "saudePorPercentual", ValorNome[]>>(
    `MunicipioControllers/Saude/GetAplicacaoSaudeEsferas?idEsferaAdministrativa=&anoExercicio=${ano}`
  );
  const rd = await api<ReceitaDespesa>(`MunicipioControllers/ReceitaDespesa/GetReceitaXDespesaMunicipios?anoExercicio=${ano}`);
  const r = porId(rd?.receita);
  const ap = porId(d?.saudePorAplicacao);
  const pc = porId(d?.saudePorPerCapita);
  const pp = porId(d?.saudePorPercentual);
  return montar(
    [col("mes", "Até o mês", "texto", false), col("aplicacao", "Aplicação total", "moeda"), col("perCapita", "Aplicação per capita", "moeda"), col("limite", "Limite constitucional", "percentual")],
    (m) => {
      const v = pp.get(m.id)?.valor;
      return {
        mes: mes(r.get(m.id)?.mes),
        aplicacao: moeda(ap.get(m.id)?.valor),
        perCapita: moeda(pc.get(m.id)?.valor),
        limite: limite(v, v === undefined ? null : v >= 15),
      };
    }
  );
}

// ---------------------------------------------------------------- previdência

const UG_RPPS = "E0800001";

async function municipiosComRpps(ano: string) {
  const [lista, todos] = await Promise.all([
    api<{ idEsferaAdministrativa: number }[]>(
      `MunicipioControllers/Informacao/GetNomeEsferasAdministrativasMunicipaisPorUnidadeGestora?codigoUnidadeGestora=${UG_RPPS}&anoExercicio=${ano}`
    ),
    listarMunicipios(),
  ]);
  const ids = new Set((lista ?? []).map((l) => l.idEsferaAdministrativa));
  return todos.filter((m) => ids.has(m.id));
}

type ValorPrev = { idEsferaAdministrativa: number; valor: number; mes: number };

async function previdenciaFinanceiro(ano: string) {
  const [munis, d] = await Promise.all([
    municipiosComRpps(ano),
    api<{
      ativos: ValorPrev[];
      receitas: { idEsferaAdministrativa: number; arrecadada: number; mes: number }[];
      despesas: { idEsferaAdministrativa: number; empenhada: number }[];
      receberLongoPrazo: ValorPrev[];
      receberCurtoPrazo: ValorPrev[];
    }>(`PrevidenciaControllers/ResultadoAtuarial/GetValoresFinanceirosPrevidencia?anoExercicio=${ano}&codigoUnidadeGestora=${UG_RPPS}`),
  ]);
  const at = porId(d?.ativos);
  const re = porId(d?.receitas);
  const de = porId(d?.despesas);
  const lp = porId(d?.receberLongoPrazo);
  const cp = porId(d?.receberCurtoPrazo);
  return montar(
    [
      col("mes", "Até o mês", "texto", false),
      col("ativos", "Ativos", "moeda"),
      col("receitas", "Receitas", "moeda"),
      col("despesas", "Despesas", "moeda"),
      col("resultado", "Resultado orçamentário", "moeda"),
      col("longo", "Valor a longo prazo", "moeda"),
      col("curto", "Valor a curto prazo", "moeda"),
    ],
    (m) => {
      const receitas = re.get(m.id)?.arrecadada;
      const despesas = de.get(m.id)?.empenhada;
      return {
        mes: mes(at.get(m.id)?.mes ?? re.get(m.id)?.mes),
        ativos: moeda(at.get(m.id)?.valor),
        receitas: moeda(receitas),
        despesas: moeda(despesas),
        resultado: moeda(receitas !== undefined && despesas !== undefined ? receitas - despesas : null),
        longo: moeda(lp.get(m.id)?.valor),
        curto: moeda(cp.get(m.id)?.valor),
      };
    },
    undefined,
    munis
  );
}

async function previdenciaResultadoAtuarial(ano: string) {
  const q = `anoExercicio=${ano}&codigoUnidadeGestora=${UG_RPPS}`;
  const [munis, ativos, concedidos, aConceder] = await Promise.all([
    municipiosComRpps(ano),
    api<ValorPrev[]>(`PrevidenciaControllers/ResultadoAtuarial/GetResultadoAtuarialAtivoEsferas?${q}`),
    api<ValorPrev[]>(`PrevidenciaControllers/ResultadoAtuarial/GetProvisaoBeneficiosConcedidosEsferas?${q}`),
    api<ValorPrev[]>(`PrevidenciaControllers/ResultadoAtuarial/GetProvisaoBeneficiosAConcederEsferas?${q}`),
  ]);
  const at = porId(ativos);
  const co = porId(concedidos);
  const ac = porId(aConceder);
  return montar(
    [
      col("mes", "Até o mês", "texto", false),
      col("ativos", "Ativos disponíveis", "moeda"),
      col("concedidos", "Concedidos", "moeda"),
      col("aConceder", "A Conceder", "moeda"),
      col("passivo", "Passivo", "moeda"),
      col("solvencia", "Solvência", "decimal"),
      col("cobertura", "Cobertura", "decimal"),
    ],
    (m) => {
      const a = at.get(m.id)?.valor;
      const c = co.get(m.id)?.valor;
      const ad = ac.get(m.id)?.valor;
      const passivo = c !== undefined || ad !== undefined ? (c ?? 0) + (ad ?? 0) : undefined;
      return {
        mes: mes(at.get(m.id)?.mes),
        ativos: moeda(a),
        concedidos: moeda(c),
        aConceder: moeda(ad),
        passivo: moeda(passivo),
        solvencia: { v: a !== undefined && passivo ? a / passivo : null },
        cobertura: { v: a !== undefined && c ? a / c : null },
      };
    },
    undefined,
    munis
  );
}

async function previdenciaSegurados(ano: string) {
  const [munis, d] = await Promise.all([
    municipiosComRpps(ano),
    api<{ idEsferaAdministrativa: number; valores: { Ativos?: number; Inativos?: number; IdadeAtivos?: number } }[]>(
      `FolhaPagamentoControllers/FolhaPagamento/GetQuantidadeVinculosAtivos?anoExercicio=${ano}&codigoReduzido=${UG_RPPS}&mes=12`
    ),
  ]);
  const mapa = porId(d);
  return montar(
    [col("ativos", "Ativos", "inteiro"), col("inativos", "Inativos", "inteiro"), col("razao", "Ativos/Inativos", "decimal"), col("idade", "Idade média ativos", "decimal")],
    (m) => {
      const v = mapa.get(m.id)?.valores;
      return {
        ativos: { v: v?.Ativos ?? null },
        inativos: { v: v?.Inativos ?? null },
        razao: { v: v?.Ativos && v.Inativos ? v.Ativos / v.Inativos : null },
        idade: { v: v?.Ativos && v.IdadeAtivos ? v.IdadeAtivos / v.Ativos : null },
      };
    },
    undefined,
    munis
  );
}

const NOTA_BARRA: Record<string, number> = { A: 1, B: 0.75, C: 0.5, D: 0.25 };

async function previdenciaSituacao(ano: string) {
  const [d, todos] = await Promise.all([
    api<{ idEsferaAdministrativa: number; gestaoTransparencia: string; financasLiquidez: string; atuaria: string; isp: string }[]>(`ISPControllers/ISP/GetTabela?anoExercicio=${ano}`),
    listarMunicipios(),
  ]);
  const mapa = porId(d);
  const nota = (v?: string): CelulaIndicador => ({ v: v ?? null, titulo: v, barra: v ? (NOTA_BARRA[v] ?? null) : null });
  return montar(
    [
      col("gestao", "Class. em Gestão e Transparência", "texto", false),
      col("financas", "Class. em Finanças e Liquidez", "texto", false),
      col("atuaria", "Class. em Atuária", "texto", false),
      col("isp", "Indicador de Situação Previdenciária", "texto", false),
    ],
    (m) => {
      const x = mapa.get(m.id);
      if (!x) return null;
      return { gestao: nota(x.gestaoTransparencia), financas: nota(x.financasLiquidez), atuaria: nota(x.atuaria), isp: nota(x.isp) };
    },
    undefined,
    todos
  );
}

// ---------------------------------------------------------------- alertas LRF

type Alertas = { municipio: string; alertas: { temIndicador: boolean; numeroPeriodo: string; dataAlerta: string; tipoPeriodo: string }[] }[];

const PERIODOS_QUADRIMESTRE = [
  ["Quadrimestre", 1],
  ["Quadrimestre", 2],
  ["Quadrimestre", 3],
  ["Semestre", 1],
  ["Semestre", 2],
] as const;
const PERIODOS_BIMESTRE = [1, 2, 3, 4, 5, 6].map((n) => ["Bimestre", n] as const);

async function alerta(ano: string, indicador: string, periodos: readonly (readonly [string, number])[]) {
  const d = await api<Alertas>(`MunicipioControllers/AlertaLRF/GetAlertasMunicipios?anoExercicio=${ano}&indicador=${indicador}`);
  const mapa = porNome(d, (x) => x.municipio);
  return montar(
    periodos.map(([t, n]) => ({ ...col(`${t}${n}`, `${n}° ${t}`, "texto", false), alinhar: "center" as const })),
    (m) => {
      const x = mapa.get(normalizarNome(m.nome));
      if (!x) return null;
      const link = `/municipio/${ano}/${m.nomeNormalizado}/gestao-fiscal/alertas-lrf`;
      return Object.fromEntries(
        periodos.map(([t, n]) => {
          const emitido = x.alertas.find((a) => a.tipoPeriodo === t && Number(a.numeroPeriodo) === n && a.temIndicador);
          const celula: CelulaIndicador = emitido
            ? { v: null, icone: "alerta", corIcone: COR.vermelho, titulo: `Alerta emitido em ${emitido.dataAlerta}`, link }
            : { v: null, icone: "check", corIcone: COR.verde, titulo: "Sem alerta", link };
          return [`${t}${n}`, celula];
        })
      );
    }
  );
}

// ---------------------------------------------------------------- CAPAG / IVF

async function capag(ano: string) {
  const d = await api<Record<string, string | number>[]>(`CAPAGControllers/CAPAG/GetIndicadorCAPAG?anoExercicio=${ano}`);
  const mapa = porNome(d, (x) => String(x.nomeEsferaAdministrativa));
  const chaves = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  return montar(
    chaves.map((k, i) => ({ ...col(k, MESES_COMPLETOS[i], "texto", false), alinhar: "center" as const })),
    (m) => {
      const x = mapa.get(normalizarNome(m.nome));
      if (!x) return null;
      const link = `/municipio/${ano}/${m.nomeNormalizado}/gestao-fiscal/capag`;
      return Object.fromEntries(
        chaves.map((k) => {
          const nota = x[k] ? String(x[k]) : null;
          return [k, { v: nota, titulo: nota ? `Nota ${nota}` : undefined, link, barra: null } satisfies CelulaIndicador];
        })
      );
    }
  );
}

type SerieMensal = { nomeEsferaAdministrativa: string; dados: { mes: number; valor: number | null; variacaoMensal: number | null }[]; variacao: number | null };

async function serieMensal(rota: string, sentido: "maiorMelhor" | "menorMelhor", sufixo: string) {
  const d = await api<SerieMensal[]>(rota);
  const mapa = porNome(d, (x) => x.nomeEsferaAdministrativa);
  const meses = Array.from({ length: 12 }, (_, i) => i + 1);
  const icone = (variacao: number | null | undefined): Pick<CelulaIndicador, "icone" | "corIcone"> =>
    variacao === null || variacao === undefined || variacao === 0 ? {} : seta(variacao, 0, sentido);
  return montar(
    [...meses.map((mm) => col(`m${mm}`, MESES_COMPLETOS[mm - 1], "texto", false)), col("variacao", "Variação Anual", "texto", false)],
    (m) => {
      const x = mapa.get(normalizarNome(m.nome));
      if (!x) return null;
      const fmt = (v: number | null | undefined) =>
        v === null || v === undefined ? null : `${v.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}${sufixo}`;
      const celulas: Record<string, CelulaIndicador> = {};
      for (const mm of meses) {
        const item = x.dados.find((dd) => dd.mes === mm);
        celulas[`m${mm}`] = { v: fmt(item?.valor), ...icone(item?.variacaoMensal) };
      }
      celulas.variacao = { v: fmt(x.variacao), ...icone(x.variacao) };
      return celulas;
    }
  );
}

// ---------------------------------------------------------------- IEGM

const NOTAS_IEGM: Record<string, [string, number]> = {
  a: ["A", 1],
  bmais: ["B+", 0.8],
  b: ["B", 0.6],
  cmais: ["C+", 0.4],
  c: ["C", 0.2],
};

async function iegm(ano: string) {
  type Indices = { idEsferaAdministrativa: number } & Record<string, string | number>;
  // o IEGM é publicado com defasagem: usa o exercício mais recente com dados (até 2 anos antes)
  let dados: Indices[] | null = null;
  let anoDados = Number(ano);
  for (; anoDados >= Number(ano) - 2; anoDados--) {
    dados = await api<Indices[]>(`MunicipioControllers/IEGM/GetTodosIndices?idEsferaAdministrativa=&anoExercicio=${anoDados}`);
    if (dados?.length) break;
  }
  const mapa = porId(dados);
  const indices = [
    ["iIEGM", "IEGM"],
    ["iEduc", "Educação"],
    ["iSaude", "Saúde"],
    ["iPlanejamento", "Planejamento"],
    ["iFiscal", "Fiscal"],
    ["iAmb", "Meio Ambiente"],
    ["iCidade", "Segurança"],
    ["iGovTI", "TI"],
  ] as const;
  return montar(
    indices.map(([k, t]) => col(k, t, "texto", false)),
    (m) => {
      const x = mapa.get(m.id);
      if (!x) return null;
      return Object.fromEntries(
        indices.map(([k]) => {
          const n = NOTAS_IEGM[String(x[k] ?? "").toLowerCase()];
          return [k, { v: n ? n[0] : null, barra: n ? n[1] : null } satisfies CelulaIndicador];
        })
      );
    },
    anoDados !== Number(ano) ? { nota: `Dados do IEGM ${anoDados} (último exercício avaliado).` } : undefined
  );
}

// ---------------------------------------------------------------- registro

export const TABELAS_INDICADORES: Record<string, (ano: string) => Promise<TabelaIndicadorDados>> = {
  receita,
  "receita-composicao": receitaComposicao,
  "receita-destaque": receitaDestaque,
  despesa,
  "despesa-composicao": despesaComposicao,
  "despesa-destaque": despesaDestaque,
  "despesa-corrente-x-receita-corrente": despesaCorrenteXReceitaCorrente,
  "resultado-orcamentario": resultadoOrcamentario,
  pessoal,
  educacao,
  "educacao-fundeb": educacaoFundeb,
  saude,
  "previdencia-financeiro": previdenciaFinanceiro,
  "previdencia-resultado-atuarial": previdenciaResultadoAtuarial,
  "previdencia-segurados": previdenciaSegurados,
  "previdencia-situacao-previdenciaria": previdenciaSituacao,
  "alerta-antecipacao-orcamentaria": (ano) => alerta(ano, "7", PERIODOS_QUADRIMESTRE),
  "alerta-despesa-com-pessoal": (ano) => alerta(ano, "4", PERIODOS_QUADRIMESTRE),
  "alerta-divida-consolidada": (ano) => alerta(ano, "5_47", PERIODOS_QUADRIMESTRE),
  "alerta-garantia-e-contra-garantia": (ano) => alerta(ano, "8", PERIODOS_QUADRIMESTRE),
  "alerta-meta-de-arrecadacao": (ano) => alerta(ano, "1_46", PERIODOS_BIMESTRE),
  "alerta-operacao-de-credito": (ano) => alerta(ano, "6", PERIODOS_QUADRIMESTRE),
  "alerta-resultado-nominal": (ano) => alerta(ano, "3", PERIODOS_BIMESTRE),
  "alerta-resultado-primario": (ano) => alerta(ano, "2", PERIODOS_BIMESTRE),
  "alerta-despesas-correntes-x-receitas-correntes": despesaCorrenteXReceitaCorrente,
  capag,
  "capag-endividamento": (ano) => serieMensal(`CAPAGControllers/CAPAG/GetIndicadorEndividamentoCAPAG?anoExercicio=${ano}`, "menorMelhor", "%"),
  "capag-liquidez": (ano) => serieMensal(`CAPAGControllers/CAPAG/GetIndicadorLiquidezCAPAG?anoExercicio=${ano}`, "maiorMelhor", "%"),
  "capag-poupanca-corrente": (ano) => serieMensal(`CAPAGControllers/CAPAG/GetIndicadorPoupancaCorrenteCAPAG?anoExercicio=${ano}`, "menorMelhor", "%"),
  "indice-vulnerabilidade-fiscal": (ano) => serieMensal(`IVFControllers/IVF/GetIndicadorIVF?anoExercicio=${ano}`, "menorMelhor", ""),
  "ivf-endividamento": (ano) => serieMensal(`IVFControllers/IVF/GetIndicadorIVFEndividamento?anoExercicio=${ano}`, "menorMelhor", "%"),
  "ivf-liquidez": (ano) => serieMensal(`IVFControllers/IVF/GetIndicadorIVFLiquidez?anoExercicio=${ano}`, "maiorMelhor", "%"),
  "ivf-margem": (ano) => serieMensal(`IVFControllers/IVF/GetIndicadorIVFMargem?anoExercicio=${ano}`, "maiorMelhor", "%"),
  iegm,
};

export type { IconeIndicador };
