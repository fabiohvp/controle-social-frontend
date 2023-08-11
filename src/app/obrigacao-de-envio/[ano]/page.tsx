import { redirect } from "next/navigation";
import { ObrigacaoEnvioPageProps, generateObrigacaoEnvioUrl } from "./routes";

type Props = { params: ObrigacaoEnvioPageProps };

export default function Page({ params }: Props) {
  const url = generateObrigacaoEnvioUrl({
    ...params,
    pagina: "municipios",
    pathname: "",
  });
  return redirect(url);
}
