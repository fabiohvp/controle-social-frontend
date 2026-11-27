import MultiSeriesChart from "@/components/charts/MultiSeriesChart";
import SingleSeriesChart from "@/components/charts/SingleSeriesChart";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import SectionTitle from "@/components/panel/SectionTitle";
import { COLOR } from "@/theme/colors";
import { EsferaProps } from "@/shared/esfera";
import { MultiSerie, SerieItem } from "@/types/Serie";
import AvisoPagina from "@/components/gestao-fiscal/_comum/AvisoPagina";
import { getDadosApiController } from "@/components/gestao-fiscal/_comum/apiController";
import LinhaValor from "@/components/gestao-fiscal/_comum/LinhaValor";
import ValorDinheiro from "@/components/gestao-fiscal/_comum/ValorDinheiro";

type ClassificacaoIvf = {
  codigoEsferaAdministrativa: string;
  nomeEsferaAdministrativa: string;
  notaIVFBase100: number;
  ano: number;
  mes: number;
  notaLiquidez: number;
  notaLiquidezBase100: number;
  valorLiquidez: string;
  notaEndividamento: number;
  notaEndividamentoBase100: number;
  valorEndividamento: string;
  notaMargem: number;
  notaMargemBase100: number;
  valorMargem: string;
  dcBruta: number;
  rcl: number;
  dispCaixaSemRPPS: number | null;
  recCorrente: number;
  despCorrente: number;
  amortDivida: number;
  notaISP: string;
  notaISPBase100: number;
};

type GraficosMensais = {
  notaIVF: SerieItem[];
  endividamento: MultiSerie;
  liquidez: MultiSerie;
  margem: MultiSerie;
};

type GraficosAnuais = {
  notaIVF: SerieItem[];
  componentesISP: MultiSerie;
};

function CardNotaIvf({ dados }: { dados: ClassificacaoIvf | null }) {
  const nota = dados?.notaIVFBase100 ?? null;
  let statusTexto = "Sem dados";
  let corBadge = COLOR.padraoNivel5;

  if (nota !== null) {
    if (nota >= 83) {
      statusTexto = "Alta Vulnerabilidade";
      corBadge = COLOR.negativo;
    } else if (nota >= 58) {
      statusTexto = "Média Vulnerabilidade";
      corBadge = COLOR.alerta;
    } else {
      statusTexto = "Baixa Vulnerabilidade";
      corBadge = COLOR.positivo;
    }
  }

  return (
    <PanelWithDescription
      className="md:col-span-6 lg:col-span-3"
      titulo="Índice de Vulnerabilidade Fiscal"
      descricao="O Índice de Vulnerabilidade Fiscal (IVF) apura a situação fiscal do município considerando os indicadores: endividamento, liquidez, margem e o ISP."
      bodyProps={{ className: "flex-col items-center justify-center gap-2" }}
    >
      <div className="flex flex-col items-center justify-center p-4">
        <span className="text-5xl font-extrabold" style={{ color: corBadge }}>
          {nota !== null ? nota.toFixed(1).replace(".", ",") : "-"}
        </span>
        <span
          className="mt-2 rounded px-3 py-1 text-sm font-semibold text-white"
          style={{ backgroundColor: corBadge }}
        >
          {statusTexto}
        </span>
      </div>
    </PanelWithDescription>
  );
}

export default async function Ivf({ esfera, anoExercicio }: EsferaProps) {
  const [classificacao, anuais, mensais] = await Promise.all([
    getDadosApiController<ClassificacaoIvf>(
      "IVFControllers/IVF/GetClassificacaoIVF",
      esfera,
      anoExercicio
    ),
    getDadosApiController<GraficosAnuais>(
      "IVFControllers/IVF/GetGraficosEvolucaoAnualIVF",
      esfera,
      anoExercicio
    ),
    getDadosApiController<GraficosMensais>(
      "IVFControllers/IVF/GetGraficosEvolucaoMensalIVF",
      esfera,
      anoExercicio
    ),
  ]);

  return (
    <>
      <AvisoPagina>
        O Índice de Vulnerabilidade Fiscal (IVF) é calculado a partir de
        indicadores de endividamento, liquidez, margem corrente e situação
        previdenciária (ISP).
      </AvisoPagina>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pb-8">
        <CardNotaIvf dados={classificacao} />

        <PanelWithDescription
          className="md:col-span-6 lg:col-span-5"
          titulo="Evolução anual do IVF"
          descricao="Evolução anual do Índice de Vulnerabilidade Fiscal na escala de 0 a 100."
        >
          <SingleSeriesChart
            dados={anuais?.notaIVF ?? null}
            tipo="line"
            formato="numero"
            corrigirIpca={false}
            cor={COLOR["chart-alerta"]}
          />
        </PanelWithDescription>

        <PanelWithDescription
          className="md:col-span-12 lg:col-span-4"
          titulo="Evolução mensal do IVF"
          descricao="Evolução mensal do Índice de Vulnerabilidade Fiscal ao longo do exercício."
        >
          <SingleSeriesChart
            dados={mensais?.notaIVF ?? null}
            tipo="line"
            formato="numero"
            corrigirIpca={false}
            cor={COLOR["chart-positivo"]}
          />
        </PanelWithDescription>

        <SectionTitle className="col-span-12 mt-4">
          Componentes do IVF (Endividamento, Liquidez e Margem)
        </SectionTitle>

        {/* Endividamento */}
        <PanelWithDescription
          className="md:col-span-6"
          titulo="Endividamento"
          descricao="Confronto entre Dívida Consolidada Bruta e Receita Corrente Líquida."
        >
          <div className="space-y-1 mb-3">
            <LinhaValor titulo="Nota Endividamento">
              {classificacao?.valorEndividamento ?? "-"}
            </LinhaValor>
            <LinhaValor titulo="Dívida Consolidada Bruta">
              <ValorDinheiro
                valor={classificacao?.dcBruta ?? null}
                ano={anoExercicio}
              />
            </LinhaValor>
            <LinhaValor titulo="Receita Corrente Líquida">
              <ValorDinheiro
                valor={classificacao?.rcl ?? null}
                ano={anoExercicio}
              />
            </LinhaValor>
          </div>
          <MultiSeriesChart
            dados={mensais?.endividamento ?? null}
            corrigirIpca={false}
          />
        </PanelWithDescription>

        {/* Liquidez */}
        <PanelWithDescription
          className="md:col-span-6"
          titulo="Liquidez"
          descricao="Disponibilidade de Caixa (sem RPPS) vs Receita Corrente Líquida."
        >
          <div className="space-y-1 mb-3">
            <LinhaValor titulo="Nota Liquidez">
              {classificacao?.valorLiquidez ?? "-"}
            </LinhaValor>
            <LinhaValor titulo="Disponibilidade de Caixa sem RPPS">
              <ValorDinheiro
                valor={classificacao?.dispCaixaSemRPPS ?? null}
                ano={anoExercicio}
              />
            </LinhaValor>
            <LinhaValor titulo="Receita Corrente Líquida">
              <ValorDinheiro
                valor={classificacao?.rcl ?? null}
                ano={anoExercicio}
              />
            </LinhaValor>
          </div>
          <MultiSeriesChart
            dados={mensais?.liquidez ?? null}
            corrigirIpca={false}
          />
        </PanelWithDescription>

        {/* Margem */}
        <PanelWithDescription
          className="col-span-12"
          titulo="Margem Corrente"
          descricao="Receitas Correntes, Despesas Correntes e Amortização da Dívida."
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
            <LinhaValor titulo="Nota Margem">
              {classificacao?.valorMargem ?? "-"}
            </LinhaValor>
            <LinhaValor titulo="Receita Corrente">
              <ValorDinheiro
                valor={classificacao?.recCorrente ?? null}
                ano={anoExercicio}
              />
            </LinhaValor>
            <LinhaValor titulo="Despesa Corrente">
              <ValorDinheiro
                valor={classificacao?.despCorrente ?? null}
                ano={anoExercicio}
              />
            </LinhaValor>
            <LinhaValor titulo="Amortização da Dívida">
              <ValorDinheiro
                valor={classificacao?.amortDivida ?? null}
                ano={anoExercicio}
              />
            </LinhaValor>
          </div>
          <MultiSeriesChart
            dados={mensais?.margem ?? null}
            corrigirIpca={false}
          />
        </PanelWithDescription>
      </div>
    </>
  );
}
