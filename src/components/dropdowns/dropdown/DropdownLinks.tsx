import { twMerge } from "tailwind-merge";
import Dropdown, { DropdownProps } from "./Dropdown";
import { DropdownItem } from "./DropdownItem";
import DropdownLinkRenderer from "./DropdownLinksRenderer";
import { DropdownValue } from "./DropdownValue";

export type Props<T> = Omit<DropdownProps<T>, "items"> & {
  items: Map<string, DropdownValue<T>>;
  generateUrl: (item: DropdownItem<T>, index: number) => string;
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
      items={[...items].map(([key, value]) => ({
        key: key,
        value: value,
        render: DropdownLinkRenderer(generateUrl),
      }))}
      {...props}
    />
  );
}
