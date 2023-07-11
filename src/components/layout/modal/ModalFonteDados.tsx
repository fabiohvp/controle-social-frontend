import Modal, { ModalProps } from "@/components/layout/modal/Modal";
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
            <Link href="http://www.cidades.ibge.gov.br/" target="_blank">
              IBGE
            </Link>
            : mapas dos municípios, dados geográficos e estimativas
            populacionais;
          </li>
          <li>
            <a
              href="http://www.tse.jus.br/eleicoes/estatisticas/repositorio-de-dados-eleitorais"
              target="_blank"
            >
              TSE
            </a>
            : número de vereadores por município;
          </li>
          <li>
            <a
              href="http://www.atlasbrasil.org.br/2013/pt/download/"
              target="_blank"
            >
              PNUD
            </a>
            : Índice de Desenvolvimento Humano Municipal (IDHM) 2010 (publicado
            em 2013);
          </li>
          <li>
            <a
              href="http://portal.inep.gov.br/web/guest/microdados"
              target="_blank"
            >
              INEP
            </a>
            : número de alunos da rede municipal;
          </li>
          <li>
            <a
              href="http://sa.previdencia.gov.br/site/2019/08/DRAA-Estatistica-da-Populacao-Coberta.zip"
              target="_blank"
            >
              Site da previdência
            </a>
            : dados de segurados (atualizado em 27/08/2019);
          </li>
          <li>
            <Link href="http://cnes.datasus.gov.br/" target="_blank">
              CNES
            </Link>
            : informações sobre equipamentos, leitos e estabelecimentos de
            saúde.
          </li>
          <li>
            <a
              href="http://sisaps.saude.gov.br/notatecnica/frmListaMunic.php"
              target="_blank"
            >
              Ministério da Saúde
            </a>
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
