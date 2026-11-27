import {
  formatCurrencyKMB,
  formatFloat,
  formatInt,
  formatPercent,
} from "@/formatters/number";
import { ENV } from "@/shared/env";
import { getCodigoMunicipio, getMunicipios } from "@/shared/municipio";
import { deepMerge } from "@/shared/object";
import { handleSettledPromise } from "@/shared/promise";
import { EsferaAdministrativa } from "@/types/EsferaAdministrativa";
import { NotaIegm } from "@/types/NotaIegm";
import { percent } from "@/types/percent";
import DropdownMunicipiosNomes from "./_components/DropdownMunicipiosNomes";
import Sparkline from "./_components/Sparkline";

type Props = {
  params: Promise<{ ano: string }>;
  searchParams: Promise<{ municipios: string[] }>;
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

type MunicipioData = {
  area?: number;
  obrigacaoDeEnvio?: string;
  populacao?: number;
  despesa?: {
    empenhada?: {
      mensal?: EvolucaoMensal;
      perCapita?: number;
    };
    liquidada?: {
      mensal?: EvolucaoMensal;
      perCapita?: number;
    };
    emDestaque?: {
      diarias?: EvolucaoMensal;
      materialDeConsumo?: EvolucaoMensal;
      materialPermanente?: EvolucaoMensal;
      obras?: EvolucaoMensal;
    };
    paga?: {
      comparadaAoAnoAnterior?: percent;
    };
    resultadoOrcamentario?: number;
  };
  educacao?: {
    alunosDaRedeMunicipal?: number;
    aplicacao?: number;
    aplicacaoPorAluno?: number;
    limiteConstitucional?: percent;
    fundeb?: percent;
  };
  iegm?: {
    educacao?: NotaIegm;
    gestaoFiscal?: NotaIegm;
    gestaoMunicipal?: NotaIegm;
    governanceDeTi?: NotaIegm;
    meioAmbiente?: NotaIegm;
    planejamento?: NotaIegm;
    protecaoDosCidadaos?: NotaIegm;
    saude?: NotaIegm;
  };
  pessoal?: {
    consolidado?: {
      despesa?: number;
      despesaPerCapita?: number;
      limiteLRF?: percent;
    };
    executivo?: {
      despesa?: number;
      despesaPerCapita?: number;
      limiteLRF?: percent;
    };
    legislativo?: {
      despesa?: number;
      despesaPerCapita?: number;
      despesaPorVereador?: number;
      limiteLRF?: percent;
    };
  };
  receita?: {
    arrecadada?: {
      anual?: EvolucaoAnual;
      comparadaAoAnoAnterior?: percent;
      mensal?: EvolucaoMensal;
      perCapita?: number;
      prevista?: number;
    };
    composicao?: {
      doMunicipio?: number;
      operacoesDeCredito?: number;
      outrasTransferencias?: number;
      transferenciaDaUniao?: number;
      transferenciaDoEstado?: number;
    };
    emDestaque?: {
      iptu?: EvolucaoMensal;
      iss?: EvolucaoMensal;
      itbi?: EvolucaoMensal;
    };
    transferenciasDaUniao?: {
      convenios?: EvolucaoMensal;
      fpm?: EvolucaoMensal;
    };
    transferenciasDoEstado?: {
      convenios?: EvolucaoMensal;
      icms?: EvolucaoMensal;
      ipva?: EvolucaoMensal;
    };
  };
  saude?: {
    aplicacao?: number;
    aplicacaoPerCapita?: number;
    limiteConstitucional?: percent;
  };
};

export default async function Page({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const municipiosSelecionados = resolvedSearchParams.municipios
    ? Array.isArray(resolvedSearchParams.municipios)
      ? resolvedSearchParams.municipios
      : [resolvedSearchParams.municipios]
    : [];

  const municipios = await getMunicipios();
  const data: Array<MunicipioData | null> = [null, null, null];

  for (let i = 0; i < 3; i++) {
    data[i] = await getData({
      ano: resolvedParams.ano,
      municipio: municipiosSelecionados[i],
      municipios,
    });
  }

  function renderValorMonetario(val?: number) {
    if (val === undefined || val === null) return "-";
    return `R$ ${formatCurrencyKMB(val)}`;
  }

  function renderPercentual(val?: number) {
    if (val === undefined || val === null) return "-";
    return `${formatPercent(val)}%`;
  }

  return (
    <div className="p-4 overflow-x-auto">
      <table className="table w-full mt-2 text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="bg-white w-[280px] p-2 text-left">Indicador</th>
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <th className="bg-gray-50 p-2 text-left w-1/4" key={index}>
                  <DropdownMunicipiosNomes
                    index={index}
                    municipios={municipiosSelecionados}
                  />
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {/* Informações Gerais */}
          <tr className="bg-gray-100 font-bold">
            <td colSpan={4} className="p-2 text-blue-dark">
              Informações Gerais
            </td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">População (habitantes)</td>
            {data.map((item, index) => (
              <td className="p-2" key={index}>
                {item?.populacao ? formatInt(item.populacao) : "-"}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">Área (km²)</td>
            {data.map((item, index) => (
              <td className="p-2" key={index}>
                {item?.area ? formatFloat(item.area) : "-"}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">Obrigações junto ao TCE-ES</td>
            {data.map((item, index) => (
              <td className="p-2" key={index}>
                {item?.obrigacaoDeEnvio ?? "-"}
              </td>
            ))}
          </tr>

          {/* Receitas */}
          <tr className="bg-gray-100 font-bold">
            <td colSpan={4} className="p-2 text-blue-dark">
              Receitas
            </td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">Receita Arrecadada</td>
            {data.map((item, index) => {
              const total = item?.receita?.arrecadada?.mensal?.reduce(
                (acc, curr) => acc + (curr || 0),
                0
              );
              return (
                <td className="p-2" key={index}>
                  {total ? (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{renderValorMonetario(total)}</span>
                      <Sparkline values={item?.receita?.arrecadada?.mensal} color="#607D8B" />
                    </div>
                  ) : (
                    "-"
                  )}
                </td>
              );
            })}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">Arrecadada per capita</td>
            {data.map((item, index) => (
              <td className="p-2" key={index}>
                {renderValorMonetario(item?.receita?.arrecadada?.perCapita)}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">Receita Prevista</td>
            {data.map((item, index) => (
              <td className="p-2" key={index}>
                {renderValorMonetario(item?.receita?.arrecadada?.prevista)}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">Variação vs Ano Anterior</td>
            {data.map((item, index) => (
              <td className="p-2" key={index}>
                {renderPercentual(item?.receita?.arrecadada?.comparadaAoAnoAnterior)}
              </td>
            ))}
          </tr>

          {/* Despesas */}
          <tr className="bg-gray-100 font-bold">
            <td colSpan={4} className="p-2 text-blue-dark">
              Despesas
            </td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">Despesa Empenhada</td>
            {data.map((item, index) => {
              const total = item?.despesa?.empenhada?.mensal?.reduce(
                (acc, curr) => acc + (curr || 0),
                0
              );
              return (
                <td className="p-2" key={index}>
                  {total ? (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{renderValorMonetario(total)}</span>
                      <Sparkline values={item?.despesa?.empenhada?.mensal} color="#EFB4A3" />
                    </div>
                  ) : (
                    "-"
                  )}
                </td>
              );
            })}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">Despesa Liquidada</td>
            {data.map((item, index) => {
              const total = item?.despesa?.liquidada?.mensal?.reduce(
                (acc, curr) => acc + (curr || 0),
                0
              );
              return (
                <td className="p-2" key={index}>
                  {total ? (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{renderValorMonetario(total)}</span>
                      <Sparkline values={item?.despesa?.liquidada?.mensal} color="#E68364" />
                    </div>
                  ) : (
                    "-"
                  )}
                </td>
              );
            })}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">Liquidada per capita</td>
            {data.map((item, index) => (
              <td className="p-2" key={index}>
                {renderValorMonetario(item?.despesa?.liquidada?.perCapita)}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">Resultado Orçamentário</td>
            {data.map((item, index) => (
              <td className="p-2 font-semibold" key={index}>
                {renderValorMonetario(item?.despesa?.resultadoOrcamentario)}
              </td>
            ))}
          </tr>

          {/* Pessoal */}
          <tr className="bg-gray-100 font-bold">
            <td colSpan={4} className="p-2 text-blue-dark">
              Pessoal
            </td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">Consolidado: Total Gasto</td>
            {data.map((item, index) => (
              <td className="p-2" key={index}>
                {renderValorMonetario(item?.pessoal?.consolidado?.despesa)}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">Consolidado: Limite LRF</td>
            {data.map((item, index) => (
              <td className="p-2 font-semibold" key={index}>
                {renderPercentual(item?.pessoal?.consolidado?.limiteLRF)}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">Executivo: Limite LRF</td>
            {data.map((item, index) => (
              <td className="p-2" key={index}>
                {renderPercentual(item?.pessoal?.executivo?.limiteLRF)}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">Legislativo: Gasto por Vereador</td>
            {data.map((item, index) => (
              <td className="p-2" key={index}>
                {renderValorMonetario(item?.pessoal?.legislativo?.despesaPorVereador)}
              </td>
            ))}
          </tr>

          {/* Saúde */}
          <tr className="bg-gray-100 font-bold">
            <td colSpan={4} className="p-2 text-blue-dark">
              Saúde
            </td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">Aplicação em Saúde</td>
            {data.map((item, index) => (
              <td className="p-2" key={index}>
                {renderValorMonetario(item?.saude?.aplicacao)}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">Aplicação per capita</td>
            {data.map((item, index) => (
              <td className="p-2" key={index}>
                {renderValorMonetario(item?.saude?.aplicacaoPerCapita)}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">Limite Constitucional (mín. 15%)</td>
            {data.map((item, index) => (
              <td className="p-2 font-semibold" key={index}>
                {renderPercentual(item?.saude?.limiteConstitucional)}
              </td>
            ))}
          </tr>

          {/* Educação */}
          <tr className="bg-gray-100 font-bold">
            <td colSpan={4} className="p-2 text-blue-dark">
              Educação
            </td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">Alunos da Rede Municipal</td>
            {data.map((item, index) => (
              <td className="p-2" key={index}>
                {item?.educacao?.alunosDaRedeMunicipal
                  ? formatInt(item.educacao.alunosDaRedeMunicipal)
                  : "-"}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">Aplicação em Educação</td>
            {data.map((item, index) => (
              <td className="p-2" key={index}>
                {renderValorMonetario(item?.educacao?.aplicacao)}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">Aplicação por Aluno</td>
            {data.map((item, index) => (
              <td className="p-2" key={index}>
                {renderValorMonetario(item?.educacao?.aplicacaoPorAluno)}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">Limite Constitucional (mín. 25%)</td>
            {data.map((item, index) => (
              <td className="p-2 font-semibold" key={index}>
                {renderPercentual(item?.educacao?.limiteConstitucional)}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">Aplicação FUNDEB</td>
            {data.map((item, index) => (
              <td className="p-2" key={index}>
                {renderPercentual(item?.educacao?.fundeb)}
              </td>
            ))}
          </tr>

          {/* IEGM */}
          <tr className="bg-gray-100 font-bold">
            <td colSpan={4} className="p-2 text-blue-dark">
              IEGM
            </td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">IEGM Geral</td>
            {data.map((item, index) => (
              <td className="p-2 font-bold" key={index}>
                {item?.iegm?.gestaoMunicipal ?? "-"}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">i-Educ</td>
            {data.map((item, index) => (
              <td className="p-2" key={index}>
                {item?.iegm?.educacao ?? "-"}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">i-Saúde</td>
            {data.map((item, index) => (
              <td className="p-2" key={index}>
                {item?.iegm?.saude ?? "-"}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">i-Planej</td>
            {data.map((item, index) => (
              <td className="p-2" key={index}>
                {item?.iegm?.planejamento ?? "-"}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">i-Fiscal</td>
            {data.map((item, index) => (
              <td className="p-2" key={index}>
                {item?.iegm?.gestaoFiscal ?? "-"}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">i-Amb</td>
            {data.map((item, index) => (
              <td className="p-2" key={index}>
                {item?.iegm?.meioAmbiente ?? "-"}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">i-Cidade</td>
            {data.map((item, index) => (
              <td className="p-2" key={index}>
                {item?.iegm?.protecaoDosCidadaos ?? "-"}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-2 font-medium">i-GovTI</td>
            {data.map((item, index) => (
              <td className="p-2" key={index}>
                {item?.iegm?.governanceDeTi ?? "-"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
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

  const codigo = await getCodigoMunicipio(municipios, municipio);
  if (!codigo) return null;

  const promises = generatePromises({ ano, codigo });
  const results = await Promise.allSettled(promises).then((o) =>
    o.map(handleSettledPromise)
  );

  const data: MunicipioData = {};
  for (const res of results) {
    if (res && typeof res === "object") {
      deepMerge(data, res);
    }
  }
  return data;
}

function generatePromises({ ano, codigo }: { ano: string; codigo: string }) {
  return [
    // 1. Dados Cadastrais e Gerais
    fetch(
      `${ENV.apiUrl}/MunicipioControllers/Informacao/getByIdEsferaAdministrativaDadosCompletos?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&v=${ENV.apiVersion}`,
      { next: { revalidate: 3600 } }
    )
      .then(async (o) => {
        if (!o.ok) return null;
        const d = await o.json();
        return {
          area: d?.areaTerritorial,
          populacao: d?.populacao,
        };
      })
      .catch(() => null),

    // 2. Obrigações TCE
    fetch(
      `${ENV.apiUrl}/MunicipioControllers/ObrigacaoEnvio/GetObrigacaoEnvioEmDia?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&v=${ENV.apiVersion}`,
      { next: { revalidate: 3600 } }
    )
      .then(async (o) => {
        if (!o.ok) return null;
        const d = await o.json();
        return {
          obrigacaoDeEnvio: d?.emDia ? "Em dia" : "Pendente",
        };
      })
      .catch(() => null),

    // 3. Evolução Mensal Receita e Despesa
    fetch(
      `${ENV.apiUrl}/MunicipioControllers/ReceitaDespesa/GetEvolucaoMensalReceitaDespesa?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&v=${ENV.apiVersion}`,
      { next: { revalidate: 3600 } }
    )
      .then(async (o) => {
        if (!o.ok) return null;
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
              curr.valores?.despesaEmpenhada || 0;
            acc.despesa.liquidada.mensal[curr.mes - 1] =
              curr.valores?.despesaLiquidada || 0;
            acc.receita.arrecadada.mensal[curr.mes - 1] =
              curr.valores?.receitaArrecadada || 0;
            if (curr.valores?.receitaPrevista > 0) {
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
      })
      .catch(() => null),

    // 4. Receita Arrecadada Comparativo Anual
    fetch(
      `${ENV.apiUrl}/MunicipioControllers/Receita/GetEvolucaoAnualReceitaArrecadadaPorEsferaAdministrativa?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&v=${ENV.apiVersion}`,
      { next: { revalidate: 3600 } }
    )
      .then(async (o) => {
        if (!o.ok) return null;
        const data = (await o.json()) as {
          valores: { anterior: number; atual: number };
        }[];
        const valores = data?.at(-1)?.valores;
        if (!valores || !valores.anterior) return null;
        return {
          receita: {
            arrecadada: {
              comparadaAoAnoAnterior:
                (valores.atual / valores.anterior) * 100 - 100,
            },
          },
        };
      })
      .catch(() => null),

    // 5. Resultado Orçamentário e Resumo
    fetch(
      `${ENV.apiUrl}/MunicipioControllers/ReceitaDespesa/GetReceitaXDespesaPorEsferaAdministrativa?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&v=${ENV.apiVersion}`,
      { next: { revalidate: 3600 } }
    )
      .then(async (o) => {
        if (!o.ok) return null;
        const d = await o.json();
        return {
          despesa: {
            resultadoOrcamentario: d?.resultadoOrcamentario,
          },
        };
      })
      .catch(() => null),

    // 6. Educação
    fetch(
      `${ENV.apiUrl}/MunicipioControllers/Educacao/GetSumario?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&v=${ENV.apiVersion}`,
      { next: { revalidate: 3600 } }
    )
      .then(async (o) => {
        if (!o.ok) return null;
        const d = await o.json();
        return {
          educacao: {
            alunosDaRedeMunicipal: d?.totalAlunos,
            aplicacao: d?.valorAplicado,
            aplicacaoPorAluno: d?.valorAplicadoPorAluno,
            limiteConstitucional: d?.percentualAplicado,
            fundeb: d?.percentualFundeb,
          },
        };
      })
      .catch(() => null),

    // 7. IEGM
    fetch(
      `${ENV.apiUrl}/MunicipioControllers/IEGM/GetTodosIndices?anoExercicio=${ano}&idEsferaAdministrativa=${codigo}&v=${ENV.apiVersion}`,
      { next: { revalidate: 3600 } }
    )
      .then(async (o) => {
        if (!o.ok) return null;
        const d = await o.json();
        return {
          iegm: {
            gestaoMunicipal: d?.iIEGM as NotaIegm,
            educacao: d?.iEduc as NotaIegm,
            saude: d?.iSaude as NotaIegm,
            planejamento: d?.iPlanejamento as NotaIegm,
            gestaoFiscal: d?.iFiscal as NotaIegm,
            meioAmbiente: d?.iAmb as NotaIegm,
            protecaoDosCidadaos: d?.iCidade as NotaIegm,
            governanceDeTi: d?.iGovTI as NotaIegm,
          },
        };
      })
      .catch(() => null),
  ];
}
