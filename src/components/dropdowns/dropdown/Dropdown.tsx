"use client";
import Loading from "@/components/loading/Loading";
import useClickOutside from "@/hooks/useClickOutside";
import { HTMLAttributes, useRef, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import DropdownBody from "./DropdownBody";
import { DropdownItemRender } from "./DropdownItem";
import { DropdownValue } from "./DropdownValue";
import "./dropdown.css";
import { dropdownDefaultComparer } from "./dropdownComparers";

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
  items: DropdownItemRender<T>[];
  loading?: boolean;
  selected?: DropdownValue<T>;
  selectedProps?: HTMLAttributes<HTMLSpanElement>;
} & HTMLAttributes<HTMLDivElement>;

export default function Dropdown<T>({
  active,
  autoClose,
  borderless,
  bodyProps,
  buttonProps: { className: buttonClassName, ...buttonProps } = {},
  className,
  comparer,
  fit,
  hideSearch,
  itemProps,
  items,
  loading,
  selected,
  selectedProps: { className: selectedClassName, ...selectedProps } = {},
  ...props
}: DropdownProps<T>) {
  const [open, setOpen] = useState(active ?? false);
  const valuesComparer = comparer ?? dropdownDefaultComparer;

  let element = useRef<HTMLDivElement>(null);

  useClickOutside({ element, toggle: setOpen });

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
          "button h-full w-full hover:rounded-none",
          borderless ? "border-none" : "",
          buttonClassName
        )}
        {...buttonProps}
      >
        <span className="flex items-center gap-1 overflow-hidden">
          <span
            className={twMerge(
              "max-w-[200px] overflow-hidden text-ellipsis",
              selectedClassName
            )}
            {...selectedProps}
          >
            {getSelected()}
          </span>
          {open ? <FaCaretUp /> : <FaCaretDown />}
        </span>
      </button>
      {open && (
        <DropdownBody
          comparer={comparer}
          hideSearch={hideSearch}
          items={items}
          itemProps={itemProps}
          selected={selected}
          {...bodyProps}
        />
      )}
    </div>
  );
}
