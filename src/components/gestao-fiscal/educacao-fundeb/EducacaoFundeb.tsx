import MultiSeriesChart from "@/components/charts/MultiSeriesChart";
import SingleSeriesChart from "@/components/charts/SingleSeriesChart";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import { formatFloat, formatMoney } from "@/formatters/number";
import { ENV } from "@/shared/env";
import { EsferaProps, getDadosApiEsfera } from "@/shared/esfera";
import { getMunicipios } from "@/shared/municipio";
import { cache } from "react";
import { MultiSerie, SerieItem } from "@/types/Serie";
import DonutValores from "../_comum/DonutValores";
import LinhaValor from "../_comum/LinhaValor";
import MedidorLimite from "../_comum/MedidorLimite";
import ValorDinheiro from "../_comum/ValorDinheiro";
import {
  getFaixasLimiteMinimo,
  getSituacaoLimiteMinimo,
  isExercicioEncerrado,
} from "../_comum/situacaoLimite";
import TabelaDestinadoRecebido from "./TabelaDestinadoRecebido";

/*
 * Gestão fiscal > Educação - FUNDEB (site oficial: Fundeb,
 * gestaoFiscalMunicipio-educacao). Controllers: <Municipio|Estado>Controllers/Receita
 * (valores do FUNDEB) e /Educacao (aplicação em profissionais da educação e VAAT).
 */

type RecebidoEnviado = { recebido: number; enviado: number };
type Donut = { name: string; value: number }[];
type SumarioEducacao = {
  aplicacaoPercentualMagisterioComputada: number;
  receitaArrecadadaFUNDEB: number;
};

type IndicadorVaat = {
  aplicado: number;
  exigido: number;
  percentualAplicado: number;
  percentualExigido: number;
};

const DESCRICAO_PROFISSIONAIS =
  "Até 2020 a Constituição Federal estabelecia que pelo menos 60% do Fundeb devem ser destinados ao pagamento de profissionais da educação básica que estão em atividade dentro da escola, tais como professores, coordenadores e diretores. A partir de 2021, o percentual passou a ser de 70%.";

/** Limite mínimo de aplicação do FUNDEB em profissionais da educação básica */
export function getLimiteProfissionais(anoExercicio: number) {
  return anoExercicio < 2021 ? 60 : 70;
}

type RegistroMunicipio = {
  codigoEsferaAdministrativa: string;
  enviado: { mes: number; valor: number }[];
  recebido: { mes: number; valor: number }[];
};

/** Destinado x recebido de todos os municípios (sem idEsferaAdministrativa) */
const getTabelaMunicipios = cache(
  async (anoExercicio: number): Promise<RegistroMunicipio[] | null> => {
    try {
      const res = await fetch(
        `${ENV.apiUrl}/MunicipioControllers/Receita/GetTotalRecebidoXEnvidadoFundebMunicipiosMensal?anoExercicio=${anoExercicio}&v=${ENV.apiVersion}`
      );
      if (!res.ok) return null;
      const texto = await res.text();
      return texto ? (JSON.parse(texto) as RegistroMunicipio[]) : null;
    } catch {
      return null;
    }
  }
);

function getUltimoValor(serie: SerieItem[] | null) {
  return serie?.length ? (serie[serie.length - 1].valor ?? 0) : 0;
}

async function getIndicadorVaat(
  { esfera, anoExercicio }: EsferaProps,
  prefixo: string
): Promise<IndicadorVaat> {
  const get = (sufixo: string) =>
    getDadosApiEsfera<SerieItem[]>(
      esfera,
      anoExercicio,
      `Educacao/GetIndicadores${prefixo}${sufixo}Anual`
    );
  const [aplicado, exigido, percentualAplicado, percentualExigido] =
    await Promise.all([
      get("Aplicado"),
      get("Exigido"),
      get("PercentualAplicado"),
      get("PercentualExigido"),
    ]);
  return {
    aplicado: getUltimoValor(aplicado),
    exigido: getUltimoValor(exigido),
    percentualAplicado: getUltimoValor(percentualAplicado),
    percentualExigido: getUltimoValor(percentualExigido),
  };
}

async function CardVaat({
  esfera,
  anoExercicio,
  titulo,
  descricao,
  prefixo,
}: EsferaProps & { titulo: string; descricao: string; prefixo: string }) {
  const indicador = await getIndicadorVaat({ esfera, anoExercicio }, prefixo);
  const semDados = !indicador.exigido && !indicador.aplicado;
  const exigido = indicador.percentualExigido;
  const atingiu = indicador.percentualAplicado >= exigido;
  const encerrado = isExercicioEncerrado(anoExercicio);

  return (
    <MedidorLimite
      className="md:col-span-4"
      titulo={titulo}
      descricao={descricao}
      valor={semDados ? null : indicador.percentualAplicado}
      max={100}
      faixas={getFaixasLimiteMinimo(exigido, 100)}
      situacao={getSituacaoLimiteMinimo(indicador.percentualAplicado, exigido)}
      texto={
        semDados
          ? undefined
          : `${
              encerrado
                ? atingiu
                  ? "Obedeceu o limite mínimo anual."
                  : "Não obedeceu o limite mínimo anual."
                : atingiu
                  ? "Tende a obedecer o limite mínimo anual."
                  : "Tende a não obedecer o limite mínimo anual."
            } Aplicou R$ ${formatFloat(indicador.aplicado)} dos R$ ${formatFloat(indicador.exigido)} exigidos.`
      }
      nomeMedidor="% aplicado"
    />
  );
}

export default async function EducacaoFundeb({
  esfera,
  anoExercicio,
}: EsferaProps) {
  const get = <T,>(recurso: string) =>
    getDadosApiEsfera<T>(esfera, anoExercicio, recurso);

  const [
    recebidoEnviado,
    destinado,
    arrecadado,
    evolucao,
    magisterio,
    sumario,
    municipios,
    tabela,
  ] = await Promise.all([
    get<RecebidoEnviado>("Receita/GetReceitaArrecadadaFundeb"),
    get<Donut>("Receita/GetComposicaoReceitaDestinadaFundeb"),
    get<Donut>("Receita/GetComposicaoReceitaArrecadadaFundeb"),
    get<MultiSerie>("Receita/GetGraficosEvolucaoAnualFundeb"),
    get<SerieItem[]>("Educacao/GetGraficosEvolucaoAnualAplicacaoMagisterio"),
    get<SumarioEducacao>("Educacao/GetSumario"),
    getMunicipios(),
    esfera.tipo === "municipio" ? getTabelaMunicipios(anoExercicio) : null,
  ]);

  const limiteProfissionais = getLimiteProfissionais(anoExercicio);
  const percentualProfissionais =
    sumario?.aplicacaoPercentualMagisterioComputada ?? null;
  const diferenca = recebidoEnviado
    ? recebidoEnviado.recebido - recebidoEnviado.enviado
    : 0;
  const diferencaPercentual =
    recebidoEnviado && recebidoEnviado.enviado
      ? (Math.abs(diferenca) / recebidoEnviado.enviado) * 100
      : 0;

  let textoProfissionais: string | undefined;
  if (percentualProfissionais !== null && sumario) {
    const recebido = formatMoney(sumario.receitaArrecadadaFUNDEB);
    const aplicado = formatMoney(
      (percentualProfissionais / 100) * sumario.receitaArrecadadaFUNDEB
    );
    const atingiu = percentualProfissionais > limiteProfissionais;
    const verbo = isExercicioEncerrado(anoExercicio)
      ? atingiu
        ? "obedecendo"
        : "não obedecendo"
      : atingiu
        ? "tendendo a obedecer"
        : "tendendo a não obedecer";
    textoProfissionais = `Dos R$ ${recebido} recebidos do FUNDEB, destinou R$ ${aplicado} a profissionais da educação básica, ${verbo} o limite mínimo de ${limiteProfissionais}%`;
  }

  const exibirVaat = anoExercicio > 2025;

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
      <PanelWithDescription
        className="md:col-span-4"
        titulo="Fundeb - Destinado x Recebido"
        bodyProps={{ className: "flex-col items-center justify-center gap-2" }}
      >
        <LinhaValor titulo="Destinado">
          <ValorDinheiro
            valor={recebidoEnviado?.enviado}
            ano={anoExercicio}
            className="text-xl"
          />
        </LinhaValor>
        <hr className="w-full" />
        <LinhaValor titulo="Recebido">
          <ValorDinheiro
            valor={recebidoEnviado?.recebido}
            ano={anoExercicio}
            className="text-xl"
          />
        </LinhaValor>
        {recebidoEnviado && (
          <span className="text-sm text-gray-medium">
            Recebeu{" "}
            <b>
              R$ {formatMoney(Math.abs(diferenca))} (
              {formatFloat(diferencaPercentual)}%)
            </b>{" "}
            a {diferenca >= 0 ? "mais" : "menos"}
          </span>
        )}
      </PanelWithDescription>
      <PanelWithDescription
        className="md:col-span-4"
        titulo="Recursos destinados ao FUNDEB"
      >
        <DonutValores dados={destinado} exibirTotal />
      </PanelWithDescription>
      <PanelWithDescription
        className="md:col-span-4"
        titulo="Recursos recebidos do FUNDEB"
      >
        <DonutValores dados={arrecadado} exibirTotal />
      </PanelWithDescription>

      <PanelWithDescription
        className="md:col-span-12"
        titulo="FUNDEB - Evolução anual do município"
        descricao="Este é o valor aplicado em manutenção e desenvolvimento do ensino, exceto o gasto com remuneração de professores."
      >
        <MultiSeriesChart dados={evolucao} />
      </PanelWithDescription>

      <PanelWithDescription
        className="md:col-span-8"
        titulo="Evolução anual aplicação profissionais da educação básica"
        descricao="Evolução do percentual de aplicação dos recursos recebidos do FUNDEB, em pagamento de profissionais da educação básica que estão em atividade dentro da escola, tais como professores, coordenadores e diretores."
      >
        <SingleSeriesChart dados={magisterio} formato="percentual" />
      </PanelWithDescription>
      <MedidorLimite
        className="md:col-span-4"
        titulo="Fundeb - Profissionais Educação Básica"
        descricao={DESCRICAO_PROFISSIONAIS}
        valor={percentualProfissionais}
        max={100}
        faixas={getFaixasLimiteMinimo(limiteProfissionais, 100)}
        situacao={getSituacaoLimiteMinimo(
          percentualProfissionais,
          limiteProfissionais
        )}
        texto={textoProfissionais}
        nomeMedidor="% do FUNDEB"
      />

      {exibirVaat && (
        <>
          <CardVaat
            esfera={esfera}
            anoExercicio={anoExercicio}
            titulo="Despesa com FUNDEB - VAAT - Despesa de Capital"
            descricao="Valor investido em obras, equipamentos e demais despesas de capital com recursos da complementação VAAT (Valor Anual Total por Aluno) do FUNDEB."
            prefixo="VAATDespesaCapitalFUNDEB"
          />
          <CardVaat
            esfera={esfera}
            anoExercicio={anoExercicio}
            titulo="Despesa com FUNDEB - VAAT - Educação Infantil"
            descricao="Valor gasto com creches e pré-escolas usando recursos adicionais do FUNDEB recebidos do governo federal por meio do VAAT (Valor Anual Total por Aluno)."
            prefixo="VAATEducacaoInfantilFUNDEB"
          />
          <CardVaat
            esfera={esfera}
            anoExercicio={anoExercicio}
            titulo="Despesa com FUNDEB - Educação em Tempo Integral"
            descricao="Valor aplicado na oferta e manutenção da educação em tempo integral com recursos do FUNDEB."
            prefixo="TempoIntegralFUNDEB"
          />
        </>
      )}

      {tabela && (
        <PanelWithDescription
          className="md:col-span-12"
          titulo="Recursos Destinados X Recebidos mensalmente"
          bodyProps={{ className: "p-0 overflow-x-auto" }}
        >
          <TabelaDestinadoRecebido
            registros={tabela.map((registro) => ({
              nome:
                municipios.find((m) => m.codigo === registro.codigoEsferaAdministrativa)
                  ?.nome ?? registro.codigoEsferaAdministrativa,
              destinado: registro.enviado.map((item) => item.valor),
              recebido: registro.recebido.map((item) => item.valor),
            }))}
          />
        </PanelWithDescription>
      )}
    </div>
  );
}
