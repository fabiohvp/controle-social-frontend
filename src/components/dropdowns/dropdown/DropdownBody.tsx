"use client";
import DropdownModal from "@/components/dropdowns/dropdown/DropdownModal";
import Input from "@/components/inputs/Input";
import { normalize } from "@/formatters/string";
import { HTMLAttributes, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import DropdownItem, { DropdownItemRender } from "./DropdownItem";
import { DropdownValue } from "./DropdownValue";
import "./dropdown.css";
import { dropdownDefaultComparer } from "./dropdownComparers";

export type DropdownBodyProps<T> = {
  comparer?: (
    value: string | undefined,
    selectedValue: string | undefined
  ) => boolean;
  hideSearch?: boolean;
  itemProps?: HTMLAttributes<HTMLSpanElement>;
  items: DropdownItemRender<T>[];
  itemsProps?: HTMLAttributes<HTMLSpanElement>;
  selected?: DropdownValue<T>;
} & HTMLAttributes<HTMLDivElement>;

export default function DropdownBody<T>({
  comparer,
  hideSearch,
  itemProps: { className: itemClassName, ...itemProps } = {},
  items,
  itemsProps: { className: itemsClassName, ...itemsProps } = {},
  selected: selectedValue,
  ...props
}: DropdownBodyProps<T>) {
  const [visibleItems, setVisibleItems] = useState(items);
  const valuesComparer = comparer ?? dropdownDefaultComparer;

  let search = useRef<HTMLInputElement>(null);

  function onSearch(event: React.KeyboardEvent<HTMLInputElement>) {
    const searchText = normalize(event.currentTarget.value);

    if (searchText) {
      const filteredItems = items.filter((o) =>
        normalize(o.key as string).includes(searchText)
      );
      setVisibleItems(filteredItems);
    } else {
      setVisibleItems(items);
    }
  }

  return (
    <DropdownModal {...props}>
      {hideSearch !== true && (
        <div className="p-2">
          <Input
            ref={search}
            autoFocus
            type="text"
            className="w-full"
            onKeyUp={onSearch}
          />
        </div>
      )}
      <ul className={twMerge("items", itemsClassName)} {...itemsProps}>
        {visibleItems.map((item, index) => (
          <DropdownItem
            key={index.toString()}
            className={twMerge(
              itemClassName,
              valuesComparer(item.value.value, selectedValue?.value)
                ? "active"
                : ""
            )}
            {...itemProps}
          >
            {item.render([item.key, item.value], index)}
          </DropdownItem>
        ))}
      </ul>
    </DropdownModal>
  );
}
