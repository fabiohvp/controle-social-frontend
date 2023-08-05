import { redirect } from "next/navigation";
import { generateGestaoFiscalUrl } from "../gestao-fiscal/routes";
import { generateGestaoOrcamentariaUrl } from "../gestao-orcamentaria/routes";
import { MunicipioPageProps, generateMunicipioUrl } from "../routes";

type Props = { params: MunicipioPageProps };

const redirects = new Map<string, (params: any) => string>([
  ["area-tematica", () => "/area-tematica/concessao-publica/visao-geral"],
  ["gestao-fiscal", generateGestaoFiscalUrl],
  ["gestao-orcamentaria", generateGestaoOrcamentariaUrl],
]);

export default function Page(props: Props) {
  const pagina = props.params.pagina;

  for (const [key, getUrl] of redirects) {
    if (pagina === key) {
      const url = getUrl({
        ...props.params,
        pathname: "",
      });
      return redirect(url);
    }
  }
  const url = generateMunicipioUrl({
    ...props.params,
    pagina: "",
    pathname: "",
  });
  redirect(url);
}
