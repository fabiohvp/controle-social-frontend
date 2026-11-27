import { EstadoPageProps } from "@/app/estado/[ano]/routes";

// TODO #9: implementar (layout/sidebar/breadcrumb vêm de gestao-fiscal/layout.tsx)
export default async function Page({
  params,
}: {
  params: Promise<EstadoPageProps>;
}) {
  const { ano } = await params;
  return <>Metas de arrecadação: {ano}</>;
}
