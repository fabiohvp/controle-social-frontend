export default function Page({
  params,
}: {
  params: { ano: number; municipio: string };
}) {
  return (
    <div>
      Plano plurianual: {params.ano} {params.municipio}
    </div>
  );
}
