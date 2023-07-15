"use client";
import Link from "next/link";
import { useState } from "react";
import ModalAtualizacaoDados from "../modal/ModalAtualizacaoDados";
import ModalFonteDados from "../modal/ModalFonteDados";
import ModalGlossario from "../modal/ModalGlossario";

const showNumerals = true;

export default function DashboardFooter() {
  const [showModalAtualizacaoDados, setShowModalAtualizacaoDados] =
    useState(false);
  const [showModalFonteDados, setShowModalFonteDados] = useState(false);
  const [showModalGlossario, setShowModalGlossario] = useState(false);
  return (
    <div className="flex justify-center mt-6 p-2">
      <div className="w-full sm:w-5/12">
        <hr />
        <div className="center">
          <footer className="p-2 text-link text-sm">
            {showNumerals && (
              <div className="flex justify-center gap-2 text-gray-medium">
                <span>K=Milhares</span>
                <span className="margin-left10">M=Milhões</span>
                <span className="margin-left10">B=Bilhões</span>
              </div>
            )}
            <div className="flex justify-center gap-2 mt-1">
              <>
                <button
                  className="cursor-pointer"
                  onClick={() =>
                    setShowModalAtualizacaoDados(!showModalAtualizacaoDados)
                  }
                >
                  Atualização dos dados
                </button>
                <ModalAtualizacaoDados
                  setShow={setShowModalAtualizacaoDados}
                  show={showModalAtualizacaoDados}
                />
              </>
              |<Link href="/dados-abertos">Dados abertos</Link>
            </div>
            <div className="flex justify-center gap-2 mt-1">
              <>
                <button
                  className="cursor-pointer"
                  onClick={() => setShowModalFonteDados(!showModalFonteDados)}
                >
                  Fonte dos dados
                </button>
                <ModalFonteDados
                  setShow={setShowModalFonteDados}
                  show={showModalFonteDados}
                />
              </>
              |
              <>
                <button
                  className="cursor-pointer"
                  onClick={() => setShowModalGlossario(!showModalGlossario)}
                >
                  Glossário
                </button>
                <ModalGlossario
                  setShow={setShowModalGlossario}
                  show={showModalGlossario}
                />
              </>
              |<Link href="/wiki/sobre">Ajuda</Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
