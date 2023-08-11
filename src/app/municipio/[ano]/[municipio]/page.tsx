import { useGlobalState } from "@/providers/GlobalProvider";
import { redirect } from "next/navigation";
import { use } from "react";
import { MunicipioPageProps, generateMunicipioUrl } from "./routes";

type Props = { params: MunicipioPageProps };

export default function Page(props: Props) {
  const globalState = use(useGlobalState());

  const url = generateMunicipioUrl({
    ...props.params,
    globalState,
    pagina: "",
    pathname: "",
  });
  return redirect(url);
}
