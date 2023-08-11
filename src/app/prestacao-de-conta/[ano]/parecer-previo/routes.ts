export type ParecerPrevioPageProps = {
  ano: string;
};

export function generateParecerPrevioUrl({ ano }: ParecerPrevioPageProps) {
  return `/prestacao-de-conta/${ano}/parecer-previo`;
}
