import MenuMobile from "@/components/menu/MenuMobile";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  maxHeight?: string;
  top?: string;
} & HTMLAttributes<HTMLDivElement>;

export default async function MenuMobileLayout({
  className,
  maxHeight,
  top,
  ...props
}: Props) {
  return (
    <div
      className={twMerge(
        "bg-gray-header fixed h-screen left-0 w-screen z-40 xl:hidden",
        className
      )}
      style={{ top }}
      {...props}
    >
      <MenuMobile style={{ maxHeight }} />
    </div>
  );
}
