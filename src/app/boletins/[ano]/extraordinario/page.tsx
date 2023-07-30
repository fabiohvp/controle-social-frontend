import ExternalLink from "@/components/links/ExternalLink";
import { ExtraordinarioPageProps } from "./ExtraordinarioPageProps";

type Data = {
  [key: string]: {
    edicao: { href: string; titulo: string };
    resumo: string;
    publicacao: string;
  }[];
};

async function getData({ ano }: ExtraordinarioPageProps) {
  //TODO: converter para buscar dinamicamente
  return (
    {
      "2020": [
        {
          edicao: {
            href: "https://www.tcees.tc.br/wp-content/uploads/formidable/130/boletim-extraordinario-1-2020-1.pdf",
            titulo: "Boletim Extraordinário 01",
          },
          resumo:
            "Apresenta cenários para a evolução das Receitas e Despesas do Estado e a margem fiscal resultante, tendo em vista a ocorrência de eventos relevantes com impacto fiscal ainda incerto em decorrência da pandemia da Covid-19.",
          publicacao: "Mar",
        },
        {
          edicao: {
            href: "https://www.tcees.tc.br/wp-content/uploads/formidable/130/boletim-extraordinario-2-2020.pdf",
            titulo: "Boletim Extraordinário 02",
          },
          resumo:
            "Atualiza os cenários para as receitas, despesas e a margem fiscal do Estado e apresenta também as informações e projeções de cenários para os municípios capixabas, tendo em vista a evolução da pandemia causada pelo Covid-19 e as incertezas decorrentes no cenário econômico e fiscal.",
          publicacao: "Abr",
        },
        {
          edicao: {
            href: "https://www.tcees.tc.br/wp-content/uploads/formidable/130/boletim-extraordinario-n3-maio2020.pdf",
            titulo: "Boletim Extraordinário 03",
          },
          resumo:
            "Atualiza os cenários fiscais do Estado e dos municípios capixabas em decorrência da evolução da pandemia causada pelo Covid-19 e as incertezas decorrentes no cenário econômico e fiscal. Adiciona, também, as projeções da situação dos jurisdicionados frente aos limites da despesa com pessoal.",
          publicacao: "Mai",
        },
        {
          edicao: {
            href: "https://www.tcees.tc.br/wp-content/uploads/formidable/130/boletim-extraordinario-n4-versao-3.pdf",
            titulo: "Boletim Extraordinário 04",
          },
          resumo:
            "Atualiza os cenários fiscais (receitas e despesas) e as projeções da situação dos jurisdicionados frente aos limites da despesa com pessoal no âmbito estadual e municipal em decorrência da evolução da pandemia causada pelo Covid-19.",
          publicacao: "Jun",
        },
        {
          edicao: {
            href: "https://www.tcees.tc.br/wp-content/uploads/formidable/130/boletim-extraordinario-n5-2107-c-2.pdf",
            titulo: "Boletim Extraordinário 05",
          },
          resumo:
            "Atualiza os cenários fiscais (receitas e despesas) e as projeções da situação dos jurisdicionados frente aos limites da despesa com pessoal no âmbito estadual e municipal em decorrência da evolução da pandemia causada pelo Covid-19.",
          publicacao: "Jul",
        },
        {
          edicao: {
            href: "https://www.tcees.tc.br/wp-content/uploads/formidable/130/boletim-extraordinario-n6-out-2020-4.pdf",
            titulo: "Boletim Extraordinário 06",
          },
          resumo:
            "Atualiza os cenários fiscais (receitas e despesas) e as projeções da situação dos jurisdicionados frente aos limites da despesa com pessoal no âmbito estadual e municipal em decorrência da evolução da pandemia causada pelo Covid-19.",
          publicacao: "Out",
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
            href: "https://www.tcees.tc.br/wp-content/uploads/formidable/130/EstudoTecnico7-2023-2.pdf",
            titulo: "Investimento público e crescimento econômico",
          },
          resumo:
            "O presente estudo objetiva apresentar a evolução nos últimos anos do gasto público com investimentos do Estado e municípios capixabas mediante indicadores selecionados.",
          publicacao: "Jun",
        },
      ],
    } as Data
  )[ano];
}

export default async function Page({
  params,
}: {
  params: ExtraordinarioPageProps;
}) {
  const data = await getData(params);

  return (
    <table className="table mt-4 responsive text-sm">
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
            <td>
              <ExternalLink href={row.edicao.href}>
                {row.edicao.titulo}
              </ExternalLink>
            </td>
            <td>{row.resumo}</td>
            <td className="text-center">{row.publicacao}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
