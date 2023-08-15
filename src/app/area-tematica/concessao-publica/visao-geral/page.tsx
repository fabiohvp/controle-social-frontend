import DespesaPppLogo from "@/components/images/logos/DespesaPppLogo";
import PanelWithTitleCollapsible from "@/components/panel/PanelWithTitleCollapsible";

export default function Page() {
  return (
    <>
      <PanelWithTitleCollapsible
        header="Concessões comuns e Parcerias Público-Privadas"
        headerProps={{ className: "font-bold text-xl" }}
      >
        <div>
          <p>
            <span className="font-bold">Concessão comum</span>, regida pela Lei
            8.987/95, é um contrato através do qual o Poder Público transfere a
            execução de determinado serviço público ao particular, selecionado
            em prévia licitação, que assumirá, por prazo certo e por sua conta e
            risco, a gestão de projeto autossustentável (remunerado por tarifa
            paga pelo usuário do serviço).
          </p>
          <p>
            Já as{" "}
            <span className="font-bold">PPP (Parceria Público-Privada)</span>{" "}
            são concessões regidas pela Lei 11.079/04 e se dividem em:
          </p>
          <ul className="styled">
            <li>
              <p>
                <span className="font-bold">PPP patrocinada</span>: concessão de
                serviços públicos ou de obras públicas, quando envolver,
                adicionalmente à tarifa cobrada dos usuários, contraprestação
                pecuniária do parceiro público ao parceiro privado.
              </p>
            </li>
            <li>
              <p>
                <span className="font-bold">PPP administrativa</span>: contrato
                de prestação de serviços de que a Administração Pública seja a
                usuária direta ou indireta, ainda que envolva execução de obra
                ou fornecimento e instalação de bens. A concessionária não é
                remunerada mediante tarifas, mas através de contraprestação paga
                pelo Poder Público.
              </p>
            </li>
          </ul>
        </div>
        <div className="center w-4/12">
          <DespesaPppLogo />
        </div>
      </PanelWithTitleCollapsible>
      {/* <div>TODO: implementar concessões e PPP / visao-geral</div> */}
    </>
  );
}
