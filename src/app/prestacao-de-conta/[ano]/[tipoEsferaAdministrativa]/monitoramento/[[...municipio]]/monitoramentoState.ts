import { atom } from "jotai";

export const monitoramentoState = atom({
  anos: Array(15)
    .fill(1)
    .map((_, i) => i + 2009)
    .reverse(),
});
