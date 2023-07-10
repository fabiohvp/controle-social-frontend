"use client";
import { useAtom } from "jotai";
import { CSSProperties, ReactNode, useEffect, useState } from "react";
import { SidebarList } from "./SidebarHelper";
import { sidebarOpen } from "./sidebar-state";

const ANIMATION_SPEED = "0.25s";
const CLASS_CLOSED_WIDTH = "w-[50px]";
const CLASS_OPENED_WIDTH = "w-[230px]";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function Sidebar(props: Props) {
  const [open] = useAtom(sidebarOpen);
  const [width, setWidth] = useState(getWidth(open));

  useEffect(() => {
    setWidth(getWidth(open));
  }, [open]);

  function onMouseEnter(_: React.MouseEvent<HTMLUListElement>) {
    if (open) return;
    setWidth(CLASS_OPENED_WIDTH);
  }

  function onMouseLeave(_: React.MouseEvent<HTMLUListElement>) {
    if (open) return;
    setWidth(CLASS_CLOSED_WIDTH);
  }

  return (
    <SidebarList
      className={`bg-blue-menu h-screen overflow-y-auto py-1 text-white ${width} ${
        props.className ?? ""
      }`}
      style={{
        ...props.style,
        transition: `width ${ANIMATION_SPEED} ease-${open ? "in" : "out"}`,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {props.children}
    </SidebarList>
  );
}

function getWidth(open: boolean) {
  return open ? CLASS_OPENED_WIDTH : CLASS_CLOSED_WIDTH;
}
