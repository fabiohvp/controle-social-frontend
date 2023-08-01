import { createDropdownValue } from "@/components/dropdowns/dropdown/DropdownValue";
import { redirect } from "next/navigation";
import { generateMunicipioUrl } from "../routes";

type Props = { params: { notFound: string } };

const redirects = new Map<string, string>([
  ["area-tematica", "/area-tematica/concessao-publica/visao-geral"],
  ["gestao-orcamentaria", "planejamento-governamental"],
  ["gestao-orcamentaria", "planejamento-governamental"],
]);

export default async function Page(props: Props) {
  const segment = props.params.notFound;

  for (const [key, value] of redirects) {
    if (segment === key) {
      return redirect(value);
    } else {
      const url = generateMunicipioUrl({
        ...(props.params as any),
        item: [key, createDropdownValue(key)],
      });
      if (value.startsWith("/")) {
      }
      return redirect(`${url}/${value}`);
    }
  }
}
