import MUNICIPIOS from "@/municipios.json";

export type MunicipioPageProps = {
  ano: string;
  municipio: string;
};

export type MunicipioPanelProps = { height: string } & MunicipioPageProps;

export function getCodigoMunicipio(municipio: string) {
  const codigo = MUNICIPIOS.find(
    (o) => o.nomeNormalizado === municipio
  )!.codigo;
  return codigo;
}
