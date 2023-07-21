import MUNICIPIOS from "@/data/municipios.json";

export type Municipio = (typeof MUNICIPIOS)[0];

export function getMunicipios(): Municipio[] {
  return MUNICIPIOS;
}

export function getCodigoMunicipio(nomeNormalizado: string): string | null {
  const municipio = MUNICIPIOS.find(
    (o) => o.nomeNormalizado === nomeNormalizado
  );
  if (municipio) {
    return municipio.codigo;
  }
  return null;
}

export function getNomeNormalizadoMunicipio(nome: string): string | null {
  const municipio = MUNICIPIOS.find((o) => o.nome === nome);
  if (municipio) {
    return municipio.nomeNormalizado;
  }
  return null;
}
