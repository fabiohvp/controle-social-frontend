import Panel from "@/components/panel/Panel";
import Image from "next/image";
import Link from "next/link";
import AREAS_TEMATICAS from "./areas-tematicas.json";
import ESTADO from "./estado.json";
import INTELIGENCIA_ARTIFICIAL from "./inteligencia-artificial.json";
import MUNICIPIOS from "./municipios.json";
import OUTRAS_OPCOES from "./outras-opcoes.json";

type Panel = {
  title: string;
  articles: {
    description: string;
    href: string;
    image: {
      className?: string;
      height: number;
      src: string;
      width: number;
    };
    title: string;
  }[];
};

const panels: Panel[][] = [
  [MUNICIPIOS, ESTADO],
  [AREAS_TEMATICAS],
  [INTELIGENCIA_ARTIFICIAL, OUTRAS_OPCOES],
];

export default function Panels() {
  return (
    <>
      {panels.map((panelsList, index) => (
        <div className="flex gap-2 mt-6 mb-8" key={index}>
          {panelsList.map((panel) => (
            <section key={panel.title}>
              <h3 className="border-b-2 border-b-[#e4e4e4] pb-1">
                {panel.title}
              </h3>
              <div className="flex gap-2 mt-2">
                {panel.articles.map((article, i) => (
                  <Link
                    href={article.href}
                    key={i}
                    className="group flex flex-1 text-center"
                    title={article.title}
                  >
                    <div className="relative transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                      <Panel className="absolute flex flex-col justify-around bg-gray-50 panel">
                        <Image alt={article.title} {...article.image} />
                        <h3 className="font-normal">{article.title}</h3>
                      </Panel>
                      <Panel className="bg-[#f8d96a] [transform:rotateY(180deg)] [backface-visibility:hidden] panel">
                        <h3 className="mt-2">{article.title}</h3>
                        <p>{article.description}</p>
                      </Panel>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      ))}
    </>
  );
}
