import { EsferaAdministrativa } from "@/types/EsferaAdministrativa";
import { ENV } from "./env";
import { getMunicipios } from "./municipio";

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
  apis: {
    google: {
      key: string;
    };
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
            anoInicio: 2023,
            anoAtual: 2023,
          },
          estado: {
            anoInicio: 2023,
            anoAtual: 2023,
          },
          folhaDePagamento: {
            anoInicio: 2023,
            anoAtual: 2023,
          },
          municipio: {
            anoInicio: 2023,
            anoAtual: 2023,
          },
          obrigacaoEnvio: {
            anoInicio: 2023,
            anoAtual: 2023,
          },
          prestacaoDeConta: {
            anoInicio: 2023,
            anoAtual: 2023,
          },
        },
        apis: {
          google: {
            key: ENV.apiGoogleMapsKey,
          },
        },
        municipio: municipios.find((o) => o.codigo === "077")!,
        municipios,
      } as GlobalState)
  );
}
