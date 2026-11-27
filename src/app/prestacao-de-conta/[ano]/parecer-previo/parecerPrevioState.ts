import { gerarAnos } from "@/shared/paginas";
import { atom } from "jotai";

export const parecerPrevioState = atom({
  anos: gerarAnos(2020),
});
