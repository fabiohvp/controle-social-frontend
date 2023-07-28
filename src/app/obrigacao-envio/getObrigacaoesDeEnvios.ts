export type Remessa = {
  quantidadeObrigacaoEnvio: number;
  quantidadePendente: number;
};

export type ObrigacaoEnvio = {
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
  municipios,
}: {
  ano: string;
  municipios: boolean;
}) {
  const res = await fetch(
    `https://paineldecontrole.tcees.tc.br/api/ObrigacaoEnvioControllers/EsferaAdministrativa/GetObrigacaoEnvioAnual?anoExercicio=${ano}&isMunicipio=${municipios}&v=26-07-2023-5.2.19`
  );
  return (res.json() as Promise<ObrigacaoEnvio[]>).then((data) =>
    data.map((d) => ({
      ...d,
      codigo: d.codigoEsferaAdministrativa,
    }))
  );
}
