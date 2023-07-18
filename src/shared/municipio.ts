import MUNICIPIOS from "@/municipios.json";

export type Municipio = (typeof MUNICIPIOS)[0];

export function getMunicipios() {
  return MUNICIPIOS;
}

export function getCodigoMunicipio(nomeNormalizado: string) {
  const codigo = MUNICIPIOS.find(
    (o) => o.nomeNormalizado === nomeNormalizado
  )!.codigo;
  return codigo;
}

export function getNomeNormalizadoMunicipio(nome: string) {
  const nomeNormalizado = MUNICIPIOS.find(
    (o) => o.nome === nome
  )!.nomeNormalizado;
  return nomeNormalizado;
}
