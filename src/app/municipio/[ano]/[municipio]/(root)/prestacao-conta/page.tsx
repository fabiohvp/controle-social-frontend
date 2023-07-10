export default function Page({
  params,
}: {
  params: { ano: number; municipio: string };
}) {
  return (
    <div>
      Prestação conta: {params.ano} {params.municipio}
    </div>
  );
}
