"use client";
import DropdownModal from "@/components/dropdowns/dropdown/DropdownModal";
import Input from "@/components/inputs/Input";
import { normalize } from "@/formatters/string";
import { HTMLAttributes, useRef, useState } from "react";
import { DropdownValue } from "./Dropdown";
import DropdownItem, { DropdownItemRender } from "./DropdownItem";
import "./dropdown.css";
import { dropdownDefaultComparer } from "./dropdownComparers";

export type DropdownBodyProps<T> = {
  comparer?: (
    value: string | undefined,
    selectedValue: string | undefined
  ) => boolean;
  hideSearch?: boolean;
  items: DropdownItemRender<DropdownValue<T>>[];
  selected?: DropdownValue<T>;
} & HTMLAttributes<HTMLDivElement>;

export default function DropdownBody<T>({
  comparer,
  hideSearch,
  items,
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
      <ul className="body">
        {visibleItems.map((item, index) => (
          <DropdownItem
            key={index.toString()}
            className={`${
              valuesComparer(item.value.value, selectedValue?.value)
                ? "active"
                : ""
            }`}
          >
            {item.render(item, index)}
          </DropdownItem>
        ))}
      </ul>
    </DropdownModal>
  );
}
