import ExternalLink from "@/components/links/ExternalLink";
import PanelWithTitleCollapsible from "@/components/panel/PanelWithTitleCollapsible";
import { Tab } from "@/components/tabs/Tab";
import { ENV } from "@/shared/env";
import { getCodigoMunicipio, getMunicipios } from "@/shared/municipio";
import { groupBy } from "@/types/Array";
import { ReactNode } from "react";
import { ImFileText2 } from "react-icons/im";
import { JulgamentoDeContaPageProps } from "../../routes";

type Sessao = {
  arquivoDecretoLegislativoId: number;
  dataJulgamento: string;
  numeroDecretoLegislativo: string;
  sumario: [
    {
      anoParecerPrevio: number;
      arquivoAtaJulgamentoId?: number;
      arquivoDecretoLegislativoId?: number;
      ataJulgamentoUrl: string;
      dados: {
        tabela: {
          nomeVereador: string;
          partidoVereador: string;
          parecerPrevioVotoTipo: string;
          registrouPresenca: string;
          votoAberto: boolean;
        }[];
        tabelaVotoFechado?: any;
        tabelaVotoAbertoQuantidade: {
          aprovado: number;
          reprovado: number;
          abstencao: number;
          ausente: number;
          naoRegistrouVoto: number;
          resultado: string;
          votoAberto: boolean;
        };
      };
      dataJulgamento: string;
      dataRecebimentoParecerPrevioLegislativo: string;
      dataResultado: string;
      dataTransitoJulgado: string;
      decretoLegislativoUrl: string;
      numeroDecretoLegislativo: string;
      numeroParecerPrevio: number;
      parecerPrevioJulgamentoSituacao: string;
      prazoJulgamentoLeiOrganicaUG?: number;
      quantidadeVereadoresExercicio?: number;
      responsavel: string;
      resultadoParecer: string;
      votoAberto?: boolean;
    }
  ];
};

async function getData({
  ano,
  municipio,
}: {
  ano: string;
  municipio: string;
}): Promise<Sessao[]> {
  const municipios = await getMunicipios();
  const codigo = getCodigoMunicipio(municipios, municipio!);
  const res = await fetch(
    `${ENV.apiUrl}/PrestacaoContaControllers/JulgamentoConta/GetSumarioDetalheJulgamento?anoExercicio=${ano}&codigoEsferaAdministrativa=${codigo}&v=${ENV.apiVersion}`
  );
  return res.json();
}

export default async function Page({
  params,
}: {
  params: JulgamentoDeContaPageProps;
}) {
  const sessoes = await getData({
    ano: params.ano,
    municipio: params.municipio!,
  });

  if (!sessoes.length) {
    return (
      <>
        <h3>Aguardando votação na Câmara Municipal.</h3>
        <h6>
          O parecer prévio sobre a situação das contas foi emitido pelo TCE-ES e
          aguarda julgamento dos vereadores
        </h6>
      </>
    );
  }
  const parecerPrevio = sessoes[0].sumario[0];
  const tabelaVotosQuantidades = parecerPrevio.dados.tabelaVotoAbertoQuantidade;

  if (!parecerPrevio.dataJulgamento) {
    return (
      <>
        <div>
          <h4 className="py-1">Parecer prévio do TCE-ES</h4>
          <RenderField
            value={`${parecerPrevio.numeroParecerPrevio}/${parecerPrevio.anoParecerPrevio}`}
          >
            Número
          </RenderField>
          <RenderField
            value={parecerPrevio.dataRecebimentoParecerPrevioLegislativo}
          >
            Data da ciência da Câmara Municipal
          </RenderField>
          <RenderField value={parecerPrevio.resultadoParecer}>
            Resultado
          </RenderField>
        </div>
        <hr className="py-1" />
        {sessoes[0].sumario.map((sumario) => (
          <PanelWithTitleCollapsible
            key={sumario.responsavel}
            header={`PREFEITO(A) ${sumario.responsavel}`}
            headerProps={{ className: "font-bold" }}
          >
            Responsável sem julgamento.
          </PanelWithTitleCollapsible>
        ))}
      </>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-between xl:w-3/4">
        <div className="border-b pb-2 w-full md:border-b-0 md:w-auto">
          <h4 className="py-1">Parecer prévio do TCE-ES</h4>
          <RenderField
            value={`${parecerPrevio.numeroParecerPrevio}/${parecerPrevio.anoParecerPrevio}`}
          >
            Número
          </RenderField>
          <RenderField value={parecerPrevio.parecerPrevioJulgamentoSituacao}>
            Situação
          </RenderField>
          <RenderField
            value={parecerPrevio.dataRecebimentoParecerPrevioLegislativo}
          >
            Data da ciência da Câmara Municipal
          </RenderField>
          <RenderField value={parecerPrevio.resultadoParecer}>
            Resultado
          </RenderField>
        </div>
        <div className="border-b pb-2 w-full md:border-b-0 md:w-auto">
          <h4 className="py-1">Julgamento pela Câmara</h4>
          <RenderField
            value={(
              parecerPrevio.quantidadeVereadoresExercicio ?? 0
            ).toString()}
          >
            Quantidade de vereadores no exercício
          </RenderField>
          <RenderField value={parecerPrevio.dataResultado}>
            Tempo até o julgamento
          </RenderField>
          <RenderField value={parecerPrevio.numeroDecretoLegislativo}>
            Decreto legislativo
          </RenderField>
          <ExternalLink href={parecerPrevio.ataJulgamentoUrl}>
            <ImFileText2 /> Ata do julgamento
          </ExternalLink>
          <ExternalLink href={parecerPrevio.decretoLegislativoUrl}>
            <ImFileText2 /> Decreto legislativo
          </ExternalLink>
        </div>

        <div className="border-b pb-2 w-full md:border-b-0 md:w-auto">
          <RenderField value={tabelaVotosQuantidades.aprovado.toString()}>
            Votos pela aprovação
          </RenderField>
          <RenderField value={tabelaVotosQuantidades.reprovado.toString()}>
            Votos pela rejeição
          </RenderField>
          <RenderField value={tabelaVotosQuantidades.abstencao.toString()}>
            Abstenção
          </RenderField>
          <RenderField value={tabelaVotosQuantidades.ausente.toString()}>
            Ausente
          </RenderField>
          <RenderField
            value={tabelaVotosQuantidades.naoRegistrouVoto.toString()}
          >
            Não registrou voto
          </RenderField>
          <RenderField value={tabelaVotosQuantidades.resultado}>
            Resultado
          </RenderField>
        </div>
      </div>
      {sessoes.map((sessao) => (
        <RenderSessao key={sessao.dataJulgamento} sessao={sessao} />
      ))}
    </>
  );
}

function RenderField({
  children,
  value,
}: {
  children: ReactNode;
  value: string;
}) {
  return (
    <div className="py-1">
      {children}: <strong>{value}</strong>
    </div>
  );
}

function RenderSessao({ sessao }: { sessao: Sessao }) {
  const groups = [...groupBy(sessao.sumario, (s) => s.dataJulgamento)];
  const map = new Map<string, ReactNode>();

  for (const [data, sumarios] of groups) {
    map.set(
      `Sessão - ${data}`,
      sumarios.map((sumario) => (
        <PanelWithTitleCollapsible
          key={sumario.responsavel}
          header={`PREFEITO(A) ${sumario.responsavel}`}
          headerProps={{ className: "font-bold" }}
        >
          <table className="table mt-4 responsive text-sm">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Partido</th>
                <th>Voto</th>
                <th>Registrou presença</th>
              </tr>
            </thead>
            <tbody>
              {sumario.dados.tabela.map((row, index) => (
                <tr
                  key={row.nomeVereador}
                  className={`${index % 2 === 0 ? "even" : "odd"}`}
                >
                  <td data-label="Nome">{row.nomeVereador}</td>
                  <td data-label="Partido">{row.partidoVereador}</td>
                  <td data-label="Voto">{row.parecerPrevioVotoTipo}</td>
                  <td data-label="Registrou presença">
                    {row.registrouPresenca}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </PanelWithTitleCollapsible>
      ))
    );
  }
  return <Tab items={map} />;
}
