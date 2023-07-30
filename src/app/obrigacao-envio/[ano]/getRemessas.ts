import { EsferaAdministrativa } from "@/types/EsferaAdministrativa";
import { ObrigacaoEnvio, Remessa } from "./types";

export function getRemessas(
  esferasAdministrativas: EsferaAdministrativa[],
  obrigacoesDeEnvio: ObrigacaoEnvio[],
  getRemessa: (obrigacaoEnvio: ObrigacaoEnvio) => Remessa
) {
  return obrigacoesDeEnvio.map((d) => ({
    codigo: d.codigo,
    nome: esferasAdministrativas.find((m) => m.codigo === d.codigo)!.nome,
    envio: getRemessa(d),
  }));
}
