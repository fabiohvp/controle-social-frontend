"use client";
import Panel from "@/components/panel/Panel";
import useGeolocation from "@/hooks/useGeolocation";
import { useGlobalState } from "@/providers/GlobalProvider";
import { GlobalState } from "@/shared/globalState";
import Image from "next/image";
import Link from "next/link";
import AREAS_TEMATICAS from "./area-tematica.json";
import ESTADO from "./estado.json";
import INTELIGENCIA_ARTIFICIAL from "./inteligencia-artificial.json";
import MUNICIPIOS from "./municipios.json";
import OUTRAS_OPCOES from "./outras-opcoes.json";

type Panel = {
  titulo: string;
  artigos: {
    description: string;
    href: string;
    image: {
      className?: string;
      height: number;
      src: string;
      width: number;
    };
    titulo: string;
  }[];
};

const panels: Panel[][] = [
  [MUNICIPIOS, ESTADO],
  [AREAS_TEMATICAS],
  [INTELIGENCIA_ARTIFICIAL, OUTRAS_OPCOES],
];

export default function LinksWidgets() {
  const globalState = useGlobalState();
  const { municipio } = useGeolocation();

  return (
    <>
      {panels.map((panelsList, index) => (
        <div className="flex gap-2 mt-6 mb-8" key={index}>
          {panelsList.map((panel) => (
            <section key={panel.titulo}>
              <h3 className="border-b-2 border-b-[#e4e4e4] pb-1">
                {panel.titulo}
              </h3>
              <div className="flex gap-2 mt-2">
                {panel.artigos.map((article, i) => {
                  let href = article.href.replace(
                    "{municipio-nome-normalizado}",
                    municipio.nomeNormalizado
                  );
                  href = replaceAnos(globalState, href);
                  const titulo = article.titulo.replace(
                    "{municipio-nome}",
                    municipio.nome
                  );
                  return (
                    <Link
                      href={href.replace("{municipio-nome}", municipio.nome)}
                      key={i}
                      className="group flex flex-1 text-center"
                      title={titulo}
                      prefetch={false}
                    >
                      <div className="relative transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                        <Panel className="absolute flex flex-col justify-around bg-gray-50 panel">
                          <Image alt={titulo} {...article.image} />
                          <h3 className="font-normal">{titulo}</h3>
                        </Panel>
                        <Panel className="bg-[#f8d96a] [transform:rotateY(180deg)] [backface-visibility:hidden] panel">
                          <h3 className="mt-2">{titulo}</h3>
                          <p>{article.description}</p>
                        </Panel>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      ))}
    </>
  );
}

function replaceAnos(globalState: GlobalState, href: string) {
  href = href.replace(
    "{boletins-ano}",
    globalState.anos.boletins.anoAtual.toString()
  );
  href = href.replace(
    "{estado-ano}",
    globalState.anos.estado.anoAtual.toString()
  );
  href = href.replace(
    "{folha-de-pagamento-ano}",
    globalState.anos.folhaDePagamento.anoAtual.toString()
  );
  href = href.replace(
    "{municipio-ano}",
    globalState.anos.municipio.anoAtual.toString()
  );
  href = href.replace(
    "{obrigacao-de-envio-ano}",
    globalState.anos.obrigacaoEnvio.anoAtual.toString()
  );
  return href;
}
