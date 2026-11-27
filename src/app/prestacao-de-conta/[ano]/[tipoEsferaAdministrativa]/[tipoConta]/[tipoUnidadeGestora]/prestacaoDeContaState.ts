import { gerarAnos } from "@/shared/paginas";
import { atom } from "jotai";

export const prestacaoDeContaState = atom({
  anos: gerarAnos(2009),
});
