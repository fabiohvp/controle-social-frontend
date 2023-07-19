import { KeyValue } from "@/types/KeyValue";
import Link from "next/link";
import { CSSProperties, Key } from "react";
import { twMerge } from "tailwind-merge";
import Dropdown from "../dropdown/Dropdown";

type Props<T extends Key> = {
  className?: string;
  comparer?: (value?: T, selectedValue?: T) => boolean;
  items: KeyValue<string, T>[];
  generateUrl: (item: KeyValue<string, T>) => string;
  selectedValue?: T;
  style?: CSSProperties;
};

export default function DropdownLinks<T extends Key>(props: Props<T>) {
  return (
    <Dropdown
      autoClose={false}
      buttonClassName="min-w-full"
      className={twMerge(
        "overflow-hidden text-ellipsis whitespace-nowrap sm:overflow-initial",
        props.className
      )}
      comparer={props.comparer}
      items={props.items.map((item) => ({
        key: item.key,
        value: item.value,
        render: () => (
          <Link href={props.generateUrl(item)} title={item.key}>
            {item.key}
          </Link>
        ),
      }))}
      selectedValue={props.selectedValue}
      style={props.style}
    />
  );
}
