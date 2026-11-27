import { redirect } from "next/navigation";
import { generateRankingsUrl } from "./[ano]/routes";

export default function Page() {
  redirect(generateRankingsUrl({}));
}
