import { globalState } from "@/shared/globalState";
import { redirect } from "next/navigation";
import { MunicipioPageProps, generateMunicipioUrl } from "./routes";

type Props = { params: MunicipioPageProps };

export default function Page(props: Props) {
  const url = generateMunicipioUrl({
    ...props.params,
    globalState,
    pagina: "",
    pathname: "",
  });
  return redirect(url);
}
