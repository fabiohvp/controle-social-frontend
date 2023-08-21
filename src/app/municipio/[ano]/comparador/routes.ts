export type ComparadorProps = {
  ano: string;
};

export function generateComparadorUrl({ ano }: ComparadorProps) {
  return `/municipio/${ano}/comparador`;
}
