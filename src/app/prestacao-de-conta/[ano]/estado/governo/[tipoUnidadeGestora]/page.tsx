import PrestacaoDeContaGovernoPage, {
  PrestacaoDeContaGovernoPageProps,
} from "../../../_components/pages/PrestacaoDeContaGovernoPage";
import { ResumoProcessos } from "../../../type";

export default function Page(props: {
  params: PrestacaoDeContaGovernoPageProps;
}) {
  return (
    <PrestacaoDeContaGovernoPage
      resumoProcessos={{} as ResumoProcessos}
      situacaoProcessos={[]}
      {...props}
    />
  );
}
