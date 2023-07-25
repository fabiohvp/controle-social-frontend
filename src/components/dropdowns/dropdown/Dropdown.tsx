"use client";
import Loading from "@/components/loading/Loading";
import useClickOutside from "@/hooks/useClickOutside";
import { HTMLAttributes, useRef, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import DropdownBody from "./DropdownBody";
import { DropdownItemRender } from "./DropdownItem";
import { dropdownDefaultComparer } from "./dropdown-comparers";
import "./dropdown.css";

export type DropdownValue<T> = T & {
  value: string;
};

export function createDropdownValue<T>(value: string) {
  return { value } as T;
}

export type DropdownProps<T> = {
  active?: boolean;
  autoClose?: boolean;
  borderless?: boolean;
  bodyProps?: HTMLAttributes<HTMLDivElement>;
  buttonProps?: HTMLAttributes<HTMLButtonElement>;
  comparer?: (
    value: string | undefined,
    selectedValue: string | undefined
  ) => boolean;
  fit?: boolean;
  hideSearch?: boolean;
  itemProps?: HTMLAttributes<HTMLSpanElement>;
  items: DropdownItemRender<DropdownValue<T>>[];
  loading?: boolean;
  selected?: DropdownValue<T>;
} & HTMLAttributes<HTMLDivElement>;

export default function Dropdown<T>({
  active: isActive,
  autoClose,
  borderless,
  bodyProps,
  buttonProps: { className: buttonClassName, ...buttonProps } = {},
  className,
  comparer,
  fit,
  hideSearch,
  itemProps: { className: itemClassName, ...itemProps } = {},
  items,
  loading,
  selected,
  ...props
}: DropdownProps<T>) {
  const [active, setActive] = useState(isActive ?? false);
  const valuesComparer = comparer ?? dropdownDefaultComparer;

  let element = useRef<HTMLDivElement>(null);

  useClickOutside({ element, toggle: setActive });

  function getSelected() {
    let selectedItem = items.find((item) =>
      valuesComparer(item.value.value, selected?.value)
    );

    if (!selectedItem) {
      selectedItem = items.find((item) => item.value.value === "*");
    }
    return selectedItem?.key;
  }

  if (loading) return <Loading />;
  return (
    <div
      ref={element}
      className={twMerge("dropdown relative", className)}
      {...props}
    >
      <button
        className={twMerge(
          "button flex h-full items-center px-2 w-full",
          borderless ? "border-none" : "",
          buttonClassName
        )}
        {...buttonProps}
      >
        <span className="flex items-center gap-1 overflow-hidden">
          <span
            className={twMerge(
              "max-w-[200px] overflow-hidden text-ellipsis",
              itemClassName
            )}
            {...itemProps}
          >
            {getSelected()}
          </span>
          {active ? <FaCaretUp /> : <FaCaretDown />}
        </span>
      </button>
      {active && (
        <DropdownBody
          comparer={comparer}
          hideSearch={hideSearch}
          items={items}
          selected={selected}
          {...bodyProps}
        />
      )}
    </div>
  );
}
