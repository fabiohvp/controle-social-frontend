"use client";
import { useAtom } from "jotai";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa6";
import { SidebarList } from "./SidebarHelper";
import { ANIMATION_SPEED, CLASS_OPENED_WIDTH } from "./sidebar-constants";
import { sidebarOpen } from "./sidebar-state";

//TODO: fix, obrigatorio href OU children
type Props = {
  children?: ReactNode;
  href?: string;
  icon?: ReactNode;
  text: string;
  tooltip: string;
};

const ITEM_CLASS_NAMES = `flex items-center justify-between text-white ${CLASS_OPENED_WIDTH}`;

export default function SidebarItem(props: Props) {
  const [open] = useAtom(sidebarOpen);
  const [itemOpen, setItemOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      setItemOpen(false);
    }
  }, [open]);
  return (
    <>
      <li
        title={props.tooltip}
        className={`cursor-pointer overflow-hidden hover:bg-gray-500`}
      >
        {props.href ? (
          <Link href={props.href}>
            <Render icon={props.icon} itemOpen={itemOpen} text={props.text} />
          </Link>
        ) : (
          <Render
            arrow
            icon={props.icon}
            itemOpen={itemOpen}
            text={props.text}
            onClick={() => setItemOpen((open) => !open)}
          />
        )}
      </li>
      {props.children && (
        <SidebarList
          style={{
            maxHeight: itemOpen ? "100%" : "0",
            transition: `max-height ${ANIMATION_SPEED} ease-${
              itemOpen ? "in" : "out"
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
  arrow?: boolean;
  icon: ReactNode;
  itemOpen: boolean;
  text: string;
  onClick?: () => void;
};

function Render(props: RenderProps) {
  return (
    <>
      <div className={ITEM_CLASS_NAMES} onClick={props.onClick}>
        <div className="flex gap-1 items-center p-2 text-sm">
          <span className="center h-6 mr-2 shrink-0 w-8">
            {props.icon}&nbsp;
          </span>
          {props.text}
        </div>
        {props.arrow && (
          <FaChevronUp
            className="mr-2 text-xs"
            style={{
              transition: `all ${ANIMATION_SPEED}`,
              transform: `${props.itemOpen ? "rotate(180deg)" : ""}`,
            }}
          />
        )}
      </div>
    </>
  );
}
