import { redirect } from "next/navigation";
import { generateIndicadoresUrl } from "./[ano]/routes";

export default function Page() {
  redirect(generateIndicadoresUrl({}));
}
