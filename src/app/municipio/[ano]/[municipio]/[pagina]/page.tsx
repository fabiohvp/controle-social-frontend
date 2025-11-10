import { globalState } from "@/shared/globalState";
import { redirect } from "next/navigation";
import { generateGestaoFiscalUrl } from "../gestao-fiscal/routes";
import { generateGestaoOrcamentariaUrl } from "../gestao-orcamentaria/routes";
import { MunicipioPageProps, generateMunicipioUrl } from "../routes";

type Props = { params: Promise<MunicipioPageProps> };

const redirects = new Map<string, (params: any) => string>([
  ["area-tematica", () => "/area-tematica/concessao-publica/visao-geral"],
  ["gestao-fiscal", generateGestaoFiscalUrl],
  ["gestao-orcamentaria", generateGestaoOrcamentariaUrl],
]);

export default async function Page(props: Props) {
	const resolvedParams = await props.params;
  const pagina = resolvedParams.pagina;

  for (const [key, getUrl] of redirects) {
    if (pagina === key) {
      const url = getUrl({
        ...resolvedParams,
        pathname: "",
      });
      return redirect(url);
    }
  }
  const url = generateMunicipioUrl({
    ...resolvedParams,
    globalState,
    pagina: "",
    pathname: "",
  });
  redirect(url);
}
