import { gerarAnos } from "@/shared/paginas";
import { atom } from "jotai";

export const boletinsState = atom({
  anos: gerarAnos(2020),
});
