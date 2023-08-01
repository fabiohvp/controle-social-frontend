export type First<TArray extends any[]> = TArray extends [
  infer TFirst,
  ...any[]
]
  ? TFirst
  : never;

export function groupBy<TKey, TValue>(
  list: TValue[],
  keyGetter: (item: TValue) => TKey
) {
  const map = new Map<TKey, TValue[]>();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

export function makeSortedMapByValue<K, V>(
  map: Map<K, V>,
  getValue: (item: [K, V]) => string
) {
  map[Symbol.iterator] = function* () {
    yield* [...this.entries()].sort((a: [K, V], b: [K, V]) =>
      getValue(a).localeCompare(getValue(b))
    );
  };
}
