import PaginaRanking, { getMetadataRanking } from "../../_components/PaginaRanking";
import { RankingsPageProps } from "../../routes";

const RANKING = "gestao-fiscal/poupanca-corrente-capag";

export const metadata = getMetadataRanking(RANKING);

export default function Page(props: { params: Promise<RankingsPageProps> }) {
  return <PaginaRanking {...props} ranking={RANKING} />;
}
