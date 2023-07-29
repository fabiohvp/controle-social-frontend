import { getDataAtual } from "@/shared/date";
import { getDatasLimites, getMunicipios } from "@/shared/municipio";
import ObrigacaoEnvioLayout from "../_components/ObrigacaoEnvioLayout";
import { getDoughnut } from "../getDoughnuts";
import { getObrigacaoesDeEnvios } from "../getObrigacaoesDeEnvios";

type Props = {
  ano: string;
};

export default async function Page({ params }: { params: Props }) {
  const [obrigacoesDeEnvio, datasLimites, municipios] = await Promise.all([
    getObrigacaoesDeEnvios({ ano: params.ano, municipios: true }),
    getDatasLimites(parseInt(params.ano)),
    getMunicipios(),
  ]);
  const dataAtual = getDataAtual();
  const anoParameter = parseInt(params.ano);

  const doughnuts = [
    getDoughnut({
      abreviacao: "PCM",
      datasLimites: datasLimites.limiteDespesaReceita,
      remessas: obrigacoesDeEnvio.map((d) => ({
        codigo: d.codigo,
        envio: d.situacaoRemessasUnidadeGestoraPCM,
      })),
      titulo: "Prestação de Contas Mensal (PCM)",
    }),
    getDoughnut({
      abreviacao: "PCA",
      datasLimites: undefined,
      remessas:
        anoParameter < dataAtual.getFullYear()
          ? []
          : obrigacoesDeEnvio.map((d) => ({
              codigo: d.codigo,
              envio: d.situacaoRemessasUnidadeGestoraPCA,
            })),
      titulo: "Prestação de Contas Anual (PCA)",
    }),
    getDoughnut({
      abreviacao: "Admissão de pessoal",
      datasLimites: datasLimites.municipioAtosPessoal,
      remessas: obrigacoesDeEnvio.map((d) => ({
        codigo: d.codigo,
        envio: d.situacaoRemessasUnidadeGestoraAtos,
      })),
      titulo: "Admissão de pessoal - Concursos do Exerc. Anterior",
    }),
    getDoughnut({
      abreviacao: "Folha de pagamento",
      datasLimites: datasLimites.folhaDePagamento,
      remessas: obrigacoesDeEnvio.map((d) => ({
        codigo: d.codigo,
        envio: d.situacaoRemessasUnidadeGestoraPCF,
      })),
      titulo: "Folha de Pagamento",
    }),
  ];

  if (anoParameter > 2021) {
    doughnuts.push(
      getDoughnut({
        abreviacao: "Contratação",
        datasLimites: datasLimites.contratacao,
        remessas: obrigacoesDeEnvio.map((d) => ({
          codigo: d.codigo,
          envio: d.situacaoRemessasUnidadeGestoraRCO,
        })),
        titulo: "Contratação",
      }),
      getDoughnut({
        abreviacao: "Concessão",
        datasLimites: datasLimites.concessao,
        remessas: obrigacoesDeEnvio.map((d) => ({
          codigo: d.codigo,
          envio: d.situacaoRemessasUnidadeGestoraRCB,
        })),
        titulo: "Concessão",
      })
    );
  }

  return <ObrigacaoEnvioLayout doughnuts={doughnuts} municipios={municipios} />;
}
