import PanelWithTitle from "@/components/panel/PanelWithTitle";
import { fetchJson } from "@/shared/api";
import { ENV } from "@/shared/env";
import { getCodigoMunicipio, getMunicipios } from "@/shared/municipio";
import { COLOR } from "@/theme/colors";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { MunicipioPageProps, MunicipioPanelProps } from "../../../../routes";
import "./obrigacoesJuntoTceesWidget.css";

export async function ObrigacoesJuntoTceesWidget({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  const data = await getData({ ano, municipio });
  const keys = data ? Object.keys(data) : [];

  return (
    <PanelWithTitle
      bodyProps={{ className: "center gap-4", style }}
      header="Obrigações junto ao TCE-ES"
    >
      {keys.length > 0 ? (
        <ul className="flex justify-center gap-4">
          {keys.map((key) => (
            <li
              key={key}
              className="municipio-obrigacao-de-envio-ano flex flex-col gap-2 relative"
            >
              <Link href={`/municipio/${key}/${municipio}/obrigacao-de-envio`}>
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

async function getData({ ano, municipio }: Partial<MunicipioPageProps>) {
  const municipios = await getMunicipios();
  const codigo = getCodigoMunicipio(municipios, municipio!);
  if (!codigo) return null;
  return fetchJson<{ [key: string]: boolean }>(
    `${ENV.apiUrl}/MunicipioControllers/ObrigacaoEnvio/GetObrigacaoEnvioEmDia?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=${ENV.apiVersion}`
  );
}
