import { KeyValue } from "@/types/KeyValue";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Dropdown, { DropdownProps } from "./Dropdown";

interface Props<T> extends Omit<DropdownProps<T>, "items"> {
  items: KeyValue<string, T>[];
  generateUrl: (item: KeyValue<string, T>, index: number) => string;
}

export default function DropdownLinks<T>({
  buttonClassName,
  className,
  generateUrl,
  items,
  ...props
}: Props<T>) {
  return (
    <Dropdown
      autoClose={false}
      buttonClassName={twMerge("min-w-full", buttonClassName)}
      className={twMerge("ellipsis sm:overflow-initial", className)}
      items={items.map((item, index) => ({
        key: item.key,
        value: item.value,
        render: () => (
          <Link
            href={generateUrl(item, index).replace("*", "")}
            title={item.key}
          >
            {item.key}
          </Link>
        ),
      }))}
      {...props}
    />
  );
}
