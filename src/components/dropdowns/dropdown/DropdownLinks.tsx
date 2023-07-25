import { KeyValue } from "@/types/KeyValue";
import { twMerge } from "tailwind-merge";
import Dropdown, { DropdownProps, DropdownValue } from "./Dropdown";
import DropdownLinkRenderer from "./DropdownLinksRenderer";

export type Props<T> = Omit<DropdownProps<T>, "items"> & {
  items: KeyValue<string, DropdownValue<T>>[];
  generateUrl: (
    item: KeyValue<string, DropdownValue<T>>,
    index: number
  ) => string;
};

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
        render: DropdownLinkRenderer(generateUrl),
      }))}
      {...props}
    />
  );
}
