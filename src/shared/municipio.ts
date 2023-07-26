import MUNICIPIOS from "@/data/municipios.json";

export type Municipio = (typeof MUNICIPIOS)[0];
export type MunicipiosProps = {
  municipios: Municipio[];
};

export async function getMunicipios(): Promise<Municipio[]> {
  const res = await fetch(`http://localhost:3000/api/municipio`);
  return res.json();
}

export function getCodigoMunicipio(
  municipios: Municipio[],
  nomeNormalizado: string
) {
  const municipio = municipios.find(
    (o) => o.nomeNormalizado === nomeNormalizado
  );
  if (municipio) {
    return municipio.codigo;
  }
  return null;
}

export function getNomeNormalizadoMunicipio(
  municipios: Municipio[],
  nome: string
) {
  const municipio = municipios.find((o) => o.nome === nome);
  if (municipio) {
    return municipio.nomeNormalizado;
  }
  return null;
}
