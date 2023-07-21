"use client";
import DropdownModal from "@/components/dropdowns/dropdown/DropdownModal";
import Input from "@/components/inputs/Input";
import Loading from "@/components/loading/Loading";
import { normalize } from "@/formatters/string";
import useClickOutside from "@/hooks/useClickOutside";
import { KeyValue } from "@/types/KeyValue";
import { CSSProperties, ReactNode, useRef, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import DropdownItem from "./DropdownItem";
import { dropdownDefaultComparer } from "./dropdown-comparers";
import "./dropdown.css";

type DropdownItem<T> = KeyValue<ReactNode, T> & {
  render: (item: KeyValue<ReactNode, T>) => ReactNode;
};

type Props<T> = {
  autoClose?: boolean;
  borderless?: boolean;
  bodyClassName?: string;
  buttonClassName?: string;
  comparer?: (value?: T, selectedValue?: T) => boolean;
  className?: string;
  fit?: boolean;
  hideSearch?: boolean;
  itemClassName?: string;
  items: DropdownItem<T>[];
  loading?: boolean;
  selectedValue?: T;
  style?: CSSProperties;
};

export default function Dropdown<T>(props: Props<T>) {
  const [active, setActive] = useState(false);
  const [visibleItems, setVisibleItems] = useState(props.items);
  const comparer = props.comparer ?? dropdownDefaultComparer;

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
      const filteredItems = props.items.filter((o) =>
        normalize(o.key as string).includes(searchText)
      );
      setVisibleItems(filteredItems);
    } else {
      setVisibleItems(props.items);
    }
  }

  function getSelected() {
    let selected = props.items.find((item) =>
      comparer(item.value, props.selectedValue)
    );

    if (!selected) {
      selected = props.items.find((item) => item.value === "*");
    }
    return selected?.key;
  }

  if (props.loading) return <Loading />;
  return (
    <div
      ref={element}
      className={twMerge("dropdown relative", props.className)}
      style={props.style}
    >
      <button
        className={`button flex h-full items-center px-2 w-full ${
          props.borderless ? "border-none" : ""
        } ${props.buttonClassName ?? ""}`}
      >
        <span className="flex items-center gap-1 overflow-hidden">
          <span
            className={twMerge(
              `max-w-[200px] overflow-hidden text-ellipsis`,
              props.itemClassName
            )}
          >
            {getSelected()}
          </span>
          {active ? <FaCaretUp /> : <FaCaretDown />}
        </span>
      </button>
      {active && (
        <DropdownModal onClick={onItemClick}>
          {props.hideSearch !== true && (
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
          <ul className={twMerge(`body`, props.bodyClassName)}>
            {visibleItems.map((item) => (
              <DropdownItem
                key={item.value as string}
                className={`${
                  comparer(item.value, props.selectedValue) ? "active" : ""
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
