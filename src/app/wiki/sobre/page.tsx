import WikiLayout from "@/app/wiki/_components/WikiLayout";

export default function Page() {
  return (
    <WikiLayout title="Sobre">
      <div>
        <p>
          O Painel de Controle é um serviço do Tribunal de Contas do Espírito
          Santo que consolida informações geradas a partir dos dados enviados
          pelos seus jurisdicionados por meio da plataforma CidadES e,
          complementarmente, dados disponibilizados por outras entidades, tais
          como IBGE, INEP, PNUD e TSE.
        </p>
        <br />
        <p>
          <strong>Importante:</strong> As informações aqui apresentadas foram
          geradas a partir dos dados enviados pelos órgãos jurisdicionados do
          Tribunal de Contas do ES. Eventuais incorreções ou omissões no envio
          desses dados são de responsabilidade dos próprios jurisdicionados.
        </p>
      </div>
    </WikiLayout>
  );
}
