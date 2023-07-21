import { atom } from "jotai";

export const boletinsState = atom({
  anos: Array(4)
    .fill(1)
    .map((_, i) => i + 2020)
    .reverse(),
});
