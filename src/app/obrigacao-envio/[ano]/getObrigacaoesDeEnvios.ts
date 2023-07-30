import { ObrigacaoEnvio, Remessa } from "./types";

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
    `https://paineldecontrole.tcees.tc.br/api/ObrigacaoEnvioControllers/EsferaAdministrativa/GetObrigacaoEnvioAnual?anoExercicio=${ano}&isMunicipio=${isMunicipios}&v=26-07-2023-5.2.19`
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
