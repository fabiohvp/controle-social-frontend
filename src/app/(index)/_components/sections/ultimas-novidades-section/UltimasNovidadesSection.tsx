import Image from "next/image";
import Link from "next/link";

type Props = {
  className?: string;
};

export default function UltimasNovidadesSection(props: Props) {
  return (
    <div className={`flex justify-center gap-20 p-12 ${props.className ?? ""}`}>
      <section className="max-w-xl">
        <h2 className="title-with-vertical-bar">Últimas novidades</h2>
        <div className="h-72 mt-8 overflow-y-auto text-gray-dark">
          <p
            className="desc-text-slideshow ng-binding"
            ng-bind-html="slide.resumo | unsafe"
          ></p>
          <div className="p-2">
            <h5 className="mb-1 font-normal">07/2023</h5>
            <hr />
            <ul className="styled">
              <li>
                Informações de 2023 sobre
                <Link href="municipio/2023/vitoria/gestaoFiscal-saude">
                  limites com saúde
                </Link>
                e
                <Link href="municipio/2023/vitoria/gestaoFiscal-receitaCorrenteLiquida">
                  Receita Corrente Líquida (RCL)
                </Link>
                nos municípios.
              </li>
            </ul>
          </div>
          <div className="p-2">
            <h5 className="mb-1 font-normal">05/2023</h5>
            <hr />
            <ul className="styled">
              <li>
                Painel sobre o
                <Link href="municipio/2023/vitoria/gestaoFiscal-endividamento">
                  endividamento
                </Link>
                nos municípios, considerando a sua Dívida Consolidada Líquida.
              </li>
              <li>
                <Link href="municipio/2022/vitoria/previdencia-situacaoPrevidenciaria/077E0900001">
                  Índice de Situação Previdenciária
                </Link>
                dos institutos de previdência do estado e dos municípios no ano
                de 2022.
              </li>
              <li>
                Informações sobre
                <Link href="municipio/2023/vitoria/gestaoFiscal-pessoal">
                  limites com pessoal
                </Link>
                ,
                <Link href="municipio/2023/vitoria/gestaoFiscal-limiteDespesaReceita">
                  relação despesas correntes x receitas correntes
                </Link>
                e
                <Link href="municipio/2023/vitoria/gestaoFiscal-alertaLRF">
                  alertas
                </Link>
                nos municípios.
              </li>
              <li>
                Valor necessário a ser
                <Link href="/municipio/2022/conceicao-da-barra/visaoGeral">
                  complementado na aplicação em educação
                </Link>
                até o final de 2023. Cinco municípios ainda necessitam realizar
                a complementação, por não terem aplicado o limite mínimo entre
                os anos de 2020 e 2021.
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">03/2023</h5>
            <hr />
            <ul className="styled">
              <li>
                Resultado da Fiscalização sobre
                <Link href="/cancerColoDeUtero/2022">
                  Câncer de colo de útero
                </Link>
                , ano de 2022.
              </li>
              <li>
                Painéis sobre a Previdência (2023) do
                <Link href="estado/2023/previdencia-receita/500E0900001">
                  Estado
                </Link>
                e dos
                <Link href="municipio/202/vitoria/previdencia-receita/077E0900001">
                  municípios
                </Link>
                .
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">11/2022</h5>
            <hr />
            <ul className="styled">
              <li>
                Situação das remessas de
                <Link href="obrigacaoEnvio/2022/municipios">concessão</Link>,
                exigidas dos institutos de previdência do estado e dos
                municípios, a partir de julho/2022.
              </li>
              <li>
                Painel para
                <Link href="monitoramento/2019/municipios/Todos">
                  monitoramento de providências
                </Link>
                a serem tomadas pelos órgãos, a partir das deliberações do
                TCEES.
              </li>
              <li>
                Painel sobre
                <Link href="julgamentoContas/2020/visaoGeral">
                  julgamento das contas
                </Link>
                dos chefes do poder executivo.
              </li>
              <li>
                O painel de <Link href="obras">obras públicas</Link> passa a
                exibir todas as obras do estado e dos municípios, e não apenas
                as paralisadas ou em andamento, mas com necessidade de atenção
                especial.
              </li>
              <li>
                Novas informações sobre os programas do
                <Link href="municipio/2022/vitoria/gestaoOrcamentaria-planoPlurianual">
                  Plano Plurianual (PPA)
                </Link>
                : indicador, situação problema e objetivo do desenvolvimento
                sustentável.
              </li>

              <li>
                Incluídos dados de 2021 no painel sobre
                <Link href="municipio/2021/vitoria/gestaoOrcamentaria-enfrentamentoCovid">
                  enfrentamento da calamidade pública de Covid-19
                </Link>
                .
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">08/2022</h5>
            <hr />
            <ul className="styled">
              <li>
                Painel sobre <Link href="projecao">projeções</Link> dos gastos
                com pessoal do Estado e dos municípios.
              </li>
              <li>
                Resultado da Fiscalização de
                <Link href="/mamografiaRastreamento/2021">
                  Mamografias de Rastreamento
                </Link>
                no ano de 2021.
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">07/2022</h5>
            <hr />
            <ul className="styled">
              <li>
                Painel sobre <Link href="obras">obras</Link> paralisadas ou em
                andamento, mas com necessidade de atenção especial.
              </li>
              <li>
                Informações sobre
                <Link href="municipio/2022/vitoria/gestaoFiscal-educacao">
                  educação
                </Link>
                e
                <Link href="municipio/2022/vitoria/gestaoFiscal-educacaoFundeb">
                  Fundeb
                </Link>
                no estado e nos municípios.
              </li>
              <li>
                Informações sobre
                <Link href="municipio/2022/vitoria/gestaoFiscal-saude">
                  limites com saúde
                </Link>
                nos municípios.
              </li>
              <li>
                <Link href="municipio/2021/vitoria/previdencia-situacaoPrevidenciaria/077E0900001">
                  Índice de Situação Previdenciária
                </Link>
                dos institutos de previdência do estado e dos municípios no ano
                de 2021.
              </li>
              <li>
                Painel com valores da
                <Link href="municipio/2022/vitoria/gestaoFiscal-receitaCorrenteLiquida">
                  Receita Corrente Líquida municipal.
                </Link>
              </li>
              <li>
                Situação das
                <Link href="obrigacaoEnvio/2022/municipios">
                  obrigações relacionadas ao envio das remessas de contratação
                </Link>
                , a partir de abril de 2022.
              </li>
              <li>
                Painel com informações sobre
                <Link href="areasTematicas/Educacao-VisaoGeral">Educação</Link>,
                como distribuição de escolas públicas, matrículas e
                profissionais da educação.
              </li>
              <li>
                Resultado da Fiscalização sobre
                <Link href="/educacao/desigualdadeEducacional/2020/manifestacaoTecnica">
                  Desigualdade Educacional
                </Link>
                , ano de 2020.
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">06/2022</h5>
            <hr />
            <ul className="styled">
              <li>
                Informações sobre planejamento e execução do
                <Link href="municipio/2022/vitoria/gestaoOrcamentaria-planoPlurianual">
                  Plano Plurianual (PPA) 2022-2025
                </Link>
                e de seus programas.
              </li>
              <li>
                Informações sobre planejamento e execução da
                <Link href="municipio/2022/vitoria/gestaoOrcamentaria-diretrizesOrcamentarias">
                  Lei de Diretrizes Orçamentárias (LDO) 2022
                </Link>
                e de seus programas.
              </li>
              <li>
                Informações sobre a execução de
                <Link href="municipio/2022/vitoria/gestaoOrcamentaria-acoes">
                  Funções, Programas e Ações
                </Link>
                municipais para o ano de 2022.
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">05/2022</h5>
            <hr />
            <ul className="styled">
              <li>
                Informações sobre o envio das remessas de
                <Link href="estado/2022/obrigacaoEnvio">
                  PCM (Prestação de Contas Mensal) pelos órgãos estaduais
                </Link>
                .
              </li>
              <li>
                Painéis sobre o
                <Link href="estado/2022/visaoGeral"> Estado (2022)</Link>,
                contendo informações como receitas, despesas, metas e limites
                previstos na Lei de Responsabilidade Fiscal.
              </li>
              <li>
                Painéis sobre a Previdência (2022) do
                <Link href="estado/2022/previdencia-receita/500E0900001">
                  Estado
                </Link>
                e dos
                <Link href="municipio/2022/vitoria/previdencia-receita/077E0900001">
                  municípios
                </Link>
                .
              </li>
              <li>
                Informações sobre
                <Link href="municipio/2022/vitoria/gestaoFiscal-pessoal">
                  limites com pessoal
                </Link>
                nos municípios.
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">04/2022</h5>
            <hr />
            <ul className="styled">
              <li>
                Painel sobre os contratos de
                <Link href="areasTematicas/ConcessaoPublica-VisaoGeral">
                  Concessão Comum e Parceria Público-Privada
                </Link>
                no Espírito Santo.
              </li>
              <li>
                Resultado da Fiscalização de
                <Link href="/saude/doencasCronicas/2021">
                  Doenças Crônicas Não Transmissíveis
                </Link>
                no ano de 2021.
              </li>
              <li>
                Painel sobre a
                <Link href="/areasTematicas/EstruturaAdministrativa">
                  Estrutura Administrativa
                </Link>
                , com informações referentes aos cargos, empregos e funções
                públicas no Estado e nos municípios.
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">03/2022</h5>
            <hr />
            <ul className="styled">
              <li>
                Resultado da Fiscalização de
                <Link href="/transparencia-portal/2020/executivo">
                  Portais de Transparência
                </Link>
                no ano de 2020.
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">01/2022</h5>
            <hr />
            <ul className="styled">
              <li>
                Painéis que disponibilizam a relação entre despesas correntes e
                receitas correntes no
                <Link href="estado/2021/gestaoFiscal-limiteDespesaReceita">
                  Estado
                </Link>
                e nos
                <Link href="municipio/2021/vitoria/gestaoFiscal-limiteDespesaReceita">
                  municípios
                </Link>
                .
              </li>
              <li>
                Ranking que permite comparar a
                <Link href="rankings/2021/municipios/resultado-despesasCorrentesReceitasCorrentes">
                  relação de despesas correntes e receitas correntes
                </Link>
                entre os municípios.
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">11/2021</h5>
            <hr />
            <ul className="styled">
              <li>
                <Link href="#dobra-slide-videos">Vídeos</Link> da série que
                explica o funcionamento do Painel de Controle.
              </li>
              <li>
                Painéis sobre a
                <Link href="estado/2020/previdencia-receita/500E0900001">
                  Previdência dos Poderes Estaduais
                </Link>
                , com informações sobre receitas, despesas, patrimônio,
                resultado atuarial, projeções atuariais e situação
                previdenciária.
              </li>
              <li>
                <Link href="municipio/2020/vitoria/previdencia-projecaoAtuarial/077E0900001">
                  Projeções atuariais
                </Link>
                dos institutos de previdência municipais.
              </li>
              <li>
                <Link href="boletinsInformativos/2021/informativo">
                  Informativos
                </Link>
                produzidos pelo TCEES, contendo análises econômicas e fiscais da
                situação dos municípios.
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">10/2021</h5>
            <hr />
            <ul className="styled">
              <li>
                Painel sobre
                <Link href="municipio/2020/vitoria/gestaoOrcamentaria-enfrentamentoCovid">
                  enfrentamento da calamidade pública de Covid-19
                </Link>
                .
              </li>
              <li>
                Painel sobre
                <Link href="folhaDePagamento/2021/municipal/null/contratacoesDemissoes/idEsferaAdministrativa/077">
                  ingressos e desligamentos
                </Link>
                ocorridos na Administração Pública estadual e municipal.
              </li>
              <li>
                Painel sobre o
                <Link href="IEGM/2018/iIEGM">
                  Índice de Efetividade da Gestão Municipal (IEGM) 2018
                </Link>
                .
              </li>
              <li>
                Painel sobre o
                <Link href="controle-interno/2020/executivo">
                  Levantamento de Controle Interno dos municípios
                </Link>
                para o ano de 2020.
              </li>
              <li>
                Painel com informações sobre
                <Link href="municipio/2021/vitoria/previdencia-patrimonio/077E0900001">
                  Patrimônio
                </Link>
                dos Regimes Próprios de Previdência Social municipais,
                referentes ao ano de 2021.
              </li>
              <li>
                Painel com informações sobre
                <Link href="municipio/2021/vitoria/previdencia-resultadoAtuarial/077E0900001">
                  Resultado atuarial
                </Link>
                dos Regimes Próprios de Previdência Social municipais,
                referentes ao ano de 2021.
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">07/2021</h5>
            <hr />
            <ul className="styled">
              <li>
                Relatório de Levantamento sobre as
                <Link href="saude/acoedivdemia/2020">
                  ações realizadas pelos municípios capixabas para o
                  enfrentamento da crise causada pela pandemia da Covid-19
                </Link>
                .
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">05/2021</h5>
            <hr />
            <ul className="styled">
              <li>
                Novos
                <Link href="indicadoresConsolidados/2021/antecipacaoReceitasOrcamentarias">
                  indicadores consolidados, sobre Alertas da Lei de
                  Responsabilidade Fiscal (LRF)
                </Link>
                feitos aos municípios.
              </li>
              <li>
                Painel com informações sobre planejamento e execução do
                <Link href="municipio/2018/vitoria/gestaoOrcamentaria-planoPlurianual">
                  Plano Plurianual (PPA)
                </Link>
                e de seus programas.
              </li>
              <li>
                Painel com informações sobre planejamento e execução da
                <Link href="municipio/2018/vitoria/gestaoOrcamentaria-diretrizesOrcamentarias">
                  Lei de Diretrizes Orçamentárias (LDO)
                </Link>
                e de seus programas.
              </li>
              <li>
                Painel com informações sobre a execução de
                <Link href="municipio/2018/vitoria/gestaoOrcamentaria-acoes">
                  Funções, Programas e Ações
                </Link>
                municipais.
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">03/2021</h5>
            <hr />
            <ul className="styled">
              <li>
                Atualização do painel com informações sobre
                <Link href="areasTematicas/Saude-VisaoGeral">saúde.</Link>
              </li>
              <li>
                Painel com informações sobre
                <Link href="municipio/2020/vitoria/previdencia-patrimonio/077E0900001">
                  Patrimônio
                </Link>
                dos Regimes Próprios de Previdência Social municipais,
                referentes ao ano de 2020.
              </li>
              <li>
                Painel com informações sobre
                <Link href="municipio/2020/vitoria/previdencia-resultadoAtuarial/077E0900001">
                  Resultado atuarial
                </Link>
                dos Regimes Próprios de Previdência Social municipais,
                referentes ao ano de 2020.
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">02/2021</h5>
            <hr />
            <ul className="styled">
              <li>
                Comparação entre o
                <Link href="municipio/2020/vitoria/previdencia-situacaoPrevidenciaria/077E0900001">
                  Índice de Situação Previdenciária
                </Link>
                , obtido pelos institutos de previdência municipais nos anos de
                2019 e 2020.
              </li>
              <li>
                Melhoria na exibição das informações sobre
                <Link href="municipio/2020/vitoria/previdencia-segurados/077E0900001">
                  Segurados do RPPS
                </Link>
                .
              </li>
              <li> Melhoria no cálculo de correção pelo IPCA.</li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">01/2021</h5>
            <hr />
            <ul className="styled">
              <li>
                <Link href="folhaDePagamento/2020/municipal/null/consultaDeVinculo/idEsferaAdministrativa/null/undefined">
                  Consulta de vínculos
                </Link>
                dos servidores estaduais e municipais.
              </li>
              <li>
                Novos gráficos sobre vantagens e descontos, no painel de
                <Link href="folhaDePagamento/2020/estadual/executivo/visaoGeral/codigoTipoUnidadeGestora/null/1">
                  Pessoal
                </Link>
                .
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">12/2020</h5>
            <hr />
            <ul className="styled">
              <li>
                Painel com informações sobre
                <Link href="areasTematicas/Saude-VisaoGeral">saúde.</Link>
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">11/2020</h5>
            <hr />
            <ul className="styled">
              <li>
                Painel com informações sobre
                <Link href="municipio/2020/vitoria/previdencia-segurados/077E0900001">
                  Segurados dos institutos de previdência municipais
                </Link>
                , referentes ao ano de 2020.
              </li>
              <li>
                Painel com informações sobre o
                <Link href="estado/2019/iege">
                  Índice de Efetividade da Gestão Estadual (IEGE)
                </Link>
                , referente ao exercício de 2019
              </li>
              <li>
                Painel com informações sobre o
                <Link href="municipio/2020/vitoria/previdencia-situacaoPrevidenciaria/077E0900001">
                  Índice de Situação Previdenciária
                </Link>
                , referentes ao ano de 2020.
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">10/2020</h5>
            <hr />
            <ul className="styled">
              <li>
                Painel com informações sobre o
                <Link href="municipio/2019/vitoria/previdencia-situacaoPrevidenciaria/077E0900001">
                  Índice de Situação Previdenciária
                </Link>
                , referentes ao ano de 2019.
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">09/2020</h5>
            <hr />
            <ul className="styled">
              <li>
                Nova página inicial com uma interface mais moderna, tornando a
                navegação mais fácil e intuitiva.
              </li>
              <li>
                Painel com informações sobre
                <Link href="/folhaDePagamento/2020/municipal/executivo/visaoGeral/idEsferaAdministrativa/019/1">
                  pessoal e folha de pagamento
                </Link>
                no Estado e nos municípios.
              </li>
              <li>
                Painel <Link href="/estado/2020/visaoGeral">visão geral</Link>{" "}
                do Estado.
              </li>
              <li>
                <Link href="/estado/2020/gestaoFiscal-metaDeArrecadacao">
                  Desempenho da receita total
                </Link>
                do Estado.
              </li>
              <li>
                <Link href="/estado/2020/gestaoFiscal-educacaoFundeb">
                  Evolução anual da aplicação no Magistério
                </Link>
                do Estado.
              </li>
              <li>
                <Link href="/estado/2020/gestaoFiscal-receitaCorrenteLiquida">
                  Evolução anual RCL (Receita Corrente Líquida) e RCL Ajustada
                </Link>
                do Estado.
              </li>
              <li>
                <Link href="/estado/2020/gestaoFiscal-resultadoNominal">
                  Evolução mensal do Resultado Nominal
                </Link>
                do Estado.
              </li>
              <li>
                Novos gráficos sobre desempenho das receitas de capital e
                corrente dos municípios, no painel de Metas de Arrecadação.
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">07/2020</h5>
            <hr />
            <ul className="styled">
              <li>
                Painel com
                <Link href="/estado/2020/gestaoOrcamentaria-despesaPorPoder">
                  despesas dos poderes estaduais
                </Link>
                , classificadas por fonte e natureza.
              </li>
              <li>
                <Link href="/estado/2020/gestaoFiscal-resultadoNominal">
                  Resultado nominal estadual
                </Link>
                do mês, bem como de sua evolução anual.
              </li>
              <li>
                Evolução anual do
                <Link href="/estado/2020/gestaoFiscal-resultadoPrimario">
                  resultado primário estadual
                </Link>
                .
              </li>
              <li>
                Evolução anual da dívida consolidada líquida, operações de
                créditos e garantias concedidas no
                <Link href="/estado/2020/gestaoFiscal-endividamento">
                  painel sobre limites de envidividamento estaduais
                </Link>
                .
              </li>
              <li> Painel de resultado orçamentário para os municípios. </li>
              <li>
                Novos gráficos sobre despesa corrente e despesa de capital dos
                municípios, no painel de despesas.
              </li>
              <li>
                Novo gráfico sobre evolução anual da despesa com pessoa nos
                municípios.
              </li>
              <li>
                Painéis sobre limites da LRF com educação, saúde e pessoal nos
                municípios, ano de 2020.
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">06/2020</h5>
            <hr />
            <ul className="styled">
              <li>
                Novos gráficos sobre
                <Link href="/estado/2020/gestaoOrcamentaria-despesa">
                  despesas liquidadas por função
                </Link>
                , referentes ao Estado
              </li>
              <li>
                Novos seção com dados do
                <Link href="/estado/2020/gestaoFiscal-educacaoFundeb">
                  Fundeb
                </Link>
                , referentes ao Estado
              </li>
              <li>
                Disponibilização de dados históricos de Fundeb municipal,
                referentes aos anos de 2013 e 2017
              </li>
              <li>
                Disponibilizada a opção Resultados Orçamentários na seção
                Indicadores Consolidados
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">05/2020</h5>
            <hr />
            <ul className="styled">
              <li>
                Nova seção
                <Link href="/estado/2020/boletimExtraordinario">
                  boletins extraordinários
                </Link>
                , com projeções para o Estado e os municípios, referentes a
                temas como receitas e despesas
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">04/2020</h5>
            <hr />
            <ul className="styled">
              <li>
                Novos gráficos para comparação entre comportamento da
                <Link href="/estado/2020/gestaoOrcamentaria-receita">
                  receita
                </Link>{" "}
                no ano corrente e no ano anterior
              </li>
              <li>
                Novos gráficos para comparação entre comportamento do
                <Link href="/estado/2020/gestaoOrcamentaria-despesa">
                  resultado orçamentário
                </Link>
                no ano corrente e no ano anterior
              </li>
              <li>
                Novos gráficos sobre a evolução da
                <Link href="/estado/2020/gestaoFiscal-pessoal">
                  despesa com pessoal
                </Link>
                e da Receita Corrente Líquida Ajustada
              </li>
            </ul>
          </div>
          <div className="p-2">
            <h5 className="mb-1 font-normal">02/2020</h5>
            <hr />
            <ul className="styled">
              <li>
                Disponibilizada a opção de Previdência nos Indicadores
                Consolidados
              </li>
              <li>
                Disponibilizados dados de
                <Link href="/estado/2019/gestaoFiscal-resultadoPrimario">
                  Resultado Primário do Estado
                </Link>
                para o ano de 2019
              </li>
            </ul>
          </div>
          <div className="p-2">
            <h5 className="mb-1 font-normal">12/2019</h5>
            <hr />
            <ul className="styled">
              <li>
                Nova seção
                <Link href="/fiscalizacoes/2019/escolas">
                  &quot;Educação - Levantamento Oferta x Demanda&quot;
                </Link>
                , que apresenta a oferta e demanda por vagas nas redes públicas
                estaduais e municipais de ensino
              </li>
              <li>
                Nova seção
                <Link href="/fiscalizacoes/receitasMunicipais">
                  &quot;Receita Pública Municipal&quot;
                </Link>
                , onde são apresentados resultados das auditorias temáticas de
                receita realizadas nos 78 municípios capixabas
              </li>
            </ul>
          </div>
          <div className="p-2">
            <h5 className="mb-1 font-normal">11/2019</h5>
            <hr />
            <ul className="styled">
              <li>
                Nova seção &quot;Previdência&quot;, onde são apresentados os
                dados de instituto e fundos de previdência dos municípios que
                possuem regime próprio de previdência social
              </li>
            </ul>
          </div>
          <div className="p-2">
            <h5 className="mb-1 font-normal">10/2019</h5>
            <hr />
            <ul className="styled">
              <li>Melhorias no comparador de municípios</li>
              <li>
                Nova seção de
                <Link
                  ng-href="/indicadoresConsolidados/2020/antecipacaoReceitasOrcamentarias"
                  title="Indicadores Consolidados"
                  href="/indicadoresConsolidados/2020/antecipacaoReceitasOrcamentarias"
                >
                  &quot;Indicadores Consolidados/&quot;
                </Link>
                dos 78 municípios, com dados organizados por área temática
              </li>
              <li>
                Nova seção &quot;Destino do dinheiro&quot;, que apresenta com
                quais despesas foi utilizado o dinheiro proveniente de
                determinadas fontes de recursos
              </li>
              <li>
                Novos dados de &quot;FUNDEB&quot;, onde são apresentados os
                recursos destinados e recebidos pelos municípios e Estado
              </li>
              <li>
                Modernização da interface para melhor compatibilidade com
                dispositivos móveis
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">06/2019</h5>
            <hr />
            <ul className="styled">
              <li>
                Nova seção de
                <Link
                  href="/compararMunicipio/2021"
                  title="Comparação de Municípios"
                >
                  &quot;Comparação entre municípios&quot;
                </Link>
              </li>
              <li>
                Dados de envio de remessa de &quot;
                <Link href="/obrigacaoEnvio/2020/municipios">
                  Folha de pagamento
                </Link>
                &quot;
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">04/2019</h5>
            <hr />
            <ul className="styled">
              <li>
                Nova seção com informações sobre as
                <Link
                  href="/prestacaoConta/2017/municipios/Governo/07"
                  title="Prestações de Contas Anuais"
                >
                  &quot;Prestações de Contas Anuais&quot;
                </Link>
              </li>
              <li>
                Ranking de &quot;
                <Link href="/rankings/2020/municipios/educacao-educacaoPorAplicacaoFUNDEB">
                  Aplicação do FUNDEB
                </Link>
                &quot;
              </li>
            </ul>
          </div>

          <div className="p-2">
            <h5 className="mb-1 font-normal">02/2019</h5>
            <hr />
            <ul className="styled">
              <li>
                Exibição dos alertas enviados aos municípios e relativos ao
                cumprimento da Lei de Responsabilidade Fiscal
              </li>
              <li>
                Incluído o Índice de Efetividade da Gestão Estadual (IEGE),
                referente ao exercício de 2017
              </li>
            </ul>
          </div>
          <div className="p-2">
            <h5 className="mb-1 font-normal">11/2018</h5>
            <hr />
            <ul className="styled">
              <li>
                Melhorias diversas na interface, oferecendo maior
                compatibilidade com celulares e outros dispositivos
              </li>
              <li>Disponibilização dos dados do IEGM 2017</li>
            </ul>
          </div>
          <div className="p-2">
            <h5 className="mb-1 font-normal">07/2018</h5>
            <hr />
            <ul className="styled">
              <li>
                Nova seção com informações sobre as
                <Link
                  ng-href="/obrigacaoEnvio/2018/municipios"
                  title="Obrigações junto ao TCE-ES"
                  href="/obrigacaoEnvio/2018/municipios"
                >
                  &quot;Obrigações junto ao TCEES&quot;
                </Link>
              </li>
              <li>
                Nova aba &quot;Leis de Orçamento&quot; com opção de download dos
                documentos referentes ao planejamento orçamentário (PPA, LOA e
                LDO)
              </li>
              <li>
                Informações detalhadas das Unidades Gestoras dos municípios
              </li>
            </ul>
          </div>
          <div className="p-2">
            <h5 className="mb-1 font-normal">05/2018</h5>
            <hr />
            <ul className="styled">
              <li>
                Nova versão interativa do Painel de Controle de Macrogestão
                Governamental
              </li>
              <li> Detalhamento mensal de todas as receitas e despesas</li>
              <li>
                Inclusão do ranking do limite constitucional da despesa total do
                <Link
                  ng-href="/rankings/2016/municipios/despesa-despesaLegislativoArtigo29"
                  title="Poder Legislativo (artigo 29-A da Constituição Federal)"
                  href="/rankings/2016/municipios/despesa-despesaLegislativoArtigo29"
                >
                  Poder Legislativo (artigo 29-A da Constituição Federal)
                </Link>
              </li>
              <li>Melhorias diversas na interface com o usuário</li>
            </ul>
          </div>
          <div className="p-2">
            <h5 className="mb-1 font-normal">09/2017</h5>
            <hr />
            <ul className="styled">
              <li>Destaques das principais receitas e despesas</li>
              <li> Distribuição das receitas por fontes de recursos</li>
              <li>
                Distribuição das despesas por função, subfunção e natureza
              </li>
              <li>Distribuição das receitas por natureza</li>
              <li>
                Disponibilização das informações no formato de dados abertos
              </li>
            </ul>
          </div>
          <div className="p-2">
            <h5 className="mb-1 font-normal">08/2017</h5>
            <hr />
            <ul className="styled">
              <li>Dados atualizados diariamente</li>
              <li>
                Informações sobre recebimento das remessas de dados dos
                municípios
              </li>
              <li>Fiscalizações realizadas no município pelo TCE-ES</li>
            </ul>
          </div>
          <div className="p-2">
            <h5 className="mb-1 font-normal">05/2017</h5>
            <hr />
            <ul className="styled">
              <li>
                Dados do
                <Link
                  ng-href="./IEGM/2015/indiceIEGM"
                  href="./IEGM/2015/indiceIEGM"
                >
                  Índice de Efetividade da Gestão Municipal
                </Link>
                de 2015
              </li>
              <li>
                Resultado da Fiscalização de
                <Link
                  ng-href="./transparencia-passiva/2016/prefeitura"
                  href="./transparencia-passiva/2016/prefeitura"
                >
                  Transparência Passiva dos Municípios
                </Link>
              </li>
              <li>
                Ranking de &quot;
                <Link
                  ng-href="./rankings/2017/municipios/resultado-receitaArrecadadaDespesaLiquidada"
                  href="./rankings/2017/municipios/resultado-receitaArrecadadaDespesaLiquidada"
                >
                  Receitas Arrecadadas x Despesas Liquidadas
                </Link>
                &quot;
              </li>
              <li>
                Ranking de &quot;
                <Link
                  ng-href="./rankings/2017/municipios/resultado-despesaLiquidadaDespesaPaga"
                  href="./rankings/2017/municipios/resultado-despesaLiquidadaDespesaPaga"
                >
                  Despesas Liquidadas x Despesas Pagas
                </Link>
                &quot;
              </li>
              <li>
                Painel de Controle de
                <Link
                  ng-href="./boletinsInformativos/2017/boletimMensal"
                  href="./boletinsInformativos/2017/boletimMensal"
                >
                  Macrogestão Governamental
                </Link>
              </li>
            </ul>
          </div>
          <p></p>
        </div>
      </section>
      <Image
        src="/banners/ultimas-novidades.png"
        alt="Verifique a evolução das despesas com pessoal e encargos do município nos últimos exercícios."
        height={350}
        width={252}
      />
    </div>
  );
}
