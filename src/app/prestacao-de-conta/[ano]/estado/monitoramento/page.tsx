import PrestacaoDeContaMonitoramentoPage, {
  PrestacaoDeContaMonitoramentoPageProps,
} from "../../_components/pages/PrestacaoDeContaMonitoramentoPage";

export default function Page(props: {
  params: PrestacaoDeContaMonitoramentoPageProps;
}) {
  return <PrestacaoDeContaMonitoramentoPage {...props} />;
}
