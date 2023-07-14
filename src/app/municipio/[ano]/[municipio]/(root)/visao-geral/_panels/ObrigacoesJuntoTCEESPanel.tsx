import PanelWithTitle from "@/components/panel/PanelWithTitle";
import { COLOR } from "@/theme/colors";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import {
  MunicipioPageProps,
  MunicipioPanelProps,
  getCodigoMunicipio,
} from "../../MunicipioPageProps";
import "./visao-geral-panels.css";

async function getData({ ano, municipio }: MunicipioPageProps) {
  "use server";
  const codigo = getCodigoMunicipio(municipio);
  const res = await fetch(
    `https://paineldecontrole.tcees.tc.br/api/MunicipioControllers/ObrigacaoEnvio/GetObrigacaoEnvioEmDia?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=11-07-2023-5.2.10`
  );
  const data = await res.json();
  return data as { [key: string]: boolean };
}

export async function ObrigacoesJuntoTCEESPanel({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  const data = await getData({ ano, municipio });

  return (
    <PanelWithTitle
      className="center gap-4"
      style={style}
      title="Obrigações junto ao TCE-ES"
    >
      <ul className="flex justify-center gap-4">
        {Object.keys(data).map((key) => (
          <li
            key={key}
            className="municipio-obrigacao-envio-ano flex flex-col gap-2 relative"
          >
            <Link href={`/municipio/${key}/${municipio}/obrigacao-envio`}>
              <FaCheckCircle
                className="text-6xl"
                style={{
                  color: data[key] ? COLOR.emDia : COLOR.emAtraso,
                }}
              />
              <div className="text-center text-sm">{key}</div>
            </Link>
          </li>
        ))}
      </ul>
    </PanelWithTitle>
  );
}
