import { EsferaAdministrativa } from "@/types/EsferaAdministrativa";
import { getMunicipios } from "./municipio";

export type GlobalState = {
  //consorcio: EsferaAdministrativa;
  //estado: EsferaAdministrativa;
  municipios: EsferaAdministrativa[];
};

export function initGlobalState() {
  const globalState: Promise<GlobalState> = Promise.all([getMunicipios()]).then(
    ([municipios]) => ({
      municipios,
    })
  );
  return globalState;
}
