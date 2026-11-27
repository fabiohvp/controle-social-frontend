import { gerarAnos } from "@/shared/paginas";
import { atom } from "jotai";

export const folhaDePagamentoState = atom({
  anos: gerarAnos(2016),
});
