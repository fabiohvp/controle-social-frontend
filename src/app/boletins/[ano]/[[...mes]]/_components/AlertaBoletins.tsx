"use client";
import CircleList from "@/components/lists/CircleList";
import { getMonthNames } from "@/shared/date";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { BoletinsPageProps, generateBoletinsUrl } from "../../routes";

export type BoletinsAlertPanelProps = {
  conteudo: string;
  mesSelecionado: number;
  mesUltimoEnvio: number;
} & BoletinsPageProps;

const meses = getMonthNames({ format: "long" });

//TODO: duplicar este component com os layouts diferentes (uma copia para 2022 e 2021, e uma para 2019)
export default function AlertaBoletins(props: BoletinsAlertPanelProps) {
  const pathname = usePathname();
  const routeParams = useParams() as BoletinsPageProps;

  return (
    <div className="mt-2 overflow-hidden shrink-0">
      <CircleList className="boletim-mensal">
        {meses.map((mesNome, index) => {
          const mes = index + 1;
          const disabled = mes > props.mesUltimoEnvio;
          return (
            <li
              key={mesNome}
              className={`${
                props.mesSelecionado === mes ||
                (!props.mes && index === meses.length - 1)
                  ? "active"
                  : ""
              } ${disabled ? "disabled" : ""}`}
            >
              <hr />
              <Link
                href={generateBoletinsUrl({
                  ...routeParams,
                  mes: mes.toString(),
                  pathname,
                })}
              >
                <div className="item">
                  <div className="lg:hidden">{mes}</div>
                  <div className="hidden lg:block">{mes}</div>
                </div>
                <div className="hidden text-blue-dark text-center lg:block">
                  {mesNome.substring(0, 3)}
                </div>
              </Link>
            </li>
          );
        })}
      </CircleList>
    </div>
  );
}
