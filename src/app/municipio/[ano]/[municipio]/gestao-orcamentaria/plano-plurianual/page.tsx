import { MunicipioPageProps } from "../../routes";

// TODO #9: implementar (layout/sidebar/breadcrumb vêm de gestao-orcamentaria/layout.tsx)
export default async function Page({
  params,
}: {
  params: Promise<MunicipioPageProps>;
}) {
  const { ano, municipio } = await params;
  return (
    <>
      Plano plurianual: {ano} {municipio}
    </>
  );
}
