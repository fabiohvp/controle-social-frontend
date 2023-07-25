import MenuMobile from "@/components/menu/MenuMobile";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import {
  HEADER_HEIGHT,
  MAX_HEIGHT_CONTENT,
} from "../layout/dashboard/dashboardConstants";

type Props = HTMLAttributes<HTMLDivElement>;

export default function MenuMobileLayout({
  className,
  style,
  ...props
}: Props) {
  return (
    <div
      className={twMerge(
        "bg-gray-header fixed h-screen left-0 w-screen z-40 xl:hidden",
        className
      )}
      style={{ top: HEADER_HEIGHT, ...style }}
      {...props}
    >
      <MenuMobile style={{ maxHeight: MAX_HEIGHT_CONTENT }} />
    </div>
  );
}
