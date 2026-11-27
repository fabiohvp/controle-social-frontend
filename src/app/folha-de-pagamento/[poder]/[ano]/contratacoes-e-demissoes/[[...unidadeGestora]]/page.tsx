import { redirect } from "next/navigation";

// Rota antiga, mantida porque há links externos/wiki apontando para ela.
export default function Page() {
  redirect("/folha-de-pagamento/ingressos-desligamentos");
}
