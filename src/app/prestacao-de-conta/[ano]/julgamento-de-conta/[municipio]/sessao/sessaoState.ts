import { gerarAnos } from "@/shared/paginas";
import { atom } from "jotai";

export const sessaoState = atom({
  anos: gerarAnos(2016),
});
