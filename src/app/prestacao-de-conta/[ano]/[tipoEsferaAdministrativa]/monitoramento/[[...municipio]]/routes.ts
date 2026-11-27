export type MonitoramentoPageProps = {
  ano: string;
  municipio?: string | string[];
  tipoEsferaAdministrativa: string;
};

export function generateMonitoramentoUrl({
  ano,
  municipio,
  tipoEsferaAdministrativa,
}: MonitoramentoPageProps) {
  if (tipoEsferaAdministrativa === "estado") {
    return `/prestacao-de-conta/${ano}/${tipoEsferaAdministrativa}/monitoramento`;
  }
  const mun = Array.isArray(municipio) ? municipio[0] : municipio;
  return `/prestacao-de-conta/${ano}/${tipoEsferaAdministrativa}/monitoramento/${
    mun ?? "todos"
  }`;
}
