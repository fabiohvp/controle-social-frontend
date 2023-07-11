import Modal, { ModalProps } from "@/components/layout/modal/Modal";

export default function ModalGlossario({ setShow, show }: ModalProps) {
  return (
    <Modal setShow={setShow} show={show}>
      <div>Glossário</div>
      <div className="flex flex-col gap-4 text-sm">
        <p style={{ textAlign: "justify" }}>
          <strong>Antecipação de Receitas Orçamentárias:</strong> é uma operação
          de crédito que se destina a atender insuficiência de caixa durante o
          exercício financeiro, devendo ser liquidada, com juros e outros
          encargos incidentes, até o dia dez de dezembro de cada ano, sendo
          proibida enquanto existir operação anterior da mesma natureza não
          integralmente resgatada, além de outros requisitos previstos na Lei de
          Responsabilidade Fiscal, podendo o ente dar em garantia a receita dos
          impostos de sua competência tributária. Por ser considerada receita
          extraorçamentária, independe de autorização legislativa.
        </p>

        <p style={{ textAlign: "justify" }}>
          <strong>Despesas Empenhadas:</strong> parcela do orçamento do
          município que foi reservado para o pagamento de compromissos assumidos
          com terceiros.
        </p>

        <p style={{ textAlign: "justify" }}>
          <strong>Despesas Liquidadas:</strong> parcela do orçamento do
          município correspondente ao direito adquirido pelos seus credores de
          receberem o pagamento. É o segundo estágio da execução da despesa,
          posterior ao empenho e anterior ao pagamento.
        </p>

        <p style={{ textAlign: "justify" }}>
          <strong>Dívida Consolidada:</strong> a dívida pública consolidada
          corresponde ao montante total, apurado sem duplicidade, das obrigações
          financeiras, inclusive as decorrentes de emissão de títulos, do
          Estado, do Distrito Federal ou do Município, assumidas em virtude de
          leis, contratos, convênios ou tratados e da realização de operações de
          crédito para amortização em prazo superior a 12 (doze) meses, dos
          precatórios judiciais emitidos a partir de 5 de maio de 2000 e não
          pagos durante a execução do orçamento em que houverem sido incluídos,
          e das operações de crédito, que, embora de prazo inferior a 12 (doze)
          meses, tenham constado como receitas no orçamento.
        </p>

        <p style={{ textAlign: "justify" }}>
          <strong>Educação, aplicação em:</strong> total de recursos públicos do
          município aplicados em políticas públicas de educação.
        </p>

        <p style={{ textAlign: "justify" }}>
          <strong>Função:</strong> forma de classificação da despesa que utiliza
          categorias predefinidas e que identifica em que áreas a ação
          governamental que está sendo paga será realizada. A função é o maior
          nível de agregação das diversas áreas de atuação do setor público.
        </p>

        <p style={{ textAlign: "justify" }}>
          <strong>Garantia e Contra-Garantia:</strong> enquanto a Garantia são
          Fianças e avais concedidos pelo ente federativo, em operações de
          crédito, inclusive com recursos de fundos de aval, a assunção de risco
          creditício em linhas de crédito, o seguro de crédito à exportação e
          outras garantias de natureza semelhante que representem compromisso de
          adimplência de obrigação financeira ou contratual; a Contra-Garantia
          representa a contrapartida oferecida pelo ente federativo que irá
          receber uma garantia, de forma que seja em valor igual ou superior ao
          da garantia a ser concedida, e que abranja o ressarcimento integral
          dos custos financeiros decorrentes da cobertura de eventual
          inadimplemento.
        </p>

        <p style={{ textAlign: "justify" }}>
          <strong>IPCA (Índice de Preços ao Consumidor Amplo):</strong> O IPCA é
          considerado o índice oficial de inflação no Brasil, medido mensalmente
          pelo IBGE (Instituto Brasileiro de Geografia e Estatística). Através
          dele, por exemplo, é possível avaliar a variação dos preços no
          comércio para o público final; medir a rentabilidade de alguns
          investimentos e, também, atualizar dados monetários de anos
          anteriores, o que significa, na prática, trazê-los ao valor presente.
        </p>

        <p style={{ textAlign: "justify" }}>
          <strong>LRF (Lei de Responsabilidade Fiscal):</strong> estabelece
          normas de finanças públicas voltadas para a responsabilidade na gestão
          fiscal, assegurar a transparência dos gastos públicos e demonstrar a
          execução das metas fiscais e a observância de limites de gastos.
        </p>

        <p style={{ textAlign: "justify" }}>
          <strong>Limite Constitucional:</strong> percentual de gastos ou
          percentual de aplicação de recursos realizado pelo município, cujo
          regramento (limites mínimo e máximo) se encontra na Constituição
          Federal de 1988.
        </p>

        <p style={{ textAlign: "justify" }}>
          <strong>Limite da LRF:</strong> percentual de gastos ou percentual de
          aplicação de recursos realizado pelo município, cujo regramento
          (limites mínimo e máximo) se encontra na Lei de Responsabilidade
          Fiscal (Lei Complementar 101/2000).
        </p>

        <p style={{ textAlign: "justify" }}>
          <strong>Meta Bimestral de Arrecadação:</strong> meta estabelecida, a
          cada dois meses, pelo Poder Executivo para a arrecadação das receitas
          previstas na Lei Orçamentária Anual – LOA.
        </p>

        <p style={{ textAlign: "justify" }}>
          <strong>Natureza:</strong> forma de classificação da despesa que
          utiliza os seguintes níveis hierárquicos: categoria econômica, grupo
          de natureza da despesa, modalidade de aplicação, elemento de despesa e
          subelemento de despesa.
        </p>

        <p style={{ textAlign: "justify" }}>
          <strong>Operações de Crédito:</strong> compromisso financeiro assumido
          em razão de: mútuo; abertura de crédito; emissão e aceite de título;
          aquisição financiada de bens; recebimento antecipado de valores
          provenientes da venda a termo de bens e serviços; arrendamento
          mercantil; e outras operações assemelhadas, inclusive com o uso de
          derivativos financeiros.
        </p>

        <p style={{ textAlign: "justify" }}>
          <strong>Pessoal, despesa total com:</strong> compreende o somatório
          dos gastos com ativos, inativos e pensionistas, deduzidos alguns itens
          explicitados pela LRF (Lei de Responsabilidade Fiscal).
        </p>

        <p style={{ textAlign: "justify" }}>
          <strong>Pendente de apreciação:</strong> situação na qual o Processo
          de Prestação de Contas do Município encontra-se em trâmite no TCE-ES,
          não tendo havido ainda apreciação plenária e consequente emissão de
          Parecer Prévio ou Acórdão.
        </p>

        <p style={{ textAlign: "justify" }}>
          <strong>Per capita:</strong> expressão latina que significa &quot;por
          cabeça&quot;. No contexto do Painel de Controle é utilizado para se
          calcular valores associados ao cada habitante do município ou estado.
        </p>

        <p style={{ textAlign: "justify" }}>
          <strong>RCL:</strong> a Receita Corrente Líquida, segundo definição da
          Secretaria do Tesouro Nacional, é o somatório das receitas
          tributárias, de contribuições, patrimoniais, agropecuárias,
          industriais, de serviços, transferências correntes e outras receitas
          correntes, deduzidos alguns itens explicitados pela LRF (Lei de
          Responsabilidade Fiscal).
        </p>

        <p style={{ textAlign: "justify" }}>
          <strong>Receitas Arrecadadas:</strong> total de impostos, taxas,
          contribuições, transferências e outras fontes de recursos arrecadados
          pelo município e usadas para custear as despesas públicas e as
          necessidades de investimentos.
        </p>

        <p style={{ textAlign: "justify" }}>
          <strong>Resultado Nominal:</strong> para fins do arcabouço normativo
          criado pela LRF e pela RSF nº 40/2001, o resultado nominal representa
          a variação da Dívida Consolidada Líquida em dado período e pode ser
          obtido a partir do resultado primário por meio da soma da conta de
          juros (juros ativos menos juros passivos).
        </p>

        <p style={{ textAlign: "justify" }}>
          <strong>Resultado Primário:</strong> resultado obtido a partir da
          comparação entre receitas e despesas orçamentárias de um dado período
          que impactam efetivamente a dívida estatal. O resultado primário pode
          ser entendido, então, como o esforço fiscal direcionado à diminuição
          do estoque da dívida pública.
        </p>

        <p style={{ textAlign: "justify" }}>
          <strong>Subfunção:</strong> forma de classificação da despesa que
          trata de um nível de agregação imediatamente inferior à função.
          Diferentemente da função, a subfunção não está relacionada à
          competência institucional do órgão, mas sim à finalidade da ação
          governamental em si.
        </p>
      </div>
      <div>
        <button
          className="bg-sky-700 text-white px-6 py-2 text-sm outline-none focus:outline-none rounded"
          type="button"
          onClick={() => setShow(false)}
        >
          Fechar
        </button>
      </div>
    </Modal>
  );
}
