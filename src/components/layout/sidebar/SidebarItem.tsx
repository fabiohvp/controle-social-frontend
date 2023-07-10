"use client";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { FaChevronUp } from "react-icons/fa6";
import { SidebarList } from "./SidebarHelper";

const ANIMATION_SPEED = "0.35s";

//TODO: fix, obrigatorio href OU children
type Props = {
  children?: ReactNode;
  href?: string;
  icon?: ReactNode;
  text: string;
  tooltip: string;
};

const ITEM_CLASS_NAMES =
  "basis-full flex items-center justify-between overflow-hidden text-white";

export default function SidebarItem(props: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <li
        title={props.tooltip}
        className={`cursor-pointer overflow-x-hidden hover:bg-gray-500`}
      >
        {props.href ? (
          <Link href={props.href} className={ITEM_CLASS_NAMES}>
            <Render icon={props.icon} open={open} text={props.text} />
          </Link>
        ) : (
          <div
            className={ITEM_CLASS_NAMES}
            onClick={() => setOpen((open) => !open)}
          >
            <Render icon={props.icon} open={open} text={props.text} />
            <div className="mr-2 text-xs">
              <FaChevronUp
                style={{
                  transition: `all ${ANIMATION_SPEED}`,
                  transform: `${open ? "rotate(180deg)" : ""}`,
                }}
              />
            </div>
          </div>
        )}
      </li>
      {props.children && (
        <SidebarList
          style={{
            maxHeight: open ? "100%" : "0",
            transition: `max-height ${ANIMATION_SPEED} ease-${
              open ? "in" : "out"
            }`,
            overflow: "hidden",
          }}
        >
          {props.children}
        </SidebarList>
      )}
    </>
  );
}

type RenderProps = {
  icon: ReactNode;
  open: boolean;
  text: string;
};

function Render(props: RenderProps) {
  return (
    <>
      <div className="flex gap-2 items-center p-2">
        <div className="flex h-6 items-center justify-center shrink-0 w-10">
          {props.icon}&nbsp;
        </div>
        <div className="ml-1 overflow-hidden shrink-0 text-sm">
          {props.text}
        </div>
      </div>
    </>
  );
}
