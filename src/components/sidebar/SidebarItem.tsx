"use client";
import { useAtom } from "jotai";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { SidebarList } from "./SidebarList";
import { ANIMATION_SPEED, CLASS_OPENED_WIDTH } from "./sidebarConstants";
import { sidebarOpen } from "./sidebarState";

type SidebarItemProps<T> = T extends string ? LinkProps<T> : ButtonProps;

const ITEM_CLASS_NAMES = `flex items-center justify-between text-white ${CLASS_OPENED_WIDTH}`;

export function isHrefActive(href: string, pathname: string): boolean {
  const cleanHref = href.replace(/\/+$/, "");
  const cleanPath = pathname.replace(/\/+$/, "");
  if (!cleanHref || !cleanPath) return false;
  if (cleanPath === cleanHref) return true;

  const hrefSegments = cleanHref.split("/").filter(Boolean);
  const pathSegments = cleanPath.split("/").filter(Boolean);

  if (
    pathSegments.length > hrefSegments.length &&
    cleanPath.startsWith(`${cleanHref}/`)
  ) {
    if (hrefSegments[0] === "boletins" && hrefSegments.length === 2) {
      const nextSegment = pathSegments[2];
      return !nextSegment || /^\d+$/.test(nextSegment);
    }
    return true;
  }
  return false;
}

export function hasActiveChild(children: ReactNode, pathname: string): boolean {
  let active = false;
  React.Children.forEach(children, (child) => {
    if (active || !React.isValidElement(child)) return;
    const childProps = child.props as Record<string, any>;
    if (childProps) {
      if (typeof childProps.active === "boolean") {
        if (childProps.active) {
          active = true;
          return;
        }
      } else if (
        typeof childProps.href === "string" &&
        isHrefActive(childProps.href, pathname)
      ) {
        active = true;
        return;
      }
      if (childProps.children && hasActiveChild(childProps.children, pathname)) {
        active = true;
        return;
      }
    }
  });
  return active;
}

export default function SidebarItem<T>(props: SidebarItemProps<T>) {
  const [open] = useAtom(sidebarOpen);
  const pathname = usePathname();

  const isActive = isLink(props)
    ? (props.active ?? isHrefActive(props.href, pathname))
    : false;

  const childIsActive =
    !isLink(props) && hasActiveChild(props.children, pathname);

  const [itemOpen, setItemOpen] = useState(childIsActive);

  useEffect(() => {
    if (childIsActive) {
      setItemOpen(true);
    } else if (!open) {
      setItemOpen(false);
    }
  }, [open, childIsActive, pathname]);

  const isExpanded = open && itemOpen;

  return (
    <>
      <li
        title={props.tooltip}
        className={twMerge(
          "cursor-pointer overflow-hidden hover:bg-gray-500",
          isActive && "bg-gray-500"
        )}
      >
        {isLink(props) ? (
          <Link href={props.href} aria-current={isActive ? "page" : undefined}>
            <Render icon={props.icon} itemOpen={isExpanded} text={props.text} />
          </Link>
        ) : (
          <Render
            arrow
            icon={props.icon}
            itemOpen={isExpanded}
            text={props.text}
            onClick={() => setItemOpen((prev) => !prev)}
          />
        )}
      </li>
      {!isLink(props) && (
        <SidebarList
          style={{
            maxHeight: isExpanded ? "100%" : "0",
            transition: `max-height ${ANIMATION_SPEED} ease-${
              isExpanded ? "in" : "out"
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
          <FaChevronDown
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

//Conditional props
interface SharedProps {
  icon?: ReactNode;
  text: string;
  tooltip: string;
  active?: boolean;
}

interface LinkProps<T> extends SharedProps {
  href: T;
}

interface ButtonProps extends SharedProps {
  children: ReactNode;
}

function isLink<T>(props: any): props is LinkProps<T> {
  return "href" in props;
}
