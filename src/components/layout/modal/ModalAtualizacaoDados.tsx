"use client";
import Modal, { ModalProps } from "@/components/layout/modal/Modal";

export default function ModalAtualizacaoDados({ setShow, show }: ModalProps) {
  return (
    <Modal setShow={setShow} show={show}>
      <div>Atualização dos dados</div>
      <div className="text-sm">
        Dados de <b>Municípios</b>, <b>Obrigações</b>,{" "}
        <b>Prestações de Contas</b> e <b>Pessoal</b> são atualizados
        diariamente, durante a madrugada. Por isso, no horário comercial os
        dados são apresentados são referentes ao dia anterior.
        <br />
        <br />
        Dados de <b>Estado</b> são atualizados mensalmente.
        <br />
        <br />
        Dados de <b>Boletins de Macrogestão</b> são atualizados trimestralmente
        a partir de 2021.
        <br />
        <br />
        Dados sobre <b>Fiscalizações</b> são atualizados sob demanda, à medida
        em que as fiscalizações ocorrem.
        <br />
        <br />
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
