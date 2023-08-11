import { EsferaAdministrativa } from "@/types/EsferaAdministrativa";
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

export function initGlobalState() {
  const globalState: Promise<GlobalState> = Promise.all([getMunicipios()]).then(
    ([municipios]) => ({
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
      },
      apis: {
        google: {
          //key: "AIzaSyBXegZgIkYoYJVLaVuWTdrDRApB1UTNBEk",
          key: "AIzaSyAwz6Bw5EpbIUH0eH2O7xDcvQbTiUguk1k",
        },
      },
      municipio: municipios.find((o) => o.codigo === "077")!,
      municipios,
    })
  );
  return globalState;
}
