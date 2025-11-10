import { getDataAtual } from "@/shared/date";
import { getEsferasAdministrativas } from "@/shared/esferaAdministrativa";
import { getDatasLimites } from "@/shared/municipio";
import { handleSettledPromise } from "@/shared/promise";
import { getObrigacaoesDeEnvios } from "../_api/getObrigacaoesDeEnvios";
import { getRemessas } from "../_api/getRemessas";
import ObrigacaoEnvioLayout from "../_components/ObrigacaoEnvioLayout";
import { getDoughnut } from "../_shared/getDoughnuts";

type Props = Promise<{
  ano: string;
}>;

export default async function Page({ params }: { params: Props }) {
  const resolvedParams = await params;

  const [datasLimitesRes, esferasAdministrativasRes, obrigacoesDeEnvioRes] =
    await Promise.allSettled([
      getDatasLimites(parseInt(resolvedParams.ano)),
      getEsferasAdministrativas(),
      getObrigacaoesDeEnvios({ ano: resolvedParams.ano, isMunicipios: true }),
    ]);
  const dataAtual = getDataAtual();
  const anoParameter = parseInt(resolvedParams.ano);

  let datasLimites = handleSettledPromise(datasLimitesRes);
  let esferasAdministrativas = handleSettledPromise(esferasAdministrativasRes);
  let obrigacoesDeEnvio = handleSettledPromise(obrigacoesDeEnvioRes);

  const doughnuts = {
    ...getDoughnut({
      abreviacao: "PCM",
      datasLimites: datasLimites.limiteDespesaReceita,
      remessas: getRemessas(
        esferasAdministrativas,
        obrigacoesDeEnvio,
        (d) => d.situacaoRemessasUnidadeGestoraPCM
      ),
      titulo: "Prestação de Contas Mensal (PCM)",
    }),
    ...getDoughnut({
      abreviacao: "PCA",
      datasLimites: undefined,
      remessas:
        anoParameter < dataAtual.getFullYear()
          ? []
          : getRemessas(
              esferasAdministrativas,
              obrigacoesDeEnvio,
              (d) => d.situacaoRemessasUnidadeGestoraPCA
            ),
      titulo: "Prestação de Contas Anual (PCA)",
    }),
    ...getDoughnut({
      abreviacao: "Admissão de pessoal",
      datasLimites: datasLimites.municipioAtosPessoal,
      remessas: getRemessas(
        esferasAdministrativas,
        obrigacoesDeEnvio,
        (d) => d.situacaoRemessasUnidadeGestoraAtos
      ),
      titulo: "Admissão de pessoal - Concursos do Exerc. Anterior",
    }),
    ...getDoughnut({
      abreviacao: "Folha de pagamento",
      datasLimites: datasLimites.folhaDePagamento,
      remessas: getRemessas(
        esferasAdministrativas,
        obrigacoesDeEnvio,
        (d) => d.situacaoRemessasUnidadeGestoraPCF
      ),
      titulo: "Folha de Pagamento",
    }),
  };

  if (anoParameter > 2021) {
    Object.assign(
      doughnuts,
      getDoughnut({
        abreviacao: "Contratação",
        datasLimites: datasLimites.contratacao,
        remessas: getRemessas(
          esferasAdministrativas,
          obrigacoesDeEnvio,
          (d) => d.situacaoRemessasUnidadeGestoraRCO
        ),
        titulo: "Contratação",
      }),
      getDoughnut({
        abreviacao: "Concessão",
        datasLimites: datasLimites.concessao,
        remessas: getRemessas(
          esferasAdministrativas,
          obrigacoesDeEnvio,
          (d) => d.situacaoRemessasUnidadeGestoraRCB
        ),
        titulo: "Concessão",
      })
    );
  }

  return (
    <ObrigacaoEnvioLayout
      doughnuts={doughnuts}
      esferasAdministrativas={esferasAdministrativas}
      exibirMapa={true}
      isMunicipio={true}
    />
  );
}
