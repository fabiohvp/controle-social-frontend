import ExternalLink from "@/components/links/ExternalLink";
import { InformativoPageProps } from "./routes";

type Data = {
  [key: string]: {
    edicao: { href: string; titulo: string };
    resumo: string;
    publicacao: string;
  }[];
};

async function getData({ ano }: InformativoPageProps) {
  //TODO: converter para buscar dinamicamente
  return (
    {
      "2020": [
        {
          edicao: {
            href: "https://www.tcees.tc.br/wp-content/uploads/formidable/130/EstudoTecnico7-2023-2.pdf",
            titulo: "Investimento público e crescimento econômico",
          },
          resumo:
            "O presente estudo objetiva apresentar a evolução nos últimos anos do gasto público com investimentos do Estado e municípios capixabas mediante indicadores selecionados.",
          publicacao: "Jun",
        },
      ],
      "2022": [
        {
          edicao: {
            href: "https://www.tcees.tc.br/wp-content/uploads/formidable/130/EstudoTecnico3-2022-6.pdf",
            titulo: "Boletim Extraordinário 01",
          },
          resumo:
            "O estudo examina a política previdenciária dos 34 municípios capixabas que possuem Regime Próprio de Previdência Social (RPPS), mediante amostra de 13 municípios selecionados. Avalia a condução da gestão previdenciária no contexto da gestão orçamentária e da economia local, apontando riscos e tendências na política previdenciária que apresente ameaça à sustentabilidade fiscal caso não se alcance o equilíbrio financeiro e atuarial da previdência.",
          publicacao: "Mai",
        },
      ],
      "2023": [
        {
          edicao: {
            href: "https://www.tcees.tc.br/wp-content/uploads/formidable/130/EstudoTecnico1-2023-5.pdf",
            titulo: "Hanseníase no estado do Espírito Santo",
          },
          resumo:
            "O objetivo do presente estudo técnico é apresentar os aspectos do desempenho da Política Nacional de Controle da Hanseníase, observando, sobretudo, a proporção de casos curados e o quantitativo de novos casos confirmados no estado do Espírito Santo. Para tanto, utilizou-se da base de dados do Sistema de Informação de Agravos de Notificação (Sinan) e do Sistema de Informação em Saúde E-SUS Vigilância em Saúde (ESUS-VS). ",
          publicacao: "Jan",
        },
        {
          edicao: {
            href: "https://www.tcees.tc.br/wp-content/uploads/formidable/130/Boletim-Intervalo-de-tratamento.pdf",
            titulo:
              "Intervalo entre diagnóstico e início do tratamento de câncer pelo Sistema Único de Saúde - SUS no estado do Espírito Santo",
          },
          resumo:
            "O objetivo do presente estudo técnico é apresentar os aspectos do desempenho da Política Nacional para Prevenção e Controle do Câncer (PNPCC) desenvolvida no estado do Espírito Santo, observando, sobretudo, o intervalo entre o diagnóstico e o início do tratamento de câncer pelo Sistema único de Saúde (SUS).",
          publicacao: "Fev",
        },
        {
          edicao: {
            href: "https://www.tcees.tc.br/wp-content/uploads/formidable/130/PecaComplementar11758-2023-7.pdf",
            titulo: "Autismo no estado do Espírito Santo",
          },
          resumo:
            "O objetivo do presente estudo técnico é apresentar os aspectos do desempenho da Política Nacional de Proteção dos Direitos da Pessoa com Transtorno de Espectro Autista (TEA), desenvolvida no estado do Espírito Santo.",
          publicacao: "Abr",
        },
        {
          edicao: {
            href: "https://www.tcees.tc.br/wp-content/uploads/formidable/130/Informativo-NATR-1-2023-IVF-2022.pdf",
            titulo:
              "Indicador de Vulnerabilidade Fiscal dos municípios capixabas – 2019 a 2022",
          },
          resumo:
            "O objetivo deste trabalho é avaliar e apresentar o grau de vulnerabilidade das finanças municipais à ocorrência de eventos, denominados riscos fiscais, que possam afetar negativamente a trajetória das contas públicas, comprometendo o alcance das metas estabelecidas, ou, na ausência ou inconsistência dessas metas, comprometer a sustentabilidade fiscal do município.",
          publicacao: "Mai",
        },
        {
          edicao: {
            href: "https://www.tcees.tc.br/wp-content/uploads/formidable/130/EstudoTecnico5-2023-3.pdf",
            titulo: "Boletim CadÚnico 2022",
          },
          resumo:
            "O objetivo do trabalho é, além de atualizar IVFam, utilizando os dados do CadÚnico relativos ao ano de 2022, analisar as mudanças ocorridas nos dados em comparação ao ano de 2021, especialmente em relação ao crescimento da base, principalmente quanto às famílias unipessoais.",
          publicacao: "Jun",
        },
      ],
    } as Data
  )[ano];
}

export default async function Page({
  params,
}: {
  params: InformativoPageProps;
}) {
  const resolvedParams = await params;
  const data = await getData(resolvedParams);

  return (
    <table className="table responsive text-sm">
      <thead>
        <tr>
          <th className="min-w-[200px]">Edição</th>
          <th>Resumo</th>
          <th>Publicação</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className={`${index % 2 === 0 ? "even" : "odd"}`}>
            <td data-label="Edição">
              <ExternalLink href={row.edicao.href}>
                {row.edicao.titulo}
              </ExternalLink>
            </td>
            <td data-label="Resumo">{row.resumo}</td>
            <td className="text-center" data-label="Publicação">
              {row.publicacao}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
