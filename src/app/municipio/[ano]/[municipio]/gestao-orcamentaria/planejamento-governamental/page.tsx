export default function Page({
  params,
}: {
  params: { ano: number; municipio: string };
}) {
  return (
    <div>
      Planejamento governamental: {params.ano} {params.municipio}
    </div>
  );
}
