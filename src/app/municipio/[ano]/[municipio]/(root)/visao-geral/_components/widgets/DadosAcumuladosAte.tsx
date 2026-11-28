import DadosAcumuladosAteUG from "@/components/panel/DadosAcumuladosAte";
import { fetchJson } from "@/shared/api";
import { ENV } from "@/shared/env";
import { getCodigoMunicipio, getMunicipios } from "@/shared/municipio";
import { MunicipioPageProps } from "../../../../routes";

type UnidadeGestora = { codigo: string };

/** "Dados acumulados até ...", com base na PCM da prefeitura */
export async function DadosAcumuladosAte({ ano, municipio }: Pick<MunicipioPageProps, "ano" | "municipio">) {
  const municipios = await getMunicipios();
  const codigo = getCodigoMunicipio(municipios, municipio);
  if (!codigo) return null;

  const unidades = await fetchJson<UnidadeGestora[]>(
    `${ENV.apiUrl}/MunicipioControllers/ObrigacaoEnvio/GetObrigacaoEnvioPrefeituraECamara?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=${ENV.apiVersion}`
  );
  const prefeitura = unidades?.find((ug) => /^\d{3}E/.test(ug.codigo));

  return (
    <DadosAcumuladosAteUG
      ano={ano}
      controller="MunicipioControllers"
      codigoUnidadeGestora={prefeitura?.codigo}
    />
  );
}
