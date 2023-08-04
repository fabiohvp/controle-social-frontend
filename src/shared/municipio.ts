import { normalize } from "@/formatters/string";
import { DatasLimites } from "@/types/DataLimite";
import { EsferaAdministrativa } from "@/types/EsferaAdministrativa";
import { cache } from "react";
import { Modulo } from "./modulos";

export const QUANTIDADE_MUNICIPIOS = 78;
export const QUANTIDADE_CONSORCIOS = 1;
export const QUANTIDADE_ESTADO = 1;

let municipios: EsferaAdministrativa[];

export function getCodigoMunicipio(
  municipios: EsferaAdministrativa[],
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
    }
    const res = await fetch(
      `${process.env.VERCEL_PROTOCOL}://${process.env.VERCEL_URL}/api/municipio/datas-limites?ano=${ano}`
    );
    return res.json().then(formatData);
  }
);

export const getMunicipios = cache(async () => {
  if (municipios) {
    return Promise.resolve(municipios);
  }
  if (process.env.npm_lifecycle_event === "build") {
    const res = await fetch(
      "https://paineldecontrole.tcees.tc.br/api/Settings/GetAll?v=26-07-2023-1690391164330"
    );
    return res.json().then(
      ({
        esferasAdministrativas,
      }: {
        esferasAdministrativas: {
          codigoEsferaAdministrativa: string;
          nomeEsferaAdministrativa: string;
        }[];
      }) => {
        const _municipios: EsferaAdministrativa[] = [];

        for (const esferaAdministrativa of Object.values(
          esferasAdministrativas
        )) {
          _municipios.push({
            codigo: esferaAdministrativa.codigoEsferaAdministrativa,
            nome: esferaAdministrativa.nomeEsferaAdministrativa,
            nomeNormalizado: normalize(
              esferaAdministrativa.nomeEsferaAdministrativa
            ),
          });
        }
        municipios = _municipios;
        return _municipios;
      }
    );
  }
  const res = await fetch(
    `${process.env.VERCEL_PROTOCOL}://${process.env.VERCEL_URL}/api/municipio`
  );
  return res.json().then((data) => {
    const _municipios = data.map((d: EsferaAdministrativa) => ({
      codigo: d.codigo,
      nome: d.nome,
      nomeNormalizado: d.nomeNormalizado,
    }));
    municipios = _municipios;
    return municipios;
  });
});

export function getNomeNormalizadoMunicipio(
  municipios: EsferaAdministrativa[],
  nome: string
) {
  const municipio = municipios.find((o) => o.nome === nome);
  if (municipio) {
    return municipio.nomeNormalizado;
  }
  return null;
}
