import { getDataAtual } from "@/shared/date";
import { COLOR } from "@/theme/colors";
import { DataLimite } from "@/types/Municipio";
import { ObrigacaoEnvioDoughnut, Remessas } from "./types";

export function getDoughnut({
  abreviacao,
  datasLimites,
  remessas,
  titulo,
}: {
  abreviacao: string;
  datasLimites?: DataLimite[];
  remessas: Remessas;
  titulo: string;
}): ObrigacaoEnvioDoughnut {
  if (!datasLimites) {
    return {
      abreviacao,
      comAtraso: [],
      data: undefined,
      naoObrigatorias: [],
      title: titulo,
    };
  }

  const dataAtual = getDataAtual();
  let remessasObrigatorias = remessas;

  if (datasLimites.length) {
    remessasObrigatorias = remessasObrigatorias.filter((remessa) => {
      const limite = datasLimites?.find(
        (o) => o.data <= dataAtual && o.codigo === remessa.codigo
      );
      return limite && remessa.envio.quantidadeObrigacaoEnvio;
    });
  }
  const comAtraso = remessasObrigatorias.filter(
    (remessa) => remessa.envio.quantidadePendente > 0
  );
  const comAtrasoPercent = Math.floor(
    (comAtraso.length / remessasObrigatorias.length) * 100
  );
  const naoObrigatorias = remessas.filter(
    (r) => !remessasObrigatorias.some((ro) => ro.codigo === r.codigo)
  );

  return {
    abreviacao,
    comAtraso,
    data: {
      colors: [COLOR["chart-positivo"], COLOR["chart-negativo"]],
      items: [
        {
          name: "Remessas em dia",
          value: 100 - comAtrasoPercent,
          extra: {
            quantidade: remessasObrigatorias.length - comAtraso.length,
          },
        },
        {
          name: "Remessas em atraso",
          value: comAtrasoPercent,
          extra: {
            quantidade: comAtraso.length,
          },
        },
      ],
    },
    naoObrigatorias,
    title: titulo,
  };
}
