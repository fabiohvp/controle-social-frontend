import { atom } from "jotai";

export const estadoState = atom({
  anos: Array(8)
    .fill(1)
    .map((_, i) => i + 2016)
    .reverse(),
});
