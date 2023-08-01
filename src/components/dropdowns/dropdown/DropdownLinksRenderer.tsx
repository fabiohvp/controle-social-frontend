import Link from "next/link";
import { DropdownItem } from "./DropdownItem";

export default function DropdownLinkRenderer<T>(
  generateUrl: (item: DropdownItem<T>, index: number) => string
) {
  return (item: DropdownItem<T>, index: number) => {
    return (
      <Link
        href={generateUrl(item, index).replace("*", "")}
        prefetch={false}
        title={item[0]}
      >
        {item[0]}
      </Link>
    );
  };
}
