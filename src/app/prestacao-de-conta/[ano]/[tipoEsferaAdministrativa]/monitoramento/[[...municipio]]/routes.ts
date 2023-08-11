export type MonitoramentoPageProps = {
  ano: string;
  municipio: string;
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
  return `/prestacao-de-conta/${ano}/${tipoEsferaAdministrativa}/monitoramento/${
    municipio ?? "todos"
  }`;
}
