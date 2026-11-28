import { EstadoPanelProps } from "@/app/estado/[ano]/routes";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import { fetchJson } from "@/shared/api";
import { ENV } from "@/shared/env";
import { COLOR } from "@/theme/colors";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { ID_ESFERA_ESTADO } from "./MedidoresEstado";
import "./obrigacoesJuntoTceesWidget.css";

export async function ObrigacoesJuntoTceesWidget({ ano, style }: EstadoPanelProps) {
  const data = await fetchJson<{ [key: string]: boolean }>(
    `${ENV.apiUrl}/MunicipioControllers/ObrigacaoEnvio/GetObrigacaoEnvioEmDia?idEsferaAdministrativa=${ID_ESFERA_ESTADO}&anoExercicio=${ano}&v=${ENV.apiVersion}`
  );
  const anos = data ? Object.keys(data).sort() : [];

  return (
    <PanelWithTitle
      bodyProps={{ className: "center gap-4", style }}
      header="Obrigações junto ao TCE-ES"
    >
      {anos.length ? (
        <ul className="flex justify-center gap-4">
          {anos.map((key) => (
            <li
              key={key}
              className="municipio-obrigacao-de-envio-ano flex flex-col gap-2 relative"
            >
              <Link href={`/estado/${key}/obrigacao-de-envio`}>
                <FaCheckCircle
                  className="text-6xl"
                  style={{
                    color: data?.[key] ? COLOR["em-dia"] : COLOR["em-atraso"],
                  }}
                />
                <div className="text-center text-sm">{key}</div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="m-auto opacity-60 text-sm">Sem dados</div>
      )}
    </PanelWithTitle>
  );
}
