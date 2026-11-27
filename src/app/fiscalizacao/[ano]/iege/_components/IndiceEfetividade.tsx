import AlertPanel from "@/components/panel/AlertPanel";
import { ReactNode } from "react";
import { IegeIndices, formatarNota, getCorNota } from "../iege";

type ChaveIndice = "iEduc" | "iSaude" | "iPlanejamento" | "iFiscal" | "iAmb" | "iSegp" | "iDes";

const INDICES_TEMATICOS: {
  chave: ChaveIndice;
  rotulo: string;
  descricao: string;
}[] = [
  {
    chave: "iEduc",
    rotulo: "i-Educ",
    descricao:
      "O Índice Estadual da Educação enseja conhecer melhor a realidade do Estado por meio de indicadores que estabeleçam métricas sobre a qualidade das ações na gestão da educação pública, em sua esfera de responsabilidade, que impactem a prestação dos serviços e a vida das pessoas.",
  },
  {
    chave: "iSaude",
    rotulo: "i-Saúde",
    descricao:
      "O Índice Estadual da Saúde busca apresentar a realidade do Estado por meio de indicadores que estabeleçam metas indicativas da gestão da saúde pública, em especial, na promoção e vigilância em saúde.",
  },
  {
    chave: "iPlanejamento",
    rotulo: "i-Planej",
    descricao:
      "O Índice Estadual do Planejamento permite visualizar aspectos quantitativos e qualitativos dos instrumentos de planejamento do Estado, evidenciando como acontece o planejamento governamental e sua gestão, a conformidade dos atos com as normas pertinentes, a transparência e o nível de aderência em sua execução.",
  },
  {
    chave: "iFiscal",
    rotulo: "i-Fiscal",
    descricao:
      "O Índice Estadual da Gestão Fiscal atesta a política fiscal estabelecida e a executada (direta ou indiretamente), facilitando ao usuário da informação a compreensão adequada dos resultados das decisões tomadas pelos administradores públicos no que diz respeito à gestão fiscal.",
  },
  {
    chave: "iAmb",
    rotulo: "i-Amb",
    descricao:
      "O Índice Estadual do Meio Ambiente busca conferir maior clareza à realidade do Estado, trazendo indicadores com metas estabelecidas para medir a qualidade das ações na gestão do meio ambiente estadual, especialmente aquelas relacionadas à água, ao solo, ao ar e à biodiversidade.",
  },
  {
    chave: "iSegp",
    rotulo: "i-Segp",
    descricao:
      "O Índice Estadual de Segurança Pública, por meio de indicadores que estabeleçam métricas definidas, permite o conhecimento mais amplo da qualidade das ações do Estado na gestão da segurança pública.",
  },
  {
    chave: "iDes",
    rotulo: "i-Des",
    descricao:
      "O Índice Estadual de Desenvolvimento Econômico apresenta indicadores com métricas definidas para facilitar o entendimento das ações que dizem respeito à gestão do desenvolvimento econômico estadual.",
  },
];

const FAIXAS = [
  {
    nota: "a",
    faixa: "Altamente efetiva",
    criterio:
      "IEGE com pelo menos 90% da nota máxima e, no mínimo, 4 índices com nota A, incluindo os índices i-Saúde e i-Educ",
  },
  {
    nota: "bmais",
    faixa: "Muito efetiva",
    criterio: "IEGE entre 75,0% e 89,9% da nota máxima",
  },
  {
    nota: "b",
    faixa: "Efetiva",
    criterio: "IEGE entre 60,0% e 74,9% da nota máxima",
  },
  {
    nota: "cmais",
    faixa: "Em fase de adequação",
    criterio: "IEGE entre 50,0% e 59,9% da nota máxima",
  },
  {
    nota: "c",
    faixa: "Baixo nível de adequação",
    criterio: "IEGE menor que 50%",
  },
];

function Nota({ nota }: { nota: string }) {
  return (
    <span
      className="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-black"
      style={{ backgroundColor: getCorNota(nota) }}
    >
      {formatarNota(nota)}
    </span>
  );
}

function Documento({
  id,
  children,
}: {
  id?: number | null;
  children: ReactNode;
}) {
  if (!id) return null;
  return (
    <li>
      <a
        className="underline"
        href={`/api/fiscalizacao/iege/documento?id=${id}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    </li>
  );
}

export function IndiceEfetividade({
  ano,
  indices,
}: {
  ano: string;
  indices: IegeIndices;
}) {
  return (
    <div className="grid gap-3 pb-4 lg:grid-cols-2">
      <section aria-label="Notas do IEGE" className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-center gap-6 py-2">
          <div className="flex flex-col items-center gap-3">
            <div
              className="flex h-36 w-36 flex-col items-center justify-center rounded-full border border-gray-300 shadow"
              style={{ backgroundColor: getCorNota(indices.iIEGE) }}
            >
              <span className="text-lg font-bold">IEGE</span>
              <span className="text-4xl font-bold">
                {formatarNota(indices.iIEGE)}
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {INDICES_TEMATICOS.map((indice) => (
                <div
                  className="flex h-24 w-24 flex-col items-center justify-center rounded-full border border-gray-300 shadow-sm"
                  key={indice.chave}
                  style={{ backgroundColor: getCorNota(indices[indice.chave]) }}
                >
                  <span className="text-sm font-semibold">{indice.rotulo}</span>
                  <span className="text-2xl font-bold">
                    {formatarNota(indices[indice.chave])}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded border border-gray-200 bg-white px-3 py-2 text-xs text-gray-500">
            {FAIXAS.map((f) => (
              <p className="my-1 flex items-center gap-2" key={f.nota}>
                <Nota nota={f.nota} /> {f.faixa}
              </p>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2">Nota</th>
                <th className="p-2">Faixa</th>
                <th className="p-2">Critério</th>
              </tr>
            </thead>
            <tbody>
              {FAIXAS.map((f) => (
                <tr className="border-b align-top" key={f.nota}>
                  <td className="p-2">
                    <Nota nota={f.nota} />
                  </td>
                  <td className="p-2">{f.faixa}</td>
                  <td className="p-2">{f.criterio}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="p-2 text-xs text-gray-600">
            Observação: quando não ocorrer a aplicação de 12% da receita
            vinculável na Saúde e de 25% na Educação, o Estado perde 5 pontos
            (no caso de um só índice) ou 10 pontos (no caso dos 2 índices) no
            total do IEGE, por descumprimento dos índices constitucionais.
          </p>
        </div>
      </section>

      <section aria-label="Sobre o IEGE" className="flex flex-col gap-2">
        <AlertPanel type="info" className="min-h-0">
          <h2 className="font-bold">
            O IEGE - Índice de Efetividade da Gestão Estadual
          </h2>
          <p className="mt-1">
            Inspirado no Índice de Efetividade da Gestão Municipal (IEGM), o
            Tribunal de Contas do Estado de Minas Gerais (TCEMG), em parceria
            com a Fundação João Pinheiro e o Poder Executivo do Estado de Minas
            Gerais, desenvolveu o{" "}
            <a
              className="underline"
              href="https://irbcontas.org.br/wp-content/uploads/2019/02/iegered.pdf"
              rel="noopener noreferrer"
              target="_blank"
            >
              Índice de Efetividade da Gestão Estadual (IEGE)
            </a>
            . Por meio da Rede Nacional de Indicadores Públicos (Rede Indicon),
            e com a adesão dos demais Tribunais de Contas, em {ano} iniciou-se a
            implantação do IEGE em âmbito nacional.
          </p>
          <p className="mt-1">
            O IEGE tem como objetivo avaliar a qualidade dos meios empregados
            para se alcançar, de forma abrangente, a efetividade da gestão
            estadual, considerando, sobretudo, os aspectos do bem-estar social.
            Ele pode ser utilizado como mais um instrumento técnico nas análises
            das contas públicas, sem perder o foco do planejamento em relação às
            necessidades da sociedade.
          </p>
          <p className="mt-1">
            São listadas nesta página a nota consolidada do IEGE do estado do
            Espírito Santo bem como as notas dos 7 índices temáticos que o
            compõem.
          </p>
          <ul className="mt-2 list-disc pl-5">
            <Documento id={indices.idRelatorio}>
              Acesse na íntegra o relatório de levantamento
            </Documento>
            <Documento id={indices.idInstrucao}>
              Acesse a instrução técnica conclusiva
            </Documento>
            <Documento id={indices.idAcordao}>Acesse o Acórdão</Documento>
          </ul>
        </AlertPanel>

        <details className="rounded border border-gray-200 bg-white p-3">
          <summary className="cursor-pointer font-semibold">
            Os 7 índices temáticos
          </summary>
          <p className="mt-2 text-sm">
            Por meio de um questionário eletrônico, composto por 294 quesitos de
            avaliação, as sete dimensões avaliadas pelo IEGE quanto à qualidade
            das políticas, ações e gastos públicos são:
          </p>
          {INDICES_TEMATICOS.map((indice) => (
            <div className="mt-2 text-sm" key={indice.chave}>
              <strong>{indice.rotulo}</strong>
              <p>{indice.descricao}</p>
            </div>
          ))}
        </details>
      </section>
    </div>
  );
}
