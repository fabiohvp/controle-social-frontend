import AvisoPagina from "@/components/gestao-fiscal/_comum/AvisoPagina";
import {
  getDadosApiController,
  percentualParaNumero,
} from "@/components/gestao-fiscal/_comum/apiController";
import LinhaValor from "@/components/gestao-fiscal/_comum/LinhaValor";
import MedidorLimite, {
  COR_MEDIDOR,
  SituacaoMedidor,
} from "@/components/gestao-fiscal/_comum/MedidorLimite";
import NotaCirculo from "@/components/gestao-fiscal/_comum/NotaCirculo";
import ValorDinheiro from "@/components/gestao-fiscal/_comum/ValorDinheiro";
import MultiSeriesChart from "@/components/charts/MultiSeriesChart";
import SingleSeriesChart from "@/components/charts/SingleSeriesChart";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import SectionTitle from "@/components/panel/SectionTitle";
import { EsferaProps } from "@/shared/esfera";
import { COLOR } from "@/theme/colors";
import { MultiSerie, SerieItem } from "@/types/Serie";
import { getUrlBaseMunicipio } from "../../../routes";

/*
 * Gestão fiscal > Índice de Vulnerabilidade Fiscal (site oficial:
 * IndiceVulnerabilidadeFiscal). API: IVFControllers/IVF. Só existe para município.
 */

type Classificacao = {
  notaIVFBase100: number;
  notaEndividamentoBase100: number;
  notaLiquidezBase100: number;
  notaMargemBase100: number;
  notaISPBase100: number;
  valorEndividamento: string;
  valorLiquidez: string;
  valorMargem: string;
  dcBruta: number;
  rcl: number;
  dispCaixaSemRPPS: number | null;
  recCorrente: number;
  despCorrente: number;
  amortDivida: number;
};

type ClassificacaoIsp = {
  notaPadraoISP: string;
  notaPadraoISPGestaoTransparencia: string;
  notaPadraoISPSituacaoFinanceira: string;
  notaPadraoISPSituacaoAtuarial: string;
};

type GraficosMensais = {
  notaIVF: SerieItem[];
  endividamento: MultiSerie;
  liquidez: MultiSerie;
  margem: MultiSerie;
};

type GraficosAnuais = {
  notaIVF: SerieItem[];
  componentesISP: Omit<MultiSerie, "series"> & {
    series: { name: string; values: (number | null)[]; displayValues?: (string | null)[] }[];
  };
};

const FAIXAS_RESULTADO = [
  { faixa: "A partir de 32", nivel: "Baixo", cor: "#c8e6c9" },
  { faixa: "A partir de 57", nivel: "Médio", cor: "#fff9c4" },
  { faixa: "A partir de 82", nivel: "Alto", cor: COLOR["chart-negativo"] },
];

function CardComponentes({
  titulo,
  descricao,
  valores,
  ano,
}: {
  titulo: string;
  descricao: string;
  valores: { valor: number | null | undefined; legenda: string }[];
  ano: number;
}) {
  return (
    <PanelWithDescription
      className="md:col-span-6 lg:col-span-3"
      titulo={titulo}
      descricao={descricao}
      bodyProps={{
        className: "flex-col items-center justify-center gap-1 text-center",
      }}
    >
      {valores.map((item, indice) => (
        <div key={item.legenda} className="flex flex-col items-center">
          {indice > 0 && <hr className="my-1 w-full" />}
          <ValorDinheiro
            valor={item.valor}
            ano={ano}
            className={indice === 0 ? "text-2xl" : "text-lg"}
          />
          <span className="text-xs text-gray-medium">({item.legenda})</span>
        </div>
      ))}
    </PanelWithDescription>
  );
}

export default async function IndiceVulnerabilidadeFiscal({
  esfera,
  anoExercicio,
}: EsferaProps) {
  const get = <T,>(recurso: string) =>
    getDadosApiController<T>(`IVFControllers/IVF/${recurso}`, esfera, anoExercicio);

  const [classificacao, isp, mensais, anuais] = await Promise.all([
    get<Classificacao>("GetClassificacaoIVF"),
    get<ClassificacaoIsp>("GetClassificacaoISP"),
    get<GraficosMensais>("GetGraficosEvolucaoMensalIVF"),
    get<GraficosAnuais>("GetGraficosEvolucaoAnualIVF"),
  ]);

  const endividamento = percentualParaNumero(classificacao?.valorEndividamento);
  const liquidez = percentualParaNumero(classificacao?.valorLiquidez);
  const margem = percentualParaNumero(classificacao?.valorMargem);

  const notaIvf = classificacao?.notaIVFBase100;
  const situacaoIvf: SituacaoMedidor =
    notaIvf === undefined ? "ok" : notaIvf >= 83 ? "ruim" : notaIvf >= 58 ? "alerta" : "ok";
  const corNotaIvf =
    situacaoIvf === "ruim"
      ? COLOR.negativo
      : situacaoIvf === "alerta"
        ? COLOR["chart-alerta"]
        : COLOR["chart-positivo"];

  const componentesIsp = anuais?.componentesISP;
  const urlPrevidencia = `${getUrlBaseMunicipio(
    String(anoExercicio),
    "__municipio__"
  )}`;
  void urlPrevidencia;

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
      <PanelWithDescription
        className="md:col-span-12"
        titulo="Índice de Vulnerabilidade Fiscal (IVF)"
        bodyProps={{ className: "flex-col gap-3 text-sm lg:flex-row" }}
      >
        <p className="lg:w-7/12">
          O <b>IVF</b>, criado pelo TCEES em 2021, tem o objetivo de avaliar e
          apresentar o grau de vulnerabilidade das finanças municipais à
          ocorrência de eventos, denominados riscos fiscais, que possam afetar
          negativamente a trajetória das contas públicas, comprometendo o
          alcance das metas estabelecidas, ou, na ausência ou inconsistência
          dessas metas, comprometer a sustentabilidade fiscal do ente. Ele é
          baseado nos indicadores: Endividamento, Liquidez, Margem e Situação
          Previdenciária (ISP).
          <br />
          <b>Saiba mais acessando os relatórios: </b>
          <a
            className="underline"
            href="https://www.tcees.tc.br/wp-content/uploads/formidable/130/Indicador-de-Vulnerabilidade-Fiscal-dos-municipios-capixabas-2019-e-2020.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            IVF 2019/2020
          </a>
          ,{" "}
          <a
            className="underline"
            href="https://www.tcees.tc.br/wp-content/uploads/formidable/130/Informe-NATR-3-IVF-2021-e-evolucao.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            IVF 2019/2021
          </a>
          ,{" "}
          <a
            className="underline"
            href="https://www.tcees.tc.br/wp-content/uploads/formidable/130/Informativo-NATR-1-2023-IVF-2022.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            IVF 2019/2022
          </a>
          .
        </p>
        <table className="text-center lg:w-5/12">
          <thead>
            <tr className="border-b">
              <th className="p-2">Faixa de Resultado (Nota)</th>
              <th className="p-2">Nível de Vulnerabilidade</th>
            </tr>
          </thead>
          <tbody>
            {FAIXAS_RESULTADO.map((item) => (
              <tr key={item.nivel} className="border-b">
                <td className="p-2">{item.faixa}</td>
                <td className="p-2">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold text-black"
                    style={{ backgroundColor: item.cor }}
                  >
                    {item.nivel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </PanelWithDescription>

      <SectionTitle>Índice de Vulnerabilidade Fiscal</SectionTitle>
      <PanelWithDescription
        className="md:col-span-6 lg:col-span-3"
        titulo="Índice de vulnerabilidade fiscal"
        descricao={
          <>
            O Índice de Vulnerabilidade Fiscal (IVF) apura a situação fiscal do
            município, considerando os indicadores: endividamento, liquidez,
            margem e o ISP.
            <br />
            As notas de cada indicador podem ser: “Baixa = 1”, “Média = 2” e
            “Alta = 3”.
            <br />
            Como são 4 indicadores, a nota geral pode variar entre 4 a 12, sendo
            a primeira terça parte com nota geral de 4 a 6 (“Baixa”), a segunda
            terça parte com nota geral entre 7 e 9 (“Média”) e a terceira terça
            parte variando de 10 a 12 (“Alta”).
            <br />A nota geral foi transformada em escala de 100, via regra de
            três, para facilitar a comunicação: alta vulnerabilidade (nota geral
            entre 82 a 100); média vulnerabilidade (nota geral entre 57 a 76); e
            baixa vulnerabilidade (nota geral entre 32 a 51).
          </>
        }
        bodyProps={{ className: "flex-col items-center justify-center gap-2" }}
      >
        {classificacao ? (
          <>
            <span
              className="text-4xl font-extrabold"
              style={{ color: corNotaIvf }}
            >
              {classificacao.notaIVFBase100}
            </span>
            <LinhaValor titulo="Endividamento">
              {classificacao.notaEndividamentoBase100}
            </LinhaValor>
            <LinhaValor titulo="Liquidez">
              {classificacao.notaLiquidezBase100}
            </LinhaValor>
            <LinhaValor titulo="Margem">{classificacao.notaMargemBase100}</LinhaValor>
            <LinhaValor titulo="ISP">{classificacao.notaISPBase100}</LinhaValor>
          </>
        ) : (
          <span className="text-gray-medium text-sm">Informação indisponível</span>
        )}
      </PanelWithDescription>
      <PanelWithDescription
        className="md:col-span-6 lg:col-span-5"
        titulo="Evolução anual do IVF"
        descricao="Evolução anual do Índice de Vulnerabilidade Fiscal."
      >
        <SingleSeriesChart
          dados={anuais?.notaIVF ?? null}
          formato="numero"
          tipo="bar"
        />
      </PanelWithDescription>
      <PanelWithDescription
        className="md:col-span-12 lg:col-span-4"
        titulo="Evolução mensal do IVF"
        descricao="Evolução mensal do Índice de Vulnerabilidade Fiscal."
      >
        <SingleSeriesChart
          dados={mensais?.notaIVF ?? null}
          formato="numero"
          tipo="bar"
        />
      </PanelWithDescription>

      <SectionTitle>Indicadores</SectionTitle>
      <CardComponentes
        titulo="Componentes de endividamento"
        descricao="O Endividamento é calculado pela divisão entre Dívida Consolidada Bruta e Receita Corrente Líquida."
        valores={[
          { valor: classificacao?.dcBruta, legenda: "dívida consolidada bruta" },
          { valor: classificacao?.rcl, legenda: "receita corrente líquida" },
        ]}
        ano={anoExercicio}
      />
      <MedidorLimite
        className="md:col-span-6 lg:col-span-3"
        titulo="Endividamento"
        valor={endividamento}
        max={24}
        faixas={[
          { ate: 20, cor: COR_MEDIDOR.ok, rotulo: "20%" },
          { ate: 60, cor: COR_MEDIDOR.alerta, rotulo: "60%" },
          { ate: 24, cor: COR_MEDIDOR.ruim },
        ]}
        situacao={
          endividamento === null ? "ok" : endividamento > 60 ? "ruim" : endividamento >= 20 ? "alerta" : "ok"
        }
        legenda="8, se < 20%; 17, se ≥ 20% e ≤ 60%; 25, se > 60%"
        nomeMedidor="Endividamento"
      />
      <PanelWithDescription
        className="lg:col-span-6"
        titulo="Evolução mensal do endividamento"
        descricao="Evolução mensal da Dívida Consolidada Bruta e da Receita Corrente Líquida."
      >
        <MultiSeriesChart
          dados={mensais?.endividamento ?? null}
          corrigirIpca={anoExercicio}
        />
      </PanelWithDescription>

      <CardComponentes
        titulo="Componentes de liquidez"
        descricao="A Liquidez é calculada pela divisão entre Disponibilidade de Caixa sem RPPS e Receita Corrente Líquida."
        valores={[
          {
            valor: classificacao?.dispCaixaSemRPPS,
            legenda: "disponibilidade de caixa sem RPPS",
          },
          { valor: classificacao?.rcl, legenda: "receita corrente líquida" },
        ]}
        ano={anoExercicio}
      />
      <MedidorLimite
        className="md:col-span-6 lg:col-span-3"
        titulo="Liquidez"
        valor={liquidez}
        max={60}
        faixas={[
          { ate: 10, cor: COR_MEDIDOR.ruim, rotulo: "10%" },
          { ate: 25, cor: COR_MEDIDOR.alerta, rotulo: "25%" },
          { ate: 60, cor: COR_MEDIDOR.ok },
        ]}
        situacao={
          liquidez === null ? "ok" : liquidez < 10 ? "ruim" : liquidez <= 25 ? "alerta" : "ok"
        }
        legenda="8, se > 25%; 17, se ≤ 25% e ≥ 10%; 25, se < 10%"
        nomeMedidor="Liquidez"
      />
      <PanelWithDescription
        className="lg:col-span-6"
        titulo="Evolução mensal da liquidez"
        descricao="Evolução mensal da Disponibilidade de Caixa sem RPPS e da Receita Corrente Líquida."
      >
        <MultiSeriesChart
          dados={mensais?.liquidez ?? null}
          corrigirIpca={anoExercicio}
        />
      </PanelWithDescription>

      <CardComponentes
        titulo="Componentes de margem"
        descricao="A Margem é calculada pela fórmula: (Receita Corrente – Despesa Corrente – Amortização da Divida) / Receita Corrente"
        valores={[
          { valor: classificacao?.recCorrente, legenda: "receita corrente" },
          { valor: classificacao?.despCorrente, legenda: "despesa corrente" },
          { valor: classificacao?.amortDivida, legenda: "amortização da dívida" },
        ]}
        ano={anoExercicio}
      />
      <MedidorLimite
        className="md:col-span-6 lg:col-span-3"
        titulo="Margem"
        valor={margem}
        max={30}
        faixas={[
          { ate: 5, cor: COR_MEDIDOR.ruim, rotulo: "5%" },
          { ate: 15, cor: COR_MEDIDOR.alerta, rotulo: "15%" },
          { ate: 30, cor: COR_MEDIDOR.ok },
        ]}
        situacao={
          margem === null ? "ok" : margem < 5 ? "ruim" : margem <= 15 ? "alerta" : "ok"
        }
        legenda="8, se > 15%; 17, se ≤ 15% e ≥ 5%; 25, se < 5%"
        nomeMedidor="Margem"
      />
      <PanelWithDescription
        className="lg:col-span-6"
        titulo="Evolução mensal da margem"
        descricao="Evolução mensal da Receita Corrente, Despesa Corrente e Amortização da Dívida."
      >
        <MultiSeriesChart
          dados={mensais?.margem ?? null}
          corrigirIpca={anoExercicio}
        />
      </PanelWithDescription>

      <PanelWithDescription
        className="md:col-span-6 lg:col-span-3"
        titulo="Componentes de ISP"
        descricao={
          <>
            O Índice de Situação Previdenciária (ISP) do Ministério da
            Previdência Social busca avaliar a situação dos regimes próprios de
            previdência (RPPS). O indicador é baseado nas notas de seus três
            componentes:
            <br />- Gestão e Transparência
            <br />- Situação Financeira
            <br />- Situação Atuarial
            <br />
            <br />
            Para os municípios vinculados ao Regime Geral de Previdência,
            atribuiu-se “nota” B para Sustentabilidade Previdenciária diante da
            limitação sobre informações da existência ou não de parcelamentos e
            adimplência.
          </>
        }
        bodyProps={{ className: "flex-col items-center justify-center gap-2" }}
      >
        {isp ? (
          <>
            <NotaCirculo nota={isp.notaPadraoISP} tamanho={56} />
            <LinhaValor titulo="Gestão e Transparência">
              {isp.notaPadraoISPGestaoTransparencia}
            </LinhaValor>
            <LinhaValor titulo="Situação Atuarial">
              {isp.notaPadraoISPSituacaoAtuarial}
            </LinhaValor>
            <LinhaValor titulo="Situação Financeira">
              {isp.notaPadraoISPSituacaoFinanceira}
            </LinhaValor>
          </>
        ) : (
          <span className="text-gray-medium text-sm">Informação indisponível</span>
        )}
      </PanelWithDescription>
      <PanelWithDescription
        className="md:col-span-6 lg:col-span-3"
        titulo="Pontuação do ISP no IVF"
        bodyProps={{ className: "flex-col items-center justify-center gap-2" }}
      >
        {isp ? (
          <>
            <NotaCirculo nota={isp.notaPadraoISP} tamanho={56} />
            <p className="text-center text-xs text-gray-medium">
              8, se A; 17, se B ou N; 25, se C ou D
            </p>
          </>
        ) : (
          <span className="text-gray-medium text-sm">Informação indisponível</span>
        )}
      </PanelWithDescription>
      <PanelWithDescription
        className="lg:col-span-6"
        titulo="Evolução anual do ISP"
        descricao="Evolução anual dos componentes de ISP. O ISP é calculado anualmente, diferente dos demais indicadores. Por isso, o ano corrente pode ainda não estar disponível."
        bodyProps={{ className: "overflow-x-auto" }}
      >
        {componentesIsp?.series?.length ? (
          <table className="w-full text-center text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2" />
                {componentesIsp.labels.map((label) => (
                  <th key={label} className="p-2">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {componentesIsp.series.map((serie) => (
                <tr key={serie.name} className="border-b">
                  <th className="p-2">{serie.name}</th>
                  {componentesIsp.labels.map((label, indice) => (
                    <td key={label} className="p-1">
                      <NotaCirculo nota={serie.displayValues?.[indice]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <span className="text-gray-medium m-auto text-sm">
            Informação indisponível
          </span>
        )}
      </PanelWithDescription>

      <AvisoPagina>
        Para maiores informações sobre o <b>ISP</b>, acesse a página de
        previdência do município (situação previdenciária) no painel oficial.
      </AvisoPagina>
    </div>
  );
}
