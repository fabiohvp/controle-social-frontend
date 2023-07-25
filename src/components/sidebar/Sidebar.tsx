"use client";
import { useAtom } from "jotai";
import { CSSProperties, ReactNode, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { SidebarList } from "./SidebarHelper";
import {
  ANIMATION_SPEED,
  CLASS_CLOSED_WIDTH,
  CLASS_OPENED_WIDTH,
} from "./sidebarConstants";
import { sidebarOpen } from "./sidebarState";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function Sidebar(props: Props) {
  const [open, setOpen] = useAtom(sidebarOpen);
  const [hovering, setHovering] = useState(false);
  const [width, setWidth] = useState(getWidth(open));

  useEffect(() => {
    setWidth(getWidth(open));
  }, [open]);

  useEffect(() => {
    setOpen(hovering);
  }, [hovering]);

  function onMouseEnter(_: React.MouseEvent<HTMLUListElement>) {
    if (open) return;
    setHovering(true);
  }

  function onMouseLeave(_: React.MouseEvent<HTMLUListElement>) {
    if (!hovering) return;
    setHovering(false);
  }

  return (
    <SidebarList
      className={twMerge(
        `bg-blue-menu grow-0 h-screen overflow-y-auto py-1 shrink-0 text-white hidden md:block ${width}`,
        props.className
      )}
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
