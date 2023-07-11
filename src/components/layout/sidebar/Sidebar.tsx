"use client";
import { useAtom } from "jotai";
import { CSSProperties, ReactNode, useEffect, useState } from "react";
import { SidebarList } from "./SidebarHelper";
import {
  ANIMATION_SPEED,
  CLASS_CLOSED_WIDTH,
  CLASS_OPENED_WIDTH,
} from "./sidebar-constants";
import { sidebarAnimating, sidebarOpen } from "./sidebar-state";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function Sidebar(props: Props) {
  const [animating, setAnimating] = useAtom(sidebarAnimating);
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

  function onTransitionEnd(_: React.TransitionEvent<HTMLUListElement>) {
    setAnimating(false);
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
      onTransitionEnd={onTransitionEnd}
    >
      {props.children}
    </SidebarList>
  );
}

function getWidth(open: boolean) {
  return open ? CLASS_OPENED_WIDTH : CLASS_CLOSED_WIDTH;
}
