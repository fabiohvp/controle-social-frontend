import PessoalPainelExterno from "../_components/PessoalPainelExterno";

export default function Page() {
  return (
    <PessoalPainelExterno
      alturaPainel="70vw"
      tituloPainel="Ingressos e desligamentos"
      urlPainel="https://app.powerbi.com/view?r=eyJrIjoiZDczOGJmMDQtYzRjZi00NTZlLWIzMDgtMGFhYTc3NzM3ZDNjIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9"
    >
      Para os agentes públicos ativos, exceto os cedidos, considera-se ingresso
      quando um novo vínculo é iniciado e desligamento quando é encerrado, mas
      não se trata de transferência de lotação para outra unidade.
      <br />
      Os dados apresentados são <b>declaratórios</b>, tendo como fonte as
      remessas enviadas e homologadas por meio do sistema CidadES-Folha de
      Pagamento, conforme Anexo V da IN 68/2020. São considerados dados
      informados a partir de 2021.
    </PessoalPainelExterno>
  );
}
