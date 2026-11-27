import { gerarAnos } from "@/shared/paginas";
import { atom } from "jotai";

export const comparadorState = atom({
  anos: gerarAnos(2020),
});
