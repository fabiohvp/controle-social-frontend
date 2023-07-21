export function dropdownDefaultComparer<T>(value?: T, selectedValue?: T) {
  return value === selectedValue;
}

export function dropdownStartsWithComparer(
  value?: string,
  selectedValue?: string
) {
  if (!value) return false;
  if (!selectedValue) return false;
  return value.startsWith(selectedValue);
}
