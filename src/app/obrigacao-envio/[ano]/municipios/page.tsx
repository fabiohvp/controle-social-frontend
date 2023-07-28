import { getDataAtual } from "@/shared/date";
import { getDatasLimites, getMunicipios } from "@/shared/municipio";
import { COLOR } from "@/theme/colors";
import { DataLimite } from "@/types/Municipio";
import { Remessa, getObrigacaoesDeEnvios } from "../../getObrigacaoesDeEnvios";
import ObrigacaoEnvioLayout from "../_components/ObrigacaoEnvioLayout";

type Props = {
  ano: string;
};

export default async function Page({ ano }: Props) {
  const [obrigacoesDeEnvio, datasLimites, municipios] = await Promise.all([
    getObrigacaoesDeEnvios({ ano: ano, municipios: true }),
    getDatasLimites(parseInt(ano)),
    getMunicipios(),
  ]);
  const dataAtual = getDataAtual();
  const anoParameter = parseInt(ano);

  const doughnuts = [
    getDoughnut(
      datasLimites.limiteDespesaReceita,
      obrigacoesDeEnvio.map((d) => ({
        codigo: d.codigo,
        envio: d.situacaoRemessasUnidadeGestoraPCM,
      })),
      "Prestação de Contas Mensal (PCM)"
    ),
    anoParameter < dataAtual.getFullYear()
      ? getDoughnut(
          [],
          obrigacoesDeEnvio.map((d) => ({
            codigo: d.codigo,
            envio: d.situacaoRemessasUnidadeGestoraPCA,
          })),
          "Prestação de Contas Anual (PCA)"
        )
      : {
          title: "Prestação de Contas Anual (PCA)",
        },
    getDoughnut(
      datasLimites.municipioAtosPessoal,
      obrigacoesDeEnvio.map((d) => ({
        codigo: d.codigo,
        envio: d.situacaoRemessasUnidadeGestoraAtos,
      })),
      "Admissão de pessoal - Concursos do Exerc. Anterior"
    ),

    getDoughnut(
      datasLimites.folhaDePagamento,
      obrigacoesDeEnvio.map((d) => ({
        codigo: d.codigo,
        envio: d.situacaoRemessasUnidadeGestoraPCF,
      })),
      "Folha de Pagamento"
    ),
  ];

  if (anoParameter > 2021) {
    doughnuts.push(
      getDoughnut(
        datasLimites.contratacao,
        obrigacoesDeEnvio.map((d) => ({
          codigo: d.codigo,
          envio: d.situacaoRemessasUnidadeGestoraRCO,
        })),
        "Contratação"
      ),
      getDoughnut(
        datasLimites.concessao,
        obrigacoesDeEnvio.map((d) => ({
          codigo: d.codigo,
          envio: d.situacaoRemessasUnidadeGestoraRCB,
        })),
        "Concessão"
      )
    );
  }

  return (
    <ObrigacaoEnvioLayout
      doughnuts={doughnuts}
      obrigacoesDeEnvio={obrigacoesDeEnvio}
      municipios={municipios}
    />
  );
}

function getDoughnut(
  datasLimites: DataLimite[],
  remessas: { codigo: string; envio: Remessa }[],
  title: string
) {
  const dataAtual = getDataAtual();
  let remessasObrigatorias = remessas;

  if (datasLimites?.length) {
    remessasObrigatorias = remessasObrigatorias.filter((remessa) => {
      const limite = datasLimites?.find(
        (o) => o.data <= dataAtual && o.codigo === remessa.codigo
      );
      if (limite) {
        return remessa.envio.quantidadeObrigacaoEnvio;
      }
      return false;
    });
  }
  const pendentes = remessasObrigatorias.reduce(
    (acc, remessa) => acc + remessa.envio.quantidadePendente,
    0
  );
  const pendentesPercent = Math.floor(
    (pendentes / remessasObrigatorias.length) * 100
  );

  return {
    data: {
      colors: [COLOR["chart-positivo"], COLOR["chart-negativo"]],
      items: [
        {
          name: "Remessas em dia",
          value: 100 - pendentesPercent,
          extra: {
            quantidade: remessasObrigatorias.length - pendentes,
          },
        },
        {
          name: "Remessas em atraso",
          value: pendentesPercent,
          extra: {
            quantidade: pendentes,
          },
        },
      ],
    },
    title,
  };
}
