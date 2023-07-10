import Panel from "@/components/layout/panel/Panel";
import Image from "next/image";
import Link from "next/link";
import AREAS_TEMATICAS from "./areas-tematicas.json";
import ESTADO from "./estado.json";
import INTELIGENCIA_ARTIFICIAL from "./inteligencia-artificial.json";
import MUNICIPIOS from "./municipios.json";
import OUTRAS_OPCOES from "./outras-opcoes.json";

type Section = {
  title: string;
  articles: {
    description: string;
    href: string;
    image: {
      className?: string;
      height: number;
      src: string;
    };
    title: string;
  }[];
};

const sections: Section[][] = [
  [MUNICIPIOS, ESTADO],
  [AREAS_TEMATICAS],
  [INTELIGENCIA_ARTIFICIAL, OUTRAS_OPCOES],
];

export default function Sections() {
  return (
    <>
      {sections.map((sectionsList, index) => (
        <div className="flex gap-2 mt-6 mb-8" key={index}>
          {sectionsList.map((section) => (
            <section key={section.title}>
              <h3 className="border-b-2 border-b-[#e4e4e4] pb-1">
                {section.title}
              </h3>
              <div className="flex gap-2 mt-2">
                {section.articles.map((article) => (
                  <Link
                    href={article.href}
                    title={article.title}
                    className="group flex flex-1 text-center"
                  >
                    <div className="relative transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                      <Panel className="absolute flex flex-col justify-around bg-gray-50 panel">
                        <Image {...article.image} alt={article.title} />
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
