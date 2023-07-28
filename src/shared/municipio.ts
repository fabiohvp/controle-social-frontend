import { normalize } from "@/formatters/string";
import {
  DatasLimites,
  EsferaAdministrativa,
  Municipio,
} from "@/types/Municipio";
import { cache } from "react";
import { Modulo } from "./modulos";

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

export const getDatasLimites = cache(
  async (ano: number): Promise<DatasLimites> => {
    const formatData = function (datasLimites: DatasLimites) {
      return Object.keys(datasLimites).reduce((acc, modulo) => {
        const moduloKey = modulo as keyof typeof Modulo;
        const dataLimite = datasLimites[moduloKey];

        acc[moduloKey] = dataLimite.map((d) => ({
          ...d,
          data: new Date(d.data),
        }));
        return acc;
      }, {} as DatasLimites);
    };

    if (process.env.npm_lifecycle_event === "build") {
      const res = await fetch(
        "https://paineldecontrole.tcees.tc.br/api/Settings/GetAll?v=26-07-2023-1690391164330"
      );
      return res
        .json()
        .then(({ datasLimites }) => formatData(datasLimites[ano]));
    } else {
      const res = await fetch(
        `${process.env.VERCEL_PROTOCOL}://${process.env.VERCEL_URL}/api/municipio/datas-limites?ano=${ano}`
      );
      return res.json().then(formatData);
    }
  }
);

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
    return res.json().then((data) =>
      data.map((d: Municipio) => ({
        codigo: d.codigo,
        nome: d.nome,
        nomeNormalizado: d.nomeNormalizado,
      }))
    );
  }
});

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
