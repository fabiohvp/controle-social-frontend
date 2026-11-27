export const ANOS_IEGM = [2023, 2018, 2017, 2016, 2015];

/** Último ano em que houve manual publicado (o painel oficial avisa para 2018). */
export const ANO_SEM_MANUAL = 2018;

export type IndiceIegm = {
  slug: string;
  rotulo: string;
  /** Método do controller `IEGMControllers/IEGM` (somente para índices temáticos). */
  metodo?: string;
  descricao?: string;
};

export const INDICES_IEGM: IndiceIegm[] = [
  { slug: "geral", rotulo: "IEGM", metodo: "GetiIEGM" },
  {
    slug: "educacao",
    rotulo: "i-Educ",
    metodo: "GetiEduc",
    descricao:
      "O Índice Municipal da Educação mede o resultado das ações da gestão Pública Municipal nesta área por meio de uma série de quesitos específicos relativos à educação infantil e Ensino Fundamental, com foco em aspectos relacionados à infraestrutura escolar. Este índice reúne informações sobre avaliação escolar, planejamento de vagas, atuação do Conselho Municipal de Educação, problemas de infraestrutura, merenda escolar, situação e qualificação de professores, quantitativo de vagas, material e uniforme escolares.",
  },
  {
    slug: "saude",
    rotulo: "i-Saúde",
    metodo: "GetiSaude",
    descricao:
      "O Índice Municipal da Saúde mede o resultado das ações da gestão Pública Municipal neste tema por meio de uma série de quesitos específicos, com ênfase nos processos realizados pelas prefeituras relacionados à Atenção Básica, Cobertura e ação do Programa Saúde da Família, atuação do Conselho Municipal da Saúde, assiduidade dos médicos, atendimento à população para tratamento de doenças como tuberculose e prevenção de doenças como a dengue, controle de estoque de insumos, cobertura das campanhas de vacinação e de orientação à população.",
  },
  {
    slug: "planejamento",
    rotulo: "i-Planejamento",
    metodo: "GetiPlanejamento",
    descricao:
      "O Índice Municipal do Planejamento verifica a consistência entre o que foi planejado e o efetivamente executado, por meio da análise dos percentuais gerados pelo confronto destas duas variáveis. Neste confronto, além dos aspectos relacionados ao cumprimento do que foi planejado, também é possível identificar a existência de coerência entre as metas físicas alcançadas e os recursos empregados, bem como entre os resultados alcançados pelas ações e seus reflexos nos indicadores dos programas.",
  },
  {
    slug: "fiscal",
    rotulo: "i-Fiscal",
    metodo: "GetiFiscal",
    descricao:
      "Este índice mede o resultado da gestão fiscal por meio da análise da execução financeira e orçamentária, das decisões em relação à aplicação de recursos vinculados, da transparência da administração municipal e da obediência aos limites estabelecidos pela Lei de Responsabilidade Fiscal.",
  },
  {
    slug: "ambiental",
    rotulo: "i-Amb",
    metodo: "GetiAmb",
    descricao:
      "O Índice Municipal do Meio Ambiente mede o resultado das ações relacionadas ao meio ambiente que impactam a qualidade dos serviços e a vida das pessoas. Este índice contém informações sobre resíduos sólidos, saneamento básico, educação ambiental, estrutura ambiental e conselho ambiental.",
  },
  {
    slug: "cidade",
    rotulo: "i-Cidade",
    metodo: "GetiCidade",
    descricao:
      "O Índice Municipal de Proteção dos Cidadãos mede o grau de envolvimento do planejamento municipal na proteção dos cidadãos frente a possíveis eventos de sinistros e desastres. Reúne informações sobre Plano de Contingência, identificação de riscos para intervenção do Poder Público e infraestrutura da Defesa Civil.",
  },
  {
    slug: "gov-ti",
    rotulo: "i-GovTI",
    metodo: "GetiGovTI",
    descricao:
      "O Índice Municipal de Governança de Tecnologia da Informação mede o conhecimento e o uso dos recursos de Tecnologia da Informação em favor da sociedade. Este índice reúne informações sobre políticas de uso de informática, segurança da informação, capacitação do quadro de pessoal e transparência.",
  },
  { slug: "manual", rotulo: "Manual" },
  { slug: "relatorio", rotulo: "Relatório" },
];

export type DadoIndice = {
  idEsferaAdministrativa: number;
  nomeEsferaAdministrativa: string;
  valor: number;
};

export type NotasMunicipio = {
  idEsferaAdministrativa: number;
  iIEGM: string;
  iEduc: string;
  iSaude: string;
  iPlanejamento: string;
  iFiscal: string;
  iAmb: string;
  iCidade: string;
  iGovTI: string;
};

/**
 * `valor` retornado pela API: 1 = A, 2 = B+, 3 = B, 4 = C+, 5 = C, 6 = sem
 * resposta (mesma escala do painel oficial).
 */
export const NOTAS_IEGM = [
  { valor: 1, nota: "A", faixa: "Altamente efetiva", cor: "#2F9E23" },
  { valor: 2, nota: "B+", faixa: "Muito efetiva", cor: "#A7D489" },
  { valor: 3, nota: "B", faixa: "Efetiva", cor: "#FFF8B8" },
  { valor: 4, nota: "C+", faixa: "Em fase de adequação", cor: "#F4B350" },
  { valor: 5, nota: "C", faixa: "Baixo nível de adequação", cor: "#E68364" },
  { valor: 6, nota: "?", faixa: "Sem resposta", cor: "#F0F0F0" },
];

export function getNotaPorValor(valor: number) {
  return NOTAS_IEGM.find((n) => n.valor === valor) ?? NOTAS_IEGM[5];
}

/** Converte a nota textual de `GetTodosIndices` (ex.: `cmais`) para exibição. */
export function formatarNotaIegm(nota?: string | null) {
  if (!nota) return "?";
  return nota.replace("mais", "+").replace("indefinido", "?").toUpperCase();
}
