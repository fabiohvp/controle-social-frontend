"use client";
import Loading from "@/components/loading/Loading";
import { KeyValue } from "@/types/KeyValue";
import {
  CSSProperties,
  Key,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { dropdownDefaultComparer } from "../dropdown-comparers";
import "./dropdown.css";

const MIN_DROPDOWN_HEIGHT = 160;
const MIN_DROPDOWN_WIDTH = 180;

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
  const content = useCallback((node: HTMLDivElement) => {
    if (node) {
      calculatePosition(node);
    }
  }, []);
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
    if (!element.current.contains(event.target as Node)) {
      setActive(false);
    }
  }

  function onItemClick(event: React.MouseEvent<HTMLElement>) {
    if (!search.current) return;
    if (search.current.contains(event.target as Node)) return;
    setActive(false);
  }

  function onButtonClick(_: React.MouseEvent<HTMLElement>) {
    setActive((active) => !active);
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
      console.log("empty");
      setVisibleItems(props.items);
    }
  }

  function calculatePosition(content: HTMLDivElement) {
    const elementRect = element.current!.getBoundingClientRect();
    content.style.top = `${elementRect.height}px`;

    if (props.fit) {
      content.style.width = `${elementRect.width}px`;
    } else {
      content.style.minWidth = `${MIN_DROPDOWN_WIDTH}px`;
    }

    const contentRect = content.getBoundingClientRect();

    if (contentRect.right > window.innerWidth) {
      content.style.right = "0";
    }

    if (contentRect.bottom > window.innerHeight) {
      const maxHeight = window.innerHeight - contentRect.top - 70;
      console.log(content);
      const ul = content.querySelector("ul")!;

      if (maxHeight < MIN_DROPDOWN_HEIGHT) {
        content.style.top = `-${MIN_DROPDOWN_HEIGHT - maxHeight}px`;
        ul.style.maxHeight = `${MIN_DROPDOWN_HEIGHT}px`;
      } else {
        ul.style.maxHeight = `${maxHeight}px`;
      }
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
        onClick={onButtonClick}
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
        <div ref={content} className="content" onClick={onItemClick}>
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
