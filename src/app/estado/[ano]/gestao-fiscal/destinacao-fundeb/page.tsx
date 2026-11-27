import { EstadoPageProps } from "@/app/estado/[ano]/routes";
import { MultiSerie, SerieItem } from "@/types/Serie";
import { getDadosEstado } from "../../_gestao/api";
import {
  Aviso,
  CartaoLimite,
  CartaoMulti,
  CartaoSerie,
  CartaoValor,
  Pagina,
} from "../../_gestao/Cartoes";

/* Site oficial: Estado > Gestão fiscal > Destinação ao FUNDEB (DestinacaoFundeb) */

type Comparacao = { icms: MultiSerie; ipva: MultiSerie; itcmd: MultiSerie };

export default async function Page({
  params,
}: {
  params: Promise<EstadoPageProps>;
}) {
  const { ano } = await params;
  const anoExercicio = Number(ano);

  const [
    receitaBruta,
    transferenciasMunicipios,
    bancoDoBrasil,
    percentual,
    arrecadadoDestinado,
    evolucaoPercentual,
    comparacao,
  ] = await Promise.all([
    getDadosEstado<number>(anoExercicio, "Receita/GetTotalReceitaBrutaDeImpostos"),
    getDadosEstado<number>(anoExercicio, "Receita/GetTotalTransferenciasMunicipios"),
    getDadosEstado<{ valor: number }>(anoExercicio, "Educacao/GetTotalDivulgadoBancoDoBrasil"),
    getDadosEstado<number>(anoExercicio, "Educacao/GetTotalDivulgadoBancoDoBrasilPercentual"),
    getDadosEstado<MultiSerie>(anoExercicio, "Receita/GetEvolucaoAnualArrecadadoAplicado"),
    getDadosEstado<SerieItem[]>(anoExercicio, "Educacao/GetEvolucaoAnualAplicacaoFundeb"),
    getDadosEstado<Comparacao>(anoExercicio, "Receita/GetComparacaoImpostosArrecadadoAplicado"),
  ]);

  const receitaLiquida =
    typeof receitaBruta === "number" && typeof transferenciasMunicipios === "number"
      ? receitaBruta - transferenciasMunicipios
      : null;

  return (
    <Pagina>
      <Aviso>
        Para financiar a educação pública, a lei exige o repasse de 20% dos
        impostos estaduais (ICMS, ITCMD e IPVA) ao FUNDEB. Este painel foca
        exclusivamente nessas receitas e mostra o valor exato dessa fatia,
        possibilitando comparar se o dinheiro transferido pelo Estado
        corresponde ao valor que a Secretaria do Tesouro Nacional (STN)
        confirma ter recebido. O painel tem como fonte a API de Transferências
        Constitucionais do Tesouro Nacional e os dados do sistema CidadES-PCM,
        conforme Anexo IV da IN 68/2020. A atualização mensal depende da
        disponibilidade da API, bem como do envio e da homologação realizados
        pelo Estado no CidadES.
      </Aviso>
      <CartaoValor
        largura={3}
        titulo="Receita bruta de impostos"
        valor={receitaBruta}
        ano={anoExercicio}
      />
      <CartaoValor
        largura={3}
        titulo="Transferências aos municípios"
        valor={transferenciasMunicipios}
        ano={anoExercicio}
      />
      <CartaoValor
        largura={3}
        titulo="Receita liquida de impostos"
        valor={receitaLiquida}
        ano={anoExercicio}
      />
      <CartaoValor
        largura={3}
        titulo="Transferências efetuadas pelo Estado"
        descricao="Valores efetivamente depositados às contas do FUNDEB referente a 20% da arrecadação Estadual de impostos (ICMS / IPVA / ITCMD)."
        valor={bancoDoBrasil?.valor}
        ano={anoExercicio}
      />
      <CartaoLimite
        largura={3}
        titulo="Aplicação para constituição do FUNDEB"
        descricao="A legislação estabelece a destinação de 20% da arrecadação para a constituição do Fundeb, conforme inciso II, artigo 212-A, da Constituição Federal e art. 3º da Lei 14.113/2020."
        percentual={typeof percentual === "number" ? percentual : null}
        tipo="minimo"
        limite={20}
        base="da arrecadação"
      />
      <CartaoMulti
        largura={9}
        titulo="Evolução anual arrecadado x destinado"
        dados={arrecadadoDestinado}
        tipos={["bar", "bar"]}
      />
      <CartaoMulti
        largura={4}
        titulo="ICMS"
        descricao="Imposto sobre Operações relativas à Circulação de Mercadorias e sobre Prestações de Serviços de Transporte Interestadual e Intermunicipal e de Comunicação."
        dados={comparacao?.icms}
        tipos={["bar", "bar"]}
      />
      <CartaoMulti
        largura={4}
        titulo="IPVA"
        descricao="Imposto sobre Propriedade de Veículos Automotores."
        dados={comparacao?.ipva}
        tipos={["bar", "bar"]}
      />
      <CartaoMulti
        largura={4}
        titulo="ITCMD"
        descricao="Imposto sobre Transmissão Causa Mortis e Doação."
        dados={comparacao?.itcmd}
        tipos={["bar", "bar"]}
      />
      <CartaoSerie
        largura={12}
        titulo="Evolução anual da destinação para constituição ao FUNDEB"
        dados={evolucaoPercentual}
        formato="percentual"
      />
    </Pagina>
  );
}
