import { getMunicipios } from "@/shared/municipio";
import { COLOR } from "@/theme/colors";
import ObrigacaoEnvioLayout from "../_components/ObrigacaoEnvioLayout";

const CHART_SETTINGS = [
  {
    title: "Prestação de Contas Mensal (PCM)",
    data: {
      colors: [COLOR["chart-positivo"], COLOR["chart-negativo"]],
      items: [
        {
          name: "Remessas em dia",
          value: 100,
        },

        {
          name: "Remessas em atraso",
          value: 150,
        },
      ],
    },
  },
  {
    title: "Prestação de Contas Anual (PCA)",
    data: {
      colors: [COLOR["chart-positivo"], COLOR["chart-negativo"]],
      items: [
        {
          name: "Remessas em dia",
          value: 100,
        },

        {
          name: "Remessas em atraso",
          value: 150,
        },
      ],
    },
  },
  {
    title: "Admissão de pessoal - Concursos do Exerc. Anterior",
    data: {
      colors: [COLOR["chart-positivo"], COLOR["chart-negativo"]],
      items: [
        {
          name: "Remessas em dia",
          value: 100,
        },

        {
          name: "Remessas em atraso",
          value: 150,
        },
      ],
    },
  },
  {
    title: "Folha de Pagamento",
    data: {
      colors: [COLOR["chart-positivo"], COLOR["chart-negativo"]],
      items: [
        {
          name: "Remessas em dia",
          value: 100,
        },

        {
          name: "Remessas em atraso",
          value: 150,
        },
      ],
    },
  },
  {
    title: "Contratação",
    data: {
      colors: [COLOR["chart-positivo"], COLOR["chart-negativo"]],
      items: [
        {
          name: "Remessas em dia",
          value: 100,
        },

        {
          name: "Remessas em atraso",
          value: 150,
        },
      ],
    },
  },
  {
    title: "Concessão",
    data: {
      colors: [COLOR["chart-positivo"], COLOR["chart-negativo"]],
      items: [
        {
          name: "Remessas em dia",
          value: 100,
        },

        {
          name: "Remessas em atraso",
          value: 150,
        },
      ],
    },
  },
];

export default async function Page() {
  const municipios = await getMunicipios();

  return (
    <ObrigacaoEnvioLayout
      doughnuts={CHART_SETTINGS}
      map={{}}
      municipios={municipios}
    />
  );
}
