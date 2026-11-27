import MultiSeriesChart from "@/components/charts/MultiSeriesChart";
import SingleSeriesChart from "@/components/charts/SingleSeriesChart";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import { EsferaProps, getDadosApiEsfera } from "@/shared/esfera";
import { COLOR } from "@/theme/colors";
import { MultiSerie, SerieItem } from "@/types/Serie";
import AvisoPagina from "../_comum/AvisoPagina";
import LinhaValor from "../_comum/LinhaValor";
import MedidorLimite, { COR_MEDIDOR, SituacaoMedidor } from "../_comum/MedidorLimite";
import ValorDinheiro from "../_comum/ValorDinheiro";

/*
 * Gestão fiscal > Despesas correntes x receitas correntes (site oficial:
 * DespesasReceitas). Controller: <Municipio|Estado>Controllers/LimiteDespesaReceita.
 * Art. 167-A da CF: ajuste fiscal a partir de 85% e limite de 95%.
 */

const DESCRICAO_RELACAO =
  "Evolução da relação entre despesas correntes e receitas correntes, conforme art. 167-A da Constituição Federal de 1988.";
const DESCRICAO_VALORES =
  "Evolução das despesas correntes e das receitas correntes.";

type Limite = { valorApurado: string; valorAlerta: number; valorMaximo: number };
type Valor = { receitaCorrente: number; despesaCorrente: number };

export default async function DespesasCorrentesXReceitasCorrentes({
  esfera,
  anoExercicio,
}: EsferaProps) {
  const get = <T,>(recurso: string) =>
    getDadosApiEsfera<T>(esfera, anoExercicio, `LimiteDespesaReceita/${recurso}`);

  const [limite, valor, relacaoMensal, relacaoAnual, valoresMensal, valoresAnual] =
    await Promise.all([
      get<Limite>("GetLimiteDespesaReceita"),
      get<Valor>("GetValorDespesaReceita"),
      get<SerieItem[]>("GetEvolucaoMensalLimiteDespesaReceita"),
      get<SerieItem[]>("GetEvolucaoAnualLimiteDespesaReceita"),
      get<MultiSerie>("GetEvolucaoMensalValorDespesaReceita"),
      get<MultiSerie>("GetEvolucaoAnualValorDespesaReceita"),
    ]);

  const apurado = limite ? Number(limite.valorApurado.replace(",", ".")) : null;
  const alerta = limite?.valorAlerta ?? 85;
  const maximo = limite?.valorMaximo ?? 95;
  const escala = Math.round(maximo * 1.1 * 100) / 100;

  let situacao: SituacaoMedidor = "ok";
  let texto: string | undefined;
  if (apurado !== null) {
    if (apurado > maximo) {
      situacao = "ruim";
      texto = `Despesas correntes ultrapassaram ${maximo}% das receitas correntes`;
    } else if (apurado >= alerta) {
      situacao = "alerta";
      texto = `Despesas correntes ultrapassaram ${alerta}% das receitas correntes`;
    } else {
      texto = `Despesas correntes não superam ${alerta}% das receitas correntes`;
    }
  }

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
      <MedidorLimite
        className="md:col-span-4"
        titulo="Relação despesas correntes x receitas correntes"
        descricao="As despesas correntes não devem superar 95% das receitas correntes. Mesmo não atingindo essa relação, caso as despesas correntes superem 85% das receitas correntes, o mecanismo de ajuste fiscal já pode ser adotado (art. 167-A da Constituição Federal de 1988)."
        valor={apurado !== null && !Number.isNaN(apurado) ? apurado : null}
        max={escala}
        faixas={[
          { ate: alerta, cor: COR_MEDIDOR.ok, rotulo: `${alerta}%` },
          { ate: maximo, cor: COR_MEDIDOR.alerta, rotulo: `${maximo}%` },
          { ate: escala, cor: COR_MEDIDOR.ruim },
        ]}
        situacao={situacao}
        texto={texto}
        nomeMedidor="Despesas / receitas correntes"
      />
      <PanelWithDescription
        className="md:col-span-8"
        titulo="Evolução mensal da relação entre despesas correntes e receitas correntes"
        descricao={DESCRICAO_RELACAO}
      >
        <SingleSeriesChart dados={relacaoMensal} formato="percentual" />
      </PanelWithDescription>
      <PanelWithDescription
        className="md:col-span-12"
        titulo="Evolução anual da relação entre despesas correntes e receitas correntes"
        descricao={DESCRICAO_RELACAO}
      >
        <SingleSeriesChart dados={relacaoAnual} formato="percentual" />
      </PanelWithDescription>

      <PanelWithDescription
        className="md:col-span-3"
        titulo="Despesas correntes e receitas correntes"
        descricao="A relação percentual é obtida a partir dos valores de despesas correntes e receitas correntes aqui apresentados."
        bodyProps={{ className: "flex-col items-center justify-center gap-2" }}
      >
        <LinhaValor titulo="Despesa">
          <ValorDinheiro
            valor={valor?.despesaCorrente}
            ano={anoExercicio}
            className="text-lg"
          />
        </LinhaValor>
        <hr className="w-full" />
        <LinhaValor titulo="Receita">
          <ValorDinheiro
            valor={valor?.receitaCorrente}
            ano={anoExercicio}
            className="text-lg"
          />
        </LinhaValor>
      </PanelWithDescription>
      <PanelWithDescription
        className="md:col-span-9"
        titulo="Evolução mensal de despesas correntes e receitas correntes"
        descricao={DESCRICAO_VALORES}
      >
        <MultiSeriesChart
          dados={valoresMensal}
          tipos={["line", "line"]}
          cores={[COLOR.receita, COLOR.despesa]}
          corrigirIpca={anoExercicio}
        />
      </PanelWithDescription>
      <PanelWithDescription
        className="md:col-span-12"
        titulo="Evolução anual de despesas correntes e receitas correntes"
        descricao={DESCRICAO_VALORES}
      >
        <MultiSeriesChart
          dados={valoresAnual}
          tipos={["line", "line"]}
          cores={[COLOR.receita, COLOR.despesa]}
        />
      </PanelWithDescription>

      <AvisoPagina>
        A apuração da relação entre a receita corrente e a despesa corrente
        considera 12 (doze) meses móveis no mesmo formato da apuração da Receita
        Corrente Líquida - RCL e da despesa total com pessoal apurada para fins
        dos limites previstos na Lei de Responsabilidade Fiscal - LRF.
        <br />
        <br />
        Para fins de cálculo, foram utilizados os dados das receitas correntes
        e despesas correntes, exceto intraorçamentárias (Nota Técnica 005/2021
        da Secretaria Geral de Controle Externo do TCE-ES).
      </AvisoPagina>
    </div>
  );
}
