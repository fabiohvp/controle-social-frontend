export type First<TArray extends any[]> = TArray extends [
  infer TFirst,
  ...any[]
]
  ? TFirst
  : never;
