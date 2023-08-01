import { IpcaValues } from "@/components/botoes/ipca/ipcaState";

export function mdc(values: number[]) {
  if (!values.length) return 0;
  for (var r, a, i = values.length - 1, b = values[i]; i; )
    for (a = values[--i]; (r = a % b); a = b, b = r);
  return b;
}

export function calculateIpca(
  value: number,
  currentYear: number,
  ipcaValues: IpcaValues[]
) {
  let newValue = value;

  for (const ipcaValue of ipcaValues) {
    if (currentYear < ipcaValue.ano) {
      newValue += newValue * (ipcaValue.valor / 100);
    }
  }
  return newValue;
}
