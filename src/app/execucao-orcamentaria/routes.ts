export const ROTA_BASE = "/execucao-orcamentaria";

export function generateExecucaoOrcamentariaUrl({
  pagina,
}: {
  pagina: string;
}) {
  return `${ROTA_BASE}/${pagina}`;
}

export function getPagina(pathname: string) {
  return pathname.split("/")[2];
}

const POWER_BI_URL =
  "https://app.powerbi.com/view?r=eyJrIjoiZWZmY2NjZWYtZmEyOC00YjVmLWFlM2ItMzJiMWE1ZTBmODVjIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9";

export function getPowerBiUrl(pageName: string) {
  return `${POWER_BI_URL}&pageName=${pageName}`;
}
