import { redirect } from "next/navigation";
import { ObrigacaoEnvioPageProps, generateObrigacaoEnvioUrl } from "./routes";

type Props = { params: Promise<ObrigacaoEnvioPageProps> };

export default async function Page({ params }: Props) {
	const resolvedParams = await params;
  const url = generateObrigacaoEnvioUrl({
    ...resolvedParams,
    pagina: "municipios",
    pathname: "",
  });
  return redirect(url);
}
