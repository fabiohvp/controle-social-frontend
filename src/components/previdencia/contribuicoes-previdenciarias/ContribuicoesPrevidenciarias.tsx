import PanelWithDescription from "@/components/panel/PanelWithDescription";
import { formatCurrency } from "@/formatters/number";
import { PrevidenciaProps, getDadosPrevidenciaEnte } from "../previdenciaApi";
import TabelaContribuicoes, { ContribuicoesApi } from "../TabelaContribuicoes";

type GraficosContribuicao = {
  patronalSuplementar?: unknown;
  tabelaContribuicao?: ContribuicoesApi;
};

export default async function ContribuicoesPrevidenciarias(props: PrevidenciaProps) {
  const [graficos, normal, suplementar] = await Promise.all([
    getDadosPrevidenciaEnte<GraficosContribuicao>(
      props,
      "GetGraficosContribuicaoPrevidenciaria"
    ),
    getDadosPrevidenciaEnte<ContribuicoesApi>(props, "GetContribuicaoNormal"),
    getDadosPrevidenciaEnte<ContribuicoesApi>(props, "GetContribuicaoSuplementar"),
  ]);

  return (
    <div className="flex flex-col gap-4" id="contribuicoes-previdenciarias">
      <PanelWithDescription
        titulo="Contribuições Previdenciárias Patronais"
        descricao="Os órgãos do município realizam despesas ao fazerem contribuições para o Regime Próprio de Previdência, que podem ser patronais ou suplementares. Por outro lado, para o instituto de previdência esses valores representam receitas. Os dados exibidos neste painel são declaratórios, tendo como fonte as remessas enviadas e homologadas por meio do sistema CidadES-PCM e CidadES-Folha."
      >
        <div className="flex flex-col gap-6">
          <div>
            <h4 className="font-semibold text-sm text-gray-700 mb-2 border-b pb-1">
              Contribuição Normal
            </h4>
            <TabelaContribuicoes dados={normal ?? graficos?.tabelaContribuicao ?? null} />
          </div>

          <div>
            <h4 className="font-semibold text-sm text-gray-700 mb-2 border-b pb-1">
              Contribuição Suplementar
            </h4>
            <TabelaContribuicoes dados={suplementar ?? null} />
          </div>
        </div>
      </PanelWithDescription>
    </div>
  );
}
