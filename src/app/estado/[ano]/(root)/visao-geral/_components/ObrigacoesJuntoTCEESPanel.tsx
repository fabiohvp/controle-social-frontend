import PanelWithTitle from "@/components/panel/PanelWithTitle";
import { COLOR } from "@/theme/colors";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { EstadoPageProps, EstadoPanelProps } from "../../../EstadoPageProps";
import "./visao-geral-panels.css";

async function getData({ ano }: EstadoPageProps) {
  const codigo = "001";
  const res = await fetch(
    `https://paineldecontrole.tcees.tc.br/api/MunicipioControllers/ObrigacaoEnvio/GetObrigacaoEnvioEmDia?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=11-07-2023-5.2.10`
  );
  const data = await res.json();
  return data as { [key: string]: boolean };
}

export async function ObrigacoesJuntoTCEESPanel({
  ano,
  style,
}: EstadoPanelProps) {
  const data = await getData({ ano });

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
            <Link href={`/municipio/${key}/obrigacao-envio`}>
              <FaCheckCircle
                className="text-6xl"
                style={{
                  color: data[key] ? COLOR["em-dia"] : COLOR["em-atraso"],
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
