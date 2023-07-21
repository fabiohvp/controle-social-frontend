import { KeyValue } from "@/types/KeyValue";
import Link from "next/link";
import { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";
import Dropdown from "./Dropdown";

type Props<T> = {
  bodyClassName?: string;
  buttonClassName?: string;
  className?: string;
  comparer?: (value?: T, selectedValue?: T) => boolean;
  itemClassName?: string;
  items: KeyValue<string, T>[];
  generateUrl: (item: KeyValue<string, T>, index: number) => string;
  selectedValue?: T;
  style?: CSSProperties;
};

export default function DropdownLinks<T>(props: Props<T>) {
  return (
    <Dropdown
      autoClose={false}
      bodyClassName={props.bodyClassName}
      buttonClassName={twMerge("min-w-full", props.buttonClassName)}
      className={twMerge("ellipsis sm:overflow-initial", props.className)}
      comparer={props.comparer}
      itemClassName={props.itemClassName}
      items={props.items.map((item, index) => ({
        key: item.key,
        value: item.value,
        render: () => (
          <Link
            href={props.generateUrl(item, index).replace("*", "")}
            title={item.key}
          >
            {item.key}
          </Link>
        ),
      }))}
      selectedValue={props.selectedValue}
      style={props.style}
    />
  );
}
