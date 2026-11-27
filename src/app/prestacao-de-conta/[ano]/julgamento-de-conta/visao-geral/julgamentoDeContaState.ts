import { gerarAnos } from "@/shared/paginas";
import { atom } from "jotai";

export const julgamentoDeContaState = atom({
  anos: gerarAnos(2020),
});
