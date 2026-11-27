import { redirect } from "next/navigation";
import { generateExecucaoOrcamentariaUrl } from "./routes";

export default function Page() {
  redirect(generateExecucaoOrcamentariaUrl({ pagina: "receita" }));
}
