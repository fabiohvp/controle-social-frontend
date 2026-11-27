import DoughnutChart from "@/components/charts/DoughnutChart";
import RankingBarChart from "@/components/charts/RankingBarChart";
import AlertPanel from "@/components/panel/AlertPanel";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import { getMunicipios } from "@/shared/municipio";
import Link from "next/link";
import {
  AcaoTransparencia,
  ControllerTransparencia,
  FAIXAS_TRANSPARENCIA,
  RankingEsferaAdministrativa,
  RankingUnidadeGestora,
  getCor,
  getFaixa,
  getRankingTransparencia,
} from "../_shared/transparencia";

type Props = {
  acao: AcaoTransparencia;
  ano: string;
  controller: ControllerTransparencia;
};

const SEM_DADOS = (
  <AlertPanel type="warning">
    <strong>Ranking inexistente para esse ano.</strong>
    <br />
    As informações necessárias para a criação do ranking não estão disponíveis.
  </AlertPanel>
);

// a nota do controle interno é pontuada de 0 a 84, convertida para percentual
const PONTUACAO_MAXIMA_CONTROLE_INTERNO = 84;

export async function RankingMunicipios({ acao, ano, controller }: Props) {
  const [dados, municipios] = await Promise.all([
    getRankingTransparencia<RankingEsferaAdministrativa>(controller, acao, ano),
    getMunicipios(),
  ]);

  if (!dados?.length) {
    return SEM_DADOS;
  }

  const isControleInterno = controller === "TransparenciaControleInterno";
  const itens = dados
    .map((dado) => {
      const municipio = municipios.find(
        (o) => o.codigo === dado.codigoEsferaAdministrativa,
      );
      const valor =
        isControleInterno && dado.valor !== null
          ? (dado.valor * 100) / PONTUACAO_MAXIMA_CONTROLE_INTERNO
          : dado.valor;
      return {
        color: getCor(valor),
        label: `${dado.posicao}º - ${dado.nomeEsferaAdministrativa}`,
        link: municipio
          ? `/municipio/${ano}/${municipio.nomeNormalizado}/visao-geral`
          : undefined,
        nome: dado.nomeEsferaAdministrativa,
        omisso: !dado.valor,
        value: valor ?? 0,
      };
    })
    .sort((a, b) => b.value - a.value || a.nome.localeCompare(b.nome));

  const omissos = itens.filter((o) => o.omisso);
  // no controle interno os omissos não entram no gráfico, apenas na lista
  const barras = isControleInterno ? itens.filter((o) => !o.omisso) : itens;
  const faixas = FAIXAS_TRANSPARENCIA.map((faixa) => ({
    name: faixa.descricao,
    value: itens.filter((o) => !o.omisso && getFaixa(o.value) === faixa).length,
  }));

  return (
    <div className="grid gap-2 grid-cols-1 lg:grid-cols-12 items-start">
      <PanelWithTitle
        className="lg:col-span-7"
        header="Ranking"
        bodyProps={{ className: "block" }}
      >
        <RankingBarChart items={barras} />
      </PanelWithTitle>
      <div className="lg:col-span-5 flex flex-col gap-2">
        <PanelWithTitle header="Municípios por faixa">
          <DoughnutChart
            colors={FAIXAS_TRANSPARENCIA.map((o) => o.cor)}
            items={faixas}
            label={{ show: false } as any}
            legend={{ bottom: 0, left: "center", orient: "vertical" }}
            style={{ height: "300px", width: "100%" }}
            tooltip={{
              formatter: "{b}<br/><b>{c}</b> município(s) ({d}%)",
            }}
          />
        </PanelWithTitle>
        {omissos.length > 0 && (
          <AlertPanel type="warning">
            <OmissosAviso ano={ano} controller={controller} acao={acao} />
            <ol className="list-decimal pl-6 mt-1">
              {omissos.map((o) => (
                <li key={o.nome}>
                  {o.link ? (
                    <Link className="underline" href={o.link}>
                      {o.nome}
                    </Link>
                  ) : (
                    o.nome
                  )}
                </li>
              ))}
            </ol>
          </AlertPanel>
        )}
      </div>
    </div>
  );
}

export async function RankingEstado({ acao, ano, controller }: Props) {
  const dados = await getRankingTransparencia<RankingUnidadeGestora>(
    controller,
    acao,
    ano,
  );

  if (!dados?.length) {
    return SEM_DADOS;
  }

  const itens = dados
    .map((dado) => ({
      color: getCor(dado.valor),
      label: `${dado.posicao}º - ${dado.nomeUnidadeGestora}`,
      value: dado.valor ?? 0,
    }))
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label));

  return (
    <PanelWithTitle
      header="Ranking"
      bodyProps={{ className: "block" }}
      className="lg:w-2/3"
    >
      <RankingBarChart items={itens} labelWidth={420} />
    </PanelWithTitle>
  );
}

function OmissosAviso({ ano, controller, acao }: Props) {
  if (
    controller === "TransparenciaControleInterno" &&
    acao.endsWith("Legislativo") &&
    ano === "2015"
  ) {
    return (
      <p>
        Nos termos da Res. TC 227/2011, as Câmaras Municipais, que funcionam
        exclusivamente com os repasses financeiros efetuados pelo Poder
        Executivo e são sujeitas a limites constitucionais e legais, poderá ser
        dispensável a criação de estrutura própria de controle, para evitar que
        o custo seja maior que o benefício. Esta foi a situação declarada pelas
        seguintes Câmaras Municipais:
      </p>
    );
  }
  return (
    <p>
      <strong>Não enviaram dados ou enviaram parcialmente:</strong>
    </p>
  );
}
