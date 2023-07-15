"use client";
import Loading from "@/components/loading/Loading";
import { KeyValue } from "@/types/KeyValue";
import {
  CSSProperties,
  Key,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { dropdownDefaultComparer } from "../dropdown-comparers";
import "./dropdown.css";

type DropdownItem<T> = KeyValue<string, T> & {
  render: () => ReactNode;
};

type Props<T extends Key> = {
  autoClose?: boolean;
  borderless?: boolean;
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

export default function Dropdown<T extends Key>(props: Props<T>) {
  const [active, setActive] = useState(false);
  const [visibleItems, setVisibleItems] = useState(props.items);
  const comparer = props.comparer ?? dropdownDefaultComparer;

  let element: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  let search: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.addEventListener("click", onWindowClick);
    return () => {
      window.removeEventListener("click", onWindowClick);
    };
  }, []);

  function onWindowClick(event: MouseEvent) {
    if (!element.current) return;
    if (element.current.contains(event.target as Node)) {
      setActive((active) => !active);
    } else {
      setActive(false);
    }
  }

  function onItemClick(event: React.MouseEvent<HTMLElement>) {
    if (!search.current) return;
    if (search.current.contains(event.target as Node)) return;
    event.stopPropagation();
    setActive(false);
  }

  function onSearch(event: React.KeyboardEvent<HTMLInputElement>) {
    const searchText = event.currentTarget.value
      .normalize("NFD") //TODO: extract this?
      .replace(/[\u0300-\u036f]/g, "");

    if (searchText) {
      const filteredItems = props.items.filter((o) =>
        o.key
          .toLocaleLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(searchText)
      );
      setVisibleItems(filteredItems);
    } else {
      setVisibleItems(props.items);
    }
  }

  if (props.loading) return <Loading />;
  return (
    <div
      ref={element}
      className={`dropdown relative ${props.className ?? ""}`}
      style={props.style}
    >
      <button
        className={`button flex h-full items-center px-2 w-full ${
          props.borderless ? "border-none" : ""
        } ${props.buttonClassName ?? ""}`}
      >
        <span className="flex items-center gap-1 overflow-hidden">
          <span
            className={`overflow-hidden text-ellipsis ${
              props.itemClassName ?? ""
            }`}
          >
            {
              props.items.find((item) =>
                comparer(item.value, props.selectedValue)
              )?.key
            }
          </span>
          {active ? <FaCaretUp /> : <FaCaretDown />}
        </span>
      </button>
      {active && (
        <div className="content" onClick={onItemClick}>
          {props.hideSearch !== true && (
            <input
              ref={search}
              autoFocus
              type="text"
              className="p-1 border rounded m-2"
              onKeyUp={onSearch}
            />
          )}
          <ul>
            {visibleItems.map((item) => (
              <li
                key={item.value}
                className={`${
                  comparer(item.value, props.selectedValue) ? "active" : ""
                }`}
              >
                {item.render()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
