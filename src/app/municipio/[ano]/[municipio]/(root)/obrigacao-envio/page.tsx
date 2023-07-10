export default function Page({
  params,
}: {
  params: { ano: number; municipio: string };
}) {
  return (
    <div>
      Obrigação Envio: {params.ano} {params.municipio}
    </div>
  );
}
