import ExternalLink from "@/components/links/ExternalLink";
import PainelComTituloMinimizavel from "@/components/paineis/PainelComTituloMinimizavel";
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
      ataJulgamentoUrl: string;
      decretoLegislativoUrl: string;
      responsavel: string;
      numeroParecerPrevio: number;
      anoParecerPrevio: number;
      parecerPrevioJulgamentoSituacao: string;
      dataRecebimentoParecerPrevioLegislativo: string;
      arquivoAtaJulgamentoId: number;
      arquivoDecretoLegislativoId: number;
      quantidadeVereadoresExercicio: number;
      prazoJulgamentoLeiOrganicaUG: number;
      votoAberto: boolean;
      numeroDecretoLegislativo: string;
      dataJulgamento: string;
      dataTransitoJulgado: string;
      dataResultado: string;
      resultadoParecer: string;
      dados: {
        tabela: {
          nomeVereador: string;
          partidoVereador: string;
          parecerPrevioVotoTipo: string;
          registrouPresenca: string;
          votoAberto: boolean;
        }[];
        tabelaVotoFechado: null;
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
    `https://paineldecontrole.tcees.tc.br/api/PrestacaoContaControllers/JulgamentoConta/GetSumarioDetalheJulgamento?anoExercicio=${ano}&codigoEsferaAdministrativa=${codigo}&v=11-08-2023-5.2.20`
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

  return (
    <>
      <div className="flex justify-around">
        <div>
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
        <div>
          <h4 className="py-1">Julgamento pela Câmara</h4>
          <RenderField
            value={parecerPrevio.quantidadeVereadoresExercicio.toString()}
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

        <div>
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
        <RenderSessao sessao={sessao} />
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

  return (
    <>
      {groups.map(([data, sumarios]) => (
        <>
          {data && <div>{data}</div>}
          {sumarios.map((sumario) => {
            <PainelComTituloMinimizavel
              header={`PREFEITO(A) ${sumario.responsavel}`}
              headerProps={{ className: "font-bold text-xl" }}
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
            </PainelComTituloMinimizavel>;
          })}
        </>
      ))}
    </>
  );
}
