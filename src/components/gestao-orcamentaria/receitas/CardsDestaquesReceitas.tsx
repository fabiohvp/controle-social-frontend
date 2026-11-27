"use client";

import { useCorrecaoIpca } from "@/components/buttons/ipca/useCorrecaoIpca";
import SingleSeriesChart from "@/components/charts/SingleSeriesChart";
import Modal from "@/components/layout/modal/Modal";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import { formatMoneyKMB } from "@/formatters/number";
import { Esfera } from "@/shared/esfera";
import { SerieItem } from "@/types/Serie";
import { useState } from "react";
import {
  FaCar,
  FaChalkboardTeacher,
  FaCogs,
  FaExchangeAlt,
  FaHandHoldingUsd,
  FaHandshake,
  FaHome,
  FaMedkit,
  FaOilCan,
  FaShoppingCart,
} from "react-icons/fa";

export type EtiquetaItem = {
  grupo: "proprias" | "estado" | "uniao";
  codigo: number;
  descricao: string;
  titulo: string;
  icone:
    | "home"
    | "exchange"
    | "cogs"
    | "cart"
    | "car"
    | "handshake"
    | "oil"
    | "usd"
    | "medkit"
    | "teacher";
  valor: number;
};

type Props = {
  esfera: Esfera;
  ano: number;
  etiquetas: EtiquetaItem[];
};

function renderIcon(icone: EtiquetaItem["icone"]) {
  const iconClass = "w-6 h-6 text-[#607D8B]";
  switch (icone) {
    case "home":
      return <FaHome className={iconClass} />;
    case "exchange":
      return <FaExchangeAlt className={iconClass} />;
    case "cogs":
      return <FaCogs className={iconClass} />;
    case "cart":
      return <FaShoppingCart className={iconClass} />;
    case "car":
      return <FaCar className={iconClass} />;
    case "handshake":
      return <FaHandshake className={iconClass} />;
    case "oil":
      return <FaOilCan className={iconClass} />;
    case "usd":
      return <FaHandHoldingUsd className={iconClass} />;
    case "medkit":
      return <FaMedkit className={iconClass} />;
    case "teacher":
      return <FaChalkboardTeacher className={iconClass} />;
    default:
      return <FaHome className={iconClass} />;
  }
}

function ItemEtiqueta({
  item,
  ano,
  onClick,
}: {
  item: EtiquetaItem;
  ano: number;
  onClick: () => void;
}) {
  const corrigir = useCorrecaoIpca();
  const valorCorrigido = corrigir(item.valor, ano);

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2.5 py-1.5 px-0.5 text-left cursor-pointer opacity-85 hover:opacity-100 transition-opacity w-full group"
      title={`${item.titulo} (clique para ver evolução anual e mensal)`}
    >
      <div className="text-[#607D8B] shrink-0">
        {renderIcon(item.icone)}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[13px] font-normal text-[#607D8B] truncate leading-tight">
          {item.descricao}
        </span>
        <span className="text-[14px] font-semibold text-[#607D8B] leading-tight">
          {formatMoneyKMB(valorCorrigido)}
        </span>
      </div>
    </button>
  );
}

export default function CardsDestaquesReceitas({
  esfera,
  ano,
  etiquetas,
}: Props) {
  const [modalItem, setModalItem] = useState<EtiquetaItem | null>(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const [dadosEvolucao, setDadosEvolucao] = useState<{
    anual: SerieItem[];
    mensal: SerieItem[];
  } | null>(null);

  const abrirModal = async (item: EtiquetaItem) => {
    setModalItem(item);
    setLoadingModal(true);
    setDadosEvolucao(null);

    try {
      const res = await fetch(
        `/api/receita-etiqueta-evolucao?tipoEsfera=${esfera.tipo}&idEsferaAdministrativa=${esfera.idEsferaAdministrativa}&anoExercicio=${ano}&etiqueta=${item.codigo}`
      );
      if (res.ok) {
        const json = await res.json();
        setDadosEvolucao(json);
      }
    } catch {
      // Falha ao carregar modal
    } finally {
      setLoadingModal(false);
    }
  };

  const fecharModal = () => {
    setModalItem(null);
    setDadosEvolucao(null);
  };

  const ente = esfera.tipo === "estado" ? "Estado" : "Município";
  const proprias = etiquetas.filter((e) => e.grupo === "proprias");
  const estado = etiquetas.filter((e) => e.grupo === "estado");
  const uniao = etiquetas.filter((e) => e.grupo === "uniao");

  const cards = [
    {
      titulo: `Receitas próprias do ${ente} em destaque`,
      descricao: `Destaque das mais relevantes receitas arrecadadas pelo próprio ${ente}.`,
      itens: proprias,
      colSpan: esfera.tipo === "estado" ? "lg:col-span-3" : "lg:col-span-2",
    },
    ...(esfera.tipo === "municipio"
      ? [
          {
            titulo: "Transferências do Estado em destaque",
            descricao:
              "Destaque das mais relevantes transferências realizadas pelo Estado para o Município para amenizar as desigualdades regionais e promover o equilíbrio sócio-econômico entre os municípios.",
            itens: estado,
            colSpan: "lg:col-span-2",
          },
        ]
      : []),
    {
      titulo: "Transferências da União em destaque",
      descricao: `Destaque das mais relevantes transferências realizadas pela União para o ${ente} para amenizar as desigualdades regionais e promover o equilíbrio sócio-econômico entre os municípios.`,
      itens: uniao,
      colSpan: esfera.tipo === "estado" ? "lg:col-span-3" : "lg:col-span-2",
    },
  ];

  return (
    <>
      {cards.map((card, i) => (
        <PanelWithDescription
          key={i}
          className={`${card.colSpan} col-span-1`}
          titulo={card.titulo}
          descricao={card.descricao}
        >
          <div className="grid grid-cols-3 gap-y-4 gap-x-2 py-1 min-h-[90px]">
            {card.itens.map((item) => (
              <ItemEtiqueta
                key={item.codigo}
                item={item}
                ano={ano}
                onClick={() => abrirModal(item)}
              />
            ))}
          </div>
        </PanelWithDescription>
      ))}

      <Modal show={modalItem !== null} setShow={(show) => !show && fecharModal()}>
        <div className="text-base font-bold text-slate-800">
          {modalItem?.descricao} - {modalItem?.titulo}
        </div>
        <div className="flex flex-col gap-4 min-w-[300px] md:min-w-[650px] p-2">
          {loadingModal ? (
            <div className="py-12 text-center text-sm text-slate-500">
              Carregando evolução da receita...
            </div>
          ) : (
            <>
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-1">
                  Evolução anual da Receita
                </h4>
                <p className="text-xs text-slate-500 mb-2">
                  Possibilita comparar o montante arrecadado no exercício em
                  relação aos anos anteriores.
                </p>
                <SingleSeriesChart
                  dados={dadosEvolucao?.anual ?? []}
                  tipo="bar"
                  negativoVermelho
                />
              </div>
              <div className="border-t border-slate-200 pt-3">
                <h4 className="text-sm font-bold text-slate-700 mb-1">
                  Evolução mensal da Receita
                </h4>
                <p className="text-xs text-slate-500 mb-2">
                  Possibilita comparar a arrecadação realizada em cada mês do
                  exercício.
                </p>
                <SingleSeriesChart
                  dados={dadosEvolucao?.mensal ?? []}
                  tipo="bar"
                  negativoVermelho
                  corrigirIpca
                />
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
