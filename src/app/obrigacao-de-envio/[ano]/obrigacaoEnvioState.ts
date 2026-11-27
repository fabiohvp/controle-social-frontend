import { gerarAnos } from "@/shared/paginas";
import { atom } from "jotai";

export const obrigacaoEnvioState = atom({
  anos: gerarAnos(2020),
});
