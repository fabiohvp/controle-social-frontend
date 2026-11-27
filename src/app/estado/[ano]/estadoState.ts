import { gerarAnos } from "@/shared/paginas";
import { atom } from "jotai";

export const estadoState = atom({
  anos: gerarAnos(2016),
});
