import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { globalState } from "@/shared/globalState";
import { useParams, usePathname } from "next/navigation";

type Props = {
  anos: number[];
  generateUrl: (
    routeParams: any & { ano: string; pathname: string },
    index: number
  ) => string;
};

export default function BreadcrumbAno<T>(props: Props) {
  const pathname = usePathname();
  const routeParams = useParams() as any;
  const items = new Map<string, DropdownValue<T>>(
    props.anos.map((ano) => [
      ano.toString(),
      createDropdownValue(ano.toString()),
    ])
  );

  return (
    <li>
      <DropdownLinks
        className="min-w-[70px]"
        generateUrl={(item, index) =>
          props.generateUrl(
            { ...routeParams, ano: item[1].value, globalState, pathname },
            index
          )
        }
        items={items}
        selected={createDropdownValue(routeParams.ano)}
      />
    </li>
  );
}
