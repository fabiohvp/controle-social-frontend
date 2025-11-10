import { normalize } from "@/formatters/string";
import { getDatasLimites } from "@/shared/municipio";
import { handleSettledPromise } from "@/shared/promise";
import { getUnidadesGestorasEstaduais } from "@/shared/unidadeGestora";
import { getObrigacaoesDeEnvios } from "../_api/getObrigacaoesDeEnvios";
import { getRemessas } from "../_api/getRemessas";
import ObrigacaoEnvioLayout from "../_components/ObrigacaoEnvioLayout";
import { getDoughnut } from "../_shared/getDoughnuts";

type Props = Promise<{
  ano: string;
}>;

export default async function Page({ params }: { params: Props }) {
  const resolvedParams = await params;

  const [datasLimitesRes, unidadesGestorasRes, obrigacoesDeEnvioRes] =
    await Promise.allSettled([
      getDatasLimites(parseInt(resolvedParams.ano)),
      getUnidadesGestorasEstaduais().map((ug) => ({
        codigo: ug.codigo.substring(0, 3),
        nome: ug.nome,
        nomeNormalizado: normalize(ug.nome),
      })),
      getObrigacaoesDeEnvios({ ano: resolvedParams.ano, isMunicipios: false }),
    ]);
  const anoParameter = parseInt(resolvedParams.ano);

  let datasLimites = handleSettledPromise(datasLimitesRes);
  let unidadesGestoras = handleSettledPromise(unidadesGestorasRes);
  let obrigacoesDeEnvio = handleSettledPromise(obrigacoesDeEnvioRes);

  const doughnuts = {
    ...getDoughnut({
      abreviacao: "PCM",
      datasLimites: datasLimites.limiteDespesaReceita,
      remessas: getRemessas(
        unidadesGestoras,
        obrigacoesDeEnvio,
        (d) => d.situacaoRemessasUnidadeGestoraPCM
      ),
      titulo: "Prestação de Contas Mensal (PCM)",
    }),
    ...getDoughnut({
      abreviacao: "PCA",
      datasLimites: undefined,
      remessas: getRemessas(
        unidadesGestoras,
        obrigacoesDeEnvio,
        (d) => d.situacaoRemessasUnidadeGestoraPCA
      ),
      titulo: "Prestação de Contas Anual (PCA)",
    }),
    ...getDoughnut({
      abreviacao: "Admissão de pessoal",
      datasLimites: datasLimites.municipioAtosPessoal,
      remessas: getRemessas(
        unidadesGestoras,
        obrigacoesDeEnvio,
        (d) => d.situacaoRemessasUnidadeGestoraAtos
      ),
      titulo: "Admissão de pessoal - Concursos do Exerc. Anterior",
    }),
    ...getDoughnut({
      abreviacao: "Folha de pagamento",
      datasLimites: datasLimites.folhaDePagamento,
      remessas: getRemessas(
        unidadesGestoras,
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
          unidadesGestoras,
          obrigacoesDeEnvio,
          (d) => d.situacaoRemessasUnidadeGestoraRCO
        ),
        titulo: "Contratação",
      }),
      getDoughnut({
        abreviacao: "Concessão",
        datasLimites: datasLimites.concessao,
        remessas: getRemessas(
          unidadesGestoras,
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
      esferasAdministrativas={unidadesGestoras}
      exibirMapa={false}
      isMunicipio={false}
    />
  );
}
