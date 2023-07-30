import PrestacaoDeContaGestaoPage, {
  PrestacaoDeContaGestaoPageProps,
} from "../../_components/pages/PrestacaoDeContaGestaoPage";

export default function Page(props: {
  params: PrestacaoDeContaGestaoPageProps;
}) {
  return <PrestacaoDeContaGestaoPage {...props} />;
}
