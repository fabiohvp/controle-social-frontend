import { gerarAnos } from "@/shared/paginas";
import { atom } from "jotai";

export const monitoramentoState = atom({
  anos: gerarAnos(2009),
});
