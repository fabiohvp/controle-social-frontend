import { getObrigacaoesDeEnvios } from "@/app/obrigacao-de-envio/[ano]/_api/getObrigacaoesDeEnvios";
import { getRemessas } from "@/app/obrigacao-de-envio/[ano]/_api/getRemessas";
import ObrigacaoEnvioLayout from "@/app/obrigacao-de-envio/[ano]/_components/ObrigacaoEnvioLayout";
import { getDoughnut } from "@/app/obrigacao-de-envio/[ano]/_shared/getDoughnuts";
import { getDataAtual } from "@/shared/date";
import { Esfera } from "@/shared/esfera";
import { getEsferasAdministrativas } from "@/shared/esferaAdministrativa";
import { getDatasLimites } from "@/shared/municipio";
import { handleSettledPromise } from "@/shared/promise";

type Props = {
  ano: string;
  esfera: Esfera;
};

export default async function ObrigacaoEnvioEnte({ ano, esfera }: Props) {
  const isMunicipios = esfera.tipo === "municipio";
  const [datasLimitesRes, esferasAdministrativasRes, obrigacoesDeEnvioRes] =
    await Promise.allSettled([
      getDatasLimites(parseInt(ano)),
      getEsferasAdministrativas(),
      getObrigacaoesDeEnvios({ ano, isMunicipios: true }),
    ]);

  const datasLimites = handleSettledPromise(datasLimitesRes);
  const todasEsferas = handleSettledPromise(esferasAdministrativasRes);
  const todasObrigacoes = handleSettledPromise(obrigacoesDeEnvioRes);

  // Filtra para o município selecionado, mantendo a estrutura esperada pelos componentes
  const esferasAdministrativas = isMunicipios
    ? todasEsferas.filter((e) => e.codigo === esfera.codigo)
    : todasEsferas;
  const obrigacoesDeEnvio = isMunicipios
    ? todasObrigacoes.filter((o) => o.codigo === esfera.codigo)
    : todasObrigacoes;

  const dataAtual = getDataAtual();
  const anoParameter = parseInt(ano);

  const doughnuts = {
    ...getDoughnut({
      abreviacao: "PCM",
      datasLimites: datasLimites?.limiteDespesaReceita,
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
      datasLimites: datasLimites?.municipioAtosPessoal,
      remessas: getRemessas(
        esferasAdministrativas,
        obrigacoesDeEnvio,
        (d) => d.situacaoRemessasUnidadeGestoraAtos
      ),
      titulo: "Admissão de pessoal - Concursos do Exerc. Anterior",
    }),
    ...getDoughnut({
      abreviacao: "Folha de pagamento",
      datasLimites: datasLimites?.folhaDePagamento,
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
        datasLimites: datasLimites?.contratacao,
        remessas: getRemessas(
          esferasAdministrativas,
          obrigacoesDeEnvio,
          (d) => d.situacaoRemessasUnidadeGestoraRCO
        ),
        titulo: "Contratação",
      }),
      getDoughnut({
        abreviacao: "Concessão",
        datasLimites: datasLimites?.concessao,
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
      exibirMapa={false}
      isMunicipio={isMunicipios}
    />
  );
}
