import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ ano: string }>;
}) {
  const { ano } = await params;
  redirect(`/fiscalizacao/${ano}/iegm/geral`);
}
