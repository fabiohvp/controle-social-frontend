export default function Page({
  params,
}: {
  params: { ano: number; municipio: string };
}) {
  return (
    <div>
      meta arrecadação: {params.ano} {params.municipio}
    </div>
  );
}
