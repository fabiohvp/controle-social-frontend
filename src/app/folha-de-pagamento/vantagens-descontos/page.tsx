import PessoalPainelExterno from "../_components/PessoalPainelExterno";

export default function Page() {
  return (
    <PessoalPainelExterno
      alturaPainel="100vw"
      tituloPainel="Vantagens e descontos"
      urlPainel="https://app.powerbi.com/view?r=eyJrIjoiMjI3ZTYwMTUtOGYwYy00MzUwLTgxNWMtNmYwZWQ4MjdlNjc2IiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9"
    >
      Neste painel são exibidos vantagens, descontos e valores observados nas
      folhas de pagamento da Administração Pública.
      <br />
      Os dados apresentados são <b>declaratórios</b>, tendo como fonte as
      remessas enviadas e homologadas por meio do sistema CidadES-Folha de
      Pagamento, conforme Anexo V da IN 68/2020. São considerados dados
      informados a partir de 2021.
    </PessoalPainelExterno>
  );
}
