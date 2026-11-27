import { MunicipioPageProps } from "../../routes";

// TODO #9: implementar (layout/sidebar/breadcrumb vêm de gestao-fiscal/layout.tsx)
export default async function Page({
  params,
}: {
  params: Promise<MunicipioPageProps>;
}) {
  const { ano, municipio } = await params;
  return (
    <>
      Metas de arrecadação: {ano} {municipio}
    </>
  );
}
