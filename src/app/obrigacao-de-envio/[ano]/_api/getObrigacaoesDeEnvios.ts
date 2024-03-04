import { ENV } from "@/shared/env";
import { ObrigacaoEnvio, Remessa } from "../types";

type ObrigacaoEnvioPromise = {
  ano: number;
  codigoEsferaAdministrativa: string;
  codigo: string;
  situacaoRemessasUnidadeGestoraPCA: Remessa;
  situacaoRemessasUnidadeGestoraPCM: Remessa;
  situacaoRemessasUnidadeGestoraAtos: Remessa;
  situacaoRemessasUnidadeGestoraPCF: Remessa;
  situacaoRemessasUnidadeGestoraRCO: Remessa;
  situacaoRemessasUnidadeGestoraRCB: Remessa;
};

export async function getObrigacaoesDeEnvios({
  ano,
  isMunicipios,
}: {
  ano: string;
  isMunicipios: boolean;
}): Promise<ObrigacaoEnvio[]> {
  const res = await fetch(
    `${ENV.apiUrl}/ObrigacaoEnvioControllers/EsferaAdministrativa/GetObrigacaoEnvioAnual?anoExercicio=${ano}&isMunicipio=${isMunicipios}&v=${ENV.apiVersion}`
  );
  return (res.json() as Promise<ObrigacaoEnvioPromise[]>).then((data) =>
    data.map((d) => ({
      codigo: d.codigoEsferaAdministrativa,
      situacaoRemessasUnidadeGestoraPCA: d.situacaoRemessasUnidadeGestoraPCA,
      situacaoRemessasUnidadeGestoraPCM: d.situacaoRemessasUnidadeGestoraPCM,
      situacaoRemessasUnidadeGestoraAtos: d.situacaoRemessasUnidadeGestoraAtos,
      situacaoRemessasUnidadeGestoraPCF: d.situacaoRemessasUnidadeGestoraPCF,
      situacaoRemessasUnidadeGestoraRCO: d.situacaoRemessasUnidadeGestoraRCO,
      situacaoRemessasUnidadeGestoraRCB: d.situacaoRemessasUnidadeGestoraRCB,
    }))
  );
}
