export function mdc(values: number[]) {
  if (!values.length) return 0;
  for (var r, a, i = values.length - 1, b = values[i]; i; )
    for (a = values[--i]; (r = a % b); a = b, b = r);
  return b;
}
