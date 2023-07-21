import { KeyValue } from "@/types/KeyValue";

export const FOLHA_DE_PAGAMENTO_PANEL_TITLE =
  "Pessoal e folha de pagamento na Administração pública";

export const FOLHA_DE_PAGAMENTO_PAGES: KeyValue<string, string>[] = [
  {
    key: "Visão geral",
    value: "visao-geral",
  },
  {
    key: "Ativos",
    value: "ativos",
  },
  {
    key: "Beneficiários",
    value: "beneficiarios",
  },
  {
    key: "Estagiários",
    value: "estagiarios",
  },
  {
    key: "Ingressos e desligamentos",
    value: "contratacoes-e-demissoes",
  },
  {
    key: "Consulta de vínculo",
    value: "consulta-vinculo",
  },
];
