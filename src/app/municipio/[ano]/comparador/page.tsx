import { formatCurrencyKMB, formatFloat, formatInt } from "@/formatters/number";
import { ENV } from "@/shared/env";
import { getCodigoMunicipio, getMunicipios } from "@/shared/municipio";
import { deepMerge } from "@/shared/object";
import { handleSettledPromise } from "@/shared/promise";
import { EsferaAdministrativa } from "@/types/EsferaAdministrativa";
import { NotaIegm } from "@/types/NotaIegm";
import { percent } from "@/types/percent";
import DropdownMunicipiosNomes from "./_components/DropdownMunicipiosNomes";

type Props = {
  params: { ano: string };
  searchParams: { municipios: string[] };
};

export default async function Page({ params, searchParams }: Props) {
  const municipiosSelecionados = searchParams.municipios
    ? Array.isArray(searchParams.municipios)
      ? searchParams.municipios
      : [searchParams.municipios]
    : [];

  let data: Array<MunicipioData | null> = [null, null, null];
  const municipios = await getMunicipios();

  for (let i = 0; i < 3; i++) {
    data[i] = await getData({
      ano: params.ano,
      municipio: municipiosSelecionados[i],
      municipios,
    });
  }

  return (
    <>
      <table className="table mt-2 text-sm">
        <thead>
          <tr>
            <th className="bg-white w-[280px]"></th>
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <th className="fundo" key={index}>
                  <DropdownMunicipiosNomes
                    index={index}
                    municipios={municipiosSelecionados}
                  />
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>População (habitantes)</td>
            {data.map((item, index) => (
              <td key={index}>{formatInt(item?.populacao)}</td>
            ))}
          </tr>
          <tr>
            <td>Área (km²)</td>
            {data.map((item, index) => (
              <td key={index}>{formatFloat(item?.area)}</td>
            ))}
          </tr>
          <tr>
            <td>Obrigação junto ao TCE-ES</td>
            {data.map((item, index) => (
              <td key={index}>{item?.obrigacaoDeEnvio}</td>
            ))}
          </tr>
          <tr>
            <td colSpan={4}>Receita</td>
          </tr>
          <tr>
            <td>Arrecadada</td>
            {data.map((item, index) => (
              <td key={index}>
                {item?.receita.arrecadada.mensal && (
                  <span>
                    R$
                    {formatCurrencyKMB(
                      item?.receita.arrecadada.mensal?.reduce(
                        (acc, curr) => (acc += curr),
                        0
                      ) ?? 0
                    )}
                  </span>
                )}
                {/* {JSON.stringify(item?.receita.arrecadada.mensal)} */}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
}

async function getData({
  ano,
  municipio,
  municipios,
}: {
  ano: string;
  municipio: string;
  municipios: EsferaAdministrativa[];
}): Promise<MunicipioData | null> {
  if (!ano || !municipio) return null;

  const codigo = await getCodigoMunicipio(municipios, municipio)!;
  const promises = generatePromises({
    ano,
    codigo,
  });
  const results = await Promise.allSettled(promises).then((o) =>
    o.map(handleSettledPromise)
  );
  const data = results.reduce((acc, curr) => {
    deepMerge(acc, curr);
    return acc;
  });
  return data as MunicipioData;
}

function generatePromises({ ano, codigo }: { ano: string; codigo: string }) {
  const promises = [
    fetch(
      `${ENV.apiUrl}/MunicipioControllers/Receita/GetEvolucaoAnualReceitaArrecadadaPorEsferaAdministrativa?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&v=20-08-2023-5.2.22`
    ).then(async (o) => {
      const data = (await o.json()) as {
        valores: { anterior: number; atual: number };
      }[];
      const valores = data.at(-1)!.valores;
      return {
        receita: {
          arrecadada: {
            comparadaAoAnoAnterior:
              (valores.atual / valores.anterior) * 100 - 100,
          },
        },
      };
    }),
    fetch(
      `${ENV.apiUrl}/MunicipioControllers/ReceitaDespesa/GetEvolucaoMensalReceitaDespesa?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&v=20-08-2023-5.2.22`
    ).then(async (o) => {
      const data = (await o.json()) as {
        mes: number;
        valores: {
          despesaEmpenhada: number;
          despesaLiquidada: number;
          despesaPaga: number;
          receitaArrecadada: number;
          receitaPrevista: number;
        };
      }[];
      return data.reduce(
        (acc: EvolucaoMensalDespesaEReceita, curr) => {
          acc.despesa.empenhada.mensal[curr.mes - 1] =
            curr.valores.despesaEmpenhada;
          acc.despesa.liquidada.mensal[curr.mes - 1] =
            curr.valores.despesaLiquidada;
          acc.receita.arrecadada.mensal[curr.mes - 1] =
            curr.valores.receitaArrecadada;
          if (curr.valores.receitaPrevista > 0) {
            acc.receita.prevista = curr.valores.receitaPrevista;
          }
          return acc;
        },
        {
          despesa: {
            empenhada: { mensal: [] },
            liquidada: { mensal: [] },
          },
          receita: {
            arrecadada: { mensal: [] },
            prevista: 0,
          },
        }
      );
    }),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Ranking/GetRanking?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Informacao/getByIdEsferaAdministrativaDadosCompletos?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Educacao/GetSumario?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/IEGM/GetTodosIndices?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Despesa/GetEvolucaoAnualDespesaPagaPorEsferaAdministrativa?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Despesa/GetEvolucaoAnualDespesaPagaPorEsferaAdministrativa?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Receita/GetValoresComposicao?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/ReceitaDespesa/GetReceitaXDespesaPorEsferaAdministrativa?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/ObrigacaoEnvio/GetObrigacaoEnvioEmDia?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Despesa/GetDespesaLiquidadaPorClassificacaoNatureza?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&etiqueta=1&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Despesa/GetDespesaLiquidadaPorClassificacaoNatureza?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&etiqueta=2&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Despesa/GetDespesaLiquidadaPorClassificacaoNatureza?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&etiqueta=4&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Despesa/GetDespesaLiquidadaPorClassificacaoNatureza?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&etiqueta=3&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Receita/GetEvolucaoMensalPorClassificacaoNatureza?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&etiqueta=5&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Receita/GetEvolucaoMensalPorClassificacaoNatureza?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&etiqueta=8&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Receita/GetEvolucaoMensalPorClassificacaoNatureza?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&etiqueta=7&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Receita/GetEvolucaoMensalPorClassificacaoNatureza?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&etiqueta=4&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Receita/GetEvolucaoMensalPorClassificacaoNatureza?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&etiqueta=6&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Receita/GetEvolucaoMensalPorClassificacaoNatureza?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&etiqueta=2&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Receita/GetEvolucaoMensalPorClassificacaoNatureza?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&etiqueta=3&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Receita/GetEvolucaoMensalPorClassificacaoNatureza?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&etiqueta=1&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Despesa/GetEvolucaoMensalPorClassificacaoNatureza?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&etiqueta=1&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Despesa/GetEvolucaoMensalPorClassificacaoNatureza?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&etiqueta=2&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Despesa/GetEvolucaoMensalPorClassificacaoNatureza?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&etiqueta=4&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Despesa/GetEvolucaoMensalPorClassificacaoNatureza?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&etiqueta=3&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Receita/GetReceitaArrecadadaPorClassificacaoNatureza?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&etiqueta=5&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Receita/GetReceitaArrecadadaPorClassificacaoNatureza?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&etiqueta=8&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Receita/GetReceitaArrecadadaPorClassificacaoNatureza?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&etiqueta=7&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Receita/GetReceitaArrecadadaPorClassificacaoNatureza?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&etiqueta=4&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Receita/GetReceitaArrecadadaPorClassificacaoNatureza?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&etiqueta=6&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Receita/GetReceitaArrecadadaPorClassificacaoNatureza?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&etiqueta=2&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Receita/GetReceitaArrecadadaPorClassificacaoNatureza?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&etiqueta=3&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
    // fetch(
    //   `${ENV.apiUrl}/MunicipioControllers/Receita/GetReceitaArrecadadaPorClassificacaoNatureza?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&etiqueta=1&v=20-08-2023-5.2.22`
    // ).then((o) => o.json()),
  ];
  return promises;
}

type MunicipioData = {
  area: number;
  obrigacaoDeEnvio: string; //fix
  populacao: number;
  despesa: {
    empenhada: {
      mensal: EvolucaoMensal;
      perCapita: number;
    };
    liquidada: {
      mensal: EvolucaoMensal;
      perCapita: number;
    };
    emDestaque: {
      diarias: EvolucaoMensal;
      materialDeConsumo: EvolucaoMensal;
      materialPermanente: EvolucaoMensal;
      obras: EvolucaoMensal;
    };
    paga: {
      comparadaAoAnoAnterior: percent;
    };
    resultadoOrcamentario: number;
  };
  educacao: {
    alunosDaRedeMunicipal: number;
    aplicacao: number;
    aplicacaoPorAluno: number;
    limiteConstitucional: percent;
    fundeb: percent;
  };
  iegm: {
    educacao: NotaIegm;
    gestaoFiscal: NotaIegm;
    gestaoMunicipal: NotaIegm;
    governanceDeTi: NotaIegm;
    meioAmbiente: NotaIegm;
    planejamento: NotaIegm;
    protecaoDosCidadaos: NotaIegm;
    saude: NotaIegm;
  };
  pessoal: {
    consolidado: {
      despesa: number;
      despesaPerCapita: number;
      limiteLRF: percent;
    };
    executivo: {
      despesa: number;
      despesaPerCapita: number;
      limiteLRF: percent;
    };
    legislativo: {
      despesa: number;
      despesaPerCapita: number;
      despesaPorVereador: number;
      limiteLRF: percent;
    };
  };
  receita: {
    arrecadada: {
      anual: EvolucaoAnual;
      comparadaAoAnoAnterior: percent;
      mensal: EvolucaoMensal;
      perCapita: number;
      prevista: number;
    };
    composicao: {
      doMunicipio: number;
      operacoesDeCredito: number;
      outrasTransferencias: number;
      transferenciaDaUniao: number;
      transferenciaDoEstado: number;
    };
    emDestaque: {
      iptu: EvolucaoMensal;
      iss: EvolucaoMensal;
      itbi: EvolucaoMensal;
    };
    transferenciasDaUniao: {
      convenios: EvolucaoMensal;
      fpm: EvolucaoMensal;
    };
    transferenciasDoEstado: {
      convenios: EvolucaoMensal;
      icms: EvolucaoMensal;
      ipva: EvolucaoMensal;
    };
  };
  saude: {
    aplicacao: number;
    aplicacaoPerCapita: number;
    limiteConstitucional: percent;
  };
};

type EvolucaoAnual = number[];
type EvolucaoMensal = number[];

type EvolucaoMensalDespesaEReceita = {
  despesa: {
    empenhada: { mensal: EvolucaoMensal };
    liquidada: { mensal: EvolucaoMensal };
  };
  receita: {
    arrecadada: { mensal: EvolucaoMensal };
    prevista: number;
  };
};
