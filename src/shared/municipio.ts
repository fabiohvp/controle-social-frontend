import { normalize } from "@/formatters/string";
import { cache } from "react";

export type Municipio = {
  codigo: string;
  nome: string;
  nomeNormalizado: string;
};

//export type Municipio = (typeof MUNICIPIOS)[0];
export type MunicipiosProps = {
  municipios: Municipio[];
};

type EsferaAdministrativa = {
  codigoEsferaAdministrativa: string;
  nomeEsferaAdministrativa: string;
};

export const getMunicipios = cache(async (): Promise<Municipio[]> => {
  if (process.env.npm_lifecycle_event === "build") {
    const res = await fetch(
      "https://paineldecontrole.tcees.tc.br/api/Settings/GetAll?v=26-07-2023-1690391164330"
    );
    return res
      .json()
      .then(
        ({
          esferasAdministrativas,
        }: {
          esferasAdministrativas: EsferaAdministrativa[];
        }) => {
          const municipios: Municipio[] = [];

          for (const esferaAdministrativa of Object.values(
            esferasAdministrativas
          )) {
            municipios.push({
              codigo: esferaAdministrativa.codigoEsferaAdministrativa,
              nome: esferaAdministrativa.nomeEsferaAdministrativa,
              nomeNormalizado: normalize(
                esferaAdministrativa.nomeEsferaAdministrativa
              ),
            });
          }
          return municipios;
        }
      );
  } else {
    const res = await fetch(
      `${process.env.VERCEL_PROTOCOL}://${process.env.VERCEL_URL}/api/municipio`
    );
    return res
      .json()
      .then((data) =>
        data.map((d: Municipio) => ({
          codigo: d.codigo,
          nome: d.nome,
          nomeNormalizado: d.nomeNormalizado,
        }))
      );
  }
});

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
