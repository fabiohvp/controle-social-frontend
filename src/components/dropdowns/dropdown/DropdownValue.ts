export type DropdownValue<T> = T & {
  value: string;
};

export function createDropdownValue<T>(value: string) {
  return { value } as DropdownValue<T>;
}
