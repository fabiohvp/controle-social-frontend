import { EsferaAdministrativa } from "@/types/EsferaAdministrativa";
import { getConsorcio } from "./consorcio";
import { getEstado } from "./estado";
import { getMunicipios } from "./municipio";

export async function getEsferasAdministrativas(): Promise<
  EsferaAdministrativa[]
> {
  return (
    await Promise.all([getConsorcio(), getMunicipios(), getEstado()])
  ).flatMap((e) => e);
}
