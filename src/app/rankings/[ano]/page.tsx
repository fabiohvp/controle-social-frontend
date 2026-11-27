import { redirect } from "next/navigation";
import { RankingsPageProps, generateRankingsUrl } from "./routes";

export default async function Page({
  params,
}: {
  params: Promise<RankingsPageProps>;
}) {
  const { ano } = await params;
  redirect(generateRankingsUrl({ ano }));
}
