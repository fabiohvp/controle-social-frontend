import { redirect } from "next/navigation";
import { IndicadoresPageProps, generateIndicadoresUrl } from "./routes";

export default async function Page({
  params,
}: {
  params: Promise<IndicadoresPageProps>;
}) {
  const { ano } = await params;
  redirect(generateIndicadoresUrl({ ano }));
}
