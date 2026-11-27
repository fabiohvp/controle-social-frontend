import PaginaIndicador, {
  getMetadataIndicador,
} from "../_components/PaginaIndicador";
import { IndicadoresPageProps } from "../routes";

export const metadata = getMetadataIndicador("ivf-margem");

export default function Page({
  params,
}: {
  params: Promise<IndicadoresPageProps>;
}) {
  return <PaginaIndicador params={params} slug="ivf-margem" />;
}
