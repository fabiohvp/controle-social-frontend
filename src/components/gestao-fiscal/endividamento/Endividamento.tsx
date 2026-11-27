import SingleSeriesChart from "@/components/charts/SingleSeriesChart";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import SectionTitle from "@/components/panel/SectionTitle";
import { EsferaProps, getDadosApiEsfera } from "@/shared/esfera";
import { SerieItem } from "@/types/Serie";
import MedidorLimite, { COR_MEDIDOR, SituacaoMedidor } from "../_comum/MedidorLimite";
import ValorDinheiro from "../_comum/ValorDinheiro";

/*
 * Gestão fiscal > Endividamento (site oficial: Endividamento,
 * gestaoFiscal-endividamentoMunicipio). Controller: <Municipio|Estado>Controllers/Endividamento.
 * Dívida consolidada líquida (DCL): alerta em 108% e limite de 120% da RCL
 * (LRF e Resolução 40/2001 do Senado Federal).
 */

const LIMITE_ALERTA = 108;
const LIMITE_MAXIMO = 120;
const ESCALA_MEDIDOR = 144;

type DividaAnual = {
  valores: { declarado: number; valor: number; valorPercentual: number };
};

export default async function Endividamento({
  esfera,
  anoExercicio,
}: EsferaProps) {
  const get = <T,>(recurso: string) =>
    getDadosApiEsfera<T>(esfera, anoExercicio, `Endividamento/${recurso}`);

  const [divida, mensal, anual, percentual] = await Promise.all([
    get<DividaAnual>("GetDividaConsolidadaLiquidaAnual"),
    // no site oficial: "Evolução Mensal" (nome do método é enganoso)
    get<SerieItem[]>("GetEvolucaoAnualDividaConsolidadaLiquida"),
    get<SerieItem[]>("GetEvolucaoDividaConsolidadaLiquida"),
    get<SerieItem[]>("GetEvolucaoPercentualDividaConsolidadaLiquida"),
  ]);

  const valores = divida?.valores;
  const valorPercentual = valores?.valorPercentual ?? null;

  let situacao: SituacaoMedidor = "ok";
  let texto: string | undefined;
  if (valorPercentual !== null) {
    if (valorPercentual > LIMITE_MAXIMO) {
      situacao = "ruim";
      texto = `Tende a ultrapassar o limite máximo de ${LIMITE_MAXIMO}% da RCL`;
    } else if (valorPercentual >= LIMITE_ALERTA) {
      situacao = "alerta";
      texto = `Tende a ultrapassar o limite de alerta de ${LIMITE_ALERTA}% da RCL`;
    } else {
      texto = `Tende a obedecer ao limite de ${LIMITE_MAXIMO}% da RCL`;
    }
  }

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
      <SectionTitle>Dívida Consolidada Líquida</SectionTitle>
      <PanelWithDescription
        className="md:col-span-3"
        titulo="Valor"
        descricao="O valor demonstra a Dívida Consolidada Líquida (DCL) do município, conforme definido no art. 1º, § 1º na Resolução nº 40/2001 do Senado Federal. A DCL é positiva quando a dívida pública supera as disponibilidades de caixa, as aplicações e os demais haveres financeiros; e negativa, quando ocorre o inverso."
        bodyProps={{ className: "items-center justify-center" }}
      >
        <ValorDinheiro valor={valores?.valor} ano={anoExercicio} />
      </PanelWithDescription>
      <MedidorLimite
        className="md:col-span-3"
        titulo="Limite da LRF"
        descricao="De acordo com a LRF (Lei de Responsabilidade Fiscal) e Resolução 40/2001 (Senado Federal) a dívida consolidada líquida municipal não pode ultrapassar 120% da RCL (Receita Corrente Líquida) do município."
        valor={valorPercentual}
        max={ESCALA_MEDIDOR}
        faixas={[
          {
            ate: LIMITE_ALERTA,
            cor: COR_MEDIDOR.ok,
            rotulo: `${LIMITE_ALERTA}%`,
          },
          {
            ate: LIMITE_MAXIMO,
            cor: COR_MEDIDOR.alerta,
            rotulo: `${LIMITE_MAXIMO}%`,
          },
          { ate: ESCALA_MEDIDOR, cor: COR_MEDIDOR.ruim },
        ]}
        situacao={situacao}
        texto={texto}
        nomeMedidor="Dívida consolidada líquida"
      />
      <PanelWithDescription
        className="md:col-span-6"
        titulo="Evolução mensal"
        descricao="O gráfico demonstra o comportamento da Dívida Consolidada Líquida durante os meses."
      >
        <SingleSeriesChart dados={mensal} />
      </PanelWithDescription>
      <PanelWithDescription
        className="md:col-span-6"
        titulo="Evolução anual"
        descricao="O gráfico demonstra o comportamento da Dívida Consolidada Líquida durante os cinco últimos anos."
      >
        <SingleSeriesChart dados={anual} />
      </PanelWithDescription>
      <PanelWithDescription
        className="md:col-span-6"
        titulo="Evolução percentual anual"
        descricao="O gráfico demonstra, em percentuais, o comportamento da Dívida Consolidada Líquida durante os cinco últimos anos."
      >
        <SingleSeriesChart dados={percentual} formato="percentual" />
      </PanelWithDescription>
    </div>
  );
}
