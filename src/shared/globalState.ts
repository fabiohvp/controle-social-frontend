import { EsferaAdministrativa } from "@/types/EsferaAdministrativa";
import { getMunicipios } from "./municipio";
import { ANO_CORRENTE } from "./paginas";

type GlobalStateAno = {
  anoInicio: number;
  anoAtual: number;
};

export type GlobalState = {
  anos: {
    boletins: GlobalStateAno;
    estado: GlobalStateAno;
    folhaDePagamento: GlobalStateAno;
    municipio: GlobalStateAno;
    obrigacaoEnvio: GlobalStateAno;
    prestacaoDeConta: GlobalStateAno;
  };
  //consorcio: EsferaAdministrativa;
  //estado: EsferaAdministrativa;
  municipio: EsferaAdministrativa;
  municipios: EsferaAdministrativa[];
};

export let globalState: GlobalState;

export async function initGlobalState() {
  globalState = await Promise.all([getMunicipios()]).then(
    ([municipios]) =>
      ({
        anos: {
          boletins: {
            anoInicio: 2020,
            anoAtual: ANO_CORRENTE,
          },
          estado: {
            anoInicio: 2016,
            anoAtual: ANO_CORRENTE,
          },
          folhaDePagamento: {
            anoInicio: 2016,
            anoAtual: ANO_CORRENTE,
          },
          municipio: {
            anoInicio: 2009,
            anoAtual: ANO_CORRENTE,
          },
          obrigacaoEnvio: {
            anoInicio: 2020,
            anoAtual: ANO_CORRENTE,
          },
          prestacaoDeConta: {
            anoInicio: 2009,
            anoAtual: ANO_CORRENTE,
          },
        },
        municipio: municipios.find((o) => o.codigo === "077")!,
        municipios,
      } as GlobalState)
  );
}
