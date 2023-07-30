import PrestacaoDeContaGovernoPage, {
  PrestacaoDeContaGovernoPageProps,
} from "../../_components/pages/PrestacaoDeContaGovernoPage";

export default function Page(props: {
  params: PrestacaoDeContaGovernoPageProps;
}) {
  return <PrestacaoDeContaGovernoPage {...props} />;
}
