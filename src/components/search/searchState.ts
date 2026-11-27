import { atom } from "jotai";

/** Controla a abertura do modal "Pesquisar" (um único `SearchDialog` por página). */
export const searchOpenState = atom(false);
