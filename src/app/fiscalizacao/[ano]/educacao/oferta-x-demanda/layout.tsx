import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import PainelDeAlerta from "@/components/paineis/PainelDeAlerta";
import { ReactNode } from "react";
import OfertaXDemandaItensSubmenu from "./OfertaXDemandaItensSubmenu";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      className="pt-2 px-2"
      exibirFooter={false}
      itensSubmenu={OfertaXDemandaItensSubmenu}
    >
      <PainelDeAlerta type="info">
        Em 2019 o Tribunal de Contas do ES realizou fiscalização, na modalidade
        Levantamento, com o objetivo de verificar e analisar a oferta e a
        demanda por vagas nas redes públicas estadual e municipais da educação
        básica, bem como sua distribuição nos estabelecimentos de ensino e
        evolução nos indicadores pertinentes.
        <br />A fiscalização, que abrangeu os 78 municípios capixabas e o Estado
        do Espírito Santo, abordou, em síntese, os seguintes temas: regime de
        colaboração entre a rede estadual e as redes municipais, existência de
        sistema informatizado de gestão escolar, capacidade física das redes,
        indicadores educacionais (Ideb, taxa de distorção idade-série e taxa de
        abandono) e localização da escola em relação ao endereço dos alunos.
      </PainelDeAlerta>
      {children}
    </DashboardLayout>
  );
}
