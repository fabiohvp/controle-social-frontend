import PrestacaoDeContaMonitoramentoPage, {
  PrestacaoDeContaMonitoramentoPageProps,
} from "../../_components/PrestacaoDeContaMonitoramentoPage";

export default function Page(props: {
  params: PrestacaoDeContaMonitoramentoPageProps;
}) {
  return <PrestacaoDeContaMonitoramentoPage {...props} />;
}
