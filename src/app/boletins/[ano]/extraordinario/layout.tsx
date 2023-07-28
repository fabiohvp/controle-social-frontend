import PainelDeAlerta from "@/components/paineis/PainelDeAlerta";
import { ReactNode } from "react";

//TODO: trocar texto do alerta de acordo com o ano
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PainelDeAlerta className="text-sm" type="info">
        O Boletim Extraordinário é um documento publicado pelo Tribunal de
        Contas do Estado do Espirito Santo, a partir deste ano de 2020, e tem
        como objetivo principal apresentar o resultado de estudos técnicos,
        avaliações e projeções econômico-fiscais do Estado e dos municípios
        capixabas, realizados sempre em função de eventos sócio-econômicos
        relevantes, a exemplo do que ocorre com a pandemia do novo coronavírus -
        Covid-19.
      </PainelDeAlerta>
      {children}
    </>
  );
}
