import { KeyValue } from "@/types/KeyValue";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Dropdown, { DropdownProps, DropdownValue } from "./Dropdown";

export type Props<T> = Omit<DropdownProps<T>, "items"> & {
  items: KeyValue<string, DropdownValue<T>>[];
  generateUrl: (
    item: KeyValue<string, DropdownValue<T>>,
    index: number
  ) => string;
};

export function dropdownLinkRenderer<T>(
  generateUrl: (
    item: KeyValue<string, DropdownValue<T>>,
    index: number
  ) => string
) {
  return (item: KeyValue<string, DropdownValue<T>>, index: number) => {
    return (
      <Link href={generateUrl(item, index).replace("*", "")} title={item.key}>
        {item.key}
      </Link>
    );
  };
}

export default function DropdownLinks<T>({
  active,
  buttonProps: { className: buttonClassName, ...buttonProps } = {},
  className,
  generateUrl,
  items,
  ...props
}: Props<T>) {
  return (
    <Dropdown
      active={active}
      autoClose={false}
      buttonProps={{
        className: twMerge("min-w-full", buttonClassName),
        ...buttonProps,
      }}
      className={twMerge("ellipsis sm:overflow-initial", className)}
      items={items.map((item) => ({
        key: item.key,
        value: item.value,
        render: dropdownLinkRenderer(generateUrl),
      }))}
      {...props}
    />
  );
}
