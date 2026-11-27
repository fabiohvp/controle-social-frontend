import PaginaRanking, { getMetadataRanking } from "../../_components/PaginaRanking";
import { RankingsPageProps } from "../../routes";

const RANKING = "resultado/despesa-liquidada-x-receita-arrecadada";

export const metadata = getMetadataRanking(RANKING);

export default function Page(props: { params: Promise<RankingsPageProps> }) {
  return <PaginaRanking {...props} ranking={RANKING} />;
}
