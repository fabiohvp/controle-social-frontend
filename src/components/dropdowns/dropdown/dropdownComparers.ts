export function dropdownDefaultComparer<T>(value?: T, selectedValue?: T) {
  return value === selectedValue;
}

export function dropdownStartsWithComparer(
  value: string | undefined,
  selectedValue: string | undefined
) {
  if (!value) return false;
  if (!selectedValue) return false;
  return value.startsWith(selectedValue);
}
