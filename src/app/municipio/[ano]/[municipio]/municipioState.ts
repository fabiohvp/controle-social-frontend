import { gerarAnos } from "@/shared/paginas";
import { atom } from "jotai";

export const municipioState = atom({
  anos: gerarAnos(2009),
});
