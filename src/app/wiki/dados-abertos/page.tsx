import WikiLayout from "@/components/layout/wiki/WikiLayout";
import ExternalLink from "@/components/links/ExternalLink";
import Image from "next/image";
import { BsCurrencyDollar } from "react-icons/bs";
import {
  FaArrowRight,
  FaBuilding,
  FaCircleChevronDown,
  FaGraduationCap,
  FaHeartPulse,
  FaPerson,
  FaSignal,
} from "react-icons/fa6";
import "./dadosAbertos.css";

export default function Page() {
  return (
    <WikiLayout title="Dados Abertos">
      <div>
        <p>
          <ExternalLink href="https://opendatahandbook.org/guide/pt_BR/what-is-open-data/">
            Dados abertos
          </ExternalLink>
          &nbsp; podem ser livremente usados, reutilizados e redistribuídos por
          qualquer pessoa. O Tribunal de Contas do Espírito Santo disponibiliza
          nesta seção, em formato aberto, o acesso aos dados para utilização dos
          interessados. Os dados abertos referente às demais atividades do
          TCE-ES estão disponíveis no{" "}
          <ExternalLink href="https://www.tcees.tc.br/portal-da-transparencia/dados-abertos/">
            Portal da Transparência
          </ExternalLink>
          .
        </p>
        <br />
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-4">
        <RoundItems />
      </div>

      <div className="flex flex-col gap-5 mt-5">
        <section>
          <h4 className="mb-1">A quem se destina</h4>
          <p>
            Os principais utilizadores dos nossos dados abertos são
            desenvolvedores de aplicações, acadêmicos, pesquisadores,
            jornalistas, analistas e cientistas de dados, ONGs, órgãos públicos
            e cidadãos em geral que possuam familiaridade com manipulação de
            dados. E, indiretamente, toda a sociedade será beneficiada com os
            produtos gerados a partir dos dados abertos disponibilizados.
          </p>
        </section>
        <section>
          <h4 className="mb-1">Benefícios</h4>
          <p>
            A disponibilização de dados em formato aberto pode gerar diversos
            efeitos positivos para a sociedade. Por exemplo:
          </p>
          <ul className="styled">
            <li>Avanço na transparência das ações dos governos;</li>
            <li>
              Aperfeiçoamento da troca de informações entre órgãos e esferas de
              governo;
            </li>
            <li>
              Estímulo aos cidadãos para o acompanhamento de políticas públicas;
            </li>
            <li>
              Estímulo aos governos para a melhoria dos resultados alcançados;
            </li>
            <li>Estímulo à sociedade em iniciativas de inovação e pesquisa.</li>
          </ul>
        </section>
        <section>
          <h4 className="mb-1">Plataforma &quot;Dados ES&quot;</h4>
          <p>
            Para gerar comodidade aos cidadãos o TCEES publica seus dados
            abertos na plataforma
            <ExternalLink href="https://dados.es.gov.br/">
              &quot;Dados ES&quot;
            </ExternalLink>
            . Trata-se de uma iniciativa do Governo do Estado com o objetivo de
            concentrar e facilitar o acesso a dados sociais, econômicos e
            administrativos gerados pelos órgãos públicos estaduais do ES. Além
            do download dos arquivos de dados também está disponível um conjunto
            de API para viabilizar o desenvolvimento de aplicativos pela própria
            sociedade.
          </p>
        </section>
      </div>
    </WikiLayout>
  );
}

function RoundItems() {
  return (
    <>
      <ExternalLink
        className="item-round"
        href="https://dados.es.gov.br/dataset/saude-educacao-pessoal/resource/ebeac6e4-50a2-4aa4-a94a-363e48a0f236"
      >
        <div className="icon">
          <FaHeartPulse />
        </div>
        <div className="title">Saúde</div>
      </ExternalLink>
      <ExternalLink
        className="item-round"
        href="https://dados.es.gov.br/dataset/saude-educacao-pessoal/resource/189ec1f5-abed-4f0f-97c0-4fb858871a47"
      >
        <div className="icon">
          <FaGraduationCap />
        </div>
        <div className="title">Educação</div>
      </ExternalLink>
      <ExternalLink
        className="item-round"
        href="https://dados.es.gov.br/dataset/iegm"
      >
        <div className="icon">
          <FaSignal />
        </div>
        <div className="title">IEGM</div>
      </ExternalLink>
      <ExternalLink
        className="item-round"
        href="https://dados.es.gov.br/dataset/saude-educacao-pessoal/resource/e11b62a5-0bb1-4250-a899-8b37f13b086c"
      >
        <div className="icon">
          <FaPerson />
        </div>
        <div className="title">Pessoal</div>
      </ExternalLink>
      <ExternalLink
        className="item-round"
        href="https://dados.es.gov.br/dataset/receitas-municipios"
      >
        <div className="icon fa-receita">
          <FaArrowRight />
          <BsCurrencyDollar />
        </div>
        <div className="title">Receitas</div>
      </ExternalLink>
      <ExternalLink
        className="item-round"
        href="https://dados.es.gov.br/dataset/despesas-municipios"
      >
        <div className="icon fa-despesa">
          <BsCurrencyDollar />
          <FaArrowRight />
        </div>
        <div className="title">Despesa</div>
      </ExternalLink>
      <ExternalLink
        className="item-round"
        href="https://dados.es.gov.br/dataset/resultados-de-fiscalizacoes-do-tcees"
      >
        <div className="icon">
          <Image
            src="/icons/fiscalizacoes.png"
            alt="Fiscalizações"
            height={36}
            width={28}
          />
        </div>
        <div className="title">Fiscalizações</div>
      </ExternalLink>
      <ExternalLink
        className="item-round"
        href="https://dados.es.gov.br/dataset/obrigacoes/resource/95b7bac4-7b0e-47ad-b977-acff41368f69"
      >
        <div className="icon">
          <FaBuilding />
        </div>
        <div className="title">Unidades Gestoras</div>
      </ExternalLink>
      <ExternalLink
        className="item-round"
        href="https://dados.es.gov.br/dataset/obrigacoes/resource/7ca25b42-154b-475f-a8fc-71624ef3fc28"
      >
        <div className="icon">
          <FaCircleChevronDown />
        </div>
        <div className="title">Consistências CidadES</div>
      </ExternalLink>
      <ExternalLink
        className="item-round"
        href="https://dados.es.gov.br/dataset/obrigacoes"
      >
        <div className="icon">
          <Image
            src="/icons/obrigacoes.png"
            alt="Fiscalizações"
            height={36}
            width={28}
          />
        </div>
        <div className="title">Obrigações</div>
      </ExternalLink>
    </>
  );
}
