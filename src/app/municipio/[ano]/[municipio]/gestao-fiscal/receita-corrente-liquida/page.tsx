export default function Page({
  params,
}: {
  params: { ano: number; municipio: string };
}) {
  return (
    <div>
      receita correnta liquida: {params.ano} {params.municipio}
    </div>
  );
}
