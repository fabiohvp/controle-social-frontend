"use client";
import BoletimMacroGestaoGovernamentalIcon from "@/components/images/icones/BoletimMacroGestaoGovernamentalIcon";
import CircleList from "@/components/lists/CircleList";
import { getMonthNames } from "@/shared/date";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FaRegFilePdf } from "react-icons/fa";
import { BoletinsPageProps } from "../../BoletinsPageProps";

export type BoletimAlertPanelProps = {
  conteudo: string;
  mesSelecionado: number;
  mesUltimoEnvio: number;
} & BoletinsPageProps;

const meses = getMonthNames({ format: "long" });

//TODO: duplicar este component com os layouts diferentes (uma copia para 2022 e 2021, e uma para 2019)
export default function BoletimAlertPanel(props: BoletimAlertPanelProps) {
  const routeParams = useParams();
  const { push } = useRouter();
  const data = extractData(props.conteudo);

  function onClick(mes: number) {
    if (mes > props.mesUltimoEnvio) return;
    push(`/boletins/${routeParams.ano}/${mes}`);
  }

  return (
    <div className="mt-2">
      <div className="center flex-col mt-2 overflow-hidden">
        <CircleList className="boletim-mensal">
          {meses.map((mesNome, index) => {
            const mes = index + 1;
            return (
              <li
                key={mesNome}
                className={`${props.mesSelecionado === mes ? "active" : ""} ${
                  mes > props.mesUltimoEnvio ? "disabled" : ""
                }`}
                onClick={() => onClick(mes)}
              >
                <hr />
                <div className="lg:hidden">{mes}</div>
                <div
                  className="hidden lg:block"
                  style={{ marginTop: "calc(1.7 * var(--circle-list-radius))" }}
                >
                  {mes}
                </div>
                <div className="hidden mt-4 text-blue-dark lg:block">
                  {mesNome.substring(0, 3)}
                </div>
              </li>
            );
          })}
        </CircleList>
        <BoletimMacroGestaoGovernamentalIcon className="mt-16" />
        <section className="center flex-col gap-2 mt-2">
          <h2 className="font-normal">
            {meses[(props.mesSelecionado ?? props.mesUltimoEnvio) - 1]} /{" "}
            {props.ano}
          </h2>
          <hr className="w-full" />
          <div className="mt-2 px-12 text-sm">
            Você também pode fazer o download da ...
          </div>
          <Link
            href={data.urlPDF ?? "#"}
            className="button primary"
            target="_blank"
          >
            <FaRegFilePdf className="mr-1" /> Versão em PDF
          </Link>
        </section>
      </div>
    </div>
  );
}

function extractData(html: string): {
  ano: string;
  mes: string;
  urlPDF: string;
} {
  const inputs = html.matchAll(/<input type="hidden".*?\/>/gim);
  const data: { ano: string; mes: string; urlPDF: string } = {} as any;

  for (const [input] of inputs) {
    const name = extractProperty(input, "name")!;
    const value = extractProperty(input, "value")!;
    (data as any)[name] = value;
  }
  return data;
}

function extractProperty(input: string, propertyName: string) {
  const regex = new RegExp(`${propertyName}="(.*?)"`, "gi");
  const property = input.matchAll(regex);

  for (const [_, propertyValue] of property) {
    return propertyValue;
  }
}
