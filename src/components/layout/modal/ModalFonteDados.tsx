import Modal, { ModalProps } from "@/components/layout/modal/Modal";
import ExternalLink from "@/components/links/ExternalLink";
import Link from "next/link";

export default function ModalFonteDados({ setShow, show }: ModalProps) {
  return (
    <Modal setShow={setShow} show={show}>
      <div>Fonte dos dados</div>
      <div className="flex flex-col gap-2 text-sm">
        <p>
          Dados referentes ao período de 2009 a 2015 foram extraídos dos
          processos de prestações de contas dos municípios.
        </p>
        <p>
          A partir de 2016 os dados foram obtidos das remessas enviadas pelos
          municípios, através dos sistemas LRFWeb (despesas com Pessoal, Saúde e
          Educação) e CidadES.
        </p>
        <p>
          Em 2020, o LRFWeb foi descontinuado e os dados passaram a constar nas
          remessas do CidadES. A partir de 2022, receitas e despesas do Estado
          também passaram a ser obtidas do CidadES.
        </p>
        <p>Os dados sobre processos são extraídas do sistema e-TCEES.</p>
        <br />
        <p>Fontes auxiliares de dados:</p>
        <ul className="styled">
          <li>
            <ExternalLink href="http://www.cidades.ibge.gov.br/">
              IBGE
            </ExternalLink>
            : mapas dos municípios, dados geográficos e estimativas
            populacionais;
          </li>
          <li>
            <ExternalLink href="https://www.tse.jus.br/eleicoes/estatisticas/repositorio-de-dados-eleitorais">
              TSE
            </ExternalLink>
            : número de vereadores por município;
          </li>
          <li>
            <ExternalLink href="http://www.atlasbrasil.org.br/2013/pt/download/">
              PNUD
            </ExternalLink>
            : Índice de Desenvolvimento Humano Municipal (IDHM) 2010 (publicado
            em 2013);
          </li>
          <li>
            <ExternalLink href="http://portal.inep.gov.br/web/guest/microdados">
              INEP
            </ExternalLink>
            : número de alunos da rede municipal;
          </li>
          <li>
            <ExternalLink href="http://sa.previdencia.gov.br/site/2019/08/DRAA-Estatistica-da-Populacao-Coberta.zip">
              Site da previdência
            </ExternalLink>
            : dados de segurados (atualizado em 27/08/2019);
          </li>
          <li>
            <Link href="https://cnes.datasus.gov.br/" prefetch={false}>
              CNES
            </Link>
            : informações sobre equipamentos, leitos e estabelecimentos de
            saúde.
          </li>
          <li>
            <ExternalLink href="https://sisaps.saude.gov.br/notatecnica/frmListaMunic.php">
              Ministério da Saúde
            </ExternalLink>
            : Percentual da população com plano de saúde.
          </li>
        </ul>
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
