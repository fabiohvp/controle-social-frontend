import AlertPanel from "@/components/panel/AlertPanel";
import { ReactNode } from "react";

//TODO: trocar texto do alerta de acordo com o ano
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AlertPanel className="text-sm" type="info">
        O Boletim de Macrogestão Governamental é um documento informativo
        gerencial publicado mensalmente pelo Tribunal de Contas do Estado do
        Espirito Santo, desde de 2016, elaborado com base nos dados das
        plataformas CidadES (informações fiscais e econômicas do Estado e dos
        municípios capixabas, produzido pelo próprio TCEES) e Sigefes (gestão
        das finanças públicas do Estado, utilizado pelo Governo Estadual). O
        painel destaca e compara os principais indicadores e resultados da
        gestão dos recursos públicos estaduais e municipais, constituindo-se em
        um instrumento de controle e acompanhamento das finanças públicas dos
        poderes estaduais e municipais do Espírito Santo.
      </AlertPanel>
      {children}
    </>
  );
}
