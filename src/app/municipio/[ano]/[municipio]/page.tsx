import { globalState } from "@/shared/globalState";
import { redirect } from "next/navigation";
import { MunicipioPageProps, generateMunicipioUrl } from "./routes";

type Props = { params: Promise<MunicipioPageProps> };

export default async function Page(props: Props) {
	const resolvedParams = await props.params;

  const url = generateMunicipioUrl({
    ...resolvedParams,
    globalState,
    pagina: "",
    pathname: "",
  });
  return redirect(url);
}
