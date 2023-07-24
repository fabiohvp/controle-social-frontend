"use client";
import DropdownModal from "@/components/dropdowns/dropdown/DropdownModal";
import Input from "@/components/inputs/Input";
import Loading from "@/components/loading/Loading";
import { normalize } from "@/formatters/string";
import useClickOutside from "@/hooks/useClickOutside";
import { KeyValue } from "@/types/KeyValue";
import { HTMLAttributes, ReactNode, useRef, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import DropdownItem from "./DropdownItem";
import { dropdownDefaultComparer } from "./dropdown-comparers";
import "./dropdown.css";

type DropdownItem<T> = KeyValue<ReactNode, T> & {
  render: (item: KeyValue<ReactNode, T>) => ReactNode;
};

export type DropdownProps<T> = {
  autoClose?: boolean;
  borderless?: boolean;
  bodyClassName?: string;
  buttonClassName?: string;
  comparer?: (value?: T, selectedValue?: T) => boolean;
  fit?: boolean;
  hideSearch?: boolean;
  itemClassName?: string;
  items: DropdownItem<T>[];
  loading?: boolean;
  selectedValue?: T;
} & HTMLAttributes<HTMLDivElement>;

export default function Dropdown<T>({
  autoClose,
  borderless,
  bodyClassName,
  buttonClassName,
  comparer,
  fit,
  hideSearch,
  itemClassName,
  items,
  loading,
  selectedValue,
  className,
  ...props
}: DropdownProps<T>) {
  const [active, setActive] = useState(false);
  const [visibleItems, setVisibleItems] = useState(items);
  const valuesComparer = comparer ?? dropdownDefaultComparer;

  let element = useRef<HTMLDivElement>(null);
  let search = useRef<HTMLInputElement>(null);

  useClickOutside({ element, toggle: setActive });

  function onItemClick(event: React.MouseEvent<HTMLElement>) {
    if (!search.current) return;
    if (search.current.contains(event.target as Node)) return;
    event.stopPropagation();
    setActive(false);
  }

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

  function getSelected() {
    let selected = items.find((item) =>
      valuesComparer(item.value, selectedValue)
    );

    if (!selected) {
      selected = items.find((item) => item.value === "*");
    }
    return selected?.key;
  }

  if (loading) return <Loading />;
  return (
    <div
      ref={element}
      className={twMerge("dropdown relative", className)}
      {...props}
    >
      <button
        className={`button flex h-full items-center px-2 w-full ${
          borderless ? "border-none" : ""
        } ${buttonClassName ?? ""}`}
      >
        <span className="flex items-center gap-1 overflow-hidden">
          <span
            className={twMerge(
              `max-w-[200px] overflow-hidden text-ellipsis`,
              itemClassName
            )}
          >
            {getSelected()}
          </span>
          {active ? <FaCaretUp /> : <FaCaretDown />}
        </span>
      </button>
      {active && (
        <DropdownModal onClick={onItemClick}>
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
          <ul className={twMerge(`body`, bodyClassName)}>
            {visibleItems.map((item) => (
              <DropdownItem
                key={item.value as string}
                className={`${
                  valuesComparer(item.value, selectedValue) ? "active" : ""
                }`}
              >
                {item.render(item)}
              </DropdownItem>
            ))}
          </ul>
        </DropdownModal>
      )}
    </div>
  );
}
