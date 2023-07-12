import PanelWithTitle from "@/components/panel/PanelWithTitle";
import { COLOR } from "@/theme/colors";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import {
  MunicipioPageProps,
  MunicipioPanelProps,
  getCodigoMunicipio,
} from "../../MunicipioPageProps";

export async function ObrigacoesJuntoTCEESPanel({
  height,
  ano,
  municipio,
}: MunicipioPanelProps) {
  async function getData({ ano, municipio }: MunicipioPageProps) {
    "use server";
    const codigo = getCodigoMunicipio(municipio);
    const res = await fetch(
      `https://paineldecontrole.tcees.tc.br/api/MunicipioControllers/ObrigacaoEnvio/GetObrigacaoEnvioEmDia?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=11-07-2023-5.2.10`
    );
    const data = await res.json();
    return data as { [key: string]: boolean };
  }

  const data = await getData({ ano, municipio });
  console.log(data);
  return (
    <PanelWithTitle
      className="flex items-center justify-center gap-4"
      height={height}
      title="Obrigações junto ao TCE-ES"
    >
      <style>
        {`
				.municipio-obrigacao-envio-ano:not(:last-child)::after {
					border-top: 1px solid #ccc;
					content: '----';
					height: 1px;
					left: 50px;
					overflow-y: hidden;
					position: absolute;
					top: 30px;
					width: 30px;
					z-index: -1;
				}
				`}
      </style>
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
