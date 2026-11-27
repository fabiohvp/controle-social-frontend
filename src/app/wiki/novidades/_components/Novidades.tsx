import Link from "next/link";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = HTMLAttributes<HTMLDivElement>;

export default function Novidades({ className, ...props }: Props) {
  return (
    <div className={twMerge("text-gray-dark", className)} {...props}>
      <p
        className="desc-text-slideshow ng-binding"
        ng-bind-html="slide.resumo | unsafe"
      ></p>
      <div className="p-2">
        <h5 className="mb-1 font-normal">11/2026</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/fiscalizacoes/levantamentoODS/2025"
              target="_blank"
              rel="noopener noreferrer"
            >
              Levantamento sobre os Objetivos do Desenvolvimento Sustentável
              (ODS)
            </a>
            : examina o grau de maturidade da governança do Centro de Governo
            local na implementação da Agenda 2030 e de seus ODS.
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">09/2026</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/estado/2026/gestaoFiscal/destinacaoFundeb"
              target="_blank"
              rel="noopener noreferrer"
            >
              Destinação de recursos ao Fundeb
            </a>
            : apresenta as receitas de ICMS, ITCMD e IPVA destinadas ao Fundeb
            e permite conferir os valores transferidos pelo Estado com os
            registrados pela Secretaria do Tesouro Nacional.
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">07/2026</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/obrigacaoEnvio/2025/monitoramentoDeliberacao/municipios/todos"
              target="_blank"
              rel="noopener noreferrer"
            >
              Monitoramento de Deliberações
            </a>
            : o painel passou a exibir todas as decisões do Tribunal, e não
            apenas os processos de prestação de contas.
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">06/2026</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/areasTematicas/emendasParlamentares/despesas"
              target="_blank"
              rel="noopener noreferrer"
            >
              Emendas individuais impositivas por transferência especial
            </a>
            : inclusão dos dados estaduais no painel de empenhos, liquidações e
            pagamentos relacionados às emendas (emendas pix), declarados pelos
            municípios no CidadES-Prestação de Contas Mensal.
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">05/2026</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/municipio/2026/vila-velha/previdencia/planoAmortizacao/076E0900001"
              target="_blank"
              rel="noopener noreferrer"
            >
              Planos de amortização dos RPPS (Regimes Próprios de Previdência
              Social)
            </a>
            : detalha o plano de amortização do déficit atuarial e agora mostra
            também os pagamentos feitos pelo patrocinador.
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">04/2026</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/areasTematicas/contratacoesPublicas/atasRegistroPrecos"
              target="_blank"
              rel="noopener noreferrer"
            >
              Atas de Registro de Preços
            </a>
            : quantidades, valores, evolução e características das atas
            celebradas pelos órgãos estaduais e municipais.
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">03/2026</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/areasTematicas/emendasParlamentares/comparativoReceitas"
              target="_blank"
              rel="noopener noreferrer"
            >
              Emendas individuais impositivas por transferência especial -
              comparativo
            </a>
            : compara os valores transferidos pelo Governo Federal com os
            declarados ao TCE-ES pelo Estado e pelos municípios, conforme a ADPF
            854 do STF.
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">12/2025</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/areasTematicas/contratacoesPublicas/obrasServicosEngenharia"
              target="_blank"
              rel="noopener noreferrer"
            >
              Obras e serviços de engenharia
            </a>
            : quantidades, valores firmados, contratados e pagos, com detalhes
            de situação e evolução de cada obra.
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">11/2025</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/areasTematicas/saneamentoBasico/residuosSolidos"
              target="_blank"
              rel="noopener noreferrer"
            >
              Observatório do saneamento básico - Resíduos Sólidos
            </a>
            : passa a abordar limpeza urbana e manejo de resíduos sólidos nos 78
            municípios capixabas, em seis painéis.
          </li>
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/areasTematicas/emendasParlamentares/emendas"
              target="_blank"
              rel="noopener noreferrer"
            >
              Emendas individuais impositivas por transferência especial
            </a>
            : dois painéis sobre as emendas e as respectivas despesas.
          </li>
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/areasTematicas/concessoesPPP/visaoGeral"
              target="_blank"
              rel="noopener noreferrer"
            >
              Desestatizações - Concessões comuns, PPP e privatizações
            </a>
            : antigo painel de Concessões comuns e PPP, agora com privatizações,
            entidades estruturadoras, verificadores e editais e contratos.
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">10/2025</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/areasTematicas/previdencia/visaoGeral/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Investimentos dos institutos de previdência
            </a>
            : panorama dos investimentos dos RPPS, com distribuição, enquadramento
            legal, fundos, DAIR, Pró-Gestão RPPS, comitês de investimento e
            certificações.
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">09/2025</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/areasTematicas/atosPessoal/concursoPublico"
              target="_blank"
              rel="noopener noreferrer"
            >
              Concursos públicos
            </a>
            : concursos para provimento de pessoal efetivo, que originam os atos
            de admissão encaminhados pelo CidadES.
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">07/2025</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/areasTematicas/atosPessoal/admissao"
              target="_blank"
              rel="noopener noreferrer"
            >
              Atos de pessoal de admissão e de concessão de benefícios
            </a>
            : decisões do TCEES sobre atos de admissão de pessoal e sobre atos de
            concessão inicial de aposentadoria, transferência para a reserva e
            reforma.
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">05/2025</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/areasTematicas/contratacoesPublicas/contratacoes"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contratações
            </a>
            : licitações, adesões a atas, contratações diretas, credenciamentos e
            chamamentos públicos celebrados pelos órgãos estaduais e municipais.
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">12/2024</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/municipio/2024/vitoria/previdencia/situacaoPrevidenciaria/077E0900001"
              target="_blank"
              rel="noopener noreferrer"
            >
              Índice de Situação Previdenciária 2024
            </a>
            : ISP-RPPS dos institutos de previdência do estado e dos municípios,
            calculado pela Secretaria de Previdência do Governo Federal.
          </li>
          <li>
            <Link href="/fiscalizacao/2023/iegm/geral" prefetch={false}>
              Painel sobre o Índice de Efetividade da Gestão Municipal (IEGM) 2023
            </Link>
            .
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">11/2024</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/areasTematicas/contratacoesPublicas/instrumentos"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instrumentos contratuais
            </a>
            : quantidades, valores firmados e contratados, situação, evolução e
            valores pagos e medidos dos instrumentos dos órgãos.
          </li>
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/estado/2024/previdenciaMilitares/segurados/500E2900001"
              target="_blank"
              rel="noopener noreferrer"
            >
              Painel sobre segurados do Fundo de Proteção Social dos Militares do
              Estado do Espírito Santo
            </a>
            : militares em atividade e beneficiários (reserva, reforma e pensão).
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">10/2024</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/estado/2023/previdencia/projecoesAtuariais/500E0900001"
              target="_blank"
              rel="noopener noreferrer"
            >
              Projeções atuariais
            </a>
            : agora é possível comparar receita, despesa e resultado orçamentário
            projetados com os valores executados.
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">09/2024</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/areasTematicas/educacao/visaoGeral/2024/todos/todos/null/null/1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Educação
            </a>
            : painéis atualizados com dados de 2023 (visão geral, escolas, Ideb,
            abandono escolar, Paebes e prova de fluência).
          </li>
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/areasTematicas/saude/planoSaude"
              target="_blank"
              rel="noopener noreferrer"
            >
              Planos Municipais de Saúde
            </a>
            : metas e cumprimento nos municípios, atualizados com dados de 2023.
          </li>
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/areasTematicas/assistenciaSocial/referenciamento"
              target="_blank"
              rel="noopener noreferrer"
            >
              Assistência Social
            </a>
            : capacidade de referenciamento, espaço físico, serviços e recursos
            humanos, atualizados com dados de 2023.
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">07/2024</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/estado/2024/previdenciaMilitares/receitas/500E2900001"
              target="_blank"
              rel="noopener noreferrer"
            >
              Painéis sobre Previdência dos Militares do Estado do Espírito Santo
            </a>
            : receitas, despesas, resultado atuarial e projeções atuariais.
          </li>
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/areasTematicas/patrimonio/visaoGeral"
              target="_blank"
              rel="noopener noreferrer"
            >
              Informações patrimoniais
            </a>
            : ativos, passivos, patrimônio líquido, variações patrimoniais e
            liquidez.
          </li>
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/municipio/2024/vitoria/gestaoFiscal/educacaoFundeb"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fundeb e limites com educação
            </a>
            : destinação e recebimento de recursos do Fundeb em 2024, com as
            despesas com educação comparadas aos limites legais.
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">06/2024</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/areasTematicas/saude/visaoGeral"
              target="_blank"
              rel="noopener noreferrer"
            >
              Painéis de saúde: estabelecimentos, leitos, equipamentos e gastos
            </a>
            : estabelecimentos, leitos, equipamentos e valores aplicados na função
            saúde por município.
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">05/2024</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/municipio/2023/vitoria/gestaoFiscal/capag"
              target="_blank"
              rel="noopener noreferrer"
            >
              Índice de Vulnerabilidade Fiscal (IVF) dos municípios
            </a>
            : grau de vulnerabilidade das finanças municipais, com base em
            endividamento, liquidez, margem e Índice de Situação Previdenciária.
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">04/2024</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/municipio/2024/vila-velha/previdencia/planoAmortizacao/076E0900001"
              target="_blank"
              rel="noopener noreferrer"
            >
              Planos de amortização dos RPPS (Regimes Próprios de Previdência
              Social)
            </a>
            : detalha o plano de amortização do déficit atuarial do RPPS.
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">03/2024</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/municipio/2023/vitoria/previdencia/contribuicaoPrevidenciaria/077E0900001"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contribuições Previdenciárias Patronais
            </a>
            : contribuições devidas e pagas pelas unidades gestoras municipais ao
            respectivo RPPS, extraídas das remessas mensais do CidadES.
          </li>
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/areasTematicas/pessoal/ingressosDesligamentos/2024/null/null/null/null/1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ingressos e desligamentos na Administração Pública
            </a>
            : agora com visualização por cargo e unidade gestora.
          </li>
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/areasTematicas/pessoal/vantagensDescontos/2024/null/null/null/null/1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vantagens e descontos na Administração Pública
            </a>
            : valores apurados em determinado período e sua evolução.
          </li>
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/areasTematicas/pessoal/afastamento/2024/null/null/null/null/1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Afastamentos na Administração Pública
            </a>
            : servidores afastados por lotação, cargo, tipo de afastamento e
            unidade gestora.
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">11/2023</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/areasTematicas/educacao/visaoGeral"
              target="_blank"
              rel="noopener noreferrer"
            >
              Painel de Educação
            </a>
            : passa a apresentar Ideb, Paebes, avaliação de fluência e taxa de
            abandono escolar.
          </li>
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/execucaoOrcamentaria/receita"
              target="_blank"
              rel="noopener noreferrer"
            >
              Execução orçamentária municipal
            </a>
            : arrecadação das receitas estimadas e realização das despesas
            autorizadas.
          </li>
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/areasTematicas/saneamentoBasico/aguaEsgoto"
              target="_blank"
              rel="noopener noreferrer"
            >
              Observatório do saneamento básico
            </a>
            : situação dos serviços de água e esgotamento sanitário no estado e
            em seus municípios, em sete painéis.
          </li>
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/areasTematicas/saude/planoSaude"
              target="_blank"
              rel="noopener noreferrer"
            >
              Planos municipais de saúde
            </a>
            : metas e cumprimento nos municípios do Espírito Santo.
          </li>
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/fiscalizacoes/crimesContraPatrimonio/2022"
              target="_blank"
              rel="noopener noreferrer"
            >
              Investigação dos crimes contra o patrimônio
            </a>
            : auditoria sobre a eficácia do esclarecimento dos crimes contra o
            patrimônio.
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">10/2023</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/municipio/2023/vitoria/previdencia/situacaoPrevidenciaria/077E0900001"
              target="_blank"
              rel="noopener noreferrer"
            >
              Índice de Situação Previdenciária 2023
            </a>
            : ISP-RPPS obtido pelos institutos de previdência do estado e dos
            municípios em 2023.
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">09/2023</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/rankings/2022/gestaoFiscal/balancoPatrimonial"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rankings sobre superávit e déficit financeiro
            </a>
            : além do ranking consolidado por município, foram criados rankings
            para os Regimes Próprios de Previdência Social (RPPS), para os demais
            órgãos (exceto RPPS) e para a relação entre superávit/déficit e a
            Receita Corrente Líquida (RCL).
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">08/2023</h5>
        <hr />
        <ul className="styled">
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/municipio/2023/vitoria/gestaoFiscal/capag"
              target="_blank"
              rel="noopener noreferrer"
            >
              Capacidade de Pagamento (CAPAG) dos municípios
            </a>
            : indica se um novo endividamento representa risco de crédito, com base
            em endividamento, poupança corrente e índice de liquidez.
          </li>
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/prestacaoConta/processo/2022/municipios/null/06/Gestão"
              target="_blank"
              rel="noopener noreferrer"
            >
              Disponibilização das Prestações de Contas Anuais não autuadas
            </a>
            : critérios adotados a partir do exercício de 2021 para a constituição
            de processos de PCA, conforme a Resolução TC 352/2021.
          </li>
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/municipio/2023/vitoria/gestaoFiscal/educacaoFundeb"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fundeb e limites com educação
            </a>
            : destinação e recebimento de recursos do Fundeb em 2023, com as
            despesas com educação comparadas aos limites legais.
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">07/2023</h5>
        <hr />
        <ul className="styled">
          <li>
            Informações de 2023 sobre
            <Link
              href="/municipio/2023/vitoria/gestaoFiscal-saude"
              prefetch={false}
            >
              limites com saúde
            </Link>
            e
            <Link
              href="/municipio/2023/vitoria/gestaoFiscal-receitaCorrenteLiquida"
              prefetch={false}
            >
              Receita Corrente Líquida (RCL)
            </Link>
            nos municípios.
          </li>
          <li>
            <a
              href="https://paineldecontrole.tcees.tc.br/areasTematicas/assistenciaSocial/referenciamento"
              target="_blank"
              rel="noopener noreferrer"
            >
              Painéis de Assistência Social
            </a>
            : informações do Censo do SUAS sobre os CRAS (capacidade de
            referenciamento, espaço físico e equipamentos, serviços e recursos
            humanos).
          </li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">05/2023</h5>
        <hr />
        <ul className="styled">
          <li>
            Painel sobre o
            <Link
              href="/municipio/2023/vitoria/gestaoFiscal-endividamento"
              prefetch={false}
            >
              endividamento
            </Link>
            nos municípios, considerando a sua Dívida Consolidada Líquida.
          </li>
          <li>
            <Link
              href="/municipio/2022/vitoria/previdencia-situacaoPrevidenciaria/077E0900001"
              prefetch={false}
            >
              Índice de Situação Previdenciária
            </Link>
            dos institutos de previdência do estado e dos municípios no ano de
            2022.
          </li>
          <li>
            Informações sobre
            <Link
              href="/municipio/2023/vitoria/gestaoFiscal-pessoal"
              prefetch={false}
            >
              limites com pessoal
            </Link>
            ,
            <Link
              href="/municipio/2023/vitoria/gestaoFiscal-limiteDespesaReceita"
              prefetch={false}
            >
              relação despesas correntes x receitas correntes
            </Link>
            e
            <Link
              href="/municipio/2023/vitoria/gestaoFiscal-alertaLRF"
              prefetch={false}
            >
              alertas
            </Link>
            nos municípios.
          </li>
          <li>
            Valor necessário a ser
            <Link
              href="/municipio/2022/conceicao-da-barra/visaoGeral"
              prefetch={false}
            >
              complementado na aplicação em educação
            </Link>
            até o final de 2023. Cinco municípios ainda necessitam realizar a
            complementação, por não terem aplicado o limite mínimo entre os anos
            de 2020 e 2021.
          </li>
        </ul>
      </div>

      <div className="p-2">
        <h5 className="mb-1 font-normal">03/2023</h5>
        <hr />
        <ul className="styled">
          <li>
            Resultado da Fiscalização sobre
            <Link href="/fiscalizacao/2022/saude/cancer-colo-de-utero" prefetch={false}>
              Câncer de colo de útero
            </Link>{" "}
            prefetch={false}, ano de 2022.
          </li>
          <li>
            Painéis sobre a Previdência (2023) do
            <Link
              href="/estado/2023/previdencia-receita/500E0900001"
              prefetch={false}
            >
              Estado
            </Link>
            e dos
            <Link
              href="/municipio/2022/vitoria/previdencia-receita/077E0900001"
              prefetch={false}
            >
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
            <Link href="/obrigacaoEnvio/2022/municipios" prefetch={false}>
              concessão
            </Link>
            , exigidas dos institutos de previdência do estado e dos municípios,
            a partir de julho/2022.
          </li>
          <li>
            Painel para
            <Link
              href="/prestacao-de-conta/2019/municipios/monitoramento/todos"
              prefetch={false}
            >
              monitoramento de providências
            </Link>
            a serem tomadas pelos órgãos, a partir das deliberações do TCEES.
          </li>
          <li>
            Painel sobre
            <Link href="/julgamentoContas/2020/visaoGeral" prefetch={false}>
              julgamento das contas
            </Link>
            dos chefes do poder executivo.
          </li>
          <li>
            O painel de{" "}
            <Link href="/obras" prefetch={false}>
              obras públicas
            </Link>{" "}
            passa a exibir todas as obras do estado e dos municípios, e não
            apenas as paralisadas ou em andamento, mas com necessidade de
            atenção especial.
          </li>
          <li>
            Novas informações sobre os programas do
            <Link
              href="/municipio/2022/vitoria/gestaoOrcamentaria-planoPlurianual"
              prefetch={false}
            >
              Plano Plurianual (PPA)
            </Link>
            : indicador, situação problema e objetivo do desenvolvimento
            sustentável.
          </li>

          <li>
            Incluídos dados de 2021 no painel sobre
            <Link
              href="/municipio/2021/vitoria/gestaoOrcamentaria-enfrentamentoCovid"
              prefetch={false}
            >
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
            Painel sobre{" "}
            <Link href="/projecao" prefetch={false}>
              projeções
            </Link>{" "}
            dos gastos com pessoal do Estado e dos municípios.
          </li>
          <li>
            Resultado da Fiscalização de
            <Link
              href="/fiscalizacao/2021/saude/mamografia-de-rastreamento"
              prefetch={false}
            >
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
            Painel sobre{" "}
            <Link href="/obras" prefetch={false}>
              obras
            </Link>{" "}
            paralisadas ou em andamento, mas com necessidade de atenção
            especial.
          </li>
          <li>
            Informações sobre
            <Link
              href="/municipio/2022/vitoria/gestaoFiscal-educacao"
              prefetch={false}
            >
              educação
            </Link>
            e
            <Link
              href="/municipio/2022/vitoria/gestaoFiscal-educacaoFundeb"
              prefetch={false}
            >
              Fundeb
            </Link>
            no estado e nos municípios.
          </li>
          <li>
            Informações sobre
            <Link
              href="/municipio/2022/vitoria/gestaoFiscal-saude"
              prefetch={false}
            >
              limites com saúde
            </Link>
            nos municípios.
          </li>
          <li>
            <Link
              href="/municipio/2021/vitoria/previdencia-situacaoPrevidenciaria/077E0900001"
              prefetch={false}
            >
              Índice de Situação Previdenciária
            </Link>
            dos institutos de previdência do estado e dos municípios no ano de
            2021.
          </li>
          <li>
            Painel com valores da
            <Link
              href="/municipio/2022/vitoria/gestaoFiscal-receitaCorrenteLiquida"
              prefetch={false}
            >
              Receita Corrente Líquida municipal.
            </Link>
          </li>
          <li>
            Situação das
            <Link href="/obrigacaoEnvio/2022/municipios" prefetch={false}>
              obrigações relacionadas ao envio das remessas de contratação
            </Link>
            , a partir de abril de 2022.
          </li>
          <li>
            Painel com informações sobre
            <Link href="/area-tematica/educacao/visao-geral" prefetch={false}>
              Educação
            </Link>
            , como distribuição de escolas públicas, matrículas e profissionais
            da educação.
          </li>
          <li>
            Resultado da Fiscalização sobre
            <Link
              href="/fiscalizacao/2020/educacao/desigualdade-educacional/manifestacao-tecnica"
              prefetch={false}
            >
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
            <Link
              href="/municipio/2022/vitoria/gestao-orcamentaria/plano-plurianual"
              prefetch={false}
            >
              Plano Plurianual (PPA) 2022-2025
            </Link>
            e de seus programas.
          </li>
          <li>
            Informações sobre planejamento e execução da
            <Link
              href="/municipio/2022/vitoria/gestao-orcamentaria/diretrizes-orcamentarias"
              prefetch={false}
            >
              Lei de Diretrizes Orçamentárias (LDO) 2022
            </Link>
            e de seus programas.
          </li>
          <li>
            Informações sobre a execução de
            <Link
              href="/municipio/2022/vitoria/gestao-orcamentaria/acoes"
              prefetch={false}
            >
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
            <Link href="/estado/2022/obrigacaoEnvio" prefetch={false}>
              PCM (Prestação de Contas Mensal) pelos órgãos estaduais
            </Link>
            .
          </li>
          <li>
            Painéis sobre o
            <Link href="/estado/2022/visao-geral" prefetch={false}>
              {" "}
              Estado (2022)
            </Link>
            , contendo informações como receitas, despesas, metas e limites
            previstos na Lei de Responsabilidade Fiscal.
          </li>
          <li>
            Painéis sobre a Previdência (2022) do
            <Link
              href="/estado/2022/previdencia-receita/500E0900001"
              prefetch={false}
            >
              Estado
            </Link>
            e dos
            <Link
              href="/municipio/2022/vitoria/previdencia-receita/077E0900001"
              prefetch={false}
            >
              municípios
            </Link>
            .
          </li>
          <li>
            Informações sobre
            <Link
              href="/municipio/2022/vitoria/gestao-fiscal/pessoal"
              prefetch={false}
            >
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
            <Link
              href="/area-tematica/concessao-publica/visao-geral"
              prefetch={false}
            >
              Concessão Comum e Parceria Público-Privada
            </Link>
            no Espírito Santo.
          </li>
          <li>
            Resultado da Fiscalização de
            <Link href="/fiscalizacao/2021/saude/doencas-cronicas-nao-transmissiveis" prefetch={false}>
              Doenças Crônicas Não Transmissíveis
            </Link>
            no ano de 2021.
          </li>
          <li>
            Painel sobre a
            <Link
              href="/area-tematica/estrutura-administrativa"
              prefetch={false}
            >
              Estrutura Administrativa
            </Link>
            , com informações referentes aos cargos, empregos e funções públicas
            no Estado e nos municípios.
          </li>
        </ul>
      </div>

      <div className="p-2">
        <h5 className="mb-1 font-normal">03/2022</h5>
        <hr />
        <ul className="styled">
          <li>
            Resultado da Fiscalização de
            <Link href="/transparencia-portal/2020/executivo" prefetch={false}>
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
            <Link
              href="/estado/2021/gestaoFiscal-limiteDespesaReceita"
              prefetch={false}
            >
              Estado
            </Link>
            e nos
            <Link
              href="/municipio/2021/vitoria/gestaoFiscal-limiteDespesaReceita"
              prefetch={false}
            >
              municípios
            </Link>
            .
          </li>
          <li>
            Ranking que permite comparar a
            <Link
              href="/rankings/2021/gestao-fiscal/despesa-corrente-x-receita-corrente"
              prefetch={false}
            >
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
            <Link href="#dobra-slide-videos" prefetch={false}>
              Vídeos
            </Link>{" "}
            da série que explica o funcionamento do Painel de Controle.
          </li>
          <li>
            Painéis sobre a
            <Link
              href="/estado/2020/previdencia-receita/500E0900001"
              prefetch={false}
            >
              Previdência dos Poderes Estaduais
            </Link>
            , com informações sobre receitas, despesas, patrimônio, resultado
            atuarial, projeções atuariais e situação previdenciária.
          </li>
          <li>
            <Link
              href="/municipio/2020/vitoria/previdencia-projecaoAtuarial/077E0900001"
              prefetch={false}
            >
              Projeções atuariais
            </Link>
            dos institutos de previdência municipais.
          </li>
          <li>
            <Link href="/boletins/2021/informativo" prefetch={false}>
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
            <Link
              href="/municipio/2020/vitoria/gestaoOrcamentaria-enfrentamentoCovid"
              prefetch={false}
            >
              enfrentamento da calamidade pública de Covid-19
            </Link>
            .
          </li>
          <li>
            Painel sobre
            <Link
              href="/folha-de-pagamento/executivo-municipal/2021/contratacoes-e-demissoes/077"
              prefetch={false}
            >
              ingressos e desligamentos
            </Link>
            ocorridos na Administração Pública estadual e municipal.
          </li>
          <li>
            Painel sobre o
            <Link href="/fiscalizacao/2018/iegm/geral" prefetch={false}>
              Índice de Efetividade da Gestão Municipal (IEGM) 2018
            </Link>
            .
          </li>
          <li>
            Painel sobre o
            <Link href="/controle-interno/2020/executivo" prefetch={false}>
              Levantamento de Controle Interno dos municípios
            </Link>
            para o ano de 2020.
          </li>
          <li>
            Painel com informações sobre
            <Link
              href="/municipio/2021/vitoria/previdencia-patrimonio/077E0900001"
              prefetch={false}
            >
              Patrimônio
            </Link>
            dos Regimes Próprios de Previdência Social municipais, referentes ao
            ano de 2021.
          </li>
          <li>
            Painel com informações sobre
            <Link
              href="/municipio/2021/vitoria/previdencia-resultadoAtuarial/077E0900001"
              prefetch={false}
            >
              Resultado atuarial
            </Link>
            dos Regimes Próprios de Previdência Social municipais, referentes ao
            ano de 2021.
          </li>
        </ul>
      </div>

      <div className="p-2">
        <h5 className="mb-1 font-normal">07/2021</h5>
        <hr />
        <ul className="styled">
          <li>
            Relatório de Levantamento sobre as
            <Link href="/saude/acoedivdemia/2020" prefetch={false}>
              ações realizadas pelos municípios capixabas para o enfrentamento
              da crise causada pela pandemia da Covid-19
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
            <Link
              href="/indicadores/consolidados/2021/receita-orcamentaria/antecipacao"
              prefetch={false}
            >
              indicadores consolidados, sobre Alertas da Lei de Responsabilidade
              Fiscal (LRF)
            </Link>
            feitos aos municípios.
          </li>
          <li>
            Painel com informações sobre planejamento e execução do
            <Link
              href="/municipio/2018/vitoria/gestao-orcamentaria/plano-plurianual"
              prefetch={false}
            >
              Plano Plurianual (PPA)
            </Link>
            e de seus programas.
          </li>
          <li>
            Painel com informações sobre planejamento e execução da
            <Link
              href="/municipio/2018/vitoria/gestao-orcamentaria/diretrizes-orcamentarias"
              prefetch={false}
            >
              Lei de Diretrizes Orçamentárias (LDO)
            </Link>
            e de seus programas.
          </li>
          <li>
            Painel com informações sobre a execução de
            <Link
              href="/municipio/2018/vitoria/gestao-orcamentaria/acoes"
              prefetch={false}
            >
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
            <Link href="/area-tematica/saude/visao-geral" prefetch={false}>
              saúde.
            </Link>
          </li>
          <li>
            Painel com informações sobre
            <Link
              href="/municipio/2020/vitoria/previdencia-patrimonio/077E0900001"
              prefetch={false}
            >
              Patrimônio
            </Link>
            dos Regimes Próprios de Previdência Social municipais, referentes ao
            ano de 2020.
          </li>
          <li>
            Painel com informações sobre
            <Link
              href="/municipio/2020/vitoria/previdencia-resultadoAtuarial/077E0900001"
              prefetch={false}
            >
              Resultado atuarial
            </Link>
            dos Regimes Próprios de Previdência Social municipais, referentes ao
            ano de 2020.
          </li>
        </ul>
      </div>

      <div className="p-2">
        <h5 className="mb-1 font-normal">02/2021</h5>
        <hr />
        <ul className="styled">
          <li>
            Comparação entre o
            <Link
              href="/municipio/2020/vitoria/previdencia-situacaoPrevidenciaria/077E0900001"
              prefetch={false}
            >
              Índice de Situação Previdenciária
            </Link>
            , obtido pelos institutos de previdência municipais nos anos de 2019
            e 2020.
          </li>
          <li>
            Melhoria na exibição das informações sobre
            <Link
              href="/municipio/2020/vitoria/previdencia-segurados/077E0900001"
              prefetch={false}
            >
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
            <Link
              href="folha-de-pagamento/executivo-municipal/2020/contratacoes-e-demissoes"
              prefetch={false}
            >
              Consulta de vínculos
            </Link>
            dos servidores estaduais e municipais.
          </li>
          <li>
            Novos gráficos sobre vantagens e descontos, no painel de
            <Link
              href="folha-de-pagamento/executivo-estadual/2020/1/visao-geral"
              prefetch={false}
            >
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
            <Link href="/area-tematica/saude/estabelecimentos" prefetch={false}>
              saúde.
            </Link>
          </li>
        </ul>
      </div>

      <div className="p-2">
        <h5 className="mb-1 font-normal">11/2020</h5>
        <hr />
        <ul className="styled">
          <li>
            Painel com informações sobre
            <Link
              href="/municipio/2020/vitoria/previdencia-segurados/077E0900001"
              prefetch={false}
            >
              Segurados dos institutos de previdência municipais
            </Link>
            , referentes ao ano de 2020.
          </li>
          <li>
            Painel com informações sobre o
            <Link href="/fiscalizacao/2019/iege" prefetch={false}>
              Índice de Efetividade da Gestão Estadual (IEGE)
            </Link>
            , referente ao exercício de 2019
          </li>
          <li>
            Painel com informações sobre o
            <Link
              href="/municipio/2020/vitoria/previdencia-situacaoPrevidenciaria/077E0900001"
              prefetch={false}
            >
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
            <Link
              href="/municipio/2019/vitoria/previdencia-situacaoPrevidenciaria/077E0900001"
              prefetch={false}
            >
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
            <Link
              href="/folha-de-pagamento/executivo-municipal/2020/1/visaoGeral/019"
              prefetch={false}
            >
              pessoal e folha de pagamento
            </Link>
            no Estado e nos municípios.
          </li>
          <li>
            Painel{" "}
            <Link href="/estado/2020/visaoGeral" prefetch={false}>
              visão geral
            </Link>{" "}
            do Estado.
          </li>
          <li>
            <Link
              href="/estado/2020/gestaoFiscal-metaDeArrecadacao"
              prefetch={false}
            >
              Desempenho da receita total
            </Link>
            do Estado.
          </li>
          <li>
            <Link
              href="/estado/2020/gestaoFiscal-educacaoFundeb"
              prefetch={false}
            >
              Evolução anual da aplicação no Magistério
            </Link>
            do Estado.
          </li>
          <li>
            <Link
              href="/estado/2020/gestaoFiscal-receitaCorrenteLiquida"
              prefetch={false}
            >
              Evolução anual RCL (Receita Corrente Líquida) e RCL Ajustada
            </Link>
            do Estado.
          </li>
          <li>
            <Link
              href="/estado/2020/gestaoFiscal-resultadoNominal"
              prefetch={false}
            >
              Evolução mensal do Resultado Nominal
            </Link>
            do Estado.
          </li>
          <li>
            Novos gráficos sobre desempenho das receitas de capital e corrente
            dos municípios, no painel de Metas de Arrecadação.
          </li>
        </ul>
      </div>

      <div className="p-2">
        <h5 className="mb-1 font-normal">07/2020</h5>
        <hr />
        <ul className="styled">
          <li>
            Painel com
            <Link
              href="/estado/2020/gestaoOrcamentaria-despesaPorPoder"
              prefetch={false}
            >
              despesas dos poderes estaduais
            </Link>
            , classificadas por fonte e natureza.
          </li>
          <li>
            <Link
              href="/estado/2020/gestaoFiscal-resultadoNominal"
              prefetch={false}
            >
              Resultado nominal estadual
            </Link>
            do mês, bem como de sua evolução anual.
          </li>
          <li>
            Evolução anual do
            <Link
              href="/estado/2020/gestaoFiscal-resultadoPrimario"
              prefetch={false}
            >
              resultado primário estadual
            </Link>
            .
          </li>
          <li>
            Evolução anual da dívida consolidada líquida, operações de créditos
            e garantias concedidas no
            <Link
              href="/estado/2020/gestaoFiscal-endividamento"
              prefetch={false}
            >
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
            <Link
              href="/estado/2020/gestaoOrcamentaria-despesa"
              prefetch={false}
            >
              despesas liquidadas por função
            </Link>
            , referentes ao Estado
          </li>
          <li>
            Novos seção com dados do
            <Link
              href="/estado/2020/gestaoFiscal-educacaoFundeb"
              prefetch={false}
            >
              Fundeb
            </Link>
            , referentes ao Estado
          </li>
          <li>
            Disponibilização de dados históricos de Fundeb municipal, referentes
            aos anos de 2013 e 2017
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
            <Link href="/estado/2020/boletimExtraordinario" prefetch={false}>
              boletins extraordinários
            </Link>
            , com projeções para o Estado e os municípios, referentes a temas
            como receitas e despesas
          </li>
        </ul>
      </div>

      <div className="p-2">
        <h5 className="mb-1 font-normal">04/2020</h5>
        <hr />
        <ul className="styled">
          <li>
            Novos gráficos para comparação entre comportamento da
            <Link
              href="/estado/2020/gestaoOrcamentaria-receita"
              prefetch={false}
            >
              receita
            </Link>{" "}
            no ano corrente e no ano anterior
          </li>
          <li>
            Novos gráficos para comparação entre comportamento do
            <Link
              href="/estado/2020/gestaoOrcamentaria-despesa"
              prefetch={false}
            >
              resultado orçamentário
            </Link>
            no ano corrente e no ano anterior
          </li>
          <li>
            Novos gráficos sobre a evolução da
            <Link href="/estado/2020/gestaoFiscal-pessoal" prefetch={false}>
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
            Disponibilizada a opção de Previdência nos Indicadores Consolidados
          </li>
          <li>
            Disponibilizados dados de
            <Link
              href="/estado/2019/gestaoFiscal-resultadoPrimario"
              prefetch={false}
            >
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
            <Link href="/fiscalizacoes/2019/escolas" prefetch={false}>
              &quot;Educação - Levantamento Oferta x Demanda&quot;
            </Link>
            , que apresenta a oferta e demanda por vagas nas redes públicas
            estaduais e municipais de ensino
          </li>
          <li>
            Nova seção
            <Link href="/fiscalizacao/receita-municipal" prefetch={false}>
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
            Nova seção &quot;Previdência&quot;, onde são apresentados os dados
            de instituto e fundos de previdência dos municípios que possuem
            regime próprio de previdência social
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
              title="Indicadores Consolidados"
              href="/indicadoresConsolidados/2020/antecipacaoReceitasOrcamentarias"
              prefetch={false}
            >
              &quot;Indicadores Consolidados/&quot;
            </Link>
            dos 78 municípios, com dados organizados por área temática
          </li>
          <li>
            Nova seção &quot;Destino do dinheiro&quot;, que apresenta com quais
            despesas foi utilizado o dinheiro proveniente de determinadas fontes
            de recursos
          </li>
          <li>
            Novos dados de &quot;FUNDEB&quot;, onde são apresentados os recursos
            destinados e recebidos pelos municípios e Estado
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
              prefetch={false}
            >
              &quot;Comparação entre municípios&quot;
            </Link>
          </li>
          <li>
            Dados de envio de remessa de &quot;
            <Link href="/obrigacaoEnvio/2020/municipios" prefetch={false}>
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
              prefetch={false}
            >
              &quot;Prestações de Contas Anuais&quot;
            </Link>
          </li>
          <li>
            Ranking de &quot;
            <Link
              href="/rankings/2020/educacao/recurso-fundeb"
              prefetch={false}
            >
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
            Melhorias diversas na interface, oferecendo maior compatibilidade
            com celulares e outros dispositivos
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
              title="Obrigações junto ao TCE-ES"
              href="/obrigacaoEnvio/2018/municipios"
              prefetch={false}
            >
              &quot;Obrigações junto ao TCEES&quot;
            </Link>
          </li>
          <li>
            Nova aba &quot;Leis de Orçamento&quot; com opção de download dos
            documentos referentes ao planejamento orçamentário (PPA, LOA e LDO)
          </li>
          <li>Informações detalhadas das Unidades Gestoras dos municípios</li>
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
              title="Poder Legislativo (artigo 29-A da Constituição Federal)"
              href="/rankings/2016/despesa/poder-legislativo"
              prefetch={false}
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
          <li>Distribuição das despesas por função, subfunção e natureza</li>
          <li>Distribuição das receitas por natureza</li>
          <li>Disponibilização das informações no formato de dados abertos</li>
        </ul>
      </div>
      <div className="p-2">
        <h5 className="mb-1 font-normal">08/2017</h5>
        <hr />
        <ul className="styled">
          <li>Dados atualizados diariamente</li>
          <li>
            Informações sobre recebimento das remessas de dados dos municípios
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
            <Link href="/fiscalizacao/2015/iegm/geral" prefetch={false}>
              Índice de Efetividade da Gestão Municipal
            </Link>
            de 2015
          </li>
          <li>
            Resultado da Fiscalização de
            <Link
              href="/fiscalizacao/2018/transparencia-passiva/prefeituras"
              prefetch={false}
            >
              Transparência Passiva dos Municípios
            </Link>
          </li>
          <li>
            Ranking de &quot;
            <Link
              href="/rankings/2017/resultado/despesa-liquidada-x-receita-arrecadada"
              prefetch={false}
            >
              Receitas Arrecadadas x Despesas Liquidadas
            </Link>
            &quot;
          </li>
          <li>
            Ranking de &quot;
            <Link
              href="/rankings/2017/resultado/despesa-liquidada-x-despesa-paga"
              prefetch={false}
            >
              Despesas Liquidadas x Despesas Pagas
            </Link>
            &quot;
          </li>
          <li>
            Painel de Controle de
            <Link href="/boletins/2017/" prefetch={false}>
              Macrogestão Governamental
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
