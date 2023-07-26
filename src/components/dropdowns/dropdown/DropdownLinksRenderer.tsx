import { KeyValue } from "@/types/KeyValue";
import Link from "next/link";
import { DropdownValue } from "./Dropdown";

export default function DropdownLinkRenderer<T>(
  generateUrl: (
    item: KeyValue<string, DropdownValue<T>>,
    index: number
  ) => string
) {
  return (item: KeyValue<string, DropdownValue<T>>, index: number) => {
    return (
      <Link
        href={generateUrl(item, index).replace("*", "")}
        prefetch={false}
        title={item.key}
      >
        {item.key}
      </Link>
    );
  };
}
