import { KeyValue } from "@/types/KeyValue";
import Link from "next/link";
import { Key } from "react";
import Dropdown from "../dropdown/Dropdown";

type Props<T extends Key> = {
  comparer?: (value?: T, selectedValue?: T) => boolean;
  items: KeyValue<string, T>[];
  generateUrl: (item: KeyValue<string, T>) => string;
  selectedValue?: T;
};

export default function DropdownLinks<T extends Key>(props: Props<T>) {
  return (
    <Dropdown
      autoClose={false}
      className="px-3"
      comparer={props.comparer}
      items={props.items.map((item) => ({
        key: item.key,
        value: item.value,
        render: () => <Link href={props.generateUrl(item)}>{item.key}</Link>,
      }))}
      selectedValue={props.selectedValue}
    />
  );
}
